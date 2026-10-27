import { z } from "zod";
import type { UiText } from "@/locales/types";

export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 50;
export const MESSAGE_MIN_LENGTH = 10;
export const MESSAGE_MAX_LENGTH = 1000;

// The schema reports codes, not sentences: the form turns them into the
// current language's message when it renders (getContactErrorMessage), so
// errors already on screen follow a language switch.
export type ContactErrorCode = keyof UiText["contact"]["validation"];

const code = (value: ContactErrorCode): ContactErrorCode => value;

// Values are trimmed before validation, so a field with only spaces counts as empty.
// `pipe` skips the email format check while the field is empty, so it shows one message.
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(NAME_MIN_LENGTH, code("nameTooShort"))
    .max(NAME_MAX_LENGTH, code("nameTooLong")),
  email: z
    .string()
    .trim()
    .min(1, code("emailRequired"))
    .pipe(z.email(code("emailInvalid"))),
  message: z
    .string()
    .trim()
    .min(MESSAGE_MIN_LENGTH, code("messageTooShort"))
    .max(MESSAGE_MAX_LENGTH, code("messageTooLong")),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const EMPTY_CONTACT_FORM: ContactFormValues = {
  name: "",
  email: "",
  message: "",
};

const messageFor: Record<
  ContactErrorCode,
  (text: UiText["contact"]["validation"]) => string
> = {
  nameTooShort: (text) => text.nameTooShort(NAME_MIN_LENGTH),
  nameTooLong: (text) => text.nameTooLong(NAME_MAX_LENGTH),
  emailRequired: (text) => text.emailRequired,
  emailInvalid: (text) => text.emailInvalid,
  messageTooShort: (text) => text.messageTooShort(MESSAGE_MIN_LENGTH),
  messageTooLong: (text) => text.messageTooLong(MESSAGE_MAX_LENGTH),
};

const isErrorCode = (value: string): value is ContactErrorCode =>
  Object.hasOwn(messageFor, value);

// A field's error code (as react-hook-form stores it) in the current language.
export const getContactErrorMessage = (
  errorCode: string | undefined,
  text: UiText["contact"]["validation"],
): string | undefined =>
  errorCode && isErrorCode(errorCode) ? messageFor[errorCode](text) : errorCode;
