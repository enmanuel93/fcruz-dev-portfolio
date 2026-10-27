import { describe, expect, it } from "vitest";
import region from "../../../netlify/edge-functions/region";

// What Netlify passes the function: the visitor's country and the rest of the
// chain, which serves the page.
const contextFrom = (countryCode?: string) => ({
  geo: { country: countryCode ? { code: countryCode } : undefined },
  next: (): Promise<Response> =>
    Promise.resolve(new Response("<!doctype html>", { status: 200 })),
});

const request = new Request("https://example.com/");

describe("region edge function", () => {
  it("tells the page a visitor from the Dominican Republic is in the Americas", async () => {
    const response = await region(request, contextFrom("DO"));

    expect(response.headers.getSetCookie()).toEqual(["region=americas; Path=/; SameSite=Lax"]);
  });

  it("tells the page a visitor from Italy is in Europe", async () => {
    const response = await region(request, contextFrom("IT"));

    expect(response.headers.getSetCookie()).toEqual(["region=europe; Path=/; SameSite=Lax"]);
  });

  it("falls back to Europe when Netlify doesn't know the country", async () => {
    const response = await region(request, contextFrom(undefined));

    expect(response.headers.getSetCookie()).toEqual(["region=europe; Path=/; SameSite=Lax"]);
  });

  it("serves the page itself unchanged", async () => {
    const response = await region(request, contextFrom("DO"));

    expect(response.status).toBe(200);
    expect(await response.text()).toBe("<!doctype html>");
  });
});
