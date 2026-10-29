import type { ReactElement } from "react";
import { Tag } from "@/components/ui/Tag";
import { getAnimationDelay } from "@/lib/animation";
import { cn } from "@/lib/cn";
import type { Experience } from "@/types/content";

const ANIMATION_STEP_MS = 120;

interface TimelineItemProps {
  experience: Experience;
  index: number;
}

export const TimelineItem = ({ experience, index }: TimelineItemProps): ReactElement => {
  return (
    <li
      className="relative grid gap-3 pb-6 last:pb-0 md:grid-cols-[11rem_1fr] md:gap-6 animate-fade-in"
      style={{ animationDelay: getAnimationDelay(index, ANIMATION_STEP_MS) }}
    >
      <div className="flex items-center gap-3 md:items-start md:pt-6">
        {/* Filled for the job I'm still in, hollow for the ones that ended. */}
        <span
          className={cn(
            "mt-0.5 size-2.5 shrink-0 rounded-full ring-4 ring-background",
            experience.current ? "bg-accent" : "border-2 border-accent bg-background",
          )}
          aria-hidden="true"
        />
        <span className="text-sm font-medium tabular-nums text-foreground/85">
          {experience.period}
        </span>
      </div>

      <div className="panel rounded-2xl p-5 transition-colors duration-300 hover:border-border-strong md:p-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between xl:gap-8">
          <div className="max-w-2xl">
            <h3 className="text-lg font-semibold">{experience.role}</h3>
            <p className="mt-0.5 text-sm font-medium text-accent">{experience.company}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {experience.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 xl:max-w-xs xl:justify-end">
            {experience.technologies.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>
        </div>
      </div>
    </li>
  );
};
