import { SEMANTIC_REGISTRY_VERSION, type SemanticContract } from '../types';

export const PUBLIC_WORKS_REPORT_SEMANTIC_CONTRACT: SemanticContract = {
  id: 'mx.nay.tepic.public-works.report.semantic',
  version: '0.1.0',
  registryVersion: SEMANTIC_REGISTRY_VERSION,
  status: 'ACTIVE',
  domain: 'public_works',
  intentName: 'report_public_infrastructure_issue',
  purpose: 'report_public_infrastructure_issue',
  riskLevel: 'LOW',
  jurisdiction: { country: 'MX', state: 'NAY', municipality: 'TEPIC' },
  subjects: [
    {
      id: 'pothole',
      label: 'bache',
      runtimeValue: 'bache',
      patterns: ['\\b(bache|baches|hoyo|hoyos|pavimento\\s+roto)\\b'],
    },
    {
      id: 'streetlight',
      label: 'luminaria',
      runtimeValue: 'luminaria',
      patterns: [
        '\\b(luminaria|luminarias|lampara|lamparas|alumbrado|poste\\s+de\\s+luz|luz\\s+de\\s+la\\s+calle)\\b',
      ],
    },
  ],
  speechActs: [
    {
      act: 'INFORMATION_REQUEST',
      route: 'CHAT',
      confidence: 0.96,
      reasonCodes: ['INFORMATIONAL_SPEECH_ACT', 'NO_EXECUTION_IMPLIED'],
      patterns: [
        '\\bcomo\\s+(puedo\\s+)?report(ar|o)\\b',
        '\\bdonde\\s+(puedo\\s+)?report(ar|o)\\b',
        '\\bque\\s+(necesito|requisitos?)\\b',
        '\\bquiero\\s+saber\\b',
        '\\bme\\s+puedes\\s+decir\\b',
        '\\bcual\\s+es\\s+el\\s+proceso\\b',
      ],
    },
    {
      act: 'ACTION_REQUEST',
      route: 'CONTEXTOS',
      confidence: 0.97,
      reasonCodes: ['EXPLICIT_ACTION_REQUEST', 'SEMANTIC_SUBJECT_DETECTED'],
      patterns: [
        '\\bquiero\\s+reportar\\b',
        '\\bnecesito\\s+reportar\\b',
        '\\bvengo\\s+a\\s+reportar\\b',
        '\\breporta(r)?\\b',
        '\\bregistra(r)?\\s+(este|un|una)?\\s*reporte\\b',
      ],
    },
    {
      act: 'INCIDENT_ASSERTION',
      route: 'CONFIRM_ACTION',
      confidence: 0.9,
      reasonCodes: ['INCIDENT_ASSERTED', 'ACTION_NOT_EXPLICIT'],
      patterns: [
        '\\bhay\\s+(un|una)\\b',
        '\\bno\\s+(sirve|funciona|prende|enciende)\\b',
        '\\besta\\s+(apagada|apagado|rota|roto|fundida|fundido)\\b',
        '\\bse\\s+(fundio|rompio|cayo)\\b',
      ],
    },
  ],
  slots: [
    { path: 'intent.subject', required: true, source: 'utterance' },
    { path: 'data.description', required: true, source: 'utterance' },
    { path: 'data.location', required: true, source: 'utterance' },
  ],
  deixis: {
    unresolvedLocationPatterns: [
      '\\b(aqui|aca|afuera\\s+de\\s+mi\\s+casa|por\\s+mi\\s+casa|cerca\\s+de\\s+mi\\s+casa)\\b',
    ],
    locationConnectorPatterns: [
      '\\b(?:en|sobre|frente\\s+a|esquina\\s+de|por)\\s+(.{4,120})$',
    ],
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
      '^no\\s+por\\s+favor$',
      '\\bcancel(?:a|ar|alo)\\b',
      '\\bmejor\\s+no\\b',
      '\\bpero\\s+no\\b',
      '\\bno\\s+quiero\\b',
    ],
  },
  citizenMessages: {
    confirmAction:
      'Detecté un posible reporte de {subject}, pero no me pediste ejecutarlo. ¿Quieres que prepare un reporte de laboratorio?',
    askIntent:
      'Entendí el tema, pero no tu intención. ¿Quieres información o quieres preparar un reporte de laboratorio?',
    informational:
      'Esto parece una consulta informativa. No ejecuté ninguna acción y debe continuar por el canal de orientación.',
  },
};
