"use client";

/**
 * Fees. SCHOOL EDITION, new in this fork.
 *
 * Written to be read by a parent over a child's shoulder, so the one number that
 * matters is what is owed right now, and every paid line keeps its receipt number
 * rather than disappearing. "Paid" with nothing to show for it is the state that
 * causes the phone call this page exists to prevent.
 *
 * There is no Pay button. A fee page in a sales demo that appears to take a real
 * payment is a promise the demo cannot keep, and a fake card form is worse than
 * none: it invites somebody to type a real card number into a prototype.
 */

import { useMemo } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { PageShell } from "@/components/common/PageShell";
import { INK, OUTLINE, SchoolCard, SchoolPageHead, SchoolTile } from "@/components/school/SchoolUI";
import { sceneFees } from "@/lib/demo/illustrations/scenes";
import { fees, feeSummary, type FeeItem } from "@/lib/demo/db/school";

const money = (n: number) => `₹${n.toLocaleString("en-IN")}`;

const STATUS: Record<FeeItem["status"], { label: string; bg: string; ink: string; icon: string }> = {
  paid: { label: "Paid", bg: "#e8fbef", ink: "#15803d", icon: "mdi:check-circle" },
  due: { label: "Due now", bg: "#ffe6e6", ink: "#b91c1c", icon: "mdi:alert-circle" },
  upcoming: { label: "Coming up", bg: "#fff8e6", ink: "#96610a", icon: "mdi:clock-outline" },
};

export default function FeesPage() {
  const items = useMemo(() => fees(), []);
  const summary = useMemo(() => feeSummary(), []);

  return (
    <PageShell>
      <SchoolPageHead
        eyebrow="School"
        title="Fees"
        blurb="What has been paid, what is due, and when the next one is. Receipts are kept here too."
        scene={sceneFees("ink")}
        tint="#e8fbef"
      />

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2,minmax(0,1fr))", sm: "repeat(3,minmax(0,1fr))" }, gap: 2, mb: 2.5 }}>
        <SchoolTile icon="mdi:alert-circle-outline" accent={summary.dueNow ? "#dc2626" : "#22a25b"} value={money(summary.dueNow)} label="Due now" sub={summary.nextDue ? summary.nextDue.label : "Nothing outstanding"} />
        <SchoolTile icon="mdi:check-circle-outline" accent="#22a25b" value={money(summary.paid)} label="Paid so far" sub="This school year" />
        <SchoolTile icon="mdi:calendar-clock" accent="#1b6fd4" value={money(summary.outstanding)} label="Still to pay" sub="Including next term" />
      </Box>

      <SchoolCard>
        <Typography sx={{ fontFamily: "var(--font-family-display)", fontWeight: 800, fontSize: "1.2rem", color: INK, mb: 1.5 }}>
          Every fee this year
        </Typography>
        <Stack spacing={1.5}>
          {items.map((f) => {
            const st = STATUS[f.status];
            return (
              <Stack
                key={f.id}
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                alignItems={{ sm: "center" }}
                sx={{ p: 2, borderRadius: "18px", border: `2px solid ${OUTLINE}`, bgcolor: "#fff" }}
              >
                <Box sx={{ width: 44, height: 44, flexShrink: 0, borderRadius: "14px", display: "grid", placeItems: "center", bgcolor: st.bg, color: st.ink, border: "2px solid rgba(16,34,74,0.10)" }}>
                  <Icon icon={st.icon} width={22} />
                </Box>

                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography sx={{ fontWeight: 800, fontSize: "1.02rem", color: INK }}>{f.label}</Typography>
                  <Typography sx={{ fontSize: "0.86rem", color: "#5b6b86" }}>{f.detail}</Typography>
                  {f.receiptNo ? (
                    <Typography sx={{ mt: 0.4, fontSize: "0.78rem", color: "#8494ab", fontFamily: "var(--font-mono)" }}>
                      Receipt {f.receiptNo}
                    </Typography>
                  ) : (
                    <Typography sx={{ mt: 0.4, fontSize: "0.8rem", color: st.ink, fontWeight: 700 }}>
                      {f.dueInDays === 0 ? "Due today" : f.dueInDays > 0 ? `Due in ${f.dueInDays} days` : "Overdue"}
                    </Typography>
                  )}
                </Box>

                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ flexShrink: 0 }}>
                  <Typography sx={{ fontFamily: "var(--font-family-display)", fontWeight: 800, fontSize: "1.3rem", color: INK }}>
                    {money(f.amount)}
                  </Typography>
                  <Box sx={{ px: 1.25, py: 0.5, borderRadius: 999, bgcolor: st.bg, color: st.ink, fontWeight: 800, fontSize: "0.76rem" }}>
                    {st.label}
                  </Box>
                </Stack>
              </Stack>
            );
          })}
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 2.5, p: 1.5, borderRadius: "16px", bgcolor: "#eff7ff", border: `2px solid ${OUTLINE}` }}>
          <Icon icon="mdi:information-outline" width={20} color="#1b6fd4" style={{ flexShrink: 0 }} />
          <Typography sx={{ fontSize: "0.88rem", color: "#44536b", lineHeight: 1.5 }}>
            Fees are paid at the school office or by bank transfer. The office updates this page the same day.
          </Typography>
        </Stack>
      </SchoolCard>
    </PageShell>
  );
}
