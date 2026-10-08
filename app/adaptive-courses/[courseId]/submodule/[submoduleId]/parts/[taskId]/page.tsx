"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { MainLayout } from "@/components/layout/MainLayout";
import { useToast } from "@/components/common/Toast";
import { PracticalShell, PracticalCard, PracticalProse } from "@/components/practicals/PracticalShell";
import { ResultPanel } from "@/components/practicals/ResultPanel";
import { DIAGRAMS } from "@/components/practicals/diagrams";
import {
  practicalsService,
  type PartTaskDetail,
  type PartTaskResult,
} from "@/lib/services/practicals.service";

/**
 * The part identification player.
 *
 * Three stages, because naming a part, fitting it in the right order and
 * connecting it correctly are three separate competencies that fail
 * independently. A learner can name every component of a quadcopter and still
 * mount the flight controller backwards, and a technician can identify a
 * capacitor on sight and still put the start winding on the run terminal.
 *
 * The label bank is longer than the answer list and includes the parts learners
 * habitually confuse with the right ones. A bank that is exactly the answer set
 * turns the last two hotspots into free marks by elimination, which is the
 * difference between assessing recognition and assessing patience.
 *
 * The feedback names what they picked instead. "Wrong" teaches nothing. "You
 * picked the contactor; a contactor switches the load and has a coil, a relay
 * is the smaller one on the board" is the sentence that survives to the next
 * service call.
 */

type Stage = "label" | "sequence" | "wiring";

