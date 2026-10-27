import { afterEach, describe, expect, it, vi } from "vitest";
import { getInitialLocale, isLocale, LOCALE_STORAGE_KEY, storeLocale } from "@/i18n/detectLocale";

const setBrowserLanguages = (languages: string[]): void => {
  vi.spyOn(navigator, "languages", "get").mockReturnValue(languages);
};

describe("isLocale", () => {
  it("accepts only the languages the site has", () => {
    expect(isLocale("en")).toBe(true);
    expect(isLocale("es")).toBe(true);
    expect(isLocale("it")).toBe(true);
    expect(isLocale("fr")).toBe(false);
    expect(isLocale(null)).toBe(false);
  });
});

describe("getInitialLocale", () => {
  afterEach(() => {
    localStorage.clear();
  });

  it("uses the language the visitor chose before", () => {
    setBrowserLanguages(["es-ES"]);
    localStorage.setItem(LOCALE_STORAGE_KEY, "it");

    expect(getInitialLocale()).toBe("it");
  });

  it("ignores a stored value that is not a supported language", () => {
    setBrowserLanguages(["es-ES"]);
    localStorage.setItem(LOCALE_STORAGE_KEY, "klingon");

    expect(getInitialLocale()).toBe("es");
  });

  it("otherwise uses the first browser language the site has, ignoring the region", () => {
    setBrowserLanguages(["fr-FR", "it-IT", "es"]);

    expect(getInitialLocale()).toBe("it");
  });

  it("falls back to English when no browser language is supported", () => {
    setBrowserLanguages(["fr-FR", "de"]);

    expect(getInitialLocale()).toBe("en");
  });

  it("still works when storage is blocked", () => {
    setBrowserLanguages(["es-MX"]);
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });

    expect(getInitialLocale()).toBe("es");
  });
});

describe("storeLocale", () => {
  afterEach(() => {
    localStorage.clear();
  });

  it("remembers the chosen language", () => {
    storeLocale("es");

    expect(localStorage.getItem(LOCALE_STORAGE_KEY)).toBe("es");
  });

  it("does not throw when storage is blocked", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });

    expect(() => storeLocale("es")).not.toThrow();
  });
});
