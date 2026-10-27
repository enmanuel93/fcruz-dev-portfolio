import { CodeXml } from "lucide-react";
import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { profileBase as profile } from "@/data/profile";
import { useLocale } from "@/i18n/useLocale";

// "/" scrolls back to the top of the page.
export const BrandLogo = (): ReactElement => {
  const { ui } = useLocale().content;

  return (
    <Link
      to="/"
      aria-label={ui.brandLogoLabel(`${profile.brand.name}${profile.brand.accent}`)}
      className="group inline-flex items-center gap-2.5 text-lg font-semibold tracking-tight"
    >
      <CodeXml
        className="size-6 text-accent transition-transform duration-300 group-hover:-rotate-6"
        aria-hidden="true"
      />
      <span>
        {profile.brand.name}
        <span className="text-accent">{profile.brand.accent}</span>
      </span>
    </Link>
  );
};
