"use client";

import { Box, Stack, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import type { RubricAward, RubricCriterion } from "@/lib/services/practicals.service";

const BAND_LABEL = ["Not yet", "Developing", "Competent", "Strong"] as const;
const BAND_COLOR = ["#ef4444", "#f59e0b", "#10b981", "#0ea5e9"] as const;

/**
 * The marking rubric, shown before the learner starts.
 *
 * Published up front on purpose. A rubric a learner only sees after being
 * marked by it is a grading policy, not teaching: it explains the number but
 * cannot change the work. Showing all four bands also makes the standard
 * concrete, which is the difference between "be thorough" and "every joint
 * visible in one continuous shot, no cuts".
 *
 * Once awards arrive the same table is reused with the awarded band lit, so a
 * learner compares what they got against the ladder they already read rather
 * than against a fresh layout.
 */
export function RubricTable({
  rubric,
  awards,
}: {
  rubric: RubricCriterion[];
  awards?: RubricAward[];
}) {
  const awardFor = (key: string) => awards?.find((a) => a.key === key);

  return (
    <Box>
      <Box
        sx={{
          display: { xs: "none", md: "grid" },
          gridTemplateColumns: "1.3fr repeat(4, 1fr)",
          gap: 0.75,
          mb: 0.75,
        }}
      >
        <Box />
        {BAND_LABEL.map((label, i) => (
          <Typography
            key={label}
            sx={{
              fontSize: "0.64rem",
              fontWeight: 800,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: BAND_COLOR[i],
              textAlign: "center",
            }}
          >
            {label}
          </Typography>
        ))}
      </Box>

      <Stack spacing={0.75}>
        {rubric.map((c) => {
          const award = awardFor(c.key);
          return (
            <Box
              key={c.key}
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1.3fr repeat(4, 1fr)" },
                gap: 0.75,
                alignItems: "stretch",
              }}
            >
              <Box
                sx={{
                  px: 1.25,
                  py: 1,
                  borderRadius: 2,
                  bgcolor: "color-mix(in srgb, var(--border-default) 22%, transparent)",
                }}
              >
                <Typography sx={{ fontWeight: 800, fontSize: "0.82rem", lineHeight: 1.35 }}>
                  {c.label}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 0.4 }}>
                  <Typography sx={{ fontSize: "0.7rem", color: "var(--text-secondary)" }}>
                    worth {c.weight * 3} marks
                  </Typography>
                  {award && (
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={0.3}
                      sx={{
                        px: 0.7,
                        py: 0.1,
                        borderRadius: 999,
                        bgcolor: BAND_COLOR[award.band],
                        color: "white",
                        fontSize: "0.64rem",
                        fontWeight: 800,
                      }}
                    >
                      <Icon icon="mdi:check" width={11} />
                      <span>{award.band * c.weight}</span>
                    </Stack>
                  )}
                </Stack>
              </Box>

              {c.bands.map((text, band) => {
                const got = award?.band === band;
                return (
                  <Box
                    key={band}
                    sx={{
                      px: 1,
                      py: 0.9,
                      borderRadius: 2,
                      border: got
                        ? `2px solid ${BAND_COLOR[band]}`
                        : "1px solid var(--border-default)",
                      bgcolor: got
                        ? `color-mix(in srgb, ${BAND_COLOR[band]} 10%, transparent)`
                        : "transparent",
                      // The unawarded bands fade back once a mark exists, so the
                      // row reads as a verdict rather than as four equal options.
                      opacity: award && !got ? 0.42 : 1,
                      transition: "opacity .2s, border-color .2s",
                    }}
                  >
                    <Typography
                      sx={{
                        display: { xs: "block", md: "none" },
                        fontSize: "0.62rem",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        color: BAND_COLOR[band],
                        mb: 0.3,
                      }}
                    >
                      {BAND_LABEL[band]}
                    </Typography>
                    <Typography sx={{ fontSize: "0.76rem", lineHeight: 1.45, color: "var(--text-primary)" }}>
                      {text}
                    </Typography>
                    {got && award?.comment && (
                      <Typography
                        sx={{
                          mt: 0.6,
                          fontSize: "0.72rem",
                          fontStyle: "italic",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {award.comment}
                      </Typography>
                    )}
                  </Box>
                );
              })}
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
