/**
 * Deterministic, self-contained avatars.
 *
 * A demo full of grey initials placeholders reads as unfinished, but bundling
 * real photographs means licensing questions and a heavier repo — and pulling
 * them from a CDN means the demo breaks on a conference-room network with no
 * internet. So avatars are generated as inline SVG data URIs: colourful, stable
 * per person, and available offline.
 *
 * The hue is derived from the name, so the same person is always the same colour
 * everywhere they appear — leaderboard, community thread, cohort roster.
 */

import { makeRng } from "../random";
import { kidAvatar } from "../illustrations/kidAvatar";

/** Up to two initials from a display name. */
export function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Palette tuned to sit beside the platform's purple without competing with it.
 * Each entry is a [from, to] gradient pair.
 */
const AVATAR_GRADIENTS: ReadonlyArray<readonly [string, string]> = [
  ["#a855f7", "#6366f1"],
  ["#f472b6", "#a855f7"],
  ["#38bdf8", "#6366f1"],
  ["#34d399", "#0ea5e9"],
  ["#fbbf24", "#f97316"],
  ["#fb7185", "#e11d48"],
  ["#22d3ee", "#0891b2"],
  ["#c084fc", "#7c3aed"],
  ["#4ade80", "#16a34a"],
  ["#60a5fa", "#2563eb"],
];

function encodeSvg(svg: string): string {
  // encodeURIComponent (not base64) keeps the URI readable in devtools and is
  // shorter for markup this small.
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg.replace(/\s+/g, " ").trim())}`;
}

/**
 * Profile pictures: drawn children and drawn grown-ups, never photographs.
 *
 * This used to be a pool of adult photographs from randomuser.me. Two things were
 * wrong with that for a school demo. The faces were adults, on a product whose
 * learners are eleven to fourteen. And the obvious correction - photographs of
 * real children - is one this repo will not make: a minor's likeness carries
 * consent and licensing weight a sales demo has no business taking on.
 *
 * So everyone is illustrated. See `lib/demo/illustrations/kidAvatar.ts` for the
 * drawing and for the rule that nothing reads a name to decide how a person
 * looks. This also removes the last remote asset in the product, so the demo now
 * renders whole with the network unplugged rather than nearly so.
 *
 * The `slot` strings the roster passes ("women/12") are kept exactly as they
 * were. They are no longer photo paths, just each character's authored, opaque
 * look id, and keeping them means a character's appearance is stable across this
 * change rather than every face in the demo being reshuffled.
 */

/**
 * The portrait for an authored slot.
 *
 * Preferred over `portraitFor` everywhere a person is part of the seed, because
 * the seed author chose that look for that character.
 */
export function portraitAt(slot: string, adult = false): string {
  return kidAvatar(slot, 96, adult);
}

/** A stable portrait for a person, the same one everywhere they appear. */
export function portraitFor(name: string, adult = false): string {
  return kidAvatar(name, 96, adult);
}

/** A grown-up portrait: teaching staff and administrators. */
export function staffPortraitAt(slot: string): string {
  return kidAvatar(slot, 96, true);
}

/**
 * A stable generated initials avatar.
 *
 * No longer a fallback for people - `portraitFor` returns a data URI now, so
 * there is nothing left to fail. It stays for things that are not people:
 * organisations via `companyLogoFor`, cohorts, and study groups, where a drawn
 * face would be wrong.
 */
export function avatarFor(name: string, size = 96): string {
  const rng = makeRng(`avatar:${name}`);
  const [from, to] = AVATAR_GRADIENTS[Math.floor(rng() * AVATAR_GRADIENTS.length)];
  const initials = initialsOf(name);
  // Unique gradient id per avatar: duplicate ids across inlined SVGs would make
  // every avatar on the page adopt whichever gradient the browser resolved first.
  const id = `av${Math.floor(rng() * 1e9).toString(36)}`;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
      <defs>
        <linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${from}"/>
          <stop offset="100%" stop-color="${to}"/>
        </linearGradient>
      </defs>
      <rect width="${size}" height="${size}" rx="${size}" fill="url(#${id})"/>
      <text x="50%" y="50%" dy="0.35em" text-anchor="middle"
            font-family="Satoshi, 'Segoe UI', Helvetica, Arial, sans-serif"
            font-size="${Math.round(size * 0.38)}" font-weight="600" fill="#ffffff">${initials}</text>
    </svg>`;

  return encodeSvg(svg);
}

/** Square logo mark for an organisation (used by job listings and cohorts). */
export function companyLogoFor(name: string, size = 96): string {
  const rng = makeRng(`company:${name}`);
  const [from, to] = AVATAR_GRADIENTS[Math.floor(rng() * AVATAR_GRADIENTS.length)];
  const initials = initialsOf(name);
  const id = `co${Math.floor(rng() * 1e9).toString(36)}`;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
      <defs>
        <linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${from}"/>
          <stop offset="100%" stop-color="${to}"/>
        </linearGradient>
      </defs>
      <rect width="${size}" height="${size}" rx="${Math.round(size * 0.22)}" fill="url(#${id})"/>
      <text x="50%" y="50%" dy="0.35em" text-anchor="middle"
            font-family="Satoshi, 'Segoe UI', Helvetica, Arial, sans-serif"
            font-size="${Math.round(size * 0.36)}" font-weight="700" fill="#ffffff">${initials}</text>
    </svg>`;

  return encodeSvg(svg);
}
