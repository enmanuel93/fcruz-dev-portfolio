import type { Locale } from "@/locales";
import type { Region } from "@/regions";

// The file behind "Download CV", by region and language. Files live in
// public/documents/; replacing a PDF needs no code change. The Americas CV
// only exists in English, so every language offers that one.
const AMERICAS_CV = "/documents/cvLatam/en/Francisco_Cruz_Mejia_NET_Developer_CV_Latam_EN.pdf";

export const cvUrls = {
  europe: {
    en: "/documents/cv/en/Francisco_Cruz_Mejia_NET_Developer_CV_EU.pdf",
    es: "/documents/cv/es/Francisco_Cruz_Mejia_NET_Developer_CV_SP.pdf",
    it: "/documents/cv/it/Francisco_Cruz_Mejia_NET_Developer_CV_IT.pdf",
  },
  americas: {
    en: AMERICAS_CV,
    es: AMERICAS_CV,
    it: AMERICAS_CV,
  },
} as const satisfies Record<Region, Record<Locale, string>>;
