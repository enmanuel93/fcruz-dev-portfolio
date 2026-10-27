import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { cvUrls } from "@/data/cv";
import { skills } from "@/data/skills";
import { resolveContent } from "@/i18n/resolveContent";
import { DEFAULT_LOCALE, LOCALES, locales } from "@/locales";
import { REGIONS } from "@/regions";

// The components use these fields as React keys. A duplicate would not crash,
// but React would mix up the items when the list changes, so catch it here.
const expectUnique = (values: readonly string[]): void => {
  expect(new Set(values).size).toBe(values.length);
};

// Every language as a visitor from every region sees it.
const versions = LOCALES.flatMap((locale) =>
  REGIONS.map((region) => [`${locale} (${region})`, locale, region] as const),
);

describe("shared content data", () => {
  it("has unique skill names", () => {
    expectUnique(skills.map(({ name }) => name));
  });

  it.each(Object.entries(cvUrls))("links every language to a CV that exists in public/ (%s)", (_, urls) => {
    Object.values(urls).forEach((url) => {
      expect(existsSync(join("public", url))).toBe(true);
    });
  });

  // index.html is what loads before React (and what crawlers without JS see).
  it("matches index.html's title, description and lang to the default language", () => {
    const html = readFileSync("index.html", "utf8");
    const { meta } = locales[DEFAULT_LOCALE].ui;

    expect(html).toContain(`<html lang="${DEFAULT_LOCALE}">`);
    expect(html).toContain(`<title>${meta.title}</title>`);
    expect(html.replace(/\s+/g, " ")).toContain(`content="${meta.description}"`);
  });
});

describe.each(versions)("%s content", (_, locale, region) => {
  const content = resolveContent(locale, region);
  const reference = resolveContent(DEFAULT_LOCALE, region);

  it("has unique project titles", () => {
    expectUnique(content.projects.map(({ title }) => title));
  });

  it("has a unique company and period for each experience", () => {
    expectUnique(
      content.experiences.map(({ company, period }) => `${company}-${period}`),
    );
  });

  it("has unique testimonial authors", () => {
    expectUnique(content.testimonials.map(({ author }) => author));
  });

  it("has unique highlight titles", () => {
    expectUnique(content.highlights.map(({ title }) => title));
  });

  it("has unique contact labels", () => {
    expectUnique(content.contactInfo.map(({ label }) => label));
  });

  it("has unique tags within each project", () => {
    content.projects.forEach(({ tags }) => expectUnique(tags));
  });

  it("only uses single-segment section routes for navigation", () => {
    content.navLinks.forEach(({ href }) => {
      expect(href).toMatch(/^\/[a-z]+$/);
    });
  });

  // TypeScript checks every field exists; this checks no language drops or adds an item.
  it("lists the same items as the default language in the same region", () => {
    expect(content.navLinks.map(({ href }) => href)).toEqual(
      reference.navLinks.map(({ href }) => href),
    );
    expect(content.projects.map(({ image }) => image)).toEqual(
      reference.projects.map(({ image }) => image),
    );
    expect(content.experiences).toHaveLength(reference.experiences.length);
    expect(content.highlights.map(({ icon }) => icon)).toEqual(
      reference.highlights.map(({ icon }) => icon),
    );
    expect(content.contactInfo.map(({ href }) => href)).toEqual(
      reference.contactInfo.map(({ href }) => href),
    );
  });
});
