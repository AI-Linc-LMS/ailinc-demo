"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  type SpeakingDetail,
  type SpeakingResult,
} from "@/lib/services/practicals.service";

/**
 * The speaking and listening player.
 *
 * A language course without this is a reading course with a German wordlist. The
 * Goethe A2 examination is half speaking and listening, an employer in Germany
 * cares about nothing else, and a learner can pass every multiple-choice
 * question on the dative and still be unable to order a coffee.
 *
 * Two engineering notes.
 *
 * The prompts are spoken by the browser's own `speechSynthesis`, not by audio
 * files or a TTS API. That is what lets a listening task exist at all in a build
 * with no network, and it keeps the repo from carrying a hundred megabytes of
 * recorded German. The voice is worse than a recorded speaker, so it is used for
 * comprehension stimulus rather than as a pronunciation model, and the task
 * copy says which voice the learner is hearing.
 *
 * Recording is real, using `MediaRecorder`, so a learner finds out whether their
 * microphone works before an examination rather than during one, and can play
 * their own answer back. The scoring is not a real recogniser: the submit route
 * marks what it can actually observe and the result says so. The envelope is the
 * real one, so dropping in a real scorer changes one handler.
 */

const KIND_COPY: Record<string, { chapter: string; instruction: string }> = {
  listen: {
    chapter: "Listening",
    instruction: "Play it as often as you need, then answer. The transcript comes afterwards.",
  },
  "read-aloud": {
    chapter: "Reading aloud",
    instruction: "Read the text out loud. Each word is scored, so you can see which sounds to work on.",
  },
  respond: {
    chapter: "Speaking",
    instruction: "Answer in your own words. You are marked on whether the task got done, not on having no accent.",
  },
  roleplay: {
    chapter: "Conversation",
    instruction: "Hold your side of the conversation. Listen, then answer each turn.",
  },
};

