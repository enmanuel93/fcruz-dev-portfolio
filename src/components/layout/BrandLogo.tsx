import { CodeXml } from "lucide-react";
import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { profileBase as profile } from "@/data/profile";

// "/" scrolls back to the top of the page.
export const BrandLogo = (): ReactElement => {
  return (
    <Link
      to="/"
      aria-label={`${profile.brand.name}${profile.brand.accent}, back to top`}
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
