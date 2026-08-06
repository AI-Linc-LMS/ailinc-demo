/**
 * The jobs board.
 *
 * Real Indian employers and realistic postings, because this is the module that
 * answers "what does my student actually get out of this" — and a board of
 * "Company A / Company B" undercuts that answer immediately.
 *
 * Eligibility is modelled rather than assumed: some roles are open, one is
 * already applied to, one is closed. A board where every card says "Apply"
 * hides the lifecycle an institution is buying.
 */

import { defineRoutes } from "../router";
import { notFound } from "../types";
import { companyLogoFor } from "../../db/avatar";
import { overlay, nextDemoId } from "../../db/overlay";
import { iso, isoDaysAgo, isoDaysAhead, nowMs } from "../../clock";

const MODULE = "jobs";

interface DemoJob {
  id: number;
  title: string;
  company: string;
  location: string;
  experience: string;
  salary: string;
  type: string;
  skills: string[];
  description: string;
  openings: number;
  applied?: boolean;
  closed?: boolean;
  deadlineInDays: number;
}

const JOBS: DemoJob[] = [
  {
    id: 601,
    title: "Software Engineer I (Backend)",
    company: "Razorpay",
    location: "Bengaluru (Hybrid)",
    experience: "0-2 years",
    salary: "₹18-24 LPA",
    type: "Full-time",
    skills: ["Go", "PostgreSQL", "REST", "System Design"],
    description:
      "Join the payments core team building the services that move money for 10M+ businesses. " +
      "You will own an service end to end, from schema to on-call, with a senior engineer paired " +
      "with you for the first two quarters.",
    openings: 6,
    deadlineInDays: 12,
  },
  {
    id: 602,
    title: "Frontend Engineer",
    company: "Zerodha",
    location: "Bengaluru (On-site)",
    experience: "0-3 years",
    salary: "₹16-22 LPA",
    type: "Full-time",
    skills: ["React", "TypeScript", "Performance", "Accessibility"],
    description:
      "Work on Kite, used by millions of traders where a 200ms delay is a real cost. Strong bias " +
      "toward small bundles, no unnecessary dependencies, and measuring before optimising.",
    openings: 3,
    applied: true,
    deadlineInDays: 20,
  },
  {
    id: 603,
    title: "Data Analyst — Growth",
    company: "Swiggy",
    location: "Bengaluru (Hybrid)",
    experience: "0-2 years",
    salary: "₹12-18 LPA",
    type: "Full-time",
    skills: ["SQL", "Python", "Experimentation", "Dashboards"],
    description:
      "Sit with the growth team and answer questions that change what gets built: which offers " +
      "actually retain, which cities behave differently, and which experiments were underpowered.",
    openings: 4,
    deadlineInDays: 8,
  },
  {
    id: 604,
    title: "Machine Learning Intern",
    company: "Freshworks",
    location: "Chennai (On-site)",
    experience: "Internship",
    salary: "₹60,000 / month",
    type: "Internship",
    skills: ["Python", "PyTorch", "NLP", "Evaluation"],
    description:
      "Six-month internship on the applied ML team working on ticket classification and " +
      "summarisation. Converts to a full-time offer for most interns.",
    openings: 8,
    deadlineInDays: 5,
  },
  {
    id: 605,
    title: "Platform Engineer (Cloud)",
    company: "Postman",
    location: "Remote (India)",
    experience: "1-3 years",
    salary: "₹20-28 LPA",
    type: "Full-time",
    skills: ["AWS", "Kubernetes", "Terraform", "Observability"],
    description:
      "Own the infrastructure other engineers build on: deployment pipelines, environment " +
      "provisioning, and the cost of running it all.",
    openings: 2,
    deadlineInDays: 16,
  },
  {
    id: 606,
    title: "Associate Software Engineer",
    company: "Atlassian",
    location: "Bengaluru (Hybrid)",
    experience: "0-1 years",
    salary: "₹22-30 LPA",
    type: "Full-time",
    skills: ["Java", "Distributed Systems", "Testing"],
    description:
      "Graduate programme with a structured first year: rotations across two teams, a dedicated " +
      "mentor, and a capstone shipped to production.",
    openings: 10,
    closed: true,
    deadlineInDays: -4,
  },
];

