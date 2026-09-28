/**
 * The school-life modules: timetable, homework, attendance, grades, notices,
 * fees, the school calendar and messages home.
 *
 * SCHOOL EDITION, and entirely new: none of this exists in the production
 * frontend this demo forks. The LMS covers what a child LEARNS; a school also has
 * to answer when is my next lesson, what is due on Thursday, was I marked
 * present, what did I get, and has Dad paid the trip money. A head teacher looking
 * at a learning platform is really asking whether it can replace the diary, the
 * noticeboard and three WhatsApp groups.
 *
 * Two seed rules from the rest of the demo apply here and are easy to break:
 *
 * NO LITERAL DATES. Everything is relative to today through `lib/demo/clock`, so
 * the timetable is always this week and the fee is always due next month. A demo
 * with a hardcoded date is fine until somebody opens it in March.
 *
 * NO Math.random(). Values come from the seeded PRNG, or the numbers change on
 * every reload and the server and client disagree during hydration.
 */

import { isoDaysAgo, isoDaysAhead } from "../clock";
import { seededInt, seededPick } from "../random";
import { SUBJECTS, SUBJECT_ORDER, type SubjectKey } from "./subjects";
import { FACULTY, INSTRUCTOR_PERSONA, STUDENT_PERSONA } from "./people";

/* ─────────────────────────── Timetable ─────────────────────────── */

export const SCHOOL_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;
export type SchoolDay = (typeof SCHOOL_DAYS)[number];

export interface Period {
  /** 1-indexed, matching how a child says "third period". */
  index: number;
  start: string;
  end: string;
  /** Null for break and lunch, which are periods in the day but not lessons. */
  subject: SubjectKey | null;
  /** Shown when there is no subject: "Break", "Lunch", "Games", "Library". */
  label?: string;
  room: string;
  teacher: string;
}

const BELLS: Array<[string, string]> = [
  ["08:30", "09:15"],
  ["09:20", "10:05"],
  ["10:10", "10:30"],
  ["10:30", "11:15"],
  ["11:20", "12:05"],
  ["12:05", "12:45"],
  ["12:45", "13:30"],
  ["13:35", "14:20"],
];

/** Break and lunch are fixed slots; every other slot carries a subject. */
const NON_LESSON: Record<number, string> = { 3: "Break", 6: "Lunch" };

const ROOMS: Record<SubjectKey, string> = {
  maths: "Room 12",
  science: "Science Lab",
  english: "Room 7",
  social: "Room 9",
  computing: "Computer Room",
  art: "Art Room",
};

const TEACHERS: Record<SubjectKey, string> = {
  maths: FACULTY[0].full_name,
  science: FACULTY[1].full_name,
  english: FACULTY[2].full_name,
  social: FACULTY[0].full_name,
  computing: INSTRUCTOR_PERSONA.full_name,
  art: FACULTY[2].full_name,
};

/**
 * One day's periods.
 *
 * Built from a rotation rather than a random draw so no day repeats a subject and
 * every subject appears across the week. A random timetable produces three maths
 * lessons on Tuesday and none on Friday, which any teacher spots instantly.
 */
export function timetableFor(day: SchoolDay): Period[] {
  const dayIndex = SCHOOL_DAYS.indexOf(day);
  let lesson = 0;

  return BELLS.map(([start, end], i) => {
    const index = i + 1;
    const label = NON_LESSON[index];
    if (label) {
      return { index, start, end, subject: null, label, room: "-", teacher: "-" };
    }
    // Rotate the subject list by the day, so Monday starts at Maths, Tuesday at
    // Science, and the whole week covers every subject evenly.
    const key = SUBJECT_ORDER[(dayIndex * 2 + lesson) % SUBJECT_ORDER.length];
    lesson++;
    return {
      index,
      start,
      end,
      subject: key,
      room: ROOMS[key],
      teacher: TEACHERS[key],
    };
  });
}

/** Today's day name, or Monday at the weekend so the page is never empty. */
export function todaySchoolDay(): SchoolDay {
  const js = new Date().getDay(); // 0 = Sunday
  if (js === 0 || js === 6) return "Monday";
  return SCHOOL_DAYS[js - 1];
}

/* ─────────────────────────── Homework ─────────────────────────── */

export type HomeworkStatus = "todo" | "done" | "late";

