#!/usr/bin/env node
/**
 * Generador de Contexto Portátil — Nayarit Digital / ConnectX / SOATM
 *
 * Produce el paquete de contexto que se entrega a las inteligencias que NO
 * pueden leer este repositorio por sí solas (ChatGPT y el Gemini de Google
 * AI Studio), de modo que las tres marchen sobre el mismo estado de hechos.
 *
 * El repositorio es el único plano de contexto compartido: lo que no está
 * aquí, no existe para las demás. Ver docs/sincronia/PROTOCOLO_TRI_IA.md.
 *
 * Salidas:
 *   docs/sincronia/CONTEXTO_PORTATIL.md   briefing completo (se sube como archivo)
 *   docs/sincronia/CONTEXTO_BREVE.md      versión condensada (se pega en un campo)
 *   docs/sincronia/contexto.json          manifiesto legible por máquina
 *
 * Uso:  node scripts/generar-contexto.mjs [--sin-guardia] [--verificar]
 *   --sin-guardia  no corre scripts/verificar-regresiones.mjs
 *   --verificar    no escribe: falla si el contexto en disco está desfasado
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { createHash } from 'node:crypto';

const SIN_GUARDIA = process.argv.includes('--sin-guardia');
const SOLO_VERIFICAR = process.argv.includes('--verificar');
const DIR = 'docs/sincronia';
const LIMITE_BREVE = 6000; // caracteres: cabe en el campo de instrucciones de un Proyecto de ChatGPT

/** Fuentes de verdad que definen el contexto. Si cambian, cambia el CONTEXTO_ID. */
const FUENTES = [
  'CLAUDE.md',
  'docs/marco/GLOSARIO_OFICIAL.md',
  'docs/marco/NOTA_DE_CONTEXTO_PARA_CLAUDE.md',
  'docs/marco/PROTOCOLO_SEGURIDAD.md',
  'docs/marco/GOBERNANZA_REPOSITORIO.md',
  'docs/marco/BIBLIOTECA_LEGAL.md',
  'docs/marco/modulos/INDICE.json',
  'docs/orbe/modulos.json',
  'docs/sincronia/PROTOCOLO_TRI_IA.md',
];

