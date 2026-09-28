/**
 * Scene illustrations: children, classrooms and school things.
 *
 * These are the pictures that carry the "this product is for children" message on
 * every surface that is not a course card - the sign-in panel, the dashboard
 * greeting, empty states, the celebration after a finished lesson.
 *
 * Every scene is built from the figures in `figures.ts` rather than drawn by
 * hand, so a child standing in the classroom scene is recognisably the same
 * character type as a child waving on the sign-in panel.
 *
 * TONE, NOT THEME. A scene takes `tone: "ink" | "light"`, which picks the outline
 * colour only. "ink" is for the light surfaces that make up most of the product;
 * "light" is for the one dark surface, the sign-in panel, where a navy outline
 * disappears. Nothing else about a scene changes, so the two tones are the same
 * drawing and cannot drift apart.
 *
 * Backgrounds are TRANSPARENT on purpose. These sit on cards, panels and washes
 * of many different colours, and a baked-in background plate is what makes an
 * illustration look pasted on.
 */

import { CORAL, OUTLINE, SUNSHINE, svgDataUri } from "./svg";
import { placeAdult, placeChild, type FigureOptions } from "./figures";

export type SceneTone = "ink" | "light";

/** Outline for the tone. On the dark sign-in panel a navy line is invisible. */
function strokeFor(tone: SceneTone): string {
  return tone === "light" ? "#dbeafe" : OUTLINE;
}

/** Skin tones, spread rather than clustered. Scenes pick by index, never by name. */
const SKINS = ["#f8d5c2", "#e0a884", "#c68863", "#a26a45", "#7c4a2d"] as const;

function kid(i: number, over: Partial<FigureOptions> = {}): FigureOptions {
  const tops = ["#1b6fd4", "#14b8a6", "#fb7185", "#fbbf24", "#818cf8", "#4ade80"];
  const bottoms = ["#1e3a8a", "#0f766e", "#be123c", "#96610a", "#4338ca", "#15803d"];
  const styles: FigureOptions["hairStyle"][] = ["short", "bun", "curls", "ponytail", "wrap"];
  return {
    skin: SKINS[i % SKINS.length],
    hair: ["#1d1512", "#2f2019", "#3d2b1f", "#5a3a22"][i % 4],
    top: tops[i % tops.length],
    bottom: bottoms[i % bottoms.length],
    hairStyle: styles[i % styles.length],
    pose: "stand",
    facing: "front",
    ...over,
  };
}

function wrap(inner: string, w: number, h: number): string {
  return svgDataUri(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${inner}</svg>`,
  );
}

/**
 * The sign-in panel: a school with its flag, the sun, and two children arriving.
 *
 * The building is deliberately simple and symmetrical. A school in silhouette is
 * one of the few buildings a child recognises instantly, and detailing it makes
 * it read as a specific institution rather than as "school".
 */
export function sceneSchoolDay(tone: SceneTone = "ink"): string {
  const s = strokeFor(tone);
  const L = `fill="none" stroke="${s}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"`;

  return wrap(
    `<circle cx="402" cy="62" r="34" fill="${SUNSHINE}"/>` +
      `<g stroke="${SUNSHINE}" stroke-width="6" stroke-linecap="round">` +
      `<line x1="402" y1="8" x2="402" y2="20"/><line x1="452" y1="62" x2="464" y2="62"/>` +
      `<line x1="438" y1="26" x2="447" y2="17"/><line x1="438" y1="98" x2="447" y2="107"/></g>` +
      `<path d="M96 246 L96 132 L248 132 L248 246 Z" fill="#ffffff"/>` +
      `<path d="M86 132 L172 78 L258 132 Z" fill="${CORAL}"/>` +
      `<path d="M86 132 L172 78 L258 132 Z" ${L}/>` +
      `<path d="M96 246 L96 132 L248 132 L248 246 Z" ${L}/>` +
      `<line x1="172" y1="78" x2="172" y2="44" ${L}/>` +
      `<path d="M172 44 L212 54 L172 64 Z" fill="${SUNSHINE}"/>` +
      `<rect x="150" y="186" width="44" height="60" rx="6" fill="#1b6fd4"/>` +
      `<rect x="150" y="186" width="44" height="60" rx="6" ${L}/>` +
      `<rect x="116" y="152" width="34" height="28" rx="5" fill="#83c2fa"/>` +
      `<rect x="116" y="152" width="34" height="28" rx="5" ${L}/>` +
      `<rect x="194" y="152" width="34" height="28" rx="5" fill="#83c2fa"/>` +
      `<rect x="194" y="152" width="34" height="28" rx="5" ${L}/>` +
      `<circle cx="336" cy="180" r="42" fill="#4ade80"/>` +
      `<rect x="330" y="200" width="12" height="46" rx="4" fill="#7a4b2a"/>` +
      placeChild(308, 246, 0.62, kid(0, { pose: "wave", facing: "right", outline: s })) +
      placeChild(392, 246, 0.62, kid(3, { pose: "stand", facing: "left", outline: s })) +
      `<line x1="40" y1="246" x2="464" y2="246" ${L}/>`,
    500,
    280,
  );
}

/**
 * The dashboard greeting: a child at a desk with a book and a lamp.
 *
 * Seated, because the dashboard is where a learner settles in rather than arrives.
 */
export function sceneStudyDesk(tone: SceneTone = "ink"): string {
  const s = strokeFor(tone);
  const L = `fill="none" stroke="${s}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"`;

  // The desk top sits at y=214 and the child is drawn to y=214 as well, so the
  // desk crosses them at the waist rather than at the chest. Crossing at the chest
  // is what made the first version read as a shop counter, with the book stranded
  // beside the child instead of in front of them.
  return wrap(
    placeChild(190, 224, 0.92, kid(2, { pose: "sit", facing: "front", outline: s })) +
      `<rect x="58" y="214" width="330" height="13" rx="6" fill="#fbbf24"/>` +
      `<rect x="58" y="214" width="330" height="13" rx="6" ${L}/>` +
      `<rect x="82" y="227" width="11" height="50" rx="4" fill="#96610a"/>` +
      `<rect x="353" y="227" width="11" height="50" rx="4" fill="#96610a"/>` +
      `<g transform="translate(150 186)">` +
      `<path d="M0 30 C12 22 30 22 42 28 L42 2 C30 -4 12 -4 0 4 Z" fill="#ffffff"/>` +
      `<path d="M84 30 C72 22 54 22 42 28 L42 2 C54 -4 72 -4 84 4 Z" fill="#fb7185"/>` +
      `<path d="M0 30 C12 22 30 22 42 28 L42 2 C30 -4 12 -4 0 4 Z" ${L}/>` +
      `<path d="M84 30 C72 22 54 22 42 28 L42 2 C54 -4 72 -4 84 4 Z" ${L}/></g>` +
      `<g transform="translate(316 120)">` +
      `<path d="M0 94 L0 40" ${L}/>` +
      `<path d="M0 40 L-30 12" ${L}/>` +
      `<path d="M-52 2 L-10 2 L-20 30 L-42 30 Z" fill="${SUNSHINE}"/>` +
      `<path d="M-52 2 L-10 2 L-20 30 L-42 30 Z" ${L}/></g>` +
      `<g stroke="${SUNSHINE}" stroke-width="4" stroke-linecap="round" opacity="0.9">` +
      `<line x1="76" y1="86" x2="76" y2="100"/><line x1="69" y1="93" x2="83" y2="93"/>` +
      `<line x1="418" y1="66" x2="418" y2="78"/><line x1="412" y1="72" x2="424" y2="72"/></g>` +
      `<line x1="40" y1="277" x2="440" y2="277" ${L}/>`,
    480,
    300,
  );
}

/**
 * Live classes: a teacher at the board with two children at desks.
 *
 * The adult is drawn from `placeAdult`, so the height difference between teacher
 * and class is the one the figure module defines rather than one guessed here.
 */
export function sceneClassroom(tone: SceneTone = "ink"): string {
  const s = strokeFor(tone);
  const L = `fill="none" stroke="${s}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"`;

  return wrap(
    `<rect x="40" y="44" width="200" height="126" rx="10" fill="#ffffff"/>` +
      `<rect x="40" y="44" width="200" height="126" rx="10" ${L}/>` +
      `<g stroke="#14b8a6" stroke-width="6" stroke-linecap="round">` +
      `<line x1="66" y1="78" x2="150" y2="78"/><line x1="66" y1="102" x2="196" y2="102"/>` +
      `<line x1="66" y1="126" x2="122" y2="126"/></g>` +
      `<circle cx="196" cy="132" r="18" fill="none" stroke="${CORAL}" stroke-width="6"/>` +
      placeAdult(292, 240, 0.72, kid(4, { pose: "wave", facing: "left", outline: s, top: "#1b6fd4", bottom: "#1e3a8a" })) +
      placeChild(96, 244, 0.6, kid(1, { pose: "sit", facing: "right", outline: s })) +
      placeChild(178, 244, 0.6, kid(3, { pose: "sit", facing: "right", outline: s })) +
      `<rect x="66" y="232" width="64" height="10" rx="5" fill="${SUNSHINE}"/>` +
      `<rect x="148" y="232" width="64" height="10" rx="5" fill="${SUNSHINE}"/>` +
      `<line x1="30" y1="268" x2="420" y2="268" ${L}/>`,
    440,
    290,
  );
}

/**
 * Celebration: a child holding a medal, mid-cheer, under confetti.
 *
 * Used after a finished lesson or a passed quiz. Arms up is the entire vocabulary
 * of celebration at this size, which is why the figure module has a `cheer` pose.
 */
export function sceneCelebrate(tone: SceneTone = "ink"): string {
  const s = strokeFor(tone);
  const L = `fill="none" stroke="${s}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"`;
  const bits = [
    [64, 48, "#fb7185"],
    [118, 26, "#14b8a6"],
    [196, 38, "#fbbf24"],
    [268, 22, "#818cf8"],
    [318, 56, "#4ade80"],
    [352, 110, "#e879f9"],
    [46, 118, "#fbbf24"],
  ] as const;

  return wrap(
    bits
      .map(
        ([x, y, c], i) =>
          `<rect x="${x}" y="${y}" width="12" height="12" rx="3" fill="${c}" ` +
          `transform="rotate(${i * 37} ${x + 6} ${y + 6})"/>`,
      )
      .join("") +
      // Tone-aware glow. Yellow at low opacity over the dark panel composites to
      // olive, which reads as dirt rather than as light.
      `<circle cx="200" cy="150" r="82" fill="${tone === "light" ? "#83c2fa" : SUNSHINE}" ` +
      `opacity="${tone === "light" ? 0.22 : 0.28}"/>` +
      placeChild(200, 262, 0.94, kid(0, { pose: "cheer", facing: "front", outline: s })) +
      `<g transform="translate(200 176)">` +
      `<path d="M-16 -34 L-6 -6 L6 -6 L16 -34" ${L}/>` +
      `<circle cx="0" cy="10" r="22" fill="${SUNSHINE}"/>` +
      `<circle cx="0" cy="10" r="22" ${L}/>` +
      `<path d="M0 -2 L4 6 L13 6 L6 11 L9 20 L0 15 L-9 20 L-6 11 L-13 6 L-4 6 Z" fill="${CORAL}"/></g>` +
      `<line x1="60" y1="262" x2="340" y2="262" ${L}/>`,
    400,
    290,
  );
}

