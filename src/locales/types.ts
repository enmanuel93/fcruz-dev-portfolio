import type {
  AboutContent,
  ContactInfo,
  Experience,
  Highlight,
  NavLink,
  Profile,
  Project,
  Testimonial,
} from "@/types/content";

// Everything the site says in one language. Each locale's index.ts must
// satisfy it, so a field missing from a translation fails the build.
export interface LocaleContent {
  profile: Profile;
  about: AboutContent;
  navLinks: readonly NavLink[];
  highlights: readonly Highlight[];
  projects: readonly Project[];
  experiences: readonly Experience[];
  testimonials: readonly Testimonial[];
  contactInfo: readonly ContactInfo[];
}
