/**
 * Authored curriculum: the real teaching content behind every topic.
 *
 * This exists because the demo's reading surface was a template. One
 * `generatedBody()` function produced the same 163 words for 63 of the 67
 * article topics, with only the title and a bullet list swapped in, and all four
 * reading tiers rendered byte-identical text while the article itself told the
 * reader they differed. A prospect who opens two lessons sees the trick
 * immediately, and the reading surface is exactly where they stop skimming.
 *
 * So content is authored per topic, keyed on the topic id from
 * `lib/demo/db/courses.ts`, and the generator is kept only as a last-resort
 * fallback for a topic nobody has written yet.
 *
 * The tiers are a real product feature, not a label: the same lesson re-rendered
 * for a different assumed background. They must genuinely differ in what they
 * assume, not merely in length.
 */

export type ReadingTier = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export interface AuthoredQuestion {
  /** Stable within its topic; used as the MCQ id. */
  n: number;
  question: string;
  /** Exactly four. Order matters: `answer` is the 0-based index. */
  options: [string, string, string, string];
  answer: 0 | 1 | 2 | 3;
  /**
   * Why the right answer is right AND why the tempting wrong one is wrong.
   * A quiz that only says "Correct!" teaches nothing, and the explanation is
   * the part a prospect reads to judge whether the content is real.
   */
  explanation: string;
  difficulty: "Easy" | "Medium" | "Hard";
  /** Must match one of the topic's concepts so the adaptive selector can use it. */
  skill: string;
}

export interface AuthoredTest {
  args: unknown[];
  expected: unknown;
  /** Shown in the results strip. "basic", "duplicates", "empty input", … */
  label: string;
  hidden?: boolean;
}

export interface AuthoredProblem {
  /** Stable within its topic. */
  n: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  /** HTML, not markdown: the panel injects this directly. */
  statement: string;
  /** Exported function name the tests call. */
  fn: string;
  /** Parameter list, e.g. "nums, target". */
  params: string;
  tests: AuthoredTest[];
  /** Three rungs, nudge first, mechanism last. */
  hints: [string, string, string];
  /** Must pass every test above. Verified by scripts/verify-curriculum.mjs. */
  solution: string;
  skills: string[];
}

export interface AuthoredTopic {
  /** Topic id from lib/demo/db/courses.ts (5000..5069). */
  topicId: number;
  /** Repeated here so a mismatch with courses.ts is caught by the validator. */
  title: string;
  /** One or two sentences. Shown on the card and above the article. */
  summary: string;
  /** Real concepts, not title fragments. These drive the glossary and the quiz. */
  concepts: string[];
  /** Term -> definition. Powers the auto-glossary and "explain this term". */
  glossary: Record<string, string>;
  /** Article body per tier. All four are required and must genuinely differ. */
  body: Record<ReadingTier, string>;
  /** Present only for topics whose `kinds` include "quiz". */
  questions?: AuthoredQuestion[];
  /** Present only for topics whose `kinds` include "coding". */
  problems?: AuthoredProblem[];

  /* --- vocational primitives; each present only when `kinds` says so ------ */
  /** "worksheet": a structured grid graded cell by cell. */
  worksheets?: AuthoredWorksheet[];
  /** "scenario": a branching decision run, scored on the path. */
  scenarios?: AuthoredScenario[];
  /** "evidence": a photo, video or audio capture of real work. */
  evidence?: AuthoredEvidenceTask[];
  /** "lab": a gated procedure with hazard confirms and readings. */
  labs?: AuthoredLab[];
  /** "deck": spaced-repetition recall of terms. */
  decks?: AuthoredDeck[];
  /** "speaking": listening, reading aloud, or a spoken response. */
  speaking?: AuthoredSpeakingTask[];
  /** "partid": hotspot identification, assembly order, terminal matching. */
  parts?: AuthoredPartTask[];
  /** "deliverable": a document produced and graded against a rubric. */
  deliverables?: AuthoredDeliverable[];
}

export type CourseCurriculum = Record<number, AuthoredTopic>;

