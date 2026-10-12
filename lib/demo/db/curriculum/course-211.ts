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
${FIG_THREE}
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
${FIG_THREE}
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
<p>The last two rows differ in style and match in mechanism, which is why arguing Scrum against Kanban is usually less productive than asking what the batch size is.</p>`,
      Expert: `<p>The manifesto is four preference statements, each of the form we value A over B while there is value in B. That structure is routinely dropped in quotation, which converts a statement about trade-offs into a prohibition, and almost every misuse of the word agile traces back to that elision.</p>
${FIG_THREE}
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
<p>Little's law applies to any stable queueing system, which includes a team's work in progress, so a team can predict the effect of halving WIP and then check whether it happened. Most of what is presented as agile metrics is not of that kind: velocity is a local convention, story points are not units, and a burndown is a visualisation rather than a measurement. Knowing which of your numbers rest on a theorem and which rest on a habit is worth more than any individual metric.</p>`,
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
<p>The pattern is that the three honest options all have a price somebody can see, and that visibility is the mechanism. Interruption without cost increases until it fills the sprint.</p>`,
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
<p>An item that does not finish is re-estimated, re-planned and re-discussed, so the cost of not finishing is paid several times. Teams that tolerate routine carry-over are usually sizing items against a sprint rather than against a few days, and the fix is splitting rather than extending the sprint.</p>`,
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
<div class="field"><span class="callout-label">The question that reveals whether Scrum is doing anything</span><p>Ask what the team decided not to do last sprint, and who decided it. A functioning Scrum produces a steady stream of explicit prioritisation decisions attributable to one person. If nobody can name one, the backlog is not being ordered, and the central mechanism is absent however well the events are run.</p></div>`,
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
${FIG_WIP}
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
<div class="warning"><span class="callout-label">Visible does not mean managed</span><p>Putting the work on a wall is step one and achieves nothing by itself. Plenty of teams have a beautiful board, no limits, and exactly the same delivery as before.</p></div>`,
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
<p>A common starting point is roughly one and a half items per person in the active columns, then tightening. The goal is not the number; it is that the limit binds often enough to force conversations about finishing.</p>`,
      Advanced: `<p>Blocked items are the thing boards are worst at showing. An item sitting in a column for three weeks looks identical to one that arrived yesterday, so the ageing has to be made visible deliberately.</p>
${FIG_WIP}
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
<div class="key-idea"><span class="callout-label">Bottlenecks move, so the limit must too</span><p>Fix the constraint at one step and it reappears at the next. A board whose limits were set once and never revisited is optimising for a bottleneck the team no longer has, which is why reviewing them is a standing item rather than a setup task.</p></div>`,
      Expert: `<p>Kanban arrives from manufacturing with queueing theory attached, and the theory explains things teams otherwise find mysterious. Utilisation and queue length are related non-linearly: as a resource approaches full utilisation, waiting time rises sharply rather than gradually.</p>
${FIG_WIP}
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
<div class="field"><span class="callout-label">What to measure first on a real team</span><p>Cycle time per item and work in progress, nothing else, for six weeks. Those two give you Little's law, a distribution to forecast from, and evidence for the WIP conversation. Teams that start by instrumenting everything produce a dashboard nobody reads; teams that start with two numbers usually change something.</p></div>`,
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
<div class="warning"><span class="callout-label">This is the part no ceremony can substitute for</span><p>A team with a slow, flaky test suite and a long-lived branch will not become responsive by holding a stand-up. The constraint is technical, and only technical work moves it.</p></div>`,
      Intermediate: `<p>XP spread least of the three and made the strongest claims, and the reason is cost. Scheduling a meeting costs calendar time. Writing tests first costs a change in how every engineer works, every day, and it is slower before it is faster.</p>
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
<div class="warning"><span class="callout-label">A flaky test suite is worse than no suite</span><p>If failures are routinely ignored because they are often spurious, the suite has stopped being a signal and is now a tax. Fixing or deleting flaky tests is higher value than adding new ones, and teams consistently do the opposite.</p></div>`,
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
<p>Letting anybody change anything is only safe when the tests will catch what they break. Without that, collective ownership degrades into collective fear, and the team reverts to informal gatekeeping with no record of who decides. The sequence matters: the net comes first, the ownership policy second.</p>`,
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
<div class="field"><span class="callout-label">If a team can change one thing</span><p>Make the build fast and trustworthy, and merge to trunk daily. Those two unlock the others: refactoring becomes safe, collective ownership becomes tenable, and feedback arrives in minutes rather than weeks. Teams that start with pairing or with test-first against a slow unreliable suite usually abandon both, and conclude the practices do not work when what failed was the order.</p></div>`,
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
${FIG_VELOCITY}
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
<div class="warning"><span class="callout-label">Velocity does not compare across teams</span><p>Two teams with the same velocity may be doing wildly different amounts of work, because each calibrated their scale independently. Comparing them is meaningless, and using velocity as a performance measure guarantees the numbers inflate.</p></div>`,
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
<p>For most teams the number of items finished per sprint is about as predictive as the number of points, because item sizes cluster once anything large is split. Teams that measure both for a quarter frequently find the estimation effort bought them very little, which is the most common path to dropping it.</p>`,
      Advanced: `<p>Probabilistic forecasting replaces the estimate with measured history. Take the last thirty completed items, look at how long each took, and read the distribution. The eighty-fifth percentile is a commitment you can defend with a number rather than a feeling.</p>
${FIG_VELOCITY}
<table>
<tr><th>Approach</th><th>Input</th><th>Output</th></tr>
<tr><td>Estimate and sum</td><td>Opinions about the future</td><td>A single date, usually optimistic</td></tr>
<tr><td>Velocity planning</td><td>Points per sprint</td><td>A sprint-level capacity figure</td></tr>
<tr><td>Probabilistic forecast</td><td>Measured cycle times</td><td>A date with a confidence attached</td></tr>
</table>
<p>The third is both more honest and usually more accurate, because it is derived from what actually happened rather than from what people expected before they started.</p>
<h3>Why estimates are biased in a predictable direction</h3>
<p>People estimate the path where nothing goes wrong, because that is the version they can picture. Interruptions, reviews, environment problems and the second round of feedback are all real and none of them appear in the mental simulation. This is why multiplying an estimate by a constant works surprisingly well and why the constant is stable per team, which is itself a hint that measurement would serve better than estimation.</p>
<div class="key-idea"><span class="callout-label">The single most useful question in planning</span><p>What is the largest item here, and can it be split? Large items carry most of the variance, so splitting them improves forecast accuracy more than any amount of refining the estimates on small ones.</p></div>`,
      Expert: `<p>The no-estimates argument is narrower than it sounds. It is not that forecasting is unnecessary; it is that per-item estimation is an expensive input to a forecast that measured history provides more cheaply and more accurately.</p>
${FIG_VELOCITY}
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
<div class="field"><span class="callout-label">A cheap experiment worth running</span><p>For one quarter, record both the estimate and the actual cycle time for every item, and also record a forecast made purely from item counts. Then compare. Most teams discover the count-based forecast is at least as good, at which point the estimation question answers itself with their own data rather than with an argument.</p></div>`,
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
};

export default curriculum;
