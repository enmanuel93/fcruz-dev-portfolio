import type { Experience } from "@/types/content";

// The stack and status of each job, the same in every language; each locale
// adds the period, role, company and description, newest first.
export const experienceDetails = {
  patientTransport: {
    technologies: ["ASP.NET Core MVC", "Entity Framework Core", "SQL Server", "Bootstrap"],
    current: false,
  },
  judiciary: {
    technologies: ["ASP.NET Core", "Microservices", "Azure", "RabbitMQ", "Redis"],
    current: false,
  },
  ecommerce: {
    technologies: ["React", "Redux", "Node.js", "PostgreSQL", "Jest"],
    current: false,
  },
  seaboard: {
    technologies: ["ASP.NET MVC", "Entity Framework", "SQL Server", "Crystal Reports"],
    current: false,
  },
} as const satisfies Record<string, Pick<Experience, "technologies" | "current">>;
