# Fuentes oficiales y alineación institucional

## Objetivo

Crear una capa de evidencia separada del código del ORBE para registrar de dónde proviene cada dato operativo, jurídico o institucional utilizado por Nayarit Digital.

## Jerarquía de referencia

1. Diario Oficial de la Federación / normas nacionales vigentes.
2. Agencia de Transformación Digital y Telecomunicaciones y plataformas nacionales aplicables.
3. Gobierno del Estado de Nayarit y normativa estatal vigente.
4. H. Ayuntamiento de Tepic y normativa municipal vigente.
5. Dependencia responsable y sus canales oficiales.
6. Documentación interna del proyecto.

Si una fuente oficial vigente contradice un documento interno, prevalece la fuente oficial.

## Qué registrar por fuente

- `source_id`
- autoridad emisora
- nivel: federal / estatal / municipal
- tipo de fuente
- URL o referencia documental
- fecha de consulta
- fecha de publicación o vigencia cuando sea conocida
- alcance: qué datos respalda
- estatus: vigente / histórico / por verificar
- notas de conflicto o sustitución

## Uso por ORBE

El ORBE debe responder primero con información estructurada respaldada por fuentes registradas. Si un dato crítico no está validado, debe decir que está pendiente de verificación y evitar inventar requisitos, costos, plazos, competencias o efectos jurídicos.

## Uso estratégico

Esta capa permite comparar:

`ESTADO ACTUAL → MODELO OFICIAL → BRECHA → PROPUESTA → AUTORIDAD QUE DECIDE → PROTOTIPO DEMOSTRABLE`

La finalidad no es competir con las plataformas nacionales o municipales, sino identificar dónde el proyecto puede acelerar su adopción, simplificación, interoperabilidad y experiencia ciudadana.
