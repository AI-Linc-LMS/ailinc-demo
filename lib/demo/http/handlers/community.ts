/**
 * The community forum.
 *
 * Threads are written as questions a learner on these exact courses would
 * actually ask, with answers that read like peers rather than documentation.
 * This is the module where filler is most obvious: a forum full of "Great post!"
 * tells a prospect nobody uses it.
 *
 * The cast is the shared roster, so the person who wrote the top thread is the
 * same person sitting at rank 3 on the dashboard leaderboard.
 */

import { defineRoutes } from "../router";
import { notFound } from "../types";
import { STUDENT_PERSONA, STUDENTS, FACULTY, INSTRUCTOR_PERSONA, type DemoPerson } from "../../db/people";
import { overlay, nextDemoId } from "../../db/overlay";
import { iso, isoDaysAgo, nowMs } from "../../clock";
import { seededInt } from "../../random";

const MODULE = "community";

function author(person: DemoPerson) {
  return {
    id: person.id,
    user_name: person.user_name,
    name: person.full_name,
    profile_pic_url: person.profile_pic_url,
    role: person.role,
    xp_tier:
      person.points > 8000 ? "platinum" : person.points > 6000 ? "gold" : person.points > 3000 ? "silver" : "bronze",
  } as const;
}

const TAGS = [
  { id: 1, name: "react" },
  { id: 2, name: "javascript" },
  { id: 3, name: "python" },
  { id: 4, name: "sql" },
  { id: 5, name: "algorithms" },
  { id: 6, name: "careers" },
  { id: 7, name: "interviews" },
];

interface SeedThread {
  id: number;
  title: string;
  body: string;
  by: DemoPerson;
  tags: number[];
  upvotes: number;
  comments: { by: DemoPerson; body: string; upvotes: number; daysAgo: number }[];
  daysAgo: number;
  bountyPoints?: number;
  pinned?: boolean;
}

const THREADS: SeedThread[] = [
  {
    id: 3001,
    title: "Why does my state update not re-render, but only sometimes?",
    body:
      "I have a list of tasks and I'm doing `tasks.push(newTask)` then `setTasks(tasks)`. It works " +
      "when I also change a filter at the same time, and does nothing when I don't. What am I missing?",
    by: STUDENTS[0],
    tags: [1, 2],
    upvotes: 34,
    daysAgo: 2,
    comments: [
      {
        by: STUDENTS[4],
        body:
          "You are mutating the array, so the reference never changes and React concludes nothing " +
          "happened. It looks like it works when you change the filter because THAT state change " +
          "triggers the re-render, and your mutated array gets rendered along the way. Use " +
          "`setTasks([...tasks, newTask])`.",
        upvotes: 41,
        daysAgo: 2,
      },
      {
        by: INSTRUCTOR_PERSONA,
        body:
          "Exactly right. Worth internalising the general rule: never mutate anything someone else " +
          "can already see. Local mutation inside a function you just allocated is fine — it is " +
          "publishing the mutated value that causes this.",
        upvotes: 28,
        daysAgo: 1,
      },
    ],
  },
  {
    id: 3002,
    title: "Group-by totals are lower than the raw sum and I cannot find the missing rows",
    body:
      "Summing revenue directly gives 4.82M. Grouping by region and summing gives 4.61M. Same " +
      "dataframe, no filtering in between. Where are the other 210k going?",
    by: STUDENTS[9],
    tags: [3],
    upvotes: 27,
    daysAgo: 4,
    bountyPoints: 150,
    comments: [
      {
        by: FACULTY[0],
        body:
          "Check for NaN in the region column. `groupby` drops those rows by default, so they vanish " +
          "from every group total while still counting in the raw sum. `df.groupby('region', " +
          "dropna=False)` will bring them back under a NaN key.",
        upvotes: 33,
        daysAgo: 4,
      },
      {
        by: STUDENTS[9],
        body: "That was it — 412 rows with a blank region from the older export. Thank you.",
        upvotes: 9,
        daysAgo: 3,
      },
    ],
  },
  {
    id: 3003,
    title: "How much DSA is actually enough for product-company interviews?",
    body:
      "I keep seeing people say 500 problems. That would take me the rest of the year. Is there a " +
      "point where the returns drop off, or is it genuinely a volume game?",
    by: STUDENTS[13],
    tags: [5, 7, 6],
    upvotes: 58,
    daysAgo: 6,
    pinned: true,
    comments: [
      {
        by: INSTRUCTOR_PERSONA,
        body:
          "Volume is the wrong axis. There are roughly a dozen patterns that generate most interview " +
          "questions — two pointers, sliding window, monotonic stack, BFS/DFS, topological sort, " +
          "binary search on the answer, and the DP families. Once you can look at a new question and " +
          "name the pattern within a minute, more problems stop teaching you anything.\n\n" +
          "Concretely: 100-150 problems chosen to cover the patterns beats 500 chosen at random. " +
          "Track which pattern each one was, and go back to whichever column stays empty.",
        upvotes: 71,
        daysAgo: 6,
      },
      {
        by: STUDENTS[20],
        body:
          "Seconding this. I did about 130 and cleared three onsites. The thing that moved the needle " +
          "was explaining my approach out loud before writing anything, which is also what the mock " +
          "interviewer here drills.",
        upvotes: 24,
        daysAgo: 5,
      },
    ],
  },
  {
    id: 3004,
    title: "Sliding window: why is it still O(n) if there is a loop inside a loop?",
    body:
      "The shrink step is a while loop inside a for loop, which looks quadratic to me, but everyone " +
      "says it is linear. What am I misreading?",
    by: STUDENTS[6],
    tags: [5],
    upvotes: 45,
    daysAgo: 8,
    comments: [
      {
        by: STUDENTS[2],
        body:
          "The left pointer only ever moves forward, and it can move at most n times across the whole " +
          "run. So the inner loop's total work over the entire algorithm is bounded by n, not by n " +
          "per iteration. That is amortised analysis — you count the total, not the worst single step.",
        upvotes: 52,
        daysAgo: 8,
      },
    ],
  },
  {
    id: 3005,
    title: "Anyone else getting a wrong answer only on the 'dvdf' test case?",
    body:
      "Longest substring without repeating characters. Passes everything except 'dvdf', where I get " +
      "2 instead of 3.",
    by: STUDENTS[17],
    tags: [5, 2],
    upvotes: 19,
    daysAgo: 1,
    bountyPoints: 100,
    comments: [
      {
        by: STUDENTS[0],
        body:
          "Your left pointer is jumping backwards. When you hit the second 'd', its stored index is " +
          "behind your current left edge, so `left = seen[ch] + 1` moves left back into territory you " +
          "already left. Guard it: `left = max(left, seen[ch] + 1)`.",
        upvotes: 31,
        daysAgo: 1,
      },
    ],
  },
];

