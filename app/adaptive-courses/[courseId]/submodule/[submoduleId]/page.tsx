"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Box, Button, ButtonBase, Stack, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import {
  adaptiveCourseService,
  type AdaptiveCourseAttachment,
  type AdaptiveCourseSubModule,
  type PointsBreakdownItem,
  type PointsKind,
  type SubmodulePointsBreakdown,
} from "@/lib/services/adaptive-course.service";
import { MainLayout } from "@/components/layout/MainLayout";
import { AdditionalPractice } from "@/components/adaptive-journey/AdditionalPractice";
import { PointsInfo } from "@/components/common/PointsInfo";
import { AdaptiveSubmoduleSkeleton } from "@/components/courses/CourseSkeletons";
import { useInstantNavigation } from "@/lib/hooks/useInstantNavigation";
import { asStringList } from "@/lib/utils/as-list";
import { attachmentLook, formatFileSize } from "@/lib/utils/attachment-display";
import {
  accentGradient,
  accentShadow,
  accentWash,
  courseTheme,
  heroGradient,
  type CourseTheme,
} from "@/lib/theme/courseTheme";

type FlowKind =
  | "video"
  | "article"
  | "quiz"
  | "coding"
  /* Practical kinds. See lib/services/practicals.service.ts. */
  | "worksheet"
  | "scenario"
  | "evidence"
  | "lab"
  | "deck"
  | "speaking"
  | "partid"
  | "deliverable";
type StepStatus = "done" | "current" | "upcoming";

interface FlowItem {
  kind: FlowKind;
  key: string;
  /** Matches the points-breakdown content_key (`kind:id`) so each row can show its points. */
  contentKey: string;
  title: string;
  chips: { icon: string; text: string }[];
  onClick: () => void;
  /** Destination URL - used to prefetch the route on hover for instant open. */
  href: string;
  /**
   * One line saying what the step is, shown only on the feature card.
   *
   * The feature card is full width and was mostly empty between the title and
   * the button. This is the sentence the API already sends with every
   * practical, and it answers the question the big card raises: what am I
   * actually about to do.
   */
  blurb?: string;
  completed: boolean;
  /** Where "Review" goes once completed (e.g. past quiz results); falls back to onClick. */
  onReview?: () => void;
  reviewHref?: string;
}

// "% correct"-style factor only means something for graded/timed content; articles are flat.
const KIND_CORRECTNESS: Partial<Record<PointsKind, string>> = {
  quiz: "correct", coding: "tests passed", video: "watched",
};

const VERB: Record<FlowKind, string> = {
  video: "watch", article: "read", quiz: "quiz", coding: "practice",
  deck: "drill", worksheet: "work it", partid: "identify", speaking: "speak",
  scenario: "decide", lab: "perform", evidence: "film it", deliverable: "produce",
};

/**
 * The order a lesson's steps are presented in.
 *
 * Read, then recall, then do, then prove. A deck sits early because recalling
 * the terms makes the reading usable; an evidence task and a deliverable sit
 * last because they are the ones that need everything above them first.
 */
const KIND_ORDER: FlowKind[] = [
  "video", "article", "deck", "quiz", "worksheet", "partid",
  "speaking", "scenario", "coding", "lab", "evidence", "deliverable",
];

/**
 * Per-content-type identity - same palette family as the course timeline nodes.
 *
 * Every practical kind gets its own label, icon and colour rather than sharing a
 * generic "PRACTICAL" chip. The row is where a learner decides what to open
 * next, and "EVIDENCE" against "WORKSHEET" is the distinction that tells them
 * whether they need a camera and a spanner or twenty quiet minutes.
 */
const FLOW_META: Record<FlowKind, { label: string; icon: string; action: string; actionIcon: string; color: string; bg: string }> = {
  video: { label: "WATCH", icon: "mdi:play-circle", action: "Watch", actionIcon: "mdi:play", color: "#0ea5e9", bg: "#e0f2fe" },
  article: { label: "READ", icon: "mdi:book-open-page-variant", action: "Read", actionIcon: "mdi:book-open-page-variant-outline", color: "#a855f7", bg: "#f5f3ff" },
  quiz: { label: "QUIZ", icon: "mdi:tune-vertical", action: "Start", actionIcon: "mdi:play", color: "#6366f1", bg: "#eef2ff" },
  coding: { label: "PRACTICE", icon: "mdi:code-tags", action: "Solve", actionIcon: "mdi:code-tags", color: "#ec4899", bg: "#fdf2f8" },
  worksheet: { label: "WORKING PAPER", icon: "mdi:table-large", action: "Open sheet", actionIcon: "mdi:table-edit", color: "#0f766e", bg: "#ecfdf5" },
  scenario: { label: "DECISION RUN", icon: "mdi:arrow-decision", action: "Begin", actionIcon: "mdi:play", color: "#b45309", bg: "#fffbeb" },
  evidence: { label: "EVIDENCE", icon: "mdi:camera-outline", action: "Submit work", actionIcon: "mdi:upload", color: "#be123c", bg: "#fff1f2" },
  lab: { label: "PROCEDURE", icon: "mdi:clipboard-check-outline", action: "Start", actionIcon: "mdi:play", color: "#0369a1", bg: "#f0f9ff" },
  deck: { label: "RECALL", icon: "mdi:cards-outline", action: "Drill", actionIcon: "mdi:lightning-bolt", color: "#7c3aed", bg: "#f5f3ff" },
  speaking: { label: "SPEAKING", icon: "mdi:microphone-outline", action: "Speak", actionIcon: "mdi:microphone", color: "#c2410c", bg: "#fff7ed" },
  partid: { label: "PARTS", icon: "mdi:vector-polyline", action: "Identify", actionIcon: "mdi:cursor-default-click-outline", color: "#4338ca", bg: "#eef2ff" },
  deliverable: { label: "DELIVERABLE", icon: "mdi:file-document-edit-outline", action: "Produce", actionIcon: "mdi:upload", color: "#166534", bg: "#f0fdf4" },
};

