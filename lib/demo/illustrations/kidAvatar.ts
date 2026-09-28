/**
 * Illustrated children, drawn per character.
 *
 * The adult demo gave every person a photograph from randomuser.me. For a school
 * that is wrong twice over: the faces are adults, and the honest fix - photographs
 * of real children - is one this repo will not ship. Children's likenesses carry
 * consent and licensing weight that a sales demo has no business taking on, and a
 * stock photo of a minor in a product mock is exactly the kind of image that
 * outlives the context it was cleared for. So the children here are drawn.
 *
 * It also closes the last hole in the offline story. Portraits were the one
 * remaining remote asset after the course covers, so with these the demo renders
 * whole with the network unplugged.
 *
 * NOTHING HERE READS A NAME AND DECIDES ANYTHING. Every look comes from an opaque
 * seed string, and the roster hands each character its own authored seed, the same
 * way it used to hand them an authored photo slot. Inferring appearance from a
 * name is the assumption most worth avoiding, and keeping the seed opaque means
 * the code cannot do it even by accident.
 */

import { makeRng } from "../random";
import { idSuffix, svgDataUri } from "./svg";

/**
 * Skin tones, spanning the range rather than clustering.
 *
 * Picked by index from an opaque seed, so the distribution across a roster is
 * even and nothing in the code connects a tone to a name, a role or a rank.
 */
const SKIN = ["#f8d5c2", "#f0c0a0", "#e0a884", "#c68863", "#a26a45", "#7c4a2d"] as const;

/** Hair colours. Weighted toward dark because the roster is mostly Indian names. */
const HAIR = ["#1d1512", "#231a15", "#2f2019", "#3d2b1f", "#5a3a22", "#7a4b2a"] as const;

/** Uniform and t-shirt colours. Pulled from the subject palette so the set agrees. */
const TOPS = [
  "#1b6fd4",
  "#14b8a6",
  "#4ade80",
  "#fb7185",
  "#fbbf24",
  "#818cf8",
  "#e879f9",
  "#0ea5a5",
] as const;

/** Background discs. Soft enough that a grid of avatars does not vibrate. */
const BACKDROPS = [
  "#eff7ff",
  "#e4fbf7",
  "#e8fbef",
  "#fff0f3",
  "#fff8e6",
  "#eef0ff",
  "#fdf0fd",
  "#f1f5f9",
] as const;

type HairStyle =
  | "short"
  | "curls"
  | "bun"
  | "ponytail"
  | "braids"
  | "bob"
  | "fringe"
  | "wrap";

/**
 * The hair styles proper. `wrap` is NOT in this list.
 *
 * A headscarf is a garment, not a hairstyle, and leaving it in the uniform draw
 * put one on 16% of the roster - chance making a cultural decision that should be
 * made on purpose. It is drawn separately below, at a rate chosen rather than
 * inherited from the length of an array.
 */
const HAIR_STYLES: readonly HairStyle[] = [
  "short",
  "curls",
  "bun",
  "ponytail",
  "braids",
  "bob",
  "fringe",
];

/** How often a child wears a headscarf. Present, and not a one-in-eight novelty. */
const WRAP_RATE = 0.08;

export interface KidLook {
  skin: string;
  hair: string;
  style: HairStyle;
  top: string;
  backdrop: string;
  glasses: boolean;
  freckles: boolean;
  /** Adults only: teachers and administrators are drawn as grown-ups. */
  adult: boolean;
  beard: boolean;
}

/**
 * A stable look for an opaque seed.
 *
 * One rng stream drawn in a fixed order, not seven independent `seededPick`
 * calls: independent hashes of the same short seed correlate, and the first
 * version gave every child whose seed started with the same letter the same hair.
 */
export function lookFor(seed: string, adult = false): KidLook {
  const rng = makeRng(`kid:${seed}`);
  const pick = <T>(items: readonly T[]): T => items[Math.floor(rng() * items.length)];

  const skin = pick(SKIN);
  const hair = pick(HAIR);
  const style = pick(HAIR_STYLES);
  const wrapped = rng() < WRAP_RATE;

  return {
    skin,
    hair,
    style: wrapped ? "wrap" : style,
    top: pick(TOPS),
    backdrop: pick(BACKDROPS),
    // Teachers wear glasses more often than children do, which is the cheapest
    // signal of age that does not rely on drawing wrinkles at 24 pixels.
    glasses: rng() < (adult ? 0.45 : 0.26),
    freckles: !adult && rng() < 0.3,
    adult,
    beard: adult && rng() < 0.35,
  };
}

