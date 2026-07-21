# SOATM — Sistema Operativo para la Autonomía Tecnológica Municipal

**Primera implementación: Nayarit Digital (Tepic, Nayarit)**

Plataforma de gobernanza digital municipal: portal ciudadano, expediente de
salud ligado a CURP, y panel operativo para el municipio — construida para
cumplir la Ley Nacional para Eliminar Trámites Burocráticos (LNETB, DOF
16-VII-2025) sin dejar el código en manos de un proveedor externo.

SOATM es el estándar reutilizable; Nayarit Digital es su primera
implementación, nacida de un piloto real en Tepic. Un municipio que adopte
el sistema no copia a Tepic: implementa un estándar documentado, alineado
con el esquema de reutilización del Repositorio Nacional de Tecnología
Pública que la LNETB establece (Art. 91). El mapa completo de qué artículo
de qué ley se cumple con qué componente — y cómo se prueba — vive en
[`COMPLIANCE.md`](./COMPLIANCE.md).

## Por qué existe

El trámite gratuito en un Centro de Salud mexicano hoy no deja rastro: los
estudios se mandan por WhatsApp, cada trámite exige presentar copia del CURP
de nuevo, y no hay expediente que siga al paciente. Nayarit Digital resuelve
ese vacío concreto — y de paso cumple la obligación legal de digitalización
que la LNETB impone a todos los municipios del país, con plazos ya vencidos.

## Qué hace hoy

- **App Ciudadana** — trámites y pagos municipales, mapa de obras e
  incidencias, reportes urbanos, foro comunitario, todo en español, cora y
  wixárika.
- **Aura, el asistente conversacional** — voz nativa del navegador (Web
  Speech API, sin costo por llamada), consciente de en qué pantalla está el
  ciudadano, y con **acciones reales**: puede registrar un reporte ciudadano
  (bache, luminaria, falla de agua) durante la conversación vía function
  calling de Gemini, no solo explicar cómo hacerlo.
- **Perfil de Salud ligado a CURP** — existe aunque la persona nunca tenga
  cuenta ni smartphone. Lo puede crear el propio paciente, un familiar sin
  fricción, o personal de salud con un código vigente. Incluye expediente
  con documentos (reemplaza el envío por WhatsApp), datos clínicos clave
  (tipo de sangre, alergias, condiciones crónicas), portal de citas, y
  **consentimiento revocable por el paciente con bitácora de acceso
  auditable** — el ciudadano ve quién consultó su expediente y cuándo.
- **Panel municipal (C5)** — cola de citas en tiempo real, búsqueda de
  expediente de urgencias por CURP con flujo de acceso de emergencia
  auditado, gestión de infraestructura y dependencias.
- **Modelo de seguridad verificado empíricamente** — cada regla de acceso
  se probó contra un emulador real de Firestore (`@firebase/rules-unit-testing`),
  no solo se revisó por inspección: decenas de casos que confirman quién
  puede leer o escribir qué, y quién no.

## Estructura del repositorio

```
├── server.ts                    # Express + Gemini (@google/genai) del lado del servidor
├── firestore.rules              # Fuente única de verdad del modelo de permisos
├── storage.rules                # Documentos del expediente de salud
├── firebase-applet-config.json.example
├── docs/
│   └── marco/                   # Normativa del proyecto: seguridad, cumplimiento LNETB,
│                                 # estrategia de licencia, cada módulo documentado
├── scripts/
│   └── verificar-regresiones.mjs  # Guardia de CI
└── src/
    ├── components/
    │   ├── CitizenApp.tsx        # Portal ciudadano (trámites, pagos, reportes, foro)
    │   ├── SaludNayaritID.tsx    # Perfil de salud ligado a CURP + Aura por voz
    │   ├── C5Dashboard.tsx       # Panel operativo municipal
    │   └── dashboard/            # Sub-vistas del panel (citas, infraestructura...)
    ├── services/
    │   ├── saludPerfilService.ts
    │   ├── citasSaludService.ts
    │   └── reportesCiudadanosService.ts
    └── hooks/
        ├── useAuraChat.ts        # Motor compartido del asistente conversacional
        └── useAuraVoice.ts       # Web Speech API (voz nativa del navegador)
```

