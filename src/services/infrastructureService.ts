import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  doc, 
  query, 
  orderBy,
  Timestamp,
  getDocFromServer
} from 'firebase/firestore';
import { db } from '../firebase';

export type AssetType = 'ROAD' | 'BRIDGE' | 'SCHOOL' | 'HEALTH_CENTER' | 'WATER_INFRA' | 'ENERGY' | 'SECURITY';
export type AssetStatus = 'OPTIMAL' | 'RISK' | 'CRITICAL' | 'UNDER_MAINTENANCE' | 'PLANNED';

export interface InfrastructureAsset {
  id?: string;
  iun: string; // Identificador Único Nayarit (Ej: NAY-ROA-2026-001)
  name: string;
  type: AssetType;
  status: AssetStatus;
  departmentId: string; // Relación con la dependencia responsable
  location: {
    lat: number;
    lng: number;
    address: string;
    municipality: string;
  };
  metrics: {
    integrityScore: number; // 0-100 calculado por IA
    physicalCondition: number; // 0-100 reporte técnico
    socialImpact: number; // 0-100 basado en beneficiarios
    lastAuditDate: string;
    investmentAmount: number;
    beneficiaries: number;
  };
  description: string;
  responsible: string;
  path?: { lat: number; lng: number }[];
  tags: string[];
  metadata: {
    createdAt: string;
    updatedAt: string;
    version: number;
    source: 'MANUAL' | 'IOT' | 'CITIZEN_REPORT' | 'SATELLITE';
  };
}

const COLLECTION_NAME = 'infrastructure';

export const getMasterRegistry = async (): Promise<InfrastructureAsset[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('nayaritId', 'asc'));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      // Si está vacío, podríamos inicializar con datos semilla o retornar vacío
      return [];
    }

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as InfrastructureAsset));
  } catch (error) {
    console.error("Error fetching infrastructure registry:", error);
    return [];
  }
};

export const saveAsset = async (asset: Omit<InfrastructureAsset, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...asset,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error saving asset:", error);
    throw error;
  }
};

export const updateAssetStatus = async (id: string, status: AssetStatus, integrityScore: number): Promise<void> => {
  try {
    const assetRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(assetRef, {
      status,
      'metrics.integrityScore': integrityScore,
      'metrics.lastAuditDate': new Date().toISOString().split('T')[0],
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error("Error updating asset status:", error);
    throw error;
  }
};

export const seedInfrastructure = async () => {
  const assets = await getMasterRegistry();
  if (assets.length > 0) return;

  const initialAssets: Omit<InfrastructureAsset, 'id'>[] = [
    {
      iun: 'NAY-ROA-2026-001',
      name: 'Autopista Tepic-San Blas',
      type: 'ROAD',
      status: 'OPTIMAL',
      departmentId: 'sec-infra',
      location: { 
        lat: 21.52, 
        lng: -104.95, 
        address: 'Tramo Tepic-San Blas, Nayarit',
        municipality: 'San Blas'
      },
      path: [
        { lat: 21.5039, lng: -104.8947 },
        { lat: 21.51, lng: -104.92 },
        { lat: 21.52, lng: -104.95 }
      ],
      metrics: {
        integrityScore: 94,
        physicalCondition: 92,
        socialImpact: 88,
        lastAuditDate: '2026-03-15',
        investmentAmount: 450000000,
        beneficiaries: 120000
      },
      description: 'Arteria vital para el turismo y comercio costero.',
      responsible: 'Secretaría de Infraestructura',
      tags: ['TURISMO', 'LOGISTICA', 'ESTRATEGICO'],
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        version: 1,
        source: 'MANUAL'
      }
    },
    {
      iun: 'NAY-SCH-2026-001',
      name: 'Universidad Tecnológica de Nayarit',
      type: 'SCHOOL',
      status: 'OPTIMAL',
      departmentId: 'sec-edu',
      location: { 
        lat: 21.48, 
        lng: -104.85, 
        address: 'Ciudad del Conocimiento, Tepic',
        municipality: 'Tepic'
      },
      metrics: {
        integrityScore: 98,
        physicalCondition: 96,
        socialImpact: 95,
        lastAuditDate: '2026-02-20',
        investmentAmount: 120000000,
        beneficiaries: 5000
      },
      description: 'Centro de excelencia académica y tecnológica.',
      responsible: 'SEP Nayarit',
      tags: ['EDUCACION', 'TECNOLOGIA'],
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        version: 1,
        source: 'MANUAL'
      }
    }
  ];

  await Promise.all(initialAssets.map(asset => saveAsset(asset)));
};
