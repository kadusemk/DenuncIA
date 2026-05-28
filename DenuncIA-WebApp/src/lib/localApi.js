import { getCategoryLabel } from "@/lib/complaintTypes";

const COMPLAINTS_KEY = "denuncia_complaints";
const USER_KEY = "denuncia_user";

const seed = [
  ["Alagamento na casa da desgraca", "alagamento", "Boa Viagem", "alta", "pendente", -8.123, -34.901, "Rua dos Navegantes, 210"],
  ["Entulho no senac", "entulho_via", "Santo Amaro", "media", "pendente", -8.055, -34.879, "Av. Visconde de Suassuna"],
  ["Alagamento na Av. Caxanga", "alagamento", "Caxanga", "critica", "pendente", -8.037, -34.944, "Av. Caxanga, proximo ao Carrefour"],
  ["Buraco enorme na Rua da Aurora", "buraco_via", "Boa Vista", "alta", "em_analise", -8.059, -34.878, "Rua da Aurora, 450"],
  ["Arvore caida bloqueando rua", "arvore_caida", "Espinheiro", "critica", "em_andamento", -8.041, -34.893, "Rua do Espinheiro, 280"],
  ["Lixo acumulado na Praca do Derby", "lixo_acumulado", "Derby", "media", "pendente", -8.057, -34.899, "Praca do Derby"],
  ["Semaforo apagado no cruzamento", "semaforo_defeito", "Boa Vista", "alta", "pendente", -8.064, -34.884, "Cruzamento Av. Conde da Boa Vista"],
  ["Esgoto a ceu aberto em Brasilia Teimosa", "esgoto_aberto", "Brasilia Teimosa", "critica", "pendente", -8.084, -34.886, "Rua Candido Benicio"],
  ["Iluminacao publica apagada", "iluminacao_defeito", "Ibura", "alta", "pendente", -8.122, -34.933, "Rua Alto do Ceu"],
  ["Calcada destruida na Boa Viagem", "calcada_danificada", "Boa Viagem", "media", "em_analise", -8.118, -34.895, "Av. Boa Viagem"],
  ["Fiacao exposta perto de escola", "fiacao_exposta", "Casa Forte", "critica", "pendente", -8.033, -34.919, "Rua Jose de Alencar"],
  ["Bueiro entupido causa alagamento", "bueiro_entupido", "Madalena", "alta", "pendente", -8.054, -34.913, "Rua Real da Torre"],
  ["Ponto de onibus quebrado", "ponto_onibus_danificado", "Boa Vista", "baixa", "resolvida", -8.062, -34.888, "Av. Guararapes"],
  ["Veiculo abandonado ha semanas", "veiculo_abandonado", "Arruda", "media", "pendente", -8.023, -34.891, "Rua das Mocas"],
  ["Risco de desabamento em barreira", "risco_desabamento", "Dois Unidos", "critica", "pendente", -7.996, -34.914, "Alto Santa Terezinha"]
];

function logoImage() {
  return "https://media.base44.com/images/public/6a16e786d4c9243fce94fe80/f204e2ef5_DenuncIA-removebg-preview.png";
}

function seedComplaints() {
  const today = new Date();
  return seed.map((row, index) => {
    const [title, category, neighborhood, priority, status, latitude, longitude, address] = row;
    const date = new Date(today);
    date.setDate(today.getDate() - (index > 1 ? 1 : 0));
    return {
      id: crypto.randomUUID(),
      title,
      description: `${getCategoryLabel(category)} informado por cidadao para vistoria da prefeitura.`,
      category,
      neighborhood,
      priority,
      status,
      latitude,
      longitude,
      address,
      photo_url: index < 3 ? logoImage() : "",
      ai_analysis: "Prioridade estimada automaticamente conforme risco, mobilidade e impacto local.",
      similar_count: Math.floor(index / 3),
      created_by: index % 2 ? "carloseduardovilaca2000@gmail.com" : "cidadao@denuncia.local",
      created_date: date.toISOString()
    };
  });
}

function read(key, fallback) {
  const value = localStorage.getItem(key);
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function initLocalData() {
  if (!localStorage.getItem(COMPLAINTS_KEY)) write(COMPLAINTS_KEY, seedComplaints());
  if (!localStorage.getItem(USER_KEY)) {
    write(USER_KEY, { email: "carloseduardovilaca2000@gmail.com", role: "admin", name: "Carlos Eduardo" });
  }
}

export const localAuth = {
  me() {
    initLocalData();
    return read(USER_KEY, null);
  },
  login(email) {
    const role = email.toLowerCase().includes("admin") || email.toLowerCase().includes("carlos") ? "admin" : "citizen";
    const user = { email, role, name: email.split("@")[0] };
    write(USER_KEY, user);
    return user;
  },
  logout() {
    localStorage.removeItem(USER_KEY);
  }
};

export const complaintStore = {
  list() {
    initLocalData();
    return read(COMPLAINTS_KEY, []).sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
  },
  mine(email) {
    return this.list().filter((c) => c.created_by === email);
  },
  create(data, user) {
    const complaints = this.list();
    const item = {
      ...data,
      id: crypto.randomUUID(),
      created_by: user?.email || "anonimo@local",
      created_date: new Date().toISOString(),
      similar_count: 0
    };
    write(COMPLAINTS_KEY, [item, ...complaints]);
    return item;
  },
  update(id, data) {
    const next = this.list().map((c) => (c.id === id ? { ...c, ...data } : c));
    write(COMPLAINTS_KEY, next);
    return next.find((c) => c.id === id);
  }
};

export function analyzePriority(data) {
  const text = `${data.title} ${data.description} ${data.category}`.toLowerCase();
  const critical = ["desabamento", "fiacao", "fiação", "risco", "alagamento grave", "acidente", "crianca", "criança", "idoso"];
  const high = ["alagamento", "semaforo", "buraco", "esgoto", "bloqueando", "obstrucao"];
  if (critical.some((word) => text.includes(word)) || data.category === "risco_desabamento" || data.category === "fiacao_exposta") {
    return { priority: "critica", analysis: "Possui indícios de risco imediato ou impacto alto na seguranca publica." };
  }
  if (high.some((word) => text.includes(word))) {
    return { priority: "alta", analysis: "Pode afetar mobilidade, saude publica ou seguranca dos moradores." };
  }
  if (data.description?.length > 80) {
    return { priority: "media", analysis: "Problema urbano relevante que pode afetar um grupo de pessoas." };
  }
  return { priority: "baixa", analysis: "Ocorrencia simples, sem sinais claros de risco imediato." };
}
