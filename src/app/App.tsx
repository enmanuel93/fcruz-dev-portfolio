import { useEffect, type ReactElement } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { About } from "@/sections/about/About";
import { Contact } from "@/sections/contact/Contact";
import { Experience } from "@/sections/experience/Experience";
import { Hero } from "@/sections/hero/Hero";
import { Projects } from "@/sections/projects/Projects";
import { Skills } from "@/sections/skills/Skills";
// import { Testimonials } from "@/sections/testimonials/Testimonials";

// Scrolls to the section named in the URL ("/about" -> #about), or to the top on "/".
// Uses the location key too, so clicking the link of the current URL scrolls again.
const ScrollToSection = (): null => {
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

export const App = (): ReactElement => {
  useRevealOnScroll();

  // return (
  //   <div className="min-h-screen overflow-x-hidden">
  //     <Navbar />
  //     <main>
  //       <Hero />
  //       <About />
  //       <Projects />
  //       <Experience />
  //       <Skills />
  //       {/* <Testimonials /> */}
  //       <Contact />
  //     </main>
  //     <Footer />
  //   </div>
  // );

  // Every section stays on one page; the URL only decides where to scroll.
  return (
    <div className="min-h-screen overflow-x-hidden">
      <BrowserRouter>
        <ScrollToSection />
        <Navbar />
        <main>
          {/* <Route path="/:sectionId?" element={<HomePage />} /> */}
          <Hero />
          <About />
          <Projects />
          <Experience />
          <Skills />
          {/* <Testimonials /> */}
          <Contact />
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
};
