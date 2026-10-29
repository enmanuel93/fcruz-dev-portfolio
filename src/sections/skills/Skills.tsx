import type { ReactElement } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { skills } from "@/data/skills";
import { useLocale } from "@/i18n/useLocale";
import { SkillsMarquee } from "./SkillsMarquee";

export const Skills = (): ReactElement => {
  const { ui } = useLocale().content;

  return (
    <section id="skills" className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <SectionHeader
          title={ui.skills.title}
          description={ui.skills.description}
        />

        <SkillsMarquee skills={skills} />
      </div>
    </section>
  );
};
