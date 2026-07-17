ARQUITECTURA NACIONAL DE GOBERNANZA DIGITAL

TOMO I

CAPÍTULO VIII

Soberanía Digital Municipal: Definición, Alcance y Límites

> "Un municipio no es soberano por aislarse del estándar nacional. Es soberano por poder cumplirlo sin pedirle permiso a nadie para operar mañana."

---

8.1 Por qué este capítulo no podía evitarse

Los siete capítulos anteriores describieron una arquitectura: capas de infraestructura, identidad, servicios, inteligencia operativa e inteligencia artificial (Capítulo II); la posición de esa arquitectura dentro del Estado digital mexicano (Capítulo III); su ingeniería institucional (Capítulo IV); su implementación por dependencia (Capítulo V); su expediente ciudadano único (Capítulo VI); y su capacidad de anticipación mediante el Gemelo Digital Municipal (Capítulo VII).

Ese recorrido construyó, sin decirlo todavía en esos términos, una tesis distinta a la que parecía estarse escribiendo. No se trataba de digitalizar trámites. Se trataba de responder una pregunta que ningún capítulo anterior formuló de manera explícita:

¿Cómo puede un municipio mexicano recuperar soberanía tecnológica sin aislarse de la estrategia nacional?

Este capítulo existe porque esa pregunta, dejada sin respuesta formal, dejaría dos grietas abiertas que cualquier evaluador riguroso —académico, institucional o periodístico— identificaría de inmediato. La primera: la palabra "soberanía" suena, en el lenguaje común de la administración pública, a fragmentación —y la fragmentación fue precisamente el diagnóstico que los Capítulos I a IV usaron para describir el fracaso del modelo burocrático tradicional. La segunda: no es evidente, a primera vista, cómo puede un municipio ser "soberano" sobre una infraestructura que fue diseñada, construida y mantenida por un proveedor privado. Ambas tensiones se resuelven aquí, de manera explícita, no retórica.

8.2 Definición formal: Soberanía Digital Municipal

Se define, para efectos de esta investigación:

Soberanía Digital Municipal: la condición institucional en la que un municipio es dueño de su infraestructura tecnológica, de los datos que produce su operación, y de su capacidad de decidir sobre ambos —sin depender de un proveedor único para continuar operando, y sin necesitar autorización de ningún otro nivel de gobierno para tomar esas decisiones— mientras permanece plenamente interoperable con el estándar técnico y normativo nacional.

Tres elementos de esta definición requieren precisión inmediata, porque son los que evitan que el concepto colapse en la ambigüedad:

Primero, soberanía no es propiedad exclusiva del código. Es propiedad del dato y control operativo de la infraestructura. Un municipio puede ser soberano usando una arquitectura que no escribió línea por línea, de la misma manera que un país es soberano sobre su territorio sin haber fabricado cada uno de los vehículos que circulan en sus carreteras. Lo que no puede ceder, sin dejar de ser soberano, es el control sobre el dato que esa infraestructura produce y la capacidad de operar si el proveedor desaparece.

Segundo, soberanía no es aislamiento. Un municipio que construyera su propio estándar de identidad digital, incompatible con Llave MX, o su propio formato de expediente, incompatible con el Repositorio Nacional de Tecnología Pública, no sería más soberano: sería más frágil. Quedaría fuera de la interoperabilidad nacional que la Ley Nacional para Eliminar Trámites Burocráticos (LNETB, DOF 16 de julio de 2025) construye precisamente para evitar que cada uno de los más de 2,400 municipios del país reinvente su propia infraestructura de identidad, pagos y trámites. La soberanía que aquí se define no compite con ese estándar: opera dentro de él.

Tercero, soberanía es una propiedad estructural, no una declaración de intenciones. No basta con que un municipio afirme ser soberano; tiene que poder demostrarlo mediante tres pruebas concretas, que se desarrollan en la sección 8.4.

Esta definición conecta directamente con el fundamento constitucional del municipio libre (Artículo 115 de la Constitución Política de los Estados Unidos Mexicanos), cuyo desarrollo normativo detallado corresponde al Tomo II de esta investigación. Basta aquí establecer el principio: la autonomía municipal no es un concepto nuevo que esta tesis inventa —es un principio constitucional centenario al que esta investigación le da, por primera vez, una traducción técnica y operativa en el dominio digital.

