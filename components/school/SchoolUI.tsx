"use client";

/**
 * The school edition's UI primitives.
 *
 * The palette, the typefaces and the words were all changed for children while
 * the LAYOUT stayed an adult analytics dashboard: dense dark panels, five small
 * stat cards in a row, percentage rings, a figure every few centimetres. Correct
 * colours on an enterprise layout still reads as enterprise software.
 *
 * Everything here follows the illustrations rather than the other way round. The
 * drawings in `lib/demo/illustrations` are flat fills inside one navy outline, so
 * the cards are too: a 2px outline in the same navy, a large radius, and a soft
 * offset shadow so a card reads as a sticker sitting ON the page rather than a
 * pane cut into it.
 *
 * Three rules that keep this from drifting back:
 *
 * ONE NUMBER PER TILE, AND IT IS BIG. A child reading a dashboard is scanning for
 * "how am I doing", not comparing five metrics. Anything that needs a second
 * number to make sense belongs in a sentence, not a tile.
 *
 * NEVER COLOUR ALONE. Every tile pairs its colour with an icon and a word, for
 * the same reason the subject registry does.
 *
 * TOUCH TARGETS ARE 48px. Younger hands and shared classroom tablets. That is the
 * WCAG 2.2 minimum rather than the 44px Apple floor.
 */

import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import type { ReactNode } from "react";

/** The outline every card and every illustration shares. */
export const OUTLINE = "rgba(16, 34, 74, 0.12)";
export const OUTLINE_STRONG = "rgba(16, 34, 74, 0.22)";
export const INK = "#10224a";

/**
 * The base surface. A sticker, not a pane.
 *
 * The shadow is offset straight down with no blur spread to the sides, which is
 * what gives it the cut-paper look the illustrations have; a symmetrical blur
 * reads as Material elevation and pulls the whole thing back towards a console.
 */
export function SchoolCard({
  children,
  tint = "#ffffff",
  sx,
  ...rest
}: {
  children: ReactNode;
  tint?: string;
  sx?: object;
  [key: string]: unknown;
}) {
  return (
    <Box
      {...rest}
      sx={{
        borderRadius: "26px",
        bgcolor: tint,
        border: `2px solid ${OUTLINE}`,
        boxShadow: "0 6px 0 0 rgba(16,34,74,0.06)",
        p: { xs: 2, md: 2.5 },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

/**
 * One number, one word, one icon.
 *
 * `accent` fills the icon chip and the underline; the number itself stays ink,
 * because a coloured numeral at this size fights the illustration next to it.
 */
export function SchoolTile({
  icon,
  value,
  label,
  sub,
  accent,
}: {
  icon: string;
  value: ReactNode;
  label: string;
  sub?: string;
  accent: string;
}) {
  return (
    <SchoolCard sx={{ p: 2, display: "flex", flexDirection: "column", gap: 0.75, minWidth: 0 }}>
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: "14px",
          display: "grid",
          placeItems: "center",
          bgcolor: accent,
          color: "#fff",
          border: `2px solid ${OUTLINE_STRONG}`,
        }}
      >
        <Icon icon={icon} width={24} />
      </Box>
      <Typography
        sx={{
          fontFamily: "var(--font-family-display)",
          fontWeight: 800,
          fontSize: { xs: "1.9rem", md: "2.3rem" },
          lineHeight: 1,
          color: INK,
          mt: 0.5,
        }}
      >
        {value}
      </Typography>
      <Typography sx={{ fontWeight: 700, fontSize: "0.9rem", color: INK, lineHeight: 1.2 }}>
        {label}
      </Typography>
      {sub ? (
        <Typography sx={{ fontSize: "0.8rem", color: "#5b6b86", lineHeight: 1.3 }}>{sub}</Typography>
      ) : null}
    </SchoolCard>
  );
}

/** The one chunky button style. 48px tall, and it looks pressable. */
export function SchoolButton({
  children,
  onClick,
  icon,
  color = "#1b6fd4",
  full,
}: {
  children: ReactNode;
  onClick?: () => void;
  icon?: string;
  color?: string;
  full?: boolean;
}) {
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        minHeight: 52,
        px: 3,
        width: full ? "100%" : "auto",
        borderRadius: "18px",
        bgcolor: color,
        color: "#fff",
        fontFamily: "var(--font-family-display)",
        fontWeight: 700,
        fontSize: "1.05rem",
        gap: 1,
        border: `2px solid ${OUTLINE_STRONG}`,
        // The 4px ledge is what makes it look like a physical button. It shrinks
        // to 1px on press, so the button visibly travels rather than just dimming.
        boxShadow: "0 4px 0 0 rgba(16,34,74,0.25)",
        transition: "transform .08s ease, box-shadow .08s ease",
        "&:hover": { bgcolor: color, filter: "brightness(1.06)" },
        "&:active": { transform: "translateY(3px)", boxShadow: "0 1px 0 0 rgba(16,34,74,0.25)" },
      }}
    >
      {icon ? <Icon icon={icon} width={22} /> : null}
      {children}
    </ButtonBase>
  );
}

