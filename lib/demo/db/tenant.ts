/**
 * The demo tenant: Meridian Institute of Technology.
 *
 * This is the `client-info` payload the whole app boots from — branding, the
 * timezone live sessions render in, and the feature flags that decide which
 * modules appear in the sidebar. Every module is switched on, because the point
 * of the prototype is to show the complete platform rather than one package.
 */

import { DEMO_CLIENT_ID, DEMO_TENANT } from "../config";
import type { ClientInfo } from "@/lib/services/client.service";

/**
 * Every feature the app knows about.
 *
 * Collected by reading the `featureName` values in `components/layout/Sidebar.tsx`
 * and `BottomNavigation.tsx`, plus the direct `features.some(...)` checks in
 * `lib/contexts/ClientInfoContext.tsx` and `components/layout/AppBar.tsx`. If a
 * new module ships in the real frontend and its nav item does not appear here,
 * add its flag to this list.
 *
 * `no_leaderboard_view` is deliberately absent: it is a NEGATIVE flag that hides
 * the leaderboard, so including it would switch a module off.
 */
const ENABLED_FEATURES = [
  // Learner modules
  "dashboard",
  "course",
  "adaptive_quiz",
  "assessment",
  "mock_interview",
  "jobs_v2",
  "resume",
  "live_sessions",
  "community_forum",
  "scorecard",
  "support",

  // Instructor workspace
  "instructor",

  // Administration
  "admin_dashboard",
  "admin_manage_students",
  "admin_manage_instructors",
  "admin_cohorts",
  "admin_adaptive_quizzes",
  "admin_assessment",
  "admin_assessment_result",
  "admin_mock_interview",
  "admin_live_sessions",
  "admin_scorecard",
  "admin_certificates",
  "admin_jobs_v2",
  "admin_emails",
  "admin_notifications",
  "admin_tickets",
  "admin_branding",
  "admin_payment",
  "admin_referral",
  "admin_ebook",
  "admin_webinar_management",
  "admin_workshop_reg",
] as const;

/**
 * Non-colour branding. Colours are intentionally omitted: the platform pins its
 * palette to the "Midnight hyper" preset for every tenant (see
 * `lib/theme/normalizeThemeSettings.ts`), so only the logo, wordmark sizing and
 * login copy are actually tenant-controlled.
 */
const THEME_SETTINGS: Record<string, string> = {
  loginHeroSlogan: "Learn with intent. Graduate job-ready.",
  loginHeroSloganFontSize: "30px",
  loginHeroSloganFontWeight: "600",
  loginHeroLogoMaxWidthPx: "230",
  loginHeroLogoHeightPx: "52",
  sidebarLogoMaxWidthPx: "185",
  sidebarLogoHeightPx: "42",
};

export const DEMO_CLIENT_INFO: ClientInfo = {
  id: DEMO_CLIENT_ID,
  name: DEMO_TENANT.name,
  slug: DEMO_TENANT.slug,
  is_active: true,
  timezone: DEMO_TENANT.timezone,

  // Under /images/ deliberately. The route middleware (proxy.ts) bypasses auth
  // for /images/, /videos/ and /assets/ only — anything else 307s to /login for
  // a signed-out visitor, which would break the logo on the sign-in screen
  // itself. Using the existing public prefix avoids touching shared auth logic.
  //
  // Three variants, because the two surfaces that show a logo are BOTH dark:
  //   app_logo_url   -> ink sidebar, small box  -> light, wordmark only
  //   login_logo_url -> ink hero panel, larger  -> light, full lockup
  // meridian-logo-dark.svg is the dark-text lockup, kept for light surfaces
  // (certificates, exported PDFs) rather than either of these.
  app_logo_url: "/images/demo/meridian-logo.svg",
  app_icon_url: "/images/demo/meridian-icon.svg",
  login_logo_url: "/images/demo/meridian-logo-login.svg",
  login_img_url: null,

  features: ENABLED_FEATURES.map((name, index) => ({ id: index + 1, name })),
  theme_settings: THEME_SETTINGS,

  show_footer: true,
  allow_instructor_self_signup: true,
  live_proctoring_enabled: true,
  hide_available_courses_from_students: false,

  certificate_signatory_name: "Dr. Priya Nair",
  certificate_signatory_title: "Director of Programs, Meridian Institute of Technology",
  certificate_signature_url: null,

  // The tenant is fully provisioned: a prospect must never land in the
  // first-login setup wizard, which would block the app behind onboarding.
  setup_completed: true,
  setup_step: 8,
};

export function clientInfo(): ClientInfo {
  return DEMO_CLIENT_INFO;
}
