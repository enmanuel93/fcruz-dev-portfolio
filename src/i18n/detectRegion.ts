import { DEFAULT_REGION, isRegion, REGION_COOKIE, type Region } from "@/regions";

// Legacy zone names (e.g. "US/Eastern") are still reported by some systems.
const AMERICAS_TIME_ZONE = /^(America|US|Canada|Brazil|Chile|Mexico)\//;

const readCookie = (name: string): string | undefined =>
  document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${name}=`))
    ?.slice(name.length + 1);

// ?region= in the URL (for testing, or a link meant for one region), else the
// region the Netlify edge function set from the visitor's country, else their
// time zone (no cookie in local development), else the default. No visitor
// choice is stored: the site has no region selector.
export const getInitialRegion = (): Region => {
  const fromUrl = new URLSearchParams(window.location.search).get("region");
  if (isRegion(fromUrl)) return fromUrl;

  const fromCookie = readCookie(REGION_COOKIE);
  if (isRegion(fromCookie)) return fromCookie;

  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  return AMERICAS_TIME_ZONE.test(timeZone) ? "americas" : DEFAULT_REGION;
};
