// Whether the OS "reduce motion" setting is on. Read once by components that
// drive motion from JS (CSS animations are handled in index.css).
export const prefersReducedMotion = (): boolean =>
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
