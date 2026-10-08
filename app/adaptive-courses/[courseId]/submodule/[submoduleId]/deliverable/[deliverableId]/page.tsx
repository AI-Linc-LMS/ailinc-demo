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
import {
  practicalsService,
  type DeliverableDetail,
  type DeliverableResult,
} from "@/lib/services/practicals.service";

/**
 * The deliverable: a document produced, submitted and marked against a rubric.
 *
 * This replaces the old `SubjectiveQuestion`, which was a textarea and a hope.
 * The work these courses actually lead to is the production of documents: a set
 * of final accounts, a GSTR-3B, a service report that an insurer will read, a
 * flight plan a regulator could ask for, an application letter a German office
 * will answer. A free-text box cannot ask for any of those, because the artefact
 * is a file with a format and a client who wants it in a particular shape.
 *
 * The brief is written the way the commissioner would write it, not the way an
 * examiner would. "Your client has handed you a shoebox" is the task a learner
 * will meet; "demonstrate understanding of final accounts" is not.
 *
 * The model answer is released on submission and not before. Any other ordering
 * either removes the exercise or removes the comparison, and the comparison is
 * where most of the learning in a document task actually is.
 */

const prettyBytes = (n: number) =>
  n >= 1_048_576 ? `${(n / 1_048_576).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`;

interface Attached {
  key: string;
  filename: string;
  bytes: number;
}

