import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { testimonials } from "@/data/testimonials";
import { Testimonials } from "@/sections/testimonials/Testimonials";

const first = testimonials[0];
const second = testimonials[1];
const last = testimonials[testimonials.length - 1];

const expectShowing = (author: string): void => {
  expect(screen.getByRole("img", { name: author })).toBeInTheDocument();
};

describe("Testimonials", () => {
  it("shows the first testimonial initially", () => {
    render(<Testimonials />);

    expectShowing(first.author);
    expect(screen.getByText(`"${first.quote}"`)).toBeInTheDocument();
  });

  it("moves forward with the next button", async () => {
    render(<Testimonials />);

    await userEvent.click(screen.getByRole("button", { name: "Next testimonial" }));

    expectShowing(second.author);
  });

  it("wraps around to the last testimonial when going back from the first", async () => {
    render(<Testimonials />);

    await userEvent.click(screen.getByRole("button", { name: "Previous testimonial" }));

    expectShowing(last.author);
  });

  it("wraps around to the first testimonial when going past the last", async () => {
    render(<Testimonials />);
    const nextButton = screen.getByRole("button", { name: "Next testimonial" });

    for (let i = 0; i < testimonials.length; i++) {
      await userEvent.click(nextButton);
    }

    expectShowing(first.author);
  });

  it("jumps to a testimonial from its dot and marks that dot as current", async () => {
    render(<Testimonials />);
    const total = testimonials.length;

    const thirdDot = screen.getByRole("button", { name: `Show testimonial 3 of ${total}` });
    await userEvent.click(thirdDot);

    expectShowing(testimonials[2].author);
    expect(thirdDot).toHaveAttribute("aria-current", "true");
    expect(
      screen.getByRole("button", { name: `Show testimonial 1 of ${total}` }),
    ).toHaveAttribute("aria-current", "false");
  });
});
