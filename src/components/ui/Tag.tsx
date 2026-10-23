import type { ReactElement, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface TagProps {
  children: ReactNode;
  /** "accent" highlights the main technology of a project. */
  variant?: "default" | "accent";
}

const variantClasses = {
  default: "border-border bg-surface-raised text-muted-foreground",
  accent: "border-primary/40 bg-primary/15 text-accent",
} as const;

export const Tag = ({ children, variant = "default" }: TagProps): ReactElement => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium",
        variantClasses[variant],
      )}
    >
      {children}
    </span>
  );
};
