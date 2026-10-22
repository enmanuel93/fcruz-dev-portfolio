import emailjs from "@emailjs/browser";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { emailJsConfig, isEmailJsConfigured } from "@/config/env";
import {
  contactFormSchema,
  EMPTY_CONTACT_FORM,
  type ContactFormValues,
} from "./contactFormSchema";

export interface SubmitStatus {
  type: "success" | "error" | null;
  message: string;
}

export const SUCCESS_MESSAGE =
  "Message sent successfully! I'll get back to you soon.";
export const FALLBACK_ERROR_MESSAGE =
  "Failed to send message. Please try again later.";
export const MISSING_CONFIG_MESSAGE =
  "EmailJS configuration is missing. Please check your environment variables.";

const IDLE_STATUS: SubmitStatus = { type: null, message: "" };

// EmailJS rejects with an object like { status, text } rather than an Error,
// so its `text` is the most useful thing to show the visitor.
const getErrorMessage = (error: unknown): string => {
  if (
    typeof error === "object" &&
    error !== null &&
    "text" in error &&
    typeof error.text === "string"
  ) {
    return error.text;
  }

  return FALLBACK_ERROR_MESSAGE;
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
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(IDLE_STATUS);

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
    setSubmitStatus(IDLE_STATUS);

    try {
      await sendContactMessage(values);
      setSubmitStatus({ type: "success", message: SUCCESS_MESSAGE });
      reset();
    } catch (error: unknown) {
      console.error("EmailJS error:", error);
      setSubmitStatus({ type: "error", message: getErrorMessage(error) });
    }
  };

  return {
    register,
    errors,
    isSubmitting,
    submitStatus,
    onSubmit: handleSubmit(onValidSubmit),
  };
};
