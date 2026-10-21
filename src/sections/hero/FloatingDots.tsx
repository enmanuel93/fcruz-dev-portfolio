import type { ReactElement } from "react";

interface FloatingDot {
  id: number;
  left: string;
  top: string;
  animation: string;
  animationDelay: string;
}

const DOT_COUNT = 30;
const DOT_COLOR = "#20B2A6";

// Generated once at module load so positions stay stable across re-renders.
const floatingDots: readonly FloatingDot[] = Array.from(
  { length: DOT_COUNT },
  (_, id) => ({
    id,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animation: `slow-drift ${15 + Math.random() * 20}s ease-in-out infinite`,
    animationDelay: `${Math.random() * 50}s`,
  }),
);

export const FloatingDots = (): ReactElement => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {floatingDots.map((dot) => (
        <div
          key={dot.id}
          className="absolute w-1.5 h-1.5 rounded-full opacity-60"
          style={{
            backgroundColor: DOT_COLOR,
            left: dot.left,
            top: dot.top,
            animation: dot.animation,
            animationDelay: dot.animationDelay,
          }}
        />
      ))}
    </div>
  );
};
