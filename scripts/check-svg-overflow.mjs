/**
 * Does any label in a figure spill out of the box it belongs to?
 *
 * The figures are hand-authored SVG with hand-placed text, so a label that is
 * wider than its panel silently overlaps the neighbouring one. It renders, it
 * passes every other gate, and it looks broken. The existing checks measure
 * whether a label is big enough to read and whether it starts inside the
 * viewBox; neither notices a label that starts correctly and ends somewhere
 * it should not.
 *
 * This renders every authored svg in a browser and measures. For each <text>,
 * it finds the smallest <rect> that contains the text's centre and treats that
 * as the label's panel, then checks the text's real bounding box fits inside
 * it. Text with no enclosing rect is checked against the viewBox instead.
 *
 * Measured rather than eyeballed because the failure is systematic: it depends
 * on the字 width of a particular string at a particular font size, which is
 * exactly the kind of thing a person scanning a diagram does not catch.
 */
import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const DIR = "lib/demo/db/curriculum";
const PAD = 6; // user units of tolerance at each edge

const files = fs.readdirSync(DIR).filter((f) => /^course-\d+\.ts$/.test(f));
const svgs = [];
for (const f of files) {
  const src = fs.readFileSync(path.join(DIR, f), "utf8");
  for (const [svg] of src.matchAll(/<svg[\s\S]*?<\/svg>/g)) {
    const label = (svg.match(/aria-label="([^"]*)"/) || [, "(no label)"])[1];
    svgs.push({ file: f.replace(".ts", ""), label, svg });
  }
}
if (!svgs.length) {
  console.error("no svgs found; the check would pass vacuously");
  process.exit(1);
}

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent(
  `<!doctype html><meta charset="utf-8"><body style="margin:0;font-family:system-ui,sans-serif">` +
    svgs.map((s, i) => `<div data-i="${i}" style="width:900px">${s.svg}</div>`).join("") +
    `</body>`,
);
await page.waitForTimeout(400);

const results = await page.evaluate((pad) => {
  const out = [];
  document.querySelectorAll("svg").forEach((svg, idx) => {
    // Screen-space boxes, not getBBox. getBBox reports the box before any
    // transform, so a rotated axis label looks enormously wide horizontally
    // and reads as an overflow when it is simply turned on its side. Three
    // such labels were reported on the first run and none was a real fault.
    const toBox = (el) => {
      const r = el.getBoundingClientRect();
      return { x: r.left, y: r.top, w: r.width, h: r.height, area: r.width * r.height };
    };
    const frame = toBox(svg);
    const scale = frame.w / (Number((svg.getAttribute("viewBox") || "0 0 1000 1000").split(/\s+/)[2]) || 1000);
    const rects = [...svg.querySelectorAll("rect")].map(toBox);
    [...svg.querySelectorAll("text")].forEach((t) => {
      const b = toBox(t);
      if (!b.w) return;
      const cx = b.x + b.w / 2;
      const cy = b.y + b.h / 2;
      const panel = rects
        .filter((r) => cx >= r.x && cx <= r.x + r.w && cy >= r.y && cy <= r.y + r.h)
        .sort((a, c) => a.area - c.area)[0];
      const box = panel || frame;
      const over = Math.max(box.x - b.x, b.x + b.w - (box.x + box.w));
      // Report in viewBox units so the number maps onto the authored source.
      const overUnits = Math.round(over / scale);
      if (overUnits > pad) {
        out.push({
          idx,
          text: (t.textContent || "").trim().slice(0, 46),
          over: overUnits,
          inPanel: !!panel,
        });
      }
    });
  });
  return out;
}, PAD);

await browser.close();

const byFig = new Map();
for (const r of results) {
  if (!byFig.has(r.idx)) byFig.set(r.idx, []);
  byFig.get(r.idx).push(r);
}

console.log(`${svgs.length} figures measured`);
if (!byFig.size) {
  console.log("no label overflows its panel");
  process.exit(0);
}
let total = 0;
for (const [idx, rs] of [...byFig].sort((a, b) => b[1].length - a[1].length)) {
  const s = svgs[idx];
  console.log(`\n${s.file}  ${s.label.slice(0, 64)}`);
  for (const r of rs) {
    total++;
    console.log(`   +${String(r.over).padStart(4)}u  ${r.inPanel ? "out of panel" : "out of frame"}  "${r.text}"`);
  }
}
console.log(`\n${total} OVERFLOWING LABEL(S) in ${byFig.size} figure(s)`);
process.exit(1);
