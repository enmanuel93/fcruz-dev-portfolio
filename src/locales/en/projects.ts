import { projectAssets } from "@/data/projects";
import type { Project } from "@/types/content";

export const projects = [
  {
    ...projectAssets.realEstateOffice,
    title: "Virtual Real Estate Registration Office",
    description:
      "Lets citizens handle property and land procedures online, track their requests and pay electronically. Serves over 10,000 active users.",
  },
] as const satisfies readonly Project[];
