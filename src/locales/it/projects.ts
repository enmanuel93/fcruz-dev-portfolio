import { projectAssets } from "@/data/projects";
import type { Project } from "@/types/content";

export const projects = [
  {
    ...projectAssets.portfolio,
    title: "FCruz-Dev Professional Portfolio",
    description:
      "Il mio portfolio professionale, sviluppato con React e TypeScript, con stili in Tailwind CSS e coperto da test unitari.",
  },
] as const satisfies readonly Project[];
