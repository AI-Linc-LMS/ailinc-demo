/**
 * The notification bell.
 *
 * Read state is persisted, so marking one read (or all of them) actually clears
 * the badge and stays cleared across a reload. A bell whose count never moves is
 * a detail a prospect notices within seconds of clicking it.
 */

import { defineRoutes } from "../router";
import { overlay } from "../../db/overlay";
import { iso, isoDaysAgo, nowMs } from "../../clock";

const MODULE = "notifications";

interface Seed {
  id: number;
  title: string;
  body: string;
  type: string;
  route: string;
  hoursAgo: number;
}

const SEEDS: Seed[] = [
  {
    id: 7001,
    title: "Live session starts in an hour",
    body: "Live doubt-clearing: React rendering and effects, with Vikram Menon.",
    type: "live_session",
    route: "/live-sessions",
    hoursAgo: 1,
  },
  {
    id: 7002,
    title: "Your DSA diagnostic has been graded",
    body: "You scored 76%, placing you 7th of 84. Open the result to see the per-section breakdown.",
    type: "assessment",
    route: "/assessments",
    hoursAgo: 20,
  },
  {
    id: 7003,
    title: "Kabir replied to your question",
    body: '"Your left pointer is jumping backwards..." on Sliding window: why is it still O(n)?',
    type: "community",
    route: "/community",
    hoursAgo: 30,
  },
  {
    id: 7004,
    title: "New role matched to your profile",
    body: "Software Engineer I (Backend) at Razorpay. Applications close in 12 days.",
    type: "job",
    route: "/jobs-v2",
    hoursAgo: 48,
  },
];

function readIds(): number[] {
  return overlay.get<number[]>("notifications:read", []);
}

function allRead(): boolean {
  return overlay.get<boolean>("notifications:allRead", false);
}

function toApi(s: Seed) {
  return {
    id: s.id,
    title: s.title,
    message: s.body,
    body: s.body,
    notification_type: s.type,
    type: s.type,
    action_url: s.route,
    route: s.route,
    is_read: allRead() || readIds().includes(s.id),
    read: allRead() || readIds().includes(s.id),
    created_at: isoDaysAgo(s.hoursAgo / 24, 12, 0),
  };
}

function unreadCount(): number {
  return SEEDS.filter((s) => !(allRead() || readIds().includes(s.id))).length;
}

defineRoutes(MODULE, {
  "GET /notification/api/clients/:clientId/notifications/": () => ({
    results: SEEDS.map(toApi),
    count: SEEDS.length,
    unread_count: unreadCount(),
  }),

  "GET /notification/api/clients/:clientId/notifications/unread-count/": () => ({
    unread_count: unreadCount(),
    count: unreadCount(),
  }),

  "POST /notification/api/clients/:clientId/notifications/:notificationId/read/": (req) => {
    const id = Number(req.params.notificationId);
    overlay.update<number[]>("notifications:read", [], (list) =>
      list.includes(id) ? list : [...list, id],
    );
    return { detail: "Marked as read.", unread_count: unreadCount() };
  },

  "POST /notification/api/clients/:clientId/notifications/mark-all-read/": () => {
    overlay.set("notifications:allRead", true);
    return { detail: "All notifications marked as read.", unread_count: 0 };
  },

  "PATCH /notification/api/clients/:clientId/notifications/mark-all-read/": () => {
    overlay.set("notifications:allRead", true);
    return { detail: "All notifications marked as read.", unread_count: 0 };
  },

  "DELETE /notification/api/clients/:clientId/notifications/:notificationId/": () => ({
    detail: "Notification dismissed.",
    dismissed_at: iso(new Date(nowMs())),
  }),
});
