import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";

// The shapes of everything in src/data. Components only depend on these
// types, so the content can change without touching the UI.

export interface Profile {
  name: string;
  /** Short monogram used as the logo in the navbar and footer. */
  initials: string;
  headline: string;
  bio: string;
  photo: {
    src: string;
    alt: string;
  };
  /** Shown as a badge next to the photo, e.g. "+5". */
  yearsOfExperience: string;
  /** Public URL of a file in public/documents, downloaded by the "Download CV" button. */
  cvUrl: string;
  /** Where "View All Projects" points to. */
  allProjectsUrl: string;
}

export interface AboutContent {
  paragraphs: readonly string[];
  mission: string;
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

export interface Project {
  title: string;
  description: string;
  image: string;
  tags: readonly string[];
  demoUrl?: string;
  repoUrl?: string;
}

export interface Experience {
  period: string;
  role: string;
  company: string;
  description: string;
  technologies: readonly string[];
  /** The current job gets a pulsing dot on the timeline. */
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
  href: string;
}
