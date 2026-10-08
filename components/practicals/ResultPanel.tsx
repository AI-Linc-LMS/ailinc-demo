"use client";

import type { ReactNode } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import type { PracticalResult } from "@/lib/services/practicals.service";
import { PracticalProse } from "./PracticalShell";

/**
 * The result header shared by all eight practical kinds.
 *
 * Three states, not two. `awaiting_review` is the one that matters: a video of a
 * brazed joint or a filed GST return is marked by a person, and the honest
 * surface for that is a queue with a name and a date on it, not a score. The
 * platform showing a number it has not actually computed is the fastest way to
 * make every other number on it suspect.
 */
export function ResultPanel({
  result,
  children,
}: {
  result: PracticalResult;
  children?: ReactNode;
}) {
  const pending = result.status === "awaiting_review";
  const pct =
    result.score != null && result.max_score > 0 ? result.score / result.max_score : null;

  const tone = pending
    ? { color: "#b45309", soft: "#fffbeb", icon: "mdi:account-clock-outline", word: "With an assessor" }
    : pct != null && pct >= 0.8
      ? { color: "#047857", soft: "#ecfdf5", icon: "mdi:check-decagram", word: "Marked" }
      : pct != null && pct >= 0.5
        ? { color: "#b45309", soft: "#fffbeb", icon: "mdi:alert-circle-outline", word: "Marked" }
        : { color: "#be123c", soft: "#fff1f2", icon: "mdi:close-octagon-outline", word: "Marked" };

  return (
    <Box
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        border: `1px solid color-mix(in srgb, ${tone.color} 35%, var(--border-default))`,
        mb: 2,
      }}
    >
      <Box sx={{ p: { xs: 1.75, md: 2.25 }, bgcolor: `color-mix(in srgb, ${tone.color} 8%, var(--card-bg))` }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={1.5}
        >
          <Stack direction="row" alignItems="flex-start" spacing={1.25} sx={{ minWidth: 0 }}>
            <Box
              sx={{
                width: 38,
                height: 38,
                flexShrink: 0,
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                bgcolor: tone.color,
                color: "white",
              }}
            >
              <Icon icon={tone.icon} width={21} />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: "0.63rem",
                  fontWeight: 800,
                  letterSpacing: "0.09em",
                  textTransform: "uppercase",
                  color: tone.color,
                }}
              >
                {tone.word}
              </Typography>
              <Typography sx={{ fontWeight: 800, fontSize: "1rem", lineHeight: 1.35, mt: 0.2 }}>
                {result.headline}
              </Typography>
            </Box>
          </Stack>

          {/* The score, or an explicit statement that there is not one yet. */}
          {pending ? (
            <Box sx={{ textAlign: { xs: "left", sm: "right" }, flexShrink: 0 }}>
              <Typography sx={{ fontWeight: 800, fontSize: "0.95rem", color: tone.color }}>
                No score yet
              </Typography>
              <Typography sx={{ fontSize: "0.72rem", color: "var(--text-secondary)" }}>
                out of {result.max_score} available
              </Typography>
            </Box>
          ) : (
            <Box sx={{ textAlign: { xs: "left", sm: "right" }, flexShrink: 0 }}>
              <Typography sx={{ fontWeight: 800, fontSize: "1.5rem", lineHeight: 1, color: tone.color }}>
                {result.score}
                <Box component="span" sx={{ fontSize: "0.9rem", opacity: 0.65 }}>
                  {" "}
                  / {result.max_score}
                </Box>
              </Typography>
              <Typography sx={{ fontSize: "0.72rem", color: "var(--text-secondary)", mt: 0.3 }}>
                {result.points_awarded > 0
                  ? `${result.points_awarded} points banked`
                  : "no points banked"}
              </Typography>
            </Box>
          )}
        </Stack>

        {/* Who is marking it, and by when. Named, because "an assessor" is not
            an accountable party and a learner waiting on a grade knows it. */}
        {pending && result.reviewer && (
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
              mt: 1.5,
              pt: 1.5,
              borderTop: "1px solid var(--border-default)",
            }}
          >
            {result.reviewer.avatar_url ? (
              <Box
                component="img"
                src={result.reviewer.avatar_url}
                alt=""
                sx={{ width: 30, height: 30, borderRadius: "50%", objectFit: "cover" }}
              />
            ) : (
              <Icon icon="mdi:account-circle" width={30} />
            )}
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontSize: "0.8rem", fontWeight: 700 }}>
                {result.reviewer.name}
              </Typography>
              <Typography sx={{ fontSize: "0.72rem", color: "var(--text-secondary)" }}>
                {result.reviewer.role}
                {result.review_due
                  ? ` · marking by ${new Date(result.review_due).toLocaleDateString(undefined, {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                    })}`
                  : ""}
              </Typography>
            </Box>
          </Stack>
        )}
      </Box>

      {(result.detail_html || children) && (
        <Box sx={{ p: { xs: 1.75, md: 2.25 }, bgcolor: "var(--card-bg)" }}>
          {result.detail_html && <PracticalProse html={result.detail_html} />}
          {children}
        </Box>
      )}
    </Box>
  );
}
