import type { FC, ReactElement, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface BaseAnimatedBorderButtonProps {
  children: ReactNode;
  className?: string;
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

export type AnimatedBorderButtonProps =
  | AnimatedBorderLinkProps
  | AnimatedBorderNativeButtonProps;

// `.animated-border` (index.css) runs a violet light around the border on hover.
const baseClasses =
  "animated-border inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

export const AnimatedBorderButton: FC<AnimatedBorderButtonProps> = (
  props: AnimatedBorderButtonProps,
): ReactElement => {
  const { children, className, onClick } = props;
  const classes = cn(baseClasses, className);

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
        {children}
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
      {children}
    </button>
  );
};
