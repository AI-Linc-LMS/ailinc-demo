/**
 * Contrast is the one property of the school palette that cannot be checked by
 * looking at it.
 *
 * The subject registry and the forced palette both carry comments asserting they
 * clear WCAG AA. Those comments are worth nothing on their own: the amber
 * subject's `ink` was #d97706 when it was written, which reads as obviously fine
 * and measures 3.4:1 on its own tint. This file is what makes the claims true, so
 * a future palette tweak that breaks one fails here rather than on a child's
 * screen.
 *
 * AA for normal text is 4.5:1. We hold labels and body to that rather than the
 * 3:1 that large text is allowed, because the surfaces these colours land on are
 * chips, captions and table cells - all of them small - and because the readers
 * are eleven.
 */

import { describe, expect, it } from "vitest";
import { SUBJECTS, SUBJECT_ORDER, subjectOf } from "./subjects";

/** sRGB relative luminance, per WCAG 2.1 definition. */
function luminance(hex: string): number {
  const m = /^#([0-9a-f]{6})$/i.exec(hex);
  if (!m) throw new Error(`not a 6-digit hex colour: ${hex}`);
  const channels = [0, 2, 4].map((i) => parseInt(m[1].slice(i, i + 2), 16) / 255);
  const linear = channels.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const AA_NORMAL = 4.5;
const WHITE = "#ffffff";

describe("subject colour coding", () => {
  it("covers every key in SUBJECT_ORDER, and nothing else", () => {
    expect([...SUBJECT_ORDER].sort()).toEqual(Object.keys(SUBJECTS).sort());
  });

  for (const key of SUBJECT_ORDER) {
    const s = SUBJECTS[key];

    describe(s.label, () => {
      it("reads as AA text on its own tint", () => {
        expect(contrast(s.ink, s.tint)).toBeGreaterThanOrEqual(AA_NORMAL);
      });

      it("reads as AA text on a white card", () => {
        expect(contrast(s.ink, WHITE)).toBeGreaterThanOrEqual(AA_NORMAL);
      });

      it("carries white text on its darker gradient stop", () => {
        // `to` is the stop a solid pill or a filled button uses, so a white label
        // on it has to clear AA. `from` is deliberately exempt: it is a fill
        // behind artwork and large numerals, never behind small text.
        expect(contrast(WHITE, s.to)).toBeGreaterThanOrEqual(AA_NORMAL);
      });

      it("has a tint light enough to sit on the page canvas", () => {
        // The canvas is #f6faff. A tint darker than its own ink would invert the
        // surface ladder and make the chip look like the selected state.
        expect(luminance(s.tint)).toBeGreaterThan(0.7);
      });
    });
  }

  it("spreads its hues far enough apart to be told apart", () => {
    // Adjacent subjects in the registry order must not be near-identical fills.
    // This is a guard against someone "tidying" the palette into one family;
    // the icon and motif carry the non-colour channel, but the hue should still
    // do real work for the children who can see it.
    const hues = SUBJECT_ORDER.map((k) => hueOf(SUBJECTS[k].from));
    for (let i = 0; i < hues.length; i++) {
      for (let j = i + 1; j < hues.length; j++) {
        const gap = Math.min(Math.abs(hues[i] - hues[j]), 360 - Math.abs(hues[i] - hues[j]));
        expect(gap).toBeGreaterThan(20);
      }
    }
  });

  it("falls back instead of throwing on an unknown subject", () => {
    expect(subjectOf(undefined).key).toBe("maths");
    expect(subjectOf("chemistry-advanced").key).toBe("maths");
  });
});

function hueOf(hex: string): number {
  const m = /^#([0-9a-f]{6})$/i.exec(hex);
  if (!m) throw new Error(`not a 6-digit hex colour: ${hex}`);
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(m[1].slice(i, i + 2), 16) / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  if (max === min) return 0;
  const d = max - min;
  let h: number;
  if (max === r) h = ((g - b) / d) % 6;
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  return ((h * 60) % 360 + 360) % 360;
}
