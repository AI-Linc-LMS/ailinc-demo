"use client";

/**
 * Attendance. SCHOOL EDITION, new in this fork.
 *
 * The seed is deliberately imperfect: two absences and three lates across eight
 * weeks. A register where every child is present every day demonstrates nothing,
 * and the day a parent actually opens this is the day their child was marked
 * absent, so that case has to look right.
 *
 * Late counts as attending in the headline percentage, which is how a school
 * reports it, and is called out separately underneath so the number is not
 * quietly flattering.
 */

import { useMemo } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { PageShell } from "@/components/common/PageShell";
import { INK, OUTLINE, SchoolCard, SchoolPageHead, SchoolTile } from "@/components/school/SchoolUI";
import { sceneAttendance } from "@/lib/demo/illustrations/scenes";
import { attendance, attendanceSummary, PUPIL, type AttendanceMark } from "@/lib/demo/db/school";

const MARK_STYLE: Record<AttendanceMark, { bg: string; ink: string; icon: string; label: string }> = {
  present: { bg: "#4ade80", ink: "#fff", icon: "mdi:check-bold", label: "In school" },
  late: { bg: "#fbbf24", ink: "#3d2b04", icon: "mdi:clock-outline", label: "Late" },
  absent: { bg: "#fb7185", ink: "#fff", icon: "mdi:close-thick", label: "Away" },
  holiday: { bg: "#e8eef7", ink: "#5b6b86", icon: "mdi:beach", label: "Holiday" },
  future: { bg: "#f2f5fa", ink: "#8494ab", icon: "mdi:dots-horizontal", label: "Not yet" },
};

export default function AttendancePage() {
  const days = useMemo(() => attendance(), []);
  const summary = useMemo(() => attendanceSummary(), []);

  // Oldest first so the strip reads left to right like a calendar.
  const ordered = [...days].reverse();
  const notable = days.filter((d) => d.mark !== "present").slice(0, 6);

  return (
    <PageShell>
      <SchoolPageHead
        eyebrow="School"
        title="Attendance"
        blurb={`The days ${PUPIL.name.split(" ")[0]} was in school this term, and the ones she missed.`}
        scene={sceneAttendance("ink")}
        tint="#e8fbef"
      />

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2,minmax(0,1fr))", sm: "repeat(4,minmax(0,1fr))" }, gap: 2, mb: 2.5 }}>
        <SchoolTile icon="mdi:calendar-check-outline" accent="#22a25b" value={`${summary.percent}%`} label="Attendance" sub={`${summary.counted} school days`} />
        <SchoolTile icon="mdi:check-circle-outline" accent="#1b6fd4" value={summary.present} label="Days in school" sub="On time" />
        <SchoolTile icon="mdi:clock-outline" accent="#f59e0b" value={summary.late} label={summary.late === 1 ? "Day late" : "Days late"} sub="Still counts as in" />
        <SchoolTile icon="mdi:calendar-remove-outline" accent={summary.absent ? "#dc2626" : "#22a25b"} value={summary.absent} label={summary.absent === 1 ? "Day away" : "Days away"} sub={summary.absent ? "Explained" : "None"} />
      </Box>

      <SchoolCard sx={{ mb: 2.5 }}>
        <Typography sx={{ fontFamily: "var(--font-family-display)", fontWeight: 800, fontSize: "1.2rem", color: INK, mb: 0.5 }}>
          The last eight weeks
        </Typography>
        <Typography sx={{ fontSize: "0.9rem", color: "#5b6b86", mb: 2 }}>
          One square for each school day. Weekends and holidays are not counted.
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
          {ordered.map((d) => {
            const st = MARK_STYLE[d.mark];
            const label = new Date(d.date).toLocaleDateString(undefined, { day: "numeric", month: "short" });
            return (
              <Box
                key={d.daysAgo}
                title={`${label}: ${st.label}`}
                sx={{
                  width: 34, height: 34, borderRadius: "11px", display: "grid", placeItems: "center",
                  bgcolor: st.bg, color: st.ink, border: "2px solid rgba(16,34,74,0.10)",
                }}
              >
                <Icon icon={st.icon} width={17} />
              </Box>
            );
          })}
        </Box>

        <Stack direction="row" spacing={2} sx={{ mt: 2.5, flexWrap: "wrap" }}>
          {(["present", "late", "absent"] as AttendanceMark[]).map((m) => (
            <Stack key={m} direction="row" spacing={0.75} alignItems="center">
              <Box sx={{ width: 18, height: 18, borderRadius: "6px", bgcolor: MARK_STYLE[m].bg, border: "2px solid rgba(16,34,74,0.10)" }} />
              <Typography sx={{ fontSize: "0.85rem", color: "#44536b", fontWeight: 600 }}>{MARK_STYLE[m].label}</Typography>
            </Stack>
          ))}
        </Stack>
      </SchoolCard>

      {notable.length > 0 ? (
        <SchoolCard>
          <Typography sx={{ fontFamily: "var(--font-family-display)", fontWeight: 800, fontSize: "1.2rem", color: INK, mb: 1.5 }}>
            Days to know about
          </Typography>
          <Stack spacing={1.25}>
            {notable.map((d) => {
              const st = MARK_STYLE[d.mark];
              return (
                <Stack
                  key={d.daysAgo}
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                  sx={{ p: 1.5, borderRadius: "16px", border: `2px solid ${OUTLINE}`, bgcolor: "#fff" }}
                >
                  <Box sx={{ width: 40, height: 40, flexShrink: 0, borderRadius: "13px", display: "grid", placeItems: "center", bgcolor: st.bg, color: st.ink, border: "2px solid rgba(16,34,74,0.12)" }}>
                    <Icon icon={st.icon} width={20} />
                  </Box>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography sx={{ fontWeight: 800, color: INK, fontSize: "0.95rem" }}>
                      {new Date(d.date).toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" })}
                    </Typography>
                    <Typography sx={{ fontSize: "0.86rem", color: "#5b6b86" }}>{d.note ?? st.label}</Typography>
                  </Box>
                </Stack>
              );
            })}
          </Stack>
        </SchoolCard>
      ) : null}
    </PageShell>
  );
}
