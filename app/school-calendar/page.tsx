"use client";

/**
 * School calendar. SCHOOL EDITION, new in this fork.
 *
 * Grouped by how soon, not by month. "This week" and "Next week" are the units a
 * family actually plans in; a month grid looks impressive in a screenshot and is
 * the wrong shape for the question being asked, which is what do we need to
 * remember.
 */

import { useMemo } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { PageShell } from "@/components/common/PageShell";
import { INK, OUTLINE, SchoolCard, SchoolPageHead } from "@/components/school/SchoolUI";
import { sceneCalendar } from "@/lib/demo/illustrations/scenes";
import { schoolEvents, type SchoolEvent } from "@/lib/demo/db/school";

const KIND: Record<SchoolEvent["kind"], { label: string; bg: string; ink: string; icon: string }> = {
  holiday: { label: "Holiday", bg: "#e8fbef", ink: "#15803d", icon: "mdi:beach" },
  event: { label: "Event", bg: "#eff7ff", ink: "#1b6fd4", icon: "mdi:star-outline" },
  exam: { label: "Test", bg: "#fff8e6", ink: "#96610a", icon: "mdi:file-document-edit-outline" },
  trip: { label: "Trip", bg: "#fdf0fd", ink: "#a21caf", icon: "mdi:bus" },
};

/** The buckets a family plans in. */
function bucketOf(days: number): string {
  if (days <= 0) return "Today";
  if (days <= 7) return "This week";
  if (days <= 14) return "Next week";
  if (days <= 31) return "This month";
  return "Later this term";
}

export default function SchoolCalendarPage() {
  const events = useMemo(() => schoolEvents(), []);

  const buckets = useMemo(() => {
    const map = new Map<string, SchoolEvent[]>();
    for (const e of events) {
      const b = bucketOf(e.inDays);
      if (!map.has(b)) map.set(b, []);
      map.get(b)!.push(e);
    }
    return [...map.entries()];
  }, [events]);

  return (
    <PageShell>
      <SchoolPageHead
        eyebrow="School"
        title="School Calendar"
        blurb="Trips, holidays, tests and everything else coming up, soonest first."
        scene={sceneCalendar("ink")}
        tint="#fdf0fd"
      />

      <Stack spacing={3}>
        {buckets.map(([bucket, list]) => (
          <Box key={bucket}>
            <Typography sx={{ fontFamily: "var(--font-family-display)", fontWeight: 800, fontSize: "1.2rem", color: INK, mb: 1.5 }}>
              {bucket}
            </Typography>
            <Stack spacing={1.5}>
              {list.map((e) => {
                const k = KIND[e.kind];
                const when = new Date(e.at);
                return (
                  <SchoolCard key={e.id} sx={{ p: 2 }}>
                    <Stack direction="row" spacing={2} alignItems="flex-start">
                      {/* A date block, because "Friday 3rd" is how a date is said
                          out loud and how it gets written on a fridge. */}
                      <Box
                        sx={{
                          width: 64, flexShrink: 0, textAlign: "center", borderRadius: "16px",
                          overflow: "hidden", border: "2px solid rgba(16,34,74,0.12)",
                        }}
                      >
                        <Box sx={{ bgcolor: k.ink, color: "#fff", py: 0.4, fontWeight: 800, fontSize: "0.72rem", letterSpacing: "0.5px" }}>
                          {when.toLocaleDateString(undefined, { month: "short" }).toUpperCase()}
                        </Box>
                        <Box sx={{ bgcolor: "#fff", py: 0.5 }}>
                          <Typography sx={{ fontFamily: "var(--font-family-display)", fontWeight: 800, fontSize: "1.5rem", lineHeight: 1, color: INK }}>
                            {when.getDate()}
                          </Typography>
                          <Typography sx={{ fontSize: "0.68rem", color: "#5b6b86" }}>
                            {when.toLocaleDateString(undefined, { weekday: "short" })}
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5, flexWrap: "wrap" }}>
                          <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.4, px: 1, py: 0.25, borderRadius: 999, bgcolor: k.bg, color: k.ink, fontWeight: 800, fontSize: "0.72rem" }}>
                            <Icon icon={k.icon} width={13} /> {k.label}
                          </Box>
                          <Typography sx={{ fontSize: "0.78rem", color: "#8494ab", fontWeight: 600 }}>
                            {e.allDay ? "All day" : e.time}
                          </Typography>
                        </Stack>
                        <Typography sx={{ fontFamily: "var(--font-family-display)", fontWeight: 800, fontSize: "1.15rem", color: INK, lineHeight: 1.25 }}>
                          {e.title}
                        </Typography>
                        <Typography sx={{ mt: 0.5, fontSize: "0.92rem", color: "#5b6b86", lineHeight: 1.5 }}>{e.detail}</Typography>
                      </Box>
                    </Stack>
                  </SchoolCard>
                );
              })}
            </Stack>
          </Box>
        ))}
      </Stack>
    </PageShell>
  );
}
