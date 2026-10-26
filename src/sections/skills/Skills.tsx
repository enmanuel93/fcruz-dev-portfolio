import { CodeXml } from "lucide-react";
import type { ReactElement } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { skills } from "@/data/skills";
import { SkillsMarquee } from "./SkillsMarquee";

export const Skills = (): ReactElement => {
  return (
    <section id="skills" className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <SectionHeader
          icon={CodeXml}
          title="Skills & Technologies"
          description="The stack I use day to day, from the database to the browser."
        />

        <SkillsMarquee skills={skills} />
      </div>
    </section>
  );
};
