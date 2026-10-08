/**
 * Adaptive courses — the product's primary learning surface.
 *
 * The same seed that drives the dashboard is projected here into the adaptive
 * shape: modules become weeks, topics become submodules, and each topic's
 * declared content kinds become the article / quiz / coding / video entries
 * inside it. Nothing is invented at this layer, so a topic reported 100% on the
 * dashboard shows every one of its items ticked here.
 */

import { defineRoutes } from "../router";
import { notFound } from "../types";
import {
  COURSES,
  courseById,
  topicsOf,
  itemCounts,
  courseArt,
  courseCover,
  type DemoCourse,
  type DemoTopic,
} from "../../db/courses";
import { overlay } from "../../db/overlay";
import { isoDaysAgo } from "../../clock";
import { seededInt, seededPick } from "../../random";
import { peekTopic } from "../../db/curriculum";

const MODULE = "adaptive-courses";

/** Content-id namespaces. Offsetting keeps article/quiz/coding ids distinct from topic ids. */
export const ARTICLE_ID = (topic: DemoTopic) => topic.id + 100_000;
export const QUIZ_ID = (topic: DemoTopic) => topic.id + 200_000;
export const CODING_ID = (topic: DemoTopic) => topic.id + 300_000;
export const VIDEO_ID = (topic: DemoTopic) => topic.id + 400_000;

/**
 * Practical-id namespaces, one band of 100k each.
 *
 * A separate band per kind rather than one shared counter, so a url carries its
 * own kind: 5085 + 1_500_000 can only ever be a worksheet. That is what lets
 * the points ledger resolve `worksheet:1505085` without a lookup, and it means a
 * mis-registered route 404s instead of serving a lab to a worksheet player.
 */
export const PRACTICAL_BASE: Record<PracticalKind, number> = {
  worksheet: 1_500_000,
  scenario: 1_600_000,
  evidence: 1_700_000,
  lab: 1_800_000,
  deck: 1_900_000,
  speaking: 2_000_000,
  partid: 2_100_000,
  deliverable: 2_200_000,
};

export type PracticalKind =
  | "worksheet" | "scenario" | "evidence" | "lab"
  | "deck" | "speaking" | "partid" | "deliverable";

export const PRACTICAL_KINDS: PracticalKind[] = [
  "worksheet", "scenario", "evidence", "lab", "deck", "speaking", "partid", "deliverable",
];

/** The nth practical of a kind on a topic. Index is 0-based. */
export const PRACTICAL_ID = (kind: PracticalKind, topic: DemoTopic, index = 0) =>
  topic.id + PRACTICAL_BASE[kind] + index;

/** Resolve a practical id back to its kind, or null when it is out of every band. */
export function practicalKindOf(id: number): PracticalKind | null {
  for (const kind of PRACTICAL_KINDS) {
    const base = PRACTICAL_BASE[kind];
    if (id >= base && id < base + 100_000) return kind;
  }
  return null;
}

/** Items the visitor completed this session, on top of whatever the seed says. */
function completedInSession(): number[] {
  return overlay.get<number[]>("adaptive:completed", []);
}

function isDone(topic: DemoTopic, contentId: number): boolean {
  return topic.progress === 100 || completedInSession().includes(contentId);
}

/** Whether a course counts as enrolled, including catalogue enrolments made in-session. */
function isEnrolled(course: DemoCourse): boolean {
  return course.enrolled || overlay.get<number[]>("courses:enrolled", []).includes(course.id);
}

const READING_TIERS = ["Beginner", "Intermediate", "Advanced", "Expert"] as const;

function articleFor(topic: DemoTopic) {
  return {
    article_id: ARTICLE_ID(topic),
    title: topic.title,
    default_tier: "Intermediate" as const,
    available_tiers: [...READING_TIERS],
    reading_time_minutes: seededInt(`read:${topic.id}`, 5, 14),
    concepts: conceptsFor(topic),
    completed: isDone(topic, ARTICLE_ID(topic)),
  };
}