/**
 * What each built-in kind actually is, in one line.
 *
 * Shown only on the feature card, which is full width and was otherwise empty
 * between the title and the button. Practicals carry their own `detail` from
 * the API, so they are not listed here.
 */
const KIND_BLURB: Partial<Record<FlowKind, string>> = {
  article:
    "The lesson itself. It re-renders at four reading levels, so you can take it as plain English or as a deeper treatment.",
  quiz:
    "An adaptive check. Answer well and it gets harder, miss one and it steps back, and it stops as soon as it is sure of your level.",
  coding:
    "Write the code and run it against real test cases. Hints come in three rungs, a nudge first and the mechanism last.",
  video: "A walkthrough with check-in questions along the way.",
};

/** Route segment per practical kind. Matches app/adaptive-courses/.../<seg>/[id]. */
const PRACTICAL_SEGMENT: Record<string, string> = {
  worksheet: "worksheet",
  scenario: "scenario",
  evidence: "evidence",
  lab: "lab",
  deck: "deck",
  speaking: "speaking",
  partid: "parts",
  deliverable: "deliverable",
};

function buildItems(
  sm: AdaptiveCourseSubModule,
  courseId: number,
  submoduleId: number,
  nav: (href: string) => void,
): FlowItem[] {
  const items: FlowItem[] = [];
  (sm.video_companions ?? []).forEach((vc) => {
    const href = `/adaptive-courses/${courseId}/submodule/${submoduleId}/video/${vc.id}`;
    items.push({
      kind: "video", key: `v${vc.id}`, contentKey: `video:${vc.id}`, title: vc.title, completed: !!vc.completed,
      blurb: KIND_BLURB.video,
      chips: [
        ...(vc.duration_seconds > 0 ? [{ icon: "mdi:clock-outline", text: `~${Math.round(vc.duration_seconds / 60)} min` }] : []),
        ...(vc.check_in_count > 0 ? [{ icon: "mdi:lightning-bolt", text: `${vc.check_in_count} check-ins` }] : []),
      ],
      href, onClick: () => nav(href),
    });
  });
  sm.articles.forEach((a) => {
    const href = `/adaptive-courses/${courseId}/submodule/${submoduleId}/article/${a.article_id}`;
    items.push({
      kind: "article", key: `a${a.article_id}`, contentKey: `article:${a.article_id}`, title: a.title, completed: !!a.completed,
      blurb: KIND_BLURB.article,
      chips: [
        { icon: "mdi:clock-outline", text: `~${a.reading_time_minutes} min` },
        { icon: "mdi:tune-vertical", text: `${a.default_tier} · adapts` },
      ],
      href, onClick: () => nav(href),
    });
  });
  sm.quizzes.forEach((q) => {
    const href = `/adaptive-quizzes/start?configId=${q.config_id}`;
    const reviewHref = q.last_session_id ? `/adaptive-quizzes/session/${q.last_session_id}/results` : undefined;
    items.push({
      kind: "quiz", key: `q${q.config_id}`, contentKey: `quiz:${q.config_id}`, title: q.quiz_title, completed: !!q.completed,
      blurb: KIND_BLURB.quiz,
      chips: [
        { icon: "mdi:database-outline", text: `${q.mcq_count}-item bank` },
        { icon: "mdi:arrow-decision-outline", text: `serves ${q.min_questions}–${q.max_questions}` },
        ...asStringList(q.target_skills).slice(0, 2).map((s) => ({ icon: "mdi:tag-outline", text: s })),
      ],
      href, onClick: () => nav(href),
      // Completed → open the last attempt's results instead of restarting.
      reviewHref, onReview: reviewHref ? () => nav(reviewHref) : undefined,
    });
  });
  (sm.coding_sets ?? []).forEach((set) =>
    set.problems.forEach((p) => {
      const href = `/adaptive-courses/${courseId}/submodule/${submoduleId}/coding/${p.problem_id}?configId=${set.config_id}`;
      items.push({
        kind: "coding", key: `c${p.problem_id}`, contentKey: `coding:${p.problem_id}`, title: p.title, completed: !!p.completed,
        blurb: KIND_BLURB.coding,
        chips: [
          { icon: "mdi:speedometer", text: p.difficulty_level },
          ...asStringList(p.target_skills).slice(0, 2).map((s) => ({ icon: "mdi:tag-outline", text: s })),
        ],
        href, onClick: () => nav(href),
      });
    }),
  );
  // Practicals. The chips come from `facts`, which the API has already worded,
  // because what is worth saying differs per kind: a deck's useful fact is how
  // many cards are due, a lab's is how many steps cannot be skipped.
  (sm.practicals ?? []).forEach((p) => {
    const seg = PRACTICAL_SEGMENT[p.kind];
    if (!seg) return;
    const href = `/adaptive-courses/${courseId}/submodule/${submoduleId}/${seg}/${p.id}`;
    const FACT_ICON: Record<string, string> = {
      worksheet: "mdi:table-large", scenario: "mdi:arrow-decision-outline",
      evidence: "mdi:camera-outline", lab: "mdi:clipboard-list-outline",
      deck: "mdi:cards-outline", speaking: "mdi:waveform",
      partid: "mdi:map-marker-outline", deliverable: "mdi:paperclip",
    };
    items.push({
      kind: p.kind as FlowKind,
      key: `p${p.id}`,
      contentKey: `${p.kind}:${p.id}`,
      title: p.title,
      completed: !!p.completed,
      blurb: p.detail,
      chips: [
        ...(p.minutes ? [{ icon: "mdi:clock-outline", text: `~${p.minutes} min` }] : []),
        ...p.facts.slice(0, 3).map((f) => ({ icon: FACT_ICON[p.kind] ?? "mdi:information-outline", text: f })),
      ],
      href,
      onClick: () => nav(href),
    });
  });
  return items;
}

