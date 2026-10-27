import { createContext } from "react";
import { DEFAULT_LOCALE, type Locale } from "@/locales";
import type { SiteContent } from "@/locales/types";
import { DEFAULT_REGION } from "@/regions";
import { resolveContent } from "./resolveContent";

export interface LocaleContextValue {
  locale: Locale;
  content: SiteContent;
  setLocale: (locale: Locale) => void;
}

// Without a LocaleProvider (e.g. a component rendered alone in a test) the
// site reads in the default language and region, and can't switch.
export const LocaleContext = createContext<LocaleContextValue>({
  locale: DEFAULT_LOCALE,
  content: resolveContent(DEFAULT_LOCALE, DEFAULT_REGION),
  setLocale: () => {},
});
