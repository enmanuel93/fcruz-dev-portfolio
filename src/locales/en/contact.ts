import { contactChannels } from "@/data/contact";
import type { ContactInfo } from "@/types/content";

export const contactInfo = [
  { ...contactChannels.email, label: "Email" },
  { ...contactChannels.phone, label: "Phone" },
  { ...contactChannels.location, label: "Location", value: "Milan, Italy" },
] as const satisfies readonly ContactInfo[];
