import { createPublicWorksReportAdapter } from './adapters/publicWorksReportAdapter';
import { ContextOSRuntime } from './runtime';

export function createLabContextOSRuntime(): ContextOSRuntime {
  const publicWorks = createPublicWorksReportAdapter();
  return new ContextOSRuntime({
    adapters: {
      [publicWorks.id]: publicWorks,
    },
  });
}
