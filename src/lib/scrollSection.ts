
export const scrollToSection = (section: string): void => {
  document.getElementById(section)?.scrollIntoView({
    behavior: "smooth",
  });
};
