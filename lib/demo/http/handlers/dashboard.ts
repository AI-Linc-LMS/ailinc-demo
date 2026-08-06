/**
 * The student dashboard — the first screen a prospect sees after signing in, and
 * the one that has to carry the most.
 *
 * The AI briefing is written to sound like the product's own voice: specific
 * about what happened, specific about what to do next, and never generically
 * encouraging. "Nice work, keep it up!" is what a demo says; "Sliding window is
 * your weakest pattern at 34%" is what a product says.
 */

import { defineRoutes } from "../router";
import type { LearnerDashboard } from "@/lib/types/dashboard";
import {
  dashboardCourse,
  enrolledCourses,
  leaderboardRows,
  myRank,
  overallProgress,
  pointsThisWeek,
  streakSummary,
  todayGoal,
  totalPoints,
  upNextFor,
  activeDates,
} from "../../db/learner";
import { nextTopic } from "../../db/courses";
import { STUDENT_PERSONA, rankedLearners } from "../../db/people";
import { currentMonth, daysInMonth, iso, nowMs, ymd, daysAgo } from "../../clock";
import { overlay } from "../../db/overlay";
import { seededInt } from "../../random";

const MODULE = "dashboard";

/** Momentum: a 0-100 score that climbs with the streak and caps out. */
function momentumInfo() {
  const current = STUDENT_PERSONA.streak;
  const perDay = 3;
  const cap = 100;
  const value = Math.min(cap, current * perDay + 20);
  return {
    value,
    current,
    perDay,
    cap,
    daysToMax: Math.max(0, Math.ceil((cap - value) / perDay)),
    atMax: value >= cap,
    formula: "20 + 3 points per consecutive active day, capped at 100",
  };
}

/**
 * The daily briefing.
 *
 * Deliberately references the learner's actual weakest course and its actual
 * next item, so the copy changes if the seed changes rather than being a fixed
 * paragraph that could contradict the cards beneath it.
 */
function briefing() {
  const courses = enrolledCourses();
  const weakest = [...courses].sort((a, b) => a.completion - b.completion)[0];
  const strongest = [...courses].sort((a, b) => b.completion - a.completion)[0];
  const next = weakest ? nextTopic(weakest) : null;

  const actions = courses
    .map((course) => {
      const up = upNextFor(course);
      if (!up) return null;
      return {
        label: up.title,
        course: course.title,
        route: `/adaptive-courses/${course.id}/submodule/${up.nodeId}`,
        points: up.points,
        kind: up.type,
      };
    })
    .filter((a): a is NonNullable<typeof a> => a !== null)
    .slice(0, 3);

  return {
    headline: `You are ${overallProgress()}% through your programme and on a ${STUDENT_PERSONA.streak}-day streak.`,
    lastWeek: `Last week you cleared ${seededInt("briefing:lastweek", 6, 12)} items and held your streak every day. ${strongest?.title ?? "Your strongest course"} moved the most.`,
    thisWeek: {
      focus: weakest
        ? `Close the gap on ${weakest.title} — it is your lowest course at ${weakest.completion}%.`
        : "Keep your pace steady across all courses.",
      course: weakest?.title ?? "",
    },
    today: next
      ? `Start with "${next.topic.title}". It is 20 minutes and unblocks the rest of ${next.module.title}.`
      : "You are clear for today. A quiz would keep your streak alive.",
    weakestSkill: weakest
      ? {
          skill: weakest.tags[0] ?? "Fundamentals",
          course: weakest.title,
          percent: Math.max(20, weakest.completion - 8),
          fixSuggestion:
            "Two 25-minute sessions this week would move this more than another pass over material you already know.",
          route: `/adaptive-courses/${weakest.id}`,
        }
      : null,
    actions,
    focusRoute: weakest ? `/adaptive-courses/${weakest.id}` : "/adaptive-courses",
    source: "ai",
  };
}