/* ===========================================================================
 * Vocational content types
 * ===========================================================================
 *
 * Articles, quizzes and coding problems cover a programming course. They do not
 * cover accounting, refrigeration, a language or a drone build, because in those
 * domains the thing a learner must prove is not recall and is not a program a
 * judge can run. It is a document produced correctly, a procedure performed
 * safely, a sentence spoken, or a part named and fitted in the right order.
 *
 * So these are PROOF primitives, not decoration. Each one is a different answer
 * to "how would you know they can do it", and each is authored per topic in the
 * same way a coding problem is: declaratively, with a reference answer the
 * validator can execute. `scripts/verify-curriculum.mjs` checks every one of
 * them, because content that merely looks authored is the failure mode that
 * matters here.
 */

/**
 * A marking rubric, shared by every human-graded or AI-graded primitive.
 *
 * Four bands rather than a 1-10 score: a band needs a description a grader can
 * point at, and ten of them cannot be told apart. `bands[0]` is the lowest.
 */
export interface RubricCriterion {
  key: string;
  label: string;
  /** What each band looks like, worst to best. Index = band score, 0..3. */
  bands: [string, string, string, string];
  /** Relative weight. Need not sum to anything; the player normalises. */
  weight: number;
}

/* --- Worksheet ------------------------------------------------------------ */

/**
 * A column of the grid the learner fills in.
 *
 * `type` drives both the input widget and the comparison: a "number" cell is
 * compared with a tolerance, an "account" cell against a controlled list of
 * account names so "Cash at Bank" and "Bank" both pass.
 */
export interface WorksheetColumn {
  key: string;
  label: string;
  type: "text" | "number" | "account" | "date" | "select";
  /** Allowed values for "select" and "account". */
  options?: string[];
  /** Column width hint, in flex units. */
  flex?: number;
  align?: "left" | "right";
  /** Rendered after the value, e.g. "%" or "kg". */
  suffix?: string;
}

export interface WorksheetRow {
  key: string;
  /** Row label in the stub column. Blank for a free entry row. */
  label?: string;
  /** Cells the learner is GIVEN, keyed by column. Not editable, not marked. */
  given?: Record<string, string | number>;
  /**
   * "entry" is a normal line, "subtotal" and "total" are ruled off and shown
   * bold, which is how an accounting working paper is actually read.
   *
   * IMPORTANT, and the source of two authoring bugs already: this field is not
   * only presentation. A "subtotal" or "total" row is EXCLUDED from every
   * column sum, because a column that included its own total would double it.
   * So a balancing figure is not one of them. A balance carried down, a gross
   * profit carried down and a net profit are all LINES IN the column, and they
   * are precisely what makes the two sides rule off to the same number.
   * Marking one as a subtotal removes it from the sum and the sheet then
   * declares its own answer key unbalanced. Only a row that restates a figure
   * already present in the column below it belongs here.
   */
  kind?: "entry" | "subtotal" | "total";
}

/**
 * How a cell may be derived from the learner's OWN earlier figures.
 *
 * This is what makes method marks possible. A trial balance where the opening
 * stock is wrong but every subsequent total is correct *given that opening
 * stock* is worth most of the marks, and a grader who awards zero for the whole
 * column is not marking accounting. `op` is applied to the learner's current
 * values at `from`, and matching that earns `methodMarks` even when `expected`
 * is a different number.
 */
export interface WorksheetDerivation {
  op: "sum" | "difference" | "product" | "quotient";
  /** Cell references as "row:col". */
  from: string[];
  /**
   * Multiplier applied to the result.
   *
   * Needed for any derivation that is a RATE rather than a combination of
   * cells: a reducing-balance charge is 30% of the carrying amount above it,
   * and without this the derivation evaluated to the carrying amount itself,
   * never matched, and the method marks on that cell could not be earned by
   * anybody. The validator now rejects a derivation that cannot reproduce its
   * own expected value, because a check that cannot fire is not a check.
   */
  factor?: number;
}

export interface WorksheetCell {
  row: string;
  col: string;
  expected: string | number;
  /** Absolute tolerance for numbers. Defaults to 0.01. */
  tolerance?: number;
  /** Full marks for the right answer. */
  marks: number;
  /** Other spellings or synonyms accepted in full. */
  accepts?: string[];
  /** Shown when the answer is wrong. Say why, not "incorrect". */
  feedback?: string;
  /** Enables method marks. See WorksheetDerivation. */
  derivedFrom?: WorksheetDerivation;
  /** Marks awarded for a figure consistent with the learner's own inputs. */
  methodMarks?: number;
}

