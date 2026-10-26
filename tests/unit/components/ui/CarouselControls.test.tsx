import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CarouselControls } from "@/components/ui/CarouselControls";

const renderControls = (activeIndex = 0) => {
  const handlers = {
    onPrevious: vi.fn(),
    onNext: vi.fn(),
    onSelect: vi.fn(),
  };
  render(
    <CarouselControls
      label="Skills"
      count={4}
      activeIndex={activeIndex}
      {...handlers}
    />,
  );
  return handlers;
};

describe("CarouselControls", () => {
  it("calls onPrevious and onNext from the arrow buttons", async () => {
    const { onPrevious, onNext } = renderControls();

    await userEvent.click(screen.getByRole("button", { name: "Previous Skills" }));
    await userEvent.click(screen.getByRole("button", { name: "Next Skills" }));

    expect(onPrevious).toHaveBeenCalledOnce();
    expect(onNext).toHaveBeenCalledOnce();
  });

  it("renders one dot per slide and marks the active one", () => {
    renderControls(2);

    const dots = screen.getAllByRole("button", { name: /^Go to slide/ });
    expect(dots).toHaveLength(4);
    expect(dots[2]).toHaveAttribute("aria-current", "true");
    expect(dots[0]).toHaveAttribute("aria-current", "false");
  });

  it("selects a slide by its index when a dot is clicked", async () => {
    const { onSelect } = renderControls();

    await userEvent.click(screen.getByRole("button", { name: "Go to slide 3 of 4" }));

    expect(onSelect).toHaveBeenCalledWith(2);
  });
});
