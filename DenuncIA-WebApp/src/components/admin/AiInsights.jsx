import { useMemo, useState } from "react";
import { Brain, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AiInsights({ complaints }) {
  const [generated, setGenerated] = useState(false);
  const text = useMemo(() => {
    const critical = complaints.filter((c) => c.priority === "critica").length;
    const pending = complaints.filter((c) => c.status === "pendente").length;
    const topNeighborhood = Object.entries(complaints.reduce((acc, c) => {
      if (c.neighborhood) acc[c.neighborhood] = (acc[c.neighborhood] || 0) + 1;
      return acc;
    }, {})).sort((a, b) => b[1] - a[1])[0];
    return `Priorize ${critical} ocorrencia(s) criticas e ${pending} pendente(s). ${topNeighborhood ? `${topNeighborhood[0]} concentra o maior volume e merece uma vistoria coordenada.` : "Ainda nao ha concentracao relevante por bairro."}`;
  }, [complaints]);

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="mb-2 flex items-center gap-2 font-heading text-lg font-bold"><Brain className="h-5 w-5 text-primary" /> Insights da IA</h2>
          <p className="text-sm text-muted-foreground">{generated ? text : "Clique em Gerar Analise para simular recomendacoes para a gestao publica."}</p>
        </div>
        <Button variant="outline" onClick={() => setGenerated(true)} className="shrink-0"><RefreshCw className="h-4 w-4" /> Gerar Analise</Button>
      </CardContent>
    </Card>
  );
}
