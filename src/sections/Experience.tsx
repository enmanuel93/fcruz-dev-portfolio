import React, { type ReactElement } from "react";

interface Experience {
  period: string;
  role: string;
  company: string;
  description: string;
  technologies: string[];
  current: boolean;
}

const experiences: readonly Experience[] = [
  {
    period: "2022 — Present",
    role: "Senior Frontend Engineer",
    company: "Tech Innovators Inc.",
    description:
      "Leading frontend architecture for a suite of fintech products. Implemented micro-frontend architecture, reduced bundle size by 40%, and mentored a team of 5 developers.",
    technologies: ["React", "TypeScript", "Next.js", "GraphQL"],
    current: true,
  },
  {
    period: "2020 — 2022",
    role: "Frontend Engineer",
    company: "Digital Solutions Co.",
    description:
      "Built and maintained multiple React applications for enterprise clients. Introduced automated testing practices that improved code coverage to 85%.",
    technologies: ["React", "Redux", "Jest", "Cypress"],
    current: false,
  },
  {
    period: "2019 — 2020",
    role: "Junior Developer",
    company: "StartUp Labs",
    description:
      "Contributed to the development of a SaaS platform from MVP to production. Collaborated with designers to implement pixel-perfect UI components.",
    technologies: ["React", "Node.js", "MongoDB", "AWS"],
    current: false,
  },
  {
    period: "2018 — 2019",
    role: "Freelance Developer",
    company: "Self-Employed",
    description:
      "Delivered custom web solutions for small businesses and startups. Built 15+ websites and applications, handling everything from design to deployment.",
    technologies: ["JavaScript", "PHP", "WordPress", "MySQL"],
    current: false,
  },
];

export const Experience = (): ReactElement => {
  return <section></section>;
};
