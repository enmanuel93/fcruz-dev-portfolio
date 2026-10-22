import { AlertCircle, CheckCircle, Send } from "lucide-react";
import type { ReactElement } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { ContactFormValues } from "./contactFormSchema";
import { useContactForm } from "./useContactForm";

const fieldClasses =
  "w-full px-4 py-3 bg-surface rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all";
const invalidFieldClasses =
  "border-red-500/60 focus:border-red-500 focus:ring-red-500";

// Ids that tie each field to its error text through aria-describedby.
const errorId = (field: keyof ContactFormValues): string => `${field}-error`;

const FieldError = ({
  field,
  message,
}: {
  field: keyof ContactFormValues;
  message?: string;
}): ReactElement | null => {
  if (!message) return null;

  return (
    <p
      id={errorId(field)}
      className="mt-2 flex items-center gap-1.5 text-sm text-red-400"
    >
      <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
};

export const ContactForm = (): ReactElement => {
  const { register, errors, isSubmitting, submitStatus, onSubmit } =
    useContactForm();

  const isSuccess = submitStatus.type === "success";

  // Props every field shares: invalid state for assistive tech plus the link
  // to the error message, only while there is one.
  const a11yProps = (field: keyof ContactFormValues) => ({
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? errorId(field) : undefined,
  });

  return (
    // noValidate: Zod is the single source of validation, so the browser's own
    // bubbles (which ignore the site's styling) don't fire first.
    <form className="space-y-6" noValidate onSubmit={onSubmit}>
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="Your name..."
          className={cn(fieldClasses, errors.name && invalidFieldClasses)}
          {...a11yProps("name")}
          {...register("name")}
        />
        <FieldError field="name" message={errors.name?.message} />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="your@email.com"
          className={cn(fieldClasses, errors.email && invalidFieldClasses)}
          {...a11yProps("email")}
          {...register("email")}
        />
        <FieldError field="email" message={errors.email?.message} />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Your message..."
          className={cn(
            fieldClasses,
            "resize-none",
            errors.message && invalidFieldClasses,
          )}
          {...a11yProps("message")}
          {...register("message")}
        />
        <FieldError field="message" message={errors.message?.message} />
      </div>

      <Button className="w-full" type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting ? (
          <>Sending...</>
        ) : (
          <>
            Send Message
            <Send className="w-5 h-5" />
          </>
        )}
      </Button>

      {/* Result of the last submit. role="status" makes screen readers announce it. */}
      {submitStatus.type && (
        <div
          role="status"
          className={cn(
            "flex items-center gap-3 p-4 rounded-xl",
            isSuccess
              ? "bg-green-500/10 border border-green-500/20 text-green-400"
              : "bg-red-500/10 border border-red-500/20 text-red-400",
          )}
        >
          {isSuccess ? (
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
          )}
          <p className="text-sm">{submitStatus.message}</p>
        </div>
      )}
    </form>
  );
};
