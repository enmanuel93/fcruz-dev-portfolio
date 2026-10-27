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
    rightsReserved: "All rights reserved.",
  },
  hero: {
    titleStart: "Crafting digital experiences",
    titleAccent: "with precision.",
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
    titleStart: "Let's build",
    titleAccent: "something great.",
    intro:
      "Have a project in mind? I'd love to hear about it. Send me a message and let's discuss how we can work together.",
    availableTitle: "Currently Available",
    availableText:
      "I'm currently open to new opportunities and exciting projects. Whether you need a full-time engineer or a freelance consultant, let's talk!",
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
