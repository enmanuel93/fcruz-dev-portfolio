import { act, render, screen, waitFor } from "@testing-library/react";
import { useState, type ReactElement } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

// A controllable IntersectionObserver: tests decide when an element "enters"
// or "leaves" the viewport instead of relying on real layout, which jsdom lacks.
let observerCallback: IntersectionObserverCallback;
let observedElements: Set<Element>;
const disconnect = vi.fn();

class IntersectionObserverMock {
  constructor(callback: IntersectionObserverCallback) {
    observerCallback = callback;
  }
  observe(element: Element): void {
    observedElements.add(element);
  }
  unobserve(): void {}
  disconnect = disconnect;
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

const setIntersecting = (target: Element, isIntersecting: boolean): void => {
  act(() => {
    observerCallback(
      [{ target, isIntersecting } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );
  });
};

const Page = (): ReactElement => {
  useRevealOnScroll();
  const [showLate, setShowLate] = useState(false);

  return (
    <>
      <div data-testid="early" className="animate-fade-in" />
      <div data-testid="static" />
      <button type="button" onClick={() => setShowLate(true)}>
        Show more
      </button>
      {showLate && (
        <section>
          <div data-testid="late" className="animate-fade-in" />
        </section>
      )}
    </>
  );
};

describe("useRevealOnScroll", () => {
  beforeEach(() => {
    observedElements = new Set();
    disconnect.mockClear();
    vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);
  });

  it("only observes elements that use the fade-in animation", () => {
    render(<Page />);

    expect(observedElements.has(screen.getByTestId("early"))).toBe(true);
    expect(observedElements.has(screen.getByTestId("static"))).toBe(false);
  });

  it("marks an element visible when it enters the viewport", () => {
    render(<Page />);
    const element = screen.getByTestId("early");

    setIntersecting(element, true);

    expect(element).toHaveClass("is-visible");
  });

  it("resets the element when it leaves, so the animation replays next time", () => {
    render(<Page />);
    const element = screen.getByTestId("early");

    setIntersecting(element, true);
    setIntersecting(element, false);

    expect(element).not.toHaveClass("is-visible");
  });

  it("also observes elements rendered after the page loads", async () => {
    render(<Page />);

    act(() => screen.getByRole("button", { name: "Show more" }).click());

    const late = screen.getByTestId("late");
    // MutationObserver callbacks run asynchronously.
    await waitFor(() => expect(observedElements.has(late)).toBe(true));
  });

  it("stops observing when the component unmounts", () => {
    const { unmount } = render(<Page />);

    unmount();

    expect(disconnect).toHaveBeenCalled();
  });
});
