"use client";

import { Badge } from "@/types";
import { getRarityColor } from "@/lib/gamification";

interface BadgeCardProps {
  badge: Badge;
  unlocked: boolean;
}

export default function BadgeCard({ badge, unlocked }: BadgeCardProps) {
  const rarityGradient = getRarityColor(badge.rarity);

  return (
    <div
      className={`relative rounded-xl p-4 text-center transition-all duration-300 ${
        unlocked
          ? "bg-gray-800 border border-gray-600 hover:border-gray-500 hover:scale-105"
          : "bg-gray-900 border border-gray-800 opacity-40 grayscale"
      }`}
    >
      {unlocked && (
        <div
          className={`absolute inset-0 rounded-xl bg-gradient-to-br ${rarityGradient} opacity-10`}
        />
      )}
      <div className="relative z-10">
        <div className="text-4xl mb-2">{badge.icon}</div>
        <h3 className="font-bold text-sm text-white mb-1">{badge.name}</h3>
        <p className="text-xs text-gray-400">{badge.description}</p>
        <span
          className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full bg-gradient-to-r ${rarityGradient} text-white`}
        >
          {badge.rarity}
        </span>
      </div>
    </div>
  );
}
