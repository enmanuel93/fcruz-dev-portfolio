import { projectAssets } from "@/data/projects";
import type { Project } from "@/types/content";

export const projects = [
  {
    ...projectAssets.realEstateOffice,
    title: "Oficina Virtual de Registro Inmobiliario",
    description:
      "Permite a los ciudadanos gestionar en línea trámites de propiedades y terrenos, dar seguimiento a sus solicitudes y pagar electrónicamente. Cuenta con más de 10.000 usuarios activos.",
  },
] as const satisfies readonly Project[];
