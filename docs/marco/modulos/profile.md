# Perfil

## Qué es
Perfil del ciudadano, incluye el escáner de credencial (CredentialScannerView).

## Estado
**Parcial — parte de la vista es real, parte es maqueta o tiene botones sin acción**

## Conexiones
_Sin conexiones registradas todavía._

## Dónde vive
- Código: `src/components/CitizenApp.tsx` — función/componente `ProfileView()`, líneas 1742-1908


## Cómo editarlo
- `CredentialScannerView.onScanComplete` solo hace `console.log("Scan Data:", data)` — el propio comentario del código admite "aquí podríamos actualizar el perfil", nunca implementado.

## Pendientes
- Persistir el dato escaneado de la credencial al documento de perfil del usuario en vez de solo loguearlo.
