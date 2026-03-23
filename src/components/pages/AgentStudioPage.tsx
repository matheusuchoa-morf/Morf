"use client";

import { useState, useRef, useEffect } from "react";
import { AgentId, AGENTS, Pipeline, ContentProfile } from "@/lib/agents/types";

interface AgentStudioPageProps {
  onXpEarned?: (xp: number, message: string) => void;
}

const QUICK_ACTIONS = [
  { label: "Reel Viral", prompt: "Crie um roteiro de Reel viral sobre ", icon: "🎬" },
  { label: "Carrossel", prompt: "Crie um carrossel educativo sobre ", icon: "📑" },
  { label: "Hooks", prompt: "Gere 5 hooks de alto impacto sobre ", icon: "🪝" },
  { label: "Isca Digital", prompt: "Projete uma isca digital para captar leads sobre ", icon: "🧲" },
  { label: "Calendário", prompt: "Crie um calendário editorial semanal para ", icon: "📅" },
  { label: "Concorrentes", prompt: "Analise os concorrentes no nicho de ", icon: "📊" },
];

const AGENT_COLORS: Record<string, string> = {
  purple: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  blue: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  green: "bg-green-500/20 text-green-300 border-green-500/30",
  orange: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  red: "bg-red-500/20 text-red-300 border-red-500/30",
  pink: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  cyan: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  yellow: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  emerald: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
};

const STATUS_COLORS = {
  pending: "bg-gray-600",
  running: "bg-yellow-500 animate-pulse",
  completed: "bg-green-500",
  failed: "bg-red-500",
};

