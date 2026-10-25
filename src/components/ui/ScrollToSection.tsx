import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Scrolls to the section named in the URL ("/about" -> #about), or to the top on "/".
// Uses the location key too, so clicking the link of the current URL scrolls again.
export const ScrollToSection = (): null => {
  const { pathname, key } = useLocation();

  useEffect(() => {
    const sectionId = pathname.slice(1);

    if (sectionId) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, key]);

  return null;
};