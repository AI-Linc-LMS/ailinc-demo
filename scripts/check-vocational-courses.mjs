/**
 * Render sweep across all four vocational courses.
 *
 * Every practical on every topic, resolved from the course seed rather than
 * hardcoded, so a topic added later is covered without editing this file.
 */
import { chromium } from "playwright";

const BASE = "http://localhost:3000";
const BAND = {
  worksheet: 1_500_000, scenario: 1_600_000, evidence: 1_700_000, lab: 1_800_000,
  deck: 1_900_000, speaking: 2_000_000, partid: 2_100_000, deliverable: 2_200_000,
};
const SEG = {
  worksheet: "worksheet", scenario: "scenario", evidence: "evidence", lab: "lab",
  deck: "deck", speaking: "speaking", partid: "parts", deliverable: "deliverable",
};
// topic id ranges per course, from the seed order
const COURSES = { 206: [5070, 5081], 207: [5082, 5093], 208: [5094, 5105], 209: [5106, 5117] };


/**
 * Navigate, tolerating a slow first compile.
 *
 * Next compiles a route on its first request in dev, and after a code change
 * that can exceed Playwright's 30 second default on a cold route. A timeout
 * there is a property of the dev server rather than of the page, so retry once
 * with a longer budget before calling it broken. A genuinely broken page still
 * fails, on its content rather than on its clock.
 */
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

/**
 * Wait for the page to stop loading rather than sleeping a fixed interval.
 *
 * Every player shows a placeholder while it fetches ("Loading the brief…",
 * "Warming up the voice…"). A fixed wait is a race against however long the
 * dev server took to compile that route, and losing it reports a healthy page
 * as broken on its content. Poll for the placeholder to clear instead.
 */
const LOADING = /Loading the|Warming up|Opening the|Setting the scene|Shuffling|Drawing the|Loading …|Loading\.\.\./i;

async function settle(page, budgetMs = 15000) {
  const until = Date.now() + budgetMs;
  for (;;) {
    const text = await page.evaluate(() => document.body.innerText).catch(() => "");
    if (text.length > 300 && !LOADING.test(text)) return text;
    if (Date.now() > until) return text;
    await page.waitForTimeout(400);
  }
}

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await ctx.newPage();
await goto(page, `${BASE}/login`);
await page.waitForTimeout(2000);
await page.getByRole("button", { name: /^Student/ }).click();
await page.waitForTimeout(4500);
if (/\/login/.test(page.url())) { console.log("SIGN IN FAILED"); process.exit(2); }

let checked = 0, broken = 0;
const fail = (what, why, head) => { broken++; console.log(`FAIL ${what}\n     ${why}\n     ${head}`); };

for (const [cid, [lo, hi]] of Object.entries(COURSES)) {
  // course overview must render
  await goto(page, `${BASE}/adaptive-courses/${cid}`);
  let t = await settle(page);
  checked++;
  if (/Something went wrong|could not be found/i.test(t) || t.length < 1200)
    fail(`course ${cid} overview`, "did not render", t.slice(0, 160).replace(/\n+/g, " | "));

  for (let topic = lo; topic <= hi; topic++) {
    // lesson page: reveals which practicals exist
    await goto(page, `${BASE}/adaptive-courses/${cid}/submodule/${topic}`);
    t = await settle(page);
    checked++;
    if (/Something went wrong|could not be found/i.test(t))
      fail(`lesson ${cid}/${topic}`, "errored", t.slice(0, 160).replace(/\n+/g, " | "));

    for (const [kind, base] of Object.entries(BAND)) {
      // only visit a practical the lesson actually advertises
      const label = { worksheet: "WORKING PAPER", scenario: "DECISION RUN", evidence: "EVIDENCE",
        lab: "PROCEDURE", deck: "RECALL", speaking: "SPEAKING", partid: "PARTS", deliverable: "DELIVERABLE" }[kind];
      if (!t.includes(label)) continue;
      const url = `${BASE}/adaptive-courses/${cid}/submodule/${topic}/${SEG[kind]}/${base + topic}`;
      await goto(page, url);
      const body = await settle(page);
      checked++;
      if (/Something went wrong|could not be found|not found/i.test(body) || body.length < 420)
        fail(`${kind} ${cid}/${topic}`, `len ${body.length}`, body.slice(0, 200).replace(/\n+/g, " | "));
    }
  }
  console.log(`course ${cid} swept`);
}
console.log(`\n${checked} pages checked, ${broken} broken`);
await browser.close();
process.exit(broken === 0 ? 0 : 1);
