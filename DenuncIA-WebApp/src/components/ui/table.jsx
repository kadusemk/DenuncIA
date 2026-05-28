import React from "react";
import { cn } from "@/lib/utils";

export const Table = React.forwardRef(({ className, ...props }, ref) => <table ref={ref} className={cn("w-full text-sm", className)} {...props} />);
export const TableHeader = React.forwardRef((props, ref) => <thead ref={ref} {...props} />);
export const TableBody = React.forwardRef((props, ref) => <tbody ref={ref} {...props} />);
export const TableRow = React.forwardRef(({ className, ...props }, ref) => <tr ref={ref} className={cn("border-b transition hover:bg-muted/50", className)} {...props} />);
export const TableHead = React.forwardRef(({ className, ...props }, ref) => <th ref={ref} className={cn("h-11 px-3 text-left font-medium text-muted-foreground", className)} {...props} />);
export const TableCell = React.forwardRef(({ className, ...props }, ref) => <td ref={ref} className={cn("px-3 py-3 align-middle", className)} {...props} />);
