"use client";

import { useState } from "react";
import { Character, CharacterStats, ConversationMessage, MessageOption, SocialSellingScenario, User } from "@/types";
import { socialSellingScenarios } from "@/data/socialSelling";
import { completeSocialSelling } from "@/lib/store";

interface SocialSellingPageProps {
  user: User;
  character: Character;
  onCharacterUpdate: (character: Character) => void;
  onXpEarned: (xp: number, message: string) => void;
}

interface ScenarioSessionProps {
  scenario: SocialSellingScenario;
  onComplete: (scenarioId: string, statBonus: Partial<CharacterStats>, xp: number) => void;
  onClose: () => void;
}

const PERSONALITY_EMOJI: Record<string, string> = {
  receptivo: "😊",
  cético: "🤨",
  ocupado: "⏰",
  analítico: "🔍",
};

const OPTION_TYPE_COLORS: Record<string, string> = {
  abertura: "text-blue-400",
  rapport: "text-pink-400",
  qualificacao: "text-yellow-400",
  valor: "text-green-400",
  cta: "text-purple-400",
  objecao: "text-red-400",
};

const OPTION_TYPE_LABELS: Record<string, string> = {
  abertura: "Abertura",
  rapport: "Rapport",
  qualificacao: "Qualificação",
  valor: "Proposta de Valor",
  cta: "CTA",
  objecao: "Contra-objeção",
};

