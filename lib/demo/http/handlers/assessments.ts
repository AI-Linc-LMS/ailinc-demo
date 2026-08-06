/**
 * Assessments: the institution's formal, timed papers.
 *
 * Deliberately a mix of states — one available, one already completed with a
 * result to open, one scheduled for a future window, one proctored. A hub where
 * every card says "Start" shows the button but not the lifecycle, and the
 * lifecycle is most of what an institution is buying.
 */

import { defineRoutes } from "../router";
import { notFound } from "../types";
import { overlay } from "../../db/overlay";
import { iso, isoDaysAgo, isoDaysAhead, nowMs } from "../../clock";
import { STUDENT_PERSONA } from "../../db/people";

const MODULE = "assessments";

interface DemoAssessment {
  id: number;
  title: string;
  description: string;
  slug: string;
  instructions: string;
  duration_minutes: number;
  number_of_questions: number;
  number_of_sections: number;
  proctoring_enabled: boolean;
  status: "not_started" | "completed" | "in_progress";
  is_attempted: boolean;
  start_time: string | null;
  end_time: string | null;
  /** Score for completed papers, else null. */
  score: number | null;
}

const ASSESSMENTS: DemoAssessment[] = [
  {
    id: 901,
    title: "Full-Stack Engineering — Mid-Programme Assessment",
    description:
      "A timed paper covering the first half of the Full-Stack track: HTTP and the request " +
      "lifecycle, JavaScript and TypeScript mechanics, React's rendering model, and relational " +
      "data modelling.",
    slug: "full-stack-mid-programme",
    instructions:
      "90 minutes, 45 questions across 4 sections. You may move freely between sections and " +
      "flag questions to revisit. The paper submits itself when the timer ends, so there is no " +
      "penalty for running out of time on the last question.",
    duration_minutes: 90,
    number_of_questions: 45,
    number_of_sections: 4,
    proctoring_enabled: true,
    status: "not_started",
    is_attempted: false,
    start_time: null,
    end_time: null,
    score: null,
  },
  {
    id: 902,
    title: "Data Structures & Algorithms — Diagnostic",
    description:
      "Placement diagnostic used to set your starting difficulty in the DSA track. Complexity, " +
      "arrays and hashing, trees and graphs.",
    slug: "dsa-diagnostic",
    instructions:
      "40 minutes, 25 questions. This paper is not graded for your transcript — it exists to " +
      "calibrate what the platform gives you next.",
    duration_minutes: 40,
    number_of_questions: 25,
    number_of_sections: 3,
    proctoring_enabled: false,
    status: "completed",
    is_attempted: true,
    start_time: isoDaysAgo(18, 10, 0),
    end_time: isoDaysAgo(18, 10, 40),
    score: 76,
  },
  {
    id: 903,
    title: "Python for Data Science — Unit 2 Test",
    description: "pandas, reshaping, joins and missing data. Covers the second module of the track.",
    slug: "python-ds-unit-2",
    instructions:
      "60 minutes, 30 questions. One attempt. Calculators and notes are allowed; the questions " +
      "are about judgement rather than recall.",
    duration_minutes: 60,
    number_of_questions: 30,
    number_of_sections: 2,
    proctoring_enabled: false,
    status: "not_started",
    is_attempted: false,
    start_time: null,
    end_time: null,
    score: null,
  },
  {
    id: 904,
    title: "End-of-Programme Comprehensive",
    description:
      "The final graded paper across every track you are enrolled in. Opens once your programme " +
      "reaches 80% completion.",
    slug: "end-of-programme-comprehensive",
    instructions:
      "150 minutes, 80 questions, proctored. Your certificate grade is calculated from this paper " +
      "together with your coursework.",
    duration_minutes: 150,
    number_of_questions: 80,
    number_of_sections: 6,
    proctoring_enabled: true,
    status: "not_started",
    is_attempted: false,
    // A future window, so the hub shows a scheduled state as well as an open one.
    start_time: isoDaysAhead(24, 10, 0),
    end_time: isoDaysAhead(24, 13, 30),
    score: null,
  },
];

