import { experienceDetails } from "@/data/experience";
import type { Experience } from "@/types/content";

// Newest first: the timeline renders in this order.
export const experiences = [
  {
    ...experienceDetails.patientTransport,
    period: "Feb 2026 — Mar 2026",
    role: ".NET Developer (Freelance)",
    company: "United States — Remote",
    description:
      "Built a web platform for managing and monitoring patient transportation: vehicles, drivers, trips, pickup points and destinations. Implemented a Modular Monolith architecture and integrated REST APIs.",
  },
  {
    ...experienceDetails.judiciary,
    period: "Mar 2018 — Feb 2025",
    role: "Software Developer / Analyst",
    company: "Judiciary of the Dominican Republic",
    description:
      "Developed microservices with ASP.NET Core for the Virtual Real Estate Registration Office, used by over 10,000 active users. Added RabbitMQ for asynchronous payments, Redis for performance, and CI/CD pipelines on Azure DevOps.",
  },
  {
    ...experienceDetails.ecommerce,
    period: "Aug 2020 — Dec 2020",
    role: "Full Stack Developer (Freelance)",
    company: "Santo Domingo, DR",
    description:
      "Built the product catalog and shopping cart modules of an e-commerce system for electronic accessories, with a React frontend and a Node.js REST API.",
  },
  {
    ...experienceDetails.seaboard,
    period: "Oct 2017 — Mar 2018",
    role: "Software Developer / Analyst",
    company: "SEABOARD",
    description:
      "Developed the attendance control module of a payroll system, integrating biometric fingerprint readers and generating PDF and Excel reports.",
  },
] as const satisfies readonly Experience[];
