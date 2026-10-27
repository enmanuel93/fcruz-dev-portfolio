import { createContext } from "react";
import { DEFAULT_LOCALE, locales, type Locale } from "@/locales";
import type { LocaleContent } from "@/locales/types";

export interface LocaleContextValue {
  locale: Locale;
  content: LocaleContent;
  setLocale: (locale: Locale) => void;
}

// Without a LocaleProvider (e.g. a component rendered alone in a test) the
// site reads in the default language and can't switch.
export const LocaleContext = createContext<LocaleContextValue>({
  locale: DEFAULT_LOCALE,
  content: locales[DEFAULT_LOCALE],
  setLocale: () => {},
});
