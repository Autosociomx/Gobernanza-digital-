import { Department, AuditLog } from "./departmentService";

// El análisis corre en el servidor (/api/ai/risk-analysis): la llave de
// Gemini nunca se envía al navegador. Antes este módulo creaba su propio
// cliente GoogleGenAI con process.env.GEMINI_API_KEY inyectada al bundle.

export interface RiskAnalysisResult {
  score: number;
  level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  findings: string[];
  recommendations: string[];
  anomaliesDetected: boolean;
  summary: string;
  strategicOutlook: string;
  sovereigntyIndex: number;
  governanceMaturity: 'INITIAL' | 'DEVELOPING' | 'OPTIMIZED' | 'ELITE';
}

export const analyzeRisksWithAI = async (
  departments: Department[],
  logs: AuditLog[]
): Promise<RiskAnalysisResult> => {
  try {
    const response = await fetch('/api/ai/risk-analysis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ departments, logs }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || `Error ${response.status} en el análisis de riesgos`);
    }

    return await response.json();
  } catch (error) {
    console.error("AI Risk Analysis Error:", error);
    return {
      score: 0,
      level: 'LOW',
      findings: ["Falla en la orquestación del análisis de IA"],
      recommendations: ["Restablecer conexión con el núcleo de análisis del servidor"],
      anomaliesDetected: false,
      summary: "Análisis interrumpido por anomalía técnica en el motor cognitivo.",
      strategicOutlook: "Incierto debido a la falta de datos procesados.",
      sovereigntyIndex: 0,
      governanceMaturity: 'INITIAL'
    };
  }
};