export default function AdaptiveCourseSubmodulePage() {
  const { push, prefetch } = useInstantNavigation();
  const params = useParams();
  const courseId = Number(params.courseId);
  const submoduleId = Number(params.submoduleId);
  const [submodule, setSubmodule] = useState<AdaptiveCourseSubModule | null>(null);
  const [points, setPoints] = useState<SubmodulePointsBreakdown | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [locked, setLocked] = useState<string | null>(null);  // server-enforced journey lock reason

  useEffect(() => {
    if (!Number.isFinite(courseId) || !Number.isFinite(submoduleId)) return;
    let cancelled = false;
    (async () => {
      try {
        const data = await adaptiveCourseService.getSubmodule(courseId, submoduleId);
        if (!cancelled) setSubmodule(data);
      } catch (e) {
        if (cancelled) return;
        const resp = (e as { response?: { status?: number; data?: { locked?: boolean; detail?: string } } })?.response;
        if (resp?.status === 403 && resp?.data?.locked) {
          setLocked(resp.data.detail || "Complete the calibration assessment first.");
        } else {
          setError(e instanceof Error ? e.message : "Failed to load submodule.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [courseId, submoduleId]);

  // Per-content points (best-effort) - surfaced inline on each learning-path row.
  useEffect(() => {
    if (!Number.isFinite(courseId) || !Number.isFinite(submoduleId)) return;
    let cancelled = false;
    adaptiveCourseService.getSubmodulePoints(courseId, submoduleId)
      .then((d) => { if (!cancelled) setPoints(d); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [courseId, submoduleId]);

  /**
   * The parent course's colour.
   *
   * Every lesson in the product used to render the same violet hero, so a
   * refrigeration lesson and an accounting lesson were the same screen with
   * different words on it. Falls back to that violet when the payload has no
   * theme, which keeps any course that predates the field unchanged.
   */
  const theme = useMemo(() => courseTheme(submodule?.course_theme), [submodule?.course_theme]);

  const pointsByKey = useMemo(
    () => new Map((points?.items ?? []).map((i) => [i.content_key, i])),
    [points],
  );

  const items = useMemo(
    () => (submodule ? buildItems(submodule, courseId, submoduleId, push) : []),
    [submodule, courseId, submoduleId, push],
  );

  const meta = useMemo(() => {
    if (!submodule) return { counts: {} as Record<FlowKind, number>, estMin: 0 };
    const counts = Object.fromEntries(KIND_ORDER.map((k) => [k, 0])) as Record<FlowKind, number>;
    items.forEach((i) => { counts[i.kind] += 1; });
    let estMin = 0;
    (submodule.video_companions ?? []).forEach((v) => { estMin += Math.round((v.duration_seconds || 0) / 60); });
    submodule.articles.forEach((a) => { estMin += a.reading_time_minutes || 0; });
    submodule.quizzes.forEach((q) => { estMin += Math.round(((q.min_questions + q.max_questions) / 2) * 0.75); });
    (submodule.coding_sets ?? []).forEach((s) => s.problems.forEach(() => { estMin += 15; }));
    // Each practical states its own duration, and they are long enough that
    // omitting them understated a refrigeration lesson by about an hour.
    (submodule.practicals ?? []).forEach((p) => { estMin += p.minutes || 0; });
    return { counts, estMin };
  }, [submodule, items]);

  /** Hands-on steps, as one figure. The kinds are listed on the rows themselves. */
  const practicalTotal = items.filter((i) =>
    ["worksheet", "scenario", "evidence", "lab", "deck", "speaking", "partid", "deliverable"].includes(i.kind),
  ).length;

  // Progress: first incomplete step = "current"; everything before it that's done = "done".
  const doneCount = items.filter((i) => i.completed).length;
  const firstIncomplete = items.findIndex((i) => !i.completed);
  const allDone = items.length > 0 && firstIncomplete < 0;
  const resumeIdx = allDone ? 0 : firstIncomplete;

  const metaPills: { icon: string; label: string }[] = submodule
    ? [
        { icon: "mdi:map-marker-path", label: `${items.length} step${items.length === 1 ? "" : "s"}` },
        ...(doneCount ? [{ icon: "mdi:check-circle-outline", label: `${doneCount}/${items.length} done` }] : []),
        ...(meta.counts.video ? [{ icon: "mdi:play-circle-outline", label: `${meta.counts.video} video${meta.counts.video > 1 ? "s" : ""}` }] : []),
        ...(meta.counts.article ? [{ icon: "mdi:book-open-variant", label: `${meta.counts.article} article${meta.counts.article > 1 ? "s" : ""}` }] : []),
        ...(meta.counts.quiz ? [{ icon: "mdi:tune-variant", label: `${meta.counts.quiz} quiz${meta.counts.quiz > 1 ? "zes" : ""}` }] : []),
        ...(meta.counts.coding ? [{ icon: "mdi:code-tags", label: `${meta.counts.coding} coding` }] : []),
        ...(practicalTotal
          ? [{ icon: "mdi:hammer-wrench", label: `${practicalTotal} hands-on` }]
          : []),
        ...(meta.estMin ? [{ icon: "mdi:clock-outline", label: `~${meta.estMin} min` }] : []),
      ]
    : [];

  // Dynamic path subtitle - reflects the steps + progress + the actual content sequence.
  const flowVerbs = KIND_ORDER.filter((k) => (meta.counts[k] ?? 0) > 0).map((k) => VERB[k]);
  const pathSubtitle =
    `${items.length} step${items.length === 1 ? "" : "s"}` +
    (doneCount ? ` · ${doneCount} done` : "") +
    (flowVerbs.length ? ` · ${flowVerbs.join(" → ")}` : "");

  const ctaLabel = allDone ? "Review topic" : doneCount > 0 ? "Continue learning" : "Start learning";

  return (
    <MainLayout fullWidthContent>
      <Box data-tour-id="submodule-body" sx={{ maxWidth: 1760, mx: "auto", px: { xs: 2, md: 3 }, py: { xs: 3, md: 4 } }}>
        {loading && <AdaptiveSubmoduleSkeleton />}
        {error && (
          <Typography sx={{ color: "#ef4444", fontWeight: 700, textAlign: "center", py: 6 }}>{error}</Typography>
        )}
        {locked && (
          <Box sx={{ textAlign: "center", py: 8, px: 2, maxWidth: 520, mx: "auto" }}>
            <Box sx={{ width: 56, height: 56, mx: "auto", mb: 1.5, borderRadius: "50%", display: "grid", placeItems: "center", color: "white", background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)" }}>
              <Icon icon="mdi:lock-outline" width={28} />
            </Box>
            <Typography sx={{ fontWeight: 800, fontSize: "1.15rem" }}>This step is locked</Typography>
            <Typography sx={{ color: "text.secondary", mt: 0.75, lineHeight: 1.5 }}>{locked}</Typography>
            <ButtonBase
              onMouseEnter={() => prefetch(`/adaptive-courses/${courseId}`)}
              onClick={() => push(`/adaptive-courses/${courseId}`)}
              sx={{ mt: 2.5, px: 2.5, py: 1, borderRadius: 999, fontWeight: 800, color: "white", background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)" }}
            >
              Go to course
            </ButtonBase>
          </Box>
        )}

        {submodule && (
          <>
            {/* Gradient hero - matches the course page */}
            <Box sx={{ borderRadius: 5, p: { xs: 2.5, md: 3.5 }, mb: 2.5, color: "white", position: "relative", overflow: "hidden", background: heroGradient(theme), boxShadow: accentShadow(theme) }}>
              <ButtonBase onMouseEnter={() => prefetch(`/adaptive-courses/${courseId}`)} onClick={() => push(`/adaptive-courses/${courseId}`)} sx={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.8)", mb: 1, gap: 0.5 }}>
                <Icon icon="mdi:arrow-left" width={14} /> Back to course
              </ButtonBase>
              <Stack direction="row" spacing={0.75} sx={{ mb: 1 }}>
                <Box sx={{ px: 1, py: 0.4, borderRadius: 999, fontSize: "0.66rem", fontWeight: 800, letterSpacing: 0.5, color: "white", bgcolor: "rgba(255,255,255,0.18)" }}>TOPIC</Box>
                {allDone && (
                  <Stack direction="row" spacing={0.4} alignItems="center" sx={{ px: 1, py: 0.4, borderRadius: 999, fontSize: "0.66rem", fontWeight: 800, color: "white", bgcolor: "rgba(34,197,94,0.32)" }}>
                    <Icon icon="mdi:check-circle" width={13} /> COMPLETED
                  </Stack>
                )}
              </Stack>
              <Typography sx={{ fontWeight: 900, fontSize: { xs: "1.6rem", md: "2rem" }, lineHeight: 1.15 }}>{submodule.title}</Typography>
              {submodule.description && (
                <Typography sx={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.82)", mt: 1, maxWidth: { xs: "100%", md: 1100 }, lineHeight: 1.5 }}>{submodule.description}</Typography>
              )}
              <Stack direction="row" flexWrap="wrap" gap={1.5} sx={{ mt: 1.75 }}>
                {metaPills.map((m) => (
                  <Stack key={m.label} direction="row" spacing={0.5} alignItems="center" sx={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.85)" }}>
                    <Icon icon={m.icon} width={15} />
                    {m.label}
                  </Stack>
                ))}
              </Stack>
              {items.length > 0 && (
                <Button onClick={() => items[resumeIdx].onClick()} variant="contained"
                  endIcon={<Icon icon="mdi:arrow-right" width={18} />}
                  sx={{ mt: 2.25, px: 2.5, py: 1, borderRadius: 2, fontWeight: 800, fontSize: "0.85rem", color: theme.accent[0], bgcolor: "white", textTransform: "none", "&:hover": { bgcolor: accentWash(theme, 12) } }}>
                  {ctaLabel}
                </Button>
              )}
            </Box>

            {items.length === 0 ? (
              // Handouts are not steps, so a topic can hold them and still have an empty path.
              // Saying "no content" over a list of downloadable material would be a lie.
              (submodule.attachments?.length ?? 0) === 0 && (
                <Box sx={{ p: 5, textAlign: "center", borderRadius: 4, border: "1px dashed var(--border-default, #ececf1)" }}>
                  <Icon icon="mdi:inbox-outline" width={40} style={{ opacity: 0.4 }} />
                  <Typography sx={{ color: "text.secondary", mt: 1 }}>No content in this topic yet.</Typography>
                </Box>
              )
            ) : (
              <Box sx={{ minWidth: 0 }}>
                {/* Section header with gradient badge + the topic points total */}
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.75, gap: 1, flexWrap: "wrap" }}>
                  <Stack direction="row" spacing={1.25} alignItems="center">
                    <Box sx={{ width: 34, height: 34, borderRadius: 2.5, display: "grid", placeItems: "center", color: "white", background: accentGradient(theme), boxShadow: accentShadow(theme, 44) }}>
                      <Icon icon="mdi:map-marker-path" width={19} />
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 800, fontSize: "1.1rem", color: "#0f172a" }}>Your learning path</Typography>
                      <Typography sx={{ fontSize: "0.8rem", color: "#64748b" }}>{pathSubtitle}</Typography>
                    </Box>
                  </Stack>
                  {points && (
                    <Stack direction="row" spacing={0.6} alignItems="center" sx={{ pl: 1.25, pr: 0.5, py: 0.5, borderRadius: 999, bgcolor: "#fff7ed", border: "1px solid #fed7aa" }}>
                      <Icon icon="mdi:trophy" width={15} color="#f59e0b" />
                      <Typography sx={{ fontSize: "0.82rem", fontWeight: 800, color: "#9a3412" }}>
                        {points.topic.earned}<Box component="span" sx={{ color: "#c2853a", fontWeight: 700 }}> / {points.topic.on_offer} pts</Box>
                      </Typography>
                      <PointsInfo size={14} color="#c2853a" />
                    </Stack>
                  )}
                </Stack>

                <LearningBoard
                  items={items}
                  firstIncomplete={firstIncomplete}
                  pointsByKey={pointsByKey}
                  theme={theme}
                  onPrefetch={(it) => prefetch(it.completed && it.reviewHref ? it.reviewHref : it.href)}
                />
              </Box>
            )}

            {/* Handouts - reference material, deliberately outside the numbered path: there is
                nothing to complete and no points to earn, so numbering them as steps would
                inflate "N steps" and make the resume button point at a download. */}
            <TopicHandouts attachments={submodule.attachments ?? []} />

            {/* Additional Practice - learner-generated extra content (no points) */}
            <AdditionalPractice courseId={courseId} submoduleId={submoduleId} />
          </>
        )}
      </Box>
    </MainLayout>
  );
}

/**
 * Downloadable material for this topic — decks, worksheets, specs.
 *
 * Every link opens in a new tab rather than navigating: a student who taps a 12MB PDF and lands
 * on a blank viewer has lost the lesson they were halfway through. `noopener` because these are
 * signed storage URLs leaving the app.
 */
function TopicHandouts({ attachments }: { attachments: AdaptiveCourseAttachment[] }) {
  if (attachments.length === 0) return null;
  return (
    <Box sx={{ mt: 3 }}>
      <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 1.5 }}>
        <Box sx={{ width: 34, height: 34, borderRadius: 2.5, display: "grid", placeItems: "center", color: "white", background: "linear-gradient(135deg, #14b8a6 0%, #0ea5e9 100%)", boxShadow: "0 8px 18px -10px rgba(20,184,166,0.6)" }}>
          <Icon icon="mdi:paperclip" width={19} />
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 800, fontSize: "1.1rem", color: "#0f172a" }}>Handouts</Typography>
          <Typography sx={{ fontSize: "0.8rem", color: "#64748b" }}>
            {attachments.length} file{attachments.length === 1 ? "" : "s"} to download · not graded
          </Typography>
        </Box>
      </Stack>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr" }, gap: 1.25 }}>
        {attachments.map((a) => {
          const look = attachmentLook(a);
          const size = formatFileSize(a.size_bytes);
          return (
            <ButtonBase
              key={a.id}
              component="a"
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              // The filename, so a download lands in the student's folder with a name they
              // recognise rather than the server's key.
              download={a.original_name || undefined}
              sx={{
                display: "flex", alignItems: "flex-start", gap: 1.25, p: 1.5, textAlign: "left",
                borderRadius: 3, border: "1px solid var(--border-default, #ececf1)",
                bgcolor: "var(--card-bg, #fff)", transition: "border-color .15s, transform .15s",
                "&:hover": { borderColor: look.accent, transform: "translateY(-1px)" },
              }}
            >
              <Box sx={{ width: 38, height: 38, borderRadius: 2, flexShrink: 0, display: "grid", placeItems: "center", bgcolor: `color-mix(in srgb, ${look.accent} 12%, transparent)` }}>
                <Icon icon={look.icon} width={22} color={look.accent} />
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ fontWeight: 700, fontSize: "0.88rem", lineHeight: 1.3 }}>{a.title}</Typography>
                {a.description && (
                  <Typography sx={{ fontSize: "0.76rem", color: "text.secondary", mt: 0.35, lineHeight: 1.4 }}>
                    {a.description}
                  </Typography>
                )}
                <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: 0.6, fontSize: "0.72rem", color: "#64748b", fontWeight: 700 }}>
                  <Box component="span" sx={{ color: look.accent }}>{look.label}</Box>
                  {size && <Box component="span">· {size}</Box>}
                  <Icon icon="mdi:tray-arrow-down" width={13} />
                </Stack>
              </Box>
            </ButtonBase>
          );
        })}
      </Box>
    </Box>
  );
}

