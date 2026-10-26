import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useEffect, type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { skills } from "@/data/skills";
import { Skills } from "@/sections/skills/Skills";

// jsdom has no layout, so the real Swiper cannot move. This stand-in renders
// the slides and hands the component a fake instance to drive; the tests check
// the wiring between our controls and Swiper's API.
const swiper = vi.hoisted(() => ({
  instance: { slidePrev: vi.fn(), slideNext: vi.fn(), slideToLoop: vi.fn() },
  props: {} as {
    autoplay?: unknown;
    loop?: boolean;
    onRealIndexChange?: (s: { realIndex: number }) => void;
  },
}));

vi.mock("swiper/react", () => ({
  Swiper: ({
    children,
    onSwiper,
    ...props
  }: {
    children: ReactNode;
    onSwiper: (instance: typeof swiper.instance) => void;
  }) => {
    swiper.props = props;
    useEffect(() => onSwiper(swiper.instance), [onSwiper]);
    return <ul>{children}</ul>;
  },
  SwiperSlide: ({
    children,
    "aria-hidden": ariaHidden,
  }: {
    children: ReactNode;
    "aria-hidden"?: boolean;
  }) => <li aria-hidden={ariaHidden}>{children}</li>,
}));

const dotName = (position: number): string =>
  `Go to slide ${position} of ${skills.length}`;

const expectActiveDot = (position: number): void => {
  expect(screen.getByRole("button", { name: dotName(position) })).toHaveAttribute(
    "aria-current",
    "true",
  );
};

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

  it("autoplays continuously when motion is allowed", () => {
    render(<Skills />);

    expect(swiper.props.autoplay).toMatchObject({ delay: 0 });
  });

  it("does not autoplay when the OS asks for reduced motion", () => {
    vi.spyOn(window, "matchMedia").mockReturnValue({ matches: true } as MediaQueryList);

    render(<Skills />);

    expect(swiper.props.autoplay).toBe(false);
  });

  it("renders one dot per skill with the first one active", () => {
    render(<Skills />);

    expect(screen.getAllByRole("button", { name: /^Go to slide/ })).toHaveLength(
      skills.length,
    );
    expectActiveDot(1);
  });

  it("slides back and forth with the arrow buttons", async () => {
    render(<Skills />);

    await userEvent.click(screen.getByRole("button", { name: "Previous Skills" }));
    await userEvent.click(screen.getByRole("button", { name: "Next Skills" }));

    expect(swiper.instance.slidePrev).toHaveBeenCalledOnce();
    expect(swiper.instance.slideNext).toHaveBeenCalledOnce();
  });

  it("jumps to a skill when its dot is clicked", async () => {
    render(<Skills />);

    await userEvent.click(screen.getByRole("button", { name: dotName(5) }));

    expect(swiper.instance.slideToLoop).toHaveBeenCalledWith(4);
  });

  it("follows the slide Swiper reports as active", () => {
    render(<Skills />);

    act(() => swiper.props.onRealIndexChange?.({ realIndex: 3 }));

    expectActiveDot(4);
  });

  it("maps a card from the second copy to its skill's dot", () => {
    render(<Skills />);

    act(() => swiper.props.onRealIndexChange?.({ realIndex: skills.length + 2 }));

    expectActiveDot(3);
  });
});