const leer = (ruta) => (existsSync(ruta) ? readFileSync(ruta, 'utf-8') : null);
const git = (cmd, fallback = 'desconocido') => {
  try {
    return execSync(`git ${cmd}`, { encoding: 'utf-8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return fallback;
  }
};

// ---------------------------------------------------------------- estado real
const commit = git('rev-parse --short HEAD');
const rama = git('rev-parse --abbrev-ref HEAD');
const fechaCommit = git('log -1 --format=%cs');
const hoy = new Date().toISOString().slice(0, 10);

const contar = (lista, campo = 'estado') =>
  lista.reduce((acc, m) => ((acc[m[campo]] = (acc[m[campo]] ?? 0) + 1), acc), {});
const comoTabla = (conteo) =>
  Object.entries(conteo)
    .sort((a, b) => b[1] - a[1])
    .map(([k, v]) => `${v} ${k}`)
    .join(' · ');

const indiceCodigo = JSON.parse(leer('docs/marco/modulos/INDICE.json') ?? '{"modulos":[]}');
const modulosCodigo = indiceCodigo.modulos ?? [];
const conteoCodigo = contar(modulosCodigo);
const porSuperficie = contar(modulosCodigo, 'superficie');

const grafoOrbe = JSON.parse(leer('docs/orbe/modulos.json') ?? '{"modulos":[]}');
const modulosOrbe = grafoOrbe.modulos ?? [];
const conteoOrbe = contar(modulosOrbe);

// Estatus de cada cita: es la última celda de la fila, y admite matices
// ("VERIFICADO (general; arts. específicos POR VERIFICAR)"). Se clasifica por
// el prefijo de esa celda; el matiz se cuenta aparte como reserva.
const biblioteca = leer('docs/marco/BIBLIOTECA_LEGAL.md') ?? '';
const citas = { verificado: 0, verificadoConReserva: 0, porVerificar: 0 };
for (const linea of biblioteca.split('\n')) {
  if (!linea.trim().startsWith('|')) continue;
  const celdas = linea.split('|').map((c) => c.trim()).filter(Boolean);
  if (celdas.length < 3) continue;
  const estatus = celdas[celdas.length - 1];
  if (/^POR VERIFICAR/.test(estatus)) citas.porVerificar += 1;
  else if (/^VERIFICADO/.test(estatus)) {
    citas.verificado += 1;
    if (/POR VERIFICAR/.test(estatus)) citas.verificadoConReserva += 1;
  }
}

let guardia = 'no ejecutada';
if (!SIN_GUARDIA) {
  try {
    execSync('node scripts/verificar-regresiones.mjs', { stdio: 'pipe' });
    guardia = 'verde';
  } catch {
    guardia = 'ROJA — hay una regresión sin corregir';
  }
}

// ------------------------------------------------------------- CONTEXTO_ID
const huella = createHash('sha256');
const fuentesPresentes = [];
for (const ruta of FUENTES) {
  const contenido = leer(ruta);
  if (contenido === null) continue;
  huella.update(`${ruta}\n${contenido}`);
  fuentesPresentes.push(ruta);
}
const hash8 = huella.digest('hex').slice(0, 8);
const CONTEXTO_ID = `CTX-${hoy.replace(/-/g, '')}-${commit}-${hash8}`;

// ------------------------------------------------------------------ plantillas
const reglasDuras = `1. Ninguna llave de API viaja al navegador (GEMINI_API_KEY y STRIPE_SECRET_KEY viven solo en server.ts; prohibido el bloque \`define\` de vite.config.ts — la llave se filtró así cuatro veces desde pushes de AI Studio).
2. Nada bajo src/ crea un cliente de IA. El navegador llama a /api/ai/chat o /api/ai/risk-analysis.
3. src/App.tsx mantiene React.lazy + Suspense para las vistas pesadas.
4. No se borran archivos de despliegue: netlify.toml, public/robots.txt.
5. index.html conserva sus metadatos reales (lang="es", meta description, título institucional).
6. Sin @import de Google Fonts en src/index.css.
7. En public/ solo pueden vivir robots.txt y CONNECTX_SYSTEM_PROMPT.md. Lo interno va en docs/interno/.
8. Los montos de pago se validan en el servidor (entero positivo). El navegador nunca decide cuánto se cobra.
9. Ningún dato personal real en el repositorio, ni en semillas de demo, ni en actas.`;

const semaforo = `🔴 Se elimina: nombres de políticos en componentes públicos, promesas electorales, cifras sin fuente.
🟡 Se etiqueta: lo legítimo pero aún no real → SIMULADO, PROYECCIÓN, META, banda DEMO. Ninguna cifra simulada sin etiqueta.
🟢 Se exhibe: lo verificable (código abierto, ley citada, bitácora).
Las citas legales solo salen de docs/marco/BIBLIOTECA_LEGAL.md y solo en estatus VERIFICADO.`;

const estadoBloque = `- Rama del contexto: \`${rama}\` · commit \`${commit}\` (${fechaCommit})
- Guardia de regresiones: ${guardia}
- Módulos reales del código (docs/marco/modulos/INDICE.json): ${modulosCodigo.length} → ${comoTabla(conteoCodigo)} · por superficie: ${comoTabla(porSuperficie)}
- Módulos conceptuales del Orbe (docs/orbe/modulos.json): ${modulosOrbe.length} → ${comoTabla(conteoOrbe)}
- Biblioteca Legal: ${citas.verificado} citas VERIFICADO (${citas.verificadoConReserva} con reserva parcial) · ${citas.porVerificar} POR VERIFICAR — lo POR VERIFICAR no se afirma en público`;

const portatil = `# Contexto Portátil — Nayarit Digital · ConnectX · SOATM

**CONTEXTO_ID: \`${CONTEXTO_ID}\`** · generado el ${hoy}

> Documento **generado** por \`node scripts/generar-contexto.mjs\`. No se edita a mano:
> se edita su fuente (${fuentesPresentes.length} archivos del repositorio) y se regenera.
> Se entrega a ChatGPT y al Gemini de Google AI Studio para que trabajen sobre el
> mismo estado de hechos que Claude Code. Protocolo: \`docs/sincronia/PROTOCOLO_TRI_IA.md\`.

## 0. Regla de entrada (obligatoria para la IA que lee esto)

Cita el \`CONTEXTO_ID\` de arriba al inicio de **cada** entrega que produzcas sobre
este proyecto. Sin ese identificador tu trabajo no se integra: no hay forma de
saber sobre qué estado del repositorio razonaste. Si no sabes algo, **pregunta**;
no lo inventes. Este documento es el límite de lo que puedes dar por cierto.

## 1. Qué es el proyecto

**Nayarit Digital · ConnectX · SOATM** (Sistema Operativo de Atención y Tramitación
Municipal) de Tepic, Nayarit: plataforma de gobierno digital municipal de código
abierto. Stack: React 19 + TypeScript + Vite 6 + Tailwind 4 + Firebase
(Firestore/Auth) + Express + Netlify. Un repositorio contiene tres cosas distintas:
la aplicación (\`src/\`, \`server.ts\`), el Context.OS Runtime (\`contextos/\`,
\`shared/semantic/\` — laboratorio, apagado por defecto, \`executionMode: 'LAB_MOCK'\`)
y el marco normativo y documental (\`docs/\`), que **es parte del producto**.

**Tesis central, no negociable:** el SOATM no es una invención. La LNETB federal
(Arts. 2, 3, 66–76) y la Ley de Gobierno Digital de Nayarit (Arts. 2, 5, 6) ya lo
ordenan. *"La ley ya lo mandaba; nosotros lo descubrimos y lo convertimos en
software abierto."*

## 2. Estado de hechos al momento de generar este contexto

${estadoBloque}

Dos registros de módulos que **no se confunden**: \`docs/marco/modulos/INDICE.json\`
mide completitud de código (real / parcial / maqueta / riesgo);
\`docs/orbe/modulos.json\` mide madurez conceptual (propuesta / disenado /
en_construccion / piloto / desplegado / produccion). Si se contradicen, se señala
la contradicción — no se elige una en silencio.

## 3. Reglas duras (violarlas es una regresión conocida, la Guardia falla el build)

${reglasDuras}

Archivos protegidos (tocarlos exige mención explícita en la descripción del PR):
\`index.html\`, \`vite.config.ts\`, \`netlify.toml\`, \`public/robots.txt\`,
\`src/App.tsx\`, \`server.ts\`, \`docs/\` completo, \`scripts/verificar-regresiones.mjs\`,
\`.github/workflows/\`.

## 4. Semáforo de honestidad de datos (regla cultural mayor)

${semaforo}

## 5. Los tres carriles

| Carril | Inteligencia | Jurisdicción | Cómo entrega |
|---|---|---|---|
| Ingeniería y gobernanza | **Claude Code** | Repositorio, PRs, la Guardia, \`docs/marco/\`, \`contextos/\` | Commit + PR a \`main\` |
| Estrategia, redacción y análisis | **ChatGPT** | Narrativa, expediente regulatorio, análisis normativo, borradores | Paquete de entrega al Buzón |
| Prototipado y UI | **Gemini / Google AI Studio** | Los proyectos "Build", experimentos visuales, iteración rápida | Paquete de entrega al Buzón |

Ninguna de las tres puede leer la memoria de las otras. **Ninguna entrega llega a
\`main\` sin pasar por el carril de ingeniería y por la Guardia.** Esa regla existe
porque los pushes directos desde AI Studio son la causa raíz documentada de las
cuatro fugas de llave y de varios borrados de archivos de despliegue.

## 6. Qué debe contener tu entrega

Todo trabajo devuelto por ChatGPT o AI Studio usa la plantilla de
\`docs/sincronia/BUZON/PLANTILLA_ENTREGA.md\` y contiene, mínimo:

1. \`CONTEXTO_ID\` sobre el que trabajaste (el de este documento).
2. Qué archivos del repositorio propone tocar, por ruta exacta.
3. Qué reglas duras roza y cómo las respeta.
4. Qué es verificable y qué es propuesta (semáforo aplicado a tu propia entrega).
5. Cómo se comprueba que funciona.

## 7. Comandos de verificación (los tres en verde antes de dar algo por terminado)

\`\`\`bash
node scripts/verificar-regresiones.mjs   # la Guardia
npm run lint                             # tsc --noEmit (npx tsc instala un paquete falso)
npx vite build
npm run test:orbe-contextos              # si se tocó contextos/, shared/semantic/ o src/orbe/
\`\`\`

## 8. Idioma y registro

Español en todo: código, comentarios, commits, documentación y conversación.
Directo, con jerga correcta de gobierno digital mexicano. Si una propuesta no se
sostiene con la ley, el código o la bitácora, no se propone.

---

*Fuentes de este contexto: ${fuentesPresentes.map((f) => `\`${f}\``).join(', ')}.*
`;

const breve = `# Contexto Nayarit Digital · ConnectX · SOATM — ${CONTEXTO_ID}

