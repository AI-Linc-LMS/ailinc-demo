/**
 * The instructor workspace.
 *
 * An instructor's job is triage: who is falling behind, what needs marking, what
 * is on today. So the seed is built around that — a real at-risk list with real
 * reasons, submissions waiting on review, and a schedule with something live.
 * A dashboard of healthy green numbers shows the layout but not the job.
 *
 * Every student here comes from the shared roster, so an instructor looking at
 * "Kabir Deshmukh, 23%, at risk" is looking at the same person the student-side
 * leaderboard ranks.
 */

import { defineRoutes } from "../router";
import { notFound } from "../types";
import {
  INSTRUCTOR_PERSONA,
  STUDENTS,
  STUDENT_PERSONA,
  rankedLearners,
  type DemoPerson,
} from "../../db/people";
import { COURSES } from "../../db/courses";
import { iso, isoDaysAgo, isoDaysAhead, nowMs } from "../../clock";
import { seededInt, seededPick } from "../../random";

const MODULE = "instructor";

/** The batch this instructor teaches. */
const COHORTS = [
  {
    id: 11,
    name: "Autumn 2026 — Full-Stack",
    courseIds: [201],
    size: 28,
    status: "active",
  },
  {
    id: 12,
    name: "Autumn 2026 — Interview Prep",
    courseIds: [203],
    size: 22,
    status: "active",
  },
  {
    id: 13,
    name: "Spring 2026 — Full-Stack (graduated)",
    courseIds: [201],
    size: 24,
    status: "completed",
  },
];

/** Members of a cohort, drawn deterministically from the roster. */
function cohortMembers(cohortId: number, size: number): DemoPerson[] {
  const start = (cohortId - 11) * 20;
  return [...STUDENTS.slice(start, start + size), STUDENT_PERSONA].slice(0, size);
}

/** Everyone this instructor teaches, deduplicated across their cohorts. */
function taughtStudents(): DemoPerson[] {
  const seen = new Map<number, DemoPerson>();
  for (const c of COHORTS) {
    for (const p of cohortMembers(c.id, c.size)) seen.set(p.id, p);
  }
  return [...seen.values()];
}

/** Progress for a student, stable per person. */
function progressOf(p: DemoPerson): number {
  return p.id === STUDENT_PERSONA.id
    ? COURSES.find((c) => c.id === 201)?.completion ?? 56
    : seededInt(`iprog:${p.id}`, 8, 96);
}

function statusOf(progress: number, streak: number): "on_track" | "watch" | "at_risk" {
  if (progress < 30 || streak === 0) return "at_risk";
  if (progress < 55) return "watch";
  return "on_track";
}

function studentRow(p: DemoPerson) {
  const progress = progressOf(p);
  const cohort = COHORTS.find((c) => cohortMembers(c.id, c.size).some((m) => m.id === p.id));
  return {
    student_id: p.id,
    name: p.full_name,
    email: p.email,
    phone: p.phone,
    progress,
    avg_score: seededInt(`iscore:${p.id}`, 42, 94),
    points: p.points,
    last_active: isoDaysAgo(seededInt(`ilast:${p.id}`, 0, 9)),
    cohort: cohort?.name ?? "Unassigned",
    status: statusOf(progress, p.streak),
    courses_count: seededInt(`icc:${p.id}`, 1, 3),
    cohorts_count: 1,
  };
}

function statStudent(p: DemoPerson) {
  return {
    student_id: p.id,
    name: p.full_name,
    email: p.email,
    progress: progressOf(p),
  };
}

const SCHEDULE = [
  {
    id: 501,
    topic: "Live doubt-clearing: React rendering and effects",
    dayOffset: 0,
    hour: 18,
    status: "live" as const,
    cohort: "Autumn 2026 — Full-Stack",
  },
  {
    id: 502,
    topic: "Workshop: designing a REST API you will not regret",
    dayOffset: 2,
    hour: 19,
    status: "scheduled" as const,
    cohort: "Autumn 2026 — Full-Stack",
  },
  {
    id: 504,
    topic: "Interview prep: talking through a problem out loud",
    dayOffset: 7,
    hour: 20,
    status: "scheduled" as const,
    cohort: "Autumn 2026 — Interview Prep",
  },
];

