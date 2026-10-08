/**
 * Gate for authored curriculum.
 *
 * Content that merely *looks* authored is the failure this catches. Prose can be
 * eyeballed, but a coding problem whose reference solution does not pass its own
 * tests, or an MCQ whose "correct" option is wrong, ships a demo that breaks the
 * moment a prospect tries it. So this executes every solution against every test
 * and checks every question mechanically.
 *
 * It also enforces the two things that made the old content obviously fake:
 * tiers that are the same text, and prose shared between topics.
 *
 * Usage: node scripts/verify-curriculum.mjs [courseId ...]
 * Exits non-zero on any failure.
 */

import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { execFileSync } from "child_process";

const ROOT = process.cwd();
const DIR = path.join(ROOT, "lib/demo/db/curriculum");
const TMP = path.join(ROOT, ".curriculum-check");

const wanted = process.argv.slice(2).filter((a) => /^\d+$/.test(a));

if (!fs.existsSync(DIR)) {
  console.error("no curriculum directory yet");
  process.exit(1);
}

const files = fs
  .readdirSync(DIR)
  .filter((f) => /^course-\d+\.ts$/.test(f))
  .filter((f) => !wanted.length || wanted.includes(f.match(/\d+/)[0]));

if (!files.length) {
  console.error("no course-*.ts curriculum files found");
  process.exit(1);
}

// Compile the TS to JS so we can actually run the solutions. esbuild ships with
// Next, so this needs no extra dependency.
fs.rmSync(TMP, { recursive: true, force: true });
fs.mkdirSync(TMP, { recursive: true });
try {
  execFileSync(
    "npx",
    ["esbuild", ...files.map((f) => path.join(DIR, f)), "--outdir=" + TMP, "--format=esm", "--platform=node", "--log-level=error"],
    { cwd: ROOT, stdio: "inherit" },
  );
} catch {
  console.error("esbuild failed — the curriculum files do not compile");
  process.exit(1);
}

const problems = [];
const fail = (where, msg) => problems.push(`${where}: ${msg}`);

const TIERS = ["Beginner", "Intermediate", "Advanced", "Expert"];
const allProse = new Map(); // normalized paragraph -> first topic that used it

let topicCount = 0;
let questionCount = 0;
let problemCount = 0;
let testCount = 0;
let practicalCount = 0;
let invariantsRun = 0;
let scenarioPaths = 0;
let cardCount = 0;
let derivationsRun = 0;

