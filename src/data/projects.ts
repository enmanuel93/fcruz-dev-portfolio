import type { Project } from "@/types/content";

// `title` doubles as the React key, so keep titles unique.
// Replace each "#" with the real demo or repository URL. Removing a field hides
// its button on the card.
export const projects = [
  {
    title: "Virtual Real Estate Registration Office",
    description:
      "Lets citizens handle property and land procedures online, track their requests and pay electronically. Serves over 10,000 active users.",
    image: "/projects/project1.png",
    tags: ["ASP.NET Core", "Microservices", "RabbitMQ", "Redis", "Azure"],
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    title: "Cadastral Parcel Consultation System",
    description:
      "Shows land parcels of the Dominican Republic as polygons built from XML coordinates, plus interactive maps of protected areas.",
    image: "/projects/project2.png",
    tags: ["ASP.NET Core MVC", "Google Maps API", "SQL Server", "Telerik"],
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    title: "Patient Transportation Management",
    description:
      "Web platform for managing and monitoring patient transportation: vehicles, drivers, trips, pickup points and destinations.",
    image: "/projects/project3.png",
    tags: ["ASP.NET Core MVC", "Modular Monolith", "EF Core", "SQL Server"],
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    title: "Electronic Accessories E-Commerce",
    description:
      "Product catalog and shopping cart for an online store of electronic accessories, backed by a TypeScript REST API.",
    image: "/projects/project4.png",
    tags: ["React", "Redux", "Tailwind CSS", "Node.js", "PostgreSQL"],
    demoUrl: "#",
    repoUrl: "#",
  },
] as const satisfies readonly Project[];
