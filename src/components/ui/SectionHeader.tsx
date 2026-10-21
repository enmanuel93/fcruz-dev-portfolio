import type { ReactElement } from "react";
import { cn } from "@/lib/cn";

interface SectionHeaderProps {
  /** Small uppercase label above the title. */
  eyebrow: string;
  title: string;
  /** Second half of the title, rendered in the italic serif accent. */
  highlight: string;
  description?: string;
  align?: "center" | "left";
}

export const SectionHeader = ({
  eyebrow,
  title,
  highlight,
  description,
  align = "center",
}: SectionHeaderProps): ReactElement => {
  return (
    <div className={cn("max-w-3xl mb-16", align === "center" && "text-center mx-auto")}>
      <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
        {eyebrow}
      </span>
      <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
        {title}{" "}
        <span className="font-serif italic font-normal text-white">
          {highlight}
        </span>
      </h2>
      {description && (
        <p className="text-muted-foreground animate-fade-in animation-delay-200">
          {description}
        </p>
      )}
    </div>
  );
};
