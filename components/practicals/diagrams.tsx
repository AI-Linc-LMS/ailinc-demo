"use client";

import type { ReactNode } from "react";

/**
 * Technical diagrams, drawn as inline SVG.
 *
 * Not photographs and not an illustration library, for three reasons.
 *
 * The demo runs with no network at all, so every image either ships in the repo
 * or does not exist. A part-identification task is nothing but its diagram, so
 * "does not exist" was not available.
 *
 * Hotspots have to line up with the drawing. A stock photograph of a condenser
 * would need its coordinates eyeballed and re-eyeballed every time the asset
 * changed; here the drawing and the hotspot percentages are in the same
 * coordinate space by construction, so a part labelled at 62/38 is on the thing
 * it names.
 *
 * And a schematic teaches better than a photograph at this stage. A learner
 * meeting a refrigeration cycle for the first time needs the four components and
 * the direction of flow, which a photograph of a packed outdoor unit actively
 * hides.
 *
 * Both themes: strokes use `currentColor` and fills use theme tokens, so the
 * drawing is legible on light and dark rather than being a white rectangle in a
 * dark page.
 */

const LABEL = "var(--text-secondary)";

/** Shared frame. 1000x600 user units; hotspot x/y are percentages of it. */
function Frame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg
      viewBox="0 0 1000 600"
      role="img"
      aria-label={label}
      style={{ width: "100%", height: "auto", display: "block", color: "var(--text-primary)" }}
    >
      {children}
    </svg>
  );
}

/* ------------------------------------------------- refrigeration cycle --- */

