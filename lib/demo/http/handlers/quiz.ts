/**
 * The adaptive quiz.
 *
 * This is the screen where the word "adaptive" is either true or marketing, so
 * the selector genuinely steers: answer correctly and the next question is
 * harder, miss one and it steps back down. Ability and standard error move per
 * skill on every answer, and the session ends when either the estimate is
 * confident enough or the question cap is reached - the same two exit conditions
 * the real engine uses.
 *
 * Session state lives in the visitor overlay, so a quiz survives a reload and a
 * prospect can leave one half-finished and come back to it.
 */

import { defineRoutes } from "../router";
import { badRequest, notFound, type DemoRequest } from "../types";
import { COURSES, topicById } from "../../db/courses";
import { bankForTopic, type DemoMcq } from "../../db/quiz-bank";
import { loadCourseCurriculum } from "../../db/curriculum";
import { conceptsFor } from "./adaptive-courses";
import { overlay, nextDemoId } from "../../db/overlay";
import { iso, isoDaysAgo, nowMs } from "../../clock";
import { seededInt } from "../../random";

const MODULE = "quiz";

type Difficulty = "Easy" | "Medium" | "Hard";

interface AnswerRecord {
  mcqId: number;
  selected: string;
  correct: boolean;
  confidence: number | null;
  timeMs: number;
  pointsEarned: number;
  pointsBase: number;
  answeredAt: string;
}

interface QuizSession {
  id: string;
  configId: number;
  topicId: number;
  courseId: number;
  status: "active" | "completed" | "abandoned";
  startedAt: string;
  completedAt: string | null;
  askedIds: number[];
  answers: AnswerRecord[];
  hintsUsed: number;
  /** Per-skill ability estimate, roughly -3..3. */
  ability: Record<string, number>;
  /** Per-skill standard error. Falls as evidence accumulates. */
  se: Record<string, number>;
  /** Difficulty the selector is currently aiming at. */
  targetDifficulty: Difficulty;
  /**
   * The question currently on screen.
   *
   * Stored, not recomputed. `sessionDetail` used to call the selector afresh on
   * every fetch, so the question the client displayed could differ from the one
   * recorded in `askedIds` - and a question already answered could be served
   * again a few steps later. Pinning it here makes "the current question" a fact
   * about the session rather than the output of a function that runs twice.
   */
  pendingId: number | null;
  servedAt: string | null;
}

const MIN_QUESTIONS = 6;
const MAX_QUESTIONS = 12;
const SE_THRESHOLD = 0.42;
const HINT_TOKENS = 3;
const BASE_POINTS: Record<Difficulty, number> = { Easy: 40, Medium: 60, Hard: 90 };

const sessionKey = (id: string) => `quiz:session:${id}`;

function loadSession(id: string): QuizSession | null {
  return overlay.get<QuizSession | null>(sessionKey(id), null);
}

function saveSession(session: QuizSession): QuizSession {
  overlay.set(sessionKey(session.id), session);
  overlay.update<string[]>("quiz:sessions", [], (list) =>
    list.includes(session.id) ? list : [session.id, ...list],
  );
  return session;
}

function requireSession(id: string): QuizSession {
  const session = loadSession(id);
  if (!session) throw notFound("Quiz session not found");
  return session;
}

/** Quiz config ids are topic ids offset by a fixed namespace. */
function topicForConfig(configId: number) {
  return topicById(configId - 200_000);
}

function bankFor(session: QuizSession): DemoMcq[] {
  const found = topicById(session.topicId);
  if (!found) return [];
  // topicId is passed so the topic's own authored questions lead the bank. The
  // course chunk is warmed when the session starts, so this stays synchronous.
  return bankForTopic(session.courseId, conceptsFor(found.topic), session.topicId);
}

/**
 * Pick the next question: unasked, as close to the target difficulty as the bank
 * allows. Falling back through neighbouring difficulties (rather than giving up)
 * matters because a course bank has only a handful at each level.
 */
function selectQuestion(session: QuizSession): DemoMcq | null {
  const bank = bankFor(session);
  const remaining = bank.filter((q) => !session.askedIds.includes(q.id));
  if (remaining.length === 0) return null;

  const order: Difficulty[] =
    session.targetDifficulty === "Hard"
      ? ["Hard", "Medium", "Easy"]
      : session.targetDifficulty === "Easy"
        ? ["Easy", "Medium", "Hard"]
        : ["Medium", "Hard", "Easy"];

  for (const level of order) {
    const match = remaining.find((q) => q.difficulty === level);
    if (match) return match;
  }
  return remaining[0];
}

