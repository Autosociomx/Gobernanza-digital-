# Academia Estratégica

## Qué es
Blueprint estratégico de la Academia: mapa de valor (sindicato → niveles → impacto) y modelo de sostenibilidad económica.

## Estado
**Maqueta — la interfaz existe, corre sobre contenido de ejemplo, sin servicio detrás**

Verificado en el código (auditoría Bloque 7):
- Cero imports de `firebase/firestore`, cero `fetch(`, cero servicio: solo `motion`, iconos, `cn` y `AuraCertificationSeal`.
- Todo el contenido (nodos del mapa, cuatro tarjetas de sostenibilidad, mensajes) es JSX literal.
- Es una lámina de estrategia, no un módulo operativo: no hay dato del que dependa ni acción que modifique el sistema.

## Conexiones
| Con | Qué fluye |
|---|---|
| academy | Es el "Blueprint" al que lleva el encabezado de ConnectX Academy |
| CitizenApp | Se monta como vista `strategic_academy` (`src/components/CitizenApp.tsx:390`) |

## Dónde vive
- Código: `src/components/StrategicAcademyView.tsx` — función/componente `StrategicAcademyView()`, líneas 1-250

## Cómo editarlo
- El modelo de sostenibilidad son cuatro `<MonetizationCard>` (líneas ~180-200): ahí se edita cada línea de ingreso propuesta.
- Regla de honestidad para este archivo: cada tarjeta describe un servicio **por contratar**. Si algo se afirma como existente, tiene que poder señalarse el código que lo implementa.

## Pendientes
- Ninguna de las cuatro vías de sostenibilidad está contratada ni instrumentada: son propuestas comerciales, no funciones del sistema.
- No hay canal de contacto conectado: la alianza se inicia fuera del sistema y se asienta en `docs/actas/`.

## Bitácora de auditoría
- **2026-08 (Bloque 7).** *Sobreventa corregida.* La tarjeta "Gestión Federal" vendía "captación de recursos federales (FAISPIAM) mediante consultoría técnica ConnectX" como si fuera una capacidad instalada. FAISPIAM no aparece en ninguna línea del código de tesorería. Se reetiquetó como "Gestión Federal (propuesta)" y el texto ahora dice que no existe integración de código con el fondo.
- **2026-08 (Bloque 7).** El CTA "Iniciar Alianza Estratégica" era un `alert()` de éxito falso ("enviada al Nodo de Gobernanza"): ahora es un botón con estado real (`alianzaRegistrada`) que despliega cómo se inicia realmente la alianza y advierte que no se envía nada.
- **2026-08 (Bloque 7).** Se añadió `<DemoDataBadge>` bajo el título, declarando que es un blueprint sin servicio detrás.
