import type { LocaleContent } from "../types";
import { contactInfo } from "./contact";
import { experiences } from "./experience";
import { highlights } from "./highlights";
import { navLinks } from "./navigation";
import { about, profile } from "./profile";
import { projects } from "./projects";
import { testimonials } from "./testimonials";

export const en = {
  profile,
  about,
  navLinks,
  highlights,
  projects,
  experiences,
  testimonials,
  contactInfo,
} as const satisfies LocaleContent;
