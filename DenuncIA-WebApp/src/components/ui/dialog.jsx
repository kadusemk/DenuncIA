import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Dialog({ open, onOpenChange, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" onMouseDown={() => onOpenChange?.(false)}>
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl" onMouseDown={(event) => event.stopPropagation()}>
        {children}
        <Button variant="ghost" size="icon" className="absolute right-5 top-5" onClick={() => onOpenChange?.(false)}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export function DialogHeader({ children }) {
  return <div className="mb-4 pr-8">{children}</div>;
}

export function DialogTitle({ className = "", children }) {
  return <h2 className={`font-heading text-xl font-bold ${className}`}>{children}</h2>;
}
