"use client";

import { useState } from "react";
import { User } from "@/types";
import { challenges } from "@/data/challenges";
import ChallengeCard from "@/components/ChallengeCard";

interface ChallengesPageProps {
  user: User;
  onChallengeComplete: (challengeId: string, xpReward: number) => void;
}

export default function ChallengesPage({
  user,
  onChallengeComplete,
}: ChallengesPageProps) {
  const [filter, setFilter] = useState<"all" | "diario" | "semanal" | "boss">("all");

  const filtered =
    filter === "all"
      ? challenges
      : challenges.filter((c) => c.type === filter);

  return (
    <div>
      <h1 className="text-2xl font-black text-white mb-2">Desafios</h1>
      <p className="text-gray-400 mb-6">
        Complete desafios práticos para ganhar XP extra e provar suas habilidades.
      </p>

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        {[
          { id: "all" as const, label: "Todos" },
          { id: "diario" as const, label: "Diários" },
          { id: "semanal" as const, label: "Semanais" },
          { id: "boss" as const, label: "Boss" },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-3 py-1.5 rounded-full text-sm transition-all ${
              filter === f.id
                ? "bg-purple-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Challenges */}
      <div className="space-y-4">
        {filtered.map((challenge) => {
          const ch = challenges.find((c) => c.id === challenge.id)!;
          return (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              completed={user.completedChallenges.includes(challenge.id)}
              locked={challenge.requiredLevel > user.level}
              onComplete={() => onChallengeComplete(ch.id, ch.xpReward)}
            />
          );
        })}
      </div>
    </div>
  );
}
