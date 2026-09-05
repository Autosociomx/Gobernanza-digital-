#!/usr/bin/env node
/**
 * Auditoría de una exportación de ChatGPT — Nayarit Digital / ConnectX / SOATM
 *
 * Ninguna IA puede leer los hilos de otra. Lo que sí se puede auditar es la
 * exportación oficial que ChatGPT entrega al titular de la cuenta. Este script
 * lee ese `conversations.json` y produce un inventario: qué hilos existen, de
 * qué tamaño, sobre qué temas del proyecto, y cuáles no tienen nada que ver.
 *
 * El resultado NO se commitea: la exportación contiene conversación personal y
 * el repositorio prohíbe datos personales reales (regla dura 9). Por eso tanto
 * la entrada como la salida viven en docs/interno/importaciones/, ignorada por git.
 *
 * Uso:  node scripts/auditar-export-chatgpt.mjs [ruta/conversations.json]
 *       node scripts/auditar-export-chatgpt.mjs --tema salud   (detalle de un tema)
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const DIR_TRABAJO = 'docs/interno/importaciones';
const args = process.argv.slice(2);
const temaPedido = (() => {
  const i = args.indexOf('--tema');
  return i >= 0 ? (args[i + 1] ?? '').toLowerCase() : null;
})();
const entrada = args.find((a) => a.endsWith('.json')) ?? `${DIR_TRABAJO}/conversations.json`;

if (!existsSync(entrada)) {
  console.error(
    `✖ No existe ${entrada}\n\n` +
      'Cómo obtenerlo (lo hace el titular de la cuenta, una sola vez):\n' +
      '  1. chatgpt.com → Ajustes → Controles de datos → Exportar datos.\n' +
      '  2. Llega un correo con un ZIP; dentro está conversations.json.\n' +
      `  3. Colocarlo en ${DIR_TRABAJO}/conversations.json (carpeta ignorada por git).\n` +
      '  4. Correr de nuevo este comando.\n\n' +
      'Ver docs/sincronia/AUDITORIA_CHATGPT.md.'
  );
  process.exit(1);
}

/** Léxico del proyecto: tema → términos que lo delatan en el texto de un hilo. */
const LEXICO = {
  'Marco legal (LNETB / LGD Nayarit)': ['lnetb', 'ley de gobierno digital', 'lgpdpps', 'dof', 'art. 115', 'artículo 115', 'marco jurídico', 'biblioteca legal'],
  'C5 / panel de gobierno': ['c5', 'dashboard', 'panel de mando', 'gabinete', 'tablero'],
  'App ciudadana / trámites': ['citizenapp', 'app ciudadana', 'trámite', 'tramite', 'ventanilla', 'folio'],
  'Salud (TEPICTU / triaje)': ['tepictu', 'triaje', 'salud', 'curp', 'expediente clínico', 'citas médicas'],
  'Tesorería / pagos': ['predial', 'tesorería', 'tesoreria', 'stripe', 'pago', 'recaudación', 'recaudacion'],
  'Obras y movilidad': ['obras', 'trazabilidad de obra', 'bacheo', 'movilidad', 'luminaria'],
  'Agro / ganadería': ['agrovisión', 'agrovision', 'ganader', 'padrón ganadero', 'upp', 'siniiga', 'siembra'],
  'Bienestar social': ['bienestar', 'dif', 'apoyo social', 'padrón de beneficiarios'],
  'Pulso Nayarit / auditoría cívica': ['pulso nayarit', 'auditoría cívica', 'auditoria civica', 'supabase'],
  'Orbe / Context.OS': ['orbe', 'context.os', 'contextos', 'aura', 'cop 1.0', 'semantic registry', 'intentenvelope'],
  'Identidad digital': ['llave mx', 'llavemx', 'identidad digital', 'sso', 'firma electrónica', 'firma electronica'],
  'Arquitectura / backend': ['firestore', 'firebase', 'express', 'server.ts', 'monorepo', 'sqlite', 'endpoint', 'api'],
  'Seguridad y datos': ['api key', 'llave de api', 'gemini_api_key', 'ciberseguridad', 'ciso', 'reglas de firestore', 'fuga'],
  'Frontend / UI': ['react', 'tailwind', 'vite', 'componente', 'lighthouse', 'accesibilidad'],
  'Estrategia y negocio': ['b2g', 'saas', 'modelo de negocio', 'licitación', 'licitacion', 'propuesta económica', 'océanos azules', 'oceanos azules'],
  'Gobernanza del repo / agentes': ['parlamento', 'acta', 'skill', 'claude code', 'ai studio', 'pull request', 'guardia'],
};

const crudo = JSON.parse(readFileSync(entrada, 'utf-8'));
const conversaciones = Array.isArray(crudo) ? crudo : (crudo.conversations ?? []);
if (!conversaciones.length) {
  console.error('✖ El archivo no contiene conversaciones en un formato reconocible.');
  process.exit(1);
}

const textoDeParte = (parte) => {
  if (typeof parte === 'string') return parte;
  if (parte && typeof parte === 'object') return parte.text ?? parte.transcript ?? '';
  return '';
};

const fecha = (t) => (typeof t === 'number' ? new Date(t * 1000).toISOString().slice(0, 10) : null);

