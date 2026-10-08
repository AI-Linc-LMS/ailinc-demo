/**
 * Phone check for the practical surfaces.
 *
 * Two failures that a desktop crawl cannot see and that make a page unusable
 * for most of this audience. A technician filling in a procedure is standing
 * next to the unit and a learner drilling vocabulary is on a bus, so these are
 * the primary devices rather than a secondary consideration.
 *
 *   1. Horizontal overflow. A grid or a wide table that pushes the document
 *      wider than the viewport makes every page scroll sideways.
 *   2. A sticky footer covering the app's bottom navigation. The practical
 *      action bar is z-index 1200 and the nav is 1000, so a bar at bottom: 0
 *      hides all six navigation items.
 */
import { chromium } from "playwright";

const BASE = process.env.BASE_URL || "http://localhost:3000";
const PAGES = [
  ["lesson board", "/adaptive-courses/206/submodule/5073"],
  ["article reader", "/adaptive-courses/206/submodule/5073/article/105073"],
  ["worksheet", "/adaptive-courses/206/submodule/5075/worksheet/1505075"],
  ["scenario", "/adaptive-courses/206/submodule/5073/scenario/1605073"],
  ["evidence", "/adaptive-courses/207/submodule/5084/evidence/1705084"],
  ["lab", "/adaptive-courses/207/submodule/5084/lab/1805084"],
  ["deck", "/adaptive-courses/206/submodule/5079/deck/1905079"],
  ["speaking", "/adaptive-courses/208/submodule/5094/speaking/2005094"],
  ["parts", "/adaptive-courses/209/submodule/5106/parts/2105106"],
  ["deliverable", "/adaptive-courses/206/submodule/5077/deliverable/2205077"],
];

const b = await chromium.launch();
const ctx = await b.newContext({
  viewport: { width: 393, height: 851 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
  userAgent:
    "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Mobile Safari/537.36",
});
const p = await ctx.newPage();
await p.goto(`${BASE}/login`, { waitUntil: "domcontentloaded", timeout: 45000 });
await p.waitForTimeout(3000);
await p.getByRole("button", { name: /^Student/ }).click();
await p.waitForTimeout(5500);
if (/\/login/.test(p.url())) {
  console.log("SIGN IN FAILED");
  process.exit(2);
}

let fails = 0;
for (const [name, path] of PAGES) {
  await p.goto(BASE + path, { waitUntil: "domcontentloaded", timeout: 45000 });
  await p.waitForTimeout(2400);
  const r = await p.evaluate(() => {
    const doc = document.documentElement;
    // The bottom navigation, and anything fixed sitting on top of it.
    let nav = null;
    const covering = [];
    for (const el of document.querySelectorAll("*")) {
      const cs = getComputedStyle(el);
      if (cs.position !== "fixed") continue;
      const box = el.getBoundingClientRect();
      if (box.height < 20 || box.height > window.innerHeight * 0.6) continue;
      const text = el.innerText || "";
      if (/Dashboard/.test(text) && /Courses/.test(text)) nav = { top: box.top, z: +cs.zIndex || 0 };
      else if (box.bottom > window.innerHeight - 8) covering.push({ top: box.top, z: +cs.zIndex || 0 });
    }
    return {
      scrollW: doc.scrollWidth,
      clientW: doc.clientWidth,
      navVisible: !!nav,
      navTop: nav?.top ?? null,
      overlaps: nav ? covering.filter((c) => c.z > nav.z && c.top + 1 < window.innerHeight).length : 0,
      broken: /Something went wrong|could not be found/i.test(document.body.innerText),
    };
  });

  const problems = [];
  if (r.broken) problems.push("page errored");
  if (r.scrollW > r.clientW + 1) problems.push(`overflows by ${r.scrollW - r.clientW}px`);
  if (!r.navVisible) problems.push("bottom nav absent");
  if (r.overlaps > 0) problems.push(`${r.overlaps} fixed element(s) over the bottom nav`);

  if (problems.length) {
    fails++;
    console.log(`FAIL  ${name}  ${problems.join("; ")}`);
  } else {
    console.log(`ok    ${name}`);
  }
}
console.log(fails === 0 ? "\nMOBILE OK" : `\n${fails} MOBILE ISSUE(S)`);
await b.close();
process.exit(fails === 0 ? 0 : 1);
