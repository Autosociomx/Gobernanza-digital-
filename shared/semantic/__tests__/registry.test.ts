import { describe, expect, it } from 'vitest';
import { auditSemanticRuntimeAlignment } from '../alignment';
import { BIRTH_CERTIFICATE_SEMANTIC_CONTRACT } from '../contracts/birthCertificate';
import { PUBLIC_WORKS_REPORT_SEMANTIC_CONTRACT } from '../contracts/publicWorksReport';
import {
  findSemanticContractByIntent,
  findSemanticContractForText,
  getSemanticContracts,
  matchesPatternSet,
  validateSemanticRegistry,
} from '../registry';

function normalize(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

describe('Semantic Contract Registry v0.1', () => {
  it('is internally valid and compiles all declared regex patterns', () => {
    expect(validateSemanticRegistry()).toEqual({ valid: true, errors: [] });
  });

  it('publishes only ACTIVE contracts by default', () => {
    expect(
      getSemanticContracts().every((contract) => contract.status === 'ACTIVE'),
    ).toBe(true);
  });

  it('resolves canonical public-works and birth-certificate intents', () => {
    expect(
      findSemanticContractByIntent('report_public_infrastructure_issue')?.id,
    ).toBe('mx.nay.tepic.public-works.report.semantic');
    expect(
      findSemanticContractByIntent('birth_certificate_service')?.id,
    ).toBe('mx.gov.civil-registry.birth-certificate.semantic');
  });

  it('maps citizen language to semantic and runtime subject values', () => {
    const pothole = findSemanticContractForText(normalize('hay un bache'))?.subject;
    const streetlight = findSemanticContractForText(normalize('no sirve la luminaria'))?.subject;
    const birthCertificate = findSemanticContractForText(
      normalize('necesito un acta para mi hija'),
    )?.subject;
    expect({ id: pothole?.id, runtimeValue: pothole?.runtimeValue }).toEqual({
      id: 'pothole',
      runtimeValue: 'bache',
    });
    expect({ id: streetlight?.id, runtimeValue: streetlight?.runtimeValue }).toEqual({
      id: 'streetlight',
      runtimeValue: 'luminaria',
    });
    expect({ id: birthCertificate?.id, runtimeValue: birthCertificate?.runtimeValue }).toEqual({
      id: 'birth_certificate',
      runtimeValue: 'birth_certificate',
    });
  });

  it('keeps ambiguous or contradictory phrases out of affirmative authorization', () => {
    const confirmations = PUBLIC_WORKS_REPORT_SEMANTIC_CONTRACT.confirmations;
    const affirmative = (text: string) =>
      matchesPatternSet(normalize(text), confirmations.affirmativePatterns) &&
      !matchesPatternSet(normalize(text), confirmations.negativePatterns);

    expect(affirmative('sí, adelante')).toBe(true);
    expect(affirmative('quiero')).toBe(false);
    expect(affirmative('sí, pero no')).toBe(false);
  });

  it('allows an informational request to cross Context.OS without implying execution', () => {
    const result = validateSemanticRegistry([BIRTH_CERTIFICATE_SEMANTIC_CONTRACT]);
    expect(result).toEqual({ valid: true, errors: [] });
  });

  it('rejects an action request routed away from Context.OS', () => {
    const unsafeContract = {
      ...PUBLIC_WORKS_REPORT_SEMANTIC_CONTRACT,
      speechActs: PUBLIC_WORKS_REPORT_SEMANTIC_CONTRACT.speechActs.map((definition) =>
        definition.act === 'ACTION_REQUEST'
          ? { ...definition, route: 'CHAT' as const }
          : definition,
      ),
    };
    const result = validateSemanticRegistry([unsafeContract]);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      `SPEECH_ACT_ROUTE_INVALID:${unsafeContract.id}:ACTION_REQUEST`,
    );
  });

  it('has no semantic/runtime drift', () => {
    expect(auditSemanticRuntimeAlignment()).toEqual({
      valid: true,
      errors: [],
      checkedContracts: 2,
    });
  });
});
