"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { MainLayout } from "@/components/layout/MainLayout";
import { useToast } from "@/components/common/Toast";
import { PracticalShell, PracticalCard, PracticalProse } from "@/components/practicals/PracticalShell";
import { ResultPanel } from "@/components/practicals/ResultPanel";
import {
  practicalsService,
  type LabDetail,
  type LabResult,
} from "@/lib/services/practicals.service";

/**
 * The guided lab player: a procedure you cannot skim.
 *
 * A safety procedure written as a page of prose is read to the end by nobody,
 * and the step that gets skipped is the one that was keeping someone alive. So
 * the procedure is a gate rather than a document: one step at a time, a hazard
 * on a "danger" step that has to be acknowledged before the step can be left,
 * and a reading at the points where the only proof the step was done is a
 * number off an instrument.
 *
 * The expected range for a reading is never sent to the browser. A learner who
 * can see "8 to 12" does not take the measurement, they type 10, and the
 * procedure becomes a form. The range lives with the marker.
 *
 * PPE is confirmed before step one unlocks. It is the one part of the procedure
 * that has to happen before anything else, and putting it in the list as step
 * zero makes it skippable in exactly the way the rest of the design prevents.
 */

export default function LabPlayerPage() {
  const params = useParams();
  const { showToast } = useToast();
  const courseId = Number(params.courseId);
  const submoduleId = Number(params.submoduleId);
  const labId = Number(params.labId);

  const [lab, setLab] = useState<LabDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [ppeOn, setPpeOn] = useState<Record<string, boolean>>({});
  const [started, setStarted] = useState(false);
  const [cursor, setCursor] = useState(0);
  const [confirmed, setConfirmed] = useState<Record<number, boolean>>({});
  const [hazardOk, setHazardOk] = useState<Record<number, boolean>>({});
  const [readings, setReadings] = useState<Record<number, string>>({});
  const [captured, setCaptured] = useState<Record<number, boolean>>({});
  const [result, setResult] = useState<LabResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const startedAt = useRef<number | null>(null);

  useEffect(() => {
    if (!Number.isFinite(labId)) return;
    let cancelled = false;
    practicalsService
      .getLab(courseId, submoduleId, labId)
      .then((d) => {
        if (!cancelled) setLab(d);
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "Could not load this procedure.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [courseId, submoduleId, labId]);

  useEffect(() => {
    if (!started || result) return;
    startedAt.current ??= Date.now();
    const t = setInterval(
      () => setElapsed(Math.floor((Date.now() - (startedAt.current ?? Date.now())) / 1000)),
      1000,
    );
    return () => clearInterval(t);
  }, [started, result]);

  const allPpe = useMemo(
    () => !!lab && lab.ppe.every((p) => ppeOn[p]),
    [lab, ppeOn],
  );

  const step = lab?.steps[cursor] ?? null;

  /** Everything this step needs before it can be left behind. */
  const stepBlockers = useMemo(() => {
    if (!step) return [];
    const out: string[] = [];
    if (step.hazard?.level === "danger" && !hazardOk[step.n]) {
      out.push("Acknowledge the hazard notice");
    }
    if (step.reading && !String(readings[step.n] ?? "").trim()) {
      out.push(`Enter the ${step.reading.label.toLowerCase()}`);
    }
    if (step.capture && !captured[step.n]) {
      out.push(`Capture the ${step.capture.medium}`);
    }
    return out;
  }, [step, hazardOk, readings, captured]);

  const advance = () => {
    if (!lab || !step || stepBlockers.length > 0) return;
    setConfirmed((p) => ({ ...p, [step.n]: true }));
    if (cursor < lab.steps.length - 1) {
      setCursor((c) => c + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const doneCount = Object.values(confirmed).filter(Boolean).length;
  const atEnd = !!lab && cursor === lab.steps.length - 1;
  const canSubmit = !!lab && atEnd && confirmed[lab.steps[lab.steps.length - 1]?.n ?? -1];

  const submit = async () => {
    if (!lab) return;
    setSubmitting(true);
    try {
      const r = await practicalsService.submitLab(courseId, submoduleId, labId, {
        steps: lab.steps.map((st) => ({
          n: st.n,
          confirmed: !!confirmed[st.n],
          reading: readings[st.n],
          captured: !!captured[st.n],
        })),
        elapsed_seconds: elapsed,
      });
      setResult(r);
      showToast(r.headline, r.readings.every((x) => x.in_range) ? "success" : "info");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      showToast(e instanceof Error ? e.message : "Could not file the procedure.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <MainLayout fullWidthContent>
        <Box sx={{ py: 10, textAlign: "center", color: "var(--text-secondary)" }}>
          <Icon icon="mdi:clipboard-check-outline" width={34} />
          <Typography sx={{ mt: 1, fontWeight: 700 }}>Loading the procedure…</Typography>
        </Box>
      </MainLayout>
    );
  }

  if (error || !lab) {
    return (
      <MainLayout fullWidthContent>
        <Typography sx={{ color: "#ef4444", fontWeight: 700, textAlign: "center", py: 8 }}>
          {error ?? "Procedure not found."}
        </Typography>
      </MainLayout>
    );
  }

  const dangerCount = lab.steps.filter((s) => s.hazard?.level === "danger").length;

  return (
    <MainLayout fullWidthContent>
      <PracticalShell
        kind="lab"
        courseId={courseId}
        submoduleId={submoduleId}
        title={lab.title}
        subtitle={lab.objective}
        pills={[
          { icon: "mdi:format-list-numbered", label: `${lab.steps.length} steps` },
          ...(dangerCount ? [{ icon: "mdi:alert-octagon", label: `${dangerCount} locked safety steps` }] : []),
          { icon: "mdi:counter", label: `${lab.max_score} marks` },
        ]}
        rightSlot={
          started && !result ? (
            <Box sx={{ textAlign: "right" }}>
              <Typography
                sx={{ fontWeight: 800, fontSize: "1.3rem", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}
              >
                {Math.floor(elapsed / 60)}:{String(elapsed % 60).padStart(2, "0")}
              </Typography>
              <Typography sx={{ fontSize: "0.69rem", opacity: 0.82 }}>
                step {cursor + 1} of {lab.steps.length}
              </Typography>
            </Box>
          ) : undefined
        }
        footer={
          !started || result ? undefined : (
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.25}
              alignItems={{ xs: "stretch", sm: "center" }}
              justifyContent="space-between"
            >
              <Box sx={{ minWidth: 0 }}>
                {stepBlockers.length > 0 ? (
                  <Stack direction="row" alignItems="center" spacing={0.75}>
                    <Icon icon="mdi:lock-outline" width={17} color="#b45309" />
                    <Typography sx={{ fontSize: "0.81rem", fontWeight: 700, color: "#b45309" }}>
                      {stepBlockers[0]}
                      {stepBlockers.length > 1 ? ` and ${stepBlockers.length - 1} more` : ""}
                    </Typography>
                  </Stack>
                ) : (
                  <Stack direction="row" alignItems="center" spacing={0.75}>
                    <Icon icon="mdi:check-circle-outline" width={17} color="#047857" />
                    <Typography sx={{ fontSize: "0.81rem", fontWeight: 700, color: "#047857" }}>
                      {doneCount} of {lab.steps.length} steps complete
                    </Typography>
                  </Stack>
                )}
              </Box>
              {canSubmit ? (
                <ButtonBase
                  disabled={submitting}
                  onClick={submit}
                  sx={{
                    px: 2.75,
                    py: 1.15,
                    borderRadius: 2.5,
                    fontWeight: 800,
                    fontSize: "0.88rem",
                    color: "white",
                    flexShrink: 0,
                    background: "linear-gradient(135deg, #0369a1 0%, #075985 100%)",
                    opacity: submitting ? 0.55 : 1,
                  }}
                >
                  <Icon icon="mdi:clipboard-check" width={18} style={{ marginRight: 7 }} />
                  {submitting ? "Filing…" : "File the procedure"}
                </ButtonBase>
              ) : (
                <ButtonBase
                  disabled={stepBlockers.length > 0}
                  onClick={advance}
                  sx={{
                    px: 2.75,
                    py: 1.15,
                    borderRadius: 2.5,
                    fontWeight: 800,
                    fontSize: "0.88rem",
                    color: "white",
                    flexShrink: 0,
                    background: "linear-gradient(135deg, #0369a1 0%, #075985 100%)",
                    opacity: stepBlockers.length > 0 ? 0.42 : 1,
                  }}
                >
                  {atEnd ? "Complete final step" : "Step done, next"}
                  <Icon icon="mdi:arrow-right" width={18} style={{ marginLeft: 7 }} />
                </ButtonBase>
              )}
            </Stack>
          )
        }
      >
        {result && (
          <ResultPanel result={result}>
            <Stack spacing={0.75} sx={{ mt: result.detail_html ? 1.5 : 0 }}>
              {result.readings.map((r) => (
                <Stack
                  key={r.n}
                  direction="row"
                  spacing={1}
                  sx={{
                    p: 1.15,
                    borderRadius: 2,
                    bgcolor: `color-mix(in srgb, ${r.in_range ? "#10b981" : "#ef4444"} 8%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${r.in_range ? "#10b981" : "#ef4444"} 28%, transparent)`,
                  }}
                >
                  <Icon
                    icon={r.in_range ? "mdi:gauge" : "mdi:gauge-low"}
                    width={17}
                    color={r.in_range ? "#047857" : "#be123c"}
                    style={{ flexShrink: 0, marginTop: 1 }}
                  />
                  <Box sx={{ minWidth: 0 }}>
                    <Typography sx={{ fontSize: "0.8rem", fontWeight: 800 }}>
                      {r.label}
                      <Box component="span" sx={{ fontWeight: 600, opacity: 0.8 }}>
                        {" "}
                        you read {r.entered || "nothing"}
                      </Box>
                    </Typography>
                    <Typography sx={{ fontSize: "0.79rem", lineHeight: 1.5, color: "var(--text-secondary)" }}>
                      {r.note}
                    </Typography>
                  </Box>
                </Stack>
              ))}
              <Stack direction="row" alignItems="center" spacing={0.75} sx={{ pt: 0.5 }}>
                <Icon icon="mdi:shield-check-outline" width={15} color="var(--text-secondary)" />
                <Typography sx={{ fontSize: "0.76rem", color: "var(--text-secondary)" }}>
                  {result.hazards_acknowledged} hazard notice
                  {result.hazards_acknowledged === 1 ? "" : "s"} acknowledged, logged against this
                  run for audit. Procedure took {Math.round(result.elapsed_seconds / 60)} min.
                </Typography>
              </Stack>
            </Stack>
          </ResultPanel>
        )}

        {/* ------------------------------------------------------- PPE gate */}
        {!started && !result && (
          <>
            <PracticalCard title="Before you touch anything" icon="mdi:shield-account-outline" accent="#be123c">
              <Typography sx={{ fontSize: "0.88rem", lineHeight: 1.6, mb: 1.5 }}>
                This is the only part of the procedure that has to happen before everything else,
                so it is a gate rather than step one. Confirm each item you are actually wearing or
                have to hand. Nothing here is a formality: every item on this list is on it because
                of an injury somebody already had.
              </Typography>
              <Stack spacing={0.75}>
                {lab.ppe.map((p) => (
                  <ButtonBase
                    key={p}
                    onClick={() => setPpeOn((prev) => ({ ...prev, [p]: !prev[p] }))}
                    sx={{
                      justifyContent: "flex-start",
                      gap: 1.15,
                      p: 1.15,
                      borderRadius: 2.5,
                      border: `1px solid ${ppeOn[p] ? "#10b981" : "var(--border-default)"}`,
                      bgcolor: ppeOn[p] ? "color-mix(in srgb, #10b981 8%, transparent)" : "transparent",
                    }}
                  >
                    <Icon
                      icon={ppeOn[p] ? "mdi:checkbox-marked-circle" : "mdi:checkbox-blank-circle-outline"}
                      width={20}
                      color={ppeOn[p] ? "#047857" : "var(--text-secondary)"}
                    />
                    <Typography sx={{ fontSize: "0.87rem", fontWeight: 600, textAlign: "left" }}>{p}</Typography>
                  </ButtonBase>
                ))}
              </Stack>
            </PracticalCard>

            <PracticalCard title="Tools for this job" icon="mdi:toolbox-outline" accent="#0369a1">
              <Stack direction="row" flexWrap="wrap" sx={{ gap: 0.75 }}>
                {lab.tools.map((t) => (
                  <Stack
                    key={t}
                    direction="row"
                    alignItems="center"
                    spacing={0.5}
                    sx={{
                      px: 1.15,
                      py: 0.5,
                      borderRadius: 999,
                      border: "1px solid var(--border-default)",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                    }}
                  >
                    <Icon icon="mdi:wrench-outline" width={13} color="var(--text-secondary)" />
                    {t}
                  </Stack>
                ))}
              </Stack>
            </PracticalCard>

            <ButtonBase
              disabled={!allPpe}
              onClick={() => setStarted(true)}
              sx={{
                width: "100%",
                py: 1.4,
                borderRadius: 3,
                fontWeight: 800,
                fontSize: "0.92rem",
                color: "white",
                background: allPpe
                  ? "linear-gradient(135deg, #0369a1 0%, #075985 100%)"
                  : "var(--border-default)",
                opacity: allPpe ? 1 : 0.7,
              }}
            >
              <Icon icon={allPpe ? "mdi:play" : "mdi:lock-outline"} width={19} style={{ marginRight: 8 }} />
              {allPpe ? "Begin the procedure" : "Confirm every item above to begin"}
            </ButtonBase>
          </>
        )}

        {/* --------------------------------------------------- the live step */}
        {started && !result && step && (
          <>
            {/* The spine. Shows position without letting a learner jump ahead,
                because the order is the procedure. */}
            <Stack direction="row" spacing={0.4} sx={{ mb: 2 }}>
              {lab.steps.map((s, i) => (
                <Box
                  key={s.n}
                  sx={{
                    flex: 1,
                    height: 5,
                    borderRadius: 999,
                    bgcolor: confirmed[s.n]
                      ? "#0369a1"
                      : i === cursor
                        ? "color-mix(in srgb, #0369a1 45%, transparent)"
                        : "var(--border-default)",
                  }}
                />
              ))}
            </Stack>

            <PracticalCard
              title={`Step ${cursor + 1} of ${lab.steps.length} · ${step.title}`}
              icon="mdi:numeric"
              accent="#0369a1"
            >
              <PracticalProse html={step.detail_html} />

              {step.tools && step.tools.length > 0 && (
                <Stack direction="row" flexWrap="wrap" sx={{ gap: 0.6, mt: 1.5 }}>
                  {step.tools.map((t) => (
                    <Stack
                      key={t}
                      direction="row"
                      alignItems="center"
                      spacing={0.4}
                      sx={{
                        px: 0.9,
                        py: 0.35,
                        borderRadius: 999,
                        bgcolor: "color-mix(in srgb, var(--border-default) 35%, transparent)",
                        fontSize: "0.74rem",
                        fontWeight: 600,
                      }}
                    >
                      <Icon icon="mdi:wrench-outline" width={12} />
                      {t}
                    </Stack>
                  ))}
                </Stack>
              )}

              {/* The hazard. A "danger" level cannot be passed without the
                  acknowledgement, which is the entire reason this is a stepper. */}
              {step.hazard && (
                <Box
                  sx={{
                    mt: 1.75,
                    p: 1.5,
                    borderRadius: 3,
                    bgcolor: `color-mix(in srgb, ${step.hazard.level === "danger" ? "#be123c" : "#b45309"} 9%, transparent)`,
                    border: `1.5px solid color-mix(in srgb, ${step.hazard.level === "danger" ? "#be123c" : "#b45309"} 40%, transparent)`,
                  }}
                >
                  <Stack direction="row" spacing={1} sx={{ mb: step.hazard.level === "danger" ? 1.25 : 0 }}>
                    <Icon
                      icon={step.hazard.level === "danger" ? "mdi:alert-octagon" : "mdi:alert"}
                      width={21}
                      color={step.hazard.level === "danger" ? "#be123c" : "#b45309"}
                      style={{ flexShrink: 0 }}
                    />
                    <Box sx={{ minWidth: 0 }}>
                      <Typography
                        sx={{
                          fontSize: "0.64rem",
                          fontWeight: 800,
                          letterSpacing: "0.09em",
                          textTransform: "uppercase",
                          color: step.hazard.level === "danger" ? "#be123c" : "#b45309",
                        }}
                      >
                        {step.hazard.level === "danger" ? "Danger, this step is locked" : "Take care"}
                      </Typography>
                      <Typography sx={{ fontSize: "0.88rem", fontWeight: 600, lineHeight: 1.55, mt: 0.2 }}>
                        {step.hazard.text}
                      </Typography>
                    </Box>
                  </Stack>
                  {step.hazard.level === "danger" && (
                    <ButtonBase
                      onClick={() => setHazardOk((p) => ({ ...p, [step.n]: !p[step.n] }))}
                      sx={{
                        width: "100%",
                        justifyContent: "flex-start",
                        gap: 1,
                        p: 1.1,
                        borderRadius: 2.5,
                        bgcolor: hazardOk[step.n] ? "#be123c" : "var(--card-bg)",
                        color: hazardOk[step.n] ? "white" : "var(--text-primary)",
                        border: "1px solid color-mix(in srgb, #be123c 40%, transparent)",
                      }}
                    >
                      <Icon
                        icon={hazardOk[step.n] ? "mdi:checkbox-marked" : "mdi:checkbox-blank-outline"}
                        width={19}
                      />
                      <Typography sx={{ fontSize: "0.83rem", fontWeight: 800, textAlign: "left" }}>
                        I have read this and done it
                      </Typography>
                    </ButtonBase>
                  )}
                </Box>
              )}

              {/* The reading. No range shown, by design: see the note at the
                  top of this file. */}
              {step.reading && (
                <Box
                  sx={{
                    mt: 1.75,
                    p: 1.5,
                    borderRadius: 3,
                    border: "1px solid var(--border-default)",
                    bgcolor: "color-mix(in srgb, #0369a1 5%, transparent)",
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={0.75} sx={{ mb: 1 }}>
                    <Icon icon="mdi:gauge" width={18} color="#0369a1" />
                    <Typography sx={{ fontSize: "0.85rem", fontWeight: 800 }}>
                      {step.reading.label}
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Box
                      component="input"
                      inputMode="decimal"
                      placeholder="your reading"
                      value={readings[step.n] ?? ""}
                      onChange={(e) =>
                        setReadings((p) => ({ ...p, [step.n]: (e.target as HTMLInputElement).value }))
                      }
                      sx={{
                        flex: 1,
                        minWidth: 0,
                        px: 1.25,
                        py: 0.9,
                        borderRadius: 2,
                        border: "1px solid var(--border-default)",
                        bgcolor: "var(--card-bg)",
                        font: "inherit",
                        fontSize: "1rem",
                        fontWeight: 800,
                        color: "inherit",
                        fontVariantNumeric: "tabular-nums",
                        outline: "none",
                        "&:focus": { borderColor: "#0369a1" },
                      }}
                    />
                    <Typography sx={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-secondary)" }}>
                      {step.reading.unit}
                    </Typography>
                  </Stack>
                  <Typography sx={{ fontSize: "0.76rem", color: "var(--text-secondary)", mt: 0.75 }}>
                    Enter what the instrument actually says. The expected range is held by the
                    marker, not sent to this page, so a plausible-looking guess does not pass.
                  </Typography>
                </Box>
              )}

              {/* An in-step capture, so the proof is taken at the moment the
                  work happens rather than reconstructed afterwards. */}
              {step.capture && (
                <ButtonBase
                  onClick={() => setCaptured((p) => ({ ...p, [step.n]: !p[step.n] }))}
                  sx={{
                    mt: 1.5,
                    width: "100%",
                    justifyContent: "flex-start",
                    gap: 1,
                    p: 1.3,
                    borderRadius: 3,
                    border: `1px dashed ${captured[step.n] ? "#047857" : "var(--border-default)"}`,
                    bgcolor: captured[step.n] ? "color-mix(in srgb, #10b981 8%, transparent)" : "transparent",
                  }}
                >
                  <Icon
                    icon={captured[step.n] ? "mdi:check-circle" : step.capture.medium === "video" ? "mdi:video-outline" : "mdi:camera-outline"}
                    width={20}
                    color={captured[step.n] ? "#047857" : "var(--text-secondary)"}
                  />
                  <Box sx={{ textAlign: "left", minWidth: 0 }}>
                    <Typography sx={{ fontSize: "0.84rem", fontWeight: 800 }}>
                      {captured[step.n] ? "Captured" : `Take the ${step.capture.medium}`}
                    </Typography>
                    <Typography sx={{ fontSize: "0.76rem", color: "var(--text-secondary)" }}>
                      {step.capture.label}
                    </Typography>
                  </Box>
                </ButtonBase>
              )}
            </PracticalCard>

            {/* Steps already behind, collapsed. Available to re-read without
                being in the way, which matters when step 7 refers to step 3. */}
            {cursor > 0 && (
              <PracticalCard title="Steps completed" icon="mdi:history" accent="#64748b">
                <Stack spacing={0.5}>
                  {lab.steps.slice(0, cursor).map((s) => (
                    <Stack key={s.n} direction="row" alignItems="center" spacing={0.9}>
                      <Icon icon="mdi:check-circle" width={15} color="#047857" />
                      <Typography sx={{ fontSize: "0.81rem", fontWeight: 600, flex: 1, minWidth: 0 }}>
                        {s.title}
                      </Typography>
                      {readings[s.n] && (
                        <Typography
                          sx={{
                            fontSize: "0.76rem",
                            fontWeight: 800,
                            color: "var(--text-secondary)",
                            fontVariantNumeric: "tabular-nums",
                          }}
                        >
                          {readings[s.n]} {s.reading?.unit}
                        </Typography>
                      )}
                    </Stack>
                  ))}
                </Stack>
              </PracticalCard>
            )}
          </>
        )}

        {result && (
          <PracticalCard title="The run, step by step" icon="mdi:clipboard-list-outline" accent="#0369a1">
            <Stack spacing={0.5}>
              {lab.steps.map((s) => (
                <Stack key={s.n} direction="row" alignItems="center" spacing={0.9}>
                  <Icon
                    icon={confirmed[s.n] ? "mdi:check-circle" : "mdi:circle-outline"}
                    width={15}
                    color={confirmed[s.n] ? "#047857" : "#94a3b8"}
                  />
                  <Typography
                    sx={{
                      fontSize: "0.81rem",
                      fontWeight: 600,
                      flex: 1,
                      minWidth: 0,
                      opacity: confirmed[s.n] ? 1 : 0.6,
                    }}
                  >
                    {s.title}
                  </Typography>
                  {s.hazard?.level === "danger" && (
                    <Icon
                      icon={hazardOk[s.n] ? "mdi:shield-check" : "mdi:shield-alert"}
                      width={15}
                      color={hazardOk[s.n] ? "#047857" : "#be123c"}
                    />
                  )}
                </Stack>
              ))}
            </Stack>
          </PracticalCard>
        )}
      </PracticalShell>
    </MainLayout>
  );
}