8.3 La distinción que resuelve la primera tensión: soberanía no es aislamiento

El diagnóstico de fragmentación de los Capítulos I a IV —trámites duplicados, información capturada varias veces, dependencias operando como silos— describe la fragmentación horizontal: la que ocurre entre las áreas de un mismo gobierno, o entre gobiernos que no se hablan entre sí. La Soberanía Digital Municipal, tal como se define en este capítulo, ataca un problema distinto: la fragmentación vertical de dependencia —la que ocurre cuando un municipio no puede operar, decidir ni evolucionar su propia infraestructura sin la autorización o la presencia continua de un tercero.

Estos dos problemas no solo son compatibles; se resuelven con la misma arquitectura. Un municipio interoperable con el estándar nacional (que resuelve la fragmentación horizontal) puede, al mismo tiempo, ser dueño de su dato y de su capacidad operativa (que resuelve la fragmentación vertical). La arquitectura de identidad y expediente descrita en el Capítulo VI —el Expediente Ciudadano Único— es, de hecho, el mecanismo técnico que hace posible ambas cosas a la vez: un solo expediente, capturado una sola vez, interoperable con Llave MX y el Repositorio Nacional, pero cuya titularidad del dato corresponde al municipio y al ciudadano, no al proveedor que construyó el sistema.

8.4 Las tres pruebas de la soberanía operativa

Para que la Soberanía Digital Municipal deje de ser una declaración y se convierta en una condición verificable, esta investigación propone tres pruebas. Un municipio que las supere las tres es soberano en el sentido aquí definido; un municipio que falle en cualquiera de ellas no lo es, sin importar qué tan avanzada sea su tecnología.

Prueba de continuidad. Si el proveedor de la plataforma desapareciera mañana, ¿el municipio conserva su dato, en un formato que puede leer y migrar sin depender de ese proveedor? Esta prueba se resuelve técnicamente, no contractualmente: los datos deben residir en una base de datos cuyo esquema y cuyas reglas de acceso son legibles y exportables (véase el modelo de seguridad declarativa descrito en capítulos posteriores de esta arquitectura), no encapsulados en un formato propietario ilegible fuera del sistema que los generó.

Prueba de interoperabilidad. ¿Puede el sistema conversar con el estándar nacional (Llave MX, Repositorio Nacional de Tecnología Pública, Portal Ciudadano Único) sin que eso dependa de una negociación caso por caso? Esta prueba es la que evita que la soberanía municipal se confunda con la fragmentación que los primeros capítulos de esta tesis diagnosticaron como el problema a resolver.

Prueba de decisión. ¿Puede la autoridad municipal —cabildo, presidencia municipal, autoridad de simplificación— decidir sobre la evolución de su propia infraestructura (qué módulo activar, qué dato compartir, qué política aplicar) sin requerir autorización de un nivel de gobierno superior? Esta prueba distingue la soberanía municipal aquí definida de un modelo centralizado disfrazado de modernización.

8.5 La segunda tensión: propiedad del dato frente a propiedad de la plataforma

La objeción más seria que puede hacérsele a este marco es la siguiente: ¿cómo puede un municipio ser soberano sobre una infraestructura que no construyó y que pertenece, en términos de propiedad intelectual, a una empresa privada?

Esta investigación no evade esa pregunta. La resuelve mediante una distinción que debe quedar establecida en este capítulo con el mismo rigor que el resto de la arquitectura, no relegada a una nota al pie:

Propiedad del dato. El municipio es titular del Expediente Ciudadano Único y de la totalidad de los datos operativos que su gobierno produce —trámites, pagos, reportes, expedientes de salud, información territorial. Esta titularidad no es simbólica: se traduce en control técnico real sobre el acceso, la exportación y la eliminación de esos datos, verificable mediante el modelo de reglas declarativas de seguridad que esta arquitectura implementa (cada regla de acceso puede probarse, no solo describirse).

