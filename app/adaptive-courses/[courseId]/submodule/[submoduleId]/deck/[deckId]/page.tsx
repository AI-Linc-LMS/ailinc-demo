"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { MainLayout } from "@/components/layout/MainLayout";
import { useToast } from "@/components/common/Toast";
import { PracticalShell, PracticalCard } from "@/components/practicals/PracticalShell";
import {
  practicalsService,
  type DeckCard,
  type DeckDetail,
  type DeckReviewResult,
} from "@/lib/services/practicals.service";

/**
 * The recall deck: spaced repetition, in short sittings.
 *
 * Terminology is the floor of every one of these trades. A learner who cannot
 * say whether accrued rent is an asset or a liability cannot read a balance
 * sheet; one who cannot name a refrigerant by its code cannot order the right
 * cylinder; and a German learner who knows the grammar but not the words can
 * produce nothing. None of that is taught by re-reading an article, because the
 * failure is retrieval rather than comprehension.
 *
 * Two deliberate choices.
 *
 * Typed recall by default, not flip-and-rate. Self-rating is almost free to get
 * wrong in the generous direction, and a learner who has just seen the answer
 * is the worst available judge of whether they knew it. Typing it is the same
 * retrieval the job asks for. A "flip" mode exists for cards where typing is
 * the wrong test, such as recognising a component by sight.
 *
 * The schedule is the server's. The interval has to survive the tab closing,
 * and two devices must not disagree about when a card is due, so the player
 * posts a review and is told the next interval rather than computing one.
 */

/** Strip case, accents and punctuation. "Groß" and "gross" are the same answer. */
const norm = (v: string) =>
  v
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

