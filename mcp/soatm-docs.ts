/**
 * Servidor MCP `soatm-docs` — acceso de SOLO LECTURA al marco documental
 * de Nayarit Digital · ConnectX · SOATM.
 *
 * Qué expone: los dos registros de módulos, la biblioteca legal con su
 * estatus de verificación, el glosario oficial y búsqueda/lectura sobre
 * `docs/`. Nada más.
 *
 * Qué NO hace, a propósito:
 *   - No escribe ni borra un solo archivo.
 *   - No sale a la red.
 *   - No toca `src/`, `server.ts`, `contextos/` ni la base SQLite.
 *   - No autoriza ningún acto administrativo.
 *
 * Toda ruta se resuelve dentro de `docs/`; cualquier intento de salir de
 * ahí se rechaza (ver `resolverRutaDocs`).
 *
 * Arranque: `npx tsx mcp/soatm-docs.ts` (transporte stdio).
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ_REPO = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const RAIZ_DOCS = join(RAIZ_REPO, 'docs');

const INDICE_CODIGO = 'docs/marco/modulos/INDICE.json';
const INDICE_ORBE = 'docs/orbe/modulos.json';
const BIBLIOTECA_LEGAL = 'docs/marco/BIBLIOTECA_LEGAL.md';
const GLOSARIO = 'docs/marco/GLOSARIO_OFICIAL.md';

const EXTENSIONES_BUSCABLES = ['.md', '.json', '.html'];

/** Regla de oro del Glosario Oficial; se repite en toda salida legal. */
const REGLA_CITACION =
  'Regla de citación (docs/marco/GLOSARIO_OFICIAL.md §9): en público solo se ' +
  'cita lo que está en estatus VERIFICADO. Lo POR VERIFICAR se usa ' +
  'internamente y nunca se afirma como hecho.';

// ---------------------------------------------------------------------------
// Utilidades de archivo
// ---------------------------------------------------------------------------

/**
 * Resuelve una ruta relativa al repositorio y exige que caiga dentro de
 * `docs/`. Es la única puerta de lectura del servidor.
 */
