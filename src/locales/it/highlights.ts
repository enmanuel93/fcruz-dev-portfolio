import { highlightIcons } from "@/data/highlights";
import type { Highlight } from "@/types/content";

export const highlights = [
  {
    icon: highlightIcons.cleanCode,
    title: "Codice pulito",
    description:
      "Design pattern, principi SOLID e Clean Architecture per un codice che resta manutenibile.",
  },
  {
    icon: highlightIcons.fullStack,
    title: "Full Stack",
    description:
      "Dalle API e microservizi in ASP.NET Core alle interfacce in React, end to end.",
  },
  {
    icon: highlightIcons.cloud,
    title: "Cloud e DevOps",
    description:
      "Pipeline CI/CD con Azure DevOps e deployment su Azure App Service.",
  },
  {
    icon: highlightIcons.teamwork,
    title: "Lavoro di squadra Agile",
    description:
      "Abituato ad ambienti dinamici e team Scrum, orientato ai risultati.",
  },
] as const satisfies readonly Highlight[];
