import type { LocaleContent } from "../types";
import { contactInfo } from "./contact";
import { experiences } from "./experience";
import { highlights } from "./highlights";
import { navLinks } from "./navigation";
import { about, profile } from "./profile";
import { projects } from "./projects";
import { testimonials } from "./testimonials";
import { ui } from "./ui";

export const es = {
  ui,
  profile,
  about,
  navLinks,
  highlights,
  projects,
  experiences,
  testimonials,
  contactInfo,
} as const satisfies LocaleContent;
