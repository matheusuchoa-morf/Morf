"use client";

import { Module } from "@/types";
import { getDifficultyColor } from "@/lib/gamification";

interface ModuleCardProps {
  module: Module;
  completed: boolean;
  locked: boolean;
  onStart: (moduleId: string) => void;
}

export default function ModuleCard({
  module,
  completed,
  locked,
  onStart,
}: ModuleCardProps) {
  const diffColor = getDifficultyColor(module.difficulty);

  return (
    <div
      className={`rounded-xl border p-5 transition-all duration-300 ${
        locked
          ? "bg-gray-900 border-gray-800 opacity-50"
          : completed
          ? "bg-gray-800/50 border-green-500/30 hover:border-green-500/50"
          : "bg-gray-800 border-gray-700 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="text-3xl">{module.icon}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-white">{module.title}</h3>
            {completed && <span className="text-green-400 text-sm">✓</span>}
            {locked && <span className="text-gray-500 text-sm">🔒</span>}
          </div>
          <p className="text-sm text-gray-400 mb-3">{module.description}</p>
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className={`text-xs px-2 py-0.5 rounded-full border ${diffColor}`}
            >
              {module.difficulty}
            </span>
            <span className="text-xs text-purple-400">
              +{module.xpReward} XP
            </span>
            <span className="text-xs text-gray-500">
              ~{module.estimatedMinutes} min
            </span>
            <span className="text-xs text-gray-500">
              {module.lessons.length} aulas
            </span>
          </div>
        </div>
      </div>
      {!locked && !completed && (
        <button
          onClick={() => onStart(module.id)}
          className="mt-4 w-full py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-sm hover:from-purple-500 hover:to-pink-500 transition-all"
        >
          Começar Módulo
        </button>
      )}
      {completed && (
        <button
          onClick={() => onStart(module.id)}
          className="mt-4 w-full py-2 rounded-lg border border-gray-600 text-gray-300 text-sm hover:border-gray-500 transition-all"
        >
          Revisar
        </button>
      )}
    </div>
  );
}
