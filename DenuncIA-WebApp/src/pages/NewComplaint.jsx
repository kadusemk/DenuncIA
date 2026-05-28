import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectItem } from "@/components/ui/select";
import CategorySelector from "@/components/complaints/CategorySelector";
import PhotoUpload from "@/components/complaints/PhotoUpload";
import LocationPicker from "@/components/complaints/LocationPicker";
import { RECIFE_NEIGHBORHOODS } from "@/lib/complaintTypes";
import { analyzePriority, complaintStore } from "@/lib/localApi";
import { useAuth } from "@/lib/AuthContext";

export default function NewComplaint() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [analyzing, setAnalyzing] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", category: "", photo_url: "", latitude: null, longitude: null, address: "", neighborhood: "" });
  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const mutation = useMutation({
    mutationFn: async () => {
      setAnalyzing(true);
      await new Promise((resolve) => setTimeout(resolve, 650));
      const ai = analyzePriority(form);
      setAnalyzing(false);
      return complaintStore.create({ ...form, status: "pendente", priority: ai.priority, ai_analysis: ai.analysis }, user);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success("Denuncia enviada com sucesso!");
      navigate("/minhas-denuncias");
    }
  });

  const submit = (event) => {
    event.preventDefault();
    if (!form.category) return toast.error("Selecione o tipo da denuncia");
    if (!form.title) return toast.error("Informe o titulo");
    if (!form.latitude || !form.longitude) return toast.error("Selecione a localizacao no mapa");
    mutation.mutate();
  };

  return (
    <div className="mx-auto max-w-2xl">
      <Button variant="ghost" className="mb-4" onClick={() => navigate(-1)}><ArrowLeft className="h-4 w-4" /> Voltar</Button>
      <form onSubmit={submit}>
        {step === 1 && <Card><CardHeader><CardTitle>Qual o tipo do problema?</CardTitle></CardHeader><CardContent className="space-y-4"><CategorySelector selected={form.category} onSelect={(v) => update("category", v)} /><Button type="button" className="w-full" disabled={!form.category} onClick={() => setStep(2)}>Continuar</Button></CardContent></Card>}
        {step === 2 && <Card><CardHeader><CardTitle>Detalhes da Denuncia</CardTitle></CardHeader><CardContent className="space-y-4"><Input placeholder="Titulo da denuncia" value={form.title} onChange={(e) => update("title", e.target.value)} /><Textarea placeholder="Descreva o problema com detalhes..." value={form.description} onChange={(e) => update("description", e.target.value)} /><PhotoUpload photoUrl={form.photo_url} onPhotoChange={(v) => update("photo_url", v)} /><div className="flex gap-2"><Button type="button" variant="outline" onClick={() => setStep(1)}>Voltar</Button><Button type="button" className="flex-1" disabled={!form.title} onClick={() => setStep(3)}>Continuar</Button></div></CardContent></Card>}
        {step === 3 && <Card><CardHeader><CardTitle>Localizacao</CardTitle></CardHeader><CardContent className="space-y-4"><Select value={form.neighborhood} onValueChange={(v) => update("neighborhood", v)} className="w-full"><option value="">Selecione o bairro</option>{RECIFE_NEIGHBORHOODS.map((n) => <SelectItem key={n} value={n}>{n}</SelectItem>)}</Select><LocationPicker location={form.latitude ? { lat: form.latitude, lng: form.longitude } : null} onLocationChange={(loc) => { update("latitude", loc.lat); update("longitude", loc.lng); }} address={form.address} onAddressChange={(v) => update("address", v)} /><div className="flex gap-2"><Button type="button" variant="outline" onClick={() => setStep(2)}>Voltar</Button><Button type="submit" className="flex-1" disabled={mutation.isPending || !form.latitude}>{mutation.isPending ? <><Loader2 className="h-4 w-4 animate-spin" /> {analyzing ? "IA analisando..." : "Enviando..."}</> : <><Send className="h-4 w-4" /> Enviar Denuncia</>}</Button></div></CardContent></Card>}
      </form>
    </div>
  );
}