/** Probability the learner answers this correctly, from ability vs difficulty. */
function predictedPCorrect(session: QuizSession, question: DemoMcq): number {
  const ability = session.ability[question.skill] ?? 0;
  const b = question.difficulty === "Easy" ? -0.8 : question.difficulty === "Hard" ? 1.0 : 0;
  // Standard 1-parameter logistic (Rasch) response curve.
  return Number((1 / (1 + Math.exp(-(ability - b)))).toFixed(2));
}

function rationaleFor(session: QuizSession, question: DemoMcq): string {
  const answered = session.answers.length;
  if (answered === 0) {
    return `Starting at ${question.difficulty.toLowerCase()} on ${question.skill} to find your level.`;
  }
  const last = session.answers[session.answers.length - 1];
  if (last.correct) {
    return `You got the last one right, so this steps up to ${question.difficulty.toLowerCase()} on ${question.skill}.`;
  }
  return `That last answer missed, so this drops back to ${question.difficulty.toLowerCase()} on ${question.skill} to rebuild.`;
}

/**
 * The decay curve for one question, in the exact shape the live HUD reads.
 *
 * `grace` seconds at full credit, then `dec` points shed per `iv` seconds, down
 * to `floor`. Sending only some of these fields is what made the HUD render
 * "NaN / 60": it computes the running value from all of them.
 */
function decayCurve(question: DemoMcq) {
  const base = BASE_POINTS[question.difficulty];
  return {
    base,
    grace: 20,
    dec: 5,
    iv: 10,
    floor: Math.round(base * 0.45),
    hint_penalty: 0.1,
  };
}

/**
 * Award for an answer, computed from the SAME curve the HUD is given, so the
 * number counting down on screen is the number actually granted. Deriving these
 * separately is how a learner watches "42 pts" tick down and then gets 38.
 */
function pointsFor(question: DemoMcq, elapsedMs: number, correct: boolean): { earned: number; base: number } {
  const curve = decayCurve(question);
  if (!correct) return { earned: 0, base: curve.base };

  const seconds = Math.max(0, elapsedMs / 1000);
  const overGrace = Math.max(0, seconds - curve.grace);
  const intervals = Math.floor(overGrace / curve.iv);
  const earned = Math.max(curve.floor, curve.base - intervals * curve.dec);
  return { earned: Math.round(earned), base: curve.base };
}

function toApiQuestion(session: QuizSession, question: DemoMcq) {
  return {
    mcq_id: question.id,
    question_text: question.question,
    options: question.options,
    target_skill: question.skill,
    difficulty_label: question.difficulty,
    selector_rationale: rationaleFor(session, question),
    predicted_p_correct: predictedPCorrect(session, question),
    points: decayCurve(question),
    served_at: session.servedAt,
  };
}

function questionById(session: QuizSession, mcqId: number): DemoMcq | null {
  return bankFor(session).find((q) => q.id === mcqId) ?? null;
}

/** Whether the session has met either exit condition. */
/**
 * Record one answer and move the estimates.
 *
 * Pulled out of the answer route so the seeded-session builder can replay
 * answers through the engine rather than hand-writing a plausible-looking
 * session. A hand-written one drifts from the engine the first time scoring
 * changes, and the results page then shows numbers the product cannot produce.
 */
function applyAnswer(
  session: QuizSession,
  question: DemoMcq,
  selected: string,
  timeMs: number,
  confidence: number | null,
  answeredAt: string,
) {
  const correct = selected === question.correct;
  const { earned, base } = pointsFor(question, timeMs, correct);

  const skill = question.skill;
  const before = session.ability[skill] ?? 0;
  // Move the estimate toward the answer, damped by how much evidence we already
  // have for this skill, so later answers move it less than the first.
  const evidence = session.answers.filter((a) => questionById(session, a.mcqId)?.skill === skill).length;
  const step = 0.8 / (1 + evidence * 0.5);
  const after = Number((before + (correct ? step : -step)).toFixed(3));

  session.ability[skill] = after;
  const priorSe = session.se[skill] ?? 1.0;
  session.se[skill] = Number(Math.max(0.25, priorSe * 0.82).toFixed(3));

  session.answers.push({
    mcqId: question.id,
    selected,
    correct,
    confidence,
    timeMs,
    pointsEarned: earned,
    pointsBase: base,
    answeredAt,
  });

  // Steer the next question.
  session.targetDifficulty = correct
    ? question.difficulty === "Easy"
      ? "Medium"
      : "Hard"
    : question.difficulty === "Hard"
      ? "Medium"
      : "Easy";

  return { correct, before, after, earned, base, skill };
}