export default function DeckPlayerPage() {
  const params = useParams();
  const { showToast } = useToast();
  const courseId = Number(params.courseId);
  const submoduleId = Number(params.submoduleId);
  const deckId = Number(params.deckId);

  const [deck, setDeck] = useState<DeckDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /** The cards due in this sitting, fixed at open so the queue does not shift. */
  const [queue, setQueue] = useState<DeckCard[]>([]);
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [lastReview, setLastReview] = useState<DeckReviewResult | null>(null);
  const [tally, setTally] = useState({ right: 0, wrong: 0 });
  const [finished, setFinished] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!Number.isFinite(deckId)) return;
    let cancelled = false;
    practicalsService
      .getDeck(courseId, submoduleId, deckId)
      .then((d) => {
        if (cancelled) return;
        setDeck(d);
        // Due first, then new. A learner who meets new cards before clearing
        // what they already half-know builds a backlog they never get out of.
        const due = d.cards.filter((c) => c.due_in_days === 0);
        const fresh = d.cards.filter((c) => c.due_in_days === null).slice(0, 5);
        setQueue([...due, ...fresh]);
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "Could not load this deck.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [courseId, submoduleId, deckId]);

  const card = queue[idx] ?? null;

  useEffect(() => {
    if (!revealed) inputRef.current?.focus();
  }, [idx, revealed]);

  /**
   * Read the card's front aloud with the browser's own voice.
   *
   * `speechSynthesis` rather than an audio file or a TTS API: a vocabulary card
   * in a language course is useless without its sound, and this is the only way
   * to have one that needs no network and ships no megabytes. The voice is not
   * as good as a recorded speaker, and for a pronunciation model it would not be
   * acceptable, but for "which word is this" it is the right trade.
   */
  const speak = useCallback(
    (text: string) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
      try {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        if (deck?.lang) u.lang = deck.lang;
        u.rate = 0.85;
        window.speechSynthesis.speak(u);
      } catch {
        // A browser that refuses to speak must not take the card down with it.
      }
    },
    [deck?.lang],
  );

  const reveal = async (grade: 0 | 1 | 2 | 3) => {
    if (!card || !deck) return;
    setRevealed(true);
    try {
      const r = await practicalsService.reviewCard(courseId, submoduleId, deckId, {
        card_id: card.id,
        grade,
        typed: deck.mode === "type" ? typed : undefined,
      });
      setLastReview(r);
      setTally((t) => ({
        right: t.right + (r.correct ? 1 : 0),
        wrong: t.wrong + (r.correct ? 0 : 1),
      }));
    } catch {
      // Fall back to a local verdict so the sitting is not blocked by a failed
      // write. The schedule is lost, not the review.
      const correct = deck.mode === "type" ? norm(typed) === norm(card.back) : grade >= 2;
      setLastReview({
        card_id: card.id,
        correct,
        expected: card.back,
        streak: correct ? card.streak + 1 : 0,
        due_in_days: correct ? 2 : 0,
        leech: false,
        remaining: queue.length - idx - 1,
      });
      setTally((t) => ({ right: t.right + (correct ? 1 : 0), wrong: t.wrong + (correct ? 0 : 1) }));
    }
  };

  const next = () => {
    if (idx >= queue.length - 1) {
      setFinished(true);
      return;
    }
    setIdx((i) => i + 1);
    setTyped("");
    setRevealed(false);
    setLastReview(null);
  };

  /** Put a lapsed card back at the end of the sitting rather than losing it. */
  const requeue = () => {
    if (!card) return;
    setQueue((q) => [...q, card]);
    next();
  };

  const accuracy = useMemo(() => {
    const total = tally.right + tally.wrong;
    return total === 0 ? 0 : Math.round((tally.right / total) * 100);
  }, [tally]);

  if (loading) {
    return (
      <MainLayout fullWidthContent>
        <Box sx={{ py: 10, textAlign: "center", color: "var(--text-secondary)" }}>
          <Icon icon="mdi:cards-outline" width={34} />
          <Typography sx={{ mt: 1, fontWeight: 700 }}>Shuffling what is due…</Typography>
        </Box>
      </MainLayout>
    );
  }

  if (error || !deck) {
    return (
      <MainLayout fullWidthContent>
        <Typography sx={{ color: "#ef4444", fontWeight: 700, textAlign: "center", py: 8 }}>
          {error ?? "Deck not found."}
        </Typography>
      </MainLayout>
    );
  }

  return (
    <MainLayout fullWidthContent>
      <PracticalShell
        kind="deck"
        courseId={courseId}
        submoduleId={submoduleId}
        title={deck.title}
        subtitle={deck.blurb}
        pills={[
          { icon: "mdi:cards-outline", label: `${deck.cards.length} in the deck` },
          { icon: "mdi:calendar-today-outline", label: `${queue.length} in this sitting` },
          { icon: deck.mode === "type" ? "mdi:keyboard-outline" : "mdi:gesture-tap", label: deck.mode === "type" ? "typed recall" : "self-rated" },
        ]}
        rightSlot={
          !finished ? (
            <Stack direction="row" spacing={1.5}>
              <Box sx={{ textAlign: "right" }}>
                <Typography sx={{ fontWeight: 800, fontSize: "1.25rem", lineHeight: 1 }}>
                  {Math.min(idx + 1, queue.length)}
                  <Box component="span" sx={{ fontSize: "0.85rem", opacity: 0.7 }}>
                    /{queue.length}
                  </Box>
                </Typography>
                <Typography sx={{ fontSize: "0.68rem", opacity: 0.82 }}>cards</Typography>
              </Box>
              {tally.right + tally.wrong > 0 && (
                <Box sx={{ textAlign: "right" }}>
                  <Typography sx={{ fontWeight: 800, fontSize: "1.25rem", lineHeight: 1 }}>
                    {accuracy}%
                  </Typography>
                  <Typography sx={{ fontSize: "0.68rem", opacity: 0.82 }}>recalled</Typography>
                </Box>
              )}
            </Stack>
          ) : undefined
        }
      >
        {/* ------------------------------------------------------ the sitting */}
        {!finished && card && (
          <>
            <Stack direction="row" spacing={0.4} sx={{ mb: 2 }}>
              {queue.map((c, i) => (
                <Box
                  key={`${c.id}:${i}`}
                  sx={{
                    flex: 1,
                    height: 5,
                    borderRadius: 999,
                    bgcolor: i < idx ? "#7c3aed" : i === idx ? "color-mix(in srgb, #7c3aed 45%, transparent)" : "var(--border-default)",
                  }}
                />
              ))}
            </Stack>

            <Box
              sx={{
                borderRadius: 5,
                border: "1px solid var(--border-default)",
                bgcolor: "var(--card-bg)",
                overflow: "hidden",
                mb: 2,
              }}
            >
              {/* front */}
              <Box
                sx={{
                  px: { xs: 2.5, md: 4 },
                  py: { xs: 4, md: 5.5 },
                  textAlign: "center",
                  background: "linear-gradient(180deg, color-mix(in srgb, #7c3aed 7%, transparent) 0%, transparent 100%)",
                }}
              >
                <Stack direction="row" justifyContent="center" flexWrap="wrap" sx={{ gap: 0.5, mb: 1.75 }}>
                  {card.tags.slice(0, 3).map((t) => (
                    <Typography
                      key={t}
                      sx={{
                        px: 0.9,
                        py: 0.25,
                        borderRadius: 999,
                        fontSize: "0.66rem",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        bgcolor: "color-mix(in srgb, #7c3aed 12%, transparent)",
                        color: "#6d28d9",
                      }}
                    >
                      {t}
                    </Typography>
                  ))}
                  {card.due_in_days === null && (
                    <Typography
                      sx={{
                        px: 0.9,
                        py: 0.25,
                        borderRadius: 999,
                        fontSize: "0.66rem",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        bgcolor: "color-mix(in srgb, #0ea5e9 12%, transparent)",
                        color: "#0369a1",
                      }}
                    >
                      new
                    </Typography>
                  )}
                  {card.leech && (
                    <Typography
                      sx={{
                        px: 0.9,
                        py: 0.25,
                        borderRadius: 999,
                        fontSize: "0.66rem",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        bgcolor: "color-mix(in srgb, #ef4444 12%, transparent)",
                        color: "#be123c",
                      }}
                    >
                      keeps slipping
                    </Typography>
                  )}
                </Stack>

                <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                  <Typography
                    sx={{
                      fontWeight: 800,
                      fontSize: { xs: "1.6rem", md: "2.1rem" },
                      lineHeight: 1.25,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {card.front}
                  </Typography>
                  {deck.lang && (
                    <ButtonBase
                      onClick={() => speak(card.front)}
                      aria-label="Hear it"
                      sx={{
                        width: 36,
                        height: 36,
                        flexShrink: 0,
                        borderRadius: "50%",
                        bgcolor: "color-mix(in srgb, #7c3aed 12%, transparent)",
                        color: "#6d28d9",
                      }}
                    >
                      <Icon icon="mdi:volume-high" width={19} />
                    </ButtonBase>
                  )}
                </Stack>

                {card.hint && !revealed && (
                  <Typography sx={{ mt: 1.25, fontSize: "0.82rem", color: "var(--text-secondary)", fontStyle: "italic" }}>
                    {card.hint}
                  </Typography>
                )}
              </Box>

              {/* answer */}
              <Box sx={{ px: { xs: 2, md: 3 }, pb: { xs: 2, md: 3 } }}>
                {deck.mode === "type" && !revealed && (
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                    <Box
                      component="input"
                      ref={inputRef as never}
                      value={typed}
                      autoFocus
                      placeholder="type what it means"
                      onChange={(e) => setTyped((e.target as HTMLInputElement).value)}
                      onKeyDown={(e: React.KeyboardEvent) => {
                        if (e.key === "Enter" && typed.trim()) void reveal(3);
                      }}
                      sx={{
                        flex: 1,
                        minWidth: 0,
                        px: 1.5,
                        py: 1.15,
                        borderRadius: 2.5,
                        border: "1px solid var(--border-default)",
                        bgcolor: "var(--card-bg)",
                        font: "inherit",
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: "inherit",
                        outline: "none",
                        "&:focus": { borderColor: "#7c3aed" },
                      }}
                    />
                    <ButtonBase
                      disabled={!typed.trim()}
                      onClick={() => reveal(3)}
                      sx={{
                        px: 2.5,
                        py: 1.15,
                        borderRadius: 2.5,
                        fontWeight: 800,
                        fontSize: "0.87rem",
                        color: "white",
                        flexShrink: 0,
                        background: "linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)",
                        opacity: typed.trim() ? 1 : 0.45,
                      }}
                    >
                      Check
                    </ButtonBase>
                  </Stack>
                )}

                {deck.mode === "flip" && !revealed && (
                  <ButtonBase
                    onClick={() => setRevealed(true)}
                    sx={{
                      width: "100%",
                      py: 1.25,
                      borderRadius: 2.5,
                      fontWeight: 800,
                      fontSize: "0.88rem",
                      border: "1px solid var(--border-default)",
                    }}
                  >
                    <Icon icon="mdi:rotate-3d-variant" width={18} style={{ marginRight: 7 }} />
                    Show the answer
                  </ButtonBase>
                )}

                {revealed && (
                  <Box>
                    <Box
                      sx={{
                        p: 1.75,
                        borderRadius: 3,
                        textAlign: "center",
                        bgcolor:
                          lastReview?.correct === false
                            ? "color-mix(in srgb, #ef4444 8%, transparent)"
                            : "color-mix(in srgb, #10b981 8%, transparent)",
                        border: `1px solid color-mix(in srgb, ${lastReview?.correct === false ? "#ef4444" : "#10b981"} 30%, transparent)`,
                      }}
                    >
                      {deck.mode === "type" && lastReview && (
                        <Stack direction="row" alignItems="center" justifyContent="center" spacing={0.6} sx={{ mb: 0.75 }}>
                          <Icon
                            icon={lastReview.correct ? "mdi:check-circle" : "mdi:close-circle"}
                            width={17}
                            color={lastReview.correct ? "#047857" : "#be123c"}
                          />
                          <Typography
                            sx={{
                              fontSize: "0.78rem",
                              fontWeight: 800,
                              color: lastReview.correct ? "#047857" : "#be123c",
                            }}
                          >
                            {lastReview.correct ? "Recalled" : `You typed "${typed}"`}
                          </Typography>
                        </Stack>
                      )}
                      <Typography sx={{ fontWeight: 800, fontSize: "1.3rem", lineHeight: 1.3 }}>
                        {card.back}
                      </Typography>
                      {card.extra && Object.keys(card.extra).length > 0 && (
                        <Stack
                          direction="row"
                          justifyContent="center"
                          flexWrap="wrap"
                          sx={{ gap: 1, mt: 1.25 }}
                        >
                          {Object.entries(card.extra).map(([k, v]) => (
                            <Box key={k} sx={{ textAlign: "center", px: 1 }}>
                              <Typography
                                sx={{
                                  fontSize: "0.63rem",
                                  fontWeight: 800,
                                  textTransform: "uppercase",
                                  letterSpacing: "0.06em",
                                  color: "var(--text-secondary)",
                                }}
                              >
                                {k}
                              </Typography>
                              <Typography sx={{ fontSize: "0.85rem", fontWeight: 600 }}>{v}</Typography>
                            </Box>
                          ))}
                        </Stack>
                      )}
                    </Box>

                    {/* The schedule, stated. A learner who can see the interval
                        stretching understands why short daily sittings work and
                        a cram the night before does not. */}
                    {lastReview && (
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                        spacing={1.5}
                        sx={{ mt: 1.25 }}
                      >
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                          <Icon icon="mdi:calendar-clock" width={14} color="var(--text-secondary)" />
                          <Typography sx={{ fontSize: "0.77rem", color: "var(--text-secondary)" }}>
                            {lastReview.due_in_days === 0
                              ? "back again later today"
                              : `due again in ${lastReview.due_in_days} day${lastReview.due_in_days === 1 ? "" : "s"}`}
                          </Typography>
                        </Stack>
                        {lastReview.streak > 0 && (
                          <Stack direction="row" alignItems="center" spacing={0.5}>
                            <Icon icon="mdi:fire" width={14} color="#f59e0b" />
                            <Typography sx={{ fontSize: "0.77rem", color: "var(--text-secondary)" }}>
                              {lastReview.streak} in a row
                            </Typography>
                          </Stack>
                        )}
                      </Stack>
                    )}

                    {/* flip mode asks for a self-rating; typed mode has already
                        been marked, so it just moves on. */}
                    {deck.mode === "flip" ? (
                      <Stack direction="row" spacing={0.75} sx={{ mt: 1.5 }}>
                        {(
                          [
                            [0, "No idea", "#ef4444"],
                            [1, "Hard", "#f59e0b"],
                            [2, "Got it", "#10b981"],
                            [3, "Easy", "#0ea5e9"],
                          ] as const
                        ).map(([g, label, colour]) => (
                          <ButtonBase
                            key={g}
                            onClick={async () => {
                              await reveal(g);
                              if (g <= 1) requeue();
                              else next();
                            }}
                            sx={{
                              flex: 1,
                              py: 1.05,
                              borderRadius: 2.5,
                              fontWeight: 800,
                              fontSize: "0.81rem",
                              color: colour,
                              border: `1px solid color-mix(in srgb, ${colour} 40%, transparent)`,
                              bgcolor: `color-mix(in srgb, ${colour} 7%, transparent)`,
                            }}
                          >
                            {label}
                          </ButtonBase>
                        ))}
                      </Stack>
                    ) : (
                      <Stack direction="row" spacing={0.75} sx={{ mt: 1.5 }}>
                        {lastReview?.correct === false && (
                          <ButtonBase
                            onClick={requeue}
                            sx={{
                              flex: 1,
                              py: 1.1,
                              borderRadius: 2.5,
                              fontWeight: 800,
                              fontSize: "0.85rem",
                              border: "1px solid var(--border-default)",
                            }}
                          >
                            <Icon icon="mdi:restore" width={17} style={{ marginRight: 6 }} />
                            See it again this sitting
                          </ButtonBase>
                        )}
                        <ButtonBase
                          onClick={next}
                          sx={{
                            flex: 1,
                            py: 1.1,
                            borderRadius: 2.5,
                            fontWeight: 800,
                            fontSize: "0.85rem",
                            color: "white",
                            background: "linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)",
                          }}
                        >
                          {idx >= queue.length - 1 ? "Finish the sitting" : "Next card"}
                          <Icon icon="mdi:arrow-right" width={17} style={{ marginLeft: 6 }} />
                        </ButtonBase>
                      </Stack>
                    )}
                  </Box>
                )}
              </Box>
            </Box>
          </>
        )}

        {/* ---------------------------------------------------------- summary */}
        {(finished || !card) && (
          <PracticalCard title="Sitting complete" icon="mdi:check-decagram" accent="#7c3aed">
            <Stack direction="row" spacing={2} sx={{ mb: 1.5 }}>
              <Box>
                <Typography sx={{ fontWeight: 800, fontSize: "1.9rem", lineHeight: 1, color: "#047857" }}>
                  {tally.right}
                </Typography>
                <Typography sx={{ fontSize: "0.74rem", color: "var(--text-secondary)" }}>recalled</Typography>
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 800, fontSize: "1.9rem", lineHeight: 1, color: "#be123c" }}>
                  {tally.wrong}
                </Typography>
                <Typography sx={{ fontSize: "0.74rem", color: "var(--text-secondary)" }}>slipped</Typography>
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 800, fontSize: "1.9rem", lineHeight: 1 }}>{accuracy}%</Typography>
                <Typography sx={{ fontSize: "0.74rem", color: "var(--text-secondary)" }}>accuracy</Typography>
              </Box>
            </Stack>
            <Typography sx={{ fontSize: "0.88rem", lineHeight: 1.6, color: "var(--text-secondary)" }}>
              Each card you recalled has had its interval stretched, and each one you missed comes
              back today. Six minutes tomorrow will do more for this than an hour next week, which
              is the entire reason the schedule exists rather than a "revise everything" button.
            </Typography>
          </PracticalCard>
        )}
      </PracticalShell>
    </MainLayout>
  );
}
