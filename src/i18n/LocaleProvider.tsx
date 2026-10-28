import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { locales, LOCALES_BY_REGION, type Locale } from "@/locales";
import type { Region } from "@/regions";
import { getInitialLocale, storeLocale } from "./detectLocale";
import { getInitialRegion } from "./detectRegion";
import { LocaleContext, type LocaleContextValue } from "./LocaleContext";
import { resolveContent } from "./resolveContent";

interface LocaleProviderProps {
  children: ReactNode;
}

// Holds the current language for the whole page; components read it with useLocale.
// The content also follows the visitor's region, decided once on load.
export const LocaleProvider = ({
  children,
}: LocaleProviderProps): ReactElement => {
  // Region first: it decides which languages the visitor gets to pick from.
  const [region] = useState<Region>(getInitialRegion);
  // Widened on purpose: as a const tuple, `.includes()` would only accept "en" in the Americas.
  const availableLocales: readonly Locale[] = LOCALES_BY_REGION[region];
  const [locale, setLocaleState] = useState<Locale>(() =>
    getInitialLocale(availableLocales),
  );

  const setLocale = useCallback(
    (next: Locale): void => {
      // The switcher only offers the region's languages, but don't trust callers blindly.
      if (!availableLocales.includes(next)) return;
      setLocaleState(next);
      storeLocale(next);
    },
    [availableLocales],
  );

  // Screen readers, spell checkers and hyphenation follow <html lang>; the tab
  // title and description (shared links) follow too. index.html has the English ones.
  useEffect(() => {
    const { meta } = locales[locale].ui;
    document.documentElement.lang = locale;
    document.title = meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", meta.description);
  }, [locale]);

  // Only a language switch builds a new object (region and its languages never
  // change after load), so consumers don't re-render for nothing.
  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      availableLocales,
      content: resolveContent(locale, region),
      setLocale,
    }),
    [locale, availableLocales, region, setLocale],
  );

  return <LocaleContext value={value}>{children}</LocaleContext>;
};
