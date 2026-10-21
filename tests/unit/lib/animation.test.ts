import { describe, expect, it } from "vitest";
import { getAnimationDelay } from "@/lib/animation";

describe("getAnimationDelay", () => {
  it("delays the first item by one step instead of zero", () => {
    expect(getAnimationDelay(0, 100)).toBe("100ms");
  });

  it("grows linearly with the index", () => {
    expect(getAnimationDelay(1, 100)).toBe("200ms");
    expect(getAnimationDelay(3, 150)).toBe("600ms");
  });
});
