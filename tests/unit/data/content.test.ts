import { describe, expect, it } from "vitest";
import { experiences } from "@/data/experience";
import { highlights } from "@/data/highlights";
import { navLinks } from "@/data/navigation";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { testimonials } from "@/data/testimonials";

// The components use these fields as React keys. A duplicate would not crash,
// but React would mix up the items when the list changes, so catch it here.
const expectUnique = (values: readonly string[]): void => {
  expect(new Set(values).size).toBe(values.length);
};

describe("content data", () => {
  it("has unique project titles", () => {
    expectUnique(projects.map(({ title }) => title));
  });

  it("has a unique company and period for each experience", () => {
    expectUnique(experiences.map(({ company, period }) => `${company}-${period}`));
  });

  it("has unique testimonial authors", () => {
    expectUnique(testimonials.map(({ author }) => author));
  });

  it("has unique highlight titles", () => {
    expectUnique(highlights.map(({ title }) => title));
  });

  it("has unique skill names", () => {
    expectUnique(skills.map(({ name }) => name));
  });

  it("has unique tags within each project", () => {
    projects.forEach(({ tags }) => expectUnique(tags));
  });

  it("only uses single-segment section routes for navigation", () => {
    navLinks.forEach(({ href }) => {
      expect(href).toMatch(/^\/[a-z]+$/);
    });
  });
});