const fichas = conversaciones.map((c) => {
  const nodos = Object.values(c.mapping ?? {});
  let mensajes = 0;
  let palabras = 0;
  const trozos = [];
  for (const nodo of nodos) {
    const m = nodo?.message;
    if (!m || !m.content) continue;
    const partes = Array.isArray(m.content.parts) ? m.content.parts : [];
    const texto = partes.map(textoDeParte).join(' ').trim();
    if (!texto) continue;
    mensajes += 1;
    palabras += texto.split(/\s+/).length;
    trozos.push(texto);
  }
  const cuerpo = `${c.title ?? ''} ${trozos.join(' ')}`.toLowerCase();
  const temas = Object.entries(LEXICO)
    .map(([tema, terminos]) => [tema, terminos.filter((t) => cuerpo.includes(t)).length])
    .filter(([, n]) => n > 0)
    .sort((a, b) => b[1] - a[1]);
  return {
    titulo: c.title ?? '(sin título)',
    creada: fecha(c.create_time),
    actualizada: fecha(c.update_time),
    mensajes,
    palabras,
    temas: temas.map(([t]) => t),
    senales: Object.fromEntries(temas),
  };
});

const conProyecto = fichas.filter((f) => f.temas.length > 0);
const sinProyecto = fichas.filter((f) => f.temas.length === 0);
const porTema = {};
for (const f of conProyecto) for (const t of f.temas) (porTema[t] ??= []).push(f);

const fechas = fichas.map((f) => f.creada).filter(Boolean).sort();
const totalPalabras = fichas.reduce((a, f) => a + f.palabras, 0);

if (temaPedido) {
  const clave = Object.keys(porTema).find((t) => t.toLowerCase().includes(temaPedido));
  if (!clave) {
    console.error(`✖ Tema no encontrado. Disponibles:\n${Object.keys(porTema).map((t) => `  · ${t}`).join('\n')}`);
    process.exit(1);
  }
  console.log(`\n${clave} — ${porTema[clave].length} ${porTema[clave].length === 1 ? 'hilo' : 'hilos'}\n`);
  for (const f of porTema[clave].sort((a, b) => b.palabras - a.palabras)) {
    console.log(`  ${String(f.palabras).padStart(7)} palabras · ${f.creada ?? '?'} · ${f.titulo}`);
  }
  process.exit(0);
}

const filas = (lista) =>
  lista
    .sort((a, b) => b.palabras - a.palabras)
    .map((f) => `| ${f.titulo.replace(/\|/g, '/')} | ${f.creada ?? '?'} | ${f.mensajes} | ${f.palabras.toLocaleString('es-MX')} | ${f.temas.join(', ') || '—'} |`)
    .join('\n');

const informe = `# Inventario de la exportación de ChatGPT

**Archivo auditado:** \`${entrada}\`
**Generado:** ${new Date().toISOString().slice(0, 10)} por \`scripts/auditar-export-chatgpt.mjs\`

> **Material interno.** Vive en \`${DIR_TRABAJO}/\`, ignorada por git. No se
> commitea: la exportación contiene conversación personal y el repositorio
> prohíbe datos personales reales (regla dura 9).

## Resumen

- Hilos totales: **${fichas.length}** (${conProyecto.length} ${conProyecto.length === 1 ? 'toca' : 'tocan'} el proyecto · ${sinProyecto.length} no)
- Rango: ${fechas[0] ?? '?'} → ${fechas[fechas.length - 1] ?? '?'}
- Volumen: ~${totalPalabras.toLocaleString('es-MX')} palabras

## Temas del proyecto por volumen de hilos

| Tema | Hilos | Palabras |
|---|---|---|
${Object.entries(porTema)
  .map(([t, l]) => [t, l.length, l.reduce((a, f) => a + f.palabras, 0)])
  .sort((a, b) => b[2] - a[2])
  .map(([t, n, p]) => `| ${t} | ${n} | ${p.toLocaleString('es-MX')} |`)
  .join('\n')}

## Hilos relacionados con el proyecto

| Hilo | Creado | Mensajes | Palabras | Temas |
|---|---|---|---|---|
${filas(conProyecto)}

## Hilos sin señal del proyecto (${sinProyecto.length})

| Hilo | Creado | Mensajes | Palabras | Temas |
|---|---|---|---|---|
${filas(sinProyecto)}
`;

if (!existsSync(DIR_TRABAJO)) mkdirSync(DIR_TRABAJO, { recursive: true });
const salidaMd = `${DIR_TRABAJO}/INVENTARIO_CHATGPT.md`;
const salidaJson = `${DIR_TRABAJO}/inventario-chatgpt.json`;
writeFileSync(salidaMd, informe, 'utf-8');
writeFileSync(salidaJson, JSON.stringify({ archivo: entrada, fichas }, null, 2) + '\n', 'utf-8');

console.log(`✔ ${fichas.length} hilos auditados (${conProyecto.length} del proyecto, ${sinProyecto.length} ${sinProyecto.length === 1 ? 'ajeno' : 'ajenos'})`);
console.log(`  ${salidaMd}`);
console.log(`  ${salidaJson}`);
console.log(`\n  Detalle por tema:  node scripts/auditar-export-chatgpt.mjs --tema <palabra>`);