/**
 * Community: three children around a table, working on the same thing.
 */
export function sceneTeamwork(tone: SceneTone = "ink"): string {
  const s = strokeFor(tone);
  const L = `fill="none" stroke="${s}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"`;

  // The children are drawn BEFORE the table and overlap its back edge, so they sit
  // AT it rather than behind it. The first version drew a wide flat ellipse with
  // three small figures behind it, which read as a blue puddle.
  return wrap(
    // Feet BELOW the table's top edge (y=206), so the table occludes each child's
      // lower half. At y=196 the middle child's shoes cleared the table and she
      // appeared to be standing on it.
      placeChild(112, 224, 0.74, kid(1, { pose: "sit", facing: "right", outline: s })) +
      placeChild(220, 220, 0.74, kid(4, { pose: "sit", facing: "front", outline: s })) +
      placeChild(328, 224, 0.74, kid(2, { pose: "sit", facing: "left", outline: s })) +
      `<path d="M96 206 L344 206 A28 28 0 0 1 344 234 L96 234 A28 28 0 0 1 96 206 Z" fill="#83c2fa"/>` +
      `<path d="M96 206 L344 206 A28 28 0 0 1 344 234 L96 234 A28 28 0 0 1 96 206 Z" ${L}/>` +
      `<rect x="188" y="208" width="64" height="14" rx="4" fill="#ffffff"/>` +
      `<rect x="188" y="208" width="64" height="14" rx="4" ${L}/>` +
      `<g stroke="${SUNSHINE}" stroke-width="5" stroke-linecap="round">` +
      `<line x1="220" y1="44" x2="220" y2="62"/><line x1="198" y1="58" x2="208" y2="70"/>` +
      `<line x1="242" y1="58" x2="232" y2="70"/></g>` +
      `<circle cx="220" cy="88" r="16" fill="${SUNSHINE}"/>` +
      `<circle cx="220" cy="88" r="16" ${L}/>` +
      `<line x1="52" y1="252" x2="388" y2="252" ${L}/>`,
    440,
    272,
  );
}

