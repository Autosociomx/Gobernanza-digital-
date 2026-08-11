# Protocolo de Seguridad del Repositorio

**Nayarit Digital / ConnectX** · Documento normativo · v1.0

## 1. Secretos y llaves de API

**Regla única: ninguna llave viaja al navegador. Jamás.**

- Las llaves (`GEMINI_API_KEY`, `STRIPE_SECRET_KEY`) viven **solo** en variables
  de entorno del servidor y se usan **solo** en `server.ts`.
- Prohibido agregarlas al bloque `define` de `vite.config.ts`: eso inyecta el
  valor literal en el JavaScript que descarga cualquier visitante.
- Prohibido crear clientes de IA (`new GoogleGenAI`, SDK de Anthropic, etc.)
  en cualquier archivo bajo `src/`. El cliente llama a endpoints del servidor
  (`/api/ai/chat`, `/api/ai/risk-analysis`).
- El archivo `.env` no se versiona; `.env.example` documenta las variables sin valores.

**Historial de incidentes**: la llave de Gemini fue expuesta al bundle en
cuatro ocasiones por pushes desde AI Studio (commits `939cd26`, `5c0ed8c`,
`3983ac9` y anteriores). **Acción pendiente obligatoria: rotar la llave en
Google AI Studio**, porque el historial de git conserva los valores expuestos
aunque el código actual esté limpio. Rotar = generar llave nueva y revocar la anterior.

## 2. Guardia automática de regresiones

- `scripts/verificar-regresiones.mjs` verifica: llave fuera del bundle, cliente
  sin SDK de IA, metadatos reales, `netlify.toml` y `robots.txt` presentes,
  code-splitting activo y fuentes sin `@import` bloqueante.
- `.github/workflows/guardia-regresiones.yml` lo ejecuta en cada push y PR a
  `main`, compila y confirma que la llave no aparezca en `dist/`.
- Ejecución local antes de subir cambios: `node scripts/verificar-regresiones.mjs --con-bundle`

## 3. Flujo con AI Studio (causa raíz de los incidentes)

AI Studio empuja desde una copia local que puede estar días atrás de `main`.

1. **Antes de editar en AI Studio**: sincronizar con el `main` actual de GitHub.
2. **Nunca aceptar** sugerencias de "simplificar el proyecto" que borren
   `netlify.toml`, `robots.txt`, `docs/`, endpoints del servidor o el lazy loading.
3. Después de cada push desde AI Studio, la Guardia de CI dictamina: si falla,
   el push introdujo una regresión y debe corregirse antes de fusionar.

## 4. Perímetro del sitio publicado

- Cabeceras en `netlify.toml`: HSTS (2 años), `X-Frame-Options: DENY`,
  `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`.
- Conexión exclusivamente HTTPS. Assets con hash: cache inmutable de 1 año.

## 5. Datos personales

- Consentimiento explícito **antes** de usar cualquier dato personal (LGPDPPSO),
  con registro verificable.
- Pagos: montos validados **en el servidor** ($1 a $100,000 MXN), divisa en
  lista blanca. El navegador nunca decide cuánto se cobra.
- Ningún dato personal real en el repositorio, en semillas de demo ni en actas.

## 6. Respuesta a incidentes

1. **Llave expuesta** → rotar de inmediato (generar nueva + revocar anterior),
   auditar consumo del proveedor, asentar en acta.
2. **Regresión en producción** → revertir el deploy en Netlify (deploy anterior
   queda publicable con un clic), corregir en rama, pasar la Guardia, refusionar.
3. **Datos personales comprometidos** → notificar al responsable del municipio
   y al INAI conforme a la LGPDPPSO; asentar en acta con cronología.

## 7. Checklist previo a publicar el repositorio (código abierto)

- [ ] Rotar todas las llaves que hayan tocado el historial de git
- [ ] Purgar del repositorio y su historial el material estratégico interno
      (Carpeta Ejecutiva, expedientes de negociación, doctrina de comunicación)
- [ ] Licencia definida (recomendada: AGPL-3.0 — ver `ESTRATEGIA_ESTANDAR_ABIERTO.md`)
- [ ] `README` institucional con guía de despliegue para otro municipio
- [ ] Guardia de CI en verde