function FactorChip({ text, tone = "muted" }: { text: string; tone?: "muted" | "warn" | "good" }) {
  const s =
    tone === "good" ? { color: "#15803d", bgcolor: "#dcfce7" }
    : tone === "warn" ? { color: "#b45309", bgcolor: "#fef3c7" }
    : { color: "#475569", bgcolor: "#f1f5f9" };
  return <Box component="span" sx={{ px: 0.75, py: 0.2, borderRadius: 999, fontSize: "0.64rem", fontWeight: 700, ...s }}>{text}</Box>;
}

/** Inline "how these points were earned" chips - base → time → accuracy → late → weight = earned. */
function PointsFactors({ item }: { item: PointsBreakdownItem }) {
  const b = item.breakdown;
  if (!b) return null;
  const factors: { text: string; tone?: "muted" | "warn" | "good" }[] = [{ text: `${b.base} base` }];
  if (b.after_decay < b.base) factors.push({ text: `time −${Math.round(b.base - b.after_decay)}`, tone: "warn" });
  const accLabel = KIND_CORRECTNESS[item.kind];
  if (accLabel) factors.push({ text: `${Math.round(b.correctness_factor * 100)}% ${accLabel}` });
  if (b.late_penalty_mult < 1) factors.push({ text: `late −${Math.round((1 - b.late_penalty_mult) * 100)}%`, tone: "warn" });
  if (b.weight > 1) factors.push({ text: `×${b.weight} weight` });
  return (
    <Stack direction="row" flexWrap="wrap" useFlexGap alignItems="center" sx={{ gap: 0.5, mt: 0.85 }}>
      {factors.map((f, i) => (
        <Box key={i} component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 0.4 }}>
          {i > 0 && <Icon icon="mdi:chevron-right" width={11} color="#cbd5e1" />}
          <FactorChip text={f.text} tone={f.tone} />
        </Box>
      ))}
      <Icon icon="mdi:equal" width={11} color="#cbd5e1" style={{ marginLeft: 1 }} />
      <FactorChip text={`${item.earned} pts`} tone="good" />
    </Stack>
  );
}

