import { useEffect, useState } from "react";

// A section counts as active while it crosses a band around 40% of the viewport height.
const ACTIVE_ROOT_MARGIN = "-40% 0px -55% 0px";

// Returns the id of the section currently in view, or null above the first one.
export const useActiveSection = (ids: readonly string[]): string | null => {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]): void => {
        entries.forEach(({ target, isIntersecting }) => {
          if (isIntersecting) setActiveId(target.id);
        });
      },
      { rootMargin: ACTIVE_ROOT_MARGIN },
    );

    ids.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return (): void => observer.disconnect();
  }, [ids]);

  return activeId;
};
