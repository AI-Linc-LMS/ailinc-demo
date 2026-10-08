"use client";

import type { ReactNode } from "react";
import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { useInstantNavigation } from "@/lib/hooks/useInstantNavigation";
import type { PracticalKind } from "@/lib/services/practicals.service";

/**
 * Per-kind identity, shared by the lesson row and the player page.
 *
 * The same colour, icon and word in both places, so opening a row does not feel
 * like landing somewhere else. `verb` is what the primary button says, and it is
 * deliberately specific: "Mark the sheet" and "Submit for assessment" promise
 * different things, and the second one has to say out loud that a person is
 * involved.
 */
export const PRACTICAL_LOOK: Record<
  PracticalKind,
  { label: string; icon: string; color: string; soft: string; verb: string }
> = {
  worksheet: {
    label: "Working paper",
    icon: "mdi:table-large",
    color: "#0f766e",
    soft: "#ecfdf5",
    verb: "Mark the sheet",
  },
  scenario: {
    label: "Decision run",
    icon: "mdi:arrow-decision",
    color: "#b45309",
    soft: "#fffbeb",
    verb: "See the debrief",
  },
  evidence: {
    label: "Evidence of work",
    icon: "mdi:camera-outline",
    color: "#be123c",
    soft: "#fff1f2",
    verb: "Submit for assessment",
  },
  lab: {
    label: "Guided procedure",
    icon: "mdi:clipboard-check-outline",
    color: "#0369a1",
    soft: "#f0f9ff",
    verb: "Finish the procedure",
  },
  deck: {
    label: "Recall deck",
    icon: "mdi:cards-outline",
    color: "#7c3aed",
    soft: "#f5f3ff",
    verb: "Done for today",
  },
  speaking: {
    label: "Speaking task",
    icon: "mdi:microphone-outline",
    color: "#c2410c",
    soft: "#fff7ed",
    verb: "Submit recording",
  },
  partid: {
    label: "Name the parts",
    icon: "mdi:vector-polyline",
    color: "#4338ca",
    soft: "#eef2ff",
    verb: "Check my answers",
  },
  deliverable: {
    label: "Deliverable",
    icon: "mdi:file-document-edit-outline",
    color: "#166534",
    soft: "#f0fdf4",
    verb: "Submit for marking",
  },
};

export interface PracticalShellProps {
  kind: PracticalKind;
  courseId: number;
  submoduleId: number;
  title: string;
  /** Short line under the title. One sentence. */
  subtitle?: string;
  /** Facts worth knowing before starting: duration, marks, how it is graded. */
  pills?: Array<{ icon: string; label: string }>;
  /** Right of the hero: a timer, a progress counter, a score. */
  rightSlot?: ReactNode;
  children: ReactNode;
  /** The sticky bar at the bottom. Hidden once there is nothing left to do. */
  footer?: ReactNode;
}

/**
 * Page chrome for every practical player.
 *
 * One shell rather than eight page layouts, because the eight differ in the
 * middle and nowhere else: all of them need a way back to the lesson, a
 * statement of what is being assessed and how, and a sticky action bar that
 * does not scroll away while a learner is halfway down a twelve-row ledger.
 */
