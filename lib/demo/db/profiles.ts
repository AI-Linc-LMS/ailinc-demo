/**
 * Full learner/staff profiles.
 *
 * The signed-in personas are scored 100% complete on purpose. Profile completion
 * is a real gate in this product — `ProfileCompletion.locked_modules` locks the
 * resume, jobs and interview modules until five fields are filled — and a
 * prospect who lands on a locked module has been shown a wall instead of a
 * feature. Anyone exploring the demo should reach every screen.
 */

import type { ProfileCompletion, UserProfile } from "@/lib/services/profile.service";
import { ADMIN_PERSONA, INSTRUCTOR_PERSONA, STUDENT_PERSONA, type DemoPerson } from "./people";
import { ymd, daysAgo } from "../clock";

/** A fully satisfied completion payload — nothing locked, nothing nagging. */
function completeProfile(): ProfileCompletion {
  const fields = [
    { field: "phone_number", label: "Phone number" },
    { field: "college_name", label: "College" },
    { field: "graduation_year", label: "Graduation year" },
    { field: "city", label: "City" },
    { field: "skills", label: "Skills" },
  ];
  return {
    percentage: 100,
    is_complete: true,
    exempt: false,
    required_fields: fields.map((f) => ({ ...f, filled: true })),
    missing_fields: [],
    locked_modules: [],
  };
}

/** Baseline profile derived from a roster entry — used for everyone but the personas. */
function baseProfile(person: DemoPerson): UserProfile {
  return {
    profile_completion: completeProfile(),
    first_name: person.first_name,
    last_name: person.last_name,
    email: person.email,
    username: person.user_name,
    profile_picture: person.profile_pic_url,
    phone_number: person.phone,
    bio: null,
    social_links: { linkedin: person.linkedin_url },
    date_of_birth: null,
    gender: null,
    country: "India",
    role: person.role,
    headline: person.headline,
    cover_photo_url: null,
    college_name: person.college,
    degree_type: "B.Tech",
    branch: "Computer Science and Engineering",
    graduation_year: String(new Date().getUTCFullYear() + 1),
    city: "Bengaluru",
    state: "Karnataka",
    portfolio_website_url: null,
    leetcode_url: null,
    hackerrank_url: null,
    kaggle_url: null,
    medium_url: null,
    skills: [],
    projects: [],
    experience: [],
    education: [],
    certifications: [],
    achievements: [],
  };
}

/**
 * The student a prospect signs in as.
 *
 * Written out in full rather than generated: this is the profile that gets
 * projected on a screen, opened in the resume builder and exported to PDF, so
 * every line has to survive being read closely.
 */
const STUDENT_PROFILE: UserProfile = {
  ...baseProfile(STUDENT_PERSONA),
  bio:
    "I am in Grade 7 at AI Linc Schools. I like maths when it is puzzles, I am in the " +
    "science club, and I am teaching myself to make a game on the computer. I play " +
    "badminton on Saturdays.",
  headline: "Grade 7 - Section B | Science club | Learning to code",
  // Twelve years old. This profile belonged to a final-year CS undergraduate with
  // an AWS certification and a LeetCode account, which was the most out-of-place
  // page left once the rest of the demo became a school.
  date_of_birth: "2014-03-14",
  city: "Pune",
  state: "Maharashtra",
  // A child has no portfolio site, no competitive-programming profile and no
  // public writing. These keep the shape the API defines and are simply empty,
  // which is what a real pupil's profile looks like too.
  portfolio_website_url: "",
  leetcode_url: "",
  hackerrank_url: "",
  kaggle_url: "",
  medium_url: "",
  social_links: {},
  skills: [
    "Fractions",
    "Times tables",
    "Reading aloud",
    "Creative writing",
    "Map reading",
    "Scratch",
    "Drawing",
    "Badminton",
  ].map((name, i) => ({ id: `sk-${i + 1}`, name })),
  projects: [
    {
      id: "pr-1",
      name: "A volcano that actually erupted",
      description:
        "Science club project with two friends. Baking soda and vinegar in a papier mache " +
        "cone. We tried four different amounts to find which one gave the biggest eruption, " +
        "and wrote down every result.",
      technologies: ["Science club", "Group work"],
      start_date: ymd(daysAgo(120)),
      end_date: ymd(daysAgo(95)),
      url: "",
    },
    {
      id: "pr-2",
      name: "Catch the Star game",
      description:
        "My first proper program. A star falls down the screen and you move a basket to " +
        "catch it. It keeps score and gets faster the longer you play.",
      technologies: ["Scratch", "Loops", "Variables"],
      start_date: ymd(daysAgo(40)),
      end_date: "",
      url: "",
    },
  ],
  experience: [],
  education: [
    {
      id: "ed-1",
      institution: "AI Linc Schools",
      degree: "Grade 7",
      field_of_study: "",
      start_date: ymd(daysAgo(240)),
      end_date: "",
      gpa: "",
      description: "Section B. Subjects: Maths, Science, English, Social Studies, Computing, Art.",
    },
  ],
  certifications: [
    {
      id: "ce-1",
      name: "Fractions, Decimals and Shapes",
      issuing_organization: "AI Linc Schools",
      issue_date: ymd(daysAgo(60)),
      credential_id: "AL-MATHS-2291",
      credential_url: "",
    },
  ],
  achievements: [
    {
      id: "ac-1",
      title: "Longest streak in Grade 7B",
      description: "Did something on the platform 23 days in a row.",
      date: ymd(daysAgo(2)),
    },
    {
      id: "ac-2",
      title: "Science club, volcano project",
      description: "Best experiment write-up in the class this term.",
      date: ymd(daysAgo(95)),
    },
  ],
};

const INSTRUCTOR_PROFILE: UserProfile = {
  ...baseProfile(INSTRUCTOR_PERSONA),
  headline: "Senior Instructor | Backend Engineering & Systems",
  bio:
    "Twelve years building distributed systems before moving into teaching. I run the " +
    "backend engineering track and the systems-design interview clinic at AI Linc.",
  degree_type: "M.Tech",
  branch: "Computer Science",
  graduation_year: "2011",
  city: "Bengaluru",
  state: "Karnataka",
  college_name: "Indian Institute of Science, Bengaluru",
  skills: ["Distributed Systems", "Go", "Python", "Kubernetes", "System Design", "Mentoring"].map(
    (name, i) => ({ id: `isk-${i + 1}`, name }),
  ),
  experience: [
    {
      id: "iex-1",
      company: "AI Linc",
      position: "Senior Instructor",
      location: "Bengaluru, India",
      start_date: ymd(daysAgo(1100)),
      current: true,
      description: "Owns the backend engineering curriculum and the systems-design clinic.",
    },
  ],
};

const ADMIN_PROFILE: UserProfile = {
  ...baseProfile(ADMIN_PERSONA),
  headline: "Director of Programs",
  bio:
    "Responsible for programme design, outcomes and industry partnerships across every " +
    "cohort at AI Linc.",
  degree_type: "Ph.D.",
  branch: "Education Technology",
  graduation_year: "2009",
  city: "Mumbai",
  state: "Maharashtra",
  college_name: "Tata Institute of Social Sciences",
  skills: ["Programme Design", "Learning Outcomes", "Industry Partnerships", "Analytics"].map(
    (name, i) => ({ id: `ask-${i + 1}`, name }),
  ),
};

const BY_ID: Record<number, UserProfile> = {
  [STUDENT_PERSONA.id]: STUDENT_PROFILE,
  [INSTRUCTOR_PERSONA.id]: INSTRUCTOR_PROFILE,
  [ADMIN_PERSONA.id]: ADMIN_PROFILE,
};

/** The seeded profile for a person, generated for roster members. */
export function profileFor(person: DemoPerson): UserProfile {
  return BY_ID[person.id] ?? baseProfile(person);
}
