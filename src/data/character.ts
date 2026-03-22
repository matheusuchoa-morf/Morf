import { CharacterEquipment, CharacterAppearance } from "@/types";

export const CHARACTER_TITLES: { title: string; minLevel: number }[] = [
  { title: "Recruta de Whiterun", minLevel: 1 },
  { title: "Aprendiz da Guilda", minLevel: 3 },
  { title: "Explorador de Dungeons", minLevel: 5 },
  { title: "Guerreiro de Solitude", minLevel: 8 },
  { title: "Thane das Vendas", minLevel: 12 },
  { title: "Cavaleiro de Windhelm", minLevel: 16 },
  { title: "Lider dos Companheiros", minLevel: 20 },
  { title: "Dragonborn Comercial", minLevel: 25 },
  { title: "Dovahkiin Supremo", minLevel: 30 },
];

export const EQUIPMENT_CATALOG: CharacterEquipment[] = [
  // Head (Elmos)
  {
    id: "headset-basico",
    name: "Elmo de Ferro",
    slot: "head",
    icon: "⛑️",
    statBonus: { carisma: 1 },
    requiredLevel: 1,
    description: "Um elmo simples, mas confiavel para iniciantes.",
  },
  {
    id: "oculos-analitico",
    name: "Visor Arcano",
    slot: "head",
    icon: "🔮",
    statBonus: { estrategia: 2 },
    requiredLevel: 5,
    description: "Revela oportunidades ocultas aos olhos comuns.",
  },
  {
    id: "coroa-closer",
    name: "Coroa do Jarl",
    slot: "head",
    icon: "👑",
    statBonus: { persuasao: 3, carisma: 2 },
    requiredLevel: 12,
    description: "A coroa que simboliza dominio absoluto sobre negociacoes.",
  },
  {
    id: "capacete-lendario",
    name: "Elmo do Dragonborn",
    slot: "head",
    icon: "⚔️",
    statBonus: { resiliencia: 3, estrategia: 3 },
    requiredLevel: 20,
    description: "Forjado com escamas de dragao nas forjas de Skyrim.",
  },

  // Body (Armaduras)
  {
    id: "camisa-startup",
    name: "Armadura de Couro",
    slot: "body",
    icon: "🦺",
    statBonus: { networking: 1 },
    requiredLevel: 1,
    description: "Leve e flexivel. Ideal para os primeiros combates.",
  },
  {
    id: "blazer-closer",
    name: "Armadura de Aco",
    slot: "body",
    icon: "🛡️",
    statBonus: { persuasao: 2, carisma: 1 },
    requiredLevel: 8,
    description: "Protecao solida que impoe respeito em qualquer campo de batalha.",
  },
  {
    id: "armadura-revenue",
    name: "Armadura Daedrica",
    slot: "body",
    icon: "🔥",
    statBonus: { resiliencia: 3, estrategia: 2 },
    requiredLevel: 16,
    description: "Forjada nos reinos de Oblivion. Inquebravel.",
  },
  {
    id: "manto-cro",
    name: "Armadura do Dragonborn",
    slot: "body",
    icon: "🐉",
    statBonus: { carisma: 4, persuasao: 3, estrategia: 3 },
    requiredLevel: 25,
    description: "A armadura lendaria dos que dominaram os Thu'um das vendas.",
  },

  // Accessory (Amuletos)
  {
    id: "cracha-sdr",
    name: "Amuleto de Mara",
    slot: "accessory",
    icon: "📿",
    statBonus: { networking: 1 },
    requiredLevel: 1,
    description: "Abre portas e coracoes. Essencial para networking.",
  },
  {
    id: "relogio-produtividade",
    name: "Anel da Velocidade",
    slot: "accessory",
    icon: "💍",
    statBonus: { estrategia: 2 },
    requiredLevel: 6,
    description: "Cada momento e precioso na busca por pipeline.",
  },
  {
    id: "anel-influencia",
    name: "Colar de Talos",
    slot: "accessory",
    icon: "⚡",
    statBonus: { carisma: 3, networking: 2 },
    requiredLevel: 15,
    description: "Canaliza o poder divino da influencia.",
  },
  {
    id: "amuleto-lenda",
    name: "Amuleto de Akatosh",
    slot: "accessory",
    icon: "✨",
    statBonus: { persuasao: 4, resiliencia: 3 },
    requiredLevel: 22,
    description: "O artefato do deus do tempo. Nunca falha um deal.",
  },

  // Tool (Armas)
  {
    id: "caderno-notas",
    name: "Adaga de Ferro",
    slot: "tool",
    icon: "🗡️",
    statBonus: { estrategia: 1 },
    requiredLevel: 1,
    description: "Precisa e discreta. A primeira arma de todo aventureiro.",
  },
  {
    id: "crm-magico",
    name: "Espada Encantada",
    slot: "tool",
    icon: "⚔️",
    statBonus: { estrategia: 2, networking: 1 },
    requiredLevel: 7,
    description: "Encantada com magia de organizacao e foco.",
  },
  {
    id: "megafone-closer",
    name: "Machado de Orcish",
    slot: "tool",
    icon: "🪓",
    statBonus: { persuasao: 3, carisma: 2 },
    requiredLevel: 14,
    description: "Corta objecoes e fecha negociacoes com um golpe.",
  },
  {
    id: "cetro-vendas",
    name: "Martelo de Volendrung",
    slot: "tool",
    icon: "🔨",
    statBonus: { carisma: 3, persuasao: 3, networking: 3 },
    requiredLevel: 28,
    description: "O artefato daedrico supremo. Poucos sao dignos.",
  },
];

export const APPEARANCE_BY_LEVEL: { minLevel: number; appearance: CharacterAppearance }[] = [
  {
    minLevel: 1,
    appearance: {
      skinColor: "bg-amber-200",
      hairStyle: "Recruta",
      outfit: "Couro",
      aura: "",
    },
  },
  {
    minLevel: 5,
    appearance: {
      skinColor: "bg-amber-200",
      hairStyle: "Guerreiro",
      outfit: "Ferro",
      aura: "border-blue-400/30",
    },
  },
  {
    minLevel: 10,
    appearance: {
      skinColor: "bg-amber-200",
      hairStyle: "Cavaleiro",
      outfit: "Aco",
      aura: "border-purple-400/50 shadow-purple-500/20",
    },
  },
  {
    minLevel: 16,
    appearance: {
      skinColor: "bg-amber-200",
      hairStyle: "Comandante",
      outfit: "Daedrico",
      aura: "border-yellow-400/50 shadow-yellow-500/30",
    },
  },
  {
    minLevel: 25,
    appearance: {
      skinColor: "bg-amber-200",
      hairStyle: "Dragonborn",
      outfit: "Dragonbone",
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
