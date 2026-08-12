# MODELO DE GOBERNANZA

## Laboratorio Piloto — Constancia de Residencia, Tepic

---

## Principio rector

> El Ayuntamiento de Tepic conserva **todas** sus facultades de decisión, autorización, validación y operación. El proponente tecnológico propone, documenta, desarrolla y transfiere. Nunca decide por la autoridad.

---

## Estructura de gobernanza propuesta

```
┌─────────────────────────────────────────────────┐
│              H. AYUNTAMIENTO DE TEPIC             │
│  (máxima autoridad — aprueba o rechaza)          │
└────────────────────┬────────────────────────────┘
                     │
         ┌───────────┴───────────┐
         │                       │
┌────────▼────────┐     ┌───────▼────────┐
│  COMITÉ TÉCNICO │     │  COMITÉ JURÍDICO│
│  (Tecnologías,  │     │  (Jurídico,     │
│   C5, Sistemas, │     │   Transparencia,│
│   Proponente)   │     │   Mejora Reg.)  │
└────────┬────────┘     └───────┬────────┘
         │                       │
         └───────────┬───────────┘
                     │
         ┌───────────▼───────────┐
         │   ENLACE INSTITUCIONAL │
         │   (designado por el    │
         │    Ayuntamiento)       │
         └───────────┬───────────┘
                     │
         ┌───────────▼───────────┐
         │   PROPONENTE TECNOLÓGICO│
         │   (ejecuta, documenta,  │
         │    transfiere)          │
         └────────────────────────┘
```

---

## Niveles de decisión

| Nivel | Quién | Qué decide |
|---|---|---|
| **Estratégico** | Cabildo / Presidencia Municipal | Autoriza el piloto, asigna recursos, designa responsables |
| **Normativo** | Área Jurídica / Secretaría | Valida el fundamento legal, determina AIR/exención, revisa instrumentos |
| **Técnico** | Tecnologías / C5 / Sistemas | Valida la arquitectura, seguridad, interoperabilidad |
| **Operativo** | Dependencia responsable | Define requisitos reales, designa firmante, opera el trámite |
| **Ejecución** | Proponente tecnológico | Desarrolla, documenta, transfiere código y conocimiento |

---

## Flujo de decisiones

```
PROPUESTA TÉCNICA
      │
      ▼
REVISIÓN COMITÉ TÉCNICO ──────► Observaciones → ajustes
      │
      ▼
REVISIÓN COMITÉ JURÍDICO ──────► Observaciones → ajustes
      │
      ▼
DICTAMEN CONJUNTO
      │
      ▼
PRESIDENCIA / CABILDO ──────► Rechazo → fin del proceso
      │
      ▼
APROBACIÓN
      │
      ▼
INICIO ETAPA C (Piloto Institucional)
```

---

## Lo que el Ayuntamiento debe designar

| Designación | Quién | Para cuándo |
|---|---|---|
| Enlace institucional | Presidencia / Secretaría | Antes de iniciar revisión formal |
| Revisor jurídico | Área Jurídica | Durante revisión del expediente |
| Revisor técnico | Tecnologías / C5 | Durante revisión del expediente |
| Funcionario firmante | Dependencia responsable | Antes de Etapa D (producción limitada) |
| Responsable de transparencia | Unidad de Transparencia | Para publicar aviso de privacidad |

---

## Lo que el proponente entrega

| Entregable | Formato | Etapa |
|---|---|---|
| Expediente documental completo | Markdown + PDFs | Presentación inicial |
| Prototipo funcional | Demo web | Presentación inicial |
| Código fuente completo | Repositorio GitHub | Al finalizar piloto |
| Documentación técnica | Markdown en repo | Al finalizar piloto |
| Capacitación a funcionarios | Sesiones presenciales/virtuales | Antes de Etapa D |
| Soporte técnico durante piloto | Remoto/presencial | Durante Etapa D |

---

## Principios de la gobernanza

1. **Separación de poderes:** el proponente no es autoridad y no actúa como tal
2. **Transparencia total:** cada decisión, cada archivo, cada limitación está documentada
3. **Trazabilidad:** toda afirmación se respalda con evidencia verificable
4. **No dependencia:** el Ayuntamiento recibe código abierto, sin lock-in de proveedor
5. **Gradualidad:** el piloto avanza por etapas con criterios GO/NO-GO explícitos
6. **Reversibilidad:** cualquier etapa puede detenerse sin afectar sistemas municipales existentes

---

*Documento elaborado como parte del expediente de presentación institucional — Agosto 2026*