function appliedIds(): number[] {
  return overlay.get<number[]>("jobs:applied", []);
}

function favouriteIds(): number[] {
  return overlay.get<number[]>("jobs:favourites", []);
}

function toApi(job: DemoJob) {
  const hasApplied = Boolean(job.applied) || appliedIds().includes(job.id);
  return {
    id: job.id,
    job_title: job.title,
    company_name: job.company,
    company_logo: companyLogoFor(job.company),
    company_info: `${job.company} is hiring through Meridian's placement programme.`,
    job_description: job.description,
    role_process:
      "Online assessment, then a technical round, then a discussion with the hiring manager.",
    mandatory_skills: job.skills.slice(0, 2),
    key_skills: job.skills,
    industry_type: "Technology",
    department: "Engineering",
    employment_type: job.type,
    role_category: "Software Development",
    education: "B.Tech / B.E. / MCA",
    location: job.location,
    years_of_experience: job.experience,
    salary: job.salary,
    job_type: job.type,
    status: job.closed ? "closed" : "active",
    application_deadline: job.closed
      ? isoDaysAgo(Math.abs(job.deadlineInDays))
      : isoDaysAhead(job.deadlineInDays),
    number_of_openings: job.openings,
    applicable_passout_year: new Date().getUTCFullYear() + 1,
    min_graduation_percentage: 60,
    tags: job.skills.slice(0, 3),
    created_at: isoDaysAgo(job.id % 20),
    is_published: true,
    eligible_to_apply: !job.closed,
    is_favourited: favouriteIds().includes(job.id),
    has_applied: hasApplied,
    favorites_count: 20 + (job.id % 40),
    applications_count: 60 + (job.id % 120),
  };
}

defineRoutes(MODULE, {
  "GET /jobs-v2/api/jobs/": (req) => {
    const search = (req.query.get("search") ?? "").toLowerCase();
    const list = JOBS.filter(
      (j) =>
        !search ||
        j.title.toLowerCase().includes(search) ||
        j.company.toLowerCase().includes(search) ||
        j.skills.some((s) => s.toLowerCase().includes(search)),
    ).map(toApi);
    return { results: list, count: list.length };
  },

  "GET /jobs-v2/api/jobs/:jobId/": (req) => {
    const job = JOBS.find((j) => j.id === Number(req.params.jobId));
    if (!job) throw notFound("Job not found");
    return toApi(job);
  },

  "POST /jobs-v2/api/jobs/:jobId/apply/": (req) => {
    const job = JOBS.find((j) => j.id === Number(req.params.jobId));
    if (!job) throw notFound("Job not found");
    overlay.update<number[]>("jobs:applied", [], (list) =>
      list.includes(job.id) ? list : [...list, job.id],
    );
    return { id: nextDemoId("job-application"), status: "applied" };
  },

  "POST /jobs-v2/api/jobs/:jobId/favorite/": (req) => {
    const id = Number(req.params.jobId);
    const next = favouriteIds().includes(id)
      ? favouriteIds().filter((x) => x !== id)
      : [...favouriteIds(), id];
    overlay.set("jobs:favourites", next);
    return { is_favourited: next.includes(id) };
  },

  /** The learner's own applications, with a realistic spread of pipeline stages. */
  "GET /jobs-v2/api/applications/": () => {
    const ids = [...new Set([...appliedIds(), 602])];
    return {
      results: ids.map((id, i) => {
        const job = JOBS.find((j) => j.id === id);
        return {
          id: 7000 + i,
          job: id,
          job_title: job?.title ?? "Application",
          company_name: job?.company ?? "",
          status: i === 0 ? "shortlisted" : "applied",
          applied_at: isoDaysAgo(6 + i * 3),
          updated_at: iso(new Date(nowMs())),
        };
      }),
      count: ids.length,
    };
  },
});