/**
 * Empty state: an open box with nothing in it, and a child looking in.
 *
 * An empty state is the one place a product is allowed to be charming, because
 * nothing is wrong and nobody is waiting.
 */
export function sceneEmpty(tone: SceneTone = "ink"): string {
  const s = strokeFor(tone);
  const L = `fill="none" stroke="${s}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"`;

  // A carton seen slightly from above: back rim first, then the open flaps, then
  // the front face over them. Drawn in that order because the flaps have to be
  // occluded by the front wall or the box looks like a flat trapezoid, which is
  // exactly what the first version looked like.
  return wrap(
    `<path d="M96 130 L244 130 L232 150 L108 150 Z" fill="#e8eef7"/>` +
      `<path d="M96 130 L244 130 L232 150 L108 150 Z" ${L}/>` +
      `<path d="M96 130 L64 104 L108 96 L134 128 Z" fill="${SUNSHINE}"/>` +
      `<path d="M96 130 L64 104 L108 96 L134 128 Z" ${L}/>` +
      `<path d="M244 130 L276 104 L232 96 L206 128 Z" fill="${SUNSHINE}"/>` +
      `<path d="M244 130 L276 104 L232 96 L206 128 Z" ${L}/>` +
      `<path d="M108 150 L232 150 L220 218 L120 218 Z" fill="#ffffff"/>` +
      `<path d="M108 150 L232 150 L220 218 L120 218 Z" ${L}/>` +
      `<g stroke="${s}" stroke-width="4" stroke-linecap="round" opacity="0.3">` +
      `<line x1="144" y1="176" x2="196" y2="176"/><line x1="150" y1="194" x2="190" y2="194"/></g>` +
      placeChild(300, 218, 0.62, kid(3, { pose: "stand", facing: "left", outline: s })) +
      `<line x1="52" y1="218" x2="344" y2="218" ${L}/>`,
    380,
    242,
  );
}

/**
 * Nothing found: a child with a magnifying glass.
 *
 * Distinct from `sceneEmpty` on purpose. "You have not added anything yet" and
 * "your search matched nothing" are different feelings and should not share art.
 */
