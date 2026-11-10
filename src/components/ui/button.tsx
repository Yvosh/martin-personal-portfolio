import * as React from "react";
import { Button as ButtonPrimitive } from "@base-ui/react/button";

import { cn } from "@/lib/cn";

const BUTTON_BASE =
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-btn font-btn tracking-btn whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4";

type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";
type ButtonSize =
  | "default"
  | "xs"
  | "sm"
  | "lg"
  | "icon"
  | "icon-xs"
  | "icon-sm"
  | "icon-lg";

const BUTTON_VARIANT: Record<ButtonVariant, string> = {
  default: "bg-button text-button-foreground hover:bg-btn-hover",
  destructive:
    "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
  outline:
    "border bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-btn-hover-secondary",
  ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
  link: "text-primary underline-offset-4 hover:underline",
};

const BUTTON_SIZE: Record<ButtonSize, string> = {
  default: "h-btn-h px-btn-px py-2 text-btn has-[>svg]:px-btn-px-sm",
  xs: "h-btn-h-xs gap-1 px-btn-px-xs text-btn-xs has-[>svg]:px-[calc(var(--btn-px)-0.625rem)] [&_svg:not([class*='size-'])]:size-3",
  sm: "h-btn-h-sm gap-1.5 px-btn-px-sm text-btn has-[>svg]:px-[calc(var(--btn-px)-0.375rem)]",
  lg: "h-btn-h-lg px-btn-px-lg text-btn has-[>svg]:px-btn-px",
  icon: "size-btn-h text-btn",
  "icon-xs": "size-btn-h-xs text-btn-xs [&_svg:not([class*='size-'])]:size-3",
  "icon-sm": "size-btn-h-sm text-btn",
  "icon-lg": "size-btn-h-lg text-btn",
};

function buttonVariants({
  variant = "default",
  size = "default",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(BUTTON_BASE, BUTTON_VARIANT[variant], BUTTON_SIZE[size], className);
}

const Button = React.forwardRef<
  HTMLButtonElement,
  Omit<ButtonPrimitive.Props, "className" | "ref"> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
  }
>(function Button({ className, variant = "default", size = "default", ...props }, ref) {
  return (
    <ButtonPrimitive
      ref={ref}
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  );
});

export { Button, buttonVariants };
export type { ButtonVariant, ButtonSize };