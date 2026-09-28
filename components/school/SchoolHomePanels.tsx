"use client";

/**
 * The rest of school life, on Home.
 *
 * Timetable and homework already have panels. These cover the other five modules,
 * so a child (and the parent over their shoulder) can see the whole picture
 * without going looking: were they in school, is there a notice, what is coming
 * up, has a teacher written, and is anything owed.
 *
 * Each one is a SUMMARY that links through, never a second copy of the page. The
 * rule used throughout: show the smallest thing that answers the question, and
 * make the whole panel a door to the module.
 */

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Box, Stack, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { INK, OUTLINE, SchoolCard } from "./SchoolUI";
import {
  announcements,
  attendanceSummary,
  feeSummary,
  messages,
  schoolEvents,
} from "@/lib/demo/db/school";

function PanelHead({ icon, title, href, cta }: { icon: string; title: string; href: string; cta: string }) {
  const router = useRouter();
  return (
    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
      <Icon icon={icon} width={20} color="#1b6fd4" />
      <Typography sx={{ fontFamily: "var(--font-family-display)", fontWeight: 800, fontSize: "1.05rem", color: INK, flex: 1 }}>
        {title}
      </Typography>
      <Box
        component="button"
        onClick={() => router.push(href)}
        sx={{ cursor: "pointer", border: "none", bgcolor: "transparent", color: "#1b6fd4", fontWeight: 800, fontSize: "0.82rem" }}
      >
        {cta} →
      </Box>
    </Stack>
  );
}

/**
 * Four numbers about school life, as a full-width strip.
 *
 * Full width rather than in a column because these are four unrelated facts, and
 * stacking unrelated facts vertically invites a reader to look for a relationship
 * between them that is not there.
 */
export function SchoolQuickTiles() {
  const router = useRouter();
  const att = useMemo(() => attendanceSummary(), []);
  const unread = useMemo(() => messages().filter((m) => !m.read).length, []);
  const next = useMemo(() => schoolEvents()[0], []);
  const fee = useMemo(() => feeSummary(), []);

  const tiles = [
    {
      icon: "mdi:calendar-check-outline",
      accent: "#22a25b",
      value: `${att.percent}%`,
      label: "Attendance",
      // "1 day away" reads as "in 1 day". It is a count of days missed.
      sub: att.absent ? `${att.absent} day${att.absent === 1 ? "" : "s"} missed` : "Never missed",
      href: "/attendance",
    },
    {
      icon: "mdi:email-outline",
      accent: unread ? "#1b6fd4" : "#8494ab",
      value: unread,
      label: unread === 1 ? "New note" : "New notes",
      sub: unread ? "From your teachers" : "Nothing new",
      href: "/messages",
    },
    {
      icon: "mdi:calendar-star",
      accent: "#a21caf",
      value: next ? `${next.inDays}d` : "-",
      label: "Next event",
      sub: next ? next.title : "Nothing planned",
      href: "/school-calendar",
    },
    {
      icon: "mdi:wallet-outline",
      accent: fee.dueNow ? "#dc2626" : "#22a25b",
      value: fee.dueNow ? `₹${fee.dueNow.toLocaleString("en-IN")}` : "Paid",
      label: fee.dueNow ? "Fees due" : "Fees",
      sub: fee.dueNow ? fee.nextDue?.label ?? "Due now" : "Nothing to pay",
      href: "/fees",
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "repeat(2,minmax(0,1fr))", md: "repeat(4,minmax(0,1fr))" },
        gap: 2,
        mb: 2.5,
      }}
    >
      {tiles.map((t) => (
        <SchoolCard
          key={t.label}
          sx={{ p: 2, cursor: "pointer", minWidth: 0 }}
          onClick={() => router.push(t.href)}
        >
          <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 1 }}>
            <Box sx={{ width: 36, height: 36, flexShrink: 0, borderRadius: "12px", display: "grid", placeItems: "center", bgcolor: t.accent, color: "#fff", border: "2px solid rgba(16,34,74,0.16)" }}>
              <Icon icon={t.icon} width={20} />
            </Box>
            <Typography sx={{ fontFamily: "var(--font-family-display)", fontWeight: 800, fontSize: "1.5rem", color: INK, lineHeight: 1 }}>
              {t.value}
            </Typography>
          </Stack>
          <Typography sx={{ fontWeight: 700, fontSize: "0.88rem", color: INK }}>{t.label}</Typography>
          <Typography noWrap sx={{ fontSize: "0.78rem", color: "#5b6b86" }}>{t.sub}</Typography>
        </SchoolCard>
      ))}
    </Box>
  );
}

