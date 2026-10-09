/**
 * The sales kit has to work for somebody who is not a user.
 *
 * Routes in this app are gated page by page rather than by middleware, so
 * "public" is a property of this page not calling useAuth. That is easy to
 * break by adding a layout or a hook later, and the breakage looks like a
 * redirect to /login for everyone outside the company. So the first and most
 * important assertion here is made in a browser with no session at all.
 */
import { chromium } from "playwright";

const BASE = process.env.BASE_URL || "http://localhost:3000";
const PATH = "/sales-kit";

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

const browser = await chromium.launch();
const problems = [];

for (const [label, viewport, isMobile] of [
  ["desktop", { width: 1440, height: 1000 }, false],
  ["mobile", { width: 412, height: 915 }, true],
]) {
  // A brand new context each time: no cookies, no token, nobody logged in.
  const ctx = await browser.newContext({ viewport, isMobile, hasTouch: isMobile });
  const page = await ctx.newPage();
  await goto(page, BASE + PATH);
  await page.waitForTimeout(3500);

  if (/\/login/.test(page.url())) {
    problems.push(`${label}: redirected to login, so the page is not public`);
    await ctx.close();
    continue;
  }

  const r = await page.evaluate(() => {
    const txt = document.body.innerText;
    return {
      len: txt.length,
      cards: document.querySelectorAll("article.card").length,
      playBtns: [...document.querySelectorAll("button")].filter((b) => /play|open/i.test(b.innerText)).length,
      pdfLinks: [...document.querySelectorAll('a[href$=".pdf"]')].map((a) => a.getAttribute("href")),
      htmlLinks: [...document.querySelectorAll('a[href$=".html"]')].map((a) => a.getAttribute("href")),
      driveLinks: document.querySelectorAll('a[href*="drive.google.com"]').length,
      noindex: !!document.querySelector('meta[name="robots"][content*="noindex"]'),
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });

  if (r.cards !== 6) problems.push(`${label}: ${r.cards} cards, expected 6`);
  // Two: the self-hosted guide PDFs. The carousel is also a PDF but it lives
  // in Drive, so it is a drive.google.com link and is counted there instead.
  if (r.pdfLinks.length !== 2) problems.push(`${label}: ${r.pdfLinks.length} hosted pdf links, expected 2`);
  if (r.htmlLinks.length !== 2) problems.push(`${label}: ${r.htmlLinks.length} guide links, expected 2`);
  if (r.driveLinks !== 4) problems.push(`${label}: ${r.driveLinks} drive links, expected 4`);
  if (!r.noindex) problems.push(`${label}: no noindex meta on an internal page`);
  if (r.overflow > 2) problems.push(`${label}: scrolls sideways by ${r.overflow}px`);

  // The self-hosted guides must actually be served, not 404.
  for (const href of [...r.pdfLinks, ...r.htmlLinks].filter((h) => h.startsWith("/sales/"))) {
    const res = await page.request.get(BASE + href);
    const size = (await res.body()).length;
    if (!res.ok()) problems.push(`${label}: ${href} returned ${res.status()}`);
    else if (size < 100000) problems.push(`${label}: ${href} is only ${size} bytes`);
  }

  // The viewer opens on demand rather than loading six iframes at once.
  const before = await page.locator("iframe").count();
  if (before !== 0) problems.push(`${label}: ${before} iframes present before anything was opened`);
  const play = page.getByRole("button", { name: /^Play$/ }).first();
  if (await play.count()) {
    await play.click();
    await page.waitForTimeout(1200);
    if ((await page.locator(".viewer iframe").count()) !== 1) {
      problems.push(`${label}: the viewer did not open an iframe`);
    }
    await page.keyboard.press("Escape");
    await page.waitForTimeout(600);
    if ((await page.locator(".viewer").count()) !== 0) problems.push(`${label}: Escape did not close the viewer`);
  } else {
    problems.push(`${label}: no Play control found`);
  }

  console.log(
    `${label.padEnd(8)} cards ${r.cards} | pdf ${r.pdfLinks.length} | guides ${r.htmlLinks.length} | drive ${r.driveLinks} | noindex ${r.noindex} | overflow ${r.overflow}`,
  );
  await page.screenshot({ path: `/tmp/kit-${label}.png`, fullPage: true });
  await ctx.close();
}

await browser.close();
if (problems.length) {
  console.log(`\n${problems.length} PROBLEM(S)`);
  for (const p of problems) console.log("  - " + p);
  process.exit(1);
}
console.log("\nSALES KIT OK");