/**
 * Sessions a completed topic claims to have, but that nobody ever sat.
 *
 * A topic marked done in the seeded progress advertises
 * `last_session_id: "sess-<topicId>"`, and the results link on the submodule
 * page goes straight to it. No such session was ever created, so every one of
 * those links landed on "Quiz session not found" - on a course the seed says
 * the visitor has finished. Only quizzes actually taken in the browser, which
 * get a `qs-` id, ever worked.
 *
 * Rather than drop the link or store a fixture, the session is built the first
 * time it is asked for, by replaying real questions from the topic's own bank
 * through `applyAnswer`. So the ability estimates, standard errors, points and
 * difficulty steering on the results page are the ones the engine would have
 * produced, and they stay right when the engine changes.
 */
const SEEDED_SESSION = /^sess-(\d+)$/;

/** Config ids are topic ids offset by the namespace `topicForConfig` undoes. */
const configForTopic = (topicId: number) => topicId + 200_000;

function buildSeededSession(id: string, topicId: number): QuizSession | null {
  const found = topicById(topicId);
  if (!found) return null;

  /**
   * Only build what the product actually claims.
   *
   * `quizFor` advertises `sess-<topicId>` when the topic reads as done, which
   * in the seed means progress 100 on a topic that has a quiz. Building one
   * for any id of that shape would invent a completed attempt for a topic the
   * visitor has never opened, which is a worse failure than the 404: the
   * results page would show them a history they do not have. Every drone topic
   * is seeded at 0 progress, so those ids should still 404.
   */
  if (found.topic.progress !== 100 || !found.topic.kinds.includes("quiz")) return null;

  const session: QuizSession = {
    id,
    configId: configForTopic(topicId),
    topicId,
    courseId: found.course.id,
    status: "active",
    startedAt: isoDaysAgo(3, 10, 12),
    completedAt: null,
    askedIds: [],
    answers: [],
    hintsUsed: 0,
    ability: {},
    se: {},
    targetDifficulty: "Medium",
    pendingId: null,
    servedAt: null,
  };

  for (let i = 0; i < MAX_QUESTIONS; i += 1) {
    const question = selectQuestion(session);
    if (!question) break;
    session.askedIds.push(question.id);
    // Seeded, not random: which questions this visitor missed has to be the
    // same on every reload, or the results page rewrites its own history.
    const correct = seededInt(`quiz:${topicId}:${question.id}:correct`, 0, 9) > 2;
    // `correct` holds an option id, and options are objects, so the distractor
    // is the first option whose id differs rather than the first that is not
    // equal to the string.
    const wrong = question.options.find((o) => o.id !== question.correct)?.id ?? question.correct;
    applyAnswer(
      session,
      question,
      correct ? question.correct : wrong,
      seededInt(`quiz:${topicId}:${question.id}:ms`, 9_000, 48_000),
      seededInt(`quiz:${topicId}:${question.id}:conf`, 2, 5),
      isoDaysAgo(3, 10, 14 + i * 2),
    );
    if (isComplete(session)) break;
  }

  // An empty bank would otherwise produce a results page with no questions on
  // it, which is a worse lie than the 404 this replaces.
  if (session.answers.length === 0) return null;

  session.status = "completed";
  session.completedAt = isoDaysAgo(3, 10, 14 + session.answers.length * 2);
  session.pendingId = null;
  return saveSession(session);
}

/**
 * Resolve a session id for the read paths, materialising a seeded one once.
 *
 * Async because the question bank needs the course chunk warm, exactly as the
 * start route does. The write paths keep the strict sync lookup: there is
 * nothing to answer, hint on or abandon in a session that is already finished.
 */
