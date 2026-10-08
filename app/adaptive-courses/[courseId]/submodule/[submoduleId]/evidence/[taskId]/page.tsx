"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { MainLayout } from "@/components/layout/MainLayout";
import { useToast } from "@/components/common/Toast";
import { PracticalShell, PracticalCard, PracticalProse } from "@/components/practicals/PracticalShell";
import { ResultPanel } from "@/components/practicals/ResultPanel";
import { RubricTable } from "@/components/practicals/RubricTable";
import { CaptureSlot, type CapturedFile } from "@/components/practicals/CaptureSlot";
import {
  practicalsService,
  type EvidenceDetail,
  type PracticalResult,
} from "@/lib/services/practicals.service";

/**
 * The evidence task: proof of work done with your hands.
 *
 * This is the primitive without which an air conditioning or a drone
 * qualification is not worth anything. Nobody has ever been able to tell whether
 * a technician can braze a sound joint by asking them four questions about
 * brazing, and an employer knows it. The only evidence that counts is the joint.
 *
 * Three things this surface has to get right.
 *
 * It must not claim a score. A browser cannot judge a brazed joint, so
 * submitting returns a queue position, a named assessor and a date. Showing a
 * number the instant the upload finishes would be inventing one, and a learner
 * who later watches that number change stops believing every other number on
 * the platform.
 *
 * The rubric is published before the work starts. A rubric a learner only meets
 * after being marked by it explains the grade but cannot improve the work, which
 * makes it a grading policy rather than teaching.
 *
 * The integrity requirements are named as what they are. These raise the cost of
 * submitting somebody else's photograph; they do not proctor anything, and the
 * product saying otherwise would be a lie a learner can disprove in an
 * afternoon.
 */