for (const file of files) {
  const courseId = file.match(/\d+/)[0];
  const mod = await import(pathToFileURL(path.join(TMP, file.replace(/\.ts$/, ".js"))).href);
  const curriculum = mod.default ?? Object.values(mod)[0];
  if (!curriculum || typeof curriculum !== "object") {
    fail(file, "no default export of topics");
    continue;
  }

  for (const [key, topic] of Object.entries(curriculum)) {
    const where = `course ${courseId} topic ${key} (${topic.title ?? "?"})`;
    topicCount++;

    if (Number(key) !== topic.topicId) fail(where, `key ${key} != topicId ${topic.topicId}`);
    if (!topic.summary || topic.summary.length < 40) fail(where, "summary missing or too short");
    if (!Array.isArray(topic.concepts) || topic.concepts.length < 3)
      fail(where, "needs at least 3 concepts");
    if (!topic.glossary || Object.keys(topic.glossary).length < 3)
      fail(where, "needs at least 3 glossary terms");

    // --- tiers must exist, be substantial, and genuinely differ -------------
    for (const tier of TIERS) {
      const body = topic.body?.[tier];
      if (!body) { fail(where, `missing ${tier} body`); continue; }
      if (body.length < 700) fail(where, `${tier} body is only ${body.length} chars`);
    }
    const bodies = TIERS.map((t) => topic.body?.[t]).filter(Boolean);
    const distinct = new Set(bodies.map((b) => b.replace(/\s+/g, " ").trim()));
    if (bodies.length === 4 && distinct.size < 4)
      fail(where, `only ${distinct.size} distinct bodies across 4 tiers`);

    // --- prose must not be shared between topics ---------------------------
    for (const body of bodies) {
      for (const para of body.split(/<\/p>|<\/li>/)) {
        const norm = para.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().toLowerCase();
        if (norm.length < 120) continue;
        const seen = allProse.get(norm);
        if (seen && seen !== where) fail(where, `shares a paragraph with ${seen}`);
        else allProse.set(norm, where);
      }
    }

    // --- em dashes are against house style ---------------------------------
    const visible = [topic.summary, ...bodies, ...(topic.questions ?? []).map((q) => q.question + q.explanation)].join(" ");
    if (visible.includes("—")) fail(where, "contains an em dash");

    // --- questions ----------------------------------------------------------
    for (const q of topic.questions ?? []) {
      questionCount++;
      const qw = `${where} Q${q.n}`;
      if (!Array.isArray(q.options) || q.options.length !== 4) fail(qw, "needs exactly 4 options");
      if (new Set(q.options).size !== (q.options?.length ?? 0)) fail(qw, "duplicate options");
      if (typeof q.answer !== "number" || q.answer < 0 || q.answer > 3) fail(qw, "answer out of range");
      if (!q.explanation || q.explanation.length < 60) fail(qw, "explanation missing or too short");
      if (!topic.concepts.includes(q.skill)) fail(qw, `skill "${q.skill}" is not one of the topic's concepts`);
    }
    const qs = topic.questions ?? [];
    if (qs.length && new Set(qs.map((q) => q.question)).size !== qs.length)
      fail(where, "duplicate question text within the topic");

    /* --- practicals -------------------------------------------------------
     *
     * The gate that matters here is the one that EXECUTES the content rather
     * than inspecting it. A worksheet whose own answer key does not satisfy its
     * own balance rules would tell a learner their correct sheet is unbalanced,
     * and no amount of reading the file catches that. So the key is poured into
     * the grid and the invariants are run against it, exactly as the marker
     * would. Same idea for a scenario: every branch is walked to make sure it
     * terminates and that the declared ideal path actually reaches a good
     * ending.
     */

    // worksheets
    for (const w of topic.worksheets ?? []) {
      practicalCount++;
      const ww = `${where} worksheet ${w.n} (${w.title})`;
      const rowKeys = new Set((w.rows ?? []).map((r) => r.key));
      const colKeys = new Set((w.columns ?? []).map((c) => c.key));
      if (rowKeys.size !== (w.rows ?? []).length) fail(ww, "duplicate row keys");
      if (colKeys.size !== (w.columns ?? []).length) fail(ww, "duplicate column keys");
      if (!Array.isArray(w.hints) || w.hints.length !== 3) fail(ww, "needs exactly 3 hints");
      if (!w.workedAnswer || w.workedAnswer.length < 200) fail(ww, "worked answer missing or too short");
      if (!(w.cells ?? []).length) fail(ww, "no marked cells");

      for (const c of w.cells ?? []) {
        if (!rowKeys.has(c.row)) fail(ww, `cell references unknown row "${c.row}"`);
        if (!colKeys.has(c.col)) fail(ww, `cell references unknown column "${c.col}"`);
        if (!(c.marks > 0)) fail(ww, `cell ${c.row}:${c.col} carries no marks`);
        // A cell the learner is given cannot also be a cell they are marked on.
        const row = (w.rows ?? []).find((r) => r.key === c.row);
        if (row?.given && row.given[c.col] !== undefined)
          fail(ww, `cell ${c.row}:${c.col} is both given and marked`);
        for (const ref of c.derivedFrom?.from ?? []) {
          const [r, col] = String(ref).split(":");
          if (!rowKeys.has(r) || !colKeys.has(col))
            fail(ww, `derivedFrom references unknown cell "${ref}"`);
        }
        if (c.derivedFrom && !(c.methodMarks > 0))
          fail(ww, `cell ${c.row}:${c.col} declares derivedFrom but no methodMarks`);
        if (c.methodMarks != null && c.methodMarks > c.marks)
          fail(ww, `cell ${c.row}:${c.col} awards more method marks than full marks`);
      }

      /* A derivation that cannot reproduce its own cell's expected value is a
       * dead check: the method marks it offers can never be earned by anybody,
       * because the marker computes the derivation and compares it with what
       * the learner typed. Run each one over the answer key and require that it
       * lands on the expected figure. This caught four reducing-balance cells
       * whose `product` derivation evaluated to the carrying amount rather than
       * 30% of it. */
      for (const c of w.cells ?? []) {
        if (!c.derivedFrom) continue;
        const keyOf = (ref) => {
          const [r, col] = String(ref).split(":");
          const row = (w.rows ?? []).find((x) => x.key === r);
          const given = row?.given?.[col];
          const marked = (w.cells ?? []).find((x) => x.row === r && x.col === col);
          const raw = marked ? marked.expected : given;
          if (raw == null || raw === "") return null;
          const cleaned = String(raw).replace(/[,\s\u20B9]/g, "");
          const v = Number(cleaned);
          return Number.isFinite(v) ? v : null;
        };
        const parts = c.derivedFrom.from.map(keyOf);
        if (parts.some((v) => v === null)) {
          fail(ww, `cell ${c.row}:${c.col} derivation references a cell with no numeric answer`);
          continue;
        }
        const op = c.derivedFrom.op;
        const base =
          op === "sum"
            ? parts.reduce((a, b) => a + b, 0)
            : op === "difference"
              ? parts.reduce((a, b) => a - b)
              : op === "product"
                ? parts.reduce((a, b) => a * b, 1)
                : parts.reduce((a, b) => (b === 0 ? NaN : a / b));
        const got = base * (c.derivedFrom.factor ?? 1);
        const want = Number(String(c.expected).replace(/[,\s\u20B9]/g, ""));
        if (!Number.isFinite(got) || Math.abs(got - want) > 0.51) {
          fail(
            ww,
            `cell ${c.row}:${c.col} derivation (${op}${c.derivedFrom.factor ? ` x ${c.derivedFrom.factor}` : ""}) yields ${got} but the expected answer is ${want}; its method marks can never be earned`,
          );
        }
        derivationsRun++;
      }

      // Build the answer key as a learner's completed sheet would look, then run the
      // invariants over it. This is the executing gate.
      const key = {};
      for (const r of w.rows ?? []) {
        key[r.key] = {};
        for (const [col, v] of Object.entries(r.given ?? {})) key[r.key][col] = String(v);
      }
      for (const c of w.cells ?? []) {
        key[c.row] ??= {};
        key[c.row][c.col] = String(c.expected);
      }
      const n = (v) => {
        if (v == null) return null;
        const cleaned = String(v).replace(/[,\s\u20B9]/g, "");
        if (cleaned === "") return null;
        const x = Number(cleaned);
        return Number.isFinite(x) ? x : null;
      };
      const colSum = (col) => {
        let t = 0;
        for (const r of w.rows ?? []) {
          if (r.kind === "subtotal" || r.kind === "total") continue;
          const v = n(key[r.key]?.[col]);
          if (v !== null) t += v;
        }
        return t;
      };
      for (const inv of w.invariants ?? []) {
        if (!(inv.marks > 0)) fail(ww, `invariant ${inv.key} carries no marks`);
        if (!inv.hint || inv.hint.length < 40) fail(ww, `invariant ${inv.key} needs a hint naming the mechanism`);
        for (const col of inv.cols ?? []) {
          if (!colKeys.has(col)) fail(ww, `invariant ${inv.key} references unknown column "${col}"`);
        }
        let left = 0;
        let right = 0;
        if (inv.kind === "columns-equal") {
          left = colSum(inv.cols[0]);
          right = colSum(inv.cols[1]);
        } else if (inv.kind === "column-total") {
          left = colSum(inv.cols[0]);
          right = inv.value ?? 0;
        } else if (inv.kind === "cell-is-column-sum") {
          const [r, col] = String(inv.cell ?? "").split(":");
          if (!rowKeys.has(r) || !colKeys.has(col))
            fail(ww, `invariant ${inv.key} references unknown cell "${inv.cell}"`);
          left = n(key[r]?.[col]) ?? 0;
          right = colSum(inv.cols[0]);
        } else {
          fail(ww, `invariant ${inv.key} has unknown kind "${inv.kind}"`);
          continue;
        }
        if (Math.abs(left - right) > 0.011 || left === 0) {
          fail(
            ww,
            `invariant "${inv.label}" does NOT hold for the worksheet's own answer key: ${left} against ${right}`,
          );
        }
        invariantsRun++;
      }
    }

    // scenarios
    for (const sc of topic.scenarios ?? []) {
      practicalCount++;
      const sw = `${where} scenario ${sc.n} (${sc.title})`;
      const ids = new Set((sc.nodes ?? []).map((nd) => nd.id));
      if (ids.size !== (sc.nodes ?? []).length) fail(sw, "duplicate node ids");
      if (!ids.has(sc.start)) fail(sw, `start node "${sc.start}" does not exist`);
      if (!sc.role || sc.role.length < 10) fail(sw, "needs a role telling the learner who they are");

      for (const nd of sc.nodes ?? []) {
        const hasChoices = (nd.choices ?? []).length > 0;
        if (hasChoices && nd.ending) fail(sw, `node ${nd.id} has both choices and an ending`);
        if (!hasChoices && !nd.ending) fail(sw, `node ${nd.id} is a dead end: no choices and no ending`);
        if (nd.ending && (!nd.ending.debrief || nd.ending.debrief.length < 200))
          fail(sw, `node ${nd.id} ending needs a real debrief`);
        const cids = new Set((nd.choices ?? []).map((c) => c.id));
        if (cids.size !== (nd.choices ?? []).length) fail(sw, `node ${nd.id} has duplicate choice ids`);
        for (const c of nd.choices ?? []) {
          if (c.next != null && !ids.has(c.next))
            fail(sw, `node ${nd.id} choice ${c.id} points at unknown node "${c.next}"`);
          if (!c.outcome || c.outcome.length < 40)
            fail(sw, `node ${nd.id} choice ${c.id} needs an outcome saying what happened`);
          if (typeof c.delta !== "number") fail(sw, `node ${nd.id} choice ${c.id} has no delta`);
        }
      }

      /* Every node reachable from the start, or it is content nobody can see.
       *
       * The pop happens BEFORE the search, not inside its predicate. Written as
       * `find((x) => x.id === stack.pop())` the pop runs once per candidate
       * node and drains the stack, so the walk stops after the first level and
       * reports every deeper node as unreachable. It did exactly that on a
       * three-node scenario whose links were correct, and it had been silently
       * passing the earlier ones by luck rather than by working. */
      const seen = new Set([sc.start]);
      const stack = [sc.start];
      while (stack.length) {
        const id = stack.pop();
        const nd = (sc.nodes ?? []).find((x) => x.id === id);
        for (const c of nd?.choices ?? []) {
          if (c.next && !seen.has(c.next)) {
            seen.add(c.next);
            stack.push(c.next);
          }
        }
      }
      for (const nd of sc.nodes ?? []) {
        if (!seen.has(nd.id)) fail(sw, `node ${nd.id} is unreachable from the start`);
      }

      // The declared ideal path has to be walkable and end well.
      let cursor = sc.start;
      for (const [i, step] of (sc.idealPath ?? []).entries()) {
        if (step !== cursor) {
          fail(sw, `idealPath step ${i} is "${step}" but the walk reached "${cursor}"`);
          break;
        }
        const nd = (sc.nodes ?? []).find((x) => x.id === step);
        if (nd?.ending) {
          if (nd.ending.verdict !== "ideal")
            fail(sw, `idealPath ends at a "${nd.ending.verdict}" ending rather than an ideal one`);
          break;
        }
        const best = [...(nd?.choices ?? [])].sort((a, b) => b.delta - a.delta)[0];
        if (!best) {
          fail(sw, `idealPath stalls at ${step}`);
          break;
        }
        if (best.violation) fail(sw, `the best-scoring choice at ${step} is a rule violation`);
        cursor = best.next;
        if (!cursor) break;
      }
      scenarioPaths++;
    }

    // evidence tasks and deliverables: both are human marked, so the rubric IS
    // the assessment and an empty one means the task cannot be graded at all.
    for (const [kindName, list] of [
      ["evidence", topic.evidence ?? []],
      ["deliverable", topic.deliverables ?? []],
    ]) {
      for (const item of list) {
        practicalCount++;
        const iw = `${where} ${kindName} ${item.n} (${item.title})`;
        if (!(item.rubric ?? []).length) fail(iw, "no rubric, so nothing can be marked");
        for (const c of item.rubric ?? []) {
          if (!Array.isArray(c.bands) || c.bands.length !== 4)
            fail(iw, `criterion ${c.key} needs exactly 4 bands`);
          if ((c.bands ?? []).some((b) => !b || b.length < 15))
            fail(iw, `criterion ${c.key} has a band description too short to point at`);
          if (!(c.weight > 0)) fail(iw, `criterion ${c.key} has no weight`);
        }
        if (kindName === "evidence") {
          if (!(item.captures ?? []).length) fail(iw, "an evidence task with no captures proves nothing");
          for (const c of item.captures ?? []) {
            if (!["photo", "video", "audio"].includes(c.medium))
              fail(iw, `capture ${c.key} has unknown medium "${c.medium}"`);
            if (!c.mustShow || c.mustShow.length < 25)
              fail(iw, `capture ${c.key} needs a checkable mustShow, not a description`);
          }
          if (!(item.integrity ?? []).length) fail(iw, "needs at least one integrity requirement");
        } else {
          if (!(item.requires ?? []).length) fail(iw, "a deliverable with no required file");
          if (!item.modelAnswer || item.modelAnswer.length < 200)
            fail(iw, "needs a model answer, released on submission");
        }
      }
    }

    // labs
    for (const lab of topic.labs ?? []) {
      practicalCount++;
      const lw = `${where} lab ${lab.n} (${lab.title})`;
      if (!(lab.ppe ?? []).length) fail(lw, "no PPE gate");
      if (!(lab.steps ?? []).length) fail(lw, "no steps");
      (lab.steps ?? []).forEach((st, i) => {
        if (st.n !== i + 1) fail(lw, `step ${i + 1} is numbered ${st.n}; steps must be sequential from 1`);
        if (!st.detail || st.detail.length < 60) fail(lw, `step ${st.n} has no real instruction`);
        if (st.hazard && !["warning", "danger"].includes(st.hazard.level))
          fail(lw, `step ${st.n} hazard has unknown level`);
        if (st.reading) {
          if (!(st.reading.max > st.reading.min))
            fail(lw, `step ${st.n} reading range is empty or inverted`);
          if (!st.reading.hint || st.reading.hint.length < 25)
            fail(lw, `step ${st.n} reading needs a hint for an out-of-range value`);
        }
      });
      if (!(lab.steps ?? []).some((st) => st.hazard?.level === "danger"))
        fail(lw, "no danger step, so nothing is actually gated");
    }

    // decks
    for (const d of topic.decks ?? []) {
      practicalCount++;
      const dw = `${where} deck ${d.n} (${d.title})`;
      if ((d.cards ?? []).length < 8) fail(dw, "a deck under 8 cards is not worth scheduling");
      const cardIds = new Set((d.cards ?? []).map((c) => c.id));
      if (cardIds.size !== (d.cards ?? []).length) fail(dw, "duplicate card ids");
      const fronts = new Set((d.cards ?? []).map((c) => String(c.front).toLowerCase()));
      if (fronts.size !== (d.cards ?? []).length) fail(dw, "two cards share a front");
      if (!["type", "flip"].includes(d.mode)) fail(dw, `unknown mode "${d.mode}"`);
      for (const c of d.cards ?? []) {
        if (!c.front || !c.back) fail(dw, `card ${c.id} is missing a face`);
        cardCount++;
      }
    }

    // speaking tasks
    for (const sp of topic.speaking ?? []) {
      practicalCount++;
      const pw = `${where} speaking ${sp.n} (${sp.title})`;
      if (!["listen", "read-aloud", "respond", "roleplay"].includes(sp.kind))
        fail(pw, `unknown kind "${sp.kind}"`);
      if (!/^[a-z]{2}-[A-Z]{2}$/.test(sp.lang ?? "")) fail(pw, `lang "${sp.lang}" is not a BCP 47 tag`);
      if (sp.kind === "listen") {
        if (!sp.script || sp.script.length < 40) fail(pw, "a listening task needs a script to speak");
        if (!(sp.questions ?? []).length) fail(pw, "a listening task needs comprehension questions");
        for (const q of sp.questions ?? []) {
          if ((q.options ?? []).length !== 4) fail(pw, `question ${q.n} needs 4 options`);
          if (typeof q.answer !== "number") fail(pw, `question ${q.n} has no answer index`);
          if (!q.explanation || q.explanation.length < 40)
            fail(pw, `question ${q.n} needs an explanation`);
        }
      }
      if (sp.kind === "read-aloud" && !sp.target) fail(pw, "a read-aloud task needs target text");
      if ((sp.kind === "respond" || sp.kind === "roleplay") && !(sp.mustMention ?? []).length)
        fail(pw, "a spoken response needs the content points a complete answer covers");
      if (!(sp.rubric ?? []).length) fail(pw, "no rubric");
      for (const c of sp.rubric ?? []) {
        if ((c.bands ?? []).length !== 4) fail(pw, `criterion ${c.key} needs exactly 4 bands`);
      }
      if (!(sp.seconds > 0)) fail(pw, "needs a target length in seconds");
    }

    // part identification
    const KNOWN_DIAGRAMS = ["drone-exploded", "refrigeration-cycle", "ac-wiring", "drone-power"];
    for (const pt of topic.parts ?? []) {
      practicalCount++;
      const tw = `${where} parts ${pt.n} (${pt.title})`;
      if (!KNOWN_DIAGRAMS.includes(pt.diagram))
        fail(tw, `diagram "${pt.diagram}" is not one the player can draw`);
      if ((pt.hotspots ?? []).length < 4) fail(tw, "fewer than 4 hotspots");
      const hk = new Set((pt.hotspots ?? []).map((h) => h.key));
      if (hk.size !== (pt.hotspots ?? []).length) fail(tw, "duplicate hotspot keys");
      const labels = new Set((pt.hotspots ?? []).map((h) => h.label));
      if (labels.size !== (pt.hotspots ?? []).length) fail(tw, "two hotspots share a label");
      for (const h of pt.hotspots ?? []) {
        if (!(h.x >= 0 && h.x <= 100) || !(h.y >= 0 && h.y <= 100))
          fail(tw, `hotspot ${h.key} sits outside the diagram at ${h.x}/${h.y}`);
        if (!h.does || h.does.length < 30) fail(tw, `hotspot ${h.key} needs to say what the part does`);
      }
      // The bank has to be bigger than the answer set or the last hotspots are
      // free marks by elimination.
      const distractors = (pt.hotspots ?? []).filter((h) => h.confusedWith).length;
      if (distractors === 0) fail(tw, "no confusedWith on any hotspot, so the label bank is exactly the answers");
      for (const s of pt.sequence ?? []) {
        if (!s.why || s.why.length < 25) fail(tw, `sequence step ${s.key} needs to say why it comes there`);
      }
      for (const wr of pt.wiring ?? []) {
        if (!wr.note || wr.note.length < 20) fail(tw, `wiring ${wr.from} needs a note`);
      }
    }

    // --- coding problems: EXECUTE the solution against its own tests --------
    for (const p of topic.problems ?? []) {
      problemCount++;
      const pw = `${where} problem ${p.n} (${p.title})`;
      if (!p.tests?.length || p.tests.length < 4) fail(pw, "needs at least 4 test cases");
      if (!p.tests?.some((t) => t.hidden)) fail(pw, "needs at least one hidden test");
      if (!Array.isArray(p.hints) || p.hints.length !== 3) fail(pw, "needs exactly 3 hints");
      if (!p.solution) { fail(pw, "no reference solution"); continue; }

      let fn;
      try {
        // The solution defines `function <fn>(...)`; evaluate and pull it out.
        fn = new Function(`${p.solution}\nreturn typeof ${p.fn} === "function" ? ${p.fn} : null;`)();
      } catch (e) {
        fail(pw, `solution does not evaluate: ${e.message}`);
        continue;
      }
      if (!fn) { fail(pw, `solution does not define ${p.fn}()`); continue; }

      for (const [i, t] of (p.tests ?? []).entries()) {
        testCount++;
        let actual;
        try {
          actual = fn(...structuredClone(t.args));
        } catch (e) {
          fail(pw, `test ${i} (${t.label}) threw: ${e.message}`);
          continue;
        }
        if (JSON.stringify(actual) !== JSON.stringify(t.expected)) {
          fail(pw, `test ${i} (${t.label}) expected ${JSON.stringify(t.expected)} but the reference solution returned ${JSON.stringify(actual)}`);
        }
      }
    }
  }
}

