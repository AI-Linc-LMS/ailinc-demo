"use client";

import { useRouter } from "next/navigation";
import { Box, ButtonBase, LinearProgress, MenuItem, Select, Stack, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import type { DashboardCourse } from "@/lib/types/dashboard";
import { PanelCard } from "./parts";

/**
 * Two tiers, not a category palette.
 *
 * The repaint sweep skipped this line as a per-category accent, which was the
 * right default and the wrong call here: with only two tiers and one of them
 * semantic green, the violet was not "the purple category", it was the brand
 * accent wearing a category's clothes. It ended up as the only violet left on an
 * otherwise blue dashboard.
 *
 * Amber rather than blue, so the pair reads as a scale - doing well, still warming
 * up - instead of as two unrelated labels. The text colour is the dark amber from
 * the subject registry, for the same reason it is dark there: no amber light
 * enough to look amber passes AA as text.
 */
const SKILL_STYLE = {
  strong: { color: "#15803d", bg: "#dcfce7", bar: "#22c55e", label: "Strong" },
  emerging: { color: "#96610a", bg: "#fff8e6", bar: "#f59e0b", label: "Getting there" },
};

export function SkillProfilePanel({
  courses, activeCourseId, onSelect, crossCourseMastery,
}: {
  courses: DashboardCourse[];
  activeCourseId: number | null;
  onSelect: (id: number) => void;
  crossCourseMastery: number | null;
}) {
  const router = useRouter();
  const active = courses.find((c) => c.id === activeCourseId) ?? courses[0];
  if (!active) return null;
  const sp = active.skillProfile;
  const tier = sp.fieldTier ? sp.fieldTier.toUpperCase() : null;

  return (
    <PanelCard>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1.25 }}>
        <Stack direction="row" spacing={1.25} alignItems="center">
          <Box sx={{ width: 30, height: 30, borderRadius: 2, display: "grid", placeItems: "center", color: "white", background: "linear-gradient(135deg, #6366f1, #4aa2f0)" }}>
            <Icon icon="mdi:brain" width={17} />
          </Box>
          <Box>
            <Typography sx={{ fontSize: "0.6rem", fontWeight: 800, letterSpacing: 0.6, color: "#1b6fd4" }}>
              YOUR LEVEL{tier ? ` · ${tier}` : ""}
            </Typography>
            <Typography sx={{ fontWeight: 800, color: "#0f172a", fontSize: "0.95rem", lineHeight: 1.1 }}>What you are good at</Typography>
          </Box>
        </Stack>
        <ButtonBase onClick={() => router.push(`/adaptive-courses/${active.id}`)} sx={{ fontSize: "0.74rem", fontWeight: 700, color: "#1b6fd4", flexShrink: 0, gap: 0.25 }}>
          See more →
        </ButtonBase>
      </Stack>

      {courses.length > 1 && (
        <Select
          size="small"
          value={active.id}
          onChange={(e) => onSelect(Number(e.target.value))}
          fullWidth
          MenuProps={{
            elevation: 0,
            PaperProps: { sx: { mt: 0.75, borderRadius: 3, border: "1px solid #eef2f7", boxShadow: "0 18px 44px -18px rgba(16,24,40,0.32)", overflow: "hidden" } },
            MenuListProps: { sx: { py: 0.5 } },
          }}
          renderValue={(val) => {
            const c = courses.find((x) => x.id === val);
            return (
              <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: 0 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "#4aa2f0", flexShrink: 0 }} />
                <Box component="span" sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c?.title}</Box>
              </Stack>
            );
          }}
          sx={{
            mb: 1.5, borderRadius: 2.5, bgcolor: "#fff", fontSize: "0.86rem", fontWeight: 700, color: "#0f172a",
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e5e7eb" },
            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#c4b5fd" },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#1b6fd4", borderWidth: 2 },
            "& .MuiSelect-select": { py: 1, pl: 1.5, display: "flex", alignItems: "center" },
            "& .MuiSelect-icon": { color: "#94a3b8", right: 10 },
          }}
        >
          {courses.map((c) => (
            <MenuItem
              key={c.id}
              value={c.id}
              sx={{
                fontSize: "0.86rem", fontWeight: 600, py: 1, px: 1.5, gap: 1, mx: 0.5, borderRadius: 2,
                "&:hover": { bgcolor: "#f8fafc" },
                "&.Mui-selected": { bgcolor: "#eff7ff" },
                "&.Mui-selected:hover": { bgcolor: "#e3f0ff" },
              }}
            >
              <Box sx={{ width: 8, height: 8, borderRadius: "50%", flexShrink: 0, bgcolor: c.id === active.id ? "#4aa2f0" : "#cbd5e1" }} />
              <Box component="span" sx={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.title}</Box>
              {c.id === active.id && <Icon icon="mdi:check" width={16} color="#1b6fd4" />}
            </MenuItem>
          ))}
        </Select>
      )}

      <Box sx={{ p: 1.5, borderRadius: 3, bgcolor: "#eff7ff", border: "1px solid #e3f0ff", mb: 1.5 }}>
        <Typography sx={{ fontSize: "0.62rem", fontWeight: 800, letterSpacing: 0.5, color: "#94a3b8" }}>HOW WELL YOU KNOW THIS</Typography>
        <Stack direction="row" alignItems="baseline" justifyContent="space-between">
          {sp.mastery == null ? (
            <Typography sx={{ fontWeight: 800, fontSize: "1.15rem", lineHeight: 1.1, color: "#94a3b8" }}>Not started yet</Typography>
          ) : (
            <Typography sx={{ fontWeight: 900, fontSize: "2.2rem", lineHeight: 1, color: "#6366f1" }}>{sp.mastery}%</Typography>
          )}
          <Typography sx={{ fontSize: "0.72rem", color: "#94a3b8" }}>{sp.skillsTracked} skills we follow</Typography>
        </Stack>
        {crossCourseMastery != null && (
          <Typography sx={{ fontSize: "0.72rem", color: "#94a3b8", mt: 0.5 }}>Across all subjects: <b style={{ color: "#475569" }}>{crossCourseMastery}%</b></Typography>
        )}
      </Box>

      {sp.skills.length > 0 ? (
        <Stack spacing={1.1}>
          {[...sp.skills].sort((a, b) => b.percent - a.percent).slice(0, 6).map((sk) => {
            const s = SKILL_STYLE[sk.band];
            return (
              <Box key={sk.skill}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.4 }}>
                  <Typography sx={{ fontSize: "0.82rem", fontWeight: 700, color: "#0f172a" }}>{sk.skill}</Typography>
                  <Stack direction="row" spacing={0.75} alignItems="center">
                    <Box component="span" sx={{ px: 0.75, py: 0.15, borderRadius: 999, fontSize: "0.6rem", fontWeight: 800, color: s.color, bgcolor: s.bg }}>{s.label}</Box>
                    <Typography sx={{ fontWeight: 800, fontSize: "0.82rem", color: s.color, minWidth: 36, textAlign: "right" }}>{sk.percent}%</Typography>
                  </Stack>
                </Stack>
                <LinearProgress variant="determinate" value={sk.percent} sx={{ height: 6, borderRadius: 4, bgcolor: "#eef2f7", "& .MuiLinearProgress-bar": { bgcolor: s.bar, borderRadius: 4 } }} />
              </Box>
            );
          })}
        </Stack>
      ) : (
        <Typography sx={{ fontSize: "0.8rem", color: "#94a3b8", py: 1 }}>Complete course quizzes to map your skills here.</Typography>
      )}

      <Stack direction="row" spacing={0.6} alignItems="flex-start" sx={{ mt: 1.5, p: 1.25, borderRadius: 2, bgcolor: "#eff7ff" }}>
        <Icon icon="mdi:star-four-points" width={13} color="#13498c" style={{ flexShrink: 0, marginTop: 2 }} />
        <Typography sx={{ fontSize: "0.74rem", color: "#13498c", fontWeight: 600, lineHeight: 1.45 }}>{sp.aiTip}</Typography>
      </Stack>
    </PanelCard>
  );
}
