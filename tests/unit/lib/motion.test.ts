import { afterEach, describe, expect, it, vi } from "vitest";
import { prefersReducedMotion } from "@/lib/motion";

const mockMatches = (matches: boolean) =>
  vi
    .spyOn(window, "matchMedia")
    .mockImplementation((query: string) => ({ matches, media: query }) as MediaQueryList);

describe("prefersReducedMotion", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("is true when the OS asks for reduced motion", () => {
    const matchMedia = mockMatches(true);

    expect(prefersReducedMotion()).toBe(true);
    expect(matchMedia).toHaveBeenCalledWith("(prefers-reduced-motion: reduce)");
  });

  it("is false when the OS allows motion", () => {
    mockMatches(false);

    expect(prefersReducedMotion()).toBe(false);
  });

  it("is false when matchMedia is unavailable", () => {
    vi.stubGlobal("matchMedia", undefined);

    expect(prefersReducedMotion()).toBe(false);
  });
});
