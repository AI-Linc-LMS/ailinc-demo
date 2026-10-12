/**
 * Course 211: Agile Project Management: Scrum, Kanban, XP.
 *
 * Authored as three systems with mechanisms rather than as a set of ceremonies
 * to perform. Most agile training teaches the ritual and leaves the learner
 * unable to say what a stand-up is for, which is why teams keep the meetings
 * long after they have stopped doing anything.
 *
 * The through-line is that each framework constrains something different:
 * Scrum constrains time, Kanban constrains work in progress, and XP constrains
 * engineering practice. Knowing which variable a framework holds fixed tells
 * you what it will and will not fix, and that is the judgement this course is
 * actually trying to build.
 */

import type { CourseCurriculum } from "./types";

const FIG_THREE = `<figure>
<svg viewBox="0 0 1000 560" role="img" aria-label="Three frameworks, each holding a different variable fixed">
<rect x="24" y="40" width="300" height="250" rx="18" fill="#0369a1" opacity="0.14"/>
<rect x="24" y="40" width="300" height="250" rx="18" fill="none" stroke="#0369a1" stroke-width="3"/>
<text x="174" y="100" font-size="34" font-weight="800" fill="#0369a1" text-anchor="middle">SCRUM</text>
<text x="174" y="152" font-size="28" font-weight="800" fill="currentColor" text-anchor="middle">fixes TIME</text>
<text x="174" y="200" font-size="26" fill="currentColor" opacity="0.8" text-anchor="middle">the sprint does not move</text>
<text x="174" y="244" font-size="26" fill="currentColor" opacity="0.8" text-anchor="middle">scope freezes once it starts</text>
<text x="174" y="278" font-size="26" font-weight="800" fill="#0369a1" text-anchor="middle">a rhythm of decisions</text>
<rect x="350" y="40" width="300" height="250" rx="18" fill="#0f766e" opacity="0.14"/>
<rect x="350" y="40" width="300" height="250" rx="18" fill="none" stroke="#0f766e" stroke-width="3"/>
<text x="500" y="100" font-size="34" font-weight="800" fill="#0f766e" text-anchor="middle">KANBAN</text>
<text x="500" y="152" font-size="28" font-weight="800" fill="currentColor" text-anchor="middle">fixes WORK IN PROGRESS</text>
<text x="500" y="200" font-size="26" fill="currentColor" opacity="0.8" text-anchor="middle">a column has a hard limit</text>
<text x="500" y="244" font-size="26" fill="currentColor" opacity="0.8" text-anchor="middle">full means go and help</text>
<text x="500" y="278" font-size="26" font-weight="800" fill="#0f766e" text-anchor="middle">flow becomes visible</text>
<rect x="676" y="40" width="300" height="250" rx="18" fill="#b45309" opacity="0.14"/>
<rect x="676" y="40" width="300" height="250" rx="18" fill="none" stroke="#b45309" stroke-width="3"/>
<text x="826" y="100" font-size="34" font-weight="800" fill="#b45309" text-anchor="middle">XP</text>
<text x="826" y="152" font-size="28" font-weight="800" fill="currentColor" text-anchor="middle">fixes PRACTICE</text>
<text x="826" y="200" font-size="26" fill="currentColor" opacity="0.8" text-anchor="middle">tests before the code</text>
<text x="826" y="244" font-size="26" fill="currentColor" opacity="0.8" text-anchor="middle">refactor continuously</text>
<text x="826" y="278" font-size="26" font-weight="800" fill="#b45309" text-anchor="middle">change stays cheap</text>
<rect x="24" y="320" width="952" height="96" rx="16" fill="#be123c" opacity="0.13"/>
<text x="500" y="366" font-size="29" font-weight="800" fill="#be123c" text-anchor="middle">Each constraint is the mechanism.</text>
<text x="500" y="402" font-size="27" font-weight="800" fill="currentColor" text-anchor="middle">Remove it and you keep the vocabulary, not the effect.</text>
<rect x="24" y="434" width="952" height="104" rx="16" fill="#7c3aed" opacity="0.13"/>
<text x="500" y="480" font-size="28" font-weight="800" fill="currentColor" text-anchor="middle">All three shorten the same thing: the time between</text>
<text x="500" y="516" font-size="28" font-weight="800" fill="#7c3aed" text-anchor="middle">a decision and evidence about whether it was right.</text>
</svg>
<figcaption><strong>They are answers to different questions, not competitors.</strong> A team that cannot finish anything has a work-in-progress problem. A team that finishes things nobody wanted has a feedback problem. A team whose code fights every change has an engineering problem, and no ceremony fixes that one.</figcaption>
</figure>`;

const FIG_WIP = `<figure>
<svg viewBox="0 0 1000 520" role="img" aria-label="The same five items worked all at once compared with two at a time">
<rect x="24" y="40" width="464" height="230" rx="18" fill="#be123c" opacity="0.12"/>
<rect x="24" y="40" width="464" height="230" rx="18" fill="none" stroke="#be123c" stroke-width="3"/>
<text x="256" y="92" font-size="30" font-weight="800" fill="#be123c" text-anchor="middle">ALL FIVE AT ONCE</text>
<rect x="56" y="118" width="400" height="26" rx="6" fill="#be123c" opacity="0.45"/>
<rect x="56" y="152" width="400" height="26" rx="6" fill="#be123c" opacity="0.45"/>
<rect x="56" y="186" width="400" height="26" rx="6" fill="#be123c" opacity="0.45"/>
<text x="256" y="246" font-size="27" font-weight="800" fill="currentColor" text-anchor="middle">everything finishes at the end</text>
<rect x="512" y="40" width="464" height="230" rx="18" fill="#0f766e" opacity="0.12"/>
<rect x="512" y="40" width="464" height="230" rx="18" fill="none" stroke="#0f766e" stroke-width="3"/>
<text x="744" y="92" font-size="30" font-weight="800" fill="#0f766e" text-anchor="middle">TWO AT A TIME</text>
<rect x="544" y="118" width="150" height="26" rx="6" fill="#0f766e" opacity="0.55"/>
<rect x="544" y="152" width="260" height="26" rx="6" fill="#0f766e" opacity="0.45"/>
<rect x="544" y="186" width="390" height="26" rx="6" fill="#0f766e" opacity="0.35"/>
<text x="744" y="246" font-size="27" font-weight="800" fill="currentColor" text-anchor="middle">the first one finishes early</text>
<rect x="24" y="300" width="952" height="92" rx="16" fill="#0369a1" opacity="0.14"/>
<text x="500" y="344" font-size="30" font-weight="800" fill="#0369a1" text-anchor="middle">cycle time = work in progress / throughput</text>
<text x="500" y="380" font-size="27" font-weight="800" fill="currentColor" text-anchor="middle">Halve the first and the third halves with it.</text>
<rect x="24" y="410" width="952" height="96" rx="16" fill="#b45309" opacity="0.13"/>
<text x="500" y="454" font-size="28" font-weight="800" fill="#b45309" text-anchor="middle">Same people, same speed, same total work.</text>
<text x="500" y="490" font-size="27" font-weight="800" fill="currentColor" text-anchor="middle">Only the waiting changed.</text>
</svg>
<figcaption><strong>Nobody works faster in the right-hand picture.</strong> The same five items take the same total effort; they are simply not all in flight at once, so each one spends less time waiting. That is the whole of Little's law, drawn, and it is why limiting work in progress is the cheapest intervention in this course.</figcaption>
</figure>`;

const FIG_VELOCITY = `<figure>
<svg viewBox="0 0 1000 520" role="img" aria-label="What happens to velocity when it is used as a target">
<path d="M150 400 H950 M150 400 V60" stroke="currentColor" opacity="0.3" stroke-width="3"/>
<path d="M180 330 H250 M280 336 H350 M380 326 H450" stroke="#0f766e" stroke-width="14" stroke-linecap="round"/>
<path d="M480 300 H550 M580 262 H650 M680 214 H750 M780 160 H850" stroke="#be123c" stroke-width="14" stroke-linecap="round"/>
<path d="M465 70 V400" stroke="currentColor" opacity="0.5" stroke-width="4" stroke-dasharray="10 8"/>
<text x="465" y="56" font-size="27" font-weight="800" fill="#be123c" text-anchor="middle">velocity becomes a target</text>
<text x="300" y="376" font-size="26" font-weight="800" fill="#0f766e" text-anchor="middle">stable</text>
<text x="700" y="130" font-size="26" font-weight="800" fill="#be123c" text-anchor="middle">rising</text>
<text x="104" y="230" font-size="26" font-weight="800" fill="currentColor" opacity="0.55" text-anchor="middle" transform="rotate(-90 104 230)">POINTS</text>
<text x="550" y="440" font-size="26" font-weight="800" fill="currentColor" opacity="0.55" text-anchor="middle">SPRINTS</text>
<rect x="24" y="456" width="952" height="56" rx="14" fill="#b45309" opacity="0.14"/>
<text x="500" y="494" font-size="28" font-weight="800" fill="currentColor" text-anchor="middle">Delivered work did not change. The scale did.</text>
</svg>
<figcaption><strong>Points are defined by the team being measured, so compliance needs no change to anything real.</strong> Nobody has to act dishonestly: each re-sizing is small, defensible and made under pressure, and the aggregate is inflation. That is why the remedy is to stop using the number as a target rather than to ask for more rigour.</figcaption>
</figure>`;

const FIG_SCRUM_FAIL = `<figure>
<svg viewBox="0 0 1000 442" role="img" aria-label="Where Scrum adoptions break, by cost of the element">
<rect x="24" y="40" width="952" height="86" rx="14" fill="#0369a1" opacity="0.14"/>
<text x="56" y="78" font-size="29" font-weight="800" fill="#0369a1">The events: calendar time</text>
<text x="56" y="112" font-size="27" fill="currentColor" opacity="0.85">Adopted almost always. Least effect on its own.</text>
<rect x="24" y="138" width="952" height="86" rx="14" fill="#0f766e" opacity="0.14"/>
<text x="56" y="176" font-size="29" font-weight="800" fill="#0f766e">A real definition of done: engineering investment</text>
<text x="56" y="210" font-size="27" fill="currentColor" opacity="0.85">Adopted sometimes. This is where velocity arguments actually live.</text>
<rect x="24" y="236" width="952" height="86" rx="14" fill="#b45309" opacity="0.14"/>
<text x="56" y="274" font-size="29" font-weight="800" fill="#b45309">An empowered product owner: organisational change</text>
<text x="56" y="308" font-size="27" fill="currentColor" opacity="0.85">Adopted least often. Without it the rest is overhead.</text>
<rect x="24" y="334" width="952" height="86" rx="14" fill="#be123c" opacity="0.14"/>
<text x="56" y="372" font-size="29" font-weight="800" fill="#be123c">So assess from the bottom up</text>
<text x="56" y="406" font-size="27" fill="currentColor" opacity="0.85">Ask who decided not to build something last sprint, and name them.</text>
</svg>
<figcaption><strong>The cheapest element has the least independent effect, and it is adopted first and alone.</strong> That ordering by cost, rather than any misunderstanding of the framework, is the whole explanation for ceremony without benefit.</figcaption>
</figure>`;

const FIG_XP_ORDER = `<figure>
<svg viewBox="0 0 1000 540" role="img" aria-label="The order XP practices have to be adopted in">
<rect x="24" y="40" width="952" height="86" rx="14" fill="#0369a1" opacity="0.14"/>
<text x="56" y="78" font-size="29" font-weight="800" fill="#0369a1">First: a fast, trustworthy build</text>
<text x="56" y="112" font-size="27" fill="currentColor" opacity="0.85">Everything else depends on feedback you believe.</text>
<rect x="24" y="138" width="952" height="86" rx="14" fill="#0f766e" opacity="0.14"/>
<text x="56" y="176" font-size="29" font-weight="800" fill="#0f766e">Then: merge to trunk daily</text>
<text x="56" y="210" font-size="27" fill="currentColor" opacity="0.85">Small conflicts instead of three-week merges.</text>
<rect x="24" y="236" width="952" height="86" rx="14" fill="#b45309" opacity="0.14"/>
<text x="56" y="274" font-size="29" font-weight="800" fill="#b45309">Then: refactoring becomes safe</text>
<text x="56" y="308" font-size="27" fill="currentColor" opacity="0.85">Because the suite will tell you if behaviour changed.</text>
<rect x="24" y="334" width="952" height="86" rx="14" fill="#be123c" opacity="0.14"/>
<text x="56" y="372" font-size="29" font-weight="800" fill="#be123c">Then: collective ownership is tenable</text>
<text x="56" y="406" font-size="27" fill="currentColor" opacity="0.85">Anyone can change anything, because the net catches it.</text>
<rect x="24" y="432" width="952" height="86" rx="14" fill="#7c3aed" opacity="0.14"/>
<text x="56" y="470" font-size="29" font-weight="800" fill="#7c3aed">Starting elsewhere usually fails</text>
<text x="56" y="504" font-size="27" fill="currentColor" opacity="0.85">And the team concludes the practice does not work.</text>
</svg>
<figcaption><strong>Pairing and test-first are good practices that fail on a broken foundation.</strong> Teams that start with them against a forty-minute flaky suite abandon both, and what actually failed was the sequence rather than the practice.</figcaption>
</figure>`;

const FIG_BOARD_READ = `<figure>
<svg viewBox="0 0 1000 540" role="img" aria-label="The order to read a board in">
<rect x="24" y="40" width="952" height="86" rx="14" fill="#0369a1" opacity="0.14"/>
<text x="56" y="78" font-size="29" font-weight="800" fill="#0369a1">1. The oldest item in progress</text>
<text x="56" y="112" font-size="27" fill="currentColor" opacity="0.85">The only number you can still act on today.</text>
<rect x="24" y="138" width="952" height="86" rx="14" fill="#0f766e" opacity="0.14"/>
<text x="56" y="176" font-size="29" font-weight="800" fill="#0f766e">2. Anything blocked, and who owns it</text>
<text x="56" y="210" font-size="27" fill="currentColor" opacity="0.85">Where the longest delays hide, invisible left to right.</text>
<rect x="24" y="236" width="952" height="86" rx="14" fill="#b45309" opacity="0.14"/>
<text x="56" y="274" font-size="29" font-weight="800" fill="#b45309">3. Which columns are at their limit</text>
<text x="56" y="308" font-size="27" fill="currentColor" opacity="0.85">Tells you where to send help.</text>
<rect x="24" y="334" width="952" height="86" rx="14" fill="#be123c" opacity="0.14"/>
<text x="56" y="372" font-size="29" font-weight="800" fill="#be123c">4. Which column holds the most work</text>
<text x="56" y="406" font-size="27" fill="currentColor" opacity="0.85">Work piles up in front of the slowest step.</text>
<rect x="24" y="432" width="952" height="86" rx="14" fill="#7c3aed" opacity="0.14"/>
<text x="56" y="470" font-size="29" font-weight="800" fill="#7c3aed">5. Only now, consider starting something</text>
<text x="56" y="504" font-size="27" fill="currentColor" opacity="0.85">Most boards are read in exactly the opposite order.</text>
</svg>
<figcaption><strong>Starting is the last decision, not the first.</strong> A board walked left to right, person by person, is a status display; walked oldest-first it is an instrument that produces a decision.</figcaption>
</figure>`;

const FIG_MEETING_COST = `<figure>
<svg viewBox="0 0 1000 540" role="img" aria-label="The standing cost of ceremony for a team of seven, per fortnight">
<rect x="24" y="40" width="952" height="86" rx="14" fill="#0369a1" opacity="0.14"/>
<text x="56" y="78" font-size="29" font-weight="800" fill="#0369a1">Daily stand-up, 15 minutes</text>
<text x="56" y="112" font-size="27" fill="currentColor" opacity="0.85">About 17 person-hours</text>
<rect x="24" y="138" width="952" height="86" rx="14" fill="#0f766e" opacity="0.14"/>
<text x="56" y="176" font-size="29" font-weight="800" fill="#0f766e">Planning, 2 hours</text>
<text x="56" y="210" font-size="27" fill="currentColor" opacity="0.85">14 person-hours</text>
<rect x="24" y="236" width="952" height="86" rx="14" fill="#b45309" opacity="0.14"/>
<text x="56" y="274" font-size="29" font-weight="800" fill="#b45309">Review and retrospective, 1 hour each</text>
<text x="56" y="308" font-size="27" fill="currentColor" opacity="0.85">14 person-hours</text>
<rect x="24" y="334" width="952" height="86" rx="14" fill="#be123c" opacity="0.14"/>
<text x="56" y="372" font-size="29" font-weight="800" fill="#be123c">Refinement, 1 hour</text>
<text x="56" y="406" font-size="27" fill="currentColor" opacity="0.85">7 person-hours</text>
<rect x="24" y="432" width="952" height="86" rx="14" fill="#7c3aed" opacity="0.14"/>
<text x="56" y="470" font-size="29" font-weight="800" fill="#7c3aed">Total: roughly 52 person-hours a fortnight</text>
<text x="56" y="504" font-size="27" fill="currentColor" opacity="0.85">More than a full-time person, allocated permanently.</text>
</svg>
<figcaption><strong>None of this is necessarily wasted; the point is the scale.</strong> A standing cost of this size should be a reviewed decision, and in most organisations the schedule is inherited and never examined.</figcaption>
</figure>`;

const FIG_CAPACITY = `<figure>
<svg viewBox="0 0 1000 540" role="img" aria-label="Realistic sprint capacity after the subtractions">
<rect x="24" y="40" width="952" height="86" rx="14" fill="#0369a1" opacity="0.14"/>
<text x="56" y="78" font-size="29" font-weight="800" fill="#0369a1">Six people, ten working days</text>
<text x="56" y="112" font-size="27" fill="currentColor" opacity="0.85">60 days on paper</text>
<rect x="24" y="138" width="952" height="86" rx="14" fill="#0f766e" opacity="0.14"/>
<text x="56" y="176" font-size="29" font-weight="800" fill="#0f766e">Less annual leave</text>
<text x="56" y="210" font-size="27" fill="currentColor" opacity="0.85">minus 7</text>
<rect x="24" y="236" width="952" height="86" rx="14" fill="#b45309" opacity="0.14"/>
<text x="56" y="274" font-size="29" font-weight="800" fill="#b45309">Less support rota, one person</text>
<text x="56" y="308" font-size="27" fill="currentColor" opacity="0.85">minus 10</text>
<rect x="24" y="334" width="952" height="86" rx="14" fill="#be123c" opacity="0.14"/>
<text x="56" y="372" font-size="29" font-weight="800" fill="#be123c">Less ceremonies and overheads, about 15%</text>
<text x="56" y="406" font-size="27" fill="currentColor" opacity="0.85">minus 6</text>
<rect x="24" y="432" width="952" height="86" rx="14" fill="#7c3aed" opacity="0.14"/>
<text x="56" y="470" font-size="29" font-weight="800" fill="#7c3aed">Realistic capacity: 37 days</text>
<text x="56" y="504" font-size="27" fill="currentColor" opacity="0.85">Planning against 60 over-commits by more than a third.</text>
</svg>
<figcaption><strong>Capacity planning fails politically, not arithmetically.</strong> Anyone can do the subtraction; what is hard is saying the real number out loud after a date has already been promised on the basis of the headline one.</figcaption>
</figure>`;

