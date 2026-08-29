# Parlamento Municipal

## Qué es
Foro parlamentario municipal — hilos y comentarios con lectura y escritura reales en Firestore.

## Estado
**Real — conectado a Firestore, verificado en el código**

Verificado en el código (auditoría Bloque 7):
- `onSnapshot` sobre `forum_threads` ordenado por `createdAt` (líneas 66-80) y sobre `forum_threads/{id}/comments` (líneas 322-338): lectura en vivo, no arreglos fijos.
- Escritura real: `addDoc` de hilos (87-95), `addDoc` de comentarios + `updateDoc` con `increment(1)` del contador (347-358), `deleteDoc` del hilo (371).
- Errores canalizados a `handleFirestoreError` con `OperationType`, no silenciados.
- Cero `Math.random`, cero `alert(`, cero arreglos de datos simulados.
- El único texto ficticio que quedaba era el nombre por defecto del autor.

## Conexiones
| Con | Qué fluye |
|---|---|
| forum (CitizenApp) | Mismo componente, reutilizado como tab del portal ciudadano (`src/components/CitizenApp.tsx:379`) |
| C5 Dashboard | Se monta como módulo `parlamento` (`src/components/C5Dashboard.tsx:230`) |
| firestore.rules | `forum_threads` (líneas 273-281): lectura pública, creación autenticada, borrado solo del autor o admin |
| docs/actas/ | Actas de sesiones del Gabinete de Especialistas |

## Dónde vive
- Código: `src/components/dashboard/ParlamentoView.tsx` — función/componente `ParlamentoView()`, líneas 1-539

## Cómo editarlo
- CRUD completo vía `onSnapshot`/`addDoc`/`updateDoc`/`deleteDoc` sobre `forum_threads` y su subcolección `comments` — es el control positivo del repositorio, el patrón a replicar en otros módulos.
- Cualquier permiso que se muestre en la UI debe coincidir con `firestore.rules`: si la regla lo va a rechazar, el control no debe aparecer.

## Pendientes
- No hay moderación previa ni cola de revisión: el hilo se publica al instante (así se declara ahora en el aviso del formulario). El sello "STAMNAY moderado" solo refleja el campo `isVerified` del documento; nada en la app lo asigna.
- El contador de comentarios se incrementa desde el cliente; no hay reconciliación si un comentario se borra por fuera.
- Sin autenticación, el hilo se crearía con `authorId: 'anonymous'` y las reglas lo rechazarían: conviene bloquear el formulario cuando no hay sesión.

## Bitácora de auditoría
- **2026-08 (Bloque 7).** *Permiso fantasma.* `isAuthor` incluía `|| thread.authorId === 'anonymous'`, así que cualquier persona veía el botón de borrar en los hilos anónimos y la operación siempre fallaba contra `firestore.rules`. Ahora el borrado solo se muestra al autor real autenticado.
- **2026-08 (Bloque 7).** *Identidad ficticia en datos reales.* Hilos y comentarios sin sesión se guardaban con `authorName: 'Juan Pérez'` — una persona inventada dentro de datos de producción. Sustituido por "Ciudadano sin nombre registrado".
- **2026-08 (Bloque 7).** *Robustez.* `formatDate` llamaba `timestamp.toDate()` a ciegas (truena con documentos sembrados con fecha en texto) y `ThreadCard` hacía `thread.authorName.includes(...)` sin guarda; ambos casos ya están protegidos.
- **2026-08 (Bloque 7).** El aviso del formulario afirmaba "foro moderado por la Alianza Nayarit"; se reescribió a lo que el código y las reglas realmente hacen.
