/**
 * Detail endpoints for every "open this row" destination.
 *
 * List pages and detail pages are separate endpoints with separate shapes, and a
 * demo that only serves the lists looks complete right up until someone clicks a
 * row. These are the ten that a sweep of every dynamic route turned up: cohort,
 * adaptive course, course roster, student, learning journey, job, email job,
 * course certificate config, and the two assessment views.
 *
 * Kept in one module because they share the same job — projecting an existing
 * seed record into the richer shape a detail page wants — rather than because
 * they belong to one feature.
 */

import { defineRoutes } from "../router";
import { emailJobDetail } from "./admin";
import { notFound } from "../types";
import { COURSES, courseById, topicsOf } from "../../db/courses";
import {
  INSTRUCTOR_PERSONA,
  STUDENTS,
  STUDENT_PERSONA,
  personById,
  type DemoPerson,
} from "../../db/people";
import { companyLogoFor } from "../../db/avatar";
import { iso, isoDaysAgo, isoDaysAhead, nowMs, ymd, ymdDaysAgo, ymdDaysAhead, daysAgo } from "../../clock";
import { seededInt, seededPick } from "../../random";

const MODULE = "details";

const COHORTS = [
  { id: 11, name: "Autumn 2026 — Full-Stack", courseIds: [201], size: 28, capacity: 35, status: "active" },
  { id: 12, name: "Autumn 2026 — Interview Prep", courseIds: [203], size: 22, capacity: 30, status: "active" },
  { id: 13, name: "Spring 2026 — Full-Stack", courseIds: [201], size: 24, capacity: 30, status: "completed" },
];

function membersOf(cohortId: number, size: number): DemoPerson[] {
  const start = (cohortId - 11) * 20;
  return [...STUDENTS.slice(start, start + size), STUDENT_PERSONA].slice(0, size);
}

function progressOf(p: DemoPerson): number {
  return p.id === STUDENT_PERSONA.id ? 56 : seededInt(`aprog:${p.id}`, 4, 98);
}

