"use client";

import { useState } from "react";
import { Character, CharacterStats, User } from "@/types";
import { EQUIPMENT_CATALOG, getAvailableEquipment } from "@/data/character";
import { equipItem } from "@/lib/store";
import CharacterView from "@/components/CharacterView";

interface CharacterPageProps {
  user: User;
  character: Character;
  onCharacterUpdate: (character: Character) => void;
}

const SLOT_LABELS: Record<string, string> = {
  head: "Cabeça",
  body: "Corpo",
  accessory: "Acessório",
  tool: "Ferramenta",
};

export default function CharacterPage({
  user,
  character,
  onCharacterUpdate,
}: CharacterPageProps) {
  const [activeTab, setActiveTab] = useState<"character" | "equipment">(
    "character"
  );
  const [selectedSlot, setSelectedSlot] = useState<string>("head");

  const availableEquipment = getAvailableEquipment(user.level);
  const slotItems = availableEquipment.filter((e) => e.slot === selectedSlot);

  function handleEquip(equipmentId: string, slot: string) {
    const updated = equipItem(character, equipmentId, slot);
    onCharacterUpdate(updated);
  }

  const equippedInSlot = character.equipment.find((id) =>
    slotItems.some((e) => e.id === id)
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white mb-2">
          ⚔️ Meu Personagem
        </h1>
        <p className="text-gray-400">
          Evolua seus atributos completando treinos e missões de social selling
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(["character", "equipment"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab
                ? "bg-purple-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {tab === "character" ? "👤 Personagem" : "🛡️ Equipamentos"}
          </button>
        ))}
      </div>

      {activeTab === "character" && (
        <CharacterView character={character} user={user} />
      )}

      {activeTab === "equipment" && (
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
          <h2 className="text-xl font-bold text-white mb-6">
            Gerenciar Equipamentos
          </h2>

          {/* Slot selector */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {Object.entries(SLOT_LABELS).map(([slot, label]) => (
              <button
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedSlot === slot
                    ? "bg-purple-600 text-white"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Equipment grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {EQUIPMENT_CATALOG.filter((e) => e.slot === selectedSlot).map(
              (item) => {
                const isEquipped = character.equipment.includes(item.id);
                const isAvailable = user.level >= item.requiredLevel;

                return (
                  <div
                    key={item.id}
                    className={`rounded-xl p-4 border transition-all ${
                      isEquipped
                        ? "border-purple-500 bg-purple-600/10"
                        : isAvailable
                        ? "border-gray-700 bg-gray-800 hover:border-gray-600"
                        : "border-gray-800 bg-gray-800/50 opacity-50"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{item.icon}</span>
                        <div>
                          <h3 className="font-semibold text-white text-sm">
                            {item.name}
                          </h3>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {item.description}
                          </p>
                          <div className="flex gap-2 mt-1 flex-wrap">
                            {Object.entries(item.statBonus).map(([stat, val]) => (
                              <span
                                key={stat}
                                className="text-xs text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full"
                              >
                                +{val} {stat}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {!isAvailable && (
                          <span className="text-xs text-gray-500">
                            Lv.{item.requiredLevel}
                          </span>
                        )}
                        {isAvailable && (
                          <button
                            onClick={() => handleEquip(item.id, item.slot)}
                            disabled={isEquipped}
                            className={`text-xs px-3 py-1.5 rounded-lg transition-all ${
                              isEquipped
                                ? "bg-purple-600/30 text-purple-300 cursor-default"
                                : "bg-purple-600 text-white hover:bg-purple-500"
                            }`}
                          >
                            {isEquipped ? "✓ Equipado" : "Equipar"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>

          {/* All catalog items above level */}
          {EQUIPMENT_CATALOG.filter(
            (e) => e.slot === selectedSlot && user.level < e.requiredLevel
          ).length > 0 && (
            <p className="text-xs text-gray-600 mt-4 text-center">
              Alguns equipamentos estão bloqueados. Continue evoluindo para desbloqueá-los!
            </p>
          )}
        </div>
      )}
    </div>
  );
}
