/**
 * The child figure, as a reusable primitive.
 *
 * Every scene in `scenes.ts` is built from this rather than drawn by hand, which
 * is the only reason eight scenes stay consistent with each other and with the
 * avatars. A scene that hand-draws its own children ends up with a different head
 * to shoulder ratio in each one, and the set stops looking like one illustrator
 * drew it.
 *
 * Coordinates are a 100 wide by 150 tall figure with its feet at y=150, so a
 * caller places a child by translating to where the feet go and never has to
 * reason about the head.
 */

import { OUTLINE } from "./svg";

export interface FigureOptions {
  skin: string;
  hair: string;
  top: string;
  /** Trousers, skirt, or the lower half of a uniform. */
  bottom: string;
  /** Which way the child faces. Scenes use this to make two children face each other. */
  facing?: "left" | "right" | "front";
  /** Arms up is the whole vocabulary of celebration at this size. */
  pose?: "stand" | "wave" | "cheer" | "sit";
  hairStyle?: "short" | "bun" | "ponytail" | "curls" | "wrap";
  outline?: string;
}

/** A face: two eyes and a smile, sized for the 100x150 figure. */
function figureFace(o: FigureOptions, stroke: string): string {
  const eye = (cx: number) =>
    `<circle cx="${cx}" cy="40" r="2.6" fill="${stroke}"/>`;
  const eyes =
    o.facing === "left"
      ? eye(38) + eye(48)
      : o.facing === "right"
        ? eye(52) + eye(62)
        : eye(43) + eye(57);
  const mouthX = o.facing === "left" ? 43 : o.facing === "right" ? 57 : 50;
  return (
    eyes +
    `<path d="M${mouthX - 5} 48 Q${mouthX} 53 ${mouthX + 5} 48" fill="none" ` +
    `stroke="${stroke}" stroke-width="2.2" stroke-linecap="round"/>`
  );
}

function figureHair(o: FigureOptions): string {
  const f = o.hair;
  switch (o.hairStyle) {
    case "bun":
      return (
        `<circle cx="50" cy="6" r="9" fill="${f}"/>` +
        `<path d="M28 40 C28 10 72 10 72 40 C60 32 40 32 28 40 Z" fill="${f}"/>`
      );
    case "ponytail":
      return (
        `<path d="M68 26 C82 26 84 46 75 58 C70 46 68 34 68 26 Z" fill="${f}"/>` +
        `<path d="M28 40 C28 10 72 10 72 40 C60 32 40 32 28 40 Z" fill="${f}"/>`
      );
    case "curls":
      return (
        `<g fill="${f}"><circle cx="32" cy="22" r="11"/><circle cx="46" cy="14" r="12"/>` +
        `<circle cx="60" cy="18" r="11"/><circle cx="68" cy="30" r="10"/>` +
        `<circle cx="30" cy="34" r="9"/></g>`
      );
    case "wrap":
      return `<path d="M28 32 C28 10 72 10 72 32 C72 48 67 58 60 62 L40 62 C33 58 28 48 28 32 Z" fill="${o.top}"/>`;
    default:
      // A SOLID dome, not a crescent between two arcs. The crescent version had its
      // outer apex at y~20 and its inner apex at y~23, so the hair was three pixels
      // thick at the crown and every child rendered bald once a scene scaled them
      // down to 0.6. This spans y~17 to y~34 in the middle.
      return `<path d="M28 40 C28 10 72 10 72 40 C60 32 40 32 28 40 Z" fill="${f}"/>`;
  }
}

/**
 * Arms. Drawn as thick round-capped strokes rather than filled shapes, because a
 * filled arm needs a shoulder joint to look right and a stroke does not.
 */
