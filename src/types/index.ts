export interface User {
  id: string;
  name: string;
  avatar: string;
  photo?: string; // base64 photo for Skyrim avatar
  level: number;
  xp: number;
  xpToNextLevel: number;
  streak: number;
  completedModules: string[];
  completedChallenges: string[];
  unlockedBadges: string[];
  rank: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: ModuleCategory;
  difficulty: "iniciante" | "intermediario" | "avancado";
  xpReward: number;
  lessons: Lesson[];
  requiredLevel: number;
  estimatedMinutes: number;
}

export type ModuleCategory =
  | "prospecção"
  | "qualificação"
  | "negociação"
  | "fechamento"
  | "pós-venda"
  | "mindset";

export interface Lesson {
  id: string;
  title: string;
  content: string;
  type: "teoria" | "prática" | "quiz";
  xpReward: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: "diario" | "semanal" | "boss";
  xpReward: number;
  icon: string;
  tasks: ChallengeTask[];
  requiredLevel: number;
}

export interface ChallengeTask {
  id: string;
  description: string;
  completed: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: "comum" | "raro" | "épico" | "lendário";
  condition: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  xpReward: number;
}

export interface LeaderboardEntry {
  userId: string;
  name: string;
  avatar: string;
  xp: number;
  level: number;
  rank: number;
}

// Character System (Habitica-style)
export interface CharacterStats {
  carisma: number;
  persuasao: number;
  resiliencia: number;
  estrategia: number;
  networking: number;
}

export interface CharacterEquipment {
  id: string;
  name: string;
  slot: "head" | "body" | "accessory" | "tool";
  icon: string;
  statBonus: Partial<CharacterStats>;
  requiredLevel: number;
  description: string;
}

export interface CharacterAppearance {
  skinColor: string;
  hairStyle: string;
  outfit: string;
  aura: string;
}

export interface Character {
  stats: CharacterStats;
  equipment: string[];
  title: string;
  appearance: CharacterAppearance;
  skillPoints: number;
  completedSkillTasks: string[];
  completedSocialSelling: string[];
  completedCarousels: string[];
}

// Skill Tasks (Multiple Choice Training)
export interface SkillTask {
  id: string;
  title: string;
  description: string;
  category: "carisma" | "persuasao" | "resiliencia" | "estrategia" | "networking";
  difficulty: "iniciante" | "intermediario" | "avancado";
  scenario: string;
  options: SkillTaskOption[];
  xpReward: number;
  statReward: Partial<CharacterStats>;
  requiredLevel: number;
}

export interface SkillTaskOption {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback: string;
  statBonus: Partial<CharacterStats>;
}

// Social Selling (Prova Real - Instagram)
export interface ProspectPersona {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  industry: string;
  painPoints: string[];
  interests: string[];
  objections: string[];
  buyingSignals: string[];
  personality: "receptivo" | "cético" | "ocupado" | "analítico";
  difficulty: "iniciante" | "intermediario" | "avancado";
}

export interface ConversationMessage {
  id: string;
  sender: "user" | "prospect";
  text: string;
  timestamp: number;
  reaction?: string;
}

export interface MessageOption {
  id: string;
  text: string;
  type: "abertura" | "rapport" | "qualificacao" | "valor" | "cta" | "objecao";
  effectiveness: number; // 0-100
  prospectResponse: string;
  scoreImpact: number;
  statBonus: Partial<CharacterStats>;
}

export interface SocialSellingScenario {
  id: string;
  title: string;
  description: string;
  prospect: ProspectPersona;
  stages: ConversationStage[];
  xpReward: number;
  requiredLevel: number;
  maxScore: number;
}

export interface ConversationStage {
  id: string;
  stageName: string;
  context: string;
  prospectMessage: string;
  options: MessageOption[];
  tip?: string;
}

// === Carousel Story Agents System ===

export interface BusinessStory {
  id: string;
  company: string;
  industry: string;
  country: string;
  protagonist: string;
  title: string;
  summary: string;
  keyMetrics: string[];
  conflictPoint: string;
  resolution: string;
  tags: string[];
}

export interface CarouselSlide {
  id: string;
  position: number;
  text: string;
  charCount: number;
  narrativeRole: "hook" | "context" | "tension" | "climax" | "insight" | "cta";
  needsImage: boolean;
  imageKeyword?: string;
  imageUrl?: string;
}

export interface CarouselTheme {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  bgGradient: string;
  textColor: string;
  accentColor: string;
}

export interface CarouselAgentOption {
  id: string;
  text: string;
  description: string;
  effectiveness: number;
  scoreImpact: number;
  statBonus: Partial<CharacterStats>;
}

export interface CarouselAgentStep {
  id: string;
  agentName: string;
  agentRole: string;
  agentIcon: string;
  stageName: string;
  context: string;
  options: CarouselAgentOption[];
  tip?: string;
}

export interface CarouselScenario {
  id: string;
  title: string;
  description: string;
  story: BusinessStory;
  theme: CarouselTheme;
  agentSteps: CarouselAgentStep[];
  slides: CarouselSlide[];
  xpReward: number;
  requiredLevel: number;
  maxScore: number;
  difficulty: "iniciante" | "intermediario" | "avancado";
}

export const RANKS = [
  { name: "Estagiário", minLevel: 1, icon: "🌱" },
  { name: "SDR Iniciante", minLevel: 3, icon: "📞" },
  { name: "Vendedor Junior", minLevel: 5, icon: "💼" },
  { name: "Closer", minLevel: 8, icon: "🤝" },
  { name: "Account Executive", minLevel: 12, icon: "📊" },
  { name: "Sales Manager", minLevel: 16, icon: "👔" },
  { name: "Head de Vendas", minLevel: 20, icon: "🏆" },
  { name: "VP de Vendas", minLevel: 25, icon: "⭐" },
  { name: "CRO", minLevel: 30, icon: "👑" },
] as const;

export const LEVEL_XP_TABLE: Record<number, number> = {
  1: 0,
  2: 100,
  3: 250,
  4: 450,
  5: 700,
  6: 1000,
  7: 1400,
  8: 1900,
  9: 2500,
  10: 3200,
  11: 4000,
  12: 5000,
  13: 6200,
  14: 7600,
  15: 9200,
  16: 11000,
  17: 13000,
  18: 15500,
  19: 18500,
  20: 22000,
  21: 26000,
  22: 30500,
  23: 35500,
  24: 41000,
  25: 47000,
  26: 54000,
  27: 62000,
  28: 71000,
  29: 81000,
  30: 92000,
};
