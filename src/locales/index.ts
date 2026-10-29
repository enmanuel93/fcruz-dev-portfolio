import type { Region } from "@/regions";
import { en } from "./en";
import { es } from "./es";
import { it } from "./it";
import type { LocaleContent } from "./types";

// Every language the site can show. Adding one here (plus its folder) is all
// the components need; the language switcher lists these keys.
export const locales = { en, es, it } as const satisfies Record<
  string,
  LocaleContent
>;

export type Locale = keyof typeof locales;

export const DEFAULT_LOCALE: Locale = "en";

// How the switcher shows each language: a flag (from public/locales/), and the
// name written in that language itself (never translated), which screen
// readers announce instead of the flag.
export const localeNames = {
  en: { flag: "/locales/en.webp", name: "English" },
  es: { flag: "/locales/es.webp", name: "Español" },
  it: { flag: "/locales/it.webp", name: "Italiano" },
} as const satisfies Record<Locale, { flag: string; name: string }>;

// Which languages each region gets. The Americas profile only has an English
// CV, so offering Spanish or Italian there would promise something we can't
// hand over. Add "es" here once a Spanish one exists. DEFAULT_LOCALE has to be
// in every list: it's the fallback when nothing else fits.
export const LOCALES_BY_REGION = {
  europe: ["en", "es", "it"],
  americas: ["en"],
} as const satisfies Record<Region, readonly Locale[]>;

// In switcher order.
export const LOCALES = Object.keys(locales) as Locale[];
