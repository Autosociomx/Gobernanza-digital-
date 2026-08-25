# Pendientes de la auditoría de coherencia — 2026-08-25

Ítems encontrados durante la auditoría exhaustiva de 29 módulos + 9 módulos
conceptuales + 11 renglones de `MARCO_CUMPLIMIENTO_LNETB.md` que **no** se
resolvieron en esta ronda por requerir una decisión de negocio, legal o un
convenio externo — a diferencia de los hallazgos puramente técnicos, que sí
se corrigieron directamente en el código (ver `git log` de esta rama y la
sección "Bitácora de auditoría" en cada ficha de `docs/marco/modulos/`).

Cada ítem indica qué falta, por qué queda fuera de alcance técnico, quién
debe decidir, y dónde retomarlo.

## Identidad y pagos

**N1 — Integración real de Llave MX.**
Hoy la identidad es Firebase Auth (Google OAuth) como puente. Requiere
convenio federal con la Secretaría de Gobernación. Retomar en
`docs/orbe/modulos/LLAVE_IDENTIDAD.md`.

**N2 — Pago real con Stripe.**
`server.ts` (líneas ~236+) tiene un endpoint `/api/create-payment-intent`
real y funcional, pero **nada en `src/` lo llama**. Cablearlo requiere una
cuenta comercial de Stripe activa, conciliación contable y aprobación de
tesorería municipal — decisión de negocio, no de código. Retomar en
`src/components/CitizenApp.tsx` (`TesoreriaYTramitesView`) y
`docs/marco/modulos/payments.md`.

**N3 — Decidir el destino del endpoint de pago muerto.**
Si el pago real no está en el roadmap cercano, considerar retirar
`/api/create-payment-intent` y las dependencias `@stripe/react-stripe-js`
y `@stripe/stripe-js` en vez de dejar una superficie de cobro expuesta sin
uso. Depende de la decisión de N2.

**N4 — Firma Electrónica Avanzada real para Cartas Municipales.**
Requiere un Prestador de Servicios de Certificación (PSC) acreditado y un
convenio. Retomar en `src/components/MunicipalLettersView.tsx` y
`docs/marco/modulos/municipal_letters.md`.

**N5 — Redacción legal definitiva de los disclaimers de Cartas Municipales.**
En esta ronda se suavizó la redacción existente (reutilizando el tono ya
usado en `LegalComplianceDisclaimer.tsx`) sin inventar figuras jurídicas
nuevas, pero el texto final antes de cualquier demo institucional necesita
revisión de un área jurídica.

## Datos y arquitectura

**N6 — Convertir `citizenService.ts` a Firestore real.**
Hoy es un mock en memoria (`IS_MOCK = true`, documentado en el propio
archivo desde esta auditoría). Convertirlo requiere definir esquema,
reglas de Firestore y política de retención de datos personales
(LGPDPPSO) — no es un cambio mecánico.

**N7 — Consolidar el doble almacén de "departments".**
`server.ts` (SQLite) y `src/services/departmentService.ts` (Firestore)
son dos stores paralelos y no sincronizados para el mismo concepto. Tras
borrar los componentes muertos que los consumían (`DepartmentManager.tsx`,
`MandoCentral.tsx`), **ninguno de los dos tiene consumidor real hoy** —
confirmado por grep. Decidir cuál vive antes de construir una UI nueva
sobre cualquiera de los dos. Ver comentario en `server.ts` líneas ~66-99.

**N7b — `aiRiskService.ts` sin consumidor.**
Efecto colateral de N7: al borrar `MandoCentral.tsx` también quedó sin
consumidor de datos `src/services/aiRiskService.ts` (aunque
`departmentService.ts` le sigue exportando tipos). Candidato a borrado en
una pasada futura si nadie lo recablea.

**N8 — Implementar un `ConsentGate` general.**
`docs/marco/MARCO_CUMPLIMIENTO_LNETB.md` citaba un mecanismo de
consentimiento reutilizable que no existe en código (corregido en esta
auditoría). Lo real hoy es un booleano `consentimientoActivo` acotado al
módulo de salud. Diseñar el mecanismo general (qué declara, qué registra,
retención) es una decisión de producto y de cumplimiento de datos, no solo
de código.

**N9 — Integrar `pulso-nayarit/` a la app principal.**
Backend Supabase real y verificado (42/42 hashes válidos), pero
arquitectónicamente aislado: no aparece en `src/App.tsx`, no está en el
pipeline de Netlify, y no tiene URL pública de frontend. Integrarlo o
publicarlo por separado es una decisión de producto/despliegue.

**N10 — Modo pediátrico con candado del tutor (Expediente Familiar).**
Diseñado, no implementado — es la característica central que promociona
`docs/orbe/modulos/EXPEDIENTE_FAMILIAR.md`. Requiere definir el marco legal
de patria potestad aplicable antes de construir el control de acceso.

**N11 — tepictu-salud y proteccion-digital.**
Cero código en ambos casos — son propuestas documentadas
(`docs/orbe/modulos/TEPICTU_SALUD.md`, `PROTECCION_DIGITAL.md`), no
módulos con brecha de implementación. No requieren acción de esta
auditoría, solo mantenerse etiquetados como propuesta.

**N12 — Ampliar lenguas originarias más allá de 3 saludos.**
Hoy es un selector de 3 saludos en el chat del Asistente IA del panel de
gobierno; la voz (`useAuraVoice.ts`) siempre es es-MX. Ampliar cobertura
real (más texto traducido, voz nativa) requiere traducción profesional y
validación comunitaria, no solo código.

## Encontrados durante la corrección (nuevos desde la ronda anterior)

**N13 — Descuento de puntos no atómico en Canjes.**
`src/components/CanjesView.tsx`: el `addDoc` que registra el canje ocurre
antes del `updateDoc` que descuenta los puntos, y el error del descuento
se silencia con un `catch` vacío. Si el descuento falla, el canje queda
creado sin costo real. Corrección mínima: dejar de silenciar el `catch`;
corrección completa: `runTransaction` que lea saldo, descuente y registre
en una sola operación. No se tocó en esta ronda porque el alcance del
bloque que revisó este archivo era solo verificación, y cambiar el
comportamiento de una transacción de puntos merece su propia revisión.

**N14 — 6 vulnerabilidades npm restantes.**
`npm audit fix` (sin `--force`) redujo de 20 a 6. Las restantes requieren
`firebase-tools@14.23.0` (salto con cambios incompatibles) o son propias
del dev-server de `esbuild` (no afectan el bundle de producción). Evaluar
el salto de versión de `firebase-tools` por separado.

**N15 — Sesión sin bloqueo en formularios de Parlamento.**
`src/components/dashboard/ParlamentoView.tsx`: sin sesión iniciada, el
formulario de nuevo hilo/comentario se puede llenar pero `firestore.rules`
rechazará la escritura. Falta bloquear o avisar antes de que la persona
escriba, en vez de que falle después de enviar. No es un hallazgo de
honestidad (no hay afirmación falsa) sino de UX — se documenta aquí para
no perderlo.

**N16 — Módulos aún no auditados con el mismo detalle: los conceptuales
que ya se cubrieron en la auditoría anterior (llave-identidad,
expediente-familiar) no se repitieron aquí porque no cambiaron de estado;
ver el informe anterior (artifact de auditoría del 2026-08-25, primera
ronda) para su detalle completo.**
