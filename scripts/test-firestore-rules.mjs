// Pruebas reproducibles de firestore.rules usando @firebase/rules-unit-testing
// y el emulador real de Firestore.
//
// Cómo correr:
//   JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64 \
//   npx firebase emulators:exec --only firestore "node scripts/test-firestore-rules.mjs"
//
// Demuestra (no solo declara) el comportamiento de las reglas de seguridad
// del módulo de salud. Sustituye el antiguo claim "8/8 tests" que no tenía
// archivo de prueba verificable.

import { initializeTestEnvironment, assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import { readFileSync } from 'node:fs';

const RULES = readFileSync(new URL('../firestore.rules', import.meta.url), 'utf8');
const PROJECT_ID = 'demo-orbe-audit';

// Curps con formato válido ^[A-Z]{4}[0-9]{6}[A-Z]{6}[0-9A-Z][0-9]$  (18 chars)
const CURP_PACIENTE = 'PEGA900101HNTRRR09';
const CURP_OTRO = 'JUAN850101HNTRRR09';

const UID_PACIENTE = 'uid-paciente';
const UID_OTRO = 'uid-otro';
const UID_PRACTICANTE = 'uid-practicante';
const UID_AJENO = 'uid-ajeno';
const UID_ADMIN = 'uid-admin';

let env;
const results = [];
let passed = 0;
let failed = 0;

function t(name, fn) {
  return async () => {
    try {
      await fn();
      passed++;
      results.push({ name, status: 'PASS' });
    } catch (e) {
      failed++;
      results.push({ name, status: 'FAIL', error: String(e?.message || e).split('\n')[0] });
    }
  };
}

function perfilBase(curp, uidVinculado, registradoPorRol, extra = {}) {
  return {
    curp,
    nombre: 'Paciente de Prueba',
    registradoPorRol,
    uidVinculado,
    creadoEn: new Date(),
    ...extra,
  };
}

async function main() {
  env = await initializeTestEnvironment({
    projectId: PROJECT_ID,
    firestore: { rules: RULES },
  });

  // ---- Sembrar estado base con reglas deshabilitadas (patrón oficial) ----
  await env.withSecurityRulesDisabled(async (ctx) => {
    const db = ctx.firestore();
    // usuarios con roles
    await db.doc(`users/${UID_ADMIN}`).set({ name: 'Admin', email: 'admin@test.com', role: 'admin' });
    await db.doc(`users/${UID_PACIENTE}`).set({ name: 'Paciente', email: 'p@test.com', role: 'citizen' });
    await db.doc(`users/${UID_PRACTICANTE}`).set({ name: 'Practicante', email: 'pr@test.com', role: 'editor' });
    // códigos de personal
    await db.doc('personal_salud/CODE_ACTIVO').set({ activo: true });
    await db.doc('personal_salud/CODE_INACTIVO').set({ activo: false });
    // perfil del paciente ya vinculado
    await db.doc(`perfiles_salud/${CURP_PACIENTE}`).set(perfilBase(CURP_PACIENTE, UID_PACIENTE, 'paciente'));
  });

  const cases = [
    t('1. anónimo NO puede crear perfil de salud', async () => {
      const db = env.unauthenticatedContext().firestore();
      await assertFails(db.doc(`perfiles_salud/${CURP_OTRO}`).set(perfilBase(CURP_OTRO, UID_OTRO, 'paciente')));
    }),
    t('2. paciente vinculado SÍ crea su propio perfil', async () => {
      const db = env.authenticatedContext(UID_OTRO).firestore();
      await assertSucceeds(db.doc(`perfiles_salud/${CURP_OTRO}`).set(perfilBase(CURP_OTRO, UID_OTRO, 'paciente')));
    }),
    t('3. CURP con formato inválido es rechazada', async () => {
      const db = env.authenticatedContext(UID_OTRO).firestore();
      await assertFails(db.doc('perfiles_salud/INVALIDO').set(perfilBase('INVALIDO', UID_OTRO, 'paciente')));
    }),
    t('4. personal sin código válido NO registra perfil de otro', async () => {
      const db = env.authenticatedContext(UID_PRACTICANTE).firestore();
      await assertFails(db.doc('perfiles_salud/OTRA850101HNTRRR09').set(
        perfilBase('OTRA850101HNTRRR09', null, 'practicante', { codigoPersonal: 'CODE_NOEXISTE' })));
    }),
    t('5. personal con código INACTIVO NO registra perfil', async () => {
      const db = env.authenticatedContext(UID_PRACTICANTE).firestore();
      await assertFails(db.doc('perfiles_salud/OTRA850101HNTRRR09').set(
        perfilBase('OTRA850101HNTRRR09', null, 'practicante', { codigoPersonal: 'CODE_INACTIVO' })));
    }),
    t('6. personal con código ACTIVO SÍ registra perfil', async () => {
      const db = env.authenticatedContext(UID_PRACTICANTE).firestore();
      await assertSucceeds(db.doc('perfiles_salud/OTRA850101HNTRRR09').set(
        perfilBase('OTRA850101HNTRRR09', null, 'practicante', { codigoPersonal: 'CODE_ACTIVO' })));
    }),
    t('7. ciudadano ajeno NO puede leer perfil de salud de otro', async () => {
      const db = env.authenticatedContext(UID_AJENO).firestore();
      await assertFails(db.doc(`perfiles_salud/${CURP_PACIENTE}`).get());
    }),
    t('8. paciente vinculado SÍ puede leer su propio perfil', async () => {
      const db = env.authenticatedContext(UID_PACIENTE).firestore();
      await assertSucceeds(db.doc(`perfiles_salud/${CURP_PACIENTE}`).get());
    }),
    t('9. personal_salud NO es legible directamente por cliente', async () => {
      const db = env.authenticatedContext(UID_PRACTICANTE).firestore();
      await assertFails(db.doc('personal_salud/CODE_ACTIVO').get());
    }),
    t('10. documento de salud lo lee el paciente, no quien lo subió', async () => {
      const dbPrac = env.authenticatedContext(UID_PRACTICANTE).firestore();
      await dbPrac.doc(`perfiles_salud/${CURP_PACIENTE}/documentos/doc1`).set({
        tipo: 'rayos_x', urlArchivo: 'salud/x.jpg', subidoPorRol: 'practicante',
        codigoPersonal: 'CODE_ACTIVO', fecha: new Date(),
      });
      await assertFails(dbPrac.doc(`perfiles_salud/${CURP_PACIENTE}/documentos/doc1`).get());
      const dbPac = env.authenticatedContext(UID_PACIENTE).firestore();
      await assertSucceeds(dbPac.doc(`perfiles_salud/${CURP_PACIENTE}/documentos/doc1`).get());
    }),
    t('11. consentimiento solo lo cambia el paciente vinculado', async () => {
      const dbAjeno = env.authenticatedContext(UID_AJENO).firestore();
      await assertFails(dbAjeno.doc(`perfiles_salud/${CURP_PACIENTE}`).update({ consentimientoActivo: false, actualizadoEn: new Date() }));
      const dbPac = env.authenticatedContext(UID_PACIENTE).firestore();
      await assertSucceeds(dbPac.doc(`perfiles_salud/${CURP_PACIENTE}`).update({ consentimientoActivo: false, actualizadoEn: new Date() }));
    }),
  ];

  for (const c of cases) await c();

  try { await env.cleanup(); } catch {}

  console.log('\n===== RESULTADO PRUEBAS firestore.rules =====');
  for (const r of results) {
    console.log(`${r.status === 'PASS' ? '✅' : '❌'} ${r.name}${r.error ? ' — ' + r.error : ''}`);
  }
  console.log(`\n${passed} pasadas / ${failed} fallidas / ${results.length} total`);

  if (failed > 0) process.exit(1);
}

main().catch((e) => {
  console.error('Error al ejecutar las pruebas:', e);
  process.exit(2);
});
