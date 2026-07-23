# 01 · Visión de producto — SOATM

**Nayarit Digital / ConnectX / SOATM** · Documento de producto · v1.0

## Qué es SOATM

SOATM es la plataforma de gobernanza digital sobre la que corren los
servicios de un gobierno estatal/municipal: identidad ciudadana, salud,
tesorería, obra pública, servicios públicos, bienestar social, auditoría
cívica y protección digital. No es una aplicación — es la capa común
(identidad, orquestación conversacional, seguridad, datos) sobre la que cada
uno de esos servicios se construye como un módulo independiente.

La analogía correcta no es "una tesis sobre gobernanza digital", es una
plataforma de sistema operativo: **SOATM es a los servicios de gobierno lo
que Android es a las apps de un teléfono.** Android no resuelve el problema
de ninguna app en particular; da identidad, permisos, notificaciones y APIs
comunes para que miles de apps no tengan que reinventarlas. SOATM da
identidad ciudadana, consentimiento, IA conversacional y reglas de acceso
comunes para que Salud, Tesorería, Obras, Bienestar y Protección Digital no
construyan cada uno su propio sistema de identidad y permisos desde cero.

Este documento, y los cinco que le siguen en `docs/plataforma/`, existen
porque tratar esto como tesis académica invitaba la pregunta equivocada
("¿cuál es el marco teórico?") en vez de la que realmente hay que responder:
**¿cómo se documenta y se construye esto si hoy nos contrataran para
construir el sistema operativo del Estado?**

## Qué problema resuelve

Hoy cada dependencia gubernamental opera en un silo lógico: Salud no comparte
datos en tiempo real con Bienestar Social, y Obras Públicas no sincroniza con
Servicios Públicos ni con Tesorería. El ciudadano repite el mismo trámite de
identidad (CURP, comprobante de domicilio) ante cada ventanilla, física o
digital. SOATM ataca la fragmentación, no cualquier trámite individual: da
una sola identidad, un solo hilo conversacional (Aura) y una sola capa de
reglas de acceso para que los módulos dejen de operar aislados.

## Alcance actual vs. alcance de visión

Esto es lo más importante de leer antes de presentar SOATM a nadie externo:
**no todo lo descrito arriba está construido hoy.** El detalle componente por
componente vive en `02-ARQUITECTURA-SISTEMA.md`, pero el resumen honesto es:

- **Real y conectado, funcionando en la app hoy**: el Portal Ciudadano
  (`CitizenApp.tsx`), el motor conversacional Aura (`server.ts` →
  `/api/ai/chat`), y el expediente de salud ligado a CURP con su triaje
  (`SaludNayaritID.tsx`) — piloto verificado en Tepic.
- **Construido pero desconectado de la app en producción**: el mapa de
  infraestructura/obras (`SovereignMap.tsx`), solo alcanzable desde un
  componente (`MandoCentral.tsx`) que no está importado en `App.tsx` hoy.
- **Maqueta visual, sin backend real**: los paneles de Tesorería y de
  monitoreo agrícola dentro del dashboard de gobierno (`C5Dashboard.tsx`)
  muestran números fijos, no datos en vivo.
- **Backend más maduro del ecosistema, pero aislado por diseño**: Pulso
  Nayarit (`pulso-nayarit/`), con ledger criptográfico en Supabase/Postgres —
  deliberadamente sin compartir identidad con el resto de los módulos.
- **Propuesta legislativa, sin código todavía**: la identidad infantil
  (SINISI / Llave Infantil, `docs/marco/soberania-digital-infantil/`) y la
  Protección Digital 24/7.

## Por qué esto no invalida la visión

Documentar el hueco entre visión y lo construido no es debilitar el
proyecto — es lo que distingue un documento de ingeniería de un pitch. Un
arquitecto de plataforma que documenta Android no dice que todas las APIs
del roadmap ya existen; dice cuáles existen, cuáles están en beta y cuáles
son intención declarada. Eso es exactamente lo que hacen los seis documentos
de esta carpeta.

---

*Este documento fue revisado por el panel de 5 sillas descrito en
`docs/plataforma/README.md`.*
