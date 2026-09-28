/**
 * The course catalogue.
 *
 * One definition per course, projected into whichever shape an endpoint needs —
 * the legacy `lms/.../courses/` list, the adaptive dashboard card, the catalogue
 * page, the journey board. A prospect who sees "62% complete" on the dashboard
 * and then opens the course must find 62% there too, and the only way to
 * guarantee that is for both to be computed from the same record.
 *
 * Content is real curriculum rather than lorem: the fastest way to lose a room is
 * a course card reading "Module 1 / Module 2 / Module 3".
 */

import { avatarFor } from "./avatar";
import { INSTRUCTOR_PERSONA, FACULTY, type DemoPerson } from "./people";
import { subjectAccent, subjectOf, type SubjectKey } from "./subjects";
import { subjectCover } from "../illustrations/subjectCover";
import { daysAhead, isoDaysAgo, isoDaysAhead } from "../clock";
import { seededInt } from "../random";

export interface DemoTopic {
  id: number;
  title: string;
  /**
   * Learning content types this topic contains, in order.
   *
   * "video" is supported everywhere (handlers, points, journey counts) but is
   * deliberately UNUSED by the seed. The player is a Vimeo iframe, and this demo
   * is required to run with no network at all, so a video step could only ever
   * render as a dead embed - worse than not offering it.
   *
   * To turn video back on: drop an MP4 into /public and point the companion at
   * it, switch the player from the Vimeo iframe to a <video> element, then add
   * "video" back to whichever topics should have it. Everything downstream
   * already handles it.
   */
  kinds: Array<"article" | "video" | "quiz" | "coding" | "assignment">;
  /** 0-100. 100 = finished, 0 = untouched. */
  progress: number;
}

export interface DemoModule {
  id: number;
  title: string;
  summary: string;
  topics: DemoTopic[];
}

export interface DemoCourse {
  id: number;
  /**
   * The school subject. Drives the colour, the icon and the cover illustration
   * through `lib/demo/db/subjects.ts`, so a course is the same colour on the
   * dashboard, in the catalogue and on its own page by construction rather than
   * by three surfaces agreeing to use the same hex.
   */
  subject: SubjectKey;
  title: string;
  subtitle: string;
  description: string;
  slug: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  durationHours: number;
  tags: string[];
  instructor: DemoPerson;
  /** Whether the signed-in student persona is enrolled. */
  enrolled: boolean;
  /**
   * Overall completion for the enrolled student, 0-100.
   *
   * DERIVED from the topics below, never hand-set. When it was a literal, the
   * journey board reported "62% complete" beside "9 / 21 steps done" — 43% —
   * because the two came from different places. Computing it from the topics
   * means the course card, the readiness ring, the progress bar and the step
   * count are all the same number by construction.
   */
  completion: number;
  /** Accent used for the generated card art. */
  accent: [string, string];
  modules: DemoModule[];
  /**
   * Days from today until the current week's work is due. Null = self-paced.
   *
   * Null on every course, deliberately. The journey board runs unlocked
   * (`contentLocked: false`), whose banner reads "no due dates, no late
   * penalties" — so a dashboard card promising "Due Aug 10 - 4 days left" for
   * the same course contradicted it two clicks away. AI Linc is a self-paced
   * institution; deadlines are worth demonstrating on the admin side, where an
   * administrator sets them, rather than faked on the learner side.
   *
   * The field stays because the shape is real and an admin-side demo may set it.
   */
  dueInDays: number | null;
  certificateThreshold: number;
  enrolledCount: number;
  rating: number;
  ratingCount: number;
}

/**
 * Cover art, drawn per subject.
 *
 * This was a map of Unsplash photo ids, one per course, each one fetched and
 * looked at before being written down. That care was right for a catalogue of
 * five engineering courses and pointless here: there is no stock photograph of
 * "Grade 7 fractions" that is not a posed picture of a child at a desk, which is
 * both generic and a photograph of a minor.
 *
 * Covers are illustrations now, keyed on the SUBJECT rather than the course id,
 * so a second Maths course gets the right cover without anyone adding a row. See
 * `lib/demo/illustrations/subjectCover.ts`.
 */

/** The cover illustration for a course. */
export function courseCover(courseId: number, width = 800): string {
  const course = COURSES.find((c) => c.id === courseId);
  // Width picks the variant rather than scaling: the wide one widens the plate
  // around the drawing instead of cropping it, which is what a page header needs.
  return course ? subjectCover(course.subject, width > 1000 ? "wide" : "card") : "";
}

