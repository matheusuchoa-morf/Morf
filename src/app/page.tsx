"use client";

import { useState, useEffect, useCallback } from "react";
import { Character, User } from "@/types";
import { loadUser, addXp, completeModule, completeChallenge, unlockBadge, loadCharacter, saveUser } from "@/lib/store";
import { challenges } from "@/data/challenges";
import { modules } from "@/data/modules";
import Sidebar from "@/components/Sidebar";
import XpNotification from "@/components/XpNotification";
import DashboardPage from "@/components/pages/DashboardPage";
import ModulesPage from "@/components/pages/ModulesPage";
import ChallengesPage from "@/components/pages/ChallengesPage";
import BadgesPage from "@/components/pages/BadgesPage";
import LeaderboardPage from "@/components/pages/LeaderboardPage";
import CharacterPage from "@/components/pages/CharacterPage";
import SkillTasksPage from "@/components/pages/SkillTasksPage";
import SocialSellingPage from "@/components/pages/SocialSellingPage";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [character, setCharacter] = useState<Character | null>(null);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [notification, setNotification] = useState<{
    xp: number;
    message: string;
  } | null>(null);

  useEffect(() => {
    setUser(loadUser());
    setCharacter(loadCharacter());
  }, []);

  const showNotification = useCallback((xp: number, message: string) => {
    setNotification({ xp, message });
  }, []);

  function checkLevelBadges(updated: User): User {
    if (updated.level >= 5) updated = unlockBadge(updated, "badge-level-5");
    if (updated.level >= 10) updated = unlockBadge(updated, "badge-level-10");
    if (updated.level >= 20) updated = unlockBadge(updated, "badge-level-20");
    if (updated.level >= 30) updated = unlockBadge(updated, "badge-level-30");
    if (updated.xp >= 1000) updated = unlockBadge(updated, "badge-xp-1000");
    if (updated.xp >= 10000) updated = unlockBadge(updated, "badge-xp-10000");
    return updated;
  }

  function handleModuleComplete(moduleId: string, xpEarned: number) {
    if (!user) return;
    let updated = addXp(user, xpEarned);
    updated = completeModule(updated, moduleId);

    if (updated.completedModules.length === 1) {
      updated = unlockBadge(updated, "badge-first-module");
    }
    if (updated.completedModules.length >= 5) {
      updated = unlockBadge(updated, "badge-five-modules");
    }
    if (updated.completedModules.length >= modules.length) {
      updated = unlockBadge(updated, "badge-all-modules");
    }
    updated = checkLevelBadges(updated);

    setUser(updated);
    showNotification(xpEarned, "Módulo completado!");
  }

  function handleChallengeComplete(challengeId: string, xpReward: number) {
    if (!user) return;
    const challenge = challenges.find((c) => c.id === challengeId);
    if (!challenge) return;

    let updated = addXp(user, xpReward);
    updated = completeChallenge(updated, challengeId);

    if (updated.completedChallenges.length === 1) {
      updated = unlockBadge(updated, "badge-first-challenge");
    }
    if (challenge.type === "boss") {
      updated = unlockBadge(updated, "badge-boss-killer");
    }
    updated = checkLevelBadges(updated);

    setUser(updated);
    showNotification(xpReward, "Desafio completado!");
  }

  function handleXpEarned(xp: number, message: string) {
    if (!user) return;
    let updated = addXp(user, xp);
    updated = checkLevelBadges(updated);
    setUser(updated);
    showNotification(xp, message);
  }

  if (!user || !character) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-pulse">⚡</div>
          <p className="text-gray-400">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0a0a0f]">
      <Sidebar
        user={user}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />

      <main className="flex-1 p-8 overflow-auto">
        {currentPage === "dashboard" && (
          <DashboardPage user={user} onNavigate={setCurrentPage} />
        )}
        {currentPage === "modules" && (
          <ModulesPage user={user} onModuleComplete={handleModuleComplete} />
        )}
        {currentPage === "challenges" && (
          <ChallengesPage
            user={user}
            onChallengeComplete={handleChallengeComplete}
          />
        )}
        {currentPage === "skill-tasks" && (
          <SkillTasksPage
            user={user}
            character={character}
            onCharacterUpdate={setCharacter}
            onXpEarned={handleXpEarned}
          />
        )}
        {currentPage === "social-selling" && (
          <SocialSellingPage
            user={user}
            character={character}
            onCharacterUpdate={setCharacter}
            onXpEarned={handleXpEarned}
          />
        )}
        {currentPage === "character" && (
          <CharacterPage
            user={user}
            character={character}
            onCharacterUpdate={setCharacter}
            onPhotoChange={(photo: string) => {
              const updated = { ...user, photo };
              saveUser(updated);
              setUser(updated);
            }}
          />
        )}
        {currentPage === "badges" && <BadgesPage user={user} />}
        {currentPage === "leaderboard" && <LeaderboardPage user={user} />}
      </main>

      {notification && (
        <XpNotification
          xp={notification.xp}
          message={notification.message}
          onDone={() => setNotification(null)}
        />
      )}
    </div>
  );
}
