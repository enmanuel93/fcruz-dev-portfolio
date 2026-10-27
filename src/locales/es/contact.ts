import { contactChannels } from "@/data/contact";
import type { ContactInfo } from "@/types/content";

export const contactInfo = [
  { ...contactChannels.email, label: "Correo electrónico" },
  { ...contactChannels.phone, label: "Teléfono" },
  { ...contactChannels.location, label: "Ubicación", value: "Milán, Italia" },
] as const satisfies readonly ContactInfo[];
