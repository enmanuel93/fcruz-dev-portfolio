import { contactChannels } from "@/data/contact";
import type { ContactInfo } from "@/types/content";

export const contactInfo = [
  { ...contactChannels.email, label: "Email" },
  { ...contactChannels.phone, label: "Telefono" },
  { ...contactChannels.location, label: "Posizione", value: "Milano, Italia" },
] as const satisfies readonly ContactInfo[];
