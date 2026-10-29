import type { FC, ReactElement, ReactNode } from "react";
import { Link } from "react-router-dom";
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

// With `to` it renders a client-side route link; with `href`, a plain link (external/download);
// without either, a native button (actions).
interface ButtonAsRouteLinkProps extends BaseButtonProps {
  to: string;
  href?: never;
  download?: never;
  target?: never;
  type?: never;
  disabled?: never;
}

interface ButtonAsLinkProps extends BaseButtonProps {
  to?: never;
  href: string;
  download?: boolean | string;
  target?: "_blank";
  type?: never;
  disabled?: never;
}

interface ButtonAsButtonProps extends BaseButtonProps {
  to?: undefined;
  href?: undefined;
  download?: never;
  target?: never;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export type ButtonProps = ButtonAsRouteLinkProps | ButtonAsLinkProps | ButtonAsButtonProps;

const baseClasses =
  "relative inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-[background-color,border-color,color,transform] duration-200 active:translate-y-px disabled:opacity-60 disabled:cursor-not-allowed disabled:active:translate-y-0";

const variantClasses = {
  primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
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

  if (props.to !== undefined) {
    return (
      <Link to={props.to} id={id} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

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
