/**
 * Render check for the new practical players.
 *
 * A handler with the WRONG SHAPE is worse than no handler: a missing one
 * degrades to an empty state, a wrong one crashes the route, and an unhandled
 * route list does not catch it. So this asserts each page RENDERS its own
 * content, not merely that it returned 200.
 */
import { chromium } from "playwright";

const BASE = "http://localhost:3000";
const PAGES = [
  // Finance course 206, topic ids 5070..5081
  ["course overview", "/adaptive-courses/206", ["Finance", "double-entry"]],
  ["lesson with worksheet", "/adaptive-courses/206/submodule/5071", ["WORKING PAPER", "marked cells"]],
  ["worksheet player", "/adaptive-courses/206/submodule/5071/worksheet/1505071", ["Journalise seven transactions", "Debits equal credits", "Date and entry"]],
  ["ledger worksheet", "/adaptive-courses/206/submodule/5072/worksheet/1505072", ["Post and balance", "Balance carried down"]],
  ["trial balance worksheet", "/adaptive-courses/206/submodule/5073/worksheet/1505073", ["trial balance", "proves correct"]],
  ["scenario player", "/adaptive-courses/206/submodule/5073/scenario/1605073", ["difference of 5,400", "bookkeeper"]],
  ["adjustments worksheet", "/adaptive-courses/206/submodule/5074/worksheet/1505074", ["year-end adjustments", "Asset or liability"]],
  ["depreciation worksheet", "/adaptive-courses/206/submodule/5075/worksheet/1505075", ["two ways", "WDV charge"]],
  ["provisions scenario", "/adaptive-courses/206/submodule/5076/scenario/1605076", ["gone quiet", "accountant"]],
  ["final accounts worksheet", "/adaptive-courses/206/submodule/5077/worksheet/1505077", ["Gross profit", "rule off"]],
  ["deliverable player", "/adaptive-courses/206/submodule/5077/deliverable/2205077", ["Rekha", "covering note", "How this will be marked"]],
  ["bank rec worksheet", "/adaptive-courses/206/submodule/5078/worksheet/1505078", ["Reconcile", "Timing"]],
  ["deck player", "/adaptive-courses/206/submodule/5079/deck/1905079", ["GST terms", "in this sitting", "Check"]],
  ["gstr worksheet", "/adaptive-courses/206/submodule/5080/worksheet/1505080", ["GST liability", "CGST"]],
  ["fraud scenario", "/adaptive-courses/206/submodule/5081/scenario/1605081", ["nobody has heard of", "Vidarbha"]],
];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await ctx.newPage();

const consoleErrors = [];
page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text().slice(0, 160)); });

// Sign in as the student persona.
await page.goto(`${BASE}/login`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(1200);
await page.getByRole("button", { name: /^Student/ }).click();
await page.waitForTimeout(4500);
console.log("signed in, at", page.url());
if (/\/login/.test(page.url())) {
  console.log("STILL ON LOGIN - aborting, the crawl would report every page broken for one reason");
  process.exit(2);
}

let failures = 0;
for (const [name, path, expects] of PAGES) {
  consoleErrors.length = 0;
  await page.goto(BASE + path, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2600);
  const text = await page.evaluate(() => document.body.innerText);
  const broke = /Something went wrong|Application error|Unhandled Runtime|404|This page could not be found/i.test(text);
  const missing = expects.filter((e) => !text.toLowerCase().includes(e.toLowerCase()));
  const ok = !broke && missing.length === 0 && text.length > 400;
  if (!ok) {
    failures++;
    console.log(`\nFAIL  ${name}  ${path}`);
    if (broke) console.log("      page reports an error");
    if (missing.length) console.log("      missing:", JSON.stringify(missing));
    console.log("      len:", text.length);
    console.log("      head:", text.slice(0, 260).replace(/\n+/g, " | "));
    if (consoleErrors.length) console.log("      console:", consoleErrors.slice(0, 3));
  } else {
    console.log(`ok    ${name}  (${text.length} chars)`);
  }
}
console.log(failures === 0 ? "\nALL RENDER" : `\n${failures} PAGE(S) BROKEN`);
await browser.close();
process.exit(failures === 0 ? 0 : 1);
