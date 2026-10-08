import { chromium } from "playwright";
const BASE = process.argv[2] || "https://ailinc-demo.netlify.app";
const b = await chromium.launch();
const p = await (await b.newContext({ viewport: { width: 1440, height: 1000 } })).newPage();
let fails = 0;
const ck = (n, c, d = "") => { if (c) console.log("ok   " + n); else { fails++; console.log("FAIL " + n + "  " + d); } };

await p.goto(`${BASE}/login`, { waitUntil: "domcontentloaded", timeout: 45000 });
await p.waitForTimeout(3500);
await p.getByRole("button", { name: /^Student/ }).click();
await p.waitForTimeout(6000);
ck("signed in", !/\/login/.test(p.url()), p.url());

const PAGES = [
  ["Finance course", "/adaptive-courses/206", ["Finance", "double-entry"]],
  ["AC course", "/adaptive-courses/207", ["Air Conditioning", "cycle"]],
  ["German course", "/adaptive-courses/208", ["German", "vorstellen"]],
  ["worksheet", "/adaptive-courses/206/submodule/5075/worksheet/1505075", ["two ways", "WDV"]],
  ["evidence", "/adaptive-courses/207/submodule/5084/evidence/1705084", ["readings", "assessor"]],
  ["speaking", "/adaptive-courses/208/submodule/5094/speaking/2005094", ["Six sounds", "Brötchen"]],
  ["parts", "/adaptive-courses/209/submodule/5106/parts/2105106", ["exploded quadcopter", "Flight controller"]],
  ["lab", "/adaptive-courses/209/submodule/5112/lab/1805112", ["power-up", "smoke stopper"]],
];
for (const [n, path, expects] of PAGES) {
  await p.goto(BASE + path, { waitUntil: "domcontentloaded", timeout: 45000 });
  await p.waitForTimeout(3000);
  const t = await p.evaluate(() => document.body.innerText);
  const miss = expects.filter((e) => !t.toLowerCase().includes(e.toLowerCase()));
  ck(n, !/Something went wrong|could not be found/i.test(t) && miss.length === 0 && t.length > 500,
     miss.length ? "missing " + JSON.stringify(miss) : "len " + t.length);
}

// Prove the marking actually runs on the deployed build, not just the page.
await p.goto(`${BASE}/adaptive-courses/206/submodule/5075/worksheet/1505075`, { waitUntil: "domcontentloaded", timeout: 45000 });
await p.waitForTimeout(3200);
const ins = p.locator('input[inputmode="decimal"]');
const vals = ["100000","500000","180000","420000","100000","400000","126000","294000","100000","300000","88200","205800"];
for (let i = 0; i < vals.length; i++) await ins.nth(i).fill(vals[i]);
await p.getByRole("button", { name: /Mark the sheet/i }).click();
await p.waitForTimeout(3500);
const body = (await p.evaluate(() => document.body.innerText)).replace(/\s+/g, " ");
const m = body.match(/(\d+)\s*\/\s*(\d+)\s*(?:\d+ points banked|no points banked)/);
ck("a perfect sheet is marked full marks on the live site", !!m && m[1] === m[2], m ? `${m[1]} of ${m[2]}` : "no score found");
ck("worked answer released", /worked answer/i.test(body));

console.log(fails === 0 ? "\nLIVE SITE VERIFIED" : `\n${fails} LIVE CHECK(S) FAILED`);
await b.close();
process.exit(fails === 0 ? 0 : 1);
