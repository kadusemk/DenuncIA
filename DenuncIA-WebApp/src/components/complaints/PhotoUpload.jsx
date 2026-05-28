import React, { useRef, useState } from "react";
import { Camera, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PhotoUpload({ photoUrl, onPhotoChange }) {
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setLoading(true);
    const reader = new FileReader();
    reader.onload = () => {
      onPhotoChange(reader.result);
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  if (photoUrl) {
    return (
      <div className="relative overflow-hidden rounded-xl border">
        <img src={photoUrl} alt="Foto da denuncia" className="h-48 w-full object-cover" />
        <Button type="button" size="icon" variant="destructive" className="absolute right-2 top-2 h-8 w-8" onClick={() => onPhotoChange("")}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex h-48 w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed text-muted-foreground transition hover:border-primary hover:text-primary"
      >
        {loading ? <Loader2 className="h-8 w-8 animate-spin" /> : <><Camera className="h-8 w-8" /><span className="text-sm font-medium">Toque para adicionar foto</span></>}
      </button>
      <input ref={inputRef} type="file" accept="image/*" capture="environment" onChange={handleFile} className="hidden" />
    </div>
  );
}
