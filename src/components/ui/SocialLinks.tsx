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
          className={cn(
            "p-2 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all",
            linkClassName,
          )}
        >
          <Icon className="w-5 h-5" aria-hidden="true" />
        </a>
      ))}
    </>
  );
};
