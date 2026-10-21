import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState, type ReactElement } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/cn";

export const Testimonials = (): ReactElement => {
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
    <section id="testimonials" className="py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader
          eyebrow="What People Say"
          title="Kind words from"
          highlight="amazing people."
        />

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Main Testimonial */}
            <div className="glass p-8 rounded-3xl md:p-12 glow-border animate-fade-in animation-delay-200">
              <div className="absolute -top-4 left-8 w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <Quote className="w-6 h-6 text-primary-foreground" />
              </div>
              <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8 pt-4">
                "{active.quote}"
              </blockquote>

              <div className="flex items-center gap-4">
                <img
                  src={active.avatar}
                  alt={active.author}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20"
                />
                <div>
                  <div className="font-semibold">{active.author}</div>
                  <div className="text-sm text-muted-foreground">
                    {active.role}
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonials Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                type="button"
                aria-label="Previous testimonial"
                className="p-3 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all"
                onClick={previous}
              >
                <ChevronLeft aria-hidden="true" />
              </button>

              <div className="flex gap-2">
                {testimonials.map((testimonial, idx) => (
                  <button
                    key={testimonial.author}
                    type="button"
                    aria-label={`Show testimonial ${idx + 1} of ${testimonials.length}`}
                    aria-current={idx === activeIdx}
                    onClick={() => setActiveIdx(idx)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-300",
                      idx === activeIdx
                        ? "w-8 bg-primary"
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50",
                    )}
                  />
                ))}
              </div>

              <button
                type="button"
                aria-label="Next testimonial"
                className="p-3 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all"
                onClick={next}
              >
                <ChevronRight aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
