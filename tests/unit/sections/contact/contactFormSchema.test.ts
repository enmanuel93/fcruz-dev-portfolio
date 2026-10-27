import { describe, expect, it } from "vitest";
import { locales } from "@/locales";
import {
  contactFormSchema,
  getContactErrorMessage,
  MESSAGE_MAX_LENGTH,
  MESSAGE_MIN_LENGTH,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  type ContactErrorCode,
  type ContactFormValues,
} from "@/sections/contact/contactFormSchema";

const validValues: ContactFormValues = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "Let's work together.",
};

// Error codes for a single field.
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

  it.each([
    ["name", "nameTooShort"],
    ["email", "emailRequired"],
    ["message", "messageTooShort"],
  ] as const)("reports a single error for a blank %s", (field, expected) => {
    expect(errorsFor(field, "   ")).toEqual([expected]);
  });

  it.each(["ada", "ada@", "@example.com", "ada@example"])(
    "rejects the invalid email %s",
    (email) => {
      expect(errorsFor("email", email)).toEqual(["emailInvalid"]);
    },
  );

  it("enforces the name length limits", () => {
    expect(errorsFor("name", "A")).toEqual(["nameTooShort"]);
    expect(errorsFor("name", "A".repeat(NAME_MAX_LENGTH))).toEqual([]);
    expect(errorsFor("name", "A".repeat(NAME_MAX_LENGTH + 1))).toEqual(["nameTooLong"]);
  });

  it("enforces the message length limits", () => {
    expect(errorsFor("message", "a".repeat(MESSAGE_MIN_LENGTH - 1))).toEqual([
      "messageTooShort",
    ]);
    expect(errorsFor("message", "a".repeat(MESSAGE_MIN_LENGTH))).toEqual([]);
    expect(errorsFor("message", "a".repeat(MESSAGE_MAX_LENGTH + 1))).toEqual([
      "messageTooLong",
    ]);
  });
});

describe("getContactErrorMessage", () => {
  const { validation } = locales.en.ui.contact;

  it.each([
    ["nameTooShort", `Name must be at least ${NAME_MIN_LENGTH} characters.`],
    ["nameTooLong", `Name must be at most ${NAME_MAX_LENGTH} characters.`],
    ["emailRequired", "Please enter your email."],
    ["emailInvalid", "Please enter a valid email address."],
    ["messageTooShort", `Message must be at least ${MESSAGE_MIN_LENGTH} characters.`],
    ["messageTooLong", `Message must be at most ${MESSAGE_MAX_LENGTH} characters.`],
  ] as const satisfies readonly (readonly [ContactErrorCode, string])[])(
    "turns %s into the current language's message, with the schema's limits",
    (code, expected) => {
      expect(getContactErrorMessage(code, validation)).toBe(expected);
    },
  );

  it("uses the Spanish wording with the same limits", () => {
    expect(getContactErrorMessage("nameTooShort", locales.es.ui.contact.validation)).toContain(
      String(NAME_MIN_LENGTH),
    );
  });

  it("returns no message for no error", () => {
    expect(getContactErrorMessage(undefined, validation)).toBeUndefined();
  });
});
