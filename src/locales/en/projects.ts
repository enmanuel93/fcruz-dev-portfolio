import { projectAssets } from "@/data/projects";
import type { Project } from "@/types/content";

export const projects = [
  {
    ...projectAssets.portfolio,
    title: "FCruz-Dev Professional Portfolio",
    description:
      "My professional portfolio, built with React and TypeScript, styled with Tailwind CSS and covered by unit tests.",
  },
] as const satisfies readonly Project[];
