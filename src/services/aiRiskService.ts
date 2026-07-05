import { Department, AuditLog } from "./departmentService";

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

// El análisis corre server-side (/api/ai/risk-analysis) para no exponer la API key en el navegador.
export const analyzeRisksWithAI = async (
  departments: Department[],
  logs: AuditLog[]
): Promise<RiskAnalysisResult> => {
  try {
    const res = await fetch('/api/ai/risk-analysis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ departments, logs }),
    });
    const data = await res.json();
    if (!res.ok || data.error) throw new Error(data.error || `HTTP ${res.status}`);
    return data as RiskAnalysisResult;
  } catch (error) {
    console.error("AI Risk Analysis Error:", error);
    return {
      score: 0,
      level: 'LOW',
      findings: ["Falla en la orquestación del análisis de IA"],
      recommendations: ["Restablecer conexión con el núcleo de Google AI Studio"],
      anomaliesDetected: false,
      summary: "Análisis interrumpido por anomalía técnica en el motor cognitivo.",
      strategicOutlook: "Incierto debido a la falta de datos procesados.",
      sovereigntyIndex: 0,
      governanceMaturity: 'INITIAL'
    };
  }
};
