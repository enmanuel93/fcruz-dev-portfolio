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
  en: { flag: "/locales/en.png", name: "English" },
  es: { flag: "/locales/es.png", name: "Español" },
  it: { flag: "/locales/it.png", name: "Italiano" },
} as const satisfies Record<Locale, { flag: string; name: string }>;

// In switcher order.
export const LOCALES = Object.keys(locales) as Locale[];
