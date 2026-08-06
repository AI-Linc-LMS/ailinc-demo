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
  name: "Meridian Institute of Technology",
  shortName: "Meridian",
  slug: "meridian",
  /** IANA zone. Drives live-session times shown across the app. */
  timezone: "Asia/Kolkata",
  supportEmail: "support@meridian.edu",
} as const;

/**
 * Credentials handed to a prospect. Roles mirror the real product exactly, so
 * nothing on screen is demo-only — switching role means logging out and back in,
 * the same as production.
 *
 * The password is shared across personas on purpose: one thing to remember on a
 * sales call, and there is nothing to protect behind it.
 */
export const DEMO_PASSWORD = "Meridian@2026";

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
    email: "student@meridian.edu",
    label: "Student",
    blurb: "Courses, assessments, mock interviews, jobs and community",
    icon: "mdi:school-outline",
  },
  {
    key: "instructor",
    email: "instructor@meridian.edu",
    label: "Instructor",
    blurb: "Batches, gradebook, live sessions and student analytics",
    icon: "mdi:human-male-board",
  },
  {
    key: "admin",
    email: "admin@meridian.edu",
    label: "Administrator",
    blurb: "Full institution control: people, content, branding and reporting",
    icon: "mdi:shield-crown-outline",
  },
] as const;

/**
 * localStorage key for the mutation overlay (see `lib/demo/db/store.ts`).
 * Bump the version suffix whenever the seed shape changes so a returning
 * visitor with a stale overlay gets a clean, coherent demo instead of a
 * half-migrated one.
 */
export const DEMO_STORAGE_KEY = "ailinc-demo-state-v1";

/**
 * Simulated network latency, in milliseconds. A fake backend that answers in 0ms
 * feels wrong — skeletons never paint, and the app looks like it is rendering
 * hardcoded HTML. A small delay makes the prototype read as a real system while
 * still being faster than production.
 */
export const DEMO_LATENCY_MS = { min: 90, max: 260 } as const;
