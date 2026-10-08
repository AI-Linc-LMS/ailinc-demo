/**
 * The results page of a quiz the seed says was already finished.
 *
 * A topic marked done advertises `last_session_id: "sess-<topicId>"` and the
 * submodule page links straight to it, but no such session was ever created:
 * only quizzes actually taken in the browser get an id. Every one of those
 * links landed on "Quiz session not found", on a course the visitor is told
 * they have completed.
 *
 * This walks the advertised ids rather than a hardcoded list, so a topic that
 * starts claiming a session later is covered without editing this file.
 */
import { chromium } from "playwright";

const BASE = process.env.BASE_URL || "http://localhost:3000";
/**
 * The topics that actually advertise a session: progress 100 AND a quiz kind,
 * which is what `quizFor` tests before emitting `last_session_id`.
 *
 * My first version of this list was a guess and included 5096 (no quiz kind,
 * 80% done) and the drone topics (all seeded at 0). Those ids are never linked
 * to, so a 404 on them is correct - and chasing it nearly led to a
 * materialiser that invented a completed attempt for any id of that shape.
 */
const TOPICS = [5070, 5071, 5082, 5083, 5095];

/**
 * Ids of the same shape that nothing advertises. These must still 404: a
 * results page is a record of something the visitor did, and inventing one for
 * a topic they have never opened is worse than the error it replaces.
 */
const NEVER_ADVERTISED = [5096, 5107, 5117];

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
const page = await (await browser.newContext({ viewport: { width: 1440, height: 1000 } })).newPage();

await goto(page, `${BASE}/login`);
await page.waitForTimeout(2000);
await page.getByRole("button", { name: /^Student/ }).click();
await page.waitForTimeout(4500);
if (/\/login/.test(page.url())) {
  console.log("SIGN IN FAILED");
  process.exit(2);
}

const problems = [];
for (const topic of TOPICS) {
  await goto(page, `${BASE}/adaptive-quizzes/session/sess-${topic}/results`);
  // The page fetches the session, which materialises it on first request.
  await page.waitForTimeout(4500);
  const text = await page.evaluate(() => document.body.innerText);

  if (/Quiz session not found/i.test(text)) {
    problems.push(`sess-${topic}: still "Quiz session not found"`);
    console.log(`FAIL  sess-${topic}  session not found`);
    continue;
  }
  if (/Something went wrong|Application error|could not be found/i.test(text)) {
    problems.push(`sess-${topic}: the page errored`);
    console.log(`FAIL  sess-${topic}  page error`);
    continue;
  }
  // A results page with no questions on it would be a worse lie than the 404.
  const answered = (text.match(/Question\s+\d+|correct|incorrect/gi) || []).length;
  if (text.length < 600 || answered === 0) {
    problems.push(`sess-${topic}: results page rendered but carries no questions`);
    console.log(`FAIL  sess-${topic}  empty results (len ${text.length}, markers ${answered})`);
    continue;
  }
  console.log(`ok    sess-${topic}  results render (len ${text.length})`);
}

for (const topic of NEVER_ADVERTISED) {
  await goto(page, `${BASE}/adaptive-quizzes/session/sess-${topic}/results`);
  await page.waitForTimeout(4000);
  const text = await page.evaluate(() => document.body.innerText);
  if (/Quiz session not found/i.test(text)) {
    console.log(`ok    sess-${topic}  correctly 404s, nothing advertises it`);
  } else {
    problems.push(`sess-${topic}: invented a session for a topic that advertises none`);
    console.log(`FAIL  sess-${topic}  invented a session`);
  }
}

// Determinism: the same session must not rewrite its own history on reload.
await goto(page, `${BASE}/adaptive-quizzes/session/sess-5070/results`);
await page.waitForTimeout(4000);
const first = await page.evaluate(() => document.body.innerText);
await page.reload({ waitUntil: "domcontentloaded" });
await page.waitForTimeout(4000);
const second = await page.evaluate(() => document.body.innerText);
if (first !== second) {
  problems.push("sess-5070: the results page changed between two loads");
  console.log("FAIL  sess-5070  not deterministic across a reload");
} else {
  console.log("ok    sess-5070  identical across a reload");
}

await browser.close();
if (problems.length) {
  console.log(`\n${problems.length} PROBLEM(S)`);
  for (const p of problems) console.log("  - " + p);
  process.exit(1);
}
console.log("\nSEEDED QUIZ RESULTS OK");
