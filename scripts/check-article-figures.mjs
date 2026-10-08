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

/** Topics whose bodies carry figures. Add one here when you author one. */
const CASES = [{ course: 207, topic: 5085, label: "superheat and subcooling" }];

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
    const sig = report.svgs.map((s) => `${s.texts}t${s.h}`).join("|");
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
 * crushed by the other. These are the briefs that carry a diagram.
 */
const PRACTICALS = [
  { course: 206, topic: 5073, seg: "worksheet", id: 1_505_073 },
  { course: 207, topic: 5086, seg: "evidence", id: 1_705_086 },
  { course: 207, topic: 5090, seg: "scenario", id: 1_605_090 },
  // The decay curve lives on step seven of a gated procedure, so it is not in
  // the DOM until the PPE gate and six steps are behind it. Driving the
  // stepper is the only honest way to check it; a harness that skipped it
  // would be a check that cannot fail.
  { course: 207, topic: 5092, seg: "lab", id: 1_805_092, drive: "lab" },
  { course: 208, topic: 5104, seg: "speaking", id: 2_005_104 },
  { course: 209, topic: 5106, seg: "parts", id: 2_105_106 },
  { course: 209, topic: 5116, seg: "deliverable", id: 2_205_116 },
];

for (const { course, topic, seg, id, drive } of PRACTICALS) {
  await goto(page, `${BASE}/adaptive-courses/${course}/submodule/${topic}/${seg}/${id}`);

  if (drive === "lab") {
    await page.waitForTimeout(2500);
    // The PPE gate: each item is a button that toggles, not a checkbox, and
    // step one stays locked until every one of them is confirmed.
    const CHROME = /^(Guide|Back to the lesson|\d+|Begin the procedure|Confirm every item above to begin|Today's Leaders)$/i;
    const ppe = page.locator("button");
    for (let i = 0; i < (await ppe.count()); i++) {
      const label = (await ppe.nth(i).innerText().catch(() => "")).replace(/\s+/g, " ").trim();
      if (!label || CHROME.test(label)) continue;
      await ppe.nth(i).click().catch(() => {});
    }
    await page.waitForTimeout(500);
    const begin = page.getByRole("button", { name: /Begin the procedure/i });
    if (!(await begin.count())) {
      problems.push(`${course}/${topic} lab: PPE gate never unlocked, so the procedure cannot be driven`);
    }
    await begin.click().catch(() => {});
    await page.waitForTimeout(900);
    // Then walk steps until the figure appears. Some steps want a reading
    // before they will advance, so fill any empty number field on the way.
    for (let step = 0; step < 14; step++) {
      if (await page.locator("figure svg").count()) break;
      const nums = page.locator('input[type="number"]');
      for (let i = 0; i < (await nums.count()); i++) {
        if (!(await nums.nth(i).inputValue())) await nums.nth(i).fill("450").catch(() => {});
      }
      // A hazard step wants the acknowledgement BEFORE it will advance, and
      // the two controls are separate. Matching them with one loose pattern
      // clicked the acknowledgement every time and never moved a step.
      const ack = page.getByRole("button", { name: /^I have read this and done it$/i }).first();
      if (await ack.count()) {
        await ack.click().catch(() => {});
        await page.waitForTimeout(250);
      }
      const next = page.getByRole("button", { name: /^Step done, next$/i }).first();
      if (!(await next.count())) break;
      await next.click().catch(() => {});
      await page.waitForTimeout(650);
    }
  }
  // A lab gates its first step behind a PPE confirmation and a scenario opens
  // on its first node, so the figure may be below a control rather than on
  // screen. Waiting for it in the DOM is the right test either way.
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
