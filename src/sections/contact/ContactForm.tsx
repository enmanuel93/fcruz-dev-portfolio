import { AlertCircle, CheckCircle, Send } from "lucide-react";
import type { ReactElement } from "react";
import { Button } from "@/components/ui/Button";
import { useLocale } from "@/i18n/useLocale";
import { cn } from "@/lib/cn";
import { useContactForm } from "./useContactForm";

const fieldClasses =
  "w-full rounded-xl border border-border bg-background/70 px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none transition-[border-color,box-shadow] focus:border-accent/70 focus:ring-2 focus:ring-primary/40";
const invalidFieldClasses =
  "border-red-400/70 focus:border-red-400 focus:ring-red-400/30";

const FieldError = ({
  id,
  message,
}: {
  id: string;
  message?: string;
}): ReactElement | null => {
  if (!message) return null;

  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-sm text-red-400">
      <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
};

export const ContactForm = (): ReactElement => {
  const { register, errors, isSubmitting, submitStatus, onSubmit } =
    useContactForm();

  const { form: text } = useLocale().content.ui.contact;
  const isSuccess = submitStatus.type === "success";

  return (
    // noValidate turns off the browser's popups so Zod's messages are shown instead.
    <form className="space-y-6" noValidate onSubmit={onSubmit}>
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          {text.nameLabel}
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          placeholder={text.namePlaceholder}
          className={cn(fieldClasses, errors.name && invalidFieldClasses)}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "name-error" : undefined}
          {...register("name")}
        />
        <FieldError id="name-error" message={errors.name?.message} />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          {text.emailLabel}
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder={text.emailPlaceholder}
          className={cn(fieldClasses, errors.email && invalidFieldClasses)}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...register("email")}
        />
        <FieldError id="email-error" message={errors.email?.message} />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          {text.messageLabel}
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder={text.messagePlaceholder}
          className={cn(
            fieldClasses,
            "resize-none",
            errors.message && invalidFieldClasses,
          )}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          {...register("message")}
        />
        <FieldError id="message-error" message={errors.message?.message} />
      </div>

      <Button className="w-full" type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting ? (
          text.sending
        ) : (
          <>
            {text.send}
            <Send className="w-5 h-5" />
          </>
        )}
      </Button>

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
