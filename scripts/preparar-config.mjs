#!/usr/bin/env node
/**
 * Genera firebase-applet-config.json a partir de la plantilla de ejemplo
 * si todavía no existe. El archivo real está en .gitignore desde que se
 * retiró una API key expuesta (ver docs/marco/PROTOCOLO_SEGURIDAD.md); sin
 * este paso, `tsc --noEmit` y `vite build` fallan en cualquier checkout
 * limpio (CI incluido) porque src/firebase.ts importa ese JSON.
 *
 * No sobrescribe un archivo real ya presente (local o inyectado por el
 * entorno de despliegue) — solo rellena el hueco con placeholders seguros
 * para que el código compile.
 */
import { copyFileSync, existsSync } from 'node:fs';

const destino = 'firebase-applet-config.json';
const plantilla = 'firebase-applet-config.example.json';

if (existsSync(destino)) {
  console.log(`${destino} ya existe — no se toca.`);
} else {
  copyFileSync(plantilla, destino);
  console.log(
    `${destino} generado desde ${plantilla} (valores placeholder). ` +
    'Sustituir por la configuración real de Firebase para que la app conecte de verdad.'
  );
}