function threadPayload(t: SeedThread) {
  const votes = overlay.get<Record<string, string>>("community:votes", {});
  const bookmarks = overlay.get<number[]>("community:bookmarks", []);
  const extraUp = votes[String(t.id)] === "upvote" ? 1 : 0;

  return {
    id: t.id,
    title: t.title,
    body: t.body,
    author: author(t.by),
    tags: TAGS.filter((tag) => t.tags.includes(tag.id)),
    upvotes: t.upvotes + extraUp,
    downvotes: 0,
    user_vote: (votes[String(t.id)] as "upvote" | "downvote" | undefined) ?? null,
    bookmarks_count: seededInt(`bm:${t.id}`, 2, 18) + (bookmarks.includes(t.id) ? 1 : 0),
    user_bookmarked: bookmarks.includes(t.id),
    comments_count: t.comments.length,
    created_at: isoDaysAgo(t.daysAgo, 11, 20),
    updated_at: isoDaysAgo(Math.max(0, t.daysAgo - 1), 9, 5),
    post_type: "discussion",
    image_urls: [],
    bounty: t.bountyPoints
      ? { id: t.id, points: t.bountyPoints, status: "active" as const }
      : null,
    current_user_is_author: t.by.id === STUDENT_PERSONA.id,
    current_user_role: "student",
    is_pinned: Boolean(t.pinned),
    is_locked: false,
  };
}

/** Threads the visitor posted this session, newest first. */
function visitorThreads() {
  return overlay.get<Array<Record<string, unknown>>>("community:threads", []);
}

