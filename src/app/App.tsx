import type { ReactElement } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./HomePage";
// import { Testimonials } from "@/sections/testimonials/Testimonials";

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

  // Every section stays on one page: "/" and "/<section>" render the same page,
  // and HomePage scrolls to the section named in the URL.
  return (
    <div className="min-h-screen overflow-x-hidden">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/:sectionId?" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};
