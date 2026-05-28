export const COMPLAINT_TYPES = [
  { value: "alagamento", label: "Alagamento", icon: "Droplets", color: "#2563eb" },
  { value: "arvore_caida", label: "Arvore Caida", icon: "TreePine", color: "#16a34a" },
  { value: "buraco_via", label: "Buraco na Via", icon: "CircleOff", color: "#7c3aed" },
  { value: "lixo_acumulado", label: "Lixo Acumulado", icon: "Trash2", color: "#ca8a04" },
  { value: "iluminacao_defeito", label: "Iluminacao com Defeito", icon: "Lightbulb", color: "#f59e0b" },
  { value: "esgoto_aberto", label: "Esgoto a Ceu Aberto", icon: "Waves", color: "#854d0e" },
  { value: "semaforo_defeito", label: "Semaforo com Defeito", icon: "CircleDot", color: "#dc2626" },
  { value: "calcada_danificada", label: "Calcada Danificada", icon: "Footprints", color: "#9ca3af" },
  { value: "animais_abandonados", label: "Animais Abandonados", icon: "Heart", color: "#ec4899" },
  { value: "entulho_via", label: "Entulho em Via", icon: "Package", color: "#78716c" },
  { value: "ponto_onibus_danificado", label: "Ponto de Onibus Danificado", icon: "Bus", color: "#0891b2" },
  { value: "fiacao_exposta", label: "Fiacao Exposta", icon: "Zap", color: "#eab308" },
  { value: "risco_desabamento", label: "Risco de Desabamento", icon: "AlertTriangle", color: "#ef4444" },
  { value: "obstrucao_via", label: "Obstrucao de Via", icon: "Ban", color: "#f97316" },
  { value: "poluicao_sonora", label: "Poluicao Sonora", icon: "Volume2", color: "#8b5cf6" },
  { value: "veiculo_abandonado", label: "Veiculo Abandonado", icon: "Car", color: "#6b7280" },
  { value: "bueiro_entupido", label: "Bueiro Entupido", icon: "CircleSlash", color: "#92400e" },
  { value: "mobilidade_urbana", label: "Mobilidade Urbana", icon: "Accessibility", color: "#0d9488" },
  { value: "area_risco", label: "Area de Risco", icon: "ShieldAlert", color: "#b91c1c" },
  { value: "outros", label: "Outros", icon: "MoreHorizontal", color: "#6b7280" }
];

export const STATUS_CONFIG = {
  pendente: { label: "Pendente", color: "bg-amber-100 text-amber-800 border-amber-200" },
  em_analise: { label: "Em Analise", color: "bg-blue-100 text-blue-800 border-blue-200" },
  em_andamento: { label: "Em Andamento", color: "bg-purple-100 text-purple-800 border-purple-200" },
  resolvida: { label: "Resolvida", color: "bg-emerald-100 text-emerald-800 border-emerald-200" }
};

export const PRIORITY_CONFIG = {
  baixa: { label: "Baixa", color: "bg-green-100 text-green-800 border-green-200" },
  media: { label: "Media", color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  alta: { label: "Alta", color: "bg-orange-100 text-orange-800 border-orange-200" },
  critica: { label: "Critica", color: "bg-red-100 text-red-800 border-red-200" }
};

export const getCategoryLabel = (value) => COMPLAINT_TYPES.find((t) => t.value === value)?.label || value;
export const getCategoryColor = (value) => COMPLAINT_TYPES.find((t) => t.value === value)?.color || "#6b7280";

export const RECIFE_CENTER = { lat: -8.0476, lng: -34.8770 };

export const RECIFE_NEIGHBORHOODS = [
  "Boa Viagem", "Casa Forte", "Espinheiro", "Gracas", "Madalena", "Recife Antigo",
  "Boa Vista", "Santo Amaro", "Aflitos", "Derby", "Ilha do Leite", "Paissandu",
  "Soledade", "Torre", "Encruzilhada", "Rosarinho", "Tamarineira", "Campo Grande",
  "Pina", "Imbiribeira", "Ibura", "Cohab", "Jordao", "Varzea", "Caxanga",
  "Iputinga", "Cordeiro", "Ilha Joana Bezerra", "Coelhos", "San Martin", "Arruda",
  "Beberibe", "Agua Fria", "Dois Unidos", "Vasco da Gama", "Brasilia Teimosa",
  "Mustardinha", "Tejipio", "Curado", "Torroes"
];
