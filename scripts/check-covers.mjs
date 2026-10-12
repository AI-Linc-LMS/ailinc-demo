/**
 * Every course card in the catalogue must show a photograph that actually
 * loaded.
 *
 * Two courses shipped with no entry in the COVERS map at all, so their cards
 * fell through to the fallback gradient while every neighbour carried a photo.
 * Nothing failed: the fallback is deliberate and silent, which is right when a
 * network is blocked and wrong when the entry was simply never written. A
 * missing cover is invisible to tsc, invisible to the build, and obvious to
 * anyone looking at the grid.
 *
 * So this loads the real catalogue, scrolls it so the lazy images fetch, and
 * asserts that every cover reached a non-zero naturalWidth and was not hidden
 * by the onError handler. It runs against a deploy rather than a local build,
 * because the thing that breaks is a remote URL.
 */
import { chromium } from "playwright";

const BASE = process.argv[2] || "https://ailinc-demo.netlify.app";
const b = await chromium.launch();
const p = await (await b.newContext({ viewport: { width: 1440, height: 1200 } })).newPage();
let fails = 0;
const ck = (n, c, d = "") => {
  if (c) console.log("ok   " + n);
  else { fails++; console.log("FAIL " + n + "  " + d); }
};

await p.goto(`${BASE}/login`, { waitUntil: "domcontentloaded", timeout: 60000 });
await p.waitForTimeout(3500);
await p.getByRole("button", { name: /^Student/ }).click();
await p.waitForTimeout(7000);
await p.goto(`${BASE}/adaptive-courses`, { waitUntil: "domcontentloaded", timeout: 60000 });
await p.waitForTimeout(6000);
for (let i = 0; i < 12; i++) { await p.mouse.wheel(0, 900); await p.waitForTimeout(500); }
await p.waitForTimeout(3000);

const imgs = await p.evaluate(() =>
  Array.from(document.images)
    .filter((i) => /unsplash|data:image/.test(i.src))
    .map((i) => ({
      alt: i.alt,
      w: i.naturalWidth,
      hidden: i.style.display === "none",
      photo: i.src.startsWith("http"),
    })));

ck("the catalogue rendered some cards at all", imgs.length >= 6, `found ${imgs.length}`);

// The first assertion on its own would have passed the bug that prompted this
// script. A card with no COVERS entry still renders an image: the gradient
// plate is served as an SVG data URI, so it loads fine and reports a healthy
// naturalWidth. Checking only that the images loaded would be checking that
// the fallback works, which it always did. The omission is only visible as the
// absence of a photograph, so that is what gets asserted.
const onFallback = imgs.filter((i) => !i.photo);
ck("every card carries a real photograph, not the gradient plate",
   onFallback.length === 0, JSON.stringify(onFallback.map((x) => x.alt)));

const broken = imgs.filter((i) => i.w === 0 || i.hidden);
ck("no cover in the grid failed to load", broken.length === 0, JSON.stringify(broken.map((x) => x.alt)));
console.log(imgs.map((i) => `  ${String(i.w).padStart(5)}px  ${i.photo ? "photo   " : "FALLBACK"}  ${i.alt.slice(0, 50)}`).join("\n"));

await b.close();
process.exit(fails ? 1 : 0);
