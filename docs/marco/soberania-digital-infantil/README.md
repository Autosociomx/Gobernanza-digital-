# Soberanía Digital Infantil — Sistema Nacional de Identidad y Soberanía Digital Infantil (SINISI)

**Propuesta federal escalable a los 32 estados** · Documento maestro · v1.0

> Idea núcleo: usar la infraestructura ya desplegada de las **Becas para el
> Bienestar Benito Juárez** (padrón de ~12 millones de becarios, Banco del
> Bienestar, entrega presencial de tarjetas, red de delegaciones) como base de
> una **identidad digital soberana para niñas, niños y adolescentes (NNA)**,
> que permita verificar edad y vínculo parental ante plataformas digitales
> **sin entregarles ningún dato personal**.

## Contenido del módulo

| Documento | Propósito |
|---|---|
| [`README.md`](./README.md) | Este documento: diseño completo de la propuesta |
| [`FICHA_LEGISLATIVA.md`](./FICHA_LEGISLATIVA.md) | Ficha técnica de iniciativa + articulado y transitorios propuestos |
| [`DISCURSOS_FOROS.md`](./DISCURSOS_FOROS.md) | Discursos de 3 minutos para los foros de Nuevo León, Chiapas y Guerrero |
| [`DIAGRAMA_VERIFICACION.md`](./DIAGRAMA_VERIFICACION.md) | Diagramas de flujo (activación y verificación) para presentar a autoridades |
| [`ESCENARIOS_ESTRATEGICOS.md`](./ESCENARIOS_ESTRATEGICOS.md) | Visión CEO: convergencia con Nayarit ID, Llave MX y el expediente médico CURP |

---

## 1. El problema

Las plataformas digitales operan en México sin un mecanismo confiable de
verificación de edad ni de consentimiento parental. Las alternativas hoy son
malas por diseño:

- **Autodeclaración de edad**: un menor marca "tengo 18" y entra.
- **Verificación biométrica privada**: la plataforma escanea la cara del menor
  — el remedio es peor que la enfermedad: entrega biometría infantil a
  empresas extranjeras.
- **Carga sobre las familias**: los controles parentales dependen de que cada
  familia configure cada aparato y cada app, sin respaldo del Estado.

El resultado: los NNA mexicanos negocian solos, sin identidad ni respaldo
jurídico, frente a las corporaciones tecnológicas más grandes del mundo.

## 2. Referentes internacionales

Cuatro jurisdicciones aportan piezas probadas que la propuesta combina:

