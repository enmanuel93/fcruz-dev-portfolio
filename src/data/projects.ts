import type { Project } from "@/types/content";

// What each project shows and links to, the same in every language; each
// locale adds its title (also the React key, so keep titles unique) and
// description. Add `demoUrl` / `repoUrl` to turn a card's "Live demo" / "Code"
// button into a link; without one, the button is shown disabled.
export const projectAssets = {
  // This site. No demoUrl until it is deployed.
  portfolio: {
    image: "/projects/my-portfolio.png",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite", "Vitest", "Netlify"],
    repoUrl: "https://github.com/enmanuel93/fcruz-dev-portfolio",
  },
} as const satisfies Record<string, Omit<Project, "title" | "description">>;
