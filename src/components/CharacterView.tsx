"use client";

import { Character, CharacterStats, User } from "@/types";
import { EQUIPMENT_CATALOG, getCharacterTitle } from "@/data/character";
import SkyrimAvatar from "./SkyrimAvatar";

interface CharacterViewProps {
  character: Character;
  user: User;
  onPhotoChange?: (photo: string) => void;
}

const STAT_ICONS: Record<keyof CharacterStats, string> = {
  carisma: "✨",
  persuasao: "💬",
  resiliencia: "🛡️",
  estrategia: "🧠",
  networking: "🌐",
};

const STAT_COLORS: Record<keyof CharacterStats, string> = {
  carisma: "from-pink-500 to-rose-500",
  persuasao: "from-purple-500 to-violet-500",
  resiliencia: "from-blue-500 to-cyan-500",
  estrategia: "from-green-500 to-emerald-500",
  networking: "from-yellow-500 to-amber-500",
};

const STAT_LABELS: Record<keyof CharacterStats, string> = {
  carisma: "Carisma",
  persuasao: "Persuasao",
  resiliencia: "Resiliencia",
  estrategia: "Estrategia",
  networking: "Networking",
};

const SLOT_LABELS: Record<string, string> = {
  head: "Elmo",
  body: "Armadura",
  accessory: "Amuleto",
  tool: "Arma",
};

export default function CharacterView({ character, user, onPhotoChange }: CharacterViewProps) {
  const title = getCharacterTitle(user.level);

  const equippedItems = EQUIPMENT_CATALOG.filter((e) =>
    character.equipment.includes(e.id)
  );

  const totalStats = { ...character.stats };
  for (const item of equippedItems) {
    for (const key of Object.keys(item.statBonus) as (keyof CharacterStats)[]) {
      totalStats[key] = (totalStats[key] || 0) + (item.statBonus[key] || 0);
    }
  }

  const maxStat = Math.max(...Object.values(totalStats), 10);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Character Portrait */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <SkyrimAvatar
              user={user}
              character={character}
              size="lg"
              editable={true}
              onPhotoChange={onPhotoChange}
            />
          </div>
          <h2 className="text-xl font-bold text-white mt-2">{user.name}</h2>
          <p className="text-amber-400 font-medium italic">&ldquo;{title}&rdquo;</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            {character.skillPoints > 0 && (
              <span className="text-xs bg-yellow-600/20 text-yellow-300 px-3 py-1 rounded-full border border-yellow-600/30">
                {character.skillPoints} pontos de habilidade
              </span>
            )}
          </div>
          {!user.photo && (
            <p className="text-xs text-gray-500 mt-3">
              Clique no icone da camera para enviar sua foto e criar seu guerreiro
            </p>
          )}
        </div>

        {/* Equipped Items - Skyrim style */}
        <div>
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Equipamento
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {(["head", "body", "accessory", "tool"] as const).map((slot) => {
              const item = equippedItems.find((e) => e.slot === slot);
              return (
                <div
                  key={slot}
                  className="bg-gray-800/80 rounded-xl p-3 border border-gray-700/50 hover:border-gray-600/50 transition-colors"
                >
                  <p className="text-xs text-amber-500/70 mb-1 font-medium">{SLOT_LABELS[slot]}</p>
                  {item ? (
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <p className="text-xs font-medium text-white leading-tight">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {Object.entries(item.statBonus)
                            .map(([k, v]) => `+${v} ${k}`)
                            .join(", ")}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-600 italic">Vazio</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
        <h3 className="text-lg font-bold text-white mb-6">Atributos</h3>
        <div className="space-y-4">
          {(Object.keys(STAT_ICONS) as (keyof CharacterStats)[]).map((stat) => {
            const value = totalStats[stat];
            const baseValue = character.stats[stat];
            const bonus = value - baseValue;
            const pct = Math.min((value / maxStat) * 100, 100);

            return (
              <div key={stat}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span>{STAT_ICONS[stat]}</span>
                    <span className="text-sm font-medium text-gray-300">
                      {STAT_LABELS[stat]}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-white font-bold text-sm">{value}</span>
                    {bonus > 0 && (
                      <span className="text-xs text-green-400">(+{bonus})</span>
                    )}
                  </div>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${STAT_COLORS[stat]} rounded-full transition-all duration-500`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Summary */}
        <div className="mt-6 pt-6 border-t border-gray-800">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-gray-800 rounded-xl p-3">
              <p className="text-xl font-bold text-white">
                {character.completedSkillTasks.length}
              </p>
              <p className="text-xs text-gray-500 mt-1">Habilidades</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-3">
              <p className="text-xl font-bold text-white">
                {character.completedSocialSelling.length}
              </p>
              <p className="text-xs text-gray-500 mt-1">Conversas</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-3">
              <p className="text-xl font-bold text-white">
                {Object.values(totalStats).reduce((a, b) => a + b, 0)}
              </p>
              <p className="text-xs text-gray-500 mt-1">Total Stats</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
