import type { AgentDecision, AgentEnvelope, PolicyGate } from '../../contracts/agent';

const sensitiveCapabilities = new Set([
  'record.lookup',
  'record.reference',
  'triage.prioritize',
  'manchester.apply',
  'icd.classify_assist',
  'institutional.write',
  'payment.execute',
]);

export class ContextPolicyAgent implements PolicyGate {
  async evaluate(envelope: AgentEnvelope): Promise<{ decision: AgentDecision; reasonCodes: string[] }> {
    if (envelope.executionMode === 'INSTITUTIONAL' && envelope.actor.assurance !== 'institutional') {
      return { decision: 'DENY', reasonCodes: ['INSTITUTIONAL_ASSURANCE_REQUIRED'] };
    }

    if (sensitiveCapabilities.has(envelope.requestedCapability) && !envelope.consentRef) {
      return { decision: 'REQUIRE_CONSENT', reasonCodes: ['CONSENT_REQUIRED'] };
    }

    if (envelope.riskLevel === 'CRITICAL') {
      return { decision: 'REQUIRE_HUMAN', reasonCodes: ['CRITICAL_RISK_HUMAN_REQUIRED'] };
    }

    return { decision: 'ALLOW', reasonCodes: ['POLICY_ALLOW'] };
  }
}
