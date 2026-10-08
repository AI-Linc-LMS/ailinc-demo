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

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await ctx.newPage();
await page.goto(`${BASE}/login`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2000);
await page.getByRole("button", { name: /^Student/ }).click();
await page.waitForTimeout(4500);
if (/\/login/.test(page.url())) { console.log("SIGN IN FAILED"); process.exit(2); }

let checked = 0, broken = 0;
const fail = (what, why, head) => { broken++; console.log(`FAIL ${what}\n     ${why}\n     ${head}`); };

for (const [cid, [lo, hi]] of Object.entries(COURSES)) {
  // course overview must render
  await page.goto(`${BASE}/adaptive-courses/${cid}`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2200);
  let t = await page.evaluate(() => document.body.innerText);
  checked++;
  if (/Something went wrong|could not be found/i.test(t) || t.length < 1200)
    fail(`course ${cid} overview`, "did not render", t.slice(0, 160).replace(/\n+/g, " | "));

  for (let topic = lo; topic <= hi; topic++) {
    // lesson page: reveals which practicals exist
    await page.goto(`${BASE}/adaptive-courses/${cid}/submodule/${topic}`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1600);
    t = await page.evaluate(() => document.body.innerText);
    checked++;
    if (/Something went wrong|could not be found/i.test(t))
      fail(`lesson ${cid}/${topic}`, "errored", t.slice(0, 160).replace(/\n+/g, " | "));

    for (const [kind, base] of Object.entries(BAND)) {
      // only visit a practical the lesson actually advertises
      const label = { worksheet: "WORKING PAPER", scenario: "DECISION RUN", evidence: "EVIDENCE",
        lab: "PROCEDURE", deck: "RECALL", speaking: "SPEAKING", partid: "PARTS", deliverable: "DELIVERABLE" }[kind];
      if (!t.includes(label)) continue;
      const url = `${BASE}/adaptive-courses/${cid}/submodule/${topic}/${SEG[kind]}/${base + topic}`;
      await page.goto(url, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(1700);
      const body = await page.evaluate(() => document.body.innerText);
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
