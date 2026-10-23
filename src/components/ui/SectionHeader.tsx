import type { LucideIcon } from "lucide-react";
import type { ReactElement, ReactNode } from "react";

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  /** Optional link or button shown on the right (stacks below on mobile). */
  action?: ReactNode;
}

export const SectionHeader = ({
  icon: Icon,
  title,
  description,
  action,
}: SectionHeaderProps): ReactElement => {
  return (
    <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex items-start gap-4">
        <span className="mt-1 flex size-11 shrink-0 items-center justify-center rounded-xl border border-border-strong bg-surface text-accent">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
          {description && (
            <p className="mt-1.5 max-w-xl text-sm text-muted-foreground md:text-base">
              {description}
            </p>
          )}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};