/**
 * How much room a step earns on the board.
 *
 * The old layout gave a three minute flashcard drill and a ninety minute
 * filmed assessment the same box, which is a to-do list rather than a plan: it
 * tells a learner the order of the work and nothing about its shape. Size here
 * is driven by what the step actually costs, so a topic with an evidence task
 * in it looks different from one with three short drills, and the difference
 * is information rather than decoration.
 */
type StepSize = "feature" | "wide" | "tall" | "compact";

/** Kinds that are an afternoon's work rather than a coffee break. */
const HEAVY_KINDS = new Set<FlowKind>(["evidence", "deliverable"]);
/** Kinds that need a desk and a clear half hour. */
const SUBSTANTIAL_KINDS = new Set<FlowKind>(["worksheet", "lab", "scenario", "coding", "partid"]);

function sizeFor(item: FlowItem, isCurrent: boolean): StepSize {
  // Whatever comes next is the only thing the learner has to decide about, so
  // it takes the full width regardless of how heavy it is.
  if (isCurrent) return "feature";
  // Finished work stays visible and stops competing for attention.
  if (item.completed) return "compact";
  if (HEAVY_KINDS.has(item.kind)) return "wide";
  if (SUBSTANTIAL_KINDS.has(item.kind)) return "tall";
  return "compact";
}

