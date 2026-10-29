import { ArrowUpRight } from "lucide-react";
import type { CSSProperties, ReactElement, ReactNode } from "react";
import { FaGithub } from "react-icons/fa";
import { Tag } from "@/components/ui/Tag";
import { useLocale } from "@/i18n/useLocale";
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
  /** Tooltip of the disabled button shown while there is no URL. */
  comingSoon: string;
  children: ReactNode;
}

// A link when the URL exists; otherwise the same button, disabled, so the card layout stays put.
const ProjectLink = ({ href, label, comingSoon, children }: ProjectLinkProps): ReactElement =>
  href ? (
    <a href={href} aria-label={label} className={linkClasses}>
      {children}
    </a>
  ) : (
    <button type="button" disabled title={comingSoon} className={linkClasses}>
      {children}
    </button>
  );

export const ProjectCard = ({ project, style }: ProjectCardProps): ReactElement => {
  const { projects: text } = useLocale().content.ui;
  const [mainTag, ...otherTags] = project.tags;

  return (
    <article
      className="panel group flex w-full max-w-md flex-col rounded-2xl p-3 transition-colors duration-300 hover:border-border-strong animate-fade-in"
      style={style}
    >
      <div className="overflow-hidden rounded-xl border border-border bg-surface-raised">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="h-50 w-full object-cover"
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
          <ProjectLink
            href={project.demoUrl}
            label={text.liveDemoLabel(project.title)}
            comingSoon={text.linkComingSoon}
          >
            {text.liveDemo}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </ProjectLink>
          <ProjectLink
            href={project.repoUrl}
            label={text.codeLabel(project.title)}
            comingSoon={text.linkComingSoon}
          >
            {text.code}
            <FaGithub className="size-4" aria-hidden="true" />
          </ProjectLink>
        </div>
      </div>
    </article>
  );
};