async function resolveSession(id: string): Promise<QuizSession> {
  const existing = loadSession(id);
  if (existing) return existing;

  const match = SEEDED_SESSION.exec(id);
  if (match) {
    const topicId = Number(match[1]);
    const found = topicById(topicId);
    if (found) {
      // A visitor who has just taken this quiz has a real session with a `qs-`
      // id, but the submodule payload still advertises the `sess-` one. Hand
      // back the genuine attempt rather than a fabricated one, or finishing a
      // quiz and clicking through to the results would show someone else's.
      const real = latestSessionFor(configForTopic(topicId));
      if (real) return real;

      await loadCourseCurriculum(found.course.id);
      const built = buildSeededSession(id, topicId);
      if (built) return built;
    }
  }
  throw notFound("Quiz session not found");
}

function isComplete(session: QuizSession): boolean {
  const answered = session.answers.length;
  if (answered >= MAX_QUESTIONS) return true;
  if (answered < MIN_QUESTIONS) return false;
  const errors = Object.values(session.se);
  const avgSe = errors.length ? errors.reduce((a, b) => a + b, 0) / errors.length : 1;
  return avgSe <= SE_THRESHOLD;
}

function avgSe(session: QuizSession): number | null {
  const errors = Object.values(session.se);
  if (errors.length === 0) return null;
  return Number((errors.reduce((a, b) => a + b, 0) / errors.length).toFixed(3));
}

function sessionDetail(session: QuizSession) {
  const found = topicById(session.topicId);
  // Read the pinned question; never re-select here (see `pendingId`).
  const pending =
    session.status === "active" && session.pendingId != null
      ? questionById(session, session.pendingId)
      : null;

  return {
    id: session.id,
    status: session.status,
    started_at: session.startedAt,
    completed_at: session.completedAt,
    question_count: session.answers.length,
    hints_used: session.hintsUsed,
    ability_state: session.ability,
    se_state: session.se,
    pending_question: pending ? toApiQuestion(session, pending) : null,
    server_now: iso(new Date(nowMs())),
    points_so_far: session.answers.reduce((sum, a) => sum + a.pointsEarned, 0),
    ai_narration: null,
    ai_narration_generated_at: null,
    config: {
      id: session.configId,
      quiz_title: found ? `${found.topic.title} - check your understanding` : "Adaptive quiz",
      is_active: true,
      target_skills: found ? conceptsFor(found.topic) : [],
      min_questions: MIN_QUESTIONS,
      max_questions: MAX_QUESTIONS,
      se_threshold: SE_THRESHOLD,
      confidence_prompt_enabled: true,
      hint_tokens: HINT_TOKENS,
    },
    responses: session.answers.map((answer, index) => {
      const q = questionById(session, answer.mcqId);
      return {
        // 0-based. Every consumer renders `order_index + 1` and
        // MisconceptionCallout keys its correctness map on the raw value, so
        // emitting 1-based here numbered the question pills 2 to 7.
        order_index: index,
        mcq: answer.mcqId,
        mcq_detail: {
          id: answer.mcqId,
          question_text: q?.question ?? "",
          options: q?.options ?? [],
          correct_option: q?.correct ?? "",
          difficulty_level: q?.difficulty ?? "Medium",
          explanation: q?.explanation ?? "",
        },
        target_skill: q?.skill ?? "",
        selected_option: answer.selected,
        is_correct: answer.correct,
        confidence: answer.confidence,
        time_ms: answer.timeMs,
        points_earned: answer.pointsEarned,
        answered_at: answer.answeredAt,
      };
    }),
    source_attempt: null,
  };
}


/**
 * The visitor's latest session for a quiz config, for the library card's CTA.
 *
 * `quiz:sessions` is a list of session IDS, newest first, not of session
 * objects: each session is stored under its own overlay key.
 */
function latestSessionFor(configId: number): QuizSession | null {
  for (const id of overlay.get<string[]>("quiz:sessions", [])) {
    const session = loadSession(id);
    if (session?.configId === configId) return session;
  }
  return null;
}

