import Anthropic from '@anthropic-ai/sdk';
import { AgentId, AgentResult, ContentProfile } from './types';
import { AGENT_PROMPTS } from '@/data/agentPrompts';

const anthropic = new Anthropic();

export async function runAgent(
  agentId: AgentId,
  task: string,
  profile?: ContentProfile,
  previousContext?: string
): Promise<AgentResult> {
  const systemPrompt = AGENT_PROMPTS[agentId];
  if (!systemPrompt) {
    return { agentId, status: 'error', content: `Agente '${agentId}' não encontrado.` };
  }

  const profileContext = profile
    ? `\n\nPERFIL DO USUÁRIO:\n- Nicho: ${profile.niche}\n- Público-alvo: ${profile.targetAudience}\n- Tom da marca: ${profile.brandTone}\n- Concorrentes: ${profile.competitors.join(', ')}\n- Pilares de conteúdo: ${profile.contentPillars.join(', ')}\n- Objetivos: ${profile.objectives.join(', ')}`
    : '';

  const contextSection = previousContext
    ? `\n\nCONTEXTO DE AGENTES ANTERIORES:\n${previousContext}`
    : '';

  const fullMessage = `${task}${profileContext}${contextSection}`;

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{ role: 'user', content: fullMessage }],
    });

    const content = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === 'text')
      .map((block) => block.text)
      .join('\n');

    return { agentId, status: 'success', content };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    return { agentId, status: 'error', content: `Erro ao executar agente ${agentId}: ${message}` };
  }
}

export async function runAgentsParallel(
  agents: { agentId: AgentId; task: string }[],
  profile?: ContentProfile,
  previousContext?: string
): Promise<AgentResult[]> {
  return Promise.all(
    agents.map(({ agentId, task }) => runAgent(agentId, task, profile, previousContext))
  );
}
