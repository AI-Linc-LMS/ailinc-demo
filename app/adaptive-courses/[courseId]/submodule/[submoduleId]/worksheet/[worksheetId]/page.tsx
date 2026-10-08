"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { MainLayout } from "@/components/layout/MainLayout";
import { useToast } from "@/components/common/Toast";
import { PracticalShell, PracticalCard, PracticalProse } from "@/components/practicals/PracticalShell";
import { ResultPanel } from "@/components/practicals/ResultPanel";
import {
  practicalsService,
  type WorksheetDetail,
  type WorksheetResult,
  type WorksheetEntries,
  type WorksheetInvariantSpec,
} from "@/lib/services/practicals.service";

/**
 * The worksheet player: a structured grid, marked cell by cell.
 *
 * This is to accounting what the code editor is to programming, and it is the
 * one surface that makes an entire discipline assessable at all. A multiple
 * choice question about a journal entry tests whether a learner recognises the
 * right answer among four. Posting the entry tests whether they can produce the
 * document, which is the thing the job actually consists of.
 *
 * Two decisions carry most of the value.
 *
 * The balance strip is live. Debits equalling credits is checkable without
 * knowing a single expected figure, so the sheet can tell a learner their
 * posting is internally inconsistent the moment it becomes so, which is when
 * the knowledge is worth something. Waiting for submission to say "unbalanced"
 * teaches the rule as a grading criterion rather than as a tool.
 *
 * Marking is per cell, and the server is the authority. The strip below is
 * recomputed in the browser for immediacy only, using the same declarative
 * invariant specs the marker uses, so the two cannot drift into saying
 * different things about the same sheet.
 */

const numOf = (v: unknown): number | null => {
  if (v == null) return null;
  // "1,24,500" is how the figure appears in an Indian textbook and on an Indian
  // keyboard. Marking that wrong teaches nothing about accounting.
  const cleaned = String(v).replace(/[,\s₹]/g, "");
  if (cleaned === "") return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
};

const inr = (n: number) =>
  n.toLocaleString("en-IN", { maximumFractionDigits: 2, minimumFractionDigits: 0 });

