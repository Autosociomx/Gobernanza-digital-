/**
 * citizenService — MOCK EN MEMORIA. NO HAY PERSISTENCIA REAL.
 *
 * A diferencia del resto de `src/services/` (citasSaludService, departmentService,
 * infrastructureService, saludPerfilService), este módulo NO habla con Firestore
 * ni con ningún backend. Todo vive en el array `CITIZEN_REPORTS` de este archivo:
 *
 *   - `getCitizenReports()` devuelve ese array tras un `setTimeout` de 600 ms que
 *     únicamente simula latencia de red.
 *   - `submitReport()` hace `unshift` sobre el array en memoria. El reporte se
 *     pierde en cuanto se recarga la pestaña; no se escribe en ningún lado, no
 *     genera folio auditable y no es visible para ningún otro usuario.
 *
 * Consecuencia operativa: cualquier superficie de UI que se conecte a este
 * servicio NO está recibiendo reportes ciudadanos reales. No debe presentarse
 * como trazabilidad ciudadana ante terceros mientras `IS_MOCK` sea `true`.
 *
 * Se etiqueta explícitamente siguiendo el precedente de `contextosRuntimeClient.ts`,
 * que marca sus respuestas con `executionMode: 'LAB_MOCK'`.
 *
 * Convertirlo a Firestore real está FUERA DE ALCANCE de este cambio: requiere
 * definir esquema de colección, reglas de seguridad (quién lee/escribe reportes
 * de terceros), política de retención y tratamiento de datos personales del
 * ciudadano que reporta (`citizenName`, `evidenceUrl`).
 */

/**
 * Bandera programática de modo simulado. Permite a cualquier consumidor
 * detectar que los datos no son reales (p. ej. para pintar un badge "DEMO"
 * o bloquear el envío en producción) sin inspeccionar la implementación.
 */
export const IS_MOCK = true;

export type ReportType = 'ANOMALY' | 'VALIDATION' | 'MAINTENANCE_REQ';
export type ReportStatus = 'PENDING' | 'IN_REVIEW' | 'RESOLVED';

export interface CitizenReport {
  id: string;
  assetId: string; // Vinculado al ID Nayarit
  assetName: string;
  type: ReportType;
  status: ReportStatus;
  description: string;
  timestamp: string;
  citizenName: string;
  evidenceUrl?: string;
}

// Almacén de Reportes Ciudadanos (Simulación de Trazabilidad)
const CITIZEN_REPORTS: CitizenReport[] = [
  {
    id: 'REP-001',
    assetId: 'NAY-ROA-001',
    assetName: 'Corredor Logístico Tepic-San Blas',
    type: 'ANOMALY',
    status: 'IN_REVIEW',
    description: 'Bache profundo detectado en el km 12. Riesgo de accidente.',
    timestamp: '2026-03-20T14:30:00Z',
    citizenName: 'Juan Pérez'
  },
  {
    id: 'REP-002',
    assetId: 'NAY-WAT-005',
    assetName: 'Planta Potabilizadora Acuífero Norte',
    type: 'ANOMALY',
    status: 'PENDING',
    description: 'Fuga de agua masiva en la válvula de presión norte.',
    timestamp: '2026-03-21T09:15:00Z',
    citizenName: 'María García'
  }
];

export const getCitizenReports = async (): Promise<CitizenReport[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(CITIZEN_REPORTS), 600);
  });
};

export const submitReport = async (report: Omit<CitizenReport, 'id' | 'status' | 'timestamp'>): Promise<CitizenReport> => {
  const newReport: CitizenReport = {
    ...report,
    id: `REP-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
    status: 'PENDING',
    timestamp: new Date().toISOString()
  };
  
  // En un sistema real, aquí se guardaría en Firestore
  CITIZEN_REPORTS.unshift(newReport);
  return newReport;
};
