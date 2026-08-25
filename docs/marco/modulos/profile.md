# Perfil

## Qué es
Perfil del ciudadano, incluye el escáner de credencial (CredentialScannerView).

## Estado
**Parcial — el OCR ya alimenta el perfil; las métricas del panel ya son reales**

## Conexiones
| Con | Qué fluye |
|---|---|
| Firestore: `reportes_ciudadanos` | Conteo real de reportes levantados por el usuario |
| Firestore: `puntos` | Saldo real de puntos de recompensa |

## Dónde vive
- Código: `src/components/CitizenApp.tsx` — función/componente `ProfileView()`, líneas 1742-1908

## Auditoría 2026-08-25 — corregido
- `CredentialScannerView.onScanComplete` solo hacía `console.log("Scan Data:", data)` — el propio comentario del código admitía "aquí podríamos actualizar el perfil", nunca implementado. Ahora extrae CURP/clave de elector del texto OCR con una expresión regular, precarga el campo de documento de identidad y muestra el texto leído completo para verificación manual.
- El "Panel de Métricas Ciudadanas" mostraba cifras fijas ("12" reportes, "450" puntos) sin importar el usuario. Ahora lee el conteo real de reportes y el saldo real de puntos desde Firestore.

## Pendientes
- Ninguno bloqueante detectado en esta ronda.
