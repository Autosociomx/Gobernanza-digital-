import { Type } from "@google/genai";
import { getAI } from "./aiClients";

export async function analyzeRisks(departments: unknown[], logs: unknown[]): Promise<any> {
  const prompt = `
    IDENTIDAD: Actúa como el G-Agente CX, el Oráculo de Gobernanza Digital de Élite y Auditor Forense de Grado Industrial.
    MISIÓN: Realizar un análisis exhaustivo de la infraestructura de datos gubernamentales para garantizar la soberanía digital y la integridad sistémica.

    CONTEXTO OPERATIVO:
    - 48 Dependencias Gubernamentales bajo monitoreo.
    - Registros de auditoría inmutables.

    DATOS DE ENTRADA (DEPENDENCIAS):
    ${JSON.stringify(departments, null, 2)}

    DATOS DE ENTRADA (LOGS DE AUDITORÍA):
    ${JSON.stringify(logs, null, 2)}

    DIRECTIVAS DE ANÁLISIS:
    1. Evaluar la coherencia estratégica de las misiones de las dependencias.
    2. Detectar anomalías en la frecuencia y tipo de operaciones (CREATE, UPDATE, DELETE).
    3. Identificar riesgos de colusión o manipulación de datos mediante patrones de acceso.
    4. Calcular el Índice de Soberanía Digital basado en la integridad y trazabilidad de los datos.
    5. Determinar la Madurez de Gobernanza (INITIAL, DEVELOPING, OPTIMIZED, ELITE).

    REQUERIMIENTOS DE SALIDA:
    Responde estrictamente en formato JSON con la siguiente estructura técnica:
    {
      "score": (número 0-100, donde 100 es riesgo crítico),
      "level": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
      "findings": ["hallazgo estratégico 1", "hallazgo estratégico 2"],
      "recommendations": ["acción táctica 1", "acción táctica 2"],
      "anomaliesDetected": boolean,
      "summary": "resumen ejecutivo de alto nivel",
      "strategicOutlook": "proyección estratégica a largo plazo",
      "sovereigntyIndex": (número 0-100, donde 100 es soberanía total),
      "governanceMaturity": "INITIAL" | "DEVELOPING" | "OPTIMIZED" | "ELITE"
    }
  `;

  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER },
          level: { type: Type.STRING, enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"] },
          findings: { type: Type.ARRAY, items: { type: Type.STRING } },
          recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
          anomaliesDetected: { type: Type.BOOLEAN },
          summary: { type: Type.STRING },
          strategicOutlook: { type: Type.STRING },
          sovereigntyIndex: { type: Type.NUMBER },
          governanceMaturity: { type: Type.STRING, enum: ["INITIAL", "DEVELOPING", "OPTIMIZED", "ELITE"] }
        },
        required: ["score", "level", "findings", "recommendations", "anomaliesDetected", "summary", "strategicOutlook", "sovereigntyIndex", "governanceMaturity"]
      }
    }
  });

  return JSON.parse(response.text ?? '{}');
}
