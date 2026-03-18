"use client";

import { User } from "@/types";
import { getRank, formatXp, getStreakBonus } from "@/lib/gamification";
import { modules } from "@/data/modules";
import { challenges } from "@/data/challenges";
import { badges } from "@/data/badges";

interface DashboardPageProps {
  user: User;
  onNavigate: (page: string) => void;
}

export default function DashboardPage({ user, onNavigate }: DashboardPageProps) {
  const rank = getRank(user.level);
  const nextRank = getRank(user.level + 5);
  const streakBonus = getStreakBonus(user.streak);
  const completedModulesCount = user.completedModules.length;
  const totalModules = modules.length;
  const completedChallengesCount = user.completedChallenges.length;

  const availableModules = modules.filter(
    (m) =>
      m.requiredLevel <= user.level &&
      !user.completedModules.includes(m.id)
  );

  const availableChallenges = challenges.filter(
    (c) =>
      c.requiredLevel <= user.level &&
      !user.completedChallenges.includes(c.id)
  );

  return (
    <div>
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white mb-2">
          Fala, {user.name}! 👋
        </h1>
        <p className="text-gray-400">
          Continue evoluindo suas habilidades de vendas.
          {streakBonus > 1 && (
            <span className="text-orange-400 ml-2">
              🔥 Bônus de streak: {((streakBonus - 1) * 100).toFixed(0)}% XP extra!
            </span>
          )}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/20 rounded-xl p-5">
          <p className="text-sm text-gray-400 mb-1">Nível</p>
          <p className="text-3xl font-black text-white">{user.level}</p>
          <p className="text-xs text-purple-300 mt-1">
            {rank.icon} {rank.name}
          </p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
          <p className="text-sm text-gray-400 mb-1">XP Total</p>
          <p className="text-3xl font-black text-white">{formatXp(user.xp)}</p>
          <p className="text-xs text-gray-500 mt-1">pontos de experiência</p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
          <p className="text-sm text-gray-400 mb-1">Módulos</p>
          <p className="text-3xl font-black text-white">
            {completedModulesCount}/{totalModules}
          </p>
          <p className="text-xs text-gray-500 mt-1">completados</p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
          <p className="text-sm text-gray-400 mb-1">Streak</p>
          <p className="text-3xl font-black text-white">{user.streak}</p>
          <p className="text-xs text-orange-400 mt-1">
            {user.streak > 0 ? "🔥 dias seguidos" : "comece hoje!"}
          </p>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Next Modules */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">Próximos Módulos</h2>
            <button
              onClick={() => onNavigate("modules")}
              className="text-sm text-purple-400 hover:text-purple-300"
            >
              Ver todos →
            </button>
          </div>
          {availableModules.length === 0 ? (
            <p className="text-gray-500 text-sm">
              {completedModulesCount === totalModules
                ? "Parabéns! Você completou todos os módulos! 🎉"
                : "Suba de nível para desbloquear mais módulos."}
            </p>
          ) : (
            <div className="space-y-3">
              {availableModules.slice(0, 3).map((mod) => (
                <div
                  key={mod.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-900/50 hover:bg-gray-900 transition-colors cursor-pointer"
                  onClick={() => onNavigate("modules")}
                >
                  <span className="text-2xl">{mod.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{mod.title}</p>
                    <p className="text-xs text-gray-500">+{mod.xpReward} XP</p>
                  </div>
                  <span className="text-xs text-gray-600">→</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Challenges */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">Desafios Ativos</h2>
            <button
              onClick={() => onNavigate("challenges")}
              className="text-sm text-purple-400 hover:text-purple-300"
            >
              Ver todos →
            </button>
          </div>
          {availableChallenges.length === 0 ? (
            <p className="text-gray-500 text-sm">
              Suba de nível para desbloquear mais desafios.
            </p>
          ) : (
            <div className="space-y-3">
              {availableChallenges.slice(0, 3).map((ch) => (
                <div
                  key={ch.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-900/50 hover:bg-gray-900 transition-colors cursor-pointer"
                  onClick={() => onNavigate("challenges")}
                >
                  <span className="text-2xl">{ch.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{ch.title}</p>
                    <p className="text-xs text-gray-500">+{ch.xpReward} XP</p>
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      ch.type === "boss"
                        ? "bg-red-500/10 text-red-400"
                        : ch.type === "semanal"
                        ? "bg-orange-500/10 text-orange-400"
                        : "bg-blue-500/10 text-blue-400"
                    }`}
                  >
                    {ch.type}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Progress to next rank */}
      <div className="mt-6 bg-gradient-to-r from-gray-800 to-gray-800/50 border border-gray-700 rounded-xl p-6">
        <h2 className="text-lg font-bold text-white mb-2">
          Caminho para {nextRank.icon} {nextRank.name}
        </h2>
        <p className="text-sm text-gray-400">
          Continue completando módulos e desafios para subir de rank.
          Você já desbloqueou{" "}
          <span className="text-purple-400 font-medium">
            {user.unlockedBadges.length}
          </span>{" "}
          conquistas e completou{" "}
          <span className="text-purple-400 font-medium">
            {completedChallengesCount}
          </span>{" "}
          desafios.
        </p>
      </div>
    </div>
  );
}