/**
 * A structural rule the whole sheet must satisfy.
 *
 * Declarative on purpose: no expression to evaluate, so the same definition can
 * be checked in the browser, in the validator, and later on a Django server
 * without three copies of an interpreter. Debits equalling credits is the rule
 * every accounting learner must internalise, and it is checkable without
 * knowing a single expected value.
 */
export interface WorksheetInvariant {
  key: string;
  label: string;
  kind:
    | "columns-equal"      // sum(cols[0]) == sum(cols[1])
    | "column-total"       // sum(cols[0]) == value
    | "cell-is-column-sum"; // cell at `cell` == sum of cols[0] over entry rows
  cols: string[];
  value?: number;
  cell?: string;
  marks: number;
  /** Shown while the rule is unsatisfied. Must name the mechanism. */
  hint: string;
}

export interface AuthoredWorksheet {
  n: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  /** HTML. The scenario, the figures, and what is being asked for. */
  brief: string;
  /** Stub column heading, e.g. "Particulars". */
  stubLabel: string;
  columns: WorksheetColumn[];
  rows: WorksheetRow[];
  cells: WorksheetCell[];
  invariants: WorksheetInvariant[];
  /** Three rungs, nudge first, mechanism last. */
  hints: [string, string, string];
  /** Shown after submission. HTML: the full worked answer. */
  workedAnswer: string;
  minutes: number;
  skills: string[];
}

/* --- Branching scenario --------------------------------------------------- */

export interface ScenarioChoice {
  id: string;
  label: string;
  /** What happens, shown the moment it is chosen. */
  outcome: string;
  /** Node to move to, or null to finish the run. */
  next: string | null;
  /** -3..3. Summed across the path to grade the run, not the last answer. */
  delta: number;
  /** What the choice costs. Shown as a running tally, which is the lesson. */
  cost?: { minutes?: number; rupees?: number };
  /** Set when the choice breaks a safety or compliance rule. Flags the run. */
  violation?: string;
}

export interface ScenarioNode {
  id: string;
  /** HTML. The scene as it stands now. */
  situation: string;
  /** The question put to the learner. */
  prompt: string;
  /** For dialogue scenarios: who is talking, and what they say. */
  speaker?: string;
  speakerLine?: string;
  choices?: ScenarioChoice[];
  /** A terminal node. Has no choices; carries the debrief instead. */
  ending?: {
    verdict: "ideal" | "acceptable" | "poor";
    title: string;
    /** HTML. What the path cost, and what a professional would have done. */
    debrief: string;
  };
}

export interface AuthoredScenario {
  n: number;
  title: string;
  blurb: string;
  /** Who the learner is for the duration. "You are the service technician on call." */
  role: string;
  start: string;
  nodes: ScenarioNode[];
  /** Node ids of the best path. The validator checks it reaches an "ideal" end. */
  idealPath: string[];
  minutes: number;
  skills: string[];
}

/* --- Evidence task -------------------------------------------------------- */

export interface AuthoredEvidenceTask {
  n: number;
  title: string;
  /** HTML. What to do with your hands, away from the screen. */
  brief: string;
  /** Each separate capture the submission must contain. */
  captures: Array<{
    key: string;
    label: string;
    medium: "photo" | "video" | "audio";
    /** For video and audio. */
    seconds?: number;
    /** What must be visible or audible in it for the capture to count. */
    mustShow: string;
  }>;
  /**
   * Anti-substitution requirements.
   *
   * This is not proctoring and the product must not claim it is. The aim is to
   * make borrowing someone else's photo expensive: an enrolment id written on
   * paper in frame, a reading taken at a stated time, the same joint shot from
   * two angles in one clip.
   */
  integrity: string[];
  rubric: RubricCriterion[];
  /** A graded example, so the learner sees the standard before submitting. */
  exemplar?: { criterion: string; band: 0 | 1 | 2 | 3; note: string }[];
  minutes: number;
  skills: string[];
}

/* --- Guided lab ----------------------------------------------------------- */

