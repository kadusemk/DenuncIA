import { cn } from "@/lib/utils";

export function Tabs({ value, onValueChange, children }) {
  return <div data-value={value} onClick={(event) => event.target.dataset.tab && onValueChange?.(event.target.dataset.tab)}>{children}</div>;
}

export function TabsList({ className, ...props }) {
  return <div className={cn("inline-flex h-9 items-center rounded-lg bg-muted p-1", className)} {...props} />;
}

export function TabsTrigger({ value, className, ...props }) {
  return <button data-tab={value} className={cn("rounded-md px-3 py-1 text-sm font-medium transition hover:bg-white", className)} {...props} />;
}
