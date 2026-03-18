import { CharacterEquipment, CharacterAppearance } from "@/types";

export const CHARACTER_TITLES: { title: string; minLevel: number }[] = [
  { title: "Novato em Vendas", minLevel: 1 },
  { title: "Aprendiz Comercial", minLevel: 3 },
  { title: "Prospector Ativo", minLevel: 5 },
  { title: "Negociador Tático", minLevel: 8 },
  { title: "Closer Destemido", minLevel: 12 },
  { title: "Estrategista de Revenue", minLevel: 16 },
  { title: "Mestre das Vendas", minLevel: 20 },
  { title: "Lenda Comercial", minLevel: 25 },
  { title: "O Invencível", minLevel: 30 },
];

export const EQUIPMENT_CATALOG: CharacterEquipment[] = [
  // Head
  {
    id: "headset-basico",
    name: "Headset Básico",
    slot: "head",
    icon: "🎧",
    statBonus: { carisma: 1 },
    requiredLevel: 1,
    description: "Todo SDR começa com um bom headset.",
  },
  {
    id: "oculos-analitico",
    name: "Óculos Analítico",
    slot: "head",
    icon: "🤓",
    statBonus: { estrategia: 2 },
    requiredLevel: 5,
    description: "Enxerga oportunidades onde ninguém vê.",
  },
  {
    id: "coroa-closer",
    name: "Coroa do Closer",
    slot: "head",
    icon: "👑",
    statBonus: { persuasao: 3, carisma: 2 },
    requiredLevel: 12,
    description: "A coroa de quem fecha negócios impossíveis.",
  },
  {
    id: "capacete-lendario",
    name: "Capacete Lendário",
    slot: "head",
    icon: "⚔️",
    statBonus: { resiliencia: 3, estrategia: 3 },
    requiredLevel: 20,
    description: "Forjado nas batalhas mais duras do mercado.",
  },

  // Body
  {
    id: "camisa-startup",
    name: "Camisa de Startup",
    slot: "body",
    icon: "👕",
    statBonus: { networking: 1 },
    requiredLevel: 1,
    description: "Casual mas profissional. O uniforme do início.",
  },
  {
    id: "blazer-closer",
    name: "Blazer do Closer",
    slot: "body",
    icon: "🧥",
    statBonus: { persuasao: 2, carisma: 1 },
    requiredLevel: 8,
    description: "Transmite autoridade em qualquer reunião.",
  },
  {
    id: "armadura-revenue",
    name: "Armadura de Revenue",
    slot: "body",
    icon: "🛡️",
    statBonus: { resiliencia: 3, estrategia: 2 },
    requiredLevel: 16,
    description: "Proteção contra objeções e churn.",
  },
  {
    id: "manto-cro",
    name: "Manto do CRO",
    slot: "body",
    icon: "🦸",
    statBonus: { carisma: 4, persuasao: 3, estrategia: 3 },
    requiredLevel: 25,
    description: "O manto dos líderes visionários de receita.",
  },

  // Accessory
  {
    id: "cracha-sdr",
    name: "Crachá de SDR",
    slot: "accessory",
    icon: "🪪",
    statBonus: { networking: 1 },
    requiredLevel: 1,
    description: "Sua identidade no mundo das vendas.",
  },
  {
    id: "relogio-produtividade",
    name: "Relógio da Produtividade",
    slot: "accessory",
    icon: "⌚",
    statBonus: { estrategia: 2 },
    requiredLevel: 6,
    description: "Cada segundo conta quando se trata de pipeline.",
  },
  {
    id: "anel-influencia",
    name: "Anel da Influência",
    slot: "accessory",
    icon: "💍",
    statBonus: { carisma: 3, networking: 2 },
    requiredLevel: 15,
    description: "Quem usa, influencia qualquer sala.",
  },
  {
    id: "amuleto-lenda",
    name: "Amuleto da Lenda",
    slot: "accessory",
    icon: "🔮",
    statBonus: { persuasao: 4, resiliencia: 3 },
    requiredLevel: 22,
    description: "Dizem que esse amuleto nunca perdeu um deal.",
  },

  // Tool
  {
    id: "caderno-notas",
    name: "Caderno de Notas",
    slot: "tool",
    icon: "📓",
    statBonus: { estrategia: 1 },
    requiredLevel: 1,
    description: "Anote tudo. Memória é poder.",
  },
  {
    id: "crm-magico",
    name: "CRM Mágico",
    slot: "tool",
    icon: "💻",
    statBonus: { estrategia: 2, networking: 1 },
    requiredLevel: 7,
    description: "Pipeline organizado = deals fechados.",
  },
  {
    id: "megafone-closer",
    name: "Megafone do Closer",
    slot: "tool",
    icon: "📢",
    statBonus: { persuasao: 3, carisma: 2 },
    requiredLevel: 14,
    description: "Sua voz ecoa em todas as negociações.",
  },
  {
    id: "cetro-vendas",
    name: "Cetro das Vendas",
    slot: "tool",
    icon: "🏆",
    statBonus: { carisma: 3, persuasao: 3, networking: 3 },
    requiredLevel: 28,
    description: "O artefato supremo. Poucos chegam aqui.",
  },
];

export const APPEARANCE_BY_LEVEL: { minLevel: number; appearance: CharacterAppearance }[] = [
  {
    minLevel: 1,
    appearance: {
      skinColor: "bg-amber-200",
      hairStyle: "Casual",
      outfit: "Iniciante",
      aura: "",
    },
  },
  {
    minLevel: 5,
    appearance: {
      skinColor: "bg-amber-200",
      hairStyle: "Profissional",
      outfit: "Business Casual",
      aura: "border-blue-400/30",
    },
  },
  {
    minLevel: 10,
    appearance: {
      skinColor: "bg-amber-200",
      hairStyle: "Executivo",
      outfit: "Social",
      aura: "border-purple-400/50 shadow-purple-500/20",
    },
  },
  {
    minLevel: 16,
    appearance: {
      skinColor: "bg-amber-200",
      hairStyle: "Líder",
      outfit: "Premium",
      aura: "border-yellow-400/50 shadow-yellow-500/30",
    },
  },
  {
    minLevel: 25,
    appearance: {
      skinColor: "bg-amber-200",
      hairStyle: "Lendário",
      outfit: "Lendário",
      aura: "border-amber-400 shadow-amber-500/50 animate-pulse",
    },
  },
];

export function getCharacterTitle(level: number): string {
  let title = CHARACTER_TITLES[0].title;
  for (const t of CHARACTER_TITLES) {
    if (level >= t.minLevel) title = t.title;
  }
  return title;
}

export function getCharacterAppearance(level: number): CharacterAppearance {
  let appearance = APPEARANCE_BY_LEVEL[0].appearance;
  for (const a of APPEARANCE_BY_LEVEL) {
    if (level >= a.minLevel) appearance = a.appearance;
  }
  return appearance;
}

export function getAvailableEquipment(level: number): CharacterEquipment[] {
  return EQUIPMENT_CATALOG.filter((e) => level >= e.requiredLevel);
}
