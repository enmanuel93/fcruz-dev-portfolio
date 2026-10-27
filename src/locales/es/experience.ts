import { experienceDetails } from "@/data/experience";
import type { Region } from "@/regions";
import type { Experience } from "@/types/content";

const patientTransport = {
  ...experienceDetails.patientTransport,
  period: "Feb 2026 — Mar 2026",
  role: "Desarrollador .NET (Freelance)",
  company: "Estados Unidos — Remoto",
  description:
    "Desarrollé una plataforma web para la gestión y el monitoreo del transporte de pacientes: vehículos, conductores, viajes, puntos de recogida y destinos. Implementé una arquitectura de Monolito Modular e integré APIs REST.",
} as const satisfies Experience;

// Its period and status depend on the region (see `experiences` below).
const judiciary = {
  role: "Desarrollador de Software / Analista",
  company: "Poder Judicial de la República Dominicana",
  description:
    "Desarrollé microservicios con ASP.NET Core para la Oficina Virtual de Registro Inmobiliario, utilizada por más de 10.000 usuarios activos. Incorporé RabbitMQ para pagos asíncronos, Redis para el rendimiento y pipelines CI/CD en Azure DevOps.",
} as const satisfies Partial<Experience>;

const ecommerce = {
  ...experienceDetails.ecommerce,
  period: "Ago 2020 — Dic 2020",
  role: "Desarrollador Full Stack (Freelance)",
  company: "Santo Domingo, RD",
  description:
    "Desarrollé los módulos de catálogo de productos y carrito de compras de un sistema de ventas de accesorios electrónicos, con un frontend en React y una API REST en Node.js.",
} as const satisfies Experience;

const seaboard = {
  ...experienceDetails.seaboard,
  period: "Oct 2017 — Mar 2018",
  role: "Desarrollador de Software / Analista",
  company: "SEABOARD",
  description:
    "Desarrollé el módulo de control de asistencia de un sistema de nómina, integrando lectores biométricos de huellas y generando reportes en PDF y Excel.",
} as const satisfies Experience;

// Newest first: the timeline renders in this order. The Americas list follows
// the Latin American CV: no 2026 freelance job, the judiciary job still ongoing.
export const experiences = {
  europe: [
    patientTransport,
    { ...experienceDetails.judiciary, ...judiciary, period: "Mar 2018 — Feb 2025" },
    ecommerce,
    seaboard,
  ],
  americas: [
    { ...experienceDetails.judiciaryOngoing, ...judiciary, period: "Mar 2018 — Actualidad" },
    ecommerce,
    seaboard,
  ],
} as const satisfies Record<Region, readonly Experience[]>;
