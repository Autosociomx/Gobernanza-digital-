import { Type } from "@google/genai";
import { getAI } from "./aiClients";
import type { AgentId, AgentResult } from "./agentTypes";

const FETCH_TIMEOUT_MS = 15_000;
const USER_AGENT = 'NayaritDigital/1.0 (gobernanza-digital)';

// URLs de las plataformas federales — mantener en constantes para ajustes rápidos
const CKAN_BASE = 'https://datos.gob.mx/busca/api/3/action';
const DATAMEXICO_BASE = 'https://api.datamexico.org/tesseract/data.jsonrecords';
const INEGI_BASE = 'https://www.inegi.org.mx/app/api/indicadores/desarrolladores/jsonxml/INDICATOR';

// Nayarit: entidad federativa 18 (DataMéxico) / área geográfica 07000018 (INEGI)
const DATAMEXICO_STATE_ID = '18';
const INEGI_GEO_NAYARIT = '07000018';

const INEGI_INDICATORS: { id: string; label: string }[] = [
  { id: '1002000001', label: 'Población total' },
  { id: '6200240404', label: 'Población ocupada' },
];

interface WorkerSeed {
  id: AgentId;
  name: string;
  description: string;
}

export const WORKER_SEEDS: WorkerSeed[] = [
  { id: 'datos_gob', name: 'datos.gob.mx (CKAN)', description: 'Catálogo Nacional de Datos Abiertos' },
  { id: 'datamexico', name: 'DataMéxico', description: 'Economía y empleo por entidad (Secretaría de Economía)' },
  { id: 'inegi', name: 'INEGI', description: 'Indicadores estadísticos oficiales' },
];

