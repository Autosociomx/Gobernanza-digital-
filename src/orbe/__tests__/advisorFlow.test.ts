import { describe, expect, it } from 'vitest';
import { createLabContextOSRuntime } from '../../../contextos/factory';
import {
  INITIAL_BRIDGE_STATE,
  processCitizenUtterance,
  type RuntimeExecutor,
} from '../contextosBridge';

function labExecutor(): RuntimeExecutor {
  const runtime = createLabContextOSRuntime();
  return (request) => runtime.execute(request);
}

describe('ORBE advisor flow v0.1', () => {
  it('routes a birth-certificate need through Context.OS as public information', async () => {
    const result = await processCitizenUtterance(
      INITIAL_BRIDGE_STATE,
      'Necesito un acta para mi hija.',
      labExecutor(),
    );

    expect(result.route).toBe('RUNTIME');
    expect(result.runtimeResponse?.status).toBe('RESOLVED');
    expect(result.runtimeResponse?.service?.id).toBe(
      'mx.gov.civil-registry.birth-certificate.info',
    );
    expect(result.runtimeResponse?.service?.capabilityKind).toBe('INFORMATION');
    expect(result.runtimeResponse?.service?.authorityLevel).toBe('NONE');
    expect(result.runtimeResponse?.policy.reasonCodes).toContain('PUBLIC_INFORMATION');
    expect(result.runtimeResponse?.execution).toBeUndefined();
    expect(result.state.lastResolvedIntent?.intent.requestedCapability).toBe('INFORMATION');
  });

  it('treats a follow-up request to obtain the acta as a capability escalation, not as permission', async () => {
    const executor = labExecutor();
    const first = await processCitizenUtterance(
      INITIAL_BRIDGE_STATE,
      'Necesito un acta para mi hija.',
      executor,
    );
    const second = await processCitizenUtterance(
      first.state,
      '¿Puedes sacarla tú?',
      executor,
    );

    expect(second.route).toBe('RUNTIME');
    expect(second.runtimeResponse?.status).toBe('DENIED');
    expect(second.runtimeResponse?.policy.reasonCodes).toContain('SERVICE_NOT_REGISTERED');
    expect(second.runtimeResponse?.execution).toBeUndefined();
    expect(second.citizenMessage).toContain('No puedo ejecutar esa acción');
  });
});