fs.rmSync(TMP, { recursive: true, force: true });

console.log(
  `topics ${topicCount} | questions ${questionCount} | problems ${problemCount} | tests executed ${testCount}`,
);
/**
 * Figures, checked on the source rather than in a browser.
 *
 * The browser sweep (check:figures) proves the two renderers do not eat an
 * svg, which is a property of the renderers and is covered by any one page.
 * Legibility is a property of each figure, and it cannot be checked that way:
 * a diagram on step seven of a gated lab procedure, or in a worked answer
 * released only after submission, is never in the DOM to be measured. Driving
 * the UI to reach each one is a harness that breaks whenever a control is
 * renamed, and a check that silently stops reaching the thing it checks is
 * worse than no check.
 *
 * So the rule lives here, where every authored figure is visible whether or
 * not a learner can get to it yet. An svg scales its text with its container
 * and the narrowest container these ship into is a reading column of about
 * 400px against a 1000-unit viewBox, so anything below 26 units renders under
 * 10.5px and stops being a label.
 */
const MIN_FONT_UNITS = 26;
let figureCount = 0;

/**
 * Every vocational topic carries a figure on the tier a learner lands on.
 *
 * The four trade courses were added with no images at all, and the first
 * complaint about them was that an article looked basic. The default tier is
 * Intermediate, so that is the one that has to carry something visual; a
 * diagram on the Expert tier is a diagram almost nobody sees.
 */