function ScenarioSession({ scenario, onComplete, onClose }: ScenarioSessionProps) {
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [totalStatBonus, setTotalStatBonus] = useState<Partial<CharacterStats>>({});
  const [completed, setCompleted] = useState(false);

  const currentStage = scenario.stages[currentStageIdx];
  const selected = currentStage?.options.find((o) => o.id === selectedOption);

  function handleReveal() {
    if (!selectedOption || !selected) return;
    setRevealed(true);

    const newScore = Math.max(0, score + selected.scoreImpact);
    setScore(newScore);

    const newBonus = { ...totalStatBonus };
    for (const key of Object.keys(selected.statBonus) as (keyof CharacterStats)[]) {
      newBonus[key] = (newBonus[key] || 0) + (selected.statBonus[key] || 0);
    }
    setTotalStatBonus(newBonus);

    // Add messages
    const userMsg: ConversationMessage = {
      id: `msg-${Date.now()}-u`,
      sender: "user",
      text: selected.text,
      timestamp: Date.now(),
    };
    const prospectMsg: ConversationMessage = {
      id: `msg-${Date.now()}-p`,
      sender: "prospect",
      text: selected.prospectResponse,
      timestamp: Date.now() + 1,
    };
    setMessages((prev) => [...prev, userMsg, ...(selected.prospectResponse ? [prospectMsg] : [])]);
  }

  function handleNext() {
    const nextIdx = currentStageIdx + 1;
    if (nextIdx >= scenario.stages.length) {
      setCompleted(true);
    } else {
      setCurrentStageIdx(nextIdx);
      setSelectedOption(null);
      setRevealed(false);
    }
  }

  function handleFinish() {
    const finalScore = Math.min(score, 100);
    const xpEarned = Math.floor(scenario.xpReward * (finalScore / 100));
    onComplete(scenario.id, totalStatBonus, xpEarned);
  }

  if (completed) {
    const finalScore = Math.min(score, 100);
    const xpEarned = Math.floor(scenario.xpReward * (finalScore / 100));
    const rating =
      finalScore >= 80 ? "🏆 Excelente" : finalScore >= 50 ? "👍 Bom" : "📚 Continue Praticando";

    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-900 rounded-2xl border border-gray-800 max-w-lg w-full p-8 text-center">
          <div className="text-5xl mb-4">{finalScore >= 80 ? "🎉" : finalScore >= 50 ? "💪" : "📖"}</div>
          <h2 className="text-2xl font-bold text-white mb-2">Conversa Concluída!</h2>
          <p className="text-gray-400 mb-6">{scenario.title}</p>

          <div className="bg-gray-800 rounded-xl p-6 mb-6">
            <div className="text-4xl font-black mb-1">
              <span className={finalScore >= 80 ? "text-green-400" : finalScore >= 50 ? "text-yellow-400" : "text-red-400"}>
                {finalScore}
              </span>
              <span className="text-gray-600">/100</span>
            </div>
            <p className="text-gray-400 text-sm mb-3">{rating}</p>
            <p className="text-yellow-400 font-semibold">+{xpEarned} XP</p>
          </div>

          {Object.keys(totalStatBonus).length > 0 && (
            <div className="flex justify-center gap-3 flex-wrap mb-6">
              {Object.entries(totalStatBonus).map(([stat, val]) => (
                <span key={stat} className="text-sm text-purple-400 bg-purple-400/10 px-3 py-1 rounded-full">
                  +{val} {stat}
                </span>
              ))}
            </div>
          )}

          <button
            onClick={handleFinish}
            className="w-full py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-500 transition-all"
          >
            Finalizar e coletar recompensas
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl border border-gray-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-xl">
              {scenario.prospect.avatar}
            </div>
            <div>
              <p className="font-semibold text-white text-sm">{scenario.prospect.name}</p>
              <p className="text-xs text-gray-400">{scenario.prospect.username}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-gray-400">Pontuação</p>
              <p className={`font-bold text-sm ${score >= 50 ? "text-green-400" : score >= 0 ? "text-yellow-400" : "text-red-400"}`}>
                {Math.max(0, Math.min(score, 100))}/100
              </p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">
              ×
            </button>
          </div>
        </div>

        {/* Stage indicator */}
        <div className="px-4 pt-4 flex gap-2">
          {scenario.stages.map((stage, idx) => (
            <div
              key={stage.id}
              className={`flex-1 h-1.5 rounded-full transition-all ${
                idx < currentStageIdx
                  ? "bg-green-500"
                  : idx === currentStageIdx
                  ? "bg-purple-500"
                  : "bg-gray-800"
              }`}
            />
          ))}
        </div>

        <div className="p-4">
          {/* Stage context */}
          <div className="bg-gray-800/50 rounded-xl p-3 mb-4 border border-gray-700/50">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
              {currentStage.stageName}
            </p>
            <p className="text-sm text-gray-300">{currentStage.context}</p>
          </div>

          {/* Conversation */}
          <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
            {/* Prospect opening message (if exists) */}
            {currentStage.prospectMessage && (
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-sm flex-shrink-0">
                  {scenario.prospect.avatar}
                </div>
                <div className="bg-gray-800 rounded-xl rounded-tl-sm p-3 max-w-xs">
                  <p className="text-sm text-gray-200">{currentStage.prospectMessage}</p>
                </div>
              </div>
            )}

            {/* Previous messages */}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-2 ${
                  msg.sender === "user" ? "flex-row-reverse" : ""
                }`}
              >
                {msg.sender === "prospect" && (
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-sm flex-shrink-0">
                    {scenario.prospect.avatar}
                  </div>
                )}
                <div
                  className={`rounded-xl p-3 max-w-xs text-sm ${
                    msg.sender === "user"
                      ? "bg-purple-600/30 text-white rounded-tr-sm"
                      : "bg-gray-800 text-gray-200 rounded-tl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Tip */}
          {currentStage.tip && !revealed && (
            <div className="bg-blue-900/20 border border-blue-800/40 rounded-xl p-3 mb-4">
              <p className="text-xs text-blue-400">
                <span className="font-semibold">💡 Dica: </span>
                {currentStage.tip}
              </p>
            </div>
          )}

          {/* Options */}
          {!revealed && (
            <div className="space-y-2 mb-4">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                Como você responde?
              </p>
              {currentStage.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedOption(option.id)}
                  className={`w-full text-left p-3 rounded-xl border text-sm transition-all ${
                    selectedOption === option.id
                      ? "border-purple-500 bg-purple-500/10 text-white"
                      : "border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-600"
                  }`}
                >
                  <span
                    className={`text-xs font-medium mr-2 ${OPTION_TYPE_COLORS[option.type]}`}
                  >
                    [{OPTION_TYPE_LABELS[option.type]}]
                  </span>
                  {option.text}
                </button>
              ))}
            </div>
          )}

          {/* Revealed feedback */}
          {revealed && selected && (
            <div
              className={`rounded-xl p-4 mb-4 border ${
                selected.scoreImpact > 0
                  ? "border-green-700/50 bg-green-900/10"
                  : selected.scoreImpact === 0
                  ? "border-yellow-700/50 bg-yellow-900/10"
                  : "border-red-700/50 bg-red-900/10"
              }`}
            >
              <p
                className={`text-sm font-semibold mb-1 ${
                  selected.scoreImpact > 0
                    ? "text-green-400"
                    : selected.scoreImpact === 0
                    ? "text-yellow-400"
                    : "text-red-400"
                }`}
              >
                {selected.scoreImpact > 0
                  ? `✓ Ótima escolha! (+${selected.scoreImpact} pts)`
                  : selected.scoreImpact === 0
                  ? "→ Neutro (0 pts)"
                  : `✗ Pode melhorar (${selected.scoreImpact} pts)`}
              </p>
              {selected.effectiveness < 70 && (
                <p className="text-xs text-gray-400">
                  Efetividade: {selected.effectiveness}%
                </p>
              )}
              {Object.keys(selected.statBonus).length > 0 && (
                <div className="flex gap-2 mt-2 flex-wrap">
                  {Object.entries(selected.statBonus).map(([stat, val]) => (
                    <span key={stat} className="text-xs text-purple-400">
                      +{val} {stat}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Action button */}
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
              Enviar Mensagem
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="w-full py-3 rounded-xl font-semibold bg-green-600 text-white hover:bg-green-500 transition-all"
            >
              {currentStageIdx < scenario.stages.length - 1
                ? "Próxima etapa →"
                : "Ver resultado"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SocialSellingPage({
  user,
  character,
  onCharacterUpdate,
  onXpEarned,
}: SocialSellingPageProps) {
  const [activeScenario, setActiveScenario] = useState<SocialSellingScenario | null>(null);

  function handleScenarioComplete(
    scenarioId: string,
    statBonus: Partial<CharacterStats>,
    xp: number
  ) {
    const updated = completeSocialSelling(character, scenarioId, statBonus);
    onCharacterUpdate(updated);
    onXpEarned(xp, "Conversa concluída!");
    setActiveScenario(null);
  }

  const DIFF_LABELS = {
    iniciante: { label: "Iniciante", color: "text-green-400 bg-green-400/10" },
    intermediario: { label: "Intermediário", color: "text-yellow-400 bg-yellow-400/10" },
    avancado: { label: "Avançado", color: "text-red-400 bg-red-400/10" },
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white mb-2">
          📱 Social Selling
        </h1>
        <p className="text-gray-400">
          Pratique conversas reais no Instagram com diferentes perfis de prospects
        </p>
      </div>

      {/* Info card */}
      <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/20 border border-purple-800/30 rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-bold text-white mb-2">
          🎭 Como funciona a Prova Real
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
          <div className="flex items-start gap-2">
            <span className="text-xl">💬</span>
            <p>Você conversa com prospects simulados no Instagram com personalidades distintas</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-xl">⭐</span>
            <p>Cada escolha de mensagem impacta sua pontuação e os atributos do personagem</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-xl">📊</span>
            <p>Quanto melhor a conversa, mais XP e stats você ganha</p>
          </div>
        </div>
      </div>

      {/* Scenarios grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {socialSellingScenarios.map((scenario) => {
          const isCompleted = character.completedSocialSelling.includes(scenario.id);
          const isAvailable = user.level >= scenario.requiredLevel;
          const diff = DIFF_LABELS[scenario.prospect.difficulty];

          return (
            <div
              key={scenario.id}
              className={`bg-gray-900 rounded-2xl border overflow-hidden transition-all ${
                isCompleted
                  ? "border-green-800/50"
                  : isAvailable
                  ? "border-gray-800 hover:border-gray-700 cursor-pointer"
                  : "border-gray-800 opacity-50 cursor-not-allowed"
              }`}
              onClick={() => isAvailable && !isCompleted && setActiveScenario(scenario)}
            >
              {/* Prospect header */}
              <div className="p-5 border-b border-gray-800">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-2xl">
                      {scenario.prospect.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{scenario.prospect.name}</p>
                      <p className="text-xs text-gray-400">{scenario.prospect.username}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${diff.color}`}>
                      {diff.label}
                    </span>
                    <span className="text-xs text-gray-500">
                      {PERSONALITY_EMOJI[scenario.prospect.personality]}{" "}
                      {scenario.prospect.personality}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 italic">"{scenario.prospect.bio}"</p>
              </div>

              {/* Scenario info */}
              <div className="p-5">
                <h3 className="font-bold text-white mb-1">{scenario.title}</h3>
                <p className="text-sm text-gray-400 mb-4">{scenario.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">
                      {scenario.stages.length} etapas
                    </span>
                    {!isAvailable && (
                      <span className="text-xs text-gray-600">
                        · Nível {scenario.requiredLevel}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {isCompleted && (
                      <span className="text-green-400 text-sm">✓ Concluído</span>
                    )}
                    <span className="text-xs text-yellow-400 font-medium">
                      +{scenario.xpReward} XP
                    </span>
                  </div>
                </div>

                {isAvailable && !isCompleted && (
                  <button className="w-full mt-4 py-2.5 rounded-xl bg-purple-600/20 text-purple-300 text-sm font-medium border border-purple-600/30 hover:bg-purple-600/30 transition-all">
                    Iniciar Conversa →
                  </button>
                )}
                {isCompleted && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveScenario(scenario);
                    }}
                    className="w-full mt-4 py-2.5 rounded-xl bg-gray-800 text-gray-400 text-sm font-medium hover:bg-gray-700 transition-all"
                  >
                    Praticar novamente
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Active scenario session */}
      {activeScenario && (
        <ScenarioSession
          scenario={activeScenario}
          onComplete={handleScenarioComplete}
          onClose={() => setActiveScenario(null)}
        />
      )}
    </div>
  );
}
