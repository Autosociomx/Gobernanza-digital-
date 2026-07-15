import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { signInAnonymously } from 'firebase/auth';
import { db, storage, auth } from '../firebase';

/**
 * Perfil de Salud ligado al CURP — no a una cuenta de la app.
 *
 * Resuelve el vacío real: el ciudadano que usa el Centro de Salud gratuito
 * no tiene ningún expediente que lo siga (los estudios se mandan por
 * WhatsApp, sin control). Aquí el perfil existe aunque la persona nunca
 * tenga cuenta ni smartphone — lo puede crear ella misma, un familiar, o
 * personal de salud (practicante / trabajadora social) con un código de
 * personal vigente. El control de acceso real vive en firestore.rules;
 * este servicio solo arma las llamadas correctas.
 */

export type RolRegistro = 'paciente' | 'familiar' | 'practicante' | 'trabajadora_social' | 'promotor';
export type TipoDocumento = 'rayos_x' | 'laboratorio' | 'receta' | 'otro';
export type NivelTriage = 'ROJO' | 'AMARILLO' | 'VERDE' | null;

export interface PerfilSalud {
  curp: string;
  nombre: string;
  fechaNacimiento?: string;
  telefono?: string;
  contactoFamiliar?: string;
  registradoPorRol: RolRegistro;
  uidVinculado?: string;
  /** Requerido si registradoPorRol es practicante/trabajadora_social/promotor. */
  codigoPersonal?: string;
  /** Si el paciente autoriza que personal de otro centro vea su expediente sin ser urgencia. Default true al crear. */
  consentimientoActivo?: boolean;
}

export interface AccesoSalud {
  id: string;
  /** Nombre de quien consultó (personal con cuenta en la app). */
  quien: string;
  /** Obligatorio cuando autorizado es false — motivo del acceso de emergencia. */
  motivo?: string;
  /** false cuando se consultó sin que el paciente tuviera el consentimiento activo. */
  autorizado: boolean;
  fecha: Date;
}

export interface DocumentoSalud {
  id: string;
  tipo: TipoDocumento;
  urlArchivo: string;
  nombreArchivo?: string;
  descripcion?: string;
  subidoPorRol: RolRegistro;
  fecha: Date;
}

export interface ConsultaSalud {
  id: string;
  resumen: string;
  nivelTriage: NivelTriage;
  atendidoPorRol: RolRegistro;
  fecha: Date;
}

const CURP_REGEX = /^[A-Z]{4}[0-9]{6}[A-Z]{6}[0-9A-Z][0-9]$/;

export function esCurpValido(curp: string): boolean {
  return CURP_REGEX.test(curp.toUpperCase().trim());
}

export class CodigoPersonalInvalidoError extends Error {
  constructor() {
    super('El código de personal no es válido o no está activo.');
    this.name = 'CodigoPersonalInvalidoError';
  }
}

export class SesionSaludError extends Error {
  constructor() {
    super('No se pudo iniciar una sesión para verificar tu perfil de salud.');
    this.name = 'SesionSaludError';
  }
}

/**
 * El módulo de Salud no exige iniciar sesión con Google (familiares y
 * pacientes sin cuenta deben poder usarlo con fricción mínima), pero
 * firestore.rules exige `isAuthenticated()` incluso para la lectura que
 * verifica si un perfil ya existe. Se resuelve con una sesión anónima
 * invisible para quien no tenga ya una sesión — no reemplaza el login
 * con Google si ya existe uno.
 *
 * Requiere que el proveedor "Anónimo" esté habilitado en Firebase
 * Authentication → Sign-in method. Si no lo está, esta llamada falla
 * con `auth/admin-restricted-operation` y se traduce en SesionSaludError.
 */
async function asegurarSesion(): Promise<void> {
  if (auth.currentUser) return;
  try {
    await signInAnonymously(auth);
  } catch (err) {
    console.error('[saludPerfilService] No se pudo iniciar sesión anónima:', err);
    throw new SesionSaludError();
  }
}

export async function obtenerPerfil(curp: string): Promise<PerfilSalud | null> {
  const snap = await getDoc(doc(db, 'perfiles_salud', curp.toUpperCase().trim()));
  return snap.exists() ? (snap.data() as PerfilSalud) : null;
}

/**
 * Crea el perfil si no existe. Si el rol requiere código de personal
 * (practicante/trabajadora_social/promotor) y el código es inválido o
 * inactivo, Firestore rechaza la escritura — se traduce ese rechazo en
 * un error legible para mostrar en la interfaz.
 */
