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

// EmailJS fails with { status, text } instead of an Error; `text` explains what went wrong.
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

const sendContactMessage = async (values: ContactFormValues): Promise<void> => {
  if (!isEmailJsConfigured(emailJsConfig)) {
    throw new Error(MISSING_CONFIG_MESSAGE);
  }

  const { serviceId, templateId, publicKey } = emailJsConfig;

  // These keys must match the variable names in the EmailJS template.
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

  // "onTouched": show a field's error after the user leaves it, then update it while they type.
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

  // Only runs when every field is valid; the values are already trimmed.
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
