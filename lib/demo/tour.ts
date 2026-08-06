/**
 * The platform tour: one narrated walkthrough per role.
 *
 * The product already ships per-page guides and a spotlight tour engine. What it
 * has no reason to ship — and what a demo needs — is an orientation that runs
 * the moment someone signs in and explains the platform as a whole, module by
 * module, before they have any idea what the sidebar means.
 *
 * Steps anchor to `data-tour-id` targets where one exists and fall back to a
 * centred card where it does not (TourProvider handles a missing target), so a
 * step can describe a module the visitor is not currently looking at.
 *
 * Narration is written to be read aloud — the tour speaks it — so it avoids
 * bullet-speak and says what each module is FOR rather than what it is called.
 */

import type { TourStep } from "@/components/community/TourProvider";

const STUDENT_TOUR: TourStep[] = [
  {
    title: "Welcome to Meridian",
    narration:
      "This is the learner's view. In the next minute I will show you the whole platform: how a course adapts to you, how practice is scored, and how it all feeds into being job-ready.",
    icon: "mdi:hand-wave-outline",
    color: "#a78bfa",
  },
  {
    targetId: "dash-briefing",
    title: "Your AI briefing",
    narration:
      "Every morning this reads your actual progress and tells you the single most useful thing to do next. Not a motivational message — a specific lesson, chosen because of where you are weakest.",
    placement: "bottom",
    icon: "mdi:robot-happy-outline",
    color: "#7c3aed",
  },
  {
    targetId: "dash-stats",
    title: "Points, streak and rank",
    narration:
      "Points come from finishing work, and they decay the longer you take, so speed is rewarded but never at the cost of correctness. Your streak and your standing in the cohort sit alongside them.",
    placement: "bottom",
    icon: "mdi:lightning-bolt",
    color: "#f59e0b",
  },
  {
    title: "Adaptive courses",
    narration:
      "Each course is a week-by-week journey. Lessons can be re-rendered at four reading levels, from plain-English to whitepaper, so the same material works whether you are new to it or revising.",
    icon: "mdi:book-education-outline",
    color: "#6366f1",
  },
  {
    title: "Quizzes that actually adapt",
    narration:
      "Answer well and the next question gets harder; miss one and it steps back. The platform keeps a confidence estimate per skill, and stops as soon as it is sure of your level rather than after a fixed number of questions.",
    icon: "mdi:comment-question-outline",
    color: "#a855f7",
  },
  {
    title: "A real coding workspace",
    narration:
      "Coding problems run your code against real test cases, show you which one failed, and give layered hints — a nudge first, the mechanism only if you ask twice.",
    icon: "mdi:code-braces",
    color: "#f97316",
  },
  {
    title: "Assessments and mock interviews",
    narration:
      "Formal papers can be timed and proctored. The AI interviewer holds a voice conversation, follows up on your answers, and scores communication as well as correctness.",
    icon: "mdi:clipboard-text-clock-outline",
    color: "#ec4899",
  },
  {
    title: "Live sessions and community",
    narration:
      "Scheduled classes with attendance and recordings, and a forum where questions carry point bounties so they actually get answered.",
    icon: "mdi:video-outline",
    color: "#0ea5e9",
  },
  {
    title: "The point of all of it",
    narration:
      "Jobs, a resume builder, and a scorecard that turns everything you have done into evidence an employer can read. That is the whole loop: learn, prove it, get hired.",
    icon: "mdi:briefcase-outline",
    color: "#10b981",
  },
  {
    title: "Explore freely",
    narration:
      "Every module is switched on and filled with data. Click anything. The question mark in any page header explains that page in detail.",
    icon: "mdi:compass-outline",
    color: "#a78bfa",
  },
];

const INSTRUCTOR_TOUR: TourStep[] = [
  {
    title: "The instructor workspace",
    narration:
      "This view is built around triage: who is falling behind, what is waiting to be marked, and what is on today. Let me show you each part.",
    icon: "mdi:human-male-board",
    color: "#a78bfa",
  },
  {
    title: "Who needs attention",
    narration:
      "Students are flagged with the rule that flagged them — under twenty-five percent progress, a week with no activity, two missed sessions. A red badge with no reason is not something you can act on.",
    icon: "mdi:account-alert-outline",
    color: "#ef4444",
  },
  {
    title: "Your batches",
    narration:
      "Each cohort shows its own progress, average score and at-risk count, so you can see which group is struggling rather than only which individual is.",
    icon: "mdi:account-group-outline",
    color: "#6366f1",
  },
  {
    title: "Gradebook and submissions",
    narration:
      "Anything awaiting review surfaces here, including subjective answers the AI cannot score on its own.",
    icon: "mdi:clipboard-check-outline",
    color: "#f59e0b",
  },
  {
    title: "Live sessions",
    narration:
      "Host from here, take attendance automatically, and let the recording and transcript attach themselves afterwards.",
    icon: "mdi:video-outline",
    color: "#0ea5e9",
  },
  {
    title: "Nudge, do not chase",
    narration:
      "Message a whole batch, or nudge one student. It reaches their dashboard and their inbox, so following up does not mean a spreadsheet of email addresses.",
    icon: "mdi:bell-ring-outline",
    color: "#10b981",
  },
];

const ADMIN_TOUR: TourStep[] = [
  {
    title: "Running the institution",
    narration:
      "This is the administrator's view. It answers the question you cannot answer by walking the corridor: is this working, and for whom.",
    icon: "mdi:shield-crown-outline",
    color: "#a78bfa",
  },
  {
    title: "Every number says what it counted",
    narration:
      "Each tile carries its definition. These figures end up in board meetings, and a metric that cannot say what it measured gets read with whichever meaning is most flattering.",
    icon: "mdi:information-outline",
    color: "#6366f1",
  },
  {
    title: "Engagement, honestly",
    narration:
      "When students actually study, which activity types they favour, and how consistent they are. The heatmap usually shows evenings — which is what a part-time cohort really looks like.",
    icon: "mdi:chart-timeline-variant",
    color: "#0ea5e9",
  },
  {
    title: "Where they drop off",
    narration:
      "Activation and completion per course, with a week-by-week drop-off curve. That curve tells you which week of which course is losing people.",
    icon: "mdi:chart-areaspline",
    color: "#f59e0b",
  },
  {
    title: "People and support",
    narration:
      "Cohort fill, ticket volume and resolution time, and instructor feedback — suppressed below five responses, because averaging three opinions is not a rating.",
    icon: "mdi:account-group-outline",
    color: "#ec4899",
  },
  {
    title: "It is your platform",
    narration:
      "Branding, timezone, integrations, roles and permissions. Everything a prospect sees carries your institution's name, not ours.",
    icon: "mdi:palette-outline",
    color: "#10b981",
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
      minutes: 1,
      steps: INSTRUCTOR_TOUR.length,
    };
  }
  if (r === "admin" || r === "superadmin") {
    return {
      title: "You are signed in as an administrator",
      body: "This is the institution-wide view: engagement, outcomes, people, and everything you can configure.",
      minutes: 1,
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
