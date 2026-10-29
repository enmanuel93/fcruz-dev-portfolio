import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";

// The shapes of everything in src/data. Components only depend on these
// types, so the content can change without touching the UI.

export interface Profile {
  name: string;
  /** Logo text in the navbar and footer; `accent` is shown in violet after `name`. */
  brand: {
    name: string;
    accent: string;
  };
  headline: string;
  bio: string;
  photo: {
    src: string;
    alt: string;
  };
  /** Shown as a badge next to the photo, e.g. "7+". */
  yearsOfExperience: string;
  /** Public URL of a file in public/documents, downloaded by the "Download CV" button. */
  cvUrl: string;
  /** Where "View All Projects" points to. */
  allProjectsUrl: string;
}

export interface AboutContent {
  paragraphs: readonly string[];
}

export interface NavLink {
  href: string;
  label: string;
}

export interface SocialLink {
  icon: IconType;
  href: string;
  label: string;
}

export interface Highlight {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Skill {
  name: string;
  icon: IconType;
  /** Brand color of the logo, tuned to stay visible on the dark tiles. */
  color: string;
}

export interface Project {
  title: string;
  description: string;
  image: string;
  tags: readonly string[];
  demoUrl?: string;
  repoUrl?: string;
  /** No "Live demo" button at all, e.g. for this portfolio, whose demo is the page itself. */
  hideDemo?: boolean;
}

export interface Experience {
  period: string;
  role: string;
  company: string;
  description: string;
  technologies: readonly string[];
  /** The current job gets a filled dot on the timeline; past ones a hollow one. */
  current: boolean;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export interface ContactInfo {
  icon: LucideIcon;
  label: string;
  value: string;
  /** What the entry opens (mailto:, tel:); without one it is plain text. */
  href?: string;
}
