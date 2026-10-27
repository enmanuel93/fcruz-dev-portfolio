import { contactChannels, phones } from "@/data/contact";
import type { Region } from "@/regions";
import type { ContactInfo } from "@/types/content";

const contactInfoIn = (region: Region, location: string): readonly ContactInfo[] => [
  { ...contactChannels.email, label: "Correo electrónico" },
  { ...phones[region], label: "Teléfono" },
  { ...contactChannels.location, label: "Ubicación", value: location },
];

export const contactInfo = {
  europe: contactInfoIn("europe", "Milán, Italia"),
  americas: contactInfoIn("americas", "Santo Domingo, República Dominicana"),
} as const satisfies Record<Region, readonly ContactInfo[]>;
