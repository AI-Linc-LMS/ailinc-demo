"use client";

/**
 * Two small panels for Home: what is on today, and what is due.
 *
 * These exist for two reasons. A school portal's Home page should answer "what is
 * happening today" before it answers anything about mastery, and the dashboard's
 * two columns were badly out of balance - 1197px on the left against 2276px on
 * the right - so the rail needed content that earns its place rather than padding.
 */

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Box, Stack, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { INK, OUTLINE, SchoolCard } from "./SchoolUI";
import { homework, timetableFor, todaySchoolDay } from "@/lib/demo/db/school";
import { subjectOf } from "@/lib/demo/db/subjects";

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

/** Today's lessons, in order, with the rest of the day greyed back. */
export function TodayLessonsPanel() {
  const router = useRouter();
  const day = todaySchoolDay();
  const periods = useMemo(() => timetableFor(day).filter((p) => p.subject), [day]);
  const now = useMemo(() => {
    const d = new Date();
    return d.getHours() * 60 + d.getMinutes();
  }, []);
  const mins = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };

  return (
    <SchoolCard>
      <PanelHead icon="mdi:calendar-clock" title={`${day}'s lessons`} href="/timetable" cta="Timetable" />
      <Stack spacing={1}>
        {periods.slice(0, 5).map((p) => {
          const s = subjectOf(p.subject!);
          const past = mins(p.end) < now;
          return (
            <Stack
              key={p.index}
              direction="row"
              spacing={1.25}
              alignItems="center"
              onClick={() => router.push("/timetable")}
              sx={{
                p: 1, borderRadius: "14px", cursor: "pointer",
                bgcolor: past ? "transparent" : s.tint,
                opacity: past ? 0.5 : 1,
                border: `2px solid ${past ? OUTLINE : "transparent"}`,
              }}
            >
              <Typography sx={{ width: 46, flexShrink: 0, fontWeight: 800, fontSize: "0.82rem", color: "#5b6b86" }}>
                {p.start}
              </Typography>
              <Box sx={{ width: 30, height: 30, flexShrink: 0, borderRadius: "10px", display: "grid", placeItems: "center", bgcolor: s.from, color: "#fff" }}>
                <Icon icon={s.icon} width={16} />
              </Box>
              <Typography noWrap sx={{ fontWeight: 700, fontSize: "0.9rem", color: INK, flex: 1, minWidth: 0 }}>
                {s.label}
              </Typography>
              <Typography sx={{ fontSize: "0.76rem", color: "#8494ab", flexShrink: 0 }}>{p.room}</Typography>
            </Stack>
          );
        })}
      </Stack>
    </SchoolCard>
  );
}

/** Homework due soonest, overdue first. */
export function HomeworkDuePanel() {
  const router = useRouter();
  const due = useMemo(
    () => homework().filter((h) => h.status !== "done").sort((a, b) => a.dueInDays - b.dueInDays).slice(0, 4),
    [],
  );
  if (due.length === 0) return null;

  return (
    <SchoolCard>
      <PanelHead icon="mdi:notebook-edit-outline" title="Homework due" href="/homework" cta="All of it" />
      <Stack spacing={1}>
        {due.map((h) => {
          const s = subjectOf(h.subject);
          const late = h.dueInDays < 0;
          return (
            <Stack
              key={h.id}
              direction="row"
              spacing={1.25}
              alignItems="center"
              onClick={() => router.push("/homework")}
              sx={{ p: 1, borderRadius: "14px", cursor: "pointer", border: `2px solid ${OUTLINE}` }}
            >
              <Box sx={{ width: 30, height: 30, flexShrink: 0, borderRadius: "10px", display: "grid", placeItems: "center", bgcolor: s.from, color: "#fff" }}>
                <Icon icon={s.icon} width={16} />
              </Box>
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography noWrap sx={{ fontWeight: 700, fontSize: "0.88rem", color: INK }}>
                  {h.title}
                </Typography>
                <Typography sx={{ fontSize: "0.76rem", fontWeight: 700, color: late ? "#b91c1c" : h.dueInDays <= 1 ? "#96610a" : "#5b6b86" }}>
                  {late ? `${-h.dueInDays} day${h.dueInDays === -1 ? "" : "s"} late` : h.dueInDays === 0 ? "Due today" : h.dueInDays === 1 ? "Due tomorrow" : `Due in ${h.dueInDays} days`}
                </Typography>
              </Box>
            </Stack>
          );
        })}
      </Stack>
    </SchoolCard>
  );
}
