# ConnectX Academy

## Qué es
Ruta de certificación para servidores públicos (niveles Bronce, Plata y Oro) presentada en el portal ciudadano.

## Estado
**Maqueta — la interfaz existe, corre sobre datos de ejemplo, sin servicio detrás**

Verificado en el código (auditoría Bloque 7):
- Cero imports de `firebase/firestore`, cero `fetch(`, cero servicio: el archivo solo importa `motion`, iconos y `cn`.
- Los tres niveles, sus beneficios y el "35% de progreso global" son literales escritos en el JSX.
- No hay usuario, ni inscripción, ni avance persistido: la vista se ve igual para cualquier persona.

## Conexiones
| Con | Qué fluye |
|---|---|
| strategic_academy | El botón "Blueprint" del encabezado navega a la Academia Estratégica (`onGoToStrategy`) |
| CitizenApp | Se monta como vista `academy` (`src/components/CitizenApp.tsx:387`) |

## Dónde vive
- Código: `src/components/ConnectXAcademy.tsx` — función/componente `ConnectXAcademy()`, líneas 1-214

## Cómo editarlo
- El contenido de cada nivel (título, descripción, beneficios y temario) son props literales dentro de `main` — ahí se edita el alcance del curso.
- Para hacerlo real: crear una colección de cursos e inscripciones en Firestore, leer el avance del usuario autenticado y sustituir el 35% fijo por ese cálculo.

## Pendientes
- Construir contenido de cursos y seguimiento de progreso por persona (hoy no existe ninguno de los dos).
- El "doble sello (municipio y sindicato)" sigue siendo una propuesta: no hay convenio firmado ni emisión de certificados.

## Bitácora de auditoría
- **2026-08 (Bloque 7).** El botón de cada nivel no tenía `onClick` (acción muerta): ahora abre y cierra el temario propuesto del nivel con estado real (`openLevel`).
- **2026-08 (Bloque 7).** Se añadió `<DemoDataBadge>` al inicio de la lista de niveles y se etiquetó el progreso como "(ejemplo)".
- **2026-08 (Bloque 7).** "Certificación avalada por tu organización" afirmaba un aval inexistente; se reescribió como certificación propuesta sujeta a convenio.
