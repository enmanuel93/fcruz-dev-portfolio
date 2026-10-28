import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { App } from "@/app/App";

// The whole page, as a visitor from each region sees it. ?region= picks the
// region so the result doesn't depend on the machine's time zone. `language`
// is what the visitor picked on an earlier visit.
const renderAppIn = (region: "europe" | "americas", language = "en"): void => {
  localStorage.setItem("locale", language);
  window.history.replaceState(null, "", `/?region=${region}`);
  render(<App />);
};

const cvLinks = (): HTMLElement[] =>
  screen.getAllByRole("link", { name: /Download CV|Descargar CV|Scarica CV/ });

// The desktop menu button has no accessible name (its flag is decorative).
const languageMenuButton = (): HTMLElement | null =>
  document.querySelector<HTMLElement>('button[aria-haspopup="menu"]');

describe("content by region", () => {
  afterEach(() => {
    localStorage.clear();
    window.history.replaceState(null, "", "/");
  });

  it("offers the European CV of the current language in Europe", () => {
    renderAppIn("europe", "it");

    cvLinks().forEach((link) => {
      expect(link).toHaveAttribute(
        "href",
        "/documents/cv/it/Francisco_Cruz_Mejia_NET_Developer_CV_IT.pdf",
      );
    });
  });

  it("offers the Latin American CV in the Americas", () => {
    renderAppIn("americas");

    cvLinks().forEach((link) => {
      expect(link).toHaveAttribute(
        "href",
        "/documents/cvLatam/en/Francisco_Cruz_Mejia_NET_Developer_CV_Latam_EN.pdf",
      );
    });
  });

  it("shows the Italian phone and Milan in Europe", () => {
    renderAppIn("europe");

    expect(screen.getByRole("link", { name: /\+39 334-792-9602/ })).toHaveAttribute(
      "href",
      "tel:+393347929602",
    );
    expect(screen.getByText("Milan, Italy")).toBeInTheDocument();
  });

  it("shows the Dominican phone and Santo Domingo in the Americas", () => {
    renderAppIn("americas");

    expect(screen.getByRole("link", { name: /\+1 809-302-7954/ })).toHaveAttribute(
      "href",
      "tel:+18093027954",
    );
    expect(screen.getByText("Santo Domingo, Dominican Republic")).toBeInTheDocument();
    expect(screen.queryByText(/\+39/)).not.toBeInTheDocument();
  });

  it("lists the 2026 freelance job and the judiciary job as finished in Europe", () => {
    renderAppIn("europe");

    expect(screen.getByText("United States — Remote")).toBeInTheDocument();
    expect(screen.getByText("Mar 2018 — Feb 2025")).toBeInTheDocument();
  });

  it("leaves out the 2026 freelance job and shows the judiciary job as current in the Americas", () => {
    renderAppIn("americas");

    expect(screen.queryByText("United States — Remote")).not.toBeInTheDocument();
    expect(screen.getByText("Mar 2018 — Present")).toBeInTheDocument();
  });
});

describe("languages by region", () => {
  afterEach(() => {
    localStorage.clear();
    window.history.replaceState(null, "", "/");
  });

  // The most common case down there: a Spanish browser, no earlier visit.
  it("shows the Americas in English even to a Spanish browser", () => {
    vi.spyOn(navigator, "languages", "get").mockReturnValue(["es-DO", "es"]);
    window.history.replaceState(null, "", "/?region=americas");

    render(<App />);

    expect(document.documentElement.lang).toBe("en");
    expect(cvLinks()[0]).toHaveTextContent("Download CV");
  });

  it("skips a language picked earlier in Europe, but remembers it for next time", () => {
    renderAppIn("americas", "it");

    expect(document.documentElement.lang).toBe("en");
    expect(localStorage.getItem("locale")).toBe("it");
  });

  it("has no language switcher in the Americas, on desktop or in the mobile menu", async () => {
    renderAppIn("americas");
    await userEvent.click(screen.getByRole("button", { name: "Open menu" }));

    expect(languageMenuButton()).not.toBeInTheDocument();
    expect(screen.queryByRole("group", { name: "Language" })).not.toBeInTheDocument();
  });

  it("still offers all three languages in Europe", async () => {
    renderAppIn("europe");
    await userEvent.click(languageMenuButton()!);

    expect(screen.getAllByRole("menuitemradio")).toHaveLength(3);
  });
});