Cita el CONTEXTO_ID \`${CONTEXTO_ID}\` al inicio de cada entrega sobre este
proyecto. Si algo no está aquí, pregunta; no lo inventes.

**Proyecto.** SOATM (Sistema Operativo de Atención y Tramitación Municipal) de
Tepic, Nayarit: gobierno digital municipal de código abierto. React 19 + TS +
Vite 6 + Tailwind 4 + Firebase + Express + Netlify. Tesis no negociable: el SOATM
no es invención — la LNETB federal (Arts. 2, 3, 66-76) y la Ley de Gobierno
Digital de Nayarit (Arts. 2, 5, 6) ya lo ordenan.

**Estado (${hoy}).**
${estadoBloque}

**Reglas duras (romperlas es regresión conocida).**
${reglasDuras}

**Semáforo de honestidad.**
${semaforo}

**Carriles.** Claude Code = ingeniería, repo, PRs, la Guardia. ChatGPT =
estrategia, redacción, análisis normativo. Gemini/AI Studio = prototipado y UI.
Ninguna entrega llega a \`main\` sin pasar por el carril de ingeniería y la
Guardia: los pushes directos desde AI Studio causaron cuatro fugas de llave.

**Tu entrega.** Plantilla \`docs/sincronia/BUZON/PLANTILLA_ENTREGA.md\`:
CONTEXTO_ID + rutas exactas de archivos + reglas duras que roza + qué es
verificable y qué es propuesta + cómo se comprueba.

**Idioma.** Español en todo. Directo, jerga de gobierno digital mexicano.
`;

