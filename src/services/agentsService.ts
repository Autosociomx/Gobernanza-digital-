import type { AgentRun } from '../../server/agentTypes';

export type { AgentRun, AgentResult, AgentStatus, CeoResult } from '../../server/agentTypes';

export async function startAgentsRun(): Promise<AgentRun> {
  const res = await fetch('/api/agents/run', { method: 'POST' });
  if (!res.ok) throw new Error('No se pudo iniciar el análisis de agentes');
  return res.json();
}

export async function getAgentsRun(runId: string): Promise<AgentRun> {
  const res = await fetch(`/api/agents/run/${runId}`);
  if (res.status === 404) throw new Error('RUN_NOT_FOUND');
  if (!res.ok) throw new Error('Error consultando el estado del análisis');
  return res.json();
}
