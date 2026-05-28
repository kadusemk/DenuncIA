import React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn("flex h-10 w-full rounded-lg border border-input bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-primary/20", className)}
    {...props}
  />
));
Input.displayName = "Input";
