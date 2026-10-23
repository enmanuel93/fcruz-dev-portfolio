import { render, screen } from "@testing-library/react";
import { FolderOpen } from "lucide-react";
import { describe, expect, it } from "vitest";
import { SectionHeader } from "@/components/ui/SectionHeader";

describe("SectionHeader", () => {
  it("renders the title as a level-2 heading", () => {
    render(<SectionHeader icon={FolderOpen} title="Featured Projects" />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Featured Projects" }),
    ).toBeInTheDocument();
  });

  it("renders the description only when one is given", () => {
    const { rerender } = render(<SectionHeader icon={FolderOpen} title="Title" />);
    expect(screen.queryByText("Some description")).not.toBeInTheDocument();

    rerender(
      <SectionHeader icon={FolderOpen} title="Title" description="Some description" />,
    );
    expect(screen.getByText("Some description")).toBeInTheDocument();
  });

  it("renders the action next to the title", () => {
    render(
      <SectionHeader
        icon={FolderOpen}
        title="Title"
        action={<a href="https://github.com">View all</a>}
      />,
    );

    expect(screen.getByRole("link", { name: "View all" })).toBeInTheDocument();
  });
});
