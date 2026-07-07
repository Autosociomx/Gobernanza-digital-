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

// El análisis corre en el servidor (/api/ai/risk-analysis): la key de Gemini
// no existe en el navegador y el prompt forense vive junto al resto de la
// configuración de IA en server.ts.
export const analyzeRisksWithAI = async (
  departments: Department[],
  logs: AuditLog[]
): Promise<RiskAnalysisResult> => {
  try {
    const res = await fetch("/api/ai/risk-analysis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ departments, logs }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.error || `Error ${res.status} del servidor de IA`);
    }
    return await res.json();
  } catch (error) {
    console.error("AI Risk Analysis Error:", error);
    return {
      score: 0,
      level: 'LOW',
      findings: ["Falla en la orquestación del análisis de IA"],
      recommendations: ["Verificar que el servidor de IA esté disponible (/api/ai/risk-analysis)"],
      anomaliesDetected: false,
      summary: "Análisis interrumpido por anomalía técnica en el motor cognitivo.",
      strategicOutlook: "Incierto debido a la falta de datos procesados.",
      sovereigntyIndex: 0,
      governanceMaturity: 'INITIAL'
    };
  }
};
