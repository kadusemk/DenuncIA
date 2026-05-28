import React, { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from "react-leaflet";
import "@/components/complaints/MapFix";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Crosshair, Loader2, MapPin } from "lucide-react";
import { RECIFE_CENTER } from "@/lib/complaintTypes";

function ClickHandler({ onLocationSelect }) {
  useMapEvents({ click: (event) => onLocationSelect({ lat: event.latlng.lat, lng: event.latlng.lng }) });
  return null;
}

function FlyTo({ location }) {
  const map = useMap();
  useEffect(() => {
    if (location) map.flyTo([location.lat, location.lng], 16, { animate: true, duration: 1 });
  }, [location, map]);
  return null;
}

export default function LocationPicker({ location, onLocationChange, address, onAddressChange }) {
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState("");

  const locate = () => {
    if (!navigator.geolocation) return setError("Geolocalizacao nao suportada neste navegador.");
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        onLocationChange({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocating(false);
        setError("");
      },
      () => {
        setError("Nao foi possivel obter sua localizacao. Selecione no mapa.");
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input placeholder="Endereco ou referencia do local" value={address} onChange={(e) => onAddressChange(e.target.value)} />
        <Button type="button" variant="outline" onClick={locate} disabled={locating}>{locating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Crosshair className="h-4 w-4" />}</Button>
      </div>
      {error && <p className="rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">{error}</p>}
      <p className="text-xs text-muted-foreground">Toque no mapa para marcar a localizacao exata do problema</p>
      <div className="h-[260px] overflow-hidden rounded-xl border-2">
        <MapContainer center={[RECIFE_CENTER.lat, RECIFE_CENTER.lng]} zoom={13} className="z-0 h-full w-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <ClickHandler onLocationSelect={onLocationChange} />
          {location && <><Marker position={[location.lat, location.lng]} /><FlyTo location={location} /></>}
        </MapContainer>
      </div>
      {location ? <p className="flex items-center gap-1 text-xs font-medium text-secondary"><MapPin className="h-3 w-3" /> Localizacao marcada: {location.lat.toFixed(5)}, {location.lng.toFixed(5)}</p> : <p className="text-xs text-muted-foreground">Nenhuma localizacao selecionada ainda.</p>}
    </div>
  );
}
