import { Cloud, Code2, Layers, Users } from "lucide-react";
import type { Highlight } from "@/types/content";

export const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    description:
      "Design patterns, SOLID principles and Clean Architecture for code that stays maintainable.",
  },
  {
    icon: Layers,
    title: "Full Stack",
    description:
      "From ASP.NET Core APIs and microservices to React interfaces, end to end.",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description:
      "CI/CD pipelines with Azure DevOps and deployments on Azure App Service.",
  },
  {
    icon: Users,
    title: "Agile Teamwork",
    description:
      "Used to dynamic environments and Scrum teams, focused on results.",
  },
] as const satisfies readonly Highlight[];
