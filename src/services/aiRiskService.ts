import { Department, AuditLog } from "./departmentService";

// El análisis de riesgos se ejecuta en el servidor (/api/ai/risk-analysis),
// impulsado por Claude (Anthropic). La credencial de IA nunca se expone al navegador.

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

    const data = await response.json();
    if (!response.ok || data.error) {
      throw new Error(data.error || `Error HTTP ${response.status}`);
    }

    return data as RiskAnalysisResult;
  } catch (error) {
    console.error("AI Risk Analysis Error:", error);
    return {
      score: 0,
      level: 'LOW',
      findings: ["Falla en la orquestación del análisis de IA"],
      recommendations: ["Restablecer conexión con el motor de IA (Anthropic Claude)"],
      anomaliesDetected: false,
      summary: "Análisis interrumpido por anomalía técnica en el motor cognitivo.",
      strategicOutlook: "Incierto debido a la falta de datos procesados.",
      sovereigntyIndex: 0,
      governanceMaturity: 'INITIAL'
    };
  }
};