export function sceneSearch(tone: SceneTone = "ink"): string {
  const s = strokeFor(tone);
  const L = `fill="none" stroke="${s}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"`;

  return wrap(
    `<g transform="rotate(-18 130 120)">` +
      `<circle cx="130" cy="120" r="56" fill="#83c2fa" opacity="0.45"/>` +
      `<circle cx="130" cy="120" r="56" fill="none" stroke="${s}" stroke-width="8"/>` +
      `<line x1="168" y1="162" x2="206" y2="200" stroke="${s}" stroke-width="12" stroke-linecap="round"/></g>` +
      placeChild(282, 220, 0.66, kid(0, { pose: "stand", facing: "left", outline: s })) +
      `<g stroke="${SUNSHINE}" stroke-width="4" stroke-linecap="round">` +
      `<line x1="70" y1="48" x2="70" y2="60"/><line x1="64" y1="54" x2="76" y2="54"/></g>` +
      `<line x1="46" y1="220" x2="340" y2="220" ${L}/>`,
    380,
    248,
  );
}

/**
 * A certificate: the scroll, the ribbon, and a star.
 */
export function sceneCertificate(tone: SceneTone = "ink"): string {
  const s = strokeFor(tone);
  const L = `fill="none" stroke="${s}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"`;

  return wrap(
    `<rect x="70" y="56" width="200" height="140" rx="10" fill="#ffffff"/>` +
      `<rect x="70" y="56" width="200" height="140" rx="10" ${L}/>` +
      `<g stroke="${s}" stroke-width="4" stroke-linecap="round" opacity="0.35">` +
      `<line x1="100" y1="92" x2="240" y2="92"/><line x1="100" y1="114" x2="210" y2="114"/>` +
      `<line x1="100" y1="136" x2="228" y2="136"/></g>` +
      `<circle cx="228" cy="176" r="28" fill="${SUNSHINE}"/>` +
      `<circle cx="228" cy="176" r="28" ${L}/>` +
      `<path d="M228 162 L233 173 L245 173 L235 180 L239 192 L228 185 L217 192 L221 180 L211 173 L223 173 Z" fill="${CORAL}"/>` +
      `<path d="M214 200 L206 232 L228 222 L250 232 L242 200" fill="${CORAL}"/>` +
      `<path d="M214 200 L206 232 L228 222 L250 232 L242 200" ${L}/>`,
    340,
    250,
  );
}

/**
 * Timetable: a wall clock beside a week grid.
 *
 * The grid is deliberately only five columns of three rows. A real timetable
 * drawn at icon size turns into a texture, and the point of the drawing is to say
 * "this is when things happen", not to be readable.
 */
export function sceneTimetable(tone: SceneTone = "ink"): string {
  const s = strokeFor(tone);
  const L = `fill="none" stroke="${s}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"`;
  const cells = [0, 1, 2, 3, 4]
    .flatMap((c) =>
      [0, 1, 2].map((r) => {
        const fill = ["#83c2fa", "#4ade80", "#fb7185", "#fbbf24", "#e879f9", "#14b8a6"][(c + r * 2) % 6];
        return `<rect x="${196 + c * 34}" y="${118 + r * 30}" width="26" height="22" rx="6" fill="${fill}"/>`;
      }),
    )
    .join("");

  return wrap(
    `<circle cx="104" cy="150" r="58" fill="#ffffff"/>` +
      `<circle cx="104" cy="150" r="58" ${L}/>` +
      `<line x1="104" y1="150" x2="104" y2="116" ${L}/>` +
      `<line x1="104" y1="150" x2="130" y2="164" ${L}/>` +
      `<circle cx="104" cy="150" r="6" fill="${CORAL}"/>` +
      `<rect x="182" y="92" width="190" height="130" rx="14" fill="#ffffff"/>` +
      `<rect x="182" y="92" width="190" height="130" rx="14" ${L}/>` +
      `<line x1="182" y1="112" x2="372" y2="112" ${L}/>` +
      cells +
      `<circle cx="196" cy="102" r="4" fill="${SUNSHINE}"/>` +
      `<circle cx="210" cy="102" r="4" fill="${SUNSHINE}"/>` +
      `<line x1="52" y1="238" x2="396" y2="238" ${L}/>`,
    420,
    260,
  );
}

