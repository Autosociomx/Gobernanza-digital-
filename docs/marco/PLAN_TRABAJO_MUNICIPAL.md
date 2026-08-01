# Plan de Trabajo Municipal — Océanos Azules por Dependencia

**Nayarit Digital · ConnectX — SOATM Tepic** · Sesión del Parlamento, 2026-08-01
Documento de presentación para la reunión de lunes. Método: para cada dependencia del Ayuntamiento — (1) cómo opera hoy, (2) el océano azul, (3) la ley que lo sustenta, (4) cómo lo ejecuta ConnectX, (5) la victoria temprana visible en semanas.

> Regla de honestidad del Parlamento: lo que hoy es maqueta se etiqueta SIMULADO; lo que ya opera, VERIFICADO. Las leyes marcadas POR VERIFICAR no se afirman en público hasta confirmar texto.

---

## 1. Catastro — el océano que paga toda la plataforma

**Hoy:** la cartografía catastral se desactualiza: ampliaciones, bardas, locales y construcciones nuevas no declaradas. El predio se cobra sobre valores viejos → el municipio recauda menos de lo que la ley permite.

**El océano azul:** comparación de imágenes satelitales **actuales contra 2–3 años atrás** (Sentinel-2, gratuito, cada 5 días) para detectar cambios de uso de suelo y obra nueva, cruzados contra el padrón catastral. Cada diferencia detectada genera una orden de verificación de campo con folio; el inspector confirma con foto georreferenciada y el valor catastral se actualiza.

- **Ley:** CPEUM Art. 115 fr. IV (catastro y predial son competencia municipal). Marco fiscal: Código Fiscal del Estado de Nayarit + Ley de Ingresos municipal vigente (POR VERIFICAR texto exacto).
- **Ejecución ConnectX:** capa de cambios sobre el NayaritMap → lista de predios candidatos → app del inspector con folio y evidencia → actualización → medición pública de recaudación recuperada.
- **Honestidad técnica (decirlo así):** Sentinel-2 a 10 m detecta obra grande; el detalle fino lo confirma el inspector en campo. No prometemos "predial por satélite": prometemos *detección de candidatos + verificación humana con folio*.
- **Victoria temprana:** piloto en 2 colonias en 30 días. **La narrativa del lunes:** *"la plataforma se autofinancia — cada predio actualizado es ingreso recurrente anual, sin subir un solo impuesto."*

## 2. Tesorería Digital — "Cero Papel" y el padrón de cobradores

**Hoy:** los trabajadores que cobran en negocios y tianguis entregan papelitos; el pago en efectivo se mueve sin registro en tiempo real; el contribuyente no puede verificar si su recibo es genuino; la tesorería se entera días después.

**El océano azul:** **padrón digital de cobradores** con credencial verificable + **cada cobro (aunque sea en efectivo) se registra al momento** con folio y QR. El comerciante escanea el QR de su recibo y comprueba que su pago ya está registrado en Tesorería. Cero papel, cero recibos falsos, cero "coyotes".

