/**
 * Shared plumbing for the hand-drawn illustrations.
 *
 * Every illustration in this folder is authored SVG, inlined as a data URI, for
 * the same reason the icons and fonts are bundled: the demo has to render whole
 * with the network unplugged. Stock illustration from a CDN would be one more
 * thing that arrives late on a school's guest wifi, and the covers it replaced
 * were Unsplash photographs of server racks.
 *
 * Two rules the whole folder follows, both learned the hard way.
 *
 * NO COMMENTS INSIDE THE SVG STRING. XML forbids a double hyphen inside a
 * comment, Chromium refuses to parse the file rather than skipping the comment,
 * and the result is a broken image served with a 200 and a correct content type.
 * Explain the drawing in TypeScript comments, outside the template literal.
 *
 * EVERY GRADIENT AND CLIP ID IS UNIQUE PER INSTANCE. These SVGs are inlined, and
 * ids in inlined SVG share one document scope: two covers using `id="g"` make the
 * second adopt whichever gradient the browser resolved first, so a page of six
 * course cards renders six copies of one colour.
 */

/** The one dark tone every illustration outlines with, so the set reads as a set. */
export const OUTLINE = "#10224a";

/** Two pops used sparingly across every motif, for the same reason. */
export const SUNSHINE = "#facc15";
export const CORAL = "#fb7185";

/**
 * A data URI for an SVG string.
 *
 * encodeURIComponent rather than base64: it is shorter for markup this small and
 * stays readable in devtools, which matters when a cover renders wrong and the
 * only evidence is the URL.
 */
export function svgDataUri(svg: string): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg.replace(/\s+/g, " ").trim())}`;
}

/**
 * A short, stable, collision-resistant suffix for SVG ids.
 *
 * Seeded from the caller's own key (a subject key, a person's name) rather than
 * from a counter or Math.random: the seeds in this repo must produce identical
 * output on the server and in the browser or hydration disagrees, and a module
 * level counter increments differently across those two passes.
 */
export function idSuffix(key: string): string {
  let hash = 2166136261;
  for (let i = 0; i < key.length; i++) {
    hash ^= key.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
}

/**
 * Scattered confetti: the shapes that make a flat drawing feel playful rather
 * than diagrammatic.
 *
 * Positions are a hand-picked list, not random, because these have to clear the
 * subject motif in the middle of the canvas and a random scatter kept landing a
 * dot on the flask.
 */
export function confetti(colors: [string, string], width = 480): string {
  const [a, b] = colors;
  // The pad is how far the wide variant extends the plate past the 480 drawing.
  // Confetti spreads into it so the extra background is not visibly empty.
  const pad = (width - 480) / 2;
  const dots: Array<[number, number, number, string]> = [
    [38 - pad * 0.6, 40, 7, a],
    [446 + pad * 0.6, 62, 6, b],
    [70 - pad * 0.8, 226, 6, b],
    [418 + pad * 0.5, 214, 8, a],
    [250, 26, 5, b],
    [130, 34, 4, a],
    [362, 244, 5, a],
    ...(pad > 0
      ? ([
          [-pad * 0.35, 150, 6, b],
          [480 + pad * 0.35, 176, 7, a],
          [-pad * 0.7, 86, 5, a],
        ] as Array<[number, number, number, string]>)
      : []),
  ];
  const circles = dots
    .map(([cx, cy, r, fill]) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" opacity="0.75"/>`)
    .join("");

  // Two four-pointed sparkles, drawn as a pair of crossed strokes rather than a
  // star path: at this size a path reads as a blob and two strokes read as a
  // twinkle.
  const sparkle = (x: number, y: number, s: number, stroke: string) =>
    `<g stroke="${stroke}" stroke-width="3.5" stroke-linecap="round" opacity="0.8">` +
    `<line x1="${x - s}" y1="${y}" x2="${x + s}" y2="${y}"/>` +
    `<line x1="${x}" y1="${y - s}" x2="${x}" y2="${y + s}"/></g>`;

  return (
    circles +
    sparkle(408 + pad * 0.4, 40, 9, SUNSHINE) +
    sparkle(62 - pad * 0.4, 128, 7, SUNSHINE)
  );
}

/**
 * The background plate: a soft vertical wash in the subject tint, plus the
 * confetti.
 *
 * The wash goes tint to white rather than tint to a darker tint, so the bottom of
 * every cover is near white and the card's own title text sits on something
 * predictable regardless of subject.
 */
export function plate(
  id: string,
  tint: string,
  confettiColors: [string, string],
  width = 480,
): string {
  const pad = (width - 480) / 2;
  return (
    `<defs><linearGradient id="bg${id}" x1="0" y1="0" x2="0" y2="1">` +
    `<stop offset="0%" stop-color="${tint}"/><stop offset="100%" stop-color="#ffffff"/>` +
    `</linearGradient></defs>` +
    `<rect x="${-pad}" y="0" width="${width}" height="270" fill="url(#bg${id})"/>` +
    confetti(confettiColors, width)
  );
}