Propiedad de la plataforma. El proveedor que diseña, construye y hace evolucionar la arquitectura —los patrones de ingeniería, el conocimiento acumulado de implementación, el motor cognitivo y su evolución continua— es titular de esa arquitectura y de su know-how, protegido mediante los instrumentos de propiedad intelectual que correspondan (registro de obra, convenio de colaboración institucional). Esta titularidad tampoco es incompatible con la soberanía municipal: es exactamente la misma relación que existe entre un gobierno y cualquier proveedor de infraestructura crítica —una compañía de telecomunicaciones no es dueña del gobierno que usa su red, ni el gobierno deja de ser soberano por no fabricar sus propias antenas.

Lo que hace sostenible esta distinción —y lo que la diferencia de un esquema de dependencia disfrazado de colaboración— es que se resuelve mediante instrumentos jurídicos formales, no mediante la buena voluntad de las partes: un convenio marco que defina con precisión qué corresponde a cada titularidad, y un compromiso de portabilidad de datos que sea técnicamente verificable, no solo prometido en un contrato. El desarrollo completo de esos instrumentos —su naturaleza jurídica, su compatibilidad con la Ley General de Responsabilidades Administrativas y con el régimen de contrataciones públicas— corresponde al Tomo V de esta investigación (Sostenibilidad, Financiamiento y Continuidad Institucional). Aquí basta establecer el principio institucional: dato y plataforma tienen titulares distintos, y esa distinción —no su ausencia— es lo que permite que ambas partes puedan afirmar, sin contradecirse, que el municipio es soberano y que el proveedor tiene un modelo de negocio legítimo.

8.6 Lo que esta soberanía no resuelve todavía

Con el mismo estándar de honestidad que ha guiado esta investigación desde el Capítulo I —donde una hipótesis sin fuente verificable se marcó explícitamente como hipótesis de trabajo, no como hecho—, este capítulo debe señalar sus propios límites.

La Soberanía Digital Municipal, tal como aquí se define, resuelve la dependencia de infraestructura y la titularidad del dato. No resuelve, por sí misma, la capacidad técnica interna del municipio para operar y auditar esa infraestructura sin apoyo externo continuo —eso pertenece al dominio de la capacitación institucional y la certificación de personal, tratado en capítulos posteriores de esta arquitectura. Tampoco resuelve, todavía, la pregunta de a quién le rinde cuentas un sistema que empieza a anticipar decisiones en lugar de solo registrarlas. Esa pregunta —accountability y equidad del modelo predictivo introducido en el Capítulo VII— es, precisamente, el objeto del capítulo siguiente.

Conclusión

Este capítulo estableció que la Soberanía Digital Municipal no es un concepto retórico ni una bandera de fragmentación, sino una condición institucional verificable mediante tres pruebas: continuidad del dato, interoperabilidad con el estándar nacional, y capacidad de decisión autónoma. Estableció también que esa soberanía es compatible —y no contradictoria— con la existencia de un proveedor de infraestructura con un modelo de negocio legítimo, siempre que la titularidad del dato y la titularidad de la plataforma queden distinguidas mediante instrumentos jurídicos formales, no mediante ambigüedad.

Con esto, el Tomo I completa su corazón teórico. Los capítulos anteriores describieron una arquitectura; este capítulo le dio, por primera vez, un fundamento conceptual que explica por qué esa arquitectura no compromete la autonomía del municipio que la adopta, sino que es, precisamente, la condición que la hace posible.

Nota del investigador

Con este capítulo, la tesis deja de tener una grieta que un jurado, la ATDT o un periodista habrían encontrado de inmediato: la palabra "soberanía" ya no flota sin definición operativa. Pero abrir el concepto de Gobierno Predictivo en el Capítulo VII, y ahora cerrar el de soberanía en este, deja pendiente una tercera pregunta que ningún capítulo ha tocado todavía: si el Motor Cognitivo Municipal empieza a sugerir qué colonia recibe agua primero o qué calle se repara antes, ¿bajo qué criterio de equidad se decide eso, y quién es responsable cuando el modelo se equivoca? Esa es la pregunta del Capítulo IX — Gobierno Predictivo y Equidad Algorítmica, y cerrará el Tomo I.
