import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SectionHeader } from "@/components/ui/SectionHeader";

describe("SectionHeader", () => {
  it("renders the title as a level-2 heading", () => {
    render(<SectionHeader title="Featured Projects" />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Featured Projects" }),
    ).toBeInTheDocument();
  });

  it("renders the description only when one is given", () => {
    const { rerender } = render(<SectionHeader title="Title" />);
    expect(screen.queryByText("Some description")).not.toBeInTheDocument();

    rerender(
      <SectionHeader title="Title" description="Some description" />,
    );
    expect(screen.getByText("Some description")).toBeInTheDocument();
  });

  it("renders the action next to the title", () => {
    render(
      <SectionHeader
       
        title="Title"
        action={<a href="https://github.com">View all</a>}
      />,
    );

    expect(screen.getByRole("link", { name: "View all" })).toBeInTheDocument();
  });
});