/**
 * Card art for a course.
 *
 * Every consumer uses this as the fallback when a cover fails to load. It returns
 * the subject illustration, so a failure degrades to the same picture rather than
 * to initials on a gradient - and since both are inline data URIs now, there is
 * nothing left that can fail.
 *
 * Still accepts the structural shape rather than a course, because the course
 * builder calls it for a course that does not exist yet.
 */
export function courseArt(course: { title: string; accent: [string, string]; subject?: SubjectKey }): string {
  return subjectCover(course.subject ?? "maths", "card");
}

/**
 * Topic ids start at 6000, not 5000.
 *
 * The authored curriculum in db/curriculum is keyed by topic id, and the tech
 * courses used 5000-5069. Reusing those ids would have served a lesson on SQL
 * NULL semantics inside "Adding and subtracting fractions" - the worst possible
 * failure, because it looks like working content.
 */
let topicSeq = 6000;
function topic(
  title: string,
  kinds: DemoTopic["kinds"],
  progress: number,
): DemoTopic {
  return { id: topicSeq++, title, kinds, progress };
}

let moduleSeq = 3000;
function courseModule(title: string, summary: string, topics: DemoTopic[]): DemoModule {
  return { id: moduleSeq++, title, summary, topics };
}

/** A course as authored: everything except the completion we compute from it. */
type CourseSeed = Omit<DemoCourse, "completion">;

