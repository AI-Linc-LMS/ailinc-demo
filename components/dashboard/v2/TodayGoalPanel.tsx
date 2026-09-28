"use client";

import { Box, Stack, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { AnimatedRing } from "@/components/scorecard/shared";
import type { TodayGoal } from "@/lib/types/dashboard";

const GOAL_ICON: Record<string, string> = {
  lesson: "mdi:book-open-page-variant-outline",
  practice: "mdi:timer-outline",
  quiz: "mdi:help-circle-outline",
};

/**
 * Dark "Today's Goal" card for the dashboard right rail: a progress ring over
 * three daily habits (complete a lesson / 15-min practice / take a quiz) + a
 * rolling last-5-day activity strip. Dark midnight-hyper surface to match the AI
 * briefing + course-readiness cards so the right rail isn't all plain white.
 */
export function TodayGoalPanel({ goal }: { goal: TodayGoal }) {
  const { goals, completedCount, totalCount, percent, lastDays } = goal;

  return (
    <Box
      // SCHOOL EDITION: light, not a dark slab.
      // This was near-black with a glow, which worked when every dashboard panel
      // was dark. Once the greeting card above it became a bright illustrated
      // surface, the two dark panels were the only things on the page that still
      // looked like a console, and a child reads that contrast as "this bit is
      // not for me".
      sx={{
        borderRadius: "26px",
        p: { xs: 2, md: 2.5 },
        color: "#10224a",
        bgcolor: "#e8fbef",
        border: "2px solid rgba(16,34,74,0.12)",
        boxShadow: "0 6px 0 0 rgba(16,34,74,0.06)",
      }}
    >
      <Typography sx={{ fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.8px", color: "#15803d", mb: 1.5 }}>
        TODAY&apos;S GOAL
      </Typography>

      <Stack direction="row" spacing={2} alignItems="center">
        {/* Ring */}
        <Box sx={{ position: "relative", width: 104, height: 104, flexShrink: 0 }}>
          <AnimatedRing
            value={percent}
            size={104}
            strokeWidth={9}
            color="#4ade80"
            colorEnd="#15803d"
            trackColor="rgba(16,34,74,0.10)"
            showValue={false}
          />
          <Box sx={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <Typography sx={{ fontFamily: "var(--font-family-display)", fontWeight: 800, fontSize: "1.6rem", lineHeight: 1, color: "#10224a" }}>{percent}%</Typography>
            <Typography sx={{ fontSize: "0.68rem", color: "#5b6b86", mt: 0.25 }}>
              {completedCount} of {totalCount}
            </Typography>
          </Box>
        </Box>

        {/* Checklist */}
        <Stack spacing={1.1} sx={{ flex: 1, minWidth: 0 }}>
          {goals.map((g) => {
            const showPractice = g.key === "practice" && !g.done && g.minutes != null && g.targetMinutes != null;
            return (
              <Stack key={g.key} direction="row" spacing={1} alignItems="center">
                <Icon
                  icon={g.done ? "mdi:check-circle" : "mdi:circle-outline"}
                  width={20}
                  color={g.done ? "#15803d" : "rgba(16,34,74,0.25)"}
                  style={{ flexShrink: 0 }}
                />
                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    noWrap
                    sx={{ fontSize: "0.95rem", fontWeight: 700, color: g.done ? "#10224a" : "#5b6b86" }}
                  >
                    {g.label}
                  </Typography>
                  {showPractice && (
                    <Typography sx={{ fontSize: "0.72rem", color: "#5b6b86" }}>
                      {g.minutes} / {g.targetMinutes} min
                    </Typography>
                  )}
                </Box>
              </Stack>
            );
          })}
        </Stack>
      </Stack>

      {/* Last-5-day strip */}
      <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
        {lastDays.map((d) => {
          // Completing even one of today's goals already marks the streak for the
          // day, so light today's flame as soon as there's any progress - don't
          // wait for the full goal or a server refresh.
          const litToday = d.isToday && completedCount >= 1;
          const active = d.active || litToday;
          return (
            <Box key={d.date} sx={{ flex: 1, textAlign: "center" }}>
              <Box
                sx={{
                  aspectRatio: "1 / 1",
                  borderRadius: 2,
                  display: "grid",
                  placeItems: "center",
                  mb: 0.6,
                  ...(active
                    ? { background: "linear-gradient(135deg, #fb923c 0%, #ec4899 100%)", boxShadow: "0 8px 18px -10px rgba(236,72,153,0.6)" }
                    : d.isToday
                      ? { border: "2px dashed rgba(27,111,212,0.45)", bgcolor: "#ffffff" }
                      : { bgcolor: "#ffffff", border: "2px solid rgba(16,34,74,0.08)" }),
                }}
              >
                {active ? (
                  <Icon icon="mdi:fire" width={24} color="#fff" />
                ) : (
                  <Box sx={{ width: 4, height: 4, borderRadius: "50%", bgcolor: d.isToday ? "#1b6fd4" : "rgba(16,34,74,0.2)" }} />
                )}
              </Box>
              <Typography sx={{ fontSize: "0.6rem", fontWeight: 800, letterSpacing: "0.06em", color: d.isToday ? "#1b6fd4" : "#5b6b86" }}>
                {d.label}
              </Typography>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
