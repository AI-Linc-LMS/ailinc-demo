"use client";

/**
 * The greeting at the top of a child's Home page.
 *
 * Replaces `AiBriefingHero`, which was a near-black slab carrying a headline, a
 * "last week" note, a weakest-skill sentence, two action cards and a CTA. All of
 * that is true and useful to an adult reviewing their own progress. A twelve year
 * old opening this before school needs one thing: what am I doing today.
 *
 * So the hierarchy is inverted. The big words are the greeting and the one task.
 * The weakest-skill analysis, which used to be a paragraph in the middle of the
 * card, is a single line underneath, and the "last week" recap is gone: it is a
 * report, and this is a starting line.
 *
 * The drawing is a child at a desk, which is the thing the card is asking them to
 * go and do.
 */

import { useRouter } from "next/navigation";
import { Box, Stack, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import type { AiBriefing, LearnerDashboard } from "@/lib/types/dashboard";
import { sceneStudyDesk } from "@/lib/demo/illustrations/scenes";
import { INK, OUTLINE, SchoolButton, SchoolCard } from "./SchoolUI";

/** Morning, afternoon or evening. Costs nothing and makes the page feel addressed to you. */
function partOfDay(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export function SchoolTodayHero({
  briefing,
  profile,
}: {
  briefing: AiBriefing;
  profile: LearnerDashboard["profile"] | null;
}) {
  const router = useRouter();
  const firstName = (profile?.name ?? "").trim().split(/\s+/)[0] || "there";
  const today = briefing.today?.trim();
  const weakest = briefing.weakestSkill;

  return (
    <SchoolCard
      tint="#eff7ff"
      sx={{ mb: 2.5, p: { xs: 2.5, md: 3.5 }, display: "flex", gap: 3, alignItems: "center" }}
    >
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          component="h1"
          sx={{
            fontFamily: "var(--font-family-display)",
            fontWeight: 800,
            fontSize: { xs: "1.8rem", md: "2.4rem" },
            lineHeight: 1.08,
            color: INK,
          }}
        >
          {partOfDay()}, {firstName}!
        </Typography>

        {today ? (
          <>
            <Typography
              sx={{
                mt: 2,
                fontSize: "0.74rem",
                fontWeight: 800,
                letterSpacing: "0.8px",
                textTransform: "uppercase",
                color: "#1b6fd4",
              }}
            >
              Today, try this
            </Typography>
            <Typography
              sx={{
                mt: 0.5,
                fontFamily: "var(--font-family-display)",
                fontWeight: 700,
                fontSize: { xs: "1.15rem", md: "1.35rem" },
                lineHeight: 1.3,
                color: INK,
              }}
            >
              {today}
            </Typography>
          </>
        ) : (
          <Typography sx={{ mt: 1.5, fontSize: "1.05rem", color: "#44536b" }}>
            Pick any subject and carry on where you left off.
          </Typography>
        )}

        <Box sx={{ mt: 2.5 }}>
          <SchoolButton
            icon="mdi:play-circle-outline"
            onClick={() => router.push(briefing.focusRoute || "/adaptive-courses")}
          >
            Start now
          </SchoolButton>
        </Box>

        {/* One line, not a paragraph. The old card explained the reasoning behind
            the recommendation in three sentences; a child needs the nudge, and a
            teacher can see the reasoning in the report. */}
        {weakest ? (
          <Stack
            direction="row"
            spacing={1}
            sx={{
              mt: 2.5,
              alignItems: "center",
              bgcolor: "#fff",
              border: `2px solid ${OUTLINE}`,
              borderRadius: "16px",
              px: 1.5,
              py: 1,
              width: "fit-content",
              maxWidth: "100%",
            }}
          >
            <Icon icon="mdi:lightbulb-on-outline" width={20} color="#b45309" />
            <Typography sx={{ fontSize: "0.9rem", color: "#44536b", lineHeight: 1.4 }}>
              <b style={{ color: INK }}>{weakest.skill}</b> is the tricky one right now.
            </Typography>
          </Stack>
        ) : null}
      </Box>

      <Box
        aria-hidden
        sx={{ display: { xs: "none", lg: "block" }, width: 250, flexShrink: 0 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={sceneStudyDesk("ink")} alt="" style={{ width: "100%", display: "block" }} />
      </Box>
    </SchoolCard>
  );
}
