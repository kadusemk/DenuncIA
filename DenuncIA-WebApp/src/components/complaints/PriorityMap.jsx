import React, { useMemo } from "react";
import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";
import "@/components/complaints/MapFix";
import { RECIFE_CENTER, getCategoryLabel, PRIORITY_CONFIG } from "@/lib/complaintTypes";

const colors = { baixa: "#2563eb", media: "#f59e0b", alta: "#ef4444", critica: "#dc2626" };
const radius = { baixa: 7, media: 10, alta: 14, critica: 18 };

export default function PriorityMap({ complaints, height = "400px" }) {
  const items = useMemo(() => complaints.filter((c) => c.latitude && c.longitude), [complaints]);
  return (
    <div style={{ height }} className="overflow-hidden rounded-xl border">
      <MapContainer center={[RECIFE_CENTER.lat, RECIFE_CENTER.lng]} zoom={12} className="z-0 h-full w-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
        {items.map((c) => (
          <CircleMarker key={c.id} center={[c.latitude, c.longitude]} radius={radius[c.priority] || 10} fillColor={colors[c.priority] || colors.media} color={c.priority === "critica" ? "#7f1d1d" : colors[c.priority]} fillOpacity={0.75} weight={2}>
            <Popup>
              <strong>{c.title}</strong><br />
              <span>{getCategoryLabel(c.category)}</span><br />
              <span style={{ color: colors[c.priority] }}>{PRIORITY_CONFIG[c.priority]?.label}</span>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