defineRoutes(MODULE, {
  /**
   * The standalone quiz library.
   *
   * Returns a BARE ARRAY, not a `{results}` envelope: `listQuizzes` hands the
   * response straight to the page, which calls `.filter` on it. When nothing
   * answered this route the page crashed with "v.filter is not a function",
   * which is the whole reason shape matters more than presence here.
   *
   * The library is built from the course topics that actually carry a quiz, so
   * every card opens onto real authored questions rather than a stub.
   */
  "GET /adaptive-quiz/api/quizzes/": () => {
    const rows: Array<Record<string, unknown>> = [];
    for (const course of COURSES) {
      for (const m of course.modules) {
        for (const t of m.topics) {
          if (!t.kinds.includes("quiz")) continue;
          const configId = t.id + 200_000;
          const session = latestSessionFor(configId);
          rows.push({
            config_id: configId,
            quiz_title: `${t.title} - check your understanding`,
            course_id: course.id,
            course_title: course.title,
            target_skills: conceptsFor(t).slice(0, 4),
            min_questions: 6,
            max_questions: 12,
            mcq_count: 10,
            hint_tokens: 3,
            is_personal: false,
            is_archived: false,
            latest_session_id: session?.id ?? null,
            latest_session_status: session?.status ?? null,
            updated_at: isoDaysAgo(seededInt(`quizupd:${t.id}`, 2, 40)),
          });
        }
      }
    }
    return rows;
  },

  "POST /adaptive-quiz/api/sessions/start/": async (req) => {
    const configId = Number(req.body?.config_id);
    const found = topicForConfig(configId);
    if (!found) throw notFound("Quiz not found");
    // Warm the course chunk once, here. Every later call in this session reads
    // the authored questions out of the warm cache synchronously.
    await loadCourseCurriculum(found.course.id);

    const session: QuizSession = {
      id: `qs-${nextDemoId("quiz")}`,
      configId,
      topicId: found.topic.id,
      courseId: found.course.id,
      status: "active",
      startedAt: iso(new Date(nowMs())),
      completedAt: null,
      askedIds: [],
      answers: [],
      hintsUsed: 0,
      ability: {},
      se: {},
      // Everyone starts in the middle; the first answer is what moves it.
      targetDifficulty: "Medium",
      pendingId: null,
      servedAt: iso(new Date(nowMs())),
    };

    const first = selectQuestion(session);
    if (first) {
      session.askedIds.push(first.id);
      session.pendingId = first.id;
    }
    saveSession(session);

    return {
      session_id: session.id,
      first_question: first ? toApiQuestion(session, first) : null,
      meta: {
        min_questions: MIN_QUESTIONS,
        max_questions: MAX_QUESTIONS,
        target_skills: conceptsFor(found.topic),
        confidence_prompt_enabled: true,
        hint_tokens: HINT_TOKENS,
      },
    };
  },

  "GET /adaptive-quiz/api/sessions/:sessionId/": async (req) =>
    sessionDetail(await resolveSession(req.params.sessionId)),

  "POST /adaptive-quiz/api/sessions/:sessionId/answer/": (req) => submitAnswer(req),

  "POST /adaptive-quiz/api/sessions/:sessionId/abandon/": (req) => {
    const session = requireSession(req.params.sessionId);
    session.status = "abandoned";
    session.completedAt = iso(new Date(nowMs()));
    saveSession(session);
    return { status: "abandoned" };
  },

  "POST /adaptive-quiz/api/sessions/:sessionId/hint/": (req) => {
    const session = requireSession(req.params.sessionId);
    if (session.hintsUsed >= HINT_TOKENS) {
      throw badRequest({ detail: "You have used all your hints for this quiz." });
    }
    session.hintsUsed += 1;
    saveSession(session);

    const pending = session.pendingId != null ? questionById(session, session.pendingId) : null;
    return {
      teaser: pending
        ? `This one is about ${pending.skill.toLowerCase()}. Rule out the two options that describe a different mechanism.`
        : "Rule out the options that describe a different mechanism.",
      hint: pending
        ? pending.explanation.split(". ")[0] + "."
        : "Re-read the question for the word that constrains the answer.",
      hints_remaining: HINT_TOKENS - session.hintsUsed,
    };
  },

  "GET /adaptive-quiz/api/sessions/": () => {
    const ids = overlay.get<string[]>("quiz:sessions", []);
    return ids
      .map((id) => loadSession(id))
      .filter((s): s is QuizSession => s !== null)
      .map((session) => {
        const found = topicById(session.topicId);
        const correct = session.answers.filter((a) => a.correct).length;
        return {
          session_id: session.id,
          config_id: session.configId,
          quiz_title: found ? `${found.topic.title} - check your understanding` : "Adaptive quiz",
          status: session.status,
          question_count: session.answers.length,
          correct_count: correct,
          accuracy: session.answers.length ? correct / session.answers.length : 0,
          time_total_ms: session.answers.reduce((sum, a) => sum + a.timeMs, 0),
          started_at: session.startedAt,
          completed_at: session.completedAt,
          has_narration: false,
          is_personal: false,
        };
      });
  },

  "GET /adaptive-quiz/api/sessions/:sessionId/remediation-progress/": async (req) => {
    const session = await resolveSession(req.params.sessionId);
    const wrong = session.answers.filter((a) => !a.correct).length;
    return {
      steps: [
        { step: 1, content_type: "article", done: true },
        { step: 2, content_type: "quiz", done: wrong === 0 },
      ],
      content_done: true,
      requiz: { done: false, session_id: null, status: null },
    };
  },

  /** A re-quiz seeded from a previous attempt, focused on what was missed. */
  "POST /adaptive-quiz/api/sessions/:sessionId/requiz/": async (req) => {
    const source = await resolveSession(req.params.sessionId);
    const session: QuizSession = {
      ...source,
      id: `qs-${nextDemoId("quiz")}`,
      status: "active",
      startedAt: iso(new Date(nowMs())),
      completedAt: null,
      askedIds: [],
      answers: [],
      hintsUsed: 0,
      pendingId: null,
      servedAt: iso(new Date(nowMs())),
    };
    const first = selectQuestion(session);
    if (first) {
      session.askedIds.push(first.id);
      session.pendingId = first.id;
    }
    saveSession(session);
    return { session_id: session.id, config_id: session.configId };
  },

  /**
   * Narration sections for the results page. The real backend generates these
   * off-thread and the client polls; returning "ready" immediately is the honest
   * demo equivalent, since there is no worker to wait for.
   */
  "POST /adaptive-quiz/api/sessions/:sessionId/narration/:section/": (req) => narration(req),
  "GET /adaptive-quiz/api/sessions/:sessionId/narration/:section/": (req) => narration(req),
});

