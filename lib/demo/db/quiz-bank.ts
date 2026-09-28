import { peekTopic, type AuthoredQuestion } from "./curriculum";
/**
 * The MCQ bank.
 *
 * Questions are authored per COURSE rather than per topic. There are ~120 topics
 * in the catalogue and hand-writing a bank for each is not realistic, but a
 * generated question is instantly recognisable as filler - and the quiz is the
 * screen where a prospect judges whether the "adaptive" claim is real. A
 * course-level bank keeps every question genuinely on-subject, and the selector
 * prefers the ones whose skill matches the topic being studied.
 *
 * Each question carries a difficulty and a target skill, which is what the
 * adaptive selector actually steers on: answer well and it climbs, struggle and
 * it drops back.
 */

/**
 * Option shape is `{ id, label, value }` because that is what `AdaptiveOption`
 * in lib/types/adaptive-quiz.ts declares. Emitting `{ key, text }` instead did
 * not fail loudly - the quiz rendered the question and then jumped straight to
 * the confidence prompt with no answers on screen at all.
 */
export interface DemoMcq {
  id: number;
  question: string;
  options: { id: string; label: string; value: string }[];
  correct: string;
  difficulty: "Easy" | "Medium" | "Hard";
  skill: string;
  explanation: string;
}

let mcqSeq = 700_000;
function mcq(
  question: string,
  options: [string, string, string, string],
  correctIndex: number,
  difficulty: DemoMcq["difficulty"],
  skill: string,
  explanation: string,
): DemoMcq {
  const keys = ["A", "B", "C", "D"];
  return {
    id: mcqSeq++,
    question,
    // `id` is the letter badge and the value submitted back (QuestionCard calls
    // onSelectOption(opt.id)); `value` is the answer TEXT, which it renders as
    // HTML. Putting the letter in `value` rendered four rows reading "A A B B".
    options: options.map((text, i) => ({ id: keys[i], label: text, value: text })),
    correct: keys[correctIndex],
    difficulty,
    skill,
    explanation,
  };
}

/**
 * Course id -> question bank.
 *
 * Questions are authored per COURSE rather than per topic: hand-writing a bank
 * for every topic is not realistic, and a generated question is instantly
 * recognisable as filler on the one screen where a visitor judges whether the
 * "adaptive" claim is real. The selector prefers the ones whose `skill` matches
 * the topic being studied, so a course-level bank still reads as on-topic.
 *
 * Written for eleven to thirteen year olds, which changes the questions in a way
 * worth stating. Every wrong option is a mistake a child actually makes rather
 * than a filler answer, because the explanation's job is to name the tempting
 * wrong answer and say why it is wrong. A distractor nobody would pick teaches
 * nothing and makes the question easier than it looks.
 */
