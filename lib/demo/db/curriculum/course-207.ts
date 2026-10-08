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
<p>Four parts, in a loop. The compressor squeezes the gas, which makes it hot and high pressure. The outdoor coil, the condenser, lets that heat escape to the air outside, and the gas turns into a liquid. Then a small restriction lets the liquid through into a low pressure area, and the pressure drop makes it very cold. That cold liquid goes to the indoor coil, the evaporator, where it boils and takes heat out of your room. Then back to the compressor.</p>
<p>The useful part is that boiling absorbs an enormous amount of heat. Warming water from 20 to 99 degrees takes far less energy than turning that same water into steam. Air conditioning runs on that effect, which is called latent heat.</p>
<p>So when you put gauges on a unit you are really asking two questions: is the pressure difference there, and is the refrigerant changing state where it is supposed to. Almost every fault you will meet is one of those two going wrong.</p>`,
      Intermediate: `<p>The cycle has two pressures and two state changes, and everything else is plumbing. The compressor raises suction pressure to discharge pressure, the condenser rejects heat and condenses vapour to liquid, the expansion device drops the pressure, and the evaporator absorbs heat and boils liquid to vapour. The refrigerant is a transport medium, not a consumable, and in a sealed system it is never used up.</p>
<p>Saturation is the concept that makes gauge readings mean something. At any given pressure a refrigerant has one temperature at which it changes state, and a pressure-temperature chart converts between them. Measure the pressure, read the saturation temperature off the chart, and compare it with the actual pipe temperature: the difference tells you which state the refrigerant is actually in.</p>
<p>That gives two diagnostic numbers. Superheat is the suction line temperature minus the saturation temperature at suction pressure, and it proves the refrigerant finished boiling before it left the evaporator. Subcooling is the saturation temperature at discharge pressure minus the liquid line temperature, and it proves condensation finished before the liquid reached the expansion device.</p>
<p>Both matter for the compressor's survival. Zero superheat means liquid is reaching a pump designed for vapour, and liquid does not compress. That is the mechanism behind most compressor failures that get blamed on the compressor.</p>`,
      Advanced: `<p>Plot the cycle on a pressure-enthalpy diagram and the diagnosis becomes geometric. Compression is a near-vertical line to the right of the saturated vapour curve, condensation is horizontal across the dome, expansion is a vertical drop at constant enthalpy, and evaporation is horizontal back across the dome. The refrigeration effect is the horizontal length of the evaporation line, the work input is the height of the compression line, and their ratio is the coefficient of performance. Every fault moves one of those lines in a predictable direction.</p>
<p>The constant-enthalpy expansion is worth dwelling on because it is counterintuitive. No heat is removed at the expansion device and no work is extracted, yet the refrigerant leaves much colder. The temperature drop is paid for by a fraction of the liquid flashing to vapour, and that flash gas does no useful cooling. Which is why subcooling matters commercially as well as mechanically: more subcooling means less flash gas and more of the evaporator doing work, so capacity rises without any extra compressor effort.</p>
<p>Expansion device choice changes what the readings mean. A fixed orifice or capillary system has no feedback, so superheat varies with load and ambient and a single reading is only interpretable alongside both. A thermostatic or electronic expansion valve modulates to hold superheat roughly constant, which means a persistently wrong superheat on a valve system points at the valve or its sensing bulb rather than at the charge.</p>
<p>The common analytical error is treating pressures as the diagnosis. Pressure alone is ambiguous: low suction can mean undercharge, a restriction, a dirty filter, low airflow or a failing compressor. Pressures with their corresponding superheat and subcooling resolve most of that ambiguity, because the two numbers answer different questions about different parts of the circuit, and that is why both are taken on every call.</p>`,
      Expert: `<p>The cycle's deviation from the reversed Carnot ideal is instructive because each deviation is deliberate. Throttling instead of expanding through a turbine sacrifices recoverable work for a device that costs a few rupees and never fails; superheating before the compressor sacrifices some efficiency to guarantee dry compression; desuperheating in the condenser is an unavoidable consequence of compressing to the right of the dome. Treating these as engineering compromises rather than imperfections is what lets a technician reason about why a manufacturer specified a given superheat target rather than simply obeying it.</p>
<p>For zeotropic blends the saturated-dome picture needs amendment, because the bubble point and dew point differ at the same pressure. Superheat must be computed against the dew point and subcooling against the bubble point, and using the wrong one introduces an error equal to the glide, which for R-407C runs to several kelvin. This is the single most common measurement error when technicians trained on R-22 move to blends, and the symptom is a consistently wrong superheat on a system that is actually correctly charged.</p>
<p>Capacity modulation changes the diagnostic picture more than most field training admits. An inverter system varies compressor speed to match load, so suction pressure is a controlled variable rather than a symptom, and the familiar fixed-speed heuristics about low suction meaning undercharge do not transfer. Diagnosis on inverter equipment runs through the manufacturer's service mode and its reported sensor values, and a technician applying fixed-speed reasoning to an inverter unit will condemn healthy compressors.</p>
<p>Finally, the economics of subcooling deserve a number. Each additional kelvin of subcooling typically yields on the order of half a per cent additional capacity for no additional compressor work, which is why liquid line receivers and condenser sizing matter and why a condenser fouled enough to lose five kelvin of subcooling has lost measurable capacity before any pressure reading looks alarming. Capacity loss precedes the pressure symptoms, which is the argument for measuring rather than waiting for a complaint.</p>`,
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
<p>Two you will meet constantly. R-410A has been the standard in split systems for years. R-32 is replacing it, because it does less damage to the climate and it is more efficient, so the unit needs less of it.</p>
<p>There is a catch with R-32: it is mildly flammable, classed A2L. That does not mean it explodes. It means it can burn under the right conditions, so you do not braze near a leak, you ventilate, and you do not use a halide leak detector with an open flame.</p>
<p>Also, and this matters on every call: you cannot just top up a system that has leaked. Find the leak and fix it first. Adding gas to a leaking system is putting money and refrigerant into the atmosphere, and in most places it is illegal.</p>`,
      Intermediate: `<p>Refrigerants divide into single component fluids and blends, and the difference shows up in your readings. A single component fluid such as R-32 has one saturation temperature at a given pressure. A zeotropic blend boils and condenses over a range, so the temperature at which it starts to boil, the bubble point, differs from the temperature at which the last liquid vaporises, the dew point. That spread is the glide.</p>
<p>Glide changes how you calculate. Superheat is measured against the dew point and subcooling against the bubble point, so on a blend with meaningful glide you must read two columns from the pressure-temperature chart rather than one. Using a single column introduces an error equal to the glide, and for R-407C that runs to several kelvin, which is enough to make a correctly charged system look badly wrong.</p>
<p>Blends also have to be charged as liquid. If you charge a zeotropic blend as vapour, the more volatile component leaves the cylinder first and the mixture in the system ends up off its intended composition, which changes its pressures permanently. The same reasoning means a leaked blend should generally be recovered and replaced rather than topped up.</p>
<p>The regulatory direction is settled even if the timetable is not. High GWP fluids are being phased down, which is why R-410A at a GWP of about 2,088 is giving way to R-32 at about 675. The practical consequence for a technician is A2L handling becoming routine equipment rather than a specialism.</p>`,
      Advanced: `<p>Working with A2L fluids changes the risk assessment rather than the refrigeration. The lower flammability limit is high enough that an ignitable mixture requires a substantial release into a confined volume, which is why the standards express charge limits as a function of room area and installation height rather than as a blanket prohibition. Knowing that the limit is a concentration question tells you which situations actually matter: a small bedroom with a large wall unit and a slow leak, not an open workshop.</p>
