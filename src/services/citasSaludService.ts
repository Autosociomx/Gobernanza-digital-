import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';
import type { RolRegistro } from './saludPerfilService';

/**
 * Portal de Citas — agenda ligada al mismo Perfil de Salud por CURP.
 *
 * La cola de citas la gestiona el personal que YA tiene cuenta en la app
 * (rol 'editor'/'admin' en la colección `users`, la misma que ya usan
 * otros módulos) — es un caso distinto al registro asistido de alguien
 * sin cuenta, que sigue usando el código de personal de personal_salud.
 *
 * Nota de honestidad: "especialidad" es texto libre / catálogo genérico
 * en este v1 — no existe todavía un catálogo real por centro de salud
 * (ver docs/marco/MODULO_SALUD_CURP.md). No se inventan horarios ni
 * disponibilidad real; el personal confirma la fecha real por su cuenta.
 */

export type EstadoCita = 'solicitada' | 'confirmada' | 'cancelada' | 'atendida';

export interface CitaSalud {
  id: string;
  curp: string;
  nombrePaciente: string;
  centroSalud?: string;
  especialidad: string;
  fechaSolicitada: string;
  horaPreferida?: string;
  motivo?: string;
  estado: EstadoCita;
  creadoPorRol: RolRegistro;
  creadoEn?: Date;
}

/** Categorías comunes de un centro de salud — no es un catálogo real por sede, ver nota arriba. */
export const ESPECIALIDADES_COMUNES = [
  'Medicina General',
  'Odontología',
  'Nutrición',
  'Psicología',
  'Ginecología',
  'Pediatría',
  'Otro',
] as const;

export async function solicitarCita(datos: {
  curp: string;
  nombrePaciente: string;
  especialidad: string;
  fechaSolicitada: string;
  horaPreferida?: string;
  motivo?: string;
  centroSalud?: string;
  creadoPorRol: RolRegistro;
  codigoPersonal?: string;
}): Promise<void> {
  const curpNorm = datos.curp.toUpperCase().trim();
  await addDoc(collection(db, 'citas_salud'), {
    curp: curpNorm,
    nombrePaciente: datos.nombrePaciente,
    especialidad: datos.especialidad,
    fechaSolicitada: datos.fechaSolicitada,
    estado: 'solicitada' as EstadoCita,
    creadoPorRol: datos.creadoPorRol,
    creadoEn: serverTimestamp(),
    ...(datos.horaPreferida ? { horaPreferida: datos.horaPreferida } : {}),
    ...(datos.motivo ? { motivo: datos.motivo } : {}),
    ...(datos.centroSalud ? { centroSalud: datos.centroSalud } : {}),
    ...(datos.codigoPersonal ? { codigoPersonal: datos.codigoPersonal } : {}),
  });
}

/** Solo visible para el propio paciente vinculado — ver firestore.rules. */
export async function listarMisCitas(curp: string): Promise<CitaSalud[]> {
  const curpNorm = curp.toUpperCase().trim();
  const snap = await getDocs(
    query(collection(db, 'citas_salud'), where('curp', '==', curpNorm), orderBy('fechaSolicitada', 'desc'))
  );
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
}

/** Solo para personal con rol editor/admin — ve la cola completa. */
export async function listarColaCitas(): Promise<CitaSalud[]> {
  const snap = await getDocs(query(collection(db, 'citas_salud'), orderBy('fechaSolicitada', 'asc')));
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
}

/** Solo para personal con rol editor/admin. */
export async function actualizarEstadoCita(cita: CitaSalud, nuevoEstado: EstadoCita): Promise<void> {
  await updateDoc(doc(db, 'citas_salud', cita.id), {
    curp: cita.curp,
    nombrePaciente: cita.nombrePaciente,
    especialidad: cita.especialidad,
    fechaSolicitada: cita.fechaSolicitada,
    estado: nuevoEstado,
    creadoPorRol: cita.creadoPorRol,
    creadoEn: cita.creadoEn ?? serverTimestamp(),
    ...(cita.horaPreferida ? { horaPreferida: cita.horaPreferida } : {}),
    ...(cita.motivo ? { motivo: cita.motivo } : {}),
    ...(cita.centroSalud ? { centroSalud: cita.centroSalud } : {}),
  });
}
