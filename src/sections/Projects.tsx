import React, { type ReactElement } from "react";

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  github: string;
}

const projects: readonly Project[] = [
  {
    title: "Fintech Dashboard",
    description:
      "A comprehensive financial analytics platform with real-time data visualization, portfolio management, and AI-powered insights.",
    image: "/projects/project1.png",
    tags: ["React", "Typescript", "NodeJS"],
    link: "#",
    github: "#",
  },
  {
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce solution with inventory management, payment processing, and analytics dashboard.",
    image: "/projects/project2.png",
    tags: ["Next.js", "Stripe", "PostgreSQL", "Tailwind"],
    link: "#",
    github: "#",
  },
  {
    title: "AI Writing Assistant",
    description:
      "An intelligent writing tool powered by GPT-4, helping users create better content faster.",
    image: "/projects/project3.png",
    tags: ["React", "OpenAI", "Python", "FastAPI"],
    link: "#",
    github: "#",
  },
  {
    title: "Project Management Tool",
    description:
      "A collaborative workspace for teams with real-time updates, task tracking, and integrations.",
    image: "/projects/project4.png",
    tags: ["Next.js", "Socket.io", "MongoDB", "Redis"],
    link: "#",
    github: "#",
  },
];

export const Projects = (): ReactElement => {
  return <section></section>;
};
