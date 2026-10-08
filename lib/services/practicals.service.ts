/**
 * Practicals: the proof surfaces that are neither reading nor recall.
 *
 * A coding problem works because a judge can run the answer. Nothing in
 * accounting, refrigeration, a language or a drone build submits to that, so
 * each trade gets the primitive its own assessors already use:
 *
 *   worksheet    a structured grid, marked cell by cell, with method marks
 *   scenario     a branching decision run, scored on the path not the last click
 *   evidence     photo, video or audio of real work, against a rubric
 *   lab          a gated procedure where a safety step cannot be skipped
 *   deck         spaced-repetition recall of terms
 *   speaking     listening, reading aloud, and a scored spoken response
 *   partid       hotspot identification, assembly order, terminal matching
 *   deliverable  a document produced and graded against a published rubric
 *
 * One service module rather than eight because they share the submission
 * envelope: every one of them posts an attempt and gets back a graded result
 * with per-criterion or per-cell feedback. Keeping that envelope identical is
 * what lets the points ledger, the journey board and the certificate treat a
 * brazed joint and a trial balance as the same kind of evidence.
 */

import apiClient from "./api";

const BASE = "/adaptive-quiz/api";

/* ---------------------------------------------------------------- shared --- */

export type PracticalKind =
  | "worksheet"
  | "scenario"
  | "evidence"
  | "lab"
  | "deck"
  | "speaking"
  | "partid"
  | "deliverable";

/** Four described bands, because nobody can tell two adjacent points of ten apart. */
export interface RubricCriterion {
  key: string;
  label: string;
  bands: [string, string, string, string];
  weight: number;
}

/** One criterion as actually awarded. */
export interface RubricAward {
  key: string;
  label: string;
  band: 0 | 1 | 2 | 3;
  /** The band descriptor that was matched, repeated so the UI needs no lookup. */
  descriptor: string;
  comment: string;
}

/**
 * The envelope every practical returns.
 *
 * `status` separates "we marked it" from "a human still has to". An evidence
 * task that claims a score the instant a video is uploaded is lying about what
 * happened, and a learner who later sees that score change loses trust in every
 * other number on the platform.
 */
export interface PracticalResult {
  kind: PracticalKind;
  status: "graded" | "awaiting_review" | "needs_rework";
  /** Marks awarded and available. Null while a human review is pending. */
  score: number | null;
  max_score: number;
  /** Points added to the ledger. Zero until the grade is final. */
  points_awarded: number;
  /** One line a learner reads first. */
  headline: string;
  /** Longer feedback, HTML. */
  detail_html?: string;
  awards?: RubricAward[];
  /** Set when a human has to look at it; ISO date. */
  review_due?: string;
  reviewer?: { name: string; role: string; avatar_url?: string };
}

/* ------------------------------------------------------------- worksheet --- */

export interface WorksheetColumn {
  key: string;
  label: string;
  type: "text" | "number" | "account" | "date" | "select";
  options?: string[];
  flex?: number;
  align?: "left" | "right";
  suffix?: string;
}

export interface WorksheetRow {
  key: string;
  label?: string;
  given?: Record<string, string | number>;
  kind?: "entry" | "subtotal" | "total";
}

export interface WorksheetInvariantSpec {
  key: string;
  label: string;
  kind: "columns-equal" | "column-total" | "cell-is-column-sum";
  cols: string[];
  value?: number;
  cell?: string;
  marks: number;
  hint: string;
}

/**
 * A worksheet as served to the learner.
 *
 * Note what is NOT here: the expected values. Marking happens on submit, and
 * shipping the answer key inside the page the learner is sitting in front of
 * would make the whole surface decorative. The demo honours that even though it
 * has no server, so the same payload works unchanged against a real one.
 */
