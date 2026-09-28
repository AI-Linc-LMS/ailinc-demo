/**
 * The final hint claims to be a working solution. This runs it.
 *
 * A hint that reveals code is the last thing a stuck learner reads, so a wrong
 * one is worse than no hint at all: they paste it, the tests still fail, and they
 * conclude the platform is broken rather than their code. Nothing else in the
 * repo executes these, and they are the only strings here that are supposed to be
 * runnable rather than readable.
 *
 * The demo grades the learner's JavaScript for real in their browser, so this
 * checks the same thing the product does, against the same cases.
 */

import { describe, expect, it } from "vitest";
import { CODING_PROBLEMS } from "./coding-bank";

/** Build a callable from the revealed hint body, as the grader would. */
function compile(fnName: string, params: string, body: string): (...args: unknown[]) => unknown {
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  return new Function(params, body) as (...args: unknown[]) => unknown;
}

/** The parameter list, read off the JavaScript template rather than guessed. */
function paramsOf(problem: (typeof CODING_PROBLEMS)[number]): string {
  const match = /function\s+\w+\(([^)]*)\)/.exec(problem.templates.javascript ?? "");
  if (!match) throw new Error(`no JS template for ${problem.title}`);
  return match[1];
}

describe("every revealed solution passes its own tests", () => {
  for (const problem of CODING_PROBLEMS) {
    describe(problem.title, () => {
      const revealed = problem.hints.filter((h) => h.revealsCode);

      it("has exactly one hint that reveals code, and it is the last one", () => {
        expect(revealed).toHaveLength(1);
        expect(problem.hints[problem.hints.length - 1].revealsCode).toBe(true);
      });

      it("names a function the template actually defines", () => {
        expect(problem.templates.javascript).toContain(`function ${problem.fnName}(`);
      });

      it("keeps at least one test visible and holds at least one back", () => {
        // A problem with no visible case gives the learner nothing to check
        // against before submitting; one with no hidden case can be passed by
        // hardcoding the sample.
        expect(problem.tests.some((t) => !t.hidden)).toBe(true);
        expect(problem.tests.some((t) => t.hidden)).toBe(true);
      });

      for (const test of problem.tests) {
        it(`solves: ${test.label}`, () => {
          const fn = compile(problem.fnName, paramsOf(problem), revealed[0].body);
          expect(fn(...test.args)).toEqual(test.expected);
        });
      }
    });
  }
});
