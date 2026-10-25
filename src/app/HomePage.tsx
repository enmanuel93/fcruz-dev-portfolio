import { useEffect, type ReactElement } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { navLinks } from "@/data/navigation";
import { scrollToSection } from "@/lib/scrollSection";
import { About } from "@/sections/about/About";
import { Contact } from "@/sections/contact/Contact";
import { Experience } from "@/sections/experience/Experience";
import { Hero } from "@/sections/hero/Hero";
import { Projects } from "@/sections/projects/Projects";
import { Skills } from "@/sections/skills/Skills";
// import { Testimonials } from "@/sections/testimonials/Testimonials";

const SECTION_IDS: readonly string[] = navLinks.map(({ href }) => href.slice(1));

export const HomePage = (): ReactElement => {
  const { sectionId } = useParams();
  const { key } = useLocation();
  const isKnownSection = sectionId === undefined || SECTION_IDS.includes(sectionId);

  // Depends on the location key too, so clicking the link of the current route
  // scrolls back to its section after the user has scrolled away.
  useEffect(() => {
    if (!isKnownSection) return;

    if (sectionId) {
      scrollToSection(sectionId);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [sectionId, isKnownSection, key]);

  if (!isKnownSection) return <Navigate to="/" replace />;

  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Skills />
      {/* <Testimonials /> */}
      <Contact />
    </main>
  );
};