export const QUIZ_BANK: Record<number, DemoMcq[]> = {
  // Fractions, Decimals and Shapes
  301: [
    mcq(
      "Which of these is the same amount as 3/4?",
      ["6/8", "4/5", "3/8", "1/2 + 1/3"],
      0,
      "Easy",
      "Fractions",
      "Multiply the top and the bottom by the same number and the amount does not change: 3/4 doubled on both sides is 6/8. The tempting wrong answer is 4/5, because 4 and 5 look like they follow 3 and 4, but that is a different amount.",
    ),
    mcq(
      "What is 1/3 + 1/6?",
      ["2/9", "1/2", "2/6", "1/9"],
      1,
      "Medium",
      "Fractions",
      "You can only add fractions once the bottoms match. 1/3 is 2/6, and 2/6 + 1/6 is 3/6, which is 1/2. Adding the tops and the bottoms separately gives 2/9, which is the most common mistake here and is smaller than either fraction you started with.",
    ),
    mcq(
      "Which is larger, 2/5 or 3/8?",
      ["2/5", "3/8", "They are equal", "You cannot compare them"],
      0,
      "Medium",
      "Fractions",
      "Put them over the same bottom: 2/5 is 16/40 and 3/8 is 15/40, so 2/5 is larger. Comparing the bottoms alone suggests 3/8 is bigger because eighths sound smaller, which is why this one catches people.",
    ),
    mcq(
      "What is 0.25 as a fraction in its simplest form?",
      ["25/10", "1/4", "1/25", "2.5/10"],
      1,
      "Easy",
      "Decimals",
      "0.25 is 25 hundredths, or 25/100, and both divide by 25 to give 1/4. A fraction in simplest form never has a decimal point in it, which rules out the last option immediately.",
    ),
    mcq(
      "A shirt costs 800 rupees and is reduced by 15%. What do you pay?",
      ["785", "680", "720", "120"],
      1,
      "Medium",
      "Percentages",
      "15% of 800 is 120, so you pay 800 minus 120, which is 680. Choosing 120 is answering a different question: that is the discount, not the price.",
    ),
    mcq(
      "Two angles of a triangle are 50 degrees and 60 degrees. What is the third?",
      ["70", "80", "60", "110"],
      0,
      "Easy",
      "Angles",
      "The three angles of any triangle add to 180. 180 minus 50 minus 60 is 70. Answering 110 adds the two you were given and forgets to subtract from 180.",
    ),
    mcq(
      "A rectangle is 8 cm long and 3 cm wide. What is its perimeter?",
      ["24 cm", "11 cm", "22 cm", "48 cm"],
      2,
      "Easy",
      "Area",
      "Perimeter is the distance all the way round: 8 + 3 + 8 + 3, which is 22 cm. 24 is the AREA, and mixing up the two is the single most common slip in this topic.",
    ),
    mcq(
      "You cut a pizza into 8 slices and eat 3. Your friend eats 2. What fraction is left?",
      ["3/8", "5/8", "1/8", "2/8"],
      0,
      "Easy",
      "Fractions",
      "5 slices of 8 are gone, so 3 of 8 are left. 5/8 is the amount EATEN, which is what you get if you stop one step early.",
    ),
    mcq(
      "Which calculation finds 40% of 250?",
      ["250 / 40", "250 x 0.4", "250 + 40", "40 / 250"],
      1,
      "Medium",
      "Percentages",
      "A percentage is a fraction of 100, so 40% is 0.4 and you multiply. Dividing by 40 shrinks the number far too much, and it is worth checking your answer is smaller than 250 but not tiny.",
    ),
  ],

  // Matter, Motion and Living Things
  302: [
    mcq(
      "Why does a gas fill its whole container when a liquid does not?",
      [
        "Gas particles are lighter than liquid particles",
        "Gas particles move freely and spread out until something stops them",
        "Gases have no particles",
        "Liquids are heavier so they sink",
      ],
      1,
      "Easy",
      "States of matter",
      "In a gas the particles are far apart and moving in all directions, so they keep spreading until a wall stops them. It is not about weight: the same substance can be a gas or a liquid without its particles changing at all.",
    ),
    mcq(
      "Water boils at 100 degrees Celsius. While it is boiling, what happens to its temperature?",
      ["It keeps rising", "It stays at 100", "It falls", "It rises then falls"],
      1,
      "Medium",
      "States of matter",
      "The temperature holds steady while the water is changing state, because the heat going in is being used to pull the particles apart rather than to speed them up. This is why a pan of boiling water cannot get hotter however high the flame.",
    ),
    mcq(
      "Which method would separate sand from water?",
      ["Evaporation", "Filtering", "Magnetism", "Freezing"],
      1,
      "Easy",
      "Mixtures",
      "Sand does not dissolve, so its grains sit on the filter paper while the water passes through. Evaporation would work for SALT and water, where the salt is dissolved and the water has to be driven off instead.",
    ),
    mcq(
      "You slide a book across a table and it slows down. What slows it?",
      ["Gravity", "Friction", "Its own weight", "Nothing, it just runs out of speed"],
      1,
      "Easy",
      "Forces",
      "Friction between the book and the table pushes back against the motion. Things do not run out of speed on their own: without a force acting, a moving object would keep going at the same speed forever.",
    ),
    mcq(
      "A cyclist covers 60 metres in 10 seconds. What is her speed?",
      ["6 m/s", "600 m/s", "0.6 m/s", "70 m/s"],
      0,
      "Easy",
      "Motion",
      "Speed is distance divided by time: 60 divided by 10 is 6 metres per second. Multiplying instead of dividing gives 600 m/s, which is faster than a jet and is a useful sign you have the operation the wrong way round.",
    ),
    mcq(
      "What do plant cells have that animal cells do not?",
      ["A nucleus", "A cell wall", "A cell membrane", "Cytoplasm"],
      1,
      "Easy",
      "Cells",
      "Only plant cells have a rigid cell wall outside the membrane, which is what holds a plant upright. Both kinds have a nucleus, a membrane and cytoplasm, so those three cannot be the answer to a question about a difference.",
    ),
    mcq(
      "What does a plant actually take IN during photosynthesis?",
      [
        "Oxygen and water",
        "Carbon dioxide and water",
        "Oxygen and sugar",
        "Carbon dioxide and oxygen",
      ],
      1,
      "Medium",
      "Photosynthesis",
      "A plant takes in carbon dioxide through its leaves and water through its roots, and gives OUT oxygen. Oxygen is the thing most people name first because we breathe it, but here it is the product, not the ingredient.",
    ),
    mcq(
      "In the food chain grass to grasshopper to frog to snake, what happens if the frogs disappear?",
      [
        "Nothing changes",
        "Grasshoppers increase and snakes decrease",
        "Grasshoppers decrease and snakes increase",
        "Only the grass is affected",
      ],
      1,
      "Hard",
      "Food chains",
      "Frogs eat grasshoppers, so without them grasshopper numbers rise. Snakes eat frogs, so snakes lose their food and fall. A change in the middle of a chain travels in BOTH directions, which is the part that is easy to miss.",
    ),
    mcq(
      "Which change can you reverse?",
      ["Burning paper", "Melting ice", "Cooking an egg", "Rusting iron"],
      1,
      "Easy",
      "States of matter",
      "Melted ice can be frozen again, so it is a physical change. The other three make a new substance and cannot be undone, which is what makes them chemical changes.",
    ),
  ],

  // Reading Closely, Writing Clearly
  303: [
    mcq(
      "What is the main idea of a paragraph?",
      [
        "The first sentence, always",
        "The point the whole paragraph is making",
        "The longest sentence",
        "Whatever is repeated most",
      ],
      1,
      "Easy",
      "Main idea",
      "The main idea is the point every sentence is serving. It often sits in the first sentence, which is why that answer is tempting, but a writer can just as easily build to it and put it last.",
    ),
    mcq(
      "\"Ravi pulled his collar up and walked faster past the gate.\" What can you infer?",
      [
        "Ravi is cold or uneasy",
        "Ravi is late for school",
        "Ravi owns a coat",
        "The gate is broken",
      ],
      0,
      "Medium",
      "Inference",
      "Pulling a collar up and speeding past something suggests cold or unease. Inference means reasoning from evidence on the page: that he owns a coat is stated rather than inferred, and being late is a story you added.",
    ),
    mcq(
      "A character says one thing and does the opposite. What should a careful reader conclude?",
      [
        "The writer made a mistake",
        "The character's actions show what they really want",
        "The dialogue is the truth",
        "Nothing, people are just inconsistent",
      ],
      1,
      "Medium",
      "Character",
      "When words and actions disagree, the actions are the stronger evidence, and the gap between them is usually the point the writer is making. Taking dialogue as automatically true is what a character who is lying depends on.",
    ),
    mcq(
      "Which sentence is the best topic sentence for a paragraph about why school should start later?",
      [
        "School starts at 7:30 in my town.",
        "Starting school an hour later would make students learn more.",
        "I hate waking up early.",
        "Many things could be improved about school.",
      ],
      1,
      "Medium",
      "Paragraphs",
      "A topic sentence states a point the rest of the paragraph can support. The first is a fact with nowhere to go, the third is a feeling rather than an argument, and the fourth is so broad it could introduce anything.",
    ),
    mcq(
      "Which description shows rather than tells?",
      [
        "The room was messy.",
        "Clothes covered the floor and the desk had three empty cups on it.",
        "It was a very very messy room.",
        "The room was the messiest room ever.",
      ],
      1,
      "Easy",
      "Description",
      "Showing gives the reader the evidence and lets them reach the conclusion themselves. The others announce the conclusion, and piling on words like very or messiest makes the claim louder without making the picture clearer.",
    ),
    mcq(
      "You are arguing that homework should be reduced. Why mention the strongest argument AGAINST you?",
      [
        "To fill space",
        "To show you have considered it and can answer it",
        "Because teachers require it",
        "To confuse the reader",
      ],
      1,
      "Hard",
      "Argument",
      "Answering the best objection is what makes an argument convincing rather than one-sided, because a reader who thought of it will not be persuaded until you have. Ignoring it does not make it go away, it just means the reader supplies it themselves.",
    ),
    mcq(
      "Which word signals that a writer is about to disagree with what came before?",
      ["Therefore", "However", "Similarly", "Furthermore"],
      1,
      "Easy",
      "Main idea",
      "However turns the argument. Therefore and furthermore continue in the same direction, and similarly adds a matching example, so spotting these words tells you where an argument changes course.",
    ),
    mcq(
      "A paragraph's sentences are all true but it still feels wrong. What is the most likely problem?",
      [
        "The sentences are too short",
        "They are not all about the same thing",
        "There are too few adjectives",
        "It does not start with a question",
      ],
      1,
      "Medium",
      "Paragraphs",
      "A paragraph holds together when every sentence serves one point. True sentences about different points still read as a list rather than as an argument, and no amount of description fixes it.",
    ),
  ],

  // Maps, Empires and Citizens
  304: [
    mcq(
      "On a map with a scale of 1 cm to 5 km, two towns are 7 cm apart. How far apart are they really?",
      ["12 km", "35 km", "5 km", "70 km"],
      1,
      "Easy",
      "Maps",
      "Each centimetre stands for 5 km, so 7 centimetres is 7 times 5, or 35 km. Adding the two numbers gives 12, which is the slip to watch for when a question mixes two units.",
    ),
    mcq(
      "Why do maps of the world disagree about the size of Greenland?",
      [
        "Nobody has measured it",
        "Flattening a round Earth onto paper always distorts something",
        "Greenland is growing",
        "Older maps were simply wrong",
      ],
      1,
      "Hard",
      "Maps",
      "You cannot flatten a sphere without stretching it somewhere, so every map makes a choice about what to distort, and stretching is worst near the poles. This is a decision by the mapmaker rather than a mistake.",
    ),
    mcq(
      "Why did the earliest cities almost all grow beside rivers?",
      [
        "Rivers were easier to draw on maps",
        "Water for drinking, farming and transport",
        "Rivers kept enemies away",
        "It was a coincidence",
      ],
      1,
      "Easy",
      "Early cities",
      "A river supplies drinking water, irrigates crops and carries goods, and a settlement needs all three to grow past a village. It is worth noticing rivers were a route IN as well as out, so they did not make a city safer.",
    ),
    mcq(
      "What travelled along trade routes besides goods?",
      [
        "Only goods travelled",
        "Ideas, religions and diseases",
        "Only soldiers",
        "Only money",
      ],
      1,
      "Medium",
      "Trade",
      "Traders carried ideas, beliefs and illnesses along with their cargo, which is why writing systems and religions spread the same way silk did. Trade routes are as much a story about contact as about goods.",
    ),
    mcq(
      "What is the difference between a right and a rule?",
      [
        "There is none",
        "A right is something you are owed, a rule is something you must follow",
        "Rules apply to children, rights to adults",
        "Rights are written down, rules are not",
      ],
      1,
      "Medium",
      "Rights",
      "A right is a protection you hold and can claim; a rule is an obligation placed on you. Both are usually written down, so that is not what separates them.",
    ),
    mcq(
      "In a village panchayat, who chooses the members?",
      [
        "The state government",
        "The adults of the village, by vote",
        "The oldest family",
        "Nobody, the role is inherited",
      ],
      1,
      "Easy",
      "Local government",
      "Panchayat members are elected by the adults of the village, which is what makes it local self-government rather than administration handed down from above.",
    ),
    mcq(
      "Why do more people live in river valleys than in deserts?",
      [
        "Deserts are always too far from cities",
        "Water and fertile soil make farming possible",
        "Deserts have no land",
        "It is against the law to live in a desert",
      ],
      1,
      "Easy",
      "Climate",
      "Farming needs water and soil, and a place that cannot feed people cannot hold many of them. Deserts do support settlements, but usually only where there is an oasis or water piped in.",
    ),
    mcq(
      "A map shows only roads and no rivers. What does that tell you?",
      [
        "The area has no rivers",
        "The mapmaker chose what was useful for its purpose",
        "The map is wrong",
        "Rivers are never shown on maps",
      ],
      1,
      "Medium",
      "Maps",
      "Every map leaves things out on purpose, and what it includes tells you what it is FOR. Reading absence as evidence that a thing does not exist is the mistake this question is built around.",
    ),
  ],

  // Your First Programs
  305: [
    mcq(
      "What is a program?",
      [
        "A picture of what a computer should do",
        "A list of instructions a computer follows in order",
        "A type of computer",
        "A website",
      ],
      1,
      "Easy",
      "Programs",
      "A program is an ordered set of instructions. The word ORDER matters: the same instructions in a different sequence usually do something completely different.",
    ),
    mcq(
      "After `score = 5` then `score = 8`, what is in `score`?",
      ["5", "8", "13", "Both 5 and 8"],
      1,
      "Easy",
      "Variables",
      "A variable holds one value at a time, and assigning again replaces what was there. Answering 13 treats the second line as adding, which is a different instruction entirely.",
    ),
    mcq(
      "What does `x = x + 1` do?",
      [
        "Nothing, it is impossible",
        "Adds 1 to whatever x holds and stores the result back in x",
        "Creates a second x",
        "Causes an error",
      ],
      1,
      "Medium",
      "Variables",
      "The right side is worked out first using the old value, and the result is then stored back. It looks like a false equation, which is why it confuses people: the equals sign here means put into, not is equal to.",
    ),
    mcq(
      "A program should print \"Well done\" only when score is above 90. Which is correct?",
      [
        "if score > 90: print(\"Well done\")",
        "if score < 90: print(\"Well done\")",
        "if score = 90: print(\"Well done\")",
        "print(\"Well done\") if score",
      ],
      0,
      "Easy",
      "Conditionals",
      "Above 90 is the greater-than test. A single equals sign assigns rather than compares, which is the classic first-week bug and is why comparison uses a double equals.",
    ),
    mcq(
      "How many times does this print? `for i in range(3): print(i)`",
      ["2", "3", "4", "Once"],
      1,
      "Medium",
      "Loops",
      "range(3) gives 0, 1, 2, which is three values and so three lines. It counts from zero and stops BEFORE 3, which is why the printed numbers and the count look mismatched.",
    ),
    mcq(
      "Why use a loop instead of writing the same line ten times?",
      [
        "Loops run faster",
        "One change fixes all ten, and the count can change while running",
        "Loops use less memory",
        "There is no difference",
      ],
      1,
      "Medium",
      "Loops",
      "The real win is that the instruction exists once, so it can only be right or wrong in one place, and the number of repeats can be decided while the program runs. Speed is not the point: ten copies run just as fast.",
    ),
    mcq(
      "`names = [\"Asha\", \"Raj\", \"Mei\"]`. What is `names[1]`?",
      ["Asha", "Raj", "Mei", "1"],
      1,
      "Medium",
      "Lists",
      "Lists count from 0, so position 1 is the second item. Expecting Asha is the single most common mistake with lists, and it is worth checking the first item is names[0].",
    ),
    mcq(
      "Your program runs but gives the wrong answer. What kind of problem is that?",
      [
        "A syntax error",
        "A logic error",
        "The computer is broken",
        "It is not a problem",
      ],
      1,
      "Easy",
      "Programs",
      "The computer understood the instructions, which is why it ran, but the instructions said the wrong thing. A syntax error stops a program from running at all, so a program that produces output has already passed that test.",
    ),
  ],

  // Colour, Shape and Making
  306: [
    mcq(
      "Which pair are complementary colours, sitting opposite each other on the wheel?",
      ["Red and orange", "Blue and orange", "Blue and green", "Red and pink"],
      1,
      "Easy",
      "Colour wheel",
      "Blue sits opposite orange, which is why the pair looks so strong together. The other pairs sit next to each other on the wheel, so they blend quietly instead of contrasting.",
    ),
    mcq(
      "You want a picture to feel calm. Which palette helps?",
      [
        "Bright red and yellow",
        "Blues and greens",
        "Orange and red",
        "Black and white only",
      ],
      1,
      "Easy",
      "Warm and cool",
      "Cool colours read as calm and tend to recede, which also pushes them back in a picture. Reds and yellows read as warm and come forward, which is energy rather than calm.",
    ),
    mcq(
      "When drawing from life, what is the most common mistake?",
      [
        "Pressing too hard",
        "Drawing what you know is there rather than what you can see",
        "Using the wrong paper",
        "Working too slowly",
      ],
      1,
      "Hard",
      "Proportion",
      "We draw the symbol in our head rather than the shape in front of us, which is why a drawn cup often has a perfectly round rim when the real one looks like a narrow ellipse. Measuring by eye is the habit that fixes it.",
    ),
    mcq(
      "What makes a drawn ball look round rather than flat?",
      [
        "A dark outline",
        "Light on one side fading into shadow on the other",
        "Colouring it in evenly",
        "Making it bigger",
      ],
      1,
      "Medium",
      "Light and shadow",
      "A gradual change from light to dark tells the eye the surface is curving away. An even fill with an outline reads as a flat disc no matter how carefully it is drawn.",
    ),
    mcq(
      "What makes a pattern interesting rather than boring?",
      [
        "Using as many colours as possible",
        "Repetition with some variation",
        "Never repeating anything",
        "Making every shape identical",
      ],
      1,
      "Medium",
      "Pattern",
      "Repetition gives a pattern its rhythm and variation keeps the eye moving. Pure repetition becomes wallpaper you stop noticing, and no repetition at all is not a pattern.",
    ),
    mcq(
      "Where does the shadow fall if the light is on the left?",
      ["On the left", "On the right", "Underneath only", "Shadows do not depend on light"],
      1,
      "Easy",
      "Light and shadow",
      "The object blocks the light, so the shadow falls on the side away from it. Keeping one light direction across a whole drawing is what makes the objects look like they share a room.",
    ),
    mcq(
      "Mixing a colour with its complementary does what?",
      ["Brightens it", "Dulls it towards grey", "Makes it lighter", "Nothing"],
      1,
      "Hard",
      "Colour wheel",
      "Opposites cancel, so the mix moves towards a grey or brown. This is how you make a colour calmer without adding black, which tends to make it muddy instead.",
    ),
  ],
};

