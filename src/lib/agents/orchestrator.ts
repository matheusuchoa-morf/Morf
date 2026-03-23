import { AgentId, AgentResult, ContentProfile, Pipeline, PipelineStep } from './types';
import { runAgent, runAgentsParallel } from './engine';

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

function createStep(agentId: AgentId, functionName: string, task: string, dependsOn?: string[]): PipelineStep {
  return {
    id: generateId(),
    agentId,
    functionName,
    params: { task },
    dependsOn,
    status: 'pending',
  };
}

interface InterpretedIntent {
  type: 'reel' | 'carousel' | 'story' | 'calendar' | 'lead-magnet' | 'analysis' | 'competitor' | 'full-strategy' | 'hooks' | 'general';
  agents: AgentId[];
  parallel: boolean;
  description: string;
}

function interpretRequest(userMessage: string): InterpretedIntent {
  const msg = userMessage.toLowerCase();

  if (msg.includes('reel') || msg.includes('vídeo') || msg.includes('video')) {
    return {
      type: 'reel',
      agents: ['market-researcher', 'hook-builder', 'viral-scriptwriter', 'quality-reviewer'],
      parallel: false,
      description: 'Criação de roteiro para Reel',
    };
  }

  if (msg.includes('carrossel') || msg.includes('carousel')) {
    return {
      type: 'carousel',
      agents: ['market-researcher', 'hook-builder', 'viral-scriptwriter', 'quality-reviewer'],
      parallel: false,
      description: 'Criação de roteiro para Carrossel',
    };
  }

  if (msg.includes('story') || msg.includes('stories')) {
    return {
      type: 'story',
      agents: ['hook-builder', 'viral-scriptwriter', 'quality-reviewer'],
      parallel: false,
      description: 'Criação de sequência de Stories',
    };
  }

  if (msg.includes('calendário') || msg.includes('calendario') || msg.includes('planejamento') || msg.includes('planejar')) {
    return {
      type: 'calendar',
      agents: ['market-researcher', 'competitor-analyst', 'content-planner', 'quality-reviewer'],
      parallel: false,
      description: 'Planejamento de calendário editorial',
    };
  }

  if (msg.includes('isca') || msg.includes('lead magnet') || msg.includes('captar') || msg.includes('captação') || msg.includes('leads')) {
    return {
      type: 'lead-magnet',
      agents: ['market-researcher', 'lead-magnet-architect', 'viral-scriptwriter', 'quality-reviewer'],
      parallel: false,
      description: 'Criação de isca digital / lead magnet',
    };
  }

  if (msg.includes('métrica') || msg.includes('metrica') || msg.includes('performance') || msg.includes('análise') || msg.includes('analise') || msg.includes('resultado')) {
    return {
      type: 'analysis',
      agents: ['performance-analyst', 'content-planner'],
      parallel: false,
      description: 'Análise de performance e sugestões',
    };
  }

  if (msg.includes('concorren') || msg.includes('benchmark') || msg.includes('competidor')) {
    return {
      type: 'competitor',
      agents: ['competitor-analyst', 'market-researcher'],
      parallel: true,
      description: 'Análise de concorrência',
    };
  }

  if (msg.includes('hook') || msg.includes('gancho') || msg.includes('abertura')) {
    return {
      type: 'hooks',
      agents: ['hook-builder', 'quality-reviewer'],
      parallel: false,
      description: 'Criação de hooks de alto impacto',
    };
  }

  if (msg.includes('estratégia') || msg.includes('estrategia') || msg.includes('completo') || msg.includes('completa')) {
    return {
      type: 'full-strategy',
      agents: ['market-researcher', 'competitor-analyst', 'content-planner', 'hook-builder', 'viral-scriptwriter', 'lead-magnet-architect', 'quality-reviewer'],
      parallel: false,
      description: 'Estratégia completa de conteúdo',
    };
  }

  return {
    type: 'general',
    agents: ['market-researcher', 'viral-scriptwriter', 'quality-reviewer'],
    parallel: false,
    description: 'Produção de conteúdo geral',
  };
}

export interface OrchestratorCallbacks {
  onPipelineUpdate: (pipeline: Pipeline) => void;
  onAgentStart: (agentId: AgentId, step: string) => void;
  onAgentComplete: (agentId: AgentId, result: AgentResult) => void;
}

