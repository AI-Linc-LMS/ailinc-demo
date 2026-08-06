/**
 * Handler registry.
 *
 * Importing a handler module is what registers its routes, so every module must
 * be listed here — a handler file nobody imports is a page that silently renders
 * empty. Modules are added here phase by phase as the demo is built out.
 */

import "./accounts";
import "./adaptive-courses";
import "./client";
import "./content";
import "./courses";
import "./dashboard";
import "./journey";
import "./quiz";

/** Imported for its side effects only; nothing to export. */
export {};
