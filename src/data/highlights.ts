import { Cloud, Code2, Layers, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// One icon per highlight; each locale adds the title and description.
export const highlightIcons = {
  cleanCode: Code2,
  fullStack: Layers,
  cloud: Cloud,
  teamwork: Users,
} as const satisfies Record<string, LucideIcon>;
