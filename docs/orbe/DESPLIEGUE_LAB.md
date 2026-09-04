# Despliegue ORBE + Context.OS LAB

**Alcance:** P0.1 únicamente.  
**Modo obligatorio:** `LAB_MOCK`.  
**Autoridad:** `NONE`.  
**Endpoint:** `POST /api/contextos/v0.1/execute`.  
**Health:** `GET /api/contextos/v0.1/health`.

## 1. Arquitectura de despliegue

La aplicación ciudadana continúa publicándose como frontend Vite. El runtime Context.OS LAB se expone como Netlify Function en `netlify/functions/contextos-lab.mts` y reutiliza `createLabContextOSRuntime()`.

La Function no introduce un segundo motor de políticas: usa el mismo `ContextOSRuntime`, service catalog y adapter LAB que el servidor local.

## 2. Variables requeridas

### Frontend

```text
VITE_CONTEXTOS_BRIDGE_ENABLED=true
VITE_CONTEXTOS_RUNTIME_URL=https://<host-de-la-demo>
```

El repositorio mantiene el bridge deshabilitado por defecto. Solo el entorno explícito de demo debe activarlo.

### Runtime LAB

```text
CONTEXTOS_ALLOWED_ORIGINS=https://<host-de-la-demo>
CONTEXTOS_RATE_WINDOW_MS=60000
CONTEXTOS_RATE_MAX=30
```

`CONTEXTOS_ALLOWED_ORIGINS` es una lista separada por comas. No usar `*`.

No se requiere una llave de proveedor de IA para el vertical slice ORBE → Context.OS.

## 3. Levantar desde cero en local

Instalar dependencias:

```bash
npm ci
```

Levantar el runtime local:

```bash
CONTEXTOS_HOST=127.0.0.1 \
CONTEXTOS_PORT=3011 \
CONTEXTOS_ALLOWED_ORIGINS=http://localhost:3000 \
npm run contextos:lab
```

Configurar el frontend de desarrollo:

```text
VITE_CONTEXTOS_BRIDGE_ENABLED=true
VITE_CONTEXTOS_RUNTIME_URL=http://127.0.0.1:3011
```

El health esperado debe declarar:

```json
{
  "service": "context-os-runtime",
  "version": "0.1.0",
  "executionMode": "LAB_MOCK",
  "authority": "NONE"
}
```

## 4. Despliegue en Netlify

1. Mantener `netlify/functions/contextos-lab.mts` en el árbol desplegado.
2. Configurar las variables anteriores desde el entorno de Netlify. No commitear secretos ni valores sensibles.
3. Usar el mismo host del frontend como `VITE_CONTEXTOS_RUNTIME_URL` cuando la Function se publique en ese sitio.
4. Configurar `CONTEXTOS_ALLOWED_ORIGINS` exclusivamente con las URLs autorizadas de producción/demo y, si corresponde, previews concretos.
5. Desplegar.
6. Verificar `GET /api/contextos/v0.1/health` antes de activar el bridge para terceros.
7. Ejecutar una solicitud de bache/luminaria y confirmar que el response contiene `LAB_MOCK`, `evidenceId` y hash SHA-256.

## 5. Rate limit

La Function aplica un límite básico por IP. Los valores por defecto son 30 peticiones por ventana de 60 segundos y pueden reducirse mediante variables de entorno.

Este mecanismo es suficiente como defensa básica de una demo, pero es **best effort por instancia serverless**. No sustituye un rate limiter distribuido para producción.

## 6. Idempotencia en serverless

`ContextOSRuntime` conserva idempotencia en memoria del proceso. En una instancia caliente, repetir el mismo `requestId` y payload devuelve la respuesta ya terminada y evita un segundo efecto del adapter.

En P0 el único adapter es `LAB_MOCK`, por lo que no existe efecto administrativo. Un despliegue serverless con múltiples instancias **no garantiza idempotencia global entre instancias**. Antes de SANDBOX/INSTITUTIONAL deberá existir almacenamiento compartido o idempotencia garantizada por el adapter externo.

## 7. Cómo apagarlo

La forma preferida de desactivar la demo sin modificar el canon es:

1. establecer `VITE_CONTEXTOS_BRIDGE_ENABLED=false` y volver a desplegar el frontend;
2. retirar o restringir `CONTEXTOS_ALLOWED_ORIGINS`;
3. si se requiere apagar también el endpoint, retirar la Function en un cambio versionado o deshabilitar el deploy correspondiente desde Netlify.

No cambiar `executionMode` para “apagar” el sistema. `SANDBOX` e `INSTITUTIONAL` están fuera de alcance de P0.

## 8. Criterios de honestidad

La UI debe permanecer visible como:

- laboratorio;
- `LAB_MOCK`;
- autoridad `NONE`;
- sin efecto administrativo;
- folio/evidencia de laboratorio;
- no constituye resolución oficial.

Si Context.OS está caído o el response no es válido, ORBE debe informar que no se realizó ninguna acción.
