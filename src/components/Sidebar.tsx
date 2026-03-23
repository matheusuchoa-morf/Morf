"use client";

import { User } from "@/types";
import { getRank } from "@/lib/gamification";
import { loadCharacter } from "@/lib/store";
import XpBar from "./XpBar";
import SkyrimAvatar from "./SkyrimAvatar";

interface SidebarProps {
  user: User;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "🏠" },
  { id: "modules", label: "Módulos", icon: "📚" },
  { id: "challenges", label: "Desafios", icon: "⚔️" },
  { id: "skill-tasks", label: "Habilidades", icon: "🎯" },
  { id: "social-selling", label: "Social Selling", icon: "📱" },
  { id: "agent-studio", label: "Estúdio de Conteúdo", icon: "🎬" },
  { id: "character", label: "Personagem", icon: "🧙" },
  { id: "badges", label: "Conquistas", icon: "🏅" },
  { id: "leaderboard", label: "Ranking", icon: "🏆" },
];

export default function Sidebar({ user, currentPage, onNavigate }: SidebarProps) {
  const rank = getRank(user.level);
  const character = loadCharacter();

  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col min-h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          MORF
        </h1>
        <p className="text-xs text-gray-500 mt-1">Sales Training</p>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-3 mb-3">
          <SkyrimAvatar user={user} character={character} size="sm" />
          <div>
            <p className="font-semibold text-white text-sm">{user.name}</p>
            <p className="text-xs text-gray-400">
              {rank.icon} {rank.name}
            </p>
          </div>
        </div>
        <XpBar user={user} />
        {user.streak > 0 && (
          <div className="mt-2 flex items-center gap-1 text-xs text-orange-400">
            <span>🔥</span>
            <span>{user.streak} dias de streak</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm mb-1 transition-all ${
              currentPage === item.id
                ? "bg-purple-600/20 text-purple-300 font-medium"
                : "text-gray-400 hover:bg-gray-800 hover:text-gray-300"
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Stats */}
      <div className="p-4 border-t border-gray-800">
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="bg-gray-800 rounded-lg p-2">
            <p className="text-lg font-bold text-white">{user.completedModules.length}</p>
            <p className="text-xs text-gray-500">Módulos</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-2">
            <p className="text-lg font-bold text-white">{user.unlockedBadges.length}</p>
            <p className="text-xs text-gray-500">Badges</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
