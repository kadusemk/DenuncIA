import React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn("flex min-h-[90px] w-full rounded-lg border border-input bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-primary/20", className)}
    {...props}
  />
));
Textarea.displayName = "Textarea";