export interface WorksheetDetail {
  id: number;
  submodule_id: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  brief_html: string;
  stub_label: string;
  columns: WorksheetColumn[];
  rows: WorksheetRow[];
  invariants: WorksheetInvariantSpec[];
  /** Revealed one rung at a time, each costing a fraction of the marks. */
  hints: string[];
  minutes: number;
  max_score: number;
  skills: string[];
  completed: boolean;
}

/** Per-cell outcome. `method` means right given the learner's own earlier figure. */
export interface WorksheetCellVerdict {
  row: string;
  col: string;
  verdict: "correct" | "method" | "wrong" | "blank";
  marks: number;
  of: number;
  expected?: string | number;
  feedback?: string;
}

export interface WorksheetInvariantVerdict {
  key: string;
  label: string;
  satisfied: boolean;
  marks: number;
  of: number;
  /** The two sides, so the learner sees the gap rather than just "unbalanced". */
  left?: number;
  right?: number;
  hint: string;
}

export interface WorksheetResult extends PracticalResult {
  kind: "worksheet";
  cells: WorksheetCellVerdict[];
  invariants: WorksheetInvariantVerdict[];
  /** Marks lost to revealed hints, reported rather than hidden. */
  hint_penalty: number;
  worked_answer_html: string;
}

export type WorksheetEntries = Record<string, Record<string, string>>;