export async function orchestrate(
  userMessage: string,
  profile?: ContentProfile,
  callbacks?: OrchestratorCallbacks
): Promise<{ pipeline: Pipeline; finalResult: string; qaScore?: number }> {
  const intent = interpretRequest(userMessage);

  // Build pipeline
  const pipeline: Pipeline = {
    id: generateId(),
    userRequest: userMessage,
    steps: intent.agents.map((agentId) =>
      createStep(agentId, intent.description, userMessage)
    ),
    status: 'running',
    createdAt: Date.now(),
  };

  callbacks?.onPipelineUpdate({ ...pipeline });

  let accumulatedContext = '';
  const results: AgentResult[] = [];

  if (intent.parallel && intent.agents.length > 1) {
    // Run research agents in parallel (excluding QA)
    const researchAgents = intent.agents.filter((a) => a !== 'quality-reviewer');
    const qaNeeded = intent.agents.includes('quality-reviewer');

    // Mark research agents as running
    for (const step of pipeline.steps) {
      if (step.agentId !== 'quality-reviewer') {
        step.status = 'running';
        callbacks?.onAgentStart(step.agentId, step.functionName);
      }
    }
    callbacks?.onPipelineUpdate({ ...pipeline });

    const parallelResults = await runAgentsParallel(
      researchAgents.map((agentId) => ({ agentId, task: userMessage })),
      profile
    );

    for (const result of parallelResults) {
      results.push(result);
      accumulatedContext += `\n\n--- ${result.agentId} ---\n${result.content}`;
      const step = pipeline.steps.find((s) => s.agentId === result.agentId);
      if (step) {
        step.status = result.status === 'success' ? 'completed' : 'failed';
        step.result = result;
        callbacks?.onAgentComplete(result.agentId, result);
      }
    }
    callbacks?.onPipelineUpdate({ ...pipeline });

    // Run QA if needed
    if (qaNeeded) {
      const qaStep = pipeline.steps.find((s) => s.agentId === 'quality-reviewer');
      if (qaStep) {
        qaStep.status = 'running';
        callbacks?.onAgentStart('quality-reviewer', 'Revisão de qualidade');
        callbacks?.onPipelineUpdate({ ...pipeline });

        const qaResult = await runAgent('quality-reviewer', `Revise o seguinte conteúdo produzido:\n${accumulatedContext}`, profile);
        qaStep.status = qaResult.status === 'success' ? 'completed' : 'failed';
        qaStep.result = qaResult;
        results.push(qaResult);
        callbacks?.onAgentComplete('quality-reviewer', qaResult);
      }
    }
  } else {
    // Sequential execution
    for (let i = 0; i < pipeline.steps.length; i++) {
      const step = pipeline.steps[i];
      step.status = 'running';
      callbacks?.onAgentStart(step.agentId, step.functionName);
      callbacks?.onPipelineUpdate({ ...pipeline });

      let task = userMessage;

      // QA reviews the accumulated output
      if (step.agentId === 'quality-reviewer') {
        task = `Revise o seguinte conteúdo produzido para a tarefa "${userMessage}":\n\n${accumulatedContext}`;
      }
      // Scriptwriter uses research + hooks
      else if (step.agentId === 'viral-scriptwriter' && accumulatedContext) {
        task = `Com base na pesquisa e hooks abaixo, crie o conteúdo para: "${userMessage}"`;
      }
      // Content planner uses research
      else if (step.agentId === 'content-planner' && accumulatedContext) {
        task = `Com base na pesquisa abaixo, planeje o conteúdo para: "${userMessage}"`;
      }
      // Lead magnet architect uses research
      else if (step.agentId === 'lead-magnet-architect' && accumulatedContext) {
        task = `Com base na pesquisa abaixo, projete uma isca digital para: "${userMessage}"`;
      }

      const result = await runAgent(step.agentId, task, profile, accumulatedContext || undefined);
      step.status = result.status === 'success' ? 'completed' : 'failed';
      step.result = result;
      results.push(result);

      if (result.status === 'success') {
        accumulatedContext += `\n\n--- ${step.agentId} ---\n${result.content}`;
      }

      callbacks?.onAgentComplete(step.agentId, result);
      callbacks?.onPipelineUpdate({ ...pipeline });
    }
  }

  // Extract QA score
  const qaResult = results.find((r) => r.agentId === 'quality-reviewer');
  let qaScore: number | undefined;
  if (qaResult?.content) {
    const scoreMatch = qaResult.content.match(/(?:score|nota|pontuação)[:\s]*(\d{1,3})/i);
    if (scoreMatch) {
      qaScore = parseInt(scoreMatch[1], 10);
    }
  }

  // Build final result
  const finalResult = results
    .filter((r) => r.status === 'success')
    .map((r) => r.content)
    .join('\n\n---\n\n');

  pipeline.status = 'completed';
  pipeline.finalResult = finalResult;
  pipeline.qaScore = qaScore;
  callbacks?.onPipelineUpdate({ ...pipeline });

  return { pipeline, finalResult, qaScore };
}
