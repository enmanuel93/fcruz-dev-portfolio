import type { NavLink } from "@/types/content";

export const CONTACT_HREF = "#contact";
export const PROJECTS_HREF = "#projects";

// Shared by the navbar and the footer.
export const navLinks = [
  { href: "#about", label: "About" },
  { href: PROJECTS_HREF, label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#testimonials", label: "Testimonials" },
  { href: CONTACT_HREF, label: "Contact" },
] as const satisfies readonly NavLink[];
