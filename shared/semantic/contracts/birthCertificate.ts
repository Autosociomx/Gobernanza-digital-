import { SEMANTIC_REGISTRY_VERSION, type SemanticContract } from '../types';

export const BIRTH_CERTIFICATE_SEMANTIC_CONTRACT: SemanticContract = {
  id: 'mx.gov.civil-registry.birth-certificate.semantic',
  version: '0.1.0',
  registryVersion: SEMANTIC_REGISTRY_VERSION,
  status: 'ACTIVE',
  domain: 'civil_registry',
  intentName: 'birth_certificate_service',
  purpose: 'birth_certificate_guidance',
  riskLevel: 'LOW',
  jurisdiction: { country: 'MX' },
  subjects: [
    {
      id: 'birth_certificate',
      label: 'acta de nacimiento',
      runtimeValue: 'birth_certificate',
      patterns: [
        '\\bacta\\s+de\\s+nacimiento\\b',
        '\\bacta\\s+(?:para|de)\\s+mi\\s+(?:hija|hijo)\\b',
        '\\bacta\\s+(?:para|de)\\s+(?:mi\\s+)?(?:niña|niño)\\b',
      ],
    },
  ],
  speechActs: [
    {
      act: 'INFORMATION_REQUEST',
      route: 'CONTEXTOS',
      confidence: 0.96,
      reasonCodes: ['INFORMATIONAL_SPEECH_ACT', 'PUBLIC_GUIDANCE_REQUESTED'],
      patterns: [
        '\\bnecesito\\s+(?:un|una|el|la)?\\s*acta\\b',
        '\\bcomo\\s+(?:puedo\\s+)?(?:sacar|obtener|tramitar)\\b',
        '\\bdonde\\s+(?:puedo\\s+)?(?:sacar|obtener|tramitar)\\b',
        '\\bque\\s+(?:necesito|requisitos?)\\b',
        '\\bquiero\\s+saber\\b',
      ],
    },
    {
      act: 'ACTION_REQUEST',
      route: 'CONTEXTOS',
      confidence: 0.98,
      reasonCodes: ['EXPLICIT_ACTION_REQUEST', 'CAPABILITY_ESCALATION_REQUESTED'],
      patterns: [
        '\\bpuedes\\s+(?:sacar|obtener|tramitar|descargar)(?:la|me)?\\b',
        '\\b(?:sacame|obtenme|tramitame|descargame)\\b',
        '\\bhaz\\s+(?:el|la)\\s+tramite\\b',
      ],
    },
    {
      act: 'INCIDENT_ASSERTION',
      route: 'CONFIRM_ACTION',
      confidence: 0.86,
      reasonCodes: ['DOCUMENT_PROBLEM_ASSERTED', 'ACTION_NOT_EXPLICIT'],
      patterns: [
        '\\bperdi\\s+(?:mi|el|la)\\s+acta\\b',
        '\\bno\\s+encuentro\\s+(?:mi|el|la)\\s+acta\\b',
      ],
    },
  ],
  slots: [
    { path: 'intent.subject', required: true, source: 'utterance' },
  ],
  deixis: {
    unresolvedLocationPatterns: [],
    locationConnectorPatterns: [],
  },
  confirmations: {
    affirmativePatterns: [
      '^si\\b',
      '^adelante\\b',
      '^confirmo\\b',
      '^hazlo\\b',
      '^de\\s+acuerdo\\b',
    ],
    negativePatterns: [
      '^no$',
      '^no\\s+gracias$',
      '\\bcancel(?:a|ar|alo)\\b',
      '\\bmejor\\s+no\\b',
      '\\bno\\s+quiero\\b',
    ],
  },
  citizenMessages: {
    confirmAction:
      'Entendí que tienes un problema con el {subject}. ¿Quieres que revise qué puede hacer ORBE y hasta dónde puede acompañarte?',
    askIntent:
      'Entendí que necesitas un {subject}. ¿Quieres información o quieres que revise si existe una acción disponible?',
    informational:
      'Puedo orientarte sobre el {subject} con información pública verificada. No ejecuté ninguna acción.',
  },
};
