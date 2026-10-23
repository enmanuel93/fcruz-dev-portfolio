import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { testimonials as mockedTestimonials } from "@/data/testimonials";
import { Testimonials } from "@/sections/testimonials/Testimonials";
import type { Testimonial } from "@/types/content";

// Fixed test data, so the carousel stays tested whatever the real content is
// (the section is hidden until there are real testimonials).
vi.mock("@/data/testimonials", () => ({
  testimonials: ["Ada", "Grace", "Linus", "Margaret"].map((name) => ({
    quote: `${name} was great to work with.`,
    author: name,
    role: "Engineer",
    avatar: `/avatars/${name.toLowerCase()}.png`,
  })),
}));

// Typed as a plain array: the real data's literal type no longer matches the mock.
const testimonials = mockedTestimonials as readonly Testimonial[];
const first = testimonials[0]!;
const second = testimonials[1]!;
const last = testimonials[testimonials.length - 1]!;

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

    expectShowing(testimonials[2]!.author);
    expect(thirdDot).toHaveAttribute("aria-current", "true");
    expect(
      screen.getByRole("button", { name: `Show testimonial 1 of ${total}` }),
    ).toHaveAttribute("aria-current", "false");
  });
});