/** Homework: a book, a pencil and a tick. */
export function sceneHomework(tone: SceneTone = "ink"): string {
  const s = strokeFor(tone);
  const L = `fill="none" stroke="${s}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"`;

  return wrap(
    `<rect x="96" y="70" width="170" height="150" rx="12" fill="#ffffff"/>` +
      `<rect x="96" y="70" width="170" height="150" rx="12" ${L}/>` +
      `<line x1="124" y1="70" x2="124" y2="220" ${L}/>` +
      `<g stroke="${s}" stroke-width="4" stroke-linecap="round" opacity="0.35">` +
      `<line x1="146" y1="104" x2="240" y2="104"/><line x1="146" y1="130" x2="240" y2="130"/>` +
      `<line x1="146" y1="156" x2="212" y2="156"/></g>` +
      `<g transform="rotate(38 300 150)">` +
      `<rect x="288" y="74" width="24" height="106" rx="9" fill="${SUNSHINE}"/>` +
      `<rect x="288" y="74" width="24" height="106" rx="9" ${L}/>` +
      `<path d="M286 180 L314 180 L306 212 L294 212 Z" fill="${CORAL}"/>` +
      `<path d="M286 180 L314 180 L306 212 L294 212 Z" ${L}/></g>` +
      `<circle cx="150" cy="200" r="26" fill="#4ade80"/>` +
      `<circle cx="150" cy="200" r="26" ${L}/>` +
      `<path d="M138 200 L147 210 L163 190" fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<line x1="52" y1="238" x2="368" y2="238" ${L}/>`,
    400,
    260,
  );
}

/** Attendance: a calendar with ticks, and a child putting their hand up. */
export function sceneAttendance(tone: SceneTone = "ink"): string {
  const s = strokeFor(tone);
  const L = `fill="none" stroke="${s}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"`;
  const marks = [0, 1, 2, 3, 4, 5]
    .map((i) => {
      const x = 118 + (i % 3) * 46;
      const y = 140 + Math.floor(i / 3) * 40;
      const present = i !== 4;
      return present
        ? `<circle cx="${x}" cy="${y}" r="15" fill="#4ade80"/><circle cx="${x}" cy="${y}" r="15" fill="none" stroke="${s}" stroke-width="3.5"/>` +
            `<path d="M${x - 7} ${y} L${x - 1} ${y + 6} L${x + 8} ${y - 6}" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`
        : `<circle cx="${x}" cy="${y}" r="15" fill="#fbbf24"/><circle cx="${x}" cy="${y}" r="15" fill="none" stroke="${s}" stroke-width="3.5"/>`;
    })
    .join("");

  return wrap(
    `<rect x="84" y="78" width="164" height="144" rx="14" fill="#ffffff"/>` +
      `<rect x="84" y="78" width="164" height="144" rx="14" ${L}/>` +
      `<line x1="84" y1="112" x2="248" y2="112" ${L}/>` +
      `<line x1="118" y1="62" x2="118" y2="88" ${L}/>` +
      `<line x1="214" y1="62" x2="214" y2="88" ${L}/>` +
      marks +
      placeChild(318, 230, 0.66, kid(1, { pose: "wave", facing: "left", outline: s })) +
      `<line x1="46" y1="230" x2="376" y2="230" ${L}/>`,
    410,
    252,
  );
}