function quizFor(topic: DemoTopic) {
  return {
    config_id: QUIZ_ID(topic),
    quiz_title: `${topic.title} - check your understanding`,
    target_skills: conceptsFor(topic),
    mcq_count: seededInt(`mcq:${topic.id}`, 6, 12),
    min_questions: 6,
    max_questions: 12,
    hint_tokens: 3,
    confidence_prompt_enabled: true,
    completed: isDone(topic, QUIZ_ID(topic)),
    last_session_id: isDone(topic, QUIZ_ID(topic)) ? `sess-${topic.id}` : null,
  };
}

/**
 * The coding set shown on a lesson.
 *
 * Every field is read off the AUTHORED problem where one exists, rather than
 * invented alongside it. The card used to name itself "<topic> - problem 1" and
 * pick a difficulty with `seededPick(...)`, so the card and the page it opened
 * disagreed on both: an audit found 79 of 117 cards stating the wrong
 * difficulty, and the title never matched the problem at all.
 *
 * The course chunk is warmed by the lesson route before this runs, so the
 * synchronous lookup hits. When it misses, the card falls back to the old
 * derived labels rather than showing nothing.
 */
function codingSetFor(topic: DemoTopic, courseId?: number) {
  const authored = courseId == null ? null : peekTopic(courseId, topic.id);
  const problems = authored?.problems ?? [];
  const count = problems.length || seededInt(`cset:${topic.id}`, 2, 4);

  return {
    config_id: CODING_ID(topic),
    title: `${topic.title} - practice set`,
    target_skills: authored?.concepts ?? conceptsFor(topic),
    // The judge here is the browser, which runs JavaScript. Offering Python as
    // the default put the learner in a language this build cannot execute.
    default_language: "javascript",
    hint_layers: 3,
    problems: Array.from({ length: count }, (_, i) => {
      const p = problems[i];
      return {
        problem_id: CODING_ID(topic) + i + 1,
        title: p?.title ?? `${topic.title.split(":")[0]} · problem ${i + 1}`,
        difficulty_level:
          p?.difficulty ?? seededPick(`diff:${topic.id}:${i}`, ["Easy", "Medium", "Hard"] as const),
        target_skills: p?.skills ?? conceptsFor(topic),
        completed: isDone(topic, CODING_ID(topic) + i + 1),
      };
    }),
  };
}

function videoFor(topic: DemoTopic) {
  return {
    id: VIDEO_ID(topic),
    title: topic.title,
    video_title: topic.title,
    thumbnail_url: "",
    duration_seconds: seededInt(`vid:${topic.id}`, 420, 1500),
    check_in_count: seededInt(`checkin:${topic.id}`, 2, 5),
    completed: isDone(topic, VIDEO_ID(topic)),
  };
}

/**
 * Concepts for a topic, derived from its title.
 *
 * Deliberately derived rather than hand-authored per topic: there are ~120 topics
 * across the catalogue, and a hand-written list would inevitably go stale against
 * the titles. Splitting the title gives concepts that always match what is on the
 * card.
 */
