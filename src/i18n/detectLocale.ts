import { DEFAULT_LOCALE, locales, type Locale } from "@/locales";

export const LOCALE_STORAGE_KEY = "locale";

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && Object.hasOwn(locales, value);

// Storage can be blocked (private mode, cookies off); then the choice just isn't remembered.
const readStoredLocale = (): string | null => {
  try {
    return localStorage.getItem(LOCALE_STORAGE_KEY);
  } catch {
    return null;
  }
};

export const storeLocale = (locale: Locale): void => {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // Not remembered for the next visit; the page still switches.
  }
};

// The visitor's earlier choice, else their first browser language the site
// has ("es-MX" counts as "es"), else the default.
export const getInitialLocale = (): Locale => {
  const stored = readStoredLocale();
  if (isLocale(stored)) return stored;

  const browserLocale = navigator.languages
    .map((tag) => tag.split("-")[0]?.toLowerCase())
    .find(isLocale);

  return browserLocale ?? DEFAULT_LOCALE;
};
