import { Mail, MapPin, Phone } from "lucide-react";
import type { Region } from "@/regions";
import type { ContactInfo } from "@/types/content";

// How to reach me, the same in every language; each locale adds the labels
// (and the location's name).
export const contactChannels = {
  email: {
    icon: Mail,
    value: "emmanuelmejia30@hotmail.com",
    href: "mailto:emmanuelmejia30@hotmail.com",
  },
  location: {
    icon: MapPin,
  },
} as const satisfies Record<string, Partial<ContactInfo>>;

// The phone of the country each region's profile works from.
export const phones = {
  europe: {
    icon: Phone,
    value: "+39 334-792-9602",
    href: "tel:+393347929602",
  },
  americas: {
    icon: Phone,
    value: "+1 809-302-7954",
    href: "tel:+18093027954",
  },
} as const satisfies Record<Region, Partial<ContactInfo>>;