export function conceptsFor(topic: DemoTopic): string[] {
  // The list has to be generous. A thin one let "Immutability and why state bugs
  // hide there" produce the tag "Why", which reads as broken on a skill chip
  // sitting next to real ones like "PostgreSQL".
  const STOP = new Set([
    // articles, conjunctions, prepositions
    "the", "and", "of", "for", "with", "a", "an", "in", "on", "to", "at", "as",
    "by", "from", "into", "onto", "over", "under", "about", "after", "before",
    "between", "through", "without", "within", "across", "than", "then", "but",
    "or", "nor", "so", "yet", "per", "via",
    // pronouns and determiners
    "you", "your", "yours", "it", "its", "they", "them", "their", "we", "our",
    "this", "that", "these", "those", "each", "every", "any", "all", "both",
    "some", "most", "more", "much", "many", "one", "two", "other", "another",
    // question words and adverbs, the ones that produced bad tags
    "how", "what", "why", "when", "where", "which", "who", "whom", "whose",
    "here", "there", "still", "just", "only", "even", "also", "really", "very",
    // common verbs and auxiliaries
    "is", "are", "was", "were", "be", "been", "being", "am", "do", "does",
    "did", "has", "have", "had", "can", "could", "will", "would", "should",
    "must", "may", "might", "let", "lets", "get", "gets", "got", "make",
    "makes", "made", "need", "needs", "use", "uses", "using", "not", "no",
    "actually", "hide", "hides", "matter", "matters", "work", "works",
    "think", "know", "want", "take", "takes", "put", "puts", "end", "ends",
  ]);

  const words = topic.title
    .replace(/[^\w\s-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP.has(w.toLowerCase()));

  // Prefer terms already capitalised or containing a capital (React, PostgreSQL,
  // Big-O) — those are the real technical nouns in a title.
  const technical = words.filter((w) => /[A-Z]/.test(w.slice(1)) || /^[A-Z]/.test(w));
  const ordered = [...technical, ...words.filter((w) => !technical.includes(w))];

  const seen = new Set<string>();
  const concepts: string[] = [];
  for (const word of ordered) {
    const label = /[A-Z]/.test(word.slice(1)) ? word : word[0].toUpperCase() + word.slice(1);
    if (seen.has(label.toLowerCase())) continue;
    seen.add(label.toLowerCase());
    concepts.push(label);
    if (concepts.length === 4) break;
  }

  // A topic whose title is entirely stopwords would otherwise render no tags.
  return concepts.length > 0 ? concepts : [topic.title.split(/\s+/)[0]];
}

/**
 * Practical summaries for a lesson.
 *
 * Every chip is read off the AUTHORED item, never invented beside it. The
 * coding card used to pick its own difficulty with `seededPick`, so 79 of 117
 * cards named a difficulty the problem behind them did not have. A worksheet
 * card claiming "14 cells" over a sheet with 9 is the same bug, and on a
 * vocational course it is the card a prospect reads most closely, because it is
 * the one promising something no other LMS does.
 *
 * When the course chunk has not loaded yet the row still renders, with the
 * title and nothing it cannot prove.
 */
function practicalsFor(topic: DemoTopic, courseId?: number) {
  const authored = courseId == null ? null : peekTopic(courseId, topic.id);
  const out: Array<Record<string, unknown>> = [];

  const push = (
    kind: PracticalKind,
    index: number,
    title: string,
    detail: string,
    facts: string[],
    minutes: number,
    skills: string[],
    extra: Record<string, unknown> = {},
  ) => {
    const id = PRACTICAL_ID(kind, topic, index);
    out.push({
      id, kind, title, detail, facts, minutes,
      target_skills: skills.length ? skills : conceptsFor(topic),
      completed: isDone(topic, id),
      ...extra,
    });
  };

  for (const kind of topic.kinds) {
    switch (kind) {
      case "worksheet":
        (authored?.worksheets ?? [{} as never]).forEach((w, i) => {
          const cells = w.cells?.length ?? 0;
          const rules = w.invariants?.length ?? 0;
          push("worksheet", i,
            w.title ?? `${topic.title} - working paper`,
            "Fill the sheet. Marked cell by cell, with method marks.",
            [
              ...(w.difficulty ? [w.difficulty] : []),
              ...(cells ? [`${cells} marked cells`] : []),
              ...(rules ? [`${rules} balance ${rules === 1 ? "rule" : "rules"}`] : []),
            ],
            w.minutes ?? 20, w.skills ?? [],
          );
        });
        break;
      case "scenario":
        (authored?.scenarios ?? [{} as never]).forEach((sc, i) => {
          const nodes = sc.nodes?.length ?? 0;
          const endings = sc.nodes?.filter((n) => n.ending).length ?? 0;
          push("scenario", i,
            sc.title ?? `${topic.title} - decision run`,
            sc.blurb ?? "Decide under pressure. Scored on the path, not the last answer.",
            [
              ...(nodes ? [`${nodes} decision points`] : []),
              ...(endings ? [`${endings} endings`] : []),
            ],
            sc.minutes ?? 12, sc.skills ?? [],
          );
        });
        break;
      case "evidence":
        (authored?.evidence ?? [{} as never]).forEach((e, i) => {
          const caps = e.captures?.length ?? 0;
          const video = e.captures?.some((c) => c.medium === "video");
          push("evidence", i,
            e.title ?? `${topic.title} - evidence of work`,
            "Do it for real, film it, submit it. A person marks this one.",
            [
              ...(caps ? [`${caps} ${caps === 1 ? "capture" : "captures"}`] : []),
              ...(video ? ["video required"] : []),
              "instructor marked",
            ],
            e.minutes ?? 45, e.skills ?? [],
            { human_graded: true },
          );
        });
        break;
      case "lab":
        (authored?.labs ?? [{} as never]).forEach((l, i) => {
          const steps = l.steps?.length ?? 0;
          const danger = l.steps?.filter((st) => st.hazard?.level === "danger").length ?? 0;
          const readings = l.steps?.filter((st) => st.reading).length ?? 0;
          push("lab", i,
            l.title ?? `${topic.title} - guided procedure`,
            l.objective ?? "Work the procedure step by step. Safety steps cannot be skipped.",
            [
              ...(steps ? [`${steps} steps`] : []),
              ...(danger ? [`${danger} locked safety ${danger === 1 ? "step" : "steps"}`] : []),
              ...(readings ? [`${readings} readings taken`] : []),
            ],
            l.steps?.reduce((sum, st) => sum + (st.minutes ?? 0), 0) || 30,
            l.skills ?? [],
          );
        });
        break;
      case "deck":
        (authored?.decks ?? [{} as never]).forEach((d, i) => {
          const cards = d.cards?.length ?? 0;
          // Due today is what the learner is actually asked to clear, so it is
          // the number on the card. Seeded, so it does not move between loads.
          const due = cards ? Math.min(cards, seededInt(`due:${topic.id}:${i}`, 4, 12)) : 0;
          push("deck", i,
            d.title ?? `${topic.title} - recall deck`,
            d.blurb ?? "Spaced repetition. Short sittings, scheduled for you.",
            [
              ...(cards ? [`${cards} cards`] : []),
              ...(due ? [`${due} due today`] : []),
              d.mode === "flip" ? "self-rated" : "typed recall",
            ],
            Math.max(3, Math.round(due * 0.4)), d.skills ?? [],
            { due_count: due },
          );
        });
        break;
      case "speaking":
        (authored?.speaking ?? [{} as never]).forEach((sp, i) => {
          const KINDS: Record<string, string> = {
            listen: "Listen and answer",
            "read-aloud": "Read aloud, scored per word",
            respond: "Speak your own answer",
            roleplay: "Hold a conversation",
          };
          push("speaking", i,
            sp.title ?? `${topic.title} - speaking task`,
            KINDS[sp.kind] ?? "Use your voice, and be marked on it.",
            [
              ...(sp.level ? [sp.level] : []),
              ...(sp.seconds ? [`${sp.seconds}s of speech`] : []),
              "microphone",
            ],
            Math.max(4, Math.round((sp.seconds ?? 60) / 12)), sp.skills ?? [],
          );
        });
        break;
      case "partid":
        (authored?.parts ?? [{} as never]).forEach((pt, i) => {
          const spots = pt.hotspots?.length ?? 0;
          const stages = 1 + (pt.sequence ? 1 : 0) + (pt.wiring ? 1 : 0);
          push("partid", i,
            pt.title ?? `${topic.title} - name the parts`,
            "Identify it on the diagram, then fit it in the right order.",
            [
              ...(spots ? [`${spots} parts to name`] : []),
              ...(stages > 1 ? [`${stages} stages`] : []),
              ...(pt.wiring ? ["terminal matching"] : []),
            ],
            pt.minutes ?? 10, pt.skills ?? [],
          );
        });
        break;
      case "deliverable":
        (authored?.deliverables ?? [{} as never]).forEach((d, i) => {
          const files = d.requires?.length ?? 0;
          const crit = d.rubric?.length ?? 0;
          push("deliverable", i,
            d.title ?? `${topic.title} - deliverable`,
            "Produce the document. Marked against a rubric you can read first.",
            [
              ...(files ? [`${files} ${files === 1 ? "file" : "files"} to attach`] : []),
              ...(crit ? [`${crit}-criterion rubric`] : []),
              "instructor marked",
            ],
            d.minutes ?? 90, d.skills ?? [],
            { human_graded: true },
          );
        });
        break;
      default:
        break;
    }
  }
  return out;
}

export function submoduleFor(topic: DemoTopic, order: number, courseId?: number) {
  const kinds = new Set(topic.kinds);
  return {
    id: topic.id,
    order,
    title: topic.title,
    // The authored summary, not a template built from the title. Every lesson
    // in the product read "Work through <title> and prove it with practice",
    // which is the same sentence 118 times and is exactly the tell that made
    // the old generated article bodies obvious. Every topic has a real summary
    // written for it; the template survives only for a topic nobody has
    // authored yet.
    description:
      peekTopic(courseId ?? -1, topic.id)?.summary ??
      `Work through ${topic.title.toLowerCase()} and prove it with practice.`,
    articles: kinds.has("article") ? [articleFor(topic)] : [],
    quizzes: kinds.has("quiz") ? [quizFor(topic)] : [],
    coding_sets: kinds.has("coding") ? [codingSetFor(topic, courseId)] : [],
    video_companions: kinds.has("video") ? [videoFor(topic)] : [],
    attachments: [],
    practicals: practicalsFor(topic, courseId),
    // The lesson page renders a course-scoped hero and this is the only
    // payload it fetches, so the course's colour travels with the submodule.
    course_theme: courseId == null ? undefined : themeFor(courseId),
  };
}

/** The authored colour and motif for a course, or undefined if unknown. */
function themeFor(courseId: number) {
  const course = courseById(courseId);
  return course ? { accent: course.accent, icon: course.icon } : undefined;
}

function listItem(course: DemoCourse) {
  const counts = itemCounts(course);
  return {
    id: course.id,
    title: course.title,
    slug: course.slug,
    description: course.description,
    target_audience:
      course.difficulty === "Beginner"
        ? "Newcomers with no prior background"
        : course.difficulty === "Advanced"
          ? "Engineers preparing for senior or product-company interviews"
          : "Learners with some programming experience",
    duration_weeks: course.modules.length * 2,
    difficulty_levels: [course.difficulty],
    module_count: course.modules.length,
    submodule_count: topicsOf(course).length,
    quiz_count: counts.quiz,
    article_count: counts.article,
    coding_count: counts.coding_problem,
    video_count: counts.video,
    // Real photograph, with the generated gradient as the documented fallback
    // the card falls back to when the image cannot load.
    card_image_url: courseCover(course.id) || courseArt(course),
    card_image_fallback_url: courseArt(course),
    // The course's own colour and motif. Served on every course-scoped
    // response because every one of them draws a hero, and before this they
    // all drew the same violet one.
    theme: { accent: course.accent, icon: course.icon },
    // Every course is open to self-enrolment so a prospect can enrol from the
    // catalogue and watch it appear on their dashboard.
    self_enroll_enabled: true,
    is_paid: false,
    price: null,
    currency: "INR",
    purchased: false,
    updated_at: isoDaysAgo(seededInt(`upd:${course.id}`, 2, 21)),
  };
}

function detail(course: DemoCourse) {
  let order = 0;
  return {
    ...listItem(course),
    header_image_url: courseCover(course.id, 1600) || courseArt(course),
    header_image_fallback_url: courseArt(course),
    instructors: [{ name: course.instructor.full_name }],
    modules: course.modules.map((m, i) => ({
      id: m.id,
      weekno: i + 1,
      title: m.title,
      submodules: m.topics.map((t) => submoduleFor(t, ++order, course.id)),
    })),
  };
}

defineRoutes(MODULE, {
  /** Courses this learner is enrolled in — the /adaptive-courses landing list. */
  "GET /adaptive-quiz/api/courses/": () => COURSES.filter(isEnrolled).map(listItem),

  /**
   * The catalogue: everything open to self-enrolment, enrolled or not. The page
   * distinguishes the two itself, so both are returned.
   */
  "GET /adaptive-quiz/api/courses/catalog/": () => COURSES.map(listItem),

  "GET /adaptive-quiz/api/courses/:courseId/": (req) => {
    const course = courseById(Number(req.params.courseId));
    if (!course) throw notFound("Course not found");
    return detail(course);
  },

  "POST /adaptive-quiz/api/courses/:courseId/enroll/": (req) => {
    const course = courseById(Number(req.params.courseId));
    if (!course) throw notFound("Course not found");
    const already = isEnrolled(course);
    overlay.update<number[]>("courses:enrolled", [], (list) =>
      list.includes(course.id) ? list : [...list, course.id],
    );
    return { course_id: course.id, enrolled: true, already_enrolled: already };
  },
});
