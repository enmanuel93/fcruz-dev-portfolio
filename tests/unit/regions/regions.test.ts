import { describe, expect, it } from "vitest";
import { isRegion, regionForCountry } from "@/regions";

describe("regionForCountry", () => {
  it.each(["DO", "US", "CA", "MX", "BR", "AR", "PR"])(
    "places %s in the Americas",
    (code) => {
      expect(regionForCountry(code)).toBe("americas");
    },
  );

  it.each(["IT", "ES", "GB", "DE", "JP"])("places %s in Europe (the default)", (code) => {
    expect(regionForCountry(code)).toBe("europe");
  });

  it("ignores the case of the code", () => {
    expect(regionForCountry("do")).toBe("americas");
  });

  it("falls back to Europe when the country is unknown", () => {
    expect(regionForCountry(undefined)).toBe("europe");
    expect(regionForCountry("")).toBe("europe");
    expect(regionForCountry("XX")).toBe("europe");
  });
});

describe("isRegion", () => {
  it("accepts only the known regions", () => {
    expect(isRegion("americas")).toBe(true);
    expect(isRegion("europe")).toBe(true);
    expect(isRegion("asia")).toBe(false);
    expect(isRegion(null)).toBe(false);
  });
});
