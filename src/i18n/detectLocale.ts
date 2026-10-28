import { DEFAULT_LOCALE, LOCALES, locales, type Locale } from "@/locales";

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
// has ("es-MX" counts as "es"), else the default — always among `available`,
// the languages of their region. A stored choice the region doesn't offer is
// skipped but kept, so it comes back on a visit from a region that has it.
export const getInitialLocale = (available: readonly Locale[] = LOCALES): Locale => {
  const isAvailable = (value: unknown): value is Locale =>
    isLocale(value) && available.includes(value);

  const stored = readStoredLocale();
  if (isAvailable(stored)) return stored;

  const browserLocale = navigator.languages
    .map((tag) => tag.split("-")[0]?.toLowerCase())
    .find(isAvailable);

  return browserLocale ?? DEFAULT_LOCALE;
};
