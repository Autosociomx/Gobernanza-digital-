ARQUITECTURA NACIONAL DE GOBERNANZA DIGITAL

SÍNTESIS ESTRATÉGICA (documento interno, transversal a los Tomos II, V y VII)

¿Cómo hace Nayarit para ser líder nacional en digitalización y gobernanza digital?

> "Nayarit no va a ser líder por tener la mejor aplicación. Va a ser líder por ser el primer estado donde el cumplimiento de la ley nacional se puede verificar con evidencia pública: código abierto, plazos cumplidos y trámites registrados. Liderar es cumplir primero y aportar primero."

---

1. El respaldo que ya está verificado — la pirámide completa

Con los textos primarios cotejados íntegros en los Capítulos X, XI y XII, el proyecto ya no descansa sobre interpretaciones: descansa sobre cuatro pisos normativos verificados, artículo por artículo.

Piso constitucional (Art. 115, Cap. X). El municipio tiene personalidad jurídica propia, facultad reglamentaria (fracción II: el cabildo puede aprobar disposiciones administrativas de observancia general — ahí caben los estándares digitales), funciones y servicios propios (fracción III), hacienda libre (fracción IV: la recaudación digital es administración de su propia hacienda) y capacidad de asociarse con otros municipios (fracción III: la vía del escalamiento).

Piso nacional — la ley de la Presidenta (LNETB, DOF 16-jul-2025, 114 artículos cotejados, Cap. XI). El municipio es Sujeto Obligado expreso (Art. 3, fracción XXXIV). Debía crear su Autoridad Municipal de Simplificación y Digitalización (Transitorio Décimo Cuarto — venció en enero de 2026), designar su Enlace con nivel de Director General (Décimo Quinto — venció en febrero de 2026) e informar sus soluciones tecnológicas (Décimo Sexto — venció en febrero de 2026). Todo trámite debe registrarse en el Portal Ciudadano Único y ningún requisito no registrado es exigible (Arts. 51-54). Toda plataforma digital de trámites debe integrar el inicio de sesión único de Llave MX (Art. 74), asociada a la CURP. Y el código fuente de toda solución tecnológica debe compartirse al Repositorio Nacional de Tecnología Pública (Art. 91).

Piso estatal (Ley de Gobierno Digital de Nayarit 2022, 55 artículos cotejados, Cap. XII). El Ayuntamiento es sujeto expreso (Art. 2-IV), tiene la función expresa de establecer su política digital municipal y celebrar convenios con los sectores social y privado (Art. 24), y — el hallazgo mayor — el ciudadano nayarita tiene desde 2022 el derecho vigente a la captura única (Art. 48, fracción IV): que lo que ya entregó valga para trámites subsecuentes. Además, la Ventanilla Única estatal cubre solo trámites estatales (Art. 41): el instrumento municipal es un vacío legal que la plataforma ocupa sin invadir competencia alguna.

Piso de implementación (la plataforma real). Identidad ligada a CURP ya operativa (módulo de salud, con seguridad verificada empíricamente contra el emulador de reglas), asistente con acciones reales, licencia AGPL-3.0 definida, calidad auditada (Lighthouse 99/100/100/100 en producción).

2. Qué cambió al releer todo desde cero, alineado a la ley

La relectura rigurosa no debilitó el diseño — lo confirmó en cuatro puntos y lo corrigió en dos.

Confirmaciones. (1) La decisión de usar la CURP como identidad del expediente de salud es exactamente la dirección de la ley: Llave MX se asocia a la CURP por mandato. (2) La licencia AGPL-3.0 y la estrategia de código abierto son la única postura de proveedor compatible con el Art. 91 — un proveedor de licencia cerrada pone al municipio en incumplimiento material. (3) La exigencia de "descripción en lenguaje ciudadano" de cada trámite (Art. 54, fracción V) es literalmente lo que Aura ya hace como guía conversacional. (4) El principio de captura única del Capítulo VI resultó ser un derecho estatal vigente, no una propuesta.

Correcciones al rumbo. (1) La brecha de cumplimiento número uno de la propia plataforma es el Art. 74: hoy la app inicia sesión con Google o sesión anónima; la ley exige integrar el inicio de sesión único de Llave MX en toda plataforma digital de trámites. La arquitectura de autenticación debe planear un adaptador de Llave MX (el patrón de capas intercambiables ya diseñado para esto encaja sin refactor: la identidad es un módulo, no un supuesto). No es un bloqueo inmediato — depende de los lineamientos de la ATDT y de la vía institucional para terceros — pero debe estar en el roadmap como prioridad, porque es lo que separa "plataforma alineada" de "plataforma cumplida". (2) El registro en el Portal Ciudadano Único no lo hace el software: lo hace el Ayuntamiento. Lo que la plataforma sí puede hacer — y nadie más está haciendo — es preparar el inventario municipal de trámites ya en el formato exacto del Art. 54, listo para registrarse el día que exista la Autoridad Municipal.

