/**
 * AI mock interviews.
 *
 * A spread of states again: two completed with real feedback to read, one
 * scheduled, and templates available to start. The completed ones carry the
 * feedback text, because "you scored 78" tells a prospect nothing about the
 * product — the paragraph explaining *why* is what an institution is buying.
 *
 * The live interview itself is voice-driven and needs speech services this demo
 * deliberately has no network for. Starting one is therefore left to the real
 * product; what is shown here is the surrounding lifecycle, which is what a
 * buyer evaluates.
 */

import { defineRoutes } from "../router";
import { notFound } from "../types";
import { COURSES } from "../../db/courses";
import { isoDaysAgo, isoDaysAhead } from "../../clock";

const MODULE = "mock-interview";

interface DemoInterview {
  id: number;
  title: string;
  topic: string;
  subtopic: string;
  difficulty: "Easy" | "Medium" | "Hard";
  duration: number;
  status: "completed" | "scheduled" | "pending";
  daysAgo?: number;
  daysAhead?: number;
  score?: number;
  feedback?: string;
}

const INTERVIEWS: DemoInterview[] = [
  {
    id: 801,
    title: "Backend fundamentals — systems and APIs",
    topic: "Backend Engineering",
    subtopic: "APIs, data modelling, caching",
    difficulty: "Medium",
    duration: 30,
    status: "completed",
    daysAgo: 9,
    score: 78,
    feedback:
      "You explain your reasoning as you go, which is the single most valuable habit in a technical " +
      "interview, and you corrected yourself once without being prompted.\n\n" +
      "Where you lost marks: when asked how the design changes at 100x traffic you jumped straight " +
      "to caching without first naming what would break. Interviewers are listening for the " +
      "diagnosis before the fix.\n\n" +
      "One concrete thing to practise: for any design question, say out loud what the bottleneck is " +
      "and how you would measure it, before proposing a solution.",
  },
  {
    id: 802,
    title: "Data structures — arrays, hashing and complexity",
    topic: "Algorithms",
    subtopic: "Arrays, hashing, complexity analysis",
    difficulty: "Hard",
    duration: 30,
    status: "completed",
    daysAgo: 21,
    score: 64,
    feedback:
      "Your final solutions were correct, and you handled the follow-up on hash collisions well.\n\n" +
      "The gap was pace under pressure. You spent eleven minutes on the first question before " +
      "writing anything, then rushed the second. In a 30-minute interview that costs you a whole " +
      "question.\n\n" +
      "Practise stating a brute-force approach within the first two minutes, then optimising out " +
      "loud. It buys you credit early and gives the interviewer something to work with.",
  },
  {
    id: 803,
    title: "Full-stack — end-to-end feature design",
    topic: "Full-Stack Engineering",
    subtopic: "Schema, API, interface, trade-offs",
    difficulty: "Medium",
    duration: 45,
    status: "scheduled",
    daysAhead: 3,
  },
];

function toApi(i: DemoInterview) {
  return {
    id: i.id,
    title: i.title,
    topic: i.topic,
    subtopic: i.subtopic,
    difficulty: i.difficulty,
    duration_minutes: i.duration,
    status: i.status,
    created_at: i.daysAgo != null ? isoDaysAgo(i.daysAgo + 1) : isoDaysAgo(2),
    scheduled_date_time:
      i.daysAhead != null ? isoDaysAhead(i.daysAhead, 18, 30) : undefined,
    score: i.score,
    feedback: i.feedback,
  };
}

/** Per-course exit interviews the learner has not taken yet. */
const PENDING = COURSES.filter((c) => c.enrolled).map((course, index) => ({
  id: 8100 + index,
  title: `${course.title} — exit interview`,
  topic: course.tags[0] ?? course.title,
  subtopic: course.tags.slice(1, 3).join(", "),
  difficulty: (course.difficulty === "Advanced" ? "Hard" : "Medium") as "Hard" | "Medium",
  duration_minutes: 30,
  description:
    `A voice interview covering ${course.title}. The interviewer adapts its follow-ups to how ` +
    `you answer, and scores communication as well as correctness.`,
  course_titles: [course.title],
  has_attempt: course.completion >= 60,
}));

defineRoutes(MODULE, {
  "GET /mock-interview/api/clients/:clientId/mock-interviews/": (req) => {
    const status = req.query.get("status");
    const list = INTERVIEWS.filter((i) => !status || i.status === status);
    return list.map(toApi);
  },

  "GET /mock-interview/api/clients/:clientId/mock-interviews/:interviewId/": (req) => {
    const found = INTERVIEWS.find((i) => i.id === Number(req.params.interviewId));
    if (!found) throw notFound("Interview not found");
    return {
      ...toApi(found),
      questions_for_interview: [],
      started_at: found.daysAgo != null ? isoDaysAgo(found.daysAgo, 18, 0) : undefined,
      submitted_at: found.daysAgo != null ? isoDaysAgo(found.daysAgo, 18, 30) : undefined,
      is_dynamic: true,
      // Per-dimension breakdown: the shape of the feedback matters as much as
      // the number, and this is what the result page charts.
      scores: found.score
        ? [
            { dimension: "Correctness", score: Math.min(100, found.score + 6) },
            { dimension: "Communication", score: Math.min(100, found.score + 12) },
            { dimension: "Depth", score: Math.max(30, found.score - 14) },
            { dimension: "Structure", score: found.score },
          ]
        : [],
    };
  },

  "GET /mock-interview/api/clients/:clientId/interview-templates/pending/": () => PENDING,

  "GET /mock-interview/api/clients/:clientId/interview-templates/": () => PENDING,
});