function submitAnswer(req: DemoRequest) {
  const session = requireSession(req.params.sessionId);
  if (session.status !== "active") throw badRequest({ detail: "This quiz is already finished." });

  const mcqId = Number(req.body?.mcq_id);
  const selected = String(req.body?.selected_option ?? "");
  const question = questionById(session, mcqId);
  if (!question) throw badRequest({ detail: "Unknown question." });

  const timeMs = Number(req.body?.time_ms ?? 0);
  const { correct, before, after, earned, base, skill } = applyAnswer(
    session,
    question,
    selected,
    timeMs,
    req.body?.confidence ?? null,
    iso(new Date(nowMs())),
  );

  const complete = isComplete(session);
  let next: DemoMcq | null = null;
  if (!complete) {
    next = selectQuestion(session);
    if (next) {
      session.askedIds.push(next.id);
      session.pendingId = next.id;
    }
    session.servedAt = iso(new Date(nowMs()));
  }

  // Running out of bank ends the session too; a quiz that cannot serve a
  // question must not sit on a blank screen waiting for one.
  if (complete || !next) {
    session.status = "completed";
    session.completedAt = iso(new Date(nowMs()));
    session.pendingId = null;
  }

  saveSession(session);

  return {
    is_correct: correct,
    theta_delta: { [skill]: { before, after, se: session.se[skill] } },
    next_question: next ? toApiQuestion(session, next) : null,
    session_complete: session.status === "completed",
    progress: {
      answered: session.answers.length,
      min_questions: MIN_QUESTIONS,
      max_questions: MAX_QUESTIONS,
      avg_se: avgSe(session),
    },
    ability_state: session.ability,
    se_state: session.se,
    points_earned: earned,
    points_base: base,
  };
}

/**
 * Per-skill mastery for the results heatmap, derived from the session's own
 * ability and standard-error state rather than stored alongside it.
 *
 * `theta` runs about -3..3, so the percentage is that mapped onto 0..100 and
 * clamped. `delta_pct` is null throughout because this demo keeps no prior
 * attempt to compare against, which is exactly what the field means: the UI
 * swaps the change chip for a "First attempt" badge.
 */
