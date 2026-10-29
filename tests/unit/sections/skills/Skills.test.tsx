import { render, screen, within } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { skills } from "@/data/skills";
import { Skills } from "@/sections/skills/Skills";

// jsdom has no layout, so the real Swiper cannot move. This stand-in renders
// the slides and records the props, so the tests check how we configure it.
const swiper = vi.hoisted(() => ({
  props: {} as {
    autoplay?: unknown;
    loop?: boolean;
  },
}));

vi.mock("swiper/react", () => ({
  Swiper: ({
    children,
    className,
    ...props
  }: {
    children: ReactNode;
    className?: string;
  }) => {
    swiper.props = props;
    return <ul className={className}>{children}</ul>;
  },
  SwiperSlide: ({
    children,
    "aria-hidden": ariaHidden,
  }: {
    children: ReactNode;
    "aria-hidden"?: boolean;
  }) => <li aria-hidden={ariaHidden}>{children}</li>,
}));

describe("Skills", () => {
  it("renders the skills twice in one row so the loop never runs out of cards", () => {
    render(<Skills />);

    const list = screen.getByRole("list");
    expect(within(list).getAllByRole("listitem", { hidden: true })).toHaveLength(
      skills.length * 2,
    );
    for (const { name } of skills) {
      expect(within(list).getAllByText(name)).toHaveLength(2);
    }
  });

  it("exposes each skill only once to assistive technology", () => {
    render(<Skills />);

    expect(within(screen.getByRole("list")).getAllByRole("listitem")).toHaveLength(
      skills.length,
    );
  });

  it("loops endlessly instead of rewinding at the end", () => {
    render(<Skills />);

    expect(swiper.props.loop).toBe(true);
  });

  it("autoplays continuously, even after the user drags it", () => {
    render(<Skills />);

    expect(swiper.props.autoplay).toMatchObject({
      delay: 0,
      disableOnInteraction: false,
    });
  });
});
