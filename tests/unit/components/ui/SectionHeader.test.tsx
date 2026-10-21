import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SectionHeader } from "@/components/ui/SectionHeader";

describe("SectionHeader", () => {
  it("renders the title and its highlight as a single level-2 heading", () => {
    render(
      <SectionHeader eyebrow="Featured Work" title="Projects that" highlight="make an impact." />,
    );

    expect(
      screen.getByRole("heading", { level: 2, name: "Projects that make an impact." }),
    ).toBeInTheDocument();
    expect(screen.getByText("Featured Work")).toBeInTheDocument();
  });

  it("renders the description only when one is given", () => {
    const { rerender } = render(
      <SectionHeader eyebrow="Eyebrow" title="Title" highlight="accent" />,
    );
    expect(screen.queryByText("Some description")).not.toBeInTheDocument();

    rerender(
      <SectionHeader
        eyebrow="Eyebrow"
        title="Title"
        highlight="accent"
        description="Some description"
      />,
    );
    expect(screen.getByText("Some description")).toBeInTheDocument();
  });

  it("is centered by default and left-aligned on request", () => {
    const { container, rerender } = render(
      <SectionHeader eyebrow="Eyebrow" title="Title" highlight="accent" />,
    );
    expect(container.firstChild).toHaveClass("text-center", "mx-auto");

    rerender(<SectionHeader align="left" eyebrow="Eyebrow" title="Title" highlight="accent" />);
    expect(container.firstChild).not.toHaveClass("text-center");
  });
});