| Jurisdicción | Instrumento | Pieza que aporta |
|---|---|---|
| Reino Unido | Age Appropriate Design Code (Children's Code) | Interés superior del niño como estándar de **diseño**; privacidad máxima por defecto; prohibición de *nudging*; se sanciona a las empresas, no a las familias |
| Unión Europea | GDPR art. 8 + Digital Services Act (DSA) | **Consentimiento parental verificable** (no un simple botón); prohibición de publicidad perfilada a menores; deber de mitigar riesgos sistémicos |
| Francia | Ley SREN + France Identité | **Doble anonimato**: el Estado certifica la edad, la plataforma solo recibe un token "es menor / está autorizado", nunca la identidad. Demuestra viabilidad legal y técnica del modelo credencial |
| Australia | Online Safety Act + eSafety Commissioner | **Autoridad operativa**: agencia con poder de retiro de contenido en 24 h, auditoría de algoritmos y códigos vinculantes para la industria |

**Principios destilados:**

1. Interés superior del niño como eje del diseño legal y tecnológico.
2. Identidad certificada por el Estado, **anónima para las plataformas**.
3. Consentimiento parental verificable como puerta de entrada.
4. Responsabilidad en las plataformas, con auditoría y sanción estatal.
5. Educación y empoderamiento familiar como política pública, no solo restricción.

## 3. Arquitectura: la Llave Digital de Protección a la Niñez (IDBJ)

### 3.1 Activación (una sola vez, presencial)

1. El tutor acude a la sucursal del Banco del Bienestar o a la mesa de
   atención escolar durante la entrega de tarjetas ("Lunes de becas").
2. Presenta su **INE** y el **CURP del menor**. Se valida el vínculo y se
   genera un **par de claves criptográficas** — la clave privada queda en el
   dispositivo del tutor, nunca en un servidor consultable por terceros.
3. En la app de Becas (o app propia "Llave Digital") aparece el perfil del
   menor con un **código QR dinámico**: su identidad soberana.

La activación es **voluntaria con incentivo**, nunca condición para cobrar la
beca (candado expreso en el articulado — ver ficha legislativa).

### 3.2 Verificación (cada vez que el menor abre una cuenta)

1. La plataforma, por ley, muestra el botón **"Verificar mi edad con el
   gobierno de México"** y despliega un QR de solicitud.
2. El tutor escanea el QR desde su app. El sistema responde a la plataforma
   únicamente con tres afirmaciones firmadas:
   - "Esta persona es menor de 16 años" (sí/no)
   - "Cuenta con autorización de su tutor" (sí/no)
   - Un **token anónimo de sesión**, rotatorio y no rastreable entre plataformas.
3. La plataforma **nunca ve** CURP, nombre, domicilio, escuela ni fotografía.

### 3.3 Consentimiento parental dinámico

El tutor puede, desde su app: revocar la autorización de una cuenta, recibir
alertas de la Agencia Nacional (§4), y actualizar la tutoría (custodia,
fallecimiento) en las mesas de atención estatales.

### 3.4 Universalidad: más allá del padrón de becas

El padrón de Becas es el **arranque** (cobertura inmediata de ~12 millones de
NNA con proceso presencial ya pagado), no el límite. Cualquier tutor puede
activar la Llave de un menor **no becario** con el mismo trámite (INE + CURP)
en las mismas ventanillas. Esto evita que el sistema se lea como "solo para
beneficiarios" y elimina el sesgo de cobertura.

### 3.5 Candados de soberanía y privacidad

- La base de datos de becarios se usa **solo** para emitir el token; no se
  replica, no se comparte, no sale del Estado.
- **Prohibición expresa** de que empresas privadas traten biometría de menores
  para verificación de edad: esa función es exclusiva del Estado.
- Tokens **no correlacionables**: dos plataformas no pueden cruzar tokens para
  reidentificar a un menor.
- Auditoría pública del código del sistema de emisión de tokens (estándar
  abierto, congruente con `ESTRATEGIA_ESTANDAR_ABIERTO.md` de este repositorio).

## 4. Anclaje legal: Ley General de Soberanía Digital de NNA

Se propone una **Ley General** (no 32 leyes locales) porque la operación de
plataformas digitales es materia federal (comercio electrónico,
telecomunicaciones) y porque el art. 73 constitucional, fracción XXIX-P,
faculta al Congreso a legislar en materia de derechos de NNA con concurrencia
de los tres órdenes de gobierno. La Ley General fija el piso mínimo nacional;
los estados implementan foros, formación docente y atención local.

La ley debe (articulado completo en [`FICHA_LEGISLATIVA.md`](./FICHA_LEGISLATIVA.md)):

1. Reconocer el **derecho a la soberanía digital** de NNA como derecho de
   protección especial.
2. Obligar a las plataformas a integrar la verificación estatal (IDBJ o
   cualquier sistema oficial que cumpla el estándar de doble anonimato).
3. Crear la **Agencia Nacional de Protección Digital** (modelo eSafety
   Australia): auditoría de algoritmos dirigidos a menores, sistema de
   denuncia 24/7 con equipos en cada estado, poder de sanción.
4. Prohibir el tratamiento privado de biometría infantil para verificación de
   edad.

## 5. Capilaridad en los 32 estados

Ningún estado construye sistema propio; todos se integran al nacional:

| Función estatal | Infraestructura que la absorbe |
|---|---|
| Activación presencial del IDBJ | Sucursales del Banco del Bienestar + Delegaciones de Programas para el Desarrollo + "Lunes de becas" en escuelas (estados con baja cobertura bancaria) |
| Atención ciudadana (dudas, pérdida de acceso, cambio de tutor) | Módulo "Ciudadanía Digital" en cada Secretaría de Educación estatal |
| Denuncia y persecución (grooming, ciberacoso) | Oficiales de enlace de la Agencia Nacional coordinados con fiscalías locales |
| Formación a familias | Los ~1.2 millones de docentes, capacitados vía foros regionales, explican la activación en las reuniones de entrega de tarjetas |

## 6. Ruta de implementación

Calendario ajustado a las fechas reales de los foros (2026):

| Etapa | Cuándo | Qué |
|---|---|---|
| **Foros regionales** | Nuevo León 19-ago-2026 · Chiapas 3-sep-2026 · Guerrero 17-sep-2026 | Presentar la propuesta (discursos en [`DISCURSOS_FOROS.md`](./DISCURSOS_FOROS.md)) y recoger respaldo |
| **Iniciativa legislativa** | Período sep–dic 2026 | Presentar la Ley General + artículo transitorio que mandata el SINISI sobre la infraestructura de Becas |
| **Piloto en 3 estados** | 2027 | Nuevo León (alta conectividad), Chiapas (ruralidad), Guerrero (contexto de seguridad). Lanzamiento apoyado en los propios foros |
| **Escalamiento nacional** | 2028 | Activación en las 32 entidades — la beca ya opera en todas |

## 7. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Percepción de vigilancia estatal | Doble anonimato verificable + código abierto + prohibición de uso del padrón para otro fin, con sanción penal |
| Condicionar la beca a la Llave | Prohibición expresa en el articulado; la activación es voluntaria |
| Exclusión de NNA sin beca o sin tutor con smartphone | Vía de activación universal (§3.4) + código impreso recargable en ventanilla para tutores sin smartphone |
| Resistencia de plataformas ("carga técnica") | El Estado entrega API y SDK gratuitos; el costo de cumplimiento es menor que operar verificación propia bajo el estándar UE que ya cumplen |
| Suplantación del tutor | Validación presencial INE + vínculo CURP; actualización de tutoría solo presencial |
| Cambio de gobierno / continuidad | Anclaje en Ley General (no en programa social); la Agencia Nacional es órgano con autonomía técnica |

## 8. Por qué es un "océano azul"

- **No crea un padrón nuevo** ni una institución costosa: reutiliza
  infraestructura ya presupuestada y ya confiable para las familias.
- **Nadie más puede ofrecerlo**: solo el Estado mexicano tiene la validación
  presencial, el vínculo tutor-menor documentado y la cobertura territorial.
- **Empodera a las madres de familia** — ya son el rostro operativo de las
  Becas — convirtiendo un programa de transferencia monetaria en una
  herramienta de soberanía digital para la niñez.
- Alinea a México con el estándar internacional (UK, UE, Francia, Australia)
  **sin copiar**: ningún país ha usado su programa social de mayor cobertura
  como rampa de identidad digital infantil.
