"use client";

import { User } from "@/types";
import { badges } from "@/data/badges";
import BadgeCard from "@/components/BadgeCard";

interface BadgesPageProps {
  user: User;
}

export default function BadgesPage({ user }: BadgesPageProps) {
  const unlockedCount = user.unlockedBadges.length;
  const totalCount = badges.length;

  const sortedBadges = [...badges].sort((a, b) => {
    const aUnlocked = user.unlockedBadges.includes(a.id);
    const bUnlocked = user.unlockedBadges.includes(b.id);
    if (aUnlocked && !bUnlocked) return -1;
    if (!aUnlocked && bUnlocked) return 1;
    return 0;
  });

  return (
    <div>
      <h1 className="text-2xl font-black text-white mb-2">Conquistas</h1>
      <p className="text-gray-400 mb-6">
        {unlockedCount} de {totalCount} conquistas desbloqueadas.
      </p>

      {/* Progress */}
      <div className="w-full bg-gray-700 rounded-full h-2 mb-8">
        <div
          className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all"
          style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
        />
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedBadges.map((badge) => (
          <BadgeCard
            key={badge.id}
            badge={badge}
            unlocked={user.unlockedBadges.includes(badge.id)}
          />
        ))}
      </div>
    </div>
  );
}
