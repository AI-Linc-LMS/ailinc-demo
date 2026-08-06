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
  type DemoCourse,
  type DemoTopic,
} from "../../db/courses";
import { overlay } from "../../db/overlay";
import { isoDaysAgo } from "../../clock";
import { seededInt, seededPick } from "../../random";

const MODULE = "adaptive-courses";

/** Content-id namespaces. Offsetting keeps article/quiz/coding ids distinct from topic ids. */
const ARTICLE_ID = (topic: DemoTopic) => topic.id + 100_000;
const QUIZ_ID = (topic: DemoTopic) => topic.id + 200_000;
const CODING_ID = (topic: DemoTopic) => topic.id + 300_000;
const VIDEO_ID = (topic: DemoTopic) => topic.id + 400_000;

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
    quiz_title: `${topic.title} — check your understanding`,
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

function codingSetFor(topic: DemoTopic) {
  const count = seededInt(`cset:${topic.id}`, 2, 4);
  return {
    config_id: CODING_ID(topic),
    title: `${topic.title} — practice set`,
    target_skills: conceptsFor(topic),
    default_language: "python",
    hint_layers: 3,
    problems: Array.from({ length: count }, (_, i) => ({
      problem_id: CODING_ID(topic) + i + 1,
      title: `${topic.title.split(":")[0]} · problem ${i + 1}`,
      difficulty_level: seededPick(`diff:${topic.id}:${i}`, ["Easy", "Medium", "Hard"] as const),
      target_skills: conceptsFor(topic),
      completed: isDone(topic, CODING_ID(topic) + i + 1),
    })),
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
function conceptsFor(topic: DemoTopic): string[] {
  const STOP = new Set([
    "the", "and", "of", "for", "with", "that", "you", "your", "a", "an", "in",
    "on", "to", "it", "is", "as", "at", "do", "not", "they", "how", "what",
  ]);
  return topic.title
    .replace(/[^\w\s-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP.has(w.toLowerCase()))
    .slice(0, 4)
    .map((w) => w[0].toUpperCase() + w.slice(1));
}

function submoduleFor(topic: DemoTopic, order: number) {
  const kinds = new Set(topic.kinds);
  return {
    id: topic.id,
    order,
    title: topic.title,
    description: `Work through ${topic.title.toLowerCase()} and prove it with practice.`,
    articles: kinds.has("article") ? [articleFor(topic)] : [],
    quizzes: kinds.has("quiz") ? [quizFor(topic)] : [],
    coding_sets: kinds.has("coding") ? [codingSetFor(topic)] : [],
    video_companions: kinds.has("video") ? [videoFor(topic)] : [],
    attachments: [],
  };
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
    card_image_url: courseArt(course),
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
    header_image_url: courseArt(course),
    instructors: [{ name: course.instructor.full_name }],
    modules: course.modules.map((m, i) => ({
      id: m.id,
      weekno: i + 1,
      title: m.title,
      submodules: m.topics.map((t) => submoduleFor(t, ++order)),
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
