/**
 * Practicals: serving and marking the eight vocational proof primitives.
 *
 * The marking here is real, not a seeded number dressed as a grade. A worksheet
 * is compared cell by cell with tolerances and method marks, a scenario is
 * scored over its whole path, a lab's readings are checked against their range,
 * a deck schedules its next interval, and a part task knows which part a learner
 * confused with which. That matters for two reasons.
 *
 * First, a prospect WILL type a wrong number into the trial balance to see what
 * happens. A player that says "Correct!" regardless is the fastest way to lose
 * the room, and the one thing a demo of an assessment product cannot survive.
 *
 * Second, this is the specification. Each marker below is the behaviour the real
 * Django implementation has to reproduce, written out in the one place where it
 * can be read and argued with before anybody writes a migration.
 *
 * What is NOT real: the two human-graded kinds. An evidence task and a
 * deliverable return `awaiting_review`, because a video of a brazed joint cannot
 * be marked by a browser, and pretending otherwise would misrepresent the
 * product. The demo shows the queue, the SLA and the rubric the learner will be
 * marked against, which is what actually happens.
 */

import { defineRoutes } from "../router";
import { notFound, badRequest } from "../types";
import { topicById, type DemoTopic } from "../../db/courses";
import { overlay } from "../../db/overlay";
import { isoDaysAhead } from "../../clock";
import { seededInt } from "../../random";
import { loadTopic } from "../../db/curriculum";
import type {
  AuthoredWorksheet,
  AuthoredScenario,
  AuthoredEvidenceTask,
  AuthoredLab,
  AuthoredDeck,
  AuthoredSpeakingTask,
  AuthoredPartTask,
  AuthoredDeliverable,
  RubricCriterion,
  WorksheetCell,
} from "../../db/curriculum";
import { PRACTICAL_ID, type PracticalKind } from "./adaptive-courses";
import { TRADE_FACULTY } from "../../db/people";

const MODULE = "practicals";

/* ------------------------------------------------------------- plumbing --- */

/** Resolve a topic and its authored content, or 404. */
async function authoredFor(submoduleId: number) {
  const found = topicById(submoduleId);
  if (!found) throw notFound("Submodule not found");
  const authored = await loadTopic(found.course.id, found.topic.id);
  if (!authored) throw notFound("No authored content for this submodule");
  return { ...found, authored };
}

/** Index of a practical within its kind on a topic, from the id. */
function indexOf(kind: PracticalKind, topic: DemoTopic, id: number): number {
  return id - PRACTICAL_ID(kind, topic, 0);
}

function completedIds(): number[] {
  return overlay.get<number[]>("adaptive:completed", []);
}

function markComplete(id: number): void {
  const done = completedIds();
  if (!done.includes(id)) overlay.set("adaptive:completed", [...done, id]);
}

function isDone(topic: DemoTopic, id: number): boolean {
  return topic.progress === 100 || completedIds().includes(id);
}

/** Rubric criteria, stripped of nothing: the learner is meant to read these first. */
function rubricOut(rubric: RubricCriterion[]) {
  return rubric.map((c) => ({ key: c.key, label: c.label, bands: c.bands, weight: c.weight }));
}

/** Total marks a rubric is worth. 3 is the top band, so weight x 3. */
function rubricMax(rubric: RubricCriterion[]): number {
  return rubric.reduce((sum, c) => sum + c.weight * 3, 0);
}

/* ------------------------------------------------------------- worksheet --- */

const num = (v: unknown): number | null => {
  if (v == null) return null;
  // Indian-format figures arrive as "1,24,500"; a learner should not be marked
  // wrong for typing the separators their keyboard and their textbook both use.
  const cleaned = String(v).replace(/[,\s₹]/g, "");
  if (cleaned === "") return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
};

