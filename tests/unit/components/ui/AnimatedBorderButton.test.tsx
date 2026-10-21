import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { AnimatedBorderButton } from "@/components/ui/AnimatedBorderButton";

describe("AnimatedBorderButton", () => {
  it("renders a download link for files", () => {
    render(
      <AnimatedBorderButton href="/cv.pdf" download>
        Download CV
      </AnimatedBorderButton>,
    );

    const link = screen.getByRole("link", { name: "Download CV" });
    expect(link).toHaveAttribute("href", "/cv.pdf");
    expect(link).toHaveAttribute("download");
  });

  it("protects the opener when a link opens in a new tab", () => {
    render(
      <AnimatedBorderButton href="https://github.com/" target="_blank">
        View All Projects
      </AnimatedBorderButton>,
    );

    const link = screen.getByRole("link", { name: "View All Projects" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("does not add rel to links that open in the same tab", () => {
    render(<AnimatedBorderButton href="#projects">Projects</AnimatedBorderButton>);

    expect(screen.getByRole("link", { name: "Projects" })).not.toHaveAttribute("rel");
  });

  it("renders a button that runs onClick when there is no href", async () => {
    const handleClick = vi.fn();
    render(<AnimatedBorderButton onClick={handleClick}>Action</AnimatedBorderButton>);

    const button = screen.getByRole("button", { name: "Action" });
    await userEvent.click(button);

    expect(button).toHaveAttribute("type", "button");
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
