import { highlightIcons } from "@/data/highlights";
import type { Highlight } from "@/types/content";

export const highlights = [
  {
    icon: highlightIcons.users,
    title: "Más de 10.000 usuarios",
    description:
      "La Oficina Virtual de Registro Inmobiliario permite a los ciudadanos hacer trámites de propiedades y pagar en línea.",
  },
  {
    icon: highlightIcons.payments,
    title: "Pagos asíncronos",
    description:
      "Pasé el procesamiento de pagos a RabbitMQ para que una respuesta lenta del banco no bloquee al usuario.",
  },
  {
    icon: highlightIcons.caching,
    title: "Respuestas más rápidas",
    description:
      "Guardé en caché con Redis las consultas frecuentes para quitarle carga a SQL Server.",
  },
  {
    icon: highlightIcons.releases,
    title: "Despliegues automatizados",
    description:
      "Pipelines CI/CD en Azure DevOps que despliegan en Azure App Service.",
  },
] as const satisfies readonly Highlight[];
