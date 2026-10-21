// Staggered entrance delay for list items: the first item waits one step, not zero.
export const getAnimationDelay = (index: number, stepMs: number): string =>
  `${(index + 1) * stepMs}ms`;
