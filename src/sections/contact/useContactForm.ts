import emailjs from "@emailjs/browser";
import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { emailJsConfig, isEmailJsConfigured } from "@/config/env";

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

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

const EMPTY_FORM: ContactFormData = { name: "", email: "", message: "" };
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

export const useContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>(EMPTY_FORM);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(IDLE_STATUS);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    setIsLoading(true);
    setSubmitStatus(IDLE_STATUS);

    try {
      if (!isEmailJsConfigured(emailJsConfig)) {
        throw new Error(MISSING_CONFIG_MESSAGE);
      }

      const { serviceId, templateId, publicKey } = emailJsConfig;

      // The keys must match the variables used in the EmailJS template.
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        publicKey,
      );

      setSubmitStatus({ type: "success", message: SUCCESS_MESSAGE });
      setFormData(EMPTY_FORM);
    } catch (error: unknown) {
      console.error("EmailJS error:", error);
      setSubmitStatus({ type: "error", message: getErrorMessage(error) });
    } finally {
      setIsLoading(false);
    }
  };

  return { formData, isLoading, submitStatus, handleChange, handleSubmit };
};
