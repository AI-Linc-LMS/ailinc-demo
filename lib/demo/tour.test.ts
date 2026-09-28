/**
 * Every place the tour walks to must exist.
 *
 * The tour is the first thing most visitors click, and it navigates rather than
 * describes, so a stale route is not a cosmetic problem: the visitor is taken to
 * a dead page while the narration confidently explains what they are looking at.
 *
 * This exists because that happened. The school catalogue renumbered courses from
 * 201-205 to 301-306 and topics from the 5000 range to the 6000 range, and the
 * tour kept walking to /adaptive-courses/201/journey and
 * /adaptive-courses/201/submodule/5009. Nothing failed: `tsc` was clean, every
 * test passed, and the only way to find it was to read the tour file. Three other
 * stops pointed at modules that had been switched off for a school.
 */

import { describe, expect, it } from "vitest";
import { platformTour } from "./tour";
import { COURSES, topicsOf } from "./db/courses";
import { DEMO_CLIENT_INFO } from "./db/tenant";

const ROLES = ["student", "instructor", "admin"] as const;

const ENABLED = new Set((DEMO_CLIENT_INFO.features ?? []).map((f) => f.name));

/**
 * Learner routes that only exist when their feature flag is on. Mirrors the
 * `featureName` values in Sidebar.tsx; kept as a literal map for the same reason
 * proxy.test.ts duplicates its prefix list, so a drift shows up here.
 */
const ROUTE_FEATURE: Array<[string, string]> = [
  ["/mock-interview", "mock_interview"],
  ["/jobs-v2", "jobs_v2"],
  ["/jobs", "jobs_v2"],
  ["/resume", "resume"],
  ["/live-sessions", "live_sessions"],
  ["/community", "community_forum"],
  ["/assessments", "assessment"],
];

describe("the platform tour walks to real places", () => {
  for (const role of ROLES) {
    describe(role, () => {
      const steps = platformTour(role);

      it("has steps", () => {
        expect(steps.length).toBeGreaterThan(3);
      });

      it("never walks into a module this tenant has switched off", () => {
        for (const step of steps) {
          const route = step.route;
          if (!route) continue;
          for (const [prefix, feature] of ROUTE_FEATURE) {
            if (route === prefix || route.startsWith(`${prefix}/`)) {
              expect(
                ENABLED.has(feature),
                `tour step "${step.title}" walks to ${route}, but the "${feature}" module is off`,
              ).toBe(true);
            }
          }
        }
      });

      it("only names courses that exist", () => {
        const ids = new Set(COURSES.map((c) => c.id));
        for (const step of steps) {
          const m = /\/adaptive-courses\/(\d+)/.exec(step.route ?? "");
          if (!m) continue;
          expect(ids, `tour step "${step.title}" points at course ${m[1]}`).toContain(
            Number(m[1]),
          );
        }
      });

      it("only names topics that exist, inside the course it claims", () => {
        for (const step of steps) {
          const m = /\/adaptive-courses\/(\d+)\/submodule\/(\d+)/.exec(step.route ?? "");
          if (!m) continue;
          const course = COURSES.find((c) => c.id === Number(m[1]));
          expect(course, `course ${m[1]} is missing`).toBeDefined();
          const topicIds = topicsOf(course!).map((t) => t.id);
          // Inside THAT course, not merely somewhere in the catalogue: a topic id
          // that exists under a different course still renders the wrong lesson.
          expect(
            topicIds,
            `tour step "${step.title}" points at topic ${m[2]}, which is not in course ${m[1]}`,
          ).toContain(Number(m[2]));
        }
      });
    });
  }

  it("takes a student to a coding lesson that really has coding in it", () => {
    // The tour promises "they write a real program and it really runs". If that
    // step lands on an article-only topic the narration is simply untrue.
    const step = platformTour("student").find((s) => /submodule/.test(s.route ?? ""));
    expect(step).toBeDefined();
    const m = /\/adaptive-courses\/(\d+)\/submodule\/(\d+)/.exec(step!.route!)!;
    const course = COURSES.find((c) => c.id === Number(m[1]))!;
    const topic = topicsOf(course).find((t) => t.id === Number(m[2]))!;
    expect(topic.kinds).toContain("coding");
  });
});
