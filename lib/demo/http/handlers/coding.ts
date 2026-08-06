/**
 * The coding workspace.
 *
 * The learner's JavaScript is EXECUTED, in their own browser, against the
 * problem's real test cases. A coding screen where "Run" returns a canned pass
 * is the most obvious fake in a demo of a learning platform, and the first thing
 * a technical evaluator tries to break. Running it for real costs a `new
 * Function` and a comparison, and it means the failing-case table, the mentor
 * diagnosis and the points are all consequences of what was actually typed.
 *
 * Other languages cannot be executed here, and the demo says so rather than
 * inventing a verdict.
 */

import { defineRoutes } from "../router";
import { badRequest, notFound, type DemoRequest } from "../types";
import { topicById } from "../../db/courses";
import { CODING_PROBLEMS, problemAt, type CodingTest, type DemoCodingProblem } from "../../db/coding-bank";
import { overlay, nextDemoId } from "../../db/overlay";
import { iso, nowMs } from "../../clock";

const MODULE = "coding";

const HINT_LAYERS = 3;
const BASE_POINTS: Record<DemoCodingProblem["difficulty"], number> = {
  Easy: 60,
  Medium: 90,
  Hard: 130,
};

interface CodingSessionState {
  id: string;
  problemId: number;
  problemIndex: number;
  configId: number;
  language: string;
  status: "active" | "completed" | "abandoned";
  runCount: number;
  submitCount: number;
  hintsRevealed: number;
  passed: boolean;
  lastSource: string;
  startedAt: string;
  completedAt: string | null;
  latestSubmissionId: number | null;
}

const sessionKey = (id: string) => `coding:session:${id}`;

function loadSession(id: string): CodingSessionState | null {
  return overlay.get<CodingSessionState | null>(sessionKey(id), null);
}

function saveSession(s: CodingSessionState): CodingSessionState {
  overlay.set(sessionKey(s.id), s);
  overlay.update<string[]>("coding:sessions", [], (list) =>
    list.includes(s.id) ? list : [s.id, ...list],
  );
  return s;
}

function requireSession(id: string): CodingSessionState {
  const s = loadSession(id);
  if (!s) throw notFound("Coding session not found");
  return s;
}

/**
 * Map a generated problem id back to a bank problem.
 *
 * Coding-set problem ids are `topic.id + 300_000 + n` for n in 1..4, so the
 * offset within the set picks the bank entry deterministically: the same id
 * always resolves to the same problem.
 */
function resolveProblem(problemId: number): { problem: DemoCodingProblem; index: number } {
  for (let offset = 1; offset <= 4; offset++) {
    const topicId = problemId - 300_000 - offset;
    const found = topicById(topicId);
    if (found) {
      const index = (topicId + offset) % CODING_PROBLEMS.length;
      return { problem: problemAt(index), index };
    }
  }
  // An id we did not generate still resolves to something real rather than 404,
  // so a deep link a prospect was given can never dead-end.
  const index = Math.abs(problemId) % CODING_PROBLEMS.length;
  return { problem: problemAt(index), index };
}

function apiProblem(problemId: number, problem: DemoCodingProblem) {
  return {
    id: problemId,
    title: problem.title,
    difficulty_level: problem.difficulty,
    problem_statement: problem.statement,
    input_format: problem.inputFormat,
    output_format: problem.outputFormat,
    sample_input: problem.sampleInput,
    sample_output: problem.sampleOutput,
    constraints: problem.constraints,
    template_code: problem.templates,
    tags: problem.skills.join(", "),
    target_skills: problem.skills,
    topic: problem.topic,
  };
}

/** Stable, readable rendering of a value for the results table. */
function show(value: unknown): string {
  return JSON.stringify(value);
}

interface CaseOutcome {
  index: number;
  input: string;
  expected: string;
  actual: string;
  verdict: string;
  passed: boolean;
  stderr: string | null;
  compile_output: string | null;
}

/**
 * Execute the learner's JavaScript against a set of tests.
 *
 * `new Function` rather than eval so the source cannot reach this module's
 * scope, and each case is wrapped so one throwing test reports as a failure
 * instead of aborting the whole run.
 */