defineRoutes(MODULE, {
  "GET /community-forum/api/clients/:clientId/threads/": () => [
    ...visitorThreads(),
    ...THREADS.map(threadPayload),
  ],

  "GET /community-forum/api/clients/:clientId/threads/:threadId/": (req) => {
    const id = Number(req.params.threadId);
    const t = THREADS.find((x) => x.id === id);
    if (!t) {
      const own = visitorThreads().find((x) => (x as { id: number }).id === id);
      if (own) return { ...own, comments: [] };
      throw notFound("Thread not found");
    }
    return {
      ...threadPayload(t),
      comments: t.comments.map((c, i) => ({
        id: t.id * 10 + i,
        body: c.body,
        author: author(c.by),
        parent: null,
        upvotes: c.upvotes,
        downvotes: 0,
        user_vote: null,
        created_at: isoDaysAgo(c.daysAgo, 13, 0),
        updated_at: isoDaysAgo(c.daysAgo, 13, 0),
        is_accepted: i === 0,
        replies: [],
      })),
    };
  },

  "POST /community-forum/api/clients/:clientId/threads/": (req) => {
    const body = (req.body ?? {}) as Record<string, unknown>;
    const thread = {
      id: nextDemoId("thread"),
      title: String(body.title ?? "Untitled"),
      body: String(body.body ?? ""),
      author: author(STUDENT_PERSONA),
      tags: [],
      upvotes: 0,
      downvotes: 0,
      user_vote: null,
      bookmarks_count: 0,
      user_bookmarked: false,
      comments_count: 0,
      created_at: iso(new Date(nowMs())),
      updated_at: iso(new Date(nowMs())),
      post_type: "discussion",
      image_urls: [],
      bounty: null,
      current_user_is_author: true,
      current_user_role: "student",
      is_pinned: false,
      is_locked: false,
    };
    overlay.unshift("community:threads", thread);
    return thread;
  },

  "POST /community-forum/api/clients/:clientId/threads/:threadId/vote/": (req) => {
    const id = req.params.threadId;
    const vote = String(req.body?.vote ?? "upvote");
    overlay.update<Record<string, string>>("community:votes", {}, (current) => ({
      ...current,
      [id]: current[id] === vote ? "" : vote,
    }));
    return { detail: "Vote recorded." };
  },

  "POST /community-forum/api/clients/:clientId/threads/:threadId/bookmark/": (req) => {
    const id = Number(req.params.threadId);
    const list = overlay.get<number[]>("community:bookmarks", []);
    const next = list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
    overlay.set("community:bookmarks", next);
    return { bookmarked: next.includes(id) };
  },

  /** Unanswered questions carrying a points bounty. */
  "GET /community-forum/api/clients/:clientId/bounties/": () =>
    THREADS.filter((t) => t.bountyPoints).map((t) => ({
      thread_id: t.id,
      thread_title: t.title,
      author: author(t.by),
      points: t.bountyPoints ?? 0,
      has_bounty: true,
      hours_unanswered: t.daysAgo * 24,
      bounty_status: "active" as const,
      comment_count: t.comments.length,
      claimed_by: null,
      claimed_at: null,
    })),

  /** The learner's community XP, separate from course points. */
  "GET /community-forum/api/clients/:clientId/xp/": () => {
    const balance = 1840;
    return {
      balance,
      tier: "silver" as const,
      tier_display: "Silver",
      next_tier_threshold: 3000,
      progress_pct: Math.round((balance / 3000) * 100),
    };
  },

  "GET /community-forum/api/clients/:clientId/tags/": () => TAGS,

  /**
   * `{ period, results }` with rank/user/xp per row — NOT a bare array. The page
   * reads `data.results.length`, so a bare array crashed it outright.
   */
  "GET /community-forum/api/clients/:clientId/leaderboard/": (req) => {
    const period = (req.query.get("period") ?? "all") as "all" | "week" | "month";
    const scale = period === "week" ? 0.12 : period === "month" ? 0.4 : 1;
    return {
      period,
      results: [STUDENT_PERSONA, ...STUDENTS.slice(0, 19)]
        .map((p) => ({ user: author(p), xp: Math.round(seededInt(`cxp:${p.id}`, 300, 4200) * scale) }))
        .sort((a, b) => b.xp - a.xp)
        .map((row, i) => ({ rank: i + 1, user: row.user, xp: row.xp, period })),
    };
  },

  /** Study rooms. Empty by design: a room is live audio, which needs a server. */
  "GET /community-forum/api/clients/:clientId/rooms/": () => [],

  "GET /community-forum/api/clients/:clientId/feed/following/": () =>
    THREADS.slice(0, 3).map(threadPayload),

  "GET /community-forum/api/clients/:clientId/badges/": () => [
    { id: 1, name: "First answer", description: "Answered your first question", earned: true },
    { id: 2, name: "Accepted answer", description: "An answer of yours was accepted", earned: true },
    { id: 3, name: "Bounty hunter", description: "Claimed a bounty", earned: false },
  ],
});
