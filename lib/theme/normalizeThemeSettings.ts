import { DEFAULT_THEME_FLAT } from "./defaultThemeTokens";

function kebabToCamelSegment(key: string): string {
  return key.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
}

/** e.g. primary-50 -> primary50, nav-background -> navBackground */
export function cssVarKeyToCamel(cssKey: string): string {
  return kebabToCamelSegment(cssKey.replace(/^--/, ""));
}

/** secondary_500 -> secondary500 (legacy keys in stored JSON). Preserves _preset. */
function snakeToCamelKey(key: string): string {
  if (key.startsWith("_")) return key;
  if (!key.includes("_")) return key;
  return key.replace(/_([a-z0-9])/gi, (_, ch: string) => ch.toUpperCase());
}

/**
 * Flatten legacy shapes: nested `colors` with kebab keys, or flat camelCase from API.
 */
export function flattenThemeInput(raw: unknown): Record<string, string> {
  const out: Record<string, string> = {};
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return out;
  }
  const obj = raw as Record<string, unknown>;

  const colors = obj.colors;
  if (colors && typeof colors === "object" && !Array.isArray(colors)) {
    for (const [k, v] of Object.entries(colors as Record<string, unknown>)) {
      if (typeof v !== "string") continue;
      const camel = cssVarKeyToCamel(k);
      out[camel] = v.trim();
    }
  }

  for (const [k, v] of Object.entries(obj)) {
    if (k === "colors") continue;
    if (typeof v !== "string") continue;
    const trimmed = v.trim();
    const canonical = snakeToCamelKey(k);
    out[canonical] = trimmed;
  }

  return out;
}

export type NormalizedTheme = Record<string, string>;

/**
 * Merge API / preset theme with defaults. Preserves `_preset` for admin display.
 */
/**
 * The school palette, forced platform-wide.  DEMO REPO ONLY.
 *
 * Upstream this constant is `FIXED_MIDNIGHT_HYPER`, the violet preset the real
 * platform stamps over every tenant's stored `theme_settings` (colour
 * customization is off product-wide, see `/admin/branding`). This fork keeps that
 * mechanism exactly and only changes the values, because this is the single
 * chokepoint every colour read funnels through: the sidebar shell, the MUI
 * theme, every `globals.css` custom property, the login screen, and the SSR
 * `themeToCssBlock` inline <style>. Repainting here covers first paint and client
 * runtime together, with no per-surface override and no loophole.
 *
 * Why it is blue and not violet: this demo is shown to schools, for learners in
 * roughly grades 6 to 8. The violet preset is a good adult SaaS palette and reads
 * as one. A school product is also read by teachers and parents, so the spine is
 * a trustworthy azure and the *playfulness* is carried by things that cannot be
 * mistaken for corporate decoration: the illustrations, the large corner radii,
 * and the per-subject accent hues in `lib/demo/db/subjects.ts`.
 *
 * Contrast is not negotiable at this age. Every value that ends up behind white
 * text clears WCAG AA for normal text (4.5:1) rather than the 3:1 that large
 * text would allow, which is why `primary500` is `#1b6fd4` and not a brighter,
 * happier blue that fails on a button label.
 *
 * NON-colour keys (login slogan text, font family, logo dimensions) are
 * deliberately absent so they still pass through and stay editable in admin
 * Settings.
 */
