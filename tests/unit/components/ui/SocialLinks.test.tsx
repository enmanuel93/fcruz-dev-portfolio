import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { socialLinks } from "@/data/socials";

describe("SocialLinks", () => {
  it("renders an accessible link for every social profile", () => {
    render(<SocialLinks links={socialLinks} />);

    socialLinks.forEach(({ label, href }) => {
      expect(screen.getByRole("link", { name: label })).toHaveAttribute("href", href);
    });
  });

  it("applies the extra class to every link", () => {
    render(<SocialLinks links={socialLinks} linkClassName="duration-300" />);

    screen.getAllByRole("link").forEach((link) => {
      expect(link).toHaveClass("duration-300");
    });
  });
});
