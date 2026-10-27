import type { Project } from "@/types/content";

// What each project shows and links to, the same in every language; each
// locale adds its title (also the React key, so keep titles unique) and
// description. Add `demoUrl` / `repoUrl` to turn a card's "Live demo" / "Code"
// button into a link; without one, the button is shown disabled.
export const projectAssets = {
  realEstateOffice: {
    image: "/projects/project1.png",
    tags: ["ASP.NET Core", "Microservices", "RabbitMQ", "Redis", "Azure"],
  },
} as const satisfies Record<string, Omit<Project, "title" | "description">>;