export async function crearPerfilSiNoExiste(
  curp: string,
  datos: Omit<PerfilSalud, 'curp'>
): Promise<PerfilSalud> {
  const curpNorm = curp.toUpperCase().trim();
  if (!esCurpValido(curpNorm)) {
    throw new Error('El CURP no tiene un formato válido.');
  }

  await asegurarSesion();

  let existente: PerfilSalud | null;
  try {
    existente = await obtenerPerfil(curpNorm);
  } catch (err) {
    console.error('[saludPerfilService] No se pudo leer el perfil existente:', err);
    throw err;
  }
  if (existente) return existente;

  // Para el rol "paciente" el perfil debe quedar ligado a ALGUNA sesión
  // (Google si ya existía, o la anónima que acabamos de asegurar arriba)
  // para que las reglas de Firestore ("uidVinculado == request.auth.uid")
  // lo acepten — no basta con que el componente haya pasado un uid externo
  // si en ese momento no había ninguna sesión iniciada.
  const uidVinculado = datos.uidVinculado
    || (datos.registradoPorRol === 'paciente' ? auth.currentUser?.uid : undefined);

  const perfil: PerfilSalud & { creadoEn: unknown } = {
    curp: curpNorm,
    nombre: datos.nombre,
    registradoPorRol: datos.registradoPorRol,
    consentimientoActivo: true,
    creadoEn: serverTimestamp(),
    ...(datos.fechaNacimiento ? { fechaNacimiento: datos.fechaNacimiento } : {}),
    ...(datos.telefono ? { telefono: datos.telefono } : {}),
    ...(datos.contactoFamiliar ? { contactoFamiliar: datos.contactoFamiliar } : {}),
    ...(uidVinculado ? { uidVinculado } : {}),
    ...(datos.codigoPersonal ? { codigoPersonal: datos.codigoPersonal } : {}),
  };

  try {
    await setDoc(doc(db, 'perfiles_salud', curpNorm), perfil);
  } catch (err: any) {
    console.error('[saludPerfilService] No se pudo crear el perfil:', err);
    // El código de personal inválido es la única causa de permission-denied
    // que tiene un mensaje específico; para paciente/familiar (sin código)
    // un permission-denied aquí es otra cosa (p. ej. reglas no desplegadas)
    // y debe verse el error real, no uno que culpa a un código que no existe.
    if (err?.code === 'permission-denied' && datos.codigoPersonal) throw new CodigoPersonalInvalidoError();
    throw err;
  }
  return perfil;
}

export async function subirDocumento(
  curp: string,
  archivo: File,
  tipo: TipoDocumento,
  subidoPorRol: RolRegistro,
  codigoPersonal?: string,
  descripcion?: string
): Promise<void> {
  const curpNorm = curp.toUpperCase().trim();
  const rutaArchivo = `salud/${curpNorm}/${Date.now()}-${archivo.name}`;
  const storageRef = ref(storage, rutaArchivo);

  await uploadBytes(storageRef, archivo);
  const urlArchivo = await getDownloadURL(storageRef);

  try {
    await addDoc(collection(db, 'perfiles_salud', curpNorm, 'documentos'), {
      tipo,
      urlArchivo,
      nombreArchivo: archivo.name,
      ...(descripcion ? { descripcion } : {}),
      subidoPorRol,
      ...(codigoPersonal ? { codigoPersonal } : {}),
      fecha: serverTimestamp(),
    });
  } catch (err: any) {
    if (err?.code === 'permission-denied') throw new CodigoPersonalInvalidoError();
    throw err;
  }
}

/** Solo visible para el paciente vinculado a su propio perfil, o un admin — ver firestore.rules. */
export async function listarDocumentos(curp: string): Promise<DocumentoSalud[]> {
  const curpNorm = curp.toUpperCase().trim();
  const snap = await getDocs(
    query(collection(db, 'perfiles_salud', curpNorm, 'documentos'), orderBy('fecha', 'desc'))
  );
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any), fecha: d.data().fecha?.toDate?.() ?? new Date() }));
}

export async function registrarConsulta(
  curp: string,
  resumen: string,
  nivelTriage: NivelTriage,
  atendidoPorRol: RolRegistro,
  codigoPersonal?: string
): Promise<void> {
  const curpNorm = curp.toUpperCase().trim();
  await addDoc(collection(db, 'perfiles_salud', curpNorm, 'consultas'), {
    resumen: resumen.slice(0, 3000),
    nivelTriage,
    atendidoPorRol,
    ...(codigoPersonal ? { codigoPersonal } : {}),
    fecha: serverTimestamp(),
  });
}

/**
 * Solo el paciente vinculado a su propio perfil (o un admin) puede cambiar
 * esto — ver firestore.rules: es el único campo que un familiar o el
 * personal que registró el perfil NO puede tocar después.
 */
export async function actualizarConsentimiento(curp: string, activo: boolean): Promise<void> {
  const curpNorm = curp.toUpperCase().trim();
  await updateDoc(doc(db, 'perfiles_salud', curpNorm), { consentimientoActivo: activo });
}

/**
 * Bitácora de acceso — "quién ha visto mi expediente". La crea el personal
 * con cuenta en la app (editor/admin) al consultar un perfil; el paciente
 * vinculado (o un admin) es quien puede leerla, nunca el personal que la
 * generó. Ver docs/marco/MODULO_SALUD_CURP.md.
 */
export async function registrarAcceso(
  curp: string,
  quien: string,
  autorizado: boolean,
  motivo?: string
): Promise<void> {
  const curpNorm = curp.toUpperCase().trim();
  await addDoc(collection(db, 'perfiles_salud', curpNorm, 'accesos'), {
    quien,
    autorizado,
    ...(motivo ? { motivo: motivo.slice(0, 500) } : {}),
    fecha: serverTimestamp(),
  });
}

/** Solo visible para el paciente vinculado a su propio perfil, o un admin — ver firestore.rules. */
export async function listarAccesos(curp: string): Promise<AccesoSalud[]> {
  const curpNorm = curp.toUpperCase().trim();
  const snap = await getDocs(
    query(collection(db, 'perfiles_salud', curpNorm, 'accesos'), orderBy('fecha', 'desc'))
  );
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any), fecha: d.data().fecha?.toDate?.() ?? new Date() }));
}
