import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCategoryLabel, PRIORITY_CONFIG, STATUS_CONFIG } from "@/lib/complaintTypes";

function countBy(items, key, labeler = (v) => v) {
  return Object.entries(items.reduce((acc, item) => {
    const value = item[key] || "Nao informado";
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {})).map(([name, value]) => ({ name: labeler(name), value })).sort((a, b) => b.value - a.value);
}

const priorityColors = { baixa: "#22c55e", media: "#f5b700", alta: "#f97316", critica: "#ef4444" };
const statusColors = { pendente: "#f59e0b", em_analise: "#3b82f6", em_andamento: "#8b5cf6", resolvida: "#10b981" };

export default function DashboardCharts({ complaints }) {
  const categories = countBy(complaints, "category", getCategoryLabel).slice(0, 10);
  const neighborhoods = countBy(complaints, "neighborhood").slice(0, 10);
  const priorities = Object.keys(PRIORITY_CONFIG).map((key) => ({ name: PRIORITY_CONFIG[key].label, value: complaints.filter((c) => c.priority === key).length, color: priorityColors[key] }));
  const statuses = Object.keys(STATUS_CONFIG).map((key) => ({ name: STATUS_CONFIG[key].label, value: complaints.filter((c) => c.status === key).length, color: statusColors[key] }));

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <ChartCard title="Por Tipo de Problema">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={categories} layout="vertical" margin={{ left: 80 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" allowDecimals={false} />
            <YAxis type="category" dataKey="name" width={90} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="value" fill="#25876f" radius={[0, 5, 5, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
      <ChartCard title="Ranking por Bairro">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={neighborhoods} layout="vertical" margin={{ left: 80 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" allowDecimals={false} />
            <YAxis type="category" dataKey="name" width={90} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="value" fill="#f59e0b" radius={[0, 5, 5, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
      <ChartCard title="Por Prioridade">
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie data={priorities} dataKey="value" nameKey="name" innerRadius={58} outerRadius={95} label>
              {priorities.map((item) => <Cell key={item.name} fill={item.color} />)}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>
      <ChartCard title="Por Status">
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie data={statuses} dataKey="value" nameKey="name" innerRadius={58} outerRadius={95} label>
              {statuses.map((item) => <Cell key={item.name} fill={item.color} />)}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <Card>
      <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
