import { ExternalLink, FolderOpen } from "lucide-react";
import type { ReactElement } from "react";
import { FaGithub } from "react-icons/fa";
import { AnimatedBorderButton } from "@/components/ui/AnimatedBorderButton";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { getAnimationDelay } from "@/lib/animation";
import { ProjectCard } from "./ProjectCard";

const ANIMATION_STEP_MS = 100;

export const Projects = (): ReactElement => {
  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <SectionHeader
          icon={FolderOpen}
          title="Featured Projects"
          description="Production systems I have designed and built, from government platforms to e-commerce."
          action={
            <AnimatedBorderButton href={profile.allProjectsUrl} target="_blank">
              <FaGithub className="size-4" aria-hidden="true" />
              View All Projects
              <ExternalLink className="size-3.5 text-muted-foreground" aria-hidden="true" />
            </AnimatedBorderButton>
          }
        />

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, idx) => (
            <ProjectCard
              key={project.title}
              project={project}
              style={{ animationDelay: getAnimationDelay(idx, ANIMATION_STEP_MS) }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