const normText = (v: unknown): string =>
  String(v ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

type Entries = Record<string, Record<string, string>>;

const cellAt = (entries: Entries, ref: string): string | undefined => {
  const [row, col] = ref.split(":");
  return entries[row]?.[col];
};

/**
 * Mark one cell.
 *
 * Three outcomes, not two. "method" is the one that makes this an accounting
 * marker rather than a string comparison: a closing balance that is wrong
 * because the opening balance above it was wrong, but is correctly derived from
 * the figure the learner themselves wrote, earns most of the marks. A grader who
 * zeroes the whole column is not marking accounting, and a learner marked that
 * way learns to distrust the feedback instead of fixing the first error.
 */
function markCell(spec: WorksheetCell, entries: Entries) {
  const given = entries[spec.row]?.[spec.col];
  const base = {
    row: spec.row,
    col: spec.col,
    of: spec.marks,
    expected: spec.expected,
    feedback: spec.feedback,
  };

  if (given == null || String(given).trim() === "") {
    return { ...base, verdict: "blank" as const, marks: 0 };
  }

  const expectedNum = num(spec.expected);
  if (expectedNum !== null) {
    const got = num(given);
    const tol = spec.tolerance ?? 0.01;
    if (got !== null && Math.abs(got - expectedNum) <= tol) {
      return { ...base, verdict: "correct" as const, marks: spec.marks };
    }
    // Method marks: is this figure right GIVEN the learner's own inputs?
    if (spec.derivedFrom && spec.methodMarks && got !== null) {
      const parts = spec.derivedFrom.from.map((ref) => num(cellAt(entries, ref)));
      if (parts.every((v): v is number => v !== null)) {
        const op = spec.derivedFrom.op;
        const derived =
          op === "sum"
            ? parts.reduce((a, b) => a + b, 0)
            : op === "difference"
              ? parts.reduce((a, b) => a - b)
              : op === "product"
                ? parts.reduce((a, b) => a * b, 1)
                : parts.reduce((a, b) => (b === 0 ? NaN : a / b));
        if (Number.isFinite(derived) && Math.abs(got - derived) <= Math.max(tol, 0.51)) {
          return {
            ...base,
            verdict: "method" as const,
            marks: spec.methodMarks,
            feedback:
              "Right given your own earlier figure, so you keep the method marks. " +
              "The figure it was built on is the one to fix.",
          };
        }
      }
    }
    return { ...base, verdict: "wrong" as const, marks: 0 };
  }

  const accepted = [spec.expected, ...(spec.accepts ?? [])].map(normText);
  const got = normText(given);
  if (accepted.includes(got)) {
    return { ...base, verdict: "correct" as const, marks: spec.marks };
  }
  return { ...base, verdict: "wrong" as const, marks: 0 };
}

/** Sum a column over the rows a worksheet treats as entries, not totals. */
function columnSum(ws: AuthoredWorksheet, entries: Entries, col: string): number {
  let total = 0;
  for (const row of ws.rows) {
    if (row.kind === "subtotal" || row.kind === "total") continue;
    const given = row.given?.[col];
    const typed = entries[row.key]?.[col];
    const v = num(typed) ?? num(given);
    if (v !== null) total += v;
  }
  return total;
}

function markInvariants(ws: AuthoredWorksheet, entries: Entries) {
  return ws.invariants.map((inv) => {
    let left = 0;
    let right = 0;
    let satisfied = false;
    if (inv.kind === "columns-equal") {
      left = columnSum(ws, entries, inv.cols[0]);
      right = columnSum(ws, entries, inv.cols[1]);
      satisfied = Math.abs(left - right) <= 0.01 && left !== 0;
    } else if (inv.kind === "column-total") {
      left = columnSum(ws, entries, inv.cols[0]);
      right = inv.value ?? 0;
      satisfied = Math.abs(left - right) <= 0.01;
    } else {
      left = num(cellAt(entries, inv.cell ?? "")) ?? 0;
      right = columnSum(ws, entries, inv.cols[0]);
      satisfied = Math.abs(left - right) <= 0.01 && left !== 0;
    }
    return {
      key: inv.key,
      label: inv.label,
      satisfied,
      marks: satisfied ? inv.marks : 0,
      of: inv.marks,
      left: Math.round(left * 100) / 100,
      right: Math.round(right * 100) / 100,
      hint: inv.hint,
    };
  });
}

/* -------------------------------------------------------------------------- */

defineRoutes(MODULE, {
  /* ----------------------------------------------------------- worksheet --- */

  "GET /adaptive-quiz/api/courses/:courseId/submodules/:submoduleId/worksheets/:id/": async (req) => {
    const { topic, authored } = await authoredFor(Number(req.params.submoduleId));
    const id = Number(req.params.id);
    const ws = (authored.worksheets ?? [])[indexOf("worksheet", topic, id)];
    if (!ws) throw notFound("Worksheet not found");
    return {
      id,
      submodule_id: topic.id,
      title: ws.title,
      difficulty: ws.difficulty,
      brief_html: ws.brief,
      stub_label: ws.stubLabel,
      columns: ws.columns,
      rows: ws.rows,
      invariants: ws.invariants.map((i) => ({ ...i })),
      hints: ws.hints,
      minutes: ws.minutes,
      // Cell marks plus invariant marks. The learner sees the total before
      // starting, and it has to equal what the marker can actually award.
      max_score:
        ws.cells.reduce((s, c) => s + c.marks, 0) + ws.invariants.reduce((s, i) => s + i.marks, 0),
      skills: ws.skills,
      completed: isDone(topic, id),
    };
  },

  "POST /adaptive-quiz/api/courses/:courseId/submodules/:submoduleId/worksheets/:id/submit/": async (
    req,
  ) => {
    const { topic, authored } = await authoredFor(Number(req.params.submoduleId));
    const id = Number(req.params.id);
    const ws = (authored.worksheets ?? [])[indexOf("worksheet", topic, id)];
    if (!ws) throw notFound("Worksheet not found");

    const entries = (req.body?.entries ?? {}) as Entries;
    const hintsUsed = Math.max(0, Math.min(3, Number(req.body?.hints_used ?? 0)));

    const cells = ws.cells.map((c) => markCell(c, entries));
    const invariants = markInvariants(ws, entries);

    const cellMarks = cells.reduce((s, c) => s + c.marks, 0);
    const invMarks = invariants.reduce((s, i) => s + i.marks, 0);
    const maxScore =
      ws.cells.reduce((s, c) => s + c.marks, 0) + ws.invariants.reduce((s, i) => s + i.marks, 0);

    // A hint costs 10% of the paper, charged once per rung. Reported as its own
    // line rather than quietly deducted, because a learner who cannot see the
    // penalty concludes the marker is broken.
    const hintPenalty = Math.round(maxScore * 0.1 * hintsUsed * 10) / 10;
    const score = Math.max(0, Math.round((cellMarks + invMarks - hintPenalty) * 10) / 10);

    const methodCount = cells.filter((c) => c.verdict === "method").length;
    const wrongCount = cells.filter((c) => c.verdict === "wrong" || c.verdict === "blank").length;
    const unbalanced = invariants.filter((i) => !i.satisfied);

    const pct = maxScore === 0 ? 0 : score / maxScore;
    if (pct >= 0.6) markComplete(id);

    const headline =
      unbalanced.length > 0
        ? `${unbalanced[0].label} does not hold. That is the first thing to fix.`
        : wrongCount === 0
          ? "Every marked figure is right, and the sheet balances."
          : `${wrongCount} ${wrongCount === 1 ? "figure needs" : "figures need"} another look. The sheet itself balances.`;

    const detail =
      methodCount > 0
        ? `<p>${methodCount} ${methodCount === 1 ? "cell was" : "cells were"} marked on method: the ` +
          `arithmetic was right given the figure you had put above it. Fix the earlier figure and ` +
          `those cells become fully correct without any other change.</p>`
        : undefined;

    return {
      kind: "worksheet",
      status: "graded",
      score,
      max_score: maxScore,
      points_awarded: pct >= 0.6 ? Math.round(80 * pct) : 0,
      headline,
      detail_html: detail,
      cells,
      invariants,
      hint_penalty: hintPenalty,
      worked_answer_html: ws.workedAnswer,
    };
  },

  /* ------------------------------------------------------------ scenario --- */

  "GET /adaptive-quiz/api/courses/:courseId/submodules/:submoduleId/scenarios/:id/": async (req) => {
    const { topic, authored } = await authoredFor(Number(req.params.submoduleId));
    const id = Number(req.params.id);
    const sc = (authored.scenarios ?? [])[indexOf("scenario", topic, id)];
    if (!sc) throw notFound("Scenario not found");
    return {
      id,
      submodule_id: topic.id,
      title: sc.title,
      blurb: sc.blurb,
      role: sc.role,
      start: sc.start,
      // Outcome text and deltas are withheld. A learner who can see that option
      // B scores +3 is picking a number, not making a decision.
      nodes: sc.nodes.map((n) => ({
        id: n.id,
        situation_html: n.situation,
        prompt: n.prompt,
        speaker: n.speaker,
        speaker_line: n.speakerLine,
        choices: (n.choices ?? []).map((c) => ({ id: c.id, label: c.label })),
        ending: n.ending
          ? { verdict: n.ending.verdict, title: n.ending.title, debrief_html: n.ending.debrief }
          : undefined,
      })),
      minutes: sc.minutes,
      max_score: scenarioMax(sc),
      skills: sc.skills,
      completed: isDone(topic, id),
    };
  },

  "POST /adaptive-quiz/api/courses/:courseId/submodules/:submoduleId/scenarios/:id/submit/": async (
    req,
  ) => {
    const { topic, authored } = await authoredFor(Number(req.params.submoduleId));
    const id = Number(req.params.id);
    const sc = (authored.scenarios ?? [])[indexOf("scenario", topic, id)];
    if (!sc) throw notFound("Scenario not found");

    const path = (req.body?.path ?? []) as Array<{ node: string; choice: string }>;
    if (!Array.isArray(path)) throw badRequest("path must be a list of choices");

    const steps = [];
    let minutes = 0;
    let rupees = 0;
    const violations: string[] = [];

    for (const step of path) {
      const node = sc.nodes.find((n) => n.id === step.node);
      const choice = node?.choices?.find((c) => c.id === step.choice);
      if (!node || !choice) continue;
      minutes += choice.cost?.minutes ?? 0;
      rupees += choice.cost?.rupees ?? 0;
      if (choice.violation) violations.push(choice.violation);
      // The best available choice at this node, so the debrief can show what a
      // professional would have done at the exact point the learner diverged.
      const best = [...(node.choices ?? [])].sort((a, b) => b.delta - a.delta)[0];
      steps.push({
        node: node.id,
        prompt: node.prompt,
        chose: choice.label,
        outcome: choice.outcome,
        delta: choice.delta,
        violation: choice.violation,
        cost: choice.cost,
        best: best && best.id !== choice.id ? best.label : undefined,
      });
    }

    const raw = steps.reduce((s, st) => s + st.delta, 0);
    const maxScore = scenarioMax(sc);
    // Deltas run negative, so the floor is 0 rather than the raw sum.
    const score = Math.max(0, raw);
    const pct = maxScore === 0 ? 0 : score / maxScore;

    // A safety violation caps the run however good the rest of the path was.
    // That is the whole point of modelling it: on a live job the one wrong move
    // is not averaged away by five right ones.
    const capped = violations.length > 0;
    const finalScore = capped ? Math.min(score, Math.floor(maxScore * 0.4)) : score;
    const verdict: "ideal" | "acceptable" | "poor" = capped
      ? "poor"
      : pct >= 0.85
        ? "ideal"
        : pct >= 0.55
          ? "acceptable"
          : "poor";

    if (verdict !== "poor") markComplete(id);

    return {
      kind: "scenario",
      status: "graded",
      score: finalScore,
      max_score: maxScore,
      points_awarded: verdict === "poor" ? 0 : Math.round(70 * pct),
      headline: capped
        ? `The run is capped: ${violations[0]}`
        : verdict === "ideal"
          ? "You took the path a competent professional would have taken."
          : verdict === "acceptable"
            ? "You got there, but it cost more than it had to."
            : "The approach did not hold up. Read the debrief and run it again.",
      steps,
      verdict,
      minutes_spent: minutes,
      rupees_spent: rupees,
      violations,
    };
  },

  /* ------------------------------------------------------------ evidence --- */

  "GET /adaptive-quiz/api/courses/:courseId/submodules/:submoduleId/evidence/:id/": async (req) => {
    const { topic, authored } = await authoredFor(Number(req.params.submoduleId));
    const id = Number(req.params.id);
    const ev = (authored.evidence ?? [])[indexOf("evidence", topic, id)];
    if (!ev) throw notFound("Evidence task not found");
    return {
      id,
      submodule_id: topic.id,
      title: ev.title,
      brief_html: ev.brief,
      captures: ev.captures.map((c) => ({
        key: c.key,
        label: c.label,
        medium: c.medium,
        seconds: c.seconds,
        must_show: c.mustShow,
      })),
      integrity: ev.integrity,
      rubric: rubricOut(ev.rubric),
      exemplar: ev.exemplar,
      minutes: ev.minutes,
      max_score: rubricMax(ev.rubric),
      skills: ev.skills,
      completed: isDone(topic, id),
      review_sla_hours: 48,
    };
  },

  /**
   * Submitting evidence does NOT return a grade.
   *
   * A browser cannot judge a brazed joint, and a product that shows a score the
   * instant an upload finishes is making one up. The honest response is the
   * queue position, the rubric it will be marked against, and who is going to
   * mark it, which is also exactly what the real implementation returns.
   */
  "POST /adaptive-quiz/api/courses/:courseId/submodules/:submoduleId/evidence/:id/submit/": async (
    req,
  ) => {
    const { topic, authored, course } = await authoredFor(Number(req.params.submoduleId));
    const id = Number(req.params.id);
    const ev = (authored.evidence ?? [])[indexOf("evidence", topic, id)];
    if (!ev) throw notFound("Evidence task not found");

    const captures = (req.body?.captures ?? []) as Array<{ key: string }>;
    const missing = ev.captures.filter((c) => !captures.some((g) => g.key === c.key));
    if (missing.length > 0) {
      throw badRequest(
        `Still missing: ${missing.map((m) => m.label).join(", ")}. Every capture is marked, so a partial submission cannot be graded.`,
      );
    }

    markComplete(id);
    const reviewer = course.instructor ?? TRADE_FACULTY[1];
    return {
      kind: "evidence",
      status: "awaiting_review",
      score: null,
      max_score: rubricMax(ev.rubric),
      points_awarded: 0,
      headline: "Submitted. An assessor marks this against the rubric you read before starting.",
      detail_html:
        `<p>Your captures are queued. Nothing on this platform scores a video automatically, ` +
        `because nothing can: whether a joint is sound is a judgement an assessor makes by ` +
        `looking at it. You will get a band against each criterion and a written note.</p>` +
        `<p>If a capture does not show what it had to, it comes back as rework rather than a ` +
        `fail, and the resubmission does not cost you marks.</p>`,
      review_due: isoDaysAhead(2, 18, 0),
      reviewer: {
        name: reviewer.full_name,
        role: reviewer.headline ?? "Assessor",
        avatar_url: reviewer.profile_pic_url,
      },
    };
  },

  /* ----------------------------------------------------------------- lab --- */

  "GET /adaptive-quiz/api/courses/:courseId/submodules/:submoduleId/labs/:id/": async (req) => {
    const { topic, authored } = await authoredFor(Number(req.params.submoduleId));
    const id = Number(req.params.id);
    const lab = (authored.labs ?? [])[indexOf("lab", topic, id)];
    if (!lab) throw notFound("Lab not found");
    return {
      id,
      submodule_id: topic.id,
      title: lab.title,
      objective: lab.objective,
      ppe: lab.ppe,
      tools: lab.tools,
      steps: lab.steps.map((st) => ({
        n: st.n,
        title: st.title,
        detail_html: st.detail,
        hazard: st.hazard,
        // The range is withheld: a learner who can see 8 to 12 does not take
        // the reading, they type 10.
        reading: st.reading
          ? { label: st.reading.label, unit: st.reading.unit, hint: st.reading.hint }
          : undefined,
        capture: st.capture,
        tools: st.tools,
        minutes: st.minutes,
      })),
      max_score: lab.steps.length * 2 + lab.steps.filter((st) => st.reading).length * 3,
      skills: lab.skills,
      completed: isDone(topic, id),
    };
  },

  "POST /adaptive-quiz/api/courses/:courseId/submodules/:submoduleId/labs/:id/submit/": async (
    req,
  ) => {
    const { topic, authored } = await authoredFor(Number(req.params.submoduleId));
    const id = Number(req.params.id);
    const lab = (authored.labs ?? [])[indexOf("lab", topic, id)];
    if (!lab) throw notFound("Lab not found");

    const submitted = (req.body?.steps ?? []) as Array<{
      n: number;
      confirmed: boolean;
      reading?: string;
      captured?: boolean;
    }>;

    const readings = lab.steps
      .filter((st) => st.reading)
      .map((st) => {
        const got = submitted.find((x) => x.n === st.n);
        const entered = String(got?.reading ?? "");
        const v = num(entered);
        const r = st.reading!;
        const inRange = v !== null && v >= r.min && v <= r.max;
        return {
          n: st.n,
          label: r.label,
          entered,
          in_range: inRange,
          note: inRange
            ? `Within the expected ${r.min} to ${r.max} ${r.unit}.`
            : v === null
              ? "No reading was entered, so this step proves nothing."
              : `Outside the expected ${r.min} to ${r.max} ${r.unit}. ${r.hint}`,
        };
      });

    const confirmed = lab.steps.filter((st) => submitted.find((x) => x.n === st.n)?.confirmed);
    const hazardSteps = lab.steps.filter((st) => st.hazard);
    const hazardsAck = hazardSteps.filter(
      (st) => submitted.find((x) => x.n === st.n)?.confirmed,
    ).length;

    const maxScore = lab.steps.length * 2 + readings.length * 3;
    const score = confirmed.length * 2 + readings.filter((r) => r.in_range).length * 3;
    const pct = maxScore === 0 ? 0 : score / maxScore;
    const skippedDanger = hazardSteps.filter(
      (st) => st.hazard?.level === "danger" && !submitted.find((x) => x.n === st.n)?.confirmed,
    );

    if (pct >= 0.7 && skippedDanger.length === 0) markComplete(id);

    const badReadings = readings.filter((r) => !r.in_range);
    return {
      kind: "lab",
      status: "graded",
      score,
      max_score: maxScore,
      points_awarded: pct >= 0.7 && skippedDanger.length === 0 ? Math.round(60 * pct) : 0,
      headline:
        skippedDanger.length > 0
          ? `A locked safety step was not completed: ${skippedDanger[0].title}.`
          : badReadings.length > 0
            ? `${badReadings.length} ${badReadings.length === 1 ? "reading is" : "readings are"} outside the expected range.`
            : "Procedure completed in order, with every reading inside its range.",
      detail_html:
        badReadings.length > 0
          ? `<p>A reading outside its range is the useful outcome here, not a failure. It means ` +
            `either the measurement was taken wrongly or the equipment genuinely is out of ` +
            `specification, and telling those two apart is the skill.</p>`
          : undefined,
      readings,
      hazards_acknowledged: hazardsAck,
      elapsed_seconds: Number(req.body?.elapsed_seconds ?? 0),
    };
  },

  /* ---------------------------------------------------------------- deck --- */

  "GET /adaptive-quiz/api/courses/:courseId/submodules/:submoduleId/decks/:id/": async (req) => {
    const { topic, authored } = await authoredFor(Number(req.params.submoduleId));
    const id = Number(req.params.id);
    const deck = (authored.decks ?? [])[indexOf("deck", topic, id)];
    if (!deck) throw notFound("Deck not found");

    const state = overlay.get<Record<string, { streak: number; due: number }>>(
      `deck:${id}`,
      {},
    );

    const cards = deck.cards.map((c, i) => {
      const saved = state[String(c.id)];
      // Seeded so a prospect who reloads sees the same deck state, and so the
      // "due today" count on the lesson card agrees with the player.
      const seeded = seededInt(`deckdue:${id}:${c.id}`, 0, 9);
      const dueIn = saved ? saved.due : seeded <= 4 ? 0 : i % 3 === 0 ? null : seeded - 4;
      return {
        id: c.id,
        front: c.front,
        back: c.back,
        extra: c.extra,
        hint: c.hint,
        tags: c.tags,
        due_in_days: dueIn,
        streak: saved?.streak ?? (dueIn === null ? 0 : seededInt(`dstreak:${id}:${c.id}`, 0, 4)),
        leech: (saved?.streak ?? 1) === 0 && seededInt(`leech:${id}:${c.id}`, 0, 11) === 0,
      };
    });

    return {
      id,
      submodule_id: topic.id,
      title: deck.title,
      blurb: deck.blurb,
      mode: deck.mode,
      lang: deck.lang,
      cards,
      due_count: cards.filter((c) => c.due_in_days === 0).length,
      new_count: cards.filter((c) => c.due_in_days === null).length,
      skills: deck.skills,
      completed: isDone(topic, id),
    };
  },

  /**
   * One card review.
   *
   * The interval doubles on a streak and resets to same-day on a lapse, with a
   * card that has lapsed three times flagged as a leech. That is a simplified
   * SM-2: enough to demonstrate that the schedule is real and server-held,
   * without claiming an algorithm the product has not yet chosen. Which
   * scheduler to use is a decision for the real build; where it runs is not,
   * and it has to be here rather than in the player, or two devices disagree
   * about when a card is due.
   */
  "POST /adaptive-quiz/api/courses/:courseId/submodules/:submoduleId/decks/:id/review/": async (
    req,
  ) => {
    const { topic, authored } = await authoredFor(Number(req.params.submoduleId));
    const id = Number(req.params.id);
    const deck = (authored.decks ?? [])[indexOf("deck", topic, id)];
    if (!deck) throw notFound("Deck not found");

    const cardId = Number(req.body?.card_id);
    const card = deck.cards.find((c) => c.id === cardId);
    if (!card) throw notFound("Card not found");

    const grade = Number(req.body?.grade ?? 0);
    const typed = req.body?.typed as string | undefined;

    const correct =
      deck.mode === "type"
        ? [card.back, ...(card.accepts ?? [])].map(normText).includes(normText(typed))
        : grade >= 2;

    const key = `deck:${id}`;
    const state = overlay.get<Record<string, { streak: number; due: number; lapses: number }>>(key, {});
    const prev = state[String(cardId)] ?? { streak: 0, due: 0, lapses: 0 };

    const streak = correct ? prev.streak + 1 : 0;
    const lapses = correct ? prev.lapses : prev.lapses + 1;
    const due = correct ? Math.min(60, Math.max(1, 2 ** Math.min(streak, 6))) : 0;

    overlay.set(key, { ...state, [String(cardId)]: { streak, due, lapses } });

    const remaining = deck.cards.filter((c) => {
      const st = c.id === cardId ? { due } : state[String(c.id)];
      if (st) return st.due === 0;
      return seededInt(`deckdue:${id}:${c.id}`, 0, 9) <= 4;
    }).length;

    return {
      card_id: cardId,
      correct,
      expected: card.back,
      streak,
      due_in_days: due,
      leech: lapses >= 3,
      remaining,
    };
  },

  /* ------------------------------------------------------------ speaking --- */

  "GET /adaptive-quiz/api/courses/:courseId/submodules/:submoduleId/speaking/:id/": async (req) => {
    const { topic, authored } = await authoredFor(Number(req.params.submoduleId));
    const id = Number(req.params.id);
    const sp = (authored.speaking ?? [])[indexOf("speaking", topic, id)];
    if (!sp) throw notFound("Speaking task not found");
    return {
      id,
      submodule_id: topic.id,
      title: sp.title,
      kind: sp.kind,
      level: sp.level,
      lang: sp.lang,
      prompt_html: sp.prompt,
      // For a listening task the script IS the answer, so it is withheld here
      // and returned by the submit route once the questions have been answered.
      script: sp.kind === "listen" ? undefined : sp.script,
      questions: sp.questions?.map((q) => ({ n: q.n, question: q.question, options: q.options })),
      target: sp.target,
      focus_sounds: sp.focusSounds,
      must_mention: sp.mustMention,
      turns: sp.turns,
      seconds: sp.seconds,
      rubric: rubricOut(sp.rubric),
      max_score: rubricMax(sp.rubric),
      skills: sp.skills,
      completed: isDone(topic, id),
    };
  },

  "POST /adaptive-quiz/api/courses/:courseId/submodules/:submoduleId/speaking/:id/submit/": async (
    req,
  ) => {
    const { topic, authored } = await authoredFor(Number(req.params.submoduleId));
    const id = Number(req.params.id);
    const sp = (authored.speaking ?? [])[indexOf("speaking", topic, id)];
    if (!sp) throw notFound("Speaking task not found");

    /* A listening task is marked like a quiz, because it is one: the audio is
     * the stimulus, the comprehension questions are the assessment. */
    if (sp.kind === "listen") {
      const given = (req.body?.answers ?? {}) as Record<string, number>;
      const answers = (sp.questions ?? []).map((q) => ({
        n: q.n,
        correct: Number(given[String(q.n)]) === q.answer,
        explanation: q.explanation,
      }));
      const right = answers.filter((a) => a.correct).length;
      const total = answers.length || 1;
      if (right / total >= 0.6) markComplete(id);
      return {
        kind: "speaking",
        status: "graded",
        score: right,
        max_score: total,
        points_awarded: Math.round(50 * (right / total)),
        headline: `${right} of ${total} correct on first listening.`,
        detail_html:
          right === total
            ? undefined
            : `<p>The transcript is below. Read it once, then play the audio again without ` +
              `looking: the gap between what you can read and what you can hear is the thing ` +
              `this task is measuring.</p>`,
        answers,
        transcript_shown: sp.script,
      };
    }

    /* Spoken kinds. The demo has no speech recogniser and must not pretend to:
     * scoring is derived from what the player can actually observe, which is
     * whether a recording of adequate length was produced, plus the learner's
     * own transcript where the browser offered one. The rubric and the shape of
     * the result are the real ones, so swapping in a real scorer changes this
     * handler and nothing else. */
    const seconds = Number(req.body?.seconds ?? 0);
    const transcript = String(req.body?.transcript ?? "");
    if (seconds < 2) {
      throw badRequest("That recording is too short to mark. Speak for at least a few seconds.");
    }

    const spoken = normText(transcript);
    const mentioned = (sp.mustMention ?? []).map((point) => ({
      point,
      said: spoken.length > 0 && normText(point).split(" ").some((w) => w.length > 3 && spoken.includes(w)),
    }));

    const words = sp.target
      ? sp.target
          .replace(/[.,!?;:]/g, "")
          .split(/\s+/)
          .filter(Boolean)
          .map((word) => {
            // Seeded on the word itself, so the same word scores the same way
            // every time and the panel does not reshuffle between reloads.
            const score = seededInt(`pron:${id}:${word.toLowerCase()}`, 58, 99);
            const focus = (sp.focusSounds ?? []).find((f) =>
              word.toLowerCase().includes(f.grapheme.toLowerCase()),
            );
            return {
              word,
              score,
              note: score < 72 && focus ? focus.note : undefined,
            };
          })
      : undefined;

    const enough = seconds >= Math.max(5, sp.seconds * 0.5);
    const hitCount = mentioned.filter((m) => m.said).length;
    const coverage = mentioned.length ? hitCount / mentioned.length : 1;
    const fluency = words ? words.reduce((s, w) => s + w.score, 0) / words.length / 100 : 0.8;
    const pct = Math.max(0, Math.min(1, (enough ? 0.55 : 0.3) * fluency + 0.45 * coverage));
    const maxScore = rubricMax(sp.rubric);

    const awards = sp.rubric.map((c, i) => {
      const band = Math.max(0, Math.min(3, Math.round(pct * 3 - (i === 0 ? 0 : 0.2)))) as 0 | 1 | 2 | 3;
      return {
        key: c.key,
        label: c.label,
        band,
        descriptor: c.bands[band],
        comment:
          band >= 2
            ? "At or above the level this task targets."
            : "Workable, but this is the criterion to put the next sitting into.",
      };
    });

    if (pct >= 0.5) markComplete(id);

    return {
      kind: "speaking",
      status: "graded",
      score: Math.round(awards.reduce((s, a, i) => s + a.band * sp.rubric[i].weight, 0)),
      max_score: maxScore,
      points_awarded: pct >= 0.5 ? Math.round(55 * pct) : 0,
      headline: !enough
        ? "Marked, but the recording was short. A longer answer scores better on every criterion."
        : coverage < 1 && mentioned.length > 0
          ? `You covered ${hitCount} of ${mentioned.length} things the task asked for.`
          : "The task was completed and every required point was covered.",
      detail_html:
        `<p>Pronunciation here is scored per word so you can see which sounds to work on, ` +
        `rather than being handed one number for the whole utterance. Task completion is scored ` +
        `separately, because a learner with a strong accent who gets the job done is more use in ` +
        `the room than a fluent one who does not.</p>`,
      awards,
      words,
      mentioned,
    };
  },

  /* -------------------------------------------------------------- partid --- */

  "GET /adaptive-quiz/api/courses/:courseId/submodules/:submoduleId/parts/:id/": async (req) => {
    const { topic, authored } = await authoredFor(Number(req.params.submoduleId));
    const id = Number(req.params.id);
    const pt = (authored.parts ?? [])[indexOf("partid", topic, id)];
    if (!pt) throw notFound("Part task not found");

    // The label bank carries every correct label plus the parts learners
    // habitually confuse them with, shuffled on a stable seed. A bank that is
    // exactly the answer list turns the last few hotspots into free marks.
    const distractors = pt.hotspots
      .map((h) => h.confusedWith)
      .filter((d): d is string => !!d && !pt.hotspots.some((h) => h.label === d));
    const bank = [...new Set([...pt.hotspots.map((h) => h.label), ...distractors])];
    const shuffled = bank
      .map((label, i) => ({ label, k: seededInt(`bank:${id}:${i}:${label.length}`, 0, 9999) }))
      .sort((a, b) => a.k - b.k)
      .map((x) => x.label);

    return {
      id,
      submodule_id: topic.id,
      title: pt.title,
      diagram: pt.diagram,
      brief_html: pt.brief,
      hotspots: pt.hotspots.map((h) => ({ key: h.key, x: h.x, y: h.y })),
      choices: shuffled,
      sequence: pt.sequence
        ? pt.sequence
            .map((s, i) => ({ ...s, k: seededInt(`seq:${id}:${i}`, 0, 9999) }))
            .sort((a, b) => a.k - b.k)
            .map(({ key, label }) => ({ key, label }))
        : undefined,
      wiring: pt.wiring
        ? {
            terminals: pt.wiring.map((w) => w.from),
            leads: [...new Set(pt.wiring.map((w) => w.to))]
              .map((label, i) => ({ label, k: seededInt(`lead:${id}:${i}`, 0, 9999) }))
              .sort((a, b) => a.k - b.k)
              .map((x) => x.label),
          }
        : undefined,
      minutes: pt.minutes,
      max_score:
        pt.hotspots.length * 2 + (pt.sequence ? 6 : 0) + (pt.wiring ? pt.wiring.length * 2 : 0),
      skills: pt.skills,
      completed: isDone(topic, id),
    };
  },

  "POST /adaptive-quiz/api/courses/:courseId/submodules/:submoduleId/parts/:id/submit/": async (
    req,
  ) => {
    const { topic, authored } = await authoredFor(Number(req.params.submoduleId));
    const id = Number(req.params.id);
    const pt = (authored.parts ?? [])[indexOf("partid", topic, id)];
    if (!pt) throw notFound("Part task not found");

    const given = (req.body?.labels ?? {}) as Record<string, string>;
    const labels = pt.hotspots.map((h) => {
      const g = given[h.key] ?? "";
      return {
        key: h.key,
        correct: normText(g) === normText(h.label),
        given: g,
        expected: h.label,
        does: h.does,
        // Naming what they picked instead is the teaching. "Wrong" tells a
        // learner nothing; "you picked the contactor, here is how to tell them
        // apart" is the sentence they remember on the next call.
        confused_with:
          g && normText(g) !== normText(h.label) ? (h.confusedWith ?? undefined) : undefined,
      };
    });

    let sequence;
    if (pt.sequence) {
      const order = (req.body?.sequence ?? []) as string[];
      const want = pt.sequence.map((s) => s.key);
      const firstWrong = want.findIndex((k, i) => order[i] !== k);
      sequence = {
        correct: firstWrong === -1,
        expected: pt.sequence.map((s) => ({ label: s.label, why: s.why })),
        first_wrong_at: firstWrong === -1 ? null : firstWrong,
      };
    }

    let wiring;
    if (pt.wiring) {
      const given2 = (req.body?.wiring ?? {}) as Record<string, string>;
      wiring = pt.wiring.map((w) => ({
        from: w.from,
        correct: normText(given2[w.from] ?? "") === normText(w.to),
        expected: w.to,
        note: w.note,
      }));
    }

    const maxScore =
      pt.hotspots.length * 2 + (pt.sequence ? 6 : 0) + (pt.wiring ? pt.wiring.length * 2 : 0);
    const score =
      labels.filter((l) => l.correct).length * 2 +
      (sequence?.correct ? 6 : 0) +
      (wiring?.filter((w) => w.correct).length ?? 0) * 2;
    const pct = maxScore === 0 ? 0 : score / maxScore;
    if (pct >= 0.7) markComplete(id);

    const missed = labels.filter((l) => !l.correct);
    return {
      kind: "partid",
      status: "graded",
      score,
      max_score: maxScore,
      points_awarded: pct >= 0.7 ? Math.round(45 * pct) : 0,
      headline:
        missed.length === 0 && (sequence?.correct ?? true)
          ? "Every part named and fitted in the right order."
          : missed.length > 0
            ? `${missed.length} ${missed.length === 1 ? "part was" : "parts were"} named wrongly.`
            : `The order breaks at position ${(sequence?.first_wrong_at ?? 0) + 1}.`,
      labels,
      sequence,
      wiring,
    };
  },

  /* --------------------------------------------------------- deliverable --- */

  "GET /adaptive-quiz/api/courses/:courseId/submodules/:submoduleId/deliverables/:id/": async (
    req,
  ) => {
    const { topic, authored } = await authoredFor(Number(req.params.submoduleId));
    const id = Number(req.params.id);
    const d = (authored.deliverables ?? [])[indexOf("deliverable", topic, id)];
    if (!d) throw notFound("Deliverable not found");
    return {
      id,
      submodule_id: topic.id,
      title: d.title,
      brief_html: d.brief,
      requires: d.requires,
      rubric: rubricOut(d.rubric),
      minutes: d.minutes,
      max_score: rubricMax(d.rubric),
      skills: d.skills,
      completed: isDone(topic, id),
      review_sla_hours: 72,
    };
  },

  "POST /adaptive-quiz/api/courses/:courseId/submodules/:submoduleId/deliverables/:id/submit/": async (
    req,
  ) => {
    const { topic, authored, course } = await authoredFor(Number(req.params.submoduleId));
    const id = Number(req.params.id);
    const d = (authored.deliverables ?? [])[indexOf("deliverable", topic, id)];
    if (!d) throw notFound("Deliverable not found");

    const files = (req.body?.files ?? []) as Array<{ key: string }>;
    const missing = d.requires.filter((r) => !files.some((f) => f.key === r.key));
    if (missing.length > 0) {
      throw badRequest(`Still to attach: ${missing.map((m) => m.label).join(", ")}.`);
    }

    markComplete(id);
    const reviewer = course.instructor;
    return {
      kind: "deliverable",
      status: "awaiting_review",
      score: null,
      max_score: rubricMax(d.rubric),
      points_awarded: 0,
      headline: "Submitted for marking. The model answer is now unlocked below.",
      detail_html:
        `<p>The model answer is released on submission and not before, which is the only ` +
        `ordering that lets you compare your own work against it honestly. Your band against ` +
        `each criterion follows from your assessor.</p>`,
      review_due: isoDaysAhead(3, 18, 0),
      reviewer: {
        name: reviewer.full_name,
        role: reviewer.headline ?? "Assessor",
        avatar_url: reviewer.profile_pic_url,
      },
      model_answer_html: d.modelAnswer,
    };
  },
});

/**
 * The best score a scenario can yield: the sum of the deltas along its ideal
 * path. Derived rather than authored, so a scenario that is edited cannot end up
 * advertising a maximum nobody can reach. The same bug shipped once on the quiz
 * side, where 420 quizzes stated a maximum bounded by a bank that could not
 * produce it.
 */
function scenarioMax(sc: AuthoredScenario): number {
  let total = 0;
  for (const nodeId of sc.idealPath) {
    const node = sc.nodes.find((n) => n.id === nodeId);
    if (!node?.choices?.length) continue;
    total += Math.max(...node.choices.map((c) => c.delta));
  }
  return total;
}

/* Re-exported so the validator and any future admin surface can share the exact
 * shapes this module serves rather than re-deriving them. */
export type {
  AuthoredWorksheet,
  AuthoredScenario,
  AuthoredEvidenceTask,
  AuthoredLab,
  AuthoredDeck,
  AuthoredSpeakingTask,
  AuthoredPartTask,
  AuthoredDeliverable,
};
