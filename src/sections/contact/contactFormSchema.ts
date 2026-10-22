import { z } from "zod";

export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 50;
export const MESSAGE_MIN_LENGTH = 10;
export const MESSAGE_MAX_LENGTH = 1000;

// Single source of truth for the contact form: the validation rules, the error
// messages shown under each field and (via z.infer) the form's TypeScript type.
// Values are trimmed first, so "   " counts as empty and EmailJS gets clean text.
// `abort: true` stops at "required", so an empty field gets one message, not two.
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { error: "Please enter your name.", abort: true })
    .min(NAME_MIN_LENGTH, `Name must be at least ${NAME_MIN_LENGTH} characters.`)
    .max(NAME_MAX_LENGTH, `Name must be at most ${NAME_MAX_LENGTH} characters.`),
  // pipe() only runs the email check once the value is non-empty, so an empty
  // field shows "required" instead of "invalid".
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email.")
    .pipe(z.email("Please enter a valid email address.")),
  message: z
    .string()
    .trim()
    .min(1, { error: "Please enter a message.", abort: true })
    .min(MESSAGE_MIN_LENGTH, `Message must be at least ${MESSAGE_MIN_LENGTH} characters.`)
    .max(MESSAGE_MAX_LENGTH, `Message must be at most ${MESSAGE_MAX_LENGTH} characters.`),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const EMPTY_CONTACT_FORM: ContactFormValues = {
  name: "",
  email: "",
  message: "",
};
