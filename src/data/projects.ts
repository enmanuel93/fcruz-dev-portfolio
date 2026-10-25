import type { Project } from "@/types/content";

// `title` doubles as the React key, so keep titles unique.
// Add `demoUrl` / `repoUrl` to turn a card's "Live demo" / "Code" button into a
// link; without one, the button is shown disabled.
export const projects = [
  {
    title: "Virtual Real Estate Registration Office",
    description:
      "Lets citizens handle property and land procedures online, track their requests and pay electronically. Serves over 10,000 active users.",
    image: "/projects/project1.png",
    tags: ["ASP.NET Core", "Microservices", "RabbitMQ", "Redis", "Azure"],
  },
] as const satisfies readonly Project[];
