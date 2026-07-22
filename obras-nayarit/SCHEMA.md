# Esquema de datos — Obras Nayarit (versión 2)

Define la estructura de `datos/obras.json`. Este mismo patrón (registro
estructurado + bitácora de evidencia + página de auditoría) es la plantilla para
los módulos futuros del portal: salud, educación, presupuesto municipal y
agricultura.

La estructura se verifica con `node obras-nayarit/validar.mjs` (también
disponible como `npm run validar:obras`). Ningún cambio a los datos debe
subirse sin pasar la validación.

## Raíz del documento

| Campo | Tipo | Descripción |
|---|---|---|
| `version` | número | Versión del esquema (actual: 2) |
| `actualizado` | texto | Fecha de la última consulta (`AAAA-MM-DD`, con sufijo opcional entre paréntesis) |
| `estado` | texto | Siempre `"Nayarit"` |
| `clasificacion` | objeto | Catálogos de `ambitos` y `etapas` con su definición legible |
| `obras` | arreglo | Lista de fichas de obra (ver abajo) |

## Ficha de obra

Los campos marcados con ◆ son obligatorios; el resto acepta `null` cuando el
dato no está publicado (nunca se inventa: si no hay fuente, va `null` y el hueco
se anota en `pendientes_de_verificar`).

| Campo | Tipo | Descripción |
|---|---|---|
| `id` ◆ | texto | Identificador único en kebab-case (`autopista-las-varas-platanitos`) |
| `nombre` ◆ | texto | Nombre ciudadano de la obra |
| `ambito` ◆ | enum | `federal` \| `estatal` \| `municipal` |
| `etapa` ◆ | enum | `en_debate` \| `aprobada_por_iniciar` \| `en_ejecucion` \| `concluida` |
| `dependencia_ejecutora` ◆ | texto | Quién ejecuta la obra |
| `quien_propuso` ◆ | texto | Origen de la propuesta |
| `quien_autorizo` ◆ | texto | Autoridad o instrumento que la autorizó |
| `municipios` ◆ | arreglo de texto | Municipios impactados (vacío = alcance estatal difuso) |
| `descripcion` ◆ | texto | Qué es la obra, en lenguaje simple |
| `inversion_mdp` | número o null | Inversión en millones de pesos según la fuente citada |
| `fuente_financiamiento` | texto o null | De dónde sale el dinero |
| `contratacion` ◆ | objeto | `{ esquema, referencia }`; esquema de contratación y referencia del contrato/licitación (o null) |
| `fecha_inicio` | texto o null | Inicio real o anunciado |
| `fecha_entrega_estimada` | texto o null | Fecha esperada de entrega |
| `empleos_estimados` | número o null | Empleos estimados según la fuente |
| `estatus` ◆ | texto | Último estado conocido, en una o dos frases |
| `hitos` ◆ | arreglo | Cronología: `{ fecha, hecho }` con fecha `AAAA`, `AAAA-MM` o `AAAA-MM-DD`, en orden cronológico |
| `fuentes` ◆ | arreglo de URL | Al menos una URL (`http(s)://`) que respalda la ficha |
| `pendientes_de_verificar` ◆ | arreglo de texto | Huecos de información a resolver en la siguiente consulta (puede ser vacío) |

## Reglas de integridad (las aplica el validador)

1. `id` único en todo el archivo y en kebab-case.
2. `ambito` y `etapa` deben existir en los catálogos de `clasificacion`.
3. Toda obra tiene al menos una fuente y toda fuente es URL válida.
4. Las fechas de `hitos` cumplen el formato y están en orden no descendente.
5. `inversion_mdp` y `empleos_estimados` son números positivos o `null`.
6. Ningún campo obligatorio ausente o vacío.

## Regla editorial

Cada modificación de `datos/obras.json` debe ir acompañada, en el mismo commit,
de un reporte nuevo en `evidencia/` que explique qué cambió y con qué fuentes.
El historial de git es la cadena de evidencia del módulo.
