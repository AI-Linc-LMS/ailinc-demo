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
import { daysAhead, isoDaysAgo, isoDaysAhead } from "../clock";
import { seededInt } from "../random";

export interface DemoTopic {
  id: number;
  title: string;
  /** Learning content types this topic contains, in order. */
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
  /** Overall completion for the enrolled student, 0-100. */
  completion: number;
  /** Accent used for the generated card art. */
  accent: [string, string];
  modules: DemoModule[];
  /** Days from today until the current week's work is due. Null = self-paced. */
  dueInDays: number | null;
  certificateThreshold: number;
  enrolledCount: number;
  rating: number;
  ratingCount: number;
}

/** Generated card art: a gradient plate with the course initials. Keeps the repo light and offline. */
export function courseArt(course: { title: string; accent: [string, string] }): string {
  const [from, to] = course.accent;
  // Stopwords are dropped so "Python for Data Science" reads "PD", not "PF".
  const STOPWORDS = new Set(["for", "and", "of", "with", "the", "to", "in", "on", "a", "an"]);
  const initials = course.title
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w) && !STOPWORDS.has(w.toLowerCase()))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
  const id = `ca${initials}${from.replace("#", "")}`;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 270" width="480" height="270">
      <defs>
        <linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${from}"/>
          <stop offset="100%" stop-color="${to}"/>
        </linearGradient>
      </defs>
      <rect width="480" height="270" fill="url(#${id})"/>
      <circle cx="410" cy="46" r="120" fill="#ffffff" opacity="0.07"/>
      <circle cx="70" cy="240" r="90" fill="#ffffff" opacity="0.06"/>
      <text x="40" y="168" font-family="Satoshi, 'Segoe UI', Helvetica, Arial, sans-serif"
            font-size="96" font-weight="700" fill="#ffffff" opacity="0.92">${initials}</text>
    </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg.replace(/\s+/g, " ").trim())}`;
}

let topicSeq = 5000;
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

export const COURSES: readonly DemoCourse[] = [
  {
    id: 201,
    title: "Full-Stack Web Development",
    subtitle: "React, Node and PostgreSQL, end to end",
    description:
      "Build and ship a production web application from an empty folder to a deployed URL. " +
      "You will write the API, model the database, build the interface, secure it with real " +
      "authentication, and put it behind CI — the same path a working engineer takes on their " +
      "first week at a product company.",
    slug: "full-stack-web-development",
    difficulty: "Intermediate",
    durationHours: 68,
    tags: ["React", "Node.js", "PostgreSQL", "TypeScript", "REST"],
    instructor: INSTRUCTOR_PERSONA,
    enrolled: true,
    completion: 62,
    accent: ["#6366f1", "#a855f7"],
    dueInDays: 3,
    certificateThreshold: 70,
    enrolledCount: 412,
    rating: 4.7,
    ratingCount: 186,
    modules: [
      courseModule(
        "Foundations of the modern web",
        "How a request actually travels, and why every layer exists.",
        [
          topic("The request lifecycle, end to end", ["article", "video", "quiz"], 100),
          topic("HTTP semantics that matter in practice", ["article", "quiz"], 100),
          topic("Semantic HTML and the accessibility tree", ["video", "coding"], 100),
          topic("CSS layout: flexbox and grid in anger", ["video", "coding"], 100),
        ],
      ),
      courseModule(
        "JavaScript and TypeScript in depth",
        "The language mechanics that separate working code from correct code.",
        [
          topic("Closures, scope and the event loop", ["article", "video", "quiz"], 100),
          topic("Promises, async/await and error propagation", ["article", "coding"], 100),
          topic("Typing real data: unions, guards and generics", ["video", "coding"], 100),
          topic("Immutability and why state bugs hide there", ["article", "quiz"], 80),
        ],
      ),
      courseModule(
        "React that scales",
        "Component design, state ownership and the rendering model.",
        [
          topic("The rendering model and reconciliation", ["video", "article"], 100),
          topic("State ownership: lifting, colocating, deriving", ["article", "coding"], 100),
          topic("Effects, and the four times you actually need one", ["video", "quiz"], 75),
          topic("Data fetching, caching and race conditions", ["article", "coding"], 40),
          topic("Performance: memo, virtualisation, code splitting", ["video", "coding"], 0),
        ],
      ),
      courseModule(
        "APIs and data",
        "Designing an interface other people can build against.",
        [
          topic("Designing a REST API you will not regret", ["article", "quiz"], 55),
          topic("Relational modelling and normalisation", ["video", "coding"], 20),
          topic("Indexes, query plans and the N+1 problem", ["article", "coding"], 0),
          topic("Authentication, sessions and JWTs", ["video", "article", "quiz"], 0),
        ],
      ),
      courseModule(
        "Shipping it",
        "Everything between 'works locally' and 'works for users'.",
        [
          topic("Testing: unit, integration and what to skip", ["article", "coding"], 0),
          topic("CI/CD and environment configuration", ["video", "article"], 0),
          topic("Observability: logs, traces and alerts", ["article", "quiz"], 0),
          topic("Capstone: ship a full application", ["assignment"], 0),
        ],
      ),
    ],
  },
  {
    id: 202,
    title: "Python for Data Science",
    subtitle: "From pandas to a deployed model",
    description:
      "Work with data the way analysts and ML engineers do: load something messy, clean it, " +
      "understand it, model it, and defend the result. Every module ends with a dataset that " +
      "does not cooperate.",
    slug: "python-for-data-science",
    difficulty: "Intermediate",
    durationHours: 54,
    tags: ["Python", "pandas", "scikit-learn", "Statistics", "Visualisation"],
    instructor: FACULTY[0],
    enrolled: true,
    completion: 38,
    accent: ["#0ea5e9", "#22d3ee"],
    dueInDays: 6,
    certificateThreshold: 70,
    enrolledCount: 358,
    rating: 4.8,
    ratingCount: 141,
    modules: [
      courseModule(
        "Python for working with data",
        "The subset of the language you will actually use daily.",
        [
          topic("Comprehensions, generators and iterators", ["article", "coding"], 100),
          topic("NumPy arrays and vectorised thinking", ["video", "coding"], 100),
          topic("Reading messy files without losing your mind", ["article", "coding"], 100),
        ],
      ),
      courseModule(
        "pandas in practice",
        "Reshaping, joining and aggregating real datasets.",
        [
          topic("Indexing, selection and the SettingWithCopy trap", ["video", "coding"], 100),
          topic("Group-by, pivot and window operations", ["article", "coding"], 70),
          topic("Joins, and what to do about the rows that vanish", ["video", "quiz"], 45),
          topic("Missing data: impute, drop, or model it", ["article", "coding"], 0),
        ],
      ),
      courseModule(
        "Statistics you cannot skip",
        "Enough inference to know when a result means nothing.",
        [
          topic("Distributions and sampling", ["video", "quiz"], 30),
          topic("Hypothesis testing and p-value misuse", ["article", "quiz"], 0),
          topic("Correlation, causation and confounders", ["video", "article"], 0),
        ],
      ),
      courseModule(
        "Machine learning foundations",
        "Fit a model, then find out whether it generalises.",
        [
          topic("Train/test discipline and leakage", ["article", "coding"], 0),
          topic("Regression and regularisation", ["video", "coding"], 0),
          topic("Classification and the metric that fits the problem", ["article", "coding"], 0),
          topic("Trees, forests and gradient boosting", ["video", "coding"], 0),
          topic("Capstone: end-to-end prediction project", ["assignment"], 0),
        ],
      ),
    ],
  },
  {
    id: 203,
    title: "Data Structures & Algorithms",
    subtitle: "Interview-grade problem solving",
    description:
      "Pattern-first preparation for technical interviews. Rather than 500 unrelated problems, " +
      "you learn the dozen patterns that generate them, and practise recognising which one a " +
      "new question belongs to under time pressure.",
    slug: "data-structures-and-algorithms",
    difficulty: "Advanced",
    durationHours: 72,
    tags: ["Algorithms", "Problem Solving", "Interviews", "Complexity"],
    instructor: INSTRUCTOR_PERSONA,
    enrolled: true,
    completion: 21,
    accent: ["#f43f5e", "#f97316"],
    dueInDays: null,
    certificateThreshold: 75,
    enrolledCount: 623,
    rating: 4.9,
    ratingCount: 297,
    modules: [
      courseModule(
        "Complexity and correctness",
        "Reasoning about cost before writing code.",
        [
          topic("Big-O, amortised cost and the constants that bite", ["article", "quiz"], 100),
          topic("Proving a loop does what you think", ["video", "quiz"], 100),
        ],
      ),
      courseModule(
        "Arrays and strings",
        "The two patterns behind most warm-up questions.",
        [
          topic("Two pointers", ["video", "coding"], 100),
          topic("Sliding window", ["article", "coding"], 60),
          topic("Prefix sums and difference arrays", ["video", "coding"], 0),
        ],
      ),
      courseModule(
        "Hashing, stacks and queues",
        "Choosing the structure that makes the problem trivial.",
        [
          topic("Hash maps and frequency counting", ["article", "coding"], 0),
          topic("Monotonic stacks", ["video", "coding"], 0),
          topic("Deques and streaming maxima", ["article", "coding"], 0),
        ],
      ),
      courseModule(
        "Trees and graphs",
        "Traversal as a default tool.",
        [
          topic("DFS and BFS as one idea", ["video", "coding"], 0),
          topic("Binary search trees and balance", ["article", "coding"], 0),
          topic("Topological sort and cycle detection", ["video", "coding"], 0),
          topic("Shortest paths: BFS, Dijkstra", ["article", "coding"], 0),
        ],
      ),
      courseModule(
        "Dynamic programming",
        "Finding the state, then the transition.",
        [
          topic("Memoisation to tabulation", ["video", "coding"], 0),
          topic("Knapsack and subset patterns", ["article", "coding"], 0),
          topic("Sequence DP: LIS, edit distance", ["video", "coding"], 0),
          topic("Mock interview: two problems, 45 minutes", ["assignment"], 0),
        ],
      ),
    ],
  },
  {
    id: 204,
    title: "Cloud Engineering with AWS",
    subtitle: "Containers, pipelines and production",
    description:
      "Take an application you have written and make it survive contact with production: " +
      "containerised, deployed, monitored, and cheap enough to keep running.",
    slug: "cloud-engineering-with-aws",
    difficulty: "Intermediate",
    durationHours: 46,
    tags: ["AWS", "Docker", "CI/CD", "Terraform", "Observability"],
    instructor: FACULTY[1],
    enrolled: false,
    completion: 0,
    accent: ["#f59e0b", "#f43f5e"],
    dueInDays: null,
    certificateThreshold: 70,
    enrolledCount: 274,
    rating: 4.6,
    ratingCount: 98,
    modules: [
      courseModule("Containers from first principles", "What an image actually is.", [
        topic("Namespaces, layers and image size", ["article", "video"], 0),
        topic("Writing a Dockerfile that builds fast", ["video", "coding"], 0),
      ]),
      courseModule("Core AWS services", "The handful you will use on almost every project.", [
        topic("IAM, and least privilege in practice", ["article", "quiz"], 0),
        topic("Networking: VPC, subnets, security groups", ["video", "quiz"], 0),
        topic("Compute: ECS, Lambda and when to choose which", ["article", "video"], 0),
        topic("Storage and databases: S3 and RDS", ["video", "quiz"], 0),
      ]),
      courseModule("Delivery and operations", "Deploying without holding your breath.", [
        topic("Infrastructure as code with Terraform", ["article", "coding"], 0),
        topic("Pipelines, rollbacks and blue/green", ["video", "article"], 0),
        topic("Monitoring, alerting and on-call reality", ["article", "quiz"], 0),
        topic("Cost: the bill as an engineering problem", ["video", "assignment"], 0),
      ]),
    ],
  },
  {
    id: 205,
    title: "SQL & Database Design",
    subtitle: "Query like an engineer, model like an architect",
    description:
      "Go past SELECT *. Write queries that stay fast as the table grows, and design schemas " +
      "that do not need a migration every sprint.",
    slug: "sql-and-database-design",
    difficulty: "Beginner",
    durationHours: 32,
    tags: ["SQL", "PostgreSQL", "Data Modelling", "Performance"],
    instructor: FACULTY[2],
    enrolled: false,
    completion: 0,
    accent: ["#10b981", "#0ea5e9"],
    dueInDays: null,
    certificateThreshold: 65,
    enrolledCount: 519,
    rating: 4.5,
    ratingCount: 203,
    modules: [
      courseModule("Querying", "Getting exactly the rows you meant.", [
        topic("Filtering, ordering and NULL semantics", ["article", "coding"], 0),
        topic("Joins, and the rows you did not expect", ["video", "coding"], 0),
        topic("Aggregation and HAVING", ["article", "coding"], 0),
        topic("Window functions", ["video", "coding"], 0),
      ]),
      courseModule("Modelling", "Designing for the questions you will ask later.", [
        topic("Keys, constraints and referential integrity", ["article", "quiz"], 0),
        topic("Normalisation, and when to stop", ["video", "quiz"], 0),
      ]),
      courseModule("Performance", "Why the same query is fast here and slow there.", [
        topic("Indexes and how the planner chooses", ["article", "coding"], 0),
        topic("Reading an EXPLAIN plan", ["video", "coding"], 0),
      ]),
    ],
  },
];

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
