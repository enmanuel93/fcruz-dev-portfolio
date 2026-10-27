// Which version of the profile a visitor sees: the one for working in Europe
// (Italy) or the one for working in the Americas (Dominican Republic).
// No imports on purpose: the Netlify edge function (netlify/edge-functions/)
// imports this file too, outside of Vite and its "@/" alias.

export const REGIONS = ["europe", "americas"] as const;

export type Region = (typeof REGIONS)[number];

export const DEFAULT_REGION: Region = "europe";

/** Cookie the edge function sets with the visitor's region (from their IP). */
export const REGION_COOKIE = "region";

export const isRegion = (value: unknown): value is Region =>
  typeof value === "string" && (REGIONS as readonly string[]).includes(value);

// ISO 3166-1 alpha-2 codes of every country and territory in the Americas.
const AMERICAS_COUNTRIES: ReadonlySet<string> = new Set([
  // North America
  "US", "CA", "MX", "GL", "PM", "BM", "UM",
  // Central America
  "BZ", "CR", "SV", "GT", "HN", "NI", "PA",
  // Caribbean
  "AG", "AI", "AW", "BB", "BL", "BQ", "BS", "CU", "CW", "DM", "DO", "GD",
  "GP", "HT", "JM", "KN", "KY", "LC", "MF", "MQ", "MS", "PR", "SX", "TC",
  "TT", "VC", "VG", "VI",
  // South America
  "AR", "BO", "BR", "CL", "CO", "EC", "FK", "GF", "GS", "GY", "PE", "PY",
  "SR", "UY", "VE",
]);

/** Region for a country code (e.g. "DO"); unknown or missing → the default. */
export const regionForCountry = (code: string | undefined): Region =>
  code && AMERICAS_COUNTRIES.has(code.toUpperCase()) ? "americas" : DEFAULT_REGION;
