import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Eye, Loader2, MapPin, Search } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { COMPLAINT_TYPES, PRIORITY_CONFIG, RECIFE_NEIGHBORHOODS, STATUS_CONFIG, getCategoryLabel } from "@/lib/complaintTypes";
import { complaintStore } from "@/lib/localApi";

export default function AdminComplaints() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("all");
  const [neighborhood, setNeighborhood] = useState("all");
  const [selected, setSelected] = useState(null);
  const { data: complaints = [], isLoading } = useQuery({ queryKey: ["complaints"], queryFn: () => complaintStore.list() });
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => complaintStore.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success("Denuncia atualizada!");
    }
  });
  const filtered = complaints.filter((c) => {
    const term = search.toLowerCase();
    if (term && !`${c.title} ${c.description}`.toLowerCase().includes(term)) return false;
    if (category !== "all" && c.category !== category) return false;
    if (status !== "all" && c.status !== status) return false;
    if (priority !== "all" && c.priority !== priority) return false;
    if (neighborhood !== "all" && c.neighborhood !== neighborhood) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <h1 className="font-heading text-2xl font-bold">Todas as Denuncias</h1>
      <div className="flex flex-wrap gap-2">
        <div className="relative min-w-[220px] flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input placeholder="Buscar..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" /></div>
        <Select value={category} onValueChange={setCategory}><SelectItem value="all">Todos os tipos</SelectItem>{COMPLAINT_TYPES.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}</Select>
        <Select value={status} onValueChange={setStatus}><SelectItem value="all">Todos status</SelectItem>{Object.entries(STATUS_CONFIG).map(([k, v]) => <SelectItem key={k} value={k}>{v.label}</SelectItem>)}</Select>
        <Select value={priority} onValueChange={setPriority}><SelectItem value="all">Todas</SelectItem>{Object.entries(PRIORITY_CONFIG).map(([k, v]) => <SelectItem key={k} value={k}>{v.label}</SelectItem>)}</Select>
        <Select value={neighborhood} onValueChange={setNeighborhood}><SelectItem value="all">Todos bairros</SelectItem>{RECIFE_NEIGHBORHOODS.map((n) => <SelectItem key={n} value={n}>{n}</SelectItem>)}</Select>
      </div>
      <p className="text-sm text-muted-foreground">{filtered.length} denuncia(s) encontrada(s)</p>
      {isLoading ? <div className="grid place-items-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div> : (
        <Card className="overflow-x-auto">
          <Table><TableHeader><TableRow><TableHead>Titulo</TableHead><TableHead>Tipo</TableHead><TableHead>Bairro</TableHead><TableHead>Prioridade</TableHead><TableHead>Status</TableHead><TableHead>Data</TableHead><TableHead /></TableRow></TableHeader><TableBody>
            {filtered.map((c) => <TableRow key={c.id} className="cursor-pointer" onClick={() => setSelected(c)}><TableCell className="max-w-[240px] truncate font-medium">{c.title}</TableCell><TableCell>{getCategoryLabel(c.category)}</TableCell><TableCell>{c.neighborhood || "-"}</TableCell><TableCell><Badge variant="outline" className={`${PRIORITY_CONFIG[c.priority]?.color} text-[10px]`}>{PRIORITY_CONFIG[c.priority]?.label}</Badge></TableCell><TableCell><Badge variant="outline" className={`${STATUS_CONFIG[c.status]?.color} text-[10px]`}>{STATUS_CONFIG[c.status]?.label}</Badge></TableCell><TableCell>{format(new Date(c.created_date), "dd/MM/yy")}</TableCell><TableCell><Eye className="h-4 w-4 text-muted-foreground" /></TableCell></TableRow>)}
          </TableBody></Table>
        </Card>
      )}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        {selected && <><DialogHeader><DialogTitle>{selected.title}</DialogTitle></DialogHeader>{selected.photo_url && <img src={selected.photo_url} alt="" className="mb-4 h-48 w-full rounded-lg object-cover" />}<div className="space-y-3"><div className="flex flex-wrap gap-2"><Badge variant="secondary">{getCategoryLabel(selected.category)}</Badge><Badge variant="outline" className={PRIORITY_CONFIG[selected.priority]?.color}>{PRIORITY_CONFIG[selected.priority]?.label}</Badge></div><p className="text-sm">{selected.description}</p>{selected.address && <p className="flex items-center gap-1 text-sm"><MapPin className="h-3 w-3" /> {selected.address}</p>}<div className="rounded-lg bg-muted p-3"><p className="mb-1 text-xs font-medium text-muted-foreground">Analise da IA</p><p className="text-sm">{selected.ai_analysis}</p></div><div className="border-t pt-3"><p className="mb-2 text-sm font-medium">Alterar status:</p><div className="flex flex-wrap gap-2">{Object.entries(STATUS_CONFIG).map(([key, config]) => <Button key={key} size="sm" variant={selected.status === key ? "default" : "outline"} onClick={() => { updateMutation.mutate({ id: selected.id, data: { status: key } }); setSelected({ ...selected, status: key }); }}>{config.label}</Button>)}</div></div></div></>}
      </Dialog>
    </div>
  );
}
