/**
 * The course list the dashboard's "My Courses" rail and the catalogue read.
 *
 * This is the legacy `lms/` shape. The product is mid-migration to adaptive
 * courses (which have their own endpoints and their own richer payload), but the
 * dashboard still sources this rail from here, so both are served from the same
 * seed to keep them consistent.
 */

import { defineRoutes } from "../router";
import { notFound } from "../types";
import {
  COURSES,
  courseArt,
  enrolledAt,
  itemCounts,
  courseById,
  type DemoCourse,
} from "../../db/courses";
import { companyLogoFor } from "../../db/avatar";
import { STUDENTS } from "../../db/people";
import { iso, isoDaysAgo, nowMs } from "../../clock";
import { overlay } from "../../db/overlay";
import { seededSample } from "../../random";

const MODULE = "courses";

/** Employers shown as "trusted by" on a course page. */
const TRUSTED_BY = [
  "Razorpay",
  "Zerodha",
  "Swiggy",
  "Freshworks",
  "Postman",
  "Atlassian",
].map((name, i) => ({ id: i + 1, name, logo_url: companyLogoFor(name) }));

/** Courses the visitor enrolled in during this session, on top of the seed. */
function isEnrolled(course: DemoCourse): boolean {
  const extra = overlay.get<number[]>("courses:enrolled", []);
  return course.enrolled || extra.includes(course.id);
}

function toApiCourse(course: DemoCourse) {
  const counts = itemCounts(course);
  const cohort = seededSample(`students:${course.id}`, STUDENTS, 5);

  return {
    id: course.id,
    title: course.title,
    subtitle: course.subtitle,
    description: course.description,
    slug: course.slug,
    requirements:
      "Comfort with basic programming. Everything else is taught from first principles.",
    learning_objectives: course.modules.map((m) => m.summary).join("\n"),
    language: "English",
    difficulty_level: course.difficulty,
    duration_in_hours: course.durationHours,
    price: "0.00",
    is_free: true,
    certificate_available: true,
    thumbnail: courseArt(course),
    preview_video_url: null,
    published: true,
    enrollment_enabled: true,
    created_at: enrolledAt(course),
    updated_at: isoDaysAgo(4),
    tags: course.tags,
    client: 101,
    liked_by: [],
    is_enrolled: isEnrolled(course),
    instructors: [
      {
        id: course.instructor.id,
        name: course.instructor.full_name,
        bio: course.instructor.headline,
        profile_pic_url: course.instructor.profile_pic_url,
        linkedin: course.instructor.linkedin_url,
      },
    ],
    trusted_by: TRUSTED_BY,
    enrolled_students: {
      total: course.enrolledCount,
      students_profile_pic: cohort.map((s) => s.profile_pic_url),
    },
    stats: {
      video: { total: counts.video },
      quiz: { total: counts.quiz },
      article: { total: counts.article },
      assignment: { total: counts.assignment },
      coding_problem: { total: counts.coding_problem },
      subjective_question: { total: 0 },
    },
    rating: course.rating,
    rating_count: course.ratingCount,
    // The dashboard rail reads progress off the list without a second request.
    progress: course.completion,
    completion_percentage: course.completion,
  };
}

defineRoutes(MODULE, {
  "GET /lms/clients/:clientId/courses/": () => COURSES.map(toApiCourse),

  /**
   * Course DETAIL is a different shape from the list item: `CourseDetail`, with
   * course_id/course_title/modules rather than id/title/stats. Returning the
   * list shape here crashed the page with "Objects are not valid as a React
   * child" — the component rendered a field it expected to be a string and got
   * one of the list's nested objects instead.
   */
  "GET /lms/clients/:clientId/courses/:courseId/": (req) => {
    const course = courseById(Number(req.params.courseId));
    if (!course) throw notFound("Course not found");

    return {
      course_id: course.id,
      course_title: course.title,
      course_description: course.description,
      instructors: [
        {
          id: course.instructor.id,
          name: course.instructor.full_name,
          bio: course.instructor.headline,
          profile_pic_url: course.instructor.profile_pic_url,
          linkedin: course.instructor.linkedin_url,
        },
      ],
      enrolled_students: course.enrolledCount,
      liked_count: Math.round(course.enrolledCount * 0.42),
      is_liked_by_current_user: false,
      is_certified: true,
      certificate_available: true,
      updated_at: isoDaysAgo(4),
      content_lock_enabled: false,
      lock_threshold_value: 0,
      modules: course.modules.map((m, i) => {
        const done = m.topics.filter((t) => t.progress === 100).length;
        return {
          id: m.id,
          weekno: i + 1,
          title: m.title,
          completion_percentage: Math.round((done / Math.max(1, m.topics.length)) * 100),
          submodules: m.topics.map((t, order) => ({
            id: t.id,
            title: t.title,
            description: `Work through ${t.title.toLowerCase()} and prove it with practice.`,
            order: order + 1,
            video_count: t.kinds.filter((k) => k === "video").length,
            quiz_count: t.kinds.filter((k) => k === "quiz").length,
            article_count: t.kinds.filter((k) => k === "article").length,
            coding_problem_count: t.kinds.filter((k) => k === "coding").length,
            assignment_count: t.kinds.filter((k) => k === "assignment").length,
            subjective_question_count: 0,
          })),
        };
      }),
    };
  },

  /**
   * Enrolment is recorded in the overlay, so a prospect who enrols from the
   * catalogue finds the course on their dashboard afterwards. That round trip is
   * worth more in a demo than any static "enrolled" badge.
   */
  "POST /lms/clients/:clientId/courses/:courseId/enroll/": (req) => {
    const course = courseById(Number(req.params.courseId));
    if (!course) throw notFound("Course not found");
    overlay.update<number[]>("courses:enrolled", [], (list) =>
      list.includes(course.id) ? list : [...list, course.id],
    );
    return { detail: `You are enrolled in ${course.title}.`, enrolled_at: iso(new Date(nowMs())) };
  },
});
