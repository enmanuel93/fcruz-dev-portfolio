import { profileBase } from "@/data/profile";
import type { LocaleProfile } from "../types";
import type { AboutContent } from "@/types/content";

export const profile = {
  ...profileBase,
  headline: "Desarrollador .NET • Desarrollador Full Stack",
  bio: "Hola, soy Francisco Cruz Mejía, Desarrollador Full Stack especializado en el ecosistema .NET y React. Construyo APIs RESTful, microservicios y aplicaciones web preparadas para la nube en Microsoft Azure.",
} as const satisfies LocaleProfile;

export const about = {
  paragraphs: [
    "Soy Desarrollador Full Stack con más de 7 años de experiencia, especializado en el ecosistema .NET y en tecnologías frontend modernas como React. Gran parte de mi carrera la he dedicado a modernizar aplicaciones críticas para los sectores gubernamental y privado.",
    "Diseño APIs RESTful y microservicios con ASP.NET Core, trabajo con SQL Server, Redis y RabbitMQ, y despliego mediante pipelines CI/CD en Microsoft Azure. En el frontend, construyo interfaces responsivas con React, TypeScript y Tailwind CSS.",
    "Soy un profesional orientado a resultados, habituado a entornos dinámicos y equipos Agile (Scrum), y me apoyo en patrones de diseño, principios SOLID y Clean Architecture para que los sistemas sigan siendo mantenibles.",
  ],
  mission:
    "Mi misión es crear software fiable y mantenible que resuelva problemas reales, como una plataforma que permite a más de 10.000 ciudadanos realizar trámites inmobiliarios en línea.",
} as const satisfies AboutContent;
