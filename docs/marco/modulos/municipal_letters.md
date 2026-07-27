# Cartas Municipales

## Qué es
Generador de oficios y constancias municipales — hash de verificación, firma electrónica y PDF con membrete oficial.

## Estado
**Riesgo — simula un resultado que podría confundirse con uno real (pago, documento oficial, verificación)**

## Conexiones
| Con | Qué fluye |
|---|---|
| AuraCertificationSeal | Componente compartido con `banana_command`, `strategic_academy` y `strategic_plan` |

## Dónde vive
- Código: `src/components/MunicipalLettersView.tsx` — función/componente `MunicipalLettersView()`, líneas 1-759


## Cómo editarlo
- `handleGenerate` (líneas 106-120) fabrica un número aleatorio presentado como "hash SHA-256" — no es un hash de nada real.
- El PDF (`handleDownloadPDF`, 122-179) usa el nombre real de la Presidenta Municipal con "Firma Electrónica Avanzada con validez jurídica plena" y verificación blockchain — todo simulado, sin llamada a RENAPO/SAT/PNT.
- `handleVerifyOnScreen` (181-188) siempre aprueba, sin importar el input. `startStressTest` (190-221) imprime un log fabricado con `Math.random()`.

## Pendientes
- No demostrar este módulo en vivo con el nombre real de la funcionaria hasta agregar un aviso explícito de "SIMULACIÓN / SIN VALIDEZ OFICIAL", o hasta construir la verificación real.
- Es el hallazgo de mayor riesgo de todo el repositorio: puede confundirse con un generador real de documentos oficiales.
