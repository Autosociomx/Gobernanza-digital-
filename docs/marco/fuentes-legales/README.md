# Corpus de Fuentes Legales — SOATM / ConnectX

**Clasificación: Público** (ver `docs/marco/GOBERNANZA_REPOSITORIO.md` §5) — son leyes
publicadas oficialmente por el Estado mexicano; no hay nada aquí que no esté ya en un
portal de gobierno. Lo que aporta esta carpeta no es el contenido (público por
definición), sino **la organización, el cotejo y la trazabilidad de la fuente**.

## Para qué existe

Hoy el asistente de IA de la plataforma (Aura / G-Agente CX) responde preguntas
jurídicas con un *system prompt* directo al modelo — sin anclaje a un texto legal
real. Eso es exactamente el punto donde un modelo de lenguaje puede alucinar un
artículo. Esta carpeta es el primer paso para corregirlo: un corpus de texto legal
**verificado contra la fuente primaria**, organizado por nivel de gobierno, que en
una siguiente fase alimenta una capa de recuperación (RAG) para que el asistente
cite el artículo real en vez de inferirlo.

Mismo estándar de verificación que el resto del repositorio
(`docs/interno/tesis/`, `COMPLIANCE.md`): cada fuente se marca con su nivel —

- **(a)** cotejado íntegro contra el documento oficial (PDF/HTML de la fuente primaria)
- **(b)** confirmado por fuentes secundarias coincidentes, pendiente de cotejo primario
- **(c)** referencia de trabajo, no verificada

## Estructura

```
docs/marco/fuentes-legales/
├── README.md                 # este archivo — manifiesto e índice
├── federal/                  # leyes y reglamentos de aplicación nacional
├── estatal/
│   └── nayarit/               # leyes del Estado de Nayarit
└── municipal/
    └── tepic/                 # bandos, reglamentos y gacetas de Tepic
```

Un municipio o estado nuevo que se sume a SOATM agrega su propia subcarpeta bajo
`estatal/<estado>/` o `municipal/<municipio>/` — la estructura ya está pensada para
más de una implementación, igual que el resto del repositorio
(`docs/marco/ARQUITECTURA_REPOSITORIOS.md`).

## Índice de fuentes

| Ley / documento | Nivel de gobierno | Nivel de verificación | Archivo | Fuente oficial |
|---|---|---|---|---|
| Ley Nacional para Eliminar Trámites Burocráticos (LNETB), DOF 16-jul-2025, 114 arts. | Federal | **(a)** cotejado íntegro | [`federal/LNETB_texto_extraido_camara_diputados.txt`](./federal/LNETB_texto_extraido_camara_diputados.txt) | Cámara de Diputados (Leyes Biblio) |
| Ley de Gobierno Digital para el Estado de Nayarit, P.O. 13-jun-2022, 55 arts. | Estatal (Nayarit) | **(a)** cotejado íntegro | [`estatal/nayarit/LGD_NAYARIT_texto_extraido_congreso.txt`](./estatal/nayarit/LGD_NAYARIT_texto_extraido_congreso.txt) | Congreso del Estado de Nayarit |
| Ley Municipal para el Estado de Nayarit | Estatal (Nayarit) | **(b)** pendiente de cotejo primario | *pendiente de agregar a esta carpeta* | congresonayarit.gob.mx (bloqueado desde el entorno; ver `docs/interno/tesis/CAPITULO_XIII_ley_municipal_nayarit.md`) |
| Reglamento de la Administración Pública Municipal de Tepic (reformado, Gaceta Extraordinaria No. 4, dic-2024) | Municipal (Tepic) | **(c)** solo referenciado, texto no obtenido | *pendiente de agregar a esta carpeta* | tepic.gob.mx |
| Art. 115 constitucional (CPEUM) | Federal | **(a)** cotejado (ver `docs/interno/tesis/CAPITULO_X_fundamento_constitucional_articulo_115.md`) | *pendiente de agregar el texto íntegro a esta carpeta* | Cámara de Diputados |

## Cómo agregar una fuente nueva

1. Conseguir el texto **primario** (PDF/HTML oficial), no un resumen ni una nota de prensa.
2. Extraer el texto plano completo (mismo método usado para la LNETB: `pdfminer.six`,
   o copiar-pegar directo si el PDF no se puede procesar — ver el método usado en
   `docs/interno/tesis/CAPITULO_XIII_ley_municipal_nayarit.md` cuando la descarga falla).
3. Guardarlo en la subcarpeta que corresponda por nivel de gobierno, con nombre
   descriptivo (`LEY_O_REGLAMENTO_lugar_texto_completo.txt`).
4. Agregar la fila correspondiente a la tabla de arriba, con la fuente oficial exacta
   (URL) y la fecha de cotejo.
5. Si la fuente contradice o actualiza un capítulo ya escrito de la tesis
   (`docs/interno/tesis/`), ese capítulo se corrige — nunca se calla la
   contradicción (ver §11.4 del Capítulo XI: la lección de la retractación).

## Nota sobre las ~70 fuentes ya reunidas en NotebookLM

Si ya existe una colección más amplia reunida en otra herramienta (NotebookLM u
otra), lo más simple para incorporarlas aquí es, por cada una: texto plano completo
+ URL oficial + fecha. No hace falta traerlas todas de golpe — cada una que se
agregue queda inmediatamente disponible como fuente citable para el resto del
repositorio y, más adelante, para la capa de RAG del asistente.
