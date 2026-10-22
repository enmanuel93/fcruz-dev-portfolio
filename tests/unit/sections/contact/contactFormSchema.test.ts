import { describe, expect, it } from "vitest";
import {
  contactFormSchema,
  MESSAGE_MAX_LENGTH,
  MESSAGE_MIN_LENGTH,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  type ContactFormValues,
} from "@/sections/contact/contactFormSchema";

const validValues: ContactFormValues = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "Let's work together.",
};

// Messages reported for one field, so each case checks a single rule.
const errorsFor = (
  field: keyof ContactFormValues,
  value: string,
): string[] => {
  const result = contactFormSchema.safeParse({ ...validValues, [field]: value });
  return result.success
    ? []
    : result.error.issues
        .filter((issue) => issue.path[0] === field)
        .map((issue) => issue.message);
};

describe("contactFormSchema", () => {
  it("accepts valid values", () => {
    expect(contactFormSchema.safeParse(validValues).success).toBe(true);
  });

  it("trims every field", () => {
    const parsed = contactFormSchema.parse({
      name: "  Ada  ",
      email: " ada@example.com ",
      message: "  Let's work together.  ",
    });

    expect(parsed).toEqual({
      name: "Ada",
      email: "ada@example.com",
      message: "Let's work together.",
    });
  });

  it.each(["name", "email", "message"] as const)(
    "reports only 'required' for an empty or blank %s",
    (field) => {
      expect(errorsFor(field, "   ")).toHaveLength(1);
      expect(errorsFor(field, "   ")[0]).toMatch(/^Please enter/);
    },
  );

  it.each(["ada", "ada@", "@example.com", "ada@example"])(
    "rejects the invalid email %s",
    (email) => {
      expect(errorsFor("email", email)).toEqual([
        "Please enter a valid email address.",
      ]);
    },
  );

  it("enforces the name length limits", () => {
    expect(errorsFor("name", "A")).toEqual([
      `Name must be at least ${NAME_MIN_LENGTH} characters.`,
    ]);
    expect(errorsFor("name", "A".repeat(NAME_MAX_LENGTH))).toEqual([]);
    expect(errorsFor("name", "A".repeat(NAME_MAX_LENGTH + 1))).toEqual([
      `Name must be at most ${NAME_MAX_LENGTH} characters.`,
    ]);
  });

  it("enforces the message length limits", () => {
    expect(errorsFor("message", "a".repeat(MESSAGE_MIN_LENGTH - 1))).toEqual([
      `Message must be at least ${MESSAGE_MIN_LENGTH} characters.`,
    ]);
    expect(errorsFor("message", "a".repeat(MESSAGE_MIN_LENGTH))).toEqual([]);
    expect(errorsFor("message", "a".repeat(MESSAGE_MAX_LENGTH + 1))).toEqual([
      `Message must be at most ${MESSAGE_MAX_LENGTH} characters.`,
    ]);
  });
});