export default function AgentStudioPage({ onXpEarned }: AgentStudioPageProps) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pipeline, setPipeline] = useState<Pipeline | null>(null);
  const [finalResult, setFinalResult] = useState<string | null>(null);
  const [qaScore, setQaScore] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [profile, setProfile] = useState<ContentProfile>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("morf-content-profile");
      if (saved) return JSON.parse(saved);
    }
    return {
      niche: "",
      targetAudience: "",
      brandTone: "",
      competitors: [],
      contentPillars: [],
      objectives: [],
    };
  });
  const [history, setHistory] = useState<
    { request: string; result: string; score?: number; timestamp: number }[]
  >(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("morf-agent-history");
      if (saved) return JSON.parse(saved);
    }
    return [];
  });
  const [showHistory, setShowHistory] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (profile.niche) {
      localStorage.setItem("morf-content-profile", JSON.stringify(profile));
    }
  }, [profile]);

  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem("morf-agent-history", JSON.stringify(history.slice(0, 20)));
    }
  }, [history]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setFinalResult(null);
    setQaScore(null);
    setPipeline(null);

    try {
      const hasProfile = profile.niche && profile.targetAudience;
      const response = await fetch("/api/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userMessage: input,
          profile: hasProfile ? profile : undefined,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Erro ao processar pedido");
      }

      const data = await response.json();
      setPipeline(data.pipeline);
      setFinalResult(data.finalResult);
      setQaScore(data.qaScore ?? null);

      // Save to history
      setHistory((prev) => [
        {
          request: input,
          result: data.finalResult,
          score: data.qaScore,
          timestamp: Date.now(),
        },
        ...prev,
      ]);

      // Award XP
      if (onXpEarned && data.qaScore) {
        const xp = Math.round(data.qaScore * 0.5);
        onXpEarned(xp, "Conteúdo produzido pelo Estúdio!");
      }

      // Scroll to result
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth" }), 300);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  }

  function handleQuickAction(prompt: string) {
    setInput(prompt);
  }

  function getScoreColor(score: number): string {
    if (score >= 90) return "text-green-400";
    if (score >= 80) return "text-emerald-400";
    if (score >= 70) return "text-yellow-400";
    if (score >= 60) return "text-orange-400";
    return "text-red-400";
  }

  function getScoreLabel(score: number): string {
    if (score >= 90) return "Excelente";
    if (score >= 80) return "Bom";
    if (score >= 70) return "Satisfatório";
    if (score >= 60) return "Abaixo da média";
    return "Insuficiente";
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <span className="text-4xl">🎬</span>
          Estúdio de Conteúdo
        </h1>
        <p className="text-gray-400 mt-2">
          Sistema multi-agente para produção de conteúdo no Instagram
        </p>
      </div>

      {/* Agent Cards */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {(Object.values(AGENTS) as { id: AgentId; name: string; description: string; icon: string; color: string }[])
          .filter((a) => a.id !== "orchestrator")
          .map((agent) => {
            const stepStatus = pipeline?.steps.find((s) => s.agentId === agent.id)?.status;
            return (
              <div
                key={agent.id}
                className={`rounded-lg border p-3 transition-all ${
                  AGENT_COLORS[agent.color] || "bg-gray-800 text-gray-300 border-gray-700"
                } ${stepStatus === "running" ? "ring-2 ring-yellow-400/50" : ""}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-lg">{agent.icon}</span>
                  {stepStatus && (
                    <span className={`w-2.5 h-2.5 rounded-full ${STATUS_COLORS[stepStatus]}`} />
                  )}
                </div>
                <p className="text-sm font-medium">{agent.name}</p>
                <p className="text-xs opacity-60 mt-0.5">{agent.description}</p>
              </div>
            );
          })}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2 mb-6">
        {QUICK_ACTIONS.map((action) => (
          <button
            key={action.label}
            onClick={() => handleQuickAction(action.prompt)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-full text-sm text-gray-300 transition-colors"
          >
            <span>{action.icon}</span>
            {action.label}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="Descreva o conteúdo que você quer produzir..."
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
              rows={3}
              disabled={isLoading}
            />
          </div>
          <div className="flex flex-col gap-2">
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 disabled:text-gray-500 text-white font-medium rounded-xl transition-colors"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Produzindo...
                </span>
              ) : (
                "Produzir"
              )}
            </button>
            <button
              type="button"
              onClick={() => setShowProfile(!showProfile)}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-400 text-sm rounded-xl transition-colors"
            >
              {showProfile ? "Fechar Perfil" : "Meu Perfil"}
            </button>
            <button
              type="button"
              onClick={() => setShowHistory(!showHistory)}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-400 text-sm rounded-xl transition-colors"
            >
              Histórico
            </button>
          </div>
        </div>
      </form>

      {/* Profile Editor */}
      {showProfile && (
        <div className="mb-6 bg-gray-900 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Perfil de Conteúdo</h3>
          <p className="text-sm text-gray-400 mb-4">
            Configure seu perfil para que os agentes gerem conteúdo mais alinhado com sua marca.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Nicho</label>
              <input
                type="text"
                value={profile.niche}
                onChange={(e) => setProfile({ ...profile, niche: e.target.value })}
                placeholder="Ex: Vendas B2B, Marketing Digital"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Público-Alvo</label>
              <input
                type="text"
                value={profile.targetAudience}
                onChange={(e) => setProfile({ ...profile, targetAudience: e.target.value })}
                placeholder="Ex: Empreendedores, Mentores"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Tom da Marca</label>
              <input
                type="text"
                value={profile.brandTone}
                onChange={(e) => setProfile({ ...profile, brandTone: e.target.value })}
                placeholder="Ex: Profissional e direto, Descontraído"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Concorrentes (separados por vírgula)
              </label>
              <input
                type="text"
                value={profile.competitors.join(", ")}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    competitors: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                  })
                }
                placeholder="Ex: @perfil1, @perfil2"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Pilares de Conteúdo (separados por vírgula)
              </label>
              <input
                type="text"
                value={profile.contentPillars.join(", ")}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    contentPillars: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                  })
                }
                placeholder="Ex: Vendas, Mindset, Produtividade"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Objetivos (separados por vírgula)
              </label>
              <input
                type="text"
                value={profile.objectives.join(", ")}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    objectives: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                  })
                }
                placeholder="Ex: Gerar leads, Aumentar autoridade"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
              />
            </div>
          </div>
        </div>
      )}

      {/* History */}
      {showHistory && history.length > 0 && (
        <div className="mb-6 bg-gray-900 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Histórico</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {history.map((item, i) => (
              <button
                key={i}
                onClick={() => {
                  setFinalResult(item.result);
                  setQaScore(item.score ?? null);
                  setShowHistory(false);
                }}
                className="w-full text-left bg-gray-800 hover:bg-gray-750 rounded-lg p-3 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-white truncate flex-1">{item.request}</p>
                  <div className="flex items-center gap-2 ml-3">
                    {item.score && (
                      <span className={`text-sm font-medium ${getScoreColor(item.score)}`}>
                        {item.score}/100
                      </span>
                    )}
                    <span className="text-xs text-gray-500">
                      {new Date(item.timestamp).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Pipeline Visualization */}
      {pipeline && isLoading && (
        <div className="mb-6 bg-gray-900 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin" />
            Pipeline em execução
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            {pipeline.steps.map((step, i) => {
              const agent = AGENTS[step.agentId];
              return (
                <div key={step.id} className="flex items-center gap-2">
                  <div
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                      AGENT_COLORS[agent.color] || "bg-gray-800 text-gray-300 border-gray-700"
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${STATUS_COLORS[step.status]}`} />
                    <span className="text-sm">{agent.icon}</span>
                    <span className="text-sm">{agent.name}</span>
                  </div>
                  {i < pipeline.steps.length - 1 && (
                    <span className="text-gray-600">→</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl p-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Result */}
      {finalResult && (
        <div ref={resultRef} className="mb-6">
          {/* QA Score */}
          {qaScore !== null && (
            <div className="mb-4 bg-gray-900 border border-gray-700 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Score QA</p>
                <p className={`text-3xl font-bold ${getScoreColor(qaScore)}`}>
                  {qaScore}/100
                </p>
              </div>
              <div className="text-right">
                <p className={`text-lg font-medium ${getScoreColor(qaScore)}`}>
                  {getScoreLabel(qaScore)}
                </p>
                <p className="text-sm text-gray-500">Revisão de qualidade</p>
              </div>
            </div>
          )}

          {/* Result Content */}
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Resultado</h3>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(finalResult);
                }}
                className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-400 text-sm rounded-lg transition-colors"
              >
                Copiar
              </button>
            </div>
            <div className="prose prose-invert max-w-none">
              <div className="whitespace-pre-wrap text-gray-300 text-sm leading-relaxed">
                {finalResult}
              </div>
            </div>
          </div>

          {/* Pipeline Summary */}
          {pipeline && (
            <div className="mt-4 bg-gray-900 border border-gray-700 rounded-xl p-4">
              <p className="text-sm text-gray-400 mb-2">Agentes utilizados:</p>
              <div className="flex flex-wrap gap-2">
                {pipeline.steps.map((step) => {
                  const agent = AGENTS[step.agentId];
                  return (
                    <span
                      key={step.id}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border ${
                        AGENT_COLORS[agent.color] || "bg-gray-800 text-gray-300 border-gray-700"
                      }`}
                    >
                      <span>{agent.icon}</span>
                      {agent.name}
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${STATUS_COLORS[step.status]}`}
                      />
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
