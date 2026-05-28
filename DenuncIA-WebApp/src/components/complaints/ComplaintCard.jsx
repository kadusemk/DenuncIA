import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getCategoryLabel, PRIORITY_CONFIG, STATUS_CONFIG } from "@/lib/complaintTypes";

export default function ComplaintCard({ complaint, onClick }) {
  const priority = PRIORITY_CONFIG[complaint.priority] || PRIORITY_CONFIG.media;
  const status = STATUS_CONFIG[complaint.status] || STATUS_CONFIG.pendente;

  return (
    <Card className="cursor-pointer overflow-hidden transition hover:-translate-y-1 hover:shadow-md" onClick={() => onClick?.(complaint)}>
      {complaint.photo_url && <img src={complaint.photo_url} alt={complaint.title} className="h-36 w-full object-cover" />}
      <CardContent className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 font-heading text-sm font-bold">{complaint.title}</h3>
          <Badge variant="outline" className={`${priority.color} shrink-0 text-[10px]`}>{priority.label}</Badge>
        </div>
        <Badge variant="secondary" className="text-[10px]">{getCategoryLabel(complaint.category)}</Badge>
        {complaint.address && (
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3 shrink-0" /><span className="line-clamp-1">{complaint.address}</span>
          </p>
        )}
        <div className="flex items-center justify-between pt-1">
          <Badge variant="outline" className={`${status.color} text-[10px]`}>{status.label}</Badge>
          {complaint.created_date && (
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Clock className="h-3 w-3" /> {format(new Date(complaint.created_date), "dd MMM", { locale: ptBR })}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
