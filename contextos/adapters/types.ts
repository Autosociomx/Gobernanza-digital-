import type { ExecutionRequest, ExecutionResult } from '../contracts';

export interface ServiceAdapter {
  id: string;
  execute(request: ExecutionRequest): Promise<ExecutionResult>;
}