3. La ruta: cinco movimientos para que Nayarit tome el liderazgo nacional (2026–2027)

Movimiento 1 — Tepic se regulariza primero (agosto–octubre 2026). Los tres plazos transitorios están vencidos para los más de 2,400 municipios del país — el incumplimiento es generalizado. El primer municipio que se regularice con instrumento propio no está "poniéndose al corriente": está tomando la delantera nacional. Acciones: acuerdo de cabildo que crea la Autoridad Municipal de Simplificación y Digitalización (fundamento: Trans. Décimo Cuarto LNETB + Art. 115-II + Art. 24 estatal), designación del Enlace con nivel de Director General (Décimo Quinto), e informe de soluciones tecnológicas a la ATDT (Décimo Sexto). KPI verificable: acuerdo publicado y designaciones notificadas.

Movimiento 2 — El catálogo de trámites en formato de ley (paralelo al Movimiento 1). Levantar el inventario de trámites municipales de Tepic con los nueve campos mínimos del Art. 54 (nombre y clave, modalidad, disponibilidad en línea, fundamento jurídico, descripción en lenguaje ciudadano, requisitos, etc.). KPI: número de trámites listos para registro en el Portal Ciudadano Único.

Movimiento 3 — Primera plataforma municipal con Llave MX (cuando la vía exista). Implementar el adaptador de autenticación de Llave MX conforme a los lineamientos de la ATDT. KPI: primer inicio de sesión Llave MX en una plataforma municipal de Nayarit. Este movimiento convierte el Art. 74 — que para todos los demás municipios es una amenaza de irregularidad — en la credencial de Tepic.

Movimiento 4 — Nayarit deja de consumir tecnología pública y empieza a aportarla (el movimiento que nadie más puede copiar rápido). Entregar el código fuente de la plataforma al Repositorio Nacional de Tecnología Pública conforme al Art. 91, bajo AGPL-3.0. Ningún estado está aportando una plataforma municipal completa al Repositorio: todos esperan descargar. El día que Tepic aporta, la conversación con la ATDT se invierte — no se le vende, se le demuestra; y Nayarit aparece en el mapa nacional no como cliente sino como origen de tecnología pública reutilizable por los 2,400 municipios. KPI: constancia de integración al Repositorio.

Movimiento 5 — Escala por convenio, no por licitación (antes del cambio de gubernatura 2027). Con el código en el Repositorio y la licencia abierta, los otros 19 municipios de Nayarit no necesitan licitar una licencia de software — el código es público. Lo que firman es un convenio de coordinación (Art. 115-III constitucional + Art. 24-II estatal) para implementación, capacitación y operación. KPI: municipios incorporados por convenio, empezando por los que la evidencia de Tepic convenza. La ventana es 2026–2027: después del cambio de gubernatura, la evidencia debe hablar por sí sola — por eso todo movimiento anterior produce constancia pública, no promesas.

4. Por qué esta ruta hace líder a Nayarit y no solo a Tepic

El liderazgo nacional en gobernanza digital no se declara — se computa. Con esta ruta, Nayarit sería: el estado con el primer municipio regularizado tras los plazos vencidos de la LNETB; el estado del primer catálogo municipal registrado en formato del Art. 54; el estado de la primera plataforma municipal con Llave MX; el primer estado aportador — no consumidor — del Repositorio Nacional; y el primer estado con replicación intermunicipal por convenio sobre código público. Cinco "primeros" verificables con documento en mano, todos anclados a artículos cotejados de la ley de la Presidenta. Contra eso, cualquier otro estado que quiera disputar el liderazgo tiene que recorrer el mismo camino — empezando más tarde.

Y hay un sexto elemento que ningún otro estado tiene: el derecho a la captura única del Art. 48-IV estatal. Nayarit es — hasta donde esta investigación ha verificado — un estado donde ese derecho ya existe en ley desde 2022. El estado que primero lo haga cumplible en la práctica (con el Expediente Ciudadano Único) no estará innovando contra su marco jurídico: estará estrenando un derecho que sus propios ciudadanos no saben que tienen.

5. Qué falta y de quién depende

De la investigación (Tomo II): la Ley Municipal para el Estado de Nayarit (texto primario pendiente de conseguir — bloqueado desde el entorno; ver README) para redactar el proyecto de acuerdo de cabildo con las mayorías y formalidades exactas. De la plataforma: el adaptador de Llave MX (cuando haya lineamientos y vía institucional) y el inventario de trámites en formato Art. 54. Del Ayuntamiento: las tres designaciones del Movimiento 1 — que son decisiones políticas, no técnicas, y son el único punto de la ruta que el proyecto no controla. Todo lo demás está, a la fecha de este documento, bajo control propio y con fundamento verificado.

---

Documento interno — clasificación conforme a `docs/marco/GOBERNANZA_REPOSITORIO.md` §5. Elaborado el 18 de julio de 2026 sobre la base de los Capítulos X, XI y XII (textos primarios cotejados) y del estado real de la plataforma en `main`.