export default function WorksheetPlayerPage() {
  const params = useParams();
  const { showToast } = useToast();
  const courseId = Number(params.courseId);
  const submoduleId = Number(params.submoduleId);
  const worksheetId = Number(params.worksheetId);

  const [sheet, setSheet] = useState<WorksheetDetail | null>(null);
  const [entries, setEntries] = useState<WorksheetEntries>({});
  const [hintsShown, setHintsShown] = useState(0);
  const [result, setResult] = useState<WorksheetResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const startedAt = useRef(Date.now());

  useEffect(() => {
    if (!Number.isFinite(worksheetId)) return;
    let cancelled = false;
    practicalsService
      .getWorksheet(courseId, submoduleId, worksheetId)
      .then((d) => {
        if (!cancelled) setSheet(d);
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "Could not load this worksheet.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [courseId, submoduleId, worksheetId]);

  // A visible clock, because a working paper is a timed skill in every
  // examination this course prepares for. It counts up and never cuts anyone
  // off: the point is to notice the time, not to be punished by it.
  useEffect(() => {
    if (result) return;
    const t = setInterval(() => setElapsed(Math.floor((Date.now() - startedAt.current) / 1000)), 1000);
    return () => clearInterval(t);
  }, [result]);

  const setCell = useCallback((row: string, col: string, value: string) => {
    setEntries((prev) => ({ ...prev, [row]: { ...(prev[row] ?? {}), [col]: value } }));
  }, []);

  /** Sum a column over entry rows, taking a typed value over a given one. */
  const columnSum = useCallback(
    (col: string): number => {
      if (!sheet) return 0;
      let total = 0;
      for (const row of sheet.rows) {
        if (row.kind === "subtotal" || row.kind === "total") continue;
        const v = numOf(entries[row.key]?.[col]) ?? numOf(row.given?.[col]);
        if (v !== null) total += v;
      }
      return total;
    },
    [sheet, entries],
  );

  /**
   * Live invariant state.
   *
   * Deliberately the same three rule kinds the server marker implements, read
   * off the same specs. A second, friendlier client-side rule set would be a
   * second source of truth about whether a sheet balances.
   */
  const liveInvariants = useMemo(() => {
    if (!sheet) return [];
    return sheet.invariants.map((inv: WorksheetInvariantSpec) => {
      let left = 0;
      let right = 0;
      if (inv.kind === "columns-equal") {
        left = columnSum(inv.cols[0]);
        right = columnSum(inv.cols[1]);
      } else if (inv.kind === "column-total") {
        left = columnSum(inv.cols[0]);
        right = inv.value ?? 0;
      } else {
        const [r, c] = (inv.cell ?? "").split(":");
        left = numOf(entries[r]?.[c]) ?? 0;
        right = columnSum(inv.cols[0]);
      }
      const satisfied = Math.abs(left - right) <= 0.01 && left !== 0;
      return { inv, left, right, satisfied, gap: left - right };
    });
  }, [sheet, columnSum, entries]);

  const verdictFor = useCallback(
    (row: string, col: string) => result?.cells.find((c) => c.row === row && c.col === col),
    [result],
  );

  const filledCount = useMemo(
    () =>
      Object.values(entries).reduce(
        (n, row) => n + Object.values(row).filter((v) => String(v).trim() !== "").length,
        0,
      ),
    [entries],
  );

  const submit = async () => {
    if (!sheet) return;
    setSubmitting(true);
    try {
      const r = await practicalsService.submitWorksheet(courseId, submoduleId, worksheetId, {
        entries,
        hints_used: hintsShown,
      });
      setResult(r);
      showToast(r.headline, (r.score ?? 0) / r.max_score >= 0.6 ? "success" : "info");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      showToast(e instanceof Error ? e.message : "Could not mark the sheet.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const retry = () => {
    setResult(null);
    setEntries({});
    setHintsShown(0);
    startedAt.current = Date.now();
    setElapsed(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <MainLayout fullWidthContent>
        <Box sx={{ py: 10, textAlign: "center", color: "var(--text-secondary)" }}>
          <Icon icon="mdi:table-large" width={34} />
          <Typography sx={{ mt: 1, fontWeight: 700 }}>Opening the working paper…</Typography>
        </Box>
      </MainLayout>
    );
  }

  if (error || !sheet) {
    return (
      <MainLayout fullWidthContent>
        <Typography sx={{ color: "#ef4444", fontWeight: 700, textAlign: "center", py: 8 }}>
          {error ?? "Worksheet not found."}
        </Typography>
      </MainLayout>
    );
  }

  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;

  return (
    <MainLayout fullWidthContent>
      <PracticalShell
        kind="worksheet"
        courseId={courseId}
        submoduleId={submoduleId}
        title={sheet.title}
        subtitle="Fill in every shaded cell. The sheet checks its own arithmetic as you go."
        pills={[
          { icon: "mdi:speedometer", label: sheet.difficulty },
          { icon: "mdi:table-large", label: `${sheet.rows.length} rows` },
          { icon: "mdi:counter", label: `${sheet.max_score} marks` },
          { icon: "mdi:clock-outline", label: `~${sheet.minutes} min` },
        ]}
        rightSlot={
          !result ? (
            <Box sx={{ textAlign: "right" }}>
              <Typography
                sx={{ fontWeight: 800, fontSize: "1.45rem", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}
              >
                {mins}:{String(secs).padStart(2, "0")}
              </Typography>
              <Typography sx={{ fontSize: "0.7rem", opacity: 0.8 }}>
                {filledCount} cell{filledCount === 1 ? "" : "s"} filled
              </Typography>
            </Box>
          ) : undefined
        }
        footer={
          result ? (
            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <ButtonBase
                onClick={retry}
                sx={{
                  px: 2.25,
                  py: 1.1,
                  borderRadius: 2.5,
                  fontWeight: 800,
                  fontSize: "0.85rem",
                  border: "1px solid var(--border-default)",
                }}
              >
                <Icon icon="mdi:refresh" width={17} style={{ marginRight: 6 }} />
                Clear and try again
              </ButtonBase>
            </Stack>
          ) : (
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.25}
              alignItems={{ xs: "stretch", sm: "center" }}
              justifyContent="space-between"
            >
              <BalanceStrip rows={liveInvariants} />
              <ButtonBase
                disabled={submitting || filledCount === 0}
                onClick={submit}
                sx={{
                  px: 2.75,
                  py: 1.15,
                  borderRadius: 2.5,
                  fontWeight: 800,
                  fontSize: "0.88rem",
                  color: "white",
                  flexShrink: 0,
                  background: "linear-gradient(135deg, #0f766e 0%, #047857 100%)",
                  opacity: submitting || filledCount === 0 ? 0.5 : 1,
                }}
              >
                <Icon icon="mdi:check-decagram-outline" width={18} style={{ marginRight: 7 }} />
                {submitting ? "Marking…" : "Mark the sheet"}
              </ButtonBase>
            </Stack>
          )
        }
      >
        {result && (
          <ResultPanel result={result}>
            <Stack direction="row" flexWrap="wrap" sx={{ gap: 0.75, mt: result.detail_html ? 1.5 : 0 }}>
              {(
                [
                  ["correct", "Correct", "#047857"],
                  ["method", "Method marks", "#b45309"],
                  ["wrong", "Wrong", "#be123c"],
                  ["blank", "Left blank", "#64748b"],
                ] as const
              ).map(([v, label, colour]) => {
                const n = result.cells.filter((c) => c.verdict === v).length;
                if (!n) return null;
                return (
                  <Stack
                    key={v}
                    direction="row"
                    alignItems="center"
                    spacing={0.5}
                    sx={{
                      px: 1.1,
                      py: 0.45,
                      borderRadius: 999,
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      bgcolor: `color-mix(in srgb, ${colour} 12%, transparent)`,
                      color: colour,
                    }}
                  >
                    <Box sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: colour }} />
                    {n} {label.toLowerCase()}
                  </Stack>
                );
              })}
              {result.hint_penalty > 0 && (
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={0.5}
                  sx={{
                    px: 1.1,
                    py: 0.45,
                    borderRadius: 999,
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    bgcolor: "color-mix(in srgb, #64748b 12%, transparent)",
                    color: "#475569",
                  }}
                >
                  <Icon icon="mdi:lightbulb-on-outline" width={13} />
                  {result.hint_penalty} marks for hints
                </Stack>
              )}
            </Stack>
          </ResultPanel>
        )}

        <PracticalCard title="The task" icon="mdi:text-box-outline" accent="#0f766e">
          <PracticalProse html={sheet.brief_html} />
        </PracticalCard>

        {/* ------------------------------------------------------------ grid */}
        <PracticalCard
          title={sheet.title}
          icon="mdi:table-large"
          accent="#0f766e"
          dense
          action={
            !result ? (
              <Typography sx={{ fontSize: "0.72rem", color: "var(--text-secondary)" }}>
                shaded cells are yours to fill
              </Typography>
            ) : undefined
          }
        >
          <Box sx={{ overflowX: "auto", mx: -0.5, px: 0.5 }}>
            <Box
              sx={{
                minWidth: 520,
                display: "grid",
                gridTemplateColumns: `minmax(150px, 2fr) ${sheet.columns
                  .map((c) => `minmax(96px, ${c.flex ?? 1}fr)`)
                  .join(" ")}`,
                gap: "1px",
                bgcolor: "var(--border-default)",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              {/* header */}
              <HeadCell>{sheet.stub_label}</HeadCell>
              {sheet.columns.map((c) => (
                <HeadCell key={c.key} align={c.align ?? (c.type === "number" ? "right" : "left")}>
                  {c.label}
                </HeadCell>
              ))}

              {sheet.rows.map((row) => {
                const ruled = row.kind === "subtotal" || row.kind === "total";
                return (
                  <Box key={row.key} sx={{ display: "contents" }}>
                    <Box
                      sx={{
                        px: 1,
                        py: 0.9,
                        bgcolor: ruled
                          ? "color-mix(in srgb, var(--border-default) 32%, var(--card-bg))"
                          : "var(--card-bg)",
                        fontWeight: ruled ? 800 : 600,
                        fontSize: "0.8rem",
                        display: "flex",
                        alignItems: "center",
                        lineHeight: 1.3,
                      }}
                    >
                      {row.label ?? ""}
                    </Box>
                    {sheet.columns.map((col) => {
                      const given = row.given?.[col.key];
                      const isGiven = given !== undefined;
                      const verdict = verdictFor(row.key, col.key);
                      return (
                        <GridCell
                          key={col.key}
                          given={isGiven ? String(given) : undefined}
                          ruled={ruled}
                          align={col.align ?? (col.type === "number" ? "right" : "left")}
                          type={col.type}
                          options={col.options}
                          suffix={col.suffix}
                          value={entries[row.key]?.[col.key] ?? ""}
                          onChange={(v) => setCell(row.key, col.key, v)}
                          verdict={verdict}
                          locked={!!result}
                        />
                      );
                    })}
                  </Box>
                );
              })}
            </Box>
          </Box>

          {/* Per-cell feedback, listed under the sheet rather than crammed into
              a tooltip: the sentence explaining why a figure is wrong is the
              part worth reading, and a hover target hides it from anyone on a
              phone. */}
          {result && result.cells.some((c) => c.verdict !== "correct" && c.feedback) && (
            <Stack spacing={0.75} sx={{ mt: 1.75 }}>
              {result.cells
                .filter((c) => c.verdict !== "correct" && c.feedback)
                .map((c) => {
                  const rowLabel = sheet.rows.find((r) => r.key === c.row)?.label ?? c.row;
                  const colLabel = sheet.columns.find((x) => x.key === c.col)?.label ?? c.col;
                  const colour = c.verdict === "method" ? "#b45309" : "#be123c";
                  return (
                    <Stack
                      key={`${c.row}:${c.col}`}
                      direction="row"
                      spacing={1}
                      sx={{
                        p: 1.1,
                        borderRadius: 2,
                        bgcolor: `color-mix(in srgb, ${colour} 7%, transparent)`,
                        border: `1px solid color-mix(in srgb, ${colour} 28%, transparent)`,
                      }}
                    >
                      <Icon
                        icon={c.verdict === "method" ? "mdi:approximately-equal" : "mdi:close-circle-outline"}
                        width={16}
                        color={colour}
                        style={{ flexShrink: 0, marginTop: 2 }}
                      />
                      <Box sx={{ minWidth: 0 }}>
                        <Typography sx={{ fontSize: "0.76rem", fontWeight: 800, color: colour }}>
                          {rowLabel} · {colLabel}
                          {c.verdict !== "method" && c.expected !== undefined && (
                            <Box component="span" sx={{ fontWeight: 600, opacity: 0.85 }}>
                              {"  "}expected {typeof c.expected === "number" ? inr(c.expected) : c.expected}
                            </Box>
                          )}
                        </Typography>
                        <Typography sx={{ fontSize: "0.79rem", lineHeight: 1.5, mt: 0.2 }}>
                          {c.feedback}
                        </Typography>
                      </Box>
                    </Stack>
                  );
                })}
            </Stack>
          )}
        </PracticalCard>

        {/* ------------------------------------------------- invariant detail */}
        <PracticalCard title="Checks the sheet has to pass" icon="mdi:scale-balance" accent="#0f766e">
          <Stack spacing={1}>
            {(result ? result.invariants : liveInvariants.map((l) => ({
              key: l.inv.key,
              label: l.inv.label,
              satisfied: l.satisfied,
              marks: l.satisfied ? l.inv.marks : 0,
              of: l.inv.marks,
              left: l.left,
              right: l.right,
              hint: l.inv.hint,
            }))).map((v) => (
              <Stack
                key={v.key}
                direction={{ xs: "column", sm: "row" }}
                spacing={1}
                alignItems={{ xs: "flex-start", sm: "center" }}
                justifyContent="space-between"
                sx={{
                  p: 1.25,
                  borderRadius: 2,
                  border: "1px solid var(--border-default)",
                  bgcolor: v.satisfied
                    ? "color-mix(in srgb, #10b981 8%, transparent)"
                    : "color-mix(in srgb, #f59e0b 7%, transparent)",
                }}
              >
                <Stack direction="row" spacing={1} sx={{ minWidth: 0 }}>
                  <Icon
                    icon={v.satisfied ? "mdi:check-circle" : "mdi:scale-unbalanced"}
                    width={18}
                    color={v.satisfied ? "#047857" : "#b45309"}
                    style={{ flexShrink: 0, marginTop: 1 }}
                  />
                  <Box sx={{ minWidth: 0 }}>
                    <Typography sx={{ fontSize: "0.82rem", fontWeight: 800 }}>{v.label}</Typography>
                    <Typography sx={{ fontSize: "0.77rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                      {v.satisfied ? `Holds at ${inr(v.left ?? 0)}.` : v.hint}
                    </Typography>
                  </Box>
                </Stack>
                {/* The two sides, always. "Unbalanced" is not actionable; a gap
                    of 4,500 tells a learner which figure to go and look at. */}
                <Stack direction="row" spacing={1.5} sx={{ flexShrink: 0, pl: { xs: 3.4, sm: 0 } }}>
                  <Figure label="this side" value={v.left ?? 0} />
                  <Figure label="that side" value={v.right ?? 0} />
                  {!v.satisfied && (
                    <Figure
                      label="out by"
                      value={Math.abs((v.left ?? 0) - (v.right ?? 0))}
                      tone="#be123c"
                    />
                  )}
                  <Box sx={{ textAlign: "right", minWidth: 42 }}>
                    <Typography sx={{ fontSize: "0.9rem", fontWeight: 800 }}>
                      {v.marks}
                      <Box component="span" sx={{ opacity: 0.55, fontSize: "0.75rem" }}>
                        /{v.of}
                      </Box>
                    </Typography>
                    <Typography sx={{ fontSize: "0.63rem", color: "var(--text-secondary)" }}>marks</Typography>
                  </Box>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </PracticalCard>

        {/* ------------------------------------------------------------ hints */}
        {!result && (
          <PracticalCard title="Hints" icon="mdi:lightbulb-on-outline" accent="#b45309">
            <Typography sx={{ fontSize: "0.79rem", color: "var(--text-secondary)", mb: 1.25 }}>
              Each hint costs 10% of the paper, and the deduction is shown on your result rather
              than taken quietly. Three rungs: a nudge, then the rule, then the mechanism.
            </Typography>
            <Stack spacing={0.75}>
              {sheet.hints.map((h, i) =>
                i < hintsShown ? (
                  <Stack
                    key={i}
                    direction="row"
                    spacing={1}
                    sx={{
                      p: 1.15,
                      borderRadius: 2,
                      bgcolor: "color-mix(in srgb, #f59e0b 9%, transparent)",
                      border: "1px solid color-mix(in srgb, #f59e0b 28%, transparent)",
                    }}
                  >
                    <Typography sx={{ fontWeight: 800, fontSize: "0.78rem", color: "#b45309", flexShrink: 0 }}>
                      {i + 1}
                    </Typography>
                    <Typography sx={{ fontSize: "0.82rem", lineHeight: 1.55 }}>{h}</Typography>
                  </Stack>
                ) : i === hintsShown ? (
                  <ButtonBase
                    key={i}
                    onClick={() => setHintsShown(i + 1)}
                    sx={{
                      justifyContent: "flex-start",
                      p: 1.15,
                      borderRadius: 2,
                      border: "1px dashed var(--border-default)",
                      fontWeight: 700,
                      fontSize: "0.81rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    <Icon icon="mdi:lock-open-variant-outline" width={16} style={{ marginRight: 7 }} />
                    Reveal hint {i + 1} of {sheet.hints.length}
                    <Box component="span" sx={{ ml: 0.75, opacity: 0.75, fontWeight: 600 }}>
                      (costs {Math.round(sheet.max_score * 0.1 * 10) / 10} marks)
                    </Box>
                  </ButtonBase>
                ) : null,
              )}
            </Stack>
          </PracticalCard>
        )}

        {result && (
          <PracticalCard title="The worked answer" icon="mdi:script-text-outline" accent="#0f766e">
            <PracticalProse html={result.worked_answer_html} />
          </PracticalCard>
        )}
      </PracticalShell>
    </MainLayout>
  );
}

/* ------------------------------------------------------------- fragments --- */

function HeadCell({ children, align = "left" }: { children: React.ReactNode; align?: "left" | "right" }) {
  return (
    <Box
      sx={{
        px: 1,
        py: 0.85,
        bgcolor: "color-mix(in srgb, var(--border-default) 45%, var(--card-bg))",
        fontSize: "0.69rem",
        fontWeight: 800,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: "var(--text-secondary)",
        textAlign: align,
      }}
    >
      {children}
    </Box>
  );
}

function Figure({ label, value, tone }: { label: string; value: number; tone?: string }) {
  return (
    <Box sx={{ textAlign: "right" }}>
      <Typography
        sx={{
          fontSize: "0.86rem",
          fontWeight: 800,
          fontVariantNumeric: "tabular-nums",
          color: tone ?? "var(--text-primary)",
        }}
      >
        {inr(value)}
      </Typography>
      <Typography sx={{ fontSize: "0.63rem", color: "var(--text-secondary)" }}>{label}</Typography>
    </Box>
  );
}

/**
 * The live balance strip in the footer.
 *
 * Sits beside the submit button, so the last thing a learner sees before
 * submitting is whether the sheet is internally consistent. Collapsed to the
 * single most important rule on a narrow screen.
 */
function BalanceStrip({
  rows,
}: {
  rows: Array<{ inv: WorksheetInvariantSpec; left: number; right: number; satisfied: boolean; gap: number }>;
}) {
  if (rows.length === 0) return <Box />;
  const primary = rows.find((r) => !r.satisfied) ?? rows[0];
  const allOk = rows.every((r) => r.satisfied);
  const colour = allOk ? "#047857" : "#b45309";
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      sx={{
        px: 1.4,
        py: 0.85,
        borderRadius: 2.5,
        minWidth: 0,
        bgcolor: `color-mix(in srgb, ${colour} 10%, transparent)`,
        border: `1px solid color-mix(in srgb, ${colour} 30%, transparent)`,
      }}
    >
      <Icon
        icon={allOk ? "mdi:scale-balance" : "mdi:scale-unbalanced"}
        width={19}
        color={colour}
        style={{ flexShrink: 0 }}
      />
      <Box sx={{ minWidth: 0 }}>
        <Typography sx={{ fontSize: "0.79rem", fontWeight: 800, color: colour, lineHeight: 1.3 }}>
          {allOk ? "Every check holds" : primary.inv.label}
        </Typography>
        <Typography
          sx={{
            fontSize: "0.72rem",
            color: "var(--text-secondary)",
            fontVariantNumeric: "tabular-nums",
            lineHeight: 1.3,
          }}
        >
          {allOk
            ? `balanced at ${inr(rows[0].left)}`
            : primary.left === 0 && primary.right === 0
              ? "nothing entered yet"
              : `${inr(primary.left)} against ${inr(primary.right)}, out by ${inr(Math.abs(primary.gap))}`}
        </Typography>
      </Box>
    </Stack>
  );
}

/** One editable or given cell. */
function GridCell({
  given,
  value,
  onChange,
  align,
  type,
  options,
  suffix,
  ruled,
  verdict,
  locked,
}: {
  given?: string;
  value: string;
  onChange: (v: string) => void;
  align: "left" | "right";
  type: string;
  options?: string[];
  suffix?: string;
  ruled: boolean;
  verdict?: { verdict: string; marks: number; of: number };
  locked: boolean;
}) {
  // A given figure is part of the question. It must not look fillable, or the
  // learner spends their time retyping the data they were handed.
  if (given !== undefined) {
    return (
      <Box
        sx={{
          px: 1,
          py: 0.9,
          bgcolor: ruled
            ? "color-mix(in srgb, var(--border-default) 32%, var(--card-bg))"
            : "var(--card-bg)",
          fontSize: "0.82rem",
          fontWeight: ruled ? 800 : 600,
          textAlign: align,
          fontVariantNumeric: "tabular-nums",
          color: "var(--text-secondary)",
        }}
      >
        {given === "" ? "" : type === "number" ? inr(Number(String(given).replace(/,/g, ""))) : given}
      </Box>
    );
  }

  const tone =
    verdict?.verdict === "correct"
      ? "#10b981"
      : verdict?.verdict === "method"
        ? "#f59e0b"
        : verdict?.verdict === "wrong"
          ? "#ef4444"
          : verdict?.verdict === "blank"
            ? "#94a3b8"
            : null;

  const shared = {
    width: "100%",
    border: "none",
    outline: "none",
    background: "transparent",
    font: "inherit",
    fontSize: "0.82rem",
    fontWeight: ruled ? 800 : 600,
    textAlign: align,
    color: "inherit",
    padding: 0,
    fontVariantNumeric: "tabular-nums" as const,
  };

  return (
    <Box
      sx={{
        position: "relative",
        px: 1,
        py: 0.9,
        display: "flex",
        alignItems: "center",
        justifyContent: align === "right" ? "flex-end" : "flex-start",
        // The shade is the affordance: it says "this one is yours".
        bgcolor: tone
          ? `color-mix(in srgb, ${tone} 13%, var(--card-bg))`
          : "color-mix(in srgb, #0f766e 6%, var(--card-bg))",
        boxShadow: tone ? `inset 0 0 0 1.5px color-mix(in srgb, ${tone} 55%, transparent)` : "none",
        "&:focus-within": {
          boxShadow: "inset 0 0 0 2px #0f766e",
        },
      }}
    >
      {options && options.length > 0 ? (
        <Box
          component="select"
          value={value}
          disabled={locked}
          onChange={(e) => onChange(e.target.value)}
          sx={{ ...shared, cursor: locked ? "default" : "pointer" }}
        >
          <option value="">—</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </Box>
      ) : (
        <Box
          component="input"
          value={value}
          disabled={locked}
          inputMode={type === "number" ? "decimal" : "text"}
          placeholder={locked ? "" : type === "number" ? "0" : ""}
          onChange={(e) => onChange((e.target as HTMLInputElement).value)}
          sx={{ ...shared, "&::placeholder": { color: "var(--text-secondary)", opacity: 0.45 } }}
        />
      )}
      {suffix && (
        <Typography sx={{ fontSize: "0.74rem", color: "var(--text-secondary)", ml: 0.4, flexShrink: 0 }}>
          {suffix}
        </Typography>
      )}
      {verdict && verdict.verdict !== "correct" && (
        <Icon
          icon={verdict.verdict === "method" ? "mdi:approximately-equal" : "mdi:alert-circle"}
          width={13}
          color={tone ?? undefined}
          style={{ position: "absolute", top: 2, right: 2 }}
        />
      )}
    </Box>
  );
}
