/**
 * Course 207 curriculum.
 *
 * Authored topic by topic. Until a topic appears here the lesson falls back to
 * the generated scaffold in article-content.ts, which is why this file exists
 * from the moment the course id is registered in index.ts: a missing module is
 * not a degraded lesson, it is a module-not-found that takes the whole app down
 * on the login screen.
 */

import type { CourseCurriculum } from "./types";

const curriculum: CourseCurriculum = {
  /* ===================================================================== */
  5082: {
    topicId: 5082,
    title: "The vapour compression cycle as four readings",
    summary:
      "Four components and one pressure difference. Once you can name what each part does to the refrigerant, diagnosis stops being guesswork.",
    concepts: [
      "Compressor",
      "Condenser",
      "Expansion device",
      "Evaporator",
      "Latent heat",
      "Superheat",
    ],
    glossary: {
      Compressor: "The pump that raises the pressure and temperature of refrigerant vapour and drives the whole cycle.",
      Condenser: "The outdoor coil where high pressure vapour gives up heat and turns back into liquid.",
      "Expansion device": "The restriction that drops the pressure, which is what makes the refrigerant cold.",
      Evaporator: "The indoor coil where low pressure liquid boils and takes heat out of the room.",
      "Latent heat": "The heat absorbed or given up when a substance changes state without changing temperature.",
      Superheat: "How many degrees the vapour is above its boiling point at the pressure it is at.",
    },
    body: {
      Beginner: `<p>An air conditioner does not make cold. It moves heat from inside to outside, and it does that by making a liquid boil indoors and condense outdoors.</p>
<h3>Four parts, in a loop</h3>
<table>
<tr><th>Part</th><th>Where</th><th>What it does</th></tr>
<tr><td>Compressor</td><td>Outdoor</td><td>Squeezes the gas: hot and high pressure</td></tr>
<tr><td>Condenser</td><td>Outdoor</td><td>Lets that heat escape; gas turns to liquid</td></tr>
<tr><td>Expansion device</td><td>Before the indoor coil</td><td>Drops the pressure, which makes it very cold</td></tr>
<tr><td>Evaporator</td><td>Indoor</td><td>Liquid boils, taking heat out of your room</td></tr>
</table>
<div class="key-idea"><span class="callout-label">Why boiling, and not just blowing cold air</span><p>Boiling absorbs an enormous amount of heat. Warming water from 20 to 99 degrees takes far less energy than turning that same water into steam. Air conditioning runs on that effect, which is called latent heat.</p></div>
<h3>What gauges are really asking</h3>
<p>Two questions: is the pressure difference there, and is the refrigerant changing state where it is supposed to. Almost every fault you will meet is one of those two going wrong.</p>`,
      Intermediate: `<p>The cycle has two pressures and two state changes, and everything else is plumbing. The refrigerant is a transport medium, not a consumable, and in a sealed system it is never used up.</p>
<div class="key-idea"><span class="callout-label">Saturation is what makes a gauge reading mean something</span><p>At any given pressure a refrigerant has one temperature at which it changes state. Measure the pressure, read the saturation temperature off the chart, compare it with the actual pipe temperature, and the difference tells you which state the refrigerant is actually in.</p></div>
<h3>Two numbers, two different questions</h3>
<table>
<tr><th>Number</th><th>How</th><th>What it proves</th></tr>
<tr><td>Superheat</td><td>Suction line temp minus saturation temp at suction pressure</td><td>Boiling finished before the refrigerant left the evaporator</td></tr>
<tr><td>Subcooling</td><td>Saturation temp at discharge pressure minus liquid line temp</td><td>Condensing finished before the liquid reached the expansion device</td></tr>
</table>
<div class="warning"><span class="callout-label">Why superheat is about the compressor surviving</span><p>Zero superheat means liquid is reaching a pump designed for vapour, and liquid does not compress. That is the mechanism behind most compressor failures that get blamed on the compressor.</p></div>`,
      Advanced: `<p>Plot the cycle on a pressure-enthalpy diagram and diagnosis becomes geometric. Compression is a near-vertical line right of the saturated vapour curve, condensation is horizontal across the dome, expansion is a vertical drop at constant enthalpy, and evaporation is horizontal back across. Every fault moves one of those lines in a predictable direction.</p>
<h3>The constant-enthalpy expansion is worth dwelling on</h3>
<p>No heat is removed and no work extracted, yet the refrigerant leaves much colder. The temperature drop is paid for by a fraction of the liquid flashing to vapour, and that flash gas does no useful cooling.</p>
<div class="key-idea"><span class="callout-label">Which is why subcooling has commercial value</span><p>More subcooling means less flash gas and more of the evaporator doing work, so capacity rises without any extra compressor effort.</p></div>
<h3>The expansion device changes what the readings mean</h3>
<p>A fixed orifice or capillary has no feedback, so superheat varies with load and ambient and a single reading is only interpretable alongside both. A thermostatic or electronic valve modulates to hold superheat roughly constant, which means a persistently wrong superheat on a valve system points at the valve or its sensing bulb rather than at the charge.</p>
<div class="warning"><span class="callout-label">The common analytical error</span><p>Treating pressure as the diagnosis. Low suction can mean undercharge, a restriction, a dirty filter, low airflow or a failing compressor. Pressure with superheat and subcooling resolves most of that, because the two numbers answer different questions about different parts of the circuit.</p></div>`,
      Expert: `<p>The cycle's deviation from the reversed Carnot ideal is instructive because each deviation is deliberate.</p>
<table>
<tr><th>Deviation</th><th>What it buys</th></tr>
<tr><td>Throttling rather than expanding through a turbine</td><td>A device costing a few rupees that never fails</td></tr>
<tr><td>Superheating before the compressor</td><td>Guaranteed dry compression</td></tr>
<tr><td>Desuperheating in the condenser</td><td>Unavoidable once you compress right of the dome</td></tr>
</table>
<p>Treating these as engineering compromises rather than imperfections is what lets a technician reason about why a manufacturer specified a given superheat target rather than simply obeying it.</p>
<h3>Zeotropic blends need the dome picture amended</h3>
<div class="warning"><span class="callout-label">The most common error moving from R-22 to blends</span><p>Superheat must be computed against the dew point and subcooling against the bubble point. Using the wrong one introduces an error equal to the glide, several kelvin for R-407C, and the symptom is a consistently wrong superheat on a system that is correctly charged.</p></div>
<h3>Inverter equipment inverts the diagnostic logic</h3>
<p>Compressor speed varies to match load, so suction pressure is a controlled variable rather than a symptom, and the familiar fixed-speed heuristics do not transfer. Diagnosis runs through the manufacturer's service mode and its reported sensor values, and a technician applying fixed-speed reasoning to an inverter unit will condemn healthy compressors.</p>
<div class="field"><span class="callout-label">Put a number on subcooling</span><p>Each additional kelvin typically yields on the order of half a per cent additional capacity for no additional compressor work. A condenser fouled enough to lose five kelvin has lost measurable capacity before any pressure reading looks alarming, which is the argument for measuring rather than waiting for a complaint.</p></div>`,
    },
    questions: [
      {
        n: 1,
        question: "What actually makes the refrigerant cold?",
        options: [
          "The pressure drop across the expansion device",
          "The compressor, which cools the gas as it squeezes it",
          "The fan blowing across the indoor coil",
          "The refrigerant being a naturally cold substance",
        ],
        answer: 0,
        explanation:
          "Dropping the pressure lowers the temperature at which the refrigerant boils, so it becomes cold enough to absorb heat from the room. The compressor does the opposite: squeezing a gas makes it hotter, which is why the discharge line is the hottest part of the system.",
        difficulty: "Easy",
        skill: "Expansion device",
      },
      {
        n: 2,
        question: "Zero superheat at the compressor suction is dangerous because:",
        options: [
          "Liquid refrigerant is reaching a pump designed for vapour, and liquid does not compress",
          "The room will be cooled too quickly",
          "The condenser will not be able to reject enough heat",
          "It always means the system is overcharged beyond repair",
        ],
        answer: 0,
        explanation:
          "Superheat exists to guarantee that boiling finished inside the evaporator. At zero superheat liquid is carrying over into the compressor, and because liquid is effectively incompressible it destroys valves and bearings. This mechanism is behind most failures that get blamed on the compressor itself.",
        difficulty: "Medium",
        skill: "Superheat",
      },
      {
        n: 3,
        question: "Air conditioning depends on latent heat because:",
        options: [
          "Changing state absorbs far more heat than changing temperature does",
          "Latent heat is cheaper to produce than sensible heat",
          "Refrigerants cannot change temperature without changing state",
          "It allows the system to run without a compressor",
        ],
        answer: 0,
        explanation:
          "Boiling a liquid absorbs a great deal more energy than warming it does, and the cycle is built to exploit that. It is the reason a relatively small flow of refrigerant can move a large amount of heat out of a room.",
        difficulty: "Medium",
        skill: "Latent heat",
      },
      {
        n: 4,
        question: "A technician reads low suction pressure. On its own this tells them:",
        options: [
          "Very little, because undercharge, a restriction and low airflow all produce it",
          "That the system is definitely undercharged",
          "That the compressor has failed",
          "That the condenser needs cleaning",
        ],
        answer: 0,
        explanation:
          "Pressure alone is ambiguous. Pressure read together with superheat and subcooling resolves most of the ambiguity, because those two numbers answer different questions about different parts of the circuit, which is why both are taken on every call.",
        difficulty: "Hard",
        skill: "Compressor",
      },
      {
        n: 5,
        question: "More subcooling increases capacity because:",
        options: [
          "Less of the liquid flashes to vapour at the expansion device, so more of the evaporator does useful work",
          "It makes the compressor run faster",
          "It raises the suction pressure",
          "It reduces the amount of refrigerant the system needs",
        ],
        answer: 0,
        explanation:
          "Expansion happens at constant enthalpy, and the temperature drop is paid for by some of the liquid flashing to vapour. Flash gas does no cooling, so colder liquid arriving at the valve means less of it flashes and more of the evaporator is available to absorb heat, with no extra compressor work.",
        difficulty: "Hard",
        skill: "Condenser",
      },
      {
        n: 6,
        question: "In a correctly working split system, where does the refrigerant turn from liquid into gas?",
        options: ["In the indoor evaporator coil", "In the outdoor condenser coil", "Inside the compressor", "In the liquid line between the two units"],
        answer: 0,
        explanation:
          "The evaporator is where boiling happens and heat is taken out of the room. The condenser does the reverse, turning gas back into liquid outdoors, and boiling in the liquid line would mean a restriction or a pressure drop that should not be there.",
        difficulty: "Easy",
        skill: "Evaporator",
      },
    ],
    parts: [
      {
        n: 1,
        title: "Name the four components and trace the flow",
        diagram: "refrigeration-cycle",
        brief: `<p>This is a split air conditioner drawn as a circuit. The indoor unit is on the left, the outdoor unit on the right, and the refrigerant flows clockwise.</p>
<p>Name each numbered point. Then put the four components in the order the refrigerant meets them, starting from the compressor.</p>
<p>The label list is longer than the number of points, and the extra names are the parts these are most often confused with. Working by elimination will not get you to the end.</p>`,
        hotspots: [
          {
            key: "evap",
            label: "Evaporator",
            x: 26,
            y: 33,
            does: "The indoor coil. Low pressure liquid boils here and absorbs heat from the room air blown across it.",
            confusedWith:
              "The condenser. Both are finned coils and they look identical. The evaporator is the cold one, indoors, and the pipe leaving it is the large insulated one.",
          },
          {
            key: "comp",
            label: "Compressor",
            x: 74,
            y: 33,
            does: "Raises the pressure and temperature of the vapour and drives the whole circuit. Everything else in the system is passive.",
            confusedWith:
              "The condenser fan motor. Both are motors in the outdoor unit; the compressor is the sealed cylindrical body the pipes run into, not the thing turning the fan.",
          },
          {
            key: "cond",
            label: "Condenser",
            x: 74,
            y: 67,
            does: "The outdoor coil. High pressure vapour gives up its heat to outside air and condenses back into liquid.",
            confusedWith:
              "The evaporator. Trace the pipe from the compressor discharge: the first coil it reaches is always the condenser.",
          },
          {
            key: "txv",
            label: "Expansion device",
            x: 37,
            y: 67,
            does: "The restriction that drops the pressure. This is what makes the refrigerant cold, and it is the only place in the circuit where the pressure falls on purpose.",
            confusedWith:
              "The filter drier, which sits next to it in the liquid line. The drier is a plain cylinder with no sensing bulb or adjustment.",
          },
          {
            key: "fan",
            label: "Condenser fan",
            x: 88,
            y: 67,
            does: "Pulls outside air across the condenser coil. It carries heat away but is not part of the refrigerant circuit at all.",
            confusedWith:
              "The compressor. A unit that hums with the fan turning and no cooling is a very different fault from one where nothing turns.",
          },
        ],
        sequence: [
          {
            key: "comp",
            label: "Compressor",
            why: "Start here because it is the only component that adds energy. Pressure and temperature both rise, and the vapour leaves hot.",
          },
          {
            key: "cond",
            label: "Condenser",
            why: "The hot vapour reaches the outdoor coil next and gives up its heat, condensing to liquid at high pressure.",
          },
          {
            key: "txv",
            label: "Expansion device",
            why: "High pressure liquid is throttled here. The pressure drop is what makes it cold, and some of it flashes to vapour on the way through.",
          },
          {
            key: "evap",
            label: "Evaporator",
            why: "Cold low pressure liquid boils in the indoor coil, absorbing heat from the room, and leaves as vapour to start again.",
          },
        ],
        minutes: 12,
        skills: ["Compressor", "Condenser", "Evaporator", "Expansion device"],
      },
    ],
  },

  /* ===================================================================== */
  5083: {
    topicId: 5083,
    title: "Refrigerants, glide and why R-32 changed the job",
    summary:
      "The gas in the system decides your pressures, your tools, your safety procedure and whether you can top up a leak at all.",
    concepts: ["R-32", "R-410A", "Temperature glide", "GWP", "Flammability class"],
    glossary: {
      "R-32": "A single component refrigerant with no glide, lower GWP than R-410A, and an A2L mildly flammable classification.",
      "R-410A": "A near-azeotropic blend of R-32 and R-125, widely used in split systems, with a high global warming potential.",
      "Temperature glide": "The difference between the bubble point and the dew point of a blend at the same pressure.",
      GWP: "Global warming potential, the warming effect of a gas relative to carbon dioxide over 100 years.",
      "Flammability class": "The safety classification of a refrigerant: A1 non-flammable, A2L mildly flammable, A3 highly flammable.",
      "Bubble point": "The temperature at which a blend starts to boil at a given pressure, used for subcooling.",
    },
    body: {
      Beginner: `<p>Different machines use different gases, and you cannot mix them or swap one for another. The gas decides what pressures are normal, which gauges and hoses you need, and what you are allowed to do in the room.</p>
<table>
<tr><th></th><th>R-410A</th><th>R-32</th></tr>
<tr><td>Status</td><td>The old standard</td><td>Replacing it</td></tr>
<tr><td>Climate impact</td><td>High</td><td>About a third</td></tr>
<tr><td>Flammability</td><td>A1, non-flammable</td><td>A2L, mildly flammable</td></tr>
</table>
<div class="warning"><span class="callout-label">A2L does not mean it explodes</span><p>It means it can burn under the right conditions. So you do not braze near a leak, you ventilate, and you do not use a halide leak detector with an open flame.</p></div>
<h3>The rule that applies on every call</h3>
<div class="key-idea"><span class="callout-label">You cannot just top up</span><p>Find the leak and fix it first. Adding gas to a leaking system is putting money and refrigerant into the atmosphere, and in most places it is illegal.</p></div>`,
      Intermediate: `<p>Refrigerants divide into single component fluids and blends, and the difference shows up in your readings. A single component fluid such as R-32 has one saturation temperature at a given pressure. A zeotropic blend boils and condenses over a range, and that spread is the glide.</p>
<h3>Glide changes how you calculate</h3>
<table>
<tr><th>Measurement</th><th>Read against</th></tr>
<tr><td>Superheat</td><td>Dew point</td></tr>
<tr><td>Subcooling</td><td>Bubble point</td></tr>
</table>
<div class="warning"><span class="callout-label">Using one column for both</span><p>Introduces an error equal to the glide. For R-407C that runs to several kelvin, enough to make a correctly charged system look badly wrong.</p></div>
<h3>Blends must be charged as liquid</h3>
<p>Charge a zeotropic blend as vapour and the more volatile component leaves the cylinder first, so the mixture in the system ends up off its intended composition and its pressures change permanently. The same reasoning means a leaked blend should generally be recovered and replaced rather than topped up.</p>
<div class="field"><span class="callout-label">The direction of travel is settled</span><p>High GWP fluids are being phased down, which is why R-410A at about 2,088 is giving way to R-32 at about 675. The practical consequence is A2L handling becoming routine equipment rather than a specialism.</p></div>`,
      Advanced: `<p>Working with A2L fluids changes the risk assessment rather than the refrigeration. The lower flammability limit is high enough that an ignitable mixture requires a substantial release into a confined volume, which is why the standards express charge limits as a function of room area and installation height rather than as a blanket prohibition.</p>
<div class="key-idea"><span class="callout-label">Knowing it is a concentration question tells you which situations matter</span><p>A small bedroom with a large wall unit and a slow leak. Not an open workshop.</p></div>
<h3>The ignition sources that matter are not the obvious ones</h3>
<p>Brazing is managed by procedure and everyone expects it. A contactor arcing inside an indoor unit's control box during a leak is a credible source nobody plans for, and so is a hot surface above the autoignition temperature. Recovery machines and vacuum pumps rated for A2L exist precisely because an ordinary pump's motor brushes sit inside the gas path.</p>
<h3>The glide correction error is systematic, which makes it dangerous</h3>
<p>Reading superheat against a bubble point rather than a dew point produces a figure consistently low by the glide, which looks like liquid flood-back on a system that is fine. It survives repeated measurement and gets believed.</p>
<div class="warning"><span class="callout-label">Retrofit: a flat answer</span><p>An R-410A system should not be filled with R-32 without the manufacturer's approval despite the similar pressures. The oil may be incompatible, the R-32 discharge temperature runs higher, and the internal electrical components are not rated for a flammable charge. The similar pressures are exactly what makes this a tempting and expensive mistake.</p></div>`,
      Expert: `<p>The phase-down is driven by the Kigali Amendment, under which India's schedule begins its freeze in 2024 with step reductions thereafter. The practical effect on service work is on supply and price long before any prohibition bites, which makes a technician's commercial interest in recovery and leak-tightness a more reliable driver of behaviour than the regulation itself.</p>
<h3>Why R-32 is more efficient, precisely</h3>
<p>Higher volumetric capacity means a given duty needs less swept volume and less charge, around 20 to 30 per cent less in a comparable system. The cost is a higher discharge temperature, which is why R-32 systems are more sensitive to low superheat and to condenser fouling, and why some designs carry discharge temperature protection that R-410A equivalents did not need.</p>
<h3>Fractionation, and why topping up a blend is unsound rather than untidy</h3>
<p>A vapour-space leak preferentially removes the more volatile component, shifting the remaining charge's composition and therefore its pressure-temperature relationship. Near-azeotropic blends such as R-410A fractionate little enough that topping up is tolerated; genuinely zeotropic ones such as R-407C do not, and the result runs at pressures no chart describes.</p>
<div class="field"><span class="callout-label">The charge limit calculation, and its counterintuitive case</span><p>IEC 60335-2-40 makes allowable charge a function of the lower flammability limit, room floor area and the height of the lowest leak point. Installation height appears because these fluids are heavier than air and pool, so a floor-standing unit in a small room is the restrictive case rather than a high wall unit, which is the opposite of most people's intuition.</p></div>`,
    },
    questions: [
      {
        n: 1,
        question: "A system has leaked and is low on refrigerant. The correct response is:",
        options: [
          "Find and repair the leak, then evacuate and charge by weight",
          "Top it up and advise the customer to call again if it drops",
          "Top it up with a slightly larger charge to allow for future leakage",
          "Add leak sealant and recharge",
        ],
        answer: 0,
        explanation:
          "Refrigerant is not consumed, so a low charge means a leak. Topping up vents gas to the atmosphere, is illegal in most jurisdictions, and leaves the customer paying again in a few months. Sealants are also widely prohibited because they contaminate recovery equipment.",
        difficulty: "Easy",
        skill: "R-410A",
      },
      {
        n: 2,
        question: "On a blend with significant glide, superheat must be calculated against:",
        options: ["The dew point", "The bubble point", "The midpoint of the two", "Either, since the difference is negligible"],
        answer: 0,
        explanation:
          "Superheat describes vapour that has finished boiling, so the reference is the dew point. Using the bubble point gives a figure consistently low by the glide, which looks like liquid flood-back on a system that is perfectly healthy, and because the error is systematic it survives repeated measurement.",
        difficulty: "Hard",
        skill: "Temperature glide",
      },
      {
        n: 3,
        question: "R-32 is classified A2L. In practice this means:",
        options: [
          "It is mildly flammable, so ignition sources and ventilation have to be managed",
          "It is highly explosive and cannot be used indoors",
          "It is completely non-flammable like R-410A",
          "It is toxic and requires breathing apparatus",
        ],
        answer: 0,
        explanation:
          "A2L means mildly flammable with a low burning velocity, not explosive. The practical consequences are no brazing near a leak, no open-flame leak detection, ventilation, and A2L-rated recovery equipment, because an ordinary pump's motor brushes sit inside the gas path.",
        difficulty: "Medium",
        skill: "Flammability class",
      },
      {
        n: 4,
        question: "A zeotropic blend must be charged as liquid rather than vapour because:",
        options: [
          "Charging as vapour removes the more volatile component first and shifts the composition",
          "Liquid charging is faster",
          "Vapour charging damages the compressor",
          "The cylinder cannot deliver vapour at a useful rate",
        ],
        answer: 0,
        explanation:
          "A blend's components have different volatilities, so drawing vapour off the cylinder takes them away unevenly and the mixture that ends up in the system is no longer the designed composition. Its pressures then no longer match any chart.",
        difficulty: "Hard",
        skill: "Temperature glide",
      },
      {
        n: 5,
        question: "An R-410A system cannot simply be refilled with R-32 because:",
        options: [
          "The oil, the discharge temperature and the electrical ratings may all be unsuitable",
          "The pressures are completely different",
          "R-32 will not circulate in a system designed for a blend",
          "There is no technical obstacle; it is only a paperwork issue",
        ],
        answer: 0,
        explanation:
          "The pressures are similar, which is precisely what makes this a tempting mistake. R-32 runs a hotter discharge, the lubricant may be incompatible, and the unit's internal electrical components are not rated for a flammable charge.",
        difficulty: "Medium",
        skill: "R-32",
      },
      {
        n: 6,
        question: "R-32 has a GWP of roughly 675 against R-410A's 2,088. The main practical effect on a service technician is:",
        options: [
          "Supply and price pressure on R-410A as the phase-down proceeds",
          "An immediate ban on servicing R-410A equipment",
          "A requirement to retrofit all existing systems",
          "No effect, since GWP is only a manufacturing concern",
        ],
        answer: 0,
        explanation:
          "A phase-down restricts quantities rather than prohibiting service, so the first thing a technician notices is cost and availability. That is also what makes recovery and leak-tightness commercially worthwhile rather than merely compliant.",
        difficulty: "Medium",
        skill: "GWP",
      },
    ],
    decks: [
      {
        n: 1,
        title: "Refrigerants, codes and what each one means on site",
        blurb:
          "The codes you will read off a nameplate and have to act on. Self-rated, because recognising a refrigerant on a label is the real task.",
        mode: "flip",
        cards: [
          { id: 1, front: "R-32", back: "Single component, GWP 675, A2L mildly flammable", extra: { "On site": "No glide. Less charge than R-410A for the same duty. Runs a hotter discharge." }, tags: ["Refrigerants"] },
          { id: 2, front: "R-410A", back: "Near-azeotropic blend, GWP 2,088, A1 non-flammable", extra: { "On site": "Negligible glide, so topping up is tolerated. Being phased down." }, tags: ["Refrigerants"] },
          { id: 3, front: "R-22", back: "HCFC, ozone depleting, phased out for new equipment", extra: { "On site": "Still in older units. Mineral oil, not POE." }, tags: ["Refrigerants"] },
          { id: 4, front: "R-407C", back: "Zeotropic blend with significant glide", extra: { "On site": "Must be charged as liquid. Superheat off the dew point, subcooling off the bubble point." }, tags: ["Refrigerants"] },
          { id: 5, front: "R-290", back: "Propane, GWP 3, A3 highly flammable", extra: { "On site": "Small charge limits. Sparkless tools and proper ventilation." }, tags: ["Refrigerants"] },
          { id: 6, front: "A1", back: "No flame propagation, lower toxicity", extra: { Examples: "R-410A, R-134a" }, tags: ["Safety"] },
          { id: 7, front: "A2L", back: "Mildly flammable, low burning velocity, lower toxicity", extra: { Examples: "R-32, R-454B", "On site": "Ventilate, no open flame, A2L-rated recovery gear" }, tags: ["Safety"] },
          { id: 8, front: "A3", back: "Highly flammable, lower toxicity", extra: { Examples: "R-290 propane, R-600a isobutane" }, tags: ["Safety"] },
          { id: 9, front: "Temperature glide", back: "The spread between bubble point and dew point at one pressure", extra: { "Why it matters": "Superheat off the dew point, subcooling off the bubble point" }, tags: ["Measurement"] },
          { id: 10, front: "Bubble point", back: "Where a blend starts to boil at a given pressure", extra: { "Used for": "Subcooling" }, tags: ["Measurement"] },
          { id: 11, front: "Dew point", back: "Where the last liquid in a blend vaporises at a given pressure", extra: { "Used for": "Superheat" }, tags: ["Measurement"] },
          { id: 12, front: "POE oil", back: "Polyol ester, used with HFCs", extra: { Warning: "Strongly hygroscopic. Do not leave a system open to air." }, tags: ["Oils"] },
          { id: 13, front: "Mineral oil", back: "Used with R-22 and other HCFCs", extra: { Warning: "Not miscible with HFCs. Never mix oil types." }, tags: ["Oils"] },
          { id: 14, front: "GWP", back: "Warming effect relative to carbon dioxide over 100 years", extra: { Scale: "R-410A 2,088 against R-32 at 675" }, tags: ["Regulation"] },
          { id: 15, front: "Fractionation", back: "A blend's composition shifting because one component leaks faster", extra: { Consequence: "Topping up a zeotropic blend leaves pressures no chart describes" }, tags: ["Refrigerants"] },
          { id: 16, front: "Recovery", back: "Removing refrigerant into a cylinder rather than venting it", extra: { Note: "Legally required, and the cylinder must be rated for the fluid" }, tags: ["Practice"] },
        ],
        skills: ["R-32", "R-410A", "Temperature glide", "Flammability class"],
      },
    ],
  },
  /* ===================================================================== */
  5084: {
    topicId: 5084,
    title: "Reading a manifold gauge set correctly",
    summary:
      "Gauges are the only window into a sealed system. Connecting them badly loses charge, reads wrong, and lets air into the one place it must never go.",
    concepts: ["Manifold gauge set", "Schrader valve", "Purging hoses", "Gauge accuracy", "Non-condensables"],
    glossary: {
      "Manifold gauge set": "The two-gauge block with hoses used to read suction and discharge pressure and to charge or recover.",
      "Schrader valve": "The spring-loaded service port valve, opened by the depressor in the hose coupler.",
      "Purging hoses": "Briefly releasing refrigerant through the hoses to expel the air they filled when disconnected.",
      "Non-condensables": "Air and other gases that will not condense, which raise head pressure and destroy efficiency.",
      "Gauge accuracy": "The error band of the instrument, which matters because superheat is a difference of two measured values.",
      "Low loss fitting": "A hose end with a shutoff that stops refrigerant escaping as you disconnect.",
    },
    body: {
      Beginner: `<p>The gauges are how you see inside a sealed system. Blue is the low side and goes on the large suction pipe; red is the high side and goes on the small liquid line. The yellow middle hose goes to your cylinder, your vacuum pump or your recovery machine.</p>
<div class="warning"><span class="callout-label">The step people skip</span><p>When your hoses have been lying in the van they are full of air. Connect and open the valves and you push that air into the system. Air does not condense, so it sits in the condenser raising the pressure and wrecking the cooling, and the only cure is to recover everything and start again.</p></div>
<h3>So: purge</h3>
<p>Connect the hoses, crack the yellow hose at the manifold for a moment to let refrigerant push the air out, then tighten. A second of gas is far cheaper than a contaminated system.</p>
<div class="field"><span class="callout-label">And let it settle</span><p>Read the gauges with the unit running and stable. A system that has been off for ten minutes shows equalised pressures that tell you nothing about how it is working.</p></div>`,
      Intermediate: `<p>A manifold is two gauges, two valves and three hoses, and the valves do only one thing: connect the centre hose to one side or the other. The gauges read whatever the ports read whether the valves are open or shut, which is the point most beginners misunderstand and the reason you never need to open a valve just to take a reading.</p>
<div class="key-idea"><span class="callout-label">Non-condensables are the one contaminant you introduce yourself</span><p>Air trapped in a hose enters when you open to the centre line, and because it never condenses it accumulates at the top of the condenser, reducing the effective surface and raising head pressure. The symptom is high discharge pressure with normal subcooling, and no amount of charge adjustment will fix it.</p></div>
<h3>Accuracy deserves more respect than it gets</h3>
<p>Superheat is a difference between a measured temperature and a saturation temperature derived from a measured pressure, so both instrument errors propagate. An analogue gauge off by half a bar can shift the derived saturation temperature by two or three kelvin, which on a target superheat of eight kelvin is most of the band. That is why digital manifolds have displaced analogue ones for anything diagnostic.</p>
<div class="warning"><span class="callout-label">Every connection costs charge</span><p>A standard coupler releases a small amount on disconnection. On a 1,150 gram system a few grams repeated over several visits becomes a measurable undercharge nobody logged. Low loss fittings exist for exactly this.</p></div>`,
      Advanced: `<p>Hose selection and length change your readings rather than merely your convenience. Pressure drop along a long hose is real during charging and recovery, so a reading taken at the manifold is not the reading at the port, and the error is in the direction that makes a system look worse than it is.</p>
<h3>Thermocouple placement is the variable nobody controls carefully enough</h3>
<p>Superheat requires a pipe temperature, which means a clamp probe in good contact with clean copper and insulated from ambient air. A probe reading partly ambient on a hot roof overstates suction line temperature and therefore overstates superheat, which leads a technician to add charge to a correctly charged system.</p>
<h3>The one clean field test for non-condensables</h3>
<div class="worked"><span class="callout-label">Standing pressure against ambient</span><p>With the system off and fully equalised to ambient, the standing pressure should correspond to the saturation temperature at ambient for that refrigerant. A standing pressure meaningfully above that figure indicates non-condensables. Running the system to see whether head pressure is high is a far worse test, because several other faults produce the same symptom.</p></div>
<div class="warning"><span class="callout-label">Where a familiar routine becomes unsafe</span><p>On A2L systems the recovery machine, vacuum pump and leak detector must all be rated for the fluid, because the motor and switchgear of an unrated machine sit in the gas path. A technician who has always used the same pump will not notice it is now the ignition source.</p></div>`,
      Expert: `<p>Treat the measurement chain as an error budget and the priorities fall out. Superheat is a difference of two quantities, one measured directly and one derived through a saturation relationship from a pressure measurement, so total uncertainty is the quadrature sum of the two.</p>
<div class="key-idea"><span class="callout-label">Which term dominates, and where</span><p>Near the knee of the pressure-temperature curve, the pressure-derived term. That is why transducer accuracy matters more at low suction pressures than most technicians expect, and why an analogue gauge is simply not fit for diagnostic use on modern systems.</p></div>
<h3>Calibration drift defeats careful technique</h3>
<p>A gauge knocked around a van develops an offset, and because the offset is constant it survives repeated measurement and produces consistent, confident, wrong conclusions. A zero check against known ambient conditions at the start of a working day takes a minute and is the only thing standing between a drifted instrument and a condemned compressor.</p>
<h3>The argument that invasive connection is itself the problem</h3>
<p>Every connection risks contamination, costs charge, and on a correctly operating unit tells you less than non-invasive measurement would. Pipe and air temperatures, with an inverter unit's own reported sensor values, answer most diagnostic questions without breaking into the circuit. The professional direction of travel is to connect gauges only once a non-invasive assessment says you need to.</p>
<div class="field"><span class="callout-label">Which reframes the competence being taught</span><p>Not connecting a manifold. Deciding whether to, and then leaving the system exactly as you found it apart from the fault you came to fix. Charge loss, non-condensable ingress and moisture introduction are all technician-caused, and all three are counted among the leading causes of repeat visits.</p></div>`,
    },
    labs: [
      {
        n: 1,
        title: "Connect a manifold and take a full set of readings",
        objective:
          "Connect a gauge set to a running split system without losing charge or admitting air, and record the four readings a diagnosis needs.",
        ppe: [
          "Safety glasses, because a Schrader core can release under pressure into your face",
          "Gloves rated for refrigerant contact, since liquid refrigerant causes frostbite instantly",
          "Closed footwear and no loose sleeves near the condenser fan",
          "The unit's data plate read, so you know the refrigerant before you touch a port",
        ],
        tools: [
          "Digital manifold gauge set",
          "Two clamp thermocouples",
          "Pressure-temperature chart for the refrigerant on the plate",
          "Pipe insulation tape",
          "Leak detector rated for the refrigerant",
        ],
        steps: [
          {
            n: 1,
            title: "Identify the refrigerant before anything else",
            detail:
              "<p>Read the data plate on the outdoor unit. Note the refrigerant type and the factory charge in grams. Everything after this step depends on it: the chart you read, the gauges you are allowed to use, and whether this is an A2L job with ignition-source restrictions.</p><p>If the plate is missing or illegible, stop and find out another way. Guessing the refrigerant is how the wrong chart gets used and a healthy system gets condemned.</p>",
            tools: ["Torch"],
            minutes: 3,
          },
          {
            n: 2,
            title: "Shut both manifold valves",
            detail:
              "<p>Close the blue and the red valve on the manifold body before you connect anything. The gauges read the ports whether the valves are open or shut, so there is never a reason to have them open while you are only taking readings.</p><p>This is also what stops a connection mistake from cross-connecting high side to low side through the centre hose.</p>",
            minutes: 1,
          },
          {
            n: 3,
            title: "Connect blue to suction and red to liquid",
            detail:
              "<p>Blue hose to the large insulated suction line service port, red to the small liquid line port. Hand tighten the couplers onto the Schrader valves; the depressor in the coupler opens the core as it seats.</p><p>Do not force a coupler. A cross-threaded coupler on a service port is a leak you created and will have to repair.</p>",
            hazard: {
              level: "warning",
              text: "Keep your face out of line with the coupler as it seats. A worn Schrader core can release refrigerant sharply as the depressor engages.",
            },
            minutes: 4,
          },
          {
            n: 4,
            title: "Purge the hoses before opening to the system",
            detail:
              "<p>Your hoses were full of air. Crack the centre hose connection at the manifold for about a second, let refrigerant push the air out, then retighten.</p><p>This is the step that gets skipped, and the consequence is the one contaminant you introduce yourself. Air does not condense, so it collects at the top of the condenser, cuts the effective surface and raises head pressure. The cure is to recover the whole charge and start again, which costs an hour and the gas.</p>",
            hazard: {
              level: "danger",
              text: "On an A2L refrigerant such as R-32 this releases a flammable gas. Work outdoors or with forced ventilation, and confirm there is no ignition source within three metres: no brazing, no smoking, no open contactor enclosure.",
            },
            minutes: 2,
          },
          {
            n: 5,
            title: "Fit and insulate the temperature probes",
            detail:
              "<p>Clamp one thermocouple to the suction line close to the service port, on clean bare copper, and one to the liquid line. Insulate both with tape so they read pipe temperature rather than a blend of pipe and ambient.</p><p>An uninsulated probe on a hot roof reads high, which overstates superheat, which leads a technician to add charge to a system that did not need it. This is the single most common measurement error on this procedure.</p>",
            tools: ["Clamp thermocouples", "Insulation tape"],
            minutes: 5,
          },
          {
            n: 6,
            title: "Run the system and let it settle",
            detail:
              "<p>Start the unit in cooling at the lowest setpoint and let it run for at least ten to fifteen minutes. Readings taken before the system stabilises describe a transient and not the fault you were called for.</p><p>While you wait, check that the indoor filter is clean and the outdoor coil is not blocked. Both change your readings, and finding them now saves you misreading the result.</p>",
            minutes: 15,
          },
          {
            n: 7,
            title: "Record the suction pressure",
            detail:
              "<p>Read the low side gauge with the manifold valves still shut and the system running steadily. Record it in bar gauge.</p>",
            reading: {
              label: "Suction pressure",
              unit: "bar",
              min: 7,
              max: 12,
              hint: "Well below this band suggests undercharge, a restriction or low indoor airflow. Well above suggests overcharge or a compressor that is not pumping.",
            },
            minutes: 2,
          },
          {
            n: 8,
            title: "Record the suction line temperature",
            detail:
              "<p>Read the insulated probe on the suction line. Together with the suction pressure this gives you superheat, which is the number that tells you whether boiling finished inside the evaporator.</p>",
            reading: {
              label: "Suction line temperature",
              unit: "°C",
              min: 10,
              max: 25,
              hint: "A suction line close to the saturation temperature means near-zero superheat and liquid heading for the compressor, which is the fault worth stopping for.",
            },
            minutes: 2,
          },
          {
            n: 9,
            title: "Record the liquid line pressure and temperature",
            detail:
              "<p>Read the high side gauge and the liquid line probe. The difference between the saturation temperature at that pressure and the measured liquid temperature is your subcooling.</p>",
            reading: {
              label: "Liquid line temperature",
              unit: "°C",
              min: 32,
              max: 50,
              hint: "A liquid line close to the saturation temperature means little or no subcooling, which usually points at undercharge or at a condenser that cannot reject heat.",
            },
            minutes: 3,
          },
          {
            n: 10,
            title: "Disconnect without losing charge",
            detail:
              "<p>Shut both manifold valves. Disconnect the red hose first, then the blue, using the low loss fittings if your set has them. Refit the port caps: they are the second seal and a missing cap is a slow leak nobody will find for a year.</p><p>Every connection costs a few grams. On a 1,150 gram system that is measurable after a handful of visits, and it is an undercharge nobody logged.</p>",
            capture: { label: "Both service port caps refitted and hand tight", medium: "photo" },
            minutes: 4,
          },
        ],
        skills: ["Manifold gauge set", "Purging hoses", "Non-condensables"],
      },
    ],
    evidence: [
      {
        n: 1,
        title: "Film yourself taking a full set of readings",
        brief: `<p>Find a working split system you have permission to work on: your own, a relative's, your workshop training rig, or a customer's with their written consent. Take a complete set of readings on it and film the parts an assessor cannot infer from a photograph.</p>
<p>You are not being assessed on whether the system is healthy. You are being assessed on whether your technique would leave somebody else's system exactly as you found it.</p>
<p><strong>What an assessor is looking for.</strong> Hoses purged before the valves are opened. Probes in contact with clean copper and insulated. The system allowed to settle. Caps refitted. And on an A2L system, the ventilation and ignition-source check actually done rather than stated.</p>`,
        captures: [
          {
            key: "plate",
            medium: "photo",
            label: "The unit's data plate",
            seconds: undefined,
            mustShow:
              "The refrigerant type and factory charge legible, with your enrolment number written on paper held in the same frame.",
          },
          {
            key: "purge",
            medium: "video",
            label: "Connecting and purging",
            seconds: 90,
            mustShow:
              "One continuous shot, no cuts, from connecting the couplers through purging the centre hose to tightening it. The manifold valves must be visible so the assessor can see their position.",
          },
          {
            key: "probes",
            medium: "photo",
            label: "Both temperature probes fitted",
            mustShow:
              "Both clamp probes on bare copper with insulation tape over them, close enough to read the clamp contact.",
          },
          {
            key: "readings",
            medium: "photo",
            label: "The four readings together",
            mustShow:
              "The manifold display and both probe readings in one frame, with the system running. One frame, because separate photos cannot prove they were taken at the same moment.",
          },
          {
            key: "caps",
            medium: "photo",
            label: "Service ports after disconnection",
            mustShow: "Both port caps refitted, with the hoses visibly disconnected and coiled.",
          },
        ],
        integrity: [
          "My enrolment number is written on paper and visible in the data plate photograph.",
          "The purge clip is one continuous recording with no cuts or edits.",
            "The readings photograph shows the manifold and both probes in a single frame rather than as separate shots.",
          "The system shown is the same one in every capture, and I had permission to work on it.",
        ],
        rubric: [
          {
            key: "purge",
            label: "Hoses purged before opening to the system",
            bands: [
              "Valves opened with unpurged hoses, admitting air to the system",
              "A purge is attempted but after the valves were already opened",
              "Hoses purged correctly before the valves are opened",
              "Purged correctly and the clip shows the valve positions throughout, so the sequence is verifiable rather than asserted",
            ],
            weight: 3,
          },
          {
            key: "probes",
            label: "Temperature measurement would give a usable number",
            bands: [
              "Probes clipped to insulation or to a painted surface, or not insulated",
              "Probes on bare copper but left exposed to ambient air",
              "Probes on clean bare copper and insulated over",
              "Correctly fitted, insulated, and placed close to the service ports so pressure and temperature describe the same point in the circuit",
            ],
            weight: 3,
          },
          {
            key: "safety",
            label: "Safety appropriate to the refrigerant",
            bands: [
              "No eye protection, or an open flame or ignition source present during a release",
              "PPE worn but no check of the surroundings before purging",
              "PPE worn and the area checked before any release",
              "PPE, ventilation and an explicit ignition-source check appropriate to the refrigerant on the plate, visible in the clip",
            ],
            weight: 2,
          },
          {
            key: "leftasfound",
            label: "The system is left as it was found",
            bands: [
              "Caps missing, or visible charge loss on disconnection",
              "Caps refitted but the disconnection was uncontrolled",
              "Controlled disconnection and both caps refitted",
              "Controlled disconnection, caps refitted, and the order of removal shows the high side was taken off first",
            ],
            weight: 2,
          },
        ],
        exemplar: [
          {
            criterion: "Hoses purged before opening to the system",
            band: 3,
            note: "The clip holds the manifold in frame the whole time, so the assessor can see both valves shut while the centre hose is cracked. Nothing is claimed that the video does not show.",
          },
          {
            criterion: "Temperature measurement would give a usable number",
            band: 1,
            note: "Probes are on bare copper, which is right, but neither is insulated. On a roof in afternoon sun the suction probe will read several degrees high, and the superheat computed from it would send you to add charge to a system that does not need any.",
          },
        ],
        minutes: 50,
        skills: ["Manifold gauge set", "Purging hoses", "Gauge accuracy"],
      },
    ],
  },

  /* ===================================================================== */
  5085: {
    topicId: 5085,
    title: "Superheat and subcooling: what each one proves",
    summary:
      "Two numbers, each answering a different question about a different part of the circuit. Together they separate faults that look identical on pressure alone.",
    concepts: ["Superheat", "Subcooling", "Saturation temperature", "Undercharge", "Restriction"],
    glossary: {
      Superheat: "Suction line temperature minus the saturation temperature at suction pressure.",
      Subcooling: "Saturation temperature at liquid line pressure minus the liquid line temperature.",
      "Saturation temperature": "The temperature at which a refrigerant changes state at a given pressure, read from a chart.",
      Undercharge: "Too little refrigerant in the system, which starves the evaporator and empties the condenser.",
      Restriction: "A partial blockage, typically a filter drier or a failing expansion device, which starves the evaporator while the condenser stays full.",
      "Weighed-in charge": "Charging by measured mass to the manufacturer's figure, rather than by pressure.",
    },
    body: {
      Beginner: `<p>Two numbers tell you most of what you need to know about a system. Both are a difference between a temperature you measure with a clamp and a temperature you look up on a chart.</p>
<figure>
<svg viewBox="0 0 1000 560" role="img" aria-label="Where superheat and subcooling are measured on a split system">
<rect x="36" y="70" width="344" height="232" rx="18" fill="currentColor" opacity="0.05"/>
<rect x="620" y="70" width="344" height="232" rx="18" fill="currentColor" opacity="0.05"/>
<text x="56" y="112" font-size="30" font-weight="800" fill="currentColor" opacity="0.6">INDOOR</text>
<text x="640" y="112" font-size="30" font-weight="800" fill="currentColor" opacity="0.6">OUTDOOR</text>
<path d="M62 150 h290 M62 190 h290 M62 230 h290 M62 270 h290" stroke="currentColor" opacity="0.28" stroke-width="12" stroke-linecap="round"/>
<path d="M648 150 h290 M648 190 h290 M648 230 h290 M648 270 h290" stroke="currentColor" opacity="0.28" stroke-width="12" stroke-linecap="round"/>
<path d="M380 160 H620" stroke="#c2410c" stroke-width="16" stroke-linecap="round"/>
<path d="M566 160 l-26 -11 v22 z" fill="#c2410c"/>
<text x="384" y="134" font-size="27" font-weight="800" fill="#c2410c">COLD VAPOUR</text>
<path d="M620 256 H380" stroke="#0369a1" stroke-width="9" stroke-linecap="round"/>
<path d="M432 256 l26 -10 v20 z" fill="#0369a1"/>
<text x="384" y="296" font-size="27" font-weight="800" fill="#0369a1">WARM LIQUID</text>
<circle cx="500" cy="160" r="17" fill="none" stroke="#c2410c" stroke-width="6"/>
<path d="M500 177 L268 346" stroke="#c2410c" stroke-width="3" stroke-dasharray="7 7"/>
<circle cx="500" cy="256" r="17" fill="none" stroke="#0369a1" stroke-width="6"/>
<path d="M500 273 L732 346" stroke="#0369a1" stroke-width="3" stroke-dasharray="7 7"/>
<rect x="36" y="348" width="432" height="188" rx="18" fill="#c2410c" opacity="0.1"/>
<rect x="36" y="348" width="432" height="188" rx="18" fill="none" stroke="#c2410c" stroke-width="3"/>
<text x="62" y="404" font-size="38" font-weight="800" fill="#c2410c">SUPERHEAT</text>
<text x="62" y="446" font-size="27" fill="currentColor" opacity="0.85">pipe temperature minus</text>
<text x="62" y="480" font-size="27" fill="currentColor" opacity="0.85">the boiling point</text>
<text x="62" y="518" font-size="28" font-weight="800" fill="currentColor" opacity="0.6">normally 5 to 10 K</text>
<rect x="532" y="348" width="432" height="188" rx="18" fill="#0369a1" opacity="0.1"/>
<rect x="532" y="348" width="432" height="188" rx="18" fill="none" stroke="#0369a1" stroke-width="3"/>
<text x="558" y="404" font-size="38" font-weight="800" fill="#0369a1">SUBCOOLING</text>
<text x="558" y="446" font-size="27" fill="currentColor" opacity="0.85">condensing point minus</text>
<text x="558" y="480" font-size="27" fill="currentColor" opacity="0.85">the pipe temperature</text>
<text x="558" y="518" font-size="28" font-weight="800" fill="currentColor" opacity="0.6">normally 5 to 8 K</text>
</svg>
<figcaption><strong>Two clamps, two pipes, two different questions.</strong> Superheat is taken on the fat cold pipe leaving the indoor coil and tells you how well that coil is being fed. Subcooling is taken on the thin warm pipe leaving the outdoor coil and tells you whether there is enough liquid in the high side. Clamp to bare copper and give the probe a minute to settle: a probe resting against paint reads the air in the gap.</figcaption>
</figure>
<h3>How to work each one out</h3>
<table>
<tr><th></th><th>Superheat</th><th>Subcooling</th></tr>
<tr><td>Measured on</td><td>The fat cold pipe</td><td>The thin warm pipe</td></tr>
<tr><td>Tells you about</td><td>The indoor coil</td><td>The outdoor coil</td></tr>
<tr><td>Work it out</td><td>Pipe temp minus boiling point</td><td>Condensing point minus pipe temp</td></tr>
<tr><td class="num">Normal</td><td class="num">5 to 10 K</td><td class="num">5 to 8 K</td></tr>
</table>
<div class="key-idea"><span class="callout-label">Read them as a pair, never one on its own</span><p>Both low usually means not enough refrigerant. High superheat with normal or high subcooling usually means something is blocking the flow. The two together separate faults that look identical on pressure alone, and that is the entire reason for taking both.</p></div>
<h3>Getting the reading right</h3>
<p>Clamp the probe to bare copper, not to insulation and not to paint. Strap it on properly and give it a minute to settle. A probe resting against a pipe reads the air in the gap, and four kelvin of error is the difference between a correct diagnosis and a replaced compressor.</p>
<div class="warning"><span class="callout-label">One thing never to do</span><p>Do not add refrigerant because the suction pressure looks low. Two of the four faults on the next page are made worse by it, and none of them is a leak that has been found.</p></div>`,
      Intermediate: `<p>Each number localises a different part of the circuit, which is why taking one without the other wastes the visit. Superheat describes how well the evaporator is being fed. Subcooling describes whether there is enough liquid in the high side. Plotted against each other they separate four faults that are indistinguishable on a gauge set.</p>
<figure>
<svg viewBox="0 0 1000 620" role="img" aria-label="The four combinations of superheat and subcooling and the fault each one indicates">
<rect x="110" y="56" width="435" height="212" fill="#be123c" opacity="0.1"/>
<rect x="545" y="56" width="435" height="212" fill="#b45309" opacity="0.1"/>
<rect x="110" y="268" width="435" height="212" fill="#0369a1" opacity="0.1"/>
<rect x="545" y="268" width="435" height="212" fill="#7c3aed" opacity="0.1"/>
<text x="138" y="112" font-size="36" font-weight="800" fill="#be123c">UNDERCHARGE</text>
<text x="138" y="156" font-size="26" fill="currentColor" opacity="0.85">Both ends starved.</text>
<text x="138" y="190" font-size="26" font-weight="800" fill="currentColor" opacity="0.85">Find the leak first.</text>
<text x="573" y="112" font-size="36" font-weight="800" fill="#b45309">RESTRICTION</text>
<text x="573" y="156" font-size="26" fill="currentColor" opacity="0.85">Drier or valve blocked.</text>
<text x="573" y="190" font-size="26" font-weight="800" fill="currentColor" opacity="0.85">Adding gas makes it worse.</text>
<text x="138" y="384" font-size="36" font-weight="800" fill="#0369a1">FLOODING VALVE</text>
<text x="138" y="428" font-size="26" fill="currentColor" opacity="0.85">Sensing bulb or valve.</text>
<text x="138" y="462" font-size="26" font-weight="800" fill="currentColor" opacity="0.85">Liquid hits the compressor.</text>
<text x="573" y="384" font-size="36" font-weight="800" fill="#7c3aed">OVERCHARGE</text>
<text x="573" y="428" font-size="26" fill="currentColor" opacity="0.85">Condenser backed up.</text>
<text x="573" y="462" font-size="26" font-weight="800" fill="currentColor" opacity="0.85">Recover it, never vent it.</text>
<path d="M545 56 V480 M110 268 H980" stroke="currentColor" opacity="0.35" stroke-width="3"/>
<rect x="110" y="56" width="870" height="424" fill="none" stroke="currentColor" opacity="0.35" stroke-width="3"/>
<rect x="428" y="212" width="234" height="112" rx="14" fill="#0f766e"/>
<text x="545" y="252" font-size="30" font-weight="800" fill="#ffffff" text-anchor="middle">IN SPEC</text>
<text x="545" y="284" font-size="26" font-weight="700" fill="#ffffff" opacity="0.9" text-anchor="middle">SH 5 to 10 K</text>
<text x="545" y="310" font-size="26" font-weight="700" fill="#ffffff" opacity="0.9" text-anchor="middle">SC 5 to 8 K</text>
<text x="96" y="72" font-size="26" font-weight="800" fill="currentColor" opacity="0.55" text-anchor="end">HIGH</text>
<text x="96" y="474" font-size="26" font-weight="800" fill="currentColor" opacity="0.55" text-anchor="end">LOW</text>
<text x="34" y="268" font-size="30" font-weight="800" fill="#c2410c" text-anchor="middle" transform="rotate(-90 34 268)">SUPERHEAT</text>
<text x="110" y="522" font-size="26" font-weight="800" fill="currentColor" opacity="0.55">LOW</text>
<text x="980" y="522" font-size="26" font-weight="800" fill="currentColor" opacity="0.55" text-anchor="end">NORMAL OR HIGH</text>
<text x="545" y="582" font-size="30" font-weight="800" fill="#0369a1" text-anchor="middle">SUBCOOLING</text>
</svg>
<figcaption><strong>The whole diagnosis, on one chart.</strong> Pressure alone cannot separate the top two boxes, and they call for opposite actions: one needs refrigerant after a leak repair, the other needs a component replaced and is damaged by refrigerant. Subcooling is what tells them apart, and it is one clamp on one pipe. In spec is 5 to 10 K of superheat against 5 to 8 K of subcooling.</figcaption>
</figure>
<div class="stat-strip">
<div class="stat"><strong>5 to 10 K</strong><span>Superheat, fixed orifice</span></div>
<div class="stat"><strong>5 to 8 K</strong><span>Subcooling</span></div>
<div class="stat"><strong>8 to 12 K</strong><span>Air split indoors</span></div>
<div class="stat"><strong>&#177;0.5 bar</strong><span>Costs you 2&#8211;3 K</span></div>
</div>
<h3>The row that gets misdiagnosed most expensively</h3>
<p>The restriction. Pressures look like an undercharge, so refrigerant gets added, the condenser backs up further, head pressure climbs and the compressor is loaded harder. The system now has two faults and the second one was yours.</p>
<div class="warning"><span class="callout-label">Thirty seconds of evidence</span><p>Subcooling is the only reading that separates a restriction from an undercharge, and it is one clamp on one pipe. The fact that this fault is still common is a statement about habit rather than about difficulty.</p></div>
<h3>On a fixed orifice system</h3>
<p>Superheat is not controlled, so it swings with indoor load and outdoor ambient. A single figure is only interpretable alongside both, which is why the manufacturer's charging chart is indexed by those two conditions rather than giving you one target to aim at.</p>
<h3>On a valve system the inference turns around</h3>
<table>
<tr><th>System</th><th>Judge charge on</th><th>Because</th></tr>
<tr><td>Fixed orifice</td><td>Superheat, against the chart</td><td>Nothing is controlling it, so it reflects the charge</td></tr>
<tr><td>Thermostatic or electronic valve</td><td>Subcooling</td><td>The valve holds superheat at setpoint whatever the charge</td></tr>
</table>
<div class="key-idea"><span class="callout-label">Which has a practical consequence worth remembering</span><p>A valve holding superheat at setpoint tells you the valve is working and almost nothing about the charge. Chasing superheat on a valve system is chasing the valve's own regulation.</p></div>`,
      Advanced: `<p>The diagnostic power of the pair comes from them being nearly independent measurements of different circuit sections, so their joint distribution separates faults that are degenerate in either alone. Understanding why starts on the pressure&#8211;enthalpy plane, where both quantities are literally the parts of the cycle that leave the saturation dome.</p>
<figure>
<svg viewBox="0 0 1000 640" role="img" aria-label="Pressure enthalpy diagram of the vapour compression cycle with superheat and subcooling marked">
<path d="M330 520 Q 420 200 520 100 Q 660 220 880 520" fill="currentColor" opacity="0.07"/>
<path d="M330 520 Q 420 200 520 100" fill="none" stroke="#0369a1" stroke-width="5"/>
<path d="M520 100 Q 660 220 880 520" fill="none" stroke="#c2410c" stroke-width="5"/>
<circle cx="520" cy="100" r="9" fill="currentColor"/>
<text x="286" y="330" font-size="27" font-weight="800" fill="#0369a1" text-anchor="end">LIQUID</text>
<text x="548" y="372" font-size="26" font-weight="800" fill="currentColor" opacity="0.5" text-anchor="middle">BOILING</text>
<text x="898" y="330" font-size="27" font-weight="800" fill="#c2410c">VAPOUR</text>
<path d="M400 220 H930" stroke="currentColor" stroke-width="6"/>
<path d="M880 440 H400" stroke="currentColor" stroke-width="6"/>
<path d="M880 440 L930 220" stroke="currentColor" stroke-width="6"/>
<path d="M400 220 V440" stroke="currentColor" stroke-width="6" stroke-dasharray="11 8"/>
<path d="M400 220 H476" stroke="#0369a1" stroke-width="14"/>
<path d="M806 440 H880" stroke="#c2410c" stroke-width="14"/>
<path d="M400 196 V170 H476 V196" fill="none" stroke="#0369a1" stroke-width="3"/>
<text x="438" y="152" font-size="28" font-weight="800" fill="#0369a1" text-anchor="middle">SUBCOOLING</text>
<path d="M806 464 V492 H880 V464" fill="none" stroke="#c2410c" stroke-width="3"/>
<text x="843" y="528" font-size="28" font-weight="800" fill="#c2410c" text-anchor="middle">SUPERHEAT</text>
<circle cx="880" cy="440" r="11" fill="#c2410c"/>
<circle cx="930" cy="220" r="11" fill="currentColor"/>
<circle cx="476" cy="220" r="11" fill="#0369a1"/>
<circle cx="400" cy="220" r="11" fill="#0369a1"/>
<circle cx="400" cy="440" r="11" fill="currentColor"/>
<text x="640" y="204" font-size="26" font-weight="800" fill="currentColor" opacity="0.65" text-anchor="middle">CONDENSER</text>
<text x="640" y="424" font-size="26" font-weight="800" fill="currentColor" opacity="0.65" text-anchor="middle">EVAPORATOR</text>
<text x="958" y="330" font-size="26" font-weight="800" fill="currentColor" opacity="0.65" text-anchor="middle" transform="rotate(-78 958 330)">COMPRESSOR</text>
<text x="374" y="330" font-size="26" font-weight="800" fill="currentColor" opacity="0.65" text-anchor="middle" transform="rotate(-90 374 330)">VALVE</text>
<path d="M150 560 H960 M150 560 V80" stroke="currentColor" opacity="0.3" stroke-width="3"/>
<text x="555" y="612" font-size="26" font-weight="800" fill="currentColor" opacity="0.55" text-anchor="middle">HEAT CONTENT PER KILOGRAM</text>
<text x="112" y="330" font-size="26" font-weight="800" fill="currentColor" opacity="0.55" text-anchor="middle" transform="rotate(-90 112 330)">PRESSURE</text>
</svg>
<figcaption><strong>Both numbers are the parts of the cycle that stick out of the dome.</strong> Inside the dome the refrigerant is changing state and its temperature is pinned to its pressure, so a thermometer there is only a worse pressure gauge. Outside it the two move independently, and the gap between what the clamp says and what the gauge implies is the measurement. These are the only two places on the circuit where a temperature carries information a gauge does not already have.</figcaption>
</figure>
<div class="key-idea"><span class="callout-label">The reason a thermometer tells you anything at all</span><p>Inside the dome, temperature and pressure are not independent, so a clamp there is a second, worse pressure gauge. Outside it they are, and the gap between what the thermometer says and what the gauge implies is the measurement. Superheat and subcooling are not arbitrary conventions; they are the only two places on the circuit where a temperature carries information a gauge does not already have.</p></div>
<h3>Where the pair genuinely fails</h3>
<p>A fault moving both in the same direction, such as a severely fouled condenser in high ambient, produces a signature overlapping with overcharge, and it has to be resolved by a third observation.</p>
<figure class="fig-photo">
<img src="https://images.unsplash.com/photo-1698479603408-1a66a6d9e80f?w=1400&amp;q=72&amp;fm=jpg&amp;fit=crop" alt="A rooftop bank of condenser units with fans, casings and refrigerant pipework" loading="lazy"/>
<figcaption><strong>Where subcooling is won and lost.</strong> Every unit on this roof rejects heat into air that the unit beside it has already warmed. Approach temperature, and therefore subcooling, is a property of this installation as much as of the charge in any one machine &#8212; which is why a reading that looks wrong here can be entirely correct for the circumstances.</figcaption>
</figure>
<h3>Adopt approach temperature as that third coordinate</h3>
<p>Condenser approach, the difference between saturated condensing temperature and the air entering the coil, isolates heat rejection capability from the charge question entirely, because it is a function of surface area, airflow and fouling rather than of mass. It converts several ambiguous two-coordinate signatures into unambiguous three-coordinate ones for the cost of one air temperature reading.</p>
<table>
<tr><th>Approach</th><th>Reading</th><th>Means</th></tr>
<tr><td class="num">8 to 14 K</td><td>Normal</td><td>The condenser is rejecting heat as designed</td></tr>
<tr><td class="num">Over 20 K</td><td>Poor rejection</td><td>Fouled coil, failed fan, or recirculating its own discharge</td></tr>
<tr><td class="num">Under 6 K</td><td>Suspiciously good</td><td>Low load, or the compressor is not pumping</td></tr>
</table>
<h3>Why charging by pressure cannot be defended</h3>
<p>Pressure is a function of load and ambient as well as of charge, so the same system reads differently at nine in the morning and at three in the afternoon with nothing wrong. Weighed-in charging to the manufacturer's figure, after a proper evacuation, is the only method that is correct independently of the conditions on the day. Superheat and subcooling then confirm rather than determine.</p>
<div class="warning"><span class="callout-label">The error budget at these magnitudes</span><p>A pressure reading off by half a bar shifts the derived saturation temperature by two to three kelvin. On a five to ten kelvin band that is most of it. An analogue gauge and an uninsulated probe can comfortably generate four kelvin between them, which is why a calibrated digital manifold is not an indulgence on this measurement.</p></div>`,
      Expert: `<p>Formally the pair maps a fault space onto a two-dimensional observation space, and it works because the mapping is close to injective for common single faults. It degrades predictably wherever two faults coexist, because the observation is the superposition and the inverse is no longer unique.</p>
<div class="warning"><span class="callout-label">The canonical trap</span><p>A restricted drier on an undercharged system. The resolution is not a cleverer reading of the pair but an independent measurement, typically the temperature drop across the drier itself, which is a property of that component and of nothing else.</p></div>
<h3>Glide makes the measurement wrong before it is taken</h3>
<p>A zeotropic blend does not evaporate at a single temperature. It begins at the bubble point and finishes at the dew point, and saturated vapour therefore leaves the coil at the higher of the two.</p>
<figure>
<svg viewBox="0 0 1000 580" role="img" aria-label="Temperature profile through an evaporator on a zeotropic blend showing glide and the error from using the bubble point">
<path d="M190 460 H960 M190 460 V60" stroke="currentColor" opacity="0.3" stroke-width="3"/>
<rect x="210" y="300" width="500" height="60" fill="#b45309" opacity="0.14"/>
<path d="M190 360 H960" stroke="#0369a1" stroke-width="3" stroke-dasharray="9 7"/>
<path d="M190 300 H960" stroke="#0f766e" stroke-width="3" stroke-dasharray="9 7"/>
<text x="182" y="370" font-size="26" font-weight="800" fill="#0369a1" text-anchor="end">BUBBLE</text>
<text x="182" y="310" font-size="26" font-weight="800" fill="#0f766e" text-anchor="end">DEW</text>
<path d="M210 360 L710 300 L890 196" fill="none" stroke="#c2410c" stroke-width="8" stroke-linecap="round"/>
<circle cx="210" cy="360" r="10" fill="#0369a1"/>
<circle cx="710" cy="300" r="10" fill="#0f766e"/>
<circle cx="890" cy="196" r="10" fill="#c2410c"/>
<text x="228" y="278" font-size="26" font-weight="800" fill="#b45309">GLIDE &#183; boiling, and warming</text>
<path d="M752 300 V196" stroke="#0f766e" stroke-width="5"/>
<path d="M742 297 h20 M742 199 h20" stroke="#0f766e" stroke-width="5"/>
<text x="776" y="238" font-size="28" font-weight="800" fill="#0f766e">TRUE 6 K</text>
<text x="776" y="270" font-size="26" fill="currentColor" opacity="0.75">from the dew point</text>
<path d="M934 360 V196" stroke="#be123c" stroke-width="5"/>
<path d="M924 357 h20 M924 199 h20" stroke="#be123c" stroke-width="5"/>
<text x="908" y="126" font-size="28" font-weight="800" fill="#be123c" text-anchor="end">READS 13 K</text>
<text x="908" y="158" font-size="26" fill="currentColor" opacity="0.75" text-anchor="end">from the bubble point</text>
<text x="210" y="502" font-size="26" font-weight="800" fill="currentColor" opacity="0.55">COIL INLET</text>
<text x="950" y="502" font-size="26" font-weight="800" fill="currentColor" opacity="0.55" text-anchor="end">SUCTION LINE</text>
<text x="112" y="270" font-size="26" font-weight="800" fill="currentColor" opacity="0.55" text-anchor="middle" transform="rotate(-90 112 270)">TEMPERATURE</text>
</svg>
<figcaption><strong>A blend does not boil at one temperature, and on R-407C that is a seven kelvin trap.</strong> Reading the bubble point column of the chart instead of the dew point column adds the whole glide to every superheat figure you calculate. The system looks starved, refrigerant goes in, and the fault was the column.</figcaption>
</figure>
<p>So superheat referenced to the bubble point reads high by the whole glide on every reading, which on R-407C is around seven kelvin. A technician who has taken the wrong column off the chart sees an apparently starved evaporator across an entire fleet, adds refrigerant to correctly charged systems, and concludes the equipment has a design fault. Subcooling carries the mirror-image error: liquid leaves the condenser at the bubble point, so referencing it to the dew point overstates subcooling by the same amount.</p>
<div class="key-idea"><span class="callout-label">Systematic error is more dangerous than noisy error</span><p>A random error shows up as scatter and invites a second reading. A systematic one is repeatable, and repeatability is what people use as evidence of correctness. The fleet-wide version of this mistake has been published more than once as an equipment problem.</p></div>
<h3>Instrument error, treated properly</h3>
<p>Both quantities are differences of two measurements, so their uncertainties add. A gauge accurate to one per cent of full scale at the top of its range is not accurate to one per cent at the suction pressure of a running split, and a surface probe adds a contact error that is a function of how well somebody strapped it on. Quoting a superheat to one decimal place from an analogue set is reporting precision the measurement does not have, and it drives decisions it cannot support.</p>
<div class="field"><span class="callout-label">The economic case, for the customer conversation</span><p>Field studies consistently find a substantial fraction of installed splits running outside their intended charge band, with capacity and efficiency penalties in the tens of per cent at the extremes. The dominant cause is charge adjustment by pressure on the day. A visit that measures superheat, subcooling and approach, then weighs the charge in, costs perhaps thirty minutes more and removes the mechanism that produced the problem rather than resetting it until next season.</p></div>`,
    },
    worksheets: [
      {
        n: 1,
        title: "Diagnose from the readings, then weigh in the charge",
        difficulty: "Medium",
        brief: `<p>You are on a 1.5 ton R-32 split system. The unit runs but the room is not getting cold. You have taken these readings after fifteen minutes of running.</p>
<table>
<tr><th>Reading</th><th class="num">Value</th></tr>
<tr><td>Suction pressure</td><td class="num">7.8 bar</td></tr>
<tr><td>Suction line temperature</td><td class="num">24 °C</td></tr>
<tr><td>Liquid line pressure</td><td class="num">26.5 bar</td></tr>
<tr><td>Liquid line temperature</td><td class="num">44 °C</td></tr>
</table>
<p><strong>From the supplied R-32 pressure-temperature chart:</strong> at 7.8 bar the saturation temperature is <strong>7 °C</strong>; at 26.5 bar it is <strong>46 °C</strong>.</p>
<p><strong>Part A.</strong> Compute superheat and subcooling, and say what the pair points at.</p>
<p><strong>Part B.</strong> The fault is an undercharge from a repaired leak. You have evacuated the system. The data plate says the factory charge is <strong>1,150 g</strong> for a line set up to <strong>5 m</strong>, with <strong>20 g per additional metre</strong>. This installation has a <strong>9 m</strong> line set. Work out the charge to weigh in.</p>`,
        stubLabel: "Step",
        columns: [
          { key: "temp", label: "Temperature (°C or K)", type: "number", align: "right", flex: 1.3 },
          { key: "grams", label: "Charge (g)", type: "number", align: "right", flex: 1.1 },
          {
            key: "verdict",
            label: "What it indicates",
            type: "select",
            options: ["Normal", "Low", "High", "Undercharge", "Restriction", "Overcharge"],
            flex: 1.4,
          },
        ],
        rows: [
          { key: "satsuc", label: "A1 · Saturation temp at suction pressure", given: { temp: 7 } },
          { key: "suctemp", label: "A2 · Measured suction line temperature", given: { temp: 24 } },
          { key: "superheat", label: "A3 · Superheat (K)" },
          { key: "satliq", label: "A4 · Saturation temp at liquid pressure", given: { temp: 46 } },
          { key: "liqtemp", label: "A5 · Measured liquid line temperature", given: { temp: 44 } },
          { key: "subcool", label: "A6 · Subcooling (K)" },
          { key: "base", label: "B1 · Factory charge for 5 m", given: { grams: 1150 } },
          { key: "extra", label: "B2 · Additional for the extra line length" },
          { key: "total", label: "B3 · Total charge to weigh in", kind: "total" },
        ],
        cells: [
          {
            row: "superheat",
            col: "temp",
            expected: 17,
            marks: 3,
            derivedFrom: { op: "difference", from: ["suctemp:temp", "satsuc:temp"] },
            methodMarks: 2,
            feedback: "24 minus 7 is 17 K of superheat, well above the five to ten you would expect.",
          },
          {
            row: "superheat",
            col: "verdict",
            expected: "High",
            marks: 2,
            feedback:
              "Seventeen kelvin means the refrigerant finished boiling well before the end of the evaporator, so part of the coil is doing no work.",
          },
          {
            row: "subcool",
            col: "temp",
            expected: 2,
            marks: 3,
            derivedFrom: { op: "difference", from: ["satliq:temp", "liqtemp:temp"] },
            methodMarks: 2,
            feedback: "46 minus 44 is 2 K of subcooling, against a normal five to eight.",
          },
          {
            row: "subcool",
            col: "verdict",
            expected: "Low",
            marks: 2,
            feedback: "Two kelvin means the condenser has barely any liquid in it, which is the other half of the undercharge picture.",
          },
          {
            row: "satliq",
            col: "verdict",
            expected: "Undercharge",
            marks: 3,
            feedback:
              "High superheat with LOW subcooling is undercharge. High superheat with normal or high subcooling would be a restriction instead, and that distinction is the whole reason both numbers are taken.",
          },
          {
            row: "extra",
            col: "grams",
            expected: 80,
            marks: 3,
            feedback: "Nine metres less the five covered by the factory charge is four extra metres, at 20 g each.",
          },
          {
            row: "total",
            col: "grams",
            expected: 1230,
            marks: 3,
            derivedFrom: { op: "sum", from: ["base:grams", "extra:grams"] },
            methodMarks: 2,
          },
        ],
        invariants: [
          {
            key: "charge-adds",
            label: "The weighed charge equals base plus line allowance",
            kind: "cell-is-column-sum",
            cols: ["grams"],
            cell: "total:grams",
            marks: 4,
            hint: "The total has to be the factory charge plus the additional allowance and nothing else. If it does not add up, the usual cause is charging for the whole 9 m of line rather than for the 4 m beyond what the factory charge already covers.",
          },
        ],
        hints: [
          "Superheat is the measured suction temperature minus the saturation temperature. Subcooling is the saturation temperature minus the measured liquid temperature. The order is reversed between the two, which is where most arithmetic slips come from.",
          "Compare each against its normal band: five to ten kelvin of superheat, five to eight of subcooling. Then look at the pair rather than at either alone.",
          "For part B, the factory charge already covers the first five metres. You are only paying the allowance on the four metres beyond that, so 4 times 20 is 80 g on top of 1,150.",
        ],
        workedAnswer: `<p><strong>Part A.</strong> Superheat is 24 less 7, which is 17 K. Subcooling is 46 less 44, which is 2 K.</p>
<p>Both are abnormal and the combination is what names the fault. Seventeen kelvin of superheat means the refrigerant boiled off well before the end of the evaporator, so a large part of the indoor coil is passing vapour and doing nothing useful. Two kelvin of subcooling means the condenser holds almost no liquid. There is simply not enough refrigerant in the system: <strong>undercharge</strong>.</p>
<p><strong>Why the second reading matters so much.</strong> If subcooling had come out normal or high with that same 17 K of superheat, the diagnosis would be a <strong>restriction</strong> instead, with the condenser holding liquid that cannot get through to the evaporator. The pressures in the two cases look very similar. A technician who takes only superheat reads a starved evaporator, adds refrigerant, backs the condenser up further, drives head pressure higher and loads the compressor harder. Subcooling takes thirty seconds and is the only thing separating a correct repair from an expensive one.</p>
<p><strong>Part B.</strong> The factory charge of 1,150 g covers a line set up to 5 m. This install has 9 m, so 4 m carry the additional allowance at 20 g each, which is 80 g. Total: <strong>1,230 g</strong>.</p>
<p>The common error is charging 9 times 20 on top of the base, giving 1,330 g, which overcharges the system by 100 g. The factory figure already includes the first five metres.</p>
<p><strong>Why weigh it in rather than charge to a pressure.</strong> Pressure depends on load and on ambient as much as on charge. Charge to a target pressure on a 40 degree afternoon and the same system is overcharged in February. Weighing in to the manufacturer's figure after a proper evacuation is correct independently of the weather, and superheat and subcooling are then used to confirm the result rather than to arrive at it.</p>`,
        minutes: 25,
        skills: ["Superheat", "Subcooling", "Undercharge", "Restriction"],
      },
    ],
    scenarios: [
      {
        n: 1,
        title: "High superheat on a hot afternoon",
        blurb:
          "The pressures say undercharge. You have a cylinder in the van and a customer who wants it fixed now. One more reading decides whether you are about to make it worse.",
        role: "You are the service technician on a residential no-cooling call.",
        start: "a1",
        minutes: 12,
        idealPath: ["a1", "a2", "a3"],
        nodes: [
          {
            id: "a1",
            situation: `<p>A 1.5 ton split, four years old, in a flat on the top floor. Outdoor ambient is 39 degrees. The unit runs, the fan turns, and the air from the indoor unit is barely cool.</p>
<p>You have gauges on. Suction pressure is low and superheat works out at 19 K. The customer has a guest arriving and asks how long it will take.</p>`,
            prompt: "What do you do next?",
            choices: [
              {
                id: "a",
                label: "Take the subcooling before deciding anything",
                outcome:
                  "Liquid line pressure gives a saturation temperature of 51 degrees and the liquid line itself reads 44, so subcooling is 7 K. That is normal. High superheat with NORMAL subcooling is not an undercharge: the condenser has plenty of liquid in it and something is stopping it reaching the evaporator.",
                next: "a2",
                delta: 3,
                cost: { minutes: 5 },
              },
              {
                id: "b",
                label: "Add refrigerant; low suction and high superheat is a textbook undercharge",
                outcome:
                  "You add 200 g. Suction comes up a little, superheat falls to 15 K, and head pressure climbs noticeably. The air is marginally cooler. You have added refrigerant to a system that was not short of it, and the condenser is now backing up.",
                next: "a4",
                delta: -3,
                cost: { minutes: 25, rupees: 900 },
                violation:
                  "Refrigerant was added without taking the one reading that distinguishes undercharge from a restriction.",
              },
              {
                id: "c",
                label: "Check the indoor filter and the outdoor coil first",
                outcome:
                  "Sensible housekeeping and worth doing: the filter is moderately dusty and the outdoor coil has some lint. You clean both. The readings barely move, but you have removed two variables and the system is better off for it.",
                next: "a2",
                delta: 1,
                cost: { minutes: 20 },
              },
              {
                id: "d",
                label: "Tell the customer the compressor is weak and quote a replacement",
                outcome:
                  "A four year old compressor on a system you have taken one diagnostic number from. The quote is for sixty thousand rupees of work on a fault you have not identified, and a weak compressor would show low superheat rather than high.",
                next: "a4",
                delta: -3,
                cost: { minutes: 10 },
                violation: "A major component was condemned on a single reading.",
              },
            ],
          },
          {
            id: "a2",
            situation: `<p>So: superheat 19 K, subcooling 7 K. The evaporator is starved while the condenser is full, which means the refrigerant is being held up somewhere between them.</p>
<p>The liquid line runs from the outdoor unit through a filter drier before the expansion device.</p>`,
            prompt: "How do you confirm it?",
            choices: [
              {
                id: "a",
                label: "Feel along the liquid line for a temperature drop across the drier",
                outcome:
                  "The drier is noticeably cooler on the outlet side, and there is light frost forming at the outlet fitting. A pressure drop across a restriction causes a temperature drop, and a drop big enough to frost in 39 degree ambient is conclusive. The drier is partly blocked.",
                next: "a3",
                delta: 3,
                cost: { minutes: 10 },
              },
              {
                id: "b",
                label: "Recover the charge and weigh it to see how much is in there",
                outcome:
                  "It would answer the charge question definitively and it costs an hour plus the recovery. Given that subcooling already told you the charge is adequate, this is a thorough route to a conclusion you have.",
                next: "a3",
                delta: 0,
                cost: { minutes: 60 },
              },
              {
                id: "c",
                label: "Replace the expansion device, since it controls flow to the evaporator",
                outcome:
                  "A reasonable candidate and you have not eliminated the cheaper one sitting directly upstream of it. Changing the more expensive part first, without checking the drier, is parts-cannon diagnosis.",
                next: "a3",
                delta: -1,
                cost: { minutes: 90, rupees: 3200 },
              },
            ],
          },
          {
            id: "a3",
            situation: `<p>You recover the charge, change the filter drier, pull a vacuum, and weigh in 1,230 g to the plate figure plus the line allowance. Superheat settles at 8 K and subcooling at 6 K. The room is cold in twenty minutes.</p>
<p>You tell the customer the drier had partly blocked, which usually means moisture or debris in the system, and that it is worth a follow-up in a month to confirm nothing else is shedding.</p>`,
            prompt: "",
            ending: {
              verdict: "ideal",
              title: "The second reading changed the repair",
              debrief: `<p>Everything turned on thirty seconds of work. Superheat alone said starved evaporator, which on a hot afternoon with a cylinder in the van reads as undercharge to most technicians. Subcooling said the condenser was full. Those two facts together can only mean the refrigerant is being held up between them, and that is a restriction rather than a shortage.</p>
<p>The route that adds gas is the expensive mistake and it is the one most often taken. Adding refrigerant to a restricted system backs the condenser up further, drives head pressure higher and loads the compressor harder, so the customer pays for gas, pays again when it is recovered, and has had their compressor worked hard for nothing. The pressures looked like an undercharge because a restriction starves the evaporator in exactly the same way.</p>
<p>Note also the cheap confirmation. A temperature drop across the drier, felt by hand and confirmed by frost at the outlet, costs nothing and points at a part worth a few hundred rupees. Replacing the expansion valve first would have been defensible reasoning and would have cost ten times as much, with the blocked drier still upstream of the new valve.</p>
<p>The charge went back in by weight rather than by pressure, which is the only method that is correct independently of a 39 degree afternoon. Charging to a target pressure in this ambient produces a system that is overcharged in winter, and the customer calls back in November with a different complaint about the same work.</p>`,
            },
          },
          {
            id: "a4",
            situation: `<p>The system is running with more refrigerant than it should have, or the customer is holding a quote for a compressor that was never the problem. The underlying restriction is untouched.</p>`,
            prompt: "",
            ending: {
              verdict: "poor",
              title: "The fault was named before it was measured",
              debrief: `<p>Both routes here reach a conclusion from a single observation. Low suction with high superheat is consistent with undercharge, and it is equally consistent with a restriction, with low indoor airflow and with a failing expansion device. One reading cannot separate four possibilities, and the reading that does separate them was thirty seconds away.</p>
<p>Adding refrigerant is the actively harmful option rather than merely the unhelpful one. On a restricted system the extra charge has nowhere to go, so it backs up in the condenser, head pressure rises and the compressor runs hotter and harder than it was designed to. The customer pays for gas now, pays for its recovery later, and has had their compressor loaded for no benefit. The symptom even improves slightly, which is what makes the error self-confirming.</p>
<p>Condemning the compressor is the other direction of the same mistake. A weak compressor that is not pumping properly shows LOW superheat, not high, because it cannot pull the vapour away from the evaporator. The reading you had actively pointed away from the part you quoted for.</p>
<p>The discipline is simple and it is the whole topic: superheat and subcooling describe different sections of the circuit, they are nearly independent, and taking both is what makes the common faults distinguishable. Taking one and reasoning hard about it is not a substitute for taking the other.</p>`,
            },
          },
        ],
        skills: ["Superheat", "Subcooling", "Restriction", "Undercharge"],
      },
    ],
  },
  /* ===================================================================== */
  5086: {
    topicId: 5086,
    title: "Isolation, lock-out tag-out and proving dead",
    summary:
      "The half of this trade that can kill you. Isolating is not the same as switching off, and testing is not the same as proving.",
    concepts: ["Isolation", "Lock-out tag-out", "Proving dead", "Proving unit", "Stored charge"],
    glossary: {
      Isolation: "Physically disconnecting the supply at a point that can be secured, not merely switching the unit off.",
      "Lock-out tag-out": "Applying your own lock and a tag naming you, so nobody can restore the supply while you are working.",
      "Proving dead": "Testing for voltage with an instrument you have proved works immediately before and immediately after.",
      "Proving unit": "A device producing a known voltage, used to confirm a tester is working.",
      "Stored charge": "Energy held in a capacitor after isolation, which can deliver a severe shock long after the supply is off.",
      "Live working": "Working on equipment that has not been isolated, which requires a specific justification and is almost never acceptable.",
    },
    body: {
      Beginner: `<p>Turning the air conditioner off at the remote does nothing to the wiring. The unit is still connected to 230 volts.</p>
<h3>Isolate, then lock</h3>
<p>Find the breaker or isolator that feeds this unit, switch it off, and lock it with your own lock and a tag with your name. This is not bureaucracy. People restore breakers because they do not know somebody is working, and a lock is the only thing that physically stops them.</p>
<h3>Then prove it is dead, in three steps</h3>
<table>
<tr><th>Step</th><th>Why</th></tr>
<tr><td>Test your tester on a known source</td><td>Confirms it works</td></tr>
<tr><td>Test the circuit you are about to touch</td><td>The actual question</td></tr>
<tr><td>Test your tester again</td><td>It could have failed in between</td></tr>
</table>
<div class="warning"><span class="callout-label">Why the third step exists</span><p>A tester that failed silently reads zero volts on a live circuit, which looks exactly like a safely isolated one. Skipping it is the exact way people die believing they checked.</p></div>
<div class="warning"><span class="callout-label">And one specific to this trade</span><p>A capacitor holds a charge after the power is off. It can throw you across a room. Discharge it through a resistor before you touch its terminals.</p></div>`,
      Intermediate: `<p>Isolation means creating a secure point of disconnection, and switching off is not isolation because a switch can be operated by somebody else. Isolate at a point that can be locked, lock it with a personal lock, tag it with your name and the time, and keep the only key on your person.</p>
<div class="key-idea"><span class="callout-label">Proving dead establishes a state at an instant; work happens over an interval</span><p>Everything between those two facts is managed by the lock. That is why a proving-dead test without securing the isolation is close to worthless, and why the test is repeated after any break in the work.</p></div>
<h3>Use the right instrument</h3>
<p>A two-pole tester rather than a non-contact pen. Non-contact detectors respond to field rather than to potential: they can read nothing on a live conductor inside a steel enclosure, or something on a dead one lying beside a live cable.</p>
<h3>Stored charge is the refrigeration-specific hazard</h3>
<p>A run capacitor can hold a dangerous charge for several minutes after isolation, and a start capacitor more.</p>
<div class="warning"><span class="callout-label">Not with a screwdriver</span><p>Discharge through a suitable resistor. Shorting the terminals with a blade welds the tip, pits the terminals and sprays metal.</p></div>`,
      Advanced: `<p>The regulatory architecture runs through the Electricity Act and the CEA safety regulations, with the Factories Act applying on industrial premises, and the practical consequence is that live working requires a specific justification rather than being a matter of convenience.</p>
<div class="key-idea"><span class="callout-label">What survives scrutiny</span><p>It must be unreasonable in all the circumstances for the conductor to be dead, with suitable precautions in place. Fault finding that genuinely requires measurement under load can qualify. Replacing a contactor never does.</p></div>
<h3>Multi-source isolation catches experienced technicians</h3>
<p>A split system can have a separate supply to the indoor unit, an interlock from a building management system, or a backfeed through a control circuit from another panel. Isolating the outdoor breaker and finding the outdoor unit dead proves nothing about what is live inside the indoor enclosure, which is why the proving-dead test is performed at the point of work rather than at the point of isolation.</p>
<h3>Inverter equipment adds a hazard pre-inverter training does not cover</h3>
<p>The DC bus capacitors hold several hundred volts and take minutes to bleed down, and some designs retain charge far longer if the bleed resistor has failed, which is not externally visible. The manufacturer's wait time is a minimum rather than a substitute for measuring the bus directly.</p>
<div class="field"><span class="callout-label">The tag is evidence, not decoration</span><p>Investigations turn on who isolated what and when. A tag with a name and a time, photographed before work starts, is the record that protects the person who did the right thing. Treating it as paperwork is why it gets skipped.</p></div>`,
      Expert: `<p>The control hierarchy runs elimination, substitution, engineering controls, administrative controls, PPE. Lock-out tag-out sits across the last two in a way that matters: the lock is an engineering control because it physically prevents re-energisation; the tag is administrative because it relies on somebody reading and obeying it.</p>
<div class="warning"><span class="callout-label">Which has a practical consequence</span><p>Where an isolator cannot accept a lock and only a tag is applied, the protection has degraded by a whole tier. The correct response is a different isolation point, not a more emphatic tag.</p></div>
<h3>Capacitor energy, as a number</h3>
<p>A 45 microfarad run capacitor at 440 volts stores roughly four joules, around the threshold at which a discharge across the chest becomes capable of inducing fibrillation, and well above the threshold for a startle response causing a secondary injury from a fall or a cut. Most capacitor incidents are injuries from the reaction rather than from the current, which is the argument for discharging rather than for being careful.</p>
<h3>Detector against indicator is not pedantry</h3>
<p>A device with an internal test facility proving its own continuity before and after measurement, typically a two-pole tester to GS38-style guidance on probe design and shrouding, is engineered for proving dead. A multimeter is not: a blown fuse or a selector in the wrong position reads zero volts indistinguishably from an isolated conductor, and a multimeter set to resistance on a live circuit has killed people.</p>
<div class="key-idea"><span class="callout-label">Using the right instrument is a control, not a preference</span></div>`,
    },
    labs: [
      {
        n: 1,
        title: "Isolate, lock, prove dead and discharge",
        objective:
          "Take a split system from running to safe to work on, with evidence at each step that the state was established rather than assumed.",
        ppe: [
          "Insulated gloves rated for the voltage, inspected for damage before use",
          "Safety glasses, because a discharging capacitor can throw molten metal",
          "Non-conductive footwear, and no metal watch, ring or wrist strap",
          "A two-pole voltage tester and a proving unit, both checked as undamaged",
        ],
        tools: [
          "Personal padlock and hasp",
          "Lock-out tags with your name",
          "Two-pole voltage tester to a recognised probe standard",
          "Proving unit",
          "Insulated screwdriver set",
          "Capacitor discharge resistor, around 20 kilohm 5 watt",
        ],
        steps: [
          {
            n: 1,
            title: "Find every source of supply, not just the obvious one",
            detail:
              "<p>Trace the supply to this unit. Note the breaker that feeds the outdoor unit, and check whether the indoor unit is fed separately or from the outdoor terminal block. Look for any building management interlock or a second supply to a control panel.</p><p>Isolating the outdoor breaker and finding the outdoor unit dead proves nothing at all about the indoor enclosure. Multi-source equipment is how experienced technicians get caught.</p>",
            minutes: 6,
          },
          {
            n: 2,
            title: "Switch off at the isolator and open it",
            detail:
              "<p>Operate the isolator or breaker that feeds the unit and confirm it is in the off position. Where a rotary isolator is fitted at the outdoor unit, use that as well as the distribution board breaker.</p><p>Switching off is not isolation. It is the first of several steps and on its own it protects nobody, because anybody can switch it back on.</p>",
            minutes: 2,
          },
          {
            n: 3,
            title: "Lock it and tag it in your own name",
            detail:
              "<p>Fit your padlock. Attach a tag carrying your name, your phone number and the time you isolated. Keep the key on your person: not in the van, not on a hook, not with a colleague.</p><p>If anybody else is working on this equipment, each person fits their own lock through a hasp so the supply cannot be restored until the last lock comes off.</p>",
            hazard: {
              level: "danger",
              text: "Do not proceed past this step without a lock physically fitted. A tag alone relies on somebody reading and obeying it, which is a whole tier of protection lower than a lock that makes re-energisation impossible.",
            },
            capture: { label: "Your lock and tag fitted, with the name and time legible", medium: "photo" },
            minutes: 4,
          },
          {
            n: 4,
            title: "Prove your tester on a known source",
            detail:
              "<p>Test your two-pole tester on the proving unit, or on a circuit you know is live. Confirm it indicates clearly.</p><p>This is the first leg of the three-step sequence. A tester that has failed reads zero volts on a live circuit, which looks exactly like a safely isolated one.</p>",
            minutes: 2,
          },
          {
            n: 5,
            title: "Test for voltage at the point of work",
            detail:
              "<p>Open the enclosure you are going to work in and test every conductor against every other and against earth. Line to neutral, line to earth, neutral to earth.</p><p>Test at the point of work, not at the isolator. The question you are answering is whether the thing your hands will touch is dead.</p>",
            hazard: {
              level: "danger",
              text: "Treat every conductor as live until this test says otherwise. If the tester indicates anything at all, stop, close up and find the second supply before going any further.",
            },
            reading: {
              label: "Highest voltage found at the point of work",
              unit: "V",
              min: 0,
              max: 2,
              hint: "Anything above a couple of volts means the circuit is not dead and there is a source you have not isolated. Close up and go back to step one.",
            },
            minutes: 5,
          },
          {
            n: 6,
            title: "Prove your tester again",
            detail:
              "<p>Return to the proving unit and confirm the tester still indicates. This closes the sequence.</p><p>The final step exists because a tester can fail between proving it and using it. Without this leg, a zero reading is only evidence that the tester was working several minutes ago.</p>",
            minutes: 2,
          },
          {
            n: 7,
            title: "Discharge the capacitor before touching its terminals",
            detail:
              "<p>Place the discharge resistor across the capacitor terminals and hold it for several seconds, then confirm with your tester that the terminals read near zero.</p><p>A 45 microfarad run capacitor at 440 volts holds around four joules. That is enough to cause fibrillation across the chest, and more than enough to cause the startle reaction that produces the fall or the cut that actually injures most people.</p>",
            hazard: {
              level: "danger",
              text: "Never short a capacitor with a screwdriver blade. It welds the tip, pits the terminals, sprays molten metal toward your face and tells you nothing about whether the charge is fully gone.",
            },
            reading: {
              label: "Capacitor terminal voltage after discharge",
              unit: "V",
              min: 0,
              max: 5,
              hint: "A reading that stays up after discharging suggests the capacitor is holding charge or recovering, which can happen with a damaged dielectric. Discharge again and retest before touching it.",
            },
            tools: ["Discharge resistor", "Two-pole tester"],
            minutes: 4,
          },
          {
            n: 8,
            title: "Record the state before you start work",
            detail:
              "<p>Photograph the locked isolator with the tag legible, and note the time in your job record. The circuit is now proved dead and secured, and work can begin.</p><p>Investigations into electrical incidents turn on who isolated what and when. A dated photograph of your own lock and tag is the record that protects the person who did the right thing, which is why it is worth four seconds.</p>",
            capture: { label: "The isolated and tagged supply, time visible", medium: "photo" },
            minutes: 2,
          },
        ],
        skills: ["Isolation", "Lock-out tag-out", "Proving dead", "Stored charge"],
      },
    ],
    evidence: [
      {
        n: 1,
        title: "Prove dead, on camera, in the right order",
        brief: `<p>Film yourself performing the three-step proving-dead sequence and discharging a capacitor, on a system you have permission to work on or on a training rig.</p>
<p>The order is the assessment. Prove the tester, test the circuit, prove the tester again. An assessor cannot tell from a photograph whether you proved your tester afterwards, which is exactly why this one is a continuous video.</p>
<p><strong>If you do not have access to a live rig</strong>, a de-energised training board with a proving unit is acceptable, but say so in your note. Claiming a live test you did not do is the one thing that fails this outright.</p>`,
        captures: [
          {
            key: "lock",
            medium: "photo",
            label: "Your lock and tag on the isolator",
            mustShow:
              "The padlock physically fitted and a tag carrying your name and the time, both legible in the frame.",
          },
          {
            key: "sequence",
            medium: "video",
            label: "The full proving-dead sequence",
            seconds: 120,
            mustShow:
              "One continuous shot, no cuts, covering prove the tester, test every conductor at the point of work, prove the tester again. The tester display must be readable at each step.",
          },
          {
            key: "discharge",
            medium: "video",
            label: "Discharging the capacitor",
            seconds: 45,
            mustShow:
              "The resistor placed across the terminals, held, then a tester reading on the same terminals showing near zero. Both in one shot.",
          },
          {
            key: "ppe",
            medium: "photo",
            label: "Your PPE and instruments",
            mustShow:
              "Gloves, glasses, the two-pole tester and the proving unit laid out, with your enrolment number on paper in the frame.",
          },
        ],
        integrity: [
          "My enrolment number is on paper and visible in the PPE photograph.",
          "The proving sequence is one unbroken recording. I understand that an edit at any point fails this criterion, because the order is the thing being assessed.",
          "The capacitor shown being discharged is the one in the system I isolated, not a loose component.",
          "If the board was not live, I have said so explicitly in my note rather than implying a live test.",
        ],
        rubric: [
          {
            key: "order",
            label: "The three-step sequence is complete and in order",
            bands: [
              "The tester is not proved, or is proved only once",
              "Proved before but not after, so a mid-test failure would go unnoticed",
              "Proved before and after, with the circuit tested in between",
              "The full sequence plus every conductor combination tested, line to neutral, line to earth and neutral to earth",
            ],
            weight: 3,
          },
          {
            key: "isolation",
            label: "Isolation is secured rather than asserted",
            bands: [
              "Switched off only, with no lock fitted",
              "A tag fitted but no lock, so re-energisation is still physically possible",
              "A personal lock and a named tag, with the key retained",
              "Locked and tagged, and the video shows the test performed at the point of work rather than at the isolator",
            ],
            weight: 3,
          },
          {
            key: "capacitor",
            label: "The capacitor is discharged safely and verified",
            bands: [
              "Shorted with a screwdriver, or not discharged at all",
              "Discharged with a resistor but never verified afterwards",
              "Discharged through a resistor and verified with the tester",
              "Discharged, verified, and the technique keeps the body and face clear of the terminals throughout",
            ],
            weight: 2,
          },
          {
            key: "honesty",
            label: "The submission describes what actually happened",
            bands: [
              "The clip implies a live test that plainly did not occur",
              "Ambiguous about whether the board was energised",
              "States clearly what was live and what was not",
              "States it clearly and identifies which parts of the procedure the available rig could not demonstrate",
            ],
            weight: 2,
          },
        ],
        exemplar: [
          {
            criterion: "The three-step sequence is complete and in order",
            band: 3,
            note: "All three legs in one shot, with the tester display readable, and every conductor combination tested rather than only line to neutral. The assessor can see the order rather than take it on trust.",
          },
          {
            criterion: "Isolation is secured rather than asserted",
            band: 0,
            note: "The breaker is off and photographed, and there is no lock on it. The learner has demonstrated the state at an instant without securing it over the interval of the work, which is the single most important thing this procedure exists to do.",
          },
        ],
        minutes: 40,
        skills: ["Proving dead", "Lock-out tag-out", "Stored charge"],
      },
    ],
  },

  /* ===================================================================== */
  5087: {
    topicId: 5087,
    title: "Capacitors, contactors and the run winding",
    summary:
      "Most no-cooling calls are electrical, and most of those are one of three components. Learn to tell them apart and to test rather than swap.",
    concepts: ["Run capacitor", "Contactor", "Start winding", "Common terminal", "Winding resistance"],
    glossary: {
      "Run capacitor": "A capacitor permanently in circuit with the start winding, shifting its phase so a single phase motor produces torque.",
      Contactor: "An electrically operated switch whose coil is driven by the control circuit and whose contacts carry the motor load.",
      "Start winding": "The auxiliary motor winding, higher resistance than the run winding, fed through the capacitor.",
      "Common terminal": "The motor terminal shared by both windings, identifiable because it reads the sum of the other two.",
      "Winding resistance": "The measured ohms across a motor winding, used to identify terminals and find an open or shorted winding.",
      Microfarad: "The unit of capacitance. A capacitor measuring well below its marked value has failed even if it looks intact.",
    },
    body: {
      Beginner: `<p>When a unit hums but does not start, or the fan runs and the compressor does not, the fault is usually one of three parts.</p>
<table>
<tr><th>Part</th><th>What it does</th><th>How it fails</th></tr>
<tr><td>Capacitor</td><td>Gives a single phase motor the push to turn</td><td>Measures low while looking perfectly normal</td></tr>
<tr><td>Contactor</td><td>A switch operated by a coil</td><td>Contacts burn and pit, so little gets through</td></tr>
<tr><td>Motor windings</td><td>Three terminals: common, run, start</td><td>Open or shorted; found by measuring resistance</td></tr>
</table>
<div class="key-idea"><span class="callout-label">Measure, do not look</span><p>A failed capacitor often looks fine. If it is marked 45 microfarad and it measures 31, it is finished.</p></div>
<h3>Finding the terminals</h3>
<p>Measure resistance between each pair. The highest reading is between run and start, and the terminal not involved in that reading is common.</p>
<div class="warning"><span class="callout-label">All of this with the power isolated</span><p>Locked, proved dead, and the capacitor discharged first.</p></div>`,
      Intermediate: `<p>A single phase induction motor cannot start on its own because a single alternating field produces no rotating torque. The run capacitor creates a phase shift in the start winding current, and the two out-of-phase fields produce rotation.</p>
<div class="key-idea"><span class="callout-label">Which explains the symptom exactly</span><p>A motor with a failed capacitor hums, draws locked rotor current and trips on overload. It will often start if you spin it by hand, because it needs the asymmetry only to begin.</p></div>
<h3>Contactors fail in two distinct ways, and the test differs</h3>
<table>
<tr><th>Failure</th><th>Symptom</th><th>Test</th></tr>
<tr><td>Open or burnt-out coil</td><td>Contacts never close</td><td>Coil resistance; control voltage across the coil</td></tr>
<tr><td>Pitted or welded contacts</td><td>Coil pulls in, load side gets little</td><td>Voltage drop across the closed contacts under load</td></tr>
</table>
<h3>Terminal identification is pure arithmetic</h3>
<p>The two smaller readings should add up to the largest. The terminal common to both smaller readings is C, the lower of those two goes to R, the higher to S.</p>
<div class="warning"><span class="callout-label">When they do not add up</span><p>You have an open or shorted winding, not a terminal identification problem. That distinction saves re-measuring a motor that is already condemned.</p></div>`,
      Advanced: `<p>The sum rule follows from the windings being in series between run and start with common tapped between them, so C to R plus C to S equals R to S for a healthy motor.</p>
<h3>Insulation resistance separates a motor worth saving</h3>
<p>A megohmmeter reading between any winding and the shell should be in the tens of megohms; low megohms or below indicates breakdown. A compressor that passes a winding resistance check can still be on its way to an earth fault that will trip the supply. It is the test most often skipped because it needs a different instrument.</p>
<h3>Hard start kits usually treat a symptom</h3>
<div class="warning"><span class="callout-label">What fitting one can mask</span><p>A failing run capacitor, a sticking valve plate, or low voltage at the terminals. Without establishing why the motor struggles, you convert an intermittent diagnosable fault into a system that starts reliably until the underlying problem finishes the compressor.</p></div>
<h3>Supply voltage under load belongs in this set</h3>
<p>A compressor drawing locked rotor current on a long or undersized cable can see terminal voltage sag far enough that it cannot start, and every component tests healthy afterwards because the fault only exists during inrush. Measuring at the contactor load terminals at the moment of starting is the only way to see it.</p>`,
      Expert: `<p>The permanent split capacitor arrangement is a two-phase machine fed from a single phase source, with the capacitor sized to produce approximately quadrature current in the auxiliary winding at rated load.</p>
<div class="key-idea"><span class="callout-label">Sized for running, not for starting</span><p>Which is the structural reason these machines have modest starting torque, and why they are paired with expansion devices that equalise pressures during the off cycle. It explains why a system with a thermostatic valve and no hard start kit can fail to start after a short cycle and recover after a few minutes standing.</p></div>
<h3>Capacitance degradation is a candidate for condition-based replacement</h3>
<p>Dielectric aging is accelerated by temperature and ripple current and is approximately monotonic. Measuring and recording capacitance at each visit produces a trend, and a capacitor that has lost ten per cent in a year will fail within the equipment's service life. Replacing it during a planned visit costs a fraction of the same replacement as an emergency call in peak season.</p>
<h3>A welded contactor is a safety issue, not only a reliability one</h3>
<p>The compressor cannot be stopped by the control circuit, so the unit runs regardless of thermostat demand and remains energised when a technician believes the control has switched it off. This is one of the concrete reasons proving dead is performed at the point of work.</p>
<div class="field"><span class="callout-label">When the parts cannon is actually rational</span><p>Where a part costs less than the labour to test it and its failure rate is high. A run capacitor meets both tests; a compressor meets neither. The failure in practice is not replacing cheap parts speculatively, it is extending the same reasoning to expensive ones and to parts whose replacement does not resolve the cause.</p></div>`,
    },
    questions: [
      {
        n: 1,
        question: "A compressor hums but does not start, and trips the breaker after a few seconds. The first component to test is:",
        options: [
          "The run capacitor",
          "The thermostat",
          "The expansion valve",
          "The condenser fan motor",
        ],
        answer: 0,
        explanation:
          "A single phase motor needs the capacitor's phase shift to produce starting torque. Without it the motor sits drawing locked rotor current and trips on overload, which is exactly the symptom described. It also often starts if spun by hand, because the asymmetry is only needed to begin.",
        difficulty: "Easy",
        skill: "Run capacitor",
      },
      {
        n: 2,
        question: "A capacitor marked 45 µF measures 31 µF and shows no bulging. It is:",
        options: [
          "Failed and must be replaced, despite looking intact",
          "Within tolerance and should be left alone",
          "Overcharged and needs discharging again",
          "Fine, because the marked value is only nominal",
        ],
        answer: 0,
        explanation:
          "Tolerance is usually around five or six per cent, so 31 against 45 is far outside it. Bulging is conclusive evidence of failure but its absence proves nothing, and a clean-looking capacitor measuring thirty per cent low is the more common case.",
        difficulty: "Medium",
        skill: "Run capacitor",
      },
      {
        n: 3,
        question: "Motor terminal readings are 2.1, 5.4 and 7.5 ohms. The common terminal is:",
        options: [
          "The one shared by the 2.1 and 5.4 readings",
          "The one shared by the 2.1 and 7.5 readings",
          "The one shared by the 5.4 and 7.5 readings",
          "Not determinable from resistance alone",
        ],
        answer: 0,
        explanation:
          "The two smaller readings add to the largest, 2.1 plus 5.4 is 7.5, so the largest is run to start and the terminal common to the two smaller readings is C. The 2.1 reading goes to the run winding and the 5.4 to the higher-resistance start winding.",
        difficulty: "Hard",
        skill: "Common terminal",
      },
      {
        n: 4,
        question: "Motor readings are 3.0, 4.0 and 9.0 ohms. This indicates:",
        options: [
          "A winding fault, because the two smaller readings do not add to the largest",
          "A healthy motor with common at the shared terminal",
          "That the meter leads need zeroing",
          "A shorted run capacitor",
        ],
        answer: 0,
        explanation:
          "For a healthy motor the two smaller readings must sum to the largest, and 3.0 plus 4.0 is 7.0 rather than 9.0. A violation of the sum rule is evidence of an open or shorted winding rather than a terminal identification problem, which saves re-measuring a motor that is already condemned.",
        difficulty: "Hard",
        skill: "Winding resistance",
      },
      {
        n: 5,
        question: "A contactor's coil pulls in audibly but the compressor does not run. The most likely fault is:",
        options: [
          "Pitted or burnt contacts not passing full voltage to the load",
          "An open coil",
          "No control voltage reaching the coil",
          "A failed thermostat",
        ],
        answer: 0,
        explanation:
          "If the coil pulls in, the control circuit and the coil are both working. That leaves the load side, and contacts burn and pit over time, so you can have a contactor that closes mechanically while passing very little. The test is voltage drop across the closed contacts under load.",
        difficulty: "Medium",
        skill: "Contactor",
      },
      {
        n: 6,
        question: "A welded contactor is a safety concern because:",
        options: [
          "The compressor stays energised even when the control circuit says it is off",
          "It draws more current than a healthy one",
          "It causes the capacitor to overcharge",
          "It prevents the unit from starting at all",
        ],
        answer: 0,
        explanation:
          "Welded contacts mean the control circuit can no longer stop the compressor, so the unit remains live when a technician believes the control has switched it off. This is one of the concrete reasons proving dead is done at the point of work rather than inferred from the control state.",
        difficulty: "Medium",
        skill: "Contactor",
      },
      {
        n: 7,
        question: "Fitting a hard start kit to a compressor that struggles to start is poor practice when:",
        options: [
          "The underlying reason for the hard starting has not been established",
          "The compressor is more than two years old",
          "The system uses a capillary expansion device",
          "The supply voltage has been measured",
        ],
        answer: 0,
        explanation:
          "A hard start kit raises starting torque and will mask a failing run capacitor, a sticking valve plate or voltage sag on an undersized supply. It converts an intermittent, diagnosable fault into a system that starts reliably until the real problem finishes the compressor.",
        difficulty: "Hard",
        skill: "Start winding",
      },
    ],
    parts: [
      {
        n: 1,
        title: "Identify the electrical components in a split unit",
        diagram: "ac-wiring",
        brief: `<p>This is the control and power side of a single phase split air conditioner. Supply comes in at the left and the compressor motor is at the right.</p>
<p>Name each numbered point. The label list includes the parts these are most commonly confused with, so elimination will not finish it for you.</p>
<p>Then match each motor terminal to the winding that lands on it. If you are unsure, remember the arithmetic: the two smaller resistance readings add up to the largest.</p>`,
        hotspots: [
          {
            key: "isolator",
            label: "Isolator",
            x: 24,
            y: 25,
            does: "The securable point of disconnection for this unit. This is what your padlock goes on, and the only device here that makes the equipment safe to work on.",
            confusedWith:
              "The contactor. Both switch the supply, but the isolator is operated by hand and can be locked, while the contactor is operated by the control circuit and cannot be relied on to keep anything off.",
          },
          {
            key: "contactor",
            label: "Contactor",
            x: 47,
            y: 25,
            does: "An electrically operated switch. The control circuit energises its coil, the contacts close, and the compressor gets its supply.",
            confusedWith:
              "The relay. A contactor carries the motor load and has a visible coil marked A1 and A2; a relay is the smaller device switching control signals rather than load current.",
          },
          {
            key: "thermostat",
            label: "Thermostat",
            x: 47,
            y: 72,
            does: "Closes the control circuit when the room is above setpoint, which is what energises the contactor coil. It carries control current only, not motor load.",
            confusedWith:
              "The overload protector, which also opens a circuit on a temperature rise but sits on the compressor itself and responds to the motor rather than the room.",
          },
          {
            key: "capacitor",
            label: "Run capacitor",
            x: 72,
            y: 59,
            does: "Shifts the phase of the start winding current so the single phase motor produces rotating torque. Without it the motor hums and draws locked rotor current.",
            confusedWith:
              "The start capacitor in a hard start kit, which is larger, usually black plastic, and only in circuit briefly during starting rather than permanently.",
          },
          {
            key: "motor",
            label: "Compressor motor",
            x: 88,
            y: 25,
            does: "The load. Three terminals, common, run and start, with both windings sharing the common connection.",
            confusedWith:
              "The condenser fan motor, which is also in the outdoor unit. The compressor is the sealed body the refrigerant pipes enter; the fan motor has no pipework.",
          },
        ],
        wiring: [
          {
            from: "C",
            to: "Both windings share this terminal",
            note: "Common is identified by the arithmetic: it is the terminal involved in the two smaller resistance readings, which add up to the largest.",
          },
          {
            from: "R",
            to: "Run winding, lower resistance",
            note: "The run winding carries current continuously and has the lower resistance of the two, so C to R is the smaller of the two readings involving common.",
          },
          {
            from: "S",
            to: "Start winding, through the capacitor",
            note: "The start winding is higher resistance and is fed through the run capacitor, which is what produces the phase shift. C to S is therefore the larger reading involving common.",
          },
        ],
        minutes: 14,
        skills: ["Run capacitor", "Contactor", "Common terminal", "Start winding"],
      },
    ],
  },
  /* ===================================================================== */
  5088: {
    topicId: 5088,
    title: "Tracing a control circuit from the wiring diagram",
    summary:
      "The diagram on the inside of the cover is a map of permissions. Learn to read it as a chain of switches and the fault halves with every measurement.",
    concepts: ["Control circuit", "Wiring diagram", "Series chain", "Voltage drop", "Halving the circuit"],
    glossary: {
      "Control circuit": "The low current path that decides whether the load is energised, as distinct from the power circuit that feeds it.",
      "Wiring diagram": "The manufacturer's schematic, usually printed inside the service cover, showing every device and its connections.",
      "Series chain": "Devices wired one after another so that any one of them opening stops the whole circuit.",
      "Voltage drop": "The potential difference measured across a device, which reveals where a series circuit is broken.",
      "Halving the circuit": "Testing at the midpoint to eliminate half the chain with each measurement.",
      "Safety interlock": "A device such as a high pressure switch or float switch wired to break the control circuit on a fault.",
    },
    body: {
      Beginner: `<p>The control circuit is the thin wiring that decides when the thick wiring gets switched on. Nothing starts until every switch in that chain is closed.</p>
<h3>A typical chain, in order</h3>
<table>
<tr><th>In the chain</th><th>Opens when</th></tr>
<tr><td>Thermostat</td><td>The room is cool enough</td></tr>
<tr><td>High pressure switch</td><td>Head pressure is too high</td></tr>
<tr><td>Low pressure switch</td><td>Charge is low</td></tr>
<tr><td>Overload</td><td>The compressor got too hot</td></tr>
<tr><td>Contactor coil</td><td>The end of the chain</td></tr>
</table>
<div class="key-idea"><span class="callout-label">Why one bad part stops everything</span><p>They are in series, like a string of hands holding on. One letting go breaks the whole chain, and the unit does nothing at all.</p></div>
<h3>Find it by halving</h3>
<p>Measure in the middle of the chain. If voltage is there, the break is further along. If it is not, the break is behind you. Each measurement removes half of what is left, so eight components take three or four readings instead of eight.</p>`,
      Intermediate: `<p>A control circuit is a series chain from one side of the control transformer, through every safety and demand device, to the contactor coil and back. Reading it on a diagram means following one line and listing what interrupts it.</p>
<div class="key-idea"><span class="callout-label">The reading that tells you the most</span><p>Voltage across an open device in a series circuit is full control voltage, because the open device drops everything. Voltage across a closed device is near zero. So the open contact announces itself: it is the only one reading 24 volts across its own terminals.</p></div>
<h3>Halving, in practice</h3>
<p>Eight devices, with power at the start and nothing at the coil. Measure at device four. Live there, the fault is in five to eight. Dead, it is in one to four. Three readings isolate it.</p>
<table>
<tr><th>Approach</th><th>Readings for 8 devices</th></tr>
<tr><td>One at a time from the start</td><td>Up to 8</td></tr>
<tr><td>Halving</td><td>3</td></tr>
</table>
<div class="warning"><span class="callout-label">A safety switch that has opened is reporting a fault, not being one</span><p>Jumpering it out makes the unit run, which looks like a repair. A high pressure switch that opened because the condenser is blocked, bypassed, lets the compressor run to destruction. Find out why it opened.</p></div>`,
      Advanced: `<p>Low voltage control is a series topology precisely so that failure is fail-safe: any open circuit, including a broken wire, de-energises the contactor. That is a design property worth naming, because it is the reason the wiring is not simply more convenient as a parallel arrangement.</p>
<h3>High resistance is harder than an open circuit</h3>
<p>A corroded terminal or a partly burnt contact passes enough current to show voltage on an unloaded meter and not enough to pull in the coil, so the circuit tests good and the unit does not run.</p>
<div class="key-idea"><span class="callout-label">Finding it</span><p>Measure voltage at the coil while the circuit is calling, not with the circuit open. A loaded measurement exposes the drop; an unloaded one hides it. This is the single most common reason a control fault is declared intermittent.</p></div>
<h3>Lock-out circuits change the inference</h3>
<p>Where a board latches a fault, the control chain may be open because the board has decided not to close it, and the chain itself is healthy. Tracing the series path then finds nothing, because the question has moved to why the board latched. Reading the fault code first, and the diagram second, saves an hour.</p>
<h3>Transformer loading is the overlooked whole-circuit fault</h3>
<p>A 40 VA transformer feeding a contactor coil, a reversing valve solenoid and a condensate pump can sag under simultaneous inrush far enough that no coil pulls in, and every component measures correct individually. Measuring secondary voltage during the call rather than at rest is what distinguishes this from a dozen component faults.</p>`,
      Expert: `<p>Treated formally, fault localisation in a series chain of n elements is a search problem, and binary section has logarithmic cost against the linear cost of sequential testing. The practical ceiling is not the arithmetic but access: a midpoint test point inside a sealed harness costs more than three accessible sequential ones, so the optimal strategy weights each probe by the effort to reach it rather than treating probes as equal.</p>
<div class="key-idea"><span class="callout-label">Which is why experienced technicians look asymmetric</span><p>They are minimising cost rather than count, and the accessible terminal block is probed first even when it is not the midpoint.</p></div>
<h3>Safety devices carry diagnostic information in which one opened</h3>
<p>A low pressure switch open points at charge or airflow across the evaporator; a high pressure switch open points at condenser heat rejection; a compressor overload open points at mechanical or electrical loading. The chain is a sensor array, and treating the open device as the fault discards the strongest evidence available.</p>
<h3>The economics of bypassing, stated plainly</h3>
<p>A bypassed pressure switch converts a protected system into an unprotected one, and the liability for the resulting compressor failure attaches to whoever fitted the jumper. Where a switch is genuinely faulty the correct action is replacement with the same setpoint and reset type; a manual-reset switch replaced with an automatic-reset one silently removes the requirement that somebody investigate.</p>
<div class="field"><span class="callout-label">Documentation is part of the circuit</span><p>A unit whose control wiring has been modified without the diagram being annotated costs the next technician the whole diagnosis again, and they will trust the printed diagram over the installed reality. Marking the change on the diagram inside the panel is a two-minute task that pays for itself the first time.</p></div>`,
    },
    parts: [
      {
        n: 1,
        title: "Trace the control chain and the motor terminals",
        diagram: "ac-wiring",
        brief: `<p>Same unit as before, now read as a control problem. The compressor will not start, the supply is healthy and the fuses are intact.</p>
<p>Identify the points below, then match each compressor terminal to what lands on it.</p>
<p>Think about the chain as a list of permissions: supply, then the thermostat calling, then the contactor coil energised, then the motor fed through its terminals. Any one open stops everything downstream.</p>`,
        hotspots: [
          {
            key: "iso",
            label: "Securable isolation point",
            x: 24,
            y: 25,
            does: "Where the supply can be disconnected and locked. Every diagnosis of this circuit starts by proving dead here, at the point of work.",
            confusedWith:
              "The contactor, which also interrupts the supply but is commanded by the control circuit and can close at any moment while you have your hands inside.",
          },
          {
            key: "coil",
            label: "Contactor coil",
            x: 47,
            y: 25,
            does: "The end of the control chain. If the coil has voltage across it and the contactor does not pull in, the coil is open; if it has no voltage, the break is upstream in the chain.",
            confusedWith:
              "The contactor's load contacts. The coil is the control side, marked A1 and A2, and carries milliamps; the contacts carry the compressor's full current.",
          },
          {
            key: "stat",
            label: "Thermostat contacts",
            x: 47,
            y: 72,
            does: "The first permission in the chain. Closes on a call for cooling, which is what puts voltage onto the rest of the control circuit.",
            confusedWith:
              "The compressor overload, which also opens a circuit but sits on the motor body and responds to motor temperature rather than to room temperature.",
          },
          {
            key: "tc",
            label: "Common terminal",
            x: 83,
            y: 39,
            does: "The terminal shared by both windings. Identified by arithmetic: it is the terminal involved in the two smaller resistance readings, which sum to the largest.",
            confusedWith:
              "The run terminal. Guessing between them is how a motor gets wired with the capacitor across the wrong winding, which will not start and may burn out.",
          },
          {
            key: "tr",
            label: "Run terminal",
            x: 88,
            y: 39,
            does: "Feeds the run winding, which carries current continuously and has the lower of the two resistances measured from common.",
            confusedWith:
              "The start terminal. The two are distinguished only by resistance, never by position, and the labels on a compressor body are often unreadable.",
          },
          {
            key: "ts",
            label: "Start terminal",
            x: 93,
            y: 39,
            does: "Feeds the start winding through the run capacitor. Higher resistance than the run winding, so C to S is the larger of the two readings from common.",
            confusedWith:
              "The run terminal, for the same reason: both are just posts, and only the meter tells them apart.",
          },
        ],
        sequence: [
          {
            key: "iso",
            label: "Supply present at the isolator",
            why: "Nothing downstream can be diagnosed until you know the unit is actually being fed. Start where the supply enters.",
          },
          {
            key: "stat",
            label: "Thermostat calling for cooling",
            why: "The first permission in the chain. If it is not closed, everything downstream is correctly dead and there is no fault to find here.",
          },
          {
            key: "coil",
            label: "Voltage across the contactor coil",
            why: "The end of the control chain. Voltage here with no pull-in means an open coil; no voltage means the break is somewhere between the thermostat and this point.",
          },
          {
            key: "tc",
            label: "Supply reaching the compressor terminals",
            why: "Only once the contactor has closed does the power circuit matter. Testing the motor before this point tells you nothing about why it is not running.",
          },
        ],
        wiring: [
          {
            from: "C",
            to: "Supply common to both windings",
            note: "Both windings return through this terminal, which is why its two resistance readings add to the third.",
          },
          {
            from: "R",
            to: "Run winding, directly from the contactor",
            note: "The run winding is fed straight from the load side of the contactor with no capacitor in its path.",
          },
          {
            from: "S",
            to: "Start winding, via the run capacitor",
            note: "The capacitor sits in this leg only. That is what shifts the phase and produces the rotating field the motor needs to turn.",
          },
        ],
        minutes: 15,
        skills: ["Control circuit", "Series chain", "Wiring diagram"],
      },
    ],
    scenarios: [
      {
        n: 1,
        title: "The high pressure switch that keeps tripping",
        blurb:
          "The unit is dead, the chain is open at one device, and there is a terminal block right there that would make the problem go away for a fortnight.",
        role: "You are the technician on a second visit to the same shop in a week.",
        start: "c1",
        minutes: 13,
        idealPath: ["c1", "c2", "c3"],
        nodes: [
          {
            id: "c1",
            situation: `<p>A shop unit, second call in a week. The first technician reset something and it ran for four days. Now it is dead again: indoor fan runs, outdoor unit does nothing.</p>
<p>You isolate, lock, prove dead, then energise the control circuit to test. Working along the chain, you find full supply voltage across the high pressure switch and near zero across every other device. The switch is open.</p>`,
            prompt: "What does that tell you, and what do you do?",
            choices: [
              {
                id: "a",
                label: "The switch is reporting a condition. Find out what tripped it",
                outcome:
                  "You reset it, run the unit on gauges and watch. Head pressure climbs steadily and trips the switch at about fourteen minutes. The condenser coil is matted with lint from a laundry two doors down, and the fan is pulling air through perhaps a third of the surface.",
                next: "c2",
                delta: 3,
                cost: { minutes: 30 },
              },
              {
                id: "b",
                label: "Link out the switch so the unit runs, and come back when a part arrives",
                outcome:
                  "The shop is cool within the hour and the owner is delighted. You have removed the only device protecting the compressor from a condition that is still present, and the first technician's reset means this is now the second time the system has been allowed to run into it.",
                next: "c4",
                delta: -3,
                cost: { minutes: 10 },
                violation: "A safety interlock was bypassed to restore operation.",
              },
              {
                id: "c",
                label: "Replace the high pressure switch; it has tripped twice so it must be faulty",
                outcome:
                  "The new switch trips at fourteen minutes too, because it is doing exactly what the old one did. You have spent a part and an hour confirming that the switch was working correctly.",
                next: "c2",
                delta: -1,
                cost: { minutes: 60, rupees: 1400 },
              },
              {
                id: "d",
                label: "Reset it, confirm it runs, and leave",
                outcome:
                  "Which is what the first technician did. It will run for a few days and trip again, and the shop will have paid twice for the same non-repair.",
                next: "c4",
                delta: -2,
                cost: { minutes: 15 },
              },
            ],
          },
          {
            id: "c2",
            situation: `<p>So the switch is healthy and the condenser cannot reject heat. The coil is heavily fouled with lint and the fins are flattened in a patch about the size of a hand where something has been leaned against it.</p>
<p>The owner asks whether you can just clean it today.</p>`,
            prompt: "How do you handle the repair?",
            choices: [
              {
                id: "a",
                label: "Clean the coil properly, comb the fins, then re-run on gauges to confirm",
                outcome:
                  "A full chemical clean and a fin comb take an hour. Back on gauges, head pressure settles well below the trip point and holds for forty minutes. Subcooling comes back to 6 K. The switch has not tripped because the condition that tripped it is gone.",
                next: "c3",
                delta: 3,
                cost: { minutes: 75, rupees: 600 },
              },
              {
                id: "b",
                label: "Hose the coil down from the outside and call it done",
                outcome:
                  "It looks better and runs cooler. Hosing from the outside drives surface lint further into the coil rather than out of it, and in three weeks the head pressure will be climbing again.",
                next: "c3",
                delta: -1,
                cost: { minutes: 20 },
              },
              {
                id: "c",
                label: "Clean it, and also recommend relocating the unit away from the laundry exhaust",
                outcome:
                  "The clean fixes today and the recommendation addresses why it happened. Relocation is expensive and may not be practical, but naming the cause in writing is what stops this being your problem on the fourth visit.",
                next: "c3",
                delta: 3,
                cost: { minutes: 80, rupees: 600 },
              },
            ],
          },
          {
            id: "c3",
            situation: `<p>The coil is clean, the head pressure holds, and the switch has not operated in forty minutes of running. You write up what you found, note the lint source two doors down, and recommend a six monthly coil clean given the location.</p>`,
            prompt: "",
            ending: {
              verdict: "ideal",
              title: "You treated the interlock as a message rather than an obstacle",
              debrief: `<p>The whole topic is in the first decision. A tripped safety interlock is not a fault, it is a report. The high pressure switch was doing precisely what its designer intended: stopping a compressor that was about to be damaged by a condition the compressor could not survive. The question it asks is "what made the head pressure climb", and every answer other than finding out is a way of not hearing it.</p>
<p>Linking it out is the destructive option and it is genuinely tempting, because it works. The shop gets cold in an hour and the customer is pleased. What you have removed is the only thing standing between a fouled condenser and a seized compressor, and because the first technician had already reset it once, this system had been run into the condition twice before you arrived. Defeating an interlock also transfers the manufacturer's safety case onto the person holding the screwdriver.</p>
<p>Replacing the switch is the other instinct worth naming, because it feels like doing something. A device that has operated twice under the same condition is evidence that the device works, not that it is tired. You can confirm this cheaply: reset it, run on gauges and watch what the pressure does. Fourteen minutes of observation was worth more than the part.</p>
<p>The strongest version of this repair also wrote down why it happened. A condenser facing a laundry exhaust will foul again, and a note recommending a six monthly clean converts a recurring emergency into a scheduled visit. That is the difference between fixing a unit and fixing a customer's problem.</p>`,
            },
          },
          {
            id: "c4",
            situation: `<p>The unit is running, either with its protection defeated or with the fouling untouched and the switch waiting to trip again.</p>`,
            prompt: "",
            ending: {
              verdict: "poor",
              title: "The protection was treated as the problem",
              debrief: `<p>Both of these restore cooling and neither is a repair. Resetting and leaving is what the first technician did, and the shop has now paid two people to do the same non-repair; the switch will trip again within the week because nothing about the condition has changed.</p>
<p>Linking the switch out is categorically worse and it is worth being blunt about why. The high pressure switch exists because a failure analysis concluded that this compressor must stop when discharge pressure reaches a certain value. Bridging it does not remove the condition, it removes the response to the condition, and the compressor will now run into whatever the switch was protecting it from until something mechanical gives way. That is a five figure failure caused by a two minute shortcut, and the audit trail is a bridged terminal in your handwriting.</p>
<p>The useful habit is a sentence: an interlock that has operated is reporting, not failing. A tripped high pressure switch means a blocked condenser, a dead fan, non-condensables or an overcharge. A tripped low pressure switch means loss of charge or a restriction. In each case the device has named the area for you, which is more than most faults do.</p>
<p>And the cheap confirmation was available throughout. Reset it, run it on gauges, and watch. Fourteen minutes of observation would have shown head pressure climbing steadily toward the trip point, which points at the condenser and at nothing else.</p>`,
            },
          },
        ],
        skills: ["Control circuit", "Safety interlock", "Series chain"],
      },
    ],
  },

  /* ===================================================================== */
  5089: {
    topicId: 5089,
    title: "Inverter boards: what you may and may not touch",
    summary:
      "Variable speed equipment breaks the fixed-speed rules you have just learned. Knowing which rules stopped applying is most of the skill.",
    concepts: ["Inverter drive", "DC bus", "Service mode", "Error code", "Board-level repair"],
    glossary: {
      "Inverter drive": "Electronics that vary compressor speed by synthesising a variable frequency supply, rather than switching it on and off.",
      "DC bus": "The rectified high voltage link inside the drive, held on large capacitors that remain charged after isolation.",
      "Service mode": "A manufacturer diagnostic mode that reports the unit's own sensor values and fault history.",
      "Error code": "The fault identifier a unit displays or flashes, which maps to a specific documented cause.",
      "Board-level repair": "Replacing components on a circuit board rather than the board itself, which is outside the scope of field service.",
      "Fixed speed": "Conventional equipment where the compressor runs at one speed and cycles on and off.",
    },
    body: {
      Beginner: `<p>An inverter unit varies the compressor speed instead of switching it on and off. It saves energy and it changes what you are allowed to do.</p>
<h3>Yours and not yours</h3>
<table>
<tr><th>Yours</th><th>Not yours</th></tr>
<tr><td>Read the error code</td><td>Replacing parts on the board</td></tr>
<tr><td>Check the supply</td><td>Repairing board tracks</td></tr>
<tr><td>Check the sensors</td><td>Bypassing a protection</td></tr>
<tr><td>Replace the whole board</td><td>Guessing at component level</td></tr>
</table>
<div class="warning"><span class="callout-label">The DC bus can hold hundreds of volts</span><p>After the power is off. Wait the time the manual says, then measure the bus to confirm it has fallen. Do not assume.</p></div>
<h3>Start with the code</h3>
<p>The unit tells you what it thinks is wrong. Look that code up in the service manual for that model. Most codes point at a sensor or a supply problem rather than at the board.</p>`,
      Intermediate: `<p>An inverter converts the incoming AC to DC, then synthesises a variable frequency AC to drive the compressor. Capacity follows demand rather than cycling, which is where the efficiency comes from, and it means the system has a computer in it that logs and reports.</p>
<div class="key-idea"><span class="callout-label">The diagnostic consequence</span><p>The unit has already done a lot of the work. Error codes and stored history should be the first thing you read, before any instrument comes out, because they often identify the circuit directly.</p></div>
<h3>What a code actually tells you</h3>
<table>
<tr><th>Code points at</th><th>Usual reality</th></tr>
<tr><td>Sensor fault</td><td>A thermistor or its connector, not the board</td></tr>
<tr><td>Communication error</td><td>Interconnecting cable, polarity, or induced noise</td></tr>
<tr><td>Overcurrent</td><td>A mechanical or charge problem loading the compressor</td></tr>
<tr><td>Board fault</td><td>The board, and this one is the minority</td></tr>
</table>
<div class="warning"><span class="callout-label">Why board-level repair is out of scope</span><p>Not because it is difficult, but because an inverter board drives a motor at several hundred volts and a part-correct repair fails in a way that can destroy the compressor and void the warranty. Boards are replaced as units, and the manufacturer's own service structure is built on that.</p></div>`,
      Advanced: `<p>The topology is a rectifier, a DC link with substantial capacitance, and an IGBT bridge switching at a few kilohertz under vector control. Each stage produces its own characteristic fault pattern, and knowing which stage a symptom belongs to is most of the diagnosis.</p>
<table>
<tr><th>Stage</th><th>Characteristic symptom</th></tr>
<tr><td>Rectifier or bus</td><td>Dead unit, no display, bus voltage absent or low</td></tr>
<tr><td>Bridge or gate drive</td><td>Trips immediately on start, overcurrent code</td></tr>
<tr><td>Control or sensing</td><td>Runs but behaves wrongly, or reports a sensor</td></tr>
</table>
<h3>Thermistor characteristics are checkable in the field</h3>
<p>Most are negative temperature coefficient devices with a published resistance against temperature table. A sensor reading in range at ambient can still be out of tolerance hot, which produces the intermittent fault that appears only in the afternoon. Comparing two sensors at the same temperature is a quick substitute when no table is to hand: they should agree closely.</p>
<div class="warning"><span class="callout-label">Supply quality is a real cause, not an excuse</span><p>Inverter drives are sensitive to voltage dips, phase imbalance and harmonic distortion in ways fixed-speed equipment is not, and a site with a weak supply will produce repeated board failures that look like a product defect. Logging voltage over a working day is what distinguishes the two, and it is the difference between a third board and a supply conversation with the customer.</p></div>
<h3>The bus capacitor hazard is not a procedure to shortcut</h3>
<p>Bleed resistors fail silently. The manufacturer's wait time assumes the bleed path is intact, so measuring the bus directly is the only test that proves the state rather than assuming it.</p>`,
      Expert: `<p>The scope boundary around board-level work is best understood as a risk allocation rather than a skill judgement. The failure modes of a partly repaired gate drive include destroying a compressor worth many times the board, and the liability for that sits with whoever last worked on it.</p>
<div class="key-idea"><span class="callout-label">Which is the real argument</span><p>Not that component replacement is impossible, but that the expected cost of a field repair exceeds the saving even when the repair usually works.</p></div>
<h3>The sensor-against-board distinction is where diagnostic value concentrates</h3>
<p>Field data from manufacturer service organisations consistently shows sensor, connector and interconnection faults substantially outnumbering genuine board failures among units returned under warranty, and a large share of returned boards test good. Each of those is a board cost, a return cost and a repeat visit, all avoidable by measuring the sensor the code named before condemning the board that reported it.</p>
<h3>Communication faults deserve a separate mental model</h3>
<p>Indoor and outdoor units typically exchange data over a two or three wire link, often unshielded, run alongside the power cable for the whole length of the installation. Induced noise, moisture at a junction and reversed polarity all present as the same code, and the installation itself is the suspect rather than either board. Measuring the link while the fault is present, rather than continuity when it is not, is the only approach that converges.</p>
<div class="field"><span class="callout-label">Document the stored history before clearing it</span><p>Fault memory is the only record of an intermittent condition, and clearing codes to see whether the fault returns destroys the evidence that would have identified it. Photograph the history first. This is the most commonly discarded diagnostic asset on modern equipment.</p></div>`,
    },
    questions: [
      {
        n: 1,
        question: "Low suction pressure on an inverter system means:",
        options: [
          "Possibly nothing, because the controller varies compressor speed and therefore pressure",
          "The same thing it means on a fixed speed system",
          "That the compressor has failed",
          "That the unit is definitely undercharged",
        ],
        answer: 0,
        explanation:
          "On fixed speed equipment suction pressure is an output you interpret. On an inverter it is partly a variable the controller is manipulating, so a low reading may simply mean the room is close to setpoint. Applying fixed speed heuristics here is how healthy compressors get condemned.",
        difficulty: "Medium",
        skill: "Inverter drive",
      },
      {
        n: 2,
        question: "The first diagnostic step on an inverter unit should be:",
        options: [
          "Read the error code and enter service mode",
          "Connect gauges and take superheat",
          "Measure the capacitor",
          "Check the winding resistances",
        ],
        answer: 0,
        explanation:
          "The unit has its own sensors at points you cannot reach and will report what the controller is acting on, including coil and discharge temperatures, current and target frequency. That information is better than anything measurable from outside, and it costs nothing.",
        difficulty: "Easy",
        skill: "Service mode",
      },
      {
        n: 3,
        question: "The manufacturer's stated wait time before working on the drive is:",
        options: [
          "A minimum, after which you still measure the DC bus directly",
          "A guarantee that the bus is discharged",
          "Only applicable to three phase equipment",
          "A warranty condition with no safety significance",
        ],
        answer: 0,
        explanation:
          "Bleed resistors discharge the bus over a stated interval, but a failed bleed resistor is not externally visible and leaves several hundred volts on the capacitors indefinitely. Measuring the bus is the only thing that establishes the state.",
        difficulty: "Hard",
        skill: "DC bus",
      },
      {
        n: 4,
        question: "An error code indicating high discharge temperature tells you:",
        options: [
          "Which measurement went out of range, not what caused it",
          "That the compressor must be replaced",
          "That the sensor has failed",
          "That the system is overcharged",
        ],
        answer: 0,
        explanation:
          "Undercharge, a restriction, a failed expansion valve, a fouled condenser and a drifted sensor all produce that code, and the controller cannot distinguish them. The code is a pointer to an area, and the cause still has to be found with the usual tools.",
        difficulty: "Medium",
        skill: "Error code",
      },
      {
        n: 5,
        question: "Before insulation resistance testing a compressor on an inverter system you must:",
        options: [
          "Disconnect the compressor leads at the drive",
          "Set the megohmmeter to its lowest voltage",
          "Run the unit for ten minutes first",
          "Nothing special; the test is the same as on fixed speed",
        ],
        answer: 0,
        explanation:
          "A megohmmeter's test voltage will destroy the drive's output stage if it is still connected. It is a routine and expensive mistake made by technicians carrying fixed speed habits across, and it turns one diagnosable fault into two failed assemblies.",
        difficulty: "Hard",
        skill: "Board-level repair",
      },
      {
        n: 6,
        question: "Replacing individual components on an inverter board is outside field service mainly because:",
        options: [
          "The failure usually has an upstream cause the replacement does not address, and a later failure can destroy the compressor",
          "The components are too small to handle",
          "It voids the refrigerant warranty",
          "Boards cannot be removed from the unit",
        ],
        answer: 0,
        explanation:
          "An IGBT failure is typically secondary to cooling or to a shorted winding, so replacing it without finding the cause schedules a second failure, and a drive that fails under load can take the compressor with it. The sensible boundary is that field service replaces assemblies.",
        difficulty: "Medium",
        skill: "Board-level repair",
      },
      {
        n: 7,
        question: "Service mode reports a coil temperature of 2 °C while your own probe at the same point reads 11 °C. The most likely conclusion is:",
        options: [
          "The thermistor has drifted and the refrigeration circuit may be fine",
          "Your probe is wrong and the controller is correct",
          "The system is severely overcharged",
          "The drive has failed",
        ],
        answer: 0,
        explanation:
          "The controller acts on sensor values and will shut down on a plausible but wrong reading, producing a fault code describing a refrigeration problem that does not exist. Comparing the reported value against your own probe at the same point is the cheapest test available, and a disagreement points at the sensor.",
        difficulty: "Hard",
        skill: "Service mode",
      },
    ],
  },
  /* ===================================================================== */
  5090: {
    topicId: 5090,
    title: "No cooling: the decision tree that ends the call",
    summary:
      "A fault tree beats a parts cannon, costs nothing, and is the difference between a technician a customer calls back and one they do not.",
    concepts: [
      "Fault tree",
      "Symptom",
      "Elimination",
      "Parts cannon",
      "First-time fix",
      "Airside fault",
    ],
    glossary: {
      "Fault tree": "An ordered set of checks where each outcome eliminates a branch rather than testing one guess.",
      Symptom: "What the customer and the equipment present, which is the input to the tree rather than its answer.",
      Elimination: "Removing possibilities with each test, so the remaining candidates shrink predictably.",
      "Parts cannon": "Replacing likely components in turn until the fault disappears, which is expensive and teaches nothing.",
      "First-time fix": "Resolving the fault on the first visit, which is the metric a service business actually lives on.",
      "Airside fault": "A fault in the air path, such as a blocked filter or failed fan, rather than in the refrigeration circuit.",
    },
    body: {
      Beginner: `<p>A customer says it is not cooling. That one sentence covers a dozen different faults, so work through them in an order that rules out whole groups at a time.</p>
<h3>The order that saves time</h3>
<table>
<tr><th>Ask</th><th>If no</th></tr>
<tr><td>Does anything run at all?</td><td>Power or control circuit</td></tr>
<tr><td>Is air coming out of the indoor unit?</td><td>Filter, fan, or blocked coil</td></tr>
<tr><td>Is the outdoor unit running?</td><td>Control chain, capacitor, contactor</td></tr>
<tr><td>Is the air noticeably cold?</td><td>Refrigerant side</td></tr>
</table>
<div class="key-idea"><span class="callout-label">Check the simple things first</span><p>A blocked filter is the most common cause of poor cooling, and it costs nothing to look. Working through cheap and likely before expensive and rare is what makes a visit efficient.</p></div>
<h3>Before you leave</h3>
<p>Measure the air temperature in and out of the indoor unit. Eight to twelve degrees of difference is normal. That number is your proof the unit is working, and it is what you write on the report.</p>`,
      Intermediate: `<p>Each question in the tree is chosen to split the fault space, not to test a component. A question that eliminates half the possibilities is worth more than one that confirms a hunch, and that is the whole design principle.</p>
<h3>The split-temperature test is the single most informative reading</h3>
<table>
<tr><th>Split across the indoor coil</th><th>Means</th></tr>
<tr><td>8 to 12 K</td><td>The system is roughly doing its job</td></tr>
<tr><td>Under 6 K with good airflow</td><td>Refrigerant side: charge, restriction, compressor</td></tr>
<tr><td>Over 14 K</td><td>Airflow is too low; the coil is starving</td></tr>
</table>
<div class="key-idea"><span class="callout-label">Why the airflow caveat matters</span><p>A big split is not good news. Reduced airflow makes the split larger and the cooling delivered smaller, because capacity is airflow times split. A blocked filter produces an impressively cold trickle.</p></div>
<h3>Three faults that present identically and are separated by one reading</h3>
<p>Low charge, a restriction and a weak compressor all give low suction pressure and poor cooling. Subcooling separates the first two. Compressor current against nameplate, and the pressure difference it can develop, separates the third.</p>
<div class="warning"><span class="callout-label">The most expensive habit in this trade</span><p>Adding refrigerant because suction is low. Two of those three faults are made worse by it, and none of them is a leak that has been found.</p></div>`,
      Advanced: `<p>A good decision tree is information-theoretic: each node is placed where it maximises expected information per unit of effort, which is why the cheap observations come first even when they are less likely to be the answer.</p>
<div class="key-idea"><span class="callout-label">The capacity identity underneath it</span><p>Delivered cooling is mass flow of air times specific heat times the split. Low delivered capacity therefore has exactly two proximate causes, airflow and split, and every refrigerant-side fault reaches the customer's complaint through the second one. That is why airflow is settled before the gauges come out: a refrigerant diagnosis made on a starved coil is uninterpretable.</p></div>
<h3>Load against capacity is a distinct branch</h3>
<p>A unit performing exactly to specification will not hold setpoint in a room whose load has grown: added glazing, added occupants, a server, or a space the unit was never sized for. The symptom is the customer's, the fault is not the equipment's, and no amount of measurement on the refrigerant side will resolve it. The evidence is a correct split and correct superheat with the room still warm, and the conversation is about load rather than repair.</p>
<h3>Intermittent complaints need data rather than a visit</h3>
<p>A system that fails only in the afternoon, or only after four hours, cannot be diagnosed in a thirty minute call. A logger on supply and return air and on outdoor ambient, left for a day, converts an unresolvable callback into an obvious pattern, and it is cheaper than the second and third visits it replaces.</p>`,
      Expert: `<p>The economics of a diagnostic sequence are the point of designing one. Ordering tests by expected information divided by cost dominates ordering them by prior probability, because a cheap test that eliminates a large branch beats an expensive test on the single most likely cause.</p>
<div class="key-idea"><span class="callout-label">The practical statement of that</span><p>Look at the filter before you connect gauges, every time, even on a system you are confident is undercharged. The cost is a minute and the branch it eliminates is large.</p></div>
<h3>Where the tree legitimately terminates without a repair</h3>
<p>Three outcomes are correct conclusions rather than failures: the load exceeds the installed capacity; the installation is faulty in a way that is not a service item, such as line length beyond specification or an undersized supply; and the equipment is at end of life where the economic answer is replacement. Each of these is a report and a recommendation, and a technician who cannot reach them will keep selling parts into a system that will not improve.</p>
<h3>Degradation against failure changes the whole approach</h3>
<p>A system that never worked properly has an installation or sizing fault and its history is the diagnosis. A system that worked and no longer does has a component or charge fault. Asking which one, in the first minute, routes the entire visit, and it is a question rather than a measurement.</p>
<div class="field"><span class="callout-label">The recorded number is what makes the next visit cheap</span><p>Split, superheat, subcooling, compressor current and outdoor ambient, written on the report, turn the next technician's diagnosis into a comparison instead of a fresh investigation. Fleet records of these five numbers are also what makes condition-based maintenance possible at all, and the reason most maintenance contracts deliver less than they could is that nobody wrote the numbers down.</p></div>`,
    },
    questions: [
      {
        n: 1,
        question: "On a no-cooling call, the first question to answer is:",
        options: [
          "Is anything running at all",
          "What is the superheat",
          "When was the last service",
          "Is the refrigerant charge correct",
        ],
        answer: 0,
        explanation:
          "It is free, takes two seconds and splits the whole fault population roughly in half: nothing running is electrical, everything running is refrigeration, airflow or load. A good first branch is cheap and divides, and a gauge reading is neither.",
        difficulty: "Easy",
        skill: "Fault tree",
      },
      {
        n: 2,
        question: "A blocked filter can be mistaken for an undercharge because:",
        options: [
          "Reduced airflow lowers evaporator temperature and suction pressure, which looks like low charge",
          "It causes the refrigerant to leak",
          "It raises head pressure in the same way",
          "It makes the capacitor read low",
        ],
        answer: 0,
        explanation:
          "Less air across the coil means less heat into the refrigerant, so it boils at a lower temperature and the suction pressure falls. A technician who reaches for gauges before checking the filter will read that as a low charge and add refrigerant to a system that does not need it.",
        difficulty: "Medium",
        skill: "Airside fault",
      },
      {
        n: 3,
        question: "The indoor fan runs but the outdoor unit is completely dead. The fault is most likely in:",
        options: [
          "The control chain between indoor and outdoor, or the contactor",
          "The refrigerant charge",
          "The expansion device",
          "The indoor coil",
        ],
        answer: 0,
        explanation:
          "The indoor unit having power and the outdoor unit having none localises the problem to what sits between them: the interconnecting control wiring, any interlock in that chain, or the contactor and its coil. None of the refrigeration candidates would leave the outdoor unit completely dead.",
        difficulty: "Medium",
        skill: "Elimination",
      },
      {
        n: 4,
        question: "A customer says the unit has cooled poorly since they converted the room into a kitchen. The most likely issue is:",
        options: [
          "The load has changed and the unit is no longer sized for the room",
          "The refrigerant has leaked",
          "The compressor is failing",
          "The thermostat needs recalibrating",
        ],
        answer: 0,
        explanation:
          "An equipment fault usually has an onset; a load problem usually has a reason. A unit that was adequate and now is not, following a change to the room, is doing its job against more heat than it was chosen for, and no refrigeration work will fix that.",
        difficulty: "Medium",
        skill: "Symptom",
      },
      {
        n: 5,
        question: "Why is an intermittent fault badly suited to a fault tree?",
        options: [
          "A test run while the fault is absent returns a clean result and eliminates nothing",
          "Intermittent faults are always electrical",
          "The tree requires the unit to be switched off",
          "Fault trees only work on inverter systems",
        ],
        answer: 0,
        explanation:
          "Each branch of a tree assumes a test result carries information, and a healthy reading taken while the fault is not present carries none. The right response is to shift from testing to observing, because the pattern of onset is itself diagnostic.",
        difficulty: "Hard",
        skill: "Fault tree",
      },
      {
        n: 6,
        question: "The dominant cause of repeat visits in field service is:",
        options: [
          "Treating a symptom without establishing its cause",
          "Misdiagnosis of rare and difficult faults",
          "Parts failing again within weeks",
          "Customers using the equipment incorrectly",
        ],
        answer: 0,
        explanation:
          "Resetting a tripped interlock, topping up a leaking system and cleaning a filter without asking why it blocked all restore operation and leave the cause in place. The second visit then consumes the margin on the first, and the customer attributes both to the same technician.",
        difficulty: "Medium",
        skill: "First-time fix",
      },
    ],
    scenarios: [
      {
        n: 1,
        title: "Four calls, one morning, and a van with two capacitors in it",
        blurb:
          "The pressure to fix it now is the thing the fault tree is protecting you from. Each decision here costs time, money or a return visit.",
        role: "You are a service technician with four jobs booked before lunch.",
        start: "n1",
        minutes: 14,
        idealPath: ["n1", "n2", "n3"],
        nodes: [
          {
            id: "n1",
            situation: `<p>First call of the day. A two year old 1.5 ton split in a first floor flat. The customer says it stopped cooling properly about a week ago and has got steadily worse.</p>
<p>You switch it on. The indoor fan runs and the air coming out is weak and only slightly cool. The outdoor unit is running: compressor and fan both going.</p>`,
            prompt: "What do you check first?",
            choices: [
              {
                id: "a",
                label: "Pull the indoor filter and look at the coil",
                outcome:
                  "The filter is grey and matted and the first row of the indoor coil behind it is furred. Weak airflow was the symptom and here is the cause. You note it and keep going, because a week of steady deterioration fits a filter blocking up and you want to confirm before you commit.",
                next: "n2",
                delta: 3,
                cost: { minutes: 4 },
              },
              {
                id: "b",
                label: "Put the gauges on",
                outcome:
                  "Suction pressure is low and superheat is high. On its own that reads as undercharge, which is exactly the trap: restricted airflow across the indoor coil produces the same reading. You have spent fifteen minutes and a connection to arrive at an ambiguous answer that a two minute check would have disambiguated.",
                next: "n2",
                delta: -1,
                cost: { minutes: 15 },
              },
              {
                id: "c",
                label: "Change the capacitor, since the compressor is working hard",
                outcome:
                  "The compressor is running, which means the capacitor is doing its job. You have fitted a part to a working circuit and the symptom is unchanged.",
                next: "n4",
                delta: -3,
                cost: { minutes: 20, rupees: 850 },
                violation: "A part was replaced without a test that implicated it.",
              },
              {
                id: "d",
                label: "Ask the customer what changed a week ago",
                outcome:
                  "They say nothing changed, which is what everyone says, but the conversation surfaces that the flat was repainted a fortnight ago. Dust. It costs a minute and it points you straight at the air path.",
                next: "n2",
                delta: 2,
                cost: { minutes: 3 },
              },
            ],
          },
          {
            id: "n2",
            situation: `<p>The filter is blocked and the indoor coil is dirty, and the flat was repainted a fortnight ago. You clean the filter and wash the coil, and the airflow is transformed. The air coming out is properly cold.</p>
<p>It is now 9:40 and you have three more jobs.</p>`,
            prompt: "Do you do anything else before you leave?",
            choices: [
              {
                id: "a",
                label: "Measure the air temperature split and confirm it is in range",
                outcome:
                  "Return air 27, supply air 13, so a 14 K split. That is where it should be, and it confirms the machine is now doing its rated work. Three minutes, no connections, and you leave knowing rather than hoping.",
                next: "n3",
                delta: 3,
                cost: { minutes: 4 },
              },
              {
                id: "b",
                label: "Connect gauges anyway, to be thorough",
                outcome:
                  "Readings are normal now that airflow is restored, which you could have inferred from the air temperature split. You have spent twenty minutes, risked contamination and lost a few grams of charge to confirm something a thermometer told you.",
                next: "n3",
                delta: 0,
                cost: { minutes: 20 },
              },
              {
                id: "c",
                label: "It is cold. Write it up and move on to the next job",
                outcome:
                  "Probably fine, and you have no measurement establishing that the unit is performing to specification rather than merely better than it was. If the real fault was partly a slow leak, you will be back.",
                next: "n3",
                delta: 0,
                cost: { minutes: 1 },
              },
            ],
          },
          {
            id: "n3",
            situation: `<p>You record the split, note the repainting as the likely cause of the dust loading, and recommend the customer checks the filter monthly for the next three months rather than at the usual interval.</p>
<p>You are out at 9:50 having fitted no parts and connected nothing to the refrigeration circuit.</p>`,
            prompt: "",
            ending: {
              verdict: "ideal",
              title: "Fixed in twenty minutes with a thermometer and a hose",
              debrief: `<p>The whole call turned on the ordering. "Is anything running" was answered by observation: everything was running and the air was weak rather than warm. Weak air is an airflow symptom, and the airflow checks are two minutes and free while the refrigeration checks are twenty minutes and invasive. Ordering tests by information gained per unit of cost is what made this a twenty minute job.</p>
<p>The gauge-first route is not wrong so much as premature, and it illustrates the specific trap in this fault. Restricted airflow across the indoor coil drops evaporator temperature and suction pressure and raises superheat, which is indistinguishable from an undercharge on those readings alone. A technician who starts with gauges on this call reads undercharge, adds refrigerant, and now has an overcharged system with a dirty filter.</p>
<p>The air temperature split at the end is the part most technicians skip, and it is what separates "it feels cold" from "it is performing". Fourteen kelvin between return and supply is a measurement anyone can repeat, it took three minutes, and it is the evidence that the machine is doing its rated work rather than simply doing better than it was twenty minutes ago.</p>
<p>And the write-up earned its keep. Recording the repainting as the likely dust source turns a recurring complaint into a predictable one, and telling the customer to check monthly for three months is the difference between fixing a unit and fixing their problem.</p>`,
            },
          },
          {
            id: "n4",
            situation: `<p>A capacitor has been fitted to a circuit that was working, the airflow restriction is untouched, and the unit still is not cooling.</p>`,
            prompt: "",
            ending: {
              verdict: "poor",
              title: "A part was fitted before a test implicated it",
              debrief: `<p>The compressor was running. That single observation eliminates the capacitor entirely, because a motor with a failed run capacitor does not run: it hums, draws locked rotor current and trips. Fitting one to a circuit that was visibly working is the parts cannon in its purest form, and it costs the customer a part and you the time.</p>
<p>The deeper error is strategy rather than knowledge. A fault tree orders tests so that each one eliminates a group of possibilities; replacing a component tests exactly one hypothesis and, when it fails, leaves you where you started minus a part. It also degrades the diagnosis, because the system now differs from the one the customer described.</p>
<p>What was available for free: the air from the indoor unit was weak rather than warm, and weak air is an airflow symptom. Pulling the filter takes two minutes and would have ended the call. The customer's own account, a steady deterioration over a week, fits something gradually blocking rather than a component failing, because components fail abruptly.</p>
<p>The habit worth building is to name, before you reach for anything, the observation that would prove your hypothesis wrong. Here it was "the compressor is running", and it was already in front of you.</p>`,
            },
          },
        ],
        skills: ["Fault tree", "Airside fault", "Parts cannon", "Elimination"],
      },
    ],
  },

  /* ===================================================================== */
  5091: {
    topicId: 5091,
    title: "Finding and fixing a leak without guessing",
    summary:
      "Refrigerant is never consumed, so a low charge is always a leak. Finding it is a procedure, and topping up instead is both illegal and pointless.",
    concepts: ["Leak detection", "Nitrogen pressure test", "Electronic detector", "Bubble solution", "Flare joint"],
    glossary: {
      "Leak detection": "Locating the point of escape, as distinct from establishing that a system is short of charge.",
      "Nitrogen pressure test": "Pressurising with dry nitrogen to a stated test pressure and watching for a pressure drop over time.",
      "Electronic detector": "A handheld sensor that responds to refrigerant vapour, used to narrow down an area.",
      "Bubble solution": "A soap solution brushed onto a joint, which is the cheapest and most conclusive confirmation.",
      "Flare joint": "A mechanical connection formed by flaring the copper, which is the commonest leak point on a split system.",
      "Standing vacuum test": "Holding a deep vacuum and watching for a rise, which detects both leaks and remaining moisture.",
    },
    body: {
      Beginner: `<p>A system that is low on refrigerant has a leak. Topping it up without finding the leak means the customer pays again in a few months, and the refrigerant goes into the atmosphere.</p>
<h3>Where to look first</h3>
<table>
<tr><th>Place</th><th>Why</th></tr>
<tr><td>Flare joints</td><td>Made by hand on site; the most common leak by far</td></tr>
<tr><td>Service valve caps</td><td>Loose or missing, with a leaking core</td></tr>
<tr><td>Coil bends</td><td>Rubbing and vibration wear through</td></tr>
<tr><td>Where pipes pass through walls</td><td>Chafing against the edge</td></tr>
</table>
<div class="key-idea"><span class="callout-label">Two tools, two jobs</span><p>An electronic detector finds roughly where. Bubble solution confirms exactly which joint. Use the detector to narrow it down, then the bubbles to be certain before you cut anything.</p></div>
<div class="warning"><span class="callout-label">Never vent refrigerant to the air</span><p>Recover it into a cylinder. It is a legal requirement, and for many refrigerants one kilogram does the climate damage of driving for months.</p></div>`,
      Intermediate: `<p>Leak detection is a sequence that narrows from the whole system to one joint, and each step costs more than the one before it, which is the reason for the order.</p>
<h3>The sequence</h3>
<table>
<tr><th>Step</th><th>Finds</th></tr>
<tr><td>Oil traces on joints and coil</td><td>Free, and oil marks the escape path</td></tr>
<tr><td>Electronic detector along the circuit</td><td>The region, slowly and downwind-aware</td></tr>
<tr><td>Bubble solution on the suspect joint</td><td>Confirmation</td></tr>
<tr><td>Nitrogen pressure test, held and timed</td><td>Whether anything leaks at all, including after a repair</td></tr>
</table>
<div class="key-idea"><span class="callout-label">Why nitrogen rather than refrigerant</span><p>It is dry, inert, cheap and legal to vent, and it can be taken to a higher pressure than the operating charge, which makes a small leak large enough to find. A pressure test with refrigerant is both wasteful and, for a flammable or high-pressure blend, dangerous.</p></div>
<div class="warning"><span class="callout-label">A held pressure test needs a temperature reading</span><p>Pressure falls when the ambient falls, and an overnight drop of a few degrees looks exactly like a small leak. Record pressure and temperature at the start and the end, or the test cannot be interpreted.</p></div>
<h3>Repairing a flare</h3>
<p>Remake it rather than tightening it. An over-tightened flare is cracked, and more torque makes it worse. Cut, deburr, re-flare with the correct tool, and a drop of refrigerant oil on the face.</p>`,
      Advanced: `<p>The leak rate determines the strategy. A system losing its charge in a week has a leak findable with bubbles in ten minutes. A system losing a quarter of its charge annually may need tracer dye, a longer electronic sweep, or a pressure test held for a day with temperature compensation.</p>
<div class="key-idea"><span class="callout-label">Temperature compensation, as arithmetic</span><p>Nitrogen behaves close to ideally, so held pressure scales with absolute temperature. A test at 30 bar absolute and 303 K read again at 293 K should read about 29 bar absolute with no leak at all. Judging that 1 bar as a leak condemns a sound system; ignoring a real 1 bar loss passes a leaking one.</p></div>
<h3>Detector technique determines whether the detector works</h3>
<p>Heated diode and infrared detectors have a response time and a recovery time. Moving faster than a few centimetres per second passes the leak before the sensor responds, and a sensor saturated by a large leak reads nothing for a minute afterwards. Working slowly, underneath the joint where the gas falls, and in still air is most of the skill.</p>
<h3>Repair against replacement needs a judgement</h3>
<div class="warning"><span class="callout-label">Where repair is the wrong answer</span><p>A corroded coil with one visible pinhole has others forming. Repairing it produces a return visit within the season, and the honest recommendation is coil replacement with the cost stated plainly. Repeated small repairs on an aged coil is how a customer spends more than a replacement would have cost.</p></div>`,
      Expert: `<p>Regulatory context matters commercially. Recovery is mandatory, deliberate venting is an offence, and above threshold charges there are leak-check frequency and record-keeping obligations. For the systems in this course the binding practical rule is simpler: recover, repair, prove the repair, and record what you did.</p>
<h3>Repeated leaks are usually a design or installation fault</h3>
<div class="key-idea"><span class="callout-label">What to look for after the second leak at the same site</span><p>Unsupported pipework vibrating at the compressor's running frequency, a line set with no expansion allowance across a long run, flares made with a worn tool, or a route that lets a pipe rest on a sharp edge. Fixing the fourth flare is treating a symptom whose cause is in the bracket spacing.</p></div>
<h3>The environmental arithmetic belongs in the customer conversation</h3>
<p>Common HFC blends have global warming potentials in the hundreds to low thousands, so a few kilograms lost is tonnes of carbon dioxide equivalent. Stating that number, alongside the cost of the gas and the cost of the repeat visit, is what converts a top-up request into agreement to find the leak. It is also the argument that lands with corporate customers who have reporting obligations of their own.</p>
<h3>Proof of repair is a separate test from the diagnosis</h3>
<p>A standing nitrogen test, timed and temperature-compensated, after the repair and before evacuation, is the only evidence the repair worked. Skipping it means the next evidence is the customer's callback, by which time a full charge has been lost and the labour spent twice.</p>
<div class="field"><span class="callout-label">Why dye is a last resort rather than a convenience</span><p>Tracer dye contaminates the oil, is not approved by every manufacturer, and complicates later compressor warranty claims. It is the right answer for a genuinely intermittent leak that has survived two proper sweeps, and the wrong answer as a first step.</p></div>`,
    },
    labs: [
      {
        n: 1,
        title: "Nitrogen pressure test and leak location",
        objective:
          "Prove whether a system is tight, and if it is not, locate the escape point without venting refrigerant into the atmosphere.",
        ppe: [
          "Safety glasses, mandatory throughout: nitrogen is at high pressure and a fitting can let go",
          "Gloves, for handling cold fittings and sharp copper",
          "Hearing protection if working near a running outdoor fan",
          "The regulator inspected for damage, and the cylinder secured upright and chained",
        ],
        tools: [
          "Dry nitrogen cylinder with a two-stage regulator",
          "Manifold gauge set",
          "Recovery machine and a recovery cylinder",
          "Electronic refrigerant leak detector",
          "Bubble solution and a brush",
          "Torque wrench and flaring tools",
        ],
        steps: [
          {
            n: 1,
            title: "Recover the remaining charge before anything else",
            detail:
              "<p>Whatever is left in the system goes into a recovery cylinder, not into the air. Record the weight recovered: comparing it against the plate charge tells you how much has been lost and therefore roughly how fast the leak is.</p><p>Venting is illegal in most jurisdictions and it also throws away the single most useful measurement available on this job.</p>",
            tools: ["Recovery machine", "Recovery cylinder", "Scales"],
            minutes: 25,
          },
          {
            n: 2,
            title: "Inspect for oil staining before you reach for an instrument",
            detail:
              "<p>Look at every flare joint at both units, the service ports, the brazed joints and the coil returns. Oil circulates with the refrigerant and stays behind at the escape point, so a damp or dusty oily patch is a located leak before any detector has been switched on.</p><p>Start at the flares. On a residential split they account for the majority of leaks, because they are mechanical joints that were made on site.</p>",
            minutes: 10,
          },
          {
            n: 3,
            title: "Connect the regulator and set the test pressure",
            detail:
              "<p>Fit the two-stage regulator to the nitrogen cylinder and set the outlet to the manufacturer's stated test pressure for this system. Connect through the manifold to both service ports so the whole circuit is pressurised.</p>",
            hazard: {
              level: "danger",
              text: "Never connect a nitrogen cylinder without a regulator. Cylinder pressure is well over a hundred bar and will rupture the system, the gauges or the hose instantly. Set the regulator before opening the cylinder valve, and open it slowly.",
            },
            tools: ["Two-stage regulator", "Manifold"],
            minutes: 8,
          },
          {
            n: 4,
            title: "Pressurise and record the starting pressure and temperature",
            detail:
              "<p>Bring the system up to test pressure, close the manifold valves and shut the cylinder. Write down the pressure and the ambient temperature.</p><p>The temperature is not optional. A system pressurised in the morning and read in the afternoon will show a rise purely from heating, and one read after sunset will show a fall that looks exactly like a leak.</p>",
            reading: {
              label: "Starting test pressure",
              unit: "bar",
              min: 20,
              max: 42,
              hint: "Below the manufacturer's stated test pressure a small leak may not show at all. Well above it risks damaging a low side component rated lower than the high side.",
            },
            minutes: 6,
          },
          {
            n: 5,
            title: "Hold and watch",
            detail:
              "<p>Leave the system under pressure for at least an hour, longer if you suspect a slow leak. Use the time for other work on site rather than standing over the gauge.</p><p>Re-read the pressure and the ambient temperature together. A pressure that has fallen with the temperature unchanged is a leak; a pressure that has fallen alongside a temperature fall may be nothing at all.</p>",
            minutes: 60,
          },
          {
            n: 6,
            title: "Hunt with the electronic detector",
            detail:
              "<p>If the pressure dropped, add a small trace of refrigerant to the nitrogen so the detector has something to respond to, or use an ultrasonic detector which responds to the flow itself and does not care what gas it is.</p><p>Move the probe slowly along the pipework, below joints rather than above them where the gas is heavier than air. The detector narrows an area; it does not confirm a joint, because it responds to a plume rather than to a point.</p>",
            tools: ["Electronic leak detector"],
            minutes: 20,
          },
          {
            n: 7,
            title: "Confirm with bubble solution",
            detail:
              "<p>Brush soap solution onto the suspect joint and watch. A growing bubble is unambiguous in a way that a detector alarm is not.</p><p>A detector reading you cannot reproduce with soap is not a located leak. Chasing one is how an afternoon disappears, and the usual explanation is a drifted sensor or a plume from a leak somewhere else entirely.</p>",
            tools: ["Bubble solution", "Brush"],
            minutes: 15,
          },
          {
            n: 8,
            title: "Repair, and ask why it leaked there",
            detail:
              "<p>Remake the flare: square cut, deburr with the tube pointing down so swarf falls out, correct block, a film of refrigerant oil on the face, and torque to the manufacturer's figure.</p><p>Then look at why that joint failed. An unsupported pipe run, thermal cycling on a rigid connection or a condensate drip onto the fitting will defeat a correctly made joint, and remaking it identically simply schedules the next failure.</p>",
            hazard: {
              level: "warning",
              text: "Overtightening a flare thins and cracks it. A joint torqued by feel is the most common cause of a connection that leaks slowly from the day it was made.",
            },
            capture: { label: "The remade joint, with the torque wrench in frame", medium: "photo" },
            tools: ["Flaring block", "Torque wrench", "Deburring tool"],
            minutes: 30,
          },
          {
            n: 9,
            title: "Re-test before you believe the repair",
            detail:
              "<p>Pressurise again to test pressure and hold. A repair that has not been re-tested is a hypothesis.</p>",
            reading: {
              label: "Pressure after one hour of the re-test",
              unit: "bar",
              min: 20,
              max: 42,
              hint: "Any fall at constant temperature means either the repair did not take or there is a second leak. Multiple leaks on an aged system is a replacement conversation rather than another repair.",
            },
            minutes: 65,
          },
        ],
        skills: ["Nitrogen pressure test", "Leak detection", "Flare joint", "Bubble solution"],
      },
    ],
    evidence: [
      {
        n: 1,
        title: "Locate and confirm a leak on camera",
        brief: `<p>On a training rig or a system you have permission to work on, create or find a leak at a flare joint, locate it, confirm it with bubble solution and remake the joint.</p>
<p>If you are using a rig, loosening a flare slightly is an acceptable way to produce a leak. Say so in your note. Do not vent refrigerant to create one: pressurise with nitrogen and a trace, or use the rig's own test gas.</p>
<p><strong>The confirmation is the assessment.</strong> An assessor cannot grade a detector beeping, because a detector alarm is not a located leak. What can be graded is a bubble growing at a specific joint, filmed, with the joint identifiable.</p>`,
        captures: [
          {
            key: "setup",
            medium: "photo",
            label: "The test setup",
            mustShow:
              "The nitrogen cylinder with its regulator fitted and the gauge reading the test pressure, with your enrolment number on paper in the frame.",
          },
          {
            key: "bubble",
            medium: "video",
            label: "The leak confirmed with bubble solution",
            seconds: 45,
            mustShow:
              "One continuous shot of the solution being brushed on and a bubble forming, close enough that the specific joint is identifiable rather than just a length of pipe.",
          },
          {
            key: "flare",
            medium: "photo",
            label: "The remade flare before assembly",
            mustShow:
              "The flared end itself, close up, showing an even unsplit face and no visible swarf or scoring.",
          },
          {
            key: "retest",
            medium: "photo",
            label: "The re-test holding",
            mustShow:
              "The gauge at test pressure with a clock or timestamp visible, proving the hold rather than asserting it.",
          },
        ],
        integrity: [
          "My enrolment number is on paper and visible in the setup photograph.",
          "The bubble clip is one continuous recording, because a cut between brushing and bubbling would prove nothing.",
          "The joint in the bubble clip is the same joint shown remade in the flare photograph.",
          "I have stated in my note whether this was a training rig and how the leak was produced.",
        ],
        rubric: [
          {
            key: "method",
            label: "The leak was located by method rather than by luck",
            bands: [
              "A joint was remade with no evidence it was leaking",
              "A detector alarm is shown but never confirmed by soap",
              "The leak is located and confirmed with bubble solution",
              "Located, confirmed, and the search shows the cheap checks done first: visual inspection for oil staining before any instrument",
            ],
            weight: 3,
          },
          {
            key: "flarequality",
            label: "The remade flare would not become next year's leak",
            bands: [
              "Split, scored or visibly uneven flare face",
              "An acceptable face but assembled without a torque figure",
              "Even unsplit face, deburred, torqued to the manufacturer's figure",
              "All of that, plus evidence the cause of the original failure was addressed rather than just the joint remade",
            ],
            weight: 3,
          },
          {
            key: "retest",
            label: "The repair was verified, not assumed",
            bands: [
              "No re-test at all, so the repair is a hypothesis rather than a result",
              "Re-tested but with no record of the hold time or temperature",
              "Re-tested at pressure with the hold evidenced",
              "Re-tested with both pressure and ambient temperature recorded at start and end, so the result accounts for thermal change",
            ],
            weight: 2,
          },
          {
            key: "environment",
            label: "Nothing was vented",
            bands: [
              "Refrigerant was released to create or chase the leak",
              "Unclear from the evidence whether anything was vented",
              "Nitrogen used throughout, with any remaining charge recovered first",
              "Nitrogen used, charge recovered and weighed, and the recovered weight compared against the plate charge to estimate the loss",
            ],
            weight: 2,
          },
        ],
        exemplar: [
          {
            criterion: "The leak was located by method rather than by luck",
            band: 2,
            note: "The bubble is clear and the joint is identifiable, so the leak is genuinely confirmed. What is missing is the cheap step: no visual inspection for oil staining is shown, and on this rig there was a visible oily mark on the very joint that was eventually found with an instrument.",
          },
          {
            criterion: "Nothing was vented",
            band: 3,
            note: "Charge recovered and weighed before any work, the recovered 840 g compared against a 1,150 g plate charge, and that comparison used to argue the leak had been running for months. That is the measurement most submissions throw away.",
          },
        ],
        minutes: 60,
        skills: ["Leak detection", "Flare joint", "Nitrogen pressure test"],
      },
    ],
  },
  /* ===================================================================== */
  5092: {
    topicId: 5092,
    title: "Recovery, evacuation and weighed-in charging",
    summary:
      "The three operations that decide whether your repair lasts. Each one is skipped routinely, and each omission shows up months later as somebody else's fault.",
    concepts: ["Recovery", "Evacuation", "Micron", "Weighed-in charge", "Moisture"],
    glossary: {
      Recovery: "Removing refrigerant from a system into a cylinder rather than releasing it.",
      Evacuation: "Pulling a deep vacuum to remove air and boil off moisture before charging.",
      Micron: "The unit of vacuum used in this trade. 500 microns is a typical target; atmospheric pressure is about 760,000.",
      "Weighed-in charge": "Charging by measured mass to the manufacturer's figure, which is correct independently of the weather.",
      Moisture: "Water in the system, which combines with POE oil to form acids that attack winding insulation.",
      "Triple evacuation": "Evacuating, breaking the vacuum with dry nitrogen and repeating, to dilute stubborn moisture.",
    },
    body: {
      Beginner: `<p>After a repair that opened the system, three steps must happen in order before it can run.</p>
<table>
<tr><th>Step</th><th>Purpose</th></tr>
<tr><td>Recover</td><td>Get the old refrigerant out into a cylinder, legally</td></tr>
<tr><td>Evacuate</td><td>Pull a deep vacuum to remove air and moisture</td></tr>
<tr><td>Weigh in</td><td>Put in exactly the charge the nameplate states</td></tr>
</table>
<div class="key-idea"><span class="callout-label">Why the vacuum matters</span><p>Moisture inside a refrigeration system turns into acid, and acid eats the compressor's windings from the inside. The vacuum boils the water out. Rushing it is how a compressor fails two years later for no visible reason.</p></div>
<h3>Measure the vacuum properly</h3>
<p>A gauge needle resting on zero means nothing. You need a micron gauge, and you are aiming for 500 microns or lower, held after the pump is valved off.</p>
<div class="warning"><span class="callout-label">Weigh the charge, do not guess it</span><p>Scales, the nameplate figure, plus the manufacturer's allowance for extra pipe length. Charging by pressure gives a different answer on a different day.</p></div>`,
      Intermediate: `<p>Each step has a measurable endpoint, and that is what separates a procedure from a ritual.</p>
<h3>The endpoints</h3>
<table>
<tr><th>Step</th><th>Done when</th></tr>
<tr><td>Recovery</td><td>Cylinder weight accounts for the charge; system at or near atmospheric</td></tr>
<tr><td>Evacuation</td><td>Under 500 microns, and it holds after valve-off</td></tr>
<tr><td>Charging</td><td>Scales show the nameplate charge plus the line-length allowance</td></tr>
</table>
<div class="key-idea"><span class="callout-label">The decay test is the actual test</span><p>Reaching 500 microns with the pump running proves the pump works. Valving off and watching the reading is what proves the system. Rising and settling around 1000 to 2000 microns means moisture is still boiling off. Rising without settling means a leak.</p></div>
<h3>Why vacuum time is mostly plumbing</h3>
<p>A quarter-inch hose through a service port is a restriction, and the conductance of the path sets the pump-down time far more than the pump's rating does. Short large-bore hoses onto both service ports, with the core removal tools fitted, turn an hour into fifteen minutes with the same pump.</p>
<div class="warning"><span class="callout-label">Line-length allowance is not optional</span><p>A manufacturer specifies a base charge for a stated line length and grams per additional metre. A ten metre run charged to the base figure is undercharged by a measurable fraction, and the system will read like a leaking one for its whole life.</p></div>`,
      Advanced: `<p>The physics behind the 500 micron target is the saturation pressure of water. At around 4000 microns water boils near 0 degrees Celsius; below 500 microns it boils well below any temperature in the system, so liquid water cannot persist. The target is not a convention, it is the condition under which moisture must leave.</p>
<div class="key-idea"><span class="callout-label">Which explains cold-weather evacuation</span><p>Ice in a low-point trap will not sublime in any reasonable time at ambient. Gentle warming of the pipework, or the manufacturer's triple-evacuation with dry nitrogen breaks between pulls, is the method. Pulling longer at a reading that has stalled achieves nothing.</p></div>
<h3>Interpreting the decay curve</h3>
<table>
<tr><th>After valve-off</th><th>Diagnosis</th></tr>
<tr><td>Holds under 500</td><td>Dry and tight; charge it</td></tr>
<tr><td>Rises and plateaus around 1500</td><td>Moisture remaining; keep pulling or break with nitrogen</td></tr>
<tr><td>Rises steadily without plateau</td><td>A leak, including a leaking gauge set</td></tr>
</table>
<h3>Oil management is part of recovery</h3>
<p>Recovered refrigerant carries oil, and a system that has had a burnout carries acid with it. Reusing that refrigerant, or leaving contaminated oil in a replaced compressor's circuit, transfers the cause of the failure into the new compressor. A suction line drier and an oil change are the difference between a repair and a deferred repeat.</p>
<div class="warning"><span class="callout-label">Micron gauge placement changes the reading</span><p>A gauge on the pump side of the manifold reads the pump's vacuum, not the system's, and will show 300 microns while the system sits at 3000. It belongs at the system, as far from the pump as the connections allow.</p></div>`,
      Expert: `<p>Evacuation time scales with the conductance of the connection path and the volume and internal surface area being pumped, which is why the dominant lever is hose diameter and length rather than pump displacement. Doubling hose bore has more effect than doubling the pump, and removing the Schrader cores has more effect than either.</p>
<div class="key-idea"><span class="callout-label">The single highest-value habit</span><p>Core removal tools on both ports, short large-bore hoses, micron gauge at the system. It converts evacuation from the step everybody shortens into one that finishes while you tidy the site.</p></div>
<h3>The failure mechanism this prevents, named precisely</h3>
<p>Water hydrolyses ester and mineral oils and reacts with the refrigerant to form hydrofluoric and hydrochloric acid, which attacks winding insulation and copper. The resulting copper plating on bearing surfaces and the insulation breakdown both present, years later, as a compressor that failed for no apparent reason. The causal chain from a shortened evacuation to that failure is long enough that the technician who caused it is never the one who sees it, which is exactly why the step is shortened.</p>
<h3>Weighed-in charging is the only condition-independent method</h3>
<p>Superheat and subcooling targets are functions of load and ambient; a weighed charge is not. Charging by weight and then confirming with superheat and subcooling gives you both a correct charge and a working-order check, and the order matters: confirmation after, never instead.</p>
<div class="field"><span class="callout-label">Record the four numbers</span><p>Recovered weight, final vacuum, decay after valve-off, charge weighed in. Those four lines on a service report make the next technician's visit a comparison, prove the work was done to standard if it is ever questioned, and are the only defence if a compressor fails inside warranty and the manufacturer asks how the system was commissioned.</p></div>`,
    },
    labs: [
      {
        n: 1,
        title: "Recover, evacuate and weigh in a charge",
        objective:
          "Take a system from a completed repair to a correctly charged running state, with each step measured rather than assumed.",
        ppe: [
          "Safety glasses throughout, including during cylinder handling",
          "Gloves rated for refrigerant contact, because liquid causes instant frostbite",
          "Cylinders upright, secured and never heated with a flame",
          "The refrigerant identified from the data plate, and recovery equipment rated for it",
        ],
        tools: [
          "Recovery machine and a recovery cylinder rated for this refrigerant",
          "Two-stage vacuum pump with fresh oil",
          "Micron gauge",
          "Core removal tools and three eighths hoses",
          "Electronic charging scales",
          "New filter drier",
        ],
        steps: [
          {
            n: 1,
            title: "Weigh the recovery cylinder before you start",
            detail:
              "<p>Put the empty recovery cylinder on the scales and record the tare weight. Check it is rated for this refrigerant and is not already near its fill limit.</p><p>Without this number you cannot weigh what you recover, and what you recover against the plate charge is the only measurement that tells you how much the system had lost.</p>",
            tools: ["Charging scales"],
            minutes: 5,
          },
          {
            n: 2,
            title: "Recover the charge into the cylinder",
            detail:
              "<p>Connect the recovery machine and pull the system down to the level your machine and local rules require. Monitor the cylinder weight as you go.</p><p>Nothing goes to atmosphere. Beyond the legal position, a vented charge is a measurement destroyed.</p>",
            hazard: {
              level: "danger",
              text: "Never fill a recovery cylinder beyond 80 per cent of its water capacity. Liquid refrigerant expands with temperature and a hydraulically full cylinder can rupture. Watch the scales rather than the gauge.",
            },
            tools: ["Recovery machine", "Recovery cylinder"],
            minutes: 35,
          },
          {
            n: 3,
            title: "Record what came out",
            detail:
              "<p>Weigh the cylinder again and subtract the tare. Compare the result against the data plate charge plus any line length allowance.</p><p>A system that should hold 1,230 g and gives up 840 g has lost nearly a third of its charge, which points at a leak that has been running for months rather than a recent event.</p>",
            reading: {
              label: "Refrigerant recovered",
              unit: "g",
              min: 200,
              max: 2500,
              hint: "A recovered mass far below the plate charge confirms a substantial loss. A recovered mass above it means the system was overcharged, which is its own fault and worth recording.",
            },
            minutes: 5,
          },
          {
            n: 4,
            title: "Replace the filter drier",
            detail:
              "<p>Fit a new drier whenever the system has been open. The old one has already absorbed what it was going to absorb, and a saturated drier releases moisture back into the circuit rather than holding it.</p><p>If the system has suffered a compressor burnout, fit a burnout-rated drier and plan an acid test after a period of running.</p>",
            tools: ["New filter drier", "Brazing equipment or flare tools"],
            minutes: 25,
          },
          {
            n: 5,
            title: "Remove the Schrader cores and connect wide hoses",
            detail:
              "<p>Fit core removal tools at both service ports and use three eighths hoses to the pump. Keep the hose runs short.</p><p>This is the step that decides whether evacuation takes twenty minutes or four hours. At vacuum, flow through a quarter inch hose past a Schrader core is severely restricted, and technicians who conclude their pump is tired are almost always looking at a conductance problem rather than a pump problem.</p>",
            tools: ["Core removal tools", "Three eighths hoses"],
            minutes: 10,
          },
          {
            n: 6,
            title: "Evacuate to target, measuring at the system",
            detail:
              "<p>Run the pump and watch the micron gauge, which must be connected at the system rather than beside the pump. A gauge at the pump reads the pump's inlet and tells you nothing about the circuit.</p><p>Target 500 microns. Water boils at room temperature well above that figure, so the target is not about boiling water: it is about leaving enough margin for the standing test to mean something.</p>",
            reading: {
              label: "Vacuum achieved",
              unit: "microns",
              min: 50,
              max: 500,
              hint: "Stalling above 1,000 microns usually means moisture still boiling, a leak, or a conductance restriction. Isolate the pump and read the curve to tell them apart.",
            },
            tools: ["Vacuum pump", "Micron gauge"],
            minutes: 45,
          },
          {
            n: 7,
            title: "Stand the vacuum and read the curve, not the endpoint",
            detail:
              "<p>Valve off the pump and watch the micron gauge for at least ten minutes.</p><p>A reading that rises and then plateaus is moisture still coming off and reaching equilibrium: keep pumping, or break the vacuum with dry nitrogen and repeat. A reading that rises steadily and does not plateau is a leak, and no amount of further pumping will fix it.</p><p>Reading only the final number collapses those two very different diagnoses into one.</p>",
            hazard: {
              level: "warning",
              text: "Do not break a vacuum with air or with oxygen. Use dry nitrogen only. Introducing oxygen into a system containing oil at pressure creates a genuine explosion hazard.",
            },
            reading: {
              label: "Rise after ten minutes standing",
              unit: "microns",
              min: 0,
              max: 200,
              hint: "A rise beyond a couple of hundred microns means the system is not ready to charge. Decide from the shape of the curve whether you are fighting moisture or a leak.",
            },
            minutes: 12,
          },
          {
            n: 8,
            title: "Weigh in the charge",
            detail:
              "<p>Put the refrigerant cylinder on the scales, zero them, and charge the plate figure plus the line length allowance. Charge liquid into the high side with the system off, or follow the manufacturer's stated method.</p><p>Charging to a target pressure is how systems end up overcharged in summer and undercharged in winter. Pressure is a function of ambient and load as much as of mass, and the plate figure is not.</p>",
            reading: {
              label: "Charge weighed in",
              unit: "g",
              min: 400,
              max: 2500,
              hint: "Check against the plate charge plus the allowance for line length beyond the standard run. Charging the allowance for the whole line rather than for the excess is the usual overcharge error.",
            },
            tools: ["Charging scales", "Refrigerant cylinder"],
            minutes: 20,
          },
          {
            n: 9,
            title: "Run and confirm with superheat and subcooling",
            detail:
              "<p>Start the system, let it settle for fifteen minutes, and take both numbers. They should land in their normal bands.</p><p>These confirm the weighed charge; they do not replace it. If they are badly out after a correct weigh-in, the problem is something other than charge and adding refrigerant will not fix it.</p>",
            reading: {
              label: "Superheat after settling",
              unit: "K",
              min: 4,
              max: 12,
              hint: "Outside this band after a correctly weighed charge points at airflow, the expansion device or a restriction rather than at the amount of refrigerant in the system.",
            },
            minutes: 20,
          },
          {
            n: 10,
            title: "Record every number before you leave",
            detail:
              "<p>Write down the recovered mass, the evacuation endpoint, the standing test result, the weighed charge, and the final superheat and subcooling.</p><p>This converts a repair into a measurement of the system's condition. A system whose recovered charge falls visit on visit has a leak nobody has found; one whose evacuation takes progressively longer has a developing moisture or restriction problem. Neither signal exists if the record only lists the parts fitted.</p>",
            capture: { label: "Your completed job record with all six figures", medium: "photo" },
            minutes: 8,
          },
        ],
        skills: ["Recovery", "Evacuation", "Micron", "Weighed-in charge", "Moisture"],
      },
    ],
    evidence: [
      {
        n: 1,
        title: "Film the evacuation and the standing test",
        brief: `<p>Evacuate a system or a training rig and film the part that cannot be faked: the standing vacuum test.</p>
<p>Anybody can photograph a micron gauge reading 400. What an assessor needs to see is the pump being valved off and the gauge watched over several minutes, because the shape of that curve is the whole diagnosis. A rise that plateaus is moisture; a rise that keeps going is a leak.</p>
<p>Also show your connection method. Evacuation time is dominated by conductance rather than by pump capacity, and an assessor can tell from one photograph whether you were ever going to reach target in reasonable time.</p>`,
        captures: [
          {
            key: "connection",
            medium: "photo",
            label: "How the pump is connected",
            mustShow:
              "The core removal tools fitted and the hose diameter visible, with the micron gauge connected at the system rather than at the pump. Enrolment number on paper in frame.",
          },
          {
            key: "standing",
            medium: "video",
            label: "The standing vacuum test",
            seconds: 180,
            mustShow:
              "One continuous shot: the pump valved off, then the micron gauge readout for at least three minutes, with the number legible throughout so the curve can be read.",
          },
          {
            key: "scales",
            medium: "photo",
            label: "The charge being weighed in",
            mustShow:
              "The cylinder on the scales with the readout legible, and the data plate charge figure visible in the same frame or in a second photo of the plate.",
          },
          {
            key: "confirm",
            medium: "photo",
            label: "Superheat and subcooling after settling",
            mustShow: "Manifold and both probe readings in one frame with the system running.",
          },
        ],
        integrity: [
          "My enrolment number is on paper and visible in the connection photograph.",
          "The standing test is one unbroken recording with the gauge legible throughout, because the curve is the evidence and a still frame is not.",
          "The scales reading and the data plate figure are both evidenced, so the charge can be checked against the specification rather than taken on trust.",
          "This is the same system in every capture, and I have said in my note whether it was a rig.",
        ],
        rubric: [
          {
            key: "conductance",
            label: "The connection method would reach target in reasonable time",
            bands: [
              "Quarter inch hoses through Schrader cores, which will stall well above target",
              "Wide hoses but cores left in, or a long hose run",
              "Cores removed and wide short hoses to the pump",
              "All of that, with the micron gauge at the system rather than at the pump, so the reading describes the circuit",
            ],
            weight: 3,
          },
          {
            key: "standing",
            label: "The standing test is performed and interpreted",
            bands: [
              "No standing test; the pump endpoint is presented as the result",
              "The pump is valved off but watched too briefly to show a curve",
              "Valved off and watched long enough for the curve to be read",
              "Watched and interpreted in the note: plateau means moisture, continuous rise means a leak, and the learner says which they saw",
            ],
            weight: 3,
          },
          {
            key: "charge",
            label: "The charge is weighed rather than guessed",
            bands: [
              "Charged to a pressure, or no weight evidenced",
              "Weighed but with no reference to the data plate figure",
              "Weighed to the plate figure",
              "Weighed to the plate figure plus a correctly computed line length allowance, with the arithmetic shown",
            ],
            weight: 2,
          },
          {
            key: "record",
            label: "The numbers are recorded as a measurement of the system",
            bands: [
              "No figures recorded beyond what the photographs happen to show",
              "Some figures noted without context",
              "Recovered mass, endpoint, standing result and charge all recorded",
              "All recorded, plus a comparison of recovered mass against the plate charge to quantify what had been lost",
            ],
            weight: 2,
          },
        ],
        exemplar: [
          {
            criterion: "The standing test is performed and interpreted",
            band: 3,
            note: "Three and a half minutes of continuous gauge, rising from 410 to 520 and then flat. The note reads: plateau, so residual moisture rather than ingress, pumped a further twenty minutes and re-stood at 380 holding. That is a diagnosis rather than a number.",
          },
          {
            criterion: "The connection method would reach target in reasonable time",
            band: 0,
            note: "Quarter inch hoses straight onto the service ports with the cores still in. The gauge in the video reads 2,100 microns after ninety minutes, and the learner has concluded the pump needs servicing. The pump is fine; the restriction is the cores.",
          },
        ],
        minutes: 55,
        skills: ["Evacuation", "Micron", "Weighed-in charge", "Moisture"],
      },
    ],
  },

  /* ===================================================================== */
  5093: {
    topicId: 5093,
    title: "The handover: report, invoice and what you promise",
    summary:
      "The last ten minutes decide whether you are called back, recommended, or argued with. It is a technical skill and it is assessed as one.",
    concepts: ["Service report", "Scope of work", "Warranty", "Customer expectation", "Recommendation"],
    glossary: {
      "Service report": "The written record of what was found, what was done, and what was measured.",
      "Scope of work": "What the visit covered and, just as importantly, what it did not.",
      Warranty: "What you are standing behind, for how long, and under what conditions.",
      "Customer expectation": "What the customer believes will happen next, which is set by what you said rather than by what you meant.",
      Recommendation: "Work you are advising but have not done, recorded so that declining it is the customer's decision.",
      "Root cause": "Why the fault happened, as distinct from what was replaced.",
    },
    body: {
      Beginner: `<p>The repair is not finished when the unit runs. The customer needs to know what was wrong, what you did, and what still needs attention.</p>
<h3>What goes on the report</h3>
<table>
<tr><th>Line</th><th>Example</th></tr>
<tr><td>What was wrong</td><td>Run capacitor measured 31 microfarad, rated 45</td></tr>
<tr><td>What you did</td><td>Replaced with 45 microfarad; confirmed starting</td></tr>
<tr><td>Proof it works</td><td>Supply air 14 C, return air 25 C</td></tr>
<tr><td>What you did not do</td><td>Condenser coil needs cleaning; quoted separately</td></tr>
</table>
<div class="key-idea"><span class="callout-label">Say what you did not do</span><p>A customer who discovers an uncleaned coil next month assumes you missed it. Written down, the same fact is a recommendation they chose to defer.</p></div>
<div class="warning"><span class="callout-label">Promise only what you fixed</span><p>Replacing a capacitor does not warrant the compressor. Saying so at the door costs a sentence; not saying so costs an argument.</p></div>`,
      Intermediate: `<p>The handover manages the gap between what was repaired and what the customer believes was repaired, and almost every dispute in this trade lives in that gap.</p>
<h3>Three things to separate explicitly</h3>
<table>
<tr><th>Separate</th><th>Because</th></tr>
<tr><td>The fault you fixed</td><td>That is what the invoice covers</td></tr>
<tr><td>Conditions you observed and did not address</td><td>They are recommendations, and the customer decides</td></tr>
<tr><td>What your work is warranted against</td><td>The part and its fitting, not the rest of the system</td></tr>
</table>
<div class="key-idea"><span class="callout-label">The proof number is the most useful line on the report</span><p>Supply and return air temperatures, taken after the repair, are evidence the system was working when you left. Without them, a complaint a week later is your word against theirs.</p></div>
<h3>Recommendations need a consequence, not an adjective</h3>
<p>"Condenser coil dirty" invites nothing. "Condenser coil heavily fouled; this raises running cost and shortens compressor life; cleaning quoted at X" lets somebody make a decision. Most deferred maintenance is deferred because it was never explained in terms of a cost.</p>
<div class="warning"><span class="callout-label">Do not diagnose beyond your evidence on paper</span><p>Writing "compressor failing" when you measured a high current draw and nothing else creates an expectation and a liability. Record the measurement; state the concern as a concern.</p></div>`,
      Advanced: `<p>Scope of work is the operative concept, and the discipline is to write down its boundary before it is tested. A report that states the fault addressed, the evidence for it, the verification after, and the conditions outside scope is close to unarguable; one that says "serviced AC unit" is an invitation.</p>
<div class="key-idea"><span class="callout-label">Why this matters more in this trade than in most</span><p>A refrigeration system has several components whose failure produces the same complaint, so a correct repair of one fault is routinely followed by a different fault with identical symptoms. Without a written scope, the second fault reads to the customer as the first one recurring, and the second invoice reads as being charged twice.</p></div>
<h3>Expectation setting is a technical skill</h3>
<p>A unit that is correctly repaired but undersized for the room will not hold setpoint, and the customer will experience that as a failed repair. Saying at the door that cooling will improve but the unit is below the load the room now has, and recording it, is the difference between a satisfied customer and a dispute in which you are technically right.</p>
<h3>The numbers you record become the fleet's history</h3>
<p>Split, superheat, subcooling, running current and capacitance, logged visit after visit, turn maintenance from a calendar exercise into a condition-based one: a capacitor losing ten per cent a year is visible in the trend and can be replaced on a planned visit rather than an emergency one. That capability exists only if the numbers were written down, and it is the main commercial argument for a disciplined report.</p>`,
      Expert: `<p>Treat the report as the deliverable rather than as administration, because it is the only part of the visit that persists. The repair is consumed; the record is an asset to the customer, to the next technician, and to you if the work is ever questioned.</p>
<div class="key-idea"><span class="callout-label">The four elements that make a report defensible</span><p>Measured evidence for the diagnosis, the action taken, measured verification afterwards, and an explicit list of what was outside scope. Each one answers a question that gets asked later, and all four fit on one page.</p></div>
<h3>Where honesty and commercial interest actually align</h3>
<p>A technician who recommends replacement when replacement is right earns more trust, and more repeat work, than one who sells a third repair into a system that will not improve. The failure mode is not dishonesty so much as reluctance to deliver bad news, and the remedy is to present it as arithmetic: the cost of this repair, the probability and cost of the next one, against the cost of replacement. Customers accept numbers they can check.</p>
<h3>Refrigerant records are a compliance artefact, not a courtesy</h3>
<p>Quantities recovered and charged, with date, system and technician, are required for systems above the regulatory threshold and are good practice below it. They are also the evidence that distinguishes a system with a slow leak from one that was undercharged at commissioning, which is a question that cannot be answered retrospectively any other way.</p>
<div class="field"><span class="callout-label">The sentence that prevents most callbacks</span><p>Stating, out loud and in writing, what you did not fix and what you expect to happen next. It converts a future surprise into a prediction you made, and a technician who predicted it correctly is the one who gets called.</p></div>`,
    },
    scenarios: [
      {
        n: 1,
        title: "Ten minutes at the door",
        blurb:
          "The repair is done and the customer is reaching for her phone to pay. What you say now decides whether you are called back for the right reason or the wrong one.",
        role: "You are the technician finishing a job at a small clinic.",
        start: "h1",
        minutes: 12,
        idealPath: ["h1", "h2", "h3"],
        nodes: [
          {
            id: "h1",
            situation: `<p>You replaced a failed run capacitor, 31 microfarad against a marked 45. The unit is cooling properly: air split 13 K, superheat 7 K, subcooling 6 K.</p>
<p>While you were in the outdoor unit you noticed the condenser coil has corrosion through the lower third of the fin pack, and there is light oil staining at one of the flares. Neither is urgent today.</p>
<p>The practice manager is pleased, has her phone out, and says "so that is it sorted then?"</p>`,
            prompt: "What do you say?",
            choices: [
              {
                id: "a",
                label: "Explain the repair, then name both observations and what you expect from them",
                outcome:
                  "You say the capacitor had failed and the unit is now performing to specification, and that you also found corrosion in the lower third of the condenser and oil staining at a flare. You say the staining suggests a slow leak and that you would want to pressure test within a few months. She asks how much. You tell her, and she books it for next month.",
                next: "h2",
                delta: 3,
                cost: { minutes: 6 },
              },
              {
                id: "b",
                label: "Say yes, it is sorted",
                outcome:
                  "She pays and you leave. You have observed a developing leak and corrosion on a system you were inside, and said nothing. When it fails in August the clinic will ask why the technician who was there in April did not mention it, and the honest answer is that you did not.",
                next: "h4",
                delta: -3,
                cost: { minutes: 1 },
                violation:
                  "Conditions were observed and not reported, which transfers a known risk from the owner onto you by omission.",
              },
              {
                id: "c",
                label: "Mention the coil corrosion but not the oil staining",
                outcome:
                  "Half the picture. The corrosion is the slower problem and the staining is the one that will have the clinic without cooling in a heatwave. You have reported the less urgent of the two findings.",
                next: "h2",
                delta: 0,
                cost: { minutes: 4 },
              },
              {
                id: "d",
                label: "Tell her the whole system is on its last legs and should be replaced",
                outcome:
                  "Based on a corroded fin pack and one oily flare, on a unit that is now performing to specification on every measurement you took. She can tell the recommendation is not tied to anything you showed her, and the suspicion attaches to the capacitor you just charged her for as well.",
                next: "h4",
                delta: -2,
                cost: { minutes: 8 },
              },
            ],
          },
          {
            id: "h2",
            situation: `<p>She is satisfied and ready to pay. Then she asks the question every customer asks: "and it is under warranty now, yes?"</p>`,
            prompt: "How do you answer?",
            choices: [
              {
                id: "a",
                label: "Say exactly what is covered and what is not, and write it on the report",
                outcome:
                  "You say the capacitor and its fitting are covered for twelve months, and that this does not cover the rest of the system, including the leak you have just told her about. You write both sentences on the report. She reads it, nods, and signs.",
                next: "h3",
                delta: 3,
                cost: { minutes: 4 },
              },
              {
                id: "b",
                label: "Say yes, you are covered",
                outcome:
                  "She hears that the air conditioner is covered. In August the flare leaks, she calls expecting a free visit, and you have to explain a distinction you could have made in one sentence in April. That conversation costs you the customer whether or not you are right.",
                next: "h4",
                delta: -2,
                cost: { minutes: 1 },
              },
              {
                id: "c",
                label: "Say the part is covered and leave the rest unsaid",
                outcome:
                  "Accurate and incomplete. The distinction between a part and a system is obvious to you and is not obvious to her, which makes saying it your job rather than hers to infer.",
                next: "h3",
                delta: 1,
                cost: { minutes: 2 },
              },
            ],
          },
          {
            id: "h3",
            situation: `<p>You write the report: capacitor measured 31 µF against 45 marked, replaced, unit now at 13 K split with superheat 7 K and subcooling 6 K. Condenser corrosion noted in the lower third of the fin pack. Oil staining at the liquid line flare, consistent with a slow leak, pressure test recommended within three months and quoted. Warranty: the capacitor and its fitting, twelve months.</p>
<p>She signs it and books the pressure test.</p>`,
            prompt: "",
            ending: {
              verdict: "ideal",
              title: "Everything you saw is now somebody's decision rather than your secret",
              debrief: `<p>The repair was the easy part. What separated this handover was that both observations were reported, each tied to something you measured or saw, and both were written down.</p>
<p>Note what the writing does. A recommendation made verbally protects nobody: in three months neither of you will remember it, and if the coil fails the conversation is about whose recollection is right. Written on a signed report, declining it becomes the customer's documented decision and acting on it becomes a planned job. The same sentence does both.</p>
<p>The warranty answer matters more than its length suggests. "Yes you are covered" is heard as "the air conditioner is covered", and the distinction between a part and the system around it is obvious to you and invisible to her. Most disputes in this trade are expectation failures rather than workmanship failures, and they are set in exchanges exactly like this one.</p>
<p>Finally the measurements. "Unit now cooling" is an opinion. A 13 K split with 7 K superheat and 6 K subcooling is a baseline that the next technician can compare against, which means the clinic does not pay twice for the same diagnosis, and it is evidence that the system was performing to specification when you left. That last point is worth having on a job where you have also predicted a future leak.</p>`,
            },
          },
          {
            id: "h4",
            situation: `<p>The invoice is paid. Either the findings went unreported, or an expectation was set that the next visit will have to undo.</p>`,
            prompt: "",
            ending: {
              verdict: "poor",
              title: "The work was fine and the handover created the next problem",
              debrief: `<p>Saying nothing about the corrosion and the oil staining is the most serious of these, and it is tempting precisely because it feels like not making a fuss. You were inside the unit, you saw two developing faults, and you let a customer pay and walk away believing the system was sound. When it fails in August the question will be why the technician who was there in April did not mention it, and there is no good answer.</p>
<p>The broader point is that observing a condition and not reporting it transfers risk rather than avoiding it. The owner cannot plan for something they do not know about, and you cannot later claim it was outside your scope when you were looking at it.</p>
<p>The opposite error, recommending a full replacement on a corroded fin pack and one oily flare, fails for a different reason: nothing you said was tied to anything you measured. The unit was performing to specification on every number you took that morning. A recommendation without evidence is indistinguishable from a sales pitch, and the suspicion it creates attaches backwards to the repair you just charged for.</p>
<p>And "yes you are covered" is a sentence that will be quoted back to you. It costs one extra clause to say what is covered and what is not, and writing it on the report is what makes the clause survive three months.</p>`,
            },
          },
        ],
        skills: ["Service report", "Scope of work", "Warranty", "Recommendation"],
      },
    ],
    deliverables: [
      {
        n: 1,
        title: "A service report the next technician could work from",
        brief: `<p>Write up a complete service visit. Use a real job if you have one, or the clinic job from the scenario in this topic.</p>
<p>The test is not whether the report is tidy. It is whether a different technician, arriving at the same site in eight months knowing nothing, could read your report and start from where you finished rather than from nothing.</p>
<p><strong>What to submit</strong></p>
<ol>
<li>The service report itself.</li>
<li>A photograph of the data plate and of any defect you reported.</li>
<li>A short quotation for the work you recommended but did not do.</li>
</ol>
<p>Write the finding before the action, record what you measured after the repair as well as before, and separate the root cause from the part you fitted. Most reports in this trade list parts; almost none record why the part failed, which is the only line that stops the same repair recurring.</p>`,
        requires: [
          {
            key: "report",
            label: "The service report",
            formats: ["PDF", "DOCX"],
            note: "Reported fault, findings, work done, measurements after, root cause, scope, recommendations and warranty terms.",
          },
          {
            key: "photos",
            label: "Supporting photographs",
            formats: ["PDF", "JPG", "PNG"],
            note: "Data plate legible, plus an image of each defect you reported. A recommendation with a photograph attached is checkable.",
          },
          {
            key: "quote",
            label: "Quotation for recommended work",
            formats: ["PDF", "XLSX"],
            note: "Itemised, with the reason for each line tied to something in the report.",
          },
        ],
        rubric: [
          {
            key: "evidence",
            label: "Findings are measured rather than asserted",
            bands: [
              "States that the unit works, with no figures anywhere",
              "Some figures, but only the fault and not the post-repair condition",
              "Measurements before and after, so the repair is evidenced",
              "Measurements before and after plus a stated baseline the next visit can compare against, including the weighed charge where the circuit was opened",
            ],
            weight: 3,
          },
          {
            key: "cause",
            label: "Root cause is separated from the repair",
            bands: [
              "Lists the parts fitted and nothing else",
              "Names a cause but without evidence connecting it to the failure",
              "States the cause and the evidence for it, distinctly from the repair",
              "States the cause, the evidence, and what the customer should watch for or change so it does not recur",
            ],
            weight: 3,
          },
          {
            key: "boundaries",
            label: "Scope, warranty and recommendations are unambiguous",
            bands: [
              "No statement of what is covered or what was out of scope",
              "Warranty mentioned but not distinguished from the rest of the system",
              "Scope and warranty both stated clearly in writing",
              "Scope and warranty stated, and every recommendation recorded with its reason so that declining it is a documented decision",
            ],
            weight: 2,
          },
          {
            key: "usable",
            label: "A stranger could work from it",
            bands: [
              "Only intelligible to the person who wrote it",
              "Followable but missing the information a second technician would need",
              "A second technician could pick it up and continue",
              "A second technician could continue, and the customer could explain the repair to somebody else from it, which is what being evaluable means",
            ],
            weight: 2,
          },
        ],
        modelAnswer: `<p><strong>The shape that works.</strong> Reported fault, then findings, then work done, then measurements after, then cause, then scope and recommendations. Findings before actions, because the finding is what justifies the action. A report that says only "replaced capacitor" invites the question of why; one that records 31 µF against a marked 45 has answered it.</p>
<p><strong>The line almost nobody writes.</strong> Root cause, stated separately from the repair. "Replaced filter drier" is the repair. "Drier blocked following moisture ingress through a leaking liquid line flare, flare remade and pressure tested" is the cause, and only the second tells the next person what to watch. A service history listing parts is a log of symptoms treated, and a fleet managed from one keeps paying for the same repair.</p>
<p><strong>Measurements after, not just before.</strong> "Unit now cooling" is an opinion. Air split 13 K, superheat 7 K, subcooling 6 K, charge weighed in at 1,230 g is a baseline, and it does two jobs: it proves the system was performing to specification when you left, and it saves the next technician from paying for a diagnosis that has already been done.</p>
<p><strong>Recommendations with evidence attached.</strong> Not "the condenser should be replaced soon" but "corrosion through the lower third of the fin pack, photograph attached, subcooling currently 6 K but expect deterioration, recommend reassessment within twelve months". A recommendation tied to an observation is checkable, and a customer who can check it can trust it. This is also the discipline that separates you from the trade's oldest problem.</p>
<p><strong>Warranty in two clauses.</strong> What is covered, and what is not. "Capacitor and fitting, twelve months. This does not extend to the rest of the system, including the liquid line flare noted above." The distinction is obvious to you and invisible to the customer, which is exactly why writing it is your job. Most disputes in this trade are expectation failures rather than workmanship failures.</p>
<p><strong>One thing weaker submissions miss.</strong> Recording an observation you are not acting on. Noticing a corroded coil and saying nothing transfers a known risk from the owner onto you by omission, and a written note discharges it even where no work follows and the customer declines the quote.</p>`,
        minutes: 90,
        skills: ["Service report", "Root cause", "Scope of work", "Recommendation"],
      },
    ],
  },
};

export default curriculum;