function figureArms(o: FigureOptions, stroke: string): string {
  // Outline stroke UNDER a narrower fill stroke, then a hand at the far end.
  // The first version drew the outline at opacity 0.001, which meant a sleeve in
  // the shirt colour sat on a torso in the shirt colour: the arms were there and
  // completely invisible, and every cheering child looked armless.
  const arm = (d: string, hand: [number, number]) =>
    `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="14" stroke-linecap="round"/>` +
    `<path d="${d}" fill="none" stroke="${o.top}" stroke-width="10" stroke-linecap="round"/>` +
    `<circle cx="${hand[0]}" cy="${hand[1]}" r="6.5" fill="${o.skin}" stroke="${stroke}" stroke-width="2"/>`;

  switch (o.pose) {
    case "cheer":
      return arm("M34 82 L18 52", [18, 52]) + arm("M66 82 L82 52", [82, 52]);
    case "wave":
      return arm("M34 82 L24 106", [24, 106]) + arm("M66 82 L84 50", [84, 50]);
    case "sit":
      return arm("M34 82 L30 104", [30, 104]) + arm("M66 82 L72 104", [72, 104]);
    default:
      return arm("M34 82 L28 108", [28, 108]) + arm("M66 82 L72 108", [72, 108]);
  }
}

/**
 * One child, feet at y=150 in the figure's own 100x150 box.
 *
 * `sit` swaps the legs for a seated shape, which is what the classroom and study
 * scenes need; everything else keeps the same body so a standing child in one
 * scene is the same character type as a standing child in another.
 */
export function child(o: FigureOptions): string {
  const stroke = o.outline ?? OUTLINE;
  const legs =
    o.pose === "sit"
      ? `<path d="M36 112 L36 132 L20 132 L20 144 L44 144 L52 112 Z" fill="${o.bottom}"/>` +
        `<path d="M56 112 L60 132 L44 132 L44 144 L68 144 L72 112 Z" fill="${o.bottom}"/>`
      : `<rect x="36" y="110" width="12" height="40" rx="5" fill="${o.bottom}"/>` +
        `<rect x="52" y="110" width="12" height="40" rx="5" fill="${o.bottom}"/>` +
        `<rect x="32" y="142" width="18" height="8" rx="4" fill="${stroke}"/>` +
        `<rect x="50" y="142" width="18" height="8" rx="4" fill="${stroke}"/>`;

  return (
    `<g>` +
    figureArms(o, stroke) +
    legs +
    `<path d="M50 66 C36 66 30 76 30 90 L30 114 L70 114 L70 90 C70 76 64 66 50 66 Z" fill="${o.top}"/>` +
    `<rect x="44" y="56" width="12" height="14" rx="5" fill="${o.skin}"/>` +
    `<ellipse cx="50" cy="38" rx="21" ry="23" fill="${o.skin}"/>` +
    figureHair(o) +
    figureFace(o, stroke) +
    `</g>`
  );
}

/** Place a figure: translate to where the feet go, and scale about that point. */
export function placeChild(x: number, y: number, scale: number, o: FigureOptions): string {
  return `<g transform="translate(${x} ${y}) scale(${scale}) translate(-50 -150)">${child(o)}</g>`;
}

/** A grown-up: taller, narrower head, longer legs. Teachers in the class scenes. */
export function placeAdult(x: number, y: number, scale: number, o: FigureOptions): string {
  const stroke = o.outline ?? OUTLINE;
  const body =
    `<g>` +
    figureArms(o, stroke) +
    `<rect x="36" y="108" width="12" height="46" rx="5" fill="${o.bottom}"/>` +
    `<rect x="52" y="108" width="12" height="46" rx="5" fill="${o.bottom}"/>` +
    `<rect x="32" y="146" width="18" height="8" rx="4" fill="${stroke}"/>` +
    `<rect x="50" y="146" width="18" height="8" rx="4" fill="${stroke}"/>` +
    `<path d="M50 64 C36 64 30 74 30 88 L30 112 L70 112 L70 88 C70 74 64 64 50 64 Z" fill="${o.top}"/>` +
    `<path d="M42 64 L50 78 L58 64 L54 62 L50 70 L46 62 Z" fill="#ffffff" opacity="0.9"/>` +
    `<rect x="44" y="52" width="12" height="16" rx="5" fill="${o.skin}"/>` +
    `<ellipse cx="50" cy="34" rx="19" ry="23" fill="${o.skin}"/>` +
    figureHair(o) +
    figureFace(o, stroke) +
    `</g>`;
  // Adults are drawn at 1.22x a child, which is roughly the real ratio between a
  // teacher and a twelve year old and is what makes a classroom scene scan.
  return `<g transform="translate(${x} ${y}) scale(${scale * 1.22}) translate(-50 -154)">${body}</g>`;
}
