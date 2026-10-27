import { cvUrls } from "@/data/cv";
import { locales, type Locale } from "@/locales";
import type { SiteContent } from "@/locales/types";
import type { Region } from "@/regions";

// One language's content as a visitor from `region` sees it.
export const resolveContent = (locale: Locale, region: Region): SiteContent => {
  const { profile, experiences, contactInfo, ...rest } = locales[locale];

  return {
    ...rest,
    profile: { ...profile, cvUrl: cvUrls[region][locale] },
    experiences: experiences[region],
    contactInfo: contactInfo[region],
  };
};
