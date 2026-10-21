import { AlertCircle, CheckCircle, Send } from "lucide-react";
import type { ReactElement } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { useContactForm } from "./useContactForm";

const fieldClasses =
  "w-full px-4 py-3 bg-surface rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all";

export const ContactForm = (): ReactElement => {
  const { formData, isLoading, submitStatus, handleChange, handleSubmit } =
    useContactForm();

  const isSuccess = submitStatus.type === "success";

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Your name..."
          className={fieldClasses}
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="your@email.com"
          className={fieldClasses}
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Your message..."
          className={cn(fieldClasses, "resize-none")}
          value={formData.message}
          onChange={handleChange}
        />
      </div>

      <Button className="w-full" type="submit" size="lg" disabled={isLoading}>
        {isLoading ? (
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
