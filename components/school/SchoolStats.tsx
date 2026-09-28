"use client";

/**
 * Three tiles, not five.
 *
 * `StatCards` showed total points, day streak, class rank, effort score and
 * handed-in-on-time, in a five-across row that collapsed to a scrollable strip on
 * a phone. Five numbers is a management report. A child wants to know whether
 * they are keeping it up, so the three that answer that stay and the other two
 * move to the report card, where a teacher looks.
 *
 * Effort score in particular was a number out of 100 with no unit and no
 * everyday meaning, sitting beside a percentage that did have one. Two
 * differently-scaled numbers next to each other is how a dashboard teaches a
 * child that numbers do not really mean anything.
 */

import { Box } from "@mui/material";
import type { LearnerDashboard } from "@/lib/types/dashboard";
import { SchoolTile } from "./SchoolUI";

export function SchoolStats({
  aggregate,
  hideLeaderboard,
}: {
  aggregate: LearnerDashboard["aggregate"];
  hideLeaderboard?: boolean;
}) {
  const a = aggregate;
  if (!a) return null;

  const rank = a.cohortRank?.bestRank ?? null;
  const delta = a.cohortRank?.rankDelta ?? 0;

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "repeat(2, minmax(0,1fr))", sm: "repeat(3, minmax(0,1fr))" },
        gap: 2,
        mb: 2.5,
      }}
    >
      <SchoolTile
        icon="mdi:star-four-points"
        accent="#1b6fd4"
        value={(a.totalPoints ?? 0).toLocaleString()}
        label="Points"
        sub={a.pointsThisWeek ? `+${a.pointsThisWeek} this week` : "Finish a lesson to earn some"}
      />
      <SchoolTile
        icon="mdi:fire"
        accent="#f97316"
        value={a.streak?.current ?? 0}
        label={a.streak?.current === 1 ? "Day in a row" : "Days in a row"}
        sub={a.streak?.best ? `Your best is ${a.streak.best}` : "Come back tomorrow"}
      />
      {!hideLeaderboard && rank != null ? (
        <SchoolTile
          icon="mdi:trophy-variant"
          accent="#14b8a6"
          value={`#${rank}`}
          label="In your class"
          sub={delta > 0 ? `Up ${delta} this week` : delta < 0 ? `Down ${-delta} this week` : "Same as last week"}
        />
      ) : (
        <SchoolTile
          icon="mdi:check-circle-outline"
          accent="#22a25b"
          value={a.onTimeRate == null ? "-" : `${Math.round(a.onTimeRate * 100)}%`}
          label="Handed in on time"
          sub="Keep it up"
        />
      )}
    </Box>
  );
}