function skillMastery(session: QuizSession) {
  return Object.keys(session.ability).map((skill) => {
    const theta = session.ability[skill] ?? 0;
    const pct = Math.max(0, Math.min(100, Math.round(((theta + 3) / 6) * 100)));
    const band =
      pct >= 85 ? "mastered" : pct >= 70 ? "proficient" : pct >= 50 ? "developing" : "emerging";
    return {
      skill,
      theta,
      se: session.se[skill] ?? 1,
      mastery_pct: pct,
      delta_pct: null,
      previous_mastery_pct: null,
      band,
    };
  });
}

async function narration(req: DemoRequest) {
  const session = await resolveSession(req.params.sessionId);
  const section = req.params.section;
  const correct = session.answers.filter((a) => a.correct).length;
  const total = session.answers.length;
  const accuracy = total ? Math.round((correct / total) * 100) : 0;

  const wrongSkills = [
    ...new Set(
      session.answers
        .filter((a) => !a.correct)
        .map((a) => questionById(session, a.mcqId)?.skill)
        .filter((s): s is string => Boolean(s)),
    ),
  ];

  /**
   * Every section's payload is shaped to `AdaptiveAINarration` in
   * lib/types/adaptive-quiz.ts, because the results page destructures those
   * fields without guarding them.
   *
   * The previous shapes were invented and three of them were wrong. The
   * headline left out `skill_mastery`, which the hook assigns straight to
   * state and the page then reads `.length` on. Misconceptions returned
   * `{skill, misconception, fix}` where the component reads `title`,
   * `explanation` and `evidence_question_indices`, and crashed on the last
   * one. Remediation returned a `{steps}` object where an array is expected.
   * The results page was unreachable for every session, not only the seeded
   * ones; the seeded ids 404'd first and hid it.
   */
  const value =
    section === "headline"
      ? {
          headline: `${correct} of ${total} correct - ${accuracy}%.`,
          subtext: wrongSkills.length
            ? `The gaps clustered in ${wrongSkills.join(" and ")}.`
            : "No weak spots in this attempt. The next quiz will start harder.",
          score_summary: {
            correct,
            total,
            accuracy: total ? correct / total : 0,
            time_total_ms: session.answers.reduce((sum, a) => sum + a.timeMs, 0),
          },
          skill_mastery: skillMastery(session),
          target_outcome: null,
        }
      : section === "per_question"
        ? session.answers.map((answer, i) => {
            const q = questionById(session, answer.mcqId);
            return {
              // Matches `order_index`, which the breakdown looks up by.
              index: i,
              rationale: q?.explanation ?? "",
              correct_concept: q?.skill ?? "",
              your_mistake: answer.correct
                ? null
                : `You chose an option that describes a related but different mechanism.`,
              diagram_suggestion: null,
            };
          })
        : section === "misconceptions"
          ? wrongSkills.map((skill) => ({
              title: `${skill}: the neighbouring mechanism`,
              // Positions of the answers that evidence this pattern, on the
              // same 0-based footing as `order_index`, which the trail keys
              // its correctness map on. An empty array is fine here; a missing
              // one crashes the component.
              evidence_question_indices: session.answers
                .map((a, i) => (!a.correct && questionById(session, a.mcqId)?.skill === skill ? i : -1))
                .filter((i) => i >= 0),
              explanation: `Your wrong answers on ${skill} picked the option that describes a related but different mechanism.`,
              fix: `Re-read the ${skill} section of the lesson, then retry. That is usually one short session.`,
            }))
          : [
              {
                step: 1,
                title: "Re-read the section you missed",
                why: wrongSkills.length
                  ? `The gaps were in ${wrongSkills.join(" and ")}.`
                  : "A quick refresh before the next attempt.",
                action_kind: "read",
                target_skill: wrongSkills[0] ?? "",
                est_minutes: 8,
                content_type: "article",
                course_id: session.courseId,
                submodule_id: session.topicId,
                article_id: session.topicId + 100_000,
                content_id: null,
              },
              {
                step: 2,
                title: "Re-quiz on just those skills",
                why: "A targeted second attempt is what moves the estimate.",
                action_kind: "requiz",
                target_skill: wrongSkills[0] ?? "",
                est_minutes: 6,
                content_type: "requiz",
                course_id: session.courseId,
                submodule_id: session.topicId,
                article_id: null,
                content_id: null,
              },
            ];

  return { section, status: "ready", value };
}
