// Agent IDs
export type AgentId =
  | 'orchestrator'
  | 'market-researcher'
  | 'competitor-analyst'
  | 'viral-scriptwriter'
  | 'hook-builder'
  | 'lead-magnet-architect'
  | 'performance-analyst'
  | 'content-planner'
  | 'quality-reviewer';

// Agent metadata
export interface AgentDefinition {
  id: AgentId;
  name: string;
  description: string;
  icon: string;
  color: string;
}

// Message between agents
export interface AgentMessage {
  from: AgentId;
  to: AgentId;
  type: 'task' | 'result' | 'review' | 'feedback';
  payload: string;
  timestamp: number;
}

// Result from an agent execution
export interface AgentResult {
  agentId: AgentId;
  status: 'success' | 'error' | 'needs_review';
  content: string;
  metadata?: Record<string, unknown>;
  score?: number;
}

// Pipeline step
export interface PipelineStep {
  id: string;
  agentId: AgentId;
  functionName: string;
  params: Record<string, unknown>;
  dependsOn?: string[];
  status: 'pending' | 'running' | 'completed' | 'failed';
  result?: AgentResult;
}

// Full pipeline
export interface Pipeline {
  id: string;
  userRequest: string;
  steps: PipelineStep[];
  status: 'pending' | 'running' | 'completed' | 'failed';
  finalResult?: string;
  qaScore?: number;
  createdAt: number;
}

// User content profile for agent context
export interface ContentProfile {
  niche: string;
  targetAudience: string;
  brandTone: string;
  competitors: string[];
  contentPillars: string[];
  objectives: string[];
}

// API request/response
export interface AgentRequest {
  userMessage: string;
  profile?: ContentProfile;
  agentId?: AgentId;
  conversationHistory?: { role: 'user' | 'assistant'; content: string }[];
}

export interface AgentStreamEvent {
  type: 'agent_start' | 'agent_output' | 'agent_complete' | 'pipeline_update' | 'final_result' | 'error';
  agentId?: AgentId;
  content?: string;
  pipeline?: Pipeline;
  score?: number;
}

// Agent definitions registry
export const AGENTS: Record<AgentId, AgentDefinition> = {
  orchestrator: {
    id: 'orchestrator',
    name: 'Orquestrador',
    description: 'Coordena todos os agentes e gerencia o fluxo de trabalho',
    icon: '🎯',
    color: 'purple',
  },
  'market-researcher': {
    id: 'market-researcher',
    name: 'Pesquisador de Mercado',
    description: 'Tendências, formatos inovadores e referências',
    icon: '🔍',
    color: 'blue',
  },
  'competitor-analyst': {
    id: 'competitor-analyst',
    name: 'Analista de Concorrência',
    description: 'Mapeamento de concorrentes e benchmarking',
    icon: '📊',
    color: 'green',
  },
  'viral-scriptwriter': {
    id: 'viral-scriptwriter',
    name: 'Roteirista Viral',
    description: 'Scripts para Reels, Carrosséis e Stories',
    icon: '✍️',
    color: 'orange',
  },
  'hook-builder': {
    id: 'hook-builder',
    name: 'Construtor de Hooks',
    description: 'Ganchos de alto impacto nos primeiros 3 segundos',
    icon: '🪝',
    color: 'red',
  },
  'lead-magnet-architect': {
    id: 'lead-magnet-architect',
    name: 'Arquiteto de Iscas',
    description: 'Lead magnets para captar leads qualificados',
    icon: '🧲',
    color: 'pink',
  },
  'performance-analyst': {
    id: 'performance-analyst',
    name: 'Analista de Performance',
    description: 'Métricas, análise e sugestões de melhoria',
    icon: '📈',
    color: 'cyan',
  },
  'content-planner': {
    id: 'content-planner',
    name: 'Planejador de Conteúdo',
    description: 'Calendário editorial e viabilidade de produção',
    icon: '📅',
    color: 'yellow',
  },
  'quality-reviewer': {
    id: 'quality-reviewer',
    name: 'QA - Revisor',
    description: 'Validação de qualidade, tom, CTA e consistência',
    icon: '✅',
    color: 'emerald',
  },
};
