import { highlightIcons } from "@/data/highlights";
import type { Highlight } from "@/types/content";

export const highlights = [
  {
    icon: highlightIcons.cleanCode,
    title: "Código limpio",
    description:
      "Patrones de diseño, principios SOLID y Clean Architecture para un código que se mantiene en el tiempo.",
  },
  {
    icon: highlightIcons.fullStack,
    title: "Full Stack",
    description:
      "De APIs y microservicios con ASP.NET Core a interfaces en React, de principio a fin.",
  },
  {
    icon: highlightIcons.cloud,
    title: "Cloud y DevOps",
    description:
      "Pipelines CI/CD con Azure DevOps y despliegues en Azure App Service.",
  },
  {
    icon: highlightIcons.teamwork,
    title: "Trabajo en equipo ágil",
    description:
      "Habituado a entornos dinámicos y equipos Scrum, enfocado en resultados.",
  },
] as const satisfies readonly Highlight[];
