import { NextRequest } from 'next/server';
import { orchestrate } from '@/lib/agents/orchestrator';
import { runAgent } from '@/lib/agents/engine';
import { AgentRequest, AGENTS } from '@/lib/agents/types';

export async function POST(request: NextRequest) {
  try {
    const body: AgentRequest = await request.json();

    if (!body.userMessage) {
      return Response.json({ error: 'userMessage é obrigatório' }, { status: 400 });
    }

    // If a specific agent is requested, run it directly
    if (body.agentId && body.agentId !== 'orchestrator') {
      if (!AGENTS[body.agentId]) {
        return Response.json({ error: `Agente '${body.agentId}' não encontrado` }, { status: 400 });
      }

      const result = await runAgent(body.agentId, body.userMessage, body.profile);
      return Response.json({ result });
    }

    // Otherwise, run the full orchestration pipeline
    const { pipeline, finalResult, qaScore } = await orchestrate(
      body.userMessage,
      body.profile
    );

    return Response.json({
      pipeline,
      finalResult,
      qaScore,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro interno do servidor';
    return Response.json({ error: message }, { status: 500 });
  }
}
