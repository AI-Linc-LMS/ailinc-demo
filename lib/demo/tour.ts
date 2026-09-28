/**
 * The platform tour: one narrated walkthrough per role.
 *
 * The product already ships per-page guides and a spotlight tour engine. What it
 * has no reason to ship — and what a demo needs — is an orientation that runs
 * the moment someone signs in and explains the platform as a whole, module by
 * module, before they have any idea what the sidebar means.
 *
 * Each step carries a `route` AND a `targetId`. The route makes the tour walk the
 * product rather than describe it from one page; the target makes it point at the
 * thing it is talking about once it gets there. Where a page has no meaningful
 * anchor of its own, the target is `page-header` — every ModulePageHeader carries
 * it — which at least frames the page the narration is about. The opening and
 * closing steps have no target on purpose: they are about the platform, not about
 * any one element.
 *
 * Narration says what each module is FOR rather than what it is called, and
 * avoids bullet-speak: it is revealed a few words at a time as the visitor reads.
 */

import type { TourStep } from "@/components/community/TourProvider";

/**
 * The student tour.
 *
 * Rewritten twice over for the school edition. The narration is written for an
 * eleven year old, which mostly means saying what a thing is FOR in the words a
 * child would use, and never naming a feature the sidebar does not name.
 *
 * It also had to be repointed. It walked to /adaptive-courses/201/journey and
 * /adaptive-courses/201/submodule/5009, and neither exists any more: the school
 * catalogue renumbered courses to 301-306 and topics to the 6000 range, so the
 * tour was leading every visitor to two dead routes. Three stops were removed
 * outright - mock interviews, jobs and the CV builder - because those modules are
 * switched off for a school and the tour was the only thing still linking to them.
 *
 * Ids are written as literals rather than imported from the seed on purpose: a
 * tour step is content, and importing the catalogue here would make the narration
 * depend on whatever order the seed happens to be in. They are checked by a test
 * instead, so a renumbering fails loudly rather than silently walking to a 404.
 */
const STUDENT_TOUR: TourStep[] = [
  {
    route: "/dashboard",
    title: "Hello, and welcome",
    narration:
      "This is what your pupils see when they sign in. In the next two minutes I will show you every part of it: where their lessons live, how the quizzes work out what they know, and where their teacher sees how they are getting on.",
    icon: "mdi:hand-wave-outline",
    color: "#4aa2f0",
  },
  {
    targetId: "dash-briefing",
    title: "What to do today",
    narration:
      "Every morning this looks at what a child has actually done and picks the one thing worth doing next. Not a cheerful message: a particular lesson, chosen because that is where they are struggling.",
    placement: "bottom",
    icon: "mdi:white-balance-sunny",
    color: "#1b6fd4",
  },
  {
    targetId: "dash-stats",
    title: "Points, streaks and where they are in the class",
    narration:
      "Points come from finishing work. A streak counts the days in a row they have done something. Both are there because a twelve year old will come back for a streak long after they have stopped caring about a progress bar.",
    placement: "bottom",
    icon: "mdi:lightning-bolt",
    color: "#f59e0b",
  },
  {
    route: "/adaptive-courses",
    targetId: "adaptive-grid",
    title: "Their subjects",
    narration:
      "Maths, Science, English, Social Studies, Computing and Art. Each subject has a colour and a picture, so a child finds the right one by recognising it rather than by reading six titles.",
    placement: "right",
    icon: "mdi:book-education-outline",
    color: "#14b8a6",
  },
  {
    route: "/adaptive-courses/301/journey",
    targetId: "journey-board",
    title: "Quizzes that follow the child",
    narration:
      "Inside each topic is a quiz that adjusts. Get one right and the next is harder; get one wrong and it steps back and tries an easier way in. It stops when it knows where they are, instead of marching through twenty questions regardless.",
    placement: "right",
    icon: "mdi:comment-question-outline",
    color: "#4aa2f0",
  },
  {
    route: "/adaptive-courses/305/submodule/6028",
    targetId: "submodule-body",
    title: "Writing real code",
    narration:
      "In Computing they write a real program and it really runs. If it is wrong, they see exactly which test failed and what their code gave back. Hints come one at a time: a nudge first, and the answer only if they ask again.",
    placement: "right",
    icon: "mdi:code-braces",
    color: "#818cf8",
  },
  {
    route: "/assessments",
    targetId: "assessments-grid",
    title: "Tests",
    narration:
      "Proper papers, timed, set by the teacher. Results are broken down section by section, so a child can see it was fractions that let them down rather than just seeing a number.",
    placement: "right",
    icon: "mdi:clipboard-text-clock-outline",
    color: "#0ea5e9",
  },
  {
    route: "/live-sessions",
    targetId: "live-tabs",
    title: "Live classes",
    narration:
      "Lessons with their teacher and their class. Attendance is taken on its own, and the recording is waiting afterwards, so a child who was off sick can catch up without asking anyone.",
    placement: "right",
    icon: "mdi:video-outline",
    color: "#3b82f6",
  },
  {
    route: "/community",
    targetId: "tour-filters",
    title: "Their class group",
    narration:
      "Where they ask the rest of the class. A question can carry points for whoever answers it well, which is the part that gets questions answered instead of ignored.",
    placement: "right",
    icon: "mdi:forum-outline",
    color: "#e879f9",
  },
  {
    route: "/tickets",
    targetId: "tickets-tabs",
    title: "Getting help",
    narration:
      "For when something is broken rather than hard: a video that will not play, a name spelled wrong on a certificate. It reaches the right person without the child having to know who that is.",
    placement: "right",
    icon: "mdi:lifebuoy",
    color: "#64748b",
  },
  {
    route: "/dashboard",
    title: "Have a look around",
    narration:
      "Everything is switched on and full of real work, so click anything. The question mark on any page explains that page, and the Guide button at the top starts this tour again.",
    icon: "mdi:compass-outline",
    color: "#4aa2f0",
  },
];