const VOCATIONAL = [206, 207, 208, 209];

for (const file of files) {
  const src = fs.readFileSync(path.join(DIR, file), "utf8");
  const where = file.replace(".ts", "");
  const courseId = Number(file.match(/\d+/)[0]);

  if (VOCATIONAL.includes(courseId)) {
    const topics = [...src.matchAll(/^  (\d{4}): \{$/gm)].map((m) => ({
      id: m[1],
      at: m.index,
    }));
    for (const [i, t] of topics.entries()) {
      const body = src.slice(t.at, i + 1 < topics.length ? topics[i + 1].at : src.length);
      const tier = /(      Intermediate: `)([\s\S]*?)(`,\n)/.exec(body);
      if (!tier || !/<figure/.test(tier[2])) {
        fail(where, `topic ${t.id} has no figure on the Intermediate tier, which is the one learners land on`);
      }
    }
  }

  for (const [, caption] of src.matchAll(/<figure[^>]*>([\s\S]*?)<\/figure>/g)) {
    if (!/<figcaption>/.test(caption)) {
      fail(where, "a <figure> has no <figcaption>; the sentence saying what to look at is the figure");
    }
    // A photograph has two obligations a drawing does not: it has to describe
    // itself to a screen reader, and almost everything usable from Wikimedia
    // is CC BY-SA, which requires the author and licence to be named.
    if (/<img/.test(caption)) {
      if (!/<img[^>]*\salt="[^"]{4,}"/.test(caption)) {
        fail(where, "an <img> has no usable alt text");
      }
      if (!/class="credit"/.test(caption)) {
        fail(where, "a photo figure has no credit line; CC BY-SA requires the author and licence");
      }
    }
  }

  for (const [svg] of src.matchAll(/<svg[\s\S]*?<\/svg>/g)) {
    figureCount += 1;
    const vb = svg.match(/viewBox="0 0 (\d+) (\d+)"/);
    if (!vb) {
      fail(where, "an <svg> has no viewBox, so it cannot scale into the column");
      continue;
    }
    if (!/aria-label="/.test(svg)) fail(where, "an <svg> has no aria-label");

    const width = Number(vb[1]);
    const labels = [...svg.matchAll(/<text[^>]*>/g)];
    if (!labels.length) {
      fail(where, "an <svg> has no <text> labels, so it is a drawing nobody can read");
    }
    for (const [, size] of svg.matchAll(/font-size="(\d+)"/g)) {
      // Scale the rule to the viewBox, so a figure drawn in a smaller
      // coordinate system is judged on what it renders at, not on its number.
      const units = (Number(size) * 1000) / width;
      if (units < MIN_FONT_UNITS) {
        fail(
          where,
          `an <svg> label is font-size ${size} in a ${width}-unit viewBox, which renders under 10.5px in a reading column (needs ${Math.ceil((MIN_FONT_UNITS * width) / 1000)})`,
        );
      }
    }
    // A label running past the right edge is clipped with no warning.
    for (const [, x] of svg.matchAll(/<text x="(\d+)"/g)) {
      if (Number(x) > width) fail(where, `an <svg> label starts at x=${x}, outside its ${width}-unit viewBox`);
    }
  }
}

console.log(
  `figures ${figureCount} legibility-checked`,
);
console.log(
  `practicals ${practicalCount} | derivations run ${derivationsRun} | worksheet invariants run ${invariantsRun} | scenario graphs walked ${scenarioPaths} | deck cards ${cardCount}`,
);
if (problems.length) {
  console.error(`\n${problems.length} PROBLEM(S):`);
  for (const p of problems) console.error("  " + p);
  process.exit(1);
}
console.log("curriculum OK");