export function RefrigerationCycleDiagram() {
  return (
    <Frame label="The vapour compression refrigeration cycle">
      {/* indoor / outdoor split, which is the thing learners most often get
          wrong about where each component physically lives */}
      <rect x="40" y="60" width="420" height="480" rx="18" fill="currentColor" opacity="0.04" />
      <rect x="540" y="60" width="420" height="480" rx="18" fill="currentColor" opacity="0.04" />
      <text x="60" y="94" fontSize="22" fontWeight="700" fill={LABEL}>
        INDOOR UNIT
      </text>
      <text x="560" y="94" fontSize="22" fontWeight="700" fill={LABEL}>
        OUTDOOR UNIT
      </text>

      {/* pipe loop */}
      <path
        d="M260 200 H740 V400 H260 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="9"
        strokeLinejoin="round"
        opacity="0.3"
      />

      {/* high side in warm tone, low side cool: the pressure difference IS the
          cycle, so the drawing says it in colour rather than in a caption */}
      <path d="M740 200 V400" fill="none" stroke="#ef4444" strokeWidth="9" opacity="0.75" />
      <path d="M260 400 V200" fill="none" stroke="#0ea5e9" strokeWidth="9" opacity="0.75" />
      <text x="770" y="310" fontSize="19" fontWeight="700" fill="#ef4444">
        high pressure
      </text>
      <text x="90" y="310" fontSize="19" fontWeight="700" fill="#0ea5e9">
        low pressure
      </text>

      {/* flow arrows */}
      {[
        [430, 200, 0],
        [620, 200, 0],
        [740, 300, 90],
        [560, 400, 180],
        [370, 400, 180],
        [260, 300, 270],
      ].map(([x, y, rot], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${rot})`}>
          <path d="M-12 -11 L14 0 L-12 11 Z" fill="currentColor" opacity="0.55" />
        </g>
      ))}

      {/* evaporator, at 26/33 */}
      <g>
        <rect x="190" y="150" width="140" height="100" rx="10" fill="#0ea5e9" opacity="0.18" />
        <rect x="190" y="150" width="140" height="100" rx="10" fill="none" stroke="#0ea5e9" strokeWidth="4" />
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            d={`M${206 + i * 26} 158 v84`}
            stroke="#0ea5e9"
            strokeWidth="5"
            opacity="0.8"
            strokeLinecap="round"
          />
        ))}
      </g>

      {/* compressor, at 74/33 */}
      <g>
        <circle cx="740" cy="200" r="58" fill="#ef4444" opacity="0.16" />
        <circle cx="740" cy="200" r="58" fill="none" stroke="#ef4444" strokeWidth="4" />
        <path
          d="M740 162 a38 38 0 1 1 -27 11"
          fill="none"
          stroke="#ef4444"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path d="M708 178 l6 -18 l16 10 Z" fill="#ef4444" />
      </g>

      {/* condenser, at 74/67 */}
      <g>
        <rect x="670" y="350" width="140" height="100" rx="10" fill="#ef4444" opacity="0.16" />
        <rect x="670" y="350" width="140" height="100" rx="10" fill="none" stroke="#ef4444" strokeWidth="4" />
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            d={`M${686 + i * 26} 358 v84`}
            stroke="#ef4444"
            strokeWidth="5"
            opacity="0.8"
            strokeLinecap="round"
          />
        ))}
      </g>

      {/* expansion device, at 37/67 */}
      <g>
        <path d="M335 400 L395 368 L395 432 Z" fill="#a855f7" opacity="0.2" />
        <path d="M395 400 L335 368 L335 432 Z" fill="#a855f7" opacity="0.2" />
        <path
          d="M335 368 L395 432 M335 432 L395 368 M335 368 L335 432 M395 368 L395 432"
          stroke="#a855f7"
          strokeWidth="4"
          fill="none"
        />
        <path d="M365 340 v22" stroke="#a855f7" strokeWidth="5" strokeLinecap="round" />
        <circle cx="365" cy="333" r="10" fill="none" stroke="#a855f7" strokeWidth="4" />
      </g>

      {/* the fan, drawn because learners name it as a component and it is not
          part of the cycle, which is a distinction worth making visible */}
      <g opacity="0.5">
        <circle cx="880" cy="400" r="42" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="7 7" />
        {[0, 120, 240].map((a) => (
          <path
            key={a}
            d="M880 400 q24 -14 30 -34 q-22 -4 -36 12 Z"
            fill="currentColor"
            opacity="0.4"
            transform={`rotate(${a} 880 400)`}
          />
        ))}
      </g>

      <text x="500" y="560" fontSize="19" fill={LABEL} textAnchor="middle">
        Refrigerant flows clockwise. Click each numbered point to name it.
      </text>
    </Frame>
  );
}

/* ---------------------------------------------------------- AC wiring --- */

export function AcWiringDiagram() {
  return (
    <Frame label="Single phase air conditioner control wiring">
      {/* supply */}
      <text x="50" y="80" fontSize="22" fontWeight="700" fill={LABEL}>
        230V SUPPLY
      </text>
      <path d="M60 120 H200" stroke="#ef4444" strokeWidth="8" strokeLinecap="round" />
      <path d="M60 180 H200" stroke="#1e293b" strokeWidth="8" strokeLinecap="round" />
      <text x="62" y="112" fontSize="17" fill="#ef4444" fontWeight="700">
        L
      </text>
      <text x="62" y="172" fontSize="17" fill={LABEL} fontWeight="700">
        N
      </text>

      {/* isolator, at 24/25 */}
      <g>
        <rect x="200" y="90" width="80" height="120" rx="8" fill="currentColor" opacity="0.06" />
        <rect x="200" y="90" width="80" height="120" rx="8" fill="none" stroke="currentColor" strokeWidth="4" />
        <path d="M218 120 L262 104" stroke="#ef4444" strokeWidth="6" strokeLinecap="round" />
        <circle cx="218" cy="120" r="7" fill="#ef4444" />
        <circle cx="262" cy="120" r="7" fill="#ef4444" />
        <path d="M218 180 H262" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
      </g>

      {/* contactor coil, at 46/25 */}
      <g>
        <rect x="420" y="90" width="110" height="120" rx="8" fill="#0ea5e9" opacity="0.14" />
        <rect x="420" y="90" width="110" height="120" rx="8" fill="none" stroke="#0ea5e9" strokeWidth="4" />
        <path
          d="M440 150 q12 -22 24 0 q12 22 24 0 q12 -22 24 0"
          fill="none"
          stroke="#0ea5e9"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <text x="475" y="128" fontSize="17" fontWeight="700" fill="#0369a1" textAnchor="middle">
          A1 A2
        </text>
      </g>
      <path d="M280 120 H420" stroke="#ef4444" strokeWidth="7" strokeLinecap="round" />
      <path d="M280 180 H420" stroke="#1e293b" strokeWidth="7" strokeLinecap="round" />

      {/* thermostat, at 46/70 */}
      <g>
        <rect x="420" y="380" width="110" height="100" rx="8" fill="#a855f7" opacity="0.15" />
        <rect x="420" y="380" width="110" height="100" rx="8" fill="none" stroke="#a855f7" strokeWidth="4" />
        <circle cx="475" cy="430" r="26" fill="none" stroke="#a855f7" strokeWidth="4" />
        <path d="M475 430 L475 412 M475 430 L491 438" stroke="#a855f7" strokeWidth="5" strokeLinecap="round" />
      </g>
      <path d="M475 210 V380" stroke="#a855f7" strokeWidth="6" strokeDasharray="10 7" />

      {/* capacitor, at 72/55 */}
      <g>
        <rect x="680" y="290" width="90" height="130" rx="10" fill="#f59e0b" opacity="0.16" />
        <rect x="680" y="290" width="90" height="130" rx="10" fill="none" stroke="#f59e0b" strokeWidth="4" />
        <path d="M700 340 H750 M700 372 H750" stroke="#f59e0b" strokeWidth="8" strokeLinecap="round" />
        <path d="M725 290 V340 M725 372 V420" stroke="#f59e0b" strokeWidth="5" />
        <text x="725" y="330" fontSize="16" fontWeight="700" fill="#b45309" textAnchor="middle">
          µF
        </text>
      </g>

      {/* compressor motor, at 88/25 */}
      <g>
        <circle cx="880" cy="150" r="60" fill="#ef4444" opacity="0.14" />
        <circle cx="880" cy="150" r="60" fill="none" stroke="#ef4444" strokeWidth="4" />
        <text x="880" y="160" fontSize="34" fontWeight="700" fill="#ef4444" textAnchor="middle">
          M
        </text>
      </g>
      <path d="M530 120 H880 V90" stroke="#ef4444" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M770 355 H880 V210" stroke="#f59e0b" strokeWidth="6" fill="none" strokeLinecap="round" />

      {/* terminals C R S, which is where the identification actually bites */}
      {[
        ["C", 828, 232],
        ["R", 880, 232],
        ["S", 932, 232],
      ].map(([t, x, y]) => (
        <g key={String(t)}>
          <circle cx={Number(x)} cy={Number(y)} r="15" fill="var(--card-bg)" stroke="currentColor" strokeWidth="3" />
          <text
            x={Number(x)}
            y={Number(y) + 6}
            fontSize="17"
            fontWeight="700"
            fill="currentColor"
            textAnchor="middle"
          >
            {t}
          </text>
        </g>
      ))}

      <text x="500" y="560" fontSize="19" fill={LABEL} textAnchor="middle">
        A single phase split unit, control side. Click each point to name it.
      </text>
    </Frame>
  );
}

/* ------------------------------------------------------ drone exploded --- */

export function DroneExplodedDiagram() {
  return (
    <Frame label="Exploded view of a five inch quadcopter">
      {/* frame arms */}
      <g stroke="currentColor" strokeWidth="26" strokeLinecap="round" opacity="0.22">
        <path d="M330 180 L670 420" />
        <path d="M670 180 L330 420" />
      </g>
      <rect x="440" y="250" width="120" height="100" rx="14" fill="currentColor" opacity="0.3" />

      {/* motors + props at the four arm ends */}
      {[
        [330, 180],
        [670, 180],
        [330, 420],
        [670, 420],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="34" fill="#4338ca" opacity="0.2" />
          <circle cx={x} cy={y} r="34" fill="none" stroke="#4338ca" strokeWidth="4" />
          <circle cx={x} cy={y} r="12" fill="#4338ca" opacity="0.6" />
          {/* propeller, drawn offset above so it reads as a separate part */}
          <g opacity="0.55">
            <ellipse cx={x} cy={y - 62} rx="56" ry="11" fill="#818cf8" />
            <ellipse cx={x} cy={y - 62} rx="11" ry="56" fill="#818cf8" opacity="0.35" />
            <circle cx={x} cy={y - 62} r="8" fill="#4338ca" />
          </g>
          {/* motor number and rotation, which is the thing that gets wired
              wrong and makes a quad flip on the first arm */}
          <text
            x={x}
            y={y + 60}
            fontSize="20"
            fontWeight="700"
            fill="#4338ca"
            textAnchor="middle"
          >
            M{i === 0 ? 3 : i === 1 ? 1 : i === 2 ? 2 : 4}
          </text>
        </g>
      ))}

      {/* ESCs on the arms */}
      {[
        [430, 250],
        [570, 250],
        [430, 350],
        [570, 350],
      ].map(([x, y], i) => (
        <g key={`esc${i}`}>
          <rect x={x - 26} y={y - 14} width="52" height="28" rx="5" fill="#0ea5e9" opacity="0.25" />
          <rect x={x - 26} y={y - 14} width="52" height="28" rx="5" fill="none" stroke="#0ea5e9" strokeWidth="3" />
        </g>
      ))}

      {/* flight controller, at 50/50 */}
      <g>
        <rect x="455" y="275" width="90" height="50" rx="7" fill="#10b981" opacity="0.3" />
        <rect x="455" y="275" width="90" height="50" rx="7" fill="none" stroke="#10b981" strokeWidth="4" />
        {/* the arrow silk screen. Fitting the FC backwards is the single most
            common first-build error, so the arrow is drawn. */}
        <path d="M500 288 L512 306 L488 306 Z" fill="#047857" />
      </g>

      {/* battery, at 50/80 */}
      <g>
        <rect x="420" y="450" width="160" height="70" rx="10" fill="#f59e0b" opacity="0.25" />
        <rect x="420" y="450" width="160" height="70" rx="10" fill="none" stroke="#f59e0b" strokeWidth="4" />
        <text x="500" y="493" fontSize="22" fontWeight="700" fill="#b45309" textAnchor="middle">
          6S LiPo
        </text>
      </g>
      <path d="M500 450 V340" stroke="#f59e0b" strokeWidth="7" strokeDasharray="12 8" />

      {/* receiver, at 25/70 */}
      <g>
        <rect x="200" y="400" width="80" height="36" rx="6" fill="#a855f7" opacity="0.25" />
        <rect x="200" y="400" width="80" height="36" rx="6" fill="none" stroke="#a855f7" strokeWidth="3" />
        <path d="M280 408 q34 -22 60 -8" stroke="#a855f7" strokeWidth="4" fill="none" />
        <path d="M280 428 q34 22 60 8" stroke="#a855f7" strokeWidth="4" fill="none" />
      </g>

      {/* camera, at 75/70 */}
      <g>
        <rect x="720" y="396" width="70" height="52" rx="8" fill="#ec4899" opacity="0.25" />
        <rect x="720" y="396" width="70" height="52" rx="8" fill="none" stroke="#ec4899" strokeWidth="3" />
        <circle cx="755" cy="422" r="17" fill="none" stroke="#ec4899" strokeWidth="4" />
        <circle cx="755" cy="422" r="7" fill="#ec4899" />
      </g>

      <text x="500" y="572" fontSize="19" fill={LABEL} textAnchor="middle">
        Motor order is the Betaflight convention, seen from above.
      </text>
    </Frame>
  );
}

/* --------------------------------------------------------- drone power --- */

export function DronePowerDiagram() {
  return (
    <Frame label="Drone power distribution">
      {/* battery */}
      <g>
        <rect x="60" y="250" width="170" height="110" rx="12" fill="#f59e0b" opacity="0.2" />
        <rect x="60" y="250" width="170" height="110" rx="12" fill="none" stroke="#f59e0b" strokeWidth="4" />
        <text x="145" y="300" fontSize="24" fontWeight="700" fill="#b45309" textAnchor="middle">
          LiPo
        </text>
        <text x="145" y="330" fontSize="19" fill="#b45309" textAnchor="middle">
          22.2V 6S
        </text>
      </g>

      {/* XT60 */}
      <g>
        <rect x="270" y="275" width="70" height="60" rx="8" fill="#ef4444" opacity="0.2" />
        <rect x="270" y="275" width="70" height="60" rx="8" fill="none" stroke="#ef4444" strokeWidth="4" />
        <circle cx="291" cy="305" r="11" fill="#ef4444" opacity="0.7" />
        <circle cx="319" cy="305" r="11" fill="#1e293b" opacity="0.6" />
      </g>
      <path d="M230 290 H270" stroke="#ef4444" strokeWidth="9" strokeLinecap="round" />
      <path d="M230 320 H270" stroke="#1e293b" strokeWidth="9" strokeLinecap="round" />

      {/* PDB, at 48/50 */}
      <g>
        <rect x="420" y="230" width="140" height="150" rx="12" fill="#0ea5e9" opacity="0.18" />
        <rect x="420" y="230" width="140" height="150" rx="12" fill="none" stroke="#0ea5e9" strokeWidth="4" />
        <text x="490" y="295" fontSize="22" fontWeight="700" fill="#0369a1" textAnchor="middle">
          PDB
        </text>
        <text x="490" y="322" fontSize="17" fill="#0369a1" textAnchor="middle">
          + BEC 5V
        </text>
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={445 + i * 24} cy="360" r="7" fill="#0ea5e9" opacity="0.75" />
        ))}
      </g>
      <path d="M340 290 H420" stroke="#ef4444" strokeWidth="9" strokeLinecap="round" />
      <path d="M340 320 H420" stroke="#1e293b" strokeWidth="9" strokeLinecap="round" />

      {/* capacitor across the input, at 40/26: the part beginners leave out and
          then wonder why the gyro drifts */}
      <g>
        <path d="M385 230 V180 H420" stroke="#a855f7" strokeWidth="5" fill="none" />
        <path d="M368 170 H402 M368 192 H402" stroke="#a855f7" strokeWidth="7" strokeLinecap="round" />
        <text x="385" y="152" fontSize="17" fontWeight="700" fill="#7c3aed" textAnchor="middle">
          1000µF
        </text>
      </g>

      {/* four ESCs */}
      {[0, 1, 2, 3].map((i) => {
        const y = 120 + i * 110;
        return (
          <g key={i}>
            <path d={`M560 ${300} C640 ${300} 640 ${y + 25} 700 ${y + 25}`} stroke="#ef4444" strokeWidth="6" fill="none" />
            <rect x="700" y={y} width="110" height="50" rx="7" fill="#0ea5e9" opacity="0.2" />
            <rect x="700" y={y} width="110" height="50" rx="7" fill="none" stroke="#0ea5e9" strokeWidth="3" />
            <text x="755" y={y + 32} fontSize="18" fontWeight="700" fill="#0369a1" textAnchor="middle">
              ESC {i + 1}
            </text>
            <path d={`M810 ${y + 25} H870`} stroke="currentColor" strokeWidth="5" opacity="0.5" />
            <circle cx="900" cy={y + 25} r="26" fill="#4338ca" opacity="0.2" />
            <circle cx="900" cy={y + 25} r="26" fill="none" stroke="#4338ca" strokeWidth="3" />
            <text x="900" y={y + 32} fontSize="17" fontWeight="700" fill="#4338ca" textAnchor="middle">
              M{i + 1}
            </text>
          </g>
        );
      })}

      <text x="500" y="575" fontSize="19" fill={LABEL} textAnchor="middle">
        Power path from pack to motor. Click each point to name it.
      </text>
    </Frame>
  );
}

export const DIAGRAMS: Record<string, () => ReactNode> = {
  "refrigeration-cycle": RefrigerationCycleDiagram,
  "ac-wiring": AcWiringDiagram,
  "drone-exploded": DroneExplodedDiagram,
  "drone-power": DronePowerDiagram,
};
