/**
 * Figures in an article body have to survive two passes that want to eat them.
 *
 * The body is authored HTML, sanitized client-side with DOMParser, and then
 * walked twice: once to wrap glossary terms and once to wrap every remaining
 * word so it can be faded in. Both walkers inject HTML `<span>` elements, and a
 * `<span>` inside an `<svg>` is not rendered at all — so the first version of
 * this shipped every diagram with all of its labels silently missing. The
 * drawing was there, the words on it were not, and nothing failed.
 *
 * So this checks the two things that break independently: that the `<svg>`
 * reached the DOM at a usable size (the sanitizer could drop it), and that its
 * `<text>` nodes still hold their own text with no element wrapped inside them
 * (a walker could mangle it). Screenshots are written for eyeballing, but the
 * assertions are what fail.
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE_URL || "http://localhost:3000";
const OUT = process.env.SHOT_DIR || "/tmp/article-figures";
const TIERS = ["Beginner", "Intermediate", "Advanced", "Expert"];

/**
 * The flagship article in each course: one per subject, every reading tier
 * carrying its own diagram. Add a topic here when you author figures into one.
 */
const CASES = [
  { course: 206, topic: 5070, label: "what a transaction does to the books" },
  { course: 207, topic: 5085, label: "superheat and subcooling" },
  { course: 208, topic: 5101, label: "verb second and the sentence bracket" },
  { course: 209, topic: 5107, label: "thrust, weight and the ratio" },
];

async function goto(page, url) {
  for (const timeout of [45000, 90000]) {
    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout });
      return;
    } catch (e) {
      if (timeout === 90000) throw e;
    }
  }
}

mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 1100 } });
const page = await ctx.newPage();

await goto(page, `${BASE}/login`);
await page.waitForTimeout(2000);
await page.getByRole("button", { name: /^Student/ }).click();
await page.waitForTimeout(4500);
if (/\/login/.test(page.url())) {
  console.log("SIGN IN FAILED");
  process.exit(2);
}

const problems = [];

for (const { course, topic, label } of CASES) {
  await goto(page, `${BASE}/adaptive-courses/${course}/submodule/${topic}/article/${100000 + topic}`);

  // The body streams in after the route resolves; clicking a tier before it
  // lands is a click into a control that is not there yet.
  await page.waitForSelector("figure svg", { timeout: 30000 });
  const seen = new Map();

  for (const tier of TIERS) {
    const btn = page.getByRole("button", { name: new RegExp(`^\\s*${tier}`) }).first();
    if (!(await btn.count())) {
      problems.push(`${course}/${topic}: no control for the ${tier} tier`);
      continue;
    }
    await btn.click().catch(() => {});
    // The reveal fade is a 3s rAF walk; sampling before it ends reads opacity 0
    // on words that are about to appear, which is not a failure.
    await page.waitForTimeout(5200);

    const report = await page.evaluate(() => {
      const body =
        document.querySelector("[data-article-body]") ||
        document.querySelector("article") ||
        document.body;
      const figures = Array.from(body.querySelectorAll("figure"));
      return {
        figures: figures.length,
        svgs: Array.from(body.querySelectorAll("figure svg")).map((svg) => {
          const r = svg.getBoundingClientRect();
          const texts = Array.from(svg.querySelectorAll("text"));
          return {
            w: Math.round(r.width),
            h: Math.round(r.height),
            texts: texts.length,
            // Identifies the figure exactly. Keying the "did the tier change"
            // check on a text count and a height collided: two unrelated
            // diagrams with ten labels in a 1000x560 frame looked identical.
            label: svg.getAttribute("aria-label") || "",
            // Rendered size of the smallest label. An SVG scales its text
            // with its container, so a figure authored at a comfortable size
            // can arrive at 6px in a narrow reading column.
            minPx: texts.length
              ? Math.min(
                  ...texts.map((t) => {
                    const fs = parseFloat(getComputedStyle(t).fontSize) || 0;
                    const vb = (svg.getAttribute('viewBox') || '0 0 1000 1000').split(/\s+/);
                    return fs * (r.width / (Number(vb[2]) || 1000));
                  }),
                )
              : 0,
            // A <text> holding an element child is a mangled label.
            wrapped: texts.filter((t) => t.children.length > 0).length,
            empty: texts.filter((t) => !(t.textContent || "").trim()).length,
          };
        }),
        captions: body.querySelectorAll("figure figcaption").length,
        imgs: Array.from(body.querySelectorAll("figure img")).map((i) => ({
          complete: i.complete,
          natural: i.naturalWidth,
        })),
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      };
    });

    const where = `${course}/${topic} ${tier}`;
    // Four tiers that render the same figure means the control did nothing,
    // which is how three identical screenshots passed as four tiers.
    const sig = report.svgs.map((s) => s.label).join("|");
    if (seen.has(sig)) problems.push(`${where}: same figures as the ${seen.get(sig)} tier`);
    else seen.set(sig, tier);
    if (report.figures === 0) problems.push(`${where}: no <figure> in the body`);
    if (report.captions < report.figures) {
      problems.push(`${where}: ${report.figures} figures but ${report.captions} captions`);
    }
    for (const [i, s] of report.svgs.entries()) {
      if (s.w < 200 || s.h < 100) problems.push(`${where}: svg ${i} is ${s.w}x${s.h}`);
      if (s.texts === 0) problems.push(`${where}: svg ${i} has no <text> labels`);
      if (s.wrapped > 0) {
        problems.push(`${where}: svg ${i} has ${s.wrapped} <text> nodes with an element wrapped inside - a walker mangled them`);
      }
      if (s.empty > 0) problems.push(`${where}: svg ${i} has ${s.empty} empty <text> nodes`);
      // 10px is about the floor for a label somebody reads on a diagram.
      if (s.minPx && s.minPx < 10) {
        problems.push(
          `${where}: svg ${i} smallest label renders at ${s.minPx.toFixed(1)}px - too small to read`,
        );
      }
    }
    if (report.overflow > 2) problems.push(`${where}: page scrolls sideways by ${report.overflow}px`);

    const svgSummary = report.svgs
      .map((s) => `${s.w}x${s.h}/${s.texts}t/min ${s.minPx.toFixed(1)}px`)
      .join(" ");
    console.log(
      `${where.padEnd(22)} figures ${report.figures} | svg ${svgSummary || "-"} | img ${report.imgs.length}`,
    );
    await page.screenshot({ path: `${OUT}/${course}-${topic}-${tier}.png`, fullPage: true });
  }
  console.log(`  ${label}: screenshots in ${OUT}`);
}

