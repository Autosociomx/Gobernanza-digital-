# Laboratorio Municipal — ORBE + Context.OS

## Propósito

Convertir servicios municipales de alto impacto en casos demostrables, trazables y alineables con fuentes oficiales, sin presentar propuestas como capacidades institucionales ya autorizadas.

## Siete misiones iniciales

1. **Constancia de Residencia** — trámite documental y flujo ciudadano.
2. **Predial** — consulta, orientación, pago y aclaración.
3. **Baches y luminarias** — reporte y seguimiento de servicios públicos.
4. **Apertura de negocios** — orientación y futura interoperabilidad con modelos nacionales aplicables.
5. **Bienestar / atención ciudadana** — descubrimiento y canalización a programas o servicios.
6. **Catastro Inteligente** — detección de cambios o inconsistencias como señal para revisión humana.
7. **Tesorería de Campo** — digitalización de gestiones y cobros en campo mediante expediente, QR y acuse trazable.

Registro Civil / actas de nacimiento queda incluido en el catálogo inicial como caso documental adicional y deberá integrarse al canal oficial competente, no duplicarlo.

## Principio de ingresos propios

La meta no es subir tasas ni automatizar sanciones. El laboratorio buscará oportunidades de fortalecimiento de ingresos mediante:

- actualización y calidad de padrones;
- reducción de fugas administrativas;
- conciliación más rápida;
- digitalización de cobros existentes;
- regularización voluntaria;
- simplificación que facilite nueva actividad económica formal;
- detección de casos que requieren revisión humana.

## Regla de autoridad

La IA identifica, ordena, compara, explica y propone. La autoridad competente decide.

Flujo objetivo:

`OBSERVATION → EVIDENCE → POLICY → AUTHORITY → HUMAN REVIEW → DECISION → ACTION → PROOF`

Ningún agente puede convertir una observación en sanción, adeudo, licencia, acto administrativo o modificación patrimonial sin la autoridad y el procedimiento correspondientes.

## Arquitectura objetivo

`CIUDADANO → ORBE → INTENT → CATÁLOGO MUNICIPAL → Context.OS/COP → POLÍTICA/AUTORIDAD → MÓDULO → RESULTADO → EVIDENCIA`

En v0.1, ORBE puede orientar y navegar. Context.OS/COP debe considerarse capa evolutiva y no afirmarse como enforcement productivo hasta que exista implementación verificable de políticas, autoridad, memoria y prueba.

## Fuente de verdad

Los datos de servicios viven en `data/municipality/tepic/`. La documentación legal y de alineación existente en `docs/marco/`, `docs/expediente-regulatorio/` y `docs/presentacion-tepic/` sirve como corpus interno, pero cualquier dato operativo deberá cerrarse contra una fuente oficial vigente antes de marcarse `verificado`.
