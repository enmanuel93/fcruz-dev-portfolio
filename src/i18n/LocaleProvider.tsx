import { useMemo, useState, type ReactElement, type ReactNode } from "react";
import { DEFAULT_LOCALE, locales, type Locale } from "@/locales";
import { LocaleContext, type LocaleContextValue } from "./LocaleContext";

interface LocaleProviderProps {
  children: ReactNode;
}

// Holds the current language for the whole page; components read it with useLocale.
export const LocaleProvider = ({ children }: LocaleProviderProps): ReactElement => {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);

  // A new object only when the language changes, so consumers don't re-render for nothing.
  const value = useMemo<LocaleContextValue>(
    () => ({ locale, content: locales[locale], setLocale }),
    [locale],
  );

  return <LocaleContext value={value}>{children}</LocaleContext>;
};
