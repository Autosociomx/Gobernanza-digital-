# Context.OS Runtime v0.1 — Vertical Slice 001

Primer núcleo ejecutable del **Institutional Control Plane** de Context.OS.

## Alcance

Implementa únicamente un flujo de laboratorio de bajo riesgo:

`ORBE/cliente -> IntentEnvelope -> Policy -> Consent (si aplica) -> Service Catalog -> LAB adapter -> EvidenceRecord`

Caso: reporte ciudadano de **bache o luminaria** en Tepic.

## Lo que sí hace

- contratos tipados y versionados;
- resolución explícita de servicio, sin adivinar;
- política determinística;
- minimización de datos;
- consentimiento obligatorio si se comparte contacto personal;
- adapter `LAB_MOCK` sin efectos institucionales;
- evidencia con SHA-256 y `correlationId`;
- pruebas del flujo permitido, bloqueos y manipulación de evidencia.

## Lo que no hace

- no autoriza actos administrativos;
- no crea órdenes municipales reales;
- no integra Llave MX;
- no usa LLM para decidir políticas;
- no persiste expediente ciudadano;
- no sustituye Context.OS Observatory;
- no expone un conector institucional real.

## Servidor de laboratorio

Ejecutar:

```bash
npm run contextos:lab
```

Por defecto enlaza únicamente a `127.0.0.1:3011`.

Endpoints:

- `GET /api/contextos/v0.1/health`
- `POST /api/contextos/v0.1/execute`

La respuesta de un adapter siempre indica `executionMode: LAB_MOCK` para impedir que una demo sea presentada como integración oficial.

## Pruebas

```bash
npm run test:contextos
```

## Próximo incremento

1. conectar ORBE mediante `IntentEnvelope`;
2. persistir `EvidenceRecord` en un store append-only de laboratorio;
3. separar PDP (Policy Decision Point) y PEP (Policy Enforcement Point);
4. introducir un adapter institucional sólo cuando exista sistema, contrato, autenticación y autoridad verificables.
