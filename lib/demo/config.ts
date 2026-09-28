/**
 * Demo-mode configuration.
 *
 * This repository is a *prospect-facing prototype* of the AI Linc LMS. It is the
 * real frontend, unchanged, with its data transport swapped for an in-browser
 * fake backend (see `lib/demo/http/adapter.ts`). Nothing here talks to a server.
 *
 * Because the whole repo exists to run in demo mode, demo mode is ON by default
 * and only turns off if someone explicitly sets NEXT_PUBLIC_DEMO_MODE=false —
 * which is a debugging affordance, not a supported deployment.
 */

/** Demo mode is the default for this repo; opt out only for local debugging. */
export const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE !== "false";

/**
 * Tenant id the demo pretends to be. The real app requires NEXT_PUBLIC_CLIENT_ID
 * and refuses to guess (a wrong guess would be a cross-tenant leak against a real
 * backend). There is no backend here, so a fixed id is safe and means the repo
 * clones and runs with no env setup at all.
 */
export const DEMO_CLIENT_ID = 101;

/**
 * The fictional institution the prospect sees.
 *
 * Deliberately NOT "AI Linc": a prospect evaluating the platform should see what
 * *their own* branded instance would look like, and it puts the white-label
 * capability on screen instead of leaving it to the imagination. Change these
 * values (and the palette below) to re-skin the entire demo.
 */
export const DEMO_TENANT = {
  // "AI Linc Schools", not an invented school name. The demo runs as AI Linc's own
  // brand (see the commit that moved it off "Meridian Institute of Technology"),
  // and inventing a school risks colliding with a real one that a visiting
  // headteacher might recognise as not theirs.
  name: "AI Linc Schools",
  shortName: "AI Linc",
  slug: "ailinc",
  /** IANA zone. Drives live-session times shown across the app. */
  timezone: "Asia/Kolkata",
  supportEmail: "support@ailinc.com",
} as const;

/**
 * Credentials handed to a prospect. Roles mirror the real product exactly, so
 * nothing on screen is demo-only — switching role means logging out and back in,
 * the same as production.
 *
 * The password is shared across personas on purpose: one thing to remember on a
 * sales call, and there is nothing to protect behind it.
 */
export const DEMO_PASSWORD = "AiLinc@2026";

export interface DemoPersona {
  key: "student" | "instructor" | "admin";
  email: string;
  label: string;
  blurb: string;
  icon: string;
}

export const DEMO_PERSONAS: readonly DemoPersona[] = [
  {
    key: "student",
    email: "student@ailinc.com",
    label: "Student",
    blurb: "Lessons, quizzes, live classes and your class group",
    icon: "mdi:school-outline",
  },
  {
    key: "instructor",
    email: "instructor@ailinc.com",
    label: "Teacher",
    blurb: "Your classes, marks, live lessons and how each child is doing",
    icon: "mdi:human-male-board",
  },
  {
    key: "admin",
    email: "admin@ailinc.com",
    label: "Head Teacher",
    blurb: "The whole school: pupils, staff, timetable, reports and branding",
    icon: "mdi:shield-crown-outline",
  },
] as const;

/**
 * localStorage key for the mutation overlay (see `lib/demo/db/store.ts`).
 * Bump the version suffix whenever the seed shape changes so a returning
 * visitor with a stale overlay gets a clean, coherent demo instead of a
 * half-migrated one.
 *
 * v2: the school edition. The seed changed shape in every direction - people,
 * courses, subjects - so a visitor holding a v1 overlay would have had mutations
 * pointing at courses that no longer exist.
 */
export const DEMO_STORAGE_KEY = "ailinc-demo-state-v2";

/**
 * Simulated network latency, in milliseconds.
 *
 * Zero. An earlier version added 90-260ms so loading skeletons would paint and
 * the app would "feel like a real system" — which was the wrong goal. The demo's
 * job is to make the product feel fast, and a prospect clicking through modules
 * should never wait on latency we invented. Instant navigation is itself part of
 * what is being sold.
 *
 * Left configurable because a future recorded walkthrough might want the
 * skeleton states visible on purpose.
 */
export const DEMO_LATENCY_MS = { min: 0, max: 0 } as const;