/** Hair drawn BEHIND the head: the volume that reads as length. */
function hairBack(look: KidLook): string {
  const f = look.hair;
  switch (look.style) {
    case "ponytail":
      return `<circle cx="74" cy="34" r="9" fill="${f}"/><path d="M68 32 C82 30 84 48 76 58 C72 50 70 40 68 32 Z" fill="${f}"/>`;
    case "braids":
      return (
        `<path d="M24 44 C16 52 16 66 20 76 C26 74 28 62 28 52 Z" fill="${f}"/>` +
        `<path d="M72 44 C80 52 80 66 76 76 C70 74 68 62 68 52 Z" fill="${f}"/>` +
        `<circle cx="19" cy="78" r="4" fill="#fb7185"/><circle cx="77" cy="78" r="4" fill="#fb7185"/>`
      );
    case "bob":
      return `<path d="M22 44 C22 22 74 22 74 44 L74 64 C74 68 68 68 68 62 L68 46 L28 46 L28 62 C28 68 22 68 22 64 Z" fill="${f}"/>`;
    case "bun":
      return `<circle cx="48" cy="14" r="10" fill="${f}"/>`;
    case "wrap":
      return "";
    default:
      return "";
  }
}

/** Hair drawn OVER the head: the hairline itself. */
function hairFront(look: KidLook): string {
  const f = look.hair;
  switch (look.style) {
    case "curls":
      return (
        `<g fill="${f}">` +
        `<circle cx="32" cy="26" r="10"/><circle cx="44" cy="20" r="11"/>` +
        `<circle cx="57" cy="22" r="10"/><circle cx="66" cy="31" r="9"/>` +
        `<circle cx="28" cy="36" r="8"/></g>`
      );
    case "fringe":
      return `<path d="M27 40 C27 20 69 20 69 40 C60 34 54 32 48 32 C40 32 33 35 27 40 Z" fill="${f}"/>`;
    case "wrap":
      // A headscarf: drawn as cloth over the hairline and down past the jaw, in
      // the child's top colour rather than a hair colour, because it is clothing.
      return (
        `<path d="M25 44 C25 20 71 20 71 44 C71 60 66 72 58 76 L38 76 C30 72 25 60 25 44 Z" fill="${look.top}"/>` +
        `<path d="M29 40 C34 30 62 30 67 40 C60 36 54 35 48 35 C42 35 35 36 29 40 Z" fill="#ffffff" opacity="0.22"/>`
      );
    case "bun":
    case "ponytail":
    case "braids":
    case "bob":
      return `<path d="M26 42 C26 21 70 21 70 42 C64 33 57 30 48 30 C39 30 32 33 26 42 Z" fill="${f}"/>`;
    default:
      return `<path d="M26 43 C26 20 70 20 70 43 C66 32 58 28 48 28 C38 28 30 32 26 43 Z" fill="${f}"/>`;
  }
}

/**
 * One child's avatar as a data URI.
 *
 * `seed` is opaque: the roster passes each character's authored look id, and
 * anyone created at runtime falls back to their display name. Size is applied as
 * width/height on a fixed 96 unit viewBox, so an avatar is crisp at 24px in a
 * table row and at 160px on a profile.
 */
