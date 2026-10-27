import { contactChannels, phones } from "@/data/contact";
import type { Region } from "@/regions";
import type { ContactInfo } from "@/types/content";

const contactInfoIn = (region: Region, location: string): readonly ContactInfo[] => [
  { ...contactChannels.email, label: "Email" },
  { ...phones[region], label: "Telefono" },
  { ...contactChannels.location, label: "Posizione", value: location },
];

export const contactInfo = {
  europe: contactInfoIn("europe", "Milano, Italia"),
  americas: contactInfoIn("americas", "Santo Domingo, Repubblica Dominicana"),
} as const satisfies Record<Region, readonly ContactInfo[]>;
