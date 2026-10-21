import { ArrowUpRight } from "lucide-react";
import type { CSSProperties, ReactElement } from "react";
import { FaGithub } from "react-icons/fa";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/types/content";

interface ProjectCardProps {
  project: Project;
  style?: CSSProperties;
}

const overlayLinkClasses =
  "p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all";

export const ProjectCard = ({ project, style }: ProjectCardProps): ReactElement => {
  return (
    <div
      className="group glass rounded-2xl overflow-hidden animate-fade-in md:row-span-1"
      style={style}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-video">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-60" />

        {/* Overlay Links: always visible on touch screens, on hover/focus from md up.
            Each link is skipped when the project has no URL for it. */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              aria-label={`View ${project.title} live demo`}
              className={overlayLinkClasses}
            >
              <ArrowUpRight className="w-5 h-5" aria-hidden="true" />
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              aria-label={`View ${project.title} source code on GitHub`}
              className={overlayLinkClasses}
            >
              <FaGithub className="w-5 h-5" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
        </div>
        <p className="text-muted-foreground text-sm">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Tag key={tag} variant="interactive">
              {tag}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  );
};
