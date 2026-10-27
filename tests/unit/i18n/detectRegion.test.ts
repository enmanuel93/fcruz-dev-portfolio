import { afterEach, describe, expect, it, vi } from "vitest";
import { getInitialRegion } from "@/i18n/detectRegion";

const setUrlQuery = (query: string): void => {
  window.history.replaceState(null, "", `/${query}`);
};

const setRegionCookie = (value: string): void => {
  document.cookie = `region=${value}; path=/`;
};

const setTimeZone = (timeZone: string): void => {
  const { resolvedOptions } = Intl.DateTimeFormat.prototype;
  vi.spyOn(Intl.DateTimeFormat.prototype, "resolvedOptions").mockImplementation(
    function (this: Intl.DateTimeFormat) {
      return { ...resolvedOptions.call(this), timeZone };
    },
  );
};

describe("getInitialRegion", () => {
  afterEach(() => {
    setUrlQuery("");
    document.cookie = "region=; path=/; max-age=0";
  });

  it("uses ?region= from the URL first", () => {
    setUrlQuery("?region=americas");
    setRegionCookie("europe");
    setTimeZone("Europe/Rome");

    expect(getInitialRegion()).toBe("americas");
  });

  it("ignores a ?region= that is not a known region", () => {
    setUrlQuery("?region=asia");
    setRegionCookie("americas");

    expect(getInitialRegion()).toBe("americas");
  });

  it("otherwise uses the region the edge function set from the visitor's country", () => {
    setRegionCookie("americas");
    setTimeZone("Europe/Rome");

    expect(getInitialRegion()).toBe("americas");
  });

  it("finds the region cookie among other cookies", () => {
    document.cookie = "theme=dark; path=/";
    setRegionCookie("americas");
    setTimeZone("Europe/Rome");

    expect(getInitialRegion()).toBe("americas");
    document.cookie = "theme=; path=/; max-age=0";
  });

  it("without a cookie, places a visitor in an American time zone in the Americas", () => {
    setTimeZone("America/Santo_Domingo");

    expect(getInitialRegion()).toBe("americas");
  });

  it("falls back to Europe for any other time zone", () => {
    setTimeZone("Asia/Tokyo");

    expect(getInitialRegion()).toBe("europe");
  });
});
