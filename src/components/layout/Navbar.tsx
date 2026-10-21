import { Menu, X } from "lucide-react";
import { useEffect, useState, type ReactElement } from "react";
import { Button } from "@/components/ui/Button";
import { CONTACT_HREF, navLinks } from "@/data/navigation";
import { profile } from "@/data/profile";
import { cn } from "@/lib/cn";

// Past this many pixels of scroll, the navbar switches to its solid style.
const SCROLL_THRESHOLD = 50;
const MOBILE_MENU_ID = "mobile-menu";

export const Navbar = (): ReactElement => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

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
        "fixed top-0 left-0 right-0 transition-all duration-500 z-50",
        isScrolled ? "glass-strong py-3" : "bg-transparent py-5",
      )}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between">
        <a
          href="#"
          className="text-xl font-bold tracking-tight hover:text-primary"
        >
          {profile.initials}
          <span>.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          <div className="glass rounded-full px-2 py-1 flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <a
                href={href}
                key={href}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-full hover:bg-surface"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Button href={CONTACT_HREF} size="sm">
            Contact Me
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls={MOBILE_MENU_ID}
          className="md:hidden p-2 text-foreground cursor-pointer"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          {isMobileMenuOpen ? <X /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu: every link closes it, so the page isn't left covered after navigating. */}
      {isMobileMenuOpen && (
        <div id={MOBILE_MENU_ID} className="md:hidden glass-strong animate-fade-in">
          <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map(({ href, label }) => (
              <a
                href={href}
                key={href}
                onClick={closeMobileMenu}
                className="text-lg text-muted-foreground hover:text-foreground py-2"
              >
                {label}
              </a>
            ))}

            <Button href={CONTACT_HREF} onClick={closeMobileMenu}>
              Contact Me
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