export function PracticalShell({
  kind,
  courseId,
  submoduleId,
  title,
  subtitle,
  pills = [],
  rightSlot,
  children,
  footer,
}: PracticalShellProps) {
  const { push, prefetch } = useInstantNavigation();
  const look = PRACTICAL_LOOK[kind];
  const lessonHref = `/adaptive-courses/${courseId}/submodule/${submoduleId}`;

  return (
    <Box
      sx={{
        maxWidth: 1180,
        mx: "auto",
        px: { xs: 2, md: 3 },
        py: { xs: 2.5, md: 3.5 },
        // Clearance for the sticky footer, or the last row of a sheet sits under it.
        pb: footer ? { xs: 14, md: 13 } : { xs: 4, md: 6 },
      }}
    >
      <Box
        sx={{
          borderRadius: 5,
          p: { xs: 2.5, md: 3.25 },
          mb: 2.5,
          color: "white",
          position: "relative",
          overflow: "hidden",
          background: `linear-gradient(135deg, ${look.color} 0%, color-mix(in srgb, ${look.color} 62%, #0f172a) 100%)`,
          boxShadow: `0 24px 60px -30px color-mix(in srgb, ${look.color} 70%, transparent)`,
        }}
      >
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 92% 0%, rgba(255,255,255,0.16) 0%, transparent 55%)",
            pointerEvents: "none",
          }}
        />
        <ButtonBase
          onMouseEnter={() => prefetch(lessonHref)}
          onClick={() => push(lessonHref)}
          sx={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.82)", mb: 1, gap: 0.5, fontWeight: 600 }}
        >
          <Icon icon="mdi:chevron-left" width={14} />
          Back to the lesson
        </ButtonBase>

        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "flex-end" }}
          spacing={2}
          sx={{ position: "relative" }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Stack direction="row" alignItems="center" spacing={0.75} sx={{ mb: 0.75 }}>
              <Icon icon={look.icon} width={16} />
              <Typography
                sx={{
                  fontSize: "0.66rem",
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  opacity: 0.9,
                }}
              >
                {look.label}
              </Typography>
            </Stack>
            <Typography sx={{ fontWeight: 800, fontSize: { xs: "1.3rem", md: "1.6rem" }, lineHeight: 1.2 }}>
              {title}
            </Typography>
            {subtitle && (
              <Typography sx={{ mt: 0.75, opacity: 0.88, fontSize: "0.9rem", maxWidth: 620, lineHeight: 1.5 }}>
                {subtitle}
              </Typography>
            )}
            {pills.length > 0 && (
              <Stack direction="row" flexWrap="wrap" sx={{ mt: 1.5, gap: 0.75 }}>
                {pills.map((p) => (
                  <Stack
                    key={p.label}
                    direction="row"
                    alignItems="center"
                    spacing={0.5}
                    sx={{
                      px: 1.1,
                      py: 0.4,
                      borderRadius: 999,
                      bgcolor: "rgba(255,255,255,0.16)",
                      fontSize: "0.74rem",
                      fontWeight: 700,
                    }}
                  >
                    <Icon icon={p.icon} width={13} />
                    <span>{p.label}</span>
                  </Stack>
                ))}
              </Stack>
            )}
          </Box>
          {rightSlot && <Box sx={{ flexShrink: 0 }}>{rightSlot}</Box>}
        </Stack>
      </Box>

      {children}

      {footer && (
        <Box
          sx={{
            position: "fixed",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1200,
            px: { xs: 1.5, md: 3 },
            py: { xs: 1.25, md: 1.5 },
            borderTop: "1px solid var(--border-default)",
            bgcolor: "color-mix(in srgb, var(--card-bg) 92%, transparent)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Box sx={{ maxWidth: 1180, mx: "auto" }}>{footer}</Box>
        </Box>
      )}
    </Box>
  );
}

/** A plain card. Used for every panel inside a player, so they all line up. */
export function PracticalCard({
  children,
  title,
  icon,
  accent,
  dense,
  action,
}: {
  children: ReactNode;
  title?: string;
  icon?: string;
  accent?: string;
  dense?: boolean;
  action?: ReactNode;
}) {
  return (
    <Box
      sx={{
        borderRadius: 4,
        border: "1px solid var(--border-default)",
        bgcolor: "var(--card-bg)",
        overflow: "hidden",
        mb: 2,
      }}
    >
      {title && (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
          sx={{
            px: { xs: 1.75, md: 2.25 },
            py: 1.25,
            borderBottom: "1px solid var(--border-default)",
            bgcolor: "color-mix(in srgb, var(--border-default) 18%, transparent)",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={0.9} sx={{ minWidth: 0 }}>
            {icon && <Icon icon={icon} width={17} color={accent ?? "var(--text-secondary)"} />}
            <Typography sx={{ fontWeight: 800, fontSize: "0.86rem" }}>{title}</Typography>
          </Stack>
          {action}
        </Stack>
      )}
      <Box sx={{ p: dense ? { xs: 1.25, md: 1.5 } : { xs: 1.75, md: 2.25 } }}>{children}</Box>
    </Box>
  );
}

/**
 * Prose authored as HTML by the curriculum.
 *
 * Styled here rather than inside the content so a brief, a debrief and a worked
 * answer all read the same, and so the content files stay free of markup that
 * would have to be edited in 40 places to change a margin.
 */
export function PracticalProse({ html }: { html: string }) {
  return (
    <Box
      dangerouslySetInnerHTML={{ __html: html }}
      sx={{
        fontSize: "0.93rem",
        lineHeight: 1.65,
        color: "var(--text-primary)",
        "& p": { m: 0, mb: 1.25 },
        "& p:last-child": { mb: 0 },
        "& ul, & ol": { pl: 2.5, mb: 1.25, mt: 0 },
        "& li": { mb: 0.5 },
        "& strong": { fontWeight: 800 },
        "& code": {
          px: 0.6,
          py: 0.1,
          borderRadius: 1,
          fontSize: "0.86em",
          bgcolor: "color-mix(in srgb, var(--border-default) 40%, transparent)",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        },
        "& table": { width: "100%", borderCollapse: "collapse", my: 1.5, fontSize: "0.86rem" },
        "& th, & td": {
          border: "1px solid var(--border-default)",
          px: 1,
          py: 0.6,
          textAlign: "left",
        },
        "& th": { fontWeight: 800, bgcolor: "color-mix(in srgb, var(--border-default) 20%, transparent)" },
        "& td.num, & th.num": { textAlign: "right", fontVariantNumeric: "tabular-nums" },
      }}
    />
  );
}
