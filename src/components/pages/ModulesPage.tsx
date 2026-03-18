"use client";

import { useState } from "react";
import { User, ModuleCategory } from "@/types";
import { modules } from "@/data/modules";
import ModuleCard from "@/components/ModuleCard";
import LessonView from "@/components/LessonView";

interface ModulesPageProps {
  user: User;
  onModuleComplete: (moduleId: string, xpEarned: number) => void;
}

const categories: { id: ModuleCategory | "all"; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "prospecção", label: "Prospecção" },
  { id: "qualificação", label: "Qualificação" },
  { id: "negociação", label: "Negociação" },
  { id: "fechamento", label: "Fechamento" },
  { id: "pós-venda", label: "Pós-venda" },
  { id: "mindset", label: "Mindset" },
];

export default function ModulesPage({ user, onModuleComplete }: ModulesPageProps) {
  const [activeCategory, setActiveCategory] = useState<ModuleCategory | "all">("all");
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);

  const filtered =
    activeCategory === "all"
      ? modules
      : modules.filter((m) => m.category === activeCategory);

  const activeModule = activeModuleId
    ? modules.find((m) => m.id === activeModuleId)
    : null;

  if (activeModule) {
    return (
      <LessonView
        module={activeModule}
        onComplete={(xp) => {
          onModuleComplete(activeModule.id, xp);
          setActiveModuleId(null);
        }}
        onBack={() => setActiveModuleId(null)}
      />
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-black text-white mb-2">Módulos de Treinamento</h1>
      <p className="text-gray-400 mb-6">
        Evolua suas habilidades de vendas passo a passo.
      </p>

      {/* Category Filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1.5 rounded-full text-sm transition-all ${
              activeCategory === cat.id
                ? "bg-purple-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((mod) => (
          <ModuleCard
            key={mod.id}
            module={mod}
            completed={user.completedModules.includes(mod.id)}
            locked={mod.requiredLevel > user.level}
            onStart={setActiveModuleId}
          />
        ))}
      </div>
    </div>
  );
}
