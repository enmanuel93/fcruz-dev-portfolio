import type { ReactElement } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { experiences } from "@/data/experience";
import { TimelineItem } from "./TimelineItem";

export const Experience = (): ReactElement => {
  return (
    <section id="experience" className="py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader
          align="left"
          eyebrow="Career Journey"
          title="Experience that"
          highlight="speaks volumes."
          description="A timeline of my professional growth, from curious beginner to senior engineer leading teams and building products at scale."
        />

        <div className="relative">
          {/* Vertical line: on the left edge on mobile, centered from md up. */}
          <div className="timeline-glow absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/70 via-primary/30 to-transparent md:-translate-x-1/2 shadow-[0_0_25px_rgba(32,178,166,0.8)]" />

          <div className="space-y-12">
            {experiences.map((experience, idx) => (
              <TimelineItem
                key={`${experience.company}-${experience.period}`}
                experience={experience}
                index={idx}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
