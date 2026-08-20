import { describe, expect, it, vi } from 'vitest';
import { createLabContextOSRuntime } from '../../../contextos/factory';
import {
  INITIAL_BRIDGE_STATE,
  processCitizenUtterance,
  type RuntimeExecutor,
} from '../contextosBridge';
import {
  buildPublicWorksIntentEnvelope,
  interpretCitizenUtterance,
} from '../metalinguistics';

function labExecutor(): RuntimeExecutor {
  const runtime = createLabContextOSRuntime();
  return (request) => runtime.execute(request);
}

describe('ORBE metalinguistic boundary', () => {
  it('keeps informational questions out of Context.OS execution', async () => {
    const executor = vi.fn();
    const result = await processCitizenUtterance(
      INITIAL_BRIDGE_STATE,
      '¿Cómo reporto un bache?',
      executor as unknown as RuntimeExecutor,
    );

    expect(result.route).toBe('CHAT');
    expect(executor).not.toHaveBeenCalled();
  });

  it('does not convert a mere incident assertion into an action', async () => {
    const executor = vi.fn();
    const result = await processCitizenUtterance(
      INITIAL_BRIDGE_STATE,
      'Hay un bache en avenida México 120',
      executor as unknown as RuntimeExecutor,
    );

    expect(result.route).toBe('CLARIFY');
    expect(result.state.pending?.kind).toBe('CONFIRM_ACTION');
    expect(executor).not.toHaveBeenCalled();
  });

  it('routes an explicit action request to Context.OS', async () => {
    const result = await processCitizenUtterance(
      INITIAL_BRIDGE_STATE,
      'Quiero reportar un bache en avenida México 120',
      labExecutor(),
    );

    expect(result.route).toBe('RUNTIME');
    expect(result.runtimeResponse?.status).toBe('EXECUTED');
    expect(result.runtimeResponse?.execution?.executionMode).toBe('LAB_MOCK');
    expect(result.citizenMessage).toContain('No es una orden municipal oficial');
  });

  it('requires concrete location when the request only uses deixis', async () => {
    const result = await processCitizenUtterance(
      INITIAL_BRIDGE_STATE,
      'Quiero reportar un bache afuera de mi casa',
      labExecutor(),
    );

    expect(result.runtimeResponse?.status).toBe('NEEDS_INPUT');
    expect(result.state.pending?.kind).toBe('LOCATION');
    expect(result.runtimeResponse?.policy.requiredFields).toContain('data.location');
  });

  it('continues a pending location clarification without reinterpreting it as a new intent', async () => {
    const first = await processCitizenUtterance(
      INITIAL_BRIDGE_STATE,
      'Quiero reportar una luminaria que no sirve',
      labExecutor(),
    );
    expect(first.state.pending?.kind).toBe('LOCATION');

    const second = await processCitizenUtterance(
      first.state,
      'Avenida Insurgentes esquina con Jacarandas',
      labExecutor(),
    );

    expect(second.runtimeResponse?.status).toBe('EXECUTED');
    expect(second.state.pending).toBeNull();
  });

  it('requires confirmation after an assertion, then continues with the original incident', async () => {
    const executor = labExecutor();
    const first = await processCitizenUtterance(
      INITIAL_BRIDGE_STATE,
      'No sirve la luminaria en calle Fresno 22',
      executor,
    );
    expect(first.state.pending?.kind).toBe('CONFIRM_ACTION');

    const second = await processCitizenUtterance(first.state, 'sí, adelante', executor);
    expect(second.runtimeResponse?.status).toBe('EXECUTED');
  });

  it('cancels a proposed action when the citizen says no', async () => {
    const executor = vi.fn();
    const first = await processCitizenUtterance(
      INITIAL_BRIDGE_STATE,
      'Hay un bache en avenida Allende',
      executor as unknown as RuntimeExecutor,
    );
    const second = await processCitizenUtterance(
      first.state,
      'no, mejor no',
      executor as unknown as RuntimeExecutor,
    );

    expect(second.route).toBe('CANCELLED');
    expect(second.state.pending).toBeNull();
    expect(executor).not.toHaveBeenCalled();
  });

  it('asks what the citizen wants when only the domain object is named', async () => {
    const executor = vi.fn();
    const result = await processCitizenUtterance(
      INITIAL_BRIDGE_STATE,
      'bache en mi colonia',
      executor as unknown as RuntimeExecutor,
    );

    expect(result.route).toBe('CLARIFY');
    expect(result.citizenMessage).toContain('no tu intención');
    expect(executor).not.toHaveBeenCalled();
  });

  it('classifies streetlight and pothole as different semantic subjects', () => {
    expect(interpretCitizenUtterance('quiero reportar un bache en avenida México').subject).toBe('pothole');
    expect(interpretCitizenUtterance('quiero reportar una luminaria en avenida México').subject).toBe('streetlight');
  });

  it('does not inject profile or contact data into the IntentEnvelope', () => {
    const interpretation = interpretCitizenUtterance('quiero reportar un bache en calle Puebla 10');
    const intent = buildPublicWorksIntentEnvelope('quiero reportar un bache en calle Puebla 10', interpretation, {
      subjectId: 'citizen-123',
      authenticated: true,
      requestId: 'test-request',
      now: new Date('2026-08-19T20:00:00.000Z'),
    });

    expect(intent.actor.subjectId).toBe('citizen-123');
    expect(intent.data.contact).toBeUndefined();
    expect(intent.data.location?.address).toBe('calle Puebla 10');
  });

  it('maps semantic subjects to the Spanish runtime contract', () => {
    const pothole = interpretCitizenUtterance('quiero reportar un bache en calle Puebla 10');
    const streetlight = interpretCitizenUtterance('quiero reportar una luminaria en calle Puebla 10');

    const potholeIntent = buildPublicWorksIntentEnvelope(
      'quiero reportar un bache en calle Puebla 10',
      pothole,
    );
    const streetlightIntent = buildPublicWorksIntentEnvelope(
      'quiero reportar una luminaria en calle Puebla 10',
      streetlight,
    );

    expect(potholeIntent.intent.subject).toBe('bache');
    expect(streetlightIntent.intent.subject).toBe('luminaria');
    expect(potholeIntent.intent.semanticContractId).toBe(
      'mx.nay.tepic.public-works.report.semantic',
    );
    expect(potholeIntent.intent.semanticContractVersion).toBe('0.1.0');
    expect(potholeIntent.intent.semanticRegistryVersion).toBe(
      'orbe.semantic-registry.v0.1',
    );
  });

  it('does not treat an ambiguous mixed confirmation as authorization', async () => {
    const executor = vi.fn();
    const first = await processCitizenUtterance(
      INITIAL_BRIDGE_STATE,
      'Hay un bache en avenida Allende',
      executor as unknown as RuntimeExecutor,
    );
    const second = await processCitizenUtterance(
      first.state,
      'sí, pero no',
      executor as unknown as RuntimeExecutor,
    );

    expect(second.route).toBe('CANCELLED');
    expect(executor).not.toHaveBeenCalled();
  });

  it('does not accept quiero by itself as a clear confirmation', async () => {
    const executor = vi.fn();
    const first = await processCitizenUtterance(
      INITIAL_BRIDGE_STATE,
      'Hay un bache en avenida Allende',
      executor as unknown as RuntimeExecutor,
    );
    const second = await processCitizenUtterance(
      first.state,
      'quiero',
      executor as unknown as RuntimeExecutor,
    );

    expect(second.route).toBe('CLARIFY');
    expect(executor).not.toHaveBeenCalled();
  });

  it('allows cancellation while a concrete location is pending', async () => {
    const first = await processCitizenUtterance(
      INITIAL_BRIDGE_STATE,
      'Quiero reportar un bache afuera de mi casa',
      labExecutor(),
    );
    const second = await processCitizenUtterance(first.state, 'no', labExecutor());

    expect(second.route).toBe('CANCELLED');
    expect(second.state.pending).toBeNull();
  });

  it('preserves the request correlation across location clarification', async () => {
    const executor = labExecutor();
    const first = await processCitizenUtterance(
      INITIAL_BRIDGE_STATE,
      'Quiero reportar una luminaria que no sirve',
      executor,
    );
    const requestId = first.state.pending?.kind === 'LOCATION'
      ? first.state.pending.intent.requestId
      : undefined;

    const second = await processCitizenUtterance(
      first.state,
      'Avenida Insurgentes esquina con Jacarandas',
      executor,
    );

    expect(requestId).toBeTruthy();
    expect(second.runtimeResponse?.correlationId).toBe(requestId);
    expect(second.runtimeResponse?.status).toBe('EXECUTED');
  });

});
