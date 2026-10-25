import { type ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { About } from "@/sections/about/About";
import { Contact } from "@/sections/contact/Contact";
import { Experience } from "@/sections/experience/Experience";
import { Hero } from "@/sections/hero/Hero";
import { Projects } from "@/sections/projects/Projects";
import { Skills } from "@/sections/skills/Skills";
import { ScrollToSection } from "@/components/ui/ScrollToSection";
// import { Testimonials } from "@/sections/testimonials/Testimonials";

export const App = (): ReactElement => {
  useRevealOnScroll();

  // Every section stays on one page; the URL only decides where to scroll.
  return (
    <div className="min-h-screen overflow-x-hidden">
      <BrowserRouter>
        <ScrollToSection />
        <Navbar />
        <main>
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
