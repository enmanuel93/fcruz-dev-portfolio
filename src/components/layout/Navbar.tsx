import { Download, Menu, X } from "lucide-react";
import { useEffect, useState, type ReactElement } from "react";
import { Button } from "@/components/ui/Button";
import { NAV_HREFS } from "@/data/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useLocale } from "@/i18n/useLocale";
import { cn } from "@/lib/cn";
import { BrandLogo } from "./BrandLogo";
// import { scrollToSection } from "@/lib/scrollSection";
import { Link } from "react-router-dom";

// Past this many pixels of scroll, the navbar switches to its solid style.
const SCROLL_THRESHOLD = 50;
const MOBILE_MENU_ID = "mobile-menu";
// From the language-independent routes, so the observed sections stay put when the language changes.
const SECTION_IDS = NAV_HREFS.map((href) => href.slice(1));

export const Navbar = (): ReactElement => {
  const { navLinks, profile, ui } = useLocale().content;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const activeSection = useActiveSection(SECTION_IDS);
  // The active link follows the section in view (scroll), not the current route.
  const isActive = (href: string): boolean => href === `/${activeSection}`;

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return (): void => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = (): void => setIsMobileMenuOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,padding] duration-300",
        isScrolled || isMobileMenuOpen
          ? "glass-strong py-3"
          : "bg-transparent py-5",
        isMobileMenuOpen &&
          "bg-background shadow-[0_24px_48px_-12px_rgb(0_0_0/0.6)]",
      )}
    >
      <nav className="container mx-auto flex items-center justify-between px-6">
        {/* Brand Logo */}
        <BrandLogo />

        {/* Menu */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                to={href}
                aria-current={isActive(href) ? "true" : undefined}
                className={cn(
                  "relative rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-accent after:transition-transform after:duration-300 hover:after:scale-x-100",
                  isActive(href) && "text-foreground after:scale-x-100",
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* download button */}
        <div className="hidden lg:block">
          <Button href={profile.cvUrl} download size="sm">
            <Download className="size-4" aria-hidden="true" />
            {ui.nav.downloadCv}
          </Button>
        </div>

        <button
          type="button"
          aria-label={isMobileMenuOpen ? ui.nav.closeMenu : ui.nav.openMenu}
          aria-expanded={isMobileMenuOpen}
          aria-controls={MOBILE_MENU_ID}
          className="flex size-10 items-center justify-center rounded-xl border border-border bg-surface text-foreground lg:hidden"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          {isMobileMenuOpen ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Every link closes the menu, so the page isn't left covered after navigating. */}
      {isMobileMenuOpen && (
        <div id={MOBILE_MENU_ID} className="lg:hidden animate-fade-in">
          <div className="container mx-auto flex flex-col gap-1 px-6 pb-6 pt-4">
            {navLinks.map(({ href, label }) => (
              <Link
                to={href}
                key={href}
                onClick={closeMobileMenu}
                aria-current={isActive(href) ? "true" : undefined}
                className={cn(
                  "rounded-lg px-3 py-3 text-base text-muted-foreground transition-colors hover:bg-surface hover:text-foreground",
                  isActive(href) && "bg-surface text-foreground",
                )}
              >
                {label}
              </Link>
            ))}

            <Button
              href={profile.cvUrl}
              download
              className="mt-3"
              onClick={closeMobileMenu}
            >
              <Download className="size-4" aria-hidden="true" />
              {ui.nav.downloadCv}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
