import type { NavLink } from "@/types/content";

export const CONTACT_HREF = "/contact";
export const PROJECTS_HREF = "/projects";

export const navLinks_1 = [
  { href: "#about", label: "About" },
  { href: PROJECTS_HREF, label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  // { href: "#testimonials", label: "Testimonials" },
  { href: CONTACT_HREF, label: "Contact" },
] as const satisfies readonly NavLink[];


export const navLinks = [
  { href: "/about", label: "About" },
  { href: PROJECTS_HREF, label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/skills", label: "Skills" },
  // { href: "/testimonials", label: "Testimonials" },
  { href: CONTACT_HREF, label: "Contact" },
] as const satisfies readonly NavLink[];