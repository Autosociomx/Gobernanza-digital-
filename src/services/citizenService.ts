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
