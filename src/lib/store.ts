"use client";

import { User } from "@/types";
import { calculateLevel, getRank, xpForNextLevel } from "./gamification";

const STORAGE_KEY = "morf_user_data";

const DEFAULT_USER: User = {
  id: "1",
  name: "Mentorado",
  avatar: "🧑‍💻",
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  streak: 0,
  completedModules: [],
  completedChallenges: [],
  unlockedBadges: ["badge-first-login"],
  rank: "Estagiário",
};

export function loadUser(): User {
  if (typeof window === "undefined") return DEFAULT_USER;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch {}
  return { ...DEFAULT_USER };
}

export function saveUser(user: User): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function addXp(user: User, amount: number): User {
  const newXp = user.xp + amount;
  const newLevel = calculateLevel(newXp);
  const rank = getRank(newLevel);
  const updated: User = {
    ...user,
    xp: newXp,
    level: newLevel,
    xpToNextLevel: xpForNextLevel(newLevel),
    rank: rank.name,
  };
  saveUser(updated);
  return updated;
}

export function completeModule(user: User, moduleId: string): User {
  if (user.completedModules.includes(moduleId)) return user;
  const updated: User = {
    ...user,
    completedModules: [...user.completedModules, moduleId],
  };
  saveUser(updated);
  return updated;
}

export function completeChallenge(user: User, challengeId: string): User {
  if (user.completedChallenges.includes(challengeId)) return user;
  const updated: User = {
    ...user,
    completedChallenges: [...user.completedChallenges, challengeId],
  };
  saveUser(updated);
  return updated;
}

export function unlockBadge(user: User, badgeId: string): User {
  if (user.unlockedBadges.includes(badgeId)) return user;
  const updated: User = {
    ...user,
    unlockedBadges: [...user.unlockedBadges, badgeId],
  };
  saveUser(updated);
  return updated;
}

export function incrementStreak(user: User): User {
  const updated: User = {
    ...user,
    streak: user.streak + 1,
  };
  saveUser(updated);
  return updated;
}

export function resetUser(): User {
  const user = { ...DEFAULT_USER };
  saveUser(user);
  return user;
}

// Character state
const CHAR_STORAGE_KEY = "morf_character_data";

import { Character, CharacterStats } from "@/types";

const DEFAULT_CHARACTER: Character = {
  stats: {
    carisma: 1,
    persuasao: 1,
    resiliencia: 1,
    estrategia: 1,
    networking: 1,
  },
  equipment: ["headset-basico", "camisa-startup", "cracha-sdr", "caderno-notas"],
  title: "Novato em Vendas",
  appearance: {
    skinColor: "bg-amber-200",
    hairStyle: "Casual",
    outfit: "Iniciante",
    aura: "",
  },
  skillPoints: 0,
  completedSkillTasks: [],
  completedSocialSelling: [],
};

export function loadCharacter(): Character {
  if (typeof window === "undefined") return DEFAULT_CHARACTER;
  try {
    const data = localStorage.getItem(CHAR_STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch {}
  return { ...DEFAULT_CHARACTER, stats: { ...DEFAULT_CHARACTER.stats }, equipment: [...DEFAULT_CHARACTER.equipment] };
}

export function saveCharacter(character: Character): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CHAR_STORAGE_KEY, JSON.stringify(character));
}

export function completeSkillTask(
  character: Character,
  taskId: string,
  statBonus: Partial<CharacterStats>
): Character {
  if (character.completedSkillTasks.includes(taskId)) return character;
  const newStats = { ...character.stats };
  for (const key of Object.keys(statBonus) as (keyof CharacterStats)[]) {
    newStats[key] = (newStats[key] || 0) + (statBonus[key] || 0);
  }
  const updated: Character = {
    ...character,
    stats: newStats,
    completedSkillTasks: [...character.completedSkillTasks, taskId],
    skillPoints: character.skillPoints + 1,
  };
  saveCharacter(updated);
  return updated;
}

export function completeSocialSelling(
  character: Character,
  scenarioId: string,
  statBonus: Partial<CharacterStats>
): Character {
  if (character.completedSocialSelling.includes(scenarioId)) return character;
  const newStats = { ...character.stats };
  for (const key of Object.keys(statBonus) as (keyof CharacterStats)[]) {
    newStats[key] = (newStats[key] || 0) + (statBonus[key] || 0);
  }
  const updated: Character = {
    ...character,
    stats: newStats,
    completedSocialSelling: [...character.completedSocialSelling, scenarioId],
  };
  saveCharacter(updated);
  return updated;
}

export function equipItem(character: Character, equipmentId: string, slot: string): Character {
  const SLOT_IDS: Record<string, string[]> = {
    head: ["headset-basico", "oculos-analitico", "coroa-closer", "capacete-lendario"],
    body: ["camisa-startup", "blazer-closer", "armadura-revenue", "manto-cro"],
    accessory: ["cracha-sdr", "relogio-produtividade", "anel-influencia", "amuleto-lenda"],
    tool: ["caderno-notas", "crm-magico", "megafone-closer", "cetro-vendas"],
  };
  const slotItems = SLOT_IDS[slot] || [];
  const filteredEquipment = character.equipment.filter((id) => !slotItems.includes(id));
  const updated: Character = {
    ...character,
    equipment: [...filteredEquipment, equipmentId],
  };
  saveCharacter(updated);
  return updated;
}