export interface Homework {
  id: number;
  subject: SubjectKey;
  title: string;
  detail: string;
  /** Days from today. Negative is overdue. */
  dueInDays: number;
  dueAt: string;
  status: HomeworkStatus;
  teacher: string;
  /** Roughly how long it should take, in minutes. Set by the teacher. */
  minutes: number;
}

const HOMEWORK_SEED: Array<[SubjectKey, string, string, number, HomeworkStatus, number]> = [
  ["maths", "Fractions worksheet, questions 1 to 12", "Show your working for each one. Question 9 is the tricky one.", 1, "todo", 25],
  ["science", "Draw and label a plant cell", "Use the diagram on page 34. Colour it in if you like.", 2, "todo", 20],
  ["english", "Write a paragraph about your walk to school", "Show what it is like. Do not tell the reader it was busy.", 3, "todo", 30],
  ["computing", "Finish the Catch the Star game", "Get the score to go up when you catch it.", 4, "todo", 35],
  ["social", "Find your town on the map and measure the scale", "Bring the measurement to Monday's lesson.", 6, "todo", 15],
  ["art", "Colour wheel, warm and cool halves", "Any medium. Bring it in finished.", -1, "late", 40],
  ["maths", "Times tables, 7s and 8s", "Practise until you can do them without counting.", -3, "done", 15],
  ["english", "Read chapter 4 of the class book", "Note down one thing the main character wants.", -4, "done", 25],
  ["science", "Boiling and melting, questions 1 to 6", "Remember the temperature stays the same while it changes state.", -6, "done", 20],
];

export function homework(): Homework[] {
  return HOMEWORK_SEED.map(([subject, title, detail, dueInDays, status, minutes], i) => ({
    id: 7100 + i,
    subject,
    title,
    detail,
    dueInDays,
    dueAt: dueInDays >= 0 ? isoDaysAhead(dueInDays, 23, 59) : isoDaysAgo(-dueInDays),
    status,
    teacher: TEACHERS[subject],
    minutes,
  }));
}

/* ─────────────────────────── Attendance ─────────────────────────── */

export type AttendanceMark = "present" | "absent" | "late" | "holiday" | "future";

export interface AttendanceDay {
  /** Days ago. 0 is today. */
  daysAgo: number;
  date: string;
  mark: AttendanceMark;
  note?: string;
}

/**
 * The last 8 school weeks.
 *
 * Deliberately NOT perfect. A demo roster where every child has 100% attendance
 * says nothing about what the module is for, and the one screen a parent opens
 * this to see is the day their child was marked absent.
 */
export function attendance(): AttendanceDay[] {
  const out: AttendanceDay[] = [];
  for (let d = 0; d < 56; d++) {
    const date = new Date();
    date.setDate(date.getDate() - d);
    const dow = date.getDay();
    if (dow === 0 || dow === 6) continue;

    let mark: AttendanceMark = "present";
    let note: string | undefined;
    // Two absences and three lates across eight weeks, placed by the seeded PRNG
    // so they are stable but not patterned.
    const roll = seededInt(`att:${d}`, 0, 99);
    if (roll < 4) {
      mark = "absent";
      note = "Marked absent. Your parent let the school know.";
    } else if (roll < 12) {
      mark = "late";
      note = "Arrived after the bell.";
    }
    out.push({ daysAgo: d, date: date.toISOString(), mark, note });
  }
  return out;
}

export function attendanceSummary() {
  const days = attendance();
  const present = days.filter((d) => d.mark === "present").length;
  const late = days.filter((d) => d.mark === "late").length;
  const absent = days.filter((d) => d.mark === "absent").length;
  const counted = days.length;
  return {
    counted,
    present,
    late,
    absent,
    // Late still counts as attending, which is how a school actually reports it.
    percent: counted ? Math.round(((present + late) / counted) * 100) : 0,
  };
}

/* ─────────────────────────── Grades ─────────────────────────── */

export interface SubjectGrade {
  subject: SubjectKey;
  /** Out of 100. */
  term1: number;
  term2: number | null;
  grade: string;
  classAverage: number;
  comment: string;
}

/** A letter for a mark, on the boundaries an Indian school report would use. */
export function gradeFor(score: number): string {
  if (score >= 91) return "A1";
  if (score >= 81) return "A2";
  if (score >= 71) return "B1";
  if (score >= 61) return "B2";
  if (score >= 51) return "C1";
  if (score >= 41) return "C2";
  if (score >= 33) return "D";
  return "E";
}

const COMMENTS: Record<SubjectKey, string> = {
  maths: "Working hard. Fractions are coming along; keep practising the times tables.",
  science: "Asks excellent questions in the lab. Written answers could show more of the reasoning.",
  english: "Reads with real understanding. Now work on planning before writing.",
  social: "Good recall of dates and places. Try to explain why things happened, not just what.",
  computing: "Takes real pleasure in getting a program to run. Very capable.",
  art: "Careful observational work and a good eye for colour.",
};

export function grades(): SubjectGrade[] {
  return SUBJECT_ORDER.map((subject) => {
    const term1 = seededInt(`grade1:${subject}`, 58, 90);
    // Term 2 is derived from term 1, NOT drawn independently. Two independent
    // draws gave English 94 then 76 and Art a 33-mark jump in one term, which is
    // not a thing that happens on a real report card and is the kind of detail a
    // head teacher notices immediately. A term moves a child by a few marks.
    const drift = seededInt(`drift:${subject}`, -6, 9);
    const term2 = Math.max(35, Math.min(98, term1 + drift));
    return {
      subject,
      term1,
      term2,
      grade: gradeFor(term2),
      classAverage: seededInt(`classavg:${subject}`, 62, 78),
      comment: COMMENTS[subject],
    };
  });
}

/* ─────────────────────────── Announcements ─────────────────────────── */

export interface Announcement {
  id: number;
  title: string;
  body: string;
  from: string;
  postedDaysAgo: number;
  postedAt: string;
  /** Pinned notices sit at the top and do not scroll away. */
  pinned: boolean;
  tone: "info" | "warning" | "celebrate";
}

const ANNOUNCEMENT_SEED: Array<[string, string, string, number, boolean, Announcement["tone"]]> = [
  ["Sports Day is on Friday", "Come in your house colours. Bring a water bottle and a hat. Parents are welcome from 9:00.", "Priya Nair, Head Teacher", 1, true, "celebrate"],
  ["School closed on Monday", "Monday is a public holiday. Lessons start again as normal on Tuesday.", "School Office", 2, true, "warning"],
  ["Science Club has 4 places left", "Thursdays after school in the Science Lab. Ask Mr Iyengar to put your name down.", "Suresh Iyengar", 4, false, "info"],
  ["Library books due back", "Anything borrowed before the holidays needs to come back this week, please.", "School Library", 6, false, "info"],
  ["Well done Grade 7B", "Best attendance in the whole school last month. That is genuinely impressive.", "Priya Nair, Head Teacher", 9, false, "celebrate"],
  ["New lunch menu from next week", "The new menu is on the noticeboard outside the hall and goes home with this letter.", "School Office", 12, false, "info"],
];

export function announcements(): Announcement[] {
  return ANNOUNCEMENT_SEED.map(([title, body, from, postedDaysAgo, pinned, tone], i) => ({
    id: 7300 + i,
    title,
    body,
    from,
    postedDaysAgo,
    postedAt: isoDaysAgo(postedDaysAgo),
    pinned,
    tone,
  }));
}

/* ─────────────────────────── Fees ─────────────────────────── */

export interface FeeItem {
  id: number;
  label: string;
  detail: string;
  amount: number;
  status: "paid" | "due" | "upcoming";
  /** Days from today; negative means it was paid then. */
  dueInDays: number;
  dueAt: string;
  receiptNo?: string;
}

const FEE_SEED: Array<[string, string, number, FeeItem["status"], number]> = [
  ["Term 1 tuition", "Covers April to September.", 24000, "paid", -120],
  ["Term 1 transport", "Bus route 4, morning and afternoon.", 6000, "paid", -120],
  ["Science Museum trip", "Coach, entry and a packed lunch.", 850, "due", 9],
  ["Term 2 tuition", "Covers October to March.", 24000, "upcoming", 34],
  ["Term 2 transport", "Bus route 4, morning and afternoon.", 6000, "upcoming", 34],
];

export function fees(): FeeItem[] {
  return FEE_SEED.map(([label, detail, amount, status, dueInDays], i) => ({
    id: 7400 + i,
    label,
    detail,
    amount,
    status,
    dueInDays,
    dueAt: dueInDays >= 0 ? isoDaysAhead(dueInDays, 23, 59) : isoDaysAgo(-dueInDays),
    receiptNo: status === "paid" ? `AL-${7400 + i}-${seededInt(`rcpt:${i}`, 10000, 99999)}` : undefined,
  }));
}

export function feeSummary() {
  const all = fees();
  const outstanding = all.filter((f) => f.status !== "paid").reduce((s, f) => s + f.amount, 0);
  const dueNow = all.filter((f) => f.status === "due").reduce((s, f) => s + f.amount, 0);
  return {
    paid: all.filter((f) => f.status === "paid").reduce((s, f) => s + f.amount, 0),
    outstanding,
    dueNow,
    nextDue: all.find((f) => f.status === "due") ?? all.find((f) => f.status === "upcoming") ?? null,
  };
}

/* ─────────────────────────── Calendar ─────────────────────────── */

export interface SchoolEvent {
  id: number;
  title: string;
  detail: string;
  /** Days from today. */
  inDays: number;
  at: string;
  kind: "holiday" | "event" | "exam" | "trip";
  allDay: boolean;
  time?: string;
}

const EVENT_SEED: Array<[string, string, number, SchoolEvent["kind"], string | null]> = [
  ["Sports Day", "House races on the field. Parents welcome from 9:00.", 4, "event", "09:00"],
  ["Public holiday", "School closed. No lessons.", 7, "holiday", null],
  ["Science Museum trip", "Grade 7 only. Coach leaves at 8:15 sharp.", 9, "trip", "08:15"],
  ["Mathematics half-yearly paper", "45 minutes, in your own classroom.", 12, "exam", "10:10"],
  ["Parents' evening", "Fifteen minutes with each subject teacher. Book a slot from the Messages page.", 18, "event", "16:00"],
  ["Half term starts", "One week off. Back on the Monday.", 25, "holiday", null],
  ["Annual Day rehearsal", "Everyone in the choir and the play.", 32, "event", "14:00"],
];

export function schoolEvents(): SchoolEvent[] {
  return EVENT_SEED.map(([title, detail, inDays, kind, time], i) => ({
    id: 7500 + i,
    title,
    detail,
    inDays,
    at: isoDaysAhead(inDays, 9, 0),
    kind,
    allDay: time == null,
    time: time ?? undefined,
  }));
}

/* ─────────────────────── Teacher and parent messages ─────────────────────── */

export interface SchoolMessage {
  id: number;
  from: string;
  fromRole: "teacher" | "office" | "parent";
  subject: string;
  body: string;
  sentDaysAgo: number;
  sentAt: string;
  read: boolean;
  /** Which subject teacher it concerns, when it is about one. */
  about?: SubjectKey;
}

const MESSAGE_SEED: Array<[string, SchoolMessage["fromRole"], string, string, number, boolean, SubjectKey | null]> = [
  ["Ritu Kulkarni", "teacher", "Ananya is doing well in Maths", "She has really got hold of equivalent fractions this term. If she keeps practising the times tables the rest will come easily. Nothing to worry about at all.", 2, false, "maths"],
  ["School Office", "office", "Museum trip permission slip", "Please sign and return the slip by Friday so we can confirm numbers with the coach company.", 3, false, null],
  ["Suresh Iyengar", "teacher", "Science club place confirmed", "Ananya has a place from next Thursday. She will need an old shirt for the messier experiments.", 5, true, "science"],
  ["Fatima Rizvi", "teacher", "A note about handwriting", "Ananya's ideas in English are excellent and her writing is getting hard to read when she rushes. We are working on it in class; a little practice at home would help.", 8, true, "english"],
  ["Priya Nair", "office", "Parents' evening booking is open", "Slots are fifteen minutes. You can book with each subject teacher separately.", 11, true, null],
];

export function messages(): SchoolMessage[] {
  return MESSAGE_SEED.map(([from, fromRole, subject, body, sentDaysAgo, read, about], i) => ({
    id: 7600 + i,
    from,
    fromRole,
    subject,
    body,
    sentDaysAgo,
    sentAt: isoDaysAgo(sentDaysAgo),
    read,
    about: about ?? undefined,
  }));
}

/** Convenience for the badge in the sidebar and on Home. */
export function unreadMessageCount(): number {
  return messages().filter((m) => !m.read).length;
}

/** The child these pages are about. Everything here is one pupil's school life. */
export const PUPIL = {
  name: STUDENT_PERSONA.full_name,
  className: "Grade 7B",
  rollNo: 18,
  classTeacher: FACULTY[0].full_name,
  subjects: SUBJECT_ORDER.map((k) => SUBJECTS[k]),
} as const;
