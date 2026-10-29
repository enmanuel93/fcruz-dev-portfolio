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
import type { Region } from "@/regions";

// The interface text the components show around the content: headings,
// buttons, labels. Phrases with a value in them are functions.
export interface UiText {
  /** Accessible name of the logo link, e.g. "FCruz-Dev, back to top". */
  brandLogoLabel: (brand: string) => string;
  nav: {
    openMenu: string;
    closeMenu: string;
    downloadCv: string;
    /** Names the group of language buttons in the mobile menu. */
    language: string;
  };
  footer: {
    navLabel: string;
    /** Credit line after the copyright, e.g. "Built by Francisco Cruz Mejía." */
    builtBy: (name: string) => string;
  };
  hero: {
    /** The h1 is `titleStart` followed by `titleAccent` in violet. */
    titleStart: string;
    titleAccent: string;
    viewProjects: string;
    contactMe: string;
  };
  portrait: {
    yearsOfExperience: string;
    availableForWork: string;
    workTypes: string;
  };
  about: SectionText;
  projects: SectionText & {
    viewAll: string;
    liveDemo: string;
    code: string;
    linkComingSoon: string;
    liveDemoLabel: (projectTitle: string) => string;
    codeLabel: (projectTitle: string) => string;
  };
  experience: SectionText & {
    viewMoreOnLinkedIn: string;
  };
  skills: SectionText;
  testimonials: SectionText & {
    previous: string;
    next: string;
    showTestimonial: (position: number, total: number) => string;
  };
  contact: {
    /** The h2 is `titleStart` followed by `titleAccent` in violet. */
    titleStart: string;
    titleAccent: string;
    intro: string;
    availableTitle: string;
    availableText: string;
    form: {
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      messageLabel: string;
      messagePlaceholder: string;
      send: string;
      sending: string;
    };
    /** One message per error code of contactFormSchema; limits come from the schema. */
    validation: {
      nameTooShort: (min: number) => string;
      nameTooLong: (max: number) => string;
      emailRequired: string;
      emailInvalid: string;
      messageTooShort: (min: number) => string;
      messageTooLong: (max: number) => string;
    };
    status: {
      success: string;
      /** Shown when sending fails and EmailJS gives no reason. */
      failed: string;
    };
  };
  /** The page's <title> and meta description (index.html holds the English ones). */
  meta: {
    title: string;
    description: string;
  };
}

/** A SectionHeader's title and description. */
export interface SectionText {
  title: string;
  description: string;
}

/** A language's profile; the CV comes from data/cv.ts, by region. */
export type LocaleProfile = Omit<Profile, "cvUrl">;

// Everything the site says in one language. Each locale's index.ts must
// satisfy it, so a field missing from a translation fails the build.
export interface LocaleContent {
  ui: UiText;
  profile: LocaleProfile;
  about: AboutContent;
  navLinks: readonly NavLink[];
  highlights: readonly Highlight[];
  projects: readonly Project[];
  /** The jobs each region's profile lists, newest first. */
  experiences: Record<Region, readonly Experience[]>;
  testimonials: readonly Testimonial[];
  /** Phone and location of the country each region's profile works from. */
  contactInfo: Record<Region, readonly ContactInfo[]>;
}

/** What the components read: one language's content, resolved for the visitor's region. */
export interface SiteContent
  extends Omit<LocaleContent, "profile" | "experiences" | "contactInfo"> {
  profile: Profile;
  experiences: readonly Experience[];
  contactInfo: readonly ContactInfo[];
}
