import type { Project } from "@/types/content";

// What each project shows and links to, the same in every language; each
// locale adds its title (also the React key, so keep titles unique) and
// description. Add `demoUrl` / `repoUrl` to turn a card's "Live demo" / "Code"
// button into a link; without one, the button is shown disabled. `hideDemo`
// leaves the "Live demo" button out entirely.
export const projectAssets = {
  // This site: a "Live demo" link would only reload the page you are on.
  portfolio: {
    image: "/projects/my-portfolio.webp",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite", "Vitest", "Netlify"],
    repoUrl: "https://github.com/enmanuel93/fcruz-dev-portfolio",
    hideDemo: true,
  },
} as const satisfies Record<string, Omit<Project, "title" | "description">>;
