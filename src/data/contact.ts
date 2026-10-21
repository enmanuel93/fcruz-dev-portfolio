import { Mail, MapPin, Phone } from "lucide-react";
import type { ContactInfo } from "@/types/content";

export const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "emmanuelmejia30@hotmail.com",
    href: "mailto:emmanuelmejia30@hotmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+39 334-792-9602",
    href: "tel:+393347929602",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Milan, Italy",
    href: "#",
  },
] as const satisfies readonly ContactInfo[];
