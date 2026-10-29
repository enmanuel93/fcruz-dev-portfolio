import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState, type ReactElement } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale } from "@/i18n/useLocale";
import { cn } from "@/lib/cn";

const navButtonClasses =
  "flex size-10 items-center justify-center rounded-xl border border-border bg-surface text-muted-foreground transition-colors hover:border-accent/60 hover:text-foreground";

export const Testimonials = (): ReactElement => {
  const { testimonials, ui } = useLocale().content;
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const active = testimonials[activeIdx];

  // Both directions wrap around, so the carousel never hits a dead end.
  const next = (): void => {
    setActiveIdx((prev) => (prev + 1) % testimonials.length);
  };

  const previous = (): void => {
    setActiveIdx(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <section id="testimonials" className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <SectionHeader
          title={ui.testimonials.title}
          description={ui.testimonials.description}
        />

        <figure className="panel relative overflow-hidden rounded-2xl p-6 md:p-10 animate-fade-in animation-delay-100">
          <Quote
            className="absolute right-6 top-6 size-16 text-primary/20 md:size-24"
            aria-hidden="true"
          />
          {/* key restarts the fade when the testimonial changes. */}
          <div key={active.author} className="relative animate-fade-in is-visible">
            <blockquote className="max-w-3xl text-xl font-medium leading-relaxed md:text-2xl">
              "{active.quote}"
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <img
                src={active.avatar}
                alt={active.author}
                width={48}
                height={48}
                className="size-12 rounded-full object-cover ring-2 ring-accent/40"
              />
              <div>
                <div className="font-semibold">{active.author}</div>
                <div className="text-sm text-muted-foreground">{active.role}</div>
              </div>
            </figcaption>
          </div>
        </figure>

        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="flex gap-2">
            {testimonials.map((testimonial, idx) => (
              <button
                key={testimonial.author}
                type="button"
                aria-label={ui.testimonials.showTestimonial(idx + 1, testimonials.length)}
                aria-current={idx === activeIdx}
                onClick={() => setActiveIdx(idx)}
                className="flex h-6 items-center"
              >
                <span
                  className={cn(
                    "block h-1.5 rounded-full transition-all duration-300",
                    idx === activeIdx
                      ? "w-8 bg-accent"
                      : "w-1.5 bg-muted-foreground/40 hover:bg-muted-foreground/70",
                  )}
                />
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              aria-label={ui.testimonials.previous}
              className={navButtonClasses}
              onClick={previous}
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label={ui.testimonials.next}
              className={navButtonClasses}
              onClick={next}
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
