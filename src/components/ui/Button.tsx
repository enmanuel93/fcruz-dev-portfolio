import type { FC, ReactElement, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface BaseButtonProps {
  className?: string;
  size?: "sm" | "default" | "lg";
  children: ReactNode;
  onClick?: () => void;
  id?: string;
}

// With `href` it renders a link (navigation); without it, a native button (actions).
interface ButtonAsLinkProps extends BaseButtonProps {
  href: string;
  type?: never;
  disabled?: never;
}

interface ButtonAsButtonProps extends BaseButtonProps {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export type ButtonProps = ButtonAsLinkProps | ButtonAsButtonProps;

const baseClasses =
  "relative inline-flex overflow-hidden rounded-full font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 disabled:opacity-60 disabled:cursor-not-allowed";

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  default: "px-6 py-3 text-base",
  lg: "px-6 py-3 text-lg",
} as const;

export const Button: FC<ButtonProps> = (props: ButtonProps): ReactElement => {
  const { className, size = "default", children, onClick, id } = props;

  const classes = cn(baseClasses, sizeClasses[size], className);

  const content = (
    <span className="relative flex w-full items-center justify-center gap-2">
      {children}
    </span>
  );

  if (props.href !== undefined) {
    return (
      <a href={props.href} id={id} className={classes} onClick={onClick}>
        {content}
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
      {content}
    </button>
  );
};