const COURSE_SEEDS: readonly CourseSeed[] = [
  {
    id: 301,
    subject: "maths",
    title: "Fractions, Decimals and Shapes",
    subtitle: "The number work Grade 7 is built on",
    description:
      "Split things up, put them back together, and find out how much space a shape takes. " +
      "Every topic starts with something you can draw, because a fraction you can picture is a " +
      "fraction you can work with.",
    slug: "fractions-decimals-and-shapes",
    difficulty: "Beginner",
    durationHours: 26,
    tags: ["Grade 7", "Fractions", "Decimals", "Geometry"],
    instructor: FACULTY[0],
    enrolled: true,
    accent: subjectAccent("maths"),
    dueInDays: null,
    certificateThreshold: 70,
    enrolledCount: 118,
    rating: 4.6,
    ratingCount: 74,
    modules: [
      courseModule(
        "Numbers you can split",
        "What a fraction really is, and how to add one to another without guessing.",
        [
          topic("Fractions on a number line", ["article", "quiz"], 100),
          topic("Adding and subtracting fractions", ["article", "quiz"], 100),
          topic("Multiplying and dividing fractions", ["article", "quiz"], 60),
        ],
      ),
      courseModule(
        "Decimals and percentages",
        "The same numbers wearing different clothes, and where you meet them.",
        [
          topic("Decimals are fractions in disguise", ["article", "quiz"], 20),
          topic("Percentages, discounts and marks", ["article", "quiz"], 0),
        ],
      ),
      courseModule(
        "Shapes and space",
        "Measuring the world: angles, edges and the space inside them.",
        [
          topic("Angles and what triangles must obey", ["article", "quiz"], 0),
          topic("Area and perimeter you can check", ["article", "assignment"], 0),
        ],
      ),
    ],
  },
  {
    id: 302,
    subject: "science",
    title: "Matter, Motion and Living Things",
    subtitle: "Why things are, move and grow",
    description:
      "One year of science in three questions: what is everything made of, what makes it move, " +
      "and what makes something alive. Each topic ends with an experiment you could actually run " +
      "at a kitchen table.",
    slug: "matter-motion-and-living-things",
    difficulty: "Beginner",
    durationHours: 28,
    tags: ["Grade 7", "Physics", "Chemistry", "Biology"],
    instructor: FACULTY[1],
    enrolled: true,
    accent: subjectAccent("science"),
    dueInDays: null,
    certificateThreshold: 70,
    enrolledCount: 124,
    rating: 4.8,
    ratingCount: 91,
    modules: [
      courseModule(
        "What everything is made of",
        "Solids, liquids, gases, and what happens at the edges between them.",
        [
          topic("The three states of matter", ["article", "quiz"], 100),
          topic("Melting, boiling and the energy behind them", ["article", "quiz"], 100),
          topic("Mixtures, and how to pull them apart", ["article", "quiz"], 45),
        ],
      ),
      courseModule(
        "Forces and motion",
        "Nothing moves or stops without a reason, and the reason has a name.",
        [
          topic("Push, pull and friction", ["article", "quiz"], 0),
          topic("Speed, distance and time", ["article", "quiz"], 0),
        ],
      ),
      courseModule(
        "Living things",
        "From one cell to a whole food chain.",
        [
          topic("Cells: the smallest living thing", ["article", "quiz"], 0),
          topic("How plants make their own food", ["article", "quiz"], 0),
          topic("Food chains and what happens when one link goes", ["article", "assignment"], 0),
        ],
      ),
    ],
  },
  {
    id: 303,
    subject: "english",
    title: "Reading Closely, Writing Clearly",
    subtitle: "Say what you mean, and catch what others mean",
    description:
      "Read a page and work out what it is really telling you, then write something a reader " +
      "cannot misunderstand. Every writing task is short, and every one gets marked on whether " +
      "it lands, not on how long it is.",
    slug: "reading-closely-writing-clearly",
    difficulty: "Beginner",
    durationHours: 22,
    tags: ["Grade 7", "Reading", "Writing", "Comprehension"],
    instructor: FACULTY[2],
    enrolled: true,
    accent: subjectAccent("english"),
    dueInDays: null,
    certificateThreshold: 70,
    enrolledCount: 121,
    rating: 4.5,
    ratingCount: 68,
    modules: [
      courseModule(
        "Reading like a detective",
        "The answer is on the page. Finding it is a skill you can practise.",
        [
          topic("Finding the main idea", ["article", "quiz"], 100),
          topic("Reading between the lines", ["article", "quiz"], 30),
          topic("What a character wants, and how you know", ["article", "quiz"], 0),
        ],
      ),
      courseModule(
        "Writing that carries",
        "A paragraph that holds together, and an argument somebody might agree with.",
        [
          topic("Paragraphs that hold together", ["article", "assignment"], 0),
          topic("Describing something so a reader sees it", ["article", "assignment"], 0),
          topic("Making an argument, and being fair to the other side", ["article", "assignment"], 0),
        ],
      ),
    ],
  },
  {
    id: 304,
    subject: "social",
    title: "Maps, Empires and Citizens",
    subtitle: "Where we live, how we got here, and the rules we share",
    description:
      "Geography, history and civics as one story. Why people settled where they did, what " +
      "happened when settlements grew into empires, and how a group of people decides anything " +
      "at all.",
    slug: "maps-empires-and-citizens",
    difficulty: "Beginner",
    durationHours: 24,
    tags: ["Grade 7", "Geography", "History", "Civics"],
    instructor: FACULTY[0],
    enrolled: false,
    accent: subjectAccent("social"),
    dueInDays: null,
    certificateThreshold: 70,
    enrolledCount: 96,
    rating: 4.4,
    ratingCount: 52,
    modules: [
      courseModule(
        "Reading the Earth",
        "A map is an argument about what matters. Here is how to read one.",
        [
          topic("Maps, scale and what gets left out", ["article", "quiz"], 0),
          topic("Climate, rivers and where people settle", ["article", "quiz"], 0),
        ],
      ),
      courseModule(
        "How we got here",
        "The first cities, and what trade did to them.",
        [
          topic("The first cities and why they formed", ["article", "quiz"], 0),
          topic("Empires, trade routes and the things that travelled", ["article", "quiz"], 0),
        ],
      ),
      courseModule(
        "Being a citizen",
        "Rules, rights, and who gets to decide.",
        [
          topic("Rights, rules and the difference", ["article", "quiz"], 0),
          topic("How a village governs itself", ["article", "assignment"], 0),
        ],
      ),
    ],
  },
  {
    id: 305,
    subject: "computing",
    title: "Your First Programs",
    subtitle: "Tell a computer exactly what to do",
    description:
      "Write real programs from the first lesson. A computer does precisely what you say and " +
      "nothing you meant, which is frustrating for about a week and then becomes the most useful " +
      "thing you know.",
    slug: "your-first-programs",
    difficulty: "Beginner",
    durationHours: 30,
    tags: ["Grade 7", "Programming", "Logic", "Problem solving"],
    instructor: INSTRUCTOR_PERSONA,
    enrolled: true,
    accent: subjectAccent("computing"),
    dueInDays: null,
    certificateThreshold: 70,
    enrolledCount: 103,
    rating: 4.9,
    ratingCount: 87,
    modules: [
      courseModule(
        "Talking to a computer",
        "What a program is, and the box that remembers things for you.",
        [
          topic("What a program actually is", ["article", "quiz"], 100),
          topic("Variables: boxes with names", ["article", "coding"], 70),
          topic("Getting input and showing output", ["article", "coding"], 0),
        ],
      ),
      courseModule(
        "Making decisions",
        "Programs that do different things depending on what they find.",
        [
          topic("If, else, and asking a question", ["article", "coding"], 0),
          topic("Loops: doing it again without writing it again", ["article", "coding"], 0),
        ],
      ),
      courseModule(
        "Building something",
        "Enough pieces to make a program worth showing somebody.",
        [
          topic("Lists: keeping many things at once", ["article", "coding"], 0),
          topic("Project: a quiz game that keeps score", ["assignment"], 0),
        ],
      ),
    ],
  },
  {
    id: 306,
    subject: "art",
    title: "Colour, Shape and Making",
    subtitle: "Look harder, then make something",
    description:
      "Half looking and half making. You will learn why some colours fight and others agree, " +
      "how to draw a thing rather than the idea of a thing, and then use both to make a final " +
      "piece that is yours.",
    slug: "colour-shape-and-making",
    difficulty: "Beginner",
    durationHours: 18,
    tags: ["Grade 7", "Drawing", "Colour", "Design"],
    instructor: FACULTY[2],
    enrolled: false,
    accent: subjectAccent("art"),
    dueInDays: null,
    certificateThreshold: 60,
    enrolledCount: 88,
    rating: 4.7,
    ratingCount: 45,
    modules: [
      courseModule(
        "Seeing colour",
        "Why some pairs of colours sing and others argue.",
        [
          topic("The colour wheel, and what sits opposite what", ["article", "quiz"], 0),
          topic("Warm, cool, and the mood a palette sets", ["article", "assignment"], 0),
        ],
      ),
      courseModule(
        "Drawing what you see",
        "Drawing the thing in front of you, not the symbol in your head.",
        [
          topic("Shape, proportion and measuring by eye", ["article", "assignment"], 0),
          topic("Light, shadow and making something look solid", ["article", "assignment"], 0),
        ],
      ),
      courseModule(
        "Making something",
        "Pattern, repetition, and a piece to finish.",
        [
          topic("Pattern and repetition", ["article", "assignment"], 0),
          topic("Final piece: something only you would make", ["assignment"], 0),
        ],
      ),
    ],
  },
];

