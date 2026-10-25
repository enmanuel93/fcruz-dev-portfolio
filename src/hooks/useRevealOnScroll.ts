import { useEffect } from "react";

export const useRevealOnScroll = (): void => {
  useEffect(() => {
    // Detect when elements enter or leave the viewport.
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // this code show the element when visible.
        entry.target.classList.toggle(
          "is-visible",
          entry.isIntersecting
        );
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

    //clean the component unmount
    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, []);
};