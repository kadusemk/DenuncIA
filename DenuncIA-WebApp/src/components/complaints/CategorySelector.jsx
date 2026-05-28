import React from "react";
import { COMPLAINT_TYPES } from "@/lib/complaintTypes";
import {
  Droplets, TreePine, CircleOff, Trash2, Lightbulb, Waves, CircleDot,
  Footprints, Heart, Package, Bus, Zap, AlertTriangle, Ban, Volume2,
  Car, CircleSlash, Accessibility, ShieldAlert, MoreHorizontal
} from "lucide-react";
import { cn } from "@/lib/utils";

const icons = { Droplets, TreePine, CircleOff, Trash2, Lightbulb, Waves, CircleDot, Footprints, Heart, Package, Bus, Zap, AlertTriangle, Ban, Volume2, Car, CircleSlash, Accessibility, ShieldAlert, MoreHorizontal };

export default function CategorySelector({ selected, onSelect }) {
  return (
    <div className="grid grid-cols-4 gap-4 sm:grid-cols-5">
      {COMPLAINT_TYPES.map((type) => {
        const Icon = icons[type.icon];
        const isSelected = selected === type.value;
        return (
          <button
            key={type.value}
            type="button"
            onClick={() => onSelect(type.value)}
            className={cn("flex min-h-20 flex-col items-center justify-center gap-2 rounded-xl border-2 p-3 transition hover:scale-[1.03]", isSelected ? "border-primary bg-primary/10 shadow" : "border-transparent hover:border-border hover:bg-muted")}
          >
            {Icon && <Icon className="h-6 w-6" style={{ color: isSelected ? "#0D2F6E" : type.color }} />}
            <span className={cn("text-center text-[11px] font-medium leading-tight", isSelected ? "text-primary" : "text-muted-foreground")}>{type.label}</span>
          </button>
        );
      })}
    </div>
  );
}