export const practicalsService = {
  getWorksheet: (courseId: number, submoduleId: number, worksheetId: number) =>
    apiClient
      .get<WorksheetDetail>(
        `${BASE}/courses/${courseId}/submodules/${submoduleId}/worksheets/${worksheetId}/`,
      )
      .then((r) => r.data),

  submitWorksheet: (
    courseId: number,
    submoduleId: number,
    worksheetId: number,
    body: { entries: WorksheetEntries; hints_used: number },
  ) =>
    apiClient
      .post<WorksheetResult>(
        `${BASE}/courses/${courseId}/submodules/${submoduleId}/worksheets/${worksheetId}/submit/`,
        body,
      )
      .then((r) => r.data),

  /* ----------------------------------------------------------- scenario --- */

  getScenario: (courseId: number, submoduleId: number, scenarioId: number) =>
    apiClient
      .get<ScenarioDetail>(
        `${BASE}/courses/${courseId}/submodules/${submoduleId}/scenarios/${scenarioId}/`,
      )
      .then((r) => r.data),

  /**
   * Make one choice and find out what it led to.
   *
   * The destination of a choice is never sent to the client, because a learner
   * who can read the graph is not making a decision. So advancing is a round
   * trip: post the path so far, get back the consequence of the last choice and
   * the id of the node it leads to. When that node ends the run the response
   * also carries the full graded result, so the debrief needs no second call.
   *
   * Stateless on purpose. The whole path is posted each time rather than held
   * in a server-side session, so a learner who reloads mid-run is not stranded
   * and two tabs cannot corrupt one attempt.
   */
  advanceScenario: (
    courseId: number,
    submoduleId: number,
    scenarioId: number,
    body: { path: Array<{ node: string; choice: string }> },
  ) =>
    apiClient
      .post<ScenarioAdvance>(
        `${BASE}/courses/${courseId}/submodules/${submoduleId}/scenarios/${scenarioId}/advance/`,
        body,
      )
      .then((r) => r.data),

  /* ----------------------------------------------------------- evidence --- */

  getEvidenceTask: (courseId: number, submoduleId: number, taskId: number) =>
    apiClient
      .get<EvidenceDetail>(
        `${BASE}/courses/${courseId}/submodules/${submoduleId}/evidence/${taskId}/`,
      )
      .then((r) => r.data),

  submitEvidence: (
    courseId: number,
    submoduleId: number,
    taskId: number,
    body: { captures: Array<{ key: string; filename: string; bytes: number; seconds?: number }>; note: string },
  ) =>
    apiClient
      .post<PracticalResult>(
        `${BASE}/courses/${courseId}/submodules/${submoduleId}/evidence/${taskId}/submit/`,
        body,
      )
      .then((r) => r.data),

  /* ---------------------------------------------------------------- lab --- */

  getLab: (courseId: number, submoduleId: number, labId: number) =>
    apiClient
      .get<LabDetail>(`${BASE}/courses/${courseId}/submodules/${submoduleId}/labs/${labId}/`)
      .then((r) => r.data),

  submitLab: (
    courseId: number,
    submoduleId: number,
    labId: number,
    body: {
      steps: Array<{ n: number; confirmed: boolean; reading?: string; captured?: boolean }>;
      elapsed_seconds: number;
    },
  ) =>
    apiClient
      .post<LabResult>(
        `${BASE}/courses/${courseId}/submodules/${submoduleId}/labs/${labId}/submit/`,
        body,
      )
      .then((r) => r.data),

  /* --------------------------------------------------------------- deck --- */

  getDeck: (courseId: number, submoduleId: number, deckId: number) =>
    apiClient
      .get<DeckDetail>(`${BASE}/courses/${courseId}/submodules/${submoduleId}/decks/${deckId}/`)
      .then((r) => r.data),

  /**
   * Record one card review and get its next due interval back.
   *
   * Scheduling is the server's job, not the player's: the interval has to
   * survive the learner closing the tab, and two devices must not disagree
   * about when a card is next due.
   */
  reviewCard: (
    courseId: number,
    submoduleId: number,
    deckId: number,
    body: { card_id: number; grade: 0 | 1 | 2 | 3; typed?: string },
  ) =>
    apiClient
      .post<DeckReviewResult>(
        `${BASE}/courses/${courseId}/submodules/${submoduleId}/decks/${deckId}/review/`,
        body,
      )
      .then((r) => r.data),

  /* ----------------------------------------------------------- speaking --- */

  getSpeakingTask: (courseId: number, submoduleId: number, taskId: number) =>
    apiClient
      .get<SpeakingDetail>(
        `${BASE}/courses/${courseId}/submodules/${submoduleId}/speaking/${taskId}/`,
      )
      .then((r) => r.data),

  submitSpeaking: (
    courseId: number,
    submoduleId: number,
    taskId: number,
    body: { seconds: number; transcript?: string; answers?: Record<number, number> },
  ) =>
    apiClient
      .post<SpeakingResult>(
        `${BASE}/courses/${courseId}/submodules/${submoduleId}/speaking/${taskId}/submit/`,
        body,
      )
      .then((r) => r.data),

  /* ------------------------------------------------------------- partid --- */

  getPartTask: (courseId: number, submoduleId: number, taskId: number) =>
    apiClient
      .get<PartTaskDetail>(
        `${BASE}/courses/${courseId}/submodules/${submoduleId}/parts/${taskId}/`,
      )
      .then((r) => r.data),

  submitPartTask: (
    courseId: number,
    submoduleId: number,
    taskId: number,
    body: {
      labels: Record<string, string>;
      sequence?: string[];
      wiring?: Record<string, string>;
    },
  ) =>
    apiClient
      .post<PartTaskResult>(
        `${BASE}/courses/${courseId}/submodules/${submoduleId}/parts/${taskId}/submit/`,
        body,
      )
      .then((r) => r.data),

  /* -------------------------------------------------------- deliverable --- */

  getDeliverable: (courseId: number, submoduleId: number, deliverableId: number) =>
    apiClient
      .get<DeliverableDetail>(
        `${BASE}/courses/${courseId}/submodules/${submoduleId}/deliverables/${deliverableId}/`,
      )
      .then((r) => r.data),

  submitDeliverable: (
    courseId: number,
    submoduleId: number,
    deliverableId: number,
    body: { files: Array<{ key: string; filename: string; bytes: number }>; note: string },
  ) =>
    apiClient
      .post<DeliverableResult>(
        `${BASE}/courses/${courseId}/submodules/${submoduleId}/deliverables/${deliverableId}/submit/`,
        body,
      )
      .then((r) => r.data),
};

