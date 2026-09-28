"use client";

/**
 * Report card. SCHOOL EDITION, new in this fork.
 *
 * Subject-wise marks, the class average beside them, and what the teacher wrote.
 * The class average is the part that makes a report card readable: 68 means
 * nothing on its own and a great deal next to an average of 71.
 *
 * The teacher's comment is given as much room as the number, because it is the
 * thing a parent actually reads and the thing a child remembers.
 */

import { useMemo } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { PageShell } from "@/components/common/PageShell";
import { INK, OUTLINE, SchoolCard, SchoolPageHead, SchoolTile } from "@/components/school/SchoolUI";
import { sceneCertificate } from "@/lib/demo/illustrations/scenes";
import { grades, gradeFor, PUPIL } from "@/lib/demo/db/school";
import { subjectOf } from "@/lib/demo/db/subjects";

export default function ReportCardPage() {
  const rows = useMemo(() => grades(), []);
  const overall = Math.round(rows.reduce((s, r) => s + (r.term2 ?? r.term1), 0) / rows.length);
  const best = [...rows].sort((a, b) => (b.term2 ?? b.term1) - (a.term2 ?? a.term1))[0];
  const improved = [...rows].sort((a, b) => ((b.term2 ?? 0) - b.term1) - ((a.term2 ?? 0) - a.term1))[0];

  return (
    <PageShell>
      <SchoolPageHead
        eyebrow="Learn"
        title="Report Card"
        blurb={`${PUPIL.name}, ${PUPIL.className}. Your marks this year and what each teacher said.`}
        scene={sceneCertificate("ink")}
        tint="#fff8e6"
      />

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2,minmax(0,1fr))", sm: "repeat(3,minmax(0,1fr))" }, gap: 2, mb: 2.5 }}>
        <SchoolTile icon="mdi:chart-line" accent="#1b6fd4" value={`${overall}%`} label="Average" sub={`Grade ${gradeFor(overall)}`} />
        <SchoolTile icon="mdi:star-outline" accent="#f59e0b" value={subjectOf(best.subject).short} label="Your best" sub={`${best.term2 ?? best.term1}% this term`} />
        <SchoolTile icon="mdi:trending-up" accent="#22a25b" value={subjectOf(improved.subject).short} label="Most improved" sub={`Up ${Math.max(0, (improved.term2 ?? 0) - improved.term1)} marks`} />
      </Box>

      <Stack spacing={2}>
        {rows.map((r) => {
          const s = subjectOf(r.subject);
          const now = r.term2 ?? r.term1;
          const delta = r.term2 == null ? 0 : r.term2 - r.term1;
          const vsClass = now - r.classAverage;

          return (
            <SchoolCard key={r.subject}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ sm: "center" }}>
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ minWidth: 0, flex: 1 }}>
                  <Box sx={{ width: 52, height: 52, flexShrink: 0, borderRadius: "16px", display: "grid", placeItems: "center", bgcolor: s.from, color: "#fff", border: "2px solid rgba(16,34,74,0.16)" }}>
                    <Icon icon={s.icon} width={26} />
                  </Box>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography sx={{ fontFamily: "var(--font-family-display)", fontWeight: 800, fontSize: "1.2rem", color: INK, lineHeight: 1.2 }}>
                      {s.label}
                    </Typography>
                    <Typography sx={{ fontSize: "0.84rem", color: "#5b6b86" }}>
                      Class average {r.classAverage}%
                      {vsClass !== 0 ? (
                        <Box component="span" sx={{ ml: 0.75, fontWeight: 800, color: vsClass > 0 ? "#15803d" : "#96610a" }}>
                          {vsClass > 0 ? `${vsClass} above` : `${-vsClass} below`}
                        </Box>
                      ) : null}
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={2} alignItems="center" sx={{ flexShrink: 0 }}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography sx={{ fontSize: "0.7rem", fontWeight: 800, color: "#8494ab", letterSpacing: "0.5px" }}>TERM 1</Typography>
                    <Typography sx={{ fontFamily: "var(--font-family-display)", fontWeight: 700, fontSize: "1.3rem", color: "#5b6b86" }}>{r.term1}</Typography>
                  </Box>
                  <Icon icon="mdi:arrow-right" width={20} color="#8494ab" />
                  <Box sx={{ textAlign: "center" }}>
                    <Typography sx={{ fontSize: "0.7rem", fontWeight: 800, color: s.ink, letterSpacing: "0.5px" }}>TERM 2</Typography>
                    <Typography sx={{ fontFamily: "var(--font-family-display)", fontWeight: 800, fontSize: "1.9rem", color: INK, lineHeight: 1 }}>{now}</Typography>
                    {delta !== 0 ? (
                      <Typography sx={{ fontSize: "0.76rem", fontWeight: 800, color: delta > 0 ? "#15803d" : "#b45309" }}>
                        {delta > 0 ? `+${delta}` : delta}
                      </Typography>
                    ) : null}
                  </Box>
                  <Box sx={{ px: 1.5, py: 0.75, borderRadius: "14px", bgcolor: s.tint, color: s.ink, fontWeight: 800, fontFamily: "var(--font-family-display)", fontSize: "1.15rem", border: "2px solid rgba(16,34,74,0.10)" }}>
                    {r.grade}
                  </Box>
                </Stack>
              </Stack>

              <Box sx={{ mt: 2, p: 1.75, borderRadius: "16px", bgcolor: "#f7faff", border: `2px solid ${OUTLINE}` }}>
                <Stack direction="row" spacing={1} alignItems="flex-start">
                  <Icon icon="mdi:comment-quote-outline" width={20} color="#8494ab" style={{ flexShrink: 0, marginTop: 2 }} />
                  <Typography sx={{ fontSize: "0.92rem", color: "#44536b", lineHeight: 1.5 }}>{r.comment}</Typography>
                </Stack>
              </Box>
            </SchoolCard>
          );
        })}
      </Stack>
    </PageShell>
  );
}
