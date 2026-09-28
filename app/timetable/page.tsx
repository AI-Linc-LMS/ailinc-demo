"use client";

/**
 * Timetable. SCHOOL EDITION, new in this fork.
 *
 * The first question a child asks a school app is "what have I got next", so that
 * is the top of the page and it is the only thing rendered large. The week grid
 * underneath is for planning rather than for right now.
 *
 * Every lesson takes its colour from the subject registry, which is what lets a
 * child find Wednesday's Science by recognising the green rather than by reading
 * five rows of text.
 */

import { useMemo, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { PageShell } from "@/components/common/PageShell";
import { INK, OUTLINE, SchoolCard, SchoolPageHead } from "@/components/school/SchoolUI";
import { sceneTimetable } from "@/lib/demo/illustrations/scenes";
import { SCHOOL_DAYS, timetableFor, todaySchoolDay, type Period, type SchoolDay } from "@/lib/demo/db/school";
import { subjectOf } from "@/lib/demo/db/subjects";

/** "08:30" as minutes past midnight, for working out which lesson is running. */
function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function PeriodRow({ p, now }: { p: Period; now: number }) {
  const s = p.subject ? subjectOf(p.subject) : null;
  const live = now >= toMinutes(p.start) && now < toMinutes(p.end);

  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      sx={{
        p: 1.5,
        borderRadius: "18px",
        bgcolor: live ? "#eff7ff" : "#fff",
        border: `2px solid ${live ? "rgba(27,111,212,0.45)" : OUTLINE}`,
      }}
    >
      <Box sx={{ width: 74, flexShrink: 0 }}>
        <Typography sx={{ fontWeight: 800, fontSize: "0.95rem", color: INK }}>{p.start}</Typography>
        <Typography sx={{ fontSize: "0.75rem", color: "#5b6b86" }}>{p.end}</Typography>
      </Box>

      <Box
        sx={{
          width: 44,
          height: 44,
          flexShrink: 0,
          borderRadius: "14px",
          display: "grid",
          placeItems: "center",
          bgcolor: s ? s.from : "#e8eef7",
          color: s ? "#fff" : "#5b6b86",
          border: `2px solid rgba(16,34,74,0.16)`,
        }}
      >
        <Icon icon={s ? s.icon : "mdi:coffee-outline"} width={22} />
      </Box>

      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography sx={{ fontWeight: 800, fontSize: "1rem", color: INK }}>
          {s ? s.label : p.label}
        </Typography>
        {s ? (
          <Typography sx={{ fontSize: "0.82rem", color: "#5b6b86" }}>
            {p.room} · {p.teacher}
          </Typography>
        ) : null}
      </Box>

      {live ? (
        <Box
          sx={{
            flexShrink: 0,
            px: 1.25,
            py: 0.5,
            borderRadius: 999,
            bgcolor: "#1b6fd4",
            color: "#fff",
            fontWeight: 800,
            fontSize: "0.72rem",
          }}
        >
          NOW
        </Box>
      ) : null}
    </Stack>
  );
}

export default function TimetablePage() {
  const today = todaySchoolDay();
  const [day, setDay] = useState<SchoolDay>(today);
  const periods = useMemo(() => timetableFor(day), [day]);

  // Read once per render rather than on a ticking clock: a timetable that
  // re-renders every second to move a "NOW" badge is a lot of work for a badge.
  const now = useMemo(() => {
    const d = new Date();
    return d.getHours() * 60 + d.getMinutes();
  }, []);

  const nextUp = useMemo(() => {
    if (day !== today) return null;
    return timetableFor(today).find((p) => p.subject && toMinutes(p.start) >= now) ?? null;
  }, [day, today, now]);

  return (
    <PageShell>
      <SchoolPageHead
        eyebrow="School"
        title="Timetable"
        blurb="Which lesson is next, which room it is in, and who is teaching it."
        scene={sceneTimetable("ink")}
        tint="#eff7ff"
      />

      {nextUp ? (
        <SchoolCard tint={subjectOf(nextUp.subject!).tint} sx={{ mb: 2.5 }}>
          <Typography sx={{ fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.8px", color: subjectOf(nextUp.subject!).ink }}>
            NEXT LESSON
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 1 }}>
            <Box
              sx={{
                width: 56, height: 56, borderRadius: "18px", display: "grid", placeItems: "center",
                bgcolor: subjectOf(nextUp.subject!).from, color: "#fff",
                border: "2px solid rgba(16,34,74,0.18)",
              }}
            >
              <Icon icon={subjectOf(nextUp.subject!).icon} width={28} />
            </Box>
            <Box>
              <Typography sx={{ fontFamily: "var(--font-family-display)", fontWeight: 800, fontSize: "1.5rem", color: INK, lineHeight: 1.15 }}>
                {subjectOf(nextUp.subject!).label}
              </Typography>
              <Typography sx={{ color: "#44536b", fontSize: "0.95rem" }}>
                {nextUp.start} · {nextUp.room} · {nextUp.teacher}
              </Typography>
            </Box>
          </Stack>
        </SchoolCard>
      ) : null}

      {/* Day picker. Buttons rather than tabs: a 48px target a child can hit. */}
      <Stack direction="row" spacing={1} sx={{ mb: 2, overflowX: "auto", pb: 0.5 }}>
        {SCHOOL_DAYS.map((d) => {
          const on = d === day;
          return (
            <Box
              key={d}
              component="button"
              onClick={() => setDay(d)}
              sx={{
                minHeight: 48, px: 2.5, borderRadius: "16px", cursor: "pointer", flexShrink: 0,
                fontFamily: "var(--font-family-display)", fontWeight: 700, fontSize: "1rem",
                bgcolor: on ? "#1b6fd4" : "#fff", color: on ? "#fff" : INK,
                border: `2px solid ${on ? "rgba(16,34,74,0.22)" : OUTLINE}`,
              }}
            >
              {d.slice(0, 3)}
              {d === today ? " •" : ""}
            </Box>
          );
        })}
      </Stack>

      <SchoolCard>
        <Stack spacing={1.25}>
          {periods.map((p) => (
            <PeriodRow key={p.index} p={p} now={day === today ? now : -1} />
          ))}
        </Stack>
      </SchoolCard>
    </PageShell>
  );
}