const SPAN: Record<StepSize, string> = {
  feature: "1 / -1",
  // A heavy step takes the whole row. Two columns rather than three because a
  // topic typically has two or three steps after the current one, and a third
  // column left most rows a third empty.
  wide: "1 / -1",
  tall: "span 1",
  compact: "span 1",
};

/**
 * The learning path as a board rather than a list.
 *
 * A six column grid so a wide card can take two of three visible columns
 * without the arithmetic fighting the breakpoints.
 */
function LearningBoard({
  items,
  firstIncomplete,
  pointsByKey,
  theme,
  onPrefetch,
}: {
  items: FlowItem[];
  firstIncomplete: number;
  pointsByKey: Map<string, PointsBreakdownItem>;
  theme: CourseTheme;
  onPrefetch: (item: FlowItem) => void;
}) {
  /**
   * Pack the half-width cards into rows of two, and widen the last one when it
   * would otherwise sit alone beside an empty column.
   *
   * Done as a pass over the list rather than with CSS because the grid cannot
   * know that a trailing single card looks like a mistake, and a topic with
   * three steps hits that case constantly.
   */
  const layout = useMemo(() => {
    const sizes = items.map((it, idx) => sizeFor(it, idx === firstIncomplete));
    const spans = sizes.map((sz) => SPAN[sz]);
    let run = 0;
    for (let i = 0; i < sizes.length; i++) {
      const half = spans[i] === "span 1";
      if (!half) {
        run = 0;
        continue;
      }
      run += 1;
      const nextIsHalf = i + 1 < sizes.length && spans[i + 1] === "span 1";
      // A half-width card that is the only one in its row gets the whole row.
      if (run % 2 === 1 && !nextIsHalf) spans[i] = "1 / -1";
      if (run % 2 === 0) run = 0;
    }
    return items.map((item, idx) => ({ item, idx, span: spans[idx] }));
  }, [items, firstIncomplete]);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
        gap: 1.5,
        alignItems: "stretch",
      }}
    >
      {layout.map(({ item: it, idx, span }) => {
        const isCurrent = idx === firstIncomplete;
        const size = sizeFor(it, isCurrent);
        return (
          <Box key={it.key} sx={{ gridColumn: { xs: "1 / -1", md: span } }}>
            <StepCard
              item={it}
              step={idx + 1}
              size={size}
              status={it.completed ? "done" : isCurrent ? "current" : "upcoming"}
              points={pointsByKey.get(it.contentKey)}
              theme={theme}
              onPrefetch={() => onPrefetch(it)}
            />
          </Box>
        );
      })}
    </Box>
  );
}

