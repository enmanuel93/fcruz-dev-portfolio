import { describe, expect, it } from "vitest";
import { isEmailJsConfigured } from "@/config/env";

const completeConfig = {
  serviceId: "service_123",
  templateId: "template_123",
  publicKey: "public_123",
};

describe("isEmailJsConfigured", () => {
  it("accepts a config with every value set", () => {
    expect(isEmailJsConfigured(completeConfig)).toBe(true);
  });

  it.each(["serviceId", "templateId", "publicKey"] as const)(
    "rejects a config with an empty %s",
    (key) => {
      expect(isEmailJsConfigured({ ...completeConfig, [key]: "" })).toBe(false);
    },
  );
});
