import {
  collection, addDoc, getDocs, updateDoc, doc,
  query, orderBy, serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';

export type ReportType   = 'ANOMALY' | 'VALIDATION' | 'MAINTENANCE_REQ';
export type ReportStatus = 'PENDING' | 'IN_REVIEW' | 'RESOLVED';

export interface CitizenReport {
  id:          string;
  assetId:     string;
  assetName:   string;
  type:        ReportType;
  status:      ReportStatus;
  description: string;
  timestamp:   string;
  citizenName: string;
  evidenceUrl?: string;
}

// DAT-1: Migrado de array en memoria a Firestore.
// Los reportes persisten entre reinicios y entre sesiones de usuario.
const REPORTS_COL = 'citizen_reports';

export const getCitizenReports = async (): Promise<CitizenReport[]> => {
  const q = query(collection(db, REPORTS_COL), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({
    id: d.id,
    ...(d.data() as Omit<CitizenReport, 'id'>),
  }));
};

export const submitReport = async (
  report: Omit<CitizenReport, 'id' | 'status' | 'timestamp'>,
): Promise<CitizenReport> => {
  const now = new Date().toISOString();
  const docRef = await addDoc(collection(db, REPORTS_COL), {
    ...report,
    status:    'PENDING' as ReportStatus,
    timestamp: now,
    createdAt: serverTimestamp(),
  });
  return { id: docRef.id, ...report, status: 'PENDING', timestamp: now };
};

export const updateReportStatus = async (
  reportId: string,
  status: ReportStatus,
): Promise<void> => {
  await updateDoc(doc(db, REPORTS_COL, reportId), {
    status,
    updatedAt: serverTimestamp(),
  });
};
