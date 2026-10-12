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
};

export default curriculum;