/**
 * The same two failure modes on the practical players.
 *
 * PracticalProse is a separate renderer from the article body with its own
 * copy of the figure CSS, so an svg that survives one can still be dropped or
 * crushed by the other. These are the briefs a learner meets on arrival.
 *
 * Figures behind a gate are deliberately NOT here. The evacuation lab keeps
 * its decay curve on step seven of a ten-step procedure, and a worked answer
 * is released only after submission, so neither is in the DOM to be measured.
 * Driving ten steps of a stepper to reach one of them is a harness that breaks
 * the next time a control is renamed, and one that quietly stops reaching its
 * target is worse than none. Legibility is a property of the figure rather
 * than of the renderer, so that rule lives in verify-curriculum, where every
 * authored figure is visible whether or not a learner can get to it yet. What
 * is left here is the renderer question, and one page answers it.
 */
const PRACTICALS = [
  { course: 206, topic: 5073, seg: "worksheet", id: 1_505_073 },
  { course: 207, topic: 5086, seg: "evidence", id: 1_705_086 },
  { course: 207, topic: 5090, seg: "scenario", id: 1_605_090 },
  { course: 208, topic: 5104, seg: "speaking", id: 2_005_104 },
  { course: 209, topic: 5106, seg: "parts", id: 2_105_106 },
  { course: 209, topic: 5116, seg: "deliverable", id: 2_205_116 },
];

for (const { course, topic, seg, id } of PRACTICALS) {
  await goto(page, `${BASE}/adaptive-courses/${course}/submodule/${topic}/${seg}/${id}`);

  const found = await page
    .waitForSelector("figure svg", { timeout: 30000 })
    .then(() => true)
    .catch(() => false);
  if (!found) {
    problems.push(`${course}/${topic} ${seg}: no figure reached the page`);
    continue;
  }
  await page.waitForTimeout(1200);

  const r = await page.evaluate(() => {
    const svgs = Array.from(document.querySelectorAll("figure svg"));
    return svgs.map((svg) => {
      const rect = svg.getBoundingClientRect();
      const texts = Array.from(svg.querySelectorAll("text"));
      const vb = (svg.getAttribute("viewBox") || "0 0 1000 1000").split(/\s+/);
      const scale = rect.width / (Number(vb[2]) || 1000);
      return {
        w: Math.round(rect.width),
        texts: texts.length,
        wrapped: texts.filter((t) => t.children.length > 0).length,
        minPx: texts.length
          ? Math.min(...texts.map((t) => (parseFloat(getComputedStyle(t).fontSize) || 0) * scale))
          : 0,
      };
    });
  });
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );

  for (const [i, v] of r.entries()) {
    const where = `${course}/${topic} ${seg}`;
    if (v.w < 200) problems.push(`${where}: svg ${i} is only ${v.w}px wide`);
    if (v.texts === 0) problems.push(`${where}: svg ${i} has no labels`);
    if (v.wrapped > 0) problems.push(`${where}: svg ${i} has ${v.wrapped} mangled <text> nodes`);
    if (v.minPx && v.minPx < 10) {
      problems.push(`${where}: svg ${i} smallest label renders at ${v.minPx.toFixed(1)}px`);
    }
  }
  if (overflow > 2) problems.push(`${course}/${topic} ${seg}: scrolls sideways by ${overflow}px`);

  console.log(
    `${`${course}/${topic} ${seg}`.padEnd(26)} ${r
      .map((v) => `${v.w}px/${v.texts}t/min ${v.minPx.toFixed(1)}px`)
      .join(" ")}`,
  );
  await page.screenshot({ path: `${OUT}/p-${course}-${topic}-${seg}.png`, fullPage: true });
}

await browser.close();

if (problems.length) {
  console.log(`\n${problems.length} PROBLEM(S)`);
  for (const p of problems) console.log(`  - ${p}`);
  process.exit(1);
}
console.log("\narticle figures OK");