const curriculum: CourseCurriculum = {
  5126: {
    topicId: 5126,
    title: "What agile claims, and what it does not",
    summary:
      "Three frameworks, each holding a different variable fixed. Knowing which one tells you what it can and cannot fix.",
    concepts: ["Iteration", "Feedback loop", "Empirical process", "Constraint", "Cargo cult"],
    glossary: {
      Iteration: "A fixed period producing something that can be evaluated, so the next decision uses evidence.",
      "Feedback loop": "The cycle from doing something to learning whether it worked. Agile methods shorten it.",
      "Empirical process": "Control by observing actual results rather than by following a plan made in advance.",
      Constraint: "The variable a framework deliberately holds fixed, which is what gives it its effect.",
      "Cargo cult": "Performing the visible rituals of a method without the mechanism that made them work.",
    },
    body: {
      Beginner: `<p>Agile is not one thing. It is a label covering several methods that share one bet: that you will learn more by building a small piece and looking at it than by planning the whole thing first.</p>
<h3>The three you will actually meet</h3>
<table>
<tr><th>Framework</th><th>What it fixes</th><th>So it is good at</th></tr>
<tr><td>Scrum</td><td>Time, in sprints</td><td>Creating a regular rhythm of decisions</td></tr>
<tr><td>Kanban</td><td>Work in progress</td><td>Making flow and delay visible</td></tr>
<tr><td>Extreme programming</td><td>Engineering practice</td><td>Keeping change cheap as code grows</td></tr>
</table>
<p>They are not competitors so much as answers to different questions. A team that cannot finish anything has a work-in-progress problem. A team that finishes things nobody wanted has a feedback problem. A team whose code fights every change has an engineering problem, and no amount of ceremony fixes it.</p>
<div class="key-idea"><span class="callout-label">The common mechanism is a shorter feedback loop</span><p>Every one of these methods is a way of finding out sooner whether you are wrong. That is the whole claim. If a practice does not shorten the time between a decision and evidence about it, adopting it will not help.</p></div>
<h3>What agile does not claim</h3>
<p>Not that it is faster. Not that planning is unnecessary. Not that documentation is bad. The original argument was about which things to prioritise when they conflict, and it was written by people who had seen large projects fail after eighteen months of specification. Reading it as permission to skip planning is a misreading that has caused a great deal of harm.</p>
<div class="warning"><span class="callout-label">Most failures are cargo cult failures</span><p>A team does the stand-up, keeps the board, runs the retro, and nothing improves. That is usually because the rituals were adopted and the mechanism underneath them was not. The rest of this course is about the mechanisms.</p></div>`,
      Intermediate: `<p>The useful way to compare these frameworks is to ask what each one refuses to let you change. That constraint is where the effect comes from, and it is also the part teams quietly remove when it becomes uncomfortable.</p>
${FIG_THREE}
<h3>Each framework's load-bearing constraint</h3>
<table>
<tr><th>Framework</th><th>Constraint</th><th>Removed when</th></tr>
<tr><td>Scrum</td><td>The sprint length does not change, and scope is fixed once it starts</td><td>Work is added mid-sprint because it is urgent</td></tr>
<tr><td>Kanban</td><td>A column cannot exceed its WIP limit</td><td>The limit is raised because the column is full</td></tr>
<tr><td>XP</td><td>Tests exist before the code, and the code is refactored continuously</td><td>Tests are deferred to the end of the release</td></tr>
</table>
<p>In all three cases the removal feels locally sensible and destroys the mechanism. A WIP limit that rises whenever it binds is not a limit; it is a label on a column.</p>
<div class="key-idea"><span class="callout-label">Discomfort is the signal, not the problem</span><p>A WIP limit is supposed to feel wrong. When a column is full and you cannot start anything new, you are being forced to go and help finish something instead, and that is the entire intervention. Teams that remove the discomfort remove the effect and keep the vocabulary.</p></div>
<h3>Choosing between them</h3>
<p>Scrum suits work that can be batched into a fixed period and benefits from a regular planning rhythm. Kanban suits work that arrives unpredictably, such as support or operations, where fixing a cadence is artificial. XP is not an alternative to either, because it is about how the code is written, and both of the others work better with it.</p>
<div class="warning"><span class="callout-label">Hybrid is normal and is not a failure</span><p>Most real teams run something between Scrum and Kanban, often sprints with WIP limits inside them. That is fine. What matters is that you can name which constraints you kept and why, rather than having arrived there by dropping whichever rule was annoying.</p></div>
<h3>How to tell a real adoption from a performed one</h3>
<p>Four questions, none of which mention a ceremony. Ask them of any team describing itself as agile and you have the answer in two minutes.</p>
<table>
<tr><th>Question</th><th>A real answer sounds like</th></tr>
<tr><td>What changed after your last retrospective?</td><td>A specific thing, named, now different</td></tr>
<tr><td>What happens when urgent work arrives mid-sprint?</td><td>A rule they follow, with a cost attached</td></tr>
<tr><td>How long from starting work to it being live?</td><td>A number they have measured</td></tr>
<tr><td>What did you decide not to build this month?</td><td>Something concrete, decided by somebody named</td></tr>
</table>
<p>A team performing the rituals answers the first with we discussed some things, the second with we just absorb it, the third with a guess, and the fourth with nothing. None of that is a character failing: it indicates the mechanisms are absent while the meetings continue.</p>`,
      Advanced: `<p>Scrum describes itself as an empirical process control framework, which is a precise claim worth unpacking. Empirical control means you steer by observing actual output rather than by executing a plan, and it requires three things: transparency, inspection and adaptation. Remove any one and the loop stops working.</p>
<table>
<tr><th>Pillar</th><th>What it requires in practice</th><th>Fails when</th></tr>
<tr><td>Transparency</td><td>Everyone sees the same real state</td><td>Status reports are optimistic</td></tr>
<tr><td>Inspection</td><td>Someone actually looks, frequently</td><td>The review becomes a demo of slides</td></tr>
<tr><td>Adaptation</td><td>What is seen changes what is done</td><td>Retro actions are never implemented</td></tr>
</table>
<p>Adaptation is the one that fails most often and most quietly. A team can inspect diligently every two weeks, produce the same three observations every time, and change nothing, and from the outside the process looks healthy.</p>
<h3>Where the methods came from matters</h3>
<p>Kanban comes from manufacturing and brings queueing theory with it, which is why its claims are quantitative: limit work in progress and cycle time falls, by a relationship you can compute. Scrum comes from product development and its claims are about decision rhythm. XP comes from a specific project and is a set of engineering practices that reinforce each other. Mixing them is fine; mixing their justifications is where confusion starts.</p>
<div class="key-idea"><span class="callout-label">Only one of the three has a theorem behind it</span><p>Little's law relates work in progress, throughput and cycle time, and it holds regardless of how anybody feels about it. That is why Kanban arguments can be settled with measurement and Scrum arguments frequently cannot.</p></div>
<h3>What agile cannot fix</h3>
<p>A team with no decision-making authority, a product with no one who can say what matters, or a codebase where any change takes three weeks. In each case the constraint is outside the process, and adopting a framework adds ceremony to an unchanged situation. This is the most common reason agile adoptions are judged to have failed: the method was asked to solve a problem it does not touch.</p>
<h3>Batch size is the variable underneath all of it</h3>
<p>Nearly every benefit these methods claim traces back to making the unit of work smaller. Small batches fail cheaply, surface problems earlier, queue for less time and are easier to reason about. A sprint is a batch of time, a WIP limit bounds a batch of concurrent work, and continuous integration shrinks the batch of unmerged change.</p>
<p>That gives a test for any proposed practice: does it reduce batch size somewhere? It also explains adoptions that achieve nothing. A two-week sprint shipping one large release at the end has added a cadence without reducing any batch, so the mechanism was never engaged.</p>
<table>
<tr><th>Cadence</th><th>Batch</th><th>Result</th></tr>
<tr><td>Fixed two weeks</td><td>One large release</td><td>Ceremony, no feedback gain</td></tr>
<tr><td>Fixed two weeks</td><td>Several small increments</td><td>The intended effect</td></tr>
<tr><td>Continuous flow</td><td>Small items</td><td>Also the intended effect</td></tr>
</table>
<p>The last two rows differ in style and match in mechanism, which is why arguing Scrum against Kanban is usually less productive than asking what the batch size is.</p>
<h3>The three frameworks disagree about what a team is for</h3>
<p>Scrum assumes a stable team taking on a goal. Kanban assumes a service absorbing demand. XP assumes a group of engineers who own the quality of a codebase. Those are different models of the same people, and a lot of apparently procedural disagreement is actually disagreement about which model applies.</p>
<p>It is worth naming explicitly when a team is arguing. A support group forced into sprint commitments and a product team forced into pure flow are both being asked to behave like something they are not, and no amount of tuning the ceremonies resolves it.</p>`,
      Expert: `<p>The manifesto is four preference statements, each of the form we value A over B while there is value in B. That structure is routinely dropped in quotation, which converts a statement about trade-offs into a prohibition, and almost every misuse of the word agile traces back to that elision.</p>
<table>
<tr><th>Preference</th><th>Common misreading</th></tr>
<tr><td>Individuals and interactions over processes and tools</td><td>Process is bad</td></tr>
<tr><td>Working software over comprehensive documentation</td><td>Do not write documentation</td></tr>
<tr><td>Customer collaboration over contract negotiation</td><td>Contracts do not matter</td></tr>
<tr><td>Responding to change over following a plan</td><td>Do not plan</td></tr>
</table>
<h3>The industrialisation problem</h3>
<p>These methods were devised by practitioners for their own teams and then became a certification market. The incentive of a training industry is to sell a transferable, teachable artefact, which is the ceremony rather than the judgement, so what spreads is the visible shape of the practice. That is a structural explanation for cargo cult adoption rather than a failing of individual teams, and it is why reading the primary sources is unusually worthwhile in this field.</p>
<h3>What the evidence actually supports</h3>
<p>The research base is weaker than the confidence of the discourse. The findings that do replicate are mostly about engineering practice and delivery capability rather than about ceremonies: small batch sizes, short lead times, automated testing and deployment, and trunk-based development correlate with better outcomes. Notably, none of those is a meeting.</p>
<div class="key-idea"><span class="callout-label">Which suggests where to spend effort</span><p>If a team can adopt only one thing from this course, the evidence points at reducing batch size and automating the path to production rather than at any ceremony. The meetings are coordination mechanisms that help some teams and are not the part the data supports.</p></div>
<h3>Scaling, briefly and sceptically</h3>
<p>Frameworks for coordinating many teams exist and are contested. The honest summary is that nothing in this area has strong evidence, that most scaling problems are actually dependency problems, and that reducing dependencies between teams tends to help more than adding a layer of coordination above them. A team told to adopt a scaling framework is usually being handed a structural problem in procedural clothing.</p>
<h3>Why the discourse is confident and the evidence is thin</h3>
<p>Controlled studies of software methods are very hard: teams differ, projects differ, and the intervention cannot be blinded. What exists is largely survey data with self-selection, plus practitioner reports written by people with an interest in the result. That does not make the methods wrong, and it does mean the appropriate register is more tentative than the one the field usually adopts.</p>
<p>What has held up across larger datasets concerns delivery capability rather than ceremony: deployment frequency, lead time, change failure rate and time to restore, predicted by practices such as trunk-based development and automated testing. A team with a limited budget for change has a reasonable basis for prioritising those over any meeting.</p>
<h3>The one genuinely quantitative tool</h3>
<p>Little's law applies to any stable queueing system, which includes a team's work in progress, so a team can predict the effect of halving WIP and then check whether it happened. Most of what is presented as agile metrics is not of that kind: velocity is a local convention, story points are not units, and a burndown is a visualisation rather than a measurement. Knowing which of your numbers rest on a theorem and which rest on a habit is worth more than any individual metric.</p>
<h3>Why hybrid is the normal end state</h3>
<p>Almost every mature team ends up running something between the three: a cadence for planning, limits inside it, and engineering practices borrowed from XP. That is not a failure to adopt properly, it is the predictable result of keeping what binds and discarding what does not fit the work.</p>
<p>The only thing worth insisting on is that the team can say which constraints they kept and why. A hybrid arrived at deliberately is a design. One arrived at by dropping whichever rule was most annoying is a drift, and the two are indistinguishable from the outside until something goes wrong.</p>`,
    },
    questions: [
      {
        n: 1,
        question: "What is the mechanism all three frameworks share?",
        options: [
          "Shortening the time between a decision and evidence about whether it was right",
          "Holding more meetings so problems surface earlier",
          "Removing documentation so work moves faster",
          "Letting the team rather than a manager set the deadline",
        ],
        answer: 0,
        explanation:
          "Every practice in these methods is a way of finding out sooner that you are wrong: a short sprint, a WIP limit that forces finishing, a test written before the code. That gives you a test to apply to any proposed practice, which is whether it shortens that loop. A new ceremony that produces no earlier evidence is overhead regardless of what it is called, and that single question resolves most arguments about whether to adopt something.",
        difficulty: "Easy",
        skill: "Feedback loop",
      },
      {
        n: 2,
        question: "A team raises its WIP limit whenever a column fills up. What have they done?",
        options: [
          "Removed the mechanism and kept the vocabulary",
          "Adapted the process sensibly to their capacity",
          "Improved throughput by reducing blocking",
          "Converted to Scrum",
        ],
        answer: 0,
        explanation:
          "The limit works precisely by binding. When a column is full you cannot start something new, so you go and help finish what is already there, and that reallocation is the entire intervention. A limit that rises whenever it is reached is a label on a column. The discomfort is the signal rather than the problem, which is the single most common misunderstanding about Kanban and the reason many adoptions produce no measurable change.",
        difficulty: "Medium",
        skill: "Constraint",
      },
      {
        n: 3,
        question: "Which of the three pillars of empirical control fails most quietly?",
        options: [
          "Adaptation, because a team can inspect regularly and change nothing",
          "Transparency, because dashboards are always wrong",
          "Inspection, because reviews are usually cancelled",
          "All three fail at the same rate",
        ],
        answer: 0,
        explanation:
          "Transparency and inspection failures are visible: a missing board or a cancelled review is noticed. Adaptation failure looks identical to success from outside, because the team holds the retrospective, records the same three observations it recorded last month, and implements none of them. The diagnostic is to look at what changed as a result of the last three retros, and the answer is frequently nothing at all.",
        difficulty: "Hard",
        skill: "Empirical process",
      },
      {
        n: 4,
        question: "Why can Kanban arguments often be settled by measurement when Scrum arguments cannot?",
        options: [
          "Little's law gives a quantitative relationship between WIP, throughput and cycle time",
          "Kanban teams keep better records",
          "Scrum has no metrics at all",
          "Kanban is a newer method with better tooling",
        ],
        answer: 0,
        explanation:
          "Kanban inherits queueing theory from manufacturing, so the claim that limiting work in progress reduces cycle time is a relationship you can compute and check against your own data. Scrum's claims are about decision rhythm and are harder to isolate. Scrum does have metrics, which rules out the third option, and velocity is not a theorem: it is a local measure that depends on how the team happens to estimate.",
        difficulty: "Hard",
        skill: "Empirical process",
      },
      {
        n: 5,
        question: "Which situation is a framework adoption least likely to improve?",
        options: [
          "A team with no authority to decide what it builds",
          "A team that frequently starts more work than it finishes",
          "A team that discovers requirements were wrong late",
          "A team whose releases are large and infrequent",
        ],
        answer: 0,
        explanation:
          "The other three are the problems these methods are built for: too much work in progress, slow feedback, and large batches. Lack of authority is outside the process, so a framework adds ceremony to an unchanged situation and the team ends up performing rituals that cannot affect their actual constraint. This is the most common reason an adoption is later judged a failure, and it is a diagnosis that should be made before adopting anything.",
        difficulty: "Medium",
        skill: "Cargo cult",
      },
      {
        n: 6,
        question: "What does the manifesto's we value A over B structure actually assert?",
        options: [
          "A trade-off preference when the two conflict, with B still having value",
          "That B should be eliminated",
          "That A and B are equally important",
          "That B is only for traditional projects",
        ],
        answer: 0,
        explanation:
          "Each line ends with an explicit statement that there is value in the right-hand item, and dropping that clause is how a statement about trade-offs becomes a prohibition. Working software over comprehensive documentation becomes do not write documentation, which is not what it says and not what its authors did. Most misuse of the word agile traces to this elision, which is a good reason to read the four lines in full once rather than relying on how they are quoted.",
        difficulty: "Easy",
        skill: "Iteration",
      },
    ],
    decks: [
      {
        n: 1,
        title: "What each framework actually constrains",
        blurb:
          "Twelve cards on the mechanisms rather than the ceremonies. If you can only remember one thing per framework, it should be the constraint, because that is what stops working when a team quietly removes it.",
        mode: "flip",
        cards: [
          { id: 1, front: "Scrum constrains", back: "Time. The sprint length is fixed and scope is frozen once it starts.", extra: { "Removed when": "Urgent work is injected mid-sprint", Effect: "The rhythm of decisions disappears" }, hint: "What cannot change during a sprint?", tags: ["Scrum"] },
          { id: 2, front: "Kanban constrains", back: "Work in progress. A column cannot exceed its limit.", extra: { "Removed when": "The limit is raised because the column is full", Effect: "Cycle time stops falling" }, hint: "What cannot exceed a number?", tags: ["Kanban"] },
          { id: 3, front: "XP constrains", back: "Engineering practice. Tests first, continuous refactoring.", extra: { "Removed when": "Testing is deferred to the end", Effect: "Change gets expensive again" }, hint: "Not a meeting", tags: ["XP"] },
          { id: 4, front: "Little's law", back: "Cycle time equals work in progress divided by throughput", extra: { Consequence: "Halve WIP at constant throughput and cycle time halves", "Why it matters": "It makes Kanban claims checkable" }, hint: "The only theorem in the course", tags: ["Theory"] },
          { id: 5, front: "The three pillars", back: "Transparency, inspection, adaptation", extra: { "Fails quietly": "Adaptation", "Diagnostic": "What changed after the last three retros?" }, hint: "Empirical control needs all three", tags: ["Scrum"] },
          { id: 6, front: "Cargo cult", back: "The rituals without the mechanism", extra: { "Looks like": "Stand-ups, a board, a retro, and nothing improving", Cause: "The ceremony is teachable; the judgement is not" }, hint: "Why adoptions fail without anyone misbehaving", tags: ["Theory"] },
          { id: 7, front: "The test for any new practice", back: "Does it shorten the time between a decision and evidence?", extra: { "If no": "It is overhead, whatever it is called" }, hint: "One question, most arguments", tags: ["Theory"] },
          { id: 8, front: "What agile does not claim", back: "That it is faster, that planning is unnecessary, that documentation is bad", extra: { Source: "A preference between trade-offs, not a prohibition" }, hint: "Read the second half of each manifesto line", tags: ["Theory"] },
          { id: 9, front: "When Kanban suits better than Scrum", back: "Work arrives unpredictably, so a fixed cadence is artificial", extra: { Examples: "Support, operations, incident response" }, hint: "Can you batch two weeks of it?", tags: ["Choosing"] },
          { id: 10, front: "When XP is the answer", back: "When the codebase makes every change expensive", extra: { "Why ceremony will not help": "The constraint is technical, not procedural" }, hint: "No meeting fixes a test suite", tags: ["Choosing"] },
          { id: 11, front: "What agile cannot fix", back: "No decision authority, no one who can say what matters, a codebase that resists change", extra: { "Why adoptions fail": "The method was asked to solve a problem outside it" }, hint: "Diagnose before adopting", tags: ["Choosing"] },
          { id: 12, front: "What the evidence supports", back: "Small batches, short lead times, automated testing and deployment", extra: { Notable: "None of those is a meeting" }, hint: "Where to spend effort if you can pick one thing", tags: ["Theory"] },
        ],
        skills: ["Iteration", "Feedback loop", "Empirical process", "Constraint", "Cargo cult"],
      },
    ],
  },
  5127: {
    topicId: 5127,
    title: "Scrum: the roles, events and artefacts that carry it",
    summary:
      "Three accountabilities, five events, three artefacts. Each exists to make one specific failure visible, and each is routinely kept after its mechanism has gone.",
    concepts: ["Product owner", "Sprint", "Increment", "Definition of done", "Accountability"],
    glossary: {
      "Product owner": "The single person accountable for what the team builds and in what order.",
      Sprint: "A fixed period, unchanged in length, inside which scope does not grow.",
      Increment: "Something usable produced by the end of the sprint, meeting the definition of done.",
      "Definition of done": "The shared written standard work must meet before it counts as finished.",
      Accountability: "A named person answerable for an outcome, as distinct from a job title.",
    },
    body: {
      Beginner: `<p>Scrum is small. Three accountabilities, five events, three artefacts, and a rule that the sprint length does not change. Everything else a team does around it is their own invention, which is worth knowing because most complaints about Scrum are about those inventions.</p>
<h3>The three accountabilities</h3>
<table>
<tr><th>Who</th><th>Accountable for</th></tr>
<tr><td>Product owner</td><td>What gets built, and in what order</td></tr>
<tr><td>Developers</td><td>How it gets built, and that it meets the definition of done</td></tr>
<tr><td>Scrum master</td><td>That the process is understood and obstacles are removed</td></tr>
</table>
<p>These are accountabilities rather than job titles. One person can hold more than one on a small team. A product owner who is really a committee is the commonest structural failure, because ordering a backlog requires somebody to decide and a committee decides slowly or not at all.</p>
<h3>The five events</h3>
<table>
<tr><th>Event</th><th>Question it answers</th></tr>
<tr><td>Sprint planning</td><td>What will we attempt, and how?</td></tr>
<tr><td>Daily scrum</td><td>Are we still on track for the goal?</td></tr>
<tr><td>Sprint review</td><td>Did we build the right thing?</td></tr>
<tr><td>Retrospective</td><td>How do we work better next time?</td></tr>
<tr><td>The sprint</td><td>It is itself an event, containing the others</td></tr>
</table>
<h3>The three artefacts</h3>
<p>The product backlog is everything that might be built, ordered. The sprint backlog is what was selected plus the plan for it. The increment is what actually got finished. Each has a commitment attached: a product goal, a sprint goal, and the definition of done.</p>
<div class="key-idea"><span class="callout-label">The daily is not a status report</span><p>It is the team re-planning its own next day against the sprint goal. If it is a round of people reporting upward to one person, the mechanism has been replaced by a meeting that produces no decisions and takes the same fifteen minutes.</p></div>
<div class="warning"><span class="callout-label">The definition of done is load bearing</span><p>Without a shared written standard, done means whatever each person assumed, and the increment is not usable. Most arguments about velocity turn out to be arguments about this document.</p></div>`,
      Intermediate: `<p>Each event exists to make a specific failure visible. Knowing which one tells you when the event is working and when it has become theatre, and the theatre version is always cheaper to run.</p>
${FIG_SCRUM_FAIL}
<table>
<tr><th>Event</th><th>Failure it exposes</th><th>Theatre version</th></tr>
<tr><td>Planning</td><td>Taking on more than can be finished</td><td>Filling to capacity every time</td></tr>
<tr><td>Daily</td><td>Work quietly stuck</td><td>Three questions answered to a manager</td></tr>
<tr><td>Review</td><td>Building the wrong thing</td><td>A slide deck, no working software</td></tr>
<tr><td>Retrospective</td><td>The process itself failing</td><td>The same observations, never actioned</td></tr>
</table>
<h3>The sprint goal does more work than the backlog</h3>
<p>A sprint goal is one sentence saying why this sprint matters. Without it a sprint is a list of unrelated items, any of which can be dropped without consequence, so there is nothing to protect and nothing to steer by. With one, the team can swap items that do not serve it and still succeed, which is the flexibility the framework is supposed to provide.</p>
<div class="key-idea"><span class="callout-label">Scope is frozen; the plan is not</span><p>The common misreading is that nothing may change during a sprint. What is fixed is the goal and the capacity commitment. How the team reaches the goal is theirs to change daily, and finding a better route mid-sprint is a success rather than a deviation.</p></div>
<h3>What to do with urgent work</h3>
<p>Three honest options. It waits for the next sprint. It displaces something of equal size, with the product owner agreeing. Or the sprint is cancelled because the goal no longer makes sense. The dishonest fourth, adding it on top, is the one most teams take, and it is why their velocity is unstable and their forecasts are worthless.</p>
<table>
<tr><th>Response</th><th>Visible cost</th><th>Keeps the mechanism?</th></tr>
<tr><td>Wait</td><td>Delay to the new work</td><td>Yes</td></tr>
<tr><td>Displace</td><td>Something agreed gets dropped</td><td>Yes</td></tr>
<tr><td>Cancel the sprint</td><td>Replanning, visibly</td><td>Yes</td></tr>
<tr><td>Add on top</td><td>None visible, all hidden</td><td>No</td></tr>
</table>
<p>The pattern is that the three honest options all have a price somebody can see, and that visibility is the mechanism. Interruption without cost increases until it fills the sprint.</p>
<h3>Refinement is the event that is not on the list</h3>
<p>Scrum names five events and backlog refinement is not one of them, yet nearly every functioning team does it. It is treated as ongoing work rather than a ceremony, which in practice means it either happens continuously or it does not happen and planning absorbs the cost. A planning session that runs long is almost always paying for refinement that never occurred.</p>
<h3>The three artefacts each carry a commitment</h3>
<p>The product backlog carries a product goal, the sprint backlog carries the sprint goal, and the increment carries the definition of done. Each commitment is what makes the artefact more than a list, and each is the part most often missing.</p>`,
      Advanced: `<p>Scrum is deliberately incomplete: it specifies a container and leaves the engineering practices out, which is why it is so often paired with XP. That incompleteness is also why it can be adopted without changing anything that matters. A team can run every event correctly and still release quarterly from a branch nobody integrates.</p>
<h3>Where Scrum teams break</h3>
<table>
<tr><th>Symptom</th><th>Underlying cause</th></tr>
<tr><td>Velocity swings wildly</td><td>Work injected mid-sprint, or a weak definition of done</td></tr>
<tr><td>Carry-over every sprint</td><td>Items too large to finish inside one</td></tr>
<tr><td>Review has nothing to show</td><td>No increment; integration happens at the end</td></tr>
<tr><td>Retro actions never land</td><td>No capacity reserved, so they lose to feature work</td></tr>
</table>
<p>The last has a mechanical remedy: carry at most one or two actions, give each an owner and a sprint, and put them in the sprint backlog as work rather than as intentions. A retrospective whose output competes for unreserved slack will produce nothing indefinitely, and the team will conclude that retrospectives do not work.</p>
<div class="key-idea"><span class="callout-label">The product owner role is where organisations cheat</span><p>Scrum requires one person who can decide. Organisations frequently appoint somebody with the title and withhold the authority, so every ordering decision escalates and the team experiences the framework as overhead. It is overhead, in that configuration, because the role that makes it function is nominal.</p></div>
<h3>Reading a definition of done</h3>
<p>A good one is checkable by somebody who was not involved: tested at a stated level, reviewed, documented where applicable, deployed to a named environment, no known defects above a stated severity. A weak one contains words like appropriate and sufficient, which leave the judgement with whoever is under pressure at the time.</p>
<p>The test is whether two reasonable people could disagree about whether an item meets it. If they can, it is a statement of intent rather than a definition, and it will be interpreted generously in exactly the sprints where it matters most.</p>
<h3>Why carry-over compounds</h3>
<p>An item that does not finish is re-estimated, re-planned and re-discussed, so the cost of not finishing is paid several times. Teams that tolerate routine carry-over are usually sizing items against a sprint rather than against a few days, and the fix is splitting rather than extending the sprint.</p>
<h3>What the increment actually has to be</h3>
<p>Usable, not demonstrable. The distinction decides whether the review is an inspection or a performance: a demo can be assembled from work that is integrated nowhere, while a usable increment has passed the definition of done and could in principle be released. Teams that let this slip find their review becomes a presentation, and the feedback they get is about the slides.</p>
<h3>Multiple teams on one product</h3>
<p>Several teams working on one product share a product backlog and a product owner, which is the part that does not scale cleanly. A single person ordering work for five teams becomes a bottleneck, and splitting the role usually reintroduces the committee the role exists to avoid. There is no clean answer here, which is worth saying rather than pretending the framework scales transparently.</p>
<h3>Carry-over is a sizing signal, not a discipline problem</h3>
<p>Routine carry-over almost always means items are sized against the sprint rather than against a few days. The usual response is to extend the sprint or exhort the team, and the effective response is to split. An item that cannot finish inside a sprint cannot be inspected inside one either, so the feedback the sprint exists to generate never arrives.</p>`,
      Expert: `<p>The framework's authors describe it as a container for other practices. The honest reading of thirty years of adoption is that the container travels well and the practices do not, and the reason is cost rather than comprehension.</p>
<table>
<tr><th>Element</th><th>Adoption cost</th><th>Genuinely present</th></tr>
<tr><td>The events</td><td>Calendar time</td><td>Almost always</td></tr>
<tr><td>A real definition of done</td><td>Engineering investment</td><td>Sometimes</td></tr>
<tr><td>An empowered product owner</td><td>Organisational change</td><td>Least often</td></tr>
</table>
<p>That ordering explains ceremony without benefit entirely: the cheapest element has the least independent effect and is adopted first and alone. Any assessment of a Scrum adoption should start at the bottom row rather than the top.</p>
<h3>The scrum master as a disappearing role</h3>
<p>The accountability is to make the team able to run the process without help, so a successful scrum master makes their own full-time role unnecessary. Organisations that staff it permanently and measure it by activity create an incentive against that outcome, and the role drifts toward meeting administration and status reporting, which is neither what it is for nor valuable.</p>
<h3>Commitment, and a word that was deliberately changed</h3>
<p>Earlier versions had teams commit to a sprint scope. The word was replaced by forecast because commitment was being used to hold teams to estimates made under uncertainty, which converted a planning tool into a contract. The current framing commits the team to the sprint goal rather than to the item list, and the distinction matters: the goal is something a team can take responsibility for, and a list of estimates is not.</p>
<h3>When Scrum is the wrong choice</h3>
<p>Interrupt-driven work, because a protected sprint is fiction. Single-person work, because most of the apparatus is coordination. Research with no definable increment, because the review has nothing to inspect. Each is better served by flow, and recognising it in advance avoids the common outcome of a team performing sprint ceremonies around work that never fitted a sprint, then concluding the method is useless.</p>
<div class="field"><span class="callout-label">The question that reveals whether Scrum is doing anything</span><p>Ask what the team decided not to do last sprint, and who decided it. A functioning Scrum produces a steady stream of explicit prioritisation decisions attributable to one person. If nobody can name one, the backlog is not being ordered, and the central mechanism is absent however well the events are run.</p></div>
<h3>Why cancelling a sprint is almost never done</h3>
<p>The framework permits it when the goal becomes obsolete, and in practice teams complete a sprint they know is pointless because cancelling looks like failure. That is a cultural cost rather than a procedural one, and it wastes the most expensive thing the framework protects, which is a block of focused time.</p>
<p>A team that has cancelled a sprint once, cleanly and without consequence, behaves differently afterwards. It is one of the clearest available signals about whether the organisation actually believes in empirical control or merely schedules it.</p>
<h3>The framework is a floor, not a ceiling</h3>
<p>Everything Scrum specifies fits in a short document, and the authors are explicit that teams should add what they need. Most dysfunction attributed to Scrum comes from additions, not from the framework: mandatory tooling, estimate-based performance tracking, status reporting layered on the daily. Distinguishing the framework from the local accretion is the first step in fixing any of it.</p>
<h3>Why the framework keeps shrinking</h3>
<p>Successive revisions have removed rather than added: prescribed questions in the daily, the commitment language, specific estimation guidance. The direction is deliberate, toward a smaller core with more left to the team, and it tends to surprise people who learned an earlier version and treat its details as requirements. When somebody insists the daily must answer three specific questions, they are quoting a version that no longer says so.</p>
<h3>A floor worth defending</h3>
<p>Everything the framework requires fits on a few pages, and most complaints about it concern things it never said. Before changing a practice, check whether it is actually in the framework or is a local accretion, because the two have very different costs to remove.</p>`,
    },
    questions: [
      { n: 1, question: "What is the daily scrum for?", options: ["The developers re-planning their next day against the sprint goal", "Reporting status to the scrum master or a manager", "Assigning tasks to individuals for the day", "Reviewing finished work with stakeholders"], answer: 0, explanation: "It is a planning event owned by the people doing the work, so its output should be changed plans rather than transferred information. The status-report version is the commonest degradation: it produces no decisions, takes the same fifteen minutes, and is indistinguishable from the real thing to an observer. The diagnostic is whether anything about the day changes as a result.", difficulty: "Easy", skill: "Sprint" },
      { n: 2, question: "Urgent work arrives mid-sprint. Which response is NOT one of the honest options?", options: ["Add it on top of the existing sprint scope", "Let it wait for the next sprint", "Displace something of equal size, with the product owner agreeing", "Cancel the sprint, because the goal no longer makes sense"], answer: 0, explanation: "Adding on top destroys the mechanism while appearing cooperative. It breaks the capacity commitment, makes velocity meaningless, and removes any cost from interrupting, so interruptions increase until they fill the sprint. The other three are legitimate and each has a visible price, which is the point: the sprint boundary works by making the cost of a change explicit, not by forbidding change.", difficulty: "Medium", skill: "Sprint" },
      { n: 3, question: "How can you tell a definition of done is actually a definition?", options: ["Two reasonable people could not disagree about whether an item meets it", "It has more than ten items", "It has been approved by management", "It mentions testing"], answer: 0, explanation: "Checkability is the property that matters. Tested at a stated level, reviewed, deployed to a named environment, no known defects above a stated severity are all verifiable by somebody who was not involved. Words like appropriate and sufficient leave the judgement with whoever is under pressure, which is exactly the circumstance the document exists for. Length and sign-off are unrelated.", difficulty: "Medium", skill: "Definition of done" },
      { n: 4, question: "Why do retrospective actions so often fail to happen?", options: ["They compete with committed feature work for unreserved slack, and lose", "Teams identify the wrong problems", "Retrospectives are held too often", "They need management approval"], answer: 0, explanation: "An action with no owner, no sprint and no capacity is an intention, and intentions lose to committed work every time. The remedy is mechanical: at most one or two actions, each with an owner, placed in the sprint backlog as work. A team whose last three retrospectives produced no change does not have an insight problem, it has a scheduling problem, and treating it as the former produces better-facilitated meetings and the same outcome.", difficulty: "Medium", skill: "Accountability" },
      { n: 5, question: "Which element is adopted most often and has least effect on its own?", options: ["The events", "A real definition of done", "An empowered product owner", "The increment"], answer: 0, explanation: "Scheduling meetings costs calendar time and nothing else, so it is adopted first and nearly always. A definition of done requires engineering investment, and an empowered product owner requires an organisation to delegate authority it may not wish to delegate. That ordering by cost is the whole explanation for ceremony without benefit, and it is why an assessment should start with whether anyone can actually decide.", difficulty: "Hard", skill: "Accountability" },
      { n: 6, question: "Why was the word commitment replaced with forecast for sprint scope?", options: ["Commitment was being used to hold teams to estimates made under uncertainty", "Forecast is a more modern term", "Teams stopped meeting their commitments", "It simplified the certification exam"], answer: 0, explanation: "The change was substantive rather than cosmetic. Treating an estimate as a promise converts a planning tool into a contract, which incentivises padding and punishes honest uncertainty. The current framing commits the team to the sprint goal rather than to the item list, and that distinction is meaningful: a goal is something a team can take responsibility for, while a list of estimates made before the work started is not.", difficulty: "Hard", skill: "Sprint" },
    ],
    parts: [
      {
        n: 1,
        title: "Name the parts of the Scrum cycle, and order the events",
        diagram: "scrum-flow",
        brief: `<p>This is one sprint, with the backlog feeding it and the increment coming out. Name each numbered point.</p>
<p>The label list has more names than there are points. The extras are what each one gets confused with, and the reveal tells you how to separate the pair, so guessing is more useful here than skipping.</p>
<div class="key-idea"><span class="callout-label">Watch the two backlogs</span><p>The product backlog and the sprint backlog are different artefacts with different owners. Telling them apart is the thing this exercise catches most often.</p></div>`,
        hotspots: [
          { key: "product-backlog", label: "Product backlog", x: 12, y: 50, does: "Everything that might be built, ordered by value. Owned by the product owner and never finished.", confusedWith: "The sprint backlog, which is a selected subset the developers own for one sprint." },
          { key: "sprint", label: "The sprint", x: 50, y: 32, does: "A fixed period whose length does not change. The container for every other event.", confusedWith: "An iteration of convenient length; the fixed duration is the mechanism." },
          { key: "sprint-backlog", label: "Sprint backlog", x: 50, y: 43, does: "What the developers selected, plus their plan for it. Theirs to change during the sprint.", confusedWith: "The product backlog, which the product owner orders and which covers everything." },
          { key: "daily", label: "Daily scrum", x: 50, y: 58, does: "The developers re-planning the next day against the sprint goal.", confusedWith: "A status meeting, which transfers information and changes no plans." },
          { key: "increment", label: "Increment", x: 88, y: 50, does: "Something usable meeting the definition of done. The only honest evidence of progress.", confusedWith: "A demo, which can be assembled from work that is not actually finished." },
          { key: "feedback", label: "Review and retrospective", x: 50, y: 82, does: "Inspect the product, then the process, and let both change what happens next.", confusedWith: "A sign-off meeting, which inspects nothing and adapts nothing." },
        ],
        sequence: [
          { key: "refine", label: "Order and refine the product backlog", why: "Nothing can be selected sensibly from an unordered list, so this precedes planning rather than being part of it." },
          { key: "plan", label: "Planning sets a goal and selects work", why: "The goal comes first and the selection serves it. A sprint with items and no goal has nothing to steer by." },
          { key: "build", label: "Daily scrums while the work is built", why: "Re-planning runs throughout, which is what makes a sprint adaptive rather than a small waterfall." },
          { key: "review", label: "Review inspects the increment", why: "Product first, with stakeholders, because that is the feedback the next ordering decision needs." },
          { key: "retro", label: "Retrospective inspects the process", why: "Process last and separately, or it gets crowded out by discussion of the product." },
        ],
        minutes: 16,
        skills: ["Sprint", "Increment", "Product owner", "Definition of done"],
      },
    ],
  },
  5128: {
    topicId: 5128,
    title: "Kanban: flow, WIP limits and why they feel wrong",
    summary:
      "The only part of this course with a theorem behind it. Limit work in progress and cycle time falls, by a relationship you can compute and then check.",
    concepts: ["Work in progress", "Cycle time", "Throughput", "Littles law", "Bottleneck"],
    glossary: {
      "Work in progress": "Items started and not finished. The variable Kanban holds down.",
      "Cycle time": "How long one item takes from start to finish.",
      Throughput: "How many items finish per unit of time.",
      "Littles law": "In a stable system, cycle time equals work in progress divided by throughput.",
      Bottleneck: "The step that limits the whole system's throughput, wherever work piles up in front of it.",
    },
    body: {
      Beginner: `<p>Kanban has four parts: make the work visible, limit how much is in progress at once, watch how long things take, and improve from what you see. The second one is the part that does the work and the part teams remove.</p>
<h3>Why limiting work speeds it up</h3>
<p>This feels backwards. Starting fewer things cannot possibly finish more, until you notice that an item sitting half-done is not progress, it is inventory. Every started item occupies attention, goes stale, needs re-reading, and blocks somebody downstream who is waiting for it.</p>
<table>
<tr><th>Five items at once</th><th>Two items at once</th></tr>
<tr><td>Everything is in progress</td><td>Two are in progress, three are waiting</td></tr>
<tr><td>Nothing finishes for a long time</td><td>Something finishes soon</td></tr>
<tr><td>Switching between them constantly</td><td>Switching rarely</td></tr>
<tr><td>Problems surface at the end</td><td>Problems surface on the first item</td></tr>
</table>
<div class="key-idea"><span class="callout-label">The discomfort is the mechanism</span><p>When a column is full you cannot start anything new, so you go and help finish something. That reallocation is the entire intervention. A team that raises the limit whenever it binds has removed the effect and kept the board.</p></div>
<div class="warning"><span class="callout-label">Visible does not mean managed</span><p>Putting the work on a wall is step one and achieves nothing by itself. Plenty of teams have a beautiful board, no limits, and exactly the same delivery as before.</p></div>
<h3>Where to start</h3>
<p>Do not redesign the board. Count how many things are in progress right now, and count how many finished last week. Those two numbers give you everything in this topic, and most teams have never written either down.</p>
<h3>One number to start with</h3>
<p>Count the items currently in progress. If it is larger than the number of people, the team is almost certainly starting faster than it finishes, and that single observation justifies the rest of this topic.</p>`,
      Intermediate: `<p>Little's law states that cycle time equals work in progress divided by throughput, for any stable system. It is arithmetic rather than opinion, which makes Kanban the one part of this course where an argument can be settled by measurement.</p>
${FIG_WIP}
<h3>Using it</h3>
<p>A team with twelve items in progress finishing three per week has a cycle time of four weeks. Halve the work in progress to six, with throughput unchanged, and cycle time becomes two weeks. Nothing about the team changed; the queue got shorter.</p>
<table>
<tr><th>WIP</th><th>Throughput per week</th><th>Cycle time</th></tr>
<tr><td class="num">12</td><td class="num">3</td><td class="num">4 weeks</td></tr>
<tr><td class="num">6</td><td class="num">3</td><td class="num">2 weeks</td></tr>
<tr><td class="num">3</td><td class="num">3</td><td class="num">1 week</td></tr>
</table>
<div class="warning"><span class="callout-label">The stable qualifier matters</span><p>The law holds when arrivals and departures are roughly balanced over the period you measure. A team whose backlog is growing without limit is not stable, and the arithmetic will mislead. Measure over a period long enough to cover your normal variation, and treat a wildly growing queue as the thing to fix first.</p></div>
<h3>Where to put the limit</h3>
<p>Not on the board as a whole, which is too coarse to bind. Per column, so it exposes the specific step where work accumulates. The first limit is usually wrong and that is fine: set something slightly uncomfortable, watch where queues form, and move it.</p>
<p>A common starting point is roughly one and a half items per person in the active columns, then tightening. The goal is not the number; it is that the limit binds often enough to force conversations about finishing.</p>
<h3>Blocked items need their own treatment</h3>
<p>A blocked item still counts against the limit, which feels unfair and is correct: it is occupying a slot and somebody has to resolve it. Teams that exclude blocked items from the count remove the pressure that would have got them unblocked, and the board fills with parked work.</p>
<h3>Starting a limit from where you are</h3>
<p>Count current work in progress, set the limit slightly below it, and watch. If nothing changes the limit is too loose. If everything stops the limit is too tight or the work is too large. Both are information, arrived at in a week, and both are more useful than a number chosen from a book.</p>
<h3>Why cycle time beats estimates for promising a date</h3>
<p>An estimate is a guess about one item made before it starts. A cycle time distribution is a record of what happened to thirty comparable items. Promising from the second is both easier and more accurate, and it requires no estimation effort at all, which is why many mature teams drop sizing entirely once they have enough history.</p>
<h3>Limits apply to the column, not to people</h3>
<p>A limit of three means three items in that column, regardless of who is working on them. Teams that read it as three per person have removed the constraint entirely while believing they adopted it.</p>`,
      Advanced: `<p>Blocked items are the thing boards are worst at showing. An item sitting in a column for three weeks looks identical to one that arrived yesterday, so the ageing has to be made visible deliberately.</p>
<table>
<tr><th>Signal</th><th>Shows</th></tr>
<tr><td>A cumulative flow diagram</td><td>Where the band widens, which is where work accumulates</td></tr>
<tr><td>Item age on the card</td><td>Which specific item is stuck, now, before it is late</td></tr>
<tr><td>A cycle time scatter plot</td><td>The spread, not just the average</td></tr>
<tr><td>Blocked markers with a reason</td><td>Whether the blocker is internal or external</td></tr>
</table>
<p>The scatter plot matters more than the average. Two teams can both average ten days, one finishing everything between eight and twelve and the other between two and forty. The second cannot forecast anything, and the average conceals that completely.</p>
<h3>Forecasting from the distribution</h3>
<p>Once you have a few dozen completed items, the eighty-fifth percentile of cycle time is a far more useful commitment than an average or an estimate: most items will finish within it, and you can say so with a stated confidence. That is probabilistic forecasting, it requires no story points, and it is usually more accurate than estimation because it is measured rather than imagined.</p>
<div class="key-idea"><span class="callout-label">Bottlenecks move, so the limit must too</span><p>Fix the constraint at one step and it reappears at the next. A board whose limits were set once and never revisited is optimising for a bottleneck the team no longer has, which is why reviewing them is a standing item rather than a setup task.</p></div>
<h3>Two columns that change everything</h3>
<p>Split any column where work is handed over into doing and done. An item sitting in development done for four days is waiting, and a board without the split records it as being worked on. Most of the delay in a typical team is in those invisible waiting states rather than in the active ones, which is why the split usually produces a larger improvement than any amount of working faster.</p>
<h3>Why averages hide the problem</h3>
<p>Report cycle time as a distribution rather than a mean. The spread is what determines whether a commitment is safe, and two teams with the same average can be completely different to work with. A scatter plot of completed items takes minutes to produce and changes the conversation from how fast are we to how predictable are we.</p>
<h3>Aged work in progress is the report worth building</h3>
<p>A simple chart of every in-flight item by its current age, with your historical percentiles drawn across it, tells a team which card to act on today. Anything above the eighty-fifth percentile line is already unusual and will almost certainly be late. It is the only agile chart that prompts a decision rather than describing the past, and it takes an afternoon to build.</p>
<h3>Expedite, defined before it is needed</h3>
<p>Write down what qualifies as expedite while nobody is under pressure, and cap how many can be in flight. Both parts are necessary: a definition without a cap gets stretched, and a cap without a definition gets argued about at the worst moment.</p>
<h3>Measure at the point of commitment</h3>
<p>Decide where your cycle time clock starts and keep it fixed. Starting it at the moment work is pulled gives you the team's performance; starting it when the request arrived gives you the customer's experience. Both are legitimate, mixing them silently is not, and a team whose figures improved after quietly moving the start point has measured nothing.</p>`,
      Expert: `<p>Kanban arrives from manufacturing with queueing theory attached, and the theory explains things teams otherwise find mysterious. Utilisation and queue length are related non-linearly: as a resource approaches full utilisation, waiting time rises sharply rather than gradually.</p>
<p>That is why a team loaded to ninety-five per cent delivers dramatically worse than one loaded to eighty, and why the instinct to fill every hour of everyone's time produces slower delivery rather than more of it. Slack is not waste in a variable system; it is what keeps queues from exploding.</p>
<table>
<tr><th>Utilisation</th><th>Relative queue time</th></tr>
<tr><td class="num">50%</td><td>Low and stable</td></tr>
<tr><td class="num">80%</td><td>Noticeably longer</td></tr>
<tr><td class="num">95%</td><td>Dramatically longer, and volatile</td></tr>
</table>
<h3>Why this is the hardest idea to sell</h3>
<p>It contradicts an intuition that is correct in other settings. For predictable, uniform work, high utilisation is efficient. For variable work with dependencies, it is not, and software is firmly the second case. The argument that wins is usually the measurement rather than the theory: show the cycle time distribution before and after a WIP limit on the team's own data.</p>
<h3>Classes of service, used carefully</h3>
<p>Expedite lanes are legitimate and self-destructing if unbounded. The discipline is a hard cap, commonly one expedite item at a time, and a written definition of what qualifies. Without both, everything becomes urgent, the lane becomes the normal path, and the system reverts to having no limits at all with extra vocabulary.</p>
<div class="field"><span class="callout-label">What to measure first on a real team</span><p>Cycle time per item and work in progress, nothing else, for six weeks. Those two give you Little's law, a distribution to forecast from, and evidence for the WIP conversation. Teams that start by instrumenting everything produce a dashboard nobody reads; teams that start with two numbers usually change something.</p></div>
<h3>Variability is the hidden input</h3>
<p>Queueing behaviour depends not just on utilisation but on how variable arrivals and service times are. A team with highly variable item sizes experiences much longer queues at the same utilisation than one with uniform items, which is a second and independent argument for splitting large work: it reduces variability as well as batch size.</p>
<table>
<tr><th>Lever</th><th>Effect on cycle time</th></tr>
<tr><td>Lower WIP</td><td>Direct and immediate</td></tr>
<tr><td>Lower utilisation</td><td>Large, non-linear near saturation</td></tr>
<tr><td>Lower variability in item size</td><td>Substantial, and usually ignored</td></tr>
</table>
<h3>What to do when throughput is the constraint</h3>
<p>Limiting WIP reduces cycle time and does not by itself increase throughput. If the team genuinely needs more output, that comes from removing the bottleneck, which may be a skill held by one person, an approval step, or a dependency on another team. Confusing the two produces a team with excellent cycle time that still cannot deliver enough, and a manager who concludes the method failed.</p>
<h3>Little's law has conditions, and they matter</h3>
<p>It holds for a stable system over a period where arrivals and departures roughly balance, with a consistent definition of what counts as in progress. Teams that apply it to a quarter in which the backlog doubled get a number that means nothing. Checking stability first, usually by looking at whether the cumulative flow bands are parallel, is the step that separates using the law from quoting it.</p>
<h3>What the method does not address</h3>
<p>Kanban says nothing about whether you are building the right thing. It will make a team efficient at delivering work nobody wanted, and it will do so visibly and measurably. Pairing it with a feedback mechanism, whether that is a review cadence or direct customer contact, is not optional, and the method's silence on this is the strongest argument for the hybrids most teams end up running.</p>
<h3>Flow efficiency is the uncomfortable ratio</h3>
<p>Active time divided by total elapsed time. Most knowledge work sits well under twenty per cent, meaning an item spends the overwhelming majority of its life waiting rather than being worked on. Teams that measure it usually stop trying to work faster, because the number makes clear that speed was never the constraint.</p>`,
    },
    questions: [
      { n: 1, question: "A team halves its work in progress and throughput stays the same. What happens to cycle time?", options: ["It halves", "It stays the same", "It doubles", "It cannot be predicted"], answer: 0, explanation: "Little's law: cycle time equals work in progress divided by throughput, so halving the numerator with the denominator unchanged halves the result. It is arithmetic rather than a heuristic, which is why this is the one claim in the course a team can verify against their own data. The qualifier is stability: if the backlog is growing without limit the system is not stable and the law will mislead.", difficulty: "Medium", skill: "Littles law" },
      { n: 2, question: "Why does a WIP limit need to bind to work?", options: ["Being unable to start forces people to help finish, which is the whole intervention", "It makes the board tidier", "It reduces the number of meetings", "It prevents new work from being requested"], answer: 0, explanation: "The reallocation of effort toward finishing is the mechanism, and it only happens when the limit stops somebody starting something. A limit raised whenever it binds is a label on a column. This is also why the discomfort is the signal rather than the problem, and why teams that optimise it away keep the vocabulary and lose the effect.", difficulty: "Easy", skill: "Work in progress" },
      { n: 3, question: "Two teams both average ten days cycle time. One ranges 8 to 12, the other 2 to 40. What does the average hide?", options: ["Predictability, which is what a commitment actually depends on", "Throughput, which differs between them", "The number of people on each team", "Which team has more work in progress"], answer: 0, explanation: "The average is identical and the two teams are not comparable. The first can promise twelve days and be right nearly always; the second cannot promise anything, because a given item might take two days or forty. This is why a cycle time scatter plot is more useful than a mean, and why the eighty-fifth percentile makes a better commitment than an estimate.", difficulty: "Hard", skill: "Cycle time" },
      { n: 4, question: "Why does a team loaded to 95 per cent deliver worse than one at 80 per cent?", options: ["Queue time rises non-linearly as utilisation approaches full", "They have less time for meetings", "High utilisation causes more defects", "The relationship is linear, so it does not"], answer: 0, explanation: "Queueing theory: as a resource approaches saturation, waiting time rises sharply rather than proportionally, because any variation has no slack to absorb it. This is why filling every hour produces slower delivery rather than more of it, and why slack is not waste in a variable system. The intuition that high utilisation is efficient holds for predictable uniform work, which software is not.", difficulty: "Hard", skill: "Throughput" },
      { n: 5, question: "What makes an expedite lane self-destructing?", options: ["Without a hard cap and a written definition, everything becomes urgent", "It is forbidden by the method", "It requires a separate board", "It only works for defects"], answer: 0, explanation: "An unbounded fast path is used until it is the normal path, at which point the system has no limits again with extra vocabulary. The discipline is a hard cap, commonly one expedite item at a time, plus a written definition of what qualifies, agreed before anybody is under pressure. Classes of service are legitimate; what fails is introducing one without the constraint that makes it meaningful.", difficulty: "Medium", skill: "Bottleneck" },
      { n: 6, question: "What should a team measure first when adopting Kanban?", options: ["Cycle time per item and work in progress, and nothing else", "Velocity and story points", "Utilisation per person", "Number of items in the backlog"], answer: 0, explanation: "Those two give you Little's law, a distribution to forecast from, and the evidence for the WIP conversation, which is almost everything the method needs. Teams that instrument broadly produce a dashboard nobody reads. Per-person utilisation is actively counterproductive here, because it encourages the high-utilisation behaviour the method exists to discourage.", difficulty: "Medium", skill: "Work in progress" },
    ],
    worksheets: [
      {
        n: 1,
        title: "Apply Little's law, then set the limits",
        difficulty: "Medium",
        brief: `<p>A team of five has measured six weeks of delivery. Work in progress has averaged 15 items and they finish 5 items per week.</p>
<p>Compute cycle time now, then for two reduced WIP levels, assuming throughput holds. Then total the three cycle times as a check figure.</p>
<table>
<tr><th>Known</th><th>Value</th></tr>
<tr><td>Current work in progress</td><td class="num">15 items</td></tr>
<tr><td>Throughput</td><td class="num">5 items per week</td></tr>
</table>
<div class="key-idea"><span class="callout-label">Throughput is assumed constant on purpose</span><p>In practice it usually improves when WIP falls, because less switching and less stale work. Holding it fixed makes the arithmetic clean and makes the answer a conservative floor rather than an optimistic claim.</p></div>`,
        stubLabel: "Scenario",
        columns: [
          { key: "wip", label: "WIP", type: "number", align: "right" },
          { key: "tput", label: "Throughput", type: "number", align: "right" },
          { key: "ct", label: "Cycle time (weeks)", type: "number", align: "right" },
        ],
        rows: [
          { key: "now", label: "Today" },
          { key: "cut", label: "WIP cut to 10" },
          { key: "tight", label: "WIP cut to 5" },
          { key: "total", label: "Sum of the three cycle times", kind: "total" },
        ],
        cells: [
          { row: "now", col: "wip", expected: 15, marks: 1 },
          { row: "now", col: "tput", expected: 5, marks: 1 },
          { row: "now", col: "ct", expected: 3, marks: 2, derivedFrom: { op: "quotient", from: ["now:wip", "now:tput"] }, methodMarks: 1, feedback: "Fifteen items divided by five per week is three weeks." },
          { row: "cut", col: "wip", expected: 10, marks: 1 },
          { row: "cut", col: "tput", expected: 5, marks: 1 },
          { row: "cut", col: "ct", expected: 2, marks: 2, derivedFrom: { op: "quotient", from: ["cut:wip", "cut:tput"] }, methodMarks: 1 },
          { row: "tight", col: "wip", expected: 5, marks: 1 },
          { row: "tight", col: "tput", expected: 5, marks: 1 },
          { row: "tight", col: "ct", expected: 1, marks: 2, derivedFrom: { op: "quotient", from: ["tight:wip", "tight:tput"] }, methodMarks: 1 },
          { row: "total", col: "ct", expected: 6, marks: 2, derivedFrom: { op: "sum", from: ["now:ct", "cut:ct", "tight:ct"] }, methodMarks: 1 },
        ],
        invariants: [
          { key: "t-ct", label: "The check figure equals the three cycle times added", kind: "cell-is-column-sum", cols: ["ct"], cell: "total:ct", marks: 2, hint: "The total row is excluded from its own sum: add the three scenario rows in the cycle time column." },
        ],
        hints: [
          "Cycle time is work in progress divided by throughput. Both are already given per row.",
          "Throughput is the same in all three rows, because the exercise holds it constant.",
          "The three cycle times are 3, 2 and 1 weeks, and the check figure adds them.",
        ],
        workedAnswer: `<h3>The marked sheet</h3>
<table>
<tr><th>Scenario</th><th class="num">WIP</th><th class="num">Throughput</th><th class="num">Cycle time</th></tr>
<tr><td>Today</td><td class="num">15</td><td class="num">5</td><td class="num">3 weeks</td></tr>
<tr><td>WIP cut to 10</td><td class="num">10</td><td class="num">5</td><td class="num">2 weeks</td></tr>
<tr><td>WIP cut to 5</td><td class="num">5</td><td class="num">5</td><td class="num">1 week</td></tr>
<tr><th>Check figure</th><th class="num"></th><th class="num"></th><th class="num">6</th></tr>
</table>
<h3>What this buys the team</h3>
<p>Cutting work in progress by two thirds takes an item from three weeks to one, with no change in how fast anybody works and no new tooling. The team finishes the same five items per week throughout; what changes is how long each one waits.</p>
<div class="worked"><span class="callout-label">And the real answer is better than this</span><p>Throughput was held constant to keep the arithmetic clean, and in practice it usually rises when WIP falls, because there is less context switching, less stale work to re-read, and fewer half-finished items going out of date. So one week is a conservative floor rather than an optimistic target.</p></div>
<div class="field"><span class="callout-label">How to run the conversation</span><p>Do not argue the theory. Measure your own WIP and throughput for six weeks, compute the current cycle time, and show that the number matches what people already feel. Once the model predicts the present correctly, its prediction about a lower WIP is much harder to dismiss, and you have turned a philosophical argument into an experiment with a date on it.</p></div>`,
        minutes: 18,
        skills: ["Littles law", "Work in progress", "Cycle time", "Throughput"],
      },
    ],
  },
  5129: {
    topicId: 5129,
    title: "Extreme programming: the practices nobody adopted",
    summary:
      "The framework that made the strongest engineering claims and spread least, because its practices cost something the ceremonies do not.",
    concepts: ["Test first", "Continuous integration", "Refactoring", "Pair programming", "Collective ownership"],
    glossary: {
      "Test first": "Writing a failing test before the code that makes it pass.",
      "Continuous integration": "Merging everyone's work to a shared trunk many times a day, with automated verification.",
      Refactoring: "Changing structure without changing behaviour, continuously rather than as a project.",
      "Pair programming": "Two people, one piece of work, continuous review as it is written.",
      "Collective ownership": "Anyone may change any part of the code, so no module has a single gatekeeper.",
    },
    body: {
      Beginner: `<p>Extreme programming is not about meetings. It is a set of engineering practices designed to keep the cost of changing software flat as the software grows, which is the thing that normally does not happen.</p>
<h3>The practices you will hear about</h3>
<table>
<tr><th>Practice</th><th>What it is for</th></tr>
<tr><td>Write the test first</td><td>Forces you to decide what done means before you start</td></tr>
<tr><td>Integrate continuously</td><td>Keeps merges tiny, so conflicts stay small</td></tr>
<tr><td>Refactor constantly</td><td>Stops structure decaying faster than it is repaired</td></tr>
<tr><td>Pair on the work</td><td>Review happens as it is written, not days later</td></tr>
<tr><td>Everyone owns all the code</td><td>No single person becomes a bottleneck</td></tr>
</table>
<h3>Why they reinforce each other</h3>
<p>Refactoring without tests is dangerous, because you cannot tell whether behaviour changed. Continuous integration without tests just merges broken code faster. Collective ownership without tests means anyone can break anything. The tests are the foundation and the rest sits on them, which is why adopting one practice in isolation often disappoints.</p>
<div class="key-idea"><span class="callout-label">The claim worth remembering</span><p>In most projects the cost of a change rises over time, so late changes are feared. XP is a bet that with the right practices that curve can be kept flat, which is what makes responding to change affordable rather than merely desirable.</p></div>
<div class="warning"><span class="callout-label">This is the part no ceremony can substitute for</span><p>A team with a slow, flaky test suite and a long-lived branch will not become responsive by holding a stand-up. The constraint is technical, and only technical work moves it.</p></div>
<h3>Why this topic sits in a project management course</h3>
<p>Because the constraint is often technical and the response is usually procedural. A team that cannot change its code quickly will not become responsive by changing its meetings, and recognising that is a planning decision rather than an engineering one.</p>`,
      Intermediate: `<p>XP spread least of the three and made the strongest claims, and the reason is cost. Scheduling a meeting costs calendar time. Writing tests first costs a change in how every engineer works, every day, and it is slower before it is faster.</p>
${FIG_XP_ORDER}
<h3>What each practice actually buys</h3>
<table>
<tr><th>Practice</th><th>Buys</th><th>Costs</th></tr>
<tr><td>Test first</td><td>A regression net, and clearer design</td><td>Slower for the first few weeks</td></tr>
<tr><td>Continuous integration</td><td>Small conflicts, early breakage</td><td>Discipline, and a fast build</td></tr>
<tr><td>Refactoring</td><td>Structure that keeps up with the code</td><td>Visible time not spent on features</td></tr>
<tr><td>Pairing</td><td>Review, knowledge spread, fewer defects</td><td>Two people on one task, which reads as inefficient</td></tr>
</table>
<div class="key-idea"><span class="callout-label">Every cost is immediate and visible; every benefit is deferred and diffuse</span><p>That asymmetry, rather than disagreement about the benefits, is why these practices lose budget arguments. The team that skipped tests looks faster for about two months, and the comparison is never run again after that.</p></div>
<h3>Continuous integration means something specific</h3>
<p>It is not a build server. It is everyone merging to a shared trunk at least daily, with automated verification on every merge. A team with a CI server and three-week feature branches does not have continuous integration; it has automated builds of code that has not been integrated, which is a different and much weaker thing.</p>
<div class="warning"><span class="callout-label">A flaky test suite is worse than no suite</span><p>If failures are routinely ignored because they are often spurious, the suite has stopped being a signal and is now a tax. Fixing or deleting flaky tests is higher value than adding new ones, and teams consistently do the opposite.</p></div>
<h3>The practices nobody argues with any more</h3>
<p>Automated testing, continuous integration and short release cycles were contentious when XP proposed them and are now close to industry defaults. That is worth noticing when somebody describes XP as discredited: most of it won, quietly, and the brand disappeared.</p>
<h3>What is still contested</h3>
<p>Pairing and test-first remain minority practices with genuinely mixed evidence. The honest position is that both suit some work and some people considerably better than others, that mandating either universally produces resentment, and that banning them loses a useful tool. Keeping both available and letting the work decide is defensible; insisting either way is not well supported.</p>
<h3>Why the costs are visible and the benefits are not</h3>
<p>Writing a test takes time you can watch. The defect it prevents in four months is invisible, because it never happens. Every XP practice has that shape, which is why they lose budget arguments to work with legible output, and why the team that skipped tests looks faster for about two months.</p>
<h3>Collective ownership needs the net first</h3>
<p>Letting anybody change anything is only safe when the tests catch what they break. Without that it becomes collective fear, the team reverts to informal gatekeeping, and nobody can say who decides. The order is the net, then the policy.</p>`,
      Advanced: `<p>Test-driven development is usually sold as a testing practice and is mostly a design practice. Writing the test first forces you to use the interface before you build it, which surfaces awkward dependencies immediately and tends to produce smaller, more separable units because those are the ones that are easy to set up in a test.</p>
<table>
<tr><th>What people expect</th><th>What it mostly delivers</th></tr>
<tr><td>Fewer defects</td><td>Some, and the evidence is mixed</td><td></td></tr>
<tr><td>A safety net</td><td>Yes, and this is reliable</td><td></td></tr>
<tr><td>Better design</td><td>Yes, through the feedback of using the interface first</td><td></td></tr>
<tr><td>Faster delivery immediately</td><td>No. It is slower first.</td><td></td></tr>
</table>
<h3>Pairing, and why it is argued about</h3>
<p>The objection is that two people on one task halves output. The response is that review, knowledge transfer and defect prevention happen inside the activity rather than after it, so the comparison should be against the full cost of the alternative, including the review queue and the bus factor. The honest position is that the evidence is mixed, it suits some work and some people far better than others, and mandating it universally produces resentment while banning it loses a genuinely useful tool.</p>
<div class="key-idea"><span class="callout-label">The strongest case for pairing is onboarding and hard problems</span><p>Those two uses are rarely disputed even by sceptics, and they are enough to justify keeping it available. Treating it as a default for all work is where the argument usually starts.</p></div>
<h3>Collective ownership needs the net</h3>
<p>Letting anybody change anything is only safe when the tests will catch what they break. Without that, collective ownership degrades into collective fear, and the team reverts to informal gatekeeping with no record of who decides. The sequence matters: the net comes first, the ownership policy second.</p>
<h3>The on-site customer is the practice whose absence hurts most</h3>
<p>XP assumed somebody available to answer questions about what to build. Almost nobody does this, and the substitute is a product owner in meetings plus a ticket queue, which reintroduces exactly the latency the practice removed. A large share of what teams experience as unclear requirements is the gap left by this single unadopted practice, and it is usually diagnosed as a documentation problem instead.</p>
<h3>Refactoring as maintenance rather than as a project</h3>
<p>A refactoring project is a sign the continuous version stopped happening. Structure decays a little with every change, and repairing it continuously costs a few per cent of ongoing effort, while repairing it in a block costs a quarter and competes with features. Teams that reserve a standing share rather than requesting occasional permission avoid the cycle entirely.</p>
<h3>Test-first changes design before it changes defect counts</h3>
<p>Writing the test first forces you to use the interface before building it, so awkward dependencies surface immediately rather than after the code exists. That tends to produce smaller, more separable units, because those are the ones that are easy to set up in a test. Teams adopting it for defect reduction and measuring only defects frequently conclude it did nothing, having not looked at the thing it most reliably changes.</p>
<h3>Pairing is strongest where it is least disputed</h3>
<p>Onboarding and genuinely hard problems. Those two uses are accepted even by sceptics and are enough to keep the practice available. Treating it as the default for all work is where the argument starts, and the evidence does not support insisting either way.</p>`,
      Expert: `<p>What has survived from XP is interesting. The specific brand largely disappeared and several of its practices became industry defaults, usually without attribution: continuous integration, automated testing, short release cycles, refactoring as routine work rather than as a project.</p>
<table>
<tr><th>Practice</th><th>Status today</th></tr>
<tr><td>Continuous integration</td><td>Mainstream, often in name only</td></tr>
<tr><td>Automated testing</td><td>Mainstream</td></tr>
<tr><td>Refactoring</td><td>Widely accepted in principle</td></tr>
<tr><td>Test-first specifically</td><td>Minority practice</td></tr>
<tr><td>Pair programming</td><td>Minority, contested</td></tr>
<tr><td>On-site customer</td><td>Rare, and the gap is keenly felt</td></tr>
</table>
<p>The pattern is that practices which could be bought as tooling were adopted and practices requiring a change in daily behaviour were not. That is a statement about how organisations absorb change rather than about the merits.</p>
<h3>Where the evidence is strongest</h3>
<p>The delivery research that replicates most consistently points at trunk-based development, automated testing and deployment automation as predictors of both throughput and stability, which is close to the XP engineering core without the social practices. That is the most defensible claim available: the technical half has support, and the social half remains contested.</p>
<h3>The on-site customer, and why its absence hurts</h3>
<p>XP assumed somebody who could answer questions about what to build, present and available. Almost nobody does this, and the substitute is a product owner in meetings plus a ticketing system, which reintroduces exactly the latency the practice existed to remove. A great deal of what teams experience as unclear requirements is the gap left by this one unadopted practice.</p>
<div class="field"><span class="callout-label">If a team can change one thing</span><p>Make the build fast and trustworthy, and merge to trunk daily. Those two unlock the others: refactoring becomes safe, collective ownership becomes tenable, and feedback arrives in minutes rather than weeks. Teams that start with pairing or with test-first against a slow unreliable suite usually abandon both, and conclude the practices do not work when what failed was the order.</p></div>
<h3>Sustainable pace is the forgotten practice</h3>
<p>XP specified a sustainable working week, and it is the practice most quietly dropped. The argument was not welfare but output quality: tired people produce defects that cost more than the hours gained, so overtime borrows from the following month at a poor rate. The evidence on sustained overtime is consistent enough that treating it as a scheduling decision rather than a wellbeing one is the more persuasive framing in most organisations.</p>
<h3>Why the technical half has better evidence than the social half</h3>
<p>Deployment frequency, lead time and change failure rate are measurable from systems rather than from self-report, which makes the research on them far stronger. Pairing and test-first require observing behaviour and controlling for teams, which is where the evidence thins. That asymmetry in measurability, rather than any difference in merit, is most of why the two halves are discussed with such different levels of confidence.</p>
<h3>Trunk-based development is the practice with the strongest support</h3>
<p>Of everything in this topic, merging to a shared trunk at least daily has the most consistent evidence behind it across large datasets, predicting both throughput and stability. It is also the one most often claimed and least often practised, because a team with a CI server and three-week branches will describe itself as doing continuous integration. The measurable version of the question is simply how old the oldest unmerged branch is, and that number is usually available in seconds.</p>
<h3>The flaky test is a governance problem</h3>
<p>Once failures are routinely ignored, the suite has stopped being a signal and nobody owns restoring it, because fixing flakiness is never the most urgent thing in any given week. The fix is structural rather than technical: a standing rule that a flaky test is deleted or quarantined the day it is noticed, so the suite's trustworthiness cannot decay gradually while everyone agrees it is a shame.</p>
<h3>What survived, and why that is the interesting result</h3>
<p>The practices that could be bought as tooling became industry defaults; the ones requiring every engineer to work differently each day did not. That is a statement about how organisations absorb change rather than about relative merit, and it predicts which parts of any future methodology will spread.</p>`,
    },
    questions: [
      { n: 1, question: "Why does adopting one XP practice in isolation often disappoint?", options: ["They reinforce each other, and most of them depend on the test suite", "They must be adopted alphabetically", "The method forbids partial adoption", "Each requires separate tooling"], answer: 0, explanation: "Refactoring without tests is unsafe because you cannot tell whether behaviour changed. Continuous integration without tests merges broken code faster. Collective ownership without tests means anyone can break anything unnoticed. The suite is the foundation the others stand on, which is why order matters and why a team that starts elsewhere often concludes the practices do not work when what failed was the sequence.", difficulty: "Medium", skill: "Test first" },
      { n: 2, question: "A team has a CI server and three-week feature branches. Do they have continuous integration?", options: ["No. Integration means merging to a shared trunk at least daily", "Yes, that is what a CI server provides", "Yes, provided the build passes", "Only if they also pair"], answer: 0, explanation: "The practice is about merge frequency, not about owning a build server. Automated builds of code that has not been integrated for three weeks give you fast feedback on an isolated branch and tell you nothing about whether the work combines, so the conflicts arrive at the end exactly as they would have without it. This is among the most commonly claimed and least commonly practised items in the whole field.", difficulty: "Medium", skill: "Continuous integration" },
      { n: 3, question: "What does test-driven development most reliably deliver?", options: ["A regression net and design feedback from using the interface first", "A large reduction in defects, consistently shown in studies", "Faster delivery from the first week", "Elimination of the need for other testing"], answer: 0, explanation: "The safety net is reliable and the design effect is the underrated one: writing the test first makes you use the interface before building it, which surfaces awkward dependencies immediately and pushes toward smaller separable units. The defect evidence is genuinely mixed rather than overwhelming, and it is slower before it is faster, so overselling either is how the practice gets abandoned after a month.", difficulty: "Hard", skill: "Test first" },
      { n: 4, question: "Why is a flaky test suite worse than no suite?", options: ["Failures get ignored, so it costs time while providing no signal", "It runs more slowly", "It uses more compute", "It prevents deployment"], answer: 0, explanation: "A suite whose failures are routinely spurious trains everybody to re-run rather than investigate, at which point a real failure is indistinguishable from noise. You are paying the full cost in time and attention and receiving no information. Fixing or deleting flaky tests therefore has higher value than adding new ones, and teams consistently do the opposite because adding feels like progress.", difficulty: "Medium", skill: "Continuous integration" },
      { n: 5, question: "Why did XP's tooling practices spread while its social practices did not?", options: ["Tooling can be bought; changing daily behaviour cannot", "The social practices were disproved", "Tooling practices are more valuable", "Certification covered only tooling"], answer: 0, explanation: "Continuous integration, automated testing and deployment automation can be adopted by procuring and configuring something, so they fit how organisations normally absorb change. Test-first and pairing require every engineer to work differently every day, which no purchase achieves. That is an observation about adoption mechanics rather than about merit, and it explains the pattern better than any claim about which practices work.", difficulty: "Hard", skill: "Pair programming" },
      { n: 6, question: "What is the strongest first move for a team wanting XP's benefits?", options: ["Make the build fast and trustworthy, and merge to trunk daily", "Start pairing on all work", "Mandate test-first for every change", "Introduce collective ownership"], answer: 0, explanation: "Those two unlock the rest: refactoring becomes safe, collective ownership becomes tenable, and feedback arrives in minutes instead of weeks. Starting with pairing or test-first against a slow, unreliable suite usually ends with both abandoned, because the feedback loop they depend on is not there yet. The sequence is the practical content of this topic.", difficulty: "Medium", skill: "Refactoring" },
    ],
    scenarios: [
      {
        n: 1,
        title: "The suite nobody trusts",
        blurb: "Forty minutes to run, fails about a third of the time for no reason, and the team has stopped reading it. You have been asked to make the team faster.",
        role: "You are the tech lead on a team of six, three months into a product nobody wants to slow down.",
        start: "n1",
        minutes: 12,
        idealPath: ["n1", "n2", "n3", "end-ideal"],
        nodes: [
          {
            id: "n1",
            situation: `<p>The build takes forty minutes. Roughly one run in three fails for reasons unrelated to the change, so everybody re-runs it until it passes. Two people have started merging without waiting.</p><p>Your manager has asked you to improve delivery speed and offered you a sprint of capacity.</p>`,
            prompt: "Where do you spend the sprint?",
            choices: [
              { id: "a", label: "Fix the flaky tests and cut the build time", outcome: "Unglamorous, and it restores the signal everything else depends on. Within two weeks people stop re-running and start reading failures again.", next: "n2", delta: 3 },
              { id: "b", label: "Add more tests, since coverage is low", outcome: "Coverage rises and so does the run time. The flake rate is unchanged, so the new tests are ignored alongside the old ones.", next: "n2", delta: -2, cost: { minutes: 2400 } },
              { id: "c", label: "Introduce pairing to catch defects earlier", outcome: "A reasonable practice landing on an unreliable foundation. Pairs still cannot tell whether a failure is real, and the team resents the change.", next: "n2", delta: -1 },
            ],
          },
          {
            id: "n2",
            situation: `<p>The suite is now eleven minutes and the flake rate is under two per cent. People are reading failures again.</p><p>You notice the two longest-lived branches are nineteen and twenty-six days old.</p>`,
            prompt: "What next?",
            choices: [
              { id: "a", label: "Get both branches merged, then agree a daily merge rule", outcome: "Both merges are painful, which is the argument. With a trustworthy build, daily merging becomes cheap and the pain does not recur.", next: "n3", delta: 3 },
              { id: "b", label: "Leave the branches; they are nearly done", outcome: "One lands two weeks later with a day of conflict resolution and a regression the suite would have caught on day two.", next: "n3", delta: -2, cost: { minutes: 900 } },
              { id: "c", label: "Add a merge-queue tool", outcome: "It serialises merges, which helps a little. The branches are still weeks old, so the conflicts are the same size when they arrive.", next: "n3", delta: 0 },
            ],
          },
          {
            id: "n3",
            situation: `<p>Build is fast, trunk is current, and the team is visibly quicker. Your manager asks what to do with the next sprint of capacity.</p>`,
            prompt: "What do you ask for?",
            choices: [
              { id: "a", label: "Keep a standing allocation for this work, and say what it bought", outcome: "You show the build time, the flake rate and the merge age before and after, and ask for a continuing share rather than another one-off.", next: "end-ideal", delta: 3 },
              { id: "b", label: "Declare it finished and return all capacity to features", outcome: "Within four months the suite is slow again, because nothing was reserved to keep it fast.", next: "end-poor", delta: -3 },
            ],
          },
          {
            id: "end-ideal",
            situation: "<p>Done.</p>",
            prompt: "",
            ending: {
              verdict: "ideal",
              title: "You fixed the foundation before building on it",
              debrief: `<p>Every option you turned down was a legitimate practice. Pairing, more tests and a merge queue are all good things, and all three were going to fail because the feedback loop underneath them was broken.</p>
<p>The order is the content of this topic. A trustworthy, fast build is what makes refactoring safe, collective ownership tenable and daily merging cheap. Teams that start anywhere else usually abandon the practice and conclude it does not work, when what failed was the sequence.</p>
<div class="key-idea"><span class="callout-label">And the last choice is the one that makes it stick</span><p>Technical health decays unless something reserves capacity for it. Reporting what the sprint bought, in numbers, is how you get that allocation made standing rather than exceptional.</p></div>`,
            },
          },
          {
            id: "end-poor",
            situation: "<p>Done.</p>",
            prompt: "",
            ending: {
              verdict: "poor",
              title: "You fixed it once, and did not change what caused it",
              debrief: `<p>The work was right and it was treated as a project rather than as maintenance. Suites get slower because tests are added faster than they are pruned, and branches get older because merging is nobody's explicit job. Both resume the moment the attention stops.</p>
<p>The ask that would have held is a standing share of capacity, justified with the before-and-after numbers you had in hand. Without it the next person to notice will be asking for the same sprint in a year, and the argument will start from zero again.</p>`,
            },
          },
        ],
        skills: ["Continuous integration", "Refactoring", "Test first"],
      },
    ],
  },
  5130: {
    topicId: 5130,
    title: "Estimation, velocity and the numbers that lie",
    summary:
      "Story points are not units, velocity is not productivity, and the most accurate forecast on most teams needs no estimates at all.",
    concepts: ["Story point", "Velocity", "Forecasting", "Goodharts law", "Relative sizing"],
    glossary: {
      "Story point": "A relative size, meaningful only within one team and only against their own past items.",
      Velocity: "Points completed per sprint. A capacity planning input, not a measure of output.",
      Forecasting: "Predicting a completion date with a stated confidence, ideally from measured history.",
      "Goodharts law": "When a measure becomes a target, it stops being a good measure.",
      "Relative sizing": "Judging items against each other rather than estimating absolute time.",
    },
    body: {
      Beginner: `<p>People are poor at estimating how long something will take and considerably better at saying whether one thing is bigger than another. Relative sizing is built on that difference.</p>
<h3>How points are supposed to work</h3>
<p>Pick a smallish item everybody understands and call it a two. Size everything else against it. After a few sprints you know roughly how many points the team finishes, and you can use that to plan the next one.</p>
<table>
<tr><th>Points</th><th>Means</th></tr>
<tr><td class="num">1</td><td>Smaller than the reference item</td></tr>
<tr><td class="num">2</td><td>About the reference item</td></tr>
<tr><td class="num">5</td><td>Noticeably bigger, more unknowns</td></tr>
<tr><td class="num">13</td><td>Too big. Split it before committing.</td></tr>
</table>
<div class="key-idea"><span class="callout-label">Points are not hours and do not convert</span><p>The moment a team agrees that a point is about half a day, they have reinvented hour estimates with an extra translation step, and lost the one property that made relative sizing useful.</p></div>
<div class="warning"><span class="callout-label">Velocity does not compare across teams</span><p>Two teams with the same velocity may be doing wildly different amounts of work, because each calibrated their scale independently. Comparing them is meaningless, and using velocity as a performance measure guarantees the numbers inflate.</p></div>
<h3>Why relative sizing works at all</h3>
<p>People are poor at absolute estimates and reasonably good at comparisons. Asked how long something will take, most of us describe the version where nothing goes wrong. Asked whether this is bigger than that, we are much more reliable, and relative sizing is built entirely on that difference.</p>
<h3>Sizes should be coarse</h3>
<p>A scale with gaps, such as 1, 2, 3, 5, 8, forces a choice rather than inviting false precision. Arguing whether something is a six or a seven is spending time where the uncertainty is not, and any item reaching the top of the scale should be split rather than sized.</p>`,
      Intermediate: `<p>Velocity is a planning input. It tells one team roughly how much to pull into the next sprint, given their own recent history. It is not output, it is not productivity, and it does not travel.</p>
${FIG_VELOCITY}
<h3>What happens when it becomes a target</h3>
<p>Points are defined by the team, so a team asked to raise velocity can do so without changing anything real. This is Goodhart's law operating with unusual speed, because the measure is not merely gameable, it is defined by the people being measured.</p>
<table>
<tr><th>Pressure applied</th><th>Predictable response</th></tr>
<tr><td>Raise velocity</td><td>Estimates inflate</td></tr>
<tr><td>Hit the sprint commitment</td><td>Padding, and smaller commitments</td></tr>
<tr><td>Reduce carry-over</td><td>Definition of done quietly relaxes</td></tr>
<tr><td>Compare teams</td><td>All scales drift upward</td></tr>
</table>
<div class="key-idea"><span class="callout-label">None of this requires anybody to behave dishonestly</span><p>The adjustments are small, individually defensible and made under pressure. That is why the failure is structural rather than a matter of integrity, and why the remedy is to stop using the number that way rather than to ask people to be more rigorous.</p></div>
<h3>Counting items is usually as good</h3>
<p>For most teams the number of items finished per sprint is about as predictive as the number of points, because item sizes cluster once anything large is split. Teams that measure both for a quarter frequently find the estimation effort bought them very little, which is the most common path to dropping it.</p>
<h3>What velocity is legitimately for</h3>
<p>One team, planning their own next sprint, using their own recent average. That is the entire valid use. It is not a measure of output, it does not compare between teams, and it should not appear in any report that aggregates teams, because each scale was calibrated independently and the comparison is arithmetic on incompatible units.</p>
<h3>The three-sprint rolling average</h3>
<p>Use a rolling average rather than the last sprint, which will be unrepresentative for ordinary reasons: leave, an incident, one unusually large item. Teams that plan from a single sprint oscillate, over-committing after a good one and under-committing after a bad one, and read the oscillation as instability in the work.</p>
<h3>Planning poker is mostly a conversation device</h3>
<p>The number is the visible output and the argument is the valuable one. When two people give wildly different sizes, what follows usually reveals that they understood the item differently, which is scope discovered before the sprint rather than during it. Teams that drop estimation entirely sometimes lose this and only notice when surprises start arriving mid-sprint.</p>
<h3>Re-estimating mid-sprint achieves nothing</h3>
<p>The estimate was an input to a decision already taken. Changing it does not change the work and does not improve the forecast, because the forecast should be coming from measured throughput rather than from the sum of current estimates. Teams that re-estimate are usually trying to make a burndown look right, which is managing the chart rather than the work.</p>`,
      Advanced: `<p>Probabilistic forecasting replaces the estimate with measured history. Take the last thirty completed items, look at how long each took, and read the distribution. The eighty-fifth percentile is a commitment you can defend with a number rather than a feeling.</p>
<table>
<tr><th>Approach</th><th>Input</th><th>Output</th></tr>
<tr><td>Estimate and sum</td><td>Opinions about the future</td><td>A single date, usually optimistic</td></tr>
<tr><td>Velocity planning</td><td>Points per sprint</td><td>A sprint-level capacity figure</td></tr>
<tr><td>Probabilistic forecast</td><td>Measured cycle times</td><td>A date with a confidence attached</td></tr>
</table>
<p>The third is both more honest and usually more accurate, because it is derived from what actually happened rather than from what people expected before they started.</p>
<h3>Why estimates are biased in a predictable direction</h3>
<p>People estimate the path where nothing goes wrong, because that is the version they can picture. Interruptions, reviews, environment problems and the second round of feedback are all real and none of them appear in the mental simulation. This is why multiplying an estimate by a constant works surprisingly well and why the constant is stable per team, which is itself a hint that measurement would serve better than estimation.</p>
<div class="key-idea"><span class="callout-label">The single most useful question in planning</span><p>What is the largest item here, and can it be split? Large items carry most of the variance, so splitting them improves forecast accuracy more than any amount of refining the estimates on small ones.</p></div>
<h3>Monte Carlo, briefly</h3>
<p>Given a history of completed items, you can simulate the remaining work many times by sampling from that history, and read a distribution of completion dates rather than a single one. It needs no estimates, it takes a spreadsheet, and it produces a statement of the form we are eighty-five per cent likely to finish by this date, which is both more honest and more useful than a point estimate.</p>
<h3>Why a date with a confidence lands better than a range</h3>
<p>A range invites the reader to pick the optimistic end, and they reliably do. A single date with a stated confidence attaches the uncertainty to the number rather than offering it as a choice, and it makes the follow-up question the right one: what would it take to raise the confidence.</p>
<h3>Why forecasts should be re-issued rather than defended</h3>
<p>A forecast made six weeks ago used six-week-old data. Re-running it weekly costs minutes and produces a date that moves, which is uncomfortable and honest. The alternative, defending the original date until it is obviously unreachable, concentrates all the bad news into one conversation at the worst possible moment.</p>
<h3>Reference class forecasting</h3>
<p>Instead of estimating this project, look at how long comparable projects actually took. People are consistently poor at predicting the specific case and considerably better served by the base rate, and the main obstacle is that every team believes their situation is different. It usually is not, in the ways that matter to duration.</p>
<h3>The hidden cost of estimation</h3>
<p>Count the hours: a team of seven spending ninety minutes a fortnight on sizing is around twenty person-hours a quarter. If those estimates are not changing any decision, that is the cost of a habit, and it is worth comparing against what a count-based forecast would have produced for nothing.</p>
<h3>Split the largest item first, every time</h3>
<p>Forecast error is dominated by the few items that could take far longer than anyone expected, and those are always the large ones. Splitting converts one high-variance item into several lower-variance ones, which tightens the whole distribution more than any refinement of the small estimates can.</p>`,
      Expert: `<p>The no-estimates argument is narrower than it sounds. It is not that forecasting is unnecessary; it is that per-item estimation is an expensive input to a forecast that measured history provides more cheaply and more accurately.</p>
<table>
<tr><th>Estimation is worth it when</th><th>It is not worth it when</th></tr>
<tr><td>The decision is go or no-go on a large commitment</td><td>Items are already small and similar</td></tr>
<tr><td>The work is genuinely novel, with no history</td><td>Thirty comparable items have been delivered</td></tr>
<tr><td>Discussion during sizing surfaces hidden scope</td><td>The number is the only output anybody uses</td></tr>
</table>
<p>The third row on the left is the part most worth defending. Much of the value of planning poker is the argument that happens when two people give wildly different numbers, because it reveals that they understood the item differently. That conversation is worth having even if the resulting number is then discarded.</p>
<h3>Why the number travels upward and the caveats do not</h3>
<p>A team explains carefully that velocity is a local planning figure. It appears in a status report. The next layer sees a number with a trend. By the time it reaches a dashboard, it is being compared across teams and tracked quarter on quarter, and the caveats that made it meaningful are three layers down. This is a structural property of how numbers move through organisations rather than a failure of anyone's explanation.</p>
<h3>What to report upward instead</h3>
<p>Dates with confidence levels, derived from cycle time history, and a short statement of what changed. Those answer the question an executive is actually asking, which is when will it be done and what is in the way, and they do not create an incentive to inflate anything.</p>
<div class="field"><span class="callout-label">A cheap experiment worth running</span><p>For one quarter, record both the estimate and the actual cycle time for every item, and also record a forecast made purely from item counts. Then compare. Most teams discover the count-based forecast is at least as good, at which point the estimation question answers itself with their own data rather than with an argument.</p></div>
<h3>Estimation as a social artefact</h3>
<p>In many organisations the estimate is not a prediction but a negotiating position, and everybody involved knows it. Padding is a rational response to being held to a figure given under uncertainty, and removing padding without removing the accountability simply moves the risk onto the person who estimated honestly. This is why exhortations to estimate more accurately fail: the inaccuracy is a response to the incentive rather than a failure of technique.</p>
<h3>What to change if you can change one thing</h3>
<p>Stop treating an estimate as a commitment. Once an estimate can be wrong without consequence, it becomes a genuine input to planning rather than a defensive artefact, and the quality of the number improves without anybody being asked to try harder. Teams that make this change usually find estimation becomes faster and less contentious within a couple of sprints, which is itself evidence about what was driving the original behaviour.</p>
<h3>Goodhart applies with unusual speed here</h3>
<p>Most measures take a while to corrupt because gaming them requires changing behaviour. Velocity is defined by the people being measured, so compliance requires only a slightly more generous reading of the same work. There is no lag and no detectable moment of dishonesty, which is why the corruption is both fast and invisible, and why the remedy has to be structural rather than a request for integrity.</p>
<h3>What survives contact with an executive</h3>
<p>A date with a confidence level, re-issued weekly, with a one-line statement of what changed. It answers the actual question, it does not create an incentive to inflate anything, and it degrades gracefully when the news is bad because the mechanism for delivering bad news is already running. Velocity trends fail all three tests, which is why they keep appearing on dashboards and keep causing arguments.</p>
<h3>The measure that cannot be gamed by the team</h3>
<p>Cycle time is recorded by the system rather than asserted by the people being measured, which is exactly why it resists the corruption velocity invites.</p>`,
    },
    questions: [
      { n: 1, question: "Why should story points not be converted to hours?", options: ["It reinvents hour estimates with an extra translation step, losing what made relative sizing useful", "Hours are harder to add up", "Points are always larger than hours", "Conversion is forbidden by Scrum"], answer: 0, explanation: "Relative sizing works because people judge comparisons better than absolutes. Fixing a conversion rate throws that away and reintroduces the absolute estimate the technique was avoiding, now with a pointless intermediate unit. It also makes the number look transferable between teams, which it is not, so the conversion causes the comparison problem as well.", difficulty: "Easy", skill: "Story point" },
      { n: 2, question: "A manager asks a team to increase velocity by twenty per cent. What is the predictable result?", options: ["Estimates inflate, with no change in delivered work", "The team works twenty per cent faster", "Carry-over falls", "Cycle time improves"], answer: 0, explanation: "Points are defined by the team being measured, so compliance requires no change to anything real. This is Goodhart's law with unusually little friction. The important part is that nobody has to act dishonestly: each re-sizing is small and defensible, made under pressure, and the aggregate is inflation. That is why the remedy is to stop using velocity as a target rather than to appeal for rigour.", difficulty: "Medium", skill: "Goodharts law" },
      { n: 3, question: "What makes a probabilistic forecast more defensible than a summed estimate?", options: ["It is derived from measured history and carries a stated confidence", "It uses larger numbers", "It does not require a backlog", "It is produced by a tool rather than people"], answer: 0, explanation: "A summed estimate is an aggregate of opinions about a future nobody has seen, and it conventionally describes the path where nothing goes wrong. A forecast from the cycle time distribution says most items finish within this many days and attaches a confidence to the date. It is both more honest and usually more accurate, because it reflects what the team actually did rather than what they pictured.", difficulty: "Medium", skill: "Forecasting" },
      { n: 4, question: "Why does splitting the largest item improve a forecast more than refining small estimates?", options: ["Large items carry most of the variance", "Small items are always estimated correctly", "Splitting reduces total work", "Forecasts ignore small items"], answer: 0, explanation: "Forecast error is dominated by the few items that could take far longer than expected, and those are the large ones with the most unknowns. Splitting converts one high-variance item into several lower-variance ones, which tightens the whole distribution. Time spent arguing whether something is a two or a three is effort applied where the variance is not.", difficulty: "Hard", skill: "Forecasting" },
      { n: 5, question: "What is the strongest argument for keeping estimation sessions?", options: ["The disagreement surfaces that people understood the item differently", "The numbers are needed for reporting", "It is required by the framework", "It improves individual accountability"], answer: 0, explanation: "When two people give wildly different sizes, the useful output is the conversation that follows, which usually reveals hidden scope or a misunderstanding about what is being built. That value survives even if the resulting number is discarded afterwards. Teams dropping estimation entirely sometimes lose this and only notice when more scope starts arriving as surprises during the sprint.", difficulty: "Hard", skill: "Relative sizing" },
      { n: 6, question: "What should be reported upward instead of velocity?", options: ["Dates with confidence levels, from cycle time history, and what changed", "Velocity with a written caveat attached", "Points completed per person", "Estimated hours remaining"], answer: 0, explanation: "A number and its caveats travel at different speeds through an organisation: the figure reaches a dashboard and the explanation does not. Dates with confidence answer the question being asked, which is when and what is in the way, and they create no incentive to inflate anything. Per-person points is the worst of the options, since it adds individual comparison to a measure that was already not comparable.", difficulty: "Medium", skill: "Velocity" },
    ],
    worksheets: [
      {
        n: 1,
        title: "Forecast two ways, and compare",
        difficulty: "Medium",
        brief: `<p>A team must deliver 40 remaining items. You have two sources: their estimates, and their measured history.</p>
<p><strong>Estimates:</strong> the 40 items were sized at 160 points in total, and the team averages 20 points per two-week sprint.</p>
<p><strong>History:</strong> over the last quarter they finished 5 items per week.</p>
<p>Work out the forecast from each method in weeks, then the difference between them.</p>
<div class="key-idea"><span class="callout-label">Neither is the truth</span><p>One is built from opinions formed before the work started, the other from what actually happened. The gap between them is the interesting number.</p></div>`,
        stubLabel: "Method",
        columns: [
          { key: "a", label: "Input A", type: "number", align: "right" },
          { key: "b", label: "Input B", type: "number", align: "right" },
          { key: "weeks", label: "Weeks", type: "number", align: "right" },
        ],
        rows: [
          { key: "est", label: "From estimates: points / points per week" },
          { key: "hist", label: "From history: items / items per week" },
          { key: "gap", label: "Difference, estimate minus history", kind: "total" },
        ],
        cells: [
          { row: "est", col: "a", expected: 160, marks: 1, feedback: "Total points remaining." },
          { row: "est", col: "b", expected: 10, marks: 2, feedback: "Twenty points per two-week sprint is ten points per week. The sprint length is the trap here." },
          { row: "est", col: "weeks", expected: 16, marks: 2, derivedFrom: { op: "quotient", from: ["est:a", "est:b"] }, methodMarks: 1 },
          { row: "hist", col: "a", expected: 40, marks: 1, feedback: "Items remaining." },
          { row: "hist", col: "b", expected: 5, marks: 1 },
          { row: "hist", col: "weeks", expected: 8, marks: 2, derivedFrom: { op: "quotient", from: ["hist:a", "hist:b"] }, methodMarks: 1 },
          { row: "gap", col: "weeks", expected: 8, marks: 3, derivedFrom: { op: "difference", from: ["est:weeks", "hist:weeks"] }, methodMarks: 2 },
        ],
        invariants: [
          { key: "gap-ok", label: "The two forecasts together come to 24 weeks", kind: "column-total", cols: ["weeks"], value: 24, marks: 2, hint: "A total row is excluded from its own column sum, so this adds the two forecast rows only: sixteen plus eight. The difference row is checked separately by its own derivation." },
        ],
        hints: [
          "Twenty points per sprint is not twenty points per week. Check the sprint length.",
          "Each forecast is a division: work remaining divided by the rate.",
          "The difference row subtracts the history forecast from the estimate forecast.",
        ],
        workedAnswer: `<h3>The marked sheet</h3>
<table>
<tr><th>Method</th><th class="num">Input A</th><th class="num">Input B</th><th class="num">Weeks</th></tr>
<tr><td>From estimates</td><td class="num">160 pts</td><td class="num">10 pts/wk</td><td class="num">16</td></tr>
<tr><td>From history</td><td class="num">40 items</td><td class="num">5 items/wk</td><td class="num">8</td></tr>
<tr><th>Difference</th><th class="num"></th><th class="num"></th><th class="num">8</th></tr>
</table>
<h3>A factor of two, from the same team</h3>
<p>The estimate-based forecast says sixteen weeks and the measured one says eight. Both used real data from the same team, and they disagree by a factor of two. Which you believe determines whether this project is a quarter or half a quarter.</p>
<div class="worked"><span class="callout-label">Why they diverge</span><p>Points were assigned before the work started, so they reflect what people imagined. Items per week reflects what actually happened, including the interruptions, reviews and rework that nobody pictures while estimating. When these two disagree, the measured one is usually closer, and the direction of the error is almost always the same: estimates describe the path where nothing goes wrong.</p></div>
<div class="field"><span class="callout-label">The trap in the arithmetic, and why it is in the sheet</span><p>Twenty points per two-week sprint is ten points per week, not twenty. Getting that wrong halves the first forecast and makes the two methods agree, which would have produced a comfortable and entirely false conclusion. Unit errors in planning arithmetic are common and they tend to resolve in the direction that avoids an awkward conversation.</p></div>`,
        minutes: 18,
        skills: ["Forecasting", "Velocity", "Story point"],
      },
    ],
  },
  5131: {
    topicId: 5131,
    title: "Reading a board as a queueing system",
    summary:
      "A board is not a status display. It is an instrument, and most of what it is telling you is in the gaps between the cards.",
    concepts: ["Queue", "Ageing", "Cumulative flow", "Blocker", "Pull system"],
    glossary: {
      Queue: "Work waiting rather than being worked on. Usually invisible unless the board is designed to show it.",
      Ageing: "How long an item has been in progress. The most actionable number on a board.",
      "Cumulative flow": "A chart of how many items are in each state over time, which shows where work accumulates.",
      Blocker: "Something preventing an item progressing, which should be visible and have an owner.",
      "Pull system": "Work is taken when there is capacity, rather than pushed in when it arrives.",
    },
    body: {
      Beginner: `<p>Most boards show where each item is. The useful ones also show how long it has been there, and that second fact is where nearly all the information lives.</p>
<h3>What to look at, in order</h3>
<table>
<tr><th>Look at</th><th>It tells you</th></tr>
<tr><td>The oldest item in progress</td><td>Where your worst delay is, right now</td></tr>
<tr><td>Which column has the most cards</td><td>Where work is piling up</td></tr>
<tr><td>Anything marked blocked</td><td>Whether somebody is actually chasing it</td></tr>
<tr><td>How many items are in progress</td><td>Whether the team is starting more than it finishes</td></tr>
</table>
<p>Notice none of those is who is working on what. Boards get used as a status display for a manager and that is the least valuable thing they can do.</p>
<div class="key-idea"><span class="callout-label">Waiting columns are the honest ones</span><p>Splitting a column into doing and done makes the handover visible. An item sitting in review done for four days is waiting, not progressing, and a board without that split hides it completely.</p></div>
<div class="warning"><span class="callout-label">A card with no age looks fine forever</span><p>An item stuck for three weeks is visually identical to one started this morning. Put the age on the card, or you will keep discovering problems at the end.</p></div>
<h3>Design the board around the questions you ask</h3>
<p>If the team keeps asking what is stuck, add age to the cards. If it keeps asking who is waiting on another team, add a column for it. A board that never changes is usually one nobody is actually using to decide anything.</p>
<h3>Columns should match reality, not the process diagram</h3>
<p>If work genuinely sits waiting for a review that happens twice a week, that is a column. Hiding it inside in progress makes the board tidier and the delay invisible, which is the opposite of the point.</p>`,
      Intermediate: `<p>Treat each column as a queue and the board becomes diagnostic. Work accumulates in front of the slowest step, so whichever column is widest is telling you where the constraint is today.</p>
${FIG_BOARD_READ}
<h3>Pull rather than push</h3>
<p>In a push system, work is handed to the next stage when the previous one finishes. In a pull system, a stage takes work when it has capacity. The difference decides whether queues form: pushing into a busy stage creates a pile, pulling cannot.</p>
<table>
<tr><th></th><th>Push</th><th>Pull</th></tr>
<tr><td>Who decides work moves</td><td>The upstream stage</td><td>The downstream stage</td></tr>
<tr><td>Queues</td><td>Form in front of busy steps</td><td>Bounded by the limit</td></tr>
<tr><td>Feels like</td><td>Productive upstream</td><td>Uncomfortable, and faster overall</td></tr>
</table>
<div class="key-idea"><span class="callout-label">A board without limits is a push system with sticky notes</span><p>Visualisation alone changes nothing about who can start what. The pull behaviour comes from the limit, which is why a team with a beautiful board and no limits usually delivers exactly as it did before.</p></div>
<h3>Blockers need an owner and a date</h3>
<p>A blocked marker with no name attached is a wish. Record who is chasing it and when it was raised, and review blocked items first in the stand-up rather than walking the board left to right. Most teams discover their longest delays are a handful of blockers nobody owned.</p>
<h3>The three columns most teams are missing</h3>
<table>
<tr><th>Column</th><th>What it exposes</th></tr>
<tr><td>Waiting on another team</td><td>Dependency time, often the largest single component</td></tr>
<tr><td>Ready for review</td><td>Handover delay that in progress conceals</td></tr>
<tr><td>Intake, before anybody decided</td><td>The gap between a request arriving and work starting</td></tr>
</table>
<p>Each is uncomfortable to add because each makes visible a delay somebody owns. That discomfort is a reasonable proxy for how much the column is worth.</p>
<h3>Swimlanes are for different kinds of work, not different people</h3>
<p>Lanes by person recreate individual silos on a board that exists to show flow. Lanes by class of work, such as expedite or planned, carry information about policy and are worth having. If a lane tells you who rather than what, it is probably working against the board's purpose.</p>
<h3>Cards should carry four things</h3>
<p>What it is, who is on it, how old it is, and whether it is blocked. Anything else is decoration, and the age is the one most boards omit and most decisions depend on.</p>
<h3>A board is a model, so it misleads where it is incomplete</h3>
<p>Work that is being done but is not on the board breaks every number derived from it. Unrecorded work in progress is common, usually small favours and interruptions, and it is why a team's measured WIP can look healthy while the experience is of constant overload.</p>
<h3>Keep the board where the team is</h3><p>A board nobody passes is a board nobody updates, and a stale board is worse than none because it is trusted.</p>`,
      Advanced: `<p>A cumulative flow diagram plots how many items are in each state over time. The width of a band is the work in progress in that state, and the horizontal distance between the top and bottom lines is the approximate cycle time. It makes two things visible that a board cannot.</p>
<table>
<tr><th>Pattern</th><th>Means</th></tr>
<tr><td>A band widening steadily</td><td>Arrival outpaces completion in that state</td></tr>
<tr><td>Flat top line</td><td>Nothing is being started, or intake has stopped</td></tr>
<tr><td>Flat bottom line</td><td>Nothing is finishing, whatever the board shows</td></tr>
<tr><td>Parallel bands, steady width</td><td>A stable system, which is what you want before forecasting</td></tr>
</table>
<p>The last row matters because Little's law assumes stability. A team whose bands are widening cannot forecast from their current numbers, and the first job is to stop starting rather than to improve the estimate.</p>
<h3>Ageing is more actionable than cycle time</h3>
<p>Cycle time is measured when an item finishes, which is too late to act on. Item age is available now, for work currently in progress, and comparing it against your historical distribution tells you which item is about to become a problem. A card that has already exceeded your eighty-fifth percentile is the one to talk about today.</p>
<div class="key-idea"><span class="callout-label">This inverts the usual stand-up</span><p>Walk the board right to left, oldest first, and discuss items rather than people. The question becomes what is stopping this finishing rather than what did you do yesterday, and the second question has never improved a delivery date.</p></div>
<h3>Reading a cumulative flow diagram in practice</h3>
<p>Band width is work in progress in that state, and the horizontal gap between the top and bottom lines approximates cycle time. A steadily widening band is a queue forming, a flat bottom line means nothing is finishing whatever the board shows, and parallel bands of steady width indicate a stable system, which is the precondition for forecasting at all.</p>
<h3>The daily, reorganised around the board</h3>
<p>Walk right to left, oldest first, and discuss items rather than people. The question becomes what is stopping this finishing, which has an answer somebody can act on, instead of what did you do yesterday, which has never improved a delivery date. Most teams find the meeting shortens as a side effect.</p>
<h3>Policies belong on the board</h3>
<p>Write the rule for entering each column next to the column: what ready means, what review requires, what done requires. Unwritten policies are interpreted differently by each person under pressure, and the disagreements surface as arguments about whether something is finished.</p>
<h3>Right to left, and why the direction matters</h3>
<p>Reading left to right starts at the backlog, which is where the least urgent information is, and ends at work about to finish. Reading right to left starts with what is closest to delivery and most easily unblocked. The same board, read in the other direction, produces a different and better set of decisions.</p>
<h3>Blocked needs a date, not just a flag</h3>
<p>Record when the blocker was raised. A board showing three blocked items tells you very little; one showing a blocker raised eleven days ago tells you exactly where to spend the next ten minutes.</p>
<h3>One board per team, not per project</h3><p>A team working across three boards has its real work in progress spread across three places and visible in none of them. Flow is a property of the team, so the board has to be too, with project shown as a tag rather than as a separate wall.</p>`,
      Expert: `<p>The board is a model of the system, and like any model it misleads where it is incomplete. Three omissions recur, and each hides a category of delay that is often larger than anything the board shows.</p>
<table>
<tr><th>Omission</th><th>Hidden delay</th></tr>
<tr><td>No column for waiting on another team</td><td>Dependency time, frequently the largest single component</td></tr>
<tr><td>Work started but not on the board</td><td>Unrecorded WIP, which breaks every number derived from it</td></tr>
<tr><td>No intake column</td><td>Time between a request arriving and anybody deciding</td></tr>
</table>
<p>The third is the one teams are most reluctant to add, because it makes visible a delay that belongs to the organisation rather than to the team. That is exactly why it is worth adding.</p>
<h3>Lead time against cycle time</h3>
<p>Cycle time starts when the team begins work. Lead time starts when the customer asked. A team can have an excellent cycle time and a terrible lead time, which from the outside is indistinguishable from being slow, and internally feels like being unfairly judged. Measuring both separates the part the team controls from the part the intake process controls, and that distinction usually relocates the argument productively.</p>
<h3>Boards as instruments rather than reports</h3>
<p>The failure mode is a board maintained for somebody else to look at. Once its purpose is reporting, cards move to look right, blockers are under-recorded because they attract attention, and the data stops describing reality. A board the team uses to decide what to do next stays accurate because inaccuracy costs them immediately.</p>
<div class="field"><span class="callout-label">The one change worth making to most boards</span><p>Put the age in days on every card in progress. It costs nothing, needs no new tool, and converts a status display into something that prompts a decision. Teams that do it usually find their stand-up changes within a week without anybody being asked to change it.</p></div>
<h3>The board stops being accurate when its audience changes</h3>
<p>A board maintained so somebody else can look at it will drift: cards move when they look finished rather than when they are, and blockers get raised late because raising them attracts attention. A board the team uses to decide what to do next stays accurate, because inaccuracy costs them within the hour. That is an argument for keeping the board theirs and generating any report from it separately.</p>
<h3>Digital against physical, honestly</h3>
<p>Physical boards are more visible, harder to ignore and produce better conversations; digital boards survive distributed teams and give you the data for every chart in this topic. Teams that try to run both usually maintain neither. Pick the one that matches where the team actually is, and accept the cost of the other.</p>
<h3>What the board cannot tell you</h3>
<p>Whether the work is worth doing. A board optimises flow and is completely silent on value, so a team can become measurably excellent at delivering things nobody needed. Pairing flow metrics with some feedback on outcome is not optional, and the absence of any such mechanism is the single most common gap in otherwise well-run Kanban teams.</p>
<h3>Boards and the illusion of control</h3>
<p>A well-maintained board creates a strong impression that the work is understood, which is useful and occasionally misleading. It shows what has been written down, so systematic omissions, such as unplanned work or dependency waits, are invisible precisely because the visible part looks complete. The questions worth asking periodically are what is not on here, and who decided it should not be.</p>
<h3>Instrumenting the board is cheap and usually skipped</h3>
<p>Most tools will export item start and finish timestamps, which is all you need for cycle time, a scatter plot and a forecast. Teams frequently discuss adopting flow metrics for months while the data sits in an export nobody has run.</p>
<h3>The metric to resist</h3><p>Cards completed per person. It is easy to produce, it rewards picking small items and avoiding help, and it quietly destroys the collaboration the limits were introduced to create. Flow metrics describe the system; applying them to individuals converts them into something else entirely.</p>`,
    },
    questions: [
      { n: 1, question: "Which number on a board is most actionable?", options: ["The age of the oldest item in progress", "The total number of cards", "How many items each person has", "The number of items finished last week"], answer: 0, explanation: "Age is available now, for work still in flight, so it is the only one you can still do something about. Cycle time is recorded when an item finishes, which is too late to change that item. Comparing current age against your historical distribution tells you which card is about to become a problem today, which is a different and more useful question than how fast things were last week.", difficulty: "Medium", skill: "Ageing" },
      { n: 2, question: "What makes a board a pull system rather than a push system?", options: ["A limit, so a stage takes work only when it has capacity", "Columns arranged left to right", "Cards assigned to named people", "A daily stand-up around it"], answer: 0, explanation: "Visualisation alone changes nothing about who may start what. The pull behaviour comes entirely from the limit: without one, upstream pushes work into whatever stage is next and queues form in front of the slowest step. A board with no limits is a push system with sticky notes, which is why teams with beautiful boards often deliver exactly as they did before.", difficulty: "Easy", skill: "Pull system" },
      { n: 3, question: "On a cumulative flow diagram, a band widening steadily means what?", options: ["Work is arriving in that state faster than it leaves", "The team is working faster", "The chart is misconfigured", "Cycle time is falling"], answer: 0, explanation: "Band width is work in progress in that state, so steady widening means arrivals exceed departures there and a queue is building. It also means the system is not stable, which matters practically: Little's law assumes stability, so a team with widening bands cannot forecast from their current figures. The first job is to stop starting rather than to refine the estimate.", difficulty: "Hard", skill: "Cumulative flow" },
      { n: 4, question: "Why do teams resist adding an intake column?", options: ["It makes visible a delay owned by the organisation rather than the team", "It takes up board space", "It requires new tooling", "It breaks the WIP limit"], answer: 0, explanation: "The gap between a request arriving and anybody deciding on it is often substantial and belongs to whoever triages rather than to the team delivering. Making it visible changes who the conversation is about, which is uncomfortable and is precisely why it is worth doing. It is also the main component of the difference between cycle time and lead time.", difficulty: "Hard", skill: "Queue" },
      { n: 5, question: "A team has excellent cycle time and poor lead time. What does that indicate?", options: ["The delay is before work starts, in intake or prioritisation", "The team is working too slowly", "The estimates are wrong", "The board has too many columns"], answer: 0, explanation: "Cycle time starts when the team begins; lead time starts when the customer asked. A large gap locates the delay in triage, approval or queueing before the work was picked up, which is outside the team's control and indistinguishable from slowness when viewed from outside. Measuring both separates what the team owns from what the intake process owns, and usually moves the argument to where it can be fixed.", difficulty: "Medium", skill: "Queue" },
      { n: 6, question: "Why does a board maintained for reporting stop being accurate?", options: ["Cards get moved to look right, and blockers are under-recorded", "Reporting tools corrupt the data", "Managers move the cards themselves", "It is updated less frequently"], answer: 0, explanation: "Once the audience is somebody else, the board's purpose shifts from deciding what to do next to presenting a picture, and the incentives follow: blockers attract attention so they are raised late, and items move when they look finished rather than when they are. A board the team actually uses stays accurate because inaccuracy costs them immediately, which is the strongest argument for keeping it theirs.", difficulty: "Medium", skill: "Blocker" },
    ],
    parts: [
      {
        n: 1,
        title: "Read the board, and say what it is telling you",
        diagram: "kanban-board",
        brief: `<p>Five columns, with limits in two of the headers. Name each numbered point, then put the diagnostic steps in the order a team should actually use them.</p>
<p>The label list contains more names than there are points. The extras are the things each one is confused with, and the reveal explains how to tell the pair apart.</p>
<div class="key-idea"><span class="callout-label">Look at the headers before the cards</span><p>Two columns carry a limit and the rest do not. Which ones, and whether each is currently at its limit, is most of what this board is saying.</p></div>`,
        hotspots: [
          { key: "backlog", label: "Backlog column", x: 11, y: 50, does: "Work that has been accepted but not started. No limit, because nothing is in progress here.", confusedWith: "An intake queue, which is the time before anybody decided, and which most boards omit entirely." },
          { key: "wip-limit", label: "A work in progress limit", x: 31, y: 16, does: "A hard cap on cards in that column. When it binds, nothing new starts and people help finish instead.", confusedWith: "A target or a guideline, which is what it becomes the first time it is raised to fit the work." },
          { key: "at-limit", label: "A column at its limit", x: 50, y: 16, does: "Review is full. Nothing may be pulled into it, which is the signal to go and clear it.", confusedWith: "A column that is merely busy; the number in the header is what makes it a decision." },
          { key: "under-limit", label: "A column under its limit", x: 69, y: 16, does: "Test has capacity, so work can be pulled forward into it.", confusedWith: "An idle column, which would be a problem; spare capacity at a constraint is not." },
          { key: "done", label: "Done column", x: 89, y: 50, does: "Finished to the definition of done. The only column that counts as delivery.", confusedWith: "A staging column for work that is nearly finished, which is how definitions of done erode." },
          { key: "cards", label: "Cards in progress", x: 31, y: 50, does: "Each is an item occupying attention. The count here is the work in progress that drives cycle time.", confusedWith: "A measure of productivity; more cards in flight means slower delivery, not faster." },
        ],
        sequence: [
          { key: "age", label: "Find the oldest item in progress", why: "Age is the only number you can still act on, and the oldest card is where the worst delay is now." },
          { key: "blocked", label: "Check anything blocked, and who owns it", why: "Blockers with no owner are where the longest delays hide, and they are invisible in a left-to-right walk." },
          { key: "limits", label: "Look at which columns are at their limit", why: "A full column tells you where to send help before you consider starting anything new." },
          { key: "widest", label: "Note which column holds the most work", why: "Work accumulates in front of the slowest step, so this locates the constraint today." },
          { key: "start", label: "Only then consider starting something new", why: "Starting is the last decision, not the first. Most boards are read in the opposite order." },
        ],
        minutes: 16,
        skills: ["Queue", "Ageing", "Pull system", "Blocker"],
      },
    ],
  },
  5132: {
    topicId: 5132,
    title: "Ceremonies that earn their time",
    summary:
      "Every recurring meeting should produce a decision somebody could not have made alone. The ones that do not are the largest recurring cost most teams never audit.",
    concepts: ["Facilitation", "Decision", "Psychological safety", "Time box", "Meeting cost"],
    glossary: {
      Facilitation: "Running a session so it reaches its purpose, which is a skill distinct from chairing it.",
      Decision: "A choice made and recorded, with an owner. The output a meeting should be judged on.",
      "Psychological safety": "The shared belief that speaking up about a problem will not be punished.",
      "Time box": "A fixed duration agreed in advance, which forces prioritisation inside the session.",
      "Meeting cost": "Attendees multiplied by duration multiplied by frequency. Usually never calculated.",
    },
    body: {
      Beginner: `<p>A recurring meeting is a standing charge. Six people for half an hour every day is fifteen hours a week, every week, and almost nobody ever adds it up.</p>
<h3>The test</h3>
<p>Did this session produce a decision that nobody could have made alone? If the answer is no, repeatedly, the meeting is a report and could be a written one.</p>
<table>
<tr><th>Session</th><th>Decision it should produce</th></tr>
<tr><td>Daily</td><td>What we change about today</td></tr>
<tr><td>Planning</td><td>What we are attempting, and why that</td></tr>
<tr><td>Review</td><td>What we build next, given what we saw</td></tr>
<tr><td>Retro</td><td>One or two things we will do differently</td></tr>
</table>
<div class="key-idea"><span class="callout-label">Status is not a decision</span><p>Information that could have been read asynchronously does not need everybody in a room at the same time. A meeting earns its cost when people have to react to each other.</p></div>
<div class="warning"><span class="callout-label">Shortening a useless meeting does not fix it</span><p>A fifteen-minute status round is still a status round. The question is what the session is for, not how long it takes.</p></div>
<h3>Work out what yours cost</h3>
<p>Attendees times duration times frequency. Six people, half an hour, five days a week is fifteen hours every week. That figure is not an argument for cancelling anything; it is the number that should be on the table when somebody proposes adding one more.</p>
<h3>Written beats synchronous for information</h3>
<p>If the purpose is for everyone to know something, write it down. Synchronous time is for when people have to react to each other, and using it for broadcast is paying a premium for nothing.</p>
<h3>A short test for any recurring meeting</h3>
<p>If the output could have been an email, it should have been. Synchronous time is for people reacting to each other, and anything else is a broadcast at a premium price.</p>`,
      Intermediate: `<p>Most broken ceremonies fail in the same few ways, and the failure is usually structural rather than a matter of people trying harder.</p>
${FIG_MEETING_COST}
<table>
<tr><th>Symptom</th><th>Cause</th><th>Fix</th></tr>
<tr><td>Daily runs to thirty minutes</td><td>Problem-solving inside it</td><td>Park it, name who continues after</td></tr>
<tr><td>Planning drags</td><td>Backlog not refined beforehand</td><td>Refine before, not during</td></tr>
<tr><td>Review is a slide deck</td><td>No increment to show</td><td>Fix the increment, not the meeting</td></tr>
<tr><td>Retro is quiet</td><td>People do not feel safe naming problems</td><td>Nothing about format will fix this</td></tr>
</table>
<div class="key-idea"><span class="callout-label">The last row is the one that is not a facilitation problem</span><p>If the real issue is that raising a problem has previously gone badly for somebody, a new retrospective format will produce the same silence in a different shape. That has to be addressed directly, usually by whoever holds the authority that made it unsafe.</p></div>
<h3>Who should be there</h3>
<p>Everybody whose participation changes the outcome, and nobody else. Adding a person who only listens costs their time and changes what others will say, particularly if they are senior. A manager attending a retrospective is the commonest example, and the effect on candour is larger than most managers expect.</p>
<div class="warning"><span class="callout-label">Optional attendance is rarely optional</span><p>Marking a meeting optional while the senior people all attend makes non-attendance a visible choice. If it is genuinely optional, say what the attendee will miss and make the notes good enough that missing it is reasonable.</p></div>
<h3>Who should be in the room</h3>
<p>Everybody whose participation changes the outcome, and nobody else. An additional attendee costs their time and changes what others will say, which is a real cost even when they are silent, and it is larger when they are senior.</p>
<h3>Agendas are a weak tool; purposes are a strong one</h3>
<p>An agenda lists topics. A purpose states the decision the session has to reach. Sessions with an agenda and no purpose cover the topics and decide nothing, which is the most common shape of a meeting everybody agrees is useless and nobody cancels.</p>
<h3>The parking lot is underrated</h3>
<p>Most overrunning dailies are a two-person problem being solved in front of seven. Naming it, writing it down, and saying who continues afterwards takes ten seconds and is the single highest-leverage facilitation habit in this topic.</p>
<h3>Recurring means it compounds</h3>
<p>A badly designed one-off meeting costs an hour. A badly designed recurring one costs an hour every week until somebody cancels it, and nobody cancels it because cancelling a meeting somebody else set up is socially expensive. That asymmetry is why recurring sessions should face a higher bar than one-offs and almost never do.</p>
<h3>Start and finish on time, always</h3><p>A session that routinely starts late teaches people to arrive late, and one that routinely overruns teaches them to schedule nothing after it. Both are cheap to fix and both compound.</p>`,
      Advanced: `<p>Retrospectives fail more often than any other ceremony, and the two causes are different and need different responses. One is that nothing happens afterwards. The other is that nobody says anything true.</p>
<table>
<tr><th>Failure</th><th>Looks like</th><th>Response</th></tr>
<tr><td>No follow-through</td><td>Same observations every month</td><td>One owned action, in the sprint backlog</td></tr>
<tr><td>No candour</td><td>Polite, general, nothing uncomfortable</td><td>Change who is in the room, or change what happens to people who speak</td></tr>
</table>
<p>Teams almost always treat the second as the first, trying new formats and exercises against a problem that is about consequences rather than structure. If somebody raised a real issue last quarter and it went badly for them, everyone watched, and no amount of facilitation undoes that.</p>
<h3>Time-boxing as a forcing function</h3>
<p>A time box is not about efficiency, it is about prioritisation: when the session cannot expand, the group has to decide what matters most. Removing the box does not produce a more thorough meeting, it produces the same content spread over longer and the important item still discussed last.</p>
<div class="key-idea"><span class="callout-label">Decide what happens when time runs out, in advance</span><p>Either the remaining items are dropped or the session is rescheduled, and saying which before you start is what makes the box real. A time box that is routinely extended is a suggestion.</p></div>
<h3>Asynchronous alternatives are underused</h3>
<p>Information transfer, written updates and most refinement do not need everybody present simultaneously. What does need synchrony is anything where people must react to each other: resolving a disagreement, making a decision with several stakeholders, or working through something nobody understands yet. Sorting your recurring sessions by that test usually removes at least one.</p>
<h3>Separate the two retrospective failures</h3>
<p>Nothing happens afterwards, and nobody says anything true. The first is fixed mechanically with owners, dates and reserved capacity. The second cannot be fixed inside the meeting at all, and teams reliably apply the first remedy to the second problem, trying new formats against a problem about consequences.</p>
<h3>Rotating facilitation</h3>
<p>Having the same person run every retrospective concentrates the skill and the framing. Rotating spreads both, surfaces different questions, and removes the implication that the session belongs to whoever usually runs it. It also makes the scrum master's eventual absence survivable, which is the stated goal of the role.</p>
<h3>Decide in advance what happens when time runs out</h3>
<p>Either the remaining items are dropped or the session is rescheduled. Saying which before you start is what makes the time box real; one that is routinely extended is a suggestion, and the group learns to pace itself accordingly.</p>
<h3>Facilitation is a skill, and it is not chairing</h3>
<p>Chairing keeps order and gets through an agenda. Facilitating gets a group to a decision, which includes noticing who has not spoken, naming the disagreement nobody is saying out loud, and stopping a discussion that has stopped moving. Teams that rotate facilitation without teaching any of this get a rota rather than an improvement.</p>
<h3>Capacity for the output, or there is no output</h3>
<p>A session producing actions that have nowhere to live produces nothing. Reserving a small, explicit allocation for whatever the retrospective decides is a one-line change to the sprint plan and is the difference between a team that improves and one that discusses improving.</p>
<h3>Silence is data</h3><p>If the same two people speak in every session, the group is not thinking together, it is watching two people think. Noticing who has not spoken, and asking directly, is the most reliable facilitation move available.</p>`,
      Expert: `<p>Worth doing the arithmetic once. A team of seven with a daily stand-up, a two-hour planning, a one-hour review and a one-hour retro per fortnight spends somewhere around fifty to sixty person-hours per fortnight in ceremony. That is comfortably more than one full-time person, allocated permanently, usually without anybody deciding to.</p>
<table>
<tr><th>Session</th><th>Person-hours per fortnight, team of seven</th></tr>
<tr><td>Daily, 15 minutes</td><td class="num">~17</td></tr>
<tr><td>Planning, 2 hours</td><td class="num">14</td></tr>
<tr><td>Review, 1 hour</td><td class="num">7</td></tr>
<tr><td>Retro, 1 hour</td><td class="num">7</td></tr>
<tr><td>Refinement, 1 hour</td><td class="num">7</td></tr>
<tr><th>Total</th><th class="num">~52</th></tr>
</table>
<p>None of that is necessarily wasted. The point is that a cost of this size should be a deliberate decision reviewed periodically, and in most organisations it is inherited and never examined.</p>
<h3>Psychological safety is a precondition, not an outcome</h3>
<p>The research most often cited here found that the strongest predictor of team effectiveness was whether members felt able to take interpersonal risks. For this course the practical reading is narrow and important: every inspection mechanism in every framework depends on somebody saying something uncomfortable. Where that is unsafe, the ceremonies run and the information does not surface, and the process appears healthy from outside while adapting to nothing.</p>
<h3>Auditing your own ceremonies</h3>
<p>For four weeks, record for each session what decision it produced and who owned it. Sessions with an empty column are candidates for removal or for conversion to a written update. This is uncomfortable to propose and is the only version of the exercise that produces a change, because arguing about whether a meeting is useful in the abstract reliably ends with keeping it.</p>
<div class="field"><span class="callout-label">Delete before you redesign</span><p>The instinct on finding a poor meeting is a better format. Try removing it for three sprints and see what breaks. Frequently nothing does, and the team recovers hours; where something does break, you have learned precisely what the session was for, which is better input to a redesign than any amount of discussion.</p></div>
<h3>The audit that produces change</h3>
<p>For four weeks, record for every recurring session what decision it produced and who owned it. Sessions with an empty column are candidates for deletion. This is uncomfortable to propose and is the only version of the exercise that works, because arguing in the abstract about whether a meeting is useful reliably ends with keeping it.</p>
<h3>Delete before redesigning</h3>
<p>The instinct on finding a poor meeting is a better format. Removing it for three sprints is cheaper and more informative: frequently nothing breaks and the hours come back, and where something does break you have learned precisely what the session was providing, which is far better input to a redesign than any discussion.</p>
<h3>Safety is a precondition for every inspection mechanism</h3>
<p>Every framework in this course depends at some point on somebody saying something uncomfortable. Where that is unsafe, the ceremonies run exactly as specified and the information does not surface, so the process looks healthy from outside while adapting to nothing. This is why a team with poor safety cannot be fixed by a better process, and why the diagnosis has to come first.</p>
<h3>Why the ceremony survives the mechanism</h3>
<p>Meetings are visible, schedulable and easy to measure attendance at, so they survive reorganisations and changes of manager. Mechanisms like an empowered product owner or a trustworthy definition of done are invisible on a calendar and quietly disappear. Over a few years the predictable result is a full schedule and no empirical control, with everybody doing exactly what they were asked.</p>
<h3>The question to ask before adding anything</h3>
<p>What decision will this produce, who will own it, and what will we stop doing to make room. A proposal that cannot answer the third is asking for time that is already allocated, and the honest response is to say which existing session it replaces.</p>
<h3>The schedule should be revisited on a cadence</h3><p>Set a date, perhaps twice a year, when every recurring session has to justify itself. Without a scheduled review the default is permanence, and the calendar accumulates indefinitely because removing something always requires somebody to make a case while keeping it requires nobody to do anything.</p>`,
    },
    questions: [
      { n: 1, question: "What should a recurring meeting be judged on?", options: ["Whether it produced a decision nobody could have made alone", "Whether it finished on time", "Whether everybody attended", "Whether the agenda was covered"], answer: 0, explanation: "Synchronous time is expensive and its one unique property is that people can react to each other. Information transfer does not need that and can be written. Judging by punctuality or attendance measures compliance rather than value, and a meeting can tick both while producing nothing, which describes most status rounds.", difficulty: "Easy", skill: "Decision" },
      { n: 2, question: "A retrospective is polite and nothing uncomfortable is raised. What is the likely cause?", options: ["Raising problems has previously gone badly for somebody", "The format is stale", "The meeting is too short", "The team has no problems"], answer: 0, explanation: "This is a candour failure rather than a facilitation failure, and teams reliably misdiagnose it. New formats and exercises are applied to a problem that is about consequences: if somebody raised a real issue and it went badly, everyone watched and drew the conclusion. The response has to change who is in the room or what happens to people who speak, which usually means whoever holds the authority that made it unsafe.", difficulty: "Hard", skill: "Psychological safety" },
      { n: 3, question: "What is a time box actually for?", options: ["Forcing the group to prioritise what matters most", "Making meetings shorter", "Keeping to the calendar", "Limiting how much people say"], answer: 0, explanation: "When the session cannot expand, the group must decide what is most important to cover, which is the mechanism. Removing the box does not produce a more thorough meeting; it produces the same content spread wider, with the important item still discussed last. For it to be real you also have to decide in advance what happens when time runs out.", difficulty: "Medium", skill: "Time box" },
      { n: 4, question: "Why does adding a senior observer to a retrospective change its value?", options: ["It changes what people are willing to say, usually more than the observer expects", "It slows the meeting down", "It breaks the time box", "It requires a different format"], answer: 0, explanation: "Candour is the input the session runs on, and the presence of somebody with authority over careers reduces it, regardless of their intentions or assurances. The effect is consistently larger than the observer estimates, because they are judging from how they feel rather than from how the room now behaves. The rule that follows is to invite people whose participation changes the outcome and nobody else.", difficulty: "Medium", skill: "Psychological safety" },
      { n: 5, question: "A team of seven spends around fifty person-hours per fortnight in ceremony. What is the significance?", options: ["It is more than a full-time person, usually allocated without a decision", "It proves the meetings are wasteful", "It is below industry average", "It means the team is too large"], answer: 0, explanation: "The figure does not show waste; it shows scale. A cost of that size should be an explicit, periodically reviewed decision, and in most organisations the schedule is inherited and never examined. Doing the arithmetic once changes the conversation from whether a meeting feels useful to whether it is worth what it costs, which is a question that can actually be answered.", difficulty: "Medium", skill: "Meeting cost" },
      { n: 6, question: "What is the recommended first move on a meeting that seems unproductive?", options: ["Remove it for three sprints and see what breaks", "Redesign the format", "Shorten it", "Change who facilitates"], answer: 0, explanation: "Deleting is a cheap experiment with a clear result. Frequently nothing breaks and the team recovers the hours; where something does break, you have learned exactly what the session was providing, which is far better input to a redesign than discussion. Arguing in the abstract about whether a meeting is useful reliably ends with keeping it, because no one can prove a negative about a hypothetical.", difficulty: "Medium", skill: "Facilitation" },
    ],
    scenarios: [
      {
        n: 1,
        title: "The retrospective where nobody says anything",
        blurb: "Fourth month running. The same three mild observations, no actions, and everyone leaves on time. You are new and have been asked to fix the retro.",
        role: "You have just joined as the team's scrum master.",
        start: "n1",
        minutes: 12,
        idealPath: ["n1", "n2", "n3", "end-ideal"],
        nodes: [
          {
            id: "n1",
            situation: `<p>You sit in on your first retrospective. It is well run and finishes early. The observations are about tooling and a flaky environment. Nobody mentions that the last two releases slipped, which everybody knows.</p><p>The engineering manager attends every retro and has done for a year.</p>`,
            prompt: "What do you do?",
            choices: [
              { id: "a", label: "Ask people individually, before the next retro, what they would not say in the room", outcome: "Three separate people tell you the same thing: the slips are caused by a commitment the manager makes to a stakeholder before the team sees the work. Nobody will say it with them present.", next: "n2", delta: 3 },
              { id: "b", label: "Introduce a new retro format with anonymous sticky notes", outcome: "The notes are anonymous and the room is not. The same three mild observations appear, in a different colour.", next: "n2", delta: -1, cost: { minutes: 90 } },
              { id: "c", label: "Lengthen the retro to ninety minutes so there is time to go deeper", outcome: "The same content takes longer. People are now mildly annoyed as well as quiet.", next: "n2", delta: -2, cost: { minutes: 180 } },
            ],
          },
          {
            id: "n2",
            situation: `<p>You now know the real issue and that it involves the manager, who is in the room every time and believes the retros are fine.</p>`,
            prompt: "How do you handle it?",
            choices: [
              { id: "a", label: "Talk to the manager privately, and propose they step out for a few retros", outcome: "Awkward, and they agree to try it. You frame it as testing whether the format is the problem, which is honest and does not require anybody to be accused.", next: "n3", delta: 3 },
              { id: "b", label: "Raise it in the retro itself, with the manager present", outcome: "You have asked people to demonstrate the exact risk they have been avoiding, in front of the person. Nobody backs you up, and the next retro is quieter.", next: "n3", delta: -3, violation: "Exposed the team to the risk they had been managing" },
              { id: "c", label: "Say nothing and work on the tooling observations", outcome: "The tooling improves slightly. Releases keep slipping, and in two months you will be asked why the retros are not working.", next: "n3", delta: -2 },
            ],
          },
          {
            id: "n3",
            situation: `<p>Two retros later, without the manager, the commitment problem is named openly. The team wants it fixed. The manager is not in the room and will need to hear it.</p>`,
            prompt: "How does it get back to them?",
            choices: [
              { id: "a", label: "The team agrees what to say, and you take it as one owned action", outcome: "You carry it as the team's position rather than as anybody's complaint, with a specific request: the team sees the work before a date is given.", next: "end-ideal", delta: 3 },
              { id: "b", label: "Report who said what, so the manager understands the detail", outcome: "The candour you just built lasts exactly one cycle.", next: "end-poor", delta: -3, violation: "Attributed statements made in confidence" },
            ],
          },
          {
            id: "end-ideal",
            situation: "<p>Done.</p>",
            prompt: "",
            ending: {
              verdict: "ideal",
              title: "You treated it as a safety problem, not a format problem",
              debrief: `<p>The two format changes on offer were both reasonable and both would have failed, because the constraint was not the structure of the meeting. Anonymous notes in a room where the person is present solve nothing.</p>
<p>What worked was finding out privately, changing who was in the room, and then carrying the outcome in a way that did not expose anybody. Note the sequence: you earned the information before you acted on it, and you did not spend the team's safety to make a point.</p>
<div class="key-idea"><span class="callout-label">The general rule</span><p>When a retrospective is quiet, ask whether it is a facilitation problem or a consequences problem. Only one of those is fixed by anything you do inside the meeting.</p></div>`,
            },
          },
          {
            id: "end-poor",
            situation: "<p>Done.</p>",
            prompt: "",
            ending: {
              verdict: "poor",
              title: "You spent the trust you had just built",
              debrief: `<p>Getting the room to speak was the hard part and you did it. Attributing who said what returned the situation to where it started, with the added cost that the team now knows what happens when they are candid with you.</p>
<p>The content needed to travel; the attribution did not. Carrying an agreed position as the team's, with a specific request attached, gets the same change made without anybody paying for it individually.</p>`,
            },
          },
        ],
        skills: ["Psychological safety", "Facilitation", "Decision"],
      },
    ],
  },
  5133: {
    topicId: 5133,
    title: "A sprint plan and a retro somebody could run",
    summary:
      "Produce the two documents a team actually hands over, written so that a person who was not in the room could pick them up and use them.",
    concepts: ["Sprint goal", "Capacity", "Working agreement", "Action owner", "Handover"],
    glossary: {
      "Sprint goal": "One sentence saying why this sprint matters, which the item list serves.",
      Capacity: "Realistic available time, after leave, support duty and known interruptions.",
      "Working agreement": "What the team has agreed about how it works, written down rather than assumed.",
      "Action owner": "The named person responsible for a retrospective action actually happening.",
      Handover: "Writing so that somebody who was not present can act without asking you.",
    },
    body: {
      Beginner: `<p>Two documents carry most of a team's process: the plan for the next sprint, and the record of what the last retrospective decided. Both are usually written for the people who were already there, which is why nobody can use them afterwards.</p>
<h3>What a sprint plan needs</h3>
<table>
<tr><th>Element</th><th>Why</th></tr>
<tr><td>A sprint goal, in one sentence</td><td>Without it the sprint is a list and there is nothing to steer by</td></tr>
<tr><td>Capacity, with the subtractions shown</td><td>Leave and support duty are real and get forgotten</td></tr>
<tr><td>The selected items</td><td>What was chosen, and what was deliberately not</td></tr>
<tr><td>Known risks</td><td>The dependency that will stop you, named before it does</td></tr>
</table>
<h3>What a retro record needs</h3>
<p>Not the discussion. One or two actions, each with a named owner and the sprint it lands in. A list of twelve observations with no owners is a record that nothing will change.</p>
<div class="key-idea"><span class="callout-label">Write for the person who was not there</span><p>A new joiner, somebody returning from leave, or you in three months. If the document only makes sense to people who remember the conversation, it is notes rather than a plan.</p></div>
<div class="warning"><span class="callout-label">Capacity is not headcount times days</span><p>Six people for ten days is not sixty days of work. Subtract leave, support rota, meetings and the interruptions you get every sprint. Teams that skip this over-commit every time and treat it as a surprise.</p></div>
<h3>The two documents, in one page and a half</h3>
<p>A sprint plan and a retro record. Both short, both written for somebody who was not in the room. If either only makes sense to people who remember the conversation, it is notes rather than a document.</p>
<h3>Say what you are not doing</h3>
<p>One line naming what was deliberately left out turns a list into a decision, and it is the thing a stakeholder most often wants three weeks later when they ask what happened to their request.</p>`,
      Intermediate: `<p>The sprint goal is the part most often missing and the part that does the most work. It is what lets the team drop or swap an item and still succeed, because success is defined by the goal rather than by the list.</p>
${FIG_CAPACITY}
<h3>A goal, and a non-goal</h3>
<table>
<tr><th>Not a goal</th><th>A goal</th></tr>
<tr><td>Complete items 412, 418, 423 and 431</td><td>A customer can reset their own password without contacting support</td></tr>
<tr><td>Finish the payments work</td><td>Card payments work end to end for one currency in staging</td></tr>
</table>
<p>The right-hand versions say what will be true at the end. That is testable, it tells you which items matter if time runs short, and it gives the review something to inspect.</p>
<h3>Capacity, worked</h3>
<table>
<tr><th>Line</th><th class="num">Days</th></tr>
<tr><td>Six people, ten working days</td><td class="num">60</td></tr>
<tr><td>Less annual leave</td><td class="num">-7</td></tr>
<tr><td>Less support rota, one person</td><td class="num">-10</td></tr>
<tr><td>Less ceremonies and overheads, about 15%</td><td class="num">-6</td></tr>
<tr><th>Realistic capacity</th><th class="num">37</th></tr>
</table>
<p>Thirty-seven, not sixty. A team planning against the headline number over-commits by more than a third before anything goes wrong, then explains the shortfall as poor estimation.</p>
<div class="key-idea"><span class="callout-label">Record what you chose not to do</span><p>One line naming what was deliberately left out makes the plan a decision rather than a list, and it is the thing stakeholders most often want to know later.</p></div>
<h3>Risks need owners, not adjectives</h3>
<p>A risk written as the integration might be delayed is a worry. Written as the payments API change lands on the fourteenth, Priya confirming on the tenth, it is something somebody will actually check. The difference is a name and a date.</p>
<h3>A plan is a negotiating document</h3>
<p>Showing the capacity subtraction before the commitment rather than after the slip is what makes an honest conversation possible. It moves the discussion from why were you late to which of these do you want, which is a conversation that can have a good outcome.</p>
<h3>What belongs in the plan and what does not</h3>
<table>
<tr><th>In</th><th>Out</th></tr>
<tr><td>The goal, in one testable sentence</td><td>A restatement of the item titles</td></tr>
<tr><td>Capacity with its subtractions</td><td>Headcount multiplied by days</td></tr>
<tr><td>What was deferred, and why</td><td>Everything in the backlog</td></tr>
<tr><td>Risks with owners and dates</td><td>Generic concerns</td></tr>
</table>
<p>The left column fits on one page. The right column is how a plan becomes a document nobody reads.</p>
<h3>Write the goal before selecting items</h3>
<p>Selecting first and then summarising what you selected produces a sentence that describes a list. Writing the goal first makes the selection serve it, and immediately tells you which candidate items do not.</p>
<h3>Half a page is a target, not a constraint</h3><p>If the retro record needs more than that, the team probably agreed too many actions. Two owned actions beat eight aspirations, and the shorter document is the one that gets read at the start of the next sprint.</p>`,
      Advanced: `<p>A retrospective action that is written down and not scheduled will not happen. The difference between a team that improves and one that holds the same conversation monthly is almost entirely mechanical.</p>
<table>
<tr><th>Weak action</th><th>Strong action</th></tr>
<tr><td>Improve our test coverage</td><td>Add tests to the payments module. Priya. This sprint. 1 day reserved.</td></tr>
<tr><td>Communicate better with design</td><td>Design joins refinement from this sprint. Sam to arrange by Friday.</td></tr>
<tr><td>Reduce work in progress</td><td>Set the In Progress limit to 4 on Monday. Whole team. Review in two sprints.</td></tr>
</table>
<p>Each strong version has an owner, a date and a place in the plan. None requires more insight than the weak version; they require somebody to have made it concrete before the meeting ended.</p>
<h3>Working agreements, and when to write one</h3>
<p>Write one when the same friction recurs: what counts as done, how quickly reviews happen, what happens when somebody is blocked, when the team is reachable. Keep it short and revisit it when it is broken rather than on a schedule. A twenty-point charter written in week one and never read again is a different artefact from a four-point agreement the team actually appeals to.</p>
<div class="key-idea"><span class="callout-label">The test for any process document</span><p>Would somebody joining next week behave differently after reading it? If not, it is describing rather than deciding, and describing is what a wiki page is for.</p></div>
<h3>Record why, not only what</h3>
<p>Most recurring arguments in a team are decisions nobody wrote down, being relitigated by people who were not there the first time. One line of reasoning next to a decision costs seconds and saves the same discussion three times.</p>
<h3>Reserve capacity for the retro action, explicitly</h3>
<p>The retrospective produces work and the sprint plan is where capacity is allocated. Keeping them in separate documents is the commonest reason improvement never happens: it was agreed in one place and never appeared in the other. A single line in the capacity table is the entire mechanism.</p>
<h3>Review the plan at the end against what happened</h3>
<p>Not to assign blame, but because the gap between planned and actual capacity is the most useful input to the next plan. Teams that never do this keep the same optimistic subtraction indefinitely and treat the resulting shortfall as a surprise each time.</p>
<h3>The capacity line that gets argued about</h3>
<p>The overhead percentage. Teams guess at it and then defend the guess; the better move is to measure it once, from a few sprints of calendar data, and cite the figure. An overhead of fifteen per cent sourced from your own history is very hard to argue with, and a guess of ten is very easy to argue down to five.</p>
<h3>Deferred items need a destination</h3>
<p>Saying something was deferred without saying where it went leaves the stakeholder to assume it was dropped. Naming the sprint, or saying explicitly that it returns to the backlog unranked, is the difference between a decision and an omission.</p>
<h3>Review the plan against the outcome</h3>
<p>Not for blame, but because the gap between planned and actual capacity is the single most useful input to the next plan. Teams skipping this keep an optimistic subtraction indefinitely and treat the same shortfall as a fresh surprise each sprint.</p>
<h3>Date every document</h3><p>A plan without a date cannot be placed in a sequence, and the whole value of keeping them is being able to see what changed between one sprint and the next.</p>`,
      Expert: `<p>Handover quality is the property that separates a team's process from one person's habits, and it is rarely assessed. The question is not whether the documents exist but whether somebody outside the team could run the next sprint from them.</p>
<table>
<tr><th>Reader</th><th>What they need from the plan</th></tr>
<tr><td>A new joiner</td><td>Why this sprint, and what to work on first</td></tr>
<tr><td>Somebody covering while you are away</td><td>Capacity, risks, and what to drop if pressed</td></tr>
<tr><td>A stakeholder</td><td>What will be true at the end, and what was deferred</td></tr>
<tr><td>The team in three months</td><td>Why a decision was taken, so it is not relitigated</td></tr>
</table>
<p>The last row is the one that pays off longest. Most recurring arguments in a team are decisions nobody recorded, rediscussed by people who were not there the first time.</p>
<h3>The honest capacity conversation</h3>
<p>Capacity planning fails politically rather than arithmetically. Everybody can subtract leave; what is hard is saying out loud that the realistic figure is thirty-seven when a date has already been given based on sixty. Writing the subtraction down, before the commitment rather than after the slip, is what makes that conversation possible at all, and it is why the plan is a negotiating document as much as a planning one.</p>
<h3>Why both documents belong together</h3>
<p>The retrospective produces actions that consume capacity, and the sprint plan is where capacity is allocated. Keeping them in separate places is the commonest reason improvement work never happens: it was agreed in one document and never appeared in the other. A plan with a line reserving a day for the retro action is the entire mechanism.</p>
<div class="field"><span class="callout-label">What to hand over, concretely</span><p>One page for the sprint and half a page for the retro. Goal, capacity with subtractions, items, what was deferred, risks, and one or two owned actions with dates. A team that produces that consistently is doing the part of agile that survives a change of personnel, which is a far better test of an adoption than whether the ceremonies happen.</p></div>
<h3>The handover test</h3>
<p>Could somebody outside the team run the next sprint from these documents? That is a higher bar than whether the documents exist, and it is the property that distinguishes a team's process from one person's habits. It is also what makes a team survivable: the usual single point of failure in a well-run team is the person who holds the context nobody wrote down.</p>
<h3>Four readers, four needs</h3>
<p>A new joiner needs to know why this sprint and what to pick up. Somebody covering leave needs capacity, risks and what to drop under pressure. A stakeholder needs what will be true at the end and what was deferred. The team in three months needs why a decision was taken. A document serving all four is barely longer than one serving none.</p>
<h3>Why this is the final topic</h3>
<p>Everything else in this course is a mechanism, and mechanisms are carried by people who can leave. These two documents are where the mechanisms become the team's rather than an individual's, which is the only version of an agile adoption that outlives the person who introduced it.</p>
<h3>Documents as the artefact that outlives the person</h3>
<p>Every mechanism in this course is carried by people, and people leave. The two documents in this topic are where a team's practice stops being one person's habit and becomes something another person can pick up. That is a less exciting claim than most of the ones made for agile and it is the one that determines whether an adoption survives a year.</p>
<h3>Writing for the investigator</h3>
<p>Of the four readers, the one who turns up when something went wrong is the most demanding: they want to know what was known, what was decided and by whom. A plan that satisfies them satisfies the other three automatically, and the additional effort is a line of reasoning next to each decision rather than a different document.</p>`,
    },
    questions: [
      { n: 1, question: "Why does a sprint goal matter more than the item list?", options: ["It defines success, so items can be swapped or dropped and the sprint still succeeds", "It is required for certification", "It replaces the need for estimates", "It gives stakeholders a date"], answer: 0, explanation: "Without a goal, a sprint is a list of unrelated items and any one can be dropped without consequence, so there is nothing to protect and nothing to steer by when time runs short. With one, the team can change how it gets there and still deliver what mattered, which is the flexibility the framework is supposed to provide and the thing most often missing in practice.", difficulty: "Easy", skill: "Sprint goal" },
      { n: 2, question: "Six people, ten working days. Why is sixty days the wrong capacity figure?", options: ["Leave, support duty and ceremonies all come out of it first", "People work more than eight hours", "Capacity should be measured in points", "Sprints are nine days in practice"], answer: 0, explanation: "Subtracting leave, a support rota and the standing ceremony cost can easily take sixty down to something nearer thirty-seven. A team planning against the headline number over-commits by more than a third before anything has gone wrong, then explains the shortfall as poor estimation, which sends them to improve the wrong thing.", difficulty: "Medium", skill: "Capacity" },
      { n: 3, question: "What makes a retrospective action likely to actually happen?", options: ["A named owner, a date, and reserved capacity in the sprint plan", "Being voted on by the team", "Being written on the board", "Being reviewed at the next retro"], answer: 0, explanation: "An action with no owner and no place in the plan is an intention, and intentions lose to committed work every time. The three elements are mechanical rather than motivational, which is the point: the difference between a team that improves and one that repeats the same conversation monthly is usually scheduling rather than insight.", difficulty: "Medium", skill: "Action owner" },
      { n: 4, question: "What is the test for whether a process document is worth having?", options: ["Would somebody joining next week behave differently after reading it", "Is it approved by management", "Is it under two pages", "Does it cover every scenario"], answer: 0, explanation: "A document that changes nobody's behaviour is describing rather than deciding, and description belongs on a wiki page nobody has to maintain. The test also explains why long charters fail: a twenty-point document written in week one is not appealed to, while a four-point agreement the team actually invokes when something goes wrong is doing work.", difficulty: "Medium", skill: "Working agreement" },
      { n: 5, question: "Why should the retro record and the sprint plan live together?", options: ["Retro actions consume capacity, which the plan is where capacity is allocated", "It reduces the number of documents", "Stakeholders prefer one file", "It is required by the framework"], answer: 0, explanation: "This is the commonest reason improvement work never happens: an action is agreed in one document and never appears in the other, so it has no capacity and loses to feature work. A plan with an explicit line reserving a day for the retro action is the entire mechanism, and it is a one-line change that most teams have never made.", difficulty: "Hard", skill: "Handover" },
      { n: 6, question: "Why is capacity planning described as failing politically rather than arithmetically?", options: ["The subtraction is easy; saying the real number after a date was promised is not", "The arithmetic is genuinely complex", "Teams cannot measure leave accurately", "Tools do not support it"], answer: 0, explanation: "Everybody can subtract leave and a support rota. What is hard is stating that realistic capacity is thirty-seven when a commitment was already made on the basis of sixty. Writing the subtraction down before the commitment rather than after the slip is what makes that conversation possible, which is why the plan functions as a negotiating document as much as a planning one.", difficulty: "Hard", skill: "Capacity" },
    ],
    deliverables: [
      {
        n: 1,
        title: "A sprint plan and a retro record another team could run from",
        brief: `<p>Produce the two documents for one real sprint. Use your own team, a team you are joining, or the scenario running through this course.</p>
<p>The test is whether somebody who was not in either meeting could pick these up, run the sprint, and know what to drop if it goes badly.</p>
<h3>What to submit</h3>
<ol>
<li>A sprint plan: the goal in one sentence, capacity with the subtractions shown, the selected items, what was deliberately deferred, and the known risks with owners.</li>
<li>A retro record: at most two actions, each with a named owner, a date and the capacity reserved for it in the plan above.</li>
<li>A short working agreement, if the team has one, or a note saying why not.</li>
</ol>
<div class="key-idea"><span class="callout-label">Write for somebody who was not there</span><p>A new joiner, a person covering your leave, or yourself in three months. If a line only makes sense to those who remember the conversation, rewrite it.</p></div>
<div class="warning"><span class="callout-label">The two documents must reference each other</span><p>A retro action with no reserved line in the plan is the commonest way improvement work fails. If your action does not appear in your capacity, say so and explain the decision.</p></div>`,
        requires: [
          { key: "plan", label: "The sprint plan", formats: ["PDF", "DOCX", "MD"], note: "One page. Goal, capacity with the subtraction shown, items, deferred items, risks with owners." },
          { key: "retro", label: "The retro record", formats: ["PDF", "DOCX", "MD"], note: "Half a page. At most two actions, each with an owner, a date and where its capacity comes from." },
          { key: "agreement", label: "Working agreement or a note", formats: ["PDF", "DOCX", "MD"], note: "Short, and only the points the team actually appeals to. A note explaining why there is none is an acceptable submission." },
        ],
        rubric: [
          { key: "goal", label: "The sprint goal is testable", bands: ["A list of items, or no goal at all", "A goal, but it restates the items", "One sentence saying what will be true at the end", "That, plus it makes clear which items could be dropped"], weight: 9 },
          { key: "capacity", label: "Capacity shows its working", bands: ["Headcount times days", "Some subtraction, unexplained", "Subtractions itemised and realistic", "That, plus a stated assumption about interruptions based on history"], weight: 9 },
          { key: "actions", label: "Retro actions are executable", bands: ["Observations with no owners", "Actions with owners but no dates", "Owner, date and specific change", "That, plus capacity reserved in the plan"], weight: 9 },
          { key: "handover", label: "A stranger could run from it", bands: ["Only intelligible to attendees", "Mostly clear, some shorthand", "Self-contained and specific", "That, plus it records why decisions were taken, not only what"], weight: 9 },
        ],
        modelAnswer: `<h3>What a strong submission looks like</h3>
<p>The plan fits on one page. The goal reads: a customer can reset their own password without contacting support. It is testable, and it immediately tells the reader that the two items about audit logging are the ones to drop if the sprint gets tight.</p>
<h3>The capacity section</h3>
<table>
<tr><th>Line</th><th class="num">Days</th></tr>
<tr><td>Six people, ten days</td><td class="num">60</td></tr>
<tr><td>Annual leave, two people</td><td class="num">-7</td></tr>
<tr><td>Support rota</td><td class="num">-10</td></tr>
<tr><td>Ceremonies and overheads, measured at 15% last quarter</td><td class="num">-6</td></tr>
<tr><td>Reserved for retro action</td><td class="num">-1</td></tr>
<tr><th>Planned against</th><th class="num">36</th></tr>
</table>
<p>The fifteen per cent is sourced from the team's own history rather than guessed, and the retro action appears as a line rather than as a hope. Those two details are most of what separates a four from a three.</p>
<h3>The retro record</h3>
<p>Two actions, not twelve. Each reads like a change rather than an aspiration: set the In Progress limit to four on Monday, whole team, review in two sprints; and Priya adds tests to the payments module this sprint, one day, which is the reserved line above.</p>
<div class="field"><span class="callout-label">The detail markers look for</span><p>Whether the plan records what was deliberately not done, and why. Most submissions list what was chosen. The ones that also name what was deferred have turned a list into a decision, and that is the line a stakeholder reads first three weeks later when they ask what happened to their request.</p></div>`,
        minutes: 150,
        skills: ["Sprint goal", "Capacity", "Action owner", "Handover"],
      },
    ],
    evidence: [
      {
        n: 1,
        title: "Film five minutes of a real board walk",
        brief: `<p>Record a short screen or phone capture of a real board being read, by you or by your team, using the order from the board topic: oldest item, blockers, limits, widest column, then what to start.</p>
<h3>What the recording has to show</h3>
<ol>
<li>The board itself, with enough detail to see columns, cards and any limits.</li>
<li>The age of the oldest item in progress, said out loud and visible on the card or in the tool.</li>
<li>At least one decision reached during the walk, not merely an observation.</li>
</ol>
<div class="warning"><span class="callout-label">A real board, not a prepared one</span><p>Tidying the board before recording defeats the exercise. A messy board with genuine blockers is a far better submission than a clean one that was arranged for the camera.</p></div>`,
        captures: [
          { key: "walk", label: "The board walk", medium: "video", seconds: 300, mustShow: "The columns and cards, the age of the oldest in-progress item, any blocked markers, and the limits if the board has them." },
          { key: "decision", label: "The decision", medium: "video", seconds: 60, mustShow: "A specific decision reached and stated: who will do what, about which item, today." },
        ],
        integrity: [
          "One continuous recording, not edited between the walk and the decision",
          "Your enrolment id written on paper or visible on screen at the start",
          "The board as it actually stood, with no tidying beforehand",
          "If using a physical board, the date visible somewhere in frame",
        ],
        rubric: [
          { key: "order", label: "The walk follows the diagnostic order", bands: ["Left to right, person by person", "Mixed order, some diagnosis", "Oldest first, then blockers and limits", "That, plus starting new work considered last"], weight: 9 },
          { key: "age", label: "Item age is used, not just mentioned", bands: ["Age not visible anywhere", "Age mentioned in passing", "Age visible and used to pick what to discuss", "That, plus compared against the team's usual range"], weight: 9 },
          { key: "decision", label: "A decision is reached", bands: ["Status reported, nothing decided", "A vague intention", "A specific decision with a named person", "That, plus it is recorded on the board during the walk"], weight: 9 },
        ],
        exemplar: [
          { criterion: "order", band: 3, note: "Starts at the oldest card, goes to blockers, and only looks at the backlog at the very end." },
          { criterion: "age", band: 2, note: "Age is visible on the cards and drives which item is discussed, but is not compared to the team's normal range." },
          { criterion: "decision", band: 3, note: "Two people agree to pair on the stuck item that morning, and the card is updated on camera." },
        ],
        minutes: 30,
        skills: ["Ageing", "Blocker", "Queue"],
      },
    ],
  },
};

export default curriculum;
