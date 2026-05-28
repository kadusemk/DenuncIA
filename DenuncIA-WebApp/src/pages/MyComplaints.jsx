import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { MapPin, PlusCircle } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import ComplaintCard from "@/components/complaints/ComplaintCard";
import { useAuth } from "@/lib/AuthContext";
import { complaintStore } from "@/lib/localApi";
import { getCategoryLabel, PRIORITY_CONFIG, STATUS_CONFIG } from "@/lib/complaintTypes";

export default function MyComplaints() {
  const { user } = useAuth();
  const [selected, setSelected] = React.useState(null);
  const { data: complaints = [], isLoading } = useQuery({ queryKey: ["my-complaints", user?.email], queryFn: () => complaintStore.mine(user.email), enabled: !!user?.email });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><h1 className="font-heading text-2xl font-bold">Minhas Denuncias</h1><Link to="/nova-denuncia"><Button size="sm"><PlusCircle className="h-4 w-4" /> Nova</Button></Link></div>
      {isLoading ? <div className="grid place-items-center py-12"><div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary" /></div> : complaints.length === 0 ? (
        <Card><CardContent className="p-8 text-center text-muted-foreground"><MapPin className="mx-auto mb-3 h-12 w-12 opacity-30" /><p>Voce ainda nao fez nenhuma denuncia.</p><Link to="/nova-denuncia"><Button className="mt-4"><PlusCircle className="h-4 w-4" /> Fazer denuncia</Button></Link></CardContent></Card>
      ) : <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{complaints.map((c) => <ComplaintCard key={c.id} complaint={c} onClick={setSelected} />)}</div>}

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        {selected && <><DialogHeader><DialogTitle>{selected.title}</DialogTitle></DialogHeader>{selected.photo_url && <img src={selected.photo_url} alt="" className="mb-4 h-48 w-full rounded-lg object-cover" />}<div className="space-y-3"><div className="flex flex-wrap gap-2"><Badge variant="outline" className={STATUS_CONFIG[selected.status]?.color}>{STATUS_CONFIG[selected.status]?.label}</Badge><Badge variant="outline" className={PRIORITY_CONFIG[selected.priority]?.color}>{PRIORITY_CONFIG[selected.priority]?.label}</Badge><Badge variant="secondary">{getCategoryLabel(selected.category)}</Badge></div><p className="text-sm text-muted-foreground">{selected.description}</p>{selected.address && <p className="flex items-center gap-1 text-sm"><MapPin className="h-3 w-3" /> {selected.address}</p>}{selected.ai_analysis && <div className="rounded-lg bg-muted p-3"><p className="mb-1 text-xs font-medium text-muted-foreground">Analise da IA</p><p className="text-sm">{selected.ai_analysis}</p></div>}<p className="text-xs text-muted-foreground">Criada em {format(new Date(selected.created_date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</p></div></>}
      </Dialog>
    </div>
  );
}
