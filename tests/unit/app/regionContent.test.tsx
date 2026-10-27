import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { App } from "@/app/App";

// The whole page, as a visitor from each region sees it. ?region= picks the
// region so the result doesn't depend on the machine's time zone.
const renderAppIn = (region: "europe" | "americas", language = "en"): void => {
  localStorage.setItem("locale", language);
  window.history.replaceState(null, "", `/?region=${region}`);
  render(<App />);
};

const cvLinks = (): HTMLElement[] =>
  screen.getAllByRole("link", { name: /Download CV|Descargar CV|Scarica CV/ });

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

  it.each(["en", "es", "it"])(
    "offers the Latin American CV (in English) in the Americas, also in %s",
    (language) => {
      renderAppIn("americas", language);

      cvLinks().forEach((link) => {
        expect(link).toHaveAttribute(
          "href",
          "/documents/cvLatam/en/Francisco_Cruz_Mejia_NET_Developer_CV_Latam_EN.pdf",
        );
      });
    },
  );

  it("shows the Italian phone and Milan in Europe", () => {
    renderAppIn("europe");

    expect(screen.getByRole("link", { name: /\+39 334-792-9602/ })).toHaveAttribute(
      "href",
      "tel:+393347929602",
    );
    expect(screen.getByText("Milan, Italy")).toBeInTheDocument();
  });

  it("shows the Dominican phone and Santo Domingo in the Americas", () => {
    renderAppIn("americas", "es");

    expect(screen.getByRole("link", { name: /\+1 809-302-7954/ })).toHaveAttribute(
      "href",
      "tel:+18093027954",
    );
    expect(screen.getByText("Santo Domingo, República Dominicana")).toBeInTheDocument();
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

  it("says the judiciary job is current in the visitor's language", () => {
    renderAppIn("americas", "es");

    expect(screen.getByText("Mar 2018 — Actualidad")).toBeInTheDocument();
  });
});
