import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { locales, type Locale } from "@/locales";
import { getInitialLocale, storeLocale } from "./detectLocale";
import { LocaleContext, type LocaleContextValue } from "./LocaleContext";

interface LocaleProviderProps {
  children: ReactNode;
}

// Holds the current language for the whole page; components read it with useLocale.
export const LocaleProvider = ({ children }: LocaleProviderProps): ReactElement => {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  const setLocale = useCallback((next: Locale): void => {
    setLocaleState(next);
    storeLocale(next);
  }, []);

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

  // A new object only when the language changes, so consumers don't re-render for nothing.
  const value = useMemo<LocaleContextValue>(
    () => ({ locale, content: locales[locale], setLocale }),
    [locale, setLocale],
  );

  return <LocaleContext value={value}>{children}</LocaleContext>;
};