const INSTRUCTOR_TOUR: TourStep[] = [
  {
    route: "/instructor/dashboard",
    title: "The instructor workspace",
    narration:
      "This view is built around triage: who is falling behind, what is waiting to be marked, and what is on today. I will walk you through every part of it.",
    icon: "mdi:human-male-board",
    color: "#a78bfa",
  },
  {
    route: "/instructor/dashboard",
    targetId: "instructor-briefing",
    title: "Your teaching briefing",
    narration:
      "The top of the dashboard reads your cohorts and tells you the single highest-leverage thing to do today — usually the batch with the most students slipping, not just the newest notification.",
    icon: "mdi:clipboard-text-clock-outline",
    color: "#7c3aed",
  },
  {
    route: "/instructor/dashboard",
    targetId: "instructor-kpis",
    title: "The numbers that matter",
    narration:
      "Students taught, active batches, average progress and how many need a nudge. Every one is a link into the list behind it, so a number you distrust is one click from the people it counts.",
    icon: "mdi:counter",
    color: "#f59e0b",
  },
  {
    route: "/instructor/students",
    targetId: "instructor-students",
    title: "Who needs attention",
    narration:
      "Students are flagged with the rule that flagged them — under twenty-five percent progress, a week with no activity, two missed sessions. A red badge with no reason is not something you can act on, so the reason travels with the flag.",
    icon: "mdi:account-alert-outline",
    color: "#ef4444",
  },
  {
    route: "/instructor/students",
    targetId: "instructor-student-stats",
    title: "Nudge, do not chase",
    narration:
      "From any student you can send a nudge that reaches their dashboard and their inbox. Following up stops being a spreadsheet of email addresses.",
    icon: "mdi:bell-ring-outline",
    color: "#10b981",
  },
  {
    route: "/instructor/cohorts",
    targetId: "instructor-cohorts",
    title: "Your batches",
    narration:
      "Each cohort carries its own progress, average score and at-risk count, so you can see which GROUP is struggling rather than only which individual is. You can message a whole batch from here.",
    icon: "mdi:account-group-outline",
    color: "#6366f1",
  },
  {
    route: "/instructor/courses",
    targetId: "instructor-courses",
    title: "Course content",
    narration:
      "The courses you own or are assigned to, with their published state and enrolment. Opening one takes you into the builder, where you add weeks, topics and content.",
    icon: "mdi:book-education-outline",
    color: "#8b5cf6",
  },
  {
    route: "/instructor/assessments",
    targetId: "instructor-gradebook",
    title: "Gradebook",
    narration:
      "Everything awaiting review surfaces here, including the subjective answers the AI will not score on its own. The pending count is the queue, not a badge.",
    icon: "mdi:clipboard-check-outline",
    color: "#f97316",
  },
  {
    route: "/instructor/live-sessions",
    targetId: "instructor-sessions",
    title: "Live sessions",
    narration:
      "Host from here. Attendance is taken automatically, and the recording, transcript and AI summary attach themselves afterwards, so a student who missed it is not dependent on you remembering.",
    icon: "mdi:video-outline",
    color: "#0ea5e9",
  },
  {
    route: "/instructor/analytics",
    targetId: "instructor-analytics",
    title: "Analytics",
    narration:
      "Where your cohort is spending time and where it is stalling, broken down by activity type and by week. This is the view that tells you which lesson to rewrite.",
    icon: "mdi:chart-box-outline",
    color: "#22c55e",
  },
  {
    route: "/instructor/tickets",
    targetId: "instructor-tickets",
    title: "Questions routed to you",
    narration:
      "Support requests raised by students in your batches land here rather than in a shared inbox nobody owns.",
    icon: "mdi:lifebuoy",
    color: "#64748b",
  },
  {
    route: "/instructor/dashboard",
    title: "That is the loop",
    narration:
      "Spot who is slipping, act on it, teach, mark, and see whether it worked. Every panel here exists to shorten one of those steps. Restart this tour any time from Guide in the top bar.",
    icon: "mdi:check-circle-outline",
    color: "#a78bfa",
  },
];

