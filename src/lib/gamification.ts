import { User, RANKS, LEVEL_XP_TABLE } from "@/types";

export function calculateLevel(totalXp: number): number {
  let level = 1;
  for (const [lvl, requiredXp] of Object.entries(LEVEL_XP_TABLE)) {
    if (totalXp >= requiredXp) {
      level = parseInt(lvl);
    } else {
      break;
    }
  }
  return level;
}

export function xpForNextLevel(currentLevel: number): number {
  return LEVEL_XP_TABLE[currentLevel + 1] ?? LEVEL_XP_TABLE[30]! + 10000;
}

export function xpProgressPercent(user: User): number {
  const currentLevelXp = LEVEL_XP_TABLE[user.level] ?? 0;
  const nextLevelXp = xpForNextLevel(user.level);
  const progress = user.xp - currentLevelXp;
  const needed = nextLevelXp - currentLevelXp;
  return Math.min(Math.round((progress / needed) * 100), 100);
}

export function getRank(level: number): (typeof RANKS)[number] {
  let rank: (typeof RANKS)[number] = RANKS[0];
  for (const r of RANKS) {
    if (level >= r.minLevel) {
      rank = r;
    }
  }
  return rank;
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case "iniciante":
      return "text-green-400 bg-green-400/10 border-green-400/30";
    case "intermediario":
      return "text-yellow-400 bg-yellow-400/10 border-yellow-400/30";
    case "avancado":
      return "text-red-400 bg-red-400/10 border-red-400/30";
    default:
      return "text-gray-400 bg-gray-400/10 border-gray-400/30";
  }
}

export function getRarityColor(rarity: string): string {
  switch (rarity) {
    case "comum":
      return "from-gray-400 to-gray-600";
    case "raro":
      return "from-blue-400 to-blue-600";
    case "épico":
      return "from-purple-400 to-purple-600";
    case "lendário":
      return "from-yellow-400 to-orange-500";
    default:
      return "from-gray-400 to-gray-600";
  }
}

export function getStreakBonus(streak: number): number {
  if (streak >= 30) return 2.0;
  if (streak >= 14) return 1.5;
  if (streak >= 7) return 1.3;
  if (streak >= 3) return 1.1;
  return 1.0;
}

export function formatXp(xp: number): string {
  if (xp >= 1000) {
    return `${(xp / 1000).toFixed(1)}k`;
  }
  return xp.toString();
}
