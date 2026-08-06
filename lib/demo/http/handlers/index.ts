/**
 * Handler registry.
 *
 * Importing a handler module is what registers its routes, so every module must
 * be listed here — a handler file nobody imports is a page that silently renders
 * empty. Modules are added here phase by phase as the demo is built out.
 */

import "./accounts";
import "./activity";
import "./adaptive-courses";
import "./assessments";
import "./jobs";
import "./community";
import "./live-sessions";
import "./mock-interview";
import "./instructor";
import "./admin";
import "./tickets";
import "./notifications";
import "./client";
import "./coding";
import "./content";
import "./courses";
import "./dashboard";
import "./journey";
import "./progression";
import "./quiz";

/** Imported for its side effects only; nothing to export. */
export {};
