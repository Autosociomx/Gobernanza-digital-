import type { Agent, AgentEnvelope, AgentResult } from '../../contracts/agent';

type RoutingPayload = { serviceQuery: string; jurisdiction?: string };
type RoutingData = { routeStatus: 'FOUND' | 'NOT_FOUND'; serviceQuery: string; institution?: string };

export class SoatmRoutingAgent implements Agent<RoutingPayload, RoutingData> {
  id = 'soatm-routing-agent';
  version = '0.1.0';

  async handle(envelope: AgentEnvelope<RoutingPayload>): Promise<AgentResult<RoutingData>> {
    return {
      requestId: envelope.requestId,
      decision: 'ALLOW',
      reasonCodes: ['LAB_ROUTING_ONLY'],
      data: {
        routeStatus: 'NOT_FOUND',
        serviceQuery: envelope.payload.serviceQuery,
      },
      evidenceRefs: [],
      humanActionRequired: false,
      nextCapability: 'evidence.append',
      audit: {
        agentId: this.id,
        agentVersion: this.version,
        startedAt: envelope.timestamp,
        completedAt: new Date().toISOString(),
        executionMode: envelope.executionMode,
      },
    };
  }
}
