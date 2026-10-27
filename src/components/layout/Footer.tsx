import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { profileBase as profile } from "@/data/profile";
import { socialLinks } from "@/data/socials";
import { useLocale } from "@/i18n/useLocale";
import { BrandLogo } from "./BrandLogo";

export const Footer = (): ReactElement => {
  const { navLinks } = useLocale().content;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-10">
      <div className="container mx-auto flex flex-col items-center gap-8 px-6 md:flex-row md:justify-between">
        <div className="text-center md:text-left">
          <BrandLogo />
          <p className="mt-2 text-sm text-muted-foreground">
            © {currentYear} {profile.brand.name}
            {profile.brand.accent} · {profile.name}. All rights reserved.
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <SocialLinks links={socialLinks} />
        </div>
      </div>
    </footer>
  );
};
