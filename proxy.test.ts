import { describe, expect, it } from "vitest";

/**
 * Instructor route confinement.
 *
 * Mirrors `instructorBlocked` in proxy.ts. Duplicated rather than imported because proxy.ts pulls
 * in `next/server`, which needs a request context these tests have no reason to build — and the
 * thing worth protecting is the RULE, which is a string predicate.
 *
 * If you change the rule in proxy.ts, change it here. A drift shows up as a test that passes
 * while the guard does something else, so keep the two literally identical.
 */
const INSTRUCTOR_BLOCKED_PREFIXES = [
  "/dashboard",
  "/admin",
  "/adaptive-courses",
  "/adaptive-quizzes",
  "/assessments",
  "/community",
  "/courses",
  "/jobs",
  "/jobs-v2",
  "/leaderboard-streaks",
  "/live-sessions",
  "/mock-interview",
  "/points-system",
  "/proctoring-demo",
  "/resume",
];

const INSTRUCTOR_ALLOWED_ADMIN_PATH = /^\/admin\/adaptive-courses\/\d+(\/|$)/;

function instructorBlocked(pathname: string): boolean {
  if (INSTRUCTOR_ALLOWED_ADMIN_PATH.test(pathname)) return false;
  return (
    pathname === "/" ||
    INSTRUCTOR_BLOCKED_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))
  );
}

describe("the builder is reachable", () => {
  it("lets an instructor open one course's builder", () => {
    // Without this the feature has no door: "Build a course" creates the course and bounces its
    // author to the dashboard.
    expect(instructorBlocked("/admin/adaptive-courses/56")).toBe(false);
    expect(instructorBlocked("/admin/adaptive-courses/56/")).toBe(false);
  });

  it("allows sub-paths of one course", () => {
    expect(instructorBlocked("/admin/adaptive-courses/56/settings")).toBe(false);
  });
});

describe("and nothing else opened with it", () => {
  it("still blocks the course hub", () => {
    // The hub lists every course in the tenant.
    expect(instructorBlocked("/admin/adaptive-courses")).toBe(true);
    expect(instructorBlocked("/admin/adaptive-courses/")).toBe(true);
  });

  it("still blocks the rest of the admin area", () => {
    for (const p of [
      "/admin",
      "/admin/students",
      "/admin/tickets",
      "/admin/instructors",
      "/admin/assessments",
      "/admin/adaptive-coursesX/1",
    ]) {
      expect(instructorBlocked(p), p).toBe(true);
    }
  });

  it("is not fooled by a non-numeric id", () => {
    // `/admin/adaptive-courses/new` is not one course; it must not open the whole prefix.
    expect(instructorBlocked("/admin/adaptive-courses/new")).toBe(true);
    expect(instructorBlocked("/admin/adaptive-courses/generate")).toBe(true);
  });

  it("is not fooled by a path that merely starts with a digit", () => {
    expect(instructorBlocked("/admin/adaptive-courses/56abc")).toBe(true);
  });

  it("still blocks the student learner view", () => {
    for (const p of ["/", "/dashboard", "/adaptive-courses/12", "/community", "/resume"]) {
      expect(instructorBlocked(p), p).toBe(true);
    }
  });

  it("leaves the instructor's own space alone", () => {
    for (const p of ["/instructor/dashboard", "/instructor/courses", "/instructor/courses/56"]) {
      expect(instructorBlocked(p), p).toBe(false);
    }
  });
});

/**
 * Public asset prefixes.
 *
 * Mirrors the bypass block in proxy.ts, and duplicated for the same reason as the
 * instructor rule above: the thing worth protecting is the LIST, which is a string
 * predicate. Keep the two literally identical.
 */
const PUBLIC_PREFIXES = [
  "/images/",
  "/videos/",
  "/assets/",
  "/monaco/",
  "/logos/",
  "/fonts/",
];

function bypassesAuth(pathname: string): boolean {
  return PUBLIC_PREFIXES.some((p) => pathname.startsWith(p));
}

describe("signed-out visitors can load the assets the login screen needs", () => {
  /**
   * This is a regression test for a bug that shipped and stayed invisible.
   *
   * /fonts/ was missing from the bypass list, so every webfont 307'd to /login for
   * a signed-out visitor and the sign-in screen - the first thing any prospect
   * sees - rendered in system-ui. Nothing broke, nothing errored, and the fallback
   * looks like a deliberate typographic choice, which is exactly why it survived.
   * The only signal was a browser warning that a preloaded font went unused.
   */
  it("serves webfonts without a session", () => {
    expect(bypassesAuth("/fonts/school.css")).toBe(true);
    expect(bypassesAuth("/fonts/nunito-latin.woff2")).toBe(true);
    expect(bypassesAuth("/fonts/satoshi.css")).toBe(true);
  });

  it("serves the brand lockups and the code editor", () => {
    expect(bypassesAuth("/logos/ai-linc-lockup-white.svg")).toBe(true);
    expect(bypassesAuth("/monaco/vs/loader.js")).toBe(true);
    expect(bypassesAuth("/images/demo/cover.jpg")).toBe(true);
  });

  it("still gates everything that is not a public asset", () => {
    expect(bypassesAuth("/dashboard")).toBe(false);
    expect(bypassesAuth("/admin/settings")).toBe(false);
    // A path that merely CONTAINS one of the prefixes must not slip through.
    expect(bypassesAuth("/admin/fonts/")).toBe(false);
  });
});
