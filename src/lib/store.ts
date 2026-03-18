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