export default function PartTaskPlayerPage() {
  const params = useParams();
  const { showToast } = useToast();
  const courseId = Number(params.courseId);
  const submoduleId = Number(params.submoduleId);
  const taskId = Number(params.taskId);

  const [task, setTask] = useState<PartTaskDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PartTaskResult | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [stage, setStage] = useState<Stage>("label");
  /** hotspot key -> chosen label */
  const [labels, setLabels] = useState<Record<string, string>>({});
  const [activeSpot, setActiveSpot] = useState<string | null>(null);
  /** the learner's assembly order, as keys */
  const [order, setOrder] = useState<string[]>([]);
  /** terminal -> lead */
  const [wiring, setWiring] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!Number.isFinite(taskId)) return;
    let cancelled = false;
    practicalsService
      .getPartTask(courseId, submoduleId, taskId)
      .then((d) => {
        if (cancelled) return;
        setTask(d);
        setOrder((d.sequence ?? []).map((s) => s.key));
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "Could not load this task.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [courseId, submoduleId, taskId]);

  const Diagram = task ? DIAGRAMS[task.diagram] : undefined;

  const stages = useMemo<Stage[]>(() => {
    if (!task) return ["label"];
    return ["label", ...(task.sequence ? (["sequence"] as Stage[]) : []), ...(task.wiring ? (["wiring"] as Stage[]) : [])];
  }, [task]);

  const namedCount = task ? task.hotspots.filter((h) => labels[h.key]).length : 0;
  const allNamed = !!task && namedCount === task.hotspots.length;

  /** Labels already spent, so the bank cannot be used twice. */
  const used = useMemo(() => new Set(Object.values(labels)), [labels]);

  const assign = (label: string) => {
    if (!activeSpot) return;
    setLabels((p) => {
      const next = { ...p };
      // Taking a label that is already placed moves it rather than duplicating
      // it, which is what a learner means when they drag it somewhere new.
      for (const [k, v] of Object.entries(next)) if (v === label) delete next[k];
      next[activeSpot] = label;
      return next;
    });
    const remaining = task?.hotspots.find((h) => h.key !== activeSpot && !labels[h.key]);
    setActiveSpot(remaining?.key ?? null);
  };

  const move = (i: number, dir: -1 | 1) => {
    setOrder((prev) => {
      const next = [...prev];
      const j = i + dir;
      if (j < 0 || j >= next.length) return prev;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  };

  const submit = async () => {
    if (!task) return;
    setSubmitting(true);
    try {
      const r = await practicalsService.submitPartTask(courseId, submoduleId, taskId, {
        labels,
        sequence: task.sequence ? order : undefined,
        wiring: task.wiring ? wiring : undefined,
      });
      setResult(r);
      showToast(r.headline, (r.score ?? 0) / r.max_score >= 0.7 ? "success" : "info");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      showToast(e instanceof Error ? e.message : "Could not mark this.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const retry = () => {
    setResult(null);
    setLabels({});
    setWiring({});
    setStage("label");
    setActiveSpot(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <MainLayout fullWidthContent>
        <Box sx={{ py: 10, textAlign: "center", color: "var(--text-secondary)" }}>
          <Icon icon="mdi:vector-polyline" width={34} />
          <Typography sx={{ mt: 1, fontWeight: 700 }}>Drawing the diagram…</Typography>
        </Box>
      </MainLayout>
    );
  }

  if (error || !task) {
    return (
      <MainLayout fullWidthContent>
        <Typography sx={{ color: "#ef4444", fontWeight: 700, textAlign: "center", py: 8 }}>
          {error ?? "Task not found."}
        </Typography>
      </MainLayout>
    );
  }

  const stageIdx = stages.indexOf(stage);
  const lastStage = stageIdx === stages.length - 1;
  const wiringDone = !task.wiring || task.wiring.terminals.every((t) => wiring[t]);

  return (
    <MainLayout fullWidthContent>
      <PracticalShell
        kind="partid"
        courseId={courseId}
        submoduleId={submoduleId}
        title={task.title}
        subtitle="Name each marked point, then fit the parts in the order they go on."
        pills={[
          { icon: "mdi:map-marker-outline", label: `${task.hotspots.length} parts` },
          ...(task.sequence ? [{ icon: "mdi:sort-numeric-variant", label: "assembly order" }] : []),
          ...(task.wiring ? [{ icon: "mdi:connection", label: "terminal matching" }] : []),
          { icon: "mdi:counter", label: `${task.max_score} marks` },
        ]}
        rightSlot={
          !result ? (
            <Box sx={{ textAlign: "right" }}>
              <Typography sx={{ fontWeight: 800, fontSize: "1.3rem", lineHeight: 1 }}>
                {namedCount}
                <Box component="span" sx={{ fontSize: "0.88rem", opacity: 0.7 }}>
                  /{task.hotspots.length}
                </Box>
              </Typography>
              <Typography sx={{ fontSize: "0.69rem", opacity: 0.82 }}>named</Typography>
            </Box>
          ) : undefined
        }
        footer={
          result ? (
            <Stack direction="row" justifyContent="flex-end">
              <ButtonBase
                onClick={retry}
                sx={{
                  px: 2.5,
                  py: 1.1,
                  borderRadius: 2.5,
                  fontWeight: 800,
                  fontSize: "0.85rem",
                  border: "1px solid var(--border-default)",
                }}
              >
                <Icon icon="mdi:refresh" width={17} style={{ marginRight: 6 }} />
                Try again
              </ButtonBase>
            </Stack>
          ) : (
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
              <Typography sx={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: 600 }}>
                Stage {stageIdx + 1} of {stages.length}
              </Typography>
              {lastStage ? (
                <ButtonBase
                  disabled={!allNamed || !wiringDone || submitting}
                  onClick={submit}
                  sx={{
                    px: 2.75,
                    py: 1.15,
                    borderRadius: 2.5,
                    fontWeight: 800,
                    fontSize: "0.88rem",
                    color: "white",
                    background: "linear-gradient(135deg, #4338ca 0%, #3730a3 100%)",
                    opacity: allNamed && wiringDone && !submitting ? 1 : 0.45,
                  }}
                >
                  <Icon icon="mdi:check-decagram-outline" width={18} style={{ marginRight: 7 }} />
                  {submitting ? "Marking…" : "Check my answers"}
                </ButtonBase>
              ) : (
                <ButtonBase
                  disabled={stage === "label" && !allNamed}
                  onClick={() => setStage(stages[stageIdx + 1])}
                  sx={{
                    px: 2.75,
                    py: 1.15,
                    borderRadius: 2.5,
                    fontWeight: 800,
                    fontSize: "0.88rem",
                    color: "white",
                    background: "linear-gradient(135deg, #4338ca 0%, #3730a3 100%)",
                    opacity: stage === "label" && !allNamed ? 0.45 : 1,
                  }}
                >
                  {stage === "label" && !allNamed ? `${task.hotspots.length - namedCount} still to name` : "Next stage"}
                  <Icon icon="mdi:arrow-right" width={18} style={{ marginLeft: 7 }} />
                </ButtonBase>
              )}
            </Stack>
          )
        }
      >
        {result && (
          <ResultPanel result={result}>
            {/* Naming the confusion is the teaching. */}
            {result.labels.some((l) => !l.correct) && (
              <Stack spacing={0.75} sx={{ mt: 1.25 }}>
                {result.labels
                  .filter((l) => !l.correct)
                  .map((l) => (
                    <Box
                      key={l.key}
                      sx={{
                        p: 1.15,
                        borderRadius: 2,
                        bgcolor: "color-mix(in srgb, #ef4444 7%, transparent)",
                        border: "1px solid color-mix(in srgb, #ef4444 26%, transparent)",
                      }}
                    >
                      <Typography sx={{ fontSize: "0.82rem", fontWeight: 800, color: "#be123c" }}>
                        Point {l.key.toUpperCase()}: that is the {l.expected.toLowerCase()}
                        {l.given ? `, not the ${l.given.toLowerCase()}` : ""}
                      </Typography>
                      <Typography sx={{ fontSize: "0.82rem", lineHeight: 1.55, mt: 0.25 }}>
                        {l.does}
                      </Typography>
                      {l.confused_with && (
                        <Typography
                          sx={{ fontSize: "0.8rem", lineHeight: 1.5, mt: 0.4, color: "var(--text-secondary)" }}
                        >
                          <strong>Telling them apart:</strong> {l.confused_with}
                        </Typography>
                      )}
                    </Box>
                  ))}
              </Stack>
            )}
            {result.sequence && !result.sequence.correct && (
              <Box
                sx={{
                  mt: 1.25,
                  p: 1.25,
                  borderRadius: 2,
                  bgcolor: "color-mix(in srgb, #f59e0b 8%, transparent)",
                  border: "1px solid color-mix(in srgb, #f59e0b 28%, transparent)",
                }}
              >
                <Typography sx={{ fontSize: "0.82rem", fontWeight: 800, color: "#b45309", mb: 0.6 }}>
                  The order breaks at position {(result.sequence.first_wrong_at ?? 0) + 1}
                </Typography>
                <Stack spacing={0.4}>
                  {result.sequence.expected.map((e, i) => (
                    <Stack key={i} direction="row" spacing={0.75}>
                      <Typography
                        sx={{ fontSize: "0.78rem", fontWeight: 800, color: "#b45309", flexShrink: 0, width: 16 }}
                      >
                        {i + 1}
                      </Typography>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography sx={{ fontSize: "0.81rem", fontWeight: 700 }}>{e.label}</Typography>
                        <Typography sx={{ fontSize: "0.79rem", color: "var(--text-secondary)", lineHeight: 1.45 }}>
                          {e.why}
                        </Typography>
                      </Box>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            )}
          </ResultPanel>
        )}

        <PracticalCard title="The task" icon="mdi:text-box-outline" accent="#4338ca">
          <PracticalProse html={task.brief_html} />
        </PracticalCard>

        {/* ---------------------------------------------------- the diagram */}
        <PracticalCard
          title="The diagram"
          icon="mdi:drawing"
          accent="#4338ca"
          dense
          action={
            !result && stage === "label" ? (
              <Typography sx={{ fontSize: "0.72rem", color: "var(--text-secondary)" }}>
                {activeSpot ? "now pick its name below" : "tap a numbered point"}
              </Typography>
            ) : undefined
          }
        >
          <Box sx={{ position: "relative" }}>
            {Diagram ? <Diagram /> : null}

            {task.hotspots.map((h, i) => {
              const given = labels[h.key];
              const verdict = result?.labels.find((l) => l.key === h.key);
              const active = activeSpot === h.key;
              const colour = verdict
                ? verdict.correct
                  ? "#047857"
                  : "#be123c"
                : given
                  ? "#4338ca"
                  : active
                    ? "#4338ca"
                    : "#64748b";
              return (
                <Box key={h.key} sx={{ position: "absolute", left: `${h.x}%`, top: `${h.y}%` }}>
                  <ButtonBase
                    disabled={!!result || stage !== "label"}
                    onClick={() => setActiveSpot(active ? null : h.key)}
                    sx={{
                      transform: "translate(-50%, -50%)",
                      width: active ? 34 : 28,
                      height: active ? 34 : 28,
                      borderRadius: "50%",
                      fontWeight: 800,
                      fontSize: "0.78rem",
                      color: "white",
                      bgcolor: colour,
                      border: "2.5px solid var(--card-bg)",
                      boxShadow: active
                        ? `0 0 0 5px color-mix(in srgb, ${colour} 28%, transparent)`
                        : "0 2px 8px rgba(0,0,0,0.25)",
                      transition: "all .15s",
                    }}
                  >
                    {verdict ? (
                      <Icon icon={verdict.correct ? "mdi:check" : "mdi:close"} width={17} />
                    ) : (
                      i + 1
                    )}
                  </ButtonBase>

                  {/* The placed label sits by its point, so the diagram reads
                      as an annotated drawing rather than a quiz with numbers. */}
                  {given && (
                    <Typography
                      sx={{
                        position: "absolute",
                        left: "50%",
                        top: "100%",
                        transform: "translate(-50%, 6px)",
                        px: 0.7,
                        py: 0.2,
                        borderRadius: 1.5,
                        whiteSpace: "nowrap",
                        fontSize: "0.68rem",
                        fontWeight: 800,
                        color: "white",
                        bgcolor: colour,
                        pointerEvents: "none",
                      }}
                    >
                      {given}
                    </Typography>
                  )}
                </Box>
              );
            })}
          </Box>
        </PracticalCard>

        {/* -------------------------------------------------- the label bank */}
        {!result && stage === "label" && (
          <PracticalCard title="The parts" icon="mdi:label-multiple-outline" accent="#4338ca">
            <Typography sx={{ fontSize: "0.8rem", color: "var(--text-secondary)", mb: 1.25 }}>
              There are more names here than points on the diagram, and the extras are the parts
              these are most often mistaken for. Elimination will not finish this for you.
            </Typography>
            <Stack direction="row" flexWrap="wrap" sx={{ gap: 0.75 }}>
              {task.choices.map((c) => {
                const spent = used.has(c);
                return (
                  <ButtonBase
                    key={c}
                    disabled={!activeSpot && !spent}
                    onClick={() => assign(c)}
                    sx={{
                      px: 1.3,
                      py: 0.7,
                      borderRadius: 2,
                      fontSize: "0.83rem",
                      fontWeight: 700,
                      border: `1px solid ${spent ? "#4338ca" : "var(--border-default)"}`,
                      bgcolor: spent ? "color-mix(in srgb, #4338ca 10%, transparent)" : "transparent",
                      color: spent ? "#4338ca" : "var(--text-primary)",
                      opacity: !activeSpot && !spent ? 0.5 : 1,
                    }}
                  >
                    {spent && <Icon icon="mdi:check" width={14} style={{ marginRight: 5 }} />}
                    {c}
                  </ButtonBase>
                );
              })}
            </Stack>
          </PracticalCard>
        )}

        {/* ------------------------------------------------ assembly order */}
        {!result && stage === "sequence" && task.sequence && (
          <PracticalCard title="Put them in the order they are fitted" icon="mdi:sort-numeric-variant" accent="#4338ca">
            <Typography sx={{ fontSize: "0.8rem", color: "var(--text-secondary)", mb: 1.25 }}>
              Order is not a preference. Some of these cannot physically be reached once another is
              in, and one of them has to be tested before the next goes on top of it.
            </Typography>
            <Stack spacing={0.6}>
              {order.map((key, i) => {
                const item = task.sequence?.find((s) => s.key === key);
                return (
                  <Stack
                    key={key}
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{
                      p: 1,
                      borderRadius: 2.5,
                      border: "1px solid var(--border-default)",
                      bgcolor: "var(--card-bg)",
                    }}
                  >
                    <Box
                      sx={{
                        width: 26,
                        height: 26,
                        flexShrink: 0,
                        borderRadius: "50%",
                        display: "grid",
                        placeItems: "center",
                        bgcolor: "color-mix(in srgb, #4338ca 13%, transparent)",
                        color: "#4338ca",
                        fontWeight: 800,
                        fontSize: "0.76rem",
                      }}
                    >
                      {i + 1}
                    </Box>
                    <Typography sx={{ flex: 1, minWidth: 0, fontSize: "0.86rem", fontWeight: 700 }}>
                      {item?.label}
                    </Typography>
                    <Stack direction="row" spacing={0.3} sx={{ flexShrink: 0 }}>
                      <ButtonBase
                        onClick={() => move(i, -1)}
                        disabled={i === 0}
                        aria-label="Move earlier"
                        sx={{
                          width: 30,
                          height: 30,
                          borderRadius: 1.5,
                          border: "1px solid var(--border-default)",
                          opacity: i === 0 ? 0.3 : 1,
                        }}
                      >
                        <Icon icon="mdi:chevron-up" width={18} />
                      </ButtonBase>
                      <ButtonBase
                        onClick={() => move(i, 1)}
                        disabled={i === order.length - 1}
                        aria-label="Move later"
                        sx={{
                          width: 30,
                          height: 30,
                          borderRadius: 1.5,
                          border: "1px solid var(--border-default)",
                          opacity: i === order.length - 1 ? 0.3 : 1,
                        }}
                      >
                        <Icon icon="mdi:chevron-down" width={18} />
                      </ButtonBase>
                    </Stack>
                  </Stack>
                );
              })}
            </Stack>
          </PracticalCard>
        )}

        {/* ------------------------------------------------ terminal matching */}
        {!result && stage === "wiring" && task.wiring && (
          <PracticalCard title="Match each terminal to what lands on it" icon="mdi:connection" accent="#4338ca">
            <Stack spacing={1}>
              {task.wiring.terminals.map((t) => (
                <Stack
                  key={t}
                  direction={{ xs: "column", sm: "row" }}
                  alignItems={{ xs: "stretch", sm: "center" }}
                  spacing={1}
                  sx={{ p: 1.15, borderRadius: 2.5, border: "1px solid var(--border-default)" }}
                >
                  <Stack direction="row" alignItems="center" spacing={0.75} sx={{ minWidth: 150 }}>
                    <Box
                      sx={{
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        display: "grid",
                        placeItems: "center",
                        border: "2px solid #4338ca",
                        color: "#4338ca",
                        fontWeight: 800,
                        fontSize: "0.82rem",
                        flexShrink: 0,
                      }}
                    >
                      {t}
                    </Box>
                    <Icon icon="mdi:arrow-right" width={17} color="var(--text-secondary)" />
                  </Stack>
                  <Stack direction="row" flexWrap="wrap" sx={{ gap: 0.5, flex: 1 }}>
                    {task.wiring?.leads.map((l) => {
                      const picked = wiring[t] === l;
                      return (
                        <ButtonBase
                          key={l}
                          onClick={() => setWiring((p) => ({ ...p, [t]: l }))}
                          sx={{
                            px: 1.1,
                            py: 0.55,
                            borderRadius: 2,
                            fontSize: "0.79rem",
                            fontWeight: 700,
                            border: `1px solid ${picked ? "#4338ca" : "var(--border-default)"}`,
                            bgcolor: picked ? "color-mix(in srgb, #4338ca 11%, transparent)" : "transparent",
                            color: picked ? "#4338ca" : "var(--text-primary)",
                          }}
                        >
                          {l}
                        </ButtonBase>
                      );
                    })}
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </PracticalCard>
        )}

        {/* ------------------------------------------------- what each part does */}
        {result && (
          <PracticalCard title="What each part does" icon="mdi:book-open-variant" accent="#4338ca">
            <Stack spacing={0.75}>
              {result.labels.map((l) => (
                <Stack key={l.key} direction="row" spacing={1}>
                  <Icon
                    icon={l.correct ? "mdi:check-circle" : "mdi:information"}
                    width={16}
                    color={l.correct ? "#047857" : "#be123c"}
                    style={{ flexShrink: 0, marginTop: 2 }}
                  />
                  <Box sx={{ minWidth: 0 }}>
                    <Typography sx={{ fontSize: "0.84rem", fontWeight: 800 }}>{l.expected}</Typography>
                    <Typography sx={{ fontSize: "0.82rem", lineHeight: 1.55 }}>{l.does}</Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>
            {result.wiring && (
              <Stack spacing={0.5} sx={{ mt: 1.5, pt: 1.5, borderTop: "1px solid var(--border-default)" }}>
                {result.wiring.map((w) => (
                  <Stack key={w.from} direction="row" spacing={1}>
                    <Icon
                      icon={w.correct ? "mdi:check-circle" : "mdi:close-circle"}
                      width={15}
                      color={w.correct ? "#047857" : "#be123c"}
                      style={{ flexShrink: 0, marginTop: 2 }}
                    />
                    <Typography sx={{ fontSize: "0.82rem", lineHeight: 1.5 }}>
                      <strong>
                        {w.from} to {w.expected}
                      </strong>
                      {" "}
                      {w.note}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            )}
          </PracticalCard>
        )}
      </PracticalShell>
    </MainLayout>
  );
}