<p>The ignition sources that matter in practice are not obvious. Brazing is managed by procedure and everyone expects it, but a contactor arcing inside an indoor unit's control box during a leak is a credible source nobody plans for, and so is a hot surface above the autoignition temperature. Recovery machines and vacuum pumps rated for A2L exist precisely because an ordinary pump's motor brushes are inside the gas path.</p>
<p>On measurement, the glide correction is where competent technicians trained on R-22 most often go wrong when they move to blends. Reading superheat against a bubble point rather than a dew point produces a figure consistently low by the glide, which looks like liquid flood-back on a system that is fine. The error is systematic rather than random, so it survives repeated measurement and gets believed.</p>
<p>Retrofitting deserves a flat answer: a system designed for R-410A should not be filled with R-32 without the manufacturer's approval, despite the similar pressures. The oil may be incompatible, the compressor discharge temperature with R-32 runs higher, and the electrical components inside the unit are not rated for a flammable charge. The fact that the pressures are close is exactly what makes this a tempting and expensive mistake.</p>`,
      Expert: `<p>The phase-down is driven by the Kigali Amendment to the Montreal Protocol, under which India's schedule begins its freeze in 2024 with step reductions thereafter, and the practical effect on service work is on supply and price long before any prohibition bites. A technician's commercial interest in recovery and in leak-tightness therefore rises with the schedule, which is a more reliable driver of behaviour than the regulation itself.</p>
<p>The thermodynamic reason R-32 is more efficient than the blend it replaces is worth being precise about: higher volumetric capacity means a given duty needs less swept volume and less charge, around 20 to 30 per cent less in a comparable system. The cost is a higher discharge temperature, which is why R-32 systems are more sensitive to low superheat and to condenser fouling, and why some designs use discharge temperature protection that R-410A equivalents did not need.</p>
<p>For blends, fractionation during a leak is the mechanism that makes topping up unsound rather than merely untidy. A vapour-space leak preferentially removes the more volatile component, shifting the remaining charge's composition and therefore its pressure-temperature relationship. Near-azeotropic blends such as R-410A fractionate little enough that topping up is tolerated in practice; genuinely zeotropic ones such as R-407C do not, and the resulting system runs at pressures that no chart describes.</p>
<p>Charge limit calculation under IEC 60335-2-40 is the piece most field technicians never see and occasionally need. The allowable charge for an A2L in a given room is a function of the lower flammability limit, the room floor area and the height of the lowest leak point, with separate allowances where mechanical ventilation or a circulation airflow interlock is present. The reason the installation height appears is that these fluids are heavier than air and pool, so a floor-standing unit in a small room is the restrictive case rather than a high wall unit, which is the opposite of most people's intuition.</p>`,
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
<p>The step people skip is purging. When your hoses have been lying in the van they are full of air. If you connect and open the valves, you push that air into the system. Air does not condense, so it sits in the condenser raising the pressure and wrecking the cooling, and the only cure is to recover everything and start again.</p>
<p>So: connect the hoses, crack the yellow hose at the manifold for a moment to let refrigerant push the air out, then tighten. A second of gas is far cheaper than a contaminated system.</p>
<p>Finally, read the gauges with the unit running and settled. A system that has been off for ten minutes shows equalised pressures that tell you nothing about how it is working.</p>`,
      Intermediate: `<p>A manifold is two gauges, two valves and three hoses, and the valves do only one thing: they connect the centre hose to one side or the other. The gauges read whatever the ports read whether the valves are open or shut, which is the point most beginners misunderstand and the reason you never need to open a valve just to take a reading.</p>
<p>Purging matters because non-condensables are the one contaminant you introduce yourself. Air trapped in a hose enters the system when you open to the centre line, and because it never condenses it accumulates at the top of the condenser, reducing the effective surface and raising head pressure. The symptom is high discharge pressure with normal subcooling, and no amount of charge adjustment will fix it.</p>
<p>Reading accuracy deserves more respect than it usually gets. Superheat is a difference between a measured temperature and a saturation temperature derived from a measured pressure, so both instrument errors propagate. An analogue gauge off by half a bar can shift the derived saturation temperature by two or three kelvin, which on a target superheat of eight kelvin is most of the band. This is why digital manifolds have displaced analogue ones for anything diagnostic.</p>
<p>Every connection also costs charge. A standard coupler releases a small amount on disconnection, and on a small split system with a 1,150 gram charge, a few grams repeated over several visits becomes a measurable undercharge that nobody logged. Low loss fittings exist for exactly this.</p>`,
      Advanced: `<p>Hose selection and length change your readings rather than merely your convenience. Pressure drop along a long hose is real during charging and recovery, so a reading taken at the manifold is not the reading at the port, and the error is in the direction that makes a system look worse than it is. For diagnostic readings the correct practice is to take them with no flow through the centre hose, which is also an argument for shutting both manifold valves whenever you are not actively moving refrigerant.</p>
<p>Thermocouple placement is the other measurement variable nobody controls carefully enough. Superheat requires a pipe temperature, which means a clamp probe in good contact with clean copper and insulated from ambient air. A probe reading partly ambient on a hot roof will overstate suction line temperature and therefore overstate superheat, which leads to a technician adding charge to a correctly charged system. Measure, insulate, and let it settle.</p>
<p>Non-condensable diagnosis has a specific test worth knowing. With the system off and fully equalised for long enough to reach ambient, the standing pressure should correspond to the saturation temperature at ambient for that refrigerant. A standing pressure meaningfully above that figure indicates non-condensables, and it is the only clean field test for it. Running a system with air in it to see whether the head pressure is high is a far worse test because several other faults produce the same symptom.</p>
<p>On A2L systems the equipment requirements tighten, and this is where a familiar routine can become unsafe. Recovery machines, vacuum pumps and leak detectors must be rated for the fluid, because the motor and switchgear of an unrated machine sit in the gas path. A technician who has always used the same pump will not notice it is now the ignition source.</p>`,
      Expert: `<p>Treat the measurement chain as an error budget and the practical priorities fall out. Superheat is a difference of two quantities, one measured directly and one derived through a saturation relationship from a pressure measurement, so the total uncertainty is the quadrature sum of the probe uncertainty and the pressure-derived temperature uncertainty. Near the knee of the pressure-temperature curve the latter dominates, which is why pressure transducer accuracy matters more at low suction pressures than most technicians expect and why an analogue gauge is simply not fit for diagnostic use on modern systems.</p>
<p>Calibration drift is the systematic error that defeats careful technique. An analogue gauge knocked around a van develops an offset, and because that offset is constant it survives repeated measurement and produces consistent, confident, wrong conclusions. The discipline is a zero check against known ambient conditions at the start of a working day, which takes a minute and is the only thing standing between a drifted instrument and a condemned compressor.</p>
<p>There is an argument, increasingly made, that invasive gauge connection is itself the problem on small sealed systems: every connection risks contamination, costs charge, and on a correctly operating unit tells you less than non-invasive measurements would. Temperature-based diagnostics using pipe and air temperatures, combined with the manufacturer's service data from an inverter unit's own sensors, can answer most diagnostic questions without ever breaking into the circuit. The professional direction of travel is toward connecting gauges only once a non-invasive assessment says you need to.</p>
<p>Which reframes the skill being taught here. The competence is not connecting a manifold, it is deciding whether to, and then doing it in a way that leaves the system exactly as you found it apart from the fault you came to fix. Charge loss, non-condensable ingress and moisture introduction are all technician-caused faults, and all three are counted in field studies among the leading causes of repeat visits.</p>`,
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
      Beginner: `<p>Two numbers tell you most of what you need. Both are a difference between a temperature you measure and a temperature you look up on a chart.</p>