const FIXED_SCHOOL_PALETTE: Record<string, string> = {
  // Brand spine: azure. 500 is the button fill, so it is dark enough for white
  // label text; the joy lives in the accents and the illustrations, not here.
  primary50: "#eff7ff",
  primary100: "#d9ecfe",
  primary200: "#b5dafd",
  primary300: "#83c2fa",
  primary400: "#4aa2f0",
  primary500: "#1b6fd4",
  primary600: "#1559ae",
  primary700: "#13498c",
  primary800: "#133d73",
  primary900: "#102c52",

  // secondary200 and secondary300 are a green and a red in the upstream preset:
  // legacy slots that surfaces read for success and danger tints rather than as
  // part of a ramp. Left untouched on purpose - recolouring them to match the
  // ramp would repaint whatever still reads them as semantic.
  secondary50: "#eff7ff",
  secondary100: "#d9ecfe",
  secondary200: "#417845",
  secondary300: "#ae0606",
  secondary400: "#2b62c4",
  // The sidebar fill. Deep blueberry rather than the near-black violet upstream:
  // dark enough that the subject colours pop against it, warm enough that it does
  // not read as a developer tool.
  secondary500: "#132a5c",
  secondary600: "#1b3a7a",
  secondary700: "#0e1f45",

  // The page canvas AND the top bar both come from navBackground (see
  // applyDocumentTheme's background fallback chain). Sky-tinted paper, so white
  // cards sit on it as a visible surface ladder instead of disappearing.
  navBackground: "#f6faff",
  navSelected: "#2a63c8",
  fontDarkNav: "#12305f",
  fontLightNav: "#f2f8ff",

  // The semantic accent set. Vivid, because these are the colours a 12 year old
  // reads as "this bit is for me".
  accentYellow: "#facc15",
  accentBlue: "#2f86ff",
  accentGreen: "#22a25b",
  accentRed: "#ef4444",
  accentOrange: "#f97316",
  accentTeal: "#0ea5a5",
  accentPurple: "#a855f7",
  accentPink: "#ec4899",

  // Neutrals carry a cool tint so they sit on the sky canvas rather than fighting
  // it. neutral50 stays pure white: surfaces read it as a card fill, and warming
  // it put cream cards on a cream page.
  neutral50: "#ffffff",
  neutral100: "#e8eef7",
  neutral200: "#d8e2ef",
  neutral300: "#6b7688",
  neutral400: "#4a5568",
  neutral500: "#39414f",
  neutral600: "#2b3444",
  neutral700: "#1e2430",
  neutral800: "#171c26",

  success50: "#e8f9ef",
  success100: "#c6f0d5",
  // Brighter than upstream's muted #5fa564: finishing a lesson should look like
  // something happened.
  // 3.30:1 against white, so this is a FILL and a text colour on light surfaces,
  // never a surface behind small white text. Upstream's #5fa564 measured 2.98:1,
  // so this is an improvement rather than a new hazard, but a white "Passed" label
  // on a solid success chip still needs the darker success ramp, not this.
  success500: "#16a34a",
  warning100: "#fff8e6",
  warning500: "#f59e0b",
  error100: "#ffe6e6",
  // #dc2626, not the brighter #ef4444: error is the one semantic colour that
  // routinely appears as a solid fill behind a white label, and #ef4444 measures
  // 3.76:1 there - worse than the #ea4335 this replaces. This clears AA at 4.83:1.
  error500: "#dc2626",
  error600: "#b91c1c",
  fontLight: "#ffffff",
  fontDark: "#000000",
  // One CTA colour app-wide. Orange was tried and dropped: no orange dark enough
  // for AA white text still reads as orange.
  courseCta: "#1b6fd4",
  defaultPrimary: "#1b6fd4",
  muiPrimaryMain: "#1b6fd4",
  muiPrimaryLight: "#83c2fa",
  muiPrimaryDark: "#13498c",
  muiPrimaryContrastText: "#ffffff",
  accentBlueLight: "#4aa2f0",
  surfaceBlueLight: "#ffffff",
  // Indigo, deliberately a step off the brand azure, so the AI surfaces still
  // read as a distinct special thing rather than as more chrome.
  accentIndigo: "#4f46e5",
  accentIndigoDark: "#3730a3",
  surfaceIndigoLight: "#eef4ff",
  chartArticles: "#1b6fd4",
};

/**
 * Merge API / preset theme with defaults, then force the platform-wide fixed
 * colour palette so every client renders identically. Preserves `_preset` and
 * non-colour keys (slogan text, fonts, logo sizing).
 *
 * This is the single chokepoint every colour read funnels through (sidebar
 * shell, MUI theme, all globals.css CSS vars, the login page, and the SSR
 * `themeToCssBlock` inline <style>), so forcing colours here covers first paint
 * + client runtime with no per-surface override and no loophole.
 */
export function normalizeThemeSettings(themeSettings: unknown): NormalizedTheme {
  const flat = flattenThemeInput(themeSettings);
  const merged: NormalizedTheme = { ...DEFAULT_THEME_FLAT };
  for (const [k, v] of Object.entries(flat)) {
    if (!v) continue;
    merged[k] = v;
  }
  Object.assign(merged, FIXED_SCHOOL_PALETTE);
  return merged;
}

export function stripInternalThemeKeys(theme: NormalizedTheme): NormalizedTheme {
  const copy = { ...theme };
  delete copy._preset;
  return copy;
}