const ADMIN_TOUR: TourStep[] = [
  {
    route: "/admin/dashboard",
    title: "Running the institution",
    narration:
      "This is the administrator's view. It answers the question you cannot answer by walking the corridor: is this working, and for whom. I will show you every part.",
    icon: "mdi:shield-crown-outline",
    color: "#a78bfa",
  },
  {
    route: "/admin/dashboard",
    targetId: "admin-pulse",
    title: "Every number says what it counted",
    narration:
      "Each tile carries its definition. These figures end up in board meetings, and a metric that cannot say what it measured gets read with whichever meaning is most flattering.",
    icon: "mdi:information-outline",
    color: "#6366f1",
  },
  {
    route: "/admin/dashboard",
    targetId: "admin-at-risk",
    title: "Who is falling behind",
    narration:
      "At-risk students are listed with the rules that flagged them, ranked by how many fired. It is a worklist, not a warning light.",
    icon: "mdi:account-alert-outline",
    color: "#ef4444",
  },
  {
    route: "/admin/dashboard",
    targetId: "admin-engagement",
    title: "Engagement, honestly",
    narration:
      "When students actually study, which activity types they favour, and how consistent they are. The heatmap usually shows evenings — which is what a part-time cohort really looks like.",
    icon: "mdi:chart-timeline-variant",
    color: "#0ea5e9",
  },
  {
    route: "/admin/dashboard",
    targetId: "admin-learning",
    title: "Where they drop off",
    narration:
      "Activation and completion per course, with a week-by-week drop-off curve. That curve tells you which week of which course is losing people, which is the thing you can actually fix.",
    icon: "mdi:chart-areaspline",
    color: "#f59e0b",
  },
  {
    route: "/admin/manage-students",
    targetId: "students-table",
    title: "Everyone on the tenant",
    narration:
      "Search, filter and open any learner. A student page shows their whole journey: courses, activity, assessments, interviews and time on platform.",
    icon: "mdi:account-multiple-outline",
    color: "#8b5cf6",
  },
  {
    route: "/admin/cohorts",
    targetId: "cohorts-list",
    title: "Cohorts",
    narration:
      "Group learners for scheduling and reporting. Assigning a course to a cohort enrols everyone in it and keeps enrolling people who join later.",
    icon: "mdi:account-group-outline",
    color: "#6366f1",
  },
  {
    route: "/admin/instructors",
    targetId: "instructors-tabs",
    title: "Instructors and permissions",
    narration:
      "Add teaching staff and scope them to the courses, cohorts and sessions they own. An instructor only ever sees the students they are responsible for.",
    icon: "mdi:human-male-board",
    color: "#ec4899",
  },
  {
    route: "/admin/adaptive-courses",
    targetId: "adaptive-courses-list",
    title: "The course builder",
    narration:
      "Describe a course and the engine assembles the weeks, lessons, quizzes and coding problems. You review it, edit anything, and publish when it is ready — nothing reaches learners unapproved.",
    icon: "mdi:book-cog-outline",
    color: "#a855f7",
  },
  {
    route: "/admin/assessment",
    targetId: "admin-assessment-hero",
    title: "Assessments",
    narration:
      "Build formal papers, set duration and proctoring, and review submissions. Drafts stay invisible to students until you publish them.",
    icon: "mdi:clipboard-text-clock-outline",
    color: "#0ea5e9",
  },
  {
    route: "/admin/live-sessions",
    targetId: "live-sessions-list",
    title: "Live sessions",
    narration:
      "Schedule classes for a cohort, one-off or recurring, in the institution's own timezone. Attendance and recordings are captured without anyone remembering to press a button.",
    icon: "mdi:video-outline",
    color: "#3b82f6",
  },
  {
    route: "/admin/jobs-v2",
    targetId: "jobs-v2-list",
    title: "Jobs and placement",
    narration:
      "Post roles, set eligibility, and track applications through the pipeline. This is the module that turns a course completion into an outcome you can report.",
    icon: "mdi:briefcase-outline",
    color: "#10b981",
  },
  {
    route: "/admin/emails",
    targetId: "emails-list",
    title: "Communications",
    narration:
      "Send to a cohort or a filtered segment, and see delivery and open rates per campaign rather than guessing whether anyone read it.",
    icon: "mdi:email-outline",
    color: "#f97316",
  },
  {
    route: "/admin/tickets",
    targetId: "tickets-table",
    title: "Support queue",
    narration:
      "Every request across the institution, with who raised it, who owns it, and how long it has been waiting. Anything unanswered for three days is surfaced on the dashboard.",
    icon: "mdi:lifebuoy",
    color: "#64748b",
  },
  {
    // /admin/branding is a redirect to /admin/settings. Pointing the tour at
    // the redirect makes it fight the router: the step navigates, the page
    // redirects, and the effect pushes straight back to the redirect.
    route: "/admin/settings",
    targetId: "settings-preview",
    title: "It is your platform",
    narration:
      "Logo, wordmark, login copy, timezone and integrations. Everything a learner sees carries your institution's name, not ours — which is what your students should be looking at.",
    icon: "mdi:palette-outline",
    color: "#22c55e",
  },
  {
    route: "/admin/dashboard",
    title: "That is the whole picture",
    narration:
      "People, content, delivery and outcomes, with the evidence to back each one. Restart this tour any time from Guide in the top bar.",
    icon: "mdi:check-circle-outline",
    color: "#a78bfa",
  },
];

/** The tour for a role, defaulting to the learner's. */
export function platformTour(role: string | undefined | null): TourStep[] {
  const r = (role ?? "").toLowerCase();
  if (r === "instructor") return INSTRUCTOR_TOUR;
  if (r === "admin" || r === "superadmin") return ADMIN_TOUR;
  return STUDENT_TOUR;
}

/** Headline copy for the welcome card, per role. */
export function welcomeCopy(role: string | undefined | null) {
  const r = (role ?? "").toLowerCase();
  if (r === "instructor") {
    return {
      title: "You are signed in as an instructor",
      body: "This is the workspace a teacher lives in: who is falling behind, what needs marking, and what is on today.",
      minutes: 2,
      steps: INSTRUCTOR_TOUR.length,
    };
  }
  if (r === "admin" || r === "superadmin") {
    return {
      title: "You are signed in as an administrator",
      body: "This is the institution-wide view: engagement, outcomes, people, and everything you can configure.",
      minutes: 2,
      steps: ADMIN_TOUR.length,
    };
  }
  return {
    title: "You are signed in as a student",
    body: "This is what your learners see. Take the tour and I will walk you through the whole platform, module by module.",
    minutes: 2,
    steps: STUDENT_TOUR.length,
  };
}
