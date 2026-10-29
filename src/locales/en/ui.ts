import type { UiText } from "../types";

export const ui = {
  brandLogoLabel: (brand) => `${brand}, back to top`,
  nav: {
    openMenu: "Open menu",
    closeMenu: "Close menu",
    downloadCv: "Download CV",
    language: "Language",
  },
  footer: {
    navLabel: "Footer",
    builtBy: (name) => `Built by ${name}.`,
  },
  hero: {
    titleStart: "I build the backends people",
    titleAccent: "rely on every day.",
    viewProjects: "View Projects",
    contactMe: "Contact Me",
  },
  portrait: {
    yearsOfExperience: "Years of experience",
    availableForWork: "Available for work",
    workTypes: "Freelance / Full-time",
  },
  about: {
    title: "About Me",
    description: "Who I am and how I work.",
  },
  projects: {
    title: "Featured Projects",
    description:
      "Production systems I have designed and built, from government platforms to e-commerce.",
    viewAll: "View All Projects",
    liveDemo: "Live demo",
    code: "Code",
    linkComingSoon: "Link coming soon",
    liveDemoLabel: (projectTitle) => `View ${projectTitle} live demo`,
    codeLabel: (projectTitle) => `View ${projectTitle} source code on GitHub`,
  },
  experience: {
    title: "Work Experience",
    description: "Where I have built software, newest first.",
    viewMoreOnLinkedIn: "View more on LinkedIn",
  },
  skills: {
    title: "Skills & Technologies",
    description: "The stack I use day to day, from the database to the browser.",
  },
  testimonials: {
    title: "Testimonials",
    description: "What people I have worked with say.",
    previous: "Previous testimonial",
    next: "Next testimonial",
    showTestimonial: (position, total) => `Show testimonial ${position} of ${total}`,
  },
  contact: {
    titleStart: "Let's",
    titleAccent: "talk.",
    intro:
      "Write me about the project or the role, and I'll answer within a day or two.",
    availableTitle: "Open to work",
    availableText: "Full-time or freelance, remote or on-site.",
    form: {
      nameLabel: "Name",
      namePlaceholder: "Your name...",
      emailLabel: "Email",
      emailPlaceholder: "your@email.com",
      messageLabel: "Message",
      messagePlaceholder: "Your message...",
      send: "Send Message",
      sending: "Sending...",
    },
    validation: {
      nameTooShort: (min) => `Name must be at least ${min} characters.`,
      nameTooLong: (max) => `Name must be at most ${max} characters.`,
      emailRequired: "Please enter your email.",
      emailInvalid: "Please enter a valid email address.",
      messageTooShort: (min) => `Message must be at least ${min} characters.`,
      messageTooLong: (max) => `Message must be at most ${max} characters.`,
    },
    status: {
      success: "Message sent successfully! I'll get back to you soon.",
      failed: "Failed to send message. Please try again later.",
    },
  },
  meta: {
    title: "FCruz-Dev | Francisco Cruz Mejía, .NET Full Stack Developer",
    description:
      "Portfolio of Francisco Cruz Mejía, .NET and Full Stack Developer. Projects, experience and contact.",
  },
} satisfies UiText;