export default function SpeakingPlayerPage() {
  const params = useParams();
  const { showToast } = useToast();
  const courseId = Number(params.courseId);
  const submoduleId = Number(params.submoduleId);
  const taskId = Number(params.taskId);

  const [task, setTask] = useState<SpeakingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SpeakingResult | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [speaking, setSpeaking] = useState(false);
  const [plays, setPlays] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [clipUrl, setClipUrl] = useState<string | null>(null);
  const [micError, setMicError] = useState<string | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!Number.isFinite(taskId)) return;
    let cancelled = false;
    practicalsService
      .getSpeakingTask(courseId, submoduleId, taskId)
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
      if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, [courseId, submoduleId, taskId]);

  /** Speak a line with the browser's own voice. See the note at the top. */
  const say = useCallback(
    (text: string, lang: string) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) {
        showToast("This browser has no speech voice, so the audio cannot play here.", "warning");
        return;
      }
      try {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = lang;
        // Slower than natural. A beginner needs the gaps between words more
        // than they need an authentic pace, and the task says so.
        u.rate = 0.82;
        u.onstart = () => setSpeaking(true);
        u.onend = () => setSpeaking(false);
        u.onerror = () => setSpeaking(false);
        window.speechSynthesis.speak(u);
        setPlays((p) => p + 1);
      } catch {
        setSpeaking(false);
      }
    },
    [showToast],
  );

  const startRecording = async () => {
    setMicError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      chunksRef.current = [];
      const rec = new MediaRecorder(stream);
      rec.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      rec.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: rec.mimeType || "audio/webm" });
        setClipUrl(URL.createObjectURL(blob));
        // Releasing the track turns the browser's recording indicator off. A
        // page that keeps the microphone open after the learner stops is the
        // kind of thing that gets a platform distrusted.
        stream.getTracks().forEach((t) => t.stop());
      };
      recorderRef.current = rec;
      rec.start();
      setRecording(true);
      setSeconds(0);
      tickRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } catch {
      setMicError(
        "The microphone was refused or is unavailable. Allow microphone access for this site and try again. " +
          "Finding this out now is better than finding it out in an examination.",
      );
    }
  };

  const stopRecording = () => {
    recorderRef.current?.stop();
    recorderRef.current = null;
    if (tickRef.current) clearInterval(tickRef.current);
    tickRef.current = null;
    setRecording(false);
  };

  useEffect(() => () => {
    if (tickRef.current) clearInterval(tickRef.current);
  }, []);

  const submit = async () => {
    if (!task) return;
    setSubmitting(true);
    try {
      const r = await practicalsService.submitSpeaking(courseId, submoduleId, taskId, {
        seconds,
        answers: task.kind === "listen" ? answers : undefined,
      });
      setResult(r);
      showToast(r.headline, "info");
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
          <Icon icon="mdi:microphone-outline" width={34} />
          <Typography sx={{ mt: 1, fontWeight: 700 }}>Warming up the voice…</Typography>
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

  const copy = KIND_COPY[task.kind] ?? KIND_COPY.respond;
  const answeredAll = task.kind !== "listen" || (task.questions ?? []).every((q) => answers[q.n] != null);
  const canSubmit = task.kind === "listen" ? answeredAll : seconds >= 2 && !recording;

  return (
    <MainLayout fullWidthContent>
      <PracticalShell
        kind="speaking"
        courseId={courseId}
        submoduleId={submoduleId}
        title={task.title}
        subtitle={copy.instruction}
        pills={[
          { icon: "mdi:school-outline", label: task.level },
          { icon: "mdi:translate", label: task.lang },
          ...(task.kind === "listen"
            ? [{ icon: "mdi:help-circle-outline", label: `${task.questions?.length ?? 0} questions` }]
            : [{ icon: "mdi:timer-outline", label: `${task.seconds}s target` }]),
          { icon: "mdi:counter", label: `${task.max_score} marks` },
        ]}
        rightSlot={
          recording ? (
            <Stack direction="row" alignItems="center" spacing={0.75}>
              <Box
                sx={{
                  width: 11,
                  height: 11,
                  borderRadius: "50%",
                  bgcolor: "#fca5a5",
                  animation: "pulse 1s ease-in-out infinite",
                  "@keyframes pulse": { "50%": { opacity: 0.3 } },
                }}
              />
              <Typography sx={{ fontWeight: 800, fontSize: "1.3rem", fontVariantNumeric: "tabular-nums" }}>
                {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}
              </Typography>
            </Stack>
          ) : undefined
        }
      >
        {result && (
          <ResultPanel result={result}>
            {/* Per-word pronunciation. One number for a whole utterance tells a
                learner nothing they can act on; seeing that "Brötchen" scored
                61 and everything else scored 90 tells them exactly what to
                practise tonight. */}
            {result.words && result.words.length > 0 && (
              <Box sx={{ mt: 1.5 }}>
                <Typography sx={{ fontSize: "0.8rem", fontWeight: 800, mb: 0.75 }}>
                  Word by word
                </Typography>
                <Stack direction="row" flexWrap="wrap" sx={{ gap: 0.5 }}>
                  {result.words.map((w, i) => {
                    const colour = w.score >= 85 ? "#047857" : w.score >= 72 ? "#b45309" : "#be123c";
                    return (
                      <Box
                        key={`${w.word}:${i}`}
                        title={w.note}
                        sx={{
                          px: 0.85,
                          py: 0.35,
                          borderRadius: 1.5,
                          fontSize: "0.84rem",
                          fontWeight: 700,
                          bgcolor: `color-mix(in srgb, ${colour} 12%, transparent)`,
                          color: colour,
                          borderBottom: `2px solid ${colour}`,
                        }}
                      >
                        {w.word}
                        <Box component="span" sx={{ fontSize: "0.68rem", opacity: 0.75, ml: 0.4 }}>
                          {w.score}
                        </Box>
                      </Box>
                    );
                  })}
                </Stack>
                {result.words.some((w) => w.note) && (
                  <Stack spacing={0.4} sx={{ mt: 1 }}>
                    {result.words
                      .filter((w) => w.note)
                      .map((w, i) => (
                        <Stack key={`${w.word}:n:${i}`} direction="row" spacing={0.6}>
                          <Icon icon="mdi:ear-hearing" width={14} color="#be123c" style={{ flexShrink: 0, marginTop: 2 }} />
                          <Typography sx={{ fontSize: "0.79rem", lineHeight: 1.5 }}>
                            <strong>{w.word}</strong> {w.note}
                          </Typography>
                        </Stack>
                      ))}
                  </Stack>
                )}
              </Box>
            )}

            {result.mentioned && result.mentioned.length > 0 && (
              <Box sx={{ mt: 1.5 }}>
                <Typography sx={{ fontSize: "0.8rem", fontWeight: 800, mb: 0.75 }}>
                  Did the task get done
                </Typography>
                <Stack spacing={0.4}>
                  {result.mentioned.map((m) => (
                    <Stack key={m.point} direction="row" spacing={0.6} alignItems="flex-start">
                      <Icon
                        icon={m.said ? "mdi:check-circle" : "mdi:close-circle-outline"}
                        width={15}
                        color={m.said ? "#047857" : "#be123c"}
                        style={{ flexShrink: 0, marginTop: 2 }}
                      />
                      <Typography sx={{ fontSize: "0.82rem", lineHeight: 1.5, opacity: m.said ? 1 : 0.8 }}>
                        {m.point}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            )}

            {result.answers && result.answers.length > 0 && (
              <Stack spacing={0.75} sx={{ mt: 1.5 }}>
                {result.answers.map((a) => {
                  const q = task.questions?.find((x) => x.n === a.n);
                  return (
                    <Box
                      key={a.n}
                      sx={{
                        p: 1.15,
                        borderRadius: 2,
                        bgcolor: `color-mix(in srgb, ${a.correct ? "#10b981" : "#ef4444"} 7%, transparent)`,
                        border: `1px solid color-mix(in srgb, ${a.correct ? "#10b981" : "#ef4444"} 26%, transparent)`,
                      }}
                    >
                      <Stack direction="row" spacing={0.75}>
                        <Icon
                          icon={a.correct ? "mdi:check-circle" : "mdi:close-circle"}
                          width={16}
                          color={a.correct ? "#047857" : "#be123c"}
                          style={{ flexShrink: 0, marginTop: 2 }}
                        />
                        <Box sx={{ minWidth: 0 }}>
                          <Typography sx={{ fontSize: "0.82rem", fontWeight: 800 }}>{q?.question}</Typography>
                          <Typography sx={{ fontSize: "0.81rem", lineHeight: 1.5, mt: 0.2 }}>
                            {a.explanation}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  );
                })}
              </Stack>
            )}
          </ResultPanel>
        )}

        <PracticalCard title={copy.chapter} icon="mdi:information-outline" accent="#c2410c">
          <PracticalProse html={task.prompt_html} />
        </PracticalCard>

        {/* ------------------------------------------------------- the audio */}
        {(task.kind === "listen" || task.target) && (
          <PracticalCard
            title={task.kind === "listen" ? "Listen" : "Hear it first"}
            icon="mdi:volume-high"
            accent="#c2410c"
          >
            {task.kind === "listen" && (
              <Typography sx={{ fontSize: "0.82rem", color: "var(--text-secondary)", mb: 1.25, lineHeight: 1.55 }}>
                This is your device's built-in German voice, played slightly slower than natural
                speech. It is here so a listening task works with no network at all. A recorded
                native speaker sounds better, and the examination will use one.
              </Typography>
            )}

            {task.target && (
              <Box
                sx={{
                  p: 1.75,
                  borderRadius: 3,
                  mb: 1.5,
                  bgcolor: "color-mix(in srgb, #c2410c 6%, transparent)",
                  border: "1px solid color-mix(in srgb, #c2410c 22%, transparent)",
                }}
              >
                <Typography sx={{ fontSize: { xs: "1.05rem", md: "1.2rem" }, fontWeight: 700, lineHeight: 1.6 }}>
                  {task.target}
                </Typography>
              </Box>
            )}

            <Stack direction="row" spacing={1} alignItems="center">
              <ButtonBase
                onClick={() => say(task.kind === "listen" ? (task.script ?? "") : (task.target ?? ""), task.lang)}
                sx={{
                  px: 2.25,
                  py: 1.05,
                  borderRadius: 2.5,
                  fontWeight: 800,
                  fontSize: "0.86rem",
                  color: "white",
                  background: "linear-gradient(135deg, #c2410c 0%, #9a3412 100%)",
                }}
              >
                <Icon icon={speaking ? "mdi:volume-high" : "mdi:play"} width={18} style={{ marginRight: 7 }} />
                {speaking ? "Playing…" : plays === 0 ? "Play the audio" : "Play again"}
              </ButtonBase>
              {plays > 0 && (
                <Typography sx={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
                  played {plays} time{plays === 1 ? "" : "s"}
                </Typography>
              )}
            </Stack>

            {task.focus_sounds && task.focus_sounds.length > 0 && (
              <Box sx={{ mt: 1.75, pt: 1.5, borderTop: "1px solid var(--border-default)" }}>
                <Typography sx={{ fontSize: "0.8rem", fontWeight: 800, mb: 0.75 }}>
                  The sounds being assessed
                </Typography>
                <Stack spacing={0.5}>
                  {task.focus_sounds.map((f) => (
                    <Stack key={f.grapheme} direction="row" spacing={0.9} alignItems="flex-start">
                      <Box
                        sx={{
                          px: 0.75,
                          py: 0.15,
                          flexShrink: 0,
                          borderRadius: 1.5,
                          bgcolor: "color-mix(in srgb, #c2410c 14%, transparent)",
                          color: "#9a3412",
                          fontWeight: 800,
                          fontSize: "0.82rem",
                          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                        }}
                      >
                        {f.grapheme}
                      </Box>
                      <Typography sx={{ fontSize: "0.81rem", lineHeight: 1.5 }}>{f.note}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            )}
          </PracticalCard>
        )}

        {/* ---------------------------------------------------- the roleplay */}
        {task.turns && task.turns.length > 0 && (
          <PracticalCard title="The conversation" icon="mdi:forum-outline" accent="#c2410c">
            <Stack spacing={1.25}>
              {task.turns.map((t, i) => (
                <Box key={i}>
                  <Stack direction="row" spacing={1.1}>
                    <Box
                      sx={{
                        width: 30,
                        height: 30,
                        flexShrink: 0,
                        borderRadius: "50%",
                        display: "grid",
                        placeItems: "center",
                        bgcolor: "color-mix(in srgb, #c2410c 14%, transparent)",
                        color: "#9a3412",
                      }}
                    >
                      <Icon icon="mdi:account" width={17} />
                    </Box>
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                      <Stack direction="row" alignItems="center" spacing={0.6}>
                        <Typography
                          sx={{
                            fontSize: "0.65rem",
                            fontWeight: 800,
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                            color: "#9a3412",
                          }}
                        >
                          {t.speaker}
                        </Typography>
                        <ButtonBase
                          onClick={() => say(t.line, task.lang)}
                          aria-label="Hear this line"
                          sx={{ width: 22, height: 22, borderRadius: "50%", color: "#9a3412" }}
                        >
                          <Icon icon="mdi:volume-medium" width={15} />
                        </ButtonBase>
                      </Stack>
                      <Typography sx={{ fontSize: "0.95rem", fontWeight: 700, lineHeight: 1.5 }}>
                        {t.line}
                      </Typography>
                      <Typography sx={{ fontSize: "0.79rem", color: "var(--text-secondary)", fontStyle: "italic" }}>
                        {t.translation}
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={0.75}
                    sx={{
                      ml: 5.2,
                      mt: 0.75,
                      p: 1,
                      borderRadius: 2,
                      bgcolor: "color-mix(in srgb, var(--border-default) 25%, transparent)",
                    }}
                  >
                    <Icon icon="mdi:arrow-right-bottom" width={14} color="var(--text-secondary)" style={{ flexShrink: 0, marginTop: 2 }} />
                    <Typography sx={{ fontSize: "0.79rem", lineHeight: 1.5, color: "var(--text-secondary)" }}>
                      Your turn: {t.expect}
                    </Typography>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </PracticalCard>
        )}

        {/* ------------------------------------------------- the questions */}
        {task.kind === "listen" && task.questions && (
          <PracticalCard title="What did you hear" icon="mdi:help-circle-outline" accent="#c2410c">
            <Stack spacing={1.75}>
              {task.questions.map((q) => (
                <Box key={q.n}>
                  <Typography sx={{ fontSize: "0.89rem", fontWeight: 800, mb: 0.75 }}>
                    {q.n}. {q.question}
                  </Typography>
                  <Stack spacing={0.5}>
                    {q.options.map((o, oi) => {
                      const picked = answers[q.n] === oi;
                      return (
                        <ButtonBase
                          key={oi}
                          disabled={!!result}
                          onClick={() => setAnswers((p) => ({ ...p, [q.n]: oi }))}
                          sx={{
                            justifyContent: "flex-start",
                            gap: 1,
                            p: 1.1,
                            borderRadius: 2.5,
                            textAlign: "left",
                            border: `1px solid ${picked ? "#c2410c" : "var(--border-default)"}`,
                            bgcolor: picked ? "color-mix(in srgb, #c2410c 8%, transparent)" : "transparent",
                          }}
                        >
                          <Icon
                            icon={picked ? "mdi:radiobox-marked" : "mdi:radiobox-blank"}
                            width={17}
                            color={picked ? "#c2410c" : "var(--text-secondary)"}
                          />
                          <Typography sx={{ fontSize: "0.86rem", fontWeight: 600 }}>{o}</Typography>
                        </ButtonBase>
                      );
                    })}
                  </Stack>
                </Box>
              ))}
            </Stack>
          </PracticalCard>
        )}

        {/* --------------------------------------------------- the recorder */}
        {task.kind !== "listen" && !result && (
          <PracticalCard title="Your turn" icon="mdi:microphone" accent="#c2410c">
            {task.must_mention && task.must_mention.length > 0 && (
              <Box sx={{ mb: 1.5 }}>
                <Typography sx={{ fontSize: "0.8rem", fontWeight: 800, mb: 0.6 }}>
                  A complete answer covers
                </Typography>
                <Stack spacing={0.4}>
                  {task.must_mention.map((m) => (
                    <Stack key={m} direction="row" spacing={0.6}>
                      <Icon icon="mdi:circle-small" width={16} color="var(--text-secondary)" style={{ flexShrink: 0 }} />
                      <Typography sx={{ fontSize: "0.82rem", lineHeight: 1.5 }}>{m}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            )}

            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" sx={{ gap: 1 }}>
              <ButtonBase
                onClick={recording ? stopRecording : startRecording}
                sx={{
                  px: 2.5,
                  py: 1.15,
                  borderRadius: 2.5,
                  fontWeight: 800,
                  fontSize: "0.88rem",
                  color: "white",
                  background: recording
                    ? "linear-gradient(135deg, #be123c 0%, #9f1239 100%)"
                    : "linear-gradient(135deg, #c2410c 0%, #9a3412 100%)",
                }}
              >
                <Icon icon={recording ? "mdi:stop" : "mdi:microphone"} width={19} style={{ marginRight: 7 }} />
                {recording ? `Stop (${seconds}s)` : clipUrl ? "Record again" : "Start recording"}
              </ButtonBase>

              {clipUrl && !recording && (
                <Box component="audio" controls src={clipUrl} sx={{ height: 36, maxWidth: "100%" }} />
              )}
            </Stack>

            {/* Play-back matters. A learner who has never heard their own German
                has no idea which of the examiner's complaints is about them. */}
            {clipUrl && !recording && (
              <Typography sx={{ fontSize: "0.78rem", color: "var(--text-secondary)", mt: 1 }}>
                Listen back before you submit. Hearing your own recording is the single cheapest
                improvement available to you, and most learners have never done it.
              </Typography>
            )}

            {micError && (
              <Stack
                direction="row"
                spacing={0.75}
                sx={{
                  mt: 1.25,
                  p: 1.15,
                  borderRadius: 2,
                  bgcolor: "color-mix(in srgb, #b45309 8%, transparent)",
                  border: "1px solid color-mix(in srgb, #b45309 30%, transparent)",
                }}
              >
                <Icon icon="mdi:microphone-off" width={17} color="#b45309" style={{ flexShrink: 0, marginTop: 1 }} />
                <Typography sx={{ fontSize: "0.81rem", lineHeight: 1.5, color: "#92400e" }}>
                  {micError}
                </Typography>
              </Stack>
            )}
          </PracticalCard>
        )}

        {result?.transcript_shown && (
          <PracticalCard title="The transcript" icon="mdi:text-recognition" accent="#c2410c">
            <Typography sx={{ fontSize: "0.95rem", lineHeight: 1.75, fontWeight: 600 }}>
              {result.transcript_shown}
            </Typography>
            <Typography sx={{ fontSize: "0.78rem", color: "var(--text-secondary)", mt: 1.25 }}>
              Read it once, then play the audio again without looking. The gap between what you can
              read and what you can hear is the thing this task measures, and it closes faster than
              any other gap in a language.
            </Typography>
          </PracticalCard>
        )}

        {task.kind !== "listen" && (
          <PracticalCard title="How this is marked" icon="mdi:clipboard-text-outline" accent="#c2410c">
            <RubricTable rubric={task.rubric} awards={result?.awards} />
          </PracticalCard>
        )}

        {!result && (
          <ButtonBase
            disabled={!canSubmit || submitting}
            onClick={submit}
            sx={{
              width: "100%",
              py: 1.45,
              borderRadius: 3,
              fontWeight: 800,
              fontSize: "0.93rem",
              color: "white",
              background: canSubmit
                ? "linear-gradient(135deg, #c2410c 0%, #9a3412 100%)"
                : "var(--border-default)",
              opacity: canSubmit ? (submitting ? 0.6 : 1) : 0.75,
            }}
          >
            <Icon icon={canSubmit ? "mdi:send-outline" : "mdi:lock-outline"} width={19} style={{ marginRight: 8 }} />
            {submitting
              ? "Marking…"
              : task.kind === "listen"
                ? answeredAll
                  ? "Check my answers"
                  : "Answer every question first"
                : seconds >= 2
                  ? "Submit recording"
                  : "Record your answer first"}
          </ButtonBase>
        )}
      </PracticalShell>
    </MainLayout>
  );
}
