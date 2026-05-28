import React from "react";
import { cn } from "@/lib/utils";

const variants = {
  default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
  destructive: "bg-destructive text-destructive-foreground shadow hover:bg-destructive/90",
  outline: "border border-input bg-white shadow-sm hover:bg-muted",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
  ghost: "hover:bg-muted hover:text-primary"
};

const sizes = {
  default: "h-10 px-4 py-2",
  sm: "h-8 px-3 text-xs",
  lg: "h-11 px-8",
  icon: "h-9 w-9"
};

export const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition disabled:pointer-events-none disabled:opacity-50",
      variants[variant],
      sizes[size],
      className
    )}
    {...props}
  />
));
Button.displayName = "Button";
