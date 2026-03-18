"use client";

import { useState } from "react";
import { QuizQuestion } from "@/types";

interface QuizViewProps {
  questions: QuizQuestion[];
  onComplete: (totalXp: number) => void;
}

export default function QuizView({ questions, onComplete }: QuizViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [totalXp, setTotalXp] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const question = questions[currentIndex];
  const isCorrect = selectedAnswer === question.correctAnswer;
  const isLastQuestion = currentIndex === questions.length - 1;

  function handleAnswer(index: number) {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    if (index === question.correctAnswer) {
      setTotalXp((prev) => prev + question.xpReward);
      setCorrectCount((prev) => prev + 1);
    }
  }

  function handleNext() {
    if (isLastQuestion) {
      onComplete(totalXp);
      return;
    }
    setCurrentIndex((prev) => prev + 1);
    setSelectedAnswer(null);
    setShowResult(false);
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-gray-400">
          Pergunta {currentIndex + 1} de {questions.length}
        </span>
        <span className="text-sm text-purple-400">+{totalXp} XP</span>
      </div>

      <div className="w-full bg-gray-700 rounded-full h-1.5 mb-6">
        <div
          className="h-full rounded-full bg-purple-500 transition-all"
          style={{
            width: `${((currentIndex + (showResult ? 1 : 0)) / questions.length) * 100}%`,
          }}
        />
      </div>

      <h3 className="text-lg font-bold text-white mb-6">{question.question}</h3>

      <div className="space-y-3">
        {question.options.map((option, index) => {
          let style = "border-gray-700 bg-gray-800 hover:border-gray-500";
          if (showResult) {
            if (index === question.correctAnswer) {
              style = "border-green-500 bg-green-500/10";
            } else if (index === selectedAnswer && !isCorrect) {
              style = "border-red-500 bg-red-500/10";
            } else {
              style = "border-gray-800 bg-gray-900 opacity-50";
            }
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={showResult}
              className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${style}`}
            >
              <span className="text-sm text-gray-300">{option}</span>
            </button>
          );
        })}
      </div>

      {showResult && (
        <div
          className={`mt-4 p-4 rounded-lg border ${
            isCorrect
              ? "border-green-500/30 bg-green-500/5"
              : "border-red-500/30 bg-red-500/5"
          }`}
        >
          <p className="text-sm font-medium mb-1">
            {isCorrect ? (
              <span className="text-green-400">✓ Correto! +{question.xpReward} XP</span>
            ) : (
              <span className="text-red-400">✗ Incorreto</span>
            )}
          </p>
          <p className="text-sm text-gray-400">{question.explanation}</p>
        </div>
      )}

      {showResult && (
        <button
          onClick={handleNext}
          className="mt-6 w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-500 hover:to-pink-500 transition-all"
        >
          {isLastQuestion
            ? `Finalizar (${correctCount}/${questions.length} corretas)`
            : "Próxima pergunta"}
        </button>
      )}
    </div>
  );
}