/** The pinned notices, which are the ones the school needs everyone to see. */
export function NoticesPanel() {
  const router = useRouter();
  const list = useMemo(() => {
    const all = announcements();
    const pinned = all.filter((n) => n.pinned);
    return (pinned.length ? pinned : all).slice(0, 2);
  }, []);
  if (!list.length) return null;

  const TONE: Record<string, { bg: string; ink: string; icon: string }> = {
    info: { bg: "#eff7ff", ink: "#1b6fd4", icon: "mdi:information-outline" },
    warning: { bg: "#fff8e6", ink: "#96610a", icon: "mdi:alert-outline" },
    celebrate: { bg: "#e8fbef", ink: "#15803d", icon: "mdi:party-popper" },
  };

  return (
    <SchoolCard>
      <PanelHead icon="mdi:bullhorn-outline" title="Notices" href="/notices" cta="All" />
      <Stack spacing={1.25}>
        {list.map((n) => {
          const t = TONE[n.tone] ?? TONE.info;
          return (
            <Stack
              key={n.id}
              direction="row"
              spacing={1.25}
              onClick={() => router.push("/notices")}
              sx={{ p: 1.25, borderRadius: "14px", cursor: "pointer", bgcolor: t.bg, alignItems: "flex-start" }}
            >
              <Icon icon={t.icon} width={20} color={t.ink} style={{ flexShrink: 0, marginTop: 2 }} />
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ fontWeight: 800, fontSize: "0.9rem", color: INK, lineHeight: 1.3 }}>
                  {n.title}
                </Typography>
                <Typography noWrap sx={{ fontSize: "0.78rem", color: "#5b6b86" }}>{n.body}</Typography>
              </Box>
            </Stack>
          );
        })}
      </Stack>
    </SchoolCard>
  );
}

/** The next few things on the school calendar. */
export function ComingUpPanel() {
  const router = useRouter();
  const list = useMemo(() => schoolEvents().slice(0, 3), []);
  if (!list.length) return null;

  const KIND: Record<string, { bg: string; ink: string; icon: string }> = {
    holiday: { bg: "#e8fbef", ink: "#15803d", icon: "mdi:beach" },
    event: { bg: "#eff7ff", ink: "#1b6fd4", icon: "mdi:star-outline" },
    exam: { bg: "#fff8e6", ink: "#96610a", icon: "mdi:file-document-edit-outline" },
    trip: { bg: "#fdf0fd", ink: "#a21caf", icon: "mdi:bus" },
  };

  return (
    <SchoolCard>
      <PanelHead icon="mdi:calendar-star" title="Coming up" href="/school-calendar" cta="Calendar" />
      <Stack spacing={1}>
        {list.map((e) => {
          const k = KIND[e.kind] ?? KIND.event;
          const when = new Date(e.at);
          return (
            <Stack
              key={e.id}
              direction="row"
              spacing={1.25}
              alignItems="center"
              onClick={() => router.push("/school-calendar")}
              sx={{ p: 1, borderRadius: "14px", cursor: "pointer", border: `2px solid ${OUTLINE}` }}
            >
              <Box sx={{ width: 42, flexShrink: 0, textAlign: "center", borderRadius: "10px", overflow: "hidden", border: "2px solid rgba(16,34,74,0.10)" }}>
                <Box sx={{ bgcolor: k.ink, color: "#fff", fontSize: "0.58rem", fontWeight: 800, py: 0.15 }}>
                  {when.toLocaleDateString(undefined, { month: "short" }).toUpperCase()}
                </Box>
                <Typography sx={{ fontFamily: "var(--font-family-display)", fontWeight: 800, fontSize: "1rem", lineHeight: 1.3, color: INK }}>
                  {when.getDate()}
                </Typography>
              </Box>
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography noWrap sx={{ fontWeight: 700, fontSize: "0.9rem", color: INK }}>{e.title}</Typography>
                <Typography sx={{ fontSize: "0.76rem", color: "#5b6b86" }}>
                  {e.inDays === 0 ? "Today" : e.inDays === 1 ? "Tomorrow" : `In ${e.inDays} days`}
                  {e.allDay ? "" : ` · ${e.time}`}
                </Typography>
              </Box>
            </Stack>
          );
        })}
      </Stack>
    </SchoolCard>
  );
}
