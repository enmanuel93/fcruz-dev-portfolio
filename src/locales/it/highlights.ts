import { highlightIcons } from "@/data/highlights";
import type { Highlight } from "@/types/content";

export const highlights = [
  {
    icon: highlightIcons.users,
    title: "Oltre 10.000 utenti",
    description:
      "L'Ufficio Virtuale del Registro Immobiliare permette ai cittadini di gestire le pratiche immobiliari e pagare online.",
  },
  {
    icon: highlightIcons.payments,
    title: "Pagamenti asincroni",
    description:
      "Ho spostato l'elaborazione dei pagamenti su RabbitMQ, così una risposta lenta della banca non blocca l'utente.",
  },
  {
    icon: highlightIcons.caching,
    title: "Risposte più rapide",
    description:
      "Ho messo in cache con Redis le query più frequenti per alleggerire SQL Server.",
  },
  {
    icon: highlightIcons.releases,
    title: "Rilasci automatizzati",
    description:
      "Pipeline CI/CD su Azure DevOps con deploy su Azure App Service.",
  },
] as const satisfies readonly Highlight[];
