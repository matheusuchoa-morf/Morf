"use client";

import { useState } from "react";
import { Character, CharacterStats, SkillTask, User } from "@/types";
import { skillTasks } from "@/data/skillTasks";
import { completeSkillTask } from "@/lib/store";

interface SkillTasksPageProps {
  user: User;
  character: Character;
  onCharacterUpdate: (character: Character) => void;
  onXpEarned: (xp: number, message: string) => void;
}

const CATEGORY_ICONS: Record<string, string> = {
  carisma: "✨",
  persuasao: "💬",
  resiliencia: "🛡️",
  estrategia: "🧠",
  networking: "🌐",
};

const CATEGORY_COLORS: Record<string, string> = {
  carisma: "from-pink-600 to-rose-600",
  persuasao: "from-purple-600 to-violet-600",
  resiliencia: "from-blue-600 to-cyan-600",
  estrategia: "from-green-600 to-emerald-600",
  networking: "from-yellow-600 to-amber-600",
};

const DIFFICULTY_LABELS = {
  iniciante: { label: "Iniciante", color: "text-green-400 bg-green-400/10" },
  intermediario: { label: "Intermediário", color: "text-yellow-400 bg-yellow-400/10" },
  avancado: { label: "Avançado", color: "text-red-400 bg-red-400/10" },
};

interface TaskSessionProps {
  task: SkillTask;
  onComplete: (taskId: string, statBonus: Partial<CharacterStats>, xp: number) => void;
  onClose: () => void;
}

