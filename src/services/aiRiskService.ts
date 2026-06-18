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

export const analyzeRisksWithAI = async (
  departments: Department[], 
  logs: AuditLog[]
): Promise<RiskAnalysisResult> => {
  try {
    const response = await fetch('/api/ai/analyze-risks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ departments, logs }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to analyze risks');
    }

    return await response.json();
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
