import { highlightIcons } from "@/data/highlights";
import type { Highlight } from "@/types/content";

export const highlights = [
  {
    icon: highlightIcons.cleanCode,
    title: "Clean Code",
    description:
      "Design patterns, SOLID principles and Clean Architecture for code that stays maintainable.",
  },
  {
    icon: highlightIcons.fullStack,
    title: "Full Stack",
    description:
      "From ASP.NET Core APIs and microservices to React interfaces, end to end.",
  },
  {
    icon: highlightIcons.cloud,
    title: "Cloud & DevOps",
    description:
      "CI/CD pipelines with Azure DevOps and deployments on Azure App Service.",
  },
  {
    icon: highlightIcons.teamwork,
    title: "Agile Teamwork",
    description:
      "Used to dynamic environments and Scrum teams, focused on results.",
  },
] as const satisfies readonly Highlight[];
