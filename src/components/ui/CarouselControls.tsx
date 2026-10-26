import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ReactElement } from "react";
import { cn } from "@/lib/cn";

interface CarouselControlsProps {
  /** Names the carousel in the arrow labels ("Previous Skills"). */
  label: string;
  count: number;
  activeIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
  className?: string;
}

const arrowClasses =
  "group flex size-11 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground transition-[border-color,color,background-color,box-shadow,transform] duration-300 hover:scale-105 hover:border-accent/60 hover:bg-surface-raised hover:text-foreground hover:shadow-[0_0_24px_-6px] hover:shadow-primary/70 active:scale-95";

// Round prev/next buttons with the pagination dots between them.
export const CarouselControls = ({
  label,
  count,
  activeIndex,
  onPrevious,
  onNext,
  onSelect,
  className,
}: CarouselControlsProps): ReactElement => (
  <div className={cn("flex items-center justify-center gap-4", className)}>
    <button type="button" aria-label={`Previous ${label}`} onClick={onPrevious} className={arrowClasses}>
      <ChevronLeft
        className="size-5 transition-transform duration-300 group-hover:-translate-x-0.5"
        aria-hidden="true"
      />
    </button>

    <div className="flex flex-wrap items-center justify-center gap-1">
      {Array.from({ length: count }, (_, idx) => (
        <button
          key={idx}
          type="button"
          aria-label={`Go to slide ${idx + 1} of ${count}`}
          aria-current={idx === activeIndex}
          onClick={() => onSelect(idx)}
          className="group/dot flex h-6 items-center px-0.5"
        >
          <span
            className={cn(
              "block h-1.5 rounded-full transition-all duration-300",
              idx === activeIndex
                ? "w-6 bg-accent"
                : "w-1.5 bg-muted-foreground/40 group-hover/dot:bg-muted-foreground/70",
            )}
          />
        </button>
      ))}
    </div>

    <button type="button" aria-label={`Next ${label}`} onClick={onNext} className={arrowClasses}>
      <ChevronRight
        className="size-5 transition-transform duration-300 group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </button>
  </div>
);