export default function EvidencePlayerPage() {
  const params = useParams();
  const { showToast } = useToast();
  const courseId = Number(params.courseId);
  const submoduleId = Number(params.submoduleId);
  const taskId = Number(params.taskId);

  const [task, setTask] = useState<EvidenceDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [files, setFiles] = useState<Record<string, CapturedFile>>({});
  const [note, setNote] = useState("");
  const [integrityOk, setIntegrityOk] = useState<Record<number, boolean>>({});
  const [result, setResult] = useState<PracticalResult | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!Number.isFinite(taskId)) return;
    let cancelled = false;
    practicalsService
      .getEvidenceTask(courseId, submoduleId, taskId)
      .then((d) => {
        if (!cancelled) setTask(d);
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

  const missing = useMemo(
    () => (task ? task.captures.filter((c) => !files[c.key]) : []),
    [task, files],
  );
  const allIntegrity = useMemo(
    () => !!task && task.integrity.every((_, i) => integrityOk[i]),
    [task, integrityOk],
  );
  const ready = missing.length === 0 && allIntegrity;

  const submit = async () => {
    if (!task || !ready) return;
    setSubmitting(true);
    try {
      const r = await practicalsService.submitEvidence(courseId, submoduleId, taskId, {
        captures: Object.values(files).map((f) => ({
          key: f.key,
          filename: f.filename,
          bytes: f.bytes,
          seconds: f.seconds,
        })),
        note,
      });
      setResult(r);
      showToast(r.headline, "success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      showToast(e instanceof Error ? e.message : "Could not submit.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <MainLayout fullWidthContent>
        <Box sx={{ py: 10, textAlign: "center", color: "var(--text-secondary)" }}>
          <Icon icon="mdi:camera-outline" width={34} />
          <Typography sx={{ mt: 1, fontWeight: 700 }}>Loading the brief…</Typography>
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

  return (
    <MainLayout fullWidthContent>
      <PracticalShell
        kind="evidence"
        courseId={courseId}
        submoduleId={submoduleId}
        title={task.title}
        subtitle="Do the work for real, capture it, and submit. An assessor marks this one."
        pills={[
          { icon: "mdi:camera-outline", label: `${task.captures.length} captures required` },
          { icon: "mdi:account-check-outline", label: `marked within ${task.review_sla_hours}h` },
          { icon: "mdi:counter", label: `${task.max_score} marks` },
          { icon: "mdi:clock-outline", label: `~${task.minutes} min of work` },
        ]}
      >
        {result && <ResultPanel result={result} />}

        <PracticalCard title="The brief" icon="mdi:text-box-outline" accent="#be123c">
          <PracticalProse html={task.brief_html} />
        </PracticalCard>

        {/* ----------------------------------------------- what to capture */}
        <PracticalCard
          title="What to submit"
          icon="mdi:camera-plus-outline"
          accent="#be123c"
          action={
            <Typography
              sx={{
                fontSize: "0.72rem",
                fontWeight: 800,
                color: missing.length === 0 ? "#047857" : "var(--text-secondary)",
              }}
            >
              {task.captures.length - missing.length} of {task.captures.length} ready
            </Typography>
          }
        >
          <Stack spacing={1}>
            {task.captures.map((c) => (
              <CaptureSlot
                key={c.key}
                slotKey={c.key}
                label={c.label}
                medium={c.medium}
                seconds={c.seconds}
                mustShow={c.must_show}
                accent="#be123c"
                value={files[c.key]}
                locked={!!result}
                onChange={(f) =>
                  setFiles((prev) => {
                    const next = { ...prev };
                    if (f) next[c.key] = f;
                    else delete next[c.key];
                    return next;
                  })
                }
              />
            ))}
          </Stack>

          <Box sx={{ mt: 1.75 }}>
            <Typography sx={{ fontSize: "0.82rem", fontWeight: 800, mb: 0.6 }}>
              Anything the assessor should know
            </Typography>
            <Box
              component="textarea"
              value={note}
              disabled={!!result}
              rows={3}
              placeholder="The unit was a 2019 1.5 ton split, and the service valve was seized, so I…"
              onChange={(e) => setNote((e.target as HTMLTextAreaElement).value)}
              sx={{
                width: "100%",
                p: 1.25,
                borderRadius: 2.5,
                border: "1px solid var(--border-default)",
                bgcolor: "var(--card-bg)",
                font: "inherit",
                fontSize: "0.87rem",
                color: "inherit",
                resize: "vertical",
                outline: "none",
                "&:focus": { borderColor: "#be123c" },
              }}
            />
            <Typography sx={{ fontSize: "0.75rem", color: "var(--text-secondary)", mt: 0.5 }}>
              Optional, but a note explaining a decision you had to make is the difference between
              a competent band and a strong one on more than one criterion below.
            </Typography>
          </Box>
        </PracticalCard>

        {/* ------------------------------------------------------ integrity */}
        {!result && (
          <PracticalCard title="Before you submit" icon="mdi:fingerprint" accent="#b45309">
            <Typography sx={{ fontSize: "0.85rem", lineHeight: 1.6, mb: 1.25 }}>
              These requirements exist to make submitting somebody else's work expensive. They are
              not proctoring and this platform will not pretend they are: an assessor looks at
              whether the evidence hangs together, and evidence that cannot be tied to you is sent
              back rather than failed.
            </Typography>
            <Stack spacing={0.75}>
              {task.integrity.map((req, i) => (
                <ButtonBase
                  key={req}
                  onClick={() => setIntegrityOk((p) => ({ ...p, [i]: !p[i] }))}
                  sx={{
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: 1.1,
                    p: 1.15,
                    borderRadius: 2.5,
                    textAlign: "left",
                    border: `1px solid ${integrityOk[i] ? "#b45309" : "var(--border-default)"}`,
                    bgcolor: integrityOk[i] ? "color-mix(in srgb, #b45309 7%, transparent)" : "transparent",
                  }}
                >
                  <Icon
                    icon={integrityOk[i] ? "mdi:checkbox-marked-circle" : "mdi:checkbox-blank-circle-outline"}
                    width={19}
                    color={integrityOk[i] ? "#b45309" : "var(--text-secondary)"}
                    style={{ flexShrink: 0, marginTop: 1 }}
                  />
                  <Typography sx={{ fontSize: "0.85rem", lineHeight: 1.5, fontWeight: 600 }}>{req}</Typography>
                </ButtonBase>
              ))}
            </Stack>
          </PracticalCard>
        )}

        {/* --------------------------------------------------------- rubric */}
        <PracticalCard
          title={result ? "How this will be marked" : "How this will be marked"}
          icon="mdi:clipboard-text-outline"
          accent="#be123c"
        >
          <Typography sx={{ fontSize: "0.84rem", lineHeight: 1.6, mb: 1.5, color: "var(--text-secondary)" }}>
            Read this before you start. Every band below is a description an assessor can point at,
            which is what lets you aim at the top one rather than guess what "thorough" meant.
          </Typography>
          <RubricTable rubric={task.rubric} />
        </PracticalCard>

        {/* ------------------------------------------------------- exemplar */}
        {task.exemplar && task.exemplar.length > 0 && !result && (
          <PracticalCard title="A marked example" icon="mdi:star-check-outline" accent="#047857">
            <Typography sx={{ fontSize: "0.84rem", lineHeight: 1.6, mb: 1.25, color: "var(--text-secondary)" }}>
              One real submission and the bands it earned, so the standard is a thing you have seen
              rather than a word you have read.
            </Typography>
            <Stack spacing={0.75}>
              {task.exemplar.map((ex) => {
                const colour = ["#ef4444", "#f59e0b", "#10b981", "#0ea5e9"][ex.band];
                const word = ["Not yet", "Developing", "Competent", "Strong"][ex.band];
                return (
                  <Stack
                    key={ex.criterion}
                    direction="row"
                    spacing={1}
                    sx={{
                      p: 1.15,
                      borderRadius: 2,
                      bgcolor: `color-mix(in srgb, ${colour} 7%, transparent)`,
                      border: `1px solid color-mix(in srgb, ${colour} 25%, transparent)`,
                    }}
                  >
                    <Box
                      sx={{
                        px: 0.75,
                        py: 0.1,
                        flexShrink: 0,
                        height: "fit-content",
                        borderRadius: 999,
                        bgcolor: colour,
                        color: "white",
                        fontSize: "0.65rem",
                        fontWeight: 800,
                        textTransform: "uppercase",
                      }}
                    >
                      {word}
                    </Box>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography sx={{ fontSize: "0.81rem", fontWeight: 800 }}>{ex.criterion}</Typography>
                      <Typography sx={{ fontSize: "0.82rem", lineHeight: 1.5, mt: 0.1 }}>{ex.note}</Typography>
                    </Box>
                  </Stack>
                );
              })}
            </Stack>
          </PracticalCard>
        )}

        {!result && (
          <ButtonBase
            disabled={!ready || submitting}
            onClick={submit}
            sx={{
              width: "100%",
              py: 1.45,
              borderRadius: 3,
              fontWeight: 800,
              fontSize: "0.93rem",
              color: "white",
              background: ready
                ? "linear-gradient(135deg, #be123c 0%, #9f1239 100%)"
                : "var(--border-default)",
              opacity: ready ? (submitting ? 0.6 : 1) : 0.75,
            }}
          >
            <Icon icon={ready ? "mdi:upload" : "mdi:lock-outline"} width={19} style={{ marginRight: 8 }} />
            {submitting
              ? "Submitting…"
              : missing.length > 0
                ? `Still to capture: ${missing[0].label}${missing.length > 1 ? ` and ${missing.length - 1} more` : ""}`
                : !allIntegrity
                  ? "Confirm the requirements above"
                  : "Submit for assessment"}
          </ButtonBase>
        )}
      </PracticalShell>
    </MainLayout>
  );
}
