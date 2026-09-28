/**
 * School subjects: the colour-coding system.
 *
 * A twelve year old navigating a timetable does not read course titles, they
 * recognise "the green one". So subject identity is a first-class record here
 * rather than a per-card decoration, and every surface that shows a course reads
 * it from this file: the catalogue card, the journey board, the dashboard rail,
 * progress rings, chips, the generated cover illustration, and the timetable.
 *
 * Three rules this registry exists to enforce.
 *
 * ONE HUE, ONE SUBJECT, EVERYWHERE. The failure this replaces is a course that is
 * teal on the dashboard and violet on its own page, which quietly teaches a child
 * that the colours mean nothing. Nothing may hardcode a subject colour; if a
 * surface needs one it imports `subjectOf` and reads it.
 *
 * COLOUR IS NEVER THE ONLY CHANNEL. Every subject carries an `icon` and a
 * distinct illustration motif alongside its hue, because roughly 1 boy in 12 has
 * a colour vision deficiency and deuteranopia in particular flattens the green
 * and the teal below into near-identical olive. A child must be able to tell
 * Science from Maths with the colour removed, which is also why the hues are
 * spread around the wheel rather than chosen for prettiness.
 *
 * `ink` IS NOT `from`. `from` is a fill, to be used behind white; `ink` is the
 * same hue darkened until it clears WCAG AA (4.5:1) as text on `tint` and on
 * white. Using `from` for a label is the mistake that makes the amber subject
 * unreadable, since no amber light enough to read as amber passes as text.
 */

/** Stable key. Persisted in the overlay, so renaming one is a migration. */
export type SubjectKey =
  | "maths"
  | "science"
  | "english"
  | "social"
  | "computing"
  | "art";

export interface Subject {
  key: SubjectKey;
  /** As it appears on a timetable. */
  label: string;
  /** Shorthand for a narrow chip or a calendar cell. */
  short: string;
  /** Gradient stops for fills: cover art, rings, the card header. Behind white only. */
  from: string;
  to: string;
  /** Soft wash for panel and chip backgrounds. */
  tint: string;
  /** AA-compliant text colour on `tint` and on white. Never use `from` for text. */
  ink: string;
  /** Iconify id. Must exist in the offline bundle - run `npm run build:icons` after changing. */
  icon: string;
  /**
   * Which motif `subjectCover` draws. Kept separate from `key` so two subjects
   * could share artwork if the catalogue ever grows past the motifs we have.
   */
  motif: "geometry" | "lab" | "book" | "globe" | "screen" | "palette";
}

export const SUBJECTS: Record<SubjectKey, Subject> = {
  maths: {
    key: "maths",
    label: "Mathematics",
    short: "Maths",
    from: "#14b8a6",
    to: "#0f766e",
    tint: "#e4fbf7",
    ink: "#0f5f58",
    icon: "mdi:math-compass",
    motif: "geometry",
  },
  science: {
    key: "science",
    label: "Science",
    short: "Science",
    from: "#4ade80",
    to: "#15803d",
    tint: "#e8fbef",
    ink: "#15803d",
    icon: "mdi:flask-outline",
    motif: "lab",
  },
  english: {
    key: "english",
    label: "English",
    short: "English",
    from: "#fb7185",
    to: "#e11d48",
    tint: "#fff0f3",
    ink: "#be123c",
    icon: "mdi:book-open-page-variant-outline",
    motif: "book",
  },
  social: {
    key: "social",
    label: "Social Studies",
    short: "Social",
    from: "#fbbf24",
    // #d97706 was the obvious choice and it is the one value in this file that
    // failed its test: white text on it measures 3.19:1. Amber is the hue where
    // "looks dark enough" and "is dark enough" diverge most, because our eyes read
    // yellow as bright at luminances where the maths says otherwise.
    to: "#b45309",
    tint: "#fff8e6",
    // Darker than it looks like it should be, for the same reason. #d97706 as text
    // on #fff8e6 measures 3.4:1 and fails; this clears 4.5:1 and still reads amber.
    ink: "#96610a",
    icon: "mdi:earth",
    motif: "globe",
  },
  computing: {
    key: "computing",
    label: "Computer Science",
    short: "Computing",
    from: "#818cf8",
    to: "#4f46e5",
    tint: "#eef0ff",
    ink: "#4338ca",
    icon: "mdi:code-braces",
    motif: "screen",
  },
  art: {
    key: "art",
    label: "Art & Design",
    short: "Art",
    from: "#e879f9",
    to: "#a21caf",
    tint: "#fdf0fd",
    ink: "#a21caf",
    icon: "mdi:palette-outline",
    motif: "palette",
  },
};

export const SUBJECT_ORDER: readonly SubjectKey[] = [
  "maths",
  "science",
  "english",
  "social",
  "computing",
  "art",
];

/**
 * The subject record, falling back to Maths rather than throwing.
 *
 * A missing subject must never take a page down: this is read during render on
 * surfaces that get their course id from a URL, so an unknown id is a 404 the
 * route already handles, not a crash in a colour lookup.
 */
export function subjectOf(key: string | null | undefined): Subject {
  return SUBJECTS[(key ?? "") as SubjectKey] ?? SUBJECTS.maths;
}

/** The [from, to] pair, for the `accent` field course records already carry. */
export function subjectAccent(key: SubjectKey): [string, string] {
  const s = SUBJECTS[key];
  return [s.from, s.to];
}
