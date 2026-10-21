import { ArrowUpRight } from "lucide-react";
import type { ReactElement } from "react";
import { AnimatedBorderButton } from "@/components/ui/AnimatedBorderButton";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { getAnimationDelay } from "@/lib/animation";
import { ProjectCard } from "./ProjectCard";

const ANIMATION_STEP_MS = 100;

export const Projects = (): ReactElement => {
  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      {/* Bg glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-highlight/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader
          eyebrow="Featured Work"
          title="Projects that"
          highlight="make an impact."
          description="A selection of my recent work, from complex web applications to innovative tools that solve real-world problems."
        />

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <ProjectCard
              key={project.title}
              project={project}
              style={{ animationDelay: getAnimationDelay(idx, ANIMATION_STEP_MS) }}
            />
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12 animate-fade-in animation-delay-500">
          <AnimatedBorderButton href={profile.allProjectsUrl} target="_blank">
            View All Projects
            <ArrowUpRight className="w-5 h-5" />
          </AnimatedBorderButton>
        </div>
      </div>
    </section>
  );
};
