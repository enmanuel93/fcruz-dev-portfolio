import { ArrowUpRight } from "lucide-react";
import type { CSSProperties, ReactElement, ReactNode } from "react";
import { FaGithub } from "react-icons/fa";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/types/content";

interface ProjectCardProps {
  project: Project;
  style?: CSSProperties;
}

const linkClasses =
  "inline-flex items-center gap-2 rounded-lg border border-border-strong px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-accent/60 hover:bg-surface-raised disabled:cursor-not-allowed disabled:border-border disabled:text-muted-foreground disabled:hover:bg-transparent";

interface ProjectLinkProps {
  href?: string;
  label: string;
  children: ReactNode;
}

// A link when the URL exists; otherwise the same button, disabled, so the card layout stays put.
const ProjectLink = ({ href, label, children }: ProjectLinkProps): ReactElement =>
  href ? (
    <a href={href} aria-label={label} className={linkClasses}>
      {children}
    </a>
  ) : (
    <button type="button" disabled title="Link coming soon" className={linkClasses}>
      {children}
    </button>
  );

export const ProjectCard = ({ project, style }: ProjectCardProps): ReactElement => {
  const [mainTag, ...otherTags] = project.tags;

  return (
    <article
      className="panel group flex flex-col rounded-2xl p-3 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-[0_24px_48px_-24px] hover:shadow-primary/40 animate-fade-in"
      style={style}
    >
      <div className="overflow-hidden rounded-xl border border-border bg-surface-raised">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h3 className="text-lg font-semibold leading-snug">{project.title}</h3>
          {mainTag && <Tag variant="accent">{mainTag}</Tag>}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        {otherTags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {otherTags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        )}

        <div className="mt-auto flex flex-wrap justify-end gap-2 pt-5">
          <ProjectLink href={project.demoUrl} label={`View ${project.title} live demo`}>
            Live demo
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </ProjectLink>
          <ProjectLink
            href={project.repoUrl}
            label={`View ${project.title} source code on GitHub`}
          >
            Code
            <FaGithub className="size-4" aria-hidden="true" />
          </ProjectLink>
        </div>
      </div>
    </article>
  );
};