/**
 * A page header with a drawing in it.
 *
 * Replaces the dark gradient bar every module page opens with. That bar is the
 * single most adult element left on these pages: a slab of near-black with a
 * glow behind an icon badge.
 */
export function SchoolPageHead({
  eyebrow,
  title,
  blurb,
  scene,
  tint = "#eff7ff",
  action,
}: {
  eyebrow?: string;
  title: string;
  blurb?: string;
  /** Data URI from lib/demo/illustrations/scenes. */
  scene: string;
  tint?: string;
  action?: ReactNode;
}) {
  return (
    <SchoolCard
      tint={tint}
      sx={{
        mb: 2.5,
        p: { xs: 2.5, md: 3 },
        display: "flex",
        alignItems: "center",
        gap: 3,
        overflow: "hidden",
      }}
    >
      <Box sx={{ minWidth: 0, flex: 1 }}>
        {eyebrow ? (
          <Typography
            sx={{
              fontSize: "0.72rem",
              fontWeight: 800,
              letterSpacing: "0.8px",
              textTransform: "uppercase",
              color: "#1b6fd4",
              mb: 0.5,
            }}
          >
            {eyebrow}
          </Typography>
        ) : null}
        <Typography
          component="h1"
          sx={{
            fontFamily: "var(--font-family-display)",
            fontWeight: 800,
            fontSize: { xs: "1.7rem", md: "2.2rem" },
            lineHeight: 1.1,
            color: INK,
          }}
        >
          {title}
        </Typography>
        {blurb ? (
          <Typography sx={{ mt: 1, fontSize: "1rem", color: "#44536b", maxWidth: 560, lineHeight: 1.5 }}>
            {blurb}
          </Typography>
        ) : null}
        {action ? <Box sx={{ mt: 2 }}>{action}</Box> : null}
      </Box>

      {/* Hidden below md: at phone width the drawing would take the whole screen
          before the title, which is the wrong order on the one device where a
          child has least room. */}
      <Box
        aria-hidden
        sx={{ display: { xs: "none", md: "block" }, width: 260, flexShrink: 0 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={scene} alt="" style={{ width: "100%", display: "block" }} />
      </Box>
    </SchoolCard>
  );
}

/**
 * An empty state that is pleased to see you.
 *
 * Nothing is wrong when a list is empty and nobody is waiting on anything, which
 * makes it the one place the product is allowed to be charming.
 */
export function SchoolEmpty({
  scene,
  title,
  blurb,
  action,
}: {
  scene: string;
  title: string;
  blurb?: string;
  action?: ReactNode;
}) {
  return (
    <SchoolCard sx={{ textAlign: "center", py: 5, px: 3 }}>
      <Box aria-hidden sx={{ maxWidth: 300, mx: "auto", mb: 2 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={scene} alt="" style={{ width: "100%", display: "block" }} />
      </Box>
      <Typography
        sx={{
          fontFamily: "var(--font-family-display)",
          fontWeight: 800,
          fontSize: "1.35rem",
          color: INK,
        }}
      >
        {title}
      </Typography>
      {blurb ? (
        <Typography sx={{ mt: 1, color: "#5b6b86", maxWidth: 420, mx: "auto", lineHeight: 1.5 }}>
          {blurb}
        </Typography>
      ) : null}
      {action ? <Stack sx={{ mt: 2.5, alignItems: "center" }}>{action}</Stack> : null}
    </SchoolCard>
  );
}
