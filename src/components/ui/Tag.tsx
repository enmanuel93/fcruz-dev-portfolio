import type { ReactElement, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface TagProps {
  children: ReactNode;
  /** "interactive" adds a border and a hover highlight (used on project cards). */
  variant?: "default" | "interactive";
}

const variantClasses = {
  default: "px-3 py-1",
  interactive:
    "px-4 py-1.5 font-medium border border-border/50 hover:border-primary/50 hover:text-primary transition-all duration-300",
} as const;

export const Tag = ({ children, variant = "default" }: TagProps): ReactElement => {
  return (
    <span
      className={cn(
        "rounded-full bg-surface text-xs text-muted-foreground",
        variantClasses[variant],
      )}
    >
      {children}
    </span>
  );
};