export default function DeliverablePlayerPage() {
  const params = useParams();
  const { showToast } = useToast();
  const courseId = Number(params.courseId);
  const submoduleId = Number(params.submoduleId);
  const deliverableId = Number(params.deliverableId);

  const [task, setTask] = useState<DeliverableDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [files, setFiles] = useState<Record<string, Attached>>({});
  const [note, setNote] = useState("");
  const [result, setResult] = useState<DeliverableResult | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!Number.isFinite(deliverableId)) return;
    let cancelled = false;
    practicalsService
      .getDeliverable(courseId, submoduleId, deliverableId)
      .then((d) => {
        if (!cancelled) setTask(d);
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "Could not load this brief.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [courseId, submoduleId, deliverableId]);

  const missing = useMemo(
    () => (task ? task.requires.filter((r) => !files[r.key]) : []),
    [task, files],
  );

  const submit = async () => {
    if (!task || missing.length > 0) return;
    setSubmitting(true);
    try {
      const r = await practicalsService.submitDeliverable(courseId, submoduleId, deliverableId, {
        files: Object.values(files),
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
          <Icon icon="mdi:file-document-edit-outline" width={34} />
          <Typography sx={{ mt: 1, fontWeight: 700 }}>Loading the brief…</Typography>
        </Box>
      </MainLayout>
    );
  }

  if (error || !task) {
    return (
      <MainLayout fullWidthContent>
        <Typography sx={{ color: "#ef4444", fontWeight: 700, textAlign: "center", py: 8 }}>
          {error ?? "Deliverable not found."}
        </Typography>
      </MainLayout>
    );
  }

  return (
    <MainLayout fullWidthContent>
      <PracticalShell
        kind="deliverable"
        courseId={courseId}
        submoduleId={submoduleId}
        title={task.title}
        subtitle="Produce the document and attach it. Marked against the rubric below."
        pills={[
          { icon: "mdi:paperclip", label: `${task.requires.length} file${task.requires.length === 1 ? "" : "s"}` },
          { icon: "mdi:account-check-outline", label: `marked within ${task.review_sla_hours}h` },
          { icon: "mdi:counter", label: `${task.max_score} marks` },
          { icon: "mdi:clock-outline", label: `~${Math.round(task.minutes / 60)}h of work` },
        ]}
      >
        {result && <ResultPanel result={result} />}

        <PracticalCard title="The commission" icon="mdi:email-open-outline" accent="#166534">
          <PracticalProse html={task.brief_html} />
        </PracticalCard>

        <PracticalCard
          title="What to attach"
          icon="mdi:paperclip"
          accent="#166534"
          action={
            <Typography
              sx={{
                fontSize: "0.72rem",
                fontWeight: 800,
                color: missing.length === 0 ? "#047857" : "var(--text-secondary)",
              }}
            >
              {task.requires.length - missing.length} of {task.requires.length} attached
            </Typography>
          }
        >
          <Stack spacing={1}>
            {task.requires.map((r) => {
              const got = files[r.key];
              return (
                <Box
                  key={r.key}
                  sx={{
                    borderRadius: 3,
                    border: `1px ${got ? "solid" : "dashed"} ${got ? "#166534" : "var(--border-default)"}`,
                    bgcolor: got ? "color-mix(in srgb, #166534 6%, transparent)" : "transparent",
                    p: 1.4,
                  }}
                >
                  <Stack direction="row" spacing={1.25}>
                    <Box
                      sx={{
                        width: 42,
                        height: 42,
                        flexShrink: 0,
                        borderRadius: 2,
                        display: "grid",
                        placeItems: "center",
                        bgcolor: got ? "#166534" : "color-mix(in srgb, var(--border-default) 35%, transparent)",
                        color: got ? "white" : "var(--text-secondary)",
                      }}
                    >
                      <Icon icon={got ? "mdi:check" : "mdi:file-outline"} width={21} />
                    </Box>
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                      <Stack direction="row" alignItems="center" spacing={0.6} flexWrap="wrap">
                        <Typography sx={{ fontSize: "0.86rem", fontWeight: 800 }}>{r.label}</Typography>
                        {r.formats.map((f) => (
                          <Typography
                            key={f}
                            sx={{
                              px: 0.6,
                              py: 0.05,
                              borderRadius: 999,
                              fontSize: "0.63rem",
                              fontWeight: 800,
                              textTransform: "uppercase",
                              bgcolor: "color-mix(in srgb, #166534 13%, transparent)",
                              color: "#166534",
                            }}
                          >
                            {f}
                          </Typography>
                        ))}
                      </Stack>
                      <Typography
                        sx={{ fontSize: "0.78rem", lineHeight: 1.5, color: "var(--text-secondary)", mt: 0.3 }}
                      >
                        {r.note}
                      </Typography>
                      {got && (
                        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 0.5 }}>
                          <Icon icon="mdi:file-check-outline" width={13} color="#047857" />
                          <Typography
                            sx={{
                              fontSize: "0.74rem",
                              color: "var(--text-secondary)",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {got.filename} · {prettyBytes(got.bytes)}
                          </Typography>
                        </Stack>
                      )}
                    </Box>
                    {!result && (
                      <Box sx={{ flexShrink: 0 }}>
                        <Box
                          component="label"
                          sx={{
                            display: "inline-flex",
                            px: 1.4,
                            py: 0.65,
                            borderRadius: 2,
                            cursor: "pointer",
                            fontSize: "0.77rem",
                            fontWeight: 800,
                            color: got ? "var(--text-secondary)" : "white",
                            border: got ? "1px solid var(--border-default)" : "none",
                            background: got ? "transparent" : "#166534",
                          }}
                        >
                          {got ? "Replace" : "Attach"}
                          <Box
                            component="input"
                            type="file"
                            accept={r.formats.map((f) => `.${f.toLowerCase()}`).join(",")}
                            onChange={(e) => {
                              const f = (e.target as HTMLInputElement).files?.[0];
                              if (!f) return;
                              setFiles((p) => ({
                                ...p,
                                [r.key]: { key: r.key, filename: f.name, bytes: f.size },
                              }));
                            }}
                            sx={{ display: "none" }}
                          />
                        </Box>
                      </Box>
                    )}
                  </Stack>
                </Box>
              );
            })}
          </Stack>

          <Box sx={{ mt: 1.75 }}>
            <Typography sx={{ fontSize: "0.82rem", fontWeight: 800, mb: 0.6 }}>
              Your covering note
            </Typography>
            <Box
              component="textarea"
              value={note}
              disabled={!!result}
              rows={4}
              placeholder="One assumption I had to make, and why: the brief does not say whether the vehicle was bought on 1 April or part way through the year, so I have…"
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
                "&:focus": { borderColor: "#166534" },
              }}
            />
            {/* Stating assumptions is the professional habit this task is for.
                An accountant who notices the brief is silent on a date and says
                so is doing the job; one who picks a date quietly is not. */}
            <Typography sx={{ fontSize: "0.75rem", color: "var(--text-secondary)", mt: 0.5 }}>
              Name any assumption the brief left open. Spotting that it is open carries marks of
              its own, and in practice it is the thing a client needs to hear from you.
            </Typography>
          </Box>
        </PracticalCard>

        <PracticalCard title="How this will be marked" icon="mdi:clipboard-text-outline" accent="#166534">
          <Typography sx={{ fontSize: "0.84rem", lineHeight: 1.6, mb: 1.5, color: "var(--text-secondary)" }}>
            Published before you start, because a rubric you meet afterwards can explain a grade
            but cannot improve the work.
          </Typography>
          <RubricTable rubric={task.rubric} awards={result?.awards} />
        </PracticalCard>

        {result?.model_answer_html && (
          <PracticalCard title="The model answer" icon="mdi:script-text-outline" accent="#166534">
            <Typography sx={{ fontSize: "0.82rem", color: "var(--text-secondary)", mb: 1.25 }}>
              Released now that you have submitted, and not before. Compare it against your own
              working rather than reading it as the answer: where you differ is the useful part.
            </Typography>
            <PracticalProse html={result.model_answer_html} />
          </PracticalCard>
        )}

        {!result && (
          <ButtonBase
            disabled={missing.length > 0 || submitting}
            onClick={submit}
            sx={{
              width: "100%",
              py: 1.45,
              borderRadius: 3,
              fontWeight: 800,
              fontSize: "0.93rem",
              color: "white",
              background:
                missing.length === 0
                  ? "linear-gradient(135deg, #166534 0%, #14532d 100%)"
                  : "var(--border-default)",
              opacity: missing.length === 0 ? (submitting ? 0.6 : 1) : 0.75,
            }}
          >
            <Icon
              icon={missing.length === 0 ? "mdi:send-outline" : "mdi:lock-outline"}
              width={19}
              style={{ marginRight: 8 }}
            />
            {submitting
              ? "Submitting…"
              : missing.length > 0
                ? `Still to attach: ${missing[0].label}${missing.length > 1 ? ` and ${missing.length - 1} more` : ""}`
                : "Submit for marking"}
          </ButtonBase>
        )}
      </PracticalShell>
    </MainLayout>
  );
}