/**
 * Questions for a topic, ordered so that ones matching the topic's own concepts
 * come first. The selector then filters by difficulty, so a learner doing well
 * sees the harder on-topic questions before any generic ones.
 */
export function bankForTopic(
  courseId: number,
  concepts: string[],
  topicId?: number,
): DemoMcq[] {
  // Authored questions for THIS topic come first and in full: they are written
  // against its own concepts and carry an explanation that names the tempting
  // wrong answer. The shared course bank follows as filler, so a learner who
  // exhausts the authored set still gets on-course questions rather than a
  // "no more questions" dead end.
  const authored = topicId == null ? null : peekTopic(courseId, topicId);
  const own = (authored?.questions ?? []).map(authoredToMcq);

  const bank = QUIZ_BANK[courseId] ?? [];
  const wanted = new Set(concepts.map((c) => c.toLowerCase()));
  const onTopic = bank.filter((q) => wanted.has(q.skill.toLowerCase()));
  const rest = bank.filter((q) => !wanted.has(q.skill.toLowerCase()));
  return [...own, ...onTopic, ...rest];
}

/**
 * Authored question to the shape the quiz engine speaks.
 *
 * The id is derived from the topic and the question number rather than taken
 * from a counter, because the engine records "already asked" by id and a counter
 * would renumber the same question between two sessions.
 */
function authoredToMcq(q: AuthoredQuestion & { topicId?: number }, i: number): DemoMcq {
  const keys = ["A", "B", "C", "D"];
  return {
    id: 800_000 + (q.n ?? i) * 97,
    question: q.question,
    options: q.options.map((text, k) => ({ id: keys[k], label: text, value: text })),
    correct: keys[q.answer],
    difficulty: q.difficulty,
    skill: q.skill,
    explanation: q.explanation,
  };
}
