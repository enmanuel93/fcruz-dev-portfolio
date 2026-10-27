import { en } from "./en";
import type { LocaleContent } from "./types";

// Every language the site can show. Adding one here (plus its folder) is all
// the components need; the language switcher lists these keys.
export const locales = { en } as const satisfies Record<string, LocaleContent>;

export type Locale = keyof typeof locales;

export const DEFAULT_LOCALE: Locale = "en";
