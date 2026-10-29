import { projectAssets } from "@/data/projects";
import type { Project } from "@/types/content";

export const projects = [
  {
    ...projectAssets.portfolio,
    title: "FCruz-Dev Professional Portfolio",
    description:
      "Mi portafolio profesional, disponible en inglés, español e italiano. Desarrollado con React y TypeScript, con estilos en Tailwind CSS y cubierto por pruebas unitarias.",
  },
] as const satisfies readonly Project[];