function dashboard() {
  const students = taughtStudents();
  const rows = students.map(studentRow);
  const atRisk = rows.filter((r) => r.status === "at_risk");
  const avgProgress = Math.round(rows.reduce((s, r) => s + r.progress, 0) / Math.max(1, rows.length));

  return {
    instructor_name: INSTRUCTOR_PERSONA.full_name,
    instructor_code: "MIT-VM-04",
    is_admin_view: false,
    batches: COHORTS.filter((c) => c.status === "active").length,
    courses: 2,
    students: rows.length,
    active_students: rows.filter((r) => r.status !== "at_risk").length,
    avg_progress: avgProgress,
    completion_rate: Math.round(rows.filter((r) => r.progress >= 80).length / Math.max(1, rows.length) * 100),
    at_risk_count: atRisk.length,
    upcoming_sessions: SCHEDULE.filter((s) => s.status === "scheduled").length,
    live_now: SCHEDULE.filter((s) => s.status === "live").length,
    at_risk: atRisk
      .slice(0, 6)
      .map((r) => ({ student_id: r.student_id, name: r.name, email: r.email, progress: r.progress })),
    top_performers: rankedLearners()
      .filter((p) => students.some((s) => s.id === p.id))
      .slice(0, 5)
      .map(statStudent),
    cohorts_detailed: COHORTS.map((c) => {
      const members = cohortMembers(c.id, c.size).map(studentRow);
      return {
        id: c.id,
        name: c.name,
        courses: c.courseIds
          .map((id) => COURSES.find((x) => x.id === id))
          .filter((x): x is NonNullable<typeof x> => Boolean(x))
          .map((x) => ({ id: x.id, title: x.title })),
        client_name: "Meridian Institute of Technology",
        status: c.status,
        end_date: c.status === "completed" ? isoDaysAgo(40) : isoDaysAhead(90),
        student_count: members.length,
        progress: Math.round(members.reduce((s, m) => s + m.progress, 0) / Math.max(1, members.length)),
        avg_score: Math.round(members.reduce((s, m) => s + (m.avg_score ?? 0), 0) / Math.max(1, members.length)),
        at_risk: members.filter((m) => m.status === "at_risk").length,
      };
    }),
    schedule: SCHEDULE.map((s) => ({
      id: s.id,
      topic: s.topic,
      datetime: s.dayOffset === 0 ? isoDaysAhead(0, s.hour, 0) : isoDaysAhead(s.dayOffset, s.hour, 0),
      duration_minutes: 60,
      status: s.status,
      registered: seededInt(`reg:${s.id}`, 18, 40),
      cohort_name: s.cohort,
      join_link: `/instructor/live-sessions?session=${s.id}`,
    })),
    recent_submissions: taughtStudents()
      .slice(0, 6)
      .map((p, i) => ({
        submission_id: 9000 + i,
        student_name: p.full_name,
        assessment_title: seededPick(`sub:${p.id}`, [
          "Full-Stack Engineering — Mid-Programme Assessment",
          "Data Structures & Algorithms — Diagnostic",
          "Python for Data Science — Unit 2 Test",
        ]),
        // Two awaiting review, so the gradebook has something to do.
        score: i < 2 ? null : seededInt(`subs:${p.id}`, 48, 96),
        review_status: i < 2 ? "pending" : "reviewed",
        completed_at: isoDaysAgo(i + 1, 16, 0),
      })),
    progress_truncated: false,
  };
}

