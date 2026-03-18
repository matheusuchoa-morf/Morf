"use client";

import { useState } from "react";
import { Module } from "@/types";
import { quizzes } from "@/data/quizzes";
import QuizView from "./QuizView";

interface LessonViewProps {
  module: Module;
  onComplete: (xpEarned: number) => void;
  onBack: () => void;
}

export default function LessonView({ module, onComplete, onBack }: LessonViewProps) {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [totalXpEarned, setTotalXpEarned] = useState(0);

  const lesson = module.lessons[currentLesson];
  const isLastLesson = currentLesson === module.lessons.length - 1;
  const quizQuestions = lesson.type === "quiz" ? quizzes[lesson.id] : null;

  function handleLessonComplete(bonusXp = 0) {
    const xp = lesson.xpReward + bonusXp;
    setTotalXpEarned((prev) => prev + xp);

    if (isLastLesson) {
      onComplete(totalXpEarned + xp + module.xpReward);
    } else {
      setCurrentLesson((prev) => prev + 1);
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-white transition-colors"
        >
          ← Voltar
        </button>
        <div>
          <h2 className="text-xl font-bold text-white">
            {module.icon} {module.title}
          </h2>
          <p className="text-sm text-gray-400">
            Aula {currentLesson + 1} de {module.lessons.length}
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="w-full bg-gray-700 rounded-full h-1.5 mb-8">
        <div
          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
          style={{
            width: `${((currentLesson + 1) / module.lessons.length) * 100}%`,
          }}
        />
      </div>

      {/* Lesson Title */}
      <h3 className="text-lg font-bold text-white mb-6">{lesson.title}</h3>

      {/* Content */}
      {lesson.type === "quiz" && quizQuestions ? (
        <QuizView
          questions={quizQuestions}
          onComplete={(quizXp) => handleLessonComplete(quizXp)}
        />
      ) : (
        <div>
          <div className="prose prose-invert prose-sm max-w-none mb-8">
            {lesson.content.split("\n").map((line, i) => {
              if (line.startsWith("## "))
                return (
                  <h2 key={i} className="text-xl font-bold text-white mt-6 mb-3">
                    {line.replace("## ", "")}
                  </h2>
                );
              if (line.startsWith("### "))
                return (
                  <h3 key={i} className="text-lg font-semibold text-purple-300 mt-4 mb-2">
                    {line.replace("### ", "")}
                  </h3>
                );
              if (line.startsWith("**") && line.endsWith("**"))
                return (
                  <p key={i} className="font-bold text-white mt-3">
                    {line.replace(/\*\*/g, "")}
                  </p>
                );
              if (line.startsWith("> "))
                return (
                  <blockquote
                    key={i}
                    className="border-l-4 border-purple-500 pl-4 italic text-gray-300 my-3"
                  >
                    {line.replace("> ", "")}
                  </blockquote>
                );
              if (line.startsWith("- "))
                return (
                  <li key={i} className="text-gray-300 ml-4">
                    {line.replace("- ", "")}
                  </li>
                );
              if (line.startsWith("| "))
                return (
                  <p key={i} className="text-gray-400 font-mono text-xs">
                    {line}
                  </p>
                );
              if (line.trim() === "") return <br key={i} />;
              return (
                <p key={i} className="text-gray-300 leading-relaxed">
                  {line}
                </p>
              );
            })}
          </div>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-800">
            <span className="text-sm text-purple-400">+{lesson.xpReward} XP</span>
            <button
              onClick={() => handleLessonComplete()}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-500 hover:to-pink-500 transition-all"
            >
              {isLastLesson ? "Concluir Módulo" : "Próxima Aula →"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
