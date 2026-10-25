import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import type { ReactElement } from "react";
import { describe, expect, it, vi } from "vitest";
import { HomePage } from "@/app/HomePage";
import { navLinks } from "@/data/navigation";

const LocationProbe = (): ReactElement => <p data-testid="path">{useLocation().pathname}</p>;

const renderAt = (path: string): void => {
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/:sectionId?" element={<HomePage />} />
      </Routes>
      <LocationProbe />
    </MemoryRouter>,
  );
};

describe("HomePage", () => {
  it("renders every section on the root route", () => {
    renderAt("/");

    navLinks.forEach(({ href }) => {
      expect(document.getElementById(href.slice(1)), `no section for ${href}`).not.toBeNull();
    });
  });

  it("scrolls to the section named in the route", () => {
    const scrollIntoView = vi.spyOn(Element.prototype, "scrollIntoView");

    renderAt("/contact");

    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(scrollIntoView).toHaveBeenCalledOnce();
    expect(scrollIntoView.mock.contexts[0]).toBe(document.getElementById("contact"));
  });

  it("scrolls to the top on the root route", () => {
    const scrollTo = vi.spyOn(window, "scrollTo");

    renderAt("/");

    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });

  it("redirects an unknown section to the root route", () => {
    renderAt("/unknown");

    expect(screen.getByTestId("path")).toHaveTextContent(/^\/$/);
    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});
