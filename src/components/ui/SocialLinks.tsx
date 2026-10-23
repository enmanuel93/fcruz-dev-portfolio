import type { ReactElement } from "react";
import { cn } from "@/lib/cn";
import type { SocialLink } from "@/types/content";

interface SocialLinksProps {
  links: readonly SocialLink[];
  linkClassName?: string;
}

// Renders only the icon links, so each caller decides the surrounding layout.
export const SocialLinks = ({
  links,
  linkClassName,
}: SocialLinksProps): ReactElement => {
  return (
    <>
      {links.map(({ icon: Icon, href, label }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          // Web profiles open in a new tab; mailto: and tel: links don't need one.
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className={cn(
            "flex size-10 items-center justify-center rounded-xl border border-border bg-surface text-muted-foreground transition-colors hover:border-accent/60 hover:text-foreground",
            linkClassName,
          )}
        >
          <Icon className="size-[18px]" aria-hidden="true" />
        </a>
      ))}
    </>
  );
};
