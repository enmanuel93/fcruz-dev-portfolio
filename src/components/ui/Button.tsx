import type { FC, ReactElement, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface BaseButtonProps {
  className?: string;
  size?: "sm" | "default" | "lg";
  /** "primary" is the filled violet action; "outline" is the quieter secondary one. */
  variant?: "primary" | "outline";
  children: ReactNode;
  onClick?: () => void;
  id?: string;
}

// With `href` it renders a link (navigation/download); without it, a native button (actions).
interface ButtonAsLinkProps extends BaseButtonProps {
  href: string;
  download?: boolean | string;
  target?: "_blank";
  type?: never;
  disabled?: never;
}

interface ButtonAsButtonProps extends BaseButtonProps {
  href?: undefined;
  download?: never;
  target?: never;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export type ButtonProps = ButtonAsLinkProps | ButtonAsButtonProps;

const baseClasses =
  "relative inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-200 active:translate-y-px disabled:opacity-60 disabled:cursor-not-allowed disabled:active:translate-y-0";

const variantClasses = {
  primary:
    "bg-primary text-primary-foreground shadow-[0_8px_24px_-10px] shadow-primary/70 hover:bg-primary-hover hover:shadow-primary/90",
  outline:
    "border border-border-strong text-foreground hover:border-accent/60 hover:bg-surface",
} as const;

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  default: "px-6 py-3 text-base",
  lg: "px-6 py-3.5 text-base",
} as const;

export const Button: FC<ButtonProps> = (props: ButtonProps): ReactElement => {
  const { className, size = "default", variant = "primary", children, onClick, id } = props;

  const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className);

  if (props.href !== undefined) {
    return (
      <a
        href={props.href}
        id={id}
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
      id={id}
      className={classes}
      type={props.type ?? "button"}
      disabled={props.disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
