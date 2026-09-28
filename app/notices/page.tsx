"use client";

/**
 * School notices. SCHOOL EDITION, new in this fork.
 *
 * Pinned notices sit at the top and do not scroll away, because the two things a
 * school most needs everyone to see - the closure and the event on Friday - are
 * exactly the two that get buried by a chronological list.
 */

import { useMemo } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { PageShell } from "@/components/common/PageShell";
import { INK, OUTLINE, SchoolCard, SchoolPageHead } from "@/components/school/SchoolUI";
import { sceneAnnounce } from "@/lib/demo/illustrations/scenes";
import { announcements, type Announcement } from "@/lib/demo/db/school";

const TONE: Record<Announcement["tone"], { bg: string; ink: string; icon: string }> = {
  info: { bg: "#eff7ff", ink: "#1b6fd4", icon: "mdi:information-outline" },
  warning: { bg: "#fff8e6", ink: "#96610a", icon: "mdi:alert-outline" },
  celebrate: { bg: "#e8fbef", ink: "#15803d", icon: "mdi:party-popper" },
};

function ago(days: number): string {
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  const w = Math.round(days / 7);
  return w === 1 ? "1 week ago" : `${w} weeks ago`;
}

function NoticeCard({ n }: { n: Announcement }) {
  const t = TONE[n.tone];
  return (
    <SchoolCard tint={n.pinned ? t.bg : "#ffffff"}>
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <Box sx={{ width: 46, height: 46, flexShrink: 0, borderRadius: "15px", display: "grid", placeItems: "center", bgcolor: t.ink, color: "#fff", border: "2px solid rgba(16,34,74,0.16)" }}>
          <Icon icon={t.icon} width={24} />
        </Box>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5, flexWrap: "wrap" }}>
            {n.pinned ? (
              <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.4, px: 1, py: 0.25, borderRadius: 999, bgcolor: t.ink, color: "#fff", fontWeight: 800, fontSize: "0.7rem" }}>
                <Icon icon="mdi:pin" width={13} /> PINNED
              </Box>
            ) : null}
            <Typography sx={{ fontSize: "0.78rem", color: "#8494ab", fontWeight: 600 }}>{ago(n.postedDaysAgo)}</Typography>
          </Stack>
          <Typography sx={{ fontFamily: "var(--font-family-display)", fontWeight: 800, fontSize: "1.2rem", color: INK, lineHeight: 1.25 }}>
            {n.title}
          </Typography>
          <Typography sx={{ mt: 0.75, fontSize: "0.95rem", color: "#44536b", lineHeight: 1.55 }}>{n.body}</Typography>
          <Typography sx={{ mt: 1, fontSize: "0.82rem", color: "#8494ab" }}>From {n.from}</Typography>
        </Box>
      </Stack>
    </SchoolCard>
  );
}

export default function NoticesPage() {
  const all = useMemo(() => announcements(), []);
  const pinned = all.filter((n) => n.pinned);
  const rest = all.filter((n) => !n.pinned);

  return (
    <PageShell>
      <SchoolPageHead
        eyebrow="School"
        title="Notices"
        blurb="Messages for the whole school. The important ones stay pinned at the top."
        scene={sceneAnnounce("ink")}
        tint="#fff8e6"
      />

      <Stack spacing={2}>
        {pinned.map((n) => <NoticeCard key={n.id} n={n} />)}
        {rest.length > 0 ? (
          <Typography sx={{ fontFamily: "var(--font-family-display)", fontWeight: 800, fontSize: "1.1rem", color: INK, mt: 1 }}>
            Earlier
          </Typography>
        ) : null}
        {rest.map((n) => <NoticeCard key={n.id} n={n} />)}
      </Stack>
    </PageShell>
  );
}