defineRoutes(MODULE, {
  // ── Cohort detail ───────────────────────────────────────────────────────
  "GET /cohort/api/admin/cohorts/:cohortId/": (req) => {
    const c = COHORTS.find((x) => x.id === Number(req.params.cohortId));
    if (!c) throw notFound("Cohort not found");
    const members = membersOf(c.id, c.size);

    return {
      id: c.id,
      name: c.name,
      description: `${c.name} runs the ${c.courseIds.map((id) => courseById(id)?.title).join(" and ")} track.`,
      status: c.status,
      start_date: c.status === "completed" ? ymdDaysAgo(210) : ymdDaysAgo(120),
      end_date: c.status === "completed" ? ymdDaysAgo(40) : ymdDaysAhead(90),
      capacity: c.capacity,
      member_count: members.length,
      created_at: isoDaysAgo(150),
      updated_at: isoDaysAgo(3),
      artifacts: c.courseIds
        .map((id) => courseById(id))
        .filter((x): x is NonNullable<typeof x> => Boolean(x))
        .map((course) => ({
          id: course.id,
          kind: "adaptive_course",
          title: course.title,
          assigned_at: isoDaysAgo(100),
        })),
      staff: [
        {
          profile_id: INSTRUCTOR_PERSONA.id,
          name: INSTRUCTOR_PERSONA.full_name,
          email: INSTRUCTOR_PERSONA.email,
          role: "lead",
        },
      ],
      members: members.map((p) => ({
        student_id: p.id,
        id: p.id,
        name: p.full_name,
        email: p.email,
        phone: p.phone,
        profile_pic_url: p.profile_pic_url,
        status: "active",
        progress: progressOf(p),
        joined_at: isoDaysAgo(seededInt(`join:${p.id}`, 30, 120)),
      })),
    };
  },

  /** Staff assigned to a cohort (the admin cohort page loads this separately). */
  "GET /instructor/api/admin/cohorts/:cohortId/staff/": () => [
    {
      profile_id: INSTRUCTOR_PERSONA.id,
      name: INSTRUCTOR_PERSONA.full_name,
      email: INSTRUCTOR_PERSONA.email,
      instructor_code: "MIT-VM-04",
      role: "lead",
      assigned_at: isoDaysAgo(100),
    },
  ],

  /** Cohort membership, paginated separately from the cohort record. */
  "GET /cohort/api/admin/cohorts/:cohortId/members/": (req) => {
    const c = COHORTS.find((x) => x.id === Number(req.params.cohortId));
    if (!c) throw notFound("Cohort not found");
    const members = membersOf(c.id, c.size);
    return {
      count: members.length,
      results: members.map((p) => ({
        id: p.id,
        student_id: p.id,
        name: p.full_name,
        email: p.email,
        phone: p.phone,
        profile_pic_url: p.profile_pic_url,
        status: "active",
        progress: progressOf(p),
        joined_at: isoDaysAgo(seededInt(`join:${p.id}`, 30, 120)),
      })),
    };
  },

  // ── Adaptive course detail (admin builder) ──────────────────────────────
  "GET /adaptive-quiz/api/admin/courses/:courseId/": (req) => {
    const course = courseById(Number(req.params.courseId));
    if (!course) throw notFound("Course not found");
    let order = 0;

    return {
      id: course.id,
      title: course.title,
      slug: course.slug,
      description: course.description,
      target_audience:
        course.difficulty === "Beginner"
          ? "Newcomers with no prior background"
          : "Learners with some programming experience",
      duration_weeks: course.modules.length * 2,
      difficulty_levels: [course.difficulty],
      is_published: true,
      self_enroll_enabled: true,
      review_status: "approved",
      review_note: "",
      created_by: INSTRUCTOR_PERSONA.full_name,
      created_at: isoDaysAgo(120),
      updated_at: isoDaysAgo(seededInt(`aupd:${course.id}`, 1, 20)),
      enrolled_count: course.enrolledCount,
      module_count: course.modules.length,
      submodule_count: topicsOf(course).length,
      certificate_enabled: true,
      certificate_threshold: course.certificateThreshold,
      // Content is ARRAYS here, not counts. The builder maps over them, and
      // sending numbers crashed the page on `.length` of a number's contents.
      modules: course.modules.map((m, i) => ({
        id: m.id,
        weekno: i + 1,
        title: m.title,
        description: m.summary,
        submodules: m.topics.map((t) => ({
          id: t.id,
          order: ++order,
          title: t.title,
          description: `Work through ${t.title.toLowerCase()} and prove it with practice.`,
          // default_tier + available_tiers are required: the builder prints
          // `a.available_tiers.length` with no guard.
          articles: t.kinds.includes("article")
            ? [
                {
                  article_id: t.id + 100_000,
                  title: t.title,
                  default_tier: "Intermediate",
                  available_tiers: ["Beginner", "Intermediate", "Advanced", "Expert"],
                  reading_time_minutes: 8,
                  concepts: [],
                },
              ]
            : [],
          quizzes: t.kinds.includes("quiz")
            ? [{ config_id: t.id + 200_000, quiz_title: `${t.title} - check your understanding`, mcq_count: 9 }]
            : [],
          coding_sets: t.kinds.includes("coding")
            ? [{ config_id: t.id + 300_000, title: `${t.title} - practice set`, problems: [] }]
            : [],
          video_companions: [],
          attachments: [],
        })),
      })),
      skills: course.tags.map((skill) => ({
        skill,
        question_count: seededInt(`sk:q:${course.id}:${skill}`, 6, 40),
        article_count: seededInt(`sk:a:${course.id}:${skill}`, 2, 12),
      })),
      content_health: {
        submodules_total: topicsOf(course).length,
        expected_content_types: ["article", "quiz"],
        missing: {},
        total_missing: 0,
        needs_regeneration: false,
        last_job: null,
      },
      assigned_cohorts: [{ id: 11, name: "Autumn 2026 - Full-Stack" }],
      enrollment_summary: {
        total: course.enrolledCount,
        by_source: {
          self: Math.round(course.enrolledCount * 0.6),
          cohort: Math.round(course.enrolledCount * 0.4),
        },
      },
    };
  },

  /** The enrolled roster for one adaptive course (admin + instructor course page). */
  "GET /adaptive-quiz/api/admin/courses/:courseId/students/": (req) => {
    const course = courseById(Number(req.params.courseId));
    if (!course) throw notFound("Course not found");
    const roster = [STUDENT_PERSONA, ...STUDENTS.slice(0, 24)];

    return {
      count: roster.length,
      results: roster.map((p) => ({
        student_id: p.id,
        id: p.id,
        name: p.full_name,
        email: p.email,
        phone: p.phone,
        profile_pic_url: p.profile_pic_url,
        enrolled_at: isoDaysAgo(seededInt(`enr:${p.id}`, 20, 120)),
        progress_percentage: progressOf(p),
        completed: Math.round((progressOf(p) / 100) * topicsOf(course).length),
        total: topicsOf(course).length,
        points: p.points,
        last_activity: isoDaysAgo(seededInt(`ilast:${p.id}`, 0, 9)),
      })),
    };
  },

  // ── Student detail + learning journey ───────────────────────────────────
  /**
   * StudentDetail groups its fields: personal_info / academic_summary /
   * enrolled_courses. The page reads `data.personal_info.first_name` directly,
   * so a flat payload crashed it even though every value was present.
   */
  "GET /admin-dashboard/api/clients/:clientId/manage-student/:studentId/": (req) => {
    const p = personById(Number(req.params.studentId));
    if (!p) throw notFound("Student not found");
    const hours = seededInt(`sdh:${p.id}`, 12, 160);

    return {
      id: p.id,
      user_id: p.id,
      personal_info: {
        first_name: p.first_name,
        last_name: p.last_name,
        email: p.email,
        username: p.user_name,
        profile_pic_url: p.profile_pic_url,
        date_joined: isoDaysAgo(seededInt(`dj:${p.id}`, 20, 200)),
        last_login: isoDaysAgo(seededInt(`ll:${p.id}`, 0, 12)),
        is_active: true,
      },
      academic_summary: {
        total_marks: p.points,
        total_time_spent: { value: hours, unit: "hours" },
        enrolled_courses_count: COURSES.filter((c) => c.enrolled).length,
        assessment_submissions_count: seededInt(`sas:${p.id}`, 0, 4),
        current_streak: p.streak,
        total_activities: seededInt(`sact:${p.id}`, 30, 260),
      },
      enrolled_courses: COURSES.filter((c) => c.enrolled).map((c) => ({
        id: c.id,
        title: c.title,
        description: c.subtitle,
        enrollment_date: isoDaysAgo(seededInt(`enr:${p.id}`, 20, 120)),
        marks: seededInt(`cm:${p.id}:${c.id}`, 60, 900),
        progress_percentage: seededInt(`sc:${p.id}:${c.id}`, 4, 98),
      })),
      phone_number: p.phone,
      college: p.college,
      linkedin_url: p.linkedin_url,
    };
  },

  /**
   * StudentLearningJourney: student / summary / courses / weekly_progress /
   * assessments / mock_interviews / adaptive / activity_breakdown /
   * activity_pattern_30_days / timeline. The page reads
   * `summary.overall_completion_pct` with no guard, so a partial payload takes
   * the route down rather than showing an empty tab.
   */
  "GET /admin-dashboard/api/clients/:clientId/student-learning-journey/:studentId/": (req) => {
    const p = personById(Number(req.params.studentId));
    if (!p) throw notFound("Student not found");

    const enrolled = COURSES.filter((c) => c.enrolled);
    const hours = seededInt(`lj:t:${p.id}`, 20, 160);
    const completion = progressOf(p);

    return {
      student: {
        id: p.id,
        user_id: p.id,
        name: p.full_name,
        first_name: p.first_name,
        last_name: p.last_name,
        email: p.email,
        username: p.user_name,
        profile_pic_url: p.profile_pic_url,
        is_active: true,
        date_joined: isoDaysAgo(seededInt(`dj:${p.id}`, 20, 200)),
        last_login: isoDaysAgo(seededInt(`ll:${p.id}`, 0, 12)),
      },
      summary: {
        enrolled_courses_count: enrolled.length,
        total_marks: p.points,
        total_time_hours: hours,
        current_streak: p.streak,
        total_activities: seededInt(`lj:act:${p.id}`, 30, 260),
        overall_completion_pct: completion,
        last_activity_date: isoDaysAgo(seededInt(`ilast:${p.id}`, 0, 9)),
        assessments_count: seededInt(`lj:s:${p.id}`, 0, 4),
        mock_interviews_count: seededInt(`lj:i:${p.id}`, 0, 3),
        adaptive_sessions_count: seededInt(`lj:ad:${p.id}`, 4, 40),
      },
      courses: enrolled.map((c) => ({
        id: c.id,
        title: c.title,
        progress_percentage: seededInt(`sc:${p.id}:${c.id}`, 4, 98),
        marks: seededInt(`cm:${p.id}:${c.id}`, 60, 900),
        enrollment_date: isoDaysAgo(seededInt(`enr:${p.id}`, 20, 120)),
        completed_items: seededInt(`ci:${p.id}:${c.id}`, 2, 20),
        total_items: topicsOf(c).length,
        last_activity: isoDaysAgo(seededInt(`la:${p.id}:${c.id}`, 0, 14)),
      })),
      weekly_progress: enrolled.map((c) => ({
        course_id: c.id,
        course_title: c.title,
        weeks: Array.from({ length: 8 }, (_, w) => ({
          week: w + 1,
          activities: seededInt(`wk:${p.id}:${c.id}:${w}`, 0, 12),
          marks: seededInt(`wm:${p.id}:${c.id}:${w}`, 0, 120),
        })),
      })),
      assessments: [
        {
          id: 902,
          title: "Data Structures & Algorithms — Diagnostic",
          score: seededInt(`as:${p.id}`, 48, 94),
          total_marks: 50,
          submitted_at: isoDaysAgo(18),
          status: "completed",
        },
      ],
      mock_interviews: {
        summary: {
          total: 2,
          completed: 2,
          average_score: seededInt(`mia:${p.id}`, 55, 88),
          highest_score: seededInt(`mih:${p.id}`, 70, 95),
        },
        items: [
          {
            id: 801,
            title: "Backend fundamentals — systems and APIs",
            score: seededInt(`mi1:${p.id}`, 55, 92),
            status: "completed",
            created_at: isoDaysAgo(9),
          },
        ],
      },
      adaptive: {
        sessions: seededInt(`ad:s:${p.id}`, 4, 40),
        questions_answered: seededInt(`ad:q:${p.id}`, 30, 300),
        accuracy: seededInt(`ad:a:${p.id}`, 48, 92),
        skills: enrolled.flatMap((c) => c.tags.slice(0, 2)).slice(0, 6).map((skill) => ({
          skill,
          mastery: seededInt(`ad:m:${p.id}:${skill}`, 30, 95),
        })),
      },
      activity_breakdown: {
        Article: seededInt(`ab:a:${p.id}`, 10, 70),
        Quiz: seededInt(`ab:q:${p.id}`, 5, 44),
        CodingProblem: seededInt(`ab:c:${p.id}`, 3, 60),
        VideoTutorial: 0,
        Assignment: seededInt(`ab:s:${p.id}`, 0, 8),
      },
      activity_pattern_30_days: Array.from({ length: 30 }, (_, i) => ({
        date: ymd(daysAgo(29 - i)),
        activity_count: seededInt(`ap:${p.id}:${i}`, 0, 9),
        time_spent_hours: Number((seededInt(`ah:${p.id}:${i}`, 0, 25) / 10).toFixed(1)),
        marks_earned: seededInt(`am:${p.id}:${i}`, 0, 90),
      })),
      timeline: Array.from({ length: 10 }, (_, i) => ({
        id: 9600 + i,
        type: seededPick(`tl:t:${p.id}:${i}`, ["article", "quiz", "coding", "live_session", "assessment"]),
        title: seededPick(`tl:${p.id}:${i}`, [
          "Completed a lesson",
          "Submitted a coding problem",
          "Took an adaptive quiz",
          "Attended a live session",
        ]),
        course: seededPick(`tl:c:${p.id}:${i}`, enrolled.map((c) => c.title)),
        marks: seededInt(`tl:m:${p.id}:${i}`, 0, 90),
        at: isoDaysAgo(i + 1, 15, 0),
        created_at: isoDaysAgo(i + 1, 15, 0),
      })),
    };
  },

  // ── Job detail (admin) ──────────────────────────────────────────────────
  "GET /jobs-v2/api/admin/jobs/:jobId/": (req) => {
    const id = Number(req.params.jobId);
    const known: Record<number, { title: string; company: string; salary: string; location: string }> = {
      601: { title: "Software Engineer I (Backend)", company: "Razorpay", salary: "₹18-24 LPA", location: "Bengaluru (Hybrid)" },
      602: { title: "Frontend Engineer", company: "Zerodha", salary: "₹16-22 LPA", location: "Bengaluru (On-site)" },
      603: { title: "Data Analyst — Growth", company: "Swiggy", salary: "₹12-18 LPA", location: "Bengaluru (Hybrid)" },
      604: { title: "Machine Learning Intern", company: "Freshworks", salary: "₹60,000 / month", location: "Chennai (On-site)" },
      605: { title: "Platform Engineer (Cloud)", company: "Postman", salary: "₹20-28 LPA", location: "Remote (India)" },
      606: { title: "Associate Software Engineer", company: "Atlassian", salary: "₹22-30 LPA", location: "Bengaluru (Hybrid)" },
    };
    const job = known[id];
    if (!job) throw notFound("Job not found");

    const applicants = STUDENTS.slice(0, seededInt(`apl:${id}`, 6, 18));
    return {
      id,
      job_title: job.title,
      company_name: job.company,
      company_logo: companyLogoFor(job.company),
      location: job.location,
      salary: job.salary,
      employment_type: id === 604 ? "Internship" : "Full-time",
      status: id === 606 ? "closed" : "active",
      number_of_openings: seededInt(`op:${id}`, 2, 10),
      application_deadline: id === 606 ? isoDaysAgo(4) : isoDaysAhead(12),
      created_at: isoDaysAgo(id % 20),
      is_published: true,
      applications_count: applicants.length,
      applications: applicants.map((p, i) => ({
        id: 7100 + i,
        student: { id: p.id, name: p.full_name, email: p.email, profile_pic_url: p.profile_pic_url },
        status: i === 0 ? "shortlisted" : i === 1 ? "rejected" : "applied",
        applied_at: isoDaysAgo(i + 2),
      })),
    };
  },

  /**
   * Email job detail.
   *
   * Delegates to the same seed the list uses. It previously invented its own
   * fields (`total_recipients`, `sent`, `recipients`) where `EmailJobDetail`
   * declares `emails` / `successful_emails` / `failed_emails`, so the drawer
   * opened onto a job with no recipients and no counts — and it was one fixed
   * job regardless of which card you clicked.
   */
  "GET /admin-dashboard/api/clients/:clientId/email-jobs/:jobId/": (req) =>
    emailJobDetail(String(req.params.jobId)),

  // ── Certificate config for a course ─────────────────────────────────────
  "GET /admin-dashboard/api/clients/:clientId/courses/:courseId/view-course-details/": (req) => {
    const course = courseById(Number(req.params.courseId));
    if (!course) throw notFound("Course not found");
    return {
      course_id: course.id,
      course_title: course.title,
      certificate_enabled: true,
      min_completion_percent: course.certificateThreshold,
      title: `${course.title} — Certificate of Completion`,
      template_url: null,
      configured: true,
      eligible_students: Math.round(course.enrolledCount * 0.18),
      issued_count: Math.round(course.enrolledCount * 0.11),
    };
  },

  // ── Legacy course dashboard + leaderboard ───────────────────────────────
  /** Per-course progress panel on the classic course page. */
  "GET /lms/clients/:clientId/courses/:courseId/user-course-dashboard/": (req) => {
    const course = courseById(Number(req.params.courseId));
    if (!course) throw notFound("Course not found");
    const topics = topicsOf(course);
    const done = topics.filter((t) => t.progress === 100).length;

    return {
      course_id: course.id,
      course_title: course.title,
      progress_percentage: course.completion,
      completed_items: done,
      total_items: topics.length,
      time_spent_seconds: seededInt(`cts:${course.id}`, 8, 40) * 3600,
      last_accessed: isoDaysAgo(1, 19, 0),
      certificate_eligible: course.completion >= course.certificateThreshold,
      certificate_threshold: course.certificateThreshold,
      stats: {
        articles: topics.filter((t) => t.kinds.includes("article")).length,
        quizzes: topics.filter((t) => t.kinds.includes("quiz")).length,
        coding: topics.filter((t) => t.kinds.includes("coding")).length,
        assignments: topics.filter((t) => t.kinds.includes("assignment")).length,
      },
    };
  },

  "GET /lms/clients/:clientId/courses/:courseId/leaderboard/": () =>
    [STUDENT_PERSONA, ...STUDENTS.slice(0, 14)]
      .map((p) => ({
        id: p.id,
        name: p.full_name,
        profile_pic_url: p.profile_pic_url,
        marks: p.points,
        score: p.points,
        college: p.college,
        is_current_user: p.id === STUDENT_PERSONA.id,
      }))
      .sort((a, b) => b.marks - a.marks)
      .map((row, i) => ({ ...row, rank: i + 1 })),

  /**
   * Generic upload. Accepts and echoes a data URI rather than storing anything,
   * so an uploaded file appears immediately and needs no bucket.
   */
  "POST /api/clients/:clientId/upload/": () => ({
    url: "",
    detail: "Uploads are accepted but not stored in this demo.",
  }),
  "GET /api/clients/:clientId/upload/": () => ({ results: [], count: 0 }),

  /** Pre-flight readiness gate shown before starting a paper. */
  "GET /assessment/api/client/:clientId/assessment-readiness/:slug/": () => ({
    ready: true,
    can_start: true,
    blockers: [],
    device_supported: true,
    camera_required: false,
    microphone_required: false,
    fullscreen_required: true,
    attempts_used: 0,
    attempts_allowed: 1,
    detail: "You are ready to begin.",
  }),

  // ── Assessment detail + result ──────────────────────────────────────────
  "GET /assessment/api/client/:clientId/assessment-details/:slug/": (req) => {
    const slug = req.params.slug;
    const known: Record<string, { id: number; title: string; minutes: number; questions: number; sections: number; proctored: boolean }> = {
      "full-stack-mid-programme": { id: 901, title: "Full-Stack Engineering — Mid-Programme Assessment", minutes: 90, questions: 45, sections: 4, proctored: true },
      "dsa-diagnostic": { id: 902, title: "Data Structures & Algorithms — Diagnostic", minutes: 40, questions: 25, sections: 3, proctored: false },
      "python-ds-unit-2": { id: 903, title: "Python for Data Science — Unit 2 Test", minutes: 60, questions: 30, sections: 2, proctored: false },
      "end-of-programme-comprehensive": { id: 904, title: "End-of-Programme Comprehensive", minutes: 150, questions: 80, sections: 6, proctored: true },
    };
    const a = known[slug];
    if (!a) throw notFound("Assessment not found");

    return {
      id: a.id,
      slug,
      title: a.title,
      description: "A timed paper covering the material for this stage of the programme.",
      instructions:
        `${a.minutes} minutes, ${a.questions} questions across ${a.sections} sections. You may move ` +
        `freely between sections and flag questions to revisit. The paper submits itself when the ` +
        `timer ends, so there is no penalty for running out of time on the last question.`,
      duration_minutes: a.minutes,
      number_of_questions: a.questions,
      number_of_sections: a.sections,
      proctoring_enabled: a.proctored,
      is_active: true,
      is_paid: false,
      requires_purchase: false,
      purchased: true,
      allow_desktop: true,
      allow_mobile: !a.proctored,
      sections: Array.from({ length: a.sections }, (_, i) => ({
        id: a.id * 10 + i,
        title: `Section ${i + 1}`,
        question_count: Math.round(a.questions / a.sections),
        marks: Math.round(a.questions / a.sections) * 2,
      })),
    };
  },

  "GET /assessment/api/client/:clientId/assessment-result/:slug/": (req) => {
    const slug = req.params.slug;
    const score = slug === "dsa-diagnostic" ? 76 : 72;
    const questions = slug === "dsa-diagnostic" ? 25 : 45;

    return {
      slug,
      student_name: STUDENT_PERSONA.full_name,
      score,
      percentage: score,
      total_marks: questions * 2,
      obtained_marks: Math.round((score / 100) * questions * 2),
      grade: score >= 85 ? "A" : score >= 70 ? "B" : "C",
      passed: score >= 50,
      rank: 7,
      total_students: 84,
      percentile: 72,
      submitted_at: isoDaysAgo(18, 10, 40),
      time_taken_minutes: 34,
      sections: [
        { name: "Complexity", total: 8, correct: 7, percentage: 88 },
        { name: "Arrays and hashing", total: 9, correct: 7, percentage: 78 },
        { name: "Trees and graphs", total: 8, correct: 5, percentage: 63 },
      ],
      generated_at: iso(new Date(nowMs())),
    };
  },
});