<p><strong>Superheat</strong> is about the indoor coil. Measure the suction pressure, look up the temperature the refrigerant boils at that pressure, and subtract it from the actual pipe temperature. If the pipe is eight degrees warmer than the boiling point, you have eight degrees of superheat, which means the refrigerant finished boiling before it left the coil. Good.</p>
<p><strong>Subcooling</strong> is about the outdoor coil. Look up the temperature the refrigerant condenses at the high side pressure, and subtract the actual liquid pipe temperature from it. If the liquid is seven degrees cooler than the condensing point, you have seven degrees of subcooling, which means condensing finished properly.</p>
<p>Now the useful bit. Both low usually means not enough refrigerant. High superheat with normal or high subcooling usually means something is blocking the flow. The two together separate faults that look the same on pressure alone.</p>`,
      Intermediate: `<p>Each number localises a different part of the circuit, which is why taking one without the other wastes the visit. Superheat describes the state of the refrigerant leaving the evaporator and therefore how well the evaporator is being fed. Subcooling describes the state leaving the condenser and therefore whether there is enough liquid in the high side.</p>
<p>Read them as a pair and the common faults separate cleanly. Low superheat with low subcooling points at overcharge or a flooding expansion valve. High superheat with low subcooling is the classic undercharge: not enough refrigerant to fill the condenser or to feed the evaporator. High superheat with normal or high subcooling points at a restriction, because the condenser is holding liquid that cannot get through to the evaporator. Low superheat with high subcooling suggests overcharge with the condenser backed up.</p>
<p>The restriction case is the one that gets misdiagnosed most often and most expensively. Pressures look like an undercharge, so refrigerant gets added, the condenser backs up further, head pressure climbs and the compressor is loaded harder. The subcooling reading is the one piece of evidence that separates the two, and it takes thirty seconds to take.</p>
<p>On a fixed orifice or capillary system remember that superheat is not controlled, so it swings with indoor load and outdoor ambient. A single superheat figure on such a system is only interpretable alongside both, which is why the manufacturer's charging chart is indexed by those two conditions rather than giving one target.</p>`,
      Advanced: `<p>The diagnostic power of the pair comes from them being nearly independent measurements of different circuit sections, so their joint distribution separates faults that are degenerate in either alone. That is also the limit of the method: a fault that moves both in the same direction, such as a severely fouled condenser in high ambient, produces a signature that overlaps with overcharge and has to be resolved by a third observation, typically the condenser approach temperature.</p>
<p>For a thermostatic or electronic expansion valve, superheat is a controlled variable rather than a free one, which inverts the inference. A valve holding superheat at its setpoint tells you the valve is working and says almost nothing about charge, so charge on a valve system is judged primarily on subcooling. Conversely a superheat that will not come down on a valve system points at the valve, its sensing bulb contact or its equalisation line, and adding refrigerant to such a system is a reliable way to flood it once the valve recovers.</p>
<p>The decisive argument against charging by pressure at all is that pressure is a function of load and ambient as well as charge. Weighed-in charging to the manufacturer's figure, after a proper evacuation, is the only method that is correct independently of the conditions on the day, and superheat and subcooling are then used to confirm rather than to determine. Topping up to a target pressure on a hot afternoon produces a system that is overcharged in winter.</p>
<p>Instrument error propagates in a way that matters at these magnitudes. A pressure reading off by half a bar can shift the derived saturation temperature by two to three kelvin, and on a target superheat band of five to ten kelvin that is most of the band. The measurement discipline is therefore not fussiness: an analogue gauge and an uninsulated probe can comfortably generate a four kelvin error, which is the difference between a correct diagnosis and a replaced compressor.</p>`,
      Expert: `<p>Formally the pair maps a fault space onto a two-dimensional observation space, and the reason it works is that the mapping is close to injective for the common single faults. The failure of the method is therefore predictable: it degrades wherever two faults coexist, because the observation is the superposition and the inverse is no longer unique. A restricted drier on an undercharged system is the canonical trap, and the resolution is not a cleverer reading of the pair but an independent measurement, typically a temperature drop across the drier itself.</p>
<p>Condenser approach, the difference between the saturated condensing temperature and the entering air temperature, is the third coordinate worth adopting as routine. It isolates the condenser's heat rejection capability from the charge question entirely, since it is a function of surface, airflow and fouling rather than of mass in the system. Adding it converts several ambiguous two-coordinate signatures into unambiguous three-coordinate ones at the cost of one more air temperature reading.</p>
<p>On blends the glide correction must be applied before any of this reasoning is valid, and the error is systematic rather than random. Superheat computed against a bubble point rather than a dew point is low by the glide for every reading, so a technician on R-407C will see an apparently flooding system across an entire fleet and will conclude there is a design fault. Systematic errors are more dangerous than noisy ones precisely because repetition increases confidence.</p>
<p>The economic case for measuring rather than estimating is quantifiable and worth carrying into a customer conversation. Field studies of installed split systems consistently find a substantial fraction operating outside their intended charge band, with capacity and efficiency penalties in the tens of per cent at the extremes, and the dominant cause is charge adjustment by pressure on the day of the visit. The service call that measures superheat, subcooling and approach and then weighs the charge in costs perhaps thirty minutes more and removes the mechanism that produced the problem.</p>`,
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
      Beginner: `<p>Turning the air conditioner off at the remote does nothing to the wiring. The unit is still connected to 230 volts. The first thing you do on any electrical job is isolate it: find the breaker or isolator that feeds this unit, switch it off, and lock it.</p>
<p>Lock it with your own lock and put a tag on it with your name. This is not bureaucracy. People restore breakers because they do not know somebody is working, and a lock is the only thing that physically stops them.</p>
<p>Then prove it is dead. Test your voltage tester on a known live source or a proving unit, test the circuit you are about to touch, then test your tester again. Three steps, every time, in that order. A tester that failed silently between the first and second step is the exact way people die believing they checked.</p>
<p>And one more that catches people in this trade specifically: a capacitor holds a charge after the power is off. It can throw you across a room. Discharge it through a resistor before you touch its terminals.</p>`,
      Intermediate: `<p>Isolation means creating a secure point of disconnection, and switching off is not isolation because a switch can be operated by somebody else. The hierarchy is to isolate at a point that can be locked, lock it with a personal lock, tag it with your name and the time, and keep the only key on your person. If several people are working, each applies their own lock to a hasp so the supply cannot be restored until the last one has finished.</p>
<p>Proving dead is a three-step sequence and the order is the point. Prove the tester on a known source, test every conductor against every other and against earth, then prove the tester again. The final step exists because a tester can fail between the first two, and a failed tester reads zero volts on a live circuit, which is indistinguishable from a safely isolated one.</p>
<p>Use a two-pole tester rather than a non-contact pen for proving dead. Non-contact detectors are useful for a first indication, but they respond to field rather than to potential, and they can read nothing on a live conductor inside a steel enclosure, or read something on a dead one lying beside a live cable.</p>
<p>Stored charge is the refrigeration-specific hazard. A run capacitor can hold a dangerous charge for several minutes after isolation, and a start capacitor more. Discharge through a suitable resistor rather than by shorting the terminals with a screwdriver, which welds the tip, pits the terminals and sprays metal.</p>`,
      Advanced: `<p>The regulatory architecture in India runs through the Electricity Act and the Central Electricity Authority safety regulations, with the Factories Act applying on industrial premises, and the practical consequence is that live working requires a specific justification rather than being a matter of convenience. The justifications that survive scrutiny are narrow: it must be unreasonable in all the circumstances for the conductor to be dead, and suitable precautions must be in place. Fault finding that genuinely requires measurement under load can qualify; replacing a contactor never does.</p>
<p>Multi-source isolation is the failure mode that catches experienced technicians. A split system can have a separate supply to the indoor unit, an interlock from a building management system, or a backfeed through a control circuit from another panel. Isolating the outdoor unit's breaker and finding the outdoor unit dead proves nothing about what is live inside the indoor enclosure, and the proving-dead test has to be performed at the point of work rather than at the point of isolation.</p>
<p>Inverter equipment adds a hazard that pre-inverter training does not cover. The DC bus capacitors in a variable speed drive hold several hundred volts and take minutes to bleed down, and some designs retain charge far longer if the bleed resistor has failed, which is not externally visible. The manufacturer's stated wait time is a minimum rather than a substitute for measuring the bus voltage directly, and that measurement is one of the few genuinely defensible reasons to approach an energised enclosure.</p>
<p>Finally, the tag is evidence as well as a warning. Investigations into electrical incidents turn on who isolated what and when, and a tag with a name and a time, photographed before work starts, is the record that protects the person who did the right thing. Treating it as paperwork rather than as evidence is why it gets skipped.</p>`,
      Expert: `<p>The control hierarchy for electrical risk is elimination, substitution, engineering controls, administrative controls and PPE, and lock-out tag-out sits awkwardly across the last two in a way that matters. The lock is an engineering control because it physically prevents re-energisation; the tag is administrative because it relies on somebody reading and obeying it. Where the two are separated, for instance where an isolator cannot accept a lock and only a tag is applied, the protection has degraded by a whole tier and the correct response is a different isolation point rather than a more emphatic tag.</p>
<p>The deeper issue is that proving dead establishes a state at an instant, and work occurs over an interval. Everything between those two facts is managed by the lock, which is why a proving-dead test without securing the isolation is close to worthless, and why the test is repeated after any break in the work. Framing it as a state-versus-interval problem makes the rule memorable in a way that reciting the sequence does not.</p>
<p>Capacitor energy is worth carrying as a number rather than as a caution. A 45 microfarad run capacitor at 440 volts stores roughly four joules, which is around the threshold at which a discharge across the chest becomes capable of inducing fibrillation, and well above the threshold for a startle response that causes a secondary injury from a fall or a cut. Most capacitor incidents are injuries from the reaction rather than from the current, which is the argument for discharging rather than for being careful.</p>
<p>On equipment, the distinction between a voltage detector and a voltage indicator is not pedantry. A device with an internal test facility that proves its own continuity before and after measurement, typically a two-pole tester to the relevant GS38-style guidance on probe design and shrouding, is engineered for proving dead. A multimeter is not, because a blown fuse or a selector in the wrong position reads zero volts indistinguishably from an isolated conductor, and a multimeter set to resistance on a live circuit has killed people. Using the right instrument is a control, not a preference.</p>`,
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
      Beginner: `<p>When a unit hums but does not start, or the fan runs and the compressor does not, the fault is usually one of three parts: the capacitor, the contactor, or the motor winding itself.</p>
<p>The <strong>capacitor</strong> gives a single phase motor the push it needs to turn. Without it the motor hums and sits there drawing heavy current. A capacitor that has failed often looks perfectly normal, so you measure it rather than look at it. If it is marked 45 microfarad and it measures 31, it is finished.</p>
<p>The <strong>contactor</strong> is a switch operated by a coil. The control circuit energises the coil, the contacts close, and the motor gets its supply. Contacts burn and pit over time, so you can have a coil pulling in with almost no power getting through.</p>
<p>The <strong>motor windings</strong> have three terminals: common, run and start. You identify them by measuring resistance between each pair. The highest reading is between run and start, and the terminal not involved in that reading is common.</p>
<p>All of this is done with the power isolated, locked and proved dead, and with the capacitor discharged first.</p>`,
      Intermediate: `<p>A single phase induction motor cannot start on its own because a single alternating field produces no rotating torque. The run capacitor creates a phase shift in the start winding current, and the two out-of-phase fields produce the rotation. That is why a motor with a failed capacitor hums, draws locked rotor current and trips on overload, and why it will often start if you spin it by hand: it needs the asymmetry only to begin.</p>
<p>Capacitor testing is a measurement rather than an inspection. A capacitance meter across the discharged terminals should read within the marked tolerance, typically plus or minus five or six per cent. Bulging or leaking is conclusive evidence of failure, but a flat-topped, clean-looking capacitor measuring thirty per cent low is just as dead and is far more common.</p>
<p>Contactors fail in two distinct ways and the distinction directs the test. An open or burnt-out coil means the contacts never close, and you confirm it by measuring coil resistance and checking for control voltage across the coil. Pitted or welded contacts mean the coil pulls in correctly but the load side does not get full voltage, and you confirm it by measuring voltage drop across the closed contacts under load.</p>
<p>Identifying motor terminals is purely arithmetic. Measure resistance across all three pairs. The two smaller readings should add up to the largest. The terminal common to both smaller readings is C, the lower of those two is to R, and the higher is to S. If the readings do not add up, you have an open or shorted winding rather than a terminal identification problem.</p>`,
      Advanced: `<p>The sum rule for terminal identification follows from the windings being in series between run and start with common tapped between them, so C to R plus C to S equals R to S for a healthy motor. Its diagnostic value is in the failure case: a measurement that violates the rule is evidence of a winding fault rather than evidence that you guessed the terminals wrongly, and that distinction saves a technician from re-measuring a motor that is already condemned.</p>
<p>Insulation resistance to earth is the test that separates a motor worth saving from one that is not, and it is the test most often skipped because it needs a different instrument. A megohmmeter reading between any winding and the shell should be in the tens of megohms; a reading in the low megohms or below indicates insulation breakdown, and a compressor that passes a winding resistance check can still be on the way to an earth fault that will trip the supply.</p>
<p>Hard start kits are frequently fitted as a remedy and are usually treating a symptom. A potential relay and start capacitor raise starting torque, which can mask a failing run capacitor, a sticking valve plate or low voltage at the terminals. Fitting one without establishing why the motor struggles to start converts an intermittent diagnosable fault into a system that starts reliably until the underlying problem finishes the compressor.</p>
<p>Supply voltage under load belongs in this diagnostic set and is routinely overlooked. A compressor drawing locked rotor current on a long or undersized supply cable can see the terminal voltage sag far enough that it cannot start, and every component tests healthy afterwards because the fault only exists during the inrush. Measuring voltage at the contactor load terminals at the moment of starting is the only way to see it.</p>`,
      Expert: `<p>The permanent split capacitor arrangement used in most residential equipment is a two-phase machine fed from a single phase source, with the capacitor sized to produce approximately quadrature current in the auxiliary winding at rated load. The sizing is therefore a compromise optimised for running rather than for starting, which is the structural reason these machines have modest starting torque and why they are paired with expansion devices that equalise pressures during the off cycle. A technician who understands that pairing recognises immediately why a system with a thermostatic expansion valve and no hard start kit can fail to start after a short cycle, and why the fault disappears after a few minutes of standing.</p>
<p>Capacitance degradation is a dielectric aging process accelerated by temperature and by ripple current, and it is approximately monotonic, which makes capacitors a candidate for condition-based replacement rather than failure replacement. Measuring and recording capacitance at each service visit produces a trend, and a capacitor that has lost ten per cent in a year will fail within the equipment's service life. Replacing it during a planned visit costs a fraction of what the same replacement costs as an emergency call in peak season.</p>
<p>On contactors, the welded-contact failure mode deserves specific attention because it is a safety issue rather than only a reliability one. A welded contactor means the compressor cannot be stopped by the control circuit, so the unit runs regardless of thermostat demand and, more importantly, remains energised when a technician believes the control has switched it off. This is one of the concrete reasons proving dead is performed at the point of work rather than inferred from the control state.</p>
<p>Finally, the economics of test-versus-replace are worth stating plainly, because the parts-cannon approach is rational under some conditions and the conditions are identifiable. Where a part costs less than the labour time to test it, and where its failure rate is high, replacing it speculatively is defensible. A run capacitor meets both tests; a compressor meets neither. The failure in practice is not that technicians replace cheap parts speculatively, it is that they extend the same reasoning to expensive ones and to parts whose replacement does not resolve the underlying cause.</p>`,
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
      Beginner: `<p>There are two circuits inside an air conditioner. The power circuit carries the big current to the compressor. The control circuit is the thin wiring that decides whether that happens.</p>
<p>The control circuit is a chain of switches in a line: the thermostat, maybe a high pressure switch, maybe a float switch on the drain tray, and finally the contactor coil. Every one of them has to be closed for the coil to pull in. Any one of them open stops everything.</p>
<p>So when the compressor will not start and the fuses are fine, you are looking for whichever switch in that chain is open. The wiring diagram inside the cover tells you what the chain is and in what order.</p>
<p>The fast way to find it is to test in the middle rather than at one end. If you have voltage halfway along the chain, the break is after that point. If you do not, it is before. Each measurement throws away half the circuit, so eight devices take three measurements rather than eight.</p>`,
      Intermediate: `<p>Separating the control circuit from the power circuit is the first step in any electrical diagnosis, because they fail differently and are tested differently. The power circuit is tested for continuity and for voltage drop under load; the control circuit is tested for the presence of voltage at successive points along a series chain.</p>
<p>Read the diagram as a list of conditions that must all be true. A typical residential chain runs supply, thermostat demand, high pressure switch, low pressure switch, any drain float switch, compressor overload, then the contactor coil to neutral. Each device is a permission, and the designer put each one there to stop the compressor in a specific circumstance.</p>
<p>Halving is the technique that makes this fast. With the control circuit energised, measure at the electrical midpoint of the chain. Voltage present means everything upstream is closed and the break is downstream; voltage absent means the break is upstream. Repeat on the remaining half. A chain of eight devices resolves in three measurements rather than eight.</p>
<p>The reading that confuses people is voltage across a device rather than to neutral. In a series chain carrying almost no current, the full supply voltage appears across whichever device is open, and near zero across every closed one. So the open device is the one showing the voltage, which feels backwards until you have done it twice.</p>`,
      Advanced: `<p>An open safety interlock is a finding, not a fault to bypass. A high pressure switch that has tripped is reporting a condition: a blocked condenser, a failed fan, a non-condensable charge or an overcharge. Linking it out restores the compressor and removes the protection that was keeping it alive, and it is the single most destructive shortcut in this trade. The correct response to a tripped interlock is to find out what tripped it.</p>
<p>Intermittent faults change the method, because a chain that is closed when you test it tells you nothing about the moment it opened. A recording multimeter or a simple logging device left across the suspect device over a cycle is worth far more than repeated spot measurements, and in a residential setting where that is impractical, the next best evidence is the pattern: an interlock that opens only after twenty minutes of running points at a thermal or pressure condition that builds, not at a loose connection.</p>
<p>Loose terminations are the most common fault in this circuit and the hardest to find by measurement, because a high resistance joint passes a control circuit's tiny current perfectly well and fails only under load. Thermal imaging finds them in seconds where it is available; a torque check on every terminal in the enclosure finds them where it is not, and it is worth doing as routine on any unit with an intermittent complaint.</p>
<p>Finally, the diagram and the installation diverge more often than beginners expect. Field modifications, replaced boards and aftermarket controls all leave the printed schematic describing a machine that no longer exists. When measurement and diagram disagree, the machine is right, and the discipline is to redraw what is actually there before continuing rather than to keep testing against a fiction.</p>`,
      Expert: `<p>Binary search over a series chain is optimal in the comparison model, giving a logarithmic number of measurements against a linear scan, and the practical caveat is that physical access cost is not uniform. The theoretically optimal midpoint is sometimes behind a panel that takes ten minutes to remove, so the decision rule in the field is to minimise expected total cost rather than expected measurement count, which usually means testing at the most accessible point nearest the midpoint. Technicians discover this heuristic empirically; stating it explicitly is what lets it be taught.</p>
<p>The prior probabilities matter as much as the search strategy. Field failure data for residential split systems consistently puts capacitors, contactors and loose terminations well ahead of switches and boards, so an unprioritised binary search is leaving information on the table. The defensible procedure is a Bayesian one: test the high-prior components first if they are accessible, and fall back to halving once the obvious candidates are eliminated.</p>
<p>On interlocks, there is a design distinction worth understanding because it changes the diagnosis. An auto-reset pressure switch recloses when the condition clears, which produces a short-cycling symptom rather than a dead unit, and a manual-reset switch latches, which produces a dead unit with a latent cause. A system presenting as dead with a manual-reset switch open has already had the fault that tripped it, possibly days earlier, and resetting without investigating simply schedules the next trip.</p>
<p>The deeper professional point is that the control circuit encodes the manufacturer's safety case. Each interlock exists because a failure mode analysis concluded that a particular condition must stop the compressor, and the chain is the physical expression of that reasoning. Reading it that way converts the diagram from a troubleshooting aid into a statement about what the designers believed could go wrong, which is also why defeating any element of it transfers their liability onto the person holding the screwdriver.</p>`,
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
      Beginner: `<p>An ordinary air conditioner runs flat out and then switches off. An inverter unit slows the compressor down instead, so it runs almost continuously at whatever speed matches the room. That is why it uses less power and holds a steadier temperature.</p>
<p>The important consequence for you is that the rules of thumb change. On a fixed speed unit, low suction pressure is a symptom. On an inverter unit the controller is deliberately varying the pressure, so a reading that would worry you on one machine is normal on the other.</p>
<p>So the first move on an inverter unit is not the gauges. It is the error code and the service mode. The unit has its own sensors and it will tell you what it thinks is wrong, and that information is better than anything you can measure from the outside.</p>
<p>And one safety point that has no equivalent on fixed speed equipment. Inside the drive there are large capacitors holding several hundred volts of DC. They take minutes to bleed down after isolation. Wait the time the manufacturer states, then measure the bus before you go near it.</p>`,
      Intermediate: `<p>An inverter drive rectifies the incoming supply to a DC bus and then synthesises a variable frequency output to the compressor, so compressor speed becomes a controlled variable rather than a constant. Capacity therefore modulates to match load, which removes most of the cycling losses and is where the efficiency gain comes from.</p>
<p>Diagnostically this inverts the usual reasoning. On fixed speed equipment, suction pressure is an output you interpret. On inverter equipment it is partly an input the controller is manipulating, so a low suction reading may mean the unit is running at low speed because the room is nearly at setpoint. Applying fixed speed heuristics here is how healthy compressors get condemned.</p>
<p>The right first step is the unit's own diagnostics. Error codes map to documented causes in the service manual, and service mode typically reports sensor values the controller is acting on: coil temperatures, discharge temperature, current draw and target frequency. Those values are measured at points you cannot reach and are the controller's actual view of the machine.</p>
<p>On what you may touch: replacing a complete board, a sensor, a fan or a reactor is normal field work. Replacing components on a board is not, because the boards are multilayer, the parts are often unmarked, and a repaired drive that fails later takes the compressor with it. The economics also rarely work once the second visit is counted.</p>`,
      Advanced: `<p>The DC bus is the hazard that fixed speed training does not prepare anybody for. Bus voltage on a single phase 230 volt unit sits around 320 volts DC and on three phase equipment considerably higher, held on capacitors sized for ride-through. Bleed resistors discharge them over a stated interval, but a failed bleed resistor is not externally visible and leaves the bus charged indefinitely. The manufacturer's wait time is therefore a minimum and not a substitute for measuring the bus directly before contact.</p>
<p>Error codes need to be read as pointers rather than as diagnoses. A code indicating high discharge temperature does not name a cause: undercharge, a restriction, a failed expansion valve, a fouled condenser and a faulty sensor all produce it, and the controller cannot distinguish them. The discipline is to treat the code as the manufacturer's statement of which measurement went out of range, then to work out why with the usual tools.</p>
<p>Sensor faults deserve particular suspicion on these systems because the controller acts on sensor values and will shut down on a plausible but wrong reading. A thermistor that has drifted produces a fault code describing a refrigeration problem that does not exist, and the cheapest test is to compare the service mode reading against your own probe at the same point. Where they disagree, the sensor is the fault and the refrigeration circuit is fine.</p>
<p>Charging practice tightens as well. Inverter systems are generally more sensitive to charge error than fixed speed equivalents, partly because the discharge temperature protection has less margin and partly because the controller compensates for a mild undercharge by raising frequency, which hides the symptom while increasing wear. Weighed-in charging after a full evacuation is not a preference on this equipment, it is the only defensible method.</p>`,
      Expert: `<p>The control architecture matters because it determines what a reading means. Most modern units run some form of superheat or discharge-temperature control loop that adjusts an electronic expansion valve and compressor frequency jointly, so suction pressure, superheat and frequency are coupled outputs of a controller pursuing a setpoint. Interpreting any one of them in isolation is a category error, and the manufacturer's service data exists precisely because the controller's internal state is not inferable from the outside.</p>
<p>On the power electronics, the common failure modes cluster predictably: IGBT module failure usually secondary to cooling or to a shorted motor winding, DC bus capacitor aging accelerated by ambient temperature, and gate driver failures. The second is the one with service implications, because capacitor aging is gradual and raises bus ripple long before an outright failure, which stresses the compressor windings. Units installed in hot, poorly ventilated plant spaces fail these components at markedly higher rates, and that is an installation finding rather than a component quality one.</p>
<p>The field-versus-board repair boundary is an economic and a liability question rather than a technical capability one. A technician who can solder can replace an IGBT, and should not, because the failure was usually caused by something upstream that the replacement does not address, and because a drive that fails again under load can destroy a compressor whose cost dwarfs the board. The defensible rule is that field service replaces assemblies and the manufacturer repairs boards.</p>
<p>There is also a measurement point worth knowing for condemning a compressor on inverter equipment: winding resistance checks are still valid, but insulation resistance testing must not be performed with the drive connected, because a megohmmeter's test voltage will destroy the drive's output stage. Disconnect the compressor leads at the drive first. This is a routine and expensive mistake made by technicians applying fixed speed habits to variable speed equipment, and it converts a diagnosable fault into two failed assemblies.</p>`,
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
      Beginner: `<p>"It is not cooling" covers a dozen different faults. The way to get through them quickly is to ask questions in an order where each answer rules out a whole group.</p>
<p>Start with the cheapest question: is anything running at all? If nothing runs, it is electrical, and you are into supply, isolator, control chain and contactor. If the indoor fan runs but the outdoor unit does not, it is the control chain or the contactor. If everything runs and the air is not cold, now it is refrigeration or airflow.</p>
<p>Then split refrigeration from airflow, because they look the same from the sofa. Check the filter and the indoor coil first: they take two minutes and they are the most common cause. A blocked filter starves the coil and the air coming out is weak rather than warm.</p>
<p>Only then do the gauges come out. Working this way, most calls are resolved before you connect anything, and the connections you do make are the ones that answer a question you have narrowed down.</p>`,
      Intermediate: `<p>A fault tree is an ordering of tests by information gained per unit of cost. The first branch should split the population roughly in half and should be cheap, which is why "does anything run" comes before anything requiring an instrument. Each subsequent branch is chosen the same way, and the result is that a dozen candidate faults resolve in four or five checks.</p>
<p>The top-level split is electrical versus mechanical. Nothing running at all points at supply, isolation, the control chain or the contactor coil. Indoor running with the outdoor unit dead points at the control chain between them, which is a short list. Everything running with poor cooling means the machine is trying and failing, which is refrigeration, airflow, or load.</p>
<p>Airside faults deserve to be eliminated before refrigeration because they are more common, cheaper to check and produce symptoms that mimic a low charge. A blocked filter or a fouled indoor coil reduces airflow, which drops evaporator temperature and suction pressure, and a technician who goes to gauges first will read that as undercharge. Two minutes with the filter prevents an hour of wrong conclusions.</p>
<p>Load belongs in the tree and is routinely forgotten. A unit sized for a room that now contains a kitchen, a server or six more people is not faulty, and no amount of refrigeration work will fix it. The question to ask is when it last cooled properly and what changed, because an equipment fault usually has an onset and a load problem usually has a reason.</p>`,
      Advanced: `<p>The formal justification for ordering by information gain is the same one behind binary search, but with non-uniform costs and non-uniform priors, so the optimal first test is the one maximising expected information divided by expected cost. In practice this is why experienced technicians look and listen before they measure: observation is nearly free and eliminates large branches. The parts cannon is the degenerate strategy that ignores both terms and tests in order of what is in the van.</p>
<p>Prior probabilities should be local rather than textbook. A technician working a coastal city sees condenser corrosion and fan failures at rates nothing like those in a dry inland one, and a technician on a fleet of one manufacturer's equipment accumulates a prior on that fleet's specific weaknesses. Keeping a simple record of resolved faults by cause over a season is the cheapest available improvement to diagnostic speed, and almost nobody does it.</p>
<p>The intermittent fault defeats the tree, because a test performed when the fault is absent returns a clean result that eliminates nothing. The correct response is to shift from testing to observing: run the system on gauges and watch, or leave logging on the suspect circuit. The pattern of onset is itself diagnostic, since a fault that appears after twenty minutes of running is thermal or pressure-driven while one that appears at start-up is electrical or mechanical.</p>
<p>First-time fix rate is the business metric that makes all of this worth teaching, because a second visit consumes the margin on the first and the customer attributes both to incompetence. The dominant cause of repeat visits in field studies is not misdiagnosis of hard faults but treating a symptom without establishing its cause: resetting a tripped interlock, topping up a leaking system, or cleaning a filter without asking why it blocked in six weeks.</p>`,
      Expert: `<p>Treat diagnosis as sequential hypothesis testing and the structure of expertise becomes visible. A novice holds a flat prior over faults and tests exhaustively; an expert holds a sharply peaked prior conditioned on symptom, equipment type, age, installation environment and season, and tests to discriminate between the top two or three hypotheses rather than to confirm one. That is why expert diagnosis looks like intuition and is actually a better prior plus a discriminating rather than confirmatory test strategy.</p>
<p>Confirmation bias is the specific failure mode worth guarding against, because the discriminating test is the one that can falsify the favoured hypothesis and that is exactly the test that feels unnecessary. The superheat-without-subcooling error is the canonical instance: superheat is consistent with the technician's undercharge hypothesis, subcooling is the test that could refute it, and it is the one that gets skipped. A useful discipline is to name, before testing, the observation that would prove you wrong.</p>
<p>The cost structure also rewards deferring invasive tests. Connecting gauges risks contamination, costs charge and takes time, so its expected cost is substantially higher than an air temperature split or a filter inspection. A tree that defers it until the non-invasive branches are exhausted dominates one that opens with it, and this is the quantitative argument behind the professional shift toward non-invasive diagnostics on small sealed systems.</p>
<p>Finally, the handover is part of the diagnosis rather than an afterthought. A fault whose cause is recorded converts the next occurrence into a known pattern, both for the next technician and for the customer's maintenance planning. A service history that records only the parts replaced is a log of symptoms treated, and a fleet managed from such a history will keep paying for the same repair, which is the organisational version of the parts cannon.</p>`,
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
      Beginner: `<p>Refrigerant is not fuel. It is not used up. If a system is low, it leaked, and if you top it up without finding the leak, it will be low again and you will have vented gas into the atmosphere for nothing.</p>
<p>Most leaks on a split system are at the flare joints where the pipes connect to the units. That is where you look first, because that is where they are.</p>
<p>Three tools, in order of cost. Your eyes and nose: oil stains mark leaks, because the oil travels with the refrigerant and stays behind. An electronic detector to narrow down an area. Then soap solution brushed on the suspect joint, which is the cheapest tool and the most conclusive, because a growing bubble is not ambiguous.</p>
<p>If you cannot find it that way, you pressurise the system with dry nitrogen and watch the gauge. A pressure that holds for an hour means no significant leak; a pressure that falls means there is one, and now you can hunt for it with the system under test pressure and nothing escaping into the air.</p>`,
      Intermediate: `<p>The diagnosis has two separate steps that get conflated: establishing that there is a leak, and locating it. Low subcooling with low superheat and a charge that has gone down since the last visit establishes the first. Nothing about those readings tells you where, and the location step is a different procedure with different tools.</p>
<p>Work from cheapest and most likely. Flare joints at both units account for the majority of leaks on residential splits, and a flare that has been remade more than once is a strong candidate. Oil staining is the visual marker, because the lubricant circulates with the refrigerant and remains at the escape point after the gas has gone.</p>
<p>An electronic detector narrows an area but is poorly suited to confirming a specific joint, because it responds to a plume rather than to a point and because its sensitivity drifts. Use it to decide which half of the system to examine, then switch to bubble solution for confirmation. A detector alarm that cannot be reproduced with soap is not a located leak.</p>
<p>Where nothing is found, pressurise with dry nitrogen to the manufacturer's stated test pressure and hold. Nitrogen is inert, cheap, and does not vent a greenhouse gas while you work. Correct for ambient temperature when reading the result, because a system pressurised in the morning and read in the afternoon will show a rise from heating that has nothing to do with tightness.</p>`,
      Advanced: `<p>The standing vacuum test is the more informative of the two pressure tests and is routinely misread. After evacuation, isolate the pump and watch the micron gauge. A reading that rises and stabilises indicates remaining moisture boiling off; a reading that rises continuously indicates a leak. That distinction is only visible if you watch the shape of the curve rather than the endpoint, and it is the reason a gauge with a numeric readout is worth having over a needle.</p>
<p>Moisture is the quiet consequence of any leak on an HFC system, because POE oil is strongly hygroscopic and will absorb water from the air that enters through the same path the refrigerant left by. Water plus POE produces acids that attack winding insulation, so a system that has run flat for any length of time needs the drier changed and an extended evacuation, and a compressor that has run with acid present is on a shortened life regardless of the repair.</p>
<p>Flare technique is worth more attention than it usually gets, because it determines whether your repair becomes next year's leak. A correctly made flare needs a clean square cut, deburring with the tube pointed downward so swarf falls out, the correct flaring block, a light film of refrigerant oil on the face, and torque to the manufacturer's figure. Overtightening thins and cracks the flare, which is the most common cause of a joint that leaks slowly from the day it was made.</p>
<p>Repeat leaks at the same point indicate mechanical cause rather than workmanship. Vibration from an unsupported pipe run, thermal cycling on a rigid connection, or corrosion from a condensate drip all defeat a correctly made joint. Remaking it identically schedules the next failure, so the fix is a vibration loop, a support, or relocating the joint away from the drip.</p>`,
      Expert: `<p>Leak rate quantification is the part of this that connects to regulation and to economics. A system losing a measurable fraction of its charge annually is both a cost and, above thresholds in several jurisdictions, a reportable compliance matter with mandated leak checking frequency. India's framework is developing rather than settled, but the commercial logic already holds: with high-GWP fluid prices rising through the phase-down, a leak that was tolerable at old prices is not at current ones.</p>
<p>On detection technology, infrared detectors have largely displaced heated diode and corona discharge types for field work because they do not false-alarm on every solvent in a plant room and their sensitivity does not degrade with exposure. The relevant specification is sensitivity in grams per year rather than parts per million, since what matters operationally is the smallest annual loss the instrument can localise. Instruments quoted only in ppm are being described in a unit that does not answer the field question.</p>
<p>Ultrasonic detection deserves mention as the technique for pressurised leaks in noisy environments, since it responds to turbulent flow through the orifice rather than to the gas, which makes it indifferent to refrigerant type and usable during a nitrogen test. Its limitation is that it needs a meaningful pressure differential, so it is useless on a system that has already lost its charge, which is exactly when most leak hunts begin.</p>
<p>Finally, the professional judgement that matters most is when to stop repairing. A system with multiple leaks, an aged coil showing formicary corrosion, or a compressor that has run with acid present is a replacement conversation rather than a repair one, and having that conversation early is both honest and commercially better than three visits that each end in another small repair. The decision rule worth carrying is whether the repair restores the system to a condition where the next failure is unrelated to this one.</p>`,
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
      Beginner: `<p>Three jobs, always in this order, every time you open a system.</p>
<p><strong>Recover.</strong> Whatever refrigerant is in there goes into a recovery cylinder. Not into the air. Weigh it, because comparing what came out against what the plate says should be in tells you how much has been lost.</p>
<p><strong>Evacuate.</strong> Once the system is open, air and water vapour get in. Both have to come out, and the only way is a vacuum pump pulling the pressure down until the water boils off. You are aiming for about 500 microns, which is a very deep vacuum, and you measure it with a proper gauge rather than by the needle on your manifold.</p>
<p><strong>Charge by weight.</strong> Put in exactly the mass the data plate says, plus the allowance for the extra pipe length. Do not charge to a pressure: pressure depends on how hot it is outside, so a system charged to a pressure in May is wrong in December.</p>
<p>The reason all three matter is the oil. Modern refrigerant oil pulls water out of the air greedily, and water plus that oil makes acid, and acid eats the compressor windings. That is a failure eighteen months later that nobody connects to the hour you saved today.</p>`,
      Intermediate: `<p>Recovery is both a legal obligation and a measurement opportunity. Weighing the recovered charge against the data plate figure quantifies the loss, which turns "it was a bit low" into a number that tells you how long the leak has been running and whether the repair is worth doing.</p>
<p>Evacuation does two things that are often confused. It removes non-condensables, which otherwise sit in the condenser raising head pressure, and it boils off liquid water, which is the slower and more important job. Water boils at room temperature only under a deep vacuum, which is why 500 microns is the target rather than "as low as the gauge goes".</p>
<p>Measure the vacuum with a micron gauge at the system, not on the manifold next to the pump. A manifold gauge cannot resolve the range that matters, and a reading taken at the pump shows the pump's inlet rather than the system's condition. Then isolate the pump and watch: a reading that rises and stabilises is moisture still boiling, while a reading that rises continuously is a leak.</p>
<p>Charge by weight after a successful evacuation, to the plate figure plus the line length allowance, and use superheat and subcooling to confirm the result rather than to arrive at it. Charging to a target pressure is the single most common cause of systems that are overcharged in one season and undercharged in another, because pressure is a function of ambient and load as much as of mass.</p>`,
      Advanced: `<p>The standing vacuum test is the most informative measurement in this sequence and the most misread. After reaching target, valve off the pump and watch the micron gauge over several minutes. A curve that rises and then plateaus indicates remaining moisture reaching equilibrium with the vacuum; a curve that rises without plateauing indicates ingress from a leak. Reading only the endpoint collapses two very different diagnoses into one number.</p>
<p>Where moisture is stubborn, triple evacuation is the technique: pull down, break the vacuum with dry nitrogen, repeat. Each cycle dilutes the water vapour by the ratio of the pressures involved, so three cycles achieve what a much longer single pull-down will not, because water adsorbed on surfaces and dissolved in oil desorbs slowly and a vacuum alone fights diffusion rather than concentration.</p>
<p>Hose and core restrictions dominate evacuation time in practice. A quarter inch hose through a Schrader core presents a severe restriction at vacuum, so a technically adequate pump can take hours to achieve what core removal tools and larger hoses achieve in twenty minutes. Technicians who conclude their pump is tired are usually looking at a conductance problem, and the diagnostic is simple: the pump pulls down fast when isolated and slowly when connected.</p>
<p>The acid chemistry is worth understanding because it governs what you do after a burnout. POE oil hydrolyses in the presence of water to produce carboxylic acids, which attack winding insulation and accelerate further breakdown. A system that has run with acid present needs the oil changed, the drier replaced with a burnout-rated one, and an acid test after a period of running. Replacing the compressor alone into a contaminated circuit is how a second compressor gets destroyed, and it is one of the most expensive routine mistakes in the trade.</p>`,
      Expert: `<p>The thermodynamics of evacuation are worth stating precisely because they explain the target. Water's saturation pressure at 20 degrees is about 17.5 torr, which is roughly 17,500 microns, so any vacuum below that boils free water at room temperature. The 500 micron target is therefore not about boiling water, which happens far earlier, but about providing enough margin that the standing test can distinguish residual moisture from ingress, and about ensuring non-condensables are genuinely removed rather than merely diluted.</p>
<p>Conductance is the governing constraint on time and it scales dramatically with diameter. At molecular flow the conductance of a tube goes roughly as the cube of its diameter and inversely with length, so moving from a quarter inch hose to a three eighths one, and removing the Schrader cores, changes evacuation from an afternoon to a coffee break. This is why core removal tools pay for themselves on a single job and why pump displacement is almost never the binding constraint.</p>
<p>On charge accuracy, published field studies consistently find a substantial fraction of installed systems outside their intended charge window, with capacity and efficiency penalties that grow sharply at the extremes, and the dominant mechanism is charge adjustment by pressure during a service visit. The implication for practice is uncomfortable: a large share of service visits leave systems worse than they found them, and the remedy is procedural rather than technical.</p>
<p>Finally, there is a documentation argument that technicians undervalue. Recording recovered mass, evacuation endpoint, standing test result and weighed charge converts a service visit into a measurement of the system's condition over time. A system whose recovered charge falls visit on visit has a leak nobody has yet found; one whose evacuation takes progressively longer has a developing restriction or moisture problem. Neither signal exists if the only record is which parts were fitted.</p>`,
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
      Beginner: `<p>You have fixed it. Now write down what happened, because in three months nobody will remember, including you.</p>
<p>A good report says four things. What the customer reported. What you found. What you did. And what you measured afterwards to prove it works.</p>
<p>That last one matters more than people think. "Cleaned coil, unit now cooling" is an opinion. "Cleaned coil, air temperature split now 14 K, head pressure stable over 40 minutes" is a measurement somebody else can check.</p>
<p>Then be clear about two things that cause almost every argument. What your work covers, and what you have recommended but not done. If you spotted that the condenser is corroding and the customer did not want it dealt with today, write that down. It protects them because they can plan, and it protects you when it fails.</p>`,
      Intermediate: `<p>The report is the only durable artefact of the visit, and it serves three different readers. The customer, who needs to understand what they paid for. The next technician, who needs to know what has already been eliminated. And, if it ever comes to it, whoever is deciding who was responsible.</p>
<p>Write what you found before what you did, because the finding justifies the action. A report that says only "replaced capacitor" invites the question of why, while one that records a capacitor measuring 31 microfarad against a marked 45 answers it before it is asked.</p>
<p>Record the root cause separately from the repair. Replacing a filter drier is the repair; the drier blocking because moisture entered through a leaking flare is the cause, and only the second one tells anybody what to watch for. Service histories that list parts rather than causes are why fleets keep paying for the same repair.</p>
<p>Finally, be explicit about scope and about recommendations. A customer who declines a recommended repair has made a decision, and recording it converts a future failure from a dispute into a documented choice. A recommendation made verbally and not written down protects nobody.</p>`,
      Advanced: `<p>The commercial function of the handover is expectation management, and most disputes in this trade trace to an expectation set carelessly rather than to work done badly. "It should be fine now" is heard as a guarantee; "I have replaced the capacitor, which was the immediate fault, and the compressor has been running on a weak capacitor for some time, so I cannot promise how long it will last" is heard as honesty and is also accurate. The second takes ten seconds longer.</p>
<p>Warranty needs stating in terms of what it covers rather than how long it lasts. A part replaced under your warranty is covered; the system it sits in is not, and a customer who believes otherwise will call you about an unrelated fault and be angry when you charge. The distinction is obvious to you and is not obvious to them, which makes it your job to say it.</p>
<p>Measurements in the report also change the economics of the next visit. If this report records superheat, subcooling, the weighed charge and an air temperature split, the next technician starts with a baseline and can see drift. Without it they start from nothing, and the customer pays for a diagnosis that was already done once.</p>
<p>There is an ethical boundary worth naming too. Recommending work that is not needed is the trade's oldest problem and the reason customers arrive suspicious. The discipline that protects you is to tie every recommendation to an observation: not "your condenser should be replaced soon" but "the condenser has corrosion through the fin pack on the lower third, which is why subcooling has fallen to 3 K, and I expect a leak within a season". A recommendation with evidence attached is checkable, and a customer who can check it can trust it.</p>`,
      Expert: `<p>Treat the service report as the primary data product of the visit rather than as administration, and its design follows. The fields that carry information across time are the measured ones, because they support trend analysis: recovered charge, evacuation endpoint, superheat, subcooling, air split, current draw and capacitance. A fleet whose service records contain these can identify deteriorating assets before failure; one whose records contain parts lists can only count failures after the fact.</p>
<p>From a liability perspective the report is also the document that defines the boundary of what you undertook. Professional exposure in service work concentrates in two places: work done outside competence, and conditions observed and not reported. The second is the one that catches diligent technicians, because noticing a corroded coil and saying nothing transfers a known risk from the owner to you by omission. Recording an observation discharges it even where no work follows.</p>
<p>On communication, the research on informed consent in other professions transfers well: people retain roughly the first item and the last item of what they are told, and they systematically overestimate how definitive a reassurance was. The practical consequence is to lead with the finding, close with the recommendation, and put the qualification in writing because the verbal version will not survive. "It should be fine" is remembered as a promise regardless of how it was framed.</p>
<p>Finally, the handover is where repeat business is actually generated, and the mechanism is not charm. A customer who receives a report with measurements, a stated cause, a clear scope and an evidenced recommendation has been given the means to evaluate the work, and being evaluable is what distinguishes a trade from a transaction. The technicians who are called back by name are, with few exceptions, the ones whose paperwork lets a customer explain the repair to somebody else.</p>`,
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
