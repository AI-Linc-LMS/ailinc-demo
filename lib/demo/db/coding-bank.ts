/**
 * Coding problems, with test cases that actually run.
 *
 * The demo executes the learner's JavaScript for real, in their own browser, and
 * grades it against these cases. That was worth the effort: a coding workspace
 * where "Run" returns a canned pass is the single most obvious fake in a demo of
 * a learning platform, and anyone technical will try to break it within seconds.
 *
 * Each problem names the function it expects and lists concrete argument/result
 * pairs, so grading is a genuine comparison rather than a heuristic on the
 * source text.
 *
 * SCHOOL EDITION: these were LeetCode-style interview problems (Two Sum, Group
 * Anagrams, Merge Intervals), which is the right bank for adults preparing for
 * technical interviews and hopeless for a Grade 7 class writing their first
 * program. They are beginner problems now, one per idea in the Computing course:
 * a variable, a condition, a loop, a list.
 *
 * The hidden tests are chosen to catch the specific mistake each problem invites,
 * not to be obscure. "Pass or Fail" tests exactly 35 because the boundary is the
 * whole lesson; "The Biggest Number" tests an all-negative list because starting
 * your best-so-far at zero is the error every child makes first. A hidden test
 * that fails for a reason the learner cannot work out teaches nothing.
 */

export interface CodingTest {
  args: unknown[];
  expected: unknown;
  /** Shown in the results table. */
  label: string;
  /** Visible before submitting (sample cases) or held back (hidden cases). */
  hidden?: boolean;
}

export interface DemoCodingProblem {
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  skills: string[];
  topic: string;
  statement: string;
  inputFormat: string;
  outputFormat: string;
  sampleInput: string;
  sampleOutput: string;
  constraints: string;
  /** The function the learner must define. */
  fnName: string;
  templates: Record<string, string>;
  tests: CodingTest[];
  /** Progressive hints, shallowest first. */
  hints: { title: string; body: string; revealsCode: boolean }[];
}

const jsTemplate = (fn: string, params: string) =>
  `/**\n * Complete this function.\n */\nfunction ${fn}(${params}) {\n  // your code here\n}\n`;

const pyTemplate = (fn: string, params: string) =>
  `def ${fn}(${params}):\n    # your code here\n    pass\n`;

