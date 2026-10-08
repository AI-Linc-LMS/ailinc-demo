/**
 * Per-course visual identity.
 *
 * Every course-scoped surface used to render the same violet gradient, so a
 * refrigeration lesson and an accounting lesson were the identical screen with
 * different words on it. That is wrong for a catalogue that spans four trades:
 * a learner who opens two courses should be able to tell, before reading
 * anything, that they are in a different place.
 *
 * This is NOT tenant theming. The platform deliberately pins its palette per
 * tenant (see `normalizeThemeSettings.ts`), and that stays. A course accent is
 * one level down: it varies within a tenant, it is authored with the course,
 * and it is the same colour the catalogue card already uses, so the card and
 * the course it opens finally agree.
 */

export interface CourseTheme {
  /** Hero gradient endpoints, as authored on the course. */
  accent: [string, string];
  /** Iconify name for the subject motif. */
  icon: string;
}

/**
 * The fallback.
 *
 * Deliberately the violet every course used to be, so a course whose payload
 * predates this field renders exactly as it did before rather than losing its
 * hero to a grey box.
 */
export const DEFAULT_COURSE_THEME: CourseTheme = {
  accent: ["#7c3aed", "#c026d3"],
  icon: "mdi:book-education-outline",
};

/** Narrow an untrusted payload to a usable theme. */
export function courseTheme(theme?: Partial<CourseTheme> | null): CourseTheme {
  const accent = theme?.accent;
  const ok =
    Array.isArray(accent) &&
    accent.length === 2 &&
    accent.every((c) => typeof c === "string" && /^#[0-9a-fA-F]{3,8}$/.test(c));
  return {
    accent: ok ? [accent[0], accent[1]] : DEFAULT_COURSE_THEME.accent,
    icon: theme?.icon || DEFAULT_COURSE_THEME.icon,
  };
}

/**
 * The hero gradient.
 *
 * Three stops rather than two: the midpoint is the two accents mixed, which
 * keeps the transition from banding across a wide hero on a large screen.
 */
export function heroGradient(theme?: Partial<CourseTheme> | null): string {
  const { accent } = courseTheme(theme);
  return (
    `linear-gradient(135deg, ${accent[0]} 0%, ` +
    `color-mix(in srgb, ${accent[0]} 45%, ${accent[1]}) 55%, ${accent[1]} 100%)`
  );
}

/** A compact two-stop version, for badges and small controls. */
export function accentGradient(theme?: Partial<CourseTheme> | null): string {
  const { accent } = courseTheme(theme);
  return `linear-gradient(135deg, ${accent[0]} 0%, ${accent[1]} 100%)`;
}

/** Shadow tinted to the course, so the hero does not float on a violet glow. */
export function accentShadow(theme?: Partial<CourseTheme> | null, depth = 28): string {
  const { accent } = courseTheme(theme);
  return `0 24px 60px -${depth}px color-mix(in srgb, ${accent[0]} 60%, transparent)`;
}

/** A very light wash of the accent, for panel backgrounds. */
export function accentWash(theme?: Partial<CourseTheme> | null, pct = 7): string {
  const { accent } = courseTheme(theme);
  return `color-mix(in srgb, ${accent[0]} ${pct}%, transparent)`;
}

/**
 * The radial-mesh backdrop, in the course's colours.
 *
 * The adaptive module has a signature indigo-purple-pink mesh, which is right
 * for a surface belonging to the module and wrong for one belonging to a
 * course: it left the article reader the same pink wash for accounting and for
 * refrigeration even after its badge had been themed. Same three blooms in the
 * same three positions, so the shape of the module's identity survives while
 * the colour follows the course.
 */
export function courseMesh(theme?: Partial<CourseTheme> | null): string[] {
  const { accent } = courseTheme(theme);
  const mid = `color-mix(in srgb, ${accent[0]} 50%, ${accent[1]})`;
  return [
    `radial-gradient(circle at 8% 0%, color-mix(in srgb, ${accent[0]} 22%, transparent) 0%, transparent 55%)`,
    `radial-gradient(circle at 95% 5%, color-mix(in srgb, ${accent[1]} 18%, transparent) 0%, transparent 55%)`,
    `radial-gradient(circle at 50% 110%, color-mix(in srgb, ${mid} 22%, transparent) 0%, transparent 60%)`,
  ];
}