function learnerDashboard(): LearnerDashboard {
  const courses = enrolledCourses();
  const streak = streakSummary();

  return {
    profile: {
      name: STUDENT_PERSONA.full_name,
      weekNo: 7,
      weekDueAt: null,
      weekProgressPct: overallProgress(),
      streakDays: streak.current,
      bestStreak: streak.best,
    },
    aggregate: {
      totalPoints: totalPoints(),
      pointsThisWeek: pointsThisWeek(),
      streak,
      momentum: momentumInfo().value,
      momentumInfo: momentumInfo(),
      // A FRACTION, not a percentage: StatCards renders `onTimeRate * 100`.
      onTimeRate: 0.92,
      overallMasteryAvg: overallProgress(),
      cohortRank: {
        bestRank: myRank().rank,
        rankDelta: myRank().rankDelta,
        perCourse: Object.fromEntries(
          courses.map((c) => [String(c.id), seededInt(`rank:${c.id}`, 2, 24)]),
        ),
      },
    },
    courses: courses.map(dashboardCourse),
    crossCourseUpNext: courses
      .map((course) => {
        const up = upNextFor(course);
        if (!up) return null;
        return {
          ...up,
          courseId: course.id,
          courseTitle: course.title,
          resumeSubmoduleId: nextTopic(course)?.topic.id ?? null,
        };
      })
      .filter((n): n is NonNullable<typeof n> => n !== null),
    leaderboard: {
      me: myRank(),
      rows: leaderboardRows(10),
      aiTip: `You are ${Math.max(1, leaderboardRows(3)[0].score - totalPoints())} points behind the top of your cohort. Two coding problems would close most of it.`,
    },
    todayGoal: todayGoal(),
    briefing: briefing(),
    generatedAt: iso(new Date(nowMs())),
  };
}

