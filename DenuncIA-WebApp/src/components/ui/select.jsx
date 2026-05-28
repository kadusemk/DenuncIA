import { cn } from "@/lib/utils";

export function Select({ value, onValueChange, children, className }) {
  return (
    <select
      value={value}
      onChange={(event) => onValueChange?.(event.target.value)}
      className={cn("h-10 rounded-lg border border-input bg-white px-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-primary/20", className)}
    >
      {children}
    </select>
  );
}

export function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}
