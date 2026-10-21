import { useEffect } from "react";

const REVEAL_SELECTOR = ".animate-fade-in";
const VISIBLE_CLASS = "is-visible";
// Reveal once the element is 10% of the viewport past the bottom edge. A margin
// (instead of a ratio threshold) also works for elements taller than the viewport.
const REVEAL_ROOT_MARGIN = "0px 0px -10% 0px";

// Plays the `.animate-fade-in` entrance whenever an element enters the viewport,
// and resets it when the element leaves so it animates again on the way back.
export const useRevealOnScroll = (): void => {
  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]): void => {
        entries.forEach(({ target, isIntersecting }) => {
          target.classList.toggle(VISIBLE_CLASS, isIntersecting);
        });
      },
      { rootMargin: REVEAL_ROOT_MARGIN },
    );

    const observe = (root: ParentNode): void => {
      root
        .querySelectorAll<HTMLElement>(REVEAL_SELECTOR)
        .forEach((element) => intersectionObserver.observe(element));
    };

    observe(document);

    // Elements rendered later (e.g. the mobile menu) must be observed too,
    // otherwise they would stay hidden.
    const mutationObserver = new MutationObserver(
      (mutations: MutationRecord[]): void => {
        mutations.forEach(({ addedNodes }) => {
          addedNodes.forEach((node) => {
            if (!(node instanceof HTMLElement)) return;
            if (node.matches(REVEAL_SELECTOR)) intersectionObserver.observe(node);
            observe(node);
          });
        });
      },
    );

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return (): void => {
      mutationObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);
};