/**
 * Mean progress across a course's topics.
 *
 * A plain average over topics (rather than weighting by item count) is what the
 * step counter on the journey board also counts, so the headline percentage and
 * "N of M steps" move together.
 */
function deriveCompletion(course: CourseSeed): number {
  const topics = course.modules.flatMap((m) => m.topics);
  if (topics.length === 0) return 0;
  return Math.round(topics.reduce((sum, t) => sum + t.progress, 0) / topics.length);
}

export const COURSES: readonly DemoCourse[] = COURSE_SEEDS.map((course) => ({
  ...course,
  completion: deriveCompletion(course),
}));

export function courseById(id: number): DemoCourse | undefined {
  return COURSES.find((c) => c.id === id);
}

export function enrolledCourses(): DemoCourse[] {
  return COURSES.filter((c) => c.enrolled);
}

/** Flattened topic list for a course, in order. */
export function topicsOf(course: DemoCourse): DemoTopic[] {
  return course.modules.flatMap((m) => m.topics);
}

/** Total learning items across a course, used for card stats. */
export function itemCounts(course: DemoCourse) {
  const counts = { video: 0, quiz: 0, article: 0, assignment: 0, coding_problem: 0 };
  for (const t of topicsOf(course)) {
    for (const kind of t.kinds) {
      if (kind === "video") counts.video++;
      else if (kind === "quiz") counts.quiz++;
      else if (kind === "article") counts.article++;
      else if (kind === "assignment") counts.assignment++;
      else if (kind === "coding") counts.coding_problem++;
    }
  }
  return counts;
}

/**
 * The first unfinished topic — what "Resume" and "Up next" both point at.
 * Returning the same record to both is what stops the dashboard promising one
 * lesson and the course opening another.
 */
export function nextTopic(course: DemoCourse): { module: DemoModule; topic: DemoTopic } | null {
  for (const m of course.modules) {
    for (const t of m.topics) {
      if (t.progress < 100) return { module: m, topic: t };
    }
  }
  return null;
}

/** Due date for the course's current week, or null when self-paced. */
export function courseDueAt(course: DemoCourse): string | null {
  return course.dueInDays == null ? null : isoDaysAhead(course.dueInDays, 23, 59);
}

/** Stable per-course enrolment date, used on certificates and progress copy. */
export function enrolledAt(course: DemoCourse): string {
  return isoDaysAgo(seededInt(`enrolled:${course.id}`, 40, 150));
}

export { daysAhead };

/** Avatar helper re-exported so course consumers do not import two modules. */
export { avatarFor };

/** Find a topic (submodule) by id, with the course and module that contain it. */
export function topicById(
  id: number,
): { course: DemoCourse; module: DemoModule; topic: DemoTopic } | null {
  for (const course of COURSES) {
    for (const m of course.modules) {
      for (const t of m.topics) {
        if (t.id === id) return { course, module: m, topic: t };
      }
    }
  }
  return null;
}
