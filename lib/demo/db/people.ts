/**
 * The cast of the demo.
 *
 * One roster feeds every surface that shows a person — leaderboards, community
 * threads, cohort rosters, the admin student table, instructor gradebooks. That
 * consistency is what makes the prototype hold up under scrutiny: a prospect who
 * spots "Kabir Deshmukh" at rank 3 on the leaderboard and then opens the admin
 * student list finds the same person, with the same avatar and the same points.
 *
 * Names skew Indian because that is who AI Linc's institutions actually teach,
 * with enough international names to show the platform is not region-locked.
 */

import { portraitFor } from "./avatar";
import { DEMO_PERSONAS } from "../config";
import { seededInt, seededPick } from "../random";

export interface DemoPerson {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  user_name: string;
  email: string;
  phone: string;
  role: "student" | "instructor" | "admin";
  profile_pic_url: string;
  college: string;
  /** Total points across every module. Drives leaderboards and the wallet. */
  points: number;
  /** Current daily streak in days. */
  streak: number;
  linkedin_url: string;
  /** Short headline shown on profile cards and community hovers. */
  headline: string;
}

const COLLEGES = [
  "Indian Institute of Technology, Bombay",
  "National Institute of Technology, Trichy",
  "Delhi Technological University",
  "Vellore Institute of Technology",
  "BITS Pilani",
  "Manipal Institute of Technology",
  "PES University",
  "SRM Institute of Science and Technology",
  "Anna University",
  "Amrita Vishwa Vidyapeetham",
  "Jadavpur University",
  "College of Engineering, Pune",
] as const;

const HEADLINES = [
  "Aspiring backend engineer",
  "Full-stack learner | React + Node",
  "Data science enthusiast",
  "Preparing for product-based interviews",
  "Cloud and DevOps track",
  "Machine learning, one notebook at a time",
  "Frontend developer in the making",
  "CS undergrad | competitive programmer",
  "Switching careers into tech",
  "Python, SQL and everything in between",
] as const;

/** Raw roster: only the parts that must be hand-authored to read as real. */
const ROSTER_NAMES: ReadonlyArray<readonly [string, string]> = [
  ["Kabir", "Deshmukh"],
  ["Ishita", "Bansal"],
  ["Rohan", "Pillai"],
  ["Meera", "Krishnan"],
  ["Arjun", "Sethi"],
  ["Sara", "Qureshi"],
  ["Nikhil", "Chaturvedi"],
  ["Diya", "Malhotra"],
  ["Aditya", "Ranganathan"],
  ["Tanvi", "Joshi"],
  ["Farhan", "Ansari"],
  ["Neha", "Bhattacharya"],
  ["Siddharth", "Venkatesh"],
  ["Pooja", "Reddy"],
  ["Yash", "Agarwal"],
  ["Ritika", "Sen"],
  ["Harsh", "Vardhan"],
  ["Aisha", "Khan"],
  ["Karthik", "Subramanian"],
  ["Shreya", "Ghosh"],
  ["Manav", "Trivedi"],
  ["Lakshmi", "Narayanan"],
  ["Devansh", "Kulkarni"],
  ["Zoya", "Merchant"],
  ["Pranav", "Bhatt"],
  ["Anjali", "Verma"],
  ["Imran", "Sheikh"],
  ["Kavya", "Prasad"],
  ["Rahul", "Chatterjee"],
  ["Simran", "Gill"],
  ["Vivek", "Nambiar"],
  ["Tara", "D'Souza"],
  ["Aryan", "Mishra"],
  ["Nandini", "Rajan"],
  ["Omar", "Haddad"],
  ["Elena", "Petrova"],
  ["Daniel", "Okafor"],
  ["Mei", "Lin"],
  ["Gaurav", "Saxena"],
  ["Priyanka", "Iyer"],
  ["Sameer", "Kapadia"],
  ["Ayesha", "Siddiqui"],
  ["Varun", "Chopra"],
  ["Ridhi", "Aggarwal"],
] as const;

const EMAIL_DOMAIN = "meridian.edu";

function slugEmail(first: string, last: string, id: number): string {
  const base = `${first}.${last}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z.]/g, "");
  // Roster is small enough that a collision is unlikely, but the id suffix makes
  // uniqueness structural rather than a thing to remember when adding a name.
  return `${base}${id % 7 === 0 ? id : ""}@${EMAIL_DOMAIN}`;
}

function buildPerson(
  id: number,
  first: string,
  last: string,
  role: DemoPerson["role"],
  overrides: Partial<DemoPerson> = {},
): DemoPerson {
  const fullName = `${first} ${last}`;
  const seed = `person:${fullName}`;
  return {
    id,
    first_name: first,
    last_name: last,
    full_name: fullName,
    user_name: fullName,
    email: slugEmail(first, last, id),
    phone: `+91 ${seededInt(`${seed}:phone`, 70000, 99999)}${seededInt(`${seed}:phone2`, 10000, 99999)}`,
    role,
    profile_pic_url: portraitFor(fullName),
    college: seededPick(`${seed}:college`, COLLEGES),
    points: seededInt(`${seed}:points`, 420, 9800),
    streak: seededInt(`${seed}:streak`, 0, 46),
    linkedin_url: `https://www.linkedin.com/in/${first.toLowerCase()}-${last.toLowerCase().replace(/[^a-z]/g, "")}`,
    headline: seededPick(`${seed}:headline`, HEADLINES),
    ...overrides,
  };
}

/**
 * The three sign-in personas.
 *
 * Their ids are low and fixed so handlers can reference them directly, and their
 * emails come from `DEMO_PERSONAS` so the credentials shown on the login screen
 * and the accounts that actually work can never drift apart.
 */
export const STUDENT_PERSONA: DemoPerson = buildPerson(1001, "Ananya", "Rao", "student", {
  email: DEMO_PERSONAS[0].email,
  college: "Indian Institute of Technology, Bombay",
  headline: "Final-year CS undergrad | full-stack and ML",
  points: 7840,
  streak: 23,
});

export const INSTRUCTOR_PERSONA: DemoPerson = buildPerson(1002, "Vikram", "Menon", "instructor", {
  email: DEMO_PERSONAS[1].email,
  college: "Meridian Institute of Technology",
  headline: "Senior Instructor | Backend Engineering and Systems",
  points: 0,
  streak: 0,
});

export const ADMIN_PERSONA: DemoPerson = buildPerson(1003, "Priya", "Nair", "admin", {
  email: DEMO_PERSONAS[2].email,
  college: "Meridian Institute of Technology",
  headline: "Director of Programs",
  points: 0,
  streak: 0,
});

export const PERSONAS: readonly DemoPerson[] = [
  STUDENT_PERSONA,
  INSTRUCTOR_PERSONA,
  ADMIN_PERSONA,
];

/** Additional teaching staff, for cohort assignment and live-session hosts. */
export const FACULTY: readonly DemoPerson[] = [
  buildPerson(1101, "Ritu", "Kulkarni", "instructor", {
    headline: "Instructor | Data Science and Analytics",
  }),
  buildPerson(1102, "Suresh", "Iyengar", "instructor", {
    headline: "Instructor | Cloud and DevOps",
  }),
  buildPerson(1103, "Fatima", "Rizvi", "instructor", {
    headline: "Instructor | Frontend Engineering",
  }),
];

/** The learner body. Ids start at 2000 to stay clearly distinct from staff. */
export const STUDENTS: readonly DemoPerson[] = ROSTER_NAMES.map(([first, last], i) =>
  buildPerson(2000 + i, first, last, "student"),
);

/** Everyone, in one list — the lookup surface handlers use. */
export const ALL_PEOPLE: readonly DemoPerson[] = [
  ...PERSONAS,
  ...FACULTY,
  ...STUDENTS,
];

export function personById(id: number): DemoPerson | undefined {
  return ALL_PEOPLE.find((p) => p.id === id);
}

export function personByEmail(email: string): DemoPerson | undefined {
  const wanted = email.trim().toLowerCase();
  return ALL_PEOPLE.find((p) => p.email.toLowerCase() === wanted);
}

/**
 * The full learner list including the signed-in student persona, ranked by
 * points. Leaderboards, the admin roster and cohort views all read from here so
 * a person's standing is identical wherever it is shown.
 */
export function rankedLearners(): DemoPerson[] {
  return [STUDENT_PERSONA, ...STUDENTS].sort((a, b) => b.points - a.points);
}
