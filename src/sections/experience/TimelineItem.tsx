import type { ReactElement } from "react";
import { Tag } from "@/components/ui/Tag";
import { getAnimationDelay } from "@/lib/animation";
import { cn } from "@/lib/cn";
import type { Experience } from "@/types/content";

const ANIMATION_STEP_MS = 150;

interface TimelineItemProps {
  experience: Experience;
  index: number;
}

export const TimelineItem = ({ experience, index }: TimelineItemProps): ReactElement => {
  // On desktop the cards alternate sides of the timeline, starting on the left.
  const isLeftSide = index % 2 === 0;

  return (
    <div
      className="relative grid md:grid-cols-2 gap-8 animate-fade-in"
      style={{ animationDelay: getAnimationDelay(index, ANIMATION_STEP_MS) }}
    >
      {/* Timeline Dot */}
      <div className="absolute left-0 md:left-1/2 top-0 w-3 h-3 bg-primary rounded-full -translate-x-1/2 ring-4 ring-background z-10">
        {experience.current && (
          <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
        )}
      </div>

      {/* Content */}
      <div
        className={cn(
          "pl-8 md:pl-0",
          isLeftSide ? "md:pr-16 md:text-right" : "md:col-start-2 md:pl-16",
        )}
      >
        <div className="glass p-6 rounded-2xl border border-primary/30 hover:border-primary/50 transition-all duration-500">
          <span className="text-sm text-primary font-medium">
            {experience.period}
          </span>
          <h3 className="text-xl font-semibold mt-2">{experience.role}</h3>
          <p className="text-muted-foreground">{experience.company}</p>
          <p className="text-sm text-muted-foreground mt-4">
            {experience.description}
          </p>
          <div className={cn("flex flex-wrap gap-2 mt-4", isLeftSide && "md:justify-end")}>
            {experience.technologies.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
