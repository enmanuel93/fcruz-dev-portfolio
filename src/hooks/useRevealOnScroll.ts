import { useEffect } from "react";

// Adds `is-visible` to every `.animate-fade-in` element while it is on screen
// and removes it when it leaves, so the entrance animation replays on return.
export const useRevealOnScroll = (): void => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
      });
    });

    const observeElements = (): void => {
      document
        .querySelectorAll(".animate-fade-in")
        .forEach((element) => observer.observe(element));
    };

    observeElements();

    // Elements rendered later (e.g. the mobile menu) must be observed too,
    // otherwise they would stay hidden.
    const mutationObserver = new MutationObserver(observeElements);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return (): void => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, []);
};
