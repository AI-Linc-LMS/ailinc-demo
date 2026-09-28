"use client";

/**
 * Homework. SCHOOL EDITION, new in this fork.
 *
 * Sorted by when it is due and nothing else. A child opening this wants the list
 * in the order they have to do it, which is also why the overdue items sit at the
 * top in red rather than being filtered into a tab somebody has to find.
 *
 * Ticking something off is local state. This is a demo, so the tick is honest
 * about being a demonstration rather than pretending to reach a server; what it
 * shows is the interaction, which is the part a head teacher is judging.
 */

import { useMemo, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { PageShell } from "@/components/common/PageShell";
import { INK, OUTLINE, SchoolCard, SchoolEmpty, SchoolPageHead, SchoolTile } from "@/components/school/SchoolUI";
import { sceneHomework, sceneCelebrate } from "@/lib/demo/illustrations/scenes";
import { homework, type Homework, type HomeworkStatus } from "@/lib/demo/db/school";
import { subjectOf } from "@/lib/demo/db/subjects";

function dueLabel(days: number): { text: string; tone: string; bg: string } {
  if (days < 0) return { text: days === -1 ? "1 day late" : `${-days} days late`, tone: "#b91c1c", bg: "#ffe6e6" };
  if (days === 0) return { text: "Due today", tone: "#96610a", bg: "#fff8e6" };
  if (days === 1) return { text: "Due tomorrow", tone: "#96610a", bg: "#fff8e6" };
  return { text: `Due in ${days} days`, tone: "#15803d", bg: "#e8fbef" };
}

function HomeworkRow({
  item,
  done,
  onToggle,
}: {
  item: Homework;
  done: boolean;
  onToggle: () => void;
}) {
  const s = subjectOf(item.subject);
  const due = dueLabel(item.dueInDays);

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        p: 2,
        borderRadius: "20px",
        bgcolor: done ? "#f7faff" : "#fff",
        border: `2px solid ${OUTLINE}`,
        opacity: done ? 0.72 : 1,
        alignItems: "flex-start",
      }}
    >
      {/* The tick is the biggest target on the row: it is the only thing a child
          comes here to press. */}
      <Box
        component="button"
        aria-label={done ? "Mark as not done" : "Mark as done"}
        onClick={onToggle}
        sx={{
          width: 48, height: 48, flexShrink: 0, mt: 0.25, cursor: "pointer",
          borderRadius: "16px", display: "grid", placeItems: "center",
          bgcolor: done ? "#22a25b" : "#fff",
          color: done ? "#fff" : "rgba(16,34,74,0.25)",
          border: `2px solid ${done ? "rgba(16,34,74,0.2)" : OUTLINE}`,
        }}
      >
        <Icon icon={done ? "mdi:check-bold" : "mdi:checkbox-blank-circle-outline"} width={26} />
      </Box>

      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5, flexWrap: "wrap" }}>
          <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.5, px: 1, py: 0.25, borderRadius: 999, bgcolor: s.tint, color: s.ink, fontWeight: 800, fontSize: "0.74rem" }}>
            <Icon icon={s.icon} width={14} /> {s.short}
          </Box>
          {!done ? (
            <Box sx={{ px: 1, py: 0.25, borderRadius: 999, bgcolor: due.bg, color: due.tone, fontWeight: 800, fontSize: "0.74rem" }}>
              {due.text}
            </Box>
          ) : (
            <Box sx={{ px: 1, py: 0.25, borderRadius: 999, bgcolor: "#e8fbef", color: "#15803d", fontWeight: 800, fontSize: "0.74rem" }}>
              Done
            </Box>
          )}
          <Typography sx={{ fontSize: "0.74rem", color: "#5b6b86" }}>about {item.minutes} min</Typography>
        </Stack>

        <Typography
          sx={{
            fontWeight: 800, fontSize: "1.02rem", color: INK, lineHeight: 1.3,
            textDecoration: done ? "line-through" : "none",
          }}
        >
          {item.title}
        </Typography>
        <Typography sx={{ mt: 0.5, fontSize: "0.9rem", color: "#5b6b86", lineHeight: 1.45 }}>
          {item.detail}
        </Typography>
        <Typography sx={{ mt: 0.75, fontSize: "0.78rem", color: "#8494ab" }}>Set by {item.teacher}</Typography>
      </Box>
    </Stack>
  );
}

export default function HomeworkPage() {
  const all = useMemo(() => homework(), []);
  const [doneIds, setDoneIds] = useState<Set<number>>(
    () => new Set(all.filter((h) => h.status === "done").map((h) => h.id)),
  );

  const toggle = (id: number) =>
    setDoneIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const outstanding = all.filter((h) => !doneIds.has(h.id)).sort((a, b) => a.dueInDays - b.dueInDays);
  const finished = all.filter((h) => doneIds.has(h.id)).sort((a, b) => b.dueInDays - a.dueInDays);
  const late = outstanding.filter((h) => h.dueInDays < 0).length;
  const thisWeek = outstanding.filter((h) => h.dueInDays >= 0 && h.dueInDays <= 7).length;

  return (
    <PageShell>
      <SchoolPageHead
        eyebrow="Learn"
        title="Homework"
        blurb="Everything your teachers have set, in the order it is due. Tick it off when you finish."
        scene={sceneHomework("ink")}
        tint="#fff8e6"
      />

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2,minmax(0,1fr))", sm: "repeat(3,minmax(0,1fr))" }, gap: 2, mb: 2.5 }}>
        <SchoolTile icon="mdi:clipboard-text-outline" accent="#1b6fd4" value={outstanding.length} label="Still to do" sub={thisWeek ? `${thisWeek} due this week` : "Nothing due this week"} />
        <SchoolTile icon="mdi:alarm" accent={late ? "#dc2626" : "#22a25b"} value={late} label={late === 1 ? "Late" : "Late"} sub={late ? "Do these first" : "Nothing is late"} />
        <SchoolTile icon="mdi:check-circle-outline" accent="#22a25b" value={finished.length} label="Finished" sub="Well done" />
      </Box>

      {outstanding.length === 0 ? (
        <SchoolEmpty
          scene={sceneCelebrate("ink")}
          title="All done!"
          blurb="You have finished everything your teachers have set. Go and do something else."
        />
      ) : (
        <SchoolCard sx={{ mb: 2.5 }}>
          <Typography sx={{ fontFamily: "var(--font-family-display)", fontWeight: 800, fontSize: "1.2rem", color: INK, mb: 1.5 }}>
            To do
          </Typography>
          <Stack spacing={1.5}>
            {outstanding.map((h) => (
              <HomeworkRow key={h.id} item={h} done={false} onToggle={() => toggle(h.id)} />
            ))}
          </Stack>
        </SchoolCard>
      )}

      {finished.length > 0 ? (
        <SchoolCard>
          <Typography sx={{ fontFamily: "var(--font-family-display)", fontWeight: 800, fontSize: "1.2rem", color: INK, mb: 1.5 }}>
            Finished
          </Typography>
          <Stack spacing={1.5}>
            {finished.map((h) => (
              <HomeworkRow key={h.id} item={h} done onToggle={() => toggle(h.id)} />
            ))}
          </Stack>
        </SchoolCard>
      ) : null}
    </PageShell>
  );
}
