import { highlightIcons } from "@/data/highlights";
import type { Highlight } from "@/types/content";

export const highlights = [
  {
    icon: highlightIcons.users,
    title: "10,000+ users",
    description:
      "The Virtual Real Estate Registration Office lets citizens handle property procedures and pay online.",
  },
  {
    icon: highlightIcons.payments,
    title: "Async payments",
    description:
      "Moved payment processing to RabbitMQ so a slow bank response doesn't block the user.",
  },
  {
    icon: highlightIcons.caching,
    title: "Faster responses",
    description:
      "Cached frequent queries with Redis to take load off SQL Server.",
  },
  {
    icon: highlightIcons.releases,
    title: "Automated releases",
    description:
      "CI/CD pipelines on Azure DevOps, deploying to Azure App Service.",
  },
] as const satisfies readonly Highlight[];