function StepCard({
  item,
  step,
  size,
  status,
  points,
  theme,
  onPrefetch,
}: {
  item: FlowItem;
  step: number;
  size: StepSize;
  status: StepStatus;
  points?: PointsBreakdownItem;
  theme: CourseTheme;
  onPrefetch?: () => void;
}) {
  const m = FLOW_META[item.kind];
  const done = status === "done";
  const current = status === "current";
  const feature = size === "feature";
  // When done, tapping the card opens past results where there are any, rather
  // than restarting the activity.
  const reviewAction = item.onReview ?? item.onClick;
  const cardAction = done ? reviewAction : item.onClick;
  // Heavy kinds are marked by a person, which is worth saying on the card
  // rather than discovering after a 90 minute capture.
  const humanGraded = HEAVY_KINDS.has(item.kind);

  return (
    <Box
      onMouseEnter={onPrefetch}
      onClick={cardAction}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        borderRadius: 3.5,
        cursor: "pointer",
        border: "1px solid",
        borderColor: current ? `color-mix(in srgb, ${m.color} 45%, transparent)` : "#eef2f7",
        bgcolor: done ? "#fcfcfd" : "#fff",
        opacity: done ? 0.92 : 1,
        boxShadow: current
          ? `0 18px 40px -26px ${m.color}`
          : "0 1px 2px rgba(16,24,40,0.04)",
        transition: "transform .15s, box-shadow .15s, border-color .15s",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: `0 18px 36px -24px ${m.color}`,
          borderColor: `color-mix(in srgb, ${m.color} 55%, transparent)`,
        },
      }}
    >
      {/* The kind's colour as a band across the top, so a board of eight cards
          reads as eight different activities at a glance rather than as a wall
          of white boxes with small coloured text. */}
      <Box
        sx={{
          height: feature ? 5 : 4,
          background: `linear-gradient(90deg, ${m.color} 0%, color-mix(in srgb, ${m.color} 45%, ${theme.accent[1]}) 100%)`,
        }}
      />

      <Box sx={{ p: feature ? { xs: 2, md: 2.75 } : 1.85, flex: 1, display: "flex", flexDirection: "column" }}>
        <Stack direction="row" alignItems="flex-start" spacing={1.4}>
          <Box
            sx={{
              width: feature ? 52 : 40,
              height: feature ? 52 : 40,
              borderRadius: feature ? 3 : 2.25,
              flexShrink: 0,
              display: "grid",
              placeItems: "center",
              color: done ? "#64748b" : m.color,
              bgcolor: done ? "#f1f5f9" : m.bg,
            }}
          >
            <Icon icon={done ? "mdi:check" : m.icon} width={feature ? 27 : 21} />
          </Box>

          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Stack direction="row" spacing={0.7} alignItems="center" flexWrap="wrap" sx={{ gap: 0.6 }}>
              <Typography sx={{ fontSize: "0.63rem", fontWeight: 800, letterSpacing: 0.6, color: m.color }}>
                {m.label}
              </Typography>
              {current && (
                <Typography
                  sx={{
                    px: 0.8, py: 0.18, borderRadius: 999, fontSize: "0.6rem", fontWeight: 800,
                    color: "white", bgcolor: m.color,
                  }}
                >
                  DO THIS NEXT
                </Typography>
              )}
              {done && (
                <Typography sx={{ fontSize: "0.6rem", fontWeight: 800, color: "#15803d" }}>
                  · Completed
                </Typography>
              )}
              {!done && humanGraded && (
                <Stack direction="row" spacing={0.3} alignItems="center">
                  <Icon icon="mdi:account-check-outline" width={11} color="#64748b" />
                  <Typography sx={{ fontSize: "0.6rem", fontWeight: 700, color: "#64748b" }}>
                    assessor marked
                  </Typography>
                </Stack>
              )}
            </Stack>

            <Typography
              sx={{
                fontWeight: 800,
                fontSize: feature ? { xs: "1.08rem", md: "1.22rem" } : "0.94rem",
                color: "#0f172a",
                lineHeight: 1.3,
                mt: 0.35,
              }}
            >
              {item.title}
            </Typography>
            {feature && item.blurb && (
              <Typography sx={{ fontSize: "0.86rem", color: "#64748b", lineHeight: 1.5, mt: 0.6, maxWidth: 640 }}>
                {item.blurb}
              </Typography>
            )}
          </Box>

          {/* The step number is a quiet ordinal in the corner now. It was a
              timeline rail, which forced every card to the same height. */}
          <Typography
            sx={{
              flexShrink: 0, fontSize: "0.7rem", fontWeight: 800,
              color: done ? "#86efac" : current ? m.color : "#cbd5e1",
            }}
          >
            {String(step).padStart(2, "0")}
          </Typography>
        </Stack>

        {item.chips.length > 0 && (
          <Stack direction="row" flexWrap="wrap" sx={{ gap: 0.6, mt: 1.1 }}>
            {/* Three facts on a compact card, four on anything larger.
                Two was one too few: a worksheet's chips run duration,
                difficulty, marked cells, balance rules, so cutting at two
                dropped "30 marked cells" and the card stopped saying the one
                thing that distinguishes a working paper from a quiz. */}
            {item.chips.slice(0, size === "compact" ? 3 : 4).map((c, i) => (
              <Stack
                key={i}
                direction="row"
                spacing={0.35}
                alignItems="center"
                sx={{
                  px: 0.9, py: 0.3, borderRadius: 999, fontSize: "0.7rem", fontWeight: 600,
                  color: "#475569", bgcolor: "#f6f8fb", border: "1px solid #eaeff5",
                }}
              >
                <Icon icon={c.icon} width={12} />
                {c.text}
              </Stack>
            ))}
          </Stack>
        )}

        {done && points && <PointsFactors item={points} />}

        {/* Pushed to the bottom so cards of different heights still line their
            actions up along a common baseline. */}
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: "auto", pt: 1.4 }}>
          {points && (
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontWeight: 800, fontSize: feature ? "1rem" : "0.86rem", lineHeight: 1, color: done ? "#15803d" : "#334155" }}>
                {done ? points.earned : points.on_offer}
                <Box component="span" sx={{ color: "#94a3b8", fontWeight: 600, fontSize: "0.7rem" }}>
                  {done ? ` / ${points.on_offer}` : " pts"}
                </Box>
              </Typography>
              <Typography sx={{ fontSize: "0.58rem", color: "#94a3b8", fontWeight: 700, letterSpacing: 0.3 }}>
                {done ? "EARNED" : "ON OFFER"}
              </Typography>
            </Box>
          )}
          <Box sx={{ flex: 1 }} />
          {done ? (
            <ButtonBase
              onClick={(e) => { e.stopPropagation(); reviewAction(); }}
              sx={{ flexShrink: 0, px: 1.6, py: 0.7, borderRadius: 999, fontWeight: 800, color: "#475569", fontSize: "0.78rem", gap: 0.4, border: "1px solid #dbe2ea" }}
            >
              <Icon icon={item.onReview ? "mdi:eye-outline" : "mdi:refresh"} width={14} />
              Review
            </ButtonBase>
          ) : (
            <ButtonBase
              onClick={(e) => { e.stopPropagation(); item.onClick(); }}
              sx={{
                flexShrink: 0,
                px: feature ? 2.6 : 1.9,
                py: feature ? 1.05 : 0.8,
                borderRadius: 999,
                fontWeight: 800,
                color: "white",
                fontSize: feature ? "0.88rem" : "0.8rem",
                gap: 0.5,
                background: `linear-gradient(135deg, ${m.color} 0%, color-mix(in srgb, ${m.color} 55%, ${theme.accent[1]}) 100%)`,
                boxShadow: `0 12px 26px -16px ${m.color}`,
              }}
            >
              <Icon icon={m.actionIcon} width={feature ? 17 : 14} />
              {current ? `${m.action} now` : m.action}
            </ButtonBase>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
