"use client";

import { User, LeaderboardEntry } from "@/types";
import { getRank, formatXp } from "@/lib/gamification";

interface LeaderboardPageProps {
  user: User;
}

// Simulated leaderboard data
const mockLeaderboard: LeaderboardEntry[] = [
  { userId: "2", name: "Ana Silva", avatar: "👩‍💼", xp: 8500, level: 12, rank: 1 },
  { userId: "3", name: "Pedro Costa", avatar: "👨‍💻", xp: 7200, level: 10, rank: 2 },
  { userId: "4", name: "Mariana Santos", avatar: "👩‍🚀", xp: 6800, level: 9, rank: 3 },
  { userId: "5", name: "Lucas Oliveira", avatar: "🧑‍💼", xp: 5500, level: 8, rank: 4 },
  { userId: "6", name: "Juliana Lima", avatar: "👩‍🎓", xp: 4200, level: 7, rank: 5 },
  { userId: "7", name: "Rafael Souza", avatar: "🧔", xp: 3100, level: 5, rank: 6 },
  { userId: "8", name: "Camila Ferreira", avatar: "👩", xp: 2400, level: 4, rank: 7 },
  { userId: "9", name: "Bruno Almeida", avatar: "👨", xp: 1800, level: 3, rank: 8 },
  { userId: "10", name: "Fernanda Rocha", avatar: "👩‍🦰", xp: 900, level: 2, rank: 9 },
];

export default function LeaderboardPage({ user }: LeaderboardPageProps) {
  // Insert user into leaderboard
  const userEntry: LeaderboardEntry = {
    userId: user.id,
    name: user.name,
    avatar: user.avatar,
    xp: user.xp,
    level: user.level,
    rank: 0,
  };

  const allEntries = [...mockLeaderboard, userEntry]
    .sort((a, b) => b.xp - a.xp)
    .map((entry, index) => ({ ...entry, rank: index + 1 }));

  const userRank = allEntries.find((e) => e.userId === user.id)!.rank;

  return (
    <div>
      <h1 className="text-2xl font-black text-white mb-2">Ranking</h1>
      <p className="text-gray-400 mb-6">
        Sua posição: <span className="text-purple-400 font-bold">#{userRank}</span> de{" "}
        {allEntries.length} mentorados.
      </p>

      {/* Top 3 Podium */}
      <div className="flex justify-center items-end gap-4 mb-8">
        {allEntries.slice(0, 3).map((entry, index) => {
          const rank = getRank(entry.level);
          const heights = ["h-32", "h-40", "h-28"];
          const medals = ["🥈", "🥇", "🥉"];
          const order = [1, 0, 2]; // Silver, Gold, Bronze
          const pos = order[index];
          const e = allEntries[pos];
          const r = getRank(e.level);

          return (
            <div
              key={e.userId}
              className={`flex flex-col items-center ${
                e.userId === user.id ? "ring-2 ring-purple-500 rounded-xl" : ""
              }`}
            >
              <span className="text-3xl mb-2">{medals[pos]}</span>
              <div className="text-3xl mb-1">{e.avatar}</div>
              <p className="text-sm font-bold text-white">{e.name}</p>
              <p className="text-xs text-gray-400">
                {r.icon} Lv.{e.level}
              </p>
              <div
                className={`${heights[pos]} w-24 bg-gradient-to-t from-purple-600/20 to-purple-600/5 border border-purple-500/20 rounded-t-lg mt-2 flex items-end justify-center pb-2`}
              >
                <span className="text-sm font-bold text-purple-300">
                  {formatXp(e.xp)} XP
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Ranking */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden">
        {allEntries.map((entry) => {
          const rank = getRank(entry.level);
          const isUser = entry.userId === user.id;

          return (
            <div
              key={entry.userId}
              className={`flex items-center gap-4 px-5 py-4 border-b border-gray-800 last:border-b-0 ${
                isUser ? "bg-purple-600/10" : ""
              }`}
            >
              <span
                className={`w-8 text-center font-bold ${
                  entry.rank <= 3 ? "text-yellow-400" : "text-gray-500"
                }`}
              >
                #{entry.rank}
              </span>
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-lg">
                {entry.avatar}
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${isUser ? "text-purple-300" : "text-white"}`}>
                  {entry.name} {isUser && "(Você)"}
                </p>
                <p className="text-xs text-gray-500">
                  {rank.icon} {rank.name}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-white">{formatXp(entry.xp)} XP</p>
                <p className="text-xs text-gray-500">Nível {entry.level}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
