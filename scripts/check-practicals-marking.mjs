/**
 * Interaction check: does the marking actually work?
 *
 * Rendering proves the payload shape is right. It says nothing about whether a
 * correct worksheet is marked correct, whether a wrong figure produces the
 * feedback that was authored for it, or whether method marks fire. Those are
 * the claims this surface is sold on, so they get exercised rather than
 * eyeballed.
 */
import { chromium } from "playwright";

const BASE = "http://localhost:3000";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1500, height: 1100 } });
const page = await ctx.newPage();
const errs = [];
page.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0, 180)); });

await page.goto(`${BASE}/login`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2000);
await page.getByRole("button", { name: /^Student/ }).click();
await page.waitForTimeout(4000);

let fails = 0;
const check = (name, cond, detail = "") => {
  if (cond) console.log(`ok    ${name}`);
  else { fails++; console.log(`FAIL  ${name}  ${detail}`); }
};

/* ---- 1. The depreciation worksheet, submitted PERFECTLY -------------------
 * If a fully correct sheet does not come back fully correct, nothing else
 * about this surface matters. */
await page.goto(`${BASE}/adaptive-courses/206/submodule/5075/worksheet/1505075`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2800);

const RIGHT = {
  y1: { slc: "100000", slv: "500000", wdc: "180000", wdv: "420000" },
  y2: { slc: "100000", slv: "400000", wdc: "126000", wdv: "294000" },
  y3: { slc: "100000", slv: "300000", wdc: "88200", wdv: "205800" },
};
let inputs = page.locator('input[inputmode="decimal"]');
let n = await inputs.count();
check("depreciation sheet has 12 editable cells", n === 12, `found ${n}`);
const flat = [...Object.values(RIGHT).flatMap((r) => [r.slc, r.slv, r.wdc, r.wdv])];
for (let i = 0; i < Math.min(n, flat.length); i++) await inputs.nth(i).fill(flat[i]);
await page.waitForTimeout(600);

let body = await page.evaluate(() => document.body.innerText);
check("balance strip reports the check holding before submit", /Every check holds/i.test(body), body.match(/.{0,80}check.{0,60}/i)?.[0] ?? "");

await page.getByRole("button", { name: /Mark the sheet/i }).click();
await page.waitForTimeout(2500);
body = await page.evaluate(() => document.body.innerText);
// Compare the two sides of the score fraction rather than hardcoding a total,
// so adding a cell to the worksheet cannot silently invalidate this check.
const score = body.replace(/\s+/g, " ").match(/(\d+)\s*\/\s*(\d+)\s*(?:\d+ points banked|no points banked)/);
check(
  "a perfect sheet is awarded every available mark",
  !!score && score[1] === score[2] && Number(score[2]) > 0,
  score ? `${score[1]} of ${score[2]}` : (body.match(/\d+\s*\/\s*\d+/g) || []).slice(0, 4).join(" "),
);
check("no wrong-cell chips on a perfect sheet", !/\bwrong\b/i.test(body), "");
check("worked answer is released after marking", /worked answer/i.test(body), "");

/* ---- 2. The same sheet with a WRONG year-1 figure, to fire method marks --- */
await page.goto(`${BASE}/adaptive-courses/206/submodule/5075/worksheet/1505075`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2800);
inputs = page.locator('input[inputmode="decimal"]');
// Year 1 WDV charge wrong on purpose (30% of 6,00,000 mistyped), but every
// later figure is correctly derived from the learner's OWN wrong number.
const METHOD = ["100000","500000","200000","400000","100000","400000","120000","280000","100000","300000","84000","196000"];
for (let i = 0; i < METHOD.length; i++) await inputs.nth(i).fill(METHOD[i]);
await page.getByRole("button", { name: /Mark the sheet/i }).click();
await page.waitForTimeout(2500);
body = await page.evaluate(() => document.body.innerText);
check("method marks are awarded for a consistent chain", /method marks/i.test(body), body.slice(0, 200).replace(/\n+/g, " | "));
check("the method-marks explanation names the fix", /figure it was built on/i.test(body) || /earlier figure/i.test(body), "");

/* ---- 3. A scenario run to an ending ------------------------------------- */
await page.goto(`${BASE}/adaptive-courses/206/submodule/5073/scenario/1605073`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2800);
// Take the best choice at each node until an ending appears.
for (let step = 0; step < 5; step++) {
  const opts = page.locator('button:has-text("divisible by nine"), button:has-text("61 entries")');
  if (await opts.count()) { await opts.first().click(); await page.waitForTimeout(2200); }
  else break;
}
body = await page.evaluate(() => document.body.innerText);
check("the ideal scenario path reaches an ideal ending", /Found, corrected, and documented/i.test(body), body.slice(0, 220).replace(/\n+/g, " | "));
check("the debrief shows the per-decision breakdown", /Every decision, and what it cost/i.test(body), "");
check("the consequence of each choice was shown", /What that led to/i.test(body) || /A stronger move here/i.test(body) || /decisions/i.test(body), "");

/* ---- 4. A deck card, typed correctly ------------------------------------ */
await page.goto(`${BASE}/adaptive-courses/206/submodule/5079/deck/1905079`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2800);
const front = await page.evaluate(() => document.body.innerText);
const ANSWERS = {
  "GST paid on purchases": "input tax credit",
  "GST a business charges": "output tax",
  "two levies on an intra-state": "CGST and SGST",
  "single levy on an inter-state": "IGST",
  "rule deciding whether": "place of supply",
  "recipient rather than the supplier": "reverse charge",
  "monthly summary return": "GSTR-3B",
  "invoice-level outward": "GSTR-1",
  "auto-populated statement": "GSTR-2B",
  "forgo input credit": "composition scheme",
  "credits that cannot be claimed": "Section 17(5)",
  "government-registered invoice carries": "IRN",
  "move goods above a value": "e-way bill",
  "output rates sit below": "inverted duty structure",
  "15-digit registration": "GSTIN",
  "sale is returned": "to reduce output tax liability",
  "rate cut to be passed": "anti-profiteering",
  "annual reconciliation return": "GSTR-9C",
};
const hit = Object.entries(ANSWERS).find(([k]) => front.includes(k));
check("a deck card is on screen with a known front", !!hit, front.slice(0, 200).replace(/\n+/g, " | "));
if (hit) {
  await page.locator('input[placeholder="type what it means"]').fill(hit[1]);
  await page.getByRole("button", { name: /^Check$/ }).click();
  await page.waitForTimeout(2000);
  body = await page.evaluate(() => document.body.innerText);
  check("a correct typed answer is marked Recalled", /Recalled/i.test(body), body.slice(0, 260).replace(/\n+/g, " | "));
  check("the next interval is shown", /due again in/i.test(body), "");
}

if (errs.length) console.log("\nconsole errors:", errs.slice(0, 5));
console.log(fails === 0 ? "\nALL INTERACTIONS PASS" : `\n${fails} INTERACTION CHECK(S) FAILED`);
await b.close();
process.exit(fails === 0 ? 0 : 1);