function runJavaScript(source: string, problem: DemoCodingProblem, tests: CodingTest[]) {
  let fn: ((...args: unknown[]) => unknown) | null = null;
  let compileError: string | null = null;

  try {
    const factory = new Function(
      `"use strict";\n${source}\n;return typeof ${problem.fnName} === "function" ? ${problem.fnName} : null;`,
    );
    fn = factory() as ((...args: unknown[]) => unknown) | null;
  } catch (error) {
    compileError = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
  }

  if (!compileError && !fn) {
    compileError = `No function named ${problem.fnName} was defined. Keep the function name from the template.`;
  }

  const results: CaseOutcome[] = tests.map((test, i) => {
    const base = {
      index: i,
      input: test.args.map(show).join(", "),
      expected: show(test.expected),
    };
    if (compileError) {
      return { ...base, actual: "", verdict: "Compilation Error", passed: false, stderr: null, compile_output: compileError };
    }
    try {
      // Structured-clone the arguments so a solution that mutates its input
      // cannot corrupt the cases that follow.
      const args = JSON.parse(JSON.stringify(test.args)) as unknown[];
      const actual = fn!(...args);
      const passed = show(actual) === show(test.expected);
      return {
        ...base,
        actual: show(actual),
        verdict: passed ? "Accepted" : "Wrong Answer",
        passed,
        stderr: null,
        compile_output: null,
      };
    } catch (error) {
      return {
        ...base,
        actual: "",
        verdict: "Runtime Error",
        passed: false,
        stderr: error instanceof Error ? `${error.name}: ${error.message}` : String(error),
        compile_output: null,
      };
    }
  });

  const passed = results.filter((r) => r.passed).length;
  return {
    results,
    passed,
    failed: results.length - passed,
    total: results.length,
    first_failing_index: results.findIndex((r) => !r.passed) === -1 ? null : results.findIndex((r) => !r.passed),
    compile_error: compileError,
    status: compileError ? "Compilation Error" : passed === results.length ? "Accepted" : "Wrong Answer",
    all_passed: !compileError && passed === results.length,
  };
}

/** Languages other than JavaScript have no runner here, and the demo says so. */
function unsupportedLanguage(language: string, tests: CodingTest[]) {
  const note =
    `This demo runs JavaScript in your browser, so ${language} cannot be executed here. ` +
    `Switch the editor to JavaScript to have your solution graded for real against these cases.`;
  return {
    results: tests.map((test, i) => ({
      index: i,
      input: test.args.map(show).join(", "),
      expected: show(test.expected),
      actual: "",
      verdict: "Not Run",
      passed: false,
      stderr: null,
      compile_output: note,
    })),
    passed: 0,
    failed: tests.length,
    total: tests.length,
    first_failing_index: 0,
    compile_error: note,
    status: "Not Run",
    all_passed: false,
  };
}

function grade(session: CodingSessionState, source: string, tests: CodingTest[]) {
  const { problem } = resolveProblem(session.problemId);
  return session.language === "javascript"
    ? runJavaScript(source, problem, tests)
    : unsupportedLanguage(session.language, tests);
}

/** Mentor feedback derived from the actual failure, not a generic paragraph. */
function diagnose(
  problem: DemoCodingProblem,
  outcome: ReturnType<typeof runJavaScript>,
): { whats_wrong: string; root_cause_line: number | null; root_cause_excerpt: string; conceptual_gap: string; strengths: string[] } | null {
  if (outcome.all_passed) return null;

  if (outcome.compile_error) {
    return {
      whats_wrong: "Your code did not compile, so none of the cases ran.",
      root_cause_line: null,
      root_cause_excerpt: outcome.compile_error,
      conceptual_gap: "Syntax and function signature",
      strengths: [],
    };
  }

  const failing = outcome.results.find((r) => !r.passed);
  const runtime = failing?.stderr;

  if (runtime) {
    return {
      whats_wrong: `Your solution threw on the "${failing?.input}" case: ${runtime}`,
      root_cause_line: null,
      root_cause_excerpt: runtime,
      conceptual_gap: "Edge-case handling",
      strengths: outcome.passed > 0 ? [`${outcome.passed} case(s) already pass, so the core idea works.`] : [],
    };
  }

  return {
    whats_wrong: `On input ${failing?.input} your solution returned ${failing?.actual}, but the expected answer is ${failing?.expected}.`,
    root_cause_line: null,
    root_cause_excerpt: `${failing?.input} -> ${failing?.actual}`,
    conceptual_gap: problem.skills[0] ?? "Problem decomposition",
    strengths:
      outcome.passed > 0
        ? [`${outcome.passed} of ${outcome.total} cases pass, so the approach is close.`]
        : ["You have a runnable solution to iterate on."],
  };
}

function decayCurve(problem: DemoCodingProblem) {
  const base = BASE_POINTS[problem.difficulty];
  return { base, grace: 120, dec: 5, iv: 60, floor: Math.round(base * 0.4), hint_penalty: 0.1 };
}

