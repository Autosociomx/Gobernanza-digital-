export type AgentStatus = 'queued' | 'running' | 'done' | 'error';

export type AgentId = 'datos_gob' | 'datamexico' | 'inegi';

export interface AgentResult {
  id: AgentId;
  name: string;
  description: string;
  status: AgentStatus;
  findings: string[];
  rawHighlights: string[];
  error?: string;
  durationMs?: number;
}

export interface CeoResult {
  status: AgentStatus;
  provider: 'claude' | 'gemini' | null;
  model?: string;
  report?: string;
  error?: string;
}

export interface AgentRun {
  runId: string;
  status: 'running' | 'done' | 'error';
  startedAt: string;
  finishedAt?: string;
  agents: AgentResult[];
  ceo: CeoResult;
}
