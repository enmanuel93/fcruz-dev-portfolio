import { en } from "./en";
import { es } from "./es";
import { it } from "./it";
import type { LocaleContent } from "./types";

// Every language the site can show. Adding one here (plus its folder) is all
// the components need; the language switcher lists these keys.
export const locales = { en, es, it } as const satisfies Record<string, LocaleContent>;

export type Locale = keyof typeof locales;

export const DEFAULT_LOCALE: Locale = "en";

// How the switcher shows each language: a short code, and the name written in
// that language itself (never translated), so a visitor finds their own.
export const localeNames = {
  en: { code: "EN", name: "English" },
  es: { code: "ES", name: "Español" },
  it: { code: "IT", name: "Italiano" },
} as const satisfies Record<Locale, { code: string; name: string }>;

// In switcher order.
export const LOCALES = Object.keys(locales) as Locale[];
