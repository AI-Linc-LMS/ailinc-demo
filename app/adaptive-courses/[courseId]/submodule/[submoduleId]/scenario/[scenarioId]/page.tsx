"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { MainLayout } from "@/components/layout/MainLayout";
import { useToast } from "@/components/common/Toast";
import { PracticalShell, PracticalCard, PracticalProse } from "@/components/practicals/PracticalShell";
import { ResultPanel } from "@/components/practicals/ResultPanel";
import {
  practicalsService,
  type ScenarioDetail,
  type ScenarioResult,
} from "@/lib/services/practicals.service";

/**
 * The scenario player: a branching decision run.
 *
 * What this measures that a quiz cannot is judgement under cost. A multiple
 * choice question about a no-cool call has one right answer and three wrong
 * ones, all free. A real call has several defensible first moves, each of which
 * spends time, money or goodwill, and the skill is choosing the cheapest path
 * that still ends with a fixed unit and a customer who trusts you.
 *
 * So three things are modelled rather than one.
 *
 * The run is scored over its whole path. Recovering well from a bad second move
 * is worth marks, and the player sees the consequence of each choice before
 * making the next one, which is the only way a branch teaches anything.
 *
 * Cost accumulates visibly. The tally in the header is the lesson: a learner
 * who reaches the right diagnosis having spent two hours and replaced a working
 * capacitor has not done the job well, and no single-answer format can say so.
 *
 * A safety or compliance breach caps the run. On a live job the one wrong move
 * is not averaged away by five right ones, and a grading model that lets it be
 * teaches exactly the wrong reflex.
 */

const ENDING_TONE = {
  ideal: { color: "#047857", soft: "#ecfdf5", icon: "mdi:check-decagram", word: "Best outcome" },
  acceptable: { color: "#b45309", soft: "#fffbeb", icon: "mdi:alert-circle-outline", word: "Acceptable" },
  poor: { color: "#be123c", soft: "#fff1f2", icon: "mdi:close-octagon-outline", word: "Poor outcome" },
} as const;

