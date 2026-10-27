import { BriefcaseBusiness } from "lucide-react";
import type { ReactElement } from "react";
import { FaLinkedin } from "react-icons/fa";
import { AnimatedBorderButton } from "@/components/ui/AnimatedBorderButton";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { socialLinks } from "@/data/socials";
import { useLocale } from "@/i18n/useLocale";
import { TimelineItem } from "./TimelineItem";

const linkedIn = socialLinks.find(({ label }) => label === "LinkedIn");

export const Experience = (): ReactElement => {
  const { experiences } = useLocale().content;

  return (
    <section id="experience" className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <SectionHeader
          icon={BriefcaseBusiness}
          title="Work Experience"
          description="Where I have built software, newest first."
          action={
            linkedIn && (
              <AnimatedBorderButton href={linkedIn.href} target="_blank">
                <FaLinkedin className="size-4 text-[#4f9fe8]" aria-hidden="true" />
                View more on LinkedIn
              </AnimatedBorderButton>
            )
          }
        />

        <div className="relative">
          {/* The rail behind the timeline dots (desktop only). */}
          <div
            className="absolute bottom-6 left-[0.3125rem] top-7 hidden w-px bg-gradient-to-b from-accent/70 via-border-strong to-transparent md:block"
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
