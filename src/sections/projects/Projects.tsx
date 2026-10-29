import { ExternalLink } from "lucide-react";
import type { ReactElement } from "react";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { profileBase as profile } from "@/data/profile";
import { useLocale } from "@/i18n/useLocale";
import { getAnimationDelay } from "@/lib/animation";
import { ProjectCard } from "./ProjectCard";

const ANIMATION_STEP_MS = 100;

export const Projects = (): ReactElement => {
  const { projects, ui } = useLocale().content;

  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <SectionHeader
          title={ui.projects.title}
          description={ui.projects.description}
          action={
            <Button href={profile.allProjectsUrl} target="_blank" variant="outline" size="sm">
              <FaGithub className="size-4" aria-hidden="true" />
              {ui.projects.viewAll}
              <ExternalLink className="size-3.5 text-muted-foreground" aria-hidden="true" />
            </Button>
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