export default function ScenarioPlayerPage() {
  const params = useParams();
  const { showToast } = useToast();
  const courseId = Number(params.courseId);
  const submoduleId = Number(params.submoduleId);
  const scenarioId = Number(params.scenarioId);

  const [scenario, setScenario] = useState<ScenarioDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [nodeId, setNodeId] = useState<string | null>(null);
  /** The choices made, in order. This is the submission. */
  const [path, setPath] = useState<Array<{ node: string; choice: string }>>([]);
  const [result, setResult] = useState<ScenarioResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  /** Running cost, as the server tallies it. */
  const [spent, setSpent] = useState({ minutes: 0, rupees: 0 });
  /** What the previous choice led to, shown above the next question. */
  const [lastOutcome, setLastOutcome] = useState<{ text: string; violation?: string } | null>(null);

  useEffect(() => {
    if (!Number.isFinite(scenarioId)) return;
    let cancelled = false;
    practicalsService
      .getScenario(courseId, submoduleId, scenarioId)
      .then((d) => {
        if (cancelled) return;
        setScenario(d);
        setNodeId(d.start);
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "Could not load this scenario.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [courseId, submoduleId, scenarioId]);

  const node = useMemo(
    () => scenario?.nodes.find((n) => n.id === nodeId) ?? null,
    [scenario, nodeId],
  );

  /**
   * Advance one step.
   *
   * The destination is the server's answer, not the client's: the payload this
   * page holds carries no `next` on any choice, so the branch structure is not
   * sitting in the page for anyone to read ahead. When the server says the run
   * is over it hands back the graded result in the same response.
   */
  const choose = async (choiceId: string) => {
    if (!scenario || !node) return;
    const nextPath = [...path, { node: node.id, choice: choiceId }];
    setSubmitting(true);
    try {
      const step = await practicalsService.advanceScenario(courseId, submoduleId, scenarioId, {
        path: nextPath,
      });
      setPath(nextPath);
      setSpent({ minutes: step.minutes_spent, rupees: step.rupees_spent });
      // The consequence lands before the next question does. A branch that
      // moves straight on teaches nothing, because the learner never finds out
      // what their choice did.
      setLastOutcome({ text: step.outcome, violation: step.violation });
      if (step.violation) showToast(step.violation, "warning");
      if (step.next_node) setNodeId(step.next_node);
      if (step.result) {
        setResult(step.result);
        showToast(
          step.result.headline,
          step.result.verdict === "ideal" ? "success" : step.result.verdict === "poor" ? "warning" : "info",
        );
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      showToast(e instanceof Error ? e.message : "Could not record that decision.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const restart = () => {
    if (!scenario) return;
    setPath([]);
    setResult(null);
    setSpent({ minutes: 0, rupees: 0 });
    setLastOutcome(null);
    setNodeId(scenario.start);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <MainLayout fullWidthContent>
        <Box sx={{ py: 10, textAlign: "center", color: "var(--text-secondary)" }}>
          <Icon icon="mdi:arrow-decision" width={34} />
          <Typography sx={{ mt: 1, fontWeight: 700 }}>Setting the scene…</Typography>
        </Box>
      </MainLayout>
    );
  }

  if (error || !scenario) {
    return (
      <MainLayout fullWidthContent>
        <Typography sx={{ color: "#ef4444", fontWeight: 700, textAlign: "center", py: 8 }}>
          {error ?? "Scenario not found."}
        </Typography>
      </MainLayout>
    );
  }

  const spentMinutes = result?.minutes_spent ?? spent.minutes;
  const spentRupees = result?.rupees_spent ?? spent.rupees;

  return (
    <MainLayout fullWidthContent>
      <PracticalShell
        kind="scenario"
        courseId={courseId}
        submoduleId={submoduleId}
        title={scenario.title}
        subtitle={scenario.blurb}
        pills={[
          { icon: "mdi:account-hard-hat", label: scenario.role },
          { icon: "mdi:arrow-decision-outline", label: `${scenario.nodes.filter((n) => !n.ending).length} decisions` },
          { icon: "mdi:counter", label: `${scenario.max_score} marks` },
          { icon: "mdi:clock-outline", label: `~${scenario.minutes} min` },
        ]}
        rightSlot={
          <Stack direction="row" spacing={1.5}>
            <Box sx={{ textAlign: "right" }}>
              <Typography sx={{ fontWeight: 800, fontSize: "1.2rem", lineHeight: 1 }}>
                {path.length}
              </Typography>
              <Typography sx={{ fontSize: "0.68rem", opacity: 0.82 }}>decisions made</Typography>
            </Box>
            {(spentMinutes > 0 || spentRupees > 0) && (
              <Box sx={{ textAlign: "right" }}>
                <Typography sx={{ fontWeight: 800, fontSize: "1.2rem", lineHeight: 1 }}>
                  {spentMinutes > 0 ? `${spentMinutes}m` : `₹${spentRupees}`}
                </Typography>
                <Typography sx={{ fontSize: "0.68rem", opacity: 0.82 }}>
                  {spentMinutes > 0 ? "on the job" : "spent"}
                </Typography>
              </Box>
            )}
          </Stack>
        }
        footer={
          result ? (
            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <ButtonBase
                onClick={restart}
                sx={{
                  px: 2.5,
                  py: 1.1,
                  borderRadius: 2.5,
                  fontWeight: 800,
                  fontSize: "0.85rem",
                  color: "white",
                  background: "linear-gradient(135deg, #b45309 0%, #92400e 100%)",
                }}
              >
                <Icon icon="mdi:restart" width={17} style={{ marginRight: 6 }} />
                Run it again
              </ButtonBase>
            </Stack>
          ) : undefined
        }
      >
        {result && (
          <ResultPanel result={result}>
            <Stack direction="row" flexWrap="wrap" sx={{ gap: 0.75, mt: 1.25 }}>
              <Tally icon="mdi:clock-outline" label="time on the job" value={`${result.minutes_spent} min`} />
              {result.rupees_spent > 0 && (
                <Tally icon="mdi:currency-inr" label="parts and costs" value={`₹${result.rupees_spent.toLocaleString("en-IN")}`} />
              )}
              <Tally
                icon="mdi:arrow-decision-outline"
                label="decisions"
                value={`${result.steps.length}`}
              />
              {result.violations.length > 0 && (
                <Tally
                  icon="mdi:shield-alert-outline"
                  label="rule breaches"
                  value={`${result.violations.length}`}
                  tone="#be123c"
                />
              )}
            </Stack>
          </ResultPanel>
        )}

        {/* ------------------------------------------------------ the scene */}
        {node && (
          <PracticalCard
            title={node.ending ? ENDING_TONE[node.ending.verdict].word : "The situation"}
            icon={node.ending ? ENDING_TONE[node.ending.verdict].icon : "mdi:map-marker-radius-outline"}
            accent={node.ending ? ENDING_TONE[node.ending.verdict].color : "#b45309"}
          >
            <PracticalProse html={node.situation_html} />

            {/* Dialogue scenarios put the other person's line in their own
                voice, with the translation underneath. A German roleplay read
                as narration loses the thing it is practising. */}
            {node.speaker && node.speaker_line && (
              <Stack
                direction="row"
                spacing={1.25}
                sx={{
                  mt: 1.75,
                  p: 1.5,
                  borderRadius: 3,
                  bgcolor: "color-mix(in srgb, #b45309 8%, transparent)",
                  border: "1px solid color-mix(in srgb, #b45309 25%, transparent)",
                }}
              >
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    flexShrink: 0,
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    bgcolor: "#b45309",
                    color: "white",
                  }}
                >
                  <Icon icon="mdi:account-voice" width={18} />
                </Box>
                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontSize: "0.65rem",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.07em",
                      color: "#b45309",
                    }}
                  >
                    {node.speaker}
                  </Typography>
                  <Typography sx={{ fontSize: "1rem", fontWeight: 700, lineHeight: 1.45, mt: 0.2 }}>
                    {node.speaker_line}
                  </Typography>
                </Box>
              </Stack>
            )}

            {node.ending && (
              <Box sx={{ mt: 1.75, pt: 1.75, borderTop: "1px solid var(--border-default)" }}>
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: "1.02rem",
                    mb: 0.75,
                    color: ENDING_TONE[node.ending.verdict].color,
                  }}
                >
                  {node.ending.title}
                </Typography>
                <PracticalProse html={node.ending.debrief_html} />
              </Box>
            )}
          </PracticalCard>
        )}

        {/* The consequence of the previous choice, above the next question.
            Without this the run is four unrelated multiple-choice items: the
            learner has to see what their decision did before they make the
            next one, because that is the only part that teaches. */}
        {lastOutcome && !result && (
          <Stack
            direction="row"
            spacing={1.25}
            sx={{
              mb: 2,
              p: 1.5,
              borderRadius: 3,
              bgcolor: lastOutcome.violation
                ? "color-mix(in srgb, #be123c 8%, transparent)"
                : "color-mix(in srgb, #0369a1 7%, transparent)",
              border: `1px solid color-mix(in srgb, ${lastOutcome.violation ? "#be123c" : "#0369a1"} 28%, transparent)`,
            }}
          >
            <Icon
              icon={lastOutcome.violation ? "mdi:shield-alert" : "mdi:arrow-right-bottom"}
              width={18}
              color={lastOutcome.violation ? "#be123c" : "#0369a1"}
              style={{ flexShrink: 0, marginTop: 2 }}
            />
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: "0.63rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: lastOutcome.violation ? "#be123c" : "#0369a1",
                }}
              >
                What that led to
              </Typography>
              <Typography sx={{ fontSize: "0.88rem", lineHeight: 1.55, mt: 0.2 }}>
                {lastOutcome.text}
              </Typography>
              {lastOutcome.violation && (
                <Typography sx={{ fontSize: "0.82rem", fontWeight: 800, color: "#be123c", mt: 0.5 }}>
                  {lastOutcome.violation}
                </Typography>
              )}
            </Box>
          </Stack>
        )}

        {/* ----------------------------------------------------- the choices */}
        {node && !node.ending && node.choices.length > 0 && (
          <PracticalCard title={node.prompt} icon="mdi:help-circle-outline" accent="#b45309">
            <Stack spacing={1}>
              {node.choices.map((c, i) => (
                <ButtonBase
                  key={c.id}
                  disabled={submitting}
                  onClick={() => choose(c.id)}
                  sx={{
                    justifyContent: "flex-start",
                    textAlign: "left",
                    gap: 1.25,
                    p: 1.4,
                    borderRadius: 3,
                    border: "1px solid var(--border-default)",
                    opacity: submitting ? 0.55 : 1,
                    transition: "border-color .15s, background-color .15s, transform .1s",
                    "&:hover": {
                      borderColor: "#b45309",
                      bgcolor: "color-mix(in srgb, #b45309 6%, transparent)",
                    },
                    "&:active": { transform: "scale(0.995)" },
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
                      border: "1.5px solid var(--border-default)",
                      fontWeight: 800,
                      fontSize: "0.76rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {String.fromCharCode(65 + i)}
                  </Box>
                  <Typography sx={{ fontSize: "0.9rem", fontWeight: 600, lineHeight: 1.5 }}>
                    {c.label}
                  </Typography>
                </ButtonBase>
              ))}
            </Stack>
            <Typography sx={{ fontSize: "0.74rem", color: "var(--text-secondary)", mt: 1.25 }}>
              There is usually more than one defensible move. You are being marked on the whole
              path, including how well you recover from a bad one.
            </Typography>
          </PracticalCard>
        )}

        {/* ------------------------------------------------------ the debrief */}
        {result && (
          <PracticalCard title="Every decision, and what it cost" icon="mdi:timeline-text-outline" accent="#b45309">
            <Stack spacing={0}>
              {result.steps.map((s, i) => {
                const good = s.delta > 0;
                const colour = s.violation ? "#be123c" : good ? "#047857" : s.delta === 0 ? "#64748b" : "#b45309";
                const last = i === result.steps.length - 1;
                return (
                  <Stack key={`${s.node}:${i}`} direction="row" spacing={1.5}>
                    {/* The spine, so the path reads as a sequence rather than
                        as four unrelated verdicts. */}
                    <Stack alignItems="center" sx={{ flexShrink: 0, pt: 0.4 }}>
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          display: "grid",
                          placeItems: "center",
                          bgcolor: colour,
                          color: "white",
                          fontSize: "0.68rem",
                          fontWeight: 800,
                        }}
                      >
                        {i + 1}
                      </Box>
                      {!last && (
                        <Box sx={{ width: 2, flex: 1, minHeight: 28, bgcolor: "var(--border-default)", my: 0.4 }} />
                      )}
                    </Stack>
                    <Box sx={{ minWidth: 0, pb: last ? 0 : 2 }}>
                      <Typography sx={{ fontSize: "0.72rem", color: "var(--text-secondary)", fontWeight: 600 }}>
                        {s.prompt}
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={0.75} sx={{ mt: 0.3, flexWrap: "wrap" }}>
                        <Typography sx={{ fontSize: "0.88rem", fontWeight: 800 }}>{s.chose}</Typography>
                        <Box
                          sx={{
                            px: 0.75,
                            py: 0.1,
                            borderRadius: 999,
                            fontSize: "0.68rem",
                            fontWeight: 800,
                            bgcolor: `color-mix(in srgb, ${colour} 14%, transparent)`,
                            color: colour,
                          }}
                        >
                          {s.delta > 0 ? `+${s.delta}` : s.delta}
                        </Box>
                        {s.cost?.minutes ? (
                          <Typography sx={{ fontSize: "0.7rem", color: "var(--text-secondary)" }}>
                            {s.cost.minutes} min
                          </Typography>
                        ) : null}
                        {s.cost?.rupees ? (
                          <Typography sx={{ fontSize: "0.7rem", color: "var(--text-secondary)" }}>
                            ₹{s.cost.rupees.toLocaleString("en-IN")}
                          </Typography>
                        ) : null}
                      </Stack>
                      <Typography sx={{ fontSize: "0.83rem", lineHeight: 1.55, mt: 0.4 }}>
                        {s.outcome}
                      </Typography>
                      {s.violation && (
                        <Stack
                          direction="row"
                          spacing={0.75}
                          sx={{
                            mt: 0.75,
                            p: 0.9,
                            borderRadius: 2,
                            bgcolor: "color-mix(in srgb, #be123c 9%, transparent)",
                            border: "1px solid color-mix(in srgb, #be123c 30%, transparent)",
                          }}
                        >
                          <Icon icon="mdi:shield-alert" width={15} color="#be123c" style={{ flexShrink: 0, marginTop: 1 }} />
                          <Typography sx={{ fontSize: "0.79rem", fontWeight: 700, color: "#be123c", lineHeight: 1.45 }}>
                            {s.violation}
                          </Typography>
                        </Stack>
                      )}
                      {/* Naming the better move at the exact point of divergence
                          is the feedback. A final score tells a learner they
                          went wrong; this tells them where. */}
                      {s.best && (
                        <Stack direction="row" spacing={0.75} sx={{ mt: 0.6 }}>
                          <Icon icon="mdi:lightbulb-on-outline" width={14} color="#0369a1" style={{ flexShrink: 0, marginTop: 2 }} />
                          <Typography sx={{ fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                            A stronger move here: <strong>{s.best}</strong>
                          </Typography>
                        </Stack>
                      )}
                    </Box>
                  </Stack>
                );
              })}
            </Stack>
          </PracticalCard>
        )}
      </PracticalShell>
    </MainLayout>
  );
}

function Tally({
  icon,
  label,
  value,
  tone,
}: {
  icon: string;
  label: string;
  value: string;
  tone?: string;
}) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={0.65}
      sx={{
        px: 1.15,
        py: 0.5,
        borderRadius: 999,
        bgcolor: `color-mix(in srgb, ${tone ?? "#64748b"} 11%, transparent)`,
        color: tone ?? "var(--text-primary)",
      }}
    >
      <Icon icon={icon} width={14} />
      <Typography sx={{ fontSize: "0.78rem", fontWeight: 800 }}>{value}</Typography>
      <Typography sx={{ fontSize: "0.72rem", opacity: 0.75 }}>{label}</Typography>
    </Stack>
  );
}
