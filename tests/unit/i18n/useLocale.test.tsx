import { act, renderHook } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";
import { describe, expect, it } from "vitest";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { useLocale } from "@/i18n/useLocale";
import { DEFAULT_LOCALE, locales } from "@/locales";

const wrapper = ({ children }: { children: ReactNode }): ReactElement => (
  <LocaleProvider>{children}</LocaleProvider>
);

describe("useLocale", () => {
  it("starts in the default language, English", () => {
    const { result } = renderHook(() => useLocale(), { wrapper });

    expect(DEFAULT_LOCALE).toBe("en");
    expect(result.current.locale).toBe("en");
    expect(result.current.content.ui).toBe(locales.en.ui);
  });

  it("falls back to the default language without a provider", () => {
    const { result } = renderHook(() => useLocale());

    expect(result.current.locale).toBe(DEFAULT_LOCALE);
    expect(result.current.content.ui).toBe(locales[DEFAULT_LOCALE].ui);
  });

  it("keeps the page's language, title and description in the current language", () => {
    const description = document.createElement("meta");
    description.name = "description";
    document.head.append(description);
    const { result } = renderHook(() => useLocale(), { wrapper });

    expect(document.documentElement.lang).toBe("en");
    expect(document.title).toBe(locales.en.ui.meta.title);
    expect(description.content).toBe(locales.en.ui.meta.description);

    act(() => result.current.setLocale("it"));

    expect(document.documentElement.lang).toBe("it");
    expect(document.title).toBe(locales.it.ui.meta.title);
    expect(description.content).toBe(locales.it.ui.meta.description);

    description.remove();
    localStorage.clear();
  });

  it("keeps the same value between renders while the language does not change", () => {
    const { result, rerender } = renderHook(() => useLocale(), { wrapper });
    const first = result.current;

    rerender();

    expect(result.current).toBe(first);
  });
});