export const CODING_PROBLEMS: DemoCodingProblem[] = [
  {
    title: "Add Two Numbers",
    difficulty: "Easy",
    skills: ["Variables", "Returning a value"],
    topic: "Variables",
    statement:
      "Write a function that takes two numbers and gives back their total.\n\nThis is the " +
      "smallest complete program you can write: it takes something in, does one thing, and hands " +
      "something back. Everything later is this shape with more steps.",
    inputFormat: "a: number, b: number",
    outputFormat: "number",
    sampleInput: "a = 4, b = 7",
    sampleOutput: "11",
    constraints: "Both numbers are whole numbers between -1000 and 1000.",
    fnName: "addTwo",
    templates: {
      javascript: jsTemplate("addTwo", "a, b"),
      python: pyTemplate("add_two", "a, b"),
    },
    tests: [
      { args: [4, 7], expected: 11, label: "two positives" },
      { args: [0, 0], expected: 0, label: "both zero" },
      { args: [-3, 8], expected: 5, label: "one negative", hidden: true },
      { args: [-6, -9], expected: -15, label: "both negative", hidden: true },
    ],
    hints: [
      {
        title: "What does the function have to give back?",
        body: "A number. Not print it, give it back. A function that prints the answer but does not return it looks right in the console and fails every test.",
        revealsCode: false,
      },
      {
        title: "The word you need is return",
        body: "return hands a value back to whoever called the function. Without it the function gives back nothing at all.",
        revealsCode: false,
      },
      {
        title: "The whole thing",
        body: "return a + b;",
        revealsCode: true,
      },
    ],
  },
  {
    title: "Pass or Fail",
    difficulty: "Easy",
    skills: ["Conditionals", "Comparison"],
    topic: "Making decisions",
    statement:
      "A student passes if they score 35 or more out of 100.\n\nWrite a function that takes a " +
      "mark and returns the word \"Pass\" or the word \"Fail\".\n\nWatch the boundary: a mark of " +
      "exactly 35 is a pass.",
    inputFormat: "marks: number",
    outputFormat: 'string, either "Pass" or "Fail"',
    sampleInput: "marks = 62",
    sampleOutput: '"Pass"',
    constraints: "0 <= marks <= 100",
    fnName: "passOrFail",
    templates: {
      javascript: jsTemplate("passOrFail", "marks"),
      python: pyTemplate("pass_or_fail", "marks"),
    },
    tests: [
      { args: [62], expected: "Pass", label: "comfortably passing" },
      { args: [12], expected: "Fail", label: "failing" },
      { args: [35], expected: "Pass", label: "exactly on the boundary", hidden: true },
      { args: [34], expected: "Fail", label: "one mark below", hidden: true },
      { args: [100], expected: "Pass", label: "full marks", hidden: true },
    ],
    hints: [
      {
        title: "Which comparison?",
        body: "35 itself is a pass, so the test has to include 35. Greater-than on its own would fail a student who got exactly 35.",
        revealsCode: false,
      },
      {
        title: "Two possible answers, one choice",
        body: "Use if to handle one case and else to handle everything left over. You never need to test the second case separately.",
        revealsCode: false,
      },
      {
        title: "The whole thing",
        body: 'if (marks >= 35) {\n  return "Pass";\n} else {\n  return "Fail";\n}',
        revealsCode: true,
      },
    ],
  },
  {
    title: "Count the Vowels",
    difficulty: "Easy",
    skills: ["Loops", "Strings"],
    topic: "Loops",
    statement:
      "Count how many vowels are in a word.\n\nThe vowels are a, e, i, o and u. The word might " +
      "have capital letters in it, and those still count.",
    inputFormat: "word: string",
    outputFormat: "number",
    sampleInput: 'word = "elephant"',
    sampleOutput: "3",
    constraints: "The word contains only letters and is at most 50 characters long.",
    fnName: "countVowels",
    templates: {
      javascript: jsTemplate("countVowels", "word"),
      python: pyTemplate("count_vowels", "word"),
    },
    tests: [
      { args: ["elephant"], expected: 3, label: "a normal word" },
      { args: ["rhythm"], expected: 0, label: "no vowels at all" },
      { args: ["Aeiou"], expected: 5, label: "capitals count too", hidden: true },
      { args: ["a"], expected: 1, label: "one letter", hidden: true },
      { args: ["Mississippi"], expected: 4, label: "repeats", hidden: true },
    ],
    hints: [
      {
        title: "Keep a running total",
        body: "Make a variable holding 0 before the loop starts, and add 1 to it each time you find a vowel. Putting it inside the loop resets it every letter.",
        revealsCode: false,
      },
      {
        title: "Capital letters",
        body: 'Rather than testing ten letters, turn the whole word lowercase first with word.toLowerCase(). Then you only test five.',
        revealsCode: false,
      },
      {
        title: "The whole thing",
        body: 'let count = 0;\nconst lower = word.toLowerCase();\nfor (const letter of lower) {\n  if ("aeiou".includes(letter)) {\n    count = count + 1;\n  }\n}\nreturn count;',
        revealsCode: true,
      },
    ],
  },
  {
    title: "The Biggest Number",
    difficulty: "Easy",
    skills: ["Lists", "Loops", "Comparison"],
    topic: "Lists",
    statement:
      "Find the largest number in a list.\n\nYou may not use a built-in that finds the maximum " +
      "for you. The point is the pattern: hold onto the best you have seen so far, and replace it " +
      "whenever you see better.",
    inputFormat: "numbers: number[]",
    outputFormat: "number",
    sampleInput: "numbers = [3, 17, 8, 2]",
    sampleOutput: "17",
    constraints: "The list has at least one number. Numbers are between -1000 and 1000.",
    fnName: "biggest",
    templates: {
      javascript: jsTemplate("biggest", "numbers"),
      python: pyTemplate("biggest", "numbers"),
    },
    tests: [
      { args: [[3, 17, 8, 2]], expected: 17, label: "largest in the middle" },
      { args: [[5]], expected: 5, label: "only one number" },
      { args: [[9, 4, 1]], expected: 9, label: "largest is first", hidden: true },
      { args: [[-7, -2, -40]], expected: -2, label: "all negative", hidden: true },
      { args: [[6, 6, 6]], expected: 6, label: "all the same", hidden: true },
    ],
    hints: [
      {
        title: "What do you start with?",
        body: "Starting your best-so-far at 0 breaks on a list where every number is negative, because nothing beats 0. Start with the FIRST number in the list instead.",
        revealsCode: false,
      },
      {
        title: "One pass is enough",
        body: "Walk the list once. Each time you meet a number bigger than your best so far, that number becomes the new best.",
        revealsCode: false,
      },
      {
        title: "The whole thing",
        body: "let best = numbers[0];\nfor (const n of numbers) {\n  if (n > best) {\n    best = n;\n  }\n}\nreturn best;",
        revealsCode: true,
      },
    ],
  },
  {
    title: "Times Table",
    difficulty: "Easy",
    skills: ["Loops", "Lists"],
    topic: "Loops",
    statement:
      "Build the times table for a number, from 1 times it up to 10 times it.\n\nGive back a " +
      "list of the ten answers in order. For 3 that is 3, 6, 9 and so on up to 30.",
    inputFormat: "n: number",
    outputFormat: "number[] of length 10",
    sampleInput: "n = 3",
    sampleOutput: "[3, 6, 9, 12, 15, 18, 21, 24, 27, 30]",
    constraints: "1 <= n <= 20",
    fnName: "timesTable",
    templates: {
      javascript: jsTemplate("timesTable", "n"),
      python: pyTemplate("times_table", "n"),
    },
    tests: [
      {
        args: [3],
        expected: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30],
        label: "the three times table",
      },
      {
        args: [1],
        expected: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        label: "the one times table",
      },
      {
        args: [10],
        expected: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        label: "the ten times table",
        hidden: true,
      },
      {
        args: [7],
        expected: [7, 14, 21, 28, 35, 42, 49, 56, 63, 70],
        label: "the seven times table",
        hidden: true,
      },
    ],
    hints: [
      {
        title: "Ten answers, so ten turns of the loop",
        body: "You want 1 times n up to 10 times n. Count from 1 to 10, not from 0 to 9, or your first answer will be 0.",
        revealsCode: false,
      },
      {
        title: "Collect them as you go",
        body: "Start with an empty list before the loop and push each answer onto the end as you work it out.",
        revealsCode: false,
      },
      {
        title: "The whole thing",
        body: "const answers = [];\nfor (let i = 1; i <= 10; i++) {\n  answers.push(n * i);\n}\nreturn answers;",
        revealsCode: true,
      },
    ],
  },
];

/** Deterministic problem for a generated problem id. */
export function problemAt(index: number): DemoCodingProblem {
  return CODING_PROBLEMS[index % CODING_PROBLEMS.length];
}
