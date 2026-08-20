import { describe, expect, it } from 'vitest';
import { auditSemanticRuntimeAlignment } from '../alignment';
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

  it('resolves the public works intent by canonical intent name', () => {
    expect(
      findSemanticContractByIntent('report_public_infrastructure_issue')?.id,
    ).toBe('mx.nay.tepic.public-works.report.semantic');
  });

  it('maps citizen language to semantic and runtime subject values', () => {
    const pothole = findSemanticContractForText(normalize('hay un bache'))?.subject;
    const streetlight = findSemanticContractForText(normalize('no sirve la luminaria'))?.subject;
    expect({ id: pothole?.id, runtimeValue: pothole?.runtimeValue }).toEqual({
      id: 'pothole',
      runtimeValue: 'bache',
    });
    expect({ id: streetlight?.id, runtimeValue: streetlight?.runtimeValue }).toEqual({
      id: 'streetlight',
      runtimeValue: 'luminaria',
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

  it('has no semantic/runtime drift', () => {
    expect(auditSemanticRuntimeAlignment()).toEqual({
      valid: true,
      errors: [],
      checkedContracts: 1,
    });
  });
});