const manifiesto = {
  $schema_nota:
    'Manifiesto del Contexto Portátil. Generado por scripts/generar-contexto.mjs — no se edita a mano. Las tres inteligencias (Claude Code, ChatGPT, Gemini/AI Studio) citan contexto_id para probar sobre qué estado del repositorio razonaron.',
  contexto_id: CONTEXTO_ID,
  huella: hash8,
  generado: hoy,
  commit,
  rama,
  fecha_commit: fechaCommit,
  guardia,
  fuentes: fuentesPresentes,
  modulos_codigo: { total: modulosCodigo.length, por_estado: conteoCodigo, por_superficie: porSuperficie },
  modulos_orbe: { total: modulosOrbe.length, por_estado: conteoOrbe },
  biblioteca_legal: citas,
  salidas: {
    completo: `${DIR}/CONTEXTO_PORTATIL.md`,
    breve: `${DIR}/CONTEXTO_BREVE.md`,
  },
};

// ---------------------------------------------------------------- escritura
const salidas = [
  [`${DIR}/CONTEXTO_PORTATIL.md`, portatil],
  [`${DIR}/CONTEXTO_BREVE.md`, breve],
  [`${DIR}/contexto.json`, JSON.stringify(manifiesto, null, 2) + '\n'],
];

if (SOLO_VERIFICAR) {
  // Se compara la huella del contenido de las fuentes, no el CONTEXTO_ID completo:
  // un commit que no toca ninguna fuente de contexto no desfasa nada.
  const previo = leer(`${DIR}/contexto.json`);
  const huellaPrevia = previo ? (JSON.parse(previo).huella ?? null) : null;
  if (huellaPrevia !== hash8) {
    console.error(
      `✖ Contexto desfasado: cambiaron las fuentes de contexto.\n` +
        `  Huella en disco: ${huellaPrevia ?? '(no existe)'}\n` +
        `  Huella actual:   ${hash8}\n` +
        '  Corre: npm run contexto'
    );
    process.exit(1);
  }
  console.log(`✔ Contexto al día (huella ${hash8}).`);
  process.exit(0);
}

if (!existsSync(DIR)) mkdirSync(DIR, { recursive: true });
for (const [ruta, contenido] of salidas) writeFileSync(ruta, contenido, 'utf-8');

console.log(`✔ Contexto generado: ${CONTEXTO_ID}`);
console.log(`  ${DIR}/CONTEXTO_PORTATIL.md   ${portatil.length} caracteres (súbelo como archivo)`);
console.log(`  ${DIR}/CONTEXTO_BREVE.md      ${breve.length} caracteres (pégalo en el campo de instrucciones)`);
console.log(`  ${DIR}/contexto.json`);
console.log(`  Guardia: ${guardia}`);
if (breve.length > LIMITE_BREVE) {
  console.log(
    `\n⚠ CONTEXTO_BREVE.md pasa de ${LIMITE_BREVE} caracteres; puede no caber en el campo de instrucciones de un Proyecto de ChatGPT.`
  );
}
