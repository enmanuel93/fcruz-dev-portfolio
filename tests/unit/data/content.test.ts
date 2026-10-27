import { describe, expect, it } from "vitest";
import { skills } from "@/data/skills";
import { DEFAULT_LOCALE, locales } from "@/locales";

// The components use these fields as React keys. A duplicate would not crash,
// but React would mix up the items when the list changes, so catch it here.
const expectUnique = (values: readonly string[]): void => {
  expect(new Set(values).size).toBe(values.length);
};

const reference = locales[DEFAULT_LOCALE];

describe("shared content data", () => {
  it("has unique skill names", () => {
    expectUnique(skills.map(({ name }) => name));
  });
});

describe.each(Object.entries(locales))("%s content", (_, content) => {
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
  it("lists the same items as the default language", () => {
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