function TaskSession({ task, onComplete, onClose }: TaskSessionProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  const selected = task.options.find((o) => o.id === selectedOption);

  function handleReveal() {
    if (!selectedOption) return;
    setRevealed(true);
  }

  function handleComplete() {
    if (!selected) return;
    const bonus = selected.isCorrect ? { ...task.statReward, ...selected.statBonus } : selected.statBonus;
    onComplete(task.id, bonus, selected.isCorrect ? task.xpReward : Math.floor(task.xpReward * 0.3));
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl border border-gray-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className={`p-6 rounded-t-2xl bg-gradient-to-r ${CATEGORY_COLORS[task.category]}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">{CATEGORY_ICONS[task.category]}</span>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white text-2xl leading-none"
            >
              ×
            </button>
          </div>
          <h2 className="text-xl font-bold text-white">{task.title}</h2>
          <p className="text-white/80 text-sm mt-1">{task.description}</p>
        </div>

        <div className="p-6">
          {/* Scenario */}
          <div className="bg-gray-800 rounded-xl p-4 mb-6 border-l-4 border-purple-500">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Cenário</p>
            <p className="text-gray-200 text-sm leading-relaxed">{task.scenario}</p>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {task.options.map((option) => {
              const isSelected = selectedOption === option.id;
              let borderClass = "border-gray-700 hover:border-gray-600";
              if (revealed && isSelected) {
                borderClass = option.isCorrect
                  ? "border-green-500 bg-green-500/10"
                  : "border-red-500 bg-red-500/10";
              } else if (revealed && option.isCorrect) {
                borderClass = "border-green-500/50 bg-green-500/5";
              } else if (isSelected && !revealed) {
                borderClass = "border-purple-500 bg-purple-500/10";
              }

              return (
                <button
                  key={option.id}
                  onClick={() => !revealed && setSelectedOption(option.id)}
                  disabled={revealed}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${borderClass}`}
                >
                  <p className="text-sm text-gray-200">{option.text}</p>
                  {revealed && isSelected && (
                    <div className="mt-3 pt-3 border-t border-gray-700">
                      <p
                        className={`text-xs font-medium mb-1 ${
                          option.isCorrect ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {option.isCorrect ? "✓ Correto!" : "✗ Não ideal"}
                      </p>
                      <p className="text-xs text-gray-400">{option.feedback}</p>
                      {Object.keys(option.statBonus).length > 0 && (
                        <div className="flex gap-2 mt-2 flex-wrap">
                          {Object.entries(option.statBonus).map(([stat, val]) => (
                            <span key={stat} className="text-xs text-green-400">
                              +{val} {stat}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Actions */}
          {!revealed ? (
            <button
              onClick={handleReveal}
              disabled={!selectedOption}
              className={`w-full py-3 rounded-xl font-semibold transition-all ${
                selectedOption
                  ? "bg-purple-600 text-white hover:bg-purple-500"
                  : "bg-gray-800 text-gray-600 cursor-not-allowed"
              }`}
            >
              Confirmar Resposta
            </button>
          ) : (
            <div className="space-y-3">
              <div className="bg-gray-800 rounded-xl p-4 text-center">
                <p className="text-2xl mb-1">
                  {selected?.isCorrect ? "🎉" : "💡"}
                </p>
                <p className="text-white font-semibold">
                  {selected?.isCorrect
                    ? `+${task.xpReward} XP ganhos!`
                    : `+${Math.floor(task.xpReward * 0.3)} XP (aprenda com o erro)`}
                </p>
                {selected?.isCorrect && Object.keys(task.statReward).length > 0 && (
                  <div className="flex justify-center gap-3 mt-2 flex-wrap">
                    {Object.entries(task.statReward).map(([stat, val]) => (
                      <span key={stat} className="text-xs text-purple-400">
                        +{val} {stat}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={handleComplete}
                className="w-full py-3 rounded-xl font-semibold bg-green-600 text-white hover:bg-green-500 transition-all"
              >
                Continuar →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SkillTasksPage({
  user,
  character,
  onCharacterUpdate,
  onXpEarned,
}: SkillTasksPageProps) {
  const [activeCategory, setActiveCategory] = useState<string>("todos");
  const [activeTask, setActiveTask] = useState<SkillTask | null>(null);

  const categories = ["todos", "carisma", "persuasao", "resiliencia", "estrategia", "networking"];

  const filteredTasks =
    activeCategory === "todos"
      ? skillTasks
      : skillTasks.filter((t) => t.category === activeCategory);

  const availableTasks = filteredTasks.filter(
    (t) => user.level >= t.requiredLevel
  );

  function handleTaskComplete(
    taskId: string,
    statBonus: Partial<CharacterStats>,
    xp: number
  ) {
    const updated = completeSkillTask(character, taskId, statBonus);
    onCharacterUpdate(updated);
    onXpEarned(xp, "Habilidade treinada!");
    setActiveTask(null);
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white mb-2">
          🎯 Treino de Habilidades
        </h1>
        <p className="text-gray-400">
          Pratique cenários reais de vendas e evolua seus atributos
        </p>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
        {(Object.keys(CATEGORY_ICONS) as (keyof typeof CATEGORY_ICONS)[]).map((cat) => {
          const total = skillTasks.filter((t) => t.category === cat).length;
          const done = character.completedSkillTasks.filter((id) =>
            skillTasks.find((t) => t.id === id && t.category === cat)
          ).length;
          return (
            <div key={cat} className="bg-gray-900 rounded-xl border border-gray-800 p-3 text-center">
              <p className="text-xl mb-1">{CATEGORY_ICONS[cat]}</p>
              <p className="text-xs text-gray-400 capitalize mb-1">{cat}</p>
              <p className="text-sm font-bold text-white">
                {done}/{total}
              </p>
            </div>
          );
        })}
      </div>

      {/* Category filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
              activeCategory === cat
                ? "bg-purple-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {cat === "todos"
              ? "Todos"
              : `${CATEGORY_ICONS[cat]} ${cat}`}
          </button>
        ))}
      </div>

      {/* Tasks grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTasks.map((task) => {
          const isCompleted = character.completedSkillTasks.includes(task.id);
          const isAvailable = user.level >= task.requiredLevel;
          const diff = DIFFICULTY_LABELS[task.difficulty];

          return (
            <div
              key={task.id}
              className={`bg-gray-900 rounded-xl border p-5 transition-all ${
                isCompleted
                  ? "border-green-800/50 bg-green-900/5"
                  : isAvailable
                  ? "border-gray-800 hover:border-gray-700 cursor-pointer"
                  : "border-gray-800 opacity-50 cursor-not-allowed"
              }`}
              onClick={() => isAvailable && !isCompleted && setActiveTask(task)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{CATEGORY_ICONS[task.category]}</span>
                  <div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${diff.color}`}
                    >
                      {diff.label}
                    </span>
                  </div>
                </div>
                {isCompleted && (
                  <span className="text-green-400 text-lg">✓</span>
                )}
                {!isAvailable && (
                  <span className="text-xs text-gray-600">
                    Lv.{task.requiredLevel}
                  </span>
                )}
              </div>

              <h3 className="font-semibold text-white mb-1">{task.title}</h3>
              <p className="text-sm text-gray-400 mb-3">{task.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex gap-2 flex-wrap">
                  {Object.entries(task.statReward).map(([stat, val]) => (
                    <span
                      key={stat}
                      className="text-xs text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded-full"
                    >
                      +{val} {stat}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-yellow-400 font-medium">
                  +{task.xpReward} XP
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active task session */}
      {activeTask && (
        <TaskSession
          task={activeTask}
          onComplete={handleTaskComplete}
          onClose={() => setActiveTask(null)}
        />
      )}
    </div>
  );
}