/** Announcements: a megaphone, with a noticeboard behind it. */
export function sceneAnnounce(tone: SceneTone = "ink"): string {
  const s = strokeFor(tone);
  const L = `fill="none" stroke="${s}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"`;

  return wrap(
    `<rect x="70" y="72" width="160" height="126" rx="12" fill="#ffffff"/>` +
      `<rect x="70" y="72" width="160" height="126" rx="12" ${L}/>` +
      `<g stroke="${s}" stroke-width="4" stroke-linecap="round" opacity="0.3">` +
      `<line x1="94" y1="106" x2="178" y2="106"/><line x1="94" y1="132" x2="204" y2="132"/>` +
      `<line x1="94" y1="158" x2="160" y2="158"/></g>` +
      `<circle cx="206" cy="90" r="7" fill="${CORAL}"/>` +
      `<g transform="rotate(-16 300 140)">` +
      `<path d="M252 124 L300 96 L300 184 L252 156 Z" fill="${SUNSHINE}"/>` +
      `<path d="M252 124 L300 96 L300 184 L252 156 Z" ${L}/>` +
      `<path d="M300 96 C340 100 340 180 300 184 Z" fill="${CORAL}"/>` +
      `<path d="M300 96 C340 100 340 180 300 184 Z" ${L}/>` +
      `<rect x="228" y="124" width="26" height="32" rx="8" fill="#ffffff"/>` +
      `<rect x="228" y="124" width="26" height="32" rx="8" ${L}/></g>` +
      `<g stroke="${SUNSHINE}" stroke-width="5" stroke-linecap="round">` +
      `<line x1="352" y1="96" x2="372" y2="88"/><line x1="356" y1="130" x2="378" y2="130"/>` +
      `<line x1="352" y1="164" x2="372" y2="172"/></g>` +
      `<line x1="42" y1="216" x2="392" y2="216" ${L}/>`,
    420,
    240,
  );
}

/** Fees: a coin jar and a receipt with a tick. */
export function sceneFees(tone: SceneTone = "ink"): string {
  const s = strokeFor(tone);
  const L = `fill="none" stroke="${s}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"`;

  return wrap(
    `<path d="M104 118 L200 118 L192 212 A12 12 0 0 1 180 222 L124 222 A12 12 0 0 1 112 212 Z" fill="#83c2fa" opacity="0.5"/>` +
      `<path d="M104 118 L200 118 L192 212 A12 12 0 0 1 180 222 L124 222 A12 12 0 0 1 112 212 Z" ${L}/>` +
      `<rect x="96" y="102" width="112" height="20" rx="8" fill="#ffffff"/>` +
      `<rect x="96" y="102" width="112" height="20" rx="8" ${L}/>` +
      `<circle cx="140" cy="168" r="20" fill="${SUNSHINE}"/>` +
      `<circle cx="140" cy="168" r="20" ${L}/>` +
      `<circle cx="172" cy="190" r="16" fill="${SUNSHINE}"/>` +
      `<circle cx="172" cy="190" r="16" ${L}/>` +
      `<rect x="240" y="88" width="120" height="134" rx="10" fill="#ffffff"/>` +
      `<rect x="240" y="88" width="120" height="134" rx="10" ${L}/>` +
      `<g stroke="${s}" stroke-width="4" stroke-linecap="round" opacity="0.3">` +
      `<line x1="262" y1="118" x2="338" y2="118"/><line x1="262" y1="142" x2="318" y2="142"/></g>` +
      `<circle cx="300" cy="182" r="24" fill="#4ade80"/>` +
      `<circle cx="300" cy="182" r="24" ${L}/>` +
      `<path d="M289 182 L297 191 L312 173" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<line x1="56" y1="238" x2="382" y2="238" ${L}/>`,
    420,
    260,
  );
}

