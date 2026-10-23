import { CodeXml } from "lucide-react";
import type { ReactElement } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { skills } from "@/data/skills";
import { getAnimationDelay } from "@/lib/animation";

const ANIMATION_STEP_MS = 40;

export const Skills = (): ReactElement => {
  return (
    <section id="skills" className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <SectionHeader
          icon={CodeXml}
          title="Skills & Technologies"
          description="The stack I use day to day, from the database to the browser."
        />

        <ul className="grid auto-rows-fr grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-10">
          {skills.map(({ name, icon: Icon, color }, idx) => (
            <li
              key={name}
              className="panel group flex flex-col items-center justify-center gap-3 rounded-xl px-2 py-5 text-center transition-[border-color,transform,background-color] duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface-raised animate-fade-in"
              style={{ animationDelay: getAnimationDelay(idx, ANIMATION_STEP_MS) }}
            >
              <Icon
                className="size-8 transition-transform duration-300 group-hover:scale-110"
                style={{ color }}
                aria-hidden="true"
              />
              <span className="text-xs font-medium leading-tight text-muted-foreground transition-colors group-hover:text-foreground">
                {name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
