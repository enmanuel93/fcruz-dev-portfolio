import { experienceDetails } from "@/data/experience";
import type { Region } from "@/regions";
import type { Experience } from "@/types/content";

const patientTransport = {
  ...experienceDetails.patientTransport,
  period: "Feb 2026 — Mar 2026",
  role: "Sviluppatore .NET (Freelance)",
  company: "Stati Uniti — Remoto",
  description:
    "Ho sviluppato una piattaforma web per la gestione e il monitoraggio del trasporto pazienti: veicoli, autisti, viaggi, punti di raccolta e destinazioni. Ho adottato un'architettura Monolitica Modulare e integrato API REST.",
} as const satisfies Experience;

// Its period and status depend on the region (see `experiences` below).
const judiciary = {
  role: "Sviluppatore Software / Analista",
  company: "Potere Giudiziario della Repubblica Dominicana",
  description:
    "Ho sviluppato microservizi con ASP.NET Core per l'Ufficio Virtuale del Registro Immobiliare, utilizzato da oltre 10.000 utenti attivi. Ho introdotto RabbitMQ per i pagamenti asincroni, Redis per le prestazioni e pipeline CI/CD su Azure DevOps.",
} as const satisfies Partial<Experience>;

const ecommerce = {
  ...experienceDetails.ecommerce,
  period: "Ago 2020 — Dic 2020",
  role: "Sviluppatore Full Stack (Freelance)",
  company: "Santo Domingo, RD",
  description:
    "Ho sviluppato i moduli catalogo prodotti e carrello acquisti di un sistema e-commerce di accessori elettronici, con frontend in React e API REST in Node.js.",
} as const satisfies Experience;

const seaboard = {
  ...experienceDetails.seaboard,
  period: "Ott 2017 — Mar 2018",
  role: "Sviluppatore Software / Analista",
  company: "SEABOARD",
  description:
    "Ho sviluppato il modulo di controllo presenze di un sistema paghe, integrando lettori biometrici di impronte digitali e generando report in PDF ed Excel.",
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
    { ...experienceDetails.judiciaryOngoing, ...judiciary, period: "Mar 2018 — Presente" },
    ecommerce,
    seaboard,
  ],
} as const satisfies Record<Region, readonly Experience[]>;
