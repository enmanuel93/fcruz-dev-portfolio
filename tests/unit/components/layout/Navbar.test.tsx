import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactElement } from "react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import { Navbar } from "@/components/layout/Navbar";
import { cvUrls } from "@/data/cv";
import { CONTACT_HREF } from "@/data/navigation";
import { DEFAULT_LOCALE, locales } from "@/locales";
import { DEFAULT_REGION } from "@/regions";

const { navLinks } = locales[DEFAULT_LOCALE];

const renderNavbar = (): void => {
  render(<Navbar />, {
    wrapper: ({ children }): ReactElement => <MemoryRouter>{children}</MemoryRouter>,
  });
};

const openMenuButton = () => screen.getByRole("button", { name: "Open menu" });

const setScrollY = (value: number): void => {
  Object.defineProperty(window, "scrollY", { value, configurable: true });
};

describe("Navbar", () => {
  afterEach(() => {
    setScrollY(0);
  });

  it("starts with the mobile menu closed", () => {
    renderNavbar();

    expect(openMenuButton()).toHaveAttribute("aria-expanded", "false");
    expect(document.getElementById("mobile-menu")).not.toBeInTheDocument();
  });

  it("opens and closes the mobile menu from the toggle button", async () => {
    renderNavbar();

    await userEvent.click(openMenuButton());
    const closeButton = screen.getByRole("button", { name: "Close menu" });
    expect(closeButton).toHaveAttribute("aria-expanded", "true");
    expect(document.getElementById("mobile-menu")).toBeInTheDocument();

    await userEvent.click(closeButton);
    expect(document.getElementById("mobile-menu")).not.toBeInTheDocument();
  });

  it("closes the mobile menu after choosing a section", async () => {
    renderNavbar();
    await userEvent.click(openMenuButton());

    const mobileMenu = within(document.getElementById("mobile-menu")!);
    await userEvent.click(mobileMenu.getByRole("link", { name: navLinks[1].label }));

    expect(document.getElementById("mobile-menu")).not.toBeInTheDocument();
  });

  it("closes the mobile menu after choosing Download CV", async () => {
    renderNavbar();
    await userEvent.click(openMenuButton());

    const mobileMenu = within(document.getElementById("mobile-menu")!);
    await userEvent.click(mobileMenu.getByRole("link", { name: "Download CV" }));

    expect(document.getElementById("mobile-menu")).not.toBeInTheDocument();
  });

  it("makes every Download CV button download the CV", async () => {
    renderNavbar();
    await userEvent.click(openMenuButton());

    const cvLinks = screen.getAllByRole("link", { name: "Download CV" });
    expect(cvLinks).toHaveLength(2);
    cvLinks.forEach((link) => {
      expect(link).toHaveAttribute("href", cvUrls[DEFAULT_REGION][DEFAULT_LOCALE]);
      expect(link).toHaveAttribute("download");
    });
  });

  it("links to the contact section", () => {
    renderNavbar();

    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      CONTACT_HREF,
    );
  });

  it("switches to the solid style once the page is scrolled", () => {
    renderNavbar();
    const header = screen.getByRole("banner");
    expect(header).toHaveClass("bg-transparent");

    setScrollY(200);
    fireEvent.scroll(window);

    expect(header).toHaveClass("glass-strong");
    expect(header).not.toHaveClass("bg-transparent");
  });
});