export interface LabStep {
  n: number;
  title: string;
  /** HTML. The instruction, in the imperative. */
  detail: string;
  /**
   * A hazard that must be acknowledged. "danger" steps cannot be advanced past
   * without the confirm, which is the whole point of running a procedure as a
   * gated stepper rather than a page of prose nobody reads to the end.
   */
  hazard?: { level: "warning" | "danger"; text: string };
  /** A measurement the learner takes and enters, checked against a range. */
  reading?: { label: string; unit: string; min: number; max: number; hint: string };
  /** An evidence capture at this step. */
  capture?: { label: string; medium: "photo" | "video" };
  tools?: string[];
  minutes: number;
}

export interface AuthoredLab {
  n: number;
  title: string;
  objective: string;
  /** Personal protective equipment, confirmed before step 1 unlocks. */
  ppe: string[];
  tools: string[];
  steps: LabStep[];
  skills: string[];
}

/* --- Term deck ------------------------------------------------------------ */

export interface DeckCard {
  id: number;
  front: string;
  back: string;
  /** Extra fields shown on the back: gender, plural, an example sentence. */
  extra?: Record<string, string>;
  /** Accepted typed answers besides `back`. Case and accents are normalised. */
  accepts?: string[];
  hint?: string;
  tags: string[];
}

export interface AuthoredDeck {
  n: number;
  title: string;
  blurb: string;
  /** "type" grades a typed recall; "flip" is learner-rated recognition. */
  mode: "type" | "flip";
  /** Language of the front face, for the speech-synthesis read-out. */
  lang?: string;
  cards: DeckCard[];
  skills: string[];
}

/* --- Speaking and listening ---------------------------------------------- */

export interface AuthoredSpeakingTask {
  n: number;
  title: string;
  kind: "listen" | "read-aloud" | "respond" | "roleplay";
  /** CEFR level or equivalent descriptor. */
  level: string;
  /** BCP 47 tag. Drives the browser's own speech synthesis, so this works offline. */
  lang: string;
  /** HTML. What the learner has to do. */
  prompt: string;
  /** "listen": what the voice says. Also the transcript revealed afterwards. */
  script?: string;
  /** "listen": comprehension questions on the audio. */
  questions?: AuthoredQuestion[];
  /** "read-aloud": the text to read. */
  target?: string;
  /** "read-aloud": the sounds being assessed, and what goes wrong. */
  focusSounds?: Array<{ grapheme: string; note: string }>;
  /** "respond" and "roleplay": content a complete answer has to contain. */
  mustMention?: string[];
  /** "roleplay": the other side's turns, in order. */
  turns?: Array<{ speaker: string; line: string; translation: string; expect: string }>;
  seconds: number;
  rubric: RubricCriterion[];
  skills: string[];
}

/* --- Part identification and assembly ------------------------------------ */

export interface PartHotspot {
  key: string;
  label: string;
  /** Percent of the diagram's width and height. */
  x: number;
  y: number;
  /** Revealed once identified. What the part is for. */
  does: string;
  /** The part learners pick instead, and how to tell them apart. */
  confusedWith?: string;
}

export interface AuthoredPartTask {
  n: number;
  title: string;
  /** Which bundled diagram to draw. See components/practicals/diagrams. */
  diagram: "drone-exploded" | "refrigeration-cycle" | "ac-wiring" | "drone-power";
  /** HTML. */
  brief: string;
  hotspots: PartHotspot[];
  /** Stage two: put these in the order they are fitted. Presented shuffled. */
  sequence?: Array<{ key: string; label: string; why: string }>;
  /** Stage three: match a terminal to what lands on it. */
  wiring?: Array<{ from: string; to: string; note: string }>;
  minutes: number;
  skills: string[];
}

/* --- Artifact deliverable ------------------------------------------------- */

/**
 * A document the learner produces and submits, graded against a published
 * rubric. This is the upgrade of the old `SubjectiveQuestion` slot, which was a
 * textarea and a hope.
 */
export interface AuthoredDeliverable {
  n: number;
  title: string;
  /** HTML. The commission, written the way a client or employer would write it. */
  brief: string;
  requires: Array<{ key: string; label: string; formats: string[]; note: string }>;
  rubric: RubricCriterion[];
  /** HTML. Released after submission, never before. */
  modelAnswer?: string;
  minutes: number;
  skills: string[];
}
