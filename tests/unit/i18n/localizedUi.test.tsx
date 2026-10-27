import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactElement, ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { LocaleContext } from "@/i18n/LocaleContext";
import { locales } from "@/locales";
import type { LocaleContent, UiText } from "@/locales/types";
import { About } from "@/sections/about/About";
import { Contact } from "@/sections/contact/Contact";
import { Experience } from "@/sections/experience/Experience";
import { Hero } from "@/sections/hero/Hero";
import { Projects } from "@/sections/projects/Projects";
import { Skills } from "@/sections/skills/Skills";
import { Testimonials } from "@/sections/testimonials/Testimonials";

// Wraps every UI string (and every string a UI function returns) in «», so a
// text that is still hard-coded in a component shows up without the marks.
const mark = (value: unknown): unknown => {
  if (typeof value === "string") return `«${value}»`;
  if (typeof value === "function") {
    return (...args: unknown[]) => `«${(value as (...a: unknown[]) => string)(...args)}»`;
  }
  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>).map(([key, v]) => [key, mark(v)]),
  );
};

const en = locales.en;
const ui = mark(en.ui) as UiText;
const content: LocaleContent = { ...en, ui };

const renderMarked = (node: ReactNode): void => {
  render(node, {
    wrapper: ({ children }): ReactElement => (
      <LocaleContext value={{ locale: "en", content, setLocale: () => {} }}>
        <MemoryRouter>{children}</MemoryRouter>
      </LocaleContext>
    ),
  });
};

const heading = (name: string) => screen.getByRole("heading", { name });

describe("UI text comes from the current locale", () => {
  it("Navbar", async () => {
    renderMarked(<Navbar />);

    expect(screen.getByRole("link", { name: ui.brandLogoLabel("FCruz-Dev") })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: ui.nav.downloadCv })).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: ui.nav.openMenu }));
    expect(screen.getByRole("button", { name: ui.nav.closeMenu })).toBeInTheDocument();
  });

  it("Footer", () => {
    renderMarked(<Footer />);

    expect(screen.getByRole("navigation", { name: ui.footer.navLabel })).toBeInTheDocument();
    expect(screen.getByText(new RegExp(ui.footer.rightsReserved))).toBeInTheDocument();
  });

  it("Hero and portrait", () => {
    renderMarked(<Hero />);

    const title = screen.getByRole("heading", { level: 1 });
    expect(title).toHaveTextContent(ui.hero.titleStart);
    expect(title).toHaveTextContent(ui.hero.titleAccent);
    expect(screen.getByRole("link", { name: ui.hero.viewProjects })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: ui.hero.contactMe })).toBeInTheDocument();
    expect(screen.getByText(ui.portrait.yearsOfExperience)).toBeInTheDocument();
    expect(screen.getByText(ui.portrait.availableForWork)).toBeInTheDocument();
    expect(screen.getByText(ui.portrait.workTypes)).toBeInTheDocument();
  });

  it("About", () => {
    renderMarked(<About />);

    expect(heading(ui.about.title)).toBeInTheDocument();
    expect(screen.getByText(ui.about.description)).toBeInTheDocument();
  });

  it("Projects and project cards", () => {
    renderMarked(<Projects />);
    const [project] = en.projects;

    expect(heading(ui.projects.title)).toBeInTheDocument();
    expect(screen.getByText(ui.projects.description)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: new RegExp(ui.projects.viewAll) })).toBeInTheDocument();

    // The real project has no demo/repo URL, so both buttons are the disabled kind.
    const liveDemo = screen.getByRole("button", { name: new RegExp(ui.projects.liveDemo) });
    expect(liveDemo).toHaveAttribute("title", ui.projects.linkComingSoon);
    expect(screen.getByRole("button", { name: new RegExp(ui.projects.code) })).toBeDisabled();
    expect(ui.projects.liveDemoLabel(project.title)).toContain(project.title);
  });

  it("Experience", () => {
    renderMarked(<Experience />);

    expect(heading(ui.experience.title)).toBeInTheDocument();
    expect(screen.getByText(ui.experience.description)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: new RegExp(ui.experience.viewMoreOnLinkedIn) }),
    ).toBeInTheDocument();
  });

  it("Skills", () => {
    renderMarked(<Skills />);

    expect(heading(ui.skills.title)).toBeInTheDocument();
    expect(screen.getByText(ui.skills.description)).toBeInTheDocument();
  });

  it("Testimonials", () => {
    renderMarked(<Testimonials />);
    const { testimonials } = ui;

    expect(heading(testimonials.title)).toBeInTheDocument();
    expect(screen.getByText(testimonials.description)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: testimonials.previous })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: testimonials.next })).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: testimonials.showTestimonial(1, en.testimonials.length),
      }),
    ).toBeInTheDocument();
  });

  it("Contact and its form", () => {
    renderMarked(<Contact />);
    const { form } = ui.contact;

    const title = screen.getByRole("heading", { level: 2 });
    expect(title).toHaveTextContent(ui.contact.titleStart);
    expect(title).toHaveTextContent(ui.contact.titleAccent);
    expect(screen.getByText(ui.contact.intro)).toBeInTheDocument();
    expect(screen.getByText(ui.contact.availableTitle)).toBeInTheDocument();
    expect(screen.getByText(ui.contact.availableText)).toBeInTheDocument();

    expect(screen.getByLabelText(form.nameLabel)).toHaveAttribute("placeholder", form.namePlaceholder);
    expect(screen.getByLabelText(form.emailLabel)).toHaveAttribute("placeholder", form.emailPlaceholder);
    expect(screen.getByLabelText(form.messageLabel)).toHaveAttribute(
      "placeholder",
      form.messagePlaceholder,
    );
    expect(
      within(screen.getByRole("button", { name: new RegExp(form.send) })).getByText(form.send),
    ).toBeInTheDocument();
  });
});
