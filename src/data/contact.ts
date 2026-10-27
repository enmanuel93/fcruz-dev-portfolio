import { Mail, MapPin, Phone } from "lucide-react";
import type { ContactInfo } from "@/types/content";

// How to reach me, the same in every language; each locale adds the labels
// (and the location's name). An href of "#" renders as plain text.
export const contactChannels = {
  email: {
    icon: Mail,
    value: "emmanuelmejia30@hotmail.com",
    href: "mailto:emmanuelmejia30@hotmail.com",
  },
  phone: {
    icon: Phone,
    value: "+39 334-792-9602",
    href: "tel:+393347929602",
  },
  location: {
    icon: MapPin,
    href: "#",
  },
} as const satisfies Record<string, Partial<ContactInfo>>;
