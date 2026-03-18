"use client";

import { Challenge } from "@/types";

interface ChallengeCardProps {
  challenge: Challenge;
  completed: boolean;
  locked: boolean;
  onComplete: (challengeId: string) => void;
}

const typeStyles = {
  diario: "border-blue-500/30 bg-blue-500/5",
  semanal: "border-orange-500/30 bg-orange-500/5",
  boss: "border-red-500/30 bg-red-500/5",
};

const typeLabels = {
  diario: { text: "Diário", color: "text-blue-400" },
  semanal: { text: "Semanal", color: "text-orange-400" },
  boss: { text: "Boss", color: "text-red-400" },
};

export default function ChallengeCard({
  challenge,
  completed,
  locked,
  onComplete,
}: ChallengeCardProps) {
  const style = typeStyles[challenge.type];
  const label = typeLabels[challenge.type];

  return (
    <div
      className={`rounded-xl border p-5 transition-all duration-300 ${
        locked
          ? "bg-gray-900 border-gray-800 opacity-50"
          : completed
          ? "bg-gray-800/30 border-green-500/20"
          : style
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="text-3xl">{challenge.icon}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-white">{challenge.title}</h3>
            <span className={`text-xs font-medium ${label.color}`}>
              {label.text}
            </span>
            {completed && <span className="text-green-400 text-sm">✓</span>}
          </div>
          <p className="text-sm text-gray-400 mb-3">{challenge.description}</p>

          <div className="space-y-2 mb-3">
            {challenge.tasks.map((task) => (
              <div key={task.id} className="flex items-center gap-2 text-sm">
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center ${
                    completed
                      ? "bg-green-500/20 border-green-500 text-green-400"
                      : "border-gray-600"
                  }`}
                >
                  {completed && "✓"}
                </div>
                <span className={completed ? "text-gray-500 line-through" : "text-gray-300"}>
                  {task.description}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-purple-400 font-medium">
              +{challenge.xpReward} XP
            </span>
            {!locked && !completed && (
              <button
                onClick={() => onComplete(challenge.id)}
                className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold hover:from-purple-500 hover:to-pink-500 transition-all"
              >
                Completar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
