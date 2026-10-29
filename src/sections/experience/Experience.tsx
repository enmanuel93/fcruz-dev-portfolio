import type { ReactElement } from "react";
import { FaLinkedin } from "react-icons/fa";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { socialLinks } from "@/data/socials";
import { useLocale } from "@/i18n/useLocale";
import { TimelineItem } from "./TimelineItem";

const linkedIn = socialLinks.find(({ label }) => label === "LinkedIn");

export const Experience = (): ReactElement => {
  const { experiences, ui } = useLocale().content;

  return (
    <section id="experience" className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <SectionHeader
          title={ui.experience.title}
          description={ui.experience.description}
          action={
            linkedIn && (
              <Button href={linkedIn.href} target="_blank" variant="outline" size="sm">
                <FaLinkedin className="size-4 text-[#4f9fe8]" aria-hidden="true" />
                {ui.experience.viewMoreOnLinkedIn}
              </Button>
            )
          }
        />

        <div className="relative">
          {/* The rail behind the timeline dots (desktop only). */}
          <div
            className="absolute bottom-6 left-[0.3125rem] top-7 hidden w-px bg-border-strong md:block"
            aria-hidden="true"
          />
          <ol>
            {experiences.map((experience, idx) => (
              <TimelineItem
                key={`${experience.company}-${experience.period}`}
                experience={experience}
                index={idx}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
