import { act, render, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useActiveSection } from "@/hooks/useActiveSection";

// A controllable IntersectionObserver: tests decide which section is in view.
let observerCallback: IntersectionObserverCallback;
const disconnect = vi.fn();

class IntersectionObserverMock {
  constructor(callback: IntersectionObserverCallback) {
    observerCallback = callback;
  }
  observe(): void {}
  unobserve(): void {}
  disconnect = disconnect;
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

const enter = (id: string): void => {
  const target: Element = document.getElementById(id)!;
  const isIntersecting: boolean = true;

  act(() => {
    observerCallback(
      [{ target, isIntersecting } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );
  });
};

const IDS = ["about", "projects"] as const;

const Page = (): ReactElement => {
  const active = useActiveSection(IDS);

  return (
    <>
      <p data-testid="active">{active ?? "none"}</p>
      <section id="about" />
      <section id="projects" />
    </>
  );
};

describe("useActiveSection", () => {
  beforeEach(() => {
    vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);
  });

  it("starts with no active section", () => {
    render(<Page />);

    expect(screen.getByTestId("active")).toHaveTextContent("none");
  });

  it("follows the section that enters view", () => {
    render(<Page />);

    enter("projects");
    expect(screen.getByTestId("active")).toHaveTextContent("projects");

    enter("about");
    expect(screen.getByTestId("active")).toHaveTextContent("about");
  });

  it("stops observing on unmount", () => {
    const { unmount } = render(<Page />);

    unmount();

    expect(disconnect).toHaveBeenCalled();
  });
});
