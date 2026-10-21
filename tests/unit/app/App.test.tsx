import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App } from "@/app/App";

describe("App", () => {
  it("renders the page landmarks", () => {
    render(<App />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("keeps the footer outside of the main content", () => {
    render(<App />);

    expect(screen.getByRole("main")).not.toContainElement(
      screen.getByRole("contentinfo"),
    );
  });

  // Catches a renamed section id or a typo in data/navigation.ts, which would
  // otherwise leave a link that silently scrolls nowhere.
  it("has a matching section for every in-page link", () => {
    const { container } = render(<App />);

    const anchors = Array.from(
      container.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'),
    )
      .map((link) => link.getAttribute("href")!)
      // "#" alone is the logo's "back to top" link.
      .filter((href) => href !== "#");

    expect(anchors.length).toBeGreaterThan(0);
    new Set(anchors).forEach((href) => {
      expect(container.querySelector(href), `no element for ${href}`).not.toBeNull();
    });
  });
});