- **Ley:** LGD Nayarit Art. 6 (simplificación administrativa) + LNETB (eliminación de trámites y papel) + CPEUM 115 fr. IV.
- **Ejecución ConnectX:** el patrón ya existe en el repo — **QR Mágico** (PR #7: pagos gubernamentales con QR) + folio sellado del Nodo de Transparencia. Padrón de cobradores = misma arquitectura que perfiles con rol (ya funciona en Salud).
- **Pacto social (decirlo así):** **cero despidos** — el cobrador no desaparece: se reconvierte en *verificador digital* con credencial y app. El sindicato es co-autor del cambio.
- **Victoria temprana:** un tianguis o mercado piloto en 2 semanas: cada cobro registrado al minuto, reporte diario automático para Tesorería.

## 3. Licencias de funcionamiento — padrón comercial con QR en el local

**Hoy:** el padrón de negocios está incompleto; la licencia es un papel que nadie verifica; inspección sin evidencia digital.

**El océano azul:** padrón comercial vivo; cada negocio exhibe su licencia con QR escaneable (el ciudadano y el inspector verifican vigencia al momento); renovación en línea con pago digital; inspección con foto y folio.

- **Ley:** CPEUM 115 fr. VI + Ley de Desarrollo Urbano del Estado de Nayarit (POR VERIFICAR texto).
- **Conexión:** alimenta Tesorería (derechos) y Catastro (uso de suelo real vs. declarado).
- **Victoria temprana:** alta en línea de nuevos negocios desde la semana 1 — cada licencia nueva es ingreso y padrón.

## 4. Obras Públicas — la obra con bitácora que el ciudadano audita

**Hoy:** la obra se anuncia, se retrasa, se encarece, y nadie puede comprobar nada.

**El océano azul:** cada obra con folio, presupuesto, cronograma y **bitácora de evidencia** (fotos georreferenciadas por avance); el ciudadano ve el % real y reporta con foto; alertas automáticas de desfase.

- **Ley:** Ley de Obras Públicas del Estado de Nayarit (POR VERIFICAR texto) + Ley General de Transparencia (obligación de publicar obra pública).
- **Ejecución ConnectX:** es la PR #34 (Obras Nayarit) — el Parlamento ya votó conservarla y rehacerla sobre el `main` actual.
- **Victoria temprana:** una sola obra emblemática con bitácora pública desde el día 1.

## 5. Servicios Públicos — el reporte con folio (la victoria más visible)

**Hoy:** el bache se reporta por WhatsApp y se pierde; no hay folio, no hay trazabilidad.

**El océano azul:** reporte ciudadano (bache, luminaria, fuga, basura) → folio inmediato → cuadrilla asignada → evidencia de cierre → tiempo de respuesta medido y público.

- **Ley:** CPEUM 115 (agua, alumbrado, calles, limpia) + NOM-083-SEMARNAT-2003 (residuos).
- **Ejecución ConnectX:** el flujo ya está construido en el portal ciudadano y en el C5 (hoy con datos SIMULADOS, cableado listo para conectar).
- **Victoria temprana:** es la demo del lunes — el folio que no se pierde.

## 6. Agua (organismo operador) — fugas y recaudación

**El océano azul:** fugas reportadas con foto y georreferencia priorizadas por volumen; avisos de corte publicados por colonia; convenios de pago en línea con QR.

- **Ley:** Ley de Aguas Nacionales + reglamento del organismo operador municipal (POR VERIFICAR nombre del organismo en Tepic).
- **Conexión:** Tesorería (recaudación de agua) + Servicios Públicos (mismo flujo de folio).

## 7. Rastro municipal — la bitácora sanitaria digital

Ya dictaminado en `OCEANOS_AZULES.md` (§3): CPEUM 115 fr. III + NOM-009-ZOO-1994 / NOM-033-ZOO-1995 / NOM-194-SSA1-2004. Bitácora de sacrificio con folio, derechos cobrados con QR, trazabilidad cárnica que alimenta el Módulo Ganado.

## 8. DIF / Bienestar — padrón único de beneficiarios con CURP

**El océano azul:** padrón único municipal amarrado a CURP (el mismo principio de la LDRS Art. 140): elimina duplicidad de apoyos y correlaciona con salud (perfil con consentimiento) y con despensas/subsidios.

- **Ley:** Ley de Asistencia Social + LFPDPPP (datos sensibles: consentimiento expreso — patrón ya implementado en Salud).

## 9. Protección Civil — censo de riesgos y alertas

**El océano azul:** censo georreferenciado de puntos de riesgo (árboles, cables, zonas de inundación) alimentado por reportes ciudadanos con folio; alertas por colonia.

- **Ley:** Ley General de Protección Civil (2012) + ley estatal (POR VERIFICAR).

## 10. Registro Civil — el trámite #1, en línea

Ya dictaminado en `OCEANOS_AZULES.md` (§6): actas con solicitud en línea y pago digital; entrada natural a Nayarit ID y Llave Infantil.

---

## Secuencia de 6 meses (el plan que se presenta el lunes)

| Fase | Semanas | Dependencias | Por qué primero |
|---|---|---|---|
| **1. Victorias tempranas** | 1–4 | Servicios Públicos (folio) + Tesorería (cero papel en 1 mercado) | Visible al ciudadano en días; la teoría de Dunleavy: la digitalización sobrevive si produce resultados en semanas |
| **2. Autofinanciamiento** | 5–12 | Catastro satelital (piloto 2 colonias) + Licencias QR | La recaudación recuperada paga la operación |
| **3. Consolidación** | 13–26 | Obras (bitácora) + Agua + Rastro + DIF | Infraestructura de confianza; cada módulo alimenta a los demás |

**Los tres mensajes del lunes:**
1. *"La ley ya obliga a Tepic a hacer esto (LGD Arts. 2, 5, 6) — nosotros ya lo programamos."*
2. *"La plataforma se paga sola: Catastro satelital recupera predial sin subir impuestos."*
3. *"Cero papel no significa cero empleos: el cobrador se vuelve verificador digital. Pacto de cero despidos."*

**Pendientes para cerrar este plan:** texto exacto de la Ley de Ingresos municipal y Código Fiscal de Nayarit (Catastro/Tesorería), nombre del organismo operador de agua de Tepic, Ley Ganadera de Nayarit (Rastro/Ganado) — ya listados en la Biblioteca Legal §5.
