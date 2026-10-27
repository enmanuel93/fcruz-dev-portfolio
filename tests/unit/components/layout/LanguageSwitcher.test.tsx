import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactElement } from "react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import { Navbar } from "@/components/layout/Navbar";
import { LOCALE_STORAGE_KEY } from "@/i18n/detectLocale";
import { LocaleProvider } from "@/i18n/LocaleProvider";

// jsdom's browser language is English, so the page starts in English.
const renderNavbar = (): void => {
  render(<Navbar />, {
    wrapper: ({ children }): ReactElement => (
      <LocaleProvider>
        <MemoryRouter>{children}</MemoryRouter>
      </LocaleProvider>
    ),
  });
};

const languageButton = () => screen.getByRole("button", { name: /^Language: / });
const option = (name: string) => screen.getByRole("menuitemradio", { name });
// The button's flag is decorative (alt=""), so it has no role to query by.
const flagOf = (element: HTMLElement) => element.querySelector("img")?.getAttribute("src");

describe("LanguageSwitcher", () => {
  afterEach(() => {
    localStorage.clear();
    document.documentElement.lang = "";
  });

  it("shows the current language and lists every language when opened", async () => {
    renderNavbar();

    expect(languageButton()).toHaveAccessibleName("Language: English");
    expect(flagOf(languageButton())).toBe("/locales/en.png");
    expect(languageButton()).toHaveAttribute("aria-expanded", "false");

    await userEvent.click(languageButton());

    expect(languageButton()).toHaveAttribute("aria-expanded", "true");
    expect(screen.getAllByRole("menuitemradio")).toHaveLength(3);
    expect(option("English")).toHaveAttribute("aria-checked", "true");
    expect(option("Español")).toHaveAttribute("aria-checked", "false");
    // Each name is in its own language, so screen readers pronounce it right.
    expect(option("Español")).toHaveAttribute("lang", "es");
    expect(option("Italiano")).toHaveAttribute("lang", "it");
  });

  it("switches the whole page to the chosen language and remembers it", async () => {
    renderNavbar();

    await userEvent.click(languageButton());
    await userEvent.click(option("Español"));

    expect(screen.getByRole("link", { name: /Descargar CV/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Sobre mí" })).toBeInTheDocument();
    expect(flagOf(screen.getByRole("button", { name: "Idioma: Español" }))).toBe(
      "/locales/es.png",
    );
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(document.documentElement.lang).toBe("es");
    expect(localStorage.getItem(LOCALE_STORAGE_KEY)).toBe("es");
  });

  it("closes with Escape and returns focus to the button", async () => {
    renderNavbar();

    await userEvent.click(languageButton());
    await userEvent.keyboard("{Escape}");

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(languageButton()).toHaveFocus();
  });

  it("closes when clicking anywhere else", async () => {
    renderNavbar();

    await userEvent.click(languageButton());
    await userEvent.click(document.body);

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("focuses the current language on open and moves with the arrow keys", async () => {
    renderNavbar();

    await userEvent.click(languageButton());
    expect(option("English")).toHaveFocus();

    await userEvent.keyboard("{ArrowDown}");
    expect(option("Español")).toHaveFocus();

    await userEvent.keyboard("{ArrowUp}{ArrowUp}");
    expect(option("Italiano")).toHaveFocus();
  });

  it("offers the languages as buttons in the mobile menu", async () => {
    renderNavbar();

    await userEvent.click(screen.getByRole("button", { name: "Open menu" }));
    const group = within(document.getElementById("mobile-menu")!).getByRole("group", {
      name: "Language",
    });

    expect(within(group).getByRole("button", { name: "English" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    // Each button shows its own language's flag.
    expect(within(group).getByRole("img", { name: "Italiano" })).toHaveAttribute(
      "src",
      "/locales/it.png",
    );

    await userEvent.click(within(group).getByRole("button", { name: "Italiano" }));

    expect(within(group).getByRole("button", { name: "Italiano" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getAllByRole("link", { name: /Scarica CV/ }).length).toBeGreaterThan(0);
    expect(document.getElementById("mobile-menu")).toBeInTheDocument();
  });
});