async function fetchJson(url: string): Promise<any> {
  const res = await fetch(url, {
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    headers: { 'User-Agent': USER_AGENT, 'Accept': 'application/json' },
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} al consultar ${new URL(url).hostname}`);
  }
  return res.json();
}

// Resume los datos crudos con Gemini; si la IA no está disponible, degrada a highlights crudos.
async function summarizeWithGemini(sourceName: string, compactData: string, rawHighlights: string[]): Promise<Pick<AgentResult, 'findings' | 'rawHighlights'>> {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: `Eres un analista de datos del gobierno de Nayarit, México. A continuación tienes datos reales obtenidos de la plataforma federal "${sourceName}". Analízalos y extrae hallazgos accionables: oportunidades, programas o fondos federales aplicables, y datos relevantes para Nayarit y su capital Tepic. Responde en español.\n\nDATOS:\n${compactData}`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            findings: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'Hallazgos y oportunidades concretas para Nayarit/Tepic (3 a 6 puntos)' },
            rawHighlights: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'Cifras o títulos de datasets destacados (máx 5)' },
          },
          required: ['findings', 'rawHighlights'],
        },
      },
    });
    const parsed = JSON.parse(response.text ?? '{}');
    return {
      findings: Array.isArray(parsed.findings) ? parsed.findings : [],
      rawHighlights: Array.isArray(parsed.rawHighlights) && parsed.rawHighlights.length > 0 ? parsed.rawHighlights : rawHighlights,
    };
  } catch (error: any) {
    console.warn(`[agentes] Resumen Gemini falló para ${sourceName}:`, error.message);
    return {
      findings: [],
      rawHighlights: [...rawHighlights, 'Resumen IA no disponible (verifica GEMINI_API_KEY)'],
    };
  }
}

async function runDatosGob(): Promise<Omit<AgentResult, 'id' | 'name' | 'description' | 'durationMs'>> {
  const queries = [
    `${CKAN_BASE}/package_search?q=nayarit&rows=15&sort=metadata_modified+desc`,
    `${CKAN_BASE}/package_search?q=nayarit+programas+sociales&rows=10`,
  ];
  const responses = await Promise.allSettled(queries.map(fetchJson));
  const datasets = new Map<string, any>();
  for (const r of responses) {
    if (r.status === 'fulfilled' && r.value?.result?.results) {
      for (const pkg of r.value.result.results) {
        if (pkg?.id && !datasets.has(pkg.id)) datasets.set(pkg.id, pkg);
      }
    }
  }
  if (datasets.size === 0) {
    const firstError = responses.find((r): r is PromiseRejectedResult => r.status === 'rejected');
    throw new Error(firstError ? String(firstError.reason?.message ?? firstError.reason) : 'Sin resultados del catálogo CKAN');
  }
  const compactLines = [...datasets.values()].slice(0, 20).map((pkg: any) => {
    const org = pkg.organization?.title ?? 'N/D';
    const formats = [...new Set((pkg.resources ?? []).map((r: any) => r.format).filter(Boolean))].join(', ');
    const notes = (pkg.notes ?? '').slice(0, 300);
    return `- "${pkg.title}" | Organización: ${org} | Formatos: ${formats} | ${notes}`;
  });
  const rawHighlights = compactLines.slice(0, 5).map(l => l.replace(/^- /, ''));
  const summary = await summarizeWithGemini('datos.gob.mx', `${datasets.size} datasets encontrados para Nayarit:\n${compactLines.join('\n')}`, rawHighlights);
  return { status: 'done', ...summary };
}

async function runDataMexico(): Promise<Omit<AgentResult, 'id' | 'name' | 'description' | 'durationMs'>> {
  const queries = [
    `${DATAMEXICO_BASE}?cube=inegi_denue&drilldowns=State,Sector&measures=Companies,Number+of+Employees&State=${DATAMEXICO_STATE_ID}&parents=false`,
    `${DATAMEXICO_BASE}?cube=economy_foreign_trade_ent&drilldowns=State,Year&measures=Trade+Value&State=${DATAMEXICO_STATE_ID}`,
  ];
  const responses = await Promise.allSettled(queries.map(fetchJson));
  const lines: string[] = [];
  for (const r of responses) {
    if (r.status === 'fulfilled' && Array.isArray(r.value?.data)) {
      for (const record of r.value.data.slice(0, 25)) {
        lines.push(Object.entries(record).map(([k, v]) => `${k}: ${v}`).join(' | '));
      }
    }
  }
  if (lines.length === 0) {
    const firstError = responses.find((r): r is PromiseRejectedResult => r.status === 'rejected');
    throw new Error(firstError ? String(firstError.reason?.message ?? firstError.reason) : 'Sin registros de DataMéxico para Nayarit');
  }
  const rawHighlights = lines.slice(0, 5);
  const summary = await summarizeWithGemini('DataMéxico', `Registros económicos de Nayarit (entidad 18):\n${lines.join('\n')}`, rawHighlights);
  return { status: 'done', ...summary };
}

async function runInegi(): Promise<Omit<AgentResult, 'id' | 'name' | 'description' | 'durationMs'>> {
  const token = process.env.INEGI_API_TOKEN;
  if (!token) {
    return {
      status: 'done',
      findings: ['Agente INEGI inactivo: configura INEGI_API_TOKEN para activar los indicadores oficiales.'],
      rawHighlights: ['Token gratuito disponible en inegi.org.mx (sección Desarrolladores)'],
    };
  }
  const ids = INEGI_INDICATORS.map(i => i.id).join(',');
  const url = `${INEGI_BASE}/${ids}/es/${INEGI_GEO_NAYARIT}/false/BISE/2.0/${token}?type=json`;
  const data = await fetchJson(url);
  const series = Array.isArray(data?.Series) ? data.Series : [];
  if (series.length === 0) throw new Error('INEGI no devolvió series para Nayarit');
  const lines = series.map((s: any) => {
    const label = INEGI_INDICATORS.find(i => i.id === String(s.INDICADOR))?.label ?? `Indicador ${s.INDICADOR}`;
    const latest = Array.isArray(s.OBSERVATIONS) && s.OBSERVATIONS.length > 0 ? s.OBSERVATIONS[s.OBSERVATIONS.length - 1] : null;
    return `${label}: ${latest ? `${latest.OBS_VALUE} (${latest.TIME_PERIOD})` : 'sin observaciones'}`;
  });
  const summary = await summarizeWithGemini('INEGI', `Indicadores oficiales de Nayarit:\n${lines.join('\n')}`, lines.slice(0, 5));
  return { status: 'done', ...summary };
}

const WORKER_RUNNERS: Record<AgentId, () => Promise<Omit<AgentResult, 'id' | 'name' | 'description' | 'durationMs'>>> = {
  datos_gob: runDatosGob,
  datamexico: runDataMexico,
  inegi: runInegi,
};

// Contrato: nunca lanza — un fallo de la fuente federal se reporta como status 'error' en el resultado.
export async function executeWorker(seed: WorkerSeed): Promise<AgentResult> {
  const t0 = Date.now();
  try {
    const partial = await WORKER_RUNNERS[seed.id]();
    return { ...seed, ...partial, durationMs: Date.now() - t0 };
  } catch (error: any) {
    return {
      ...seed,
      status: 'error',
      findings: [],
      rawHighlights: [],
      error: error?.message ?? 'Error desconocido consultando la fuente federal',
      durationMs: Date.now() - t0,
    };
  }
}
