"use client";

import { Box, ButtonBase, Typography } from "@mui/material";
import { PriceTag } from "@/components/common/PriceTag";
import { Icon } from "@iconify/react";
import type { AdaptiveCourseListItem } from "@/lib/services/adaptive-course.service";

/** A single adaptive-course card. Shared by the standalone library page and the
 *  "Adaptive courses" section embedded under /courses. */
export function AdaptiveCourseCard({
  course,
  onOpen,
  onHover,
}: {
  course: AdaptiveCourseListItem;
  onOpen: () => void;
  onHover?: () => void;  // warm the destination route on hover/focus for instant open
}) {
  // The subject's colours when the API sent them, otherwise exactly the literals
  // this card used before. The fallback IS the old value, so a tenant whose API
  // does not send a subject renders byte-identical output to what it always did.
  const from = course.subject_accent_from || "#6366f1";
  const to = course.subject_accent_to || "#a855f7";
  const ink = course.subject_ink || "#6366f1";

  return (
    <ButtonBase
      onClick={onOpen}
      onMouseEnter={onHover}
      onFocus={onHover}
      sx={{
        width: "100%",
        height: "100%",
        textAlign: "left",
        // Flex column so every card lines up: image on top, meta pinned to the
        // bottom - regardless of whether a course has a description or more
        // metric rows. Fixes the ragged, inconsistent card layout.
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        borderRadius: 3,
        p: 2.5,
        bgcolor: "var(--card-bg, #fff)",
        // Declared on the card root so the meta row's icons inherit the subject's
        // ink. A custom property resolves where it is DECLARED, so setting it on
        // the icon itself would do nothing.
        "--course-meta-ink": ink,
        border: "1px solid var(--border-default, #ececf1)",
        boxShadow: "0 1px 2px rgba(16,24,40,0.04), 0 10px 26px -22px rgba(16,24,40,0.18)",
        transition: "transform 140ms ease, box-shadow 140ms ease, border-color 140ms ease",
        "&:hover": {
          transform: "translateY(-3px)",
          borderColor: `color-mix(in srgb, ${ink} 45%, transparent)`,
          boxShadow: `0 20px 40px -26px color-mix(in srgb, ${ink} 50%, transparent)`,
        },
      }}
    >
      {/* Always render the image band (fallback gradient) so the header lines up. */}
      <Box sx={{ width: "100%", aspectRatio: "16 / 9", borderRadius: 2.5, overflow: "hidden", mb: 1.5, flexShrink: 0, background: `linear-gradient(135deg, color-mix(in srgb, ${from} 14%, transparent), color-mix(in srgb, ${to} 12%, transparent))` }}>
        {course.card_image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={course.card_image_url}
            alt={course.title}
            loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            onError={(e) => {
              // A remote cover that fails must reveal the gradient plate behind
              // it, not a broken image frame. The fallback is served inline as a
              // data URI, so it works with the network unplugged.
              const img = e.currentTarget;
              const fb = (course as { card_image_fallback_url?: string }).card_image_fallback_url;
              if (fb && img.src !== fb) img.src = fb;
              else img.style.display = "none";
            }}
          />
        )}
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mb: 1.5 }}>
        <Box sx={{ width: 44, height: 44, borderRadius: 3, flexShrink: 0, display: "grid", placeItems: "center", color: "white", background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`, boxShadow: `0 14px 26px -14px color-mix(in srgb, ${to} 65%, transparent)` }}>
          <Icon icon="mdi:book-education-outline" width={22} />
        </Box>
        {/* The "Adaptive" chip that used to sit here is gone. It existed to tell
            adaptive cards apart from legacy ones on the shared /courses page. This
            tenant has a single course product, so the chip was on every card and
            distinguished nothing. */}
        {/* Still shown after purchase: "Paid" is a fact about how they got access, not a CTA. */}
        <PriceTag isPaid={course.is_paid} price={course.price} currency={course.currency} />
      </Box>

      <Typography sx={{ fontWeight: 800, fontSize: "1.05rem", lineHeight: 1.3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{course.title}</Typography>
      <Typography sx={{ color: "text.secondary", mt: 0.75, fontSize: "0.86rem", lineHeight: 1.5, minHeight: "2.6em", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
        {course.description || ""}
      </Typography>

      {/* Meta pinned to the card bottom so it aligns across every card. */}
      <Box sx={{ display: "flex", gap: 1.5, columnGap: 2, mt: "auto", pt: 2, flexWrap: "wrap" }}>
        <Metric icon="mdi:view-module-outline" label="modules" value={course.module_count} />
        <Metric icon="mdi:file-tree-outline" label="submodules" value={course.submodule_count} />
        <Metric icon="mdi:book-open-variant" label="articles" value={course.article_count} />
        <Metric icon="mdi:tune-vertical" label="quizzes" value={course.quiz_count} />
        {(course.coding_count ?? 0) > 0 && <Metric icon="mdi:robot-happy-outline" label="coding" value={course.coding_count ?? 0} />}
        {(course.video_count ?? 0) > 0 && <Metric icon="mdi:play-circle-outline" label="videos" value={course.video_count ?? 0} />}
      </Box>
    </ButtonBase>
  );
}

function Metric({ icon, label, value }: { icon: string; label: string; value: number }) {
  return (
    <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.6 }}>
      <Icon icon={icon} width={16} style={{ color: "var(--course-meta-ink, #6366f1)" }} />
      <Typography component="span" sx={{ fontWeight: 800, fontSize: "0.85rem" }}>{value}</Typography>
      <Typography component="span" sx={{ color: "text.secondary", fontSize: "0.78rem" }}>{label}</Typography>
    </Box>
  );
}
