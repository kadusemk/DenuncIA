import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, CheckCircle2, Clock, LayoutDashboard, Loader2, MapPin, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { complaintStore } from "@/lib/localApi";
import AiInsights from "@/components/admin/AiInsights";
import DashboardMap from "@/components/admin/DashboardMap";
import DashboardCharts from "@/components/admin/DashboardCharts";

export default function AdminDashboard() {
  const [mapView, setMapView] = useState("markers");
  const { data: complaints = [], isLoading } = useQuery({ queryKey: ["complaints"], queryFn: () => complaintStore.list() });
  if (isLoading) return <div className="grid place-items-center py-24"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  const stats = {
    total: complaints.length,
    pendentes: complaints.filter((c) => c.status === "pendente").length,
    andamento: complaints.filter((c) => c.status === "em_andamento").length,
    resolvidas: complaints.filter((c) => c.status === "resolvida").length,
    criticas: complaints.filter((c) => c.priority === "critica").length,
    altas: complaints.filter((c) => c.priority === "alta").length
  };
  const cards = [
    ["Total", stats.total, TrendingUp, "text-primary", "bg-primary/10"],
    ["Pendentes", stats.pendentes, Clock, "text-amber-600", "bg-amber-100"],
    ["Em Andamento", stats.andamento, MapPin, "text-purple-600", "bg-purple-100"],
    ["Resolvidas", stats.resolvidas, CheckCircle2, "text-emerald-600", "bg-emerald-100"],
    ["Criticas", stats.criticas, AlertTriangle, "text-destructive", "bg-destructive/10"],
    ["Alta Prioridade", stats.altas, AlertTriangle, "text-orange-600", "bg-orange-100"]
  ];

  return (
    <div className="space-y-6">
      <div><h1 className="font-heading text-2xl font-bold">Painel Administrativo</h1><p className="text-sm text-muted-foreground">Analise de denuncias urbanas em Recife</p></div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">{cards.map(([label, value, Icon, color, bg]) => <Card key={label}><CardContent className="p-4"><div className={`mb-3 w-fit rounded-lg p-2 ${bg}`}><Icon className={`h-4 w-4 ${color}`} /></div><p className="font-heading text-2xl font-bold">{value}</p><p className="text-xs text-muted-foreground">{label}</p></CardContent></Card>)}</div>
      <AiInsights complaints={complaints} />
      <Card><CardHeader><div className="flex items-center justify-between"><CardTitle className="flex items-center gap-2"><LayoutDashboard className="h-5 w-5" /> Mapa de Denuncias</CardTitle><Tabs value={mapView} onValueChange={setMapView}><TabsList><TabsTrigger value="markers">Marcadores</TabsTrigger><TabsTrigger value="heat">Concentracao</TabsTrigger></TabsList></Tabs></div></CardHeader><CardContent><DashboardMap complaints={complaints} view={mapView} /></CardContent></Card>
      <DashboardCharts complaints={complaints} />
    </div>
  );
}
