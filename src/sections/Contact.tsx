import { Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import React from "react";

interface ContactInfo {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
}

const contactInfo: readonly ContactInfo[] = [
  {
    icon: Mail,
    label: "Email",
    value: "pedro@example.com",
    href: "mailto:pedro@example.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "San Francisco, CA",
    href: "#",
  },
];

export const Contact = () => {
  return <section></section>;
};
