/**
 * Course cover illustrations, one motif per school subject.
 *
 * These replace the Unsplash photographs the adult demo used, and not only
 * because a server rack is a strange thing to put on a Grade 7 Science card. The
 * covers were the last remote images in the product besides the roster portraits,
 * so drawing them here is what finally makes the demo render whole with the
 * network unplugged.
 *
 * Each motif is a flat drawing on a wash of its subject's tint, outlined in one
 * shared dark navy so six cards read as one illustrated set rather than six
 * clip-art choices. The subject's own hue does the identifying; the outline does
 * the belonging.
 *
 * Read `svg.ts` before editing: no comments inside the SVG string, and every id
 * carries a per-instance suffix.
 */

import { CORAL, OUTLINE, SUNSHINE, idSuffix, plate, svgDataUri } from "./svg";
import { subjectOf, type Subject, type SubjectKey } from "../db/subjects";

/** Common stroke settings. Round caps everywhere: a mitred corner reads as technical. */
const S = `fill="none" stroke="${OUTLINE}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;

/**
 * Maths: a protractor over a triangle, with the operators loose around them.
 *
 * The protractor is the one instrument in a Grade 7 geometry box that is
 * instantly recognisable in silhouette, which is why it carries this card rather
 * than a page of sums.
 */
function geometry(s: Subject): string {
  return (
    `<path d="M150 186 A82 82 0 0 1 314 186 Z" fill="${s.from}"/>` +
    `<path d="M150 186 A82 82 0 0 1 314 186" ${S}/>` +
    `<line x1="150" y1="186" x2="314" y2="186" ${S}/>` +
    `<line x1="232" y1="186" x2="232" y2="120" stroke="${OUTLINE}" stroke-width="4" stroke-linecap="round"/>` +
    `<line x1="232" y1="186" x2="290" y2="140" stroke="${OUTLINE}" stroke-width="4" stroke-linecap="round"/>` +
    `<circle cx="232" cy="186" r="7" fill="${OUTLINE}"/>` +
    `<path d="M92 210 L136 132 L180 210 Z" fill="${SUNSHINE}"/>` +
    `<path d="M92 210 L136 132 L180 210 Z" ${S}/>` +
    `<circle cx="366" cy="170" r="38" fill="${CORAL}"/>` +
    `<circle cx="366" cy="170" r="38" ${S}/>` +
    `<g stroke="${s.to}" stroke-width="7" stroke-linecap="round">` +
    `<line x1="352" y1="90" x2="386" y2="90"/><line x1="369" y1="73" x2="369" y2="107"/>` +
    `<line x1="96" y1="96" x2="130" y2="96"/><line x1="96" y1="112" x2="130" y2="112"/></g>`
  );
}

/**
 * Science: a conical flask mid-reaction, with a leaf beside it.
 *
 * The leaf is deliberate. "Science" at this age is one subject covering physics,
 * chemistry and biology, and a flask alone reads as chemistry only.
 */
function lab(s: Subject): string {
  return (
    `<path d="M214 104 L214 140 L166 216 A14 14 0 0 0 178 238 L286 238 A14 14 0 0 0 298 216 L250 140 L250 104 Z" fill="#ffffff"/>` +
    `<path d="M186 198 L278 198 A0 0 0 0 1 278 198 L286 216 A14 14 0 0 1 274 238 L190 238 A14 14 0 0 1 178 216 Z" fill="${s.from}"/>` +
    `<path d="M214 104 L214 140 L166 216 A14 14 0 0 0 178 238 L286 238 A14 14 0 0 0 298 216 L250 140 L250 104 Z" ${S}/>` +
    `<line x1="204" y1="104" x2="260" y2="104" ${S}/>` +
    `<circle cx="222" cy="214" r="7" fill="#ffffff" opacity="0.9"/>` +
    `<circle cx="246" cy="224" r="5" fill="#ffffff" opacity="0.9"/>` +
    `<circle cx="236" cy="82" r="8" fill="${s.to}"/>` +
    `<circle cx="258" cy="62" r="6" fill="${s.to}" opacity="0.7"/>` +
    `<path d="M112 232 C112 176 148 146 192 142 C188 190 154 226 112 232 Z" fill="${SUNSHINE}"/>` +
    `<path d="M112 232 C112 176 148 146 192 142 C188 190 154 226 112 232 Z" ${S}/>` +
    `<path d="M120 226 C142 196 166 172 188 148" stroke="${OUTLINE}" stroke-width="4" stroke-linecap="round" fill="none"/>` +
    `<g transform="translate(372 130)">` +
    `<circle cx="0" cy="0" r="12" fill="${CORAL}"/><circle cx="0" cy="0" r="12" ${S}/>` +
    `<ellipse cx="0" cy="0" rx="42" ry="17" ${S}/>` +
    `<ellipse cx="0" cy="0" rx="42" ry="17" ${S} transform="rotate(60)"/>` +
    `<ellipse cx="0" cy="0" rx="42" ry="17" ${S} transform="rotate(120)"/></g>`
  );
}

/**
 * English: an open book with a pencil laid across it, under a quote mark.
 *
 * The quote mark is what separates this from a generic "learning" book icon: this
 * subject is reading and writing, so the card shows both being used.
 */
function book(s: Subject): string {
  return (
    `<path d="M240 122 C210 100 158 96 120 104 L120 218 C158 210 210 214 240 236 Z" fill="#ffffff"/>` +
    `<path d="M240 122 C270 100 322 96 360 104 L360 218 C322 210 270 214 240 236 Z" fill="${s.from}"/>` +
    `<path d="M240 122 C210 100 158 96 120 104 L120 218 C158 210 210 214 240 236 Z" ${S}/>` +
    `<path d="M240 122 C270 100 322 96 360 104 L360 218 C322 210 270 214 240 236 Z" ${S}/>` +
    `<line x1="240" y1="122" x2="240" y2="236" ${S}/>` +
    `<g stroke="${OUTLINE}" stroke-width="4" stroke-linecap="round" opacity="0.55">` +
    `<line x1="146" y1="134" x2="212" y2="140"/><line x1="146" y1="158" x2="212" y2="164"/>` +
    `<line x1="146" y1="182" x2="196" y2="186"/></g>` +
    `<g transform="rotate(-24 300 176)">` +
    `<rect x="266" y="164" width="86" height="22" rx="6" fill="${SUNSHINE}"/>` +
    `<rect x="266" y="164" width="86" height="22" rx="6" ${S}/>` +
    `<path d="M352 164 L376 175 L352 186 Z" fill="${CORAL}"/>` +
    `<path d="M352 164 L376 175 L352 186 Z" ${S}/></g>` +
    `<g fill="${s.to}">` +
    `<path d="M158 56 C158 44 168 36 180 36 L180 50 C174 50 170 54 170 60 L182 60 L182 82 L158 82 Z"/>` +
    `<path d="M196 56 C196 44 206 36 218 36 L218 50 C212 50 208 54 208 60 L220 60 L220 82 L196 82 Z"/></g>`
  );
}

/**
 * Social Studies: a globe with a map pin dropped on it, beside a civic building.
 *
 * Latitude lines are drawn as ellipses of varying ry rather than a single grid,
 * because a flat grid on a circle reads as a ball and not as a planet. The
 * building was an arch first, which rendered as a tombstone; a pediment on three
 * columns is the silhouette that reads as parliament, museum and history at once.
 */
function globe(s: Subject): string {
  return (
    `<circle cx="212" cy="164" r="84" fill="${s.from}"/>` +
    `<path d="M212 80 C244 108 244 220 212 248 C180 220 180 108 212 80 Z" fill="#ffffff" opacity="0.45"/>` +
    `<circle cx="212" cy="164" r="84" ${S}/>` +
    `<ellipse cx="212" cy="164" rx="84" ry="30" ${S}/>` +
    `<line x1="212" y1="80" x2="212" y2="248" ${S}/>` +
    `<ellipse cx="212" cy="164" rx="40" ry="84" ${S}/>` +
    `<path d="M338 96 C338 78 352 64 370 64 C388 64 402 78 402 96 C402 122 370 158 370 158 C370 158 338 122 338 96 Z" fill="${CORAL}"/>` +
    `<path d="M338 96 C338 78 352 64 370 64 C388 64 402 78 402 96 C402 122 370 158 370 158 C370 158 338 122 338 96 Z" ${S}/>` +
    `<circle cx="370" cy="94" r="14" fill="#ffffff"/>` +
    `<circle cx="370" cy="94" r="14" ${S}/>` +
    `<g><path d="M326 186 L376 158 L426 186 Z" fill="${SUNSHINE}"/>` +
    `<path d="M326 186 L376 158 L426 186 Z" ${S}/>` +
    `<rect x="336" y="186" width="14" height="50" fill="#ffffff"/>` +
    `<rect x="369" y="186" width="14" height="50" fill="#ffffff"/>` +
    `<rect x="402" y="186" width="14" height="50" fill="#ffffff"/>` +
    `<rect x="336" y="186" width="14" height="50" ${S}/>` +
    `<rect x="369" y="186" width="14" height="50" ${S}/>` +
    `<rect x="402" y="186" width="14" height="50" ${S}/>` +
    `<line x1="320" y1="236" x2="432" y2="236" ${S}/></g>`
  );
}

/**
 * Computer Science: a monitor showing braces and a caret, with a mouse pointer.
 *
 * Braces rather than a terminal prompt: this course teaches a child to write a
 * program, and `{}` is the shape they will actually be typing. Drawn as real
 * curly braces with a middle pinch - the first pass drew them as angle brackets,
 * which is a different character and reads as maths, not code. The bar between
 * them is a text caret.
 */
function screen(s: Subject): string {
  return (
    `<rect x="118" y="74" width="244" height="152" rx="18" fill="#ffffff"/>` +
    `<rect x="118" y="74" width="244" height="152" rx="18" ${S}/>` +
    `<rect x="132" y="88" width="216" height="124" rx="10" fill="${s.tint}"/>` +
    `<line x1="240" y1="226" x2="240" y2="244" ${S}/>` +
    `<line x1="196" y1="244" x2="284" y2="244" ${S}/>` +
    `<g fill="none" stroke="${s.to}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round">` +
    `<path d="M202 114 C186 114 190 134 190 142 C190 148 184 150 178 150 C184 150 190 152 190 158 C190 166 186 186 202 186"/>` +
    `<path d="M278 114 C294 114 290 134 290 142 C290 148 296 150 302 150 C296 150 290 152 290 158 C290 166 294 186 278 186"/></g>` +
    `<g stroke="${OUTLINE}" stroke-width="8" stroke-linecap="round">` +
    `<line x1="224" y1="128" x2="224" y2="172"/></g>` +
    `<g stroke="${s.from}" stroke-width="7" stroke-linecap="round">` +
    `<line x1="240" y1="172" x2="268" y2="172"/></g>` +
    `<g><path d="M330 168 L330 238 L348 220 L360 246 L376 238 L364 212 L388 208 Z" fill="${SUNSHINE}"/>` +
    `<path d="M330 168 L330 238 L348 220 L360 246 L376 238 L364 212 L388 208 Z" ${S}/></g>` +
    `<circle cx="150" cy="104" r="6" fill="${CORAL}"/>`
  );
}

/**
 * Art & Design: a palette with wet blobs and a brush, plus a splatter.
 *
 * The blobs are the six subject hues. It is the one card allowed to quote the
 * whole palette, because mixing colour is literally the subject.
 */
function palette(s: Subject): string {
  const blobs: Array<[number, number, string]> = [
    [178, 132, "#14b8a6"],
    [222, 116, "#4ade80"],
    [266, 124, "#fb7185"],
    [286, 162, "#fbbf24"],
    [252, 190, "#818cf8"],
    [198, 182, "#e879f9"],
  ];
  const wells = blobs
    .map(
      ([cx, cy, fill]) =>
        `<circle cx="${cx}" cy="${cy}" r="17" fill="${fill}"/>` +
        `<circle cx="${cx}" cy="${cy}" r="17" fill="none" stroke="${OUTLINE}" stroke-width="4"/>`,
    )
    .join("");

  return (
    `<path d="M232 68 C300 68 356 112 356 162 C356 196 330 212 306 216 C286 220 278 232 284 246 C288 256 280 262 266 260 C196 250 140 210 140 158 C140 108 176 68 232 68 Z" fill="#ffffff"/>` +
    `<path d="M232 68 C300 68 356 112 356 162 C356 196 330 212 306 216 C286 220 278 232 284 246 C288 256 280 262 266 260 C196 250 140 210 140 158 C140 108 176 68 232 68 Z" ${S}/>` +
    `<ellipse cx="232" cy="156" rx="24" ry="20" fill="${s.tint}"/>` +
    `<ellipse cx="232" cy="156" rx="24" ry="20" fill="none" stroke="${OUTLINE}" stroke-width="4"/>` +
    wells +
    `<g transform="rotate(32 400 120)">` +
    `<rect x="384" y="54" width="20" height="82" rx="8" fill="${SUNSHINE}"/>` +
    `<rect x="384" y="54" width="20" height="82" rx="8" ${S}/>` +
    `<path d="M382 136 L406 136 L400 172 L388 172 Z" fill="${s.to}"/>` +
    `<path d="M382 136 L406 136 L400 172 L388 172 Z" ${S}/></g>` +
    `<circle cx="96" cy="196" r="11" fill="${CORAL}"/>` +
    `<circle cx="74" cy="224" r="6" fill="${CORAL}" opacity="0.8"/>`
  );
}

const MOTIFS: Record<Subject["motif"], (s: Subject) => string> = {
  geometry,
  lab,
  book,
  globe,
  screen,
  palette,
};

/**
 * The cover for a subject, as a data URI.
 *
 * `variant` exists because the same subject appears as a 480x270 catalogue card
 * and as a 1600px page header, and the header crops the card art to a letterbox
 * that cuts the motif in half. The wide variant keeps the same drawing and only
 * widens the plate around it.
 */
export function subjectCover(key: SubjectKey | string, variant: "card" | "wide" = "card"): string {
  const s = subjectOf(key);
  const id = idSuffix(`${s.key}:${variant}`);

  // WIDENS the plate, never crops the drawing. The first version shifted the
  // viewBox down to make a letterbox, which cut the legs off the monitor and the
  // base off the civic building - the two motifs that reach furthest down the
  // canvas. The motif keeps its 480x270 coordinate space and the background
  // grows around it, which is also why `plate` and `confetti` take a width.
  const width = variant === "wide" ? 900 : 480;
  const pad = (width - 480) / 2;

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-pad} 0 ${width} 270" ` +
    `width="${width}" height="270">` +
    plate(id, s.tint, [s.from, s.to], width) +
    MOTIFS[s.motif](s) +
    `</svg>`;

  return svgDataUri(svg);
}