export function kidAvatar(seed: string, size = 96, adult = false): string {
  const look = lookFor(seed, adult);
  // Unique per avatar: inlined SVGs share one id scope, so a reused clip id makes
  // every avatar on the page adopt whichever one the browser resolved first.
  const id = idSuffix(`kid:${seed}`);

  // A child's head is rounder and larger relative to the shoulders; an adult's is
  // narrower and sits a little higher. That proportion does more to read as age
  // than any feature drawn on the face at this size.
  const rx = look.adult ? 19 : 21;
  const ry = look.adult ? 24 : 23;
  const face =
    `<ellipse cx="48" cy="44" rx="${rx}" ry="${ry}" fill="${look.skin}"/>` +
    `<circle cx="${48 - rx - 2}" cy="47" r="5" fill="${look.skin}"/>` +
    `<circle cx="${48 + rx + 2}" cy="47" r="5" fill="${look.skin}"/>` +
    (look.beard
      ? `<path d="M${48 - rx + 2} 48 C${48 - rx + 2} 70 ${48 + rx - 2} 70 ${48 + rx - 2} 48 ` +
        `C${48 + rx - 2} 64 ${48 - rx + 2} 64 ${48 - rx + 2} 48 Z" fill="${look.hair}" opacity="0.92"/>`
      : "");

  const eyes =
    `<circle cx="40" cy="44" r="3.1" fill="#1e2430"/>` +
    `<circle cx="56" cy="44" r="3.1" fill="#1e2430"/>` +
    `<circle cx="41.2" cy="43" r="1" fill="#ffffff"/>` +
    `<circle cx="57.2" cy="43" r="1" fill="#ffffff"/>`;

  // A smile, not a grin: an arc that opens too far reads as a shout at 24px.
  const mouth =
    `<path d="M42 54 Q48 60 54 54" fill="none" stroke="#1e2430" ` +
    `stroke-width="2.4" stroke-linecap="round"/>`;

  // Blush is a child cue. On an adult face it reads as embarrassment, not health.
  const blush = look.adult
    ? ""
    : `<ellipse cx="33" cy="52" rx="4.5" ry="2.8" fill="#fb7185" opacity="0.4"/>
       <ellipse cx="63" cy="52" rx="4.5" ry="2.8" fill="#fb7185" opacity="0.4"/>`;

  const freckles = look.freckles
    ? `<g fill="#8a5a3c" opacity="0.5"><circle cx="37" cy="50" r="0.9"/><circle cx="41" cy="52" r="0.9"/>` +
      `<circle cx="55" cy="52" r="0.9"/><circle cx="59" cy="50" r="0.9"/></g>`
    : "";

  const glasses = look.glasses
    ? `<g fill="none" stroke="#1e2430" stroke-width="2" opacity="0.85">` +
      `<circle cx="40" cy="44" r="7.5"/><circle cx="56" cy="44" r="7.5"/>` +
      `<line x1="47.5" y1="44" x2="48.5" y2="44"/></g>`
    : "";

  // Shoulders are clipped to the disc so the figure sits IN the circle rather
  // than on it, which is what stops a row of avatars looking like stickers.
  const body =
    `<path d="M48 66 C30 66 16 78 12 96 L84 96 C80 78 66 66 48 66 Z" fill="${look.top}"/>` +
    (look.adult
      // A collar, not a round neck: staff read as staff at a glance in a roster
      // that mixes them with children.
      ? `<path d="M40 66 L48 80 L56 66 L52 64 L48 72 L44 64 Z" fill="#ffffff" opacity="0.9"/>` +
        `<path d="M38 96 C38 82 42 72 48 72 C54 72 58 82 58 96 Z" fill="${look.top}" opacity="0.001"/>`
      : `<path d="M40 67 L48 78 L56 67 C53 65 43 65 40 67 Z" fill="#ffffff" opacity="0.55"/>`);

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" width="${size}" height="${size}">` +
    `<defs><clipPath id="c${id}"><circle cx="48" cy="48" r="48"/></clipPath></defs>` +
    `<g clip-path="url(#c${id})">` +
    `<rect width="96" height="96" fill="${look.backdrop}"/>` +
    hairBack(look) +
    body +
    `<rect x="42" y="60" width="12" height="10" rx="5" fill="${look.skin}"/>` +
    face +
    hairFront(look) +
    eyes +
    glasses +
    blush +
    freckles +
    mouth +
    `</g></svg>`;

  return svgDataUri(svg);
}

/** A grown-up: teachers, administrators, anyone who is not a learner. */
export function adultAvatar(seed: string, size = 96): string {
  return kidAvatar(seed, size, true);
}
