import type { NavLink } from "@/types/content";

export const CONTACT_HREF = "/contact";
export const PROJECTS_HREF = "/projects";

// Section routes in menu order, the same in every language.
export const NAV_HREFS = [
  "/about",
  PROJECTS_HREF,
  "/experience",
  "/skills",
  CONTACT_HREF,
] as const;

export type NavHref = (typeof NAV_HREFS)[number];

// Each locale names every route; a missing label is a type error.
export const buildNavLinks = (labels: Record<NavHref, string>): NavLink[] =>
  NAV_HREFS.map((href) => ({ href, label: labels[href] }));