/* -------------------------------------------------------------- scenario --- */

export interface ScenarioChoice {
  id: string;
  label: string;
}

/**
 * One node as served.
 *
 * The outcome text and the delta are withheld until the choice is made, for the
 * same reason a worksheet withholds its answer key: a learner who can see which
 * option scores +3 is not making a decision.
 */
export interface ScenarioNode {
  id: string;
  situation_html: string;
  prompt: string;
  speaker?: string;
  speaker_line?: string;
  choices: ScenarioChoice[];
  ending?: { verdict: "ideal" | "acceptable" | "poor"; title: string; debrief_html: string };
}

export interface ScenarioDetail {
  id: number;
  submodule_id: number;
  title: string;
  blurb: string;
  role: string;
  start: string;
  nodes: ScenarioNode[];
  minutes: number;
  max_score: number;
  skills: string[];
  completed: boolean;
}

export interface ScenarioStepVerdict {
  node: string;
  prompt: string;
  chose: string;
  outcome: string;
  delta: number;
  /** Set when the choice broke a safety or compliance rule. */
  violation?: string;
  cost?: { minutes?: number; rupees?: number };
  /** What the best available choice at this node would have been. */
  best?: string;
}

/** The response to one choice. See `advanceScenario`. */
export interface ScenarioAdvance {
  /** What the choice just made led to. */
  outcome: string;
  cost?: { minutes?: number; rupees?: number };
  violation?: string;
  /** Running tallies, so the header does not have to add up costs itself. */
  minutes_spent: number;
  rupees_spent: number;
  /** The node to show next. Null means the run is over. */
  next_node: string | null;
  /** Present only when `next_node` is null. */
  result?: ScenarioResult;
}

export interface ScenarioResult extends PracticalResult {
  kind: "scenario";
  steps: ScenarioStepVerdict[];
  verdict: "ideal" | "acceptable" | "poor";
  /** Running totals the learner watched accumulate. */
  minutes_spent: number;
  rupees_spent: number;
  violations: string[];
}

/* -------------------------------------------------------------- evidence --- */

export interface EvidenceCaptureSpec {
  key: string;
  label: string;
  medium: "photo" | "video" | "audio";
  seconds?: number;
  must_show: string;
}

export interface EvidenceDetail {
  id: number;
  submodule_id: number;
  title: string;
  brief_html: string;
  captures: EvidenceCaptureSpec[];
  /** Named honestly: these raise the cost of substitution, they do not proctor. */
  integrity: string[];
  rubric: RubricCriterion[];
  exemplar?: Array<{ criterion: string; band: 0 | 1 | 2 | 3; note: string }>;
  minutes: number;
  max_score: number;
  skills: string[];
  completed: boolean;
  /** Typical turnaround, shown before submitting so the wait is not a surprise. */
  review_sla_hours: number;
}

/* ------------------------------------------------------------------- lab --- */

export interface LabStepSpec {
  n: number;
  title: string;
  detail_html: string;
  hazard?: { level: "warning" | "danger"; text: string };
  reading?: { label: string; unit: string; hint: string };
  capture?: { label: string; medium: "photo" | "video" };
  tools?: string[];
  minutes: number;
}

export interface LabDetail {
  id: number;
  submodule_id: number;
  title: string;
  objective: string;
  ppe: string[];
  tools: string[];
  steps: LabStepSpec[];
  max_score: number;
  skills: string[];
  completed: boolean;
}

export interface LabResult extends PracticalResult {
  kind: "lab";
  /** Readings checked against their range, so a plausible-looking number fails. */
  readings: Array<{ n: number; label: string; entered: string; in_range: boolean; note: string }>;
  /** Hazard confirms, kept as an auditable record of the run. */
  hazards_acknowledged: number;
  elapsed_seconds: number;
}

/* ------------------------------------------------------------------ deck --- */

export interface DeckCard {
  id: number;
  front: string;
  back: string;
  extra?: Record<string, string>;
  hint?: string;
  tags: string[];
  /** Null for a card never seen. */
  due_in_days: number | null;
  /** Consecutive correct recalls. Drives the interval. */
  streak: number;
  /** Repeatedly forgotten: surfaced for re-teaching rather than re-drilling. */
  leech: boolean;
}

export interface DeckDetail {
  id: number;
  submodule_id: number;
  title: string;
  blurb: string;
  mode: "type" | "flip";
  lang?: string;
  cards: DeckCard[];
  /** Cards due today, which is what the learner is asked to clear. */
  due_count: number;
  new_count: number;
  skills: string[];
  completed: boolean;
}

export interface DeckReviewResult {
  card_id: number;
  correct: boolean;
  /** Shown when a typed answer was close but not accepted. */
  expected: string;
  streak: number;
  due_in_days: number;
  leech: boolean;
  /** Cards still due in this sitting. */
  remaining: number;
}

/* -------------------------------------------------------------- speaking --- */

export interface SpeakingDetail {
  id: number;
  submodule_id: number;
  title: string;
  kind: "listen" | "read-aloud" | "respond" | "roleplay";
  level: string;
  /** BCP 47. The player reads prompts with the browser's own voice, so no network. */
  lang: string;
  prompt_html: string;
  /** For "listen": what the voice says. Withheld until after the questions. */
  script?: string;
  questions?: Array<{ n: number; question: string; options: string[] }>;
  target?: string;
  focus_sounds?: Array<{ grapheme: string; note: string }>;
  must_mention?: string[];
  turns?: Array<{ speaker: string; line: string; translation: string; expect: string }>;
  seconds: number;
  rubric: RubricCriterion[];
  max_score: number;
  skills: string[];
  completed: boolean;
}

export interface SpeakingResult extends PracticalResult {
  kind: "speaking";
  /** Per-word pronunciation for "read-aloud". */
  words?: Array<{ word: string; score: number; note?: string }>;
  /** Which required content points were actually said. */
  mentioned?: Array<{ point: string; said: boolean }>;
  /** For "listen": the comprehension answers. */
  answers?: Array<{ n: number; correct: boolean; explanation: string }>;
  transcript_shown?: string;
}

/* ---------------------------------------------------------------- partid --- */

export interface PartHotspotSpec {
  key: string;
  x: number;
  y: number;
}

export interface PartTaskDetail {
  id: number;
  submodule_id: number;
  title: string;
  diagram: string;
  brief_html: string;
  /** Position only. The label belongs in `choices`, or the task answers itself. */
  hotspots: PartHotspotSpec[];
  /** The label bank, shuffled. Longer than the hotspot list, so guessing costs. */
  choices: string[];
  sequence?: Array<{ key: string; label: string }>;
  wiring?: { terminals: string[]; leads: string[] };
  minutes: number;
  max_score: number;
  skills: string[];
  completed: boolean;
}

export interface PartTaskResult extends PracticalResult {
  kind: "partid";
  labels: Array<{ key: string; correct: boolean; given: string; expected: string; does: string; confused_with?: string }>;
  sequence?: { correct: boolean; expected: Array<{ label: string; why: string }>; first_wrong_at: number | null };
  wiring?: Array<{ from: string; correct: boolean; expected: string; note: string }>;
}

/* ----------------------------------------------------------- deliverable --- */

export interface DeliverableDetail {
  id: number;
  submodule_id: number;
  title: string;
  brief_html: string;
  requires: Array<{ key: string; label: string; formats: string[]; note: string }>;
  rubric: RubricCriterion[];
  minutes: number;
  max_score: number;
  skills: string[];
  completed: boolean;
  review_sla_hours: number;
}

export interface DeliverableResult extends PracticalResult {
  kind: "deliverable";
  /** Released only once something has been submitted. */
  model_answer_html?: string;
}

export default practicalsService;
