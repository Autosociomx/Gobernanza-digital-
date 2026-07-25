# Parlamento Municipal

## Qué es
Foro parlamentario municipal — hilos y comentarios con lectura y escritura reales en Firestore.

## Estado
**Real — conectado a Firestore/API, verificado en el código**

## Conexiones
| Con | Qué fluye |
|---|---|
| forum (CitizenApp) | Mismo componente, reutilizado también como tab del portal ciudadano |
| docs/actas/ | Actas de sesiones del Gabinete de Especialistas |

## Dónde vive
- Código: `src/components/dashboard/ParlamentoView.tsx` — función/componente `ParlamentoView()`, líneas 1-527


## Cómo editarlo
- CRUD completo vía `onSnapshot`/`addDoc`/`updateDoc`/`deleteDoc` sobre `forum_threads` y su subcolección `comments` — es el control positivo del repositorio, el patrón a replicar en otros módulos.

## Pendientes
- Ninguno detectado en la auditoría de CTAs — es de los módulos más sólidos del repositorio.
