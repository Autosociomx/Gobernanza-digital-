#!/usr/bin/env node
/**
 * Genera firebase-applet-config.json antes de compilar.
 *
 * El archivo real está en .gitignore desde que se retiró una API key expuesta
 * (ver docs/marco/PROTOCOLO_SEGURIDAD.md); sin este paso, `tsc --noEmit` y
 * `vite build` fallan en cualquier checkout limpio (CI incluido) porque
 * src/firebase.ts importa ese JSON.
 *
 * Hasta 2026-08-27 este script solo copiaba la plantilla de ejemplo con
 * valores placeholder ("TU_PROJECT_ID", etc.) — y nunca existió ningún paso
 * que metiera credenciales reales en el deploy de Netlify. Resultado: el
 * sitio en producción corría con un proyecto de Firebase inexistente, y
 * cada llamada a Auth/Firestore/Storage fallaba en la consola del navegador.
 *
 * Ahora, si existen las variables de entorno de Firebase (definidas en
 * Netlify → Site configuration → Environment variables, NUNCA en el
 * repositorio), este script escribe el archivo real a partir de ellas. Si
 * no existen, sigue cayendo al placeholder — el proyecto sigue compilando,
 * pero Firebase no conectará de verdad hasta que se configuren.
 *
 * Variables de entorno esperadas (build-time, no VITE_*: este archivo se
 * escribe antes del build y Vite lo empaqueta como JSON, no como env var
 * leída en runtime):
 *   FIREBASE_PROJECT_ID
 *   FIREBASE_APP_ID
 *   FIREBASE_API_KEY
 *   FIREBASE_AUTH_DOMAIN            (opcional: se deriva de PROJECT_ID si falta)
 *   FIREBASE_STORAGE_BUCKET         (opcional: se deriva de PROJECT_ID si falta)
 *   FIREBASE_MESSAGING_SENDER_ID    (opcional)
 *   FIREBASE_MEASUREMENT_ID         (opcional)
 *   FIREBASE_DATABASE_ID            (opcional, default "(default)")
 *
 * No sobrescribe un archivo real ya presente (local o inyectado por otro
 * medio) — solo rellena el hueco si falta.
 */
import { writeFileSync, copyFileSync, existsSync } from 'node:fs';

const destino = 'firebase-applet-config.json';
const plantilla = 'firebase-applet-config.example.json';

if (existsSync(destino)) {
  console.log(`${destino} ya existe — no se toca.`);
} else {
  const {
    FIREBASE_PROJECT_ID,
    FIREBASE_APP_ID,
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_MEASUREMENT_ID,
    FIREBASE_DATABASE_ID,
  } = process.env;

  const tieneCredencialesReales = FIREBASE_PROJECT_ID && FIREBASE_APP_ID && FIREBASE_API_KEY;

  if (tieneCredencialesReales) {
    const config = {
      projectId: FIREBASE_PROJECT_ID,
      appId: FIREBASE_APP_ID,
      apiKey: FIREBASE_API_KEY,
      authDomain: FIREBASE_AUTH_DOMAIN || `${FIREBASE_PROJECT_ID}.firebaseapp.com`,
      firestoreDatabaseId: FIREBASE_DATABASE_ID || '(default)',
      storageBucket: FIREBASE_STORAGE_BUCKET || `${FIREBASE_PROJECT_ID}.firebasestorage.app`,
      messagingSenderId: FIREBASE_MESSAGING_SENDER_ID || '',
      measurementId: FIREBASE_MEASUREMENT_ID || '',
    };
    writeFileSync(destino, JSON.stringify(config, null, 2) + '\n');
    console.log(`${destino} generado con credenciales reales desde variables de entorno.`);
  } else {
    copyFileSync(plantilla, destino);
    console.log(
      `${destino} generado desde ${plantilla} (valores placeholder) porque no se ` +
      'encontraron FIREBASE_PROJECT_ID/FIREBASE_APP_ID/FIREBASE_API_KEY en el entorno. ' +
      'Firebase NO conectará de verdad hasta que se configuren esas variables en Netlify.'
    );
  }
}