defineRoutes(MODULE, {
  "GET /adaptive-journey/api/learner/dashboard/": () => learnerDashboard(),

  "GET /adaptive-journey/api/learner/points-total/": () => ({ total: totalPoints() }),

  /**
   * The migration banner that invites legacy-course users into adaptive courses.
   * Switched off: this demo's tenant is adaptive-native, so the banner would be
   * telling a prospect to migrate away from something they have not seen.
   */
  "GET /adaptive-quiz/api/promotion/": () => ({
    eligible: false,
    show_banner: false,
    show_intro_modal: false,
    has_prior_courses: false,
  }),
  "GET /adaptive-course/api/promotion/": () => ({
    eligible: false,
    show_banner: false,
    show_intro_modal: false,
    has_prior_courses: false,
  }),
  "POST /adaptive-quiz/api/promotion/dismiss/": () => ({ detail: "Dismissed" }),
  "POST /adaptive-course/api/promotion/dismiss/": () => ({ detail: "Dismissed" }),

  /** Right-rail "Today's leaders": who put in the most time today. */
  "GET /api/clients/:clientId/student/daily-progress-leaderboard/": () =>
    rankedLearners()
      .slice(0, 8)
      .map((person, i) => ({
        user: {
          id: person.id,
          user_name: person.full_name,
          profile_pic_url: person.profile_pic_url,
        },
        name: person.full_name,
        score: seededInt(`daily:${person.id}`, 800, 9000),
        rank: i + 1,
        college: person.college,
        linkedin_url: person.linkedin_url,
      }))
      .sort((a, b) => b.score - a.score)
      .map((row, i) => ({ ...row, rank: i + 1 })),

  "GET /api/clients/:clientId/overall-leaderboard/": (req) => {
    const limit = Number(req.query.get("limit") ?? 20);
    return rankedLearners()
      .slice(0, limit)
      .map((person, i) => ({
        id: person.id,
        name: person.full_name,
        marks: person.points,
        rank: i + 1,
        profile_pic_url: person.profile_pic_url,
        college: person.college,
        linkedin_url: person.linkedin_url,
        email: person.email,
        user_name: person.full_name,
        course_name: "Full-Stack Web Development",
      }));
  },

  /**
   * The streak calendar. `streak` is keyed YYYY-MM-DD for the requested month and
   * must agree with the header's streak count — they are rendered side by side.
   */
  "GET /api/clients/:clientId/student/monthly-streak/": (req) => {
    const requested = req.query.get("month");
    const { year, month } = requested
      ? { year: Number(requested.slice(0, 4)), month: Number(requested.slice(5, 7)) }
      : currentMonth();

    const active = activeDates(400);
    const streak: Record<string, boolean> = {};
    const monthly_days: number[] = [];

    for (let day = 1; day <= daysInMonth(year, month); day++) {
      const date = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const isActive = active.has(date);
      streak[date] = isActive;
      if (isActive) monthly_days.push(day);
    }

    const summary = streakSummary();
    return {
      year,
      month,
      streak,
      monthly_days,
      current_streak: summary.current,
      longest_streak: summary.best,
    };
  },

  /** Contribution-graph style heatmap on the profile and streaks pages. */
  "GET /api/clients/:clientId/student/user-activity-heatmap/": () => {
    const active = activeDates(365);
    const heatmap_data: Record<string, Record<string, number>> = {};

    for (let i = 0; i < 365; i++) {
      const date = ymd(daysAgo(i));
      if (!active.has(date)) continue;
      const quiz = seededInt(`hm:q:${date}`, 0, 3);
      const article = seededInt(`hm:a:${date}`, 0, 4);
      const coding = seededInt(`hm:c:${date}`, 0, 3);
      const video = seededInt(`hm:v:${date}`, 0, 4);
      heatmap_data[date] = {
        Quiz: quiz,
        Article: article,
        Assignment: 0,
        CodingProblem: coding,
        DevCodingProblem: 0,
        VideoTutorial: video,
        total: quiz + article + coding + video,
      };
    }
    return { heatmap_data };
  },

  "GET /admin-dashboard/api/clients/:clientId/student-activity-analytics/": () =>
    rankedLearners()
      .slice(0, 12)
      .map((person) => ({
        studentName: person.full_name,
        Present_streak: person.streak,
        Active_days: seededInt(`activedays:${person.id}`, 12, 96),
        profile_pic_url: person.profile_pic_url,
      })),

  /**
   * Dashboard scorecard preview. The full scorecard is its own module; this is
   * the trimmed payload that endpoint serves, and every field is optional in the
   * mapper, so the preview card renders without the heavy sections.
   */
  "GET /api/scorecard/clients/:clientId/student/scorecard/dashboard/": () => {
    const courses = enrolledCourses();
    const hours = seededInt("scorecard:hours", 90, 160);
    return {
      scorecard_config: {
        enabled_modules: ["overview", "learning_consumption", "skills", "assessments"],
      },
      overview: {
        student_name: STUDENT_PERSONA.full_name,
        program_name: "Full-Stack Engineering Track",
        cohort: "Autumn 2026",
        current_week: 7,
        current_module: courses[0]?.title ?? "-",
        overall_performance_score: overallProgress(),
        overall_grade: "Proficient",
        total_time_spent_seconds: hours * 3600,
        attendance_percentage: 94,
        rank_in_cohort: myRank().rank,
        total_students: rankedLearners().length,
      },
      learning_consumption: {
        videos_watched: seededInt("sc:videos", 40, 90),
        articles_read: seededInt("sc:articles", 30, 70),
        quizzes_attempted: seededInt("sc:quizzes", 18, 44),
        coding_problems_solved: seededInt("sc:coding", 22, 60),
        assignments_submitted: seededInt("sc:assign", 3, 9),
        total_time_spent_seconds: hours * 3600,
      },
    };
  },

  /** Notification bell. Unread count reflects anything the visitor has read. */
  "GET /notification/api/clients/:clientId/notifications/unread-count/": () => {
    const read = overlay.get<number[]>("notifications:read", []);
    const allRead = overlay.get<boolean>("notifications:allRead", false);
    const unread = allRead ? 0 : Math.max(0, 4 - read.length);
    return { unread_count: unread, count: unread };
  },
});
