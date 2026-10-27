import { contactChannels, phones } from "@/data/contact";
import type { Region } from "@/regions";
import type { ContactInfo } from "@/types/content";

const contactInfoIn = (region: Region, location: string): readonly ContactInfo[] => [
  { ...contactChannels.email, label: "Email" },
  { ...phones[region], label: "Phone" },
  { ...contactChannels.location, label: "Location", value: location },
];

export const contactInfo = {
  europe: contactInfoIn("europe", "Milan, Italy"),
  americas: contactInfoIn("americas", "Santo Domingo, Dominican Republic"),
} as const satisfies Record<Region, readonly ContactInfo[]>;
