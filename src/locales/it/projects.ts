import { projectAssets } from "@/data/projects";
import type { Project } from "@/types/content";

export const projects = [
  {
    ...projectAssets.realEstateOffice,
    title: "Ufficio Virtuale del Registro Immobiliare",
    description:
      "Consente ai cittadini di gestire online le pratiche per proprietà e terreni, monitorare le proprie richieste ed effettuare pagamenti elettronici. Conta oltre 10.000 utenti attivi.",
  },
] as const satisfies readonly Project[];
