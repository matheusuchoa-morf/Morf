"use client";

import { User } from "@/types";
import { xpProgressPercent, formatXp, xpForNextLevel } from "@/lib/gamification";

interface XpBarProps {
  user: User;
}

export default function XpBar({ user }: XpBarProps) {
  const progress = xpProgressPercent(user);
  const nextLevelXp = xpForNextLevel(user.level);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-purple-300">
          Nível {user.level}
        </span>
        <span className="text-xs text-gray-400">
          {formatXp(user.xp)} / {formatXp(nextLevelXp)} XP
        </span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