defineRoutes(MODULE, {
  "GET /instructor/api/dashboard/": () => dashboard(),

  "GET /instructor/api/overview/": () => ({
    courses: 2,
    adaptive_courses: 2,
    classic_courses: 0,
    cohorts: COHORTS.filter((c) => c.status === "active").length,
    students: taughtStudents().length,
    is_admin_view: false,
  }),

  "GET /instructor/api/courses/": () =>
    COURSES.filter((c) => c.instructor.id === INSTRUCTOR_PERSONA.id).map((c) => ({
      id: c.id,
      kind: "adaptive" as const,
      title: c.title,
      slug: c.slug,
      is_published: true,
      student_count: c.enrolledCount,
      updated_at: isoDaysAgo(seededInt(`iupd:${c.id}`, 1, 14)),
      authored_by_me: true,
      review_status: "approved" as const,
      review_note: "",
    })),

  "GET /instructor/api/cohorts/": () =>
    COHORTS.map((c) => ({
      id: c.id,
      name: c.name,
      status: c.status,
      start_date: isoDaysAgo(120),
      end_date: c.status === "completed" ? isoDaysAgo(40) : isoDaysAhead(90),
      member_count: c.size,
      artifact_count: c.courseIds.length,
    })),

  "GET /instructor/api/cohorts/:cohortId/students/": (req) => {
    const c = COHORTS.find((x) => x.id === Number(req.params.cohortId));
    if (!c) throw notFound("Cohort not found");
    const members = cohortMembers(c.id, c.size);
    return {
      cohort_id: c.id,
      name: c.name,
      count: members.length,
      results: members.map((p) => ({
        student_id: p.id,
        name: p.full_name,
        email: p.email,
        phone: p.phone,
        status: "active",
        joined_at: isoDaysAgo(seededInt(`join:${p.id}`, 30, 120)),
      })),
    };
  },

  "GET /instructor/api/students/": (req) => {
    const search = (req.query.get("search") ?? "").toLowerCase();
    const status = req.query.get("status") ?? "";
    const page = Number(req.query.get("page") ?? 1);
    const pageSize = Number(req.query.get("page_size") ?? 25);

    let rows = taughtStudents().map(studentRow);
    if (search) {
      rows = rows.filter(
        (r) => r.name.toLowerCase().includes(search) || r.email.toLowerCase().includes(search),
      );
    }
    if (status) rows = rows.filter((r) => r.status === status);

    const start = (page - 1) * pageSize;
    return {
      count: rows.length,
      page,
      page_size: pageSize,
      results: rows.slice(start, start + pageSize),
      summary: {
        count: rows.length,
        avg_progress: Math.round(rows.reduce((s, r) => s + r.progress, 0) / Math.max(1, rows.length)),
        avg_score: Math.round(rows.reduce((s, r) => s + (r.avg_score ?? 0), 0) / Math.max(1, rows.length)),
        at_risk: rows.filter((r) => r.status === "at_risk").length,
      },
      cohort_id: null,
    };
  },

  "GET /instructor/api/students/:studentId/": (req) => {
    const p = taughtStudents().find((x) => x.id === Number(req.params.studentId));
    if (!p) throw notFound("Student not found");
    const row = studentRow(p);
    return {
      ...row,
      profile_pic_url: p.profile_pic_url,
      college: p.college,
      courses: COURSES.filter((c) => c.enrolled).map((c) => ({
        id: c.id,
        title: c.title,
        progress: seededInt(`sc:${p.id}:${c.id}`, 5, 98),
      })),
      recent_activity: Array.from({ length: 5 }, (_, i) => ({
        label: seededPick(`act:${p.id}:${i}`, [
          "Completed a lesson",
          "Submitted a coding problem",
          "Took an adaptive quiz",
          "Attended a live session",
        ]),
        at: isoDaysAgo(i + 1, 15, 0),
      })),
    };
  },

  "POST /instructor/api/students/:studentId/nudge/": () => ({
    detail: "Nudge sent. The student will see it on their dashboard and by email.",
    sent_at: iso(new Date(nowMs())),
  }),

  "POST /instructor/api/cohorts/:cohortId/message/": () => ({
    detail: "Message queued for every active member of this batch.",
  }),

  "GET /instructor/api/assessments/": () => [
    {
      id: 901,
      title: "Full-Stack Engineering — Mid-Programme Assessment",
      slug: "full-stack-mid-programme",
      is_draft: false,
      submissions: 24,
      pending_review: 2,
      avg_score: 71,
      created_at: isoDaysAgo(30),
    },
    {
      id: 903,
      title: "Python for Data Science — Unit 2 Test",
      slug: "python-ds-unit-2",
      is_draft: false,
      submissions: 18,
      pending_review: 0,
      avg_score: 68,
      created_at: isoDaysAgo(22),
    },
  ],

  "GET /instructor/api/live-sessions/": () =>
    SCHEDULE.map((s) => ({
      id: s.id,
      topic_name: s.topic,
      class_datetime: s.dayOffset === 0 ? isoDaysAhead(0, s.hour, 0) : isoDaysAhead(s.dayOffset, s.hour, 0),
      duration_minutes: 60,
      meeting_status: s.status,
      cohort_name: s.cohort,
      registered: seededInt(`reg:${s.id}`, 18, 40),
      attendance_count: s.status === "live" ? seededInt(`live:${s.id}`, 12, 30) : 0,
      join_link: `/instructor/live-sessions?session=${s.id}`,
      is_zoom: true,
      timezone: "Asia/Kolkata",
    })),

  "GET /instructor/api/live-sessions/:sessionId/attendance/": (req) => {
    const members = cohortMembers(11, 28);
    return {
      session_id: Number(req.params.sessionId),
      count: members.length,
      results: members.map((p) => ({
        student_id: p.id,
        name: p.full_name,
        email: p.email,
        attended: seededInt(`att:${p.id}:${req.params.sessionId}`, 0, 10) > 2,
        duration_seconds: seededInt(`attd:${p.id}`, 600, 3600),
      })),
    };
  },

  "GET /instructor/api/live-sessions/:sessionId/host-link/": (req) => ({
    host_link: `/instructor/live-sessions?session=${req.params.sessionId}&host=1`,
  }),

});