/** Papers the visitor submitted during this session count as completed too. */
function submittedInSession(): number[] {
  return overlay.get<number[]>("assessments:submitted", []);
}

function toApi(a: DemoAssessment) {
  const submitted = submittedInSession().includes(a.id);
  const status = submitted ? "completed" : a.status;
  return {
    id: a.id,
    title: a.title,
    description: a.description,
    slug: a.slug,
    instructions: a.instructions,
    duration_minutes: a.duration_minutes,
    is_paid: false,
    price: null,
    currency: "INR",
    requires_purchase: false,
    purchased: true,
    amount: 0,
    is_active: true,
    number_of_questions: a.number_of_questions,
    number_of_sections: a.number_of_sections,
    created_at: isoDaysAgo(40),
    is_attempted: status === "completed",
    has_attempted: status === "completed",
    start_time: a.start_time,
    end_time: a.end_time,
    proctoring_enabled: a.proctoring_enabled,
    status,
    allow_desktop: true,
    // Proctored papers are desktop-only, which is the real product rule and a
    // detail an institution evaluating integrity controls will look for.
    allow_mobile: !a.proctoring_enabled,
    score: status === "completed" ? (a.score ?? 72) : null,
    total_marks: a.number_of_questions * 2,
    obtained_marks: status === "completed" ? Math.round((a.score ?? 72) / 100 * a.number_of_questions * 2) : null,
  };
}

function bySlug(slug: string): DemoAssessment | undefined {
  return ASSESSMENTS.find((a) => a.slug === slug);
}

defineRoutes(MODULE, {
  "GET /assessment/api/client/:clientId/active-assessments/": () => ASSESSMENTS.map(toApi),

  "GET /assessment/api/client/:clientId/assessments/": () => ASSESSMENTS.map(toApi),

  "GET /assessment/api/client/:clientId/assessments/:slug/": (req) => {
    const found = bySlug(req.params.slug);
    if (!found) throw notFound("Assessment not found");
    return toApi(found);
  },

  /** Result page for a completed paper. */
  "GET /assessment/api/client/:clientId/assessments/:slug/result/": (req) => {
    const found = bySlug(req.params.slug);
    if (!found) throw notFound("Assessment not found");
    const score = found.score ?? 72;

    return {
      assessment: toApi(found),
      student_name: STUDENT_PERSONA.full_name,
      score,
      total_marks: found.number_of_questions * 2,
      obtained_marks: Math.round((score / 100) * found.number_of_questions * 2),
      percentage: score,
      grade: score >= 85 ? "A" : score >= 70 ? "B" : score >= 55 ? "C" : "D",
      passed: score >= 50,
      rank: 7,
      total_students: 84,
      submitted_at: found.end_time ?? isoDaysAgo(18, 10, 40),
      time_taken_minutes: found.duration_minutes - 6,
      sections: [
        { name: "Complexity", total: 8, correct: 7, percentage: 88 },
        { name: "Arrays and hashing", total: 9, correct: 7, percentage: 78 },
        { name: "Trees and graphs", total: 8, correct: 5, percentage: 63 },
      ],
    };
  },

  /** Starting a paper records it locally so the hub reflects the attempt. */
  "POST /assessment/api/client/:clientId/assessments/:slug/start/": (req) => {
    const found = bySlug(req.params.slug);
    if (!found) throw notFound("Assessment not found");
    return {
      submission_id: `sub-${found.id}`,
      started_at: iso(new Date(nowMs())),
      duration_minutes: found.duration_minutes,
    };
  },

  "POST /assessment/api/client/:clientId/assessments/:slug/submit/": (req) => {
    const found = bySlug(req.params.slug);
    if (!found) throw notFound("Assessment not found");
    overlay.update<number[]>("assessments:submitted", [], (list) =>
      list.includes(found.id) ? list : [...list, found.id],
    );
    return { detail: "Your assessment has been submitted.", submitted_at: iso(new Date(nowMs())) };
  },
});
