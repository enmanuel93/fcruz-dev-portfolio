// Runs on Netlify before the page is served: tells the page (through the
// "region" cookie, read by src/i18n/detectRegion.ts) whether the visitor is in
// the Americas or Europe, from the country Netlify finds for their IP. That is
// why connecting through a VPN changes the profile shown. The country itself
// never leaves Netlify.
import { REGION_COOKIE, regionForCountry } from "../../src/regions/index.ts";

// The part of Netlify's Context this function uses.
interface EdgeContext {
  geo: { country?: { code?: string } };
  next: () => Promise<Response>;
}

export default async (_request: Request, context: EdgeContext): Promise<Response> => {
  const region = regionForCountry(context.geo.country?.code);
  const response = await context.next();
  response.headers.append("Set-Cookie", `${REGION_COOKIE}=${region}; Path=/; SameSite=Lax`);
  return response;
};

// Only the page (any route, since every route serves it), not its files.
export const config = {
  path: "/*",
  excludedPath: ["/assets/*", "/documents/*", "/locales/*", "/projects/*", "/*.svg", "/*.jpg", "/*.png"],
};
