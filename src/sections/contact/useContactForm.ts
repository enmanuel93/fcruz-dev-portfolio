import emailjs from "@emailjs/browser";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { emailJsConfig, isEmailJsConfigured } from "@/config/env";
import { useLocale } from "@/i18n/useLocale";
import {
  contactFormSchema,
  EMPTY_CONTACT_FORM,
  type ContactFormValues,
} from "./contactFormSchema";

export interface SubmitStatus {
  type: "success" | "error" | null;
  message: string;
}

// What happened, without the wording, so the message follows a language switch.
type SubmitOutcome =
  | { type: null }
  | { type: "success" }
  | { type: "error"; reason?: string };

// Only logged for the developer, never shown to the visitor.
export const MISSING_CONFIG_MESSAGE =
  "EmailJS configuration is missing. Please check your environment variables.";

const IDLE: SubmitOutcome = { type: null };

// EmailJS rejects with an object like { status, text } rather than an Error,
// so its `text` is the most useful thing to show the visitor.
const getErrorReason = (error: unknown): string | undefined => {
  if (
    typeof error === "object" &&
    error !== null &&
    "text" in error &&
    typeof error.text === "string"
  ) {
    return error.text;
  }

  return undefined;
};

// Kept outside the hook so the email provider can be swapped without touching
// the form logic.
const sendContactMessage = async (values: ContactFormValues): Promise<void> => {
  if (!isEmailJsConfigured(emailJsConfig)) {
    throw new Error(MISSING_CONFIG_MESSAGE);
  }

  const { serviceId, templateId, publicKey } = emailJsConfig;

  // The keys must match the variables used in the EmailJS template.
  await emailjs.send(
    serviceId,
    templateId,
    {
      from_name: values.name,
      from_email: values.email,
      message: values.message,
    },
    publicKey,
  );
};

export const useContactForm = () => {
  const { status: text } = useLocale().content.ui.contact;
  const [outcome, setOutcome] = useState<SubmitOutcome>(IDLE);

  // React Hook Form owns the field values (uncontrolled inputs, no re-render per
  // keystroke); Zod validates them. "onTouched" waits until a field is left
  // before showing its error, then re-validates on every change.
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: EMPTY_CONTACT_FORM,
    mode: "onTouched",
  });

  // handleSubmit only calls this with values that passed the schema, already
  // trimmed, and prevents the native form submission itself.
  const onValidSubmit = async (values: ContactFormValues): Promise<void> => {
    setOutcome(IDLE);

    try {
      await sendContactMessage(values);
      setOutcome({ type: "success" });
      reset();
    } catch (error: unknown) {
      console.error("EmailJS error:", error);
      setOutcome({ type: "error", reason: getErrorReason(error) });
    }
  };

  const submitStatus: SubmitStatus =
    outcome.type === "success"
      ? { type: "success", message: text.success }
      : outcome.type === "error"
        ? { type: "error", message: outcome.reason ?? text.failed }
        : { type: null, message: "" };

  return {
    register,
    errors,
    isSubmitting,
    submitStatus,
    onSubmit: handleSubmit(onValidSubmit),
  };
};
