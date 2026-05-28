import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, CheckCircle2, MapPin, PlusCircle, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ComplaintCard from "@/components/complaints/ComplaintCard";
import PriorityMap from "@/components/complaints/PriorityMap";
import { complaintStore } from "@/lib/localApi";

const LOGO_URL = "https://media.base44.com/images/public/6a16e786d4c9243fce94fe80/f204e2ef5_DenuncIA-removebg-preview.png";

export default function Home() {
  const { data: complaints = [], isLoading } = useQuery({ queryKey: ["complaints"], queryFn: () => complaintStore.list() });
  const stats = {
    total: complaints.length,
    criticas: complaints.filter((c) => c.priority === "critica" || c.priority === "alta").length,
    resolvidas: complaints.filter((c) => c.status === "resolvida").length
  };

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-2xl p-8 text-white" style={{ background: "linear-gradient(135deg, #0D2F6E 0%, #1351B4 50%, #00B5AD 100%)" }}>
        <div className="relative z-10 flex flex-col items-center gap-6 sm:flex-row">
          <img src={LOGO_URL} alt="DenuncIA" className="h-28 w-auto shrink-0 object-contain drop-shadow-lg" />
          <div>
            <h1 className="mb-2 font-heading text-4xl font-bold">Denunc<span className="text-[#F7941D]">IA</span></h1>
            <p className="mb-5 max-w-xl text-white/90">Denuncie problemas urbanos na cidade do Recife. Sua participacao ajuda a construir uma cidade mais justa e segura.</p>
            <Link to="/nova-denuncia"><Button size="lg" className="bg-[#F7941D] shadow-lg hover:bg-[#e88717]"><PlusCircle className="h-5 w-5" /> Registrar Denuncia</Button></Link>
          </div>
        </div>
        <div className="absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-white/10" />
        <div className="absolute bottom-0 left-1/3 h-40 w-40 translate-y-1/2 rounded-full bg-white/10" />
      </section>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Stat label="Denuncias" value={stats.total} icon={TrendingUp} color="text-primary" border="border-l-primary" />
        <Stat label="Alta/Critica" value={stats.criticas} icon={AlertTriangle} color="text-destructive" border="border-l-destructive" />
        <Stat label="Resolvidas" value={stats.resolvidas} icon={CheckCircle2} color="text-emerald-600" border="border-l-emerald-500" />
      </div>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-heading text-lg font-bold">Mapa de Denuncias por Prioridade</h2>
          <div className="hidden items-center gap-3 text-xs sm:flex"><Legend color="bg-blue-600" label="Baixa" /><Legend color="bg-amber-400" label="Media" /><Legend color="bg-red-500" label="Alta/Critica" /></div>
        </div>
        <PriorityMap complaints={complaints} height="320px" />
      </section>

      <section>
        <h2 className="mb-3 font-heading text-lg font-bold">Denuncias Recentes</h2>
        {isLoading ? <div className="grid place-items-center py-12"><div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary" /></div> : complaints.length === 0 ? (
          <Card><CardContent className="p-8 text-center text-muted-foreground"><MapPin className="mx-auto mb-3 h-12 w-12 opacity-30" /><p>Nenhuma denuncia registrada ainda.</p></CardContent></Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{complaints.slice(0, 6).map((c) => <ComplaintCard key={c.id} complaint={c} />)}</div>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value, icon: Icon, color, border }) {
  return <Card className={`border-l-4 ${border}`}><CardContent className="flex items-center gap-3 p-4"><div className="rounded-lg bg-muted p-2"><Icon className={`h-5 w-5 ${color}`} /></div><div><p className={`font-heading text-2xl font-bold ${color}`}>{value}</p><p className="text-xs text-muted-foreground">{label}</p></div></CardContent></Card>;
}

function Legend({ color, label }) {
  return <span className="flex items-center gap-1"><span className={`inline-block h-3 w-3 rounded-full ${color}`} /> {label}</span>;
}