/** School calendar: a calendar page with a star on one day, and bunting. */
export function sceneCalendar(tone: SceneTone = "ink"): string {
  const s = strokeFor(tone);
  const L = `fill="none" stroke="${s}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"`;
  const flags = [0, 1, 2, 3, 4]
    .map((i) => {
      const x = 74 + i * 62;
      const c = ["#fb7185", "#fbbf24", "#4ade80", "#83c2fa", "#e879f9"][i];
      return `<path d="M${x} 46 L${x + 26} 46 L${x + 13} 74 Z" fill="${c}"/><path d="M${x} 46 L${x + 26} 46 L${x + 13} 74 Z" fill="none" stroke="${s}" stroke-width="3.5"/>`;
    })
    .join("");

  return wrap(
    `<path d="M60 44 Q210 66 380 44" ${L}/>` +
      flags +
      `<rect x="132" y="96" width="176" height="144" rx="14" fill="#ffffff"/>` +
      `<rect x="132" y="96" width="176" height="144" rx="14" ${L}/>` +
      `<line x1="132" y1="132" x2="308" y2="132" ${L}/>` +
      `<line x1="172" y1="80" x2="172" y2="106" ${L}/>` +
      `<line x1="268" y1="80" x2="268" y2="106" ${L}/>` +
      `<g fill="rgba(16,34,74,0.16)">` +
      [0, 1, 2, 3, 4, 5, 6, 7]
        .map((i) => `<rect x="${158 + (i % 4) * 40}" y="${150 + Math.floor(i / 4) * 36}" width="24" height="20" rx="6"/>`)
        .join("") +
      `</g>` +
      `<circle cx="238" cy="204" r="26" fill="${SUNSHINE}"/>` +
      `<circle cx="238" cy="204" r="26" ${L}/>` +
      `<path d="M238 190 L243 201 L255 201 L245 208 L249 220 L238 213 L227 220 L231 208 L221 201 L233 201 Z" fill="${CORAL}"/>` +
      `<line x1="70" y1="256" x2="370" y2="256" ${L}/>`,
    420,
    276,
  );
}

/** Messages: two speech bubbles, a grown-up and a child. */
export function sceneMessages(tone: SceneTone = "ink"): string {
  const s = strokeFor(tone);
  const L = `fill="none" stroke="${s}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"`;

  return wrap(
    `<path d="M70 70 L242 70 A14 14 0 0 1 256 84 L256 150 A14 14 0 0 1 242 164 L124 164 L96 190 L96 164 L70 164 A14 14 0 0 1 56 150 L56 84 A14 14 0 0 1 70 70 Z" fill="#83c2fa"/>` +
      `<path d="M70 70 L242 70 A14 14 0 0 1 256 84 L256 150 A14 14 0 0 1 242 164 L124 164 L96 190 L96 164 L70 164 A14 14 0 0 1 56 150 L56 84 A14 14 0 0 1 70 70 Z" ${L}/>` +
      `<g stroke="#ffffff" stroke-width="6" stroke-linecap="round" opacity="0.85">` +
      `<line x1="86" y1="100" x2="204" y2="100"/><line x1="86" y1="126" x2="166" y2="126"/></g>` +
      `<path d="M300 118 L436 118 A14 14 0 0 1 450 132 L450 190 A14 14 0 0 1 436 204 L380 204 L352 230 L352 204 L300 204 A14 14 0 0 1 286 190 L286 132 A14 14 0 0 1 300 118 Z" fill="#ffffff"/>` +
      `<path d="M300 118 L436 118 A14 14 0 0 1 450 132 L450 190 A14 14 0 0 1 436 204 L380 204 L352 230 L352 204 L300 204 A14 14 0 0 1 286 190 L286 132 A14 14 0 0 1 300 118 Z" ${L}/>` +
      `<g stroke="${s}" stroke-width="5" stroke-linecap="round" opacity="0.35">` +
      `<line x1="310" y1="146" x2="424" y2="146"/><line x1="310" y1="172" x2="384" y2="172"/></g>` +
      `<circle cx="252" cy="212" r="7" fill="${SUNSHINE}"/>`,
    480,
    250,
  );
}

/** Every scene, for the surfaces that pick one by name. */
export const SCENES = {
  schoolDay: sceneSchoolDay,
  timetable: sceneTimetable,
  homework: sceneHomework,
  attendance: sceneAttendance,
  announce: sceneAnnounce,
  fees: sceneFees,
  calendar: sceneCalendar,
  messages: sceneMessages,
  studyDesk: sceneStudyDesk,
  classroom: sceneClassroom,
  celebrate: sceneCelebrate,
  teamwork: sceneTeamwork,
  empty: sceneEmpty,
  search: sceneSearch,
  certificate: sceneCertificate,
} as const;

export type SceneName = keyof typeof SCENES;
