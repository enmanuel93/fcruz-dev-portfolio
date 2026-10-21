import type { FC, ReactElement, ReactNode } from "react";

interface BaseAnimatedBorderButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

// With `href` it renders a link (navigation/download); without it, a native button (actions).
interface AnimatedBorderLinkProps extends BaseAnimatedBorderButtonProps {
  href: string;
  download?: boolean | string;
  target?: "_blank";
  type?: never;
  disabled?: never;
}

interface AnimatedBorderNativeButtonProps extends BaseAnimatedBorderButtonProps {
  href?: undefined;
  download?: never;
  target?: never;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

type AnimatedBorderButtonProps =
  | AnimatedBorderLinkProps
  | AnimatedBorderNativeButtonProps;

const classes =
  "relative inline-flex bg-transparent border border-border text-foreground hover:border-primary/50 transition-all duration-1000 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed group px-8 py-4 text-lg font-medium rounded-full overflow-visible animated-border";

export const AnimatedBorderButton: FC<AnimatedBorderButtonProps> = (
  props: AnimatedBorderButtonProps,
): ReactElement => {
  const { children, onClick } = props;

  const content = (
    <>
      {/* Animated SVG Border */}
      <svg
        className="absolute left-0 top-0 w-full h-full pointer-events-none download-cv-border"
        viewBox="0 0 200 60"
        preserveAspectRatio="none"
        style={{ overflow: "visible" }}
        aria-hidden="true"
      >
        <path
          d="M 30,1 A 29,29 0 0 0 1,30 L 1,30 A 29,29 0 0 0 30,59 L 170,59 A 29,29 0 0 0 199,30 L 199,30 A 29,29 0 0 0 170,1 Z"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="2"
          strokeDasharray="400 550"
          strokeDashoffset="400"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animated-border-path"
        />
      </svg>
      <span className="relative z-10 flex w-full items-center justify-center gap-2">
        {children}
      </span>
    </>
  );

  if (props.href !== undefined) {
    return (
      <a
        href={props.href}
        download={props.download}
        target={props.target}
        rel={props.target === "_blank" ? "noopener noreferrer" : undefined}
        className={classes}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      disabled={props.disabled}
      className={classes}
      onClick={onClick}
    >
      {content}
    </button>
  );
};
