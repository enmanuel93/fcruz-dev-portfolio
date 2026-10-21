import type { NavLink } from "@/types/content";

export const CONTACT_HREF = "#contact";

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#testimonials", label: "Testimonials" },
] as const satisfies readonly NavLink[];

// The footer swaps Testimonials for Contact, since the navbar already has
// a dedicated "Contact Me" button.
export const footerLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: CONTACT_HREF, label: "Contact" },
] as const satisfies readonly NavLink[];
