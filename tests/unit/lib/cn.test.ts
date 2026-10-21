import { describe, expect, it } from "vitest";
import { cn } from "@/lib/cn";

describe("cn", () => {
  it("joins class names and drops falsy values", () => {
    const isActive = false;

    expect(cn("rounded", isActive && "bg-primary", undefined, "p-4")).toBe(
      "rounded p-4",
    );
  });

  it("keeps only the last of two conflicting Tailwind classes", () => {
    expect(cn("px-6 py-3", "px-4")).toBe("py-3 px-4");
  });

  it("does not treat classes for different breakpoints as conflicts", () => {
    expect(cn("pl-8", "md:pl-16")).toBe("pl-8 md:pl-16");
  });
});
