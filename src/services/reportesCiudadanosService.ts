import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Reportes ciudadanos reales (bache, luminaria, falla hídrica) — reemplazan
 * los botones "Auditoría de Luminaria/Bacheo/Falla Hídrica" que antes no
 * hacían nada. Los puede crear el ciudadano desde el formulario, o Aura
 * desde el chat vía function calling (ver server.ts) cuando el ciudadano
 * describe un problema concreto y confirma que quiere reportarlo.
 */

export type TipoIncidencia = 'bache' | 'luminaria' | 'falla_hidrica' | 'otro';
export type EstadoReporte = 'nuevo' | 'en_revision' | 'resuelto';
export type OrigenReporte = 'chat_aura' | 'formulario';

export interface ReporteCiudadano {
  id: string;
  tipo: TipoIncidencia;
  descripcion: string;
  ubicacion?: string;
  uid: string;
  estado: EstadoReporte;
  origen: OrigenReporte;
  creadoEn: Date;
}

export async function crearReporte(
  uid: string,
  tipo: TipoIncidencia,
  descripcion: string,
  ubicacion?: string,
  origen: OrigenReporte = 'formulario'
): Promise<void> {
  await addDoc(collection(db, 'reportes_ciudadanos'), {
    tipo,
    descripcion: descripcion.slice(0, 1000),
    uid,
    estado: 'nuevo' as EstadoReporte,
    origen,
    ...(ubicacion ? { ubicacion: ubicacion.slice(0, 300) } : {}),
    creadoEn: serverTimestamp(),
  });
}

/** Solo ve sus propios reportes — el resto (personal editor/admin) se gestiona desde el C5. */
export async function listarMisReportes(uid: string): Promise<ReporteCiudadano[]> {
  const snap = await getDocs(
    query(collection(db, 'reportes_ciudadanos'), where('uid', '==', uid), orderBy('creadoEn', 'desc'))
  );
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any), creadoEn: d.data().creadoEn?.toDate?.() ?? new Date() }));
}
