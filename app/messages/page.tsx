"use client";

/**
 * Messages between school and home. SCHOOL EDITION, new in this fork.
 *
 * Deliberately not a chat. A chat sets an expectation that a teacher is reachable
 * and replying, which no school can staff; these are notes, sent and read, with
 * the sender and the subject they teach attached so a parent knows who is writing
 * and about what.
 *
 * The notes are also written the way a good teacher writes them: specific, warm,
 * and ending with what to do. "Ananya is doing well" is a sentence nobody can act
 * on; "she has got hold of equivalent fractions, keep practising the times
 * tables" is one they can.
 */

import { useMemo, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { PageShell } from "@/components/common/PageShell";
import { INK, OUTLINE, SchoolCard, SchoolPageHead } from "@/components/school/SchoolUI";
import { sceneMessages } from "@/lib/demo/illustrations/scenes";
import { messages, type SchoolMessage } from "@/lib/demo/db/school";
import { subjectOf } from "@/lib/demo/db/subjects";
import { portraitFor } from "@/lib/demo/db/avatar";

function ago(days: number): string {
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  const w = Math.round(days / 7);
  return w === 1 ? "1 week ago" : `${w} weeks ago`;
}

export default function MessagesPage() {
  const all = useMemo(() => messages(), []);
  const [openId, setOpenId] = useState<number | null>(all.find((m) => !m.read)?.id ?? null);
  const [readIds, setReadIds] = useState<Set<number>>(
    () => new Set(all.filter((m) => m.read).map((m) => m.id)),
  );

  const open = (m: SchoolMessage) => {
    setOpenId((cur) => (cur === m.id ? null : m.id));
    setReadIds((prev) => new Set(prev).add(m.id));
  };

  const unread = all.filter((m) => !readIds.has(m.id)).length;

  return (
    <PageShell>
      <SchoolPageHead
        eyebrow="Together"
        title="Messages"
        blurb={
          unread
            ? `${unread} new ${unread === 1 ? "note" : "notes"} from school. Tap one to read it.`
            : "Notes between your teachers and home."
        }
        scene={sceneMessages("ink")}
        tint="#eff7ff"
      />

      <Stack spacing={1.5}>
        {all.map((m) => {
          const isOpen = openId === m.id;
          const isRead = readIds.has(m.id);
          const s = m.about ? subjectOf(m.about) : null;

          return (
            <SchoolCard key={m.id} tint={isRead ? "#ffffff" : "#eff7ff"} sx={{ p: 0, overflow: "hidden" }}>
              <Box
                component="button"
                onClick={() => open(m)}
                sx={{
                  width: "100%", textAlign: "left", cursor: "pointer", border: "none",
                  bgcolor: "transparent", p: 2, display: "flex", gap: 2, alignItems: "flex-start",
                  minHeight: 48,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={portraitFor(m.from, m.fromRole !== "parent")}
                  alt=""
                  width={48}
                  height={48}
                  style={{ borderRadius: 14, flexShrink: 0, border: "2px solid rgba(16,34,74,0.12)" }}
                />
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.25, flexWrap: "wrap" }}>
                    <Typography sx={{ fontWeight: 800, color: INK, fontSize: "0.98rem" }}>{m.from}</Typography>
                    {s ? (
                      <Box sx={{ px: 0.9, py: 0.2, borderRadius: 999, bgcolor: s.tint, color: s.ink, fontWeight: 800, fontSize: "0.7rem" }}>
                        {s.short}
                      </Box>
                    ) : null}
                    {!isRead ? (
                      <Box sx={{ px: 0.9, py: 0.2, borderRadius: 999, bgcolor: "#1b6fd4", color: "#fff", fontWeight: 800, fontSize: "0.68rem" }}>
                        NEW
                      </Box>
                    ) : null}
                    <Typography sx={{ fontSize: "0.76rem", color: "#8494ab", ml: "auto" }}>{ago(m.sentDaysAgo)}</Typography>
                  </Stack>
                  <Typography sx={{ fontWeight: isRead ? 600 : 800, color: INK, fontSize: "1.02rem", lineHeight: 1.3 }}>
                    {m.subject}
                  </Typography>
                  {!isOpen ? (
                    <Typography noWrap sx={{ mt: 0.4, fontSize: "0.9rem", color: "#5b6b86" }}>
                      {m.body}
                    </Typography>
                  ) : null}
                </Box>
                <Icon
                  icon={isOpen ? "mdi:chevron-up" : "mdi:chevron-down"}
                  width={22}
                  color="#8494ab"
                  style={{ flexShrink: 0, marginTop: 4 }}
                />
              </Box>

              {isOpen ? (
                <Box sx={{ px: 2, pb: 2 }}>
                  <Box sx={{ p: 2, borderRadius: "16px", bgcolor: "#f7faff", border: `2px solid ${OUTLINE}` }}>
                    <Typography sx={{ fontSize: "0.98rem", color: "#28374f", lineHeight: 1.6 }}>{m.body}</Typography>
                  </Box>
                </Box>
              ) : null}
            </SchoolCard>
          );
        })}
      </Stack>
    </PageShell>
  );
}
