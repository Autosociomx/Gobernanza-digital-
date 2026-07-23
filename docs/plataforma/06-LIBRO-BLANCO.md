# 06 · Libro blanco — visión estratégica y contexto internacional

**Nayarit Digital / ConnectX / SOATM** · Libro blanco · v1.0

## Qué se excluye de este libro blanco, y por qué

Este documento **no** incluye el contenido de `docs/interno/` (estrategia de
consolidación política ligada a una candidata específica, roadmap de
monetización de datos con aseguradoras/fintechs, cifras de ingreso) ni de
`src/components/TesisCienciaPolitica.tsx`. `docs/marco/GOBERNANZA_REPOSITORIO.md`
clasifica ese contenido como **Interno** ("estrategia de negociación,
doctrina de comunicación, análisis político... nunca se commitea a `main` si
el repo va a abrirse") — no pertenece a un documento pensado para
desarrolladores, legisladores o público externo. Lo que sigue reutiliza
únicamente el material que ese mismo marco clasifica como **Público**.

## Caso de uso ancla: soberanía digital infantil (SINISI)

El caso de uso mejor desarrollado del ecosistema — con propuesta legislativa
completa — vive en `docs/marco/soberania-digital-infantil/README.md`. Resumen
fiel a ese documento (no se repite aquí completo; se referencia):

- **El problema**: las plataformas digitales operan en México sin mecanismo
  confiable de verificación de edad ni consentimiento parental verificable.
- **La idea núcleo**: usar la infraestructura ya desplegada de las Becas para
  el Bienestar Benito Juárez (padrón de ~12 millones de becarios, Banco del
  Bienestar, entrega presencial de tarjetas) como base de una identidad
  digital soberana para niñas, niños y adolescentes, con **doble anonimato**:
  el Estado certifica edad y autorización del tutor; la plataforma nunca
  recibe datos personales del menor, solo un token firmado y rotatorio.
- **Referentes internacionales ya documentados en esa propuesta**: Reino
  Unido (Age Appropriate Design Code), Unión Europea (GDPR art. 8 + DSA),
  Francia (Ley SREN + France Identité — el modelo de doble anonimato más
  cercano al propuesto), Australia (Online Safety Act + eSafety
  Commissioner).
- **Candados de privacidad**: sin biometría infantil tratada por privados,
  activación voluntaria nunca condicionada a la beca, tokens no
  correlacionables entre plataformas, auditoría pública del código.

## Contexto internacional adicional — gobierno digital general

A diferencia de la sección anterior (tomada directamente de un documento ya
existente en el repo), lo que sigue es **análisis de contexto general del
equipo**, no una cita de un estudio o tesis específica — no se encontró en
este repositorio ningún documento con conclusiones propias sobre estos tres
países, así que se documenta con información pública conocida:

| País | Instrumento | Qué resuelve | Diferencia con SINISI/SOATM |
|---|---|---|---|
| Estonia | X-Road, e-Residency | Intercambio de datos entre instituciones ("una sola vez") e identidad digital robusta para trámites | Identidad general de adultos ante el Estado; no aborda verificación de edad ni protección de menores frente a plataformas |
| España | Cl@ve, DNI electrónico | Llave única para trámites con la administración pública | Mismo enfoque: identidad del ciudadano adulto, no del menor |
| Italia | SPID, Carta d'Identità Elettronica | Identidad digital pública para servicios públicos y privados | Mismo enfoque: acceso a servicios, no protección infantil específica |

**El punto en común de los tres**: resuelven identidad y acceso a trámites de
adultos ante el Estado — ninguno resuelve, como objetivo central, la
verificación de edad y protección de niñas, niños y adolescentes frente a
redes sociales e IA. Esa es la brecha que SINISI/SOATM Identity atacan
específicamente.

## Por qué sería un diferenciador para México ("océano azul")

Tomado directamente de `docs/marco/soberania-digital-infantil/README.md`
§8, con la comparación de la tabla de arriba como contexto adicional:

- **Ningún país usa un programa social masivo ya operando** como riel de
  activación de identidad infantil — Estonia, España e Italia construyeron
  su infraestructura de identidad desde cero como proyecto de gobierno
  digital; la propuesta de este repositorio reutiliza algo que el Estado
  mexicano ya paga, ya opera, y en lo que las familias ya confían.
- El enfoque no es identidad general del ciudadano (lo que ya resuelven
  Estonia/España/Italia), sino protección específica de la niñez: doble
  anonimato, sin biometría, activación voluntaria.
- Alinea a México con el estándar internacional de protección infantil
  (Reino Unido, UE, Francia, Australia — los referentes que la propia
  propuesta ya cita) sin copiar ningún modelo existente de un solo bloque.

## Escalabilidad — de un municipio a la plataforma nacional

Reutilizando el framing técnico (no político) ya presente en la
documentación pública del repositorio: SOATM nace como plataforma municipal
(Tepic) y su arquitectura de componentes (`02-ARQUITECTURA-SISTEMA.md`) está
pensada para que un segundo municipio o un segundo estado reutilice SOATM
Kernel, SOATM Identity y SOATM Security sin reconstruirlos — el mismo
principio "un componente, no 32 sistemas estatales distintos" que ya aplica
`docs/marco/soberania-digital-infantil/README.md` §5 a la propuesta de Ley
General. La condición para que esto sea cierto y no solo aspiracional es que
el **SOATM Data Bus** (hoy "Hoja de ruta") se construya como un contrato
formal entre módulos — mientras la integración siga siendo punto a punto en
la UI, escalar a un segundo municipio implica duplicar trabajo, no reusar
plataforma.

## Nota honesta de cierre

Este libro blanco describe una arquitectura de plataforma coherente y un
caso de uso (SINISI) con desarrollo legislativo real. No describe un sistema
completamente construido: `01-VISION-PRODUCTO.md` y
`02-ARQUITECTURA-SISTEMA.md` documentan con precisión qué de esto es
operativo hoy y qué es todavía hoja de ruta. Presentar este documento sin los
otros cinco de `docs/plataforma/` sería repetir el error que esta
reestructuración buscó corregir.

---

*Este documento fue revisado por la Silla de Redacción Técnica / Ciencias
Políticas — ninguna afirmación sin evidencia verificable en código o
documento existente (`docs/plataforma/README.md`).*