> Nota: el repositorio de trabajo actual conserva además módulos internos de
> estrategia (ver `docs/interno/`, clasificación **Interno** en
> `docs/marco/GOBERNANZA_REPOSITORIO.md` §5) que **no** forman parte de la
> superficie pública descrita aquí y que el checklist de apertura
> (`docs/marco/PROTOCOLO_SEGURIDAD.md` §7) exige purgar antes de publicar
> este código como snapshot en un repositorio nuevo.

## Arquitectura

Ver [`ARCHITECTURE.md`](./ARCHITECTURE.md) para las decisiones de diseño y
por qué escala. En corto:

- **Frontend**: React 19 + TypeScript + Vite 6 + Tailwind 4, con
  code-splitting por vista pesada.
- **Datos y seguridad**: Firebase Auth (Google + sesiones anónimas para
  fricción mínima) + Firestore, con todo el control de acceso declarado en
  `firestore.rules` — no en un backend a medida.
- **IA**: Express + `@google/genai` (Gemini) del lado del servidor, para que
  la llave de API nunca llegue al navegador. El servidor no tiene
  credenciales privilegiadas de Firestore: cuando el modelo decide ejecutar
  una acción real, el cliente ya autenticado la escribe bajo las mismas
  reglas que cualquier otro flujo.
- **Despliegue**: Netlify, con una Guardia de regresiones propia (CI) y
  auditoría Lighthouse en cada Pull Request.

## Instalación rápida

Requiere Node 20+.

```bash
npm install
cp firebase-applet-config.json.example firebase-applet-config.json  # con los datos públicos de tu propio proyecto Firebase
```

Variables de entorno (`.env` o secretos de tu plataforma de despliegue):

| Variable | Requerida para | Notas |
|---|---|---|
| `GEMINI_API_KEY` | Aura (chat, triage, function calling) | [Google AI Studio](https://aistudio.google.com) |
| `STRIPE_SECRET_KEY` | Pagos con tarjeta | Opcional si no se usa esa vía de pago |

En tu proyecto de Firebase:

1. Habilita **Firestore** y despliega `firestore.rules` (fuente de verdad
   de todo el modelo de permisos).
2. Habilita **Cloud Storage** y despliega `storage.rules` (documentos del
   expediente de salud).
3. En **Authentication → Sign-in method**, habilita **Google** y
   **Anónimo** — este último es lo que permite usar la app sin forzar un
   inicio de sesión.
4. Siembra manualmente la colección `personal_salud` con los códigos del
   personal autorizado a hacer registro asistido (no hay UI de
   administración de personal todavía — ver `docs/marco/MODULO_SALUD_CURP.md`).

```bash
npm run dev    # servidor de desarrollo (Express + Vite)
npm run build  # build de producción
npm run lint   # typecheck
```

## Estado honesto del proyecto

Este es software de un piloto real en producción, no una demo terminada.
Partes del panel municipal (C5) siguen siendo maquetas visuales con datos
de ejemplo mientras se conecta el resto de las fuentes de datos reales del
municipio — cada módulo lo declara explícitamente en su propio código y en
`docs/marco/`. El catálogo completo de trámites y especialidades médicas
por centro de salud tampoco está poblado todavía con datos reales: son
categorías genéricas hasta que el municipio los proporcione.

## Licencia

AGPL-3.0. Cualquiera puede usar, auditar y desplegar este código; quien lo
modifique o construya sobre él está obligado por la licencia a liberar su
código con la misma licencia. La marca "Nayarit Digital" y el sello de
certificación asociado no se licencian junto con el código.

Ver `docs/marco/ESTRATEGIA_ESTANDAR_ABIERTO.md` para el razonamiento
completo detrás de esta elección de licencia.
