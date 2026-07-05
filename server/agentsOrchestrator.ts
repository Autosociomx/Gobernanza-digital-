import crypto from "crypto";
import type { AgentRun } from "./agentTypes";
import { WORKER_SEEDS, executeWorker } from "./federalWorkers";
import { runCeoSynthesis } from "./ceoAgent";

const RUN_TTL_MS = 60 * 60 * 1000;

const runs = new Map<string, AgentRun>();

function pruneOldRuns() {
  const now = Date.now();
  for (const [id, run] of runs) {
    if (now - new Date(run.startedAt).getTime() > RUN_TTL_MS) runs.delete(id);
  }
}

export function getRun(runId: string): AgentRun | undefined {
  return runs.get(runId);
}

export function startRun(): AgentRun {
  pruneOldRuns();

  // Single-flight: evita disparar múltiples runs simultáneos contra las APIs federales
  for (const run of runs.values()) {
    if (run.status === 'running') return run;
  }

  const run: AgentRun = {
    runId: crypto.randomUUID(),
    status: 'running',
    startedAt: new Date().toISOString(),
    agents: WORKER_SEEDS.map(seed => ({ ...seed, status: 'queued', findings: [], rawHighlights: [] })),
    ceo: { status: 'queued', provider: null },
  };
  runs.set(run.runId, run);
  void executeRun(run);
  return run;
}

async function executeRun(run: AgentRun) {
  try {
    await Promise.allSettled(WORKER_SEEDS.map(async (seed, i) => {
      run.agents[i].status = 'running';
      run.agents[i] = await executeWorker(seed);
    }));

    run.ceo.status = 'running';
    try {
      run.ceo = await runCeoSynthesis(run.agents);
    } catch (error: any) {
      run.ceo = { status: 'error', provider: null, error: error?.message ?? 'Error en la síntesis del CEO' };
    }
    run.status = 'done';
  } catch (error: any) {
    run.status = 'error';
    console.error('[agentes] Error inesperado en el run:', error);
  } finally {
    run.finishedAt = new Date().toISOString();
  }
}