function pointsFor(session: CodingSessionState, problem: DemoCodingProblem): number {
  const curve = decayCurve(problem);
  const elapsed = (nowMs() - new Date(session.startedAt).getTime()) / 1000;
  const intervals = Math.floor(Math.max(0, elapsed - curve.grace) / curve.iv);
  const afterDecay = Math.max(curve.floor, curve.base - intervals * curve.dec);
  const afterHints = afterDecay * (1 - session.hintsRevealed * (curve.hint_penalty ?? 0));
  return Math.max(0, Math.round(afterHints));
}

function apiSession(session: CodingSessionState) {
  const { problem } = resolveProblem(session.problemId);
  return {
    id: session.id,
    config: session.configId,
    problem: apiProblem(session.problemId, problem),
    language: session.language,
    status: session.status,
    run_count: session.runCount,
    submit_count: session.submitCount,
    hints_revealed: session.hintsRevealed,
    passed: session.passed,
    last_source: session.lastSource || problem.templates[session.language] || problem.templates.javascript,
    allow_clipboard: true,
    points: decayCurve(problem),
    server_now: iso(new Date(nowMs())),
    started_at: session.startedAt,
    completed_at: session.completedAt,
    latest_submission: null,
  };
}

defineRoutes(MODULE, {
  "GET /adaptive-coding/api/problems/:problemId/": (req) => {
    const problemId = Number(req.params.problemId);
    const { problem } = resolveProblem(problemId);
    return apiProblem(problemId, problem);
  },

  "POST /adaptive-coding/api/sessions/start/": (req) => {
    const problemId = Number(req.body?.problem_id ?? req.body?.problemId);
    const configId = Number(req.body?.config_id ?? 0);
    const { problem, index } = resolveProblem(problemId);
    // JavaScript by default because it is the language this demo can actually
    // execute; offering a default it cannot run would be the wrong first
    // impression on the one screen where execution is the point.
    const language = String(req.body?.language ?? "javascript");

    const session: CodingSessionState = {
      id: `cs-${nextDemoId("coding")}`,
      problemId,
      problemIndex: index,
      configId,
      language,
      status: "active",
      runCount: 0,
      submitCount: 0,
      hintsRevealed: 0,
      passed: false,
      lastSource: problem.templates[language] ?? problem.templates.javascript,
      startedAt: iso(new Date(nowMs())),
      completedAt: null,
      latestSubmissionId: null,
    };
    saveSession(session);
    return apiSession(session);
  },

  /**
   * Peek at an existing session without creating one, so the workspace can show
   * its "ready to begin" gate before the timer starts.
   *
   * The response is WRAPPED as `{ active }`. Returning a bare session (or bare
   * null) crashed the page with "Cannot read properties of null (reading
   * 'active')" — the caller reads `data.active`, so null must be inside the
   * envelope, not instead of it.
   */
  "GET /adaptive-coding/api/sessions/active/": (req) => {
    const problemId = Number(req.query.get("problem_id") ?? 0);
    const ids = overlay.get<string[]>("coding:sessions", []);
    const match = ids
      .map(loadSession)
      .find((s): s is CodingSessionState => s !== null && s.status === "active" && (!problemId || s.problemId === problemId));
    return { active: match ? apiSession(match) : null };
  },

  "GET /adaptive-coding/api/sessions/:sessionId/": (req) =>
    apiSession(requireSession(req.params.sessionId)),

  /** Run: sample cases only, so hidden cases stay hidden until submit. */
  "POST /adaptive-coding/api/sessions/:sessionId/run/": (req) => {
    const session = requireSession(req.params.sessionId);
    const source = String(req.body?.source ?? session.lastSource);
    if (req.body?.language) session.language = String(req.body.language);
    session.lastSource = source;
    session.runCount += 1;
    saveSession(session);

    const { problem } = resolveProblem(session.problemId);
    const visible = problem.tests.filter((t) => !t.hidden);
    const outcome = grade(session, source, visible);

    return {
      submission_id: nextDemoId("coding-submission"),
      test_results: outcome,
      diagnosis: diagnose(problem, outcome),
    };
  },

  /** Submit: every case, including the hidden ones. */
  "POST /adaptive-coding/api/sessions/:sessionId/submit/": (req) => {
    const session = requireSession(req.params.sessionId);
    const source = String(req.body?.source ?? session.lastSource);
    if (req.body?.language) session.language = String(req.body.language);
    session.lastSource = source;
    session.submitCount += 1;

    const { problem } = resolveProblem(session.problemId);
    const outcome = grade(session, source, problem.tests);

    if (outcome.all_passed) {
      session.passed = true;
      session.status = "completed";
      session.completedAt = iso(new Date(nowMs()));
    }
    saveSession(session);

    const skill = problem.skills[0] ?? "Algorithms";
    const before = session.passed ? 0.55 : 0.4;
    const after = outcome.all_passed ? Math.min(0.95, before + 0.18) : before;

    return {
      submission_id: nextDemoId("coding-submission"),
      grade: {
        status: outcome.status ?? "",
        passed: outcome.passed,
        failed: outcome.failed,
        total: outcome.total,
        all_passed: outcome.all_passed,
        results: outcome.results,
        first_failing_index: outcome.first_failing_index,
        compile_error: outcome.compile_error,
      },
      diagnosis: diagnose(problem, outcome),
      optimization_challenge: outcome.all_passed
        ? {
            offer: true,
            challenge:
              problem.difficulty === "Easy"
                ? "Now do it in one pass, without sorting."
                : "Can you cut the extra space to O(1) without changing the time complexity?",
            focus_skill: skill,
          }
        : null,
      mastery_delta: {
        [skill]: {
          before,
          after,
          band: after >= 0.75 ? "proficient" : after >= 0.5 ? "developing" : "emerging",
        },
      },
      points_earned: outcome.all_passed ? pointsFor(session, problem) : 0,
    };
  },

  /** Hints are layered: nudge, then approach, then the mechanism. */
  "POST /adaptive-coding/api/sessions/:sessionId/hint/": (req) => {
    const session = requireSession(req.params.sessionId);
    const { problem } = resolveProblem(session.problemId);

    if (session.hintsRevealed >= HINT_LAYERS) {
      return {
        layer: HINT_LAYERS,
        title: problem.hints[HINT_LAYERS - 1].title,
        body: problem.hints[HINT_LAYERS - 1].body,
        reveals_code: true,
        hints_revealed: session.hintsRevealed,
        hint_layers: HINT_LAYERS,
        exhausted: true,
      };
    }

    const hint = problem.hints[session.hintsRevealed];
    session.hintsRevealed += 1;
    saveSession(session);

    return {
      layer: session.hintsRevealed,
      title: hint.title,
      body: hint.body,
      reveals_code: hint.revealsCode,
      hints_revealed: session.hintsRevealed,
      hint_layers: HINT_LAYERS,
      exhausted: session.hintsRevealed >= HINT_LAYERS,
    };
  },

  "GET /adaptive-coding/api/problems/:problemId/submissions/": () => [],

  "GET /adaptive-coding/api/sessions/": () => {
    const ids = overlay.get<string[]>("coding:sessions", []);
    return ids
      .map(loadSession)
      .filter((s): s is CodingSessionState => s !== null)
      .map((s) => {
        const { problem } = resolveProblem(s.problemId);
        return {
          id: s.id,
          config_id: s.configId,
          problem_id: s.problemId,
          problem_title: problem.title,
          language: s.language,
          status: s.status,
          passed: s.passed,
          run_count: s.runCount,
          submit_count: s.submitCount,
          started_at: s.startedAt,
          completed_at: s.completedAt,
        };
      });
  },

  "GET /adaptive-coding/api/student-model/": () => ({
    skills: [
      { skill: "Algorithms", mastery: 0.62, band: "developing" },
      { skill: "Data Structures", mastery: 0.71, band: "proficient" },
      { skill: "Hash maps", mastery: 0.58, band: "developing" },
      { skill: "Sliding window", mastery: 0.44, band: "emerging" },
    ],
    open_misconceptions: [],
    updated_at: iso(new Date(nowMs())),
  }),

  /** The scratch runner in the article reader. */
  "POST /adaptive-quiz/api/run-snippet/": (req) => runSnippet(req),
});

/**
 * The article reader's inline snippet runner. Captures console output from the
 * learner's JavaScript so the "try it" box in a lesson genuinely evaluates.
 */
function runSnippet(req: DemoRequest) {
  const source = String(req.body?.source ?? req.body?.code ?? "");
  const language = String(req.body?.language ?? "javascript");

  if (language !== "javascript") {
    return {
      stdout: "",
      stderr: null,
      compile_output: `This demo executes JavaScript only, so ${language} snippets are not run here.`,
      status: "Not Run",
    };
  }
  if (!source.trim()) throw badRequest({ detail: "Nothing to run." });

  const lines: string[] = [];
  try {
    const log = (...args: unknown[]) =>
      lines.push(args.map((a) => (typeof a === "string" ? a : JSON.stringify(a))).join(" "));
    new Function("console", `"use strict";\n${source}`)({ log, info: log, warn: log, error: log });
    return { stdout: lines.join("\n"), stderr: null, compile_output: null, status: "Accepted" };
  } catch (error) {
    return {
      stdout: lines.join("\n"),
      stderr: error instanceof Error ? `${error.name}: ${error.message}` : String(error),
      compile_output: null,
      status: "Runtime Error",
    };
  }
}
