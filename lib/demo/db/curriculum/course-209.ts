/**
 * Course 209 curriculum.
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
  5106: {
    topicId: 5106,
    title: "Anatomy of a multirotor, part by part",
    summary:
      "Nine components and one signal path. Knowing what each part does is what turns a crash into a diagnosis rather than a mystery.",
    concepts: ["Flight controller", "ESC", "Brushless motor", "Power distribution", "Receiver"],
    glossary: {
      "Flight controller": "The board with the gyroscope that decides how fast each motor should spin, hundreds of times a second.",
      ESC: "Electronic speed controller. Converts the flight controller's command into the three-phase drive a brushless motor needs.",
      "Brushless motor": "A motor with no brushes, driven by switching three windings in sequence. It has no inherent direction.",
      "Power distribution": "The board or wiring that takes battery voltage to every ESC and steps it down for the electronics.",
      Receiver: "The radio link to your transmitter, which passes stick positions to the flight controller.",
      "Kv rating": "Motor revolutions per volt with no load. A rough proxy for whether a motor suits a large slow prop or a small fast one.",
    },
    body: {
      Beginner: `<p>A quadcopter is not one machine. It is about eight kinds of part bolted together, and knowing what each one does is what makes a fault findable later.</p>
<figure class="fig-photo">
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Racing_Drone.jpg/1280px-Racing_Drone.jpg" alt="A custom built FPV racing quadcopter with a carbon frame, four orange three-blade propellers, a green lithium polymer battery held on with a velcro strap, an action camera and a GPS antenna" loading="lazy"/>
<figcaption><strong>Almost everything on this aircraft is a separate purchase.</strong> Carbon arms, four motors, four speed controllers in heatshrink, a flight controller stack under the battery tray, a strapped pack, a camera and an antenna. Nothing here is moulded into anything else, which is what makes it repairable and what makes the build order matter.<span class="credit">Photo: Commanderbryce, CC BY-SA 4.0, via Wikimedia Commons</span></figcaption>
</figure>
<h3>The parts, and what each one is for</h3>
<table>
<tr><th>Part</th><th>Job</th></tr>
<tr><td>Frame</td><td>Holds everything in the right places and takes the crash</td></tr>
<tr><td>Motors</td><td>Spin the propellers. Four of them.</td></tr>
<tr><td>Propellers</td><td>Turn that spin into lift</td></tr>
<tr><td>Speed controllers</td><td>Tell each motor how fast to turn, many times a second</td></tr>
<tr><td>Flight controller</td><td>The brain. Reads its sensors and decides the four speeds.</td></tr>
<tr><td>Battery</td><td>Powers all of it, and is the heaviest single item</td></tr>
<tr><td>Receiver</td><td>Hears your radio</td></tr>
</table>
<div class="key-idea"><span class="callout-label">Why there are four separate speed controllers</span><p>The aircraft stays level by making one motor turn slightly faster than another, continuously. That is only possible if each motor can be commanded on its own.</p></div>
<div class="warning"><span class="callout-label">Propellers are not optional safety equipment</span><p>They are the dangerous part. Take them off before you power anything up on the bench, every time, including when you are sure you do not need to.</p></div>`,
      Intermediate: `<p>Each part has a specification that has to agree with the parts around it. A build fails more often on a mismatch than on a faulty component.</p>
<figure class="fig-photo">
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Racing_Drone.jpg/1280px-Racing_Drone.jpg" alt="A custom built FPV racing quadcopter with a carbon frame, four orange three-blade propellers, a green lithium polymer battery held on with a velcro strap, an action camera and a GPS antenna" loading="lazy"/>
<figcaption><strong>Almost everything on this aircraft is a separate purchase.</strong> Carbon arms, four motors, four speed controllers in heatshrink, a flight controller stack under the battery tray, a strapped pack, a camera and an antenna. Nothing here is moulded into anything else, which is what makes it repairable and what makes the build order matter.<span class="credit">Photo: Commanderbryce, CC BY-SA 4.0, via Wikimedia Commons</span></figcaption>
</figure>
<h3>What has to agree with what</h3>
<table>
<tr><th>This</th><th>Must suit</th><th>Or else</th></tr>
<tr><td>Propeller size</td><td>The motor and the frame</td><td>Props strike the arms, or the motor is overloaded</td></tr>
<tr><td>Motor KV</td><td>The battery cell count</td><td>Overspeed on a high cell count, sluggish on a low one</td></tr>
<tr><td>Speed controller rating</td><td>Peak motor current</td><td>It overheats and fails in flight</td></tr>
<tr><td>Flight controller mount</td><td>The frame, 30.5 mm or 20 mm</td><td>It physically does not fit</td></tr>
</table>
<div class="key-idea"><span class="callout-label">KV is the one that confuses people</span><p>It is revolutions per volt with no load, so a 2400 KV motor on a 4 cell pack spins far faster than on a 3 cell one. Higher KV is not a better motor; it is a motor intended for a lower voltage and a smaller propeller.</p></div>
<h3>The stack</h3>
<p>On a modern build the flight controller and the speed controllers are two boards sandwiched on the same four bolts, connected by one ribbon cable. That saves a great deal of wiring and means a fault in either board takes the whole stack apart to reach.</p>`,
      Advanced: `<p>Treat the aircraft as four subsystems and most diagnosis becomes a question of which one you are in rather than which component is broken.</p>
<figure class="fig-photo">
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Racing_Drone.jpg/1280px-Racing_Drone.jpg" alt="A custom built FPV racing quadcopter with a carbon frame, four orange three-blade propellers, a green lithium polymer battery held on with a velcro strap, an action camera and a GPS antenna" loading="lazy"/>
<figcaption><strong>Almost everything on this aircraft is a separate purchase.</strong> Carbon arms, four motors, four speed controllers in heatshrink, a flight controller stack under the battery tray, a strapped pack, a camera and an antenna. Nothing here is moulded into anything else, which is what makes it repairable and what makes the build order matter.<span class="credit">Photo: Commanderbryce, CC BY-SA 4.0, via Wikimedia Commons</span></figcaption>
</figure>
<table>
<tr><th>Subsystem</th><th>Contains</th><th>Typical symptom when it fails</th></tr>
<tr><td>Power</td><td>Battery, distribution, regulators</td><td>Brown-outs, resets under throttle</td></tr>
<tr><td>Propulsion</td><td>Motors, speed controllers, propellers</td><td>Desync, one corner weak, vibration</td></tr>
<tr><td>Control</td><td>Flight controller, sensors, firmware</td><td>Drift, oscillation, refusal to arm</td></tr>
<tr><td>Link</td><td>Receiver, transmitter, video</td><td>Failsafe, range loss, interference</td></tr>
</table>
<div class="key-idea"><span class="callout-label">Vibration is the cross-cutting fault</span><p>It originates in propulsion, as a damaged prop or a bent shaft, and presents in control, as an aircraft that will not hold level. A learner who treats the symptom as a tuning problem will spend an evening on filter settings to fix a two rupee propeller.</p></div>
<h3>What is worth paying for</h3>
<p>The frame and the motors take the crash and the heat, and are the parts where a cheap purchase is felt. Speed controllers are the most common in-flight failure. A receiver is the component whose failure is least recoverable, because it fails by silence.</p>`,
      Expert: `<p>The architecture is worth stating explicitly, because it explains why the failure modes are what they are: a quadcopter is an unstable plant held up by a control loop, so every component is in series with flight.</p>
<figure class="fig-photo">
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Racing_Drone.jpg/1280px-Racing_Drone.jpg" alt="A custom built FPV racing quadcopter with a carbon frame, four orange three-blade propellers, a green lithium polymer battery held on with a velcro strap, an action camera and a GPS antenna" loading="lazy"/>
<figcaption><strong>Almost everything on this aircraft is a separate purchase.</strong> Carbon arms, four motors, four speed controllers in heatshrink, a flight controller stack under the battery tray, a strapped pack, a camera and an antenna. Nothing here is moulded into anything else, which is what makes it repairable and what makes the build order matter.<span class="credit">Photo: Commanderbryce, CC BY-SA 4.0, via Wikimedia Commons</span></figcaption>
</figure>
<div class="key-idea"><span class="callout-label">There is no gliding option</span><p>A fixed wing with a dead motor is a glider. A quadcopter with a dead motor is a falling object. The aircraft is not aerodynamically stable at any point, so a control loop interruption of a few hundred milliseconds is a crash rather than a wobble. That is the reason brown-outs matter so much more here than on a ground vehicle.</p></div>
<h3>Redundancy is almost absent at this scale</h3>
<p>Four motors is the minimum for control in all axes, so there is no spare. A hexacopter can survive one motor loss; a quadcopter cannot, and the extra arms are the main engineering reason commercial inspection aircraft are not quads.</p>
<h3>Where the cost actually sits</h3>
<table>
<tr><th>Component</th><th>Share of cost</th><th>Share of failures</th></tr>
<tr><td>Frame</td><td>Low</td><td>Crash damage only</td></tr>
<tr><td>Motors</td><td>Moderate</td><td>Bearings and bent shafts</td></tr>
<tr><td>Speed controllers</td><td>Moderate</td><td>The highest in-flight share</td></tr>
<tr><td>Flight controller</td><td>High</td><td>Low, but takes the stack apart</td></tr>
</table>
<div class="field"><span class="callout-label">Which argues for a specific build habit</span><p>Spend on the parts whose failure is expensive to diagnose rather than on the parts that are expensive to buy. A known-good spare speed controller in the toolbox is worth more than an upgraded flight controller, because it converts an evening of measurement into a five minute substitution.</p></div>`,
    },
    parts: [
      {
        n: 1,
        title: "Name every part on an exploded quadcopter",
        diagram: "drone-exploded",
        brief: `<p>This is a five inch quadcopter seen from above, drawn with the propellers lifted off the motors so you can see both.</p>
<p>Name each numbered point. The label list contains more names than there are points, and the extras are the parts these are most often confused with, so reading the list is not a shortcut.</p>
<h3>Before you start: how motors are numbered</h3>
<figure>
<svg viewBox="0 0 1000 620" role="img" aria-label="Motor numbering on a quadcopter in X configuration seen from above">
<path d="M500 40 l40 64 h-80 z" fill="#be123c"/>
<text x="500" y="146" font-size="30" font-weight="800" fill="#be123c" text-anchor="middle">FRONT</text>
<path d="M330 230 L670 470 M670 230 L330 470" stroke="currentColor" opacity="0.4" stroke-width="22" stroke-linecap="round"/>
<circle cx="670" cy="230" r="66" fill="#0369a1" opacity="0.25"/>
<circle cx="670" cy="230" r="66" fill="none" stroke="#0369a1" stroke-width="5"/>
<text x="670" y="246" font-size="48" font-weight="800" fill="currentColor" text-anchor="middle">2</text>
<circle cx="670" cy="470" r="66" fill="#b45309" opacity="0.25"/>
<circle cx="670" cy="470" r="66" fill="none" stroke="#b45309" stroke-width="5"/>
<text x="670" y="486" font-size="48" font-weight="800" fill="currentColor" text-anchor="middle">1</text>
<circle cx="330" cy="230" r="66" fill="#b45309" opacity="0.25"/>
<circle cx="330" cy="230" r="66" fill="none" stroke="#b45309" stroke-width="5"/>
<text x="330" y="246" font-size="48" font-weight="800" fill="currentColor" text-anchor="middle">4</text>
<circle cx="330" cy="470" r="66" fill="#0369a1" opacity="0.25"/>
<circle cx="330" cy="470" r="66" fill="none" stroke="#0369a1" stroke-width="5"/>
<text x="330" y="486" font-size="48" font-weight="800" fill="currentColor" text-anchor="middle">3</text>
<path d="M396 282 L604 418" stroke="#0369a1" stroke-width="5" stroke-dasharray="12 9"/>
<path d="M396 418 L604 282" stroke="#b45309" stroke-width="5" stroke-dasharray="12 9"/>
<text x="24" y="580" font-size="27" font-weight="800" fill="#0369a1">3 and 2 turn together</text>
<text x="976" y="580" font-size="27" font-weight="800" fill="#b45309" text-anchor="end">4 and 1 turn together</text>
</svg>
<figcaption><strong>Diagonal pairs always turn the same way, and the numbering is fixed by the flight controller rather than by the frame.</strong> Whether the top pair turns inward or outward is a setting you choose and then declare; which motor is number one is not. Get the numbering wrong and the aircraft will flip on its first arm, every time, because the controller corrects the wrong corner.</figcaption>
</figure>
<div class="warning"><span class="callout-label">This is the mistake that breaks a first flight</span><p>Motor numbering belongs to the flight controller, not to the frame, and it does not follow any clockwise or anticlockwise order you might assume. If motor three is wired where the controller expects motor one, the aircraft corrects the wrong corner and flips the instant it arms. It will do it every single time, which at least makes it easy to diagnose once you know to suspect it.</p></div>
<h3>What this frame is</h3>
<div class="stat-strip">
<div class="stat"><strong>5 in</strong><span>Propeller</span></div>
<div class="stat"><strong>2207</strong><span>Motor size</span></div>
<div class="stat"><strong>6S</strong><span>Battery</span></div>
<div class="stat"><strong>~650 g</strong><span>All up weight</span></div>
</div>
<p>Then put the parts in the order they are fitted during a build. Order is not a preference here: some of these cannot be reached once another is in place, and a build done in the wrong order has to come apart again.</p>
<div class="key-idea"><span class="callout-label">Why the extras in the label list are there</span><p>Every wrong name offered is one that gets confused with a real part on this drawing, and the reveal tells you how to tell the pair apart. Getting one wrong is more useful here than getting it right, so guess rather than skipping.</p></div>`,
        hotspots: [
          {
            key: "fc",
            label: "Flight controller",
            x: 50,
            y: 50,
            does: "Holds the gyroscope and runs the control loop, adjusting the four motors hundreds of times a second. The arrow printed on it must point forward.",
            confusedWith:
              "The power distribution board, which often sits in the same stack. The flight controller is the one with the arrow and the USB socket; the PDB has the thick battery pads.",
          },
          {
            key: "esc",
            label: "ESC",
            x: 43,
            y: 42,
            does: "Converts the flight controller's throttle command into the three-phase switching a brushless motor needs. One per motor, or four on a single board.",
            confusedWith:
              "The receiver, which is a similar small board. The ESC has three thick motor wires leaving it; the receiver has an aerial.",
          },
          {
            key: "motor",
            label: "Brushless motor",
            x: 33,
            y: 30,
            does: "Produces the thrust. It has no inherent direction: swapping any two of its three wires reverses it, which is how direction is set during a build.",
            confusedWith:
              "Nothing visually, but the motor NUMBER is routinely confused. Betaflight numbers them from the rear left, not from the front.",
          },
          {
            key: "prop",
            label: "Propeller",
            x: 33,
            y: 20,
            does: "Converts motor torque into thrust. Props are handed, so a clockwise prop on an anticlockwise motor produces downforce rather than lift.",
            confusedWith:
              "The opposite-handed prop. They look almost identical and fitting one the wrong way round is the most common reason a first build will not take off.",
          },
          {
            key: "battery",
            label: "LiPo battery",
            x: 50,
            y: 81,
            does: "Supplies everything. Its C rating and capacity together set how much current it can deliver and for how long.",
            confusedWith:
              "A battery of the same capacity but a different cell count. A 6S pack in a 4S build destroys the electronics instantly.",
          },
          {
            key: "rx",
            label: "Receiver",
            x: 24,
            y: 70,
            does: "Receives your transmitter's signal and passes the stick positions to the flight controller. Its aerials must be clear of carbon fibre and away from the video transmitter.",
            confusedWith:
              "The video transmitter. Both are small boards with aerials; the receiver's aerials are thin and short, and it connects to the flight controller rather than to the camera.",
          },
          {
            key: "cam",
            label: "FPV camera",
            x: 75,
            y: 70,
            does: "Sends a live picture to the video transmitter. It is on a completely separate path from the control system and has nothing to do with flying the aircraft.",
            confusedWith:
              "A recording camera, which is a different device. The FPV camera is low latency and low resolution because it exists to be flown by, not to be watched later.",
          },
        ],
        sequence: [
          {
            key: "motor",
            label: "Mount the motors to the arms",
            why: "They bolt from underneath, and once the stack is in place those bolts are unreachable without taking everything apart again.",
          },
          {
            key: "esc",
            label: "Fit and solder the ESCs",
            why: "The motor wires reach them, and the solder joints are easier to make before anything is stacked on top.",
          },
          {
            key: "battery",
            label: "Test the power path with a current limiter",
            why: "This is the step people skip. Power up through a smoke stopper BEFORE the flight controller goes on, so a soldering error blows a fuse rather than a stack of boards.",
          },
          {
            key: "fc",
            label: "Fit the flight controller",
            why: "It goes on top of the tested power system, with its arrow forward. Mounting it before the power path is proven risks destroying the most expensive board in the build.",
          },
          {
            key: "rx",
            label: "Fit and bind the receiver",
            why: "Needs the flight controller in place to connect to, and its aerials have to be routed clear of the frame and away from the video transmitter.",
          },
          {
            key: "cam",
            label: "Fit the camera and video transmitter",
            why: "Last, because the video path is independent of flight and because the VTX is the noisiest thing on the aircraft, so it is placed with the receiver already positioned.",
          },
          {
            key: "prop",
            label: "Fit the propellers",
            why: "Always last, after motor directions are confirmed and the aircraft has been armed with props off. A prop on a motor spinning the wrong way is how people get cut.",
          },
        ],
        minutes: 14,
        skills: ["Flight controller", "ESC", "Brushless motor", "Receiver"],
      },
    ],
    decks: [
      {
        n: 1,
        title: "Parts, acronyms and specifications",
        blurb:
          "The vocabulary of a build. Self-rated, because recognising a component in a parts list is the actual task.",
        mode: "flip",
        cards: [
          { id: 1, front: "FC", back: "Flight controller", extra: { Does: "Runs the control loop, holds the gyro and the arrow that must point forward" }, tags: ["Components"] },
          { id: 2, front: "ESC", back: "Electronic speed controller", extra: { Does: "Turns a throttle command into three-phase motor drive. One per motor." }, tags: ["Components"] },
          { id: 3, front: "PDB", back: "Power distribution board", extra: { Does: "Splits battery current to the ESCs and steps it down for the electronics" }, tags: ["Components"] },
          { id: 4, front: "BEC", back: "Battery eliminator circuit", extra: { Does: "The regulator producing 5V for the flight controller and receiver" }, tags: ["Components"] },
          { id: 5, front: "VTX", back: "Video transmitter", extra: { Warning: "Electrically noisy and sits close to the receiver. A common cause of control dropouts." }, tags: ["Components"] },
          { id: 6, front: "Kv", back: "Motor RPM per volt, unloaded", extra: { Note: "A speed constant, not a power rating. High Kv suits small props and low cell counts." }, tags: ["Specifications"] },
          { id: 7, front: "6S", back: "Six LiPo cells in series, about 22.2V nominal", extra: { Warning: "A 6S pack in a 4S build destroys the electronics instantly" }, tags: ["Specifications"] },
          { id: 8, front: "C rating", back: "Multiplier on capacity giving maximum continuous current", extra: { Example: "1.3 Ah at 100C is 130 A" }, tags: ["Specifications"] },
          { id: 9, front: "AUW", back: "All up weight: the whole aircraft ready to fly", extra: { Note: "Includes the battery and the props. This is the number the regulations use." }, tags: ["Specifications"] },
          { id: 10, front: "DShot", back: "A digital ESC protocol", extra: { Advantage: "No throttle calibration, checksummed, and bidirectional DShot returns real RPM for gyro filtering" }, tags: ["Protocols"] },
          { id: 11, front: "Desync", back: "An ESC losing track of rotor position mid-transient", extra: { Symptom: "A distinctive sound and a sudden loss of thrust on one arm" }, tags: ["Faults"] },
          { id: 12, front: "Smoke stopper", back: "A current-limited power lead used for first power-up", extra: { "Why": "A soldering error blows a bulb or a fuse rather than the whole stack" }, tags: ["Build"] },
          { id: 13, front: "Prop handedness", back: "Props are made in clockwise and anticlockwise pairs", extra: { Consequence: "A reversed prop produces downforce. The commonest reason a first build will not lift." }, tags: ["Build"] },
          { id: 14, front: "Motor order in Betaflight", back: "Numbered from the rear left, anticlockwise", extra: { Trap: "Not from the front. Assuming otherwise produces a quad that flips on arming." }, tags: ["Build"] },
          { id: 15, front: "Failsafe", back: "What the aircraft does when it loses the radio link", extra: { Default: "Should be set to drop throttle or return to home, and must be tested before the first flight" }, tags: ["Safety"] },
          { id: 16, front: "Thrust to weight ratio", back: "Total static thrust divided by all up weight", extra: { Guide: "Below 2:1 is barely controllable. Around 4:1 and up is normal for a 5 inch build." }, tags: ["Specifications"] },
        ],
        skills: ["Flight controller", "ESC", "Kv rating", "Power distribution"],
      },
    ],
  },

  /* ===================================================================== */
  5107: {
    topicId: 5107,
    title: "Thrust, weight and the ratio that decides if it flies",
    summary:
      "Three numbers decide whether your build is a joy or a brick. All three come from arithmetic you can do before buying anything.",
    concepts: [
      "All up weight",
      "Static thrust",
      "Thrust to weight ratio",
      "Hover throttle",
      "Disc loading",
      "Manufacturer thrust data",
    ],
    glossary: {
      "All up weight": "The complete aircraft ready to fly, battery and propellers included.",
      "Static thrust": "Thrust produced at full throttle with the aircraft held still, as given in the motor manufacturer's test data.",
      "Thrust to weight ratio": "Total static thrust divided by all up weight. The single most predictive number about how a build flies.",
      "Hover throttle": "The throttle percentage needed to hold altitude, which is roughly the inverse of the thrust to weight ratio.",
      "Disc loading": "Weight divided by the total propeller disc area, which governs efficiency and gust response.",
      "Manufacturer thrust data": "The motor maker's published thrust per prop and per cell count, which is optimistic and still the best figure available.",
    },
    body: {
      Beginner: `<p>Before you buy anything, one calculation tells you whether the build will fly. Add up what all four motors can push, and divide it by what the aircraft weighs.</p>
<figure>
<svg viewBox="0 0 1000 560" role="img" aria-label="Total thrust from four motors weighed against the all up weight of the aircraft">
<rect x="24" y="48" width="440" height="220" rx="18" fill="#0f766e" opacity="0.13"/>
<rect x="24" y="48" width="440" height="220" rx="18" fill="none" stroke="#0f766e" stroke-width="3"/>
<text x="244" y="104" font-size="30" font-weight="800" fill="#0f766e" text-anchor="middle">TOTAL THRUST</text>
<text x="244" y="174" font-size="54" font-weight="800" fill="currentColor" text-anchor="middle">2600 g</text>
<text x="244" y="226" font-size="27" fill="currentColor" opacity="0.8" text-anchor="middle">four motors, 650 g each</text>
<text x="244" y="258" font-size="27" fill="currentColor" opacity="0.6" text-anchor="middle">at full throttle</text>
<rect x="536" y="48" width="440" height="220" rx="18" fill="#be123c" opacity="0.13"/>
<rect x="536" y="48" width="440" height="220" rx="18" fill="none" stroke="#be123c" stroke-width="3"/>
<text x="756" y="104" font-size="30" font-weight="800" fill="#be123c" text-anchor="middle">ALL UP WEIGHT</text>
<text x="756" y="174" font-size="54" font-weight="800" fill="currentColor" text-anchor="middle">650 g</text>
<text x="756" y="226" font-size="27" fill="currentColor" opacity="0.8" text-anchor="middle">frame, battery, camera,</text>
<text x="756" y="258" font-size="27" fill="currentColor" opacity="0.6" text-anchor="middle">straps, everything</text>
<rect x="24" y="310" width="952" height="96" rx="16" fill="#0f766e" opacity="0.16"/>
<text x="500" y="372" font-size="40" font-weight="800" fill="currentColor" text-anchor="middle">2600 divided by 650 is a ratio of 4 to 1</text>
<rect x="24" y="428" width="464" height="110" rx="16" fill="#be123c" opacity="0.14"/>
<text x="256" y="474" font-size="30" font-weight="800" fill="#be123c" text-anchor="middle">Under 2 to 1</text>
<text x="256" y="514" font-size="27" fill="currentColor" opacity="0.85" text-anchor="middle">it will not fly properly</text>
<rect x="512" y="428" width="464" height="110" rx="16" fill="#0f766e" opacity="0.14"/>
<text x="744" y="474" font-size="30" font-weight="800" fill="#0f766e" text-anchor="middle">Around 4 to 1</text>
<text x="744" y="514" font-size="27" fill="currentColor" opacity="0.85" text-anchor="middle">a comfortable build</text>
</svg>
<figcaption><strong>Weigh the aircraft exactly as it will fly, with the battery in and the camera fitted.</strong> The number most builders get wrong is the weight, not the thrust: straps, the receiver, a lens filter and a dented prop all count, and a build that was fine on paper at 580 g is a different aircraft at 650 g.</figcaption>
</figure>
<h3>Getting the two numbers</h3>
<table>
<tr><th>Number</th><th>Where it comes from</th></tr>
<tr><td>Thrust per motor</td><td>The manufacturer's thrust table, for your exact prop and battery voltage</td></tr>
<tr><td>Total thrust</td><td>That figure times four</td></tr>
<tr><td>All up weight</td><td>Kitchen scales, with the battery in and everything fitted</td></tr>
</table>
<div class="key-idea"><span class="callout-label">The ratio you are aiming for</span><p>At least 2 to 1 to get off the ground at all, and around 4 to 1 for a build that is pleasant to fly. Below 2 to 1 the aircraft cannot correct itself, and it will feel sluggish and then fall out of the sky.</p></div>
<div class="warning"><span class="callout-label">Use the right row of the thrust table</span><p>Those tables list a thrust for each prop and each cell count. A figure taken from the wrong row can be out by half, and it is always out in the optimistic direction, because the headline number is the biggest one on the page.</p></div>`,
      Intermediate: `<p>The ratio is not a pass or fail line. It sets how much of your thrust is spent staying in the air and how much is left over for everything else, and that second figure is what flying actually feels like.</p>
<figure>
<svg viewBox="0 0 1000 580" role="img" aria-label="Thrust to weight ratio bands and the hover throttle each one implies">
<rect x="24" y="60" width="238" height="150" rx="14" fill="#be123c" opacity="0.2"/>
<text x="143" y="112" font-size="38" font-weight="800" fill="#be123c" text-anchor="middle">1 to 1</text>
<text x="143" y="156" font-size="27" font-weight="800" fill="currentColor" text-anchor="middle">cannot hover</text>
<text x="143" y="192" font-size="26" fill="currentColor" opacity="0.75" text-anchor="middle">100% throttle</text>
<rect x="274" y="60" width="238" height="150" rx="14" fill="#b45309" opacity="0.2"/>
<text x="393" y="112" font-size="38" font-weight="800" fill="#b45309" text-anchor="middle">2 to 1</text>
<text x="393" y="156" font-size="27" font-weight="800" fill="currentColor" text-anchor="middle">bare minimum</text>
<text x="393" y="192" font-size="26" fill="currentColor" opacity="0.75" text-anchor="middle">50% throttle</text>
<rect x="524" y="60" width="238" height="150" rx="14" fill="#0f766e" opacity="0.2"/>
<text x="643" y="112" font-size="38" font-weight="800" fill="#0f766e" text-anchor="middle">4 to 1</text>
<text x="643" y="156" font-size="27" font-weight="800" fill="currentColor" text-anchor="middle">sport flying</text>
<text x="643" y="192" font-size="26" fill="currentColor" opacity="0.75" text-anchor="middle">25% throttle</text>
<rect x="774" y="60" width="202" height="150" rx="14" fill="#7c3aed" opacity="0.2"/>
<text x="875" y="112" font-size="38" font-weight="800" fill="#7c3aed" text-anchor="middle">8 to 1</text>
<text x="875" y="156" font-size="27" font-weight="800" fill="currentColor" text-anchor="middle">racing</text>
<text x="875" y="192" font-size="26" fill="currentColor" opacity="0.75" text-anchor="middle">12% throttle</text>
<text x="500" y="268" font-size="30" font-weight="800" fill="currentColor" opacity="0.65" text-anchor="middle">HOVER THROTTLE IS ONE OVER THE RATIO</text>
<rect x="24" y="300" width="952" height="60" rx="12" fill="currentColor" opacity="0.08"/>
<rect x="24" y="300" width="952" height="60" rx="12" fill="#be123c" opacity="0.3" clip-path="inset(0 0 0 0)"/>
<rect x="500" y="300" width="476" height="60" rx="12" fill="#0f766e" opacity="0.3"/>
<text x="262" y="340" font-size="28" font-weight="800" fill="currentColor" text-anchor="middle">no headroom left</text>
<text x="738" y="340" font-size="28" font-weight="800" fill="currentColor" text-anchor="middle">room to correct</text>
<rect x="24" y="398" width="952" height="156" rx="16" fill="#b45309" opacity="0.13"/>
<text x="500" y="448" font-size="30" font-weight="800" fill="#b45309" text-anchor="middle">Why 2 to 1 is a floor and not a target</text>
<text x="500" y="492" font-size="28" fill="currentColor" opacity="0.85" text-anchor="middle">At 50% hover, holding level uses half your thrust.</text>
<text x="500" y="532" font-size="28" fill="currentColor" opacity="0.85" text-anchor="middle">A gust needs the other half, and then there is none.</text>
</svg>
<figcaption><strong>Hover throttle is the reciprocal of the ratio, and that is the number that matters in the air.</strong> Control authority is whatever thrust is left above hover. At 2 to 1 a correction competes with staying up; at 4 to 1 three quarters of the available thrust is free for the flight controller to use.</figcaption>
</figure>
<h3>Hover throttle is the ratio, upside down</h3>
<p>If the aircraft can lift four times its weight, hovering needs a quarter of that thrust. So hover throttle is one divided by the ratio, and the thrust above hover is your control authority: everything the flight controller has available to correct a gust, climb, or stop a descent.</p>
<table>
<tr><th>Ratio</th><th>Hover throttle</th><th>Left for control</th></tr>
<tr><td class="num">2 to 1</td><td class="num">50%</td><td>Half, and a gust can use all of it</td></tr>
<tr><td class="num">3 to 1</td><td class="num">33%</td><td>Enough for a camera build</td></tr>
<tr><td class="num">4 to 1</td><td class="num">25%</td><td>Comfortable, responsive</td></tr>
<tr><td class="num">8 to 1</td><td class="num">12%</td><td>Racing, and twitchy to fly</td></tr>
</table>
<div class="key-idea"><span class="callout-label">Higher is not simply better</span><p>A very high ratio makes the throttle hard to use: the usable hover range is squeezed into the bottom of the stick, and small inputs produce large changes. A camera build at 8 to 1 is harder to fly smoothly than the same build at 3 to 1.</p></div>
<div class="warning"><span class="callout-label">Thrust figures are measured on a bench</span><p>They are static thrust, at a fixed voltage, on a new prop, with unrestricted airflow. A real aircraft has a sagging battery, a scuffed prop and its own downwash. Treat the table as a ceiling you will not quite reach rather than as a measurement of your build.</p></div>`,
      Advanced: `<p>Two non-linearities make the arithmetic optimistic, and both of them work against you at exactly the moment you need thrust.</p>
<figure>
<svg viewBox="0 0 1000 600" role="img" aria-label="Thrust against throttle showing a non linear curve and why half throttle is not half thrust">
<path d="M150 480 H950 M150 480 V60" stroke="currentColor" opacity="0.3" stroke-width="3"/>
<path d="M150 480 L950 100" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="10 8" opacity="0.45"/>
<path d="M150 480 C 420 440, 640 300, 950 100" fill="none" stroke="#0369a1" stroke-width="8" stroke-linecap="round"/>
<text x="470" y="316" font-size="28" font-weight="800" fill="currentColor" opacity="0.55" transform="rotate(-25 470 316)">what people assume</text>
<text x="560" y="430" font-size="28" font-weight="800" fill="#0369a1">what motors actually do</text>
<path d="M550 480 V394" stroke="#be123c" stroke-width="4" stroke-dasharray="8 6"/>
<circle cx="550" cy="394" r="11" fill="#be123c"/>
<text x="566" y="372" font-size="27" font-weight="800" fill="#be123c">50% throttle</text>
<text x="566" y="406" font-size="26" fill="currentColor" opacity="0.8">gives about 36% thrust</text>
<text x="150" y="528" font-size="27" font-weight="800" fill="currentColor" opacity="0.55">0</text>
<text x="950" y="528" font-size="27" font-weight="800" fill="currentColor" opacity="0.55" text-anchor="end">FULL THROTTLE</text>
<text x="92" y="270" font-size="27" font-weight="800" fill="currentColor" opacity="0.55" text-anchor="middle" transform="rotate(-90 92 270)">THRUST</text>
<rect x="150" y="548" width="800" height="44" rx="10" fill="#0369a1" opacity="0.12"/>
<text x="550" y="580" font-size="27" font-weight="800" fill="currentColor" text-anchor="middle">Thrust rises roughly with the square of motor speed.</text>
</svg>
<figcaption><strong>Thrust is roughly proportional to the square of rotational speed, so the stick is not a thrust dial.</strong> Half stick buys appreciably less than half thrust, which is why a 2 to 1 build hovers well above half stick in practice and has even less margin than the arithmetic suggests. It is also why the last quarter of the throttle range feels so violent.</figcaption>
</figure>
<h3>Thrust against throttle</h3>
<p>Thrust goes roughly with the square of rotational speed, so the throttle stick is not a thrust dial. Half stick is nearer a third of thrust than half of it, which means a 2 to 1 build hovers well above the 50% the simple calculation predicts.</p>
<h3>Voltage sag is the second one</h3>
<p>A battery under load sits below its resting voltage, and the gap widens as it empties and as current rises. Motor thrust depends on the voltage actually at the motor, so the thrust available at the end of a pack is meaningfully below the thrust available at the start.</p>
<table>
<tr><th>Pack state</th><th>Resting</th><th>Under hard load</th></tr>
<tr><td>Full</td><td class="num">4.2 V per cell</td><td class="num">about 3.8 V</td></tr>
<tr><td>Half</td><td class="num">3.8 V per cell</td><td class="num">about 3.5 V</td></tr>
<tr><td>Near empty</td><td class="num">3.5 V per cell</td><td class="num">about 3.2 V</td></tr>
</table>
<div class="warning"><span class="callout-label">Which is why builds crash at the end of a flight</span><p>The aircraft that had adequate margin on a full pack has materially less on a flat one, and a low-voltage build drawing hard current can brown out the flight controller entirely. Size the ratio on sagged voltage, not on the number printed on the battery.</p></div>
<div class="key-idea"><span class="callout-label">Disc loading explains efficiency separately</span><p>Weight divided by total propeller disc area tells you how hard the aircraft works to stay up. A larger prop at lower revolutions moves more air more slowly for the same thrust and is more efficient, which is why endurance builds use big props and racers use small ones. The ratio tells you whether it flies; disc loading tells you for how long.</p></div>`,
      Expert: `<p>Sizing a power system properly means treating weight as a dependent variable rather than an input, because the heaviest single component is chosen last and changes the answer.</p>
<figure>
<svg viewBox="0 0 1000 620" role="img" aria-label="The weight spiral where adding battery capacity adds weight which demands more thrust">
<rect x="340" y="40" width="320" height="104" rx="16" fill="#7c3aed" opacity="0.16"/>
<text x="500" y="84" font-size="28" font-weight="800" fill="#7c3aed" text-anchor="middle">WANT LONGER FLIGHT</text>
<text x="500" y="122" font-size="27" fill="currentColor" opacity="0.8" text-anchor="middle">so fit a bigger battery</text>
<path d="M660 92 C 820 100, 860 180, 830 236" fill="none" stroke="currentColor" opacity="0.45" stroke-width="5"/>
<path d="M826 250 l16 -22 l-22 -6 z" fill="currentColor" opacity="0.45"/>
<rect x="640" y="256" width="336" height="104" rx="16" fill="#be123c" opacity="0.16"/>
<text x="808" y="300" font-size="28" font-weight="800" fill="#be123c" text-anchor="middle">WEIGHT GOES UP</text>
<text x="808" y="338" font-size="27" fill="currentColor" opacity="0.8" text-anchor="middle">ratio falls, hover throttle rises</text>
<path d="M808 372 C 790 470, 660 500, 586 492" fill="none" stroke="currentColor" opacity="0.45" stroke-width="5"/>
<path d="M572 490 l24 -12 l-4 22 z" fill="currentColor" opacity="0.45"/>
<rect x="196" y="446" width="376" height="104" rx="16" fill="#b45309" opacity="0.16"/>
<text x="384" y="490" font-size="28" font-weight="800" fill="#b45309" text-anchor="middle">MOTORS WORK HARDER</text>
<text x="384" y="528" font-size="27" fill="currentColor" opacity="0.8" text-anchor="middle">more current, less efficiency</text>
<path d="M196 476 C 90 450, 80 200, 150 120 C 200 70, 280 66, 336 80" fill="none" stroke="currentColor" opacity="0.45" stroke-width="5"/>
<path d="M350 84 l-24 -10 l4 22 z" fill="currentColor" opacity="0.45"/>
<text x="112" y="300" font-size="28" font-weight="800" fill="currentColor" opacity="0.6" text-anchor="middle" transform="rotate(-90 112 300)">AND BACK ROUND</text>
<rect x="196" y="580" width="608" height="30" rx="8" fill="#0f766e" opacity="0.16"/>
<text x="500" y="604" font-size="26" font-weight="800" fill="currentColor" text-anchor="middle">There is a capacity past which flight time falls.</text>
</svg>
<figcaption><strong>Endurance does not rise forever with battery size.</strong> Past a point, the extra cells cost more in hover current than they add in stored energy, and flight time starts falling again. For a five inch quad that turning point usually arrives somewhere around a quarter to a third of all up weight in battery.</figcaption>
</figure>
<div class="key-idea"><span class="callout-label">The loop, stated plainly</span><p>Battery capacity adds stored energy linearly and adds weight linearly, but the hover current needed to carry that weight rises too. Endurance is capacity divided by hover current, so both terms grow and the ratio turns over. Past the optimum, a bigger battery gives a shorter flight, which is counterintuitive enough that people keep buying one.</p></div>
<h3>Where the current budget actually binds</h3>
<p>The ratio is a thrust question; survival is a current question, and they have different answers. Peak current at full throttle is what sizes the ESCs, the wiring and the battery's discharge rating, and it is roughly four times the single-motor peak rather than anything related to hover.</p>
<table>
<tr><th>Component</th><th>Sized by</th><th>Common mistake</th></tr>
<tr><td>ESC</td><td>Peak current per motor, with headroom</td><td>Sizing on hover current</td></tr>
<tr><td>Battery C rating</td><td>Total peak draw</td><td>Trusting the printed C rating</td></tr>
<tr><td>Main wiring</td><td>Total peak draw and run length</td><td>Reusing thin leads from a lighter build</td></tr>
<tr><td>Motor</td><td>Thrust at the target ratio</td><td>Reading the wrong prop row</td></tr>
</table>
<h3>Margins that are not optional</h3>
<p>Thrust tables are produced by manufacturers with an interest in a large number, on new equipment at a fixed voltage. A sensible build discounts them, carries ESC headroom well above the expected peak, and verifies the result rather than trusting it.</p>
<div class="field"><span class="callout-label">Measure it rather than computing it</span><p>Strap the finished aircraft to a kitchen scale upside down, arm it with props off for safety checks first, then run a proper thrust test on a stand. Builders who do this routinely find the real figure fifteen to twenty five per cent below the table. That gap is the difference between a 2 to 1 design and an aircraft that cannot recover from a gust, and it is knowable for the price of ten minutes on a bench.</p></div>`,
    },
    worksheets: [
      {
        n: 1,
        title: "Will this build fly, and how well",
        difficulty: "Medium",
        brief: `<p>You are costing out a five inch freestyle quad before buying anything. The component weights and the motor's published thrust are below.</p>
<p><strong>Part A.</strong> Compute the total for each line, then the all up weight.</p>
<p><strong>Part B.</strong> The motor's manufacturer data gives <strong>850 g of static thrust</strong> per motor on a 6S pack with the chosen propeller. Work out the total thrust, the thrust to weight ratio, and the approximate hover throttle.</p>
<p>Give the ratio to one decimal place and the hover throttle as a whole percentage.</p>`,
        stubLabel: "Component",
        columns: [
          { key: "each", label: "Each (g)", type: "number", align: "right" },
          { key: "qty", label: "Qty", type: "number", align: "right" },
          { key: "total", label: "Total (g)", type: "number", align: "right", flex: 1.1 },
          { key: "ratio", label: "Ratio or %", type: "number", align: "right", flex: 1.1 },
        ],
        rows: [
          { key: "frame", label: "A · Frame, 5 inch carbon", given: { each: 120, qty: 1 } },
          { key: "motors", label: "A · Motors", given: { each: 32, qty: 4 } },
          { key: "escs", label: "A · ESCs", given: { each: 7, qty: 4 } },
          { key: "fc", label: "A · Flight controller", given: { each: 12, qty: 1 } },
          { key: "battery", label: "A · LiPo 6S 1300 mAh", given: { each: 185, qty: 1 } },
          { key: "props", label: "A · Propellers", given: { each: 5, qty: 4 } },
          { key: "cam", label: "A · Camera and VTX", given: { each: 25, qty: 1 } },
          { key: "misc", label: "A · Straps, cable, solder, screws", given: { each: 30, qty: 1 } },
          { key: "auw", label: "A · All up weight", kind: "total" },
          { key: "thrust", label: "B · Total static thrust", kind: "total", given: { each: 850, qty: 4 } },
          { key: "tw", label: "B · Thrust to weight ratio", kind: "total" },
          { key: "hover", label: "B · Approximate hover throttle", kind: "total" },
        ],
        cells: [
          { row: "frame", col: "total", expected: 120, marks: 1, derivedFrom: { op: "product", from: ["frame:each", "frame:qty"] }, methodMarks: 1 },
          {
            row: "motors",
            col: "total",
            expected: 128,
            marks: 2,
            derivedFrom: { op: "product", from: ["motors:each", "motors:qty"] },
            methodMarks: 1,
            feedback: "Four motors at 32 g. Forgetting to multiply by the quantity is the commonest slip on a weight budget.",
          },
          { row: "escs", col: "total", expected: 28, marks: 1, derivedFrom: { op: "product", from: ["escs:each", "escs:qty"] }, methodMarks: 1 },
          { row: "fc", col: "total", expected: 12, marks: 1, derivedFrom: { op: "product", from: ["fc:each", "fc:qty"] }, methodMarks: 1 },
          { row: "battery", col: "total", expected: 185, marks: 1, derivedFrom: { op: "product", from: ["battery:each", "battery:qty"] }, methodMarks: 1 },
          { row: "props", col: "total", expected: 20, marks: 1, derivedFrom: { op: "product", from: ["props:each", "props:qty"] }, methodMarks: 1 },
          { row: "cam", col: "total", expected: 25, marks: 1, derivedFrom: { op: "product", from: ["cam:each", "cam:qty"] }, methodMarks: 1 },
          { row: "misc", col: "total", expected: 30, marks: 1, derivedFrom: { op: "product", from: ["misc:each", "misc:qty"] }, methodMarks: 1 },
          {
            row: "auw",
            col: "total",
            expected: 548,
            marks: 3,
            derivedFrom: {
              op: "sum",
              from: ["frame:total", "motors:total", "escs:total", "fc:total", "battery:total", "props:total", "cam:total", "misc:total"],
            },
            methodMarks: 2,
            feedback: "The whole aircraft ready to fly, battery and props included. This is the number the regulations use as well.",
          },
          {
            row: "thrust",
            col: "total",
            expected: 3400,
            marks: 2,
            derivedFrom: { op: "product", from: ["thrust:each", "thrust:qty"] },
            methodMarks: 1,
          },
          {
            row: "tw",
            col: "ratio",
            expected: 6.2,
            tolerance: 0.15,
            marks: 3,
            derivedFrom: { op: "quotient", from: ["thrust:total", "auw:total"] },
            methodMarks: 2,
            feedback: "3,400 g of thrust against 548 g of aircraft gives about 6.2 to 1, which is a lively freestyle build.",
          },
          {
            row: "hover",
            col: "ratio",
            expected: 16,
            tolerance: 1,
            marks: 3,
            derivedFrom: { op: "quotient", from: ["auw:total", "thrust:total"], factor: 100 },
            methodMarks: 2,
            feedback:
              "Hover throttle is roughly the inverse of the ratio, so about 16 per cent. That leaves 84 per cent of the throttle range available for everything other than holding altitude.",
          },
        ],
        invariants: [
          {
            key: "auw-adds",
            label: "All up weight is the sum of the parts",
            kind: "cell-is-column-sum",
            cols: ["total"],
            cell: "auw:total",
            marks: 4,
            hint: "The all up weight must equal the eight component totals added together and nothing else. If it does not, the usual cause is forgetting to multiply one of the four-quantity lines, and the motors are the one most often missed.",
          },
        ],
        hints: [
          "Do the eight component lines first, multiplying each weight by its quantity. Four of these eight are quantity four, and they are the ones that get missed.",
          "The battery is the heaviest single item and the props are the lightest. Both go in the all up weight: a weight budget that excludes the battery is not an all up weight.",
          "Thrust to weight is total thrust divided by all up weight, in the same units. Hover throttle is approximately the inverse of that, expressed as a percentage, so a ratio of 6.2 means hovering at about 100 divided by 6.2.",
        ],
        workedAnswer: `<table>
<tr><th>Component</th><th class="num">Each</th><th class="num">Qty</th><th class="num">Total</th></tr>
<tr><td>Frame</td><td class="num">120</td><td class="num">1</td><td class="num">120</td></tr>
<tr><td>Motors</td><td class="num">32</td><td class="num">4</td><td class="num">128</td></tr>
<tr><td>ESCs</td><td class="num">7</td><td class="num">4</td><td class="num">28</td></tr>
<tr><td>Flight controller</td><td class="num">12</td><td class="num">1</td><td class="num">12</td></tr>
<tr><td>Battery</td><td class="num">185</td><td class="num">1</td><td class="num">185</td></tr>
<tr><td>Propellers</td><td class="num">5</td><td class="num">4</td><td class="num">20</td></tr>
<tr><td>Camera and VTX</td><td class="num">25</td><td class="num">1</td><td class="num">25</td></tr>
<tr><td>Straps, cable, solder</td><td class="num">30</td><td class="num">1</td><td class="num">30</td></tr>
<tr><td><strong>All up weight</strong></td><td class="num"></td><td class="num"></td><td class="num"><strong>548</strong></td></tr>
</table>
<p><strong>Total thrust</strong> 4 × 850 = 3,400 g. <strong>Thrust to weight</strong> 3,400 ÷ 548 = <strong>6.2 : 1</strong>. <strong>Hover throttle</strong> ≈ 100 ÷ 6.2 = <strong>16%</strong>.</p>
<p><strong>What 6.2:1 means.</strong> A lively freestyle build. Everything above the thrust needed to hover is control authority, so at 16 per cent hover you have 84 per cent of the range left for climbing, accelerating, correcting gusts and recovering from mistakes. A build at 2:1 hovers at 50 per cent and has only its own weight again in reserve, which is why it feels sluggish and recovers badly: it is not a matter of feel, the aircraft physically cannot produce the angular acceleration the controller is asking for.</p>
<p><strong>Check the hover throttle on the bench.</strong> If this build hovers at 40 per cent rather than 16, either the weight is higher than you calculated or the thrust is lower, and you want to know which before you fly it. The usual answer is weight: components add up to the spreadsheet figure, and then there are cable ties, heat shrink, a battery strap and fifteen grams of solder that nobody listed. The 30 g miscellaneous line exists for exactly that and is usually still too small.</p>
<p><strong>And treat 850 g as an upper bound.</strong> Manufacturer thrust data is measured on a fresh fully charged pack with the motor held still. A propeller in forward flight operates at a different advance ratio and produces substantially less, which is why a quad accelerates hard and then feels like it runs out. The margin in a 6:1 build exists to be consumed at speed.</p>`,
        minutes: 22,
        skills: ["All up weight", "Static thrust", "Thrust to weight ratio", "Hover throttle"],
      },
    ],
    questions: [
      {
        n: 1,
        question: "A build has 3,400 g of total thrust and an all up weight of 548 g. Its thrust to weight ratio is:",
        options: ["About 6.2 : 1", "About 0.16 : 1", "About 2,852 : 1", "Cannot be determined without the battery voltage"],
        answer: 0,
        explanation:
          "Thrust divided by weight in the same units: 3,400 over 548. The second option is the inverse, which is the hover throttle fraction rather than the ratio, and it is a common slip.",
        difficulty: "Easy",
        skill: "Thrust to weight ratio",
      },
      {
        n: 2,
        question: "Why does a build at 2:1 recover badly from a gust?",
        options: [
          "Only its own weight again is available as control authority above hover",
          "The gyroscope cannot measure fast enough at low thrust",
          "The battery sags more at low throttle",
          "Two to one is actually ideal; it recovers well",
        ],
        answer: 0,
        explanation:
          "A multirotor manoeuvres by producing differential thrust, so everything above hover thrust is the margin available for correcting. At 2:1 the aircraft cannot produce the angular acceleration the controller asks for, and the result is control saturation and a slow mushy recovery.",
        difficulty: "Medium",
        skill: "Thrust to weight ratio",
      },
      {
        n: 3,
        question: "Your build should hover at 16 per cent and actually hovers at 40. The most likely explanation is:",
        options: [
          "The all up weight is higher than you calculated",
          "The flight controller is faulty",
          "The props are the wrong diameter for the frame",
          "The ratio calculation is unreliable in principle",
        ],
        answer: 0,
        explanation:
          "Hover throttle is roughly the inverse of the ratio, so a hover that is too high means either more weight or less thrust than assumed. Weight is the usual culprit, because cable ties, heat shrink, a battery strap and solder are never in the spreadsheet.",
        difficulty: "Medium",
        skill: "Hover throttle",
      },
      {
        n: 4,
        question: "Manufacturer static thrust figures should be treated as:",
        options: [
          "An upper bound, measured on a fresh pack with the motor held still",
          "A conservative minimum you will usually exceed",
          "Exact for the first minute of flight",
          "Irrelevant, since real thrust cannot be predicted",
        ],
        answer: 0,
        explanation:
          "Test stand figures use a fully charged pack at sea level with no forward motion. A propeller in flight operates at a different advance ratio and produces less, and the gap widens as the battery sags.",
        difficulty: "Hard",
        skill: "Manufacturer thrust data",
      },
      {
        n: 5,
        question: "Why is a large slow propeller more efficient in hover than a small fast one producing the same thrust?",
        options: [
          "Lower disc loading means lower induced velocity and therefore lower induced power",
          "Large propellers are lighter for the same thrust",
          "Small propellers always have worse motors behind them",
          "They are equally efficient; the difference is only noise",
        ],
        answer: 0,
        explanation:
          "Induced power rises with thrust to the three halves and falls with the square root of disc area, so spreading the same thrust over more disc costs less power. The whole difference between a long-endurance platform and a racing quad is a choice about disc loading.",
        difficulty: "Hard",
        skill: "Disc loading",
      },
      {
        n: 6,
        question: "Which of these must be included in all up weight?",
        options: [
          "The battery and the propellers",
          "The battery but not the propellers",
          "Neither, since both are consumables",
          "Only the airframe and electronics",
        ],
        answer: 0,
        explanation:
          "All up weight is the complete aircraft ready to fly. The battery is usually the single heaviest item, and this is also the figure the regulations use when deciding which category an aircraft falls into.",
        difficulty: "Easy",
        skill: "All up weight",
      },
    ],
  },
  /* ===================================================================== */
  5108: {
    topicId: 5108,
    title: "Battery chemistry, C rating and real endurance",
    summary:
      "A LiPo is the most dangerous object in your workshop and the one whose specification you are most likely to misread.",
    concepts: [
      "LiPo",
      "C rating",
      "Cell count",
      "Depth of discharge",
      "Voltage sag",
      "Storage charge",
    ],
    glossary: {
      LiPo: "Lithium polymer. High energy density, high discharge rate, and genuinely hazardous when damaged or overcharged.",
      "C rating": "A multiplier on capacity giving maximum continuous current. 1.3 Ah at 100C is 130 A.",
      "Cell count": "Cells in series, written 4S or 6S. Each cell is 3.7 V nominal and 4.2 V fully charged.",
      "Depth of discharge": "How much of the capacity you actually use. Taking a LiPo below about 3.5 V per cell under load shortens its life sharply.",
      "Voltage sag": "The drop in pack voltage under load, which is what a C rating really describes.",
      "Storage charge": "About 3.8 V per cell, the state a LiPo should be left at for more than a day or two.",
    },
    body: {
      Beginner: `<p>The battery decides how long you fly and how hard the aircraft can pull. Two numbers on the label matter more than the rest.</p>
<figure>
<svg viewBox="0 0 1000 560" role="img" aria-label="Battery voltage under load falling faster than resting voltage across a flight">
<path d="M150 450 H960 M150 450 V50" stroke="currentColor" opacity="0.3" stroke-width="3"/>
<path d="M170 110 C 400 150, 650 200, 900 330" fill="none" stroke="#0f766e" stroke-width="8" stroke-linecap="round"/>
<path d="M170 190 C 400 240, 650 300, 900 430" fill="none" stroke="#be123c" stroke-width="8" stroke-linecap="round"/>
<text x="470" y="140" font-size="28" font-weight="800" fill="#0f766e">resting voltage</text>
<text x="420" y="300" font-size="28" font-weight="800" fill="#be123c">under load</text>
<path d="M620 232 V322" stroke="currentColor" opacity="0.6" stroke-width="4"/>
<path d="M610 232 h20 M610 322 h20" stroke="currentColor" opacity="0.6" stroke-width="4"/>
<text x="648" y="286" font-size="27" font-weight="800" fill="currentColor" opacity="0.85">this gap is the sag</text>
<text x="170" y="498" font-size="27" font-weight="800" fill="currentColor" opacity="0.55">TAKE OFF</text>
<text x="950" y="498" font-size="27" font-weight="800" fill="currentColor" opacity="0.55" text-anchor="end">LAND NOW</text>
<text x="100" y="250" font-size="27" font-weight="800" fill="currentColor" opacity="0.55" text-anchor="middle" transform="rotate(-90 100 250)">VOLTAGE</text>
<rect x="150" y="516" width="810" height="38" rx="9" fill="#be123c" opacity="0.14"/>
<text x="555" y="544" font-size="26" font-weight="800" fill="currentColor" text-anchor="middle">The alarm reads the sagged figure, not the resting one.</text>
</svg>
<figcaption><strong>A pack that reads 3.7 volts per cell in the air may rest at 3.9 once you land.</strong> That recovery is why a timer is a better endurance limit than a voltage alarm for a new pilot: the alarm fires late under hard throttle and early under gentle cruising, and neither is the state of charge you wanted to know.</figcaption>
</figure>
<h3>Reading the label</h3>
<table>
<tr><th>Marking</th><th>Means</th></tr>
<tr><td>4S</td><td>Four cells in series, about 14.8 volts resting</td></tr>
<tr><td>1500 mAh</td><td>How much charge it stores</td></tr>
<tr><td>100C</td><td>The claimed maximum discharge rate</td></tr>
</table>
<div class="warning"><span class="callout-label">Never run a cell below 3.5 volts</span><p>Lithium polymer cells are damaged by deep discharge and the damage is permanent. Land on the timer, not on the alarm, and store packs at about 3.8 volts per cell rather than full.</p></div>
<div class="key-idea"><span class="callout-label">Treat a damaged pack as dangerous</span><p>A pack that is puffed, pierced or has been in a crash can catch fire hours later. Charge and store in a fireproof bag, away from anything that matters, and never leave one charging unattended.</p></div>`,
      Intermediate: `<p>Capacity tells you how much energy is stored. The C rating is supposed to tell you how quickly you may take it out, and it is the number most often exaggerated.</p>
<figure>
<svg viewBox="0 0 1000 560" role="img" aria-label="Battery voltage under load falling faster than resting voltage across a flight">
<path d="M150 450 H960 M150 450 V50" stroke="currentColor" opacity="0.3" stroke-width="3"/>
<path d="M170 110 C 400 150, 650 200, 900 330" fill="none" stroke="#0f766e" stroke-width="8" stroke-linecap="round"/>
<path d="M170 190 C 400 240, 650 300, 900 430" fill="none" stroke="#be123c" stroke-width="8" stroke-linecap="round"/>
<text x="470" y="140" font-size="28" font-weight="800" fill="#0f766e">resting voltage</text>
<text x="420" y="300" font-size="28" font-weight="800" fill="#be123c">under load</text>
<path d="M620 232 V322" stroke="currentColor" opacity="0.6" stroke-width="4"/>
<path d="M610 232 h20 M610 322 h20" stroke="currentColor" opacity="0.6" stroke-width="4"/>
<text x="648" y="286" font-size="27" font-weight="800" fill="currentColor" opacity="0.85">this gap is the sag</text>
<text x="170" y="498" font-size="27" font-weight="800" fill="currentColor" opacity="0.55">TAKE OFF</text>
<text x="950" y="498" font-size="27" font-weight="800" fill="currentColor" opacity="0.55" text-anchor="end">LAND NOW</text>
<text x="100" y="250" font-size="27" font-weight="800" fill="currentColor" opacity="0.55" text-anchor="middle" transform="rotate(-90 100 250)">VOLTAGE</text>
<rect x="150" y="516" width="810" height="38" rx="9" fill="#be123c" opacity="0.14"/>
<text x="555" y="544" font-size="26" font-weight="800" fill="currentColor" text-anchor="middle">The alarm reads the sagged figure, not the resting one.</text>
</svg>
<figcaption><strong>A pack that reads 3.7 volts per cell in the air may rest at 3.9 once you land.</strong> That recovery is why a timer is a better endurance limit than a voltage alarm for a new pilot: the alarm fires late under hard throttle and early under gentle cruising, and neither is the state of charge you wanted to know.</figcaption>
</figure>
<h3>Working out the current a pack must supply</h3>
<p>Multiply capacity in amp hours by the C rating. A 1500 mAh pack rated 100C claims 1.5 times 100, which is 150 amps. A four motor build drawing 30 amps each at full throttle needs 120 amps, so on paper there is headroom.</p>
<div class="warning"><span class="callout-label">On paper</span><p>Published C ratings are marketing figures far more often than measurements, and a pack that sags badly under load is telling you its real rating regardless of what is printed on it. Voltage under load is the honest test.</p></div>
<h3>Why flight time is not capacity divided by current</h3>
<table>
<tr><th>Assumption</th><th>Reality</th></tr>
<tr><td>Use the full capacity</td><td>You land at about 20% remaining to protect the cells</td></tr>
<tr><td>Hover current throughout</td><td>Real flying is throttle changes, which cost more</td></tr>
<tr><td>Rated voltage throughout</td><td>Voltage falls, so current rises for the same thrust</td></tr>
</table>
<p>A realistic figure is around sixty to seventy per cent of the naive calculation, and that is before wind.</p>`,
      Advanced: `<p>Internal resistance is the number that actually predicts behaviour, and it is measurable with a decent charger. Sag is current times internal resistance, so a pack with low resistance holds its voltage and a tired one does not.</p>
<figure>
<svg viewBox="0 0 1000 560" role="img" aria-label="Battery voltage under load falling faster than resting voltage across a flight">
<path d="M150 450 H960 M150 450 V50" stroke="currentColor" opacity="0.3" stroke-width="3"/>
<path d="M170 110 C 400 150, 650 200, 900 330" fill="none" stroke="#0f766e" stroke-width="8" stroke-linecap="round"/>
<path d="M170 190 C 400 240, 650 300, 900 430" fill="none" stroke="#be123c" stroke-width="8" stroke-linecap="round"/>
<text x="470" y="140" font-size="28" font-weight="800" fill="#0f766e">resting voltage</text>
<text x="420" y="300" font-size="28" font-weight="800" fill="#be123c">under load</text>
<path d="M620 232 V322" stroke="currentColor" opacity="0.6" stroke-width="4"/>
<path d="M610 232 h20 M610 322 h20" stroke="currentColor" opacity="0.6" stroke-width="4"/>
<text x="648" y="286" font-size="27" font-weight="800" fill="currentColor" opacity="0.85">this gap is the sag</text>
<text x="170" y="498" font-size="27" font-weight="800" fill="currentColor" opacity="0.55">TAKE OFF</text>
<text x="950" y="498" font-size="27" font-weight="800" fill="currentColor" opacity="0.55" text-anchor="end">LAND NOW</text>
<text x="100" y="250" font-size="27" font-weight="800" fill="currentColor" opacity="0.55" text-anchor="middle" transform="rotate(-90 100 250)">VOLTAGE</text>
<rect x="150" y="516" width="810" height="38" rx="9" fill="#be123c" opacity="0.14"/>
<text x="555" y="544" font-size="26" font-weight="800" fill="currentColor" text-anchor="middle">The alarm reads the sagged figure, not the resting one.</text>
</svg>
<figcaption><strong>A pack that reads 3.7 volts per cell in the air may rest at 3.9 once you land.</strong> That recovery is why a timer is a better endurance limit than a voltage alarm for a new pilot: the alarm fires late under hard throttle and early under gentle cruising, and neither is the state of charge you wanted to know.</figcaption>
</figure>
<table>
<tr><th>Per cell resistance</th><th>Condition</th></tr>
<tr><td class="num">Under 4 milliohms</td><td>Healthy, performs to specification</td></tr>
<tr><td class="num">4 to 8</td><td>Aged, noticeably softer at full throttle</td></tr>
<tr><td class="num">Over 10</td><td>Retire it; the sag will trip a low voltage cut</td></tr>
</table>
<div class="key-idea"><span class="callout-label">This is why the same build feels different on two packs</span><p>Identical labels, different internal resistance, and the aircraft has measurably less punch on the tired one. Logging resistance at every charge turns pack replacement into a scheduled decision rather than a surprise during a flight.</p></div>
<h3>Temperature cuts both ways</h3>
<p>Internal resistance rises sharply in the cold, so a winter first flight on a cold pack sags far more than the same pack warm. Packs should be flown warm and charged warm, and a pack that comes off the aircraft hot has been worked beyond its comfortable rate.</p>`,
      Expert: `<p>The useful model is a voltage source behind a resistance, where both terms move with state of charge, temperature and age. Everything surprising about pack behaviour falls out of that.</p>
<figure>
<svg viewBox="0 0 1000 560" role="img" aria-label="Battery voltage under load falling faster than resting voltage across a flight">
<path d="M150 450 H960 M150 450 V50" stroke="currentColor" opacity="0.3" stroke-width="3"/>
<path d="M170 110 C 400 150, 650 200, 900 330" fill="none" stroke="#0f766e" stroke-width="8" stroke-linecap="round"/>
<path d="M170 190 C 400 240, 650 300, 900 430" fill="none" stroke="#be123c" stroke-width="8" stroke-linecap="round"/>
<text x="470" y="140" font-size="28" font-weight="800" fill="#0f766e">resting voltage</text>
<text x="420" y="300" font-size="28" font-weight="800" fill="#be123c">under load</text>
<path d="M620 232 V322" stroke="currentColor" opacity="0.6" stroke-width="4"/>
<path d="M610 232 h20 M610 322 h20" stroke="currentColor" opacity="0.6" stroke-width="4"/>
<text x="648" y="286" font-size="27" font-weight="800" fill="currentColor" opacity="0.85">this gap is the sag</text>
<text x="170" y="498" font-size="27" font-weight="800" fill="currentColor" opacity="0.55">TAKE OFF</text>
<text x="950" y="498" font-size="27" font-weight="800" fill="currentColor" opacity="0.55" text-anchor="end">LAND NOW</text>
<text x="100" y="250" font-size="27" font-weight="800" fill="currentColor" opacity="0.55" text-anchor="middle" transform="rotate(-90 100 250)">VOLTAGE</text>
<rect x="150" y="516" width="810" height="38" rx="9" fill="#be123c" opacity="0.14"/>
<text x="555" y="544" font-size="26" font-weight="800" fill="currentColor" text-anchor="middle">The alarm reads the sagged figure, not the resting one.</text>
</svg>
<figcaption><strong>A pack that reads 3.7 volts per cell in the air may rest at 3.9 once you land.</strong> That recovery is why a timer is a better endurance limit than a voltage alarm for a new pilot: the alarm fires late under hard throttle and early under gentle cruising, and neither is the state of charge you wanted to know.</figcaption>
</figure>
<h3>Why low voltage cutoffs cause crashes</h3>
<div class="warning"><span class="callout-label">The failure sequence</span><p>Hard throttle sags the pack below the cutoff, the controller reduces power, the aircraft drops, the pilot applies more throttle, and the pack sags further. A cutoff set on resting voltage rather than on sagged voltage turns a low battery into an uncommanded descent at the worst moment. Set it on what the pack does under load, and prefer a soft cutoff that reduces power gradually.</p></div>
<h3>Energy density, and why it is the whole constraint</h3>
<p>Lithium polymer stores roughly 150 to 200 watt hours per kilogram against about 12,000 for petrol. Electric multirotors are therefore endurance-limited in a way no amount of build quality fixes, and the entire design space, including the weight spiral, follows from that single number.</p>
<div class="field"><span class="callout-label">Treat packs as consumables with a recorded life</span><p>Cycle count, internal resistance and the date of first use, written on the pack itself. A fleet operator who does this replaces packs on evidence; one who does not discovers a tired pack during a flight, which is the expensive way to find out. Retired packs are discharged to storage voltage and disposed of properly, never in household waste.</p></div>`,
    },
    worksheets: [
      {
        n: 1,
        title: "Current budget and real flight time",
        difficulty: "Medium",
        brief: `<p>The build from the previous topic uses a <strong>6S 1300 mAh 100C</strong> pack.</p>
<p><strong>Part A.</strong> Add up the current the aircraft draws in a steady hover. The four motors and the three electrical loads are given.</p>
<p><strong>Part B.</strong> Work out three things: the pack's maximum continuous current from its C rating, the usable capacity at a sensible 80 per cent depth of discharge, and the resulting hover endurance in minutes.</p>
<p>Give the endurance to one decimal place. Capacity is in milliamp hours and current is in amps, so watch the thousands.</p>`,
        stubLabel: "Item",
        columns: [
          { key: "amps", label: "Current (A)", type: "number", align: "right", flex: 1.1 },
          { key: "value", label: "Capacity or time", type: "number", align: "right", flex: 1.3 },
        ],
        rows: [
          { key: "motors", label: "A · Four motors at hover", given: { amps: 12 } },
          { key: "vtx", label: "A · Video transmitter", given: { amps: 0.5 } },
          { key: "fcrx", label: "A · Flight controller and receiver", given: { amps: 0.2 } },
          { key: "cam", label: "A · Camera", given: { amps: 0.3 } },
          { key: "totalA", label: "A · Total hover current", kind: "total" },
          { key: "cap", label: "B · Pack capacity (mAh)", kind: "total", given: { value: 1300 } },
          { key: "maxc", label: "B · Max continuous current from the C rating", kind: "total" },
          { key: "usable", label: "B · Usable capacity at 80% DoD (mAh)", kind: "total" },
          { key: "endurance", label: "B · Hover endurance (minutes)", kind: "total" },
        ],
        cells: [
          {
            row: "totalA",
            col: "amps",
            expected: 13,
            marks: 3,
            derivedFrom: { op: "sum", from: ["motors:amps", "vtx:amps", "fcrx:amps", "cam:amps"] },
            methodMarks: 2,
            feedback:
              "12 plus 0.5 plus 0.2 plus 0.3 is 13 A. The three small loads look negligible and together they are a full amp, which is 8 per cent of your flight time.",
          },
          {
            row: "maxc",
            col: "value",
            expected: 130,
            marks: 3,
            derivedFrom: { op: "product", from: ["cap:value"], factor: 0.1 },
            methodMarks: 2,
            feedback:
              "1300 mAh is 1.3 Ah, and 1.3 times 100C is 130 A. Note how far above the 13 A hover draw that is: the C rating is sized for peak demand, not for cruising.",
          },
          {
            row: "usable",
            col: "value",
            expected: 1040,
            marks: 3,
            derivedFrom: { op: "product", from: ["cap:value"], factor: 0.8 },
            methodMarks: 2,
            feedback:
              "80 per cent of 1300. Landing at about 3.5 V per cell under load is the convention, and running packs flat to find the last minute visibly halves their life.",
          },
          {
            row: "endurance",
            col: "value",
            expected: 4.8,
            tolerance: 0.2,
            marks: 4,
            derivedFrom: { op: "quotient", from: ["usable:value", "totalA:amps"], factor: 0.06 },
            methodMarks: 3,
            feedback:
              "1040 mAh is 1.04 Ah. Divided by 13 A gives 0.08 hours, which is 4.8 minutes. The factor of 60 converting hours to minutes and the factor of 1000 converting mAh to Ah are where most arithmetic goes wrong.",
          },
        ],
        invariants: [
          {
            key: "current-adds",
            label: "The hover current is the sum of the loads",
            kind: "cell-is-column-sum",
            cols: ["amps"],
            cell: "totalA:amps",
            marks: 3,
            hint: "The total has to be the four load figures added together. If it does not add up, the usual cause is dropping the three small electrical loads as negligible, and together they are a full amp.",
          },
        ],
        hints: [
          "Part A is addition. The point of it is that the three small loads together are not small: add them before deciding they do not matter.",
          "For the C rating, convert capacity to amp hours first. 1300 mAh is 1.3 Ah, and the C rating multiplies that.",
          "For endurance: usable capacity in amp hours, divided by current in amps, gives hours. Multiply by 60 for minutes. 1.04 divided by 13 is 0.08 hours, which is 4.8 minutes.",
        ],
        workedAnswer: `<p><strong>Part A.</strong> 12 + 0.5 + 0.2 + 0.3 = <strong>13 A</strong> in a steady hover.</p>
<p><strong>Part B.</strong> Max continuous current 1.3 Ah × 100C = <strong>130 A</strong>. Usable capacity 1300 × 0.8 = <strong>1040 mAh</strong>. Endurance 1.04 Ah ÷ 13 A = 0.08 h = <strong>4.8 minutes</strong>.</p>
<p><strong>Read the two current figures against each other.</strong> The pack can deliver 130 A and the aircraft draws 13 A in hover. That tenfold margin is not waste: a 6:1 thrust to weight build pulls near its peak during hard manoeuvres, and current rises roughly as the cube of rotational speed while thrust rises as the square. The C rating is sized for those peaks, not for cruising, which is why a pack that is adequate on paper for hover can sag badly in flight.</p>
<p><strong>Why 4.8 minutes and not 6.</strong> Nameplate capacity gives six minutes and you will not get it. Twenty per cent is left in the pack because taking a LiPo below about 3.5 V per cell under load shortens its life sharply, and the arithmetic has to use usable capacity rather than the number on the label. Flying to the label is the single most common reason people replace packs every season.</p>
<p><strong>And this is the optimistic figure.</strong> It assumes a steady hover, which almost no flight is. Real average current on a freestyle flight is well above hover draw, so a four and a half minute hover endurance translates to perhaps three minutes of actual flying. Builders who plan on nameplate capacity and hover current are routinely surprised by a factor of two.</p>
<p><strong>One number worth tracking that is not on this sheet.</strong> Internal resistance per cell, which a good charger reports. The C rating is unregulated and routinely inflated; resistance is measurable and rises as the pack ages. A pack whose resistance has climbed materially from new has aged regardless of what the label says, and that measurement is the only honest way to know when to retire it.</p>`,
        minutes: 20,
        skills: ["LiPo", "C rating", "Depth of discharge", "Voltage sag"],
      },
    ],
    questions: [
      {
        n: 1,
        question: "A 1300 mAh pack rated 100C can supply a maximum continuous current of:",
        options: ["130 A", "1300 A", "100 A", "13 A"],
        answer: 0,
        explanation:
          "Convert to amp hours first: 1300 mAh is 1.3 Ah, and 1.3 multiplied by the 100C rating gives 130 A. Forgetting the thousands conversion gives the second option.",
        difficulty: "Easy",
        skill: "C rating",
      },
      {
        n: 2,
        question: "Why should you land with about 20 per cent of the capacity unused?",
        options: [
          "Taking a LiPo below about 3.5 V per cell under load sharply shortens its life",
          "The last 20 per cent cannot physically be extracted",
          "It is a legal requirement",
          "The flight controller will not arm below that",
        ],
        answer: 0,
        explanation:
          "Depth of discharge governs cycle life more than anything else you control. Running packs flat to find the last minute of flight visibly halves their useful life, which is why endurance should be computed on usable capacity.",
        difficulty: "Medium",
        skill: "Depth of discharge",
      },
      {
        n: 3,
        question: "A C rating is best understood as a statement about:",
        options: [
          "Internal resistance, and therefore how much the pack sags under load",
          "How quickly the pack can be charged",
          "The number of cycles the pack will last",
          "The pack's energy density",
        ],
        answer: 0,
        explanation:
          "Current drawn through internal resistance drops the terminal voltage, and a high C pack is one whose resistance is low enough that the sag stays small. A marginal pack does not fail dramatically, it just delivers less power than your thrust calculation assumed.",
        difficulty: "Hard",
        skill: "Voltage sag",
      },
      {
        n: 4,
        question: "A LiPo that will sit unused for a month should be left at:",
        options: [
          "About 3.8 V per cell",
          "Fully charged at 4.2 V per cell",
          "Fully discharged",
          "It makes no difference",
        ],
        answer: 0,
        explanation:
          "Calendar ageing is driven by time at high state of charge and by temperature, so a pack left full for a month loses capacity it does not get back. Most chargers have a storage mode, and using it after every session is the cheapest thing you can do for your batteries.",
        difficulty: "Medium",
        skill: "Storage charge",
      },
      {
        n: 5,
        question: "Putting a 6S pack into a build designed for 4S will:",
        options: [
          "Destroy the electronics, because the voltage is half as much again",
          "Work, but with reduced flight time",
          "Work, but the motors will run slower",
          "Trigger a low voltage warning and refuse to arm",
        ],
        answer: 0,
        explanation:
          "4S is 14.8 V nominal and 6S is 22.2 V. Components rated for the lower voltage fail immediately, which is why cell count is the first thing to check on a pack you have not used before.",
        difficulty: "Easy",
        skill: "Cell count",
      },
      {
        n: 6,
        question: "Why is water ineffective on a LiPo fire?",
        options: [
          "Thermal runaway is self-sustaining and supplies its own oxidiser",
          "Water conducts electricity and would short the pack",
          "The fire burns too hot for water to reach it",
          "Water is effective and is the recommended response",
        ],
        answer: 0,
        explanation:
          "Once the cascade of separator breakdown and electrolyte decomposition starts it sustains itself, so the correct response is containment and evacuation rather than extinguishing. A metal container and sand are the realistic workshop provisions.",
        difficulty: "Hard",
        skill: "LiPo",
      },
      {
        n: 7,
        question: "A pack whose cells repeatedly refuse to balance should be:",
        options: [
          "Retired, because a cell is on its way out",
          "Charged at a lower current until they balance",
          "Flown only on short flights",
          "Stored fully discharged",
        ],
        answer: 0,
        explanation:
          "A cell that drifts out of balance will be pushed above 4.2 V by a charger balancing to a pack average, and overcharge is the dominant cause of thermal runaway. A pack that will not balance is telling you something rather than being inconvenient.",
        difficulty: "Hard",
        skill: "LiPo",
      },
    ],
  },

  /* ===================================================================== */
  5109: {
    topicId: 5109,
    title: "Motors, ESCs and propeller matching",
    summary:
      "Three components that only make sense together. Choose them independently and you get a build that overheats, sags or will not lift.",
    concepts: ["Kv", "Prop pitch", "Current headroom", "ESC rating", "Motor stator size"],
    glossary: {
      Kv: "Motor revolutions per volt with no load. A speed constant, not a power rating.",
      "Prop pitch": "The theoretical distance a propeller advances in one revolution, written as the second number in 5x4.3.",
      "Current headroom": "The margin between the peak current a motor and prop will draw and what the ESC is rated for.",
      "ESC rating": "The continuous current an ESC can pass. Burst ratings are brief and should not be designed against.",
      "Motor stator size": "The stator's diameter and height in millimetres, such as 2207, which indicates how much torque it can produce.",
      "Over-propping": "Fitting a propeller that loads the motor beyond what the system can supply, which overheats everything.",
    },
    body: {
      Beginner: `<p>Motor, ESC and propeller have to be chosen as a set. The propeller decides how hard the motor has to work, the motor decides how much current it pulls, and the ESC has to be able to pass that current without cooking.</p>
<p><strong>Kv</strong> is the motor's speed constant: revolutions per volt with nothing attached. High Kv means it wants to spin fast, so it suits a small propeller and a lower cell count. Low Kv wants to turn a bigger propeller more slowly on a higher cell count.</p>
<p><strong>Prop numbers</strong> like 5x4.3x3 mean five inch diameter, 4.3 inch pitch, three blades. Bigger diameter, more pitch and more blades all mean more thrust and more current.</p>
<p>The mistake to avoid is <strong>over-propping</strong>: fitting too much propeller for the motor and the ESC. It feels powerful for about thirty seconds and then the motors are too hot to touch and the ESCs start failing. Hot motors after a flight is the warning.</p>
<p>Leave headroom on the ESC. If the combination pulls 35 amps at full throttle, a 35 amp ESC is not enough. Use the manufacturer's test data, find the peak current, and give yourself a real margin above it.</p>`,
      Intermediate: `<p>These three components form a system and the published test data is what ties them together. A motor manufacturer tests each motor with a range of propellers on a range of cell counts and publishes thrust and current for each combination. That table is the design document, and choosing components without consulting it is guessing.</p>
<p>Kv and cell count trade off directly, because the motor's unloaded speed is Kv multiplied by voltage. The same airframe can be built with a high Kv motor on 4S or a lower Kv motor on 6S and reach similar speeds, but the current differs: higher voltage at lower current is more efficient, because resistive losses go with the square of current. That is the engineering reason the hobby migrated from 4S to 6S.</p>
<p>Propeller choice loads the motor. More diameter, more pitch or more blades each increase the torque required and therefore the current drawn at a given throttle. Over-propping is the failure mode: the system produces impressive thrust briefly and then overheats, because the loss is dissipated in the motor windings and the ESC MOSFETs.</p>
<p>ESC selection should be based on the peak current from the test data with real headroom above it, and on the continuous rating rather than the burst rating. A burst rating describes a few seconds, and a quad at full throttle for a few seconds is a normal thing to do, not an exceptional one.</p>`,
      Advanced: `<p>The motor's torque constant is the reciprocal of Kv in consistent units, so a low Kv motor produces more torque per amp. That is the physically meaningful statement, and it explains why low Kv suits large propellers: a large prop presents more torque load, and a motor with a higher torque constant supplies it at lower current. Kv is therefore a proxy for a torque constant, and treating it as a power rating leads directly to mismatched builds.</p>
<p>Stator volume is the better first-order predictor of a motor's capability, since torque scales with the air gap area and the stator dimensions determine it. A 2207 and a 2306 have similar volumes and comparable capability despite different aspect ratios, with the taller narrower stator favouring torque and the shorter wider one favouring rotational speed. Comparing motors by Kv alone, across different stator sizes, is comparing nothing useful.</p>
<p>Thermal limits rather than electrical ones usually bound these systems. Copper losses rise with the square of current and the heat has to leave through a small aluminium bell with limited airflow, so the practical constraint is the duty cycle rather than the instantaneous peak. A combination that is fine for a racing lap can cook on a long full-throttle climb, which is why the test data's current figures need interpreting alongside how the aircraft will be flown.</p>
<p>ESC failure in these builds is predominantly thermal or desync related rather than a manufacturing problem. Desync is more likely with high Kv motors and aggressive timing, and it presents as a sudden loss of thrust on one arm with a distinctive sound. Diagnosing it requires the RPM telemetry that only bidirectional digital protocols provide, which is a practical argument for choosing those ESCs over cheaper analogue ones.</p>`,
      Expert: `<p>The motor can be modelled adequately for design purposes as a back-EMF constant and a winding resistance, with torque proportional to current through the torque constant and back-EMF proportional to speed through its reciprocal. Efficiency peaks well below the maximum current, typically at a small fraction of stall torque, and the practical consequence is that a motor operated near its thermal limit is operating far from its efficiency peak. Designing for peak thrust and designing for endurance therefore pull in opposite directions through the same parameter.</p>
<p>Propeller performance at these scales sits in a low Reynolds number regime, roughly tens of thousands, where laminar separation dominates and the aerofoil sections behave poorly relative to their full-scale counterparts. This is why small propeller figures of merit are low, why blade count beyond three gives diminishing returns through interference, and why pitch distribution matters more than the single pitch number printed on the hub.</p>
<p>The system optimisation problem is genuinely multi-objective and the usual framing obscures it. Thrust, efficiency, thermal margin, responsiveness and noise are not simultaneously maximisable, and the hobby's preference for high Kv on small props optimises responsiveness at a substantial cost in efficiency, which is a legitimate choice for freestyle and an indefensible one for a survey aircraft. Making the objective explicit before choosing components is the actual engineering step, and it is the one usually skipped.</p>
<p>On ESC design, the migration to digital protocols and bidirectional telemetry changed the diagnostic landscape more than the control landscape. RPM feedback enables the dynamic notch filtering that produced most of the last decade's improvement in flight quality, and it does so by letting the filter track the dominant noise source narrowly rather than attenuating a wide band. The phase cost of a narrow tracking notch is far lower than that of a broad low-pass, which is why the same airframe flies measurably better on the same gains.</p>`,
    },
    parts: [
      {
        n: 1,
        title: "Trace the power path and match the leads",
        diagram: "drone-power",
        brief: `<p>This is the power path of a five inch quadcopter, from the battery on the left to the four motors on the right.</p>
<p>Name each numbered point, then match each connection to what lands on it.</p>
<p>One of the components here is the one most first builds leave out, and its absence shows up as a gyro that will not settle rather than as anything obviously electrical.</p>`,
        hotspots: [
          {
            key: "pack",
            label: "LiPo pack",
            x: 14,
            y: 51,
            does: "Supplies everything. Its cell count sets the system voltage and its C rating sets how much current it can deliver without sagging.",
            confusedWith:
              "A pack of the same capacity but a different cell count. The capacity is printed larger and the cell count is the number that destroys your electronics if you get it wrong.",
          },
          {
            key: "xt60",
            label: "XT60 connector",
            x: 30,
            y: 51,
            does: "The main battery connector. Rated for around 60 A continuous, which is why larger builds use XT90 or AS150 instead.",
            confusedWith:
              "The balance connector, which is the small white plug with one wire per cell. That one is for charging and carries no flight current.",
          },
          {
            key: "pdb",
            label: "Power distribution board",
            x: 49,
            y: 51,
            does: "Splits the battery current to the four ESCs and carries a regulator stepping the voltage down to 5 V for the flight controller and receiver.",
            confusedWith:
              "The flight controller, which often sits in the same stack. The PDB has the thick battery pads and no USB socket.",
          },
          {
            key: "cap",
            label: "Low ESR capacitor",
            x: 38,
            y: 30,
            does: "Absorbs the voltage spikes the ESCs put back onto the power rail. Leaving it out is the commonest cause of a gyro that will not settle and of unexplained ESC failures.",
            confusedWith:
              "A filter on the video supply, which is a different and much smaller component. This one goes directly across the main battery input.",
          },
          {
            key: "esc",
            label: "ESC",
            x: 75,
            y: 24,
            does: "Takes battery voltage and a throttle command and produces the three-phase switching the motor needs. Its continuous current rating is what you design against.",
            confusedWith:
              "The BEC, which is the regulator producing 5 V. Some ESCs contain one and the function is separate.",
          },
          {
            key: "mot",
            label: "Brushless motor",
            x: 90,
            y: 24,
            does: "Three wires, no inherent direction. Swapping any two reverses it, which is how motor direction is set during setup.",
            confusedWith:
              "Nothing visually, though motor numbering is routinely confused: Betaflight counts from the rear left rather than the front.",
          },
        ],
        wiring: [
          {
            from: "pack",
            to: "XT60 then the PDB battery pads",
            note: "The whole current of the aircraft goes through this one pair of joints, which is why they are the joints worth inspecting first after any hard landing.",
          },
          {
            from: "pdb",
            to: "Four ESC power pairs plus a 5 V regulated output",
            note: "The regulated output feeds the flight controller and receiver. A PDB without one needs a separate BEC.",
          },
          {
            from: "cap",
            to: "Directly across the main battery input",
            note: "As close to the battery pads as possible. Fitted on a long lead it does much less, because the inductance of the lead defeats the point of it.",
          },
          {
            from: "esc",
            to: "Three motor phases plus one signal wire",
            note: "Three thick wires carry the drive and one thin wire carries the throttle command from the flight controller.",
          },
        ],
        minutes: 14,
        skills: ["ESC rating", "Current headroom", "Kv"],
      },
    ],
    worksheets: [
      {
        n: 1,
        title: "Choose an ESC with real headroom",
        difficulty: "Medium",
        brief: `<p>You have picked a 2207 motor at 1960 Kv on a 6S pack. The manufacturer's test data for the propeller you want gives:</p>
<table>
<tr><th>Throttle</th><th class="num">Thrust per motor (g)</th><th class="num">Current per motor (A)</th></tr>
<tr><td>50%</td><td class="num">410</td><td class="num">8.1</td></tr>
<tr><td>75%</td><td class="num">650</td><td class="num">19.4</td></tr>
<tr><td>100%</td><td class="num">850</td><td class="num">31.2</td></tr>
</table>
<p><strong>Part A.</strong> Work out the total current the four motors draw at full throttle, and the headroom a 35 A ESC and a 45 A ESC would each leave over the per-motor peak. Express headroom as a percentage of the peak draw.</p>
<p><strong>Part B.</strong> Say whether each ESC is an acceptable choice.</p>
<p>Note how steeply current rises against thrust: from 50 to 100 per cent the thrust roughly doubles and the current nearly quadruples. That relationship is why headroom matters.</p>`,
        stubLabel: "Figure",
        columns: [
          { key: "amps", label: "Current (A)", type: "number", align: "right", flex: 1.1 },
          { key: "pct", label: "Headroom (%)", type: "number", align: "right", flex: 1.1 },
          {
            key: "verdict",
            label: "Acceptable?",
            type: "select",
            options: ["Yes, with margin", "Marginal", "No, under-rated"],
            flex: 1.4,
          },
        ],
        rows: [
          { key: "perMotor", label: "A · Peak current per motor", given: { amps: 31.2 } },
          { key: "allFour", label: "A · Peak current, all four motors" },
          { key: "esc35", label: "A · 35 A ESC headroom over the peak" },
          { key: "esc45", label: "A · 45 A ESC headroom over the peak" },
          { key: "v35", label: "B · Verdict on the 35 A ESC", kind: "total" },
          { key: "v45", label: "B · Verdict on the 45 A ESC", kind: "total" },
        ],
        cells: [
          {
            row: "allFour",
            col: "amps",
            expected: 124.8,
            tolerance: 0.5,
            marks: 3,
            derivedFrom: { op: "product", from: ["perMotor:amps"], factor: 4 },
            methodMarks: 2,
            feedback:
              "Four motors at 31.2 A is 124.8 A. Check that against your pack: a 1300 mAh 100C pack is rated 130 A, so full throttle on all four motors is essentially the pack's entire capability.",
          },
          {
            row: "esc35",
            col: "pct",
            expected: 12,
            tolerance: 1.5,
            marks: 3,
            feedback:
              "35 against a 31.2 A peak is only 3.8 A of margin, which is about 12 per cent. That is not headroom, it is a rounding error.",
          },
          {
            row: "esc45",
            col: "pct",
            expected: 44,
            tolerance: 2,
            marks: 3,
            feedback: "45 against 31.2 is 13.8 A of margin, about 44 per cent, which is a sensible working margin.",
          },
          {
            row: "v35",
            col: "verdict",
            expected: "No, under-rated",
            marks: 3,
            feedback:
              "Twelve per cent margin against a figure from a bench test with unlimited cooling, on a component whose rating is usually quoted optimistically. This is how ESCs fail thermally.",
          },
          {
            row: "v45",
            col: "verdict",
            expected: "Yes, with margin",
            marks: 2,
            feedback: "Forty-four per cent is a working margin that survives a hot day, a long climb and an ageing ESC.",
          },
        ],
        invariants: [],
        hints: [
          "Headroom as a percentage is the margin divided by the peak draw, not by the ESC rating. 35 minus 31.2 is 3.8, and 3.8 over 31.2 is your answer.",
          "Look at the test data before judging either ESC. Current nearly quadruples between half and full throttle while thrust only doubles, so the peak figure is reached easily rather than exceptionally.",
          "The 35 A ESC leaves about 12 per cent and the 45 A leaves about 44 per cent. Ask yourself which of those survives a hot day, a long full-throttle climb and an ESC that has aged.",
        ],
        workedAnswer: `<p><strong>Part A.</strong> Four motors at 31.2 A each is <strong>124.8 A</strong> total. The 35 A ESC leaves 3.8 A over the 31.2 A peak, which is <strong>12 per cent</strong>. The 45 A ESC leaves 13.8 A, which is <strong>44 per cent</strong>.</p>
<p><strong>Part B.</strong> The 35 A ESC is <strong>under-rated</strong>. The 45 A ESC is <strong>acceptable with margin</strong>.</p>
<p><strong>Why 12 per cent is not headroom.</strong> The 31.2 A figure comes from a bench test with a fully charged pack, ambient temperature and unlimited cooling. In the air the ESC sits inside a stack with little airflow, the day may be 38 degrees, and the component's continuous rating is itself usually quoted optimistically. Twelve per cent absorbs none of that, and the failure mode is thermal: the MOSFETs run hot, the rating falls as they do, and you lose a motor mid-flight.</p>
<p><strong>The shape of the test data is the lesson.</strong> Between 50 and 100 per cent throttle, thrust goes from 410 to 850 grams, roughly doubling, while current goes from 8.1 to 31.2 A, nearly quadrupling. Current rises roughly as the cube of rotational speed while thrust rises as the square, which means the last bit of thrust is disproportionately expensive and the peak figure is reached easily rather than exceptionally. Anyone who thinks full throttle is a rare event has not flown a 6:1 build.</p>
<p><strong>Check the pack as well.</strong> 124.8 A against a 1300 mAh 100C pack rated 130 A means full throttle on all four motors is essentially the pack's entire rated capability, and that rating is unregulated and routinely inflated. In practice the pack sags, the voltage falls, and you do not get the 850 g per motor the table promised. The thrust to weight ratio computed from bench data is an upper bound in two separate ways.</p>`,
        minutes: 18,
        skills: ["ESC rating", "Current headroom", "Over-propping"],
      },
    ],
  },
  /* ===================================================================== */
  5110: {
    topicId: 5110,
    title: "Assembly order, and why it is not negotiable",
    summary:
      "Some parts cannot be reached once another is fitted, and one test has to happen before the expensive boards go on. The order is the method.",
    concepts: ["Build sequence", "Access", "Dry fit", "Thread lock", "Stack"],
    glossary: {
      "Build sequence": "The order components are fitted, driven by access and by what has to be tested before what.",
      Access: "Whether a fastener or a joint can still be reached once a later part is in place.",
      "Dry fit": "Assembling without fasteners or solder to check that everything physically fits before committing.",
      "Thread lock": "A removable adhesive on screw threads, needed because vibration undoes fasteners on a multirotor.",
      Stack: "The sandwich of boards, typically PDB and flight controller, mounted on standoffs in the centre of the frame.",
      "Motor screw length": "A screw that is too long contacts the motor windings and shorts them, destroying the motor.",
    },
    body: {
      Beginner: `<p>Build in the right order and everything is reachable when you need it. Build in the wrong order and you will take the aircraft apart again to fix something you could have seen.</p>
<figure>
<svg viewBox="0 0 1000 600" role="img" aria-label="Build order with the two points after which a part can no longer be reached">
<rect x="24" y="40" width="952" height="76" rx="14" fill="#0f766e" opacity="0.14"/>
<text x="56" y="88" font-size="30" font-weight="800" fill="currentColor">1. Motors onto the arms</text>
<text x="944" y="88" font-size="26" fill="currentColor" opacity="0.75" text-anchor="end">screws reachable from below</text>
<rect x="24" y="130" width="952" height="76" rx="14" fill="#0f766e" opacity="0.14"/>
<text x="56" y="178" font-size="30" font-weight="800" fill="currentColor">2. Speed controllers and power wiring</text>
<text x="944" y="178" font-size="26" fill="currentColor" opacity="0.75" text-anchor="end">solder with the deck open</text>
<rect x="24" y="220" width="952" height="60" rx="12" fill="#be123c" opacity="0.2"/>
<text x="500" y="258" font-size="28" font-weight="800" fill="#be123c" text-anchor="middle">SMOKE STOPPER TEST, BEFORE THE EXPENSIVE BOARD GOES ON</text>
<rect x="24" y="294" width="952" height="76" rx="14" fill="#0369a1" opacity="0.14"/>
<text x="56" y="342" font-size="30" font-weight="800" fill="currentColor">3. Flight controller stack</text>
<text x="944" y="342" font-size="26" fill="currentColor" opacity="0.75" text-anchor="end">now the deck is covered</text>
<rect x="24" y="384" width="952" height="60" rx="12" fill="#b45309" opacity="0.2"/>
<text x="500" y="422" font-size="28" font-weight="800" fill="#b45309" text-anchor="middle">PAST HERE, THE ARM SCREWS ARE UNDER THE STACK</text>
<rect x="24" y="458" width="952" height="76" rx="14" fill="#7c3aed" opacity="0.14"/>
<text x="56" y="506" font-size="30" font-weight="800" fill="currentColor">4. Camera, antenna, straps</text>
<text x="944" y="506" font-size="26" fill="currentColor" opacity="0.75" text-anchor="end">outside everything else</text>
<text x="500" y="576" font-size="27" font-weight="800" fill="currentColor" opacity="0.7" text-anchor="middle">Two of these steps cannot be undone cheaply.</text>
</svg>
<figcaption><strong>The order is set by two things: what becomes unreachable, and what has to be proved before something expensive is connected to it.</strong> Everything else about a build is preference. These two are not, and both of the marked lines cost real money to cross in the wrong direction.</figcaption>
</figure>
<h3>Two rules decide the order</h3>
<table>
<tr><th>Rule</th><th>Means</th></tr>
<tr><td>Access</td><td>Fit the thing that gets buried before the thing that buries it</td></tr>
<tr><td>Verification</td><td>Test what you can on its own before connecting anything expensive</td></tr>
</table>
<div class="key-idea"><span class="callout-label">Dry fit everything first</span><p>Put the whole aircraft together with no screws tightened and nothing soldered. You will find out that the stack is too tall, or the camera does not clear the top plate, while those are still free problems.</p></div>
<div class="warning"><span class="callout-label">Check your motor screws</span><p>A screw a millimetre too long reaches the motor windings. It will not look wrong and the motor will be destroyed the first time you power up. Measure them against the depth of the threaded hole before fitting.</p></div>`,
      Intermediate: `<p>Assembly order is determined by two constraints, and they are worth separating because they fail in different ways.</p>
<figure>
<svg viewBox="0 0 1000 600" role="img" aria-label="Build order with the two points after which a part can no longer be reached">
<rect x="24" y="40" width="952" height="76" rx="14" fill="#0f766e" opacity="0.14"/>
<text x="56" y="88" font-size="30" font-weight="800" fill="currentColor">1. Motors onto the arms</text>
<text x="944" y="88" font-size="26" fill="currentColor" opacity="0.75" text-anchor="end">screws reachable from below</text>
<rect x="24" y="130" width="952" height="76" rx="14" fill="#0f766e" opacity="0.14"/>
<text x="56" y="178" font-size="30" font-weight="800" fill="currentColor">2. Speed controllers and power wiring</text>
<text x="944" y="178" font-size="26" fill="currentColor" opacity="0.75" text-anchor="end">solder with the deck open</text>
<rect x="24" y="220" width="952" height="60" rx="12" fill="#be123c" opacity="0.2"/>
<text x="500" y="258" font-size="28" font-weight="800" fill="#be123c" text-anchor="middle">SMOKE STOPPER TEST, BEFORE THE EXPENSIVE BOARD GOES ON</text>
<rect x="24" y="294" width="952" height="76" rx="14" fill="#0369a1" opacity="0.14"/>
<text x="56" y="342" font-size="30" font-weight="800" fill="currentColor">3. Flight controller stack</text>
<text x="944" y="342" font-size="26" fill="currentColor" opacity="0.75" text-anchor="end">now the deck is covered</text>
<rect x="24" y="384" width="952" height="60" rx="12" fill="#b45309" opacity="0.2"/>
<text x="500" y="422" font-size="28" font-weight="800" fill="#b45309" text-anchor="middle">PAST HERE, THE ARM SCREWS ARE UNDER THE STACK</text>
<rect x="24" y="458" width="952" height="76" rx="14" fill="#7c3aed" opacity="0.14"/>
<text x="56" y="506" font-size="30" font-weight="800" fill="currentColor">4. Camera, antenna, straps</text>
<text x="944" y="506" font-size="26" fill="currentColor" opacity="0.75" text-anchor="end">outside everything else</text>
<text x="500" y="576" font-size="27" font-weight="800" fill="currentColor" opacity="0.7" text-anchor="middle">Two of these steps cannot be undone cheaply.</text>
</svg>
<figcaption><strong>The order is set by two things: what becomes unreachable, and what has to be proved before something expensive is connected to it.</strong> Everything else about a build is preference. These two are not, and both of the marked lines cost real money to cross in the wrong direction.</figcaption>
</figure>
<h3>Access</h3>
<p>A fastener that becomes unreachable must be fitted before the thing that blocks it. On most frames the arm screws disappear under the flight controller stack, so arms are done first and are not casually revisited.</p>
<h3>Verification</h3>
<p>Powering the frame through a current limited lead before the flight controller is fitted means a solder bridge, a reversed capacitor or a shorted motor lead reveals itself as a glowing bulb rather than as a destroyed stack. The test takes two minutes and the components it protects cost several thousand rupees.</p>
<div class="key-idea"><span class="callout-label">Where the two constraints conflict, verification wins</span><p>It is worth taking something apart to test it. It is not worth replacing a flight controller to avoid taking something apart.</p></div>
<h3>Fasteners need more attention than beginners expect</h3>
<table>
<tr><th>Fastener</th><th>Treatment</th></tr>
<tr><td>Motor screws</td><td>Checked for length, thread locked</td></tr>
<tr><td>Stack bolts</td><td>Thread locked, not overtightened onto the board</td></tr>
<tr><td>Arm bolts</td><td>Thread locked; they see the most vibration</td></tr>
</table>
<div class="warning"><span class="callout-label">Thread lock on anything that vibrates</span><p>Which on this aircraft is everything. A loose motor screw is the most common cause of a mid-air that nobody can explain afterwards.</p></div>`,
      Advanced: `<p>The order is really a dependency graph, and writing it out once for a frame is worth more than remembering it, because the irreversible edges are where the cost sits.</p>
<figure>
<svg viewBox="0 0 1000 600" role="img" aria-label="Build order with the two points after which a part can no longer be reached">
<rect x="24" y="40" width="952" height="76" rx="14" fill="#0f766e" opacity="0.14"/>
<text x="56" y="88" font-size="30" font-weight="800" fill="currentColor">1. Motors onto the arms</text>
<text x="944" y="88" font-size="26" fill="currentColor" opacity="0.75" text-anchor="end">screws reachable from below</text>
<rect x="24" y="130" width="952" height="76" rx="14" fill="#0f766e" opacity="0.14"/>
<text x="56" y="178" font-size="30" font-weight="800" fill="currentColor">2. Speed controllers and power wiring</text>
<text x="944" y="178" font-size="26" fill="currentColor" opacity="0.75" text-anchor="end">solder with the deck open</text>
<rect x="24" y="220" width="952" height="60" rx="12" fill="#be123c" opacity="0.2"/>
<text x="500" y="258" font-size="28" font-weight="800" fill="#be123c" text-anchor="middle">SMOKE STOPPER TEST, BEFORE THE EXPENSIVE BOARD GOES ON</text>
<rect x="24" y="294" width="952" height="76" rx="14" fill="#0369a1" opacity="0.14"/>
<text x="56" y="342" font-size="30" font-weight="800" fill="currentColor">3. Flight controller stack</text>
<text x="944" y="342" font-size="26" fill="currentColor" opacity="0.75" text-anchor="end">now the deck is covered</text>
<rect x="24" y="384" width="952" height="60" rx="12" fill="#b45309" opacity="0.2"/>
<text x="500" y="422" font-size="28" font-weight="800" fill="#b45309" text-anchor="middle">PAST HERE, THE ARM SCREWS ARE UNDER THE STACK</text>
<rect x="24" y="458" width="952" height="76" rx="14" fill="#7c3aed" opacity="0.14"/>
<text x="56" y="506" font-size="30" font-weight="800" fill="currentColor">4. Camera, antenna, straps</text>
<text x="944" y="506" font-size="26" fill="currentColor" opacity="0.75" text-anchor="end">outside everything else</text>
<text x="500" y="576" font-size="27" font-weight="800" fill="currentColor" opacity="0.7" text-anchor="middle">Two of these steps cannot be undone cheaply.</text>
</svg>
<figcaption><strong>The order is set by two things: what becomes unreachable, and what has to be proved before something expensive is connected to it.</strong> Everything else about a build is preference. These two are not, and both of the marked lines cost real money to cross in the wrong direction.</figcaption>
</figure>
<table>
<tr><th>Step</th><th>Blocks</th><th>Cost of doing it late</th></tr>
<tr><td>Motors to arms</td><td>Nothing yet</td><td>Low</td></tr>
<tr><td>Speed controller wiring</td><td>Access to the bottom plate</td><td>Desolder and redo</td></tr>
<tr><td>Smoke stopper test</td><td>Nothing, and it protects everything after</td><td>A destroyed stack</td></tr>
<tr><td>Stack fitted</td><td>Arm screws, bottom plate</td><td>Full teardown</td></tr>
</table>
<div class="key-idea"><span class="callout-label">Wire length is the decision people get wrong</span><p>Cut motor leads to length with the arms in their final position, not with the frame flat on the bench. Leads cut short on a flat frame will not reach once the arms are angled, and a lead left long has to be coiled somewhere it will be cut by a propeller.</p></div>
<h3>Strain relief is part of assembly, not tidying</h3>
<p>Every soldered joint that moves will eventually fail, and on this aircraft everything moves. Secure the wire a short distance from the joint so the flexing happens in the wire rather than at the solder, which is where the whole of the next topic comes from.</p>`,
      Expert: `<p>The useful framing is irreversibility. Most build steps are cheap to undo, a few are expensive, and the expensive ones should always be preceded by a test that can fail safely.</p>
<figure>
<svg viewBox="0 0 1000 600" role="img" aria-label="Build order with the two points after which a part can no longer be reached">
<rect x="24" y="40" width="952" height="76" rx="14" fill="#0f766e" opacity="0.14"/>
<text x="56" y="88" font-size="30" font-weight="800" fill="currentColor">1. Motors onto the arms</text>
<text x="944" y="88" font-size="26" fill="currentColor" opacity="0.75" text-anchor="end">screws reachable from below</text>
<rect x="24" y="130" width="952" height="76" rx="14" fill="#0f766e" opacity="0.14"/>
<text x="56" y="178" font-size="30" font-weight="800" fill="currentColor">2. Speed controllers and power wiring</text>
<text x="944" y="178" font-size="26" fill="currentColor" opacity="0.75" text-anchor="end">solder with the deck open</text>
<rect x="24" y="220" width="952" height="60" rx="12" fill="#be123c" opacity="0.2"/>
<text x="500" y="258" font-size="28" font-weight="800" fill="#be123c" text-anchor="middle">SMOKE STOPPER TEST, BEFORE THE EXPENSIVE BOARD GOES ON</text>
<rect x="24" y="294" width="952" height="76" rx="14" fill="#0369a1" opacity="0.14"/>
<text x="56" y="342" font-size="30" font-weight="800" fill="currentColor">3. Flight controller stack</text>
<text x="944" y="342" font-size="26" fill="currentColor" opacity="0.75" text-anchor="end">now the deck is covered</text>
<rect x="24" y="384" width="952" height="60" rx="12" fill="#b45309" opacity="0.2"/>
<text x="500" y="422" font-size="28" font-weight="800" fill="#b45309" text-anchor="middle">PAST HERE, THE ARM SCREWS ARE UNDER THE STACK</text>
<rect x="24" y="458" width="952" height="76" rx="14" fill="#7c3aed" opacity="0.14"/>
<text x="56" y="506" font-size="30" font-weight="800" fill="currentColor">4. Camera, antenna, straps</text>
<text x="944" y="506" font-size="26" fill="currentColor" opacity="0.75" text-anchor="end">outside everything else</text>
<text x="500" y="576" font-size="27" font-weight="800" fill="currentColor" opacity="0.7" text-anchor="middle">Two of these steps cannot be undone cheaply.</text>
</svg>
<figcaption><strong>The order is set by two things: what becomes unreachable, and what has to be proved before something expensive is connected to it.</strong> Everything else about a build is preference. These two are not, and both of the marked lines cost real money to cross in the wrong direction.</figcaption>
</figure>
<div class="key-idea"><span class="callout-label">The general rule this is an instance of</span><p>Put a cheap reversible test immediately before every expensive irreversible commitment. The smoke stopper is that test for the power system; a props-off bench run is the same test for the control system; a hover in an open field is the same test for the whole aircraft. Every one of them exists to make a failure discoverable while it is still cheap.</p></div>
<h3>Documenting a build pays for itself on the second one</h3>
<p>Photographs at each stage, the motor order as wired, the lead lengths and the screw sizes, all take minutes to record and save an hour of measurement when something is replaced. This is why the evidence task for this topic asks for four photographs rather than one finished aircraft: the finished object does not show the decisions.</p>
<h3>Where repairability is designed in or lost</h3>
<p>A build that routes the video transmitter lead under the stack has saved two minutes and added a teardown to every future antenna change. Thinking about the second disassembly during the first assembly is most of what separates a maintainable aircraft from one that gets replaced.</p>
<div class="field"><span class="callout-label">The habit worth forming</span><p>Before tightening anything permanently, ask what this step blocks and whether anything behind it is untested. Both answers are usually immediate, and the question costs nothing compared with the teardown it prevents.</p></div>`,
    },
    parts: [
      {
        n: 1,
        title: "Order the build, and say why each step comes where it does",
        diagram: "drone-exploded",
        brief: `<p>The same airframe, now as a sequencing problem. Identify the four points, then put the seven build steps in order.</p>
<p>Two constraints decide the order. <strong>Access:</strong> can you still reach this once the next thing is fitted. <strong>Verification:</strong> what has to be proved working before something expensive is connected to it.</p>
<p>One step in this list exists purely as a test and has no parts in it. Putting it in the right place is most of the marks.</p>`,
        hotspots: [
          {
            key: "arm",
            label: "Motor mounting bolts",
            x: 33,
            y: 30,
            does: "Fix the motor to the arm from underneath. Unreachable once the stack is fitted, which is why motors go on first.",
            confusedWith:
              "The frame assembly bolts that hold the arms to the base plate. Those stay accessible; the motor bolts do not.",
          },
          {
            key: "stackpt",
            label: "The stack",
            x: 50,
            y: 50,
            does: "PDB and flight controller on standoffs in the centre. Fitting it early blocks access to the motor bolts, the ESC pads and the aerial routing.",
            confusedWith:
              "The flight controller alone. The stack is both boards together, and the sequencing problem is about the whole assembly occupying the centre.",
          },
          {
            key: "escpt",
            label: "ESC solder pads",
            x: 43,
            y: 42,
            does: "Where the three motor phases land. Soldered while the centre of the frame is still open and the joint can be reached with an iron.",
            confusedWith:
              "The PDB battery pads, which carry the whole aircraft's current rather than one motor's. Those are much larger.",
          },
          {
            key: "proppt",
            label: "Propellers",
            x: 33,
            y: 20,
            does: "Last thing fitted, after motor directions are confirmed with the props off. Handed, so a reversed prop produces downforce rather than lift.",
            confusedWith:
              "The opposite-handed propeller, which looks almost identical. Fitting one the wrong way round is the commonest reason a first build will not take off.",
          },
        ],
        sequence: [
          {
            key: "dryfit",
            label: "Dry fit everything with no solder and no fasteners",
            why: "Standoff heights, connector clearance and where the battery strap runs are nearly free to discover now and expensive after anything is soldered.",
          },
          {
            key: "motors",
            label: "Bolt the motors to the arms, with thread lock and checked screw length",
            why: "The bolts are unreachable once the stack is in. A screw a millimetre too long reaches the windings and destroys the motor on first power.",
          },
          {
            key: "escs",
            label: "Solder the ESCs to the motors and to the power distribution",
            why: "The centre of the frame is still open, so every joint can be reached with an iron and supported properly.",
          },
          {
            key: "smoketest",
            label: "Power up through a current limiter, with no flight controller fitted",
            why: "This is the test with no parts in it. A solder bridge or a reversed capacitor blows a bulb here instead of destroying the stack you have not fitted yet.",
          },
          {
            key: "fcfit",
            label: "Fit the flight controller, arrow forward",
            why: "It goes onto a power system that has already been proved, which is the whole reason the previous step exists.",
          },
          {
            key: "rxvtx",
            label: "Fit and bind the receiver, then the camera and video transmitter",
            why: "Both need the flight controller in place, and the aerials have to be routed clear of carbon and away from each other.",
          },
          {
            key: "props",
            label: "Confirm motor directions, then fit the propellers",
            why: "Directions are checked with the props off, because a motor spinning the wrong way with a blade on it is how people get cut.",
          },
        ],
        minutes: 14,
        skills: ["Build sequence", "Access", "Dry fit"],
      },
    ],
    evidence: [
      {
        n: 1,
        title: "Photograph your build at four stages",
        brief: `<p>Build an airframe, or rebuild one you have, and photograph it at four specific points. The assessment is the sequence rather than the finished aircraft, so a beautiful final photo with nothing behind it scores badly.</p>
<p>If you do not have a frame to build, disassembling and reassembling an existing one is acceptable. Say so in your note.</p>
<p><strong>What an assessor is looking for.</strong> Thread lock visible on the motor screws. Motor screw length checked rather than assumed. The power test performed before the flight controller is fitted. And propellers absent from every photograph except the last.</p>`,
        captures: [
          {
            key: "dryfit",
            medium: "photo",
            label: "The dry fit",
            mustShow:
              "All major components laid out or loosely assembled with no solder and no fasteners, and your enrolment number on paper in the frame.",
          },
          {
            key: "motors",
            medium: "photo",
            label: "Motors mounted, from underneath",
            mustShow:
              "The motor bolts with thread lock visible on the threads, and one screw held next to the motor so its length can be judged against the boss depth.",
          },
          {
            key: "smoketest",
            medium: "video",
            label: "First power-up through a current limiter",
            seconds: 60,
            mustShow:
              "One continuous shot showing the current-limiting device in circuit, the flight controller NOT yet fitted, and the battery being connected.",
          },
          {
            key: "finished",
            medium: "photo",
            label: "The finished aircraft",
            mustShow:
              "The complete build with the flight controller arrow visible and pointing forward, and the propellers fitted.",
          },
        ],
        integrity: [
          "My enrolment number is on paper and visible in the dry fit photograph.",
          "The power-up clip is one continuous recording, because the point being assessed is that the flight controller was absent at that moment.",
          "Every photograph is of the same airframe, in the order stated.",
          "No propellers are fitted in any photograph except the last, and I understand that a propeller appearing earlier fails the sequencing criterion.",
        ],
        rubric: [
          {
            key: "sequence",
            label: "The order is correct and evidenced",
            bands: [
              "Photographs show steps out of order, or the flight controller fitted before any power test",
              "Roughly the right order but the power test is absent or taken after the stack was fitted",
              "Correct order with the power test clearly before the flight controller went on",
              "Correct order, and the learner can say in their note which constraint drove each step, access or verification",
            ],
            weight: 3,
          },
          {
            key: "fasteners",
            label: "Fasteners done properly",
            bands: [
              "No thread lock, or screw length not addressed",
              "Thread lock present but screw length not evidenced",
              "Thread lock visible and screw length checked against the boss",
              "Both evidenced, with removable grade thread lock rather than permanent, which the note identifies",
            ],
            weight: 2,
          },
          {
            key: "powertest",
            label: "The current-limited power-up",
            bands: [
              "Not performed, or performed with the full stack already fitted",
              "Performed but the limiting device is not visible in the clip",
              "Performed correctly with the limiter visible and the flight controller absent",
              "All of that, and the note says what a fault would have looked like and what it would have protected",
            ],
            weight: 3,
          },
          {
            key: "propsafety",
            label: "Propeller discipline",
            bands: [
              "Props fitted during bench testing or motor direction checks",
              "Props absent from most stages but present in one they should not be",
              "Props fitted only at the final stage",
              "Props only at the end, and the note states that directions were confirmed before they went on",
            ],
            weight: 2,
          },
        ],
        exemplar: [
          {
            criterion: "The current-limited power-up",
            band: 3,
            note: "The clip holds the limiter and the empty flight controller standoffs in the same frame, so the assessor can see both facts at once. The note adds: had there been a bridge on the PDB the bulb would have lit steadily rather than flashing, and the stack that was not yet fitted is a 4,200 rupee component.",
          },
          {
            criterion: "Fasteners done properly",
            band: 0,
            note: "Motor bolts are clean and dry with no thread lock anywhere, and the screw length is not addressed at all. On a multirotor this is not untidiness: the fasteners will migrate under vibration, and a screw a millimetre too long is already touching the windings.",
          },
        ],
        minutes: 90,
        skills: ["Build sequence", "Thread lock", "Motor screw length", "Dry fit"],
      },
    ],
  },

  /* ===================================================================== */
  5111: {
    topicId: 5111,
    title: "Soldering a joint that survives vibration",
    summary:
      "Most first-build failures are solder joints, and almost all of them are the same three mistakes. Heat, wetting and strain relief.",
    concepts: ["Wetting", "Cold joint", "Tinning", "Strain relief", "Flux"],
    glossary: {
      Wetting: "Molten solder flowing into and bonding with the metal, which is what makes a joint rather than a lump.",
      "Cold joint": "A joint where the solder was melted but the work was not hot enough, so it never bonded. Dull, lumpy and mechanically weak.",
      Tinning: "Pre-coating a wire or a pad with solder before joining them.",
      "Strain relief": "Supporting a wire so that movement is taken by the insulation or a tie rather than by the joint.",
      Flux: "A chemical that removes oxide so solder can wet the metal. Most solder has it in the core, and extra always helps.",
      "Work hardening": "Repeated flexing making copper brittle, which is why a wire breaks just outside a joint rather than at it.",
    },
    body: {
      Beginner: `<p>The three things that make a solder joint work, in order of how often people get them wrong.</p>
<p><strong>Heat the work, not the solder.</strong> Put the iron on the pad and the wire, wait a second, then feed solder into the joint so it melts on the work. Melting solder on the iron and dabbing it on is how you get a cold joint: it looks attached and it is not.</p>
<p><strong>Use enough heat.</strong> A big pad on a PDB is a heatsink. A 30 watt iron at 300 degrees will sit there oxidising the pad without ever getting it hot enough. Use a decent iron at 350 to 380 and a chunky tip, and get in and out fast.</p>
<p><strong>Tin both sides first.</strong> Pre-coat the pad and pre-coat the wire, then put them together and reheat. The solder flows and the joint is made in under two seconds.</p>
<p>A good joint is <strong>shiny and slightly concave</strong>, like a tiny volcano. A bad one is <strong>dull, round and blobby</strong>. If it looks like a ball sitting on the pad, it is sitting on the pad.</p>
<p>And one that is not about soldering at all: <strong>support the wire</strong>. A multirotor vibrates constantly, and an unsupported wire flexes at the joint until the copper goes brittle and snaps.</p>`,
      Intermediate: `<p>Soldering is a metallurgical process rather than a gluing one. The solder forms an intermetallic layer with the copper, and that layer only forms if the work itself reaches temperature. Everything that goes wrong follows from failing to get the work hot enough, and the usual cause is an iron with too little thermal mass rather than too little wattage.</p>
<p>Flux is what makes wetting possible by removing the oxide layer that forms instantly on heated copper. Cored solder carries some, and extra flux on a large pad is always worth it. A joint that will not take solder is almost always an oxidation problem rather than a temperature problem, and more heat makes it worse by accelerating the oxidation.</p>
<p>Tinning both surfaces before joining them turns a difficult joint into a trivial one. Each surface is wetted separately where it is easy, and the final operation is just reflowing two already-wetted surfaces together, which takes a second or two rather than ten and avoids cooking the component.</p>
<p>Strain relief is the part that distinguishes a joint that lasts. Copper work hardens under repeated flexing, so an unsupported wire fails just outside the joint where the stress concentrates. The mitigation is mechanical: a dab of hot glue over the joint, a cable tie a short distance away, or routing that prevents movement in the first place.</p>`,
      Advanced: `<p>Joint quality is governed by the thickness of the intermetallic compound layer, and there is an optimum. Too little and the bond is weak; too much, from excessive temperature or dwell time, and the layer becomes brittle and the joint fails under vibration. This is the metallurgical reason that both an under-heated and an over-heated joint fail, and why the technique is to get hot fast and leave rather than to heat gently for longer.</p>
<p>Lead-free solder has materially changed field practice. SAC alloys melt around 217 degrees against 183 for traditional tin-lead, wet less readily, and produce joints that are duller in appearance even when sound, which removes the visual cue many technicians rely on. Higher iron temperatures and more aggressive flux are needed, and judging a lead-free joint by the shininess of a tin-lead one produces a lot of unnecessary rework.</p>
<p>Thermal mass rather than wattage is the specification that matters for an iron. A large pad on a four-layer PDB with internal ground planes pulls heat away rapidly, and an iron that cannot replace it fast enough never brings the work to temperature regardless of its rated power. This is why a temperature-controlled station with a chisel tip outperforms a higher-wattage pencil iron on exactly the joints that matter most.</p>
<p>On inspection, the useful discipline is to test mechanically rather than visually. A gentle pull on the wire finds a cold joint that looks acceptable, and doing it at build time is far cheaper than discovering it as an in-flight failure. Combined with a continuity check and a resistance measurement across the high-current path, it catches essentially every joint-level defect before power is applied.</p>`,
      Expert: `<p>The reliability of a solder joint under vibration is a fatigue problem, and the governing variables are the stress amplitude at the joint and the number of cycles. A multirotor presents a broadband excitation at motor fundamental frequencies and harmonics, continuously, for the life of the aircraft, so joints accumulate cycles orders of magnitude faster than in most electronics. Strain relief works by reducing the stress amplitude at the joint, which moves the joint along the fatigue curve rather than removing the loading.</p>
<p>Intermetallic growth continues after assembly at a rate governed by temperature, so a joint operating hot ages faster. On a PDB carrying over a hundred amps the joints are themselves heat sources, and a marginal joint with elevated resistance heats more, grows its intermetallic layer faster and becomes more marginal. That positive feedback is why high-current joints fail progressively rather than suddenly, and why resistance measurement across the power path is a worthwhile preventive check.</p>
<p>The flux residue question is genuinely contested and worth knowing both sides of. No-clean formulations are designed to leave a benign residue and in most applications removing it is unnecessary. In a high-humidity environment with high-voltage differentials across adjacent pads, residues can become conductive over time, and the conservative practice on anything carrying flight-critical current is to clean with isopropanol regardless. The cost is a few minutes and the failure it prevents is intermittent and nearly undiagnosable.</p>
<p>Finally, the pull test deserves formalising rather than being left as a habit, because its value lies in the consistency of the force applied. A gentle tug that varies between joints finds the worst ones and passes marginal ones inconsistently. Builders who use a consistent, defined pull, even an informally calibrated one, detect a measurably higher proportion of weak joints, and that is one of the few quality improvements available at zero cost.</p>`,
    },
    labs: [
      {
        n: 1,
        title: "Make and verify four high-current joints",
        objective:
          "Solder the four ESC pairs to a power distribution board so that every joint is sound, supported and verified before any power is applied.",
        ppe: [
          "Safety glasses, because flux spits and solder flicks off a hot iron",
          "Ventilation or a fume extractor; flux fumes are a respiratory irritant",
          "A heat-resistant mat and a weighted iron stand with a damp sponge",
          "No loose sleeves, and long hair tied back near a 380 degree iron",
        ],
        tools: [
          "Temperature-controlled soldering station with a chisel tip",
          "Rosin-cored solder, 0.8 mm or thicker for high-current pads",
          "Liquid or paste flux",
          "Helping hands or a frame holder",
          "Isopropanol and a brush",
          "Multimeter with continuity and resistance",
        ],
        steps: [
          {
            n: 1,
            title: "Set the iron and let it stabilise",
            detail:
              "<p>Set the station to around 360 degrees for leaded solder, higher for lead-free, and fit a chisel tip rather than a fine point. Let it reach temperature and tin the tip.</p><p>Thermal mass matters more than wattage here. A large pad on a multilayer board with internal ground planes pulls heat away fast, and a pencil iron that cannot replace it will never bring the work up to temperature no matter how long you hold it there.</p>",
            tools: ["Soldering station", "Chisel tip"],
            minutes: 5,
          },
          {
            n: 2,
            title: "Clean and flux the pads",
            detail:
              "<p>Wipe the board pads with isopropanol and apply flux to each one.</p><p>Copper oxidises the moment it is heated, and oxide is what stops solder wetting. A joint that refuses to take solder is nearly always an oxidation problem, and applying more heat makes it worse by accelerating the oxidation.</p>",
            tools: ["Isopropanol", "Flux"],
            minutes: 5,
          },
          {
            n: 3,
            title: "Tin the pads",
            detail:
              "<p>Touch the iron to a pad, count one second, then feed solder into the junction of iron and pad until a small shiny dome forms. Lift away.</p><p>Feed the solder onto the work, never onto the iron. Melting solder on the tip and dabbing it across produces a joint that looks attached and has no metallurgical bond at all.</p>",
            hazard: {
              level: "warning",
              text: "Molten solder flicks. Keep your face out of the plane of the board and wear the glasses, because a flux spit at eye level is a genuine injury rather than a nuisance.",
            },
            minutes: 10,
          },
          {
            n: 4,
            title: "Strip and tin the wires",
            detail:
              "<p>Strip about 3 mm, twist the strands, and tin each wire until the solder has wicked through the bundle but not run up under the insulation.</p><p>Solder wicking under the insulation makes that section rigid, which moves the flex point to the boundary and creates exactly the stress concentration you are trying to avoid.</p>",
            minutes: 10,
          },
          {
            n: 5,
            title: "Join the tinned surfaces",
            detail:
              "<p>Hold the tinned wire against the tinned pad and touch the iron to both for one to two seconds. The two solder coatings merge and the joint is made.</p><p>In and out fast. Too much heat for too long grows the intermetallic layer thick and brittle, which fails under vibration, so both an under-heated and an over-heated joint fail and the technique is to get hot quickly and leave.</p>",
            minutes: 15,
          },
          {
            n: 6,
            title: "Inspect every joint",
            detail:
              "<p>A sound joint is shiny and slightly concave, flowing onto both surfaces like a small volcano. A cold joint is dull, rounded and sits on the pad like a ball.</p><p>With lead-free solder the joints are duller even when sound, so the shininess cue is less reliable and the shape cue matters more.</p>",
            minutes: 6,
          },
          {
            n: 7,
            title: "Pull test each joint",
            detail:
              "<p>Give each wire a firm, consistent tug. A cold joint that looked acceptable will come away in your hand.</p><p>Use the same force on every joint. A tug that varies between joints finds the worst and passes the marginal ones inconsistently, and consistency is what makes this test worth anything.</p>",
            hazard: {
              level: "danger",
              text: "Do this now, with no battery anywhere near the bench. A joint that fails this test in flight means a motor stops at altitude, and a joint that fails it while a battery is connected can short the pack.",
            },
            minutes: 6,
          },
          {
            n: 8,
            title: "Measure the resistance across the power path",
            detail:
              "<p>With the multimeter on its lowest resistance range, measure across each joint pair and compare them. They should be near zero and, more importantly, they should agree with each other.</p><p>An outlier is the joint to redo. A marginal high-current joint heats under load, which grows its intermetallic layer faster, which makes it more marginal, so these fail progressively rather than suddenly.</p>",
            reading: {
              label: "Highest resistance measured across any joint",
              unit: "ohms",
              min: 0,
              max: 1,
              hint: "Anything beyond a fraction of an ohm on a high-current path is a joint to remake. Compare the four against each other rather than against an absolute figure: the outlier is the answer.",
            },
            tools: ["Multimeter"],
            minutes: 8,
          },
          {
            n: 9,
            title: "Check for bridges before you believe any of it",
            detail:
              "<p>Continuity test between positive and negative on the board. There must be none.</p><p>This is the check that stands between you and the current-limited power-up finding a dead short. Finding it with a meter costs nothing.</p>",
            reading: {
              label: "Continuity between the power rails",
              unit: "ohms",
              min: 2,
              max: 99999,
              hint: "Near zero means a bridge somewhere. Inspect under magnification before applying power, because the limiter will find it but the meter finds it faster and tells you nothing has been stressed.",
            },
            minutes: 4,
          },
          {
            n: 10,
            title: "Clean the flux and add strain relief",
            detail:
              "<p>Brush isopropanol over the joints and let it dry. Then support every wire: a dab of hot glue over the joint, or a cable tie a short distance along the run.</p><p>Copper work hardens under repeated flexing and a multirotor vibrates continuously, so an unsupported wire fails just outside the joint where the stress concentrates. The joint itself will be fine and the wire beside it will not.</p>",
            capture: { label: "All four joints with strain relief in place", medium: "photo" },
            tools: ["Isopropanol", "Hot glue or cable ties"],
            minutes: 10,
          },
        ],
        skills: ["Wetting", "Cold joint", "Tinning", "Strain relief"],
      },
    ],
    evidence: [
      {
        n: 1,
        title: "One joint, start to finish, and the pull test",
        brief: `<p>Film yourself making a single high-current solder joint from tinning to pull test, then photograph the result close enough to be judged.</p>
<p>One continuous clip. The assessment is the technique, which means the assessor needs to see where the solder was fed, how long the iron was on the work, and that the pull test happened.</p>
<p><strong>Submit a deliberately bad joint as well.</strong> Make one cold joint on purpose, photograph it next to your good one, and say in your note what you did differently. Being able to recognise a cold joint is worth as much as being able to avoid one.</p>`,
        captures: [
          {
            key: "process",
            medium: "video",
            label: "Making the joint",
            seconds: 90,
            mustShow:
              "One continuous shot: tinning the pad, tinning the wire, joining them, and the pull test. Close enough that where the solder is fed is visible.",
          },
          {
            key: "good",
            medium: "photo",
            label: "The finished joint, close up",
            mustShow:
              "A single joint filling most of the frame, in focus, with the surface finish and the fillet shape clearly visible.",
          },
          {
            key: "bad",
            medium: "photo",
            label: "A deliberate cold joint",
            mustShow:
              "A cold joint at the same magnification as the good one, so the two can be compared directly in shape and finish.",
          },
          {
            key: "relief",
            medium: "photo",
            label: "Strain relief",
            mustShow:
              "The joint with its strain relief in place, and your enrolment number on paper in the frame.",
          },
        ],
        integrity: [
          "My enrolment number is on paper and visible in the strain relief photograph.",
          "The process clip is one unbroken recording from tinning through to the pull test.",
          "The good joint and the cold joint are photographed at the same magnification so they can be compared.",
          "The cold joint was made deliberately for this task and I have said in my note how.",
        ],
        rubric: [
          {
            key: "technique",
            label: "Heat applied to the work",
            bands: [
              "Solder melted on the iron and carried to the joint",
              "Solder fed to the work but the iron removed before the joint flowed",
              "Iron on the work, solder fed into the junction, joint flowed",
              "All of that, in and out quickly, with no prolonged dwell that would make the intermetallic layer brittle",
            ],
            weight: 3,
          },
          {
            key: "quality",
            label: "The joint itself",
            bands: [
              "Rounded ball sitting on the pad, or an obviously cold joint presented as good",
              "Flowed but with excess solder or a poor fillet",
              "Shiny and slightly concave, wetting both surfaces",
              "A clean fillet on both surfaces with no excess, and the learner can say why the shape indicates wetting",
            ],
            weight: 3,
          },
          {
            key: "verification",
            label: "The joint was tested, not assumed",
            bands: [
              "No pull test shown",
              "A token tug that would not find a cold joint",
              "A firm consistent pull test on camera",
              "A firm consistent pull, and the note explains why consistency between joints matters more than force",
            ],
            weight: 2,
          },
          {
            key: "diagnosis",
            label: "The cold joint is recognised and explained",
            bands: [
              "No cold joint submitted, or one indistinguishable from the good one",
              "A cold joint submitted but the explanation only restates that it is bad",
              "A clear cold joint with its visual characteristics named",
              "Named, with the cause identified: which specific step was changed, and why that prevented the bond forming",
            ],
            weight: 2,
          },
        ],
        exemplar: [
          {
            criterion: "The joint itself",
            band: 3,
            note: "Concave fillet flowing onto both the pad and the wire with no excess, and the note correctly says that the concave shape is evidence of wetting while a convex ball is evidence that the solder never bonded.",
          },
          {
            criterion: "Heat applied to the work",
            band: 0,
            note: "The clip shows solder being melted onto the iron tip and carried across. Every joint made that way is a cold joint regardless of how it looks, because the work never reached temperature and no intermetallic layer formed.",
          },
        ],
        minutes: 45,
        skills: ["Wetting", "Cold joint", "Strain relief", "Flux"],
      },
    ],
  },
  /* ===================================================================== */
  5112: {
    topicId: 5112,
    title: "Power distribution and the smoke-stopper test",
    summary:
      "Two minutes and a light bulb stand between a soldering mistake and a destroyed stack. This is the highest-value step in the whole build.",
    concepts: ["Smoke stopper", "Short circuit", "Inrush current", "Capacitor polarity", "Continuity check"],
    glossary: {
      "Smoke stopper": "A current-limited lead, usually an incandescent bulb in series, used for the first power-up of a new build.",
      "Short circuit": "A low resistance path between the rails, usually a solder bridge or a trapped strand.",
      "Inrush current": "The brief surge as the capacitors charge when a battery is connected, which produces the normal spark.",
      "Capacitor polarity": "Electrolytic capacitors are polarised, and a reversed one vents or explodes.",
      "Continuity check": "Testing with a meter for an unintended connection between the rails before applying any power.",
      "Anti-spark": "A connector or lead with a resistor that limits inrush, reducing connector erosion on larger builds.",
    },
    body: {
      Beginner: `<p>The first time you connect a battery to a new build is the moment everything is at risk. A solder bridge you cannot see will put the full output of the pack through whatever is nearest, and a LiPo can deliver over a hundred amps without noticing.</p>
<p>A <strong>smoke stopper</strong> fixes this. It is a lead with an incandescent bulb in series. If there is a short, the bulb lights brightly and limits the current to whatever the bulb passes, which is a few amps. Nothing is damaged and you have found your fault.</p>
<p>What normal looks like: the bulb flashes briefly as the capacitors charge, then goes dark or dim. What a short looks like: the bulb lights brightly and stays lit.</p>
<p>Before you even do that, check with a meter. Put it on continuity and test between the positive and negative pads. There should be <strong>no</strong> beep. If there is, you have a bridge and you can find it with your eyes instead of with a battery.</p>
<p>And check the capacitor. Electrolytic capacitors have a <strong>negative stripe</strong> down one side, and fitting one backwards makes it vent or burst. It is the one component on the board where getting it the wrong way round is dramatic.</p>`,
      Intermediate: `<p>The smoke stopper is the single highest-value step in a build because of what it protects relative to what it costs. Two minutes and a bulb, against a flight controller, four ESCs and possibly the pack. The logic is a detection point: a fault that would propagate to every connected component is instead contained as a diagnostic event.</p>
<p>Sequence the checks from cheapest to most expensive. Visual inspection under magnification for bridges and stray strands. Continuity test between the rails with a meter. Then current-limited power-up. Then, only once all three pass, connect the battery directly. Each step catches a class of fault more cheaply than the one after it.</p>
<p>Reading the bulb takes a little practice. A brief flash as the capacitors charge is normal and expected: that is inrush, the same phenomenon that produces the spark when you plug in a battery. A bulb that lights brightly and stays lit is a dead short. A bulb that glows dimly and steadily is a partial short or an unusually high quiescent draw, and it is worth investigating rather than ignoring.</p>
<p>Capacitor polarity deserves its own check because the failure is energetic. The negative stripe goes to the negative pad, and a reversed electrolytic heats and vents, sometimes violently. On a board that may be inside a carbon frame next to a LiPo, that is not a minor error.</p>`,
      Advanced: `<p>Inrush current is worth understanding rather than merely tolerating, because it explains several things builders find confusing. Connecting a pack to a discharged capacitor bank is close to connecting it to a short for a few milliseconds, and the resulting current is bounded only by the pack's internal resistance and the lead inductance. That is the spark, it is normal, and it erodes connector contacts over time, which is why larger builds use anti-spark leads with a series resistor to pre-charge the capacitors.</p>
<p>The bulb's behaviour as a limiter is non-linear in a useful way. A cold filament has low resistance, so it passes enough current to charge the capacitors quickly, and as it heats its resistance rises sharply, limiting a sustained fault to a safe value. That characteristic is precisely what makes an incandescent bulb better for this job than a fixed resistor, and it is also why an LED replacement will not do.</p>
<p>Partial shorts are the fault class the test is best at and a meter is worst at. A few strands of copper bridging to a ground plane may show as a resistance too high to trip a continuity beeper and low enough to dissipate serious power under load, and the bulb's steady dim glow reveals exactly that. Builders who skip straight from the meter to a battery miss this one.</p>
<p>On the high-current path generally, the relevant discipline after the smoke stopper is thermal. Run the aircraft briefly on the bench with props off, then feel the PDB, the ESCs and the battery lead. Anything noticeably warm at low load has a resistance problem, and that is a joint to remake before it becomes a progressive failure in flight.</p>`,
      Expert: `<p>The current-limited first power-up is an instance of a general reliability principle: insert a detection point before an irreversible commitment, sized so that the fault energy is bounded. The value of such a point is the fault probability times the difference in consequence between containment and propagation, and for a first build that product is large because first-build short probability is genuinely high and the propagated consequence is the whole electronics set. No other two-minute step in the build has a comparable expected value.</p>
<p>The bulb's suitability follows from its positive temperature coefficient. Tungsten resistance rises by roughly an order of magnitude from cold to operating temperature, giving a soft start into a capacitive load and a hard limit into a resistive fault. Selecting the wattage sets the limit: a 12 W bulb on a 22 V system limits at a few hundred milliamps once hot, enough to reveal a fault and far too little to damage anything.</p>
<p>Electrolytic capacitor reversal is an energetic failure because the dielectric is formed electrochemically and reverse bias degrades it, producing gas and heat rapidly. Modern capacitors have scored vents to direct the failure, which makes them safer and not safe, and the relevant point for a builder is that the component is one of very few on the board where orientation error is immediately destructive rather than merely non-functional.</p>
<p>A final note on inrush and connector life that builders underestimate. Each unmitigated connection event erodes a small amount of contact material, and the cumulative effect over hundreds of cycles raises contact resistance, which raises heating, which accelerates erosion. Anti-spark pre-charging is therefore not about the visual spark but about the long-run resistance of the highest-current joint in the aircraft, and on a build drawing over a hundred amps that joint is the one with the least margin.</p>`,
    },
    labs: [
      {
        n: 1,
        title: "First power-up without destroying anything",
        objective:
          "Take a freshly soldered power system from untested to proven, finding any fault at the cheapest possible point.",
        ppe: [
          "Safety glasses, because a reversed capacitor vents without warning",
          "A LiPo-safe container within reach, and the pack kept in it until needed",
          "A clear bench with nothing conductive loose on it",
          "A fire-resistant surface, and know where your extinguisher or sand bucket is before you connect anything",
        ],
        tools: [
          "Smoke stopper lead with an incandescent bulb",
          "Multimeter with continuity and resistance",
          "Magnifier or a phone camera to zoom",
          "Isopropanol and a brush",
          "LiPo-safe bag or metal container",
        ],
        steps: [
          {
            n: 1,
            title: "Inspect every joint under magnification",
            detail:
              "<p>Go over the board with a magnifier or a zoomed phone camera. You are looking for solder bridges between adjacent pads, stray strands of copper, and splashes that have landed somewhere they should not be.</p><p>This is the cheapest check there is and it catches the most common fault. Finding a bridge with your eyes costs nothing; finding it with a battery can cost the whole build.</p>",
            tools: ["Magnifier"],
            minutes: 8,
          },
          {
            n: 2,
            title: "Check the capacitor polarity",
            detail:
              "<p>Find the negative stripe on the electrolytic capacitor and confirm it goes to the negative pad.</p><p>This is one of very few components where getting the orientation wrong is immediately destructive rather than merely non-functional. A reversed electrolytic heats and vents, sometimes violently, and it is sitting inside a carbon frame next to a lithium pack.</p>",
            hazard: {
              level: "danger",
              text: "Do not power up with a capacitor you have not checked. A reversed electrolytic can burst and it is at eye level when you are leaning over the bench. Confirm the stripe against the pad marking before anything is connected.",
            },
            minutes: 4,
          },
          {
            n: 3,
            title: "Continuity test between the rails",
            detail:
              "<p>Multimeter on continuity, one probe on the positive battery pad and one on the negative. There should be no beep.</p><p>A beep means a dead short, and you now go back to step one with a specific thing to look for rather than connecting a battery to find out.</p>",
            reading: {
              label: "Resistance between positive and negative",
              unit: "ohms",
              min: 2,
              max: 99999,
              hint: "Near zero is a bridge. Note that a few strands bridging to a ground plane may read too high to beep and still dissipate serious power under load, which is what the smoke stopper catches and the meter does not.",
            },
            tools: ["Multimeter"],
            minutes: 4,
          },
          {
            n: 4,
            title: "Connect the smoke stopper, not the battery",
            detail:
              "<p>Put the current-limited lead between the pack and the build. Confirm the bulb is an incandescent one: an LED will not do this job, because the limiting depends on a filament's resistance rising as it heats.</p><p>Keep the flight controller off the build for this test if it is not already fitted. The point is to prove the power system in isolation.</p>",
            tools: ["Smoke stopper lead"],
            minutes: 4,
          },
          {
            n: 5,
            title: "Connect the pack and read the bulb",
            detail:
              "<p>Connect, and watch. A brief flash as the capacitors charge is normal and expected: that is inrush, the same thing that makes a spark when you plug a battery in directly.</p><p>A bulb that lights brightly and stays lit is a dead short. A bulb that glows dimly and steadily is a partial short or an abnormal quiescent draw, and it is worth chasing rather than ignoring: it is the fault class a continuity test misses.</p>",
            hazard: {
              level: "danger",
              text: "If the bulb stays lit, disconnect immediately. Do not hold it on to see what happens, and do not conclude the limiter is protecting you indefinitely. Disconnect, find the fault, and only then try again.",
            },
            reading: {
              label: "How many seconds the bulb stayed brightly lit",
              unit: "s",
              min: 0,
              max: 2,
              hint: "A brief flash is the capacitors charging and is normal. Anything beyond a couple of seconds is a fault, and the correct response is to disconnect rather than to wait.",
            },
            minutes: 5,
          },
          {
            n: 6,
            title: "Check for heat with the limiter still in circuit",
            detail:
              "<p>With the bulb dark and the system idling, feel the board, the ESCs and the battery lead. Everything should be at room temperature.</p><p>Anything noticeably warm at essentially zero load has a resistance problem, and that is a joint to remake now rather than a progressive failure later.</p>",
            minutes: 4,
          },
          {
            n: 7,
            title: "Confirm the regulated output",
            detail:
              "<p>Measure the 5 V rail that will feed the flight controller and receiver. It should be close to 5 V and stable.</p><p>A regulator that is out of specification will destroy or brown out everything downstream, and this is the last moment you can find out before those components are connected.</p>",
            reading: {
              label: "Regulated output voltage",
              unit: "V",
              min: 4.8,
              max: 5.3,
              hint: "Outside this band, do not connect the flight controller. A low reading suggests a loaded or failing regulator; a high one will destroy everything downstream the moment it is attached.",
            },
            tools: ["Multimeter"],
            minutes: 5,
          },
          {
            n: 8,
            title: "Disconnect, then connect directly",
            detail:
              "<p>Remove the smoke stopper and connect the pack directly. Expect a spark: that is inrush into the capacitors and it is normal.</p><p>Confirm everything still behaves, then disconnect and move on to fitting the flight controller onto a power system you have now proved rather than assumed.</p>",
            capture: { label: "The smoke stopper in circuit during the test", medium: "photo" },
            minutes: 5,
          },
        ],
        skills: ["Smoke stopper", "Short circuit", "Capacitor polarity", "Continuity check"],
      },
    ],
    evidence: [
      {
        n: 1,
        title: "Film a first power-up through a current limiter",
        brief: `<p>Film the first power-up of a build, or of a deliberately re-tested one, through a smoke stopper.</p>
<p>The clip has to show three things at once: the limiter in circuit, the flight controller absent or disconnected, and the moment the battery goes on. One continuous shot, because the sequencing is the point.</p>
<p><strong>If you have a spare board, make a fault deliberately.</strong> Bridge two pads with a blob of solder, power up through the limiter, and film the bulb staying lit. Then remove it and show the clean result. Seeing the fault behaviour is worth more than seeing a clean test, and it is completely safe through a limiter.</p>`,
        captures: [
          {
            key: "setup",
            medium: "photo",
            label: "The test setup",
            mustShow:
              "The smoke stopper lead between pack and build, with the bulb visible and the flight controller standoffs empty or the board unplugged. Enrolment number on paper in frame.",
          },
          {
            key: "clean",
            medium: "video",
            label: "A clean power-up",
            seconds: 45,
            mustShow:
              "One continuous shot with the bulb in frame: the battery connected, the brief inrush flash, and the bulb going dark.",
          },
          {
            key: "fault",
            medium: "video",
            label: "A deliberate fault, if you can make one safely",
            seconds: 30,
            mustShow:
              "The bulb lighting and staying lit with a known short in place, then being disconnected promptly rather than held on.",
          },
          {
            key: "rail",
            medium: "photo",
            label: "The regulated rail measured",
            mustShow: "A multimeter reading the 5 V output with the probes visibly on the correct pads.",
          },
        ],
        integrity: [
          "My enrolment number is on paper and visible in the setup photograph.",
          "The clean power-up is one unbroken recording, because the evidence is that the flight controller was absent at that moment.",
          "Any deliberate fault was made on a spare or sacrificial board and was removed afterwards.",
          "This is the same build in every capture and I have said in my note whether it was a new build or a re-test.",
        ],
        rubric: [
          {
            key: "sequencing",
            label: "The test happened before the expensive parts were connected",
            bands: [
              "Powered up directly with no limiter, or with the full stack already fitted",
              "Limiter used but with the flight controller already connected",
              "Limiter used with the flight controller absent",
              "Limiter used with the stack absent, and the note identifies what the test was protecting and roughly what it is worth",
            ],
            weight: 3,
          },
          {
            key: "reading",
            label: "The bulb is read correctly",
            bands: [
              "No distinction drawn between the inrush flash and a sustained light",
              "The clean result shown but not interpreted",
              "Inrush flash correctly identified as normal, sustained light as a fault",
              "Both identified, plus recognition that a steady dim glow is a partial short that a continuity test would miss",
            ],
            weight: 3,
          },
          {
            key: "priorchecks",
            label: "The cheaper checks came first",
            bands: [
              "Straight to power with no inspection or meter test",
              "One of visual inspection or continuity testing evidenced",
              "Both visual inspection and continuity testing evidenced before power",
              "Both, plus the capacitor polarity explicitly checked, which is the one orientation error that is immediately destructive",
            ],
            weight: 2,
          },
          {
            key: "rail",
            label: "The regulated rail was verified",
            bands: [
              "The regulated rail was never measured at all",
              "Measured but with no reference to an acceptable range",
              "Measured and within specification",
              "Measured, in specification, and the note says what an out-of-range reading would have meant for the flight controller",
            ],
            weight: 2,
          },
        ],
        exemplar: [
          {
            criterion: "The bulb is read correctly",
            band: 3,
            note: "The note distinguishes all three states and adds the one most submissions miss: a dim steady glow is a partial short, typically a few strands to a ground plane, which reads too high to trip a continuity beeper and still dissipates real power under load.",
          },
          {
            criterion: "The cheaper checks came first",
            band: 1,
            note: "A continuity test is shown, which is good, and there is no magnified inspection and no capacitor check. The meter will not find a stray strand near a pad and it will not find a reversed electrolytic, and the second of those is the component that vents.",
          },
        ],
        minutes: 40,
        skills: ["Smoke stopper", "Short circuit", "Inrush current", "Capacitor polarity"],
      },
    ],
  },

  /* ===================================================================== */
  5113: {
    topicId: 5113,
    title: "Flight controller setup, orientation and motor order",
    summary:
      "Four settings decide whether the aircraft flies or flips on the first arm. All four are checked on the bench with the propellers off.",
    concepts: ["Board orientation", "Motor numbering", "Motor direction", "Receiver binding", "Accelerometer calibration"],
    glossary: {
      "Board orientation": "The flight controller's rotation relative to the airframe, set in software when the arrow does not point forward.",
      "Motor numbering": "Which physical motor corresponds to which output. Betaflight counts from the rear left, anticlockwise.",
      "Motor direction": "Which way each motor spins, set by wire order or in software, following a required diagonal pattern.",
      "Receiver binding": "Pairing the receiver to the transmitter so the aircraft responds to your sticks and nobody else's.",
      "Accelerometer calibration": "Levelling the board in software so the aircraft knows what horizontal is.",
      "Props off": "The rule that no motor is spun with blades attached until every direction and output is confirmed.",
    },
    body: {
      Beginner: `<p>Four things, in this order, all with the propellers off.</p>
<p><strong>Orientation.</strong> The flight controller has an arrow printed on it and it must point forward. If your frame made you mount it rotated, tell the software: there is a board alignment setting in degrees. Get this wrong and the aircraft corrects in the wrong direction, which is immediate and violent.</p>
<p><strong>Motor numbering.</strong> Spin each motor one at a time from the configurator and watch which one turns. Betaflight numbers from the <strong>rear left</strong>, not from the front, and assuming otherwise is the single most common first-build error.</p>
<p><strong>Motor direction.</strong> Two motors spin one way and two the other, diagonally paired. Check each one against the diagram in your software. If one is wrong you can either swap any two of its three motor wires, or reverse it in software, and both work.</p>
<p><strong>Binding and failsafe.</strong> Pair the receiver to your transmitter, then check that the throttle goes to zero when you switch the transmitter off. Test it on the bench, props off, before the first flight.</p>
<p>Then calibrate the accelerometer with the aircraft on a level surface, and only then put the propellers on.</p>`,
      Intermediate: `<p>These four settings are the interface between the software's model of the aircraft and the physical machine, and every one of them fails loudly rather than subtly. That is actually a mercy: a wrong board orientation does not produce a slightly odd aircraft, it produces one that flips on arming, so the fault is unmistakable if you find it on the bench.</p>
<p>Board alignment exists because frames frequently require the flight controller to be mounted rotated to clear a connector or to route a cable. The software setting compensates, and it must match reality exactly. A 90 degree error makes the aircraft correct roll with pitch, which is immediate and unrecoverable.</p>
<p>Motor numbering is a convention rather than a physical fact, and the convention is not intuitive. Betaflight numbers from the rear left and proceeds anticlockwise viewed from above. Builders who assume front-left-first wire their ESCs in good faith to the wrong outputs, and the result is an aircraft that responds to a roll command with a yaw.</p>
<p>Direction is set per motor and must follow the diagonal pattern the software expects. Reversing a motor is either a wire swap or a software setting with modern digital ESCs, and both are equally valid. What is not valid is correcting a wrong direction by reversing the propeller, which produces thrust in the right direction and the wrong torque reaction, and yaw control is then inverted.</p>`,
      Advanced: `<p>The reason these errors are catastrophic rather than degraded is that the controller is a feedback loop, and an orientation or numbering error inverts the sign of the feedback. A correctly signed loop corrects a disturbance; an inverted one amplifies it, so the aircraft departs within a fraction of a second of arming. This is also why there is no partial version of the fault and why bench verification is non-negotiable.</p>
<p>Accelerometer calibration establishes the board's zero attitude and should be done on a surface known to be level, with the aircraft in its flying configuration including the battery. Calibrating on a sloped bench produces an aircraft that drifts persistently in angle mode and requires continuous trim, which is often misdiagnosed as a centre of gravity problem or a motor imbalance.</p>
<p>Failsafe configuration deserves more attention than it receives because its default is not always safe. The aircraft must do something defined when the link is lost, and for a line-of-sight freestyle build that is almost always a throttle cut, since a return-to-home without GPS is meaningless. Testing it means arming on the bench with props off and switching the transmitter off, which is both the only real test and the one most often skipped.</p>
<p>Motor output protocol and ESC configuration interact with this process in ways that catch builders. A digital protocol requires no throttle calibration, while an analogue one does, and a build with mismatched protocol settings produces one motor spinning up before the others or motors that do not respond at all. Checking the protocol matches between the flight controller and the ESCs is part of this setup rather than a separate task.</p>`,
      Expert: `<p>Formally, the board alignment setting is a rotation applied to the gyroscope and accelerometer readings before they enter the estimator, so an incorrect alignment introduces a systematic rotation between the measured and actual body frames. The resulting closed loop is unstable for alignment errors approaching ninety degrees, which is why the failure is binary. Smaller alignment errors, for instance a board mounted a few degrees off square, degrade performance measurably without causing departure, and they show up as cross-coupling between roll and pitch responses.</p>
<p>Motor mixing takes the controller's demanded roll, pitch, yaw and throttle and distributes them across the four outputs through a mix matrix determined by geometry. An output numbering error permutes the columns of that matrix, which generically produces a matrix that is not a valid mix for any physical configuration, hence departure. This is why the fault cannot be trimmed out and why the correct response is always to fix the mapping rather than to adjust gains.</p>
<p>The yaw authority consequence of a reversed propeller is worth stating precisely, since it is the error builders most often rationalise. Yaw is produced by differential reaction torque between the clockwise and anticlockwise pairs, so reversing a propeller on an unreversed motor leaves thrust correct and the torque sign wrong, which breaks the yaw mix while leaving hover apparently functional. The aircraft hovers and will not hold heading, and the cause is invisible to anyone inspecting thrust.</p>
<p>Finally, on failsafe, there is a design argument for preferring throttle cut over any smarter behaviour on a line-of-sight aircraft without redundant navigation. A failsafe that attempts to fly introduces a mode in which an aircraft with a failed link is under autonomous control with no supervision, and the failure modes of that mode are worse than a controlled fall from the altitude a line-of-sight aircraft typically occupies. The reasoning inverts for a BVLOS platform with redundant GPS, and knowing which regime you are in is the actual competence.</p>`,
    },
    parts: [
      {
        n: 1,
        title: "Motor numbering, direction and the signal path",
        diagram: "drone-power",
        brief: `<p>Identify the points on the power and signal path, then match each ESC output to what it must be connected to.</p>
<p>The numbering convention is the trap here. Betaflight counts motors from the <strong>rear left</strong>, proceeding anticlockwise viewed from above, not from the front. Everything in your configurator assumes that, and the frame does not tell you.</p>
<p>Every check in this topic is done with the propellers off, which is why there are none in this diagram.</p>`,
        hotspots: [
          {
            key: "bat",
            label: "Battery input",
            x: 14,
            y: 51,
            does: "Where the pack enters. Cell count here sets the system voltage, and everything downstream is rated against it.",
            confusedWith:
              "The balance lead, which is the small multi-pin plug used for charging and which carries no flight current.",
          },
          {
            key: "pdbpt",
            label: "Power distribution",
            x: 49,
            y: 51,
            does: "Splits current to four ESCs and provides the regulated supply for the flight controller and receiver.",
            confusedWith:
              "The flight controller in the same stack. The PDB has the heavy battery pads and no USB socket or gyro.",
          },
          {
            key: "esc1",
            label: "ESC 1 output",
            x: 75,
            y: 24,
            does: "Carries the drive for motor 1, which in the Betaflight convention is the rear right motor seen from above.",
            confusedWith:
              "ESC 4, which sits beside it on the board. The outputs are indistinguishable physically and only the configurator tells you which is which.",
          },
          {
            key: "mot1",
            label: "Motor 1",
            x: 90,
            y: 24,
            does: "The rear right motor in the standard numbering. Three wires, and swapping any two reverses its direction.",
            confusedWith:
              "The front right motor, which is the assumption builders make when they number from the front instead of from the rear.",
          },
          {
            key: "capchk",
            label: "Low ESR capacitor",
            x: 38,
            y: 30,
            does: "Absorbs ESC switching spikes on the power rail. Its absence shows up as a gyro that will not settle rather than as anything obviously electrical.",
            confusedWith:
              "A video filter, which is a smaller component on the VTX supply. This one goes directly across the main battery input.",
          },
        ],
        sequence: [
          {
            key: "capchk",
            label: "Confirm the capacitor is fitted and the right way round",
            why: "Before any power. It is the one component whose reversal is immediately destructive, and its absence corrupts the gyro signal you are about to rely on.",
          },
          {
            key: "bat",
            label: "Power up and confirm the regulated rail",
            why: "The flight controller cannot be configured until it has a stable supply, and an out-of-specification regulator destroys it.",
          },
          {
            key: "esc1",
            label: "Spin each motor individually from the configurator",
            why: "This is how you discover the actual mapping rather than assuming it. Props off, one motor at a time, and write down which physical motor each output drives.",
          },
          {
            key: "mot1",
            label: "Correct any wrong direction, by wire swap or in software",
            why: "The diagonal pattern must match what the mixer expects. Reversing the propeller instead leaves thrust correct and the torque reaction wrong, which breaks yaw.",
          },
          {
            key: "pdbpt",
            label: "Re-verify the whole mapping end to end before props go on",
            why: "A numbering error permutes the mix matrix and the aircraft departs on arming, so the mapping is confirmed rather than assumed every single time.",
          },
        ],
        wiring: [
          {
            from: "esc1",
            to: "Motor 1, rear right seen from above",
            note: "Betaflight numbers from the rear left anticlockwise, so output 1 is the rear right. Assuming front-first is the commonest first-build error.",
          },
          {
            from: "bat",
            to: "PDB battery pads, then four ESC power pairs",
            note: "The entire current of the aircraft passes through this one pair of joints, which is why they are inspected first after any hard landing.",
          },
          {
            from: "pdbpt",
            to: "Regulated 5 V to the flight controller and receiver",
            note: "Measured before the flight controller is connected, because a regulator out of specification destroys everything downstream.",
          },
          {
            from: "capchk",
            to: "Directly across the main battery input, stripe to negative",
            note: "As close to the pads as possible: on a long lead the inductance defeats the purpose, and reversed it vents.",
          },
        ],
        minutes: 15,
        skills: ["Motor numbering", "Motor direction", "Board orientation"],
      },
    ],
    labs: [
      {
        n: 1,
        title: "Bench setup with the propellers off",
        objective:
          "Configure orientation, motor mapping, direction, binding and failsafe, and verify every one of them before a propeller is fitted.",
        ppe: [
          "Safety glasses, because a motor bell can shed a magnet and a loose grub screw becomes a projectile",
          "Propellers removed and physically out of reach, not merely loose on the bench",
          "The aircraft restrained so it cannot walk off the bench when a motor spins",
          "A LiPo-safe container for the pack between tests",
        ],
        tools: [
          "Computer with the flight controller configurator",
          "USB lead",
          "Transmitter",
          "A level surface for calibration",
          "Hex drivers for motor wire access",
        ],
        steps: [
          {
            n: 1,
            title: "Remove the propellers and put them out of reach",
            detail:
              "<p>Off the aircraft and off the bench. Not loose beside it, not in the box next to you.</p><p>Every remaining step in this procedure involves spinning motors whose direction you have not yet confirmed. A blade on a motor turning the wrong way, on a frame that is about to lurch, is how people lose fingertips.</p>",
            hazard: {
              level: "danger",
              text: "Do not proceed with propellers anywhere on the bench. This is the only step in the build where the hazard is to you rather than to the equipment, and it is the one most often rationalised away.",
            },
            minutes: 2,
          },
          {
            n: 2,
            title: "Set the board orientation to match reality",
            detail:
              "<p>Look at the arrow on the flight controller and compare it to the front of the airframe. If the board is mounted rotated, set the board alignment in degrees so the software knows.</p><p>Tilt the aircraft nose down and confirm the model on screen tilts nose down. Roll it left and confirm it rolls left. If the model does something else, the alignment is wrong and no amount of tuning will fix it.</p>",
            tools: ["Configurator"],
            minutes: 8,
          },
          {
            n: 3,
            title: "Calibrate the accelerometer on a known level surface",
            detail:
              "<p>Put the aircraft, with its battery fitted, on a surface you have checked is level, and run the accelerometer calibration.</p><p>Calibrating on a sloped bench produces an aircraft that drifts persistently and needs continuous trim, which gets misdiagnosed as a centre of gravity problem or a motor imbalance for weeks.</p>",
            minutes: 5,
          },
          {
            n: 4,
            title: "Spin each motor individually and write down the mapping",
            detail:
              "<p>In the motors tab, spin output 1 only. Watch which physical motor turns and write it down. Repeat for 2, 3 and 4.</p><p>Do not assume the convention, discover it. Betaflight numbers from the rear left anticlockwise, which is not what most builders guess, and an output numbering error permutes the mix matrix so the aircraft departs the instant it is armed.</p>",
            hazard: {
              level: "warning",
              text: "Keep hands, cables and the USB lead clear of the motor bells. A bare motor will catch a sleeve or a wire and wind it in instantly.",
            },
            minutes: 10,
          },
          {
            n: 5,
            title: "Check each direction against the required pattern",
            detail:
              "<p>Compare each motor's direction against the diagram in the configurator. Two spin one way and two the other, diagonally paired.</p><p>Mark each bell with a dab of paint or a strip of tape so the direction is visible at a glance while it turns.</p>",
            reading: {
              label: "How many motors were spinning the wrong way",
              unit: "motors",
              min: 0,
              max: 4,
              hint: "Any non-zero number is normal at this stage and is fixed either by swapping two of the three motor wires or by reversing the motor in software. What is not acceptable is correcting it by turning the propeller over.",
            },
            minutes: 8,
          },
          {
            n: 6,
            title: "Correct any wrong directions properly",
            detail:
              "<p>Either swap any two of the three motor wires, or reverse the motor in the ESC configuration. Both are correct and equivalent.</p><p>Do not fix a wrong direction by fitting the opposite-handed propeller. That gives thrust in the right direction and the torque reaction in the wrong one, so the aircraft hovers and cannot hold heading, and the cause is invisible to anyone looking at thrust.</p>",
            minutes: 15,
          },
          {
            n: 7,
            title: "Bind the receiver and check every channel",
            detail:
              "<p>Bind to your transmitter, then move each stick and switch and confirm the configurator shows the expected channel moving in the expected direction.</p><p>A reversed channel found here is a menu change. Found in the air it is a crash.</p>",
            minutes: 10,
          },
          {
            n: 8,
            title: "Set and then actually test the failsafe",
            detail:
              "<p>Configure the failsafe to drop the throttle. Then arm the aircraft on the bench, with the props still off, and switch the transmitter off.</p><p>The motors must stop. Setting a failsafe and not testing it is the most common gap in an otherwise careful build, and a default that was never verified is not a failsafe.</p>",
            hazard: {
              level: "danger",
              text: "Arming on the bench is the one deliberately dangerous act in this procedure. Propellers off, aircraft restrained, nobody within reach, and your hand on the disconnect.",
            },
            reading: {
              label: "Seconds from transmitter off to motors stopping",
              unit: "s",
              min: 0,
              max: 2,
              hint: "Anything beyond a couple of seconds means the failsafe delay is set too long, or the receiver is holding its last values rather than reporting the loss of link.",
            },
            minutes: 10,
          },
          {
            n: 9,
            title: "Re-verify the mapping, then fit the propellers",
            detail:
              "<p>Run through the motor outputs once more and confirm nothing changed while you were working. Then fit the propellers, matching handedness to the direction you marked on each bell.</p><p>This is the last gate. Everything after it happens with blades attached.</p>",
            capture: { label: "Direction marks on all four bells, with props fitted correctly", medium: "photo" },
            minutes: 10,
          },
        ],
        skills: ["Board orientation", "Motor numbering", "Motor direction", "Receiver binding", "Props off"],
      },
    ],
  },
  /* ===================================================================== */
  5114: {
    topicId: 5114,
    title: "Failsafes, arming checks and the pre-flight that matters",
    summary:
      "A short list performed every single time, because the failures it catches are the ones that are cheap on the ground and expensive at altitude.",
    concepts: ["Failsafe", "Arming check", "Pre-flight", "Prop security", "Battery check"],
    glossary: {
      Failsafe: "What the aircraft does when it loses the radio link. Must be configured and tested, not assumed.",
      "Arming check": "The conditions the flight controller requires before it will allow the motors to start.",
      "Pre-flight": "The fixed sequence of checks performed before every flight, not only after a build.",
      "Prop security": "Confirming each propeller is tight and correctly handed, which is the most common cause of a first-flight failure.",
      "Battery check": "Confirming cell count, resting voltage and physical condition before the pack goes on.",
      "Control surface check": "Confirming each stick produces the expected response, which on a multirotor means watching the motor outputs.",
    },
    body: {
      Beginner: `<p>The same checks, every flight, in the same order. Not just after a build.</p>
<p><strong>Battery.</strong> Right cell count for this aircraft, not puffed or damaged, and resting voltage sensible. A 6S pack in a 4S build destroys everything instantly, and it only takes one distracted moment.</p>
<p><strong>Props.</strong> Each one tight, each one the right way round for its motor. This is the commonest reason a first flight does not work, and it takes ten seconds to check.</p>
<p><strong>Airframe.</strong> Arms tight, nothing loose, nothing rubbing, battery strapped so it cannot shift. A battery that moves in flight changes the centre of gravity mid-manoeuvre.</p>
<p><strong>Controls.</strong> Transmitter on first, always, before the aircraft. Check each stick moves the right output in the right direction.</p>
<p><strong>Failsafe.</strong> You tested it on the bench with props off. If anything in the radio setup has changed since, test it again.</p>
<p>Then arm it, hover at knee height for ten seconds, and listen. Most problems announce themselves in those ten seconds, and at that height nothing is damaged.</p>`,
      Intermediate: `<p>The reason to use a fixed sequence rather than a general look-over is that attention is unreliable and a list is not. Experienced pilots do not skip checks because they are confident, they use the list precisely because confidence is what makes people skip things.</p>
<p>Transmitter on before the aircraft, and off after, is a rule with a specific reason: powering the aircraft first means it may see no link and enter failsafe, or worse see a spurious signal. The same ordering applies at the end of the session.</p>
<p>Arming checks in the firmware are a safety feature and disabling them to get airborne is the behaviour that most reliably precedes an incident. A refusal to arm is the aircraft telling you something: the accelerometer is not calibrated, the throttle is not at zero, the angle is too steep, the receiver is not reporting. Each is a real condition and each has a fix.</p>
<p>The hover at knee height is the cheapest diagnostic in aviation. Ten seconds at a metre reveals an imbalance, a wrong direction, a loose prop, a vibration problem and a drift, and all of them are survivable at that altitude. Pilots who climb straight out discover the same faults where the aircraft has time to accelerate into something.</p>`,
      Advanced: `<p>Failsafe design is a decision rather than a default, and the right answer depends on the operation. For a line-of-sight aircraft without reliable GPS, throttle cut is correct: a failsafe that attempts to fly puts an unsupervised aircraft under autonomous control with no navigation, and the failure modes of that are worse than a controlled descent from the altitude such aircraft typically occupy. For a GPS-equipped platform operating beyond visual line of sight, return to home is correct for the same reason inverted.</p>
<p>Testing the failsafe is not optional and it is not satisfied by reading the setting. The test is to arm with props off, switch the transmitter off, and observe. Receivers differ in how they signal loss of link, and a receiver configured to hold its last values rather than to report the failure will leave the aircraft at whatever throttle it last saw, which is the worst possible outcome and is invisible in the configuration screen.</p>
<p>The pre-flight list's value lies in its invariance. Research on checklist use in aviation and in surgery consistently finds that the benefit comes from the discipline of completion rather than from the individual items, and that the dominant failure mode is partial completion under time pressure. The practical implication for a hobbyist is to make the list short enough that it is always completed rather than comprehensive enough to be impressive.</p>
<p>On propellers specifically, the failure is worth understanding. A loose propeller on an accelerating motor can unscrew itself, and the self-tightening thread direction only holds under acceleration, not under deceleration. That is why a prop that survived a flight can leave during a descent, and why they are checked by hand every single time rather than when they feel loose.</p>`,
      Expert: `<p>The arming check set in modern firmware constitutes a lightweight interlock system, and each check maps to a specific hazard: throttle position to inadvertent spool-up, angle to a departure from an unrecoverable attitude, receiver status to a flyaway, and sensor calibration to an inverted feedback sign. Disabling checks to get airborne removes the interlock without removing the hazard, which is the textbook definition of a defeated safety device and is treated as such in every regulated aviation context.</p>
<p>Failsafe behaviour has an interesting interaction with radio protocol. Modern digital links report link quality continuously and can distinguish degradation from loss, which enables a graduated response: a warning at reduced quality and a failsafe at loss. Older systems present a binary, and the gap between them is where a flyaway lives, since an aircraft at the edge of range may oscillate between states. Configuring a failsafe delay long enough to ride out a momentary dropout and short enough to act on a genuine loss is a real tuning problem with no universally correct answer.</p>
<p>The low hover is diagnostically rich in a way that is worth making explicit, because it exercises the full control loop at low energy. Vibration shows as motor noise and as a visible shimmer, control sign errors show as an immediate departure, imbalance shows as drift requiring constant correction, and a weak motor shows as a yaw bias. Each of these is a different fault with a different fix, and all of them present within a few seconds at an altitude where the consequence is a scratched frame.</p>
<p>Finally, there is a documented human factors pattern worth naming. Incident analyses across aviation consistently find that checks are most often omitted when the operator is interrupted mid-sequence, and the mitigation is to restart the list rather than to resume it. For a hobbyist at a flying field, interruption is constant, and adopting the restart rule is a cheap import from a domain that learned it expensively.</p>`,
    },
    labs: [
      {
        n: 1,
        title: "The pre-flight sequence, performed in order",
        objective:
          "Take an aircraft from in the bag to hovering, with every check completed in sequence and the failsafe verified rather than assumed.",
        ppe: [
          "Safety glasses while the propellers are on and the pack is connected",
          "Everybody clear of the aircraft before it is armed, and nobody downwind of the props",
          "A LiPo-safe container for packs before and after flight",
          "A clear area with no people, animals or vehicles within the distance you are required to keep",
        ],
        tools: [
          "Transmitter with charged batteries",
          "Flight pack, charged and checked",
          "Multimeter or a pack voltage checker",
          "Hex driver and prop tool",
          "A level patch of ground for the hover",
        ],
        steps: [
          {
            n: 1,
            title: "Check the battery before it goes anywhere near the aircraft",
            detail:
              "<p>Confirm the cell count matches this aircraft. Check for puffing, dents and damage. Measure the resting voltage.</p><p>A 6S pack in a 4S build destroys the electronics instantly and takes one distracted moment, which is why cell count is the first thing checked rather than something assumed from the shelf it came off.</p>",
            reading: {
              label: "Resting voltage per cell",
              unit: "V",
              min: 3.7,
              max: 4.25,
              hint: "Below about 3.7 the pack is not charged for flight. Above 4.25 something is wrong with the charger and the pack should not be flown or charged again until you know what.",
            },
            tools: ["Voltage checker"],
            minutes: 4,
          },
          {
            n: 2,
            title: "Check each propeller by hand",
            detail:
              "<p>Grip each propeller and try to turn it against the motor. It should not move. Confirm each one is the correct handedness for the direction marked on that bell.</p><p>A loose propeller self-tightens under acceleration and not under deceleration, which is why a prop that survived a whole flight can leave during a descent. This is checked every flight, not when something feels loose.</p>",
            hazard: {
              level: "warning",
              text: "Do this before the battery is connected. A motor that spins while your fingers are on a blade will take skin off, and the aircraft does not have to be armed for a fault to spin a motor.",
            },
            minutes: 4,
          },
          {
            n: 3,
            title: "Check the airframe and the battery mounting",
            detail:
              "<p>Arms tight, nothing rubbing, no wire near a propeller arc, aerials clear of carbon and clear of each other. Battery strapped so it cannot shift.</p><p>A battery that moves in flight relocates the centre of gravity mid-manoeuvre, and the controller will spend the rest of the flight fighting it.</p>",
            minutes: 5,
          },
          {
            n: 4,
            title: "Transmitter on first, aircraft second",
            detail:
              "<p>Power the transmitter, confirm the correct model is selected, then connect the aircraft's pack.</p><p>The ordering matters. Powering the aircraft first means it may see no link and enter failsafe, or see a spurious signal from something else, and the same ordering applies in reverse at the end of the session.</p>",
            hazard: {
              level: "danger",
              text: "Confirm the correct model is loaded on the transmitter before connecting the pack. A model memory for a different aircraft can have reversed channels, a different failsafe and a different arming switch, and the first indication will be the aircraft doing the opposite of what you asked.",
            },
            minutes: 3,
          },
          {
            n: 5,
            title: "Check every control",
            detail:
              "<p>Move each stick and watch the response. On a multirotor that means watching the motor outputs on screen or listening to the spool-up, since there are no control surfaces to see.</p><p>A reversed channel found here is a menu change. Found in the air it is a crash.</p>",
            minutes: 4,
          },
          {
            n: 6,
            title: "Verify the failsafe if anything has changed",
            detail:
              "<p>If the radio setup, the receiver or the firmware has changed since the last verified test, test it again: props off, arm on the bench, switch the transmitter off, confirm the motors stop.</p><p>Reading the setting is not a test. Receivers differ in how they signal a lost link, and one configured to hold its last values will leave the aircraft at whatever throttle it last saw, which is invisible in the configuration screen and is the worst possible outcome.</p>",
            minutes: 6,
          },
          {
            n: 7,
            title: "Clear the area and announce",
            detail:
              "<p>Look around properly. Nobody within the distance you are required to keep, nothing downwind of the propellers, and say out loud that you are arming.</p><p>If anybody interrupts you between here and arming, go back to step one. Incident analyses consistently find checks are omitted when the operator is interrupted mid-sequence, and the mitigation is to restart the list rather than to resume it.</p>",
            minutes: 2,
          },
          {
            n: 8,
            title: "Arm, and hover at knee height for ten seconds",
            detail:
              "<p>Arm and bring it to about a metre. Hold it there. Listen and watch.</p><p>Ten seconds at that height reveals vibration, a control sign error, an imbalance, a loose propeller and a weak motor, and every one of them is survivable at a metre. Pilots who climb straight out find the same faults where the aircraft has room to accelerate into something.</p>",
            hazard: {
              level: "danger",
              text: "Keep your thumb on the disarm. If anything sounds or looks wrong, put it down and disarm rather than trying to diagnose it in the air.",
            },
            reading: {
              label: "Hover throttle observed",
              unit: "%",
              min: 10,
              max: 45,
              hint: "Compare this against the figure you calculated from thrust and weight. A hover much higher than predicted means more weight or less thrust than you assumed, and it is worth landing to find out which.",
            },
            minutes: 3,
          },
          {
            n: 9,
            title: "Land, disarm, aircraft off before transmitter",
            detail:
              "<p>Land, disarm, disconnect the pack, and only then switch the transmitter off. The reverse of the start-up order, for the same reason.</p><p>Put the pack in its container. Note anything you noticed in the hover before you forget it.</p>",
            capture: { label: "The aircraft after landing, with the pack disconnected", medium: "photo" },
            minutes: 3,
          },
        ],
        skills: ["Pre-flight", "Failsafe", "Prop security", "Battery check"],
      },
    ],
    questions: [
      {
        n: 1,
        question: "Why is the transmitter switched on before the aircraft?",
        options: [
          "So the aircraft does not see a lost link or a spurious signal at power-up",
          "Because the transmitter takes longer to boot",
          "To charge the receiver before flight",
          "It makes no difference as long as both are on",
        ],
        answer: 0,
        explanation:
          "An aircraft powered first may enter failsafe or pick up a signal from something else. The same ordering applies in reverse at the end of the session, which is why the aircraft is disconnected before the transmitter is switched off.",
        difficulty: "Easy",
        skill: "Pre-flight",
      },
      {
        n: 2,
        question: "A propeller that survived a whole flight comes off during the descent. The likely reason is:",
        options: [
          "The self-tightening thread holds under acceleration but not under deceleration",
          "Propellers weaken during flight",
          "The motor reversed direction",
          "Descent produces more vibration than climbing",
        ],
        answer: 0,
        explanation:
          "Prop nuts are threaded so that accelerating the motor tightens them, and decelerating does the opposite. That is exactly why they are checked by hand every flight rather than when something feels loose.",
        difficulty: "Hard",
        skill: "Prop security",
      },
      {
        n: 3,
        question: "The flight controller refuses to arm. The correct response is:",
        options: [
          "Find out which check is failing and fix the condition it describes",
          "Disable the arming checks and fly",
          "Reboot and try again until it arms",
          "Increase the arming angle limit",
        ],
        answer: 0,
        explanation:
          "Each arming check maps to a specific hazard: throttle position, attitude, receiver status, sensor calibration. Disabling one removes the interlock without removing the hazard, which is the definition of defeating a safety device.",
        difficulty: "Medium",
        skill: "Arming check",
      },
      {
        n: 4,
        question: "For a line-of-sight build with no GPS, the right failsafe behaviour is:",
        options: [
          "Cut the throttle",
          "Return to home",
          "Hold the last stick positions",
          "Climb to a safe altitude and hover",
        ],
        answer: 0,
        explanation:
          "Return to home without navigation is meaningless, and holding the last values leaves an unsupervised aircraft at whatever throttle it last saw. From the altitude a line-of-sight aircraft occupies, a controlled fall is the least bad outcome.",
        difficulty: "Hard",
        skill: "Failsafe",
      },
      {
        n: 5,
        question: "Why hover at knee height for ten seconds before climbing?",
        options: [
          "It exercises the whole control loop at an altitude where every fault it reveals is survivable",
          "It warms the battery up",
          "It allows the GPS to acquire satellites",
          "It is required before every flight by regulation",
        ],
        answer: 0,
        explanation:
          "Vibration, a control sign error, an imbalance, a loose propeller and a weak motor all present within a few seconds, and at a metre the consequence is a scratched frame. Climbing straight out finds the same faults with room to accelerate into something.",
        difficulty: "Medium",
        skill: "Pre-flight",
      },
      {
        n: 6,
        question: "You are interrupted halfway through your pre-flight checks. You should:",
        options: [
          "Start the list again from the beginning",
          "Resume from where you were interrupted",
          "Skip to the last two items, which matter most",
          "Carry on, since you remember what you had done",
        ],
        answer: 0,
        explanation:
          "Incident analyses across aviation consistently find that omitted checks cluster around interruptions, and that resuming is unreliable because memory for position in a sequence is poor. Restarting is a cheap import from a domain that learned this expensively.",
        difficulty: "Medium",
        skill: "Pre-flight",
      },
      {
        n: 7,
        question: "Setting the failsafe in the configurator and never testing it is unsafe because:",
        options: [
          "A receiver may hold its last values rather than report the lost link, which the setting does not show",
          "The setting resets on every reboot",
          "Failsafes only work above a certain altitude",
          "It is safe; the setting is sufficient",
        ],
        answer: 0,
        explanation:
          "Receivers differ in how they signal loss of link, and one holding its last values leaves the aircraft at whatever throttle it last saw. The only test is to arm with props off and switch the transmitter off.",
        difficulty: "Hard",
        skill: "Failsafe",
      },
    ],
  },

  /* ===================================================================== */
  5115: {
    topicId: 5115,
    title: "India's drone rules: zones, UIN and the pilot certificate",
    summary:
      "The Drone Rules 2021 are more permissive than most people assume and they are enforced. Knowing which category you are in decides everything else.",
    concepts: [
      "Drone Rules 2021",
      "Digital Sky",
      "Airspace zones",
      "UIN",
      "Remote Pilot Certificate",
      "Nano category",
    ],
    glossary: {
      "Drone Rules 2021": "The current Indian framework, which replaced a far more restrictive 2018 regime.",
      "Digital Sky": "The DGCA's online platform for registration, airspace maps and permissions.",
      "Airspace zones": "Green, yellow and red. Green needs no permission below the stated altitude; red is prohibited.",
      UIN: "Unique Identification Number, the registration issued to an individual aircraft.",
      "Remote Pilot Certificate": "The pilot licence, required above the nano category and obtained through an authorised training organisation.",
      "Nano category": "Aircraft at or below 250 g all up weight, which carry the lightest obligations.",
    },
    body: {
      Beginner: `<p>The rules changed substantially in 2021 and became much more workable. The old regime is what most online advice still describes, so check the date on anything you read.</p>
<p><strong>Weight decides your category.</strong> Nano is 250 g or less and carries the lightest obligations. Micro is up to 2 kg. Small is up to 25 kg. Most five inch builds land in micro, because a 550 g aircraft is comfortably over 250 g.</p>
<p><strong>Register the aircraft.</strong> Above nano you need a UIN, obtained through the Digital Sky portal. It is per aircraft, not per pilot.</p>
<p><strong>Get the pilot certificate.</strong> Above nano you need a Remote Pilot Certificate from an authorised training organisation. Nano aircraft flown below the stated height are exempt.</p>
<p><strong>Check the zone before you fly.</strong> Digital Sky shows an airspace map in green, yellow and red. Green below the stated altitude needs no permission. Yellow needs air traffic clearance. Red is prohibited.</p>
<p>And the rules that apply everywhere regardless: daylight, within visual line of sight, below the altitude limit for your zone, not over crowds, and not near an airport.</p>`,
      Intermediate: `<p>The Drone Rules 2021 replaced the 2018 UAS Rules and substantially liberalised the regime, abolishing a long list of approvals and raising the coverage of green zones. The practical consequence is that recreational flying in most of India is legal and straightforward, and most of the discouraging advice online predates the change.</p>
<p>Category by all up weight determines the obligations, and all up weight means the complete aircraft including battery and propellers. The 250 g nano threshold matters disproportionately because it is the line below which registration and pilot certification fall away, which is why so many commercial products are built to just under it.</p>
<p>Registration is per airframe through Digital Sky and produces a UIN that must be displayed. The Remote Pilot Certificate is per person, obtained through a DGCA-authorised remote pilot training organisation, and the training is a matter of days rather than months.</p>
<p>Airspace classification is the check to run before every flight at an unfamiliar location, because zones change and an area that was green last year may not be. Green below the stated altitude requires no permission, yellow requires clearance from air traffic control, and red is prohibited without specific central government approval. The boundary around an airport is the one that catches people, because it extends considerably further than most expect.</p>`,
      Advanced: `<p>The regulatory architecture is worth understanding structurally because it explains what is and is not required. The rules distinguish by weight and by operation rather than by purpose, so the recreational and commercial distinction that dominates informal discussion is largely absent: a 600 g aircraft requires the same registration and certification whether it is flown for fun or for payment. What differs by purpose is insurance and, for some work, additional permissions.</p>
<p>The No Permission No Takeoff mechanism, which required a digital permission for every flight, was a central feature of the 2018 regime and its software enforcement has been substantially relaxed. The current position relies more on zone compliance and on operator responsibility, which places a greater burden on the pilot to check rather than on the aircraft to refuse. A pilot who assumes the aircraft will stop them is operating on the old model.</p>
<p>Insurance is mandated for certain operations and is in any case the practical constraint on anything commercial, since a client will require it. Third party liability for an aircraft operating over people is the exposure that matters, and the premium is modest relative to the risk. A pilot flying for payment without it is uninsurable after the fact.</p>
<p>Enforcement is real and has been exercised, particularly around airports and sensitive installations, and the penalties under the Aircraft Act are substantial. The practical risk for a hobbyist is less the deliberate violation than the inadvertent one: flying in a yellow zone believing it was green, or near a temporary restriction imposed for an event. Checking Digital Sky each time is cheap and is the mitigation.</p>`,
      Expert: `<p>India's framework sits within a broader international convergence on risk-based rather than purpose-based regulation, following the direction taken by EASA and the FAA. The underlying logic is that the hazard is a function of kinetic energy, operating environment and population exposure rather than of whether money changed hands, and the weight categories are a crude proxy for the first of these. The SORA methodology used elsewhere formalises the same reasoning for operations outside the standard categories.</p>
<p>The 250 g threshold recurs across jurisdictions and its basis is a ground impact energy argument: below roughly that mass, terminal kinetic energy falls under thresholds associated with serious head injury in the available literature. The threshold is therefore not arbitrary, though the underlying studies carry substantial uncertainty and the figure is better understood as a regulatory convention informed by evidence than as a hard physical boundary.</p>
<p>Beyond visual line of sight operation is the frontier and the constraint is detect-and-avoid rather than aircraft capability. An aircraft that cannot sense conflicting traffic cannot be safely integrated into uncontrolled airspace at scale, which is why BVLOS approvals remain case by case and corridor based. The technical approaches, ground-based surveillance, cooperative electronic conspicuity and onboard sense-and-avoid, carry very different cost and coverage profiles, and the regulatory posture reflects which are available.</p>
<p>Finally, the Unmanned Aircraft System Traffic Management concept, which India is developing alongside other jurisdictions, is the long-run answer to density rather than to individual risk. The architecture separates strategic deconfliction before flight from tactical deconfliction during it, and the regulatory implication is that routine operations in dense airspace will eventually require participation in such a system rather than discretionary compliance with zone maps. A pilot entering the field now should expect the obligations to shift from map-checking toward continuous digital participation.</p>`,
    },
    questions: [
      {
        n: 1,
        question: "Your build has an all up weight of 548 g. Its category is:",
        options: ["Micro", "Nano", "Small", "Medium"],
        answer: 0,
        explanation:
          "Nano is 250 g and below, and micro runs up to 2 kg. At 548 g this is micro, which means a UIN and a Remote Pilot Certificate are both required. All up weight includes the battery and propellers.",
        difficulty: "Easy",
        skill: "Drone Rules 2021",
      },
      {
        n: 2,
        question: "A UIN is issued:",
        options: [
          "Per aircraft, through the Digital Sky portal",
          "Per pilot, with the Remote Pilot Certificate",
          "Per flight, before takeoff",
          "Per location where you intend to fly",
        ],
        answer: 0,
        explanation:
          "Registration is per airframe and the number must be displayed. The pilot certificate is the separate per-person requirement, and conflating the two is common.",
        difficulty: "Easy",
        skill: "UIN",
      },
      {
        n: 3,
        question: "A yellow airspace zone means:",
        options: [
          "Flight requires clearance from air traffic control",
          "Flight is prohibited",
          "Flight is permitted with no permission below the stated altitude",
          "Flight is permitted only at night",
        ],
        answer: 0,
        explanation:
          "Green below the stated altitude needs no permission, yellow needs ATC clearance, and red is prohibited without specific central government approval. The zone around an airport extends considerably further than most people expect.",
        difficulty: "Medium",
        skill: "Airspace zones",
      },
      {
        n: 4,
        question: "Under the Drone Rules 2021, the requirements for a 600 g aircraft flown recreationally compared with one flown commercially are:",
        options: [
          "Largely the same, since the rules categorise by weight and operation rather than by purpose",
          "Much lighter for recreational flying",
          "Much heavier for recreational flying",
          "Recreational flying is entirely unregulated",
        ],
        answer: 0,
        explanation:
          "The recreational and commercial distinction that dominates informal discussion is largely absent from the framework. What does differ by purpose is insurance and, for some work, additional permissions.",
        difficulty: "Hard",
        skill: "Drone Rules 2021",
      },
      {
        n: 5,
        question: "Why should you check Digital Sky before every flight at an unfamiliar site?",
        options: [
          "Zones change, and temporary restrictions are imposed for events",
          "The portal logs your flight automatically",
          "It is the only way to arm the aircraft",
          "Registration expires weekly",
        ],
        answer: 0,
        explanation:
          "An area that was green last year may not be now, and temporary restrictions appear around events and sensitive activity. The current regime places the burden on the pilot to check rather than on the aircraft to refuse.",
        difficulty: "Medium",
        skill: "Digital Sky",
      },
      {
        n: 6,
        question: "The 250 g threshold recurs in several countries' rules because:",
        options: [
          "Below roughly that mass, ground impact energy falls under thresholds associated with serious head injury",
          "It is the heaviest aircraft a person can carry",
          "Batteries below that weight are not classed as dangerous goods",
          "It is an arbitrary figure with no basis",
        ],
        answer: 0,
        explanation:
          "The threshold is a regulatory convention informed by impact energy evidence rather than a hard physical boundary, and the underlying studies carry real uncertainty. It is why so many commercial products are built to just under it.",
        difficulty: "Hard",
        skill: "Nano category",
      },
      {
        n: 7,
        question: "A Remote Pilot Certificate is obtained from:",
        options: [
          "A DGCA-authorised remote pilot training organisation",
          "The Digital Sky portal, automatically on registration",
          "Any flying club",
          "It is issued with the aircraft at purchase",
        ],
        answer: 0,
        explanation:
          "The certificate is a per-person qualification from an authorised training organisation, and the course is a matter of days. Registration of the aircraft on Digital Sky is a separate obligation that does not confer it.",
        difficulty: "Medium",
        skill: "Remote Pilot Certificate",
      },
    ],
    decks: [
      {
        n: 1,
        title: "Categories, zones and the paperwork",
        blurb:
          "The facts you need before a flight rather than after a question. Self-rated, because recognising a category or a zone colour is the real task.",
        mode: "flip",
        cards: [
          { id: 1, front: "Nano category", back: "250 g and below", extra: { Obligations: "Lightest. No UIN or pilot certificate required below the stated height." }, tags: ["Categories"] },
          { id: 2, front: "Micro category", back: "Above 250 g up to 2 kg", extra: { Obligations: "UIN and Remote Pilot Certificate both required", Note: "Most 5 inch builds land here" }, tags: ["Categories"] },
          { id: 3, front: "Small category", back: "Above 2 kg up to 25 kg", extra: { Obligations: "UIN, pilot certificate, and more operational constraints" }, tags: ["Categories"] },
          { id: 4, front: "Green zone", back: "No permission needed below the stated altitude", extra: { Caution: "Zones change, so check before each flight at an unfamiliar site" }, tags: ["Airspace"] },
          { id: 5, front: "Yellow zone", back: "Requires clearance from air traffic control", extra: { "Common trap": "The zone around an airport extends much further than most people expect" }, tags: ["Airspace"] },
          { id: 6, front: "Red zone", back: "Prohibited without specific central government approval", extra: { Examples: "Sensitive installations, certain borders" }, tags: ["Airspace"] },
          { id: 7, front: "UIN", back: "Unique Identification Number, issued per aircraft", extra: { Where: "Digital Sky portal", Note: "Must be displayed on the airframe" }, tags: ["Paperwork"] },
          { id: 8, front: "Remote Pilot Certificate", back: "The per-person pilot qualification", extra: { Where: "A DGCA-authorised remote pilot training organisation", Duration: "Days rather than months" }, tags: ["Paperwork"] },
          { id: 9, front: "Digital Sky", back: "The DGCA online platform", extra: { "Used for": "Registration, airspace maps and permissions" }, tags: ["Paperwork"] },
          { id: 10, front: "Drone Rules 2021", back: "The current framework, replacing the 2018 UAS Rules", extra: { "Why it matters": "Much more permissive. Most discouraging advice online predates it." }, tags: ["Framework"] },
          { id: 11, front: "All up weight", back: "The complete aircraft including battery and propellers", extra: { Why: "This is the figure the category thresholds use" }, tags: ["Categories"] },
          { id: 12, front: "Visual line of sight", back: "The aircraft must remain visible to the pilot", extra: { Note: "BVLOS is case by case and corridor based, limited by detect-and-avoid rather than by aircraft capability" }, tags: ["Operations"] },
          { id: 13, front: "Daylight only", back: "Standard operations are daylight, within line of sight", extra: { Also: "Not over crowds, not near airports, below the zone altitude limit" }, tags: ["Operations"] },
          { id: 14, front: "Third party liability insurance", back: "Mandated for certain operations and required in practice for commercial work", extra: { Note: "Uninsurable after the fact, and the premium is modest against the exposure" }, tags: ["Paperwork"] },
          { id: 15, front: "Does the recreational or commercial distinction change your obligations?", back: "Largely no: the rules categorise by weight and operation", extra: { "What does differ": "Insurance, and some additional permissions for particular work" }, tags: ["Framework"] },
          { id: 16, front: "Why is 250 g the threshold?", back: "Ground impact energy below serious-injury levels", extra: { "Honest caveat": "A regulatory convention informed by evidence, not a hard physical boundary" }, tags: ["Framework"] },
        ],
        skills: ["Drone Rules 2021", "Airspace zones", "UIN", "Remote Pilot Certificate"],
      },
    ],
  },
  /* ===================================================================== */
  5116: {
    topicId: 5116,
    title: "Planning a legal flight, and refusing an illegal one",
    summary:
      "The hard part of commercial drone work is not flying. It is knowing which jobs you can take and saying no to the ones you cannot.",
    concepts: ["Flight plan", "Risk assessment", "Client pressure", "Permissions", "Refusal"],
    glossary: {
      "Flight plan": "The written description of where, when, how high and under what conditions a flight will take place.",
      "Risk assessment": "The identification of what could go wrong, who would be affected, and what reduces it.",
      Permissions: "Clearances required for the airspace, the site and the people below.",
      "Client pressure": "The commercial force pushing a pilot toward an operation they would not otherwise accept.",
      Refusal: "Declining a job on safety or legal grounds, which is a professional act rather than a failure.",
      "Operational limitations": "The conditions under which you will not fly, decided in advance rather than on the day.",
    },
    body: {
      Beginner: `<p>Before any flight that is not in your own back garden, write three things down.</p>
<p><strong>Where and when.</strong> Exact location, date, time, and how high you intend to go. Check the zone on Digital Sky for that exact spot, because zones are not uniform across a city.</p>
<p><strong>What could go wrong and who it would affect.</strong> People below, roads, buildings, livestock, other aircraft. Then what you will do about each: a different takeoff point, a time of day with fewer people, a spotter, a lower altitude.</p>
<p><strong>What would make you not fly.</strong> Decide the wind limit, the visibility limit and the battery limit now, in the calm, rather than on the day with a client watching.</p>
<p>And the part nobody teaches: <strong>be ready to say no</strong>. A client will ask you to fly over a crowd, or closer to a building than you should, or in a red zone, and usually they will not know they are asking for something illegal. Explaining why, and offering what you can do instead, is part of the job.</p>`,
      Intermediate: `<p>A flight plan is a document rather than an intention, and writing it down changes the decisions it contains. Location to a coordinate, date and window, maximum altitude, category and registration of the aircraft, pilot certificate number, airspace classification checked on the day, and the limits under which you will abandon the flight.</p>
<p>The risk assessment should identify the hazard, the people exposed, and the mitigation, and the most effective mitigations are nearly always about where and when rather than about equipment. Moving the takeoff point, choosing an hour with fewer people, and planning a flight path that never crosses a road achieve more than any onboard system.</p>
<p>Setting operational limitations in advance is the single most useful professional habit in this field, because the pressure on the day is real and it is specifically designed to erode them. A wind limit decided in a quiet room is a limit; a wind limit decided while a client watches the clock is a negotiation.</p>
<p>Refusal is a skill with a structure: state what cannot be done, state why in terms of the rule rather than your preference, and offer the nearest thing that is possible. Most clients asking for an illegal flight do not know it is illegal, and a pilot who can explain the constraint and propose an alternative keeps the relationship and the licence.</p>`,
      Advanced: `<p>Risk assessment in this domain borrows usefully from the SORA approach used in European regulation, which separates ground risk from air risk and treats mitigation as reducing one or the other. Ground risk is a function of population density under the flight path and of the aircraft's impact energy; air risk is a function of the airspace and of other traffic. Framing a job this way makes the mitigations obvious, since each one addresses a specific term.</p>
<p>The human factors dimension is where the field's incidents concentrate. Analyses of commercial drone incidents repeatedly find a recognisable pattern: a pilot operating at the edge of their limits under schedule pressure, having already made one accommodation, making a second. The first accommodation is the critical one, because it reframes the limits as negotiable and every subsequent decision starts from the new position.</p>
<p>The defence is structural rather than motivational. Limits written down before the job, a stated abort criterion, and a habit of stating the limits to the client at the point of quoting rather than at the point of flying. A client who has been told in writing that the flight does not happen above a given wind speed is far less likely to push when it is reached, and the pilot has not had to defend the limit under pressure.</p>
<p>On refusal specifically, there is a commercial argument worth internalising. A pilot who has visibly declined an unsafe job is more credible on every subsequent one, and the client who pushed hardest usually respects it afterwards. The pilot who accepts is the one who carries the liability when something goes wrong, and the client's instruction is not a defence.</p>`,
      Expert: `<p>The liability structure is the part that is usually misunderstood and it is worth being precise. The remote pilot is the commander of the aircraft and carries the operational responsibility, and a client's instruction does not transfer it. Contractual indemnities between the operator and the client do not affect liability to a third party injured on the ground, and insurance will decline a claim arising from an operation outside the permitted envelope. The pilot who flies an illegal flight at a client's request therefore holds the entire downside.</p>
<p>Risk assessment methodology has converged on the ground-risk and air-risk decomposition because the two have different mitigations and different residual uncertainties. Ground risk is comparatively tractable: population density is estimable, impact energy is calculable, and mitigations such as containment and operational volume reduction are verifiable. Air risk is harder because the traffic population is partly uncooperative and partly unobservable, which is why airspace classification does so much of the work in the regulations.</p>
<p>Normalisation of deviance is the specific failure mode this topic exists to counter, and its mechanism is well documented across safety-critical industries. A deviation that produces no bad outcome is interpreted as evidence that the margin was excessive, the limit is implicitly revised, and the cycle repeats until a deviation coincides with an unfavourable condition. The countermeasure that works is not exhortation but structural: limits recorded in advance, deviations recorded when they occur, and periodic review of the record, which makes the drift visible in a way that no individual decision is.</p>
<p>Finally, the professional posture that distinguishes a sustainable operator is treating the flight plan as a record rather than as preparation. A plan written, retained and compared against what actually happened accumulates into evidence of competence, supports an insurance claim, and answers a regulator's question months later. A pilot with a file of plans and logs is in an entirely different position from one with a memory and a card full of footage.</p>`,
    },
    scenarios: [
      {
        n: 1,
        title: "The wedding shoot in a yellow zone",
        blurb:
          "A good client, a real fee, and an operation you cannot legally perform as described. How this conversation goes decides more than one job.",
        role: "You are a commercially licensed remote pilot with a micro-category aircraft.",
        start: "p1",
        minutes: 14,
        idealPath: ["p1", "p2", "p3"],
        nodes: [
          {
            id: "p1",
            situation: `<p>A wedding planner you have worked with twice calls. She wants aerial footage of a reception at a hotel lawn on Saturday evening, and the brief is a slow pass over the seated guests at around twenty metres, during the ceremony at dusk.</p>
<p>You check Digital Sky. The hotel is in a <strong>yellow zone</strong>, about six kilometres from an airport. The ceremony is at 6:40 pm and sunset is at 6:28.</p>`,
            prompt: "What do you tell her?",
            choices: [
              {
                id: "a",
                label: "Name all three problems and offer what you can actually deliver",
                outcome:
                  "You tell her: it is a yellow zone so ATC clearance is needed and takes lead time, flying over seated guests is not permitted, and 6:40 is after sunset so it is outside daylight hours. Then you offer the alternative: golden hour exteriors from 5:30, establishing shots of the venue and the arrival, and a ground-level gimbal for the ceremony itself. She is disappointed and asks you to price it.",
                next: "p2",
                delta: 3,
                cost: { minutes: 25 },
              },
              {
                id: "b",
                label: "Take the job and plan to fly high and quick so nobody notices",
                outcome:
                  "You have accepted an operation in controlled airspace without clearance, over an assembly of people, after dark. Any one of those is a licence matter, and if anything at all goes wrong your insurance declines the claim because the operation was outside the permitted envelope. The client's instruction is not a defence and you are the commander of the aircraft.",
                next: "p4",
                delta: -3,
                cost: { rupees: 25000 },
                violation:
                  "A flight was accepted in a yellow zone, over people, after sunset, with none of the three resolved.",
              },
              {
                id: "c",
                label: 'Say "I will see what I can do" and decide on the day',
                outcome:
                  "You have deferred the decision to the moment when a client is watching, guests are seated and a fee is at stake. That is precisely the condition under which limits get renegotiated, and you have given up the only moment when you could decide calmly.",
                next: "p2",
                delta: -2,
                cost: { minutes: 5 },
              },
              {
                id: "d",
                label: "Decline the job without explanation",
                outcome:
                  "Defensible and a wasted opportunity. She does not know that what she asked for was illegal, she will ask somebody else who may not tell her either, and you have lost a client who would have booked the legal version.",
                next: "p2",
                delta: 0,
                cost: { minutes: 5 },
              },
            ],
          },
          {
            id: "p2",
            situation: `<p>She comes back: the family really wants the overhead shot. She offers to double the fee and says the hotel has told her other pilots have flown there before.</p>`,
            prompt: "How do you respond?",
            choices: [
              {
                id: "a",
                label: "Hold the limit, explain why the fee does not change it, and repeat the alternative",
                outcome:
                  "You say that the fee is not the issue: you are the commander of the aircraft, the liability does not transfer with the instruction, and the insurance would not respond to a claim from an operation outside the envelope. That other pilots have done it is not a permission. She accepts the alternative package.",
                next: "p3",
                delta: 3,
                cost: { minutes: 15 },
              },
              {
                id: "b",
                label: "Apply for the ATC clearance and see whether it resolves things",
                outcome:
                  "Worth doing and it only addresses one of the three. Clearance might come through for the airspace, and flying over seated guests after sunset remains outside what you can do. Partial compliance is not compliance.",
                next: "p3",
                delta: 1,
                cost: { minutes: 90 },
              },
              {
                id: "c",
                label: "Take it at the doubled fee, since the risk is genuinely small",
                outcome:
                  "The risk of an incident on any single flight is indeed small. The consequence if it happens is a guest injured at a wedding, an uninsured claim, and a licence matter, and you accepted it for money after being told in advance that it was outside the rules. The deliberateness is what changes the position.",
                next: "p4",
                delta: -3,
                cost: { rupees: 50000 },
                violation: "The limit was traded for a fee after the illegality had been identified.",
              },
            ],
          },
          {
            id: "p3",
            situation: `<p>You fly the exteriors from 5:30, in daylight, in a part of the grounds with nobody underneath, and hand over the ceremony to a ground operator. The footage is good. She books you again two months later and mentions to a colleague that you were the one who told her what the rules actually were.</p>`,
            prompt: "",
            ending: {
              verdict: "ideal",
              title: "You kept the licence and the client",
              debrief: `<p>Three separate problems and all three were real: controlled airspace needing clearance, an operation over an assembly of people, and a time after sunset. Naming all three mattered, because fixing one makes the flight no more legal than fixing none, and "I got the ATC clearance" is the kind of partial compliance that feels like diligence.</p>
<p>The doubled fee is the moment the topic exists for. The liability does not transfer with the instruction: you are the commander of the aircraft, the client's request is not a defence, and an insurer will decline a claim arising from an operation outside the permitted envelope. So the doubled fee buys you nothing except a larger incentive to accept a risk you are carrying alone.</p>
<p>"Other pilots have flown there" is the argument worth recognising because it will be made to you repeatedly. It is an observation about enforcement rather than about permission, and it is also how normalisation of deviance spreads between operators: each deviation that produces no bad outcome is read as evidence that the margin was excessive.</p>
<p>And note the commercial result. Declining without explanation would have been safe and would have lost the client. What kept the relationship was naming the constraint and bringing an alternative, which also made you the person she now describes as knowing the rules. Over a career that is worth more than any single overhead shot.</p>`,
            },
          },
          {
            id: "p4",
            situation: `<p>The flight is booked as originally described: controlled airspace without clearance, over seated guests, after sunset.</p>`,
            prompt: "",
            ending: {
              verdict: "poor",
              title: "You are carrying the whole downside alone",
              debrief: `<p>The probability of an incident on any one flight is genuinely low, and that is what makes this decision feel defensible at the time. The structure of the exposure is what makes it not. You are the commander of the aircraft, the client's instruction transfers no liability, contractual indemnities do not reach a third party injured on the ground, and insurance will decline a claim arising from an operation outside the permitted envelope. Every part of the downside is yours.</p>
<p>Taking it at a doubled fee is worse than taking it in ignorance, because the illegality had already been identified. A deliberate decision to operate outside the rules for money is a different matter from an oversight, both in how a regulator treats it and in how an insurer does.</p>
<p>The deferred version, saying you will see what you can do, looks like the moderate option and is the one that most reliably ends up here. It moves the decision from a quiet room to a lawn with a client watching, guests seated and a fee at stake, which is precisely the condition under which limits get renegotiated. The whole value of deciding your operational limitations in advance is that it removes that moment.</p>
<p>What was available throughout: name the three problems, offer golden hour exteriors and a ground operator for the ceremony, and keep both the licence and the client. The legal version of this job was a good job.</p>`,
            },
          },
        ],
        skills: ["Flight plan", "Risk assessment", "Client pressure", "Refusal"],
      },
    ],
    deliverables: [
      {
        n: 1,
        title: "A flight plan and risk assessment somebody else could fly from",
        brief: `<p>Produce the planning documents for a real flight you intend to make, or for the wedding job in this topic as you would actually deliver it.</p>
<p>The test is whether a second qualified pilot could pick these up, fly the job without speaking to you, and know what would make them abandon it.</p>
<h3>The site you are planning for</h3>
<figure>
<svg viewBox="0 0 1000 640" role="img" aria-label="Airspace zones around an aerodrome with the venue inside the yellow zone">
<defs><clipPath id="zoneMap"><rect x="30" y="30" width="940" height="430" rx="18"/></clipPath></defs>
<rect x="30" y="30" width="940" height="430" rx="18" fill="#0f766e" opacity="0.13"/>
<g clip-path="url(#zoneMap)">
<circle cx="740" cy="210" r="290" fill="#b45309" opacity="0.2"/>
<circle cx="740" cy="210" r="148" fill="#be123c" opacity="0.28"/>
</g>
<path d="M702 210 h76 M740 172 v76" stroke="currentColor" opacity="0.8" stroke-width="7"/>
<text x="740" y="286" font-size="28" font-weight="800" fill="currentColor" text-anchor="middle">AERODROME</text>
<circle cx="520" cy="332" r="17" fill="currentColor"/>
<text x="496" y="392" font-size="30" font-weight="800" fill="currentColor" text-anchor="end">THE VENUE</text>
<path d="M520 332 L740 210" stroke="currentColor" opacity="0.65" stroke-width="4" stroke-dasharray="10 8"/>
<text x="598" y="256" font-size="27" font-weight="800" fill="currentColor" opacity="0.8" transform="rotate(-29 598 256)">4.1 km</text>
<rect x="30" y="498" width="298" height="114" rx="14" fill="#be123c" opacity="0.22"/>
<text x="54" y="548" font-size="30" font-weight="800" fill="#be123c">RED</text>
<text x="54" y="586" font-size="26" font-weight="700" fill="currentColor" opacity="0.85">do not fly at all</text>
<rect x="352" y="498" width="298" height="114" rx="14" fill="#b45309" opacity="0.22"/>
<text x="376" y="548" font-size="30" font-weight="800" fill="#b45309">YELLOW</text>
<text x="376" y="586" font-size="26" font-weight="700" fill="currentColor" opacity="0.85">permission first</text>
<rect x="674" y="498" width="296" height="114" rx="14" fill="#0f766e" opacity="0.22"/>
<text x="698" y="548" font-size="30" font-weight="800" fill="#0f766e">GREEN</text>
<text x="698" y="586" font-size="26" font-weight="700" fill="currentColor" opacity="0.85">log it and fly</text>
</svg>
<figcaption><strong>The venue is 4.1 km out, which puts it outside the red zone and well inside the yellow one.</strong> That is not a refusal and it is not a formality either: it is an application, with a lead time, that can come back declined. The plan has to say what happens to the shoot if it does.</figcaption>
</figure>
<div class="warning"><span class="callout-label">Check this yourself rather than trusting the drawing</span><p>Airspace classification changes, and a diagram in a course is a teaching aid rather than a source. Your plan must record the date you checked and where you checked it. A plan that asserts the zone without saying when it was looked up is the single most common reason one gets sent back.</p></div>
<p><strong>What to submit</strong></p>
<ol>
<li>A flight plan: location to a coordinate, date and window, maximum altitude, airspace classification with the date you checked it, aircraft registration and category, your certificate number.</li>
<li>A risk assessment: each hazard, who is exposed, and what reduces it. Mitigations about where and when, not only about equipment.</li>
<li>Your operational limitations: the wind, visibility, light and battery figures at which you do not fly or you abandon.</li>
</ol>
<h3>Ground risk and air risk are assessed separately</h3>
<table>
<tr><th></th><th>Ground risk</th><th>Air risk</th></tr>
<tr><td>Who is exposed</td><td>Guests, staff, passers-by, property</td><td>Other aircraft and their occupants</td></tr>
<tr><td>Typical mitigation</td><td>Distance, barriers, a flight path that is never over people</td><td>Altitude limit, time window, permission, an observer</td></tr>
<tr><td>Fails when</td><td>The crowd moves and the plan assumed it would not</td><td>You assumed the zone rather than checking it</td></tr>
</table>
<div class="key-idea"><span class="callout-label">A wedding is an unusually hard ground-risk case</span><p>The crowd is dense, it moves without warning, a good proportion of it has been drinking, and the people most likely to walk under the aircraft are the ones the client is paying you to film. A mitigation that depends on guests behaving predictably is not a mitigation. Design the flight path so that losing a motor puts the aircraft somewhere empty, and say in the plan where that somewhere is.</p></div>
<p>If the job as requested cannot legally be flown, say so explicitly and document the alternative you would propose. A plan that quietly omits an illegal element is worse than one that names it.</p>`,
        requires: [
          {
            key: "plan",
            label: "The flight plan",
            formats: ["PDF", "DOCX"],
            note: "Specific enough that a second pilot could fly it. Coordinates, not place names; a date for the airspace check, not an assertion that it is green.",
          },
          {
            key: "risk",
            label: "The risk assessment",
            formats: ["PDF", "XLSX"],
            note: "Hazard, exposed persons, mitigation. Ground risk and air risk considered separately, since they have different mitigations.",
          },
          {
            key: "limits",
            label: "Operational limitations",
            formats: ["PDF", "DOCX"],
            note: "Numbers, decided in advance. Wind, visibility, light, battery, and the abort criteria in flight.",
          },
        ],
        rubric: [
          {
            key: "specificity",
            label: "The plan is specific enough to be used",
            bands: [
              "Place names and vague timings that a second pilot could not act on",
              "Specific location and time but no airspace classification or aircraft details",
              "Location, window, altitude, airspace with a check date, aircraft and pilot details all present",
              "All of that, plus a takeoff and landing point chosen for a stated reason rather than for convenience",
            ],
            weight: 3,
          },
          {
            key: "risk",
            label: "The risk assessment reaches real mitigations",
            bands: [
              "Hazards listed with no mitigation, or mitigations that are only equipment",
              "Hazards and mitigations present but generic enough to apply to any flight",
              "Site-specific hazards with mitigations that address them",
              "Ground risk and air risk separated, with the strongest mitigations being about where and when rather than about equipment",
            ],
            weight: 3,
          },
          {
            key: "limits",
            label: "Limits are numbers decided in advance",
            bands: [
              "No limits stated, or stated as judgement calls on the day",
              "Some limits given without figures",
              "Specific numbers for wind, visibility, light and battery",
              "Specific numbers plus in-flight abort criteria, and a statement of who has the authority to call the abort",
            ],
            weight: 2,
          },
          {
            key: "legality",
            label: "Illegal elements are named rather than omitted",
            bands: [
              "An element that cannot legally be flown is included without comment",
              "The problem is implied but not stated",
              "Each legal constraint is identified explicitly",
              "Each constraint identified, with a proposed alternative that delivers as much of the client's intent as can lawfully be delivered",
            ],
            weight: 2,
          },
        ],
        modelAnswer: `<p><strong>The plan.</strong> Coordinates rather than a venue name, because a yellow zone boundary can run through a property. A date for the airspace check rather than a claim about the classification, because zones change and temporary restrictions appear. Maximum altitude stated and justified against the zone limit. Aircraft registration, category and all up weight, since the category drives the obligations. Your certificate number, because somebody may ask.</p>
<p><strong>The risk assessment, structured the way the regulators structure it.</strong> Separate ground risk from air risk, because they have different mitigations and different residual uncertainty. Ground risk is population under the flight path and impact energy, and it is tractable: move the takeoff point, choose an hour with fewer people, plan a path that never crosses the road. Air risk is the airspace and other traffic, and it is harder, which is why the zone classification carries so much of the weight.</p>
<p>The strongest mitigations are almost always about where and when. A flight path that does not cross a road is worth more than any onboard system, and an hour earlier is worth more than a spotter.</p>
<p><strong>The limits, and why they are the most important document.</strong> Wind speed, visibility, light, pack voltage at which you land, and the in-flight abort criteria. Numbers, written down, before the day. A wind limit decided in a quiet room is a limit; the same limit reached on site with a client watching the clock is a negotiation, and you will lose it. The entire value of writing them in advance is that it removes the moment where they are renegotiated.</p>
<p>State them to the client when you quote rather than when you fly. A client who has been told in writing that the flight does not happen above a given wind speed rarely pushes when it is reached, and you have not had to defend it under pressure.</p>
<p><strong>And name what cannot be done.</strong> If the brief includes a pass over seated guests, say so, cite the constraint, and propose the alternative: exteriors in daylight from a position with nobody underneath, and a ground operator for the part that has people in it. A plan that quietly omits the illegal element is worse than one that names it, because the omission looks like either ignorance or concealment and neither helps you afterwards.</p>`,
        minutes: 150,
        skills: ["Flight plan", "Risk assessment", "Operational limitations", "Permissions"],
      },
    ],
  },

  /* ===================================================================== */
  5117: {
    topicId: 5117,
    title: "First flight, hover trim and reading a crash",
    summary:
      "The first hover tells you more than the next ten flights. And a crash is data, not just damage, if you look at it before you tidy up.",
    concepts: ["First hover", "Trim", "Blackbox", "Crash analysis", "Post-crash inspection"],
    glossary: {
      "First hover": "The initial low hover that exercises the whole control loop at an altitude where every fault is survivable.",
      Trim: "Correcting a persistent drift, which should be done by finding the cause rather than by offsetting the sticks.",
      Blackbox: "The flight controller's recorded log of gyro, motor outputs and stick inputs, which is the primary evidence after an incident.",
      "Crash analysis": "Determining why the aircraft came down, as distinct from what broke when it did.",
      "Post-crash inspection": "The check performed before any repair, because repairing destroys evidence.",
      "Motor saturation": "A motor commanded beyond full output, visible in the log, which means the controller ran out of authority.",
    },
    body: {
      Beginner: `<p>Your first hover is a test, not a flight. Go to about a metre, hold it there, and watch and listen for ten seconds.</p>
<p><strong>What you are checking:</strong> does it hold roughly still, does it sound smooth, does it drift steadily in one direction, is any motor noticeably hotter than the others when you land?</p>
<p>If it drifts, do not just trim it out on the transmitter. A persistent drift has a cause: the accelerometer was calibrated on a slope, the battery is not centred, a motor is weak, or a prop is damaged. Trimming hides it and the cause is still there.</p>
<p>When you crash, and you will, <strong>stop before you tidy up</strong>. Take photographs where it landed. Note which way it was pointing and what you were doing. Then download the blackbox log before you change anything.</p>
<p>Repairing destroys the evidence. The broken arm tells you what broke on impact, which is almost never why it came down.</p>
<p>And one habit worth forming now: <strong>land and check motor temperatures after every early flight</strong>. A motor warmer than the others is working harder, which means a bent shaft, a damaged prop or a failing bearing, and it is far cheaper to find on the ground.</p>`,
      Intermediate: `<p>The low hover is the highest-information manoeuvre available because it exercises the entire control loop at minimal energy. Vibration shows as audible noise and a visible shimmer, a control sign error shows as immediate departure, imbalance shows as a drift needing constant correction, and a weak motor shows as a yaw bias. Four different faults, four distinguishable signatures, all within ten seconds at an altitude where the consequence is a scratch.</p>
<p>Drift should be diagnosed rather than trimmed. The causes are a short list: accelerometer calibration performed on a surface that was not level, a battery mounted off centre, a motor producing less thrust than its neighbours, a damaged or unbalanced propeller, or a bent motor shaft from a previous landing. Each has a specific check, and offsetting the sticks conceals all of them while consuming control authority that is then unavailable for disturbance rejection.</p>
<p>After a crash the discipline is to treat the site as evidence. Photograph where it landed and its orientation, note what you were doing and what you heard, and download the blackbox log before touching anything. The log holds gyro traces, motor outputs and stick inputs at high rate, and it usually answers the question that the wreckage cannot.</p>
<p>The key distinction in crash analysis is between what broke on impact and what caused the descent. A snapped arm is almost always the former. The log shows whether a motor output saturated, whether the gyro showed a departure before any input, whether the link was lost, or whether the aircraft simply ran out of thrust.</p>`,
      Advanced: `<p>Blackbox analysis has a small number of characteristic signatures worth learning because they cover most incidents. A motor output pinned at maximum with the aircraft still rotating is control saturation, meaning the controller ran out of authority, which points at an underpowered build, a failed motor or an extreme attitude. A sudden step in one motor's output with a corresponding gyro spike points at a desync or a mechanical failure of that arm. A gyro trace that departs with no preceding stick input and no motor anomaly points at an orientation or mixing error.</p>
<p>Loss of link appears distinctly, as inputs freezing or going to failsafe values while the aircraft continues under control, and distinguishing it from a transmitter problem requires the receiver's link quality trace. This is the specific reason to log link quality: without it, a flyaway and a radio failure are indistinguishable after the fact, and they have completely different remedies.</p>
<p>Vibration shows in the log as broadband noise on the gyro traces, and its frequency content identifies the source. Noise at the motor fundamental points at an unbalanced propeller or a bent shaft; noise at higher harmonics points at a bearing; noise correlated with throttle rather than with a fixed frequency points at a frame resonance. The spectral view is therefore more useful than the time view for this class of problem.</p>
<p>Post-crash inspection should precede repair and should be systematic: check each motor for shaft runout by spinning it by hand, check each propeller for damage and balance, check every solder joint on the arm that took the impact, and check the frame for delamination at the bolt holes. Carbon fibre fails in ways that are not visible, and an arm that looks intact after an impact can fail in flight next time.</p>`,
      Expert: `<p>The blackbox log is effectively a flight data recorder at a sample rate higher than most manned aviation equivalents, and treating incident analysis with the corresponding seriousness is the single largest difference between a pilot who improves and one who repeats failures. The analytic discipline is the same as elsewhere: establish the timeline, identify the first anomalous sample, and reason forward rather than backward from the outcome.</p>
<p>Control saturation deserves particular attention because it is both common and commonly misread. When a motor output reaches its limit the control loop is open for that axis, integral terms wind up, and the recovery when authority returns is characteristically violent. The visible crash is often this recovery rather than the original disturbance, which means the proximate cause in the wreckage and the root cause in the log can be several seconds apart.</p>
<p>On the hover as a diagnostic, the information-theoretic argument is that the manoeuvre places the system at an operating point where all four control axes are active with small inputs, so the loop's behaviour is observable without the nonlinearities that dominate at high rates. This is why faults that are invisible in aggressive flight, where everything is saturated and noisy anyway, present clearly at a hover.</p>
<p>Finally, there is an argument for treating logs as a corpus rather than as individual incidents. A pilot who retains logs accumulates a baseline for their own aircraft: normal vibration levels, normal motor output balance, normal hover throttle. Deviation from that baseline is detectable long before it causes a failure, which converts crash analysis into condition monitoring. Almost nobody does this, and it is available at zero marginal cost to anyone already logging.</p>`,
    },
    scenarios: [
      {
        n: 1,
        title: "It came down and you do not know why",
        blurb:
          "Thirty seconds into the third flight the aircraft rolled hard left and hit the ground. What you do in the next ten minutes decides whether you find out why.",
        role: "You are at a field with your own build, on its third ever flight.",
        start: "x1",
        minutes: 13,
        idealPath: ["x1", "x2", "x3"],
        nodes: [
          {
            id: "x1",
            situation: `<p>Third flight, about thirty seconds in, a gentle left turn at maybe ten metres. The aircraft snapped hard left and went in. You heard a change in the sound about a second before it went.</p>
<p>It is lying in the grass twenty metres away. One arm is broken and a propeller is in pieces.</p>`,
            prompt: "What do you do first?",
            choices: [
              {
                id: "a",
                label: "Photograph it where it lies, then disconnect the pack and download the log",
                outcome:
                  "You take four photographs including the orientation it came to rest in, disconnect the battery and check it for damage, then pull the blackbox log before touching anything else. You now have the evidence and the aircraft is safe.",
                next: "x2",
                delta: 3,
                cost: { minutes: 10 },
              },
              {
                id: "b",
                label: "Pick it up, see what broke, and start planning the repair",
                outcome:
                  "The arm is snapped and the prop is shattered, which tells you what the ground did to it. Neither of those is why it rolled, and you have now moved it, changed its orientation and begun destroying the only evidence of the cause.",
                next: "x2",
                delta: -2,
                cost: { minutes: 5 },
              },
              {
                id: "c",
                label: "Fit a new arm and a new prop and fly it again to see if it does it twice",
                outcome:
                  "If the cause is still present it will do it again, from a higher altitude once you are confident, and this time it may not be in a field. Flying an aircraft that came down for an unknown reason is the most expensive way to gather data.",
                next: "x4",
                delta: -3,
                cost: { minutes: 45, rupees: 2400 },
                violation: "An aircraft was flown again before the cause of an uncommanded departure was established.",
              },
              {
                id: "d",
                label: "Disconnect the battery first, then photograph",
                outcome:
                  "Entirely sensible and slightly safer: a damaged pack in grass is a genuine fire risk and getting it disconnected and inspected first is defensible. You lose very little by photographing a second later.",
                next: "x2",
                delta: 2,
                cost: { minutes: 10 },
              },
            ],
          },
          {
            id: "x2",
            situation: `<p>You have the log. At home you open it and look at the last two seconds.</p>
<p>Motor 3's output steps to maximum and stays there. The gyro shows a roll rate building immediately afterwards. There is no stick input corresponding to it, and the link quality trace is clean throughout.</p>`,
            prompt: "What does that tell you?",
            choices: [
              {
                id: "a",
                label: "Motor 3 lost thrust and the controller saturated trying to compensate",
                outcome:
                  "That fits everything. A motor that stops producing thrust makes the controller command it harder and harder until it saturates, and with the opposite motor still pulling the aircraft rolls. The sound you heard a second before was the desync or the mechanical failure. The clean link trace rules out a radio problem.",
                next: "x3",
                delta: 3,
                cost: { minutes: 20 },
              },
              {
                id: "b",
                label: "You lost the radio link and it went into failsafe",
                outcome:
                  "The link quality trace is clean and the failsafe would have cut the throttle rather than driving one motor to maximum. This is exactly the hypothesis that logging link quality exists to rule out, and here it does.",
                next: "x3",
                delta: -1,
                cost: { minutes: 15 },
              },
              {
                id: "c",
                label: "It was a gust and the aircraft was overpowered by it",
                outcome:
                  "A gust shows as a gyro disturbance that the controller responds to, with motor outputs moving together. One motor pinned at maximum with no corresponding input is not a gust, it is the controller fighting something on that arm.",
                next: "x3",
                delta: -1,
                cost: { minutes: 15 },
              },
            ],
          },
          {
            id: "x3",
            situation: `<p>You spin motor 3 by hand. It is rough and has noticeable shaft runout, and the bell has play in it. Looking back, the second flight ended with a hard landing on that corner.</p>
<p>You replace the motor, check the other three, fit a new arm, and before flying again you hover at a metre for a full minute listening to each corner.</p>`,
            prompt: "",
            ending: {
              verdict: "ideal",
              title: "The log answered the question the wreckage could not",
              debrief: `<p>The broken arm and the shattered propeller were what the ground did to the aircraft. Almost every crash produces impressive damage that tells you nothing about why it came down, and the single most common analytical error is reasoning from the wreckage.</p>
<p>The log held the answer because it records at a rate no observer can match. One motor pinned at maximum with a roll rate building and no corresponding stick input is control saturation on that axis: the controller asked that arm for more and more thrust, got none, and the opposite motor kept pulling. That is a mechanical or ESC failure on one arm and nothing else produces that signature.</p>
<p>Note what the clean link quality trace did. Without it, a flyaway and a radio failure are indistinguishable after the fact and they have completely different remedies. Logging link quality costs nothing and it eliminated an entire hypothesis in one glance, which is exactly why it is worth enabling before you need it.</p>
<p>And the root cause was two flights earlier. A hard landing on that corner bent the shaft, the motor ran rough for a flight, and then it let go. That is the argument for landing and feeling motor temperatures after every early flight: a motor working harder than its neighbours is warmer, and it is far cheaper to find on the ground than at ten metres.</p>`,
            },
          },
          {
            id: "x4",
            situation: `<p>The aircraft has been repaired and flown again without the cause being established. Whatever brought it down the first time has not been addressed.</p>`,
            prompt: "",
            ending: {
              verdict: "poor",
              title: "You repaired the damage and left the cause in place",
              debrief: `<p>The broken arm was the consequence. Fixing it restores the aircraft to the condition it was in immediately before the crash, including whatever caused the crash, and the next flight starts from exactly the same position with more confidence and probably more altitude.</p>
<p>The evidence was available and free. A blackbox log records gyro, motor outputs and stick inputs at a rate no observer can match, and in this case it would have shown one motor pinned at maximum with a roll developing and no stick input, which is control saturation on one arm and nothing else. Ten minutes with the log answers a question that no amount of looking at the wreckage can.</p>
<p>There is a specific reason to download before repairing rather than after: logs can be overwritten, a damaged board may fail entirely once disturbed, and the physical evidence of what broke is destroyed by the act of fixing it. Photograph where it lies, note the orientation, pull the log, then repair.</p>
<p>The habit that would have caught this before the crash is simpler still. Land after every early flight and feel each motor. A motor warmer than its neighbours is working harder, and a bent shaft from a hard landing presents exactly that way, one flight before it fails.</p>`,
            },
          },
        ],
        skills: ["Blackbox", "Crash analysis", "Post-crash inspection", "Motor saturation"],
      },
    ],
    evidence: [
      {
        n: 1,
        title: "Your first hover, filmed and inspected",
        brief: `<p>Film the first hover of a build and the motor temperature check immediately after landing.</p>
<p>Hover at about a metre for a full minute. Do not climb, do not move around, just hold it and let the camera see what the aircraft does. Then land, disarm, disconnect, and feel each motor in turn.</p>
<p><strong>Drift is not a failure here.</strong> If it drifts, the assessment is what you do about it: identify the cause rather than trim it out on the transmitter, because trimming hides the cause and consumes control authority you will want later.</p>
<p>If you have a blackbox log from the flight, submit a screenshot of the motor output traces. A build whose four motors are working noticeably unequally at a hover has something to find.</p>`,
        captures: [
          {
            key: "hover",
            medium: "video",
            label: "The hover",
            seconds: 60,
            mustShow:
              "One continuous shot of a hover at roughly a metre for a full minute, with the whole aircraft in frame so drift is visible. No cuts.",
          },
          {
            key: "temps",
            medium: "video",
            label: "Motor temperature check after landing",
            seconds: 45,
            mustShow:
              "The pack being disconnected, then each of the four motors touched in turn, in one continuous shot so the assessor can see all four were checked.",
          },
          {
            key: "log",
            medium: "photo",
            label: "Motor output traces from the log",
            mustShow:
              "A screenshot of the four motor outputs over the hover, with the axis scale readable. If you have no log, photograph your notes on what you observed instead.",
          },
          {
            key: "setup",
            medium: "photo",
            label: "The aircraft before flight",
            mustShow:
              "The complete aircraft with propellers fitted and the flight controller arrow visible, and your enrolment number on paper in the frame.",
          },
        ],
        integrity: [
          "My enrolment number is on paper and visible in the pre-flight photograph.",
          "The hover clip is one unbroken recording of at least a minute, because drift only shows over time.",
          "The temperature check is one continuous shot covering all four motors, taken immediately after this flight.",
          "This is the same aircraft in every capture and it is the build I assembled.",
        ],
        rubric: [
          {
            key: "hover",
            label: "The hover is held and observed",
            bands: [
              "Climbs away or moves around rather than holding a hover",
              "Holds roughly but for well under the full minute",
              "A steady hover at roughly a metre for the full minute",
              "A steady hover held with small inputs, and the note identifies what was being listened and looked for",
            ],
            weight: 3,
          },
          {
            key: "drift",
            label: "Drift is diagnosed rather than trimmed",
            bands: [
              "Drift present and trimmed out on the transmitter with no investigation",
              "Drift noted but no cause considered",
              "Drift investigated against the likely causes, or correctly reported as absent",
              "Investigated against the specific list: level calibration, battery centring, motor thrust, propeller condition, shaft runout",
            ],
            weight: 3,
          },
          {
            key: "temps",
            label: "Motor temperatures checked properly",
            bands: [
              "Not checked, or only one motor touched",
              "All four touched but no comparison drawn",
              "All four compared against each other",
              "All four compared, with the note saying what a warm one would have indicated and what the learner would do about it",
            ],
            weight: 2,
          },
          {
            key: "evidence",
            label: "The flight produced usable data",
            bands: [
              "No log and no written observations",
              "Observations noted but vague",
              "A log screenshot or specific written observations about each corner",
              "A log with the four motor outputs compared, which is the measurement that reveals an unequal build before it fails",
            ],
            weight: 2,
          },
        ],
        exemplar: [
          {
            criterion: "Drift is diagnosed rather than trimmed",
            band: 3,
            note: "A steady drift to the right, and rather than trimming it the learner landed, found the battery mounted 8 mm off centre, re-strapped it and re-hovered. The second clip shows the drift gone. That is a cause removed rather than an offset applied.",
          },
          {
            criterion: "The evidence from the flight",
            band: 0,
            note: "No log and the note says only that it flew fine. The log from this flight would have shown whether the four motors were working equally, which is the single most useful thing a first hover can tell you and it has been discarded.",
          },
        ],
        minutes: 35,
        skills: ["First hover", "Trim", "Blackbox", "Post-crash inspection"],
      },
    ],
  },
};

export default curriculum;
