import { db } from '../firebase';
import { doc, setDoc, increment, arrayUnion, Timestamp } from 'firebase/firestore';

export interface EntradaPuntos {
  concepto: string;
  puntos: number;
  fecha: Timestamp;
  folio?: string;
}

export async function sumarPuntos(
  uid: string,
  concepto: string,
  puntos: number,
  folio?: string
): Promise<void> {
  const ref = doc(db, 'puntos', uid);
  const entrada: EntradaPuntos = {
    concepto,
    puntos,
    fecha: Timestamp.now(),
    ...(folio ? { folio } : {}),
  };
  await setDoc(
    ref,
    { total: increment(puntos), historial: arrayUnion(entrada) },
    { merge: true }
  );
}

// Tabla de puntos por evento
export const PUNTOS = {
  REPORTE_CREADO:         50,
  REPORTE_VERIFICADO:    100,
  TRAMITE_INICIADO:       75,
  TRAMITE_APROBADO:      150,
  EXPEDIENTE_COMPLETO:   100,
  LOGIN_DIARIO:           30,
  PERFIL_COMPLETO:        25,
} as const;