function resolverRutaDocs(rutaRelativa: string): string {
  const limpia = rutaRelativa.replace(/^\.\//, '').replace(/^\/+/, '');
  const absoluta = resolve(RAIZ_REPO, limpia);
  if (absoluta !== RAIZ_DOCS && !absoluta.startsWith(RAIZ_DOCS + sep)) {
    throw new Error(
      `Ruta fuera de alcance: "${rutaRelativa}". Este servidor solo lee dentro de docs/.`
    );
  }
  return absoluta;
}

function leerDoc(rutaRelativa: string): string {
  return readFileSync(resolverRutaDocs(rutaRelativa), 'utf8');
}

function leerJson<T = any>(rutaRelativa: string): T {
  return JSON.parse(leerDoc(rutaRelativa)) as T;
}

/** Lista recursiva de archivos buscables bajo docs/, en rutas relativas al repo. */
function listarArchivosDocs(subruta = 'docs'): string[] {
  const absoluta = resolverRutaDocs(subruta);
  const encontrados: string[] = [];
  const recorrer = (dir: string) => {
    for (const entrada of readdirSync(dir, { withFileTypes: true })) {
      const completa = join(dir, entrada.name);
      if (entrada.isDirectory()) {
        recorrer(completa);
      } else if (EXTENSIONES_BUSCABLES.some((ext) => entrada.name.endsWith(ext))) {
        encontrados.push(relative(RAIZ_REPO, completa));
      }
    }
  };
  if (statSync(absoluta).isDirectory()) recorrer(absoluta);
  else encontrados.push(relative(RAIZ_REPO, absoluta));
  return encontrados.sort();
}

/** Normaliza para comparar sin acentos ni mayúsculas (los docs están en español). */
function normalizar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

/** Marca visible para material que no es de difusión pública. */
function marcaInterno(ruta: string): string {
  return ruta.startsWith('docs/interno/') ? ' [INTERNO — no se difunde]' : '';
}

function texto(cuerpo: string) {
  return { content: [{ type: 'text' as const, text: cuerpo }] };
}

// ---------------------------------------------------------------------------
// Registros de módulos
// ---------------------------------------------------------------------------

interface ModuloCodigo {
  id: string;
  nombre: string;
  superficie: string;
  archivo: string;
  lineas: string;
  estado: string;
  ficha: string;
}

interface ModuloOrbe {
  id: string;
  nombre: string;
  archivo: string;
  estado: string;
  conexiones?: string[];
}

/** Madurez conceptual del Orbe, ordenada. Sirve para detectar contradicciones. */
const RANGO_ORBE: Record<string, number> = {
  propuesta: 1,
  disenado: 2,
  en_construccion: 3,
  piloto: 4,
  desplegado: 5,
  produccion: 6,
};

/** Completitud de código, ordenada. */
const RANGO_CODIGO: Record<string, number> = {
  riesgo: 0,
  maqueta: 1,
  parcial: 2,
  real: 3,
};

function modulosCodigo(): ModuloCodigo[] {
  return leerJson<{ modulos: ModuloCodigo[] }>(INDICE_CODIGO).modulos;
}

function modulosOrbe(): ModuloOrbe[] {
  return leerJson<{ modulos: ModuloOrbe[] }>(INDICE_ORBE).modulos;
}

// ---------------------------------------------------------------------------
// Biblioteca legal
// ---------------------------------------------------------------------------

interface CitaLegal {
  seccion: string;
  ordenamiento: string;
  queOrdena: string;
  estatusCrudo: string;
  estatus: string;
}

/**
 * Clasifica el estatus tal como lo escribe la biblioteca, sin suavizarlo.
 * Una fila que dice "VERIFICADO (general; arts. específicos POR VERIFICAR)"
 * no es VERIFICADO a secas — se reporta como VERIFICADO CON RESERVAS para
 * que nadie la cite como si lo fuera.
 */
function clasificarEstatus(crudo: string): string {
  const s = crudo.toUpperCase();
  const verificado = s.includes('VERIFICADO');
  const porVerificar = s.includes('POR VERIFICAR');
  if (verificado && porVerificar) return 'VERIFICADO CON RESERVAS';
  if (porVerificar) return 'POR VERIFICAR';
  if (s.includes('PENDIENTE')) return 'PENDIENTE';
  if (verificado) return 'VERIFICADO';
  return 'SIN ESTATUS';
}

const ENCABEZADOS_TABLA = ['ordenamiento', 'que ordena', 'tramite/servicio', 'estatus'];

/** Lee las tablas markdown de BIBLIOTECA_LEGAL.md como filas estructuradas. */
function citasLegales(): CitaLegal[] {
  const lineas = leerDoc(BIBLIOTECA_LEGAL).split('\n');
  const filas: CitaLegal[] = [];
  let seccion = '(sin sección)';

  for (const linea of lineas) {
    const encabezado = linea.match(/^#{2,3}\s+(.*)$/);
    if (encabezado) {
      seccion = encabezado[1].trim();
      continue;
    }
    if (!linea.trimStart().startsWith('|')) continue;

    const celdas = linea
      .trim()
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map((c) => c.trim());
    if (celdas.length < 3) continue;
    // Separador (|---|---|) o encabezado de tabla.
    if (celdas.every((c) => /^:?-{2,}:?$/.test(c))) continue;
    if (celdas.some((c) => ENCABEZADOS_TABLA.includes(normalizar(c)))) continue;

    const estatusCrudo = celdas[celdas.length - 1];
    filas.push({
      seccion,
      ordenamiento: celdas[0],
      queOrdena: celdas.slice(1, -1).join(' · '),
      estatusCrudo,
      estatus: clasificarEstatus(estatusCrudo),
    });
  }
  return filas;
}

// ---------------------------------------------------------------------------
// Servidor
// ---------------------------------------------------------------------------

const servidor = new McpServer(
  { name: 'soatm-docs', version: '0.1.0' },
  {
    instructions:
      'Marco documental del SOATM (Tepic, Nayarit), de solo lectura. Antes de ' +
      'afirmar el estado de un módulo, consulta `listar_modulos`: hay DOS ' +
      'registros distintos (código y Orbe) con vocabularios distintos a ' +
      'propósito, y `contrastar_registros` señala dónde se contradicen. ' +
      'Antes de citar una ley, consulta `citas_legales`: solo lo VERIFICADO ' +
      'se afirma en público.',
  }
);

servidor.registerTool(
  'listar_modulos',
  {
    title: 'Listar módulos',
    description:
      'Lista los módulos de los dos registros. `codigo` = los 29 módulos reales ' +
      'del código (docs/marco/modulos/INDICE.json), medidos por completitud de ' +
      'código/UI: real / parcial / maqueta / riesgo. `orbe` = los 9 módulos ' +
      'conceptuales (docs/orbe/modulos.json), medidos por madurez: propuesta / ' +
      'disenado / en_construccion / piloto / desplegado / produccion. Son ejes ' +
      'distintos: ninguno reemplaza al otro.',
    inputSchema: {
      registro: z
        .enum(['codigo', 'orbe', 'ambos'])
        .default('codigo')
        .describe('Qué registro listar.'),
      superficie: z
        .enum(['c5', 'citizen'])
        .optional()
        .describe('Solo registro de código: panel de gobierno (c5) o app ciudadana (citizen).'),
      estado: z.string().optional().describe('Filtra por estado exacto del registro elegido.'),
    },
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  async ({ registro, superficie, estado }) => {
    const partes: string[] = [];

    if (registro === 'codigo' || registro === 'ambos') {
      let lista = modulosCodigo();
      if (superficie) lista = lista.filter((m) => m.superficie === superficie);
      if (estado) lista = lista.filter((m) => m.estado === estado);
      partes.push(
        `## Registro de código — ${lista.length} módulo(s) (fuente: ${INDICE_CODIGO})`,
        'Eje: completitud de código/UI.',
        '',
        '| id | nombre | superficie | estado | código | ficha |',
        '|---|---|---|---|---|---|',
        ...lista.map(
          (m) =>
            `| ${m.id} | ${m.nombre} | ${m.superficie} | ${m.estado} | ${m.archivo}:${m.lineas} | ${m.ficha} |`
        )
      );
    }

    if (registro === 'orbe' || registro === 'ambos') {
      let lista = modulosOrbe();
      if (estado) lista = lista.filter((m) => m.estado === estado);
      if (partes.length) partes.push('');
      partes.push(
        `## Registro del Orbe — ${lista.length} módulo(s) (fuente: ${INDICE_ORBE})`,
        'Eje: madurez conceptual. NO dice si hay código detrás.',
        '',
        '| id | nombre | estado | ficha |',
        '|---|---|---|---|',
        ...lista.map((m) => `| ${m.id} | ${m.nombre} | ${m.estado} | docs/orbe/${m.archivo} |`)
      );
      if (registro === 'ambos') {
        partes.push(
          '',
          'Para ver dónde se contradicen ambos registros, usa `contrastar_registros`.'
        );
      }
    }

    return texto(partes.join('\n'));
  }
);

servidor.registerTool(
  'ficha_modulo',
  {
    title: 'Ficha de un módulo',
    description:
      'Devuelve la ficha completa de un módulo junto con su entrada de índice ' +
      '(archivo y rango de líneas del código, cuando existe). Busca primero en ' +
      'el registro de código y luego en el del Orbe.',
    inputSchema: {
      id: z.string().describe('Identificador del módulo, p. ej. "salud" o "expediente-familiar".'),
    },
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  async ({ id }) => {
    const enCodigo = modulosCodigo().find((m) => m.id === id);
    if (enCodigo) {
      return texto(
        [
          `# ${enCodigo.nombre} (registro de código)`,
          '',
          `- **id:** ${enCodigo.id}`,
          `- **superficie:** ${enCodigo.superficie}`,
          `- **estado (completitud de código):** ${enCodigo.estado}`,
          `- **código:** ${enCodigo.archivo}, líneas ${enCodigo.lineas}`,
          `- **ficha:** ${enCodigo.ficha}`,
          '',
          '---',
          '',
          leerDoc(enCodigo.ficha),
        ].join('\n')
      );
    }

    const enOrbe = modulosOrbe().find((m) => m.id === id);
    if (enOrbe) {
      const ruta = `docs/orbe/${enOrbe.archivo}`;
      return texto(
        [
          `# ${enOrbe.nombre} (registro del Orbe)`,
          '',
          `- **id:** ${enOrbe.id}`,
          `- **estado (madurez conceptual):** ${enOrbe.estado}`,
          `- **conexiones:** ${(enOrbe.conexiones ?? []).join(', ') || '(ninguna declarada)'}`,
          `- **ficha:** ${ruta}`,
          '',
          'Advertencia: este registro mide madurez conceptual, no si existe código.',
          '',
          '---',
          '',
          leerDoc(ruta),
        ].join('\n')
      );
    }

    const ids = [...modulosCodigo().map((m) => m.id), ...modulosOrbe().map((m) => m.id)];
    return texto(
      `No existe el módulo "${id}".\n\nIdentificadores disponibles:\n${ids.map((x) => `- ${x}`).join('\n')}`
    );
  }
);

servidor.registerTool(
  'contrastar_registros',
  {
    title: 'Contrastar los dos registros de módulos',
    description:
      'Cruza el registro de código con el del Orbe usando las referencias reales ' +
      'que las fichas de código hacen a las fichas del Orbe, y señala las ' +
      'contradicciones de estado (Orbe maduro sobre código en maqueta, o código ' +
      'real sobre Orbe en propuesta). No elige una versión: las expone.',
    inputSchema: {},
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  async () => {
    const codigo = modulosCodigo();
    const orbe = modulosOrbe();

    // El vínculo verificable entre registros es la cita textual que la ficha de
    // código hace del archivo de la ficha del Orbe. No se adivina por nombre.
    const fichas = new Map<string, string>();
    for (const m of codigo) {
      try {
        fichas.set(m.id, leerDoc(m.ficha));
      } catch {
        fichas.set(m.id, '');
      }
    }

    const contradicciones: string[] = [];
    const vinculos: string[] = [];
    const orbeHuerfanos: string[] = [];

    for (const mo of orbe) {
      const nombreFicha = mo.archivo.replace(/^modulos\//, '');
      const citantes = codigo.filter((mc) => (fichas.get(mc.id) ?? '').includes(nombreFicha));
      if (citantes.length === 0) {
        orbeHuerfanos.push(`- **${mo.id}** (${mo.estado}) — ninguna ficha de código lo referencia`);
        continue;
      }
      for (const mc of citantes) {
        vinculos.push(
          `| ${mo.id} | ${mo.estado} | ${mc.id} | ${mc.estado} | ${mc.archivo}:${mc.lineas} |`
        );
        const rangoOrbe = RANGO_ORBE[mo.estado] ?? 0;
        const rangoCodigo = RANGO_CODIGO[mc.estado] ?? 0;
        if (rangoOrbe >= RANGO_ORBE.piloto && rangoCodigo <= RANGO_CODIGO.maqueta) {
          contradicciones.push(
            `- El Orbe declara **${mo.id}** como \`${mo.estado}\`, pero el código de ` +
              `**${mc.id}** está en \`${mc.estado}\` (${mc.archivo}:${mc.lineas}). ` +
              'El discurso va por delante del código.'
          );
        }
        if (rangoCodigo >= RANGO_CODIGO.real && rangoOrbe <= RANGO_ORBE.disenado) {
          contradicciones.push(
            `- El código de **${mc.id}** está en \`${mc.estado}\`, pero el Orbe todavía ` +
              `declara **${mo.id}** como \`${mo.estado}\`. El registro conceptual va atrasado.`
          );
        }
      }
    }

    const salida = [
      '# Contraste entre los dos registros de módulos',
      '',
      `Código: ${codigo.length} módulos (${INDICE_CODIGO}) · Orbe: ${orbe.length} módulos (${INDICE_ORBE}).`,
      'Los vínculos salen de las referencias explícitas que cada ficha de código',
      'hace al archivo de la ficha del Orbe; no se infieren por parecido de nombre.',
      '',
      '## Contradicciones de estado',
      contradicciones.length
        ? contradicciones.join('\n')
        : 'Ninguna contradicción detectada entre los pares vinculados.',
      '',
      '## Vínculos encontrados',
      vinculos.length ? '| módulo Orbe | madurez | módulo código | completitud | dónde vive |' : '(ninguno)',
      ...(vinculos.length ? ['|---|---|---|---|---|', ...vinculos] : []),
      '',
      '## Módulos del Orbe sin ficha de código que los referencie',
      orbeHuerfanos.length
        ? orbeHuerfanos.join('\n') +
          '\n\nEsto no implica que no exista código: implica que la ficha no lo declara.'
        : '(ninguno)',
    ];
    return texto(salida.join('\n'));
  }
);

servidor.registerTool(
  'citas_legales',
  {
    title: 'Consultar la biblioteca legal',
    description:
      'Consulta docs/marco/BIBLIOTECA_LEGAL.md como filas estructuradas, con su ' +
      'estatus de verificación. Un estatus que dice VERIFICADO junto a POR ' +
      'VERIFICAR se reporta como VERIFICADO CON RESERVAS: la afirmación general ' +
      'está verificada pero los artículos concretos no. Solo VERIFICADO se cita ' +
      'en público.',
    inputSchema: {
      consulta: z
        .string()
        .optional()
        .describe('Texto libre: ley, artículo, materia o módulo. Sin acentos también funciona.'),
      estatus: z
        .enum([
          'todos',
          'VERIFICADO',
          'VERIFICADO CON RESERVAS',
          'POR VERIFICAR',
          'PENDIENTE',
          'SIN ESTATUS',
        ])
        .default('todos')
        .describe('Filtra por estatus de verificación.'),
      max: z.number().int().min(1).max(200).default(40).describe('Máximo de filas a devolver.'),
    },
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  async ({ consulta, estatus, max }) => {
    let filas = citasLegales();
    if (estatus !== 'todos') filas = filas.filter((f) => f.estatus === estatus);
    if (consulta) {
      const aguja = normalizar(consulta);
      filas = filas.filter((f) =>
        normalizar(`${f.seccion} ${f.ordenamiento} ${f.queOrdena} ${f.estatusCrudo}`).includes(aguja)
      );
    }

    const total = filas.length;
    const mostradas = filas.slice(0, max);
    const cuerpo = mostradas.map((f) =>
      [
        `### ${f.ordenamiento}`,
        `- **Sección:** ${f.seccion}`,
        `- **Estatus:** ${f.estatus} — texto original: “${f.estatusCrudo}”`,
        `- **Qué ordena:** ${f.queOrdena}`,
      ].join('\n')
    );

    return texto(
      [
        `# Biblioteca legal — ${total} coincidencia(s)${total > max ? `, se muestran ${max}` : ''}`,
        `Fuente: ${BIBLIOTECA_LEGAL}`,
        '',
        REGLA_CITACION,
        '',
        total ? cuerpo.join('\n\n') : 'Sin coincidencias.',
      ].join('\n')
    );
  }
);

servidor.registerTool(
  'buscar_docs',
  {
    title: 'Buscar en el marco documental',
    description:
      'Búsqueda de texto completo sobre docs/ (.md, .json, .html), insensible a ' +
      'mayúsculas y acentos. Devuelve ruta, número de línea y la línea. El ' +
      'material de docs/interno/ se marca como interno.',
    inputSchema: {
      consulta: z.string().min(2).describe('Texto a buscar.'),
      ruta: z
        .string()
        .default('docs')
        .describe('Subdirectorio de docs/ donde limitar la búsqueda, p. ej. "docs/actas".'),
      max: z.number().int().min(1).max(200).default(30).describe('Máximo de coincidencias.'),
    },
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  async ({ consulta, ruta, max }) => {
    const aguja = normalizar(consulta);
    const resultados: string[] = [];
    let total = 0;

    for (const archivo of listarArchivosDocs(ruta)) {
      const lineas = readFileSync(join(RAIZ_REPO, archivo), 'utf8').split('\n');
      for (let i = 0; i < lineas.length; i++) {
        if (!normalizar(lineas[i]).includes(aguja)) continue;
        total++;
        if (resultados.length < max) {
          const recorte = lineas[i].trim().slice(0, 300);
          resultados.push(`- \`${archivo}:${i + 1}\`${marcaInterno(archivo)} — ${recorte}`);
        }
      }
    }

    return texto(
      [
        `# "${consulta}" — ${total} coincidencia(s) en ${ruta}${
          total > max ? `, se muestran ${max}` : ''
        }`,
        '',
        total ? resultados.join('\n') : 'Sin coincidencias.',
        '',
        'Usa `leer_doc` para abrir cualquiera de estas rutas.',
      ].join('\n')
    );
  }
);

servidor.registerTool(
  'leer_doc',
  {
    title: 'Leer un documento del marco',
    description:
      'Lee un archivo bajo docs/ por su ruta relativa al repositorio. Acepta un ' +
      'rango de líneas para documentos largos. Rechaza cualquier ruta fuera de docs/.',
    inputSchema: {
      ruta: z.string().describe('Ruta relativa al repo, p. ej. "docs/marco/PROTOCOLO_SEGURIDAD.md".'),
      desde: z.number().int().min(1).optional().describe('Primera línea (1-indexada).'),
      hasta: z.number().int().min(1).optional().describe('Última línea, inclusive.'),
    },
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  async ({ ruta, desde, hasta }) => {
    const contenido = leerDoc(ruta);
    if (desde === undefined && hasta === undefined) {
      return texto(`# ${ruta}${marcaInterno(ruta)}\n\n${contenido}`);
    }
    const lineas = contenido.split('\n');
    const inicio = (desde ?? 1) - 1;
    const fin = hasta ?? lineas.length;
    const recorte = lineas
      .slice(inicio, fin)
      .map((l, i) => `${inicio + i + 1}\t${l}`)
      .join('\n');
    return texto(
      `# ${ruta}${marcaInterno(ruta)} — líneas ${inicio + 1}–${Math.min(fin, lineas.length)} de ${lineas.length}\n\n${recorte}`
    );
  }
);

servidor.registerTool(
  'glosario',
  {
    title: 'Glosario oficial',
    description:
      'Devuelve el Glosario Oficial completo: identidad nominal, tesis del SOATM, ' +
      'vocabulario de estados, semáforo de honestidad de datos, usos permitidos de ' +
      '"soberanía", equivalencias entre lenguaje interno y público, y la regla de ' +
      'citación legal. Consúltalo antes de redactar cualquier texto institucional.',
    inputSchema: {},
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  async () => texto(`# ${GLOSARIO}\n\n${leerDoc(GLOSARIO)}`)
);

async function principal() {
  await servidor.connect(new StdioServerTransport());
}

principal().catch((error) => {
  // stdout está reservado para el protocolo MCP; los errores van a stderr.
  console.error('[soatm-docs] fallo al iniciar:', error);
  process.exit(1);
});
