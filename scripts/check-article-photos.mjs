/**
 * A photograph in an article body is a remote fetch, and a remote fetch is the
 * one part of this product that can be fine in the file and broken on screen.
 *
 * The URL can 404 after a Commons file is renamed, the thumb size can stop
 * being generated, and the sanitizer that rewrites article HTML can drop the
 * `<img>` entirely. None of that is visible to tsc, to the build, or to the
 * curriculum validator, which only reads the source text.
 *
 * So this opens the tier the photograph was authored into and asserts the
 * image decoded: naturalWidth greater than zero, which is false for a 404, a
 * blocked request and an element the sanitizer stripped. It also asserts the
 * credit line survived into the DOM, because the licences these are used
 * under require attribution to be shown, not merely to be present in a file.
 *
 * And it asserts the image is not being cropped to death. The first version of
 * this script passed a Kanban board whose column headings had been sliced off
 * by an `object-fit: cover` on a 16/9 frame, under a caption that read "the
 * numbers in the column headings are the whole system". Decoding is not the
 * same as being legible: a frame can show two thirds of a diagram and report
 * perfect health. So the visible fraction is computed from the natural and
 * rendered aspect ratios, and anything losing more than a sixth of the image
 * fails.
 */
import { chromium } from "playwright";

const BASE = process.env.BASE_URL || "https://ailinc-demo.netlify.app";

const CASES = [
  { course: 210, topic: 5119, tier: "Intermediate", label: "Google Translate injection" },
  { course: 211, topic: 5127, tier: "Intermediate", label: "Scrum framework" },
  { course: 211, topic: 5128, tier: "Intermediate", label: "Kanban board with WIP limits" },
  { course: 211, topic: 5129, tier: "Intermediate", label: "pair programming" },
  { course: 211, topic: 5130, tier: "Intermediate", label: "burndown chart" },
  { course: 207, topic: 5087, tier: "Intermediate", label: "DIN rail contactor" },
  { course: 207, topic: 5084, tier: "Intermediate", label: "manifold gauge set" },
  { course: 207, topic: 5085, tier: "Intermediate", label: "manifold on the service ports" },
  { course: 209, topic: 5107, tier: "Intermediate", label: "racing drone" },
];

const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1280, height: 1100 } })).newPage();
await page.goto(`${BASE}/login`, { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForTimeout(3000);
await page.getByRole("button", { name: /^Student/ }).click();
await page.waitForTimeout(6000);
if (/\/login/.test(page.url())) { console.log("SIGN IN FAILED"); process.exit(2); }

const problems = [];
for (const { course, topic, tier, label } of CASES) {
  await page.goto(`${BASE}/adaptive-courses/${course}/submodule/${topic}/article/${100000 + topic}`,
    { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForSelector("figure", { timeout: 40000 }).catch(() => {});
  const btn = page.getByRole("button", { name: new RegExp(`^\\s*${tier}`) }).first();
  if (await btn.count()) { await btn.click().catch(() => {}); await page.waitForTimeout(5200); }

  const r = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll("figure.fig-photo img, figure.fig-diagram img"));
    return imgs.map((i) => {
      const box = i.getBoundingClientRect();
      const fit = getComputedStyle(i).objectFit;
      const nat = i.naturalWidth && i.naturalHeight ? i.naturalWidth / i.naturalHeight : 0;
      const rendered = box.height ? box.width / box.height : 0;
      // contain and fill show the whole image; only cover crops.
      const visible = fit !== "cover" || !nat || !rendered
        ? 1
        : Math.min(nat / rendered, rendered / nat);
      return {
        w: i.naturalWidth,
        src: i.currentSrc || i.src,
        alt: (i.alt || "").slice(0, 40),
        credit: !!i.closest("figure")?.querySelector(".credit")?.textContent?.trim(),
        kind: i.closest("figure")?.className || "",
        fit,
        visible: Math.round(visible * 100) / 100,
      };
    });
  });

  const wiki = r.filter((i) => /wikimedia/.test(i.src));
  if (!wiki.length) problems.push(`${course}/${topic} (${label}): no Wikimedia photo in the ${tier} tier`);
  for (const i of wiki) {
    if (i.w === 0) problems.push(`${course}/${topic} (${label}): photo did not decode, naturalWidth 0 - ${i.src.slice(-60)}`);
    if (!i.credit) problems.push(`${course}/${topic} (${label}): photo rendered with no visible credit line`);
    if (i.visible < 0.84) {
      problems.push(
        `${course}/${topic} (${label}): ${Math.round((1 - i.visible) * 100)}% of the image is cropped away ` +
        `by object-fit: ${i.fit}. A diagram belongs in a fig-diagram figure, which uses contain.`);
    }
  }
  console.log(
    `${course}/${topic} ${tier}: ` +
    wiki.map((i) => `${i.w}px ${i.fit} ${Math.round(i.visible * 100)}% visible`).join(" | ") +
    `  ${label}`);
}

await browser.close();
if (problems.length) { console.log("\n" + problems.length + " PROBLEM(S):"); problems.forEach((p) => console.log("  " + p)); process.exit(1); }
console.log("\narticle photos OK");
