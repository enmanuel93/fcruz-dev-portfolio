import { GitBranch, Users, Workflow, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// One icon per highlight; each locale adds the title and description.
export const highlightIcons = {
  users: Users,
  payments: Workflow,
  caching: Zap,
  releases: GitBranch,
} as const satisfies Record<string, LucideIcon>;
