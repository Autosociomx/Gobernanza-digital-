# REPORTE DE DESCARGA DE FUENTES PRIMARIAS

**Fecha:** 12 agosto 2026
**Objetivo:** Descargar PDFs oficiales de las 7 leyes requeridas para el expediente institucional

---

## Resultado por fuente

| # | Ley | URL | Descargado | Archivo | Tamaño |
|---|---|---|---|---|---|
| 1 | LNETB (Ley Nacional para Eliminar Trámites Burocráticos) | `https://dof.gob.mx/nota_detalle.php?codigo=5763166&fecha=16/07/2025` | ✅ | `DOF/LNETB_Ley_Nacional_Eliminar_Tramites_Burocraticos_DOF_2025-07-16.pdf` | 188K / 17pp |
| 2 | Lineamientos del Modelo Nacional | `https://dof.gob.mx/nota_detalle.php?codigo=5770659&fecha=22/10/2025` | ✅ | `LINEAMIENTOS/Lineamientos_Modelo_Nacional_Eliminar_Tramites_Burocraticos_DOF_2025-10-22.pdf` | 180K / 17pp |
| 3 | Ley de Gobierno Digital de Nayarit | `congresonayarit.gob.mx` | ✅ | `NORMATIVA_ESTATAL/Ley_Gobierno_Digital_Nayarit.pdf` | 344K / 40pp |
| 4 | Ley Orgánica Municipal de Nayarit | `ordenjuridico.gob.mx` | ✅ | `NORMATIVA_ESTATAL/Ley_Organica_Municipal_Nayarit.pdf` | 1.2MB / 160pp |
| 5 | Ley de Hacienda Municipal de Nayarit | `ordenjuridico.gob.mx` | ✅ | `NORMATIVA_ESTATAL/Ley_Hacienda_Municipal_Nayarit.pdf` | 308K / 38pp |
| 6 | LGPDPPSO (Protección de Datos Personales) | `diputados.gob.mx/LeyesBiblio` | ✅ | `DOF/LGPDPPSO_Ley_General_Proteccion_Datos_Personales_DOF_2017-01-26.pdf` | 252K / 24pp |
| 7 | Ley de Firma Electrónica Avanzada | `diputados.gob.mx/LeyesBiblio` | ❌ | No descargada — timeout del sub-agente | — |

---

## Detalle de cada descarga

### 1. LNETB ✅
- **Nombre oficial:** Ley Nacional para Eliminar Trámites Burocráticos
- **Publicación:** DOF 16-jul-2025, Edición Vespertina
- **Archivo:** `DOF/LNETB_Ley_Nacional_Eliminar_Tramites_Burocraticos_DOF_2025-07-16.pdf`
- **Nota:** El nombre legal es "Ley Nacional para Eliminar Trámites Burocráticos", no "Ley Nacional de Simplificación y Digitalización" como se venía usando

### 2. Lineamientos del Modelo Nacional ✅
- **Nombre oficial:** Lineamientos para la Implementación del Modelo Nacional para Eliminar Trámites Burocráticos
- **Publicación:** DOF 22-oct-2025, Edición Vespertina
- **Archivo:** `LINEAMIENTOS/Lineamientos_Modelo_Nacional_Eliminar_Tramites_Burocraticos_DOF_2025-10-22.pdf`

### 3. Ley de Gobierno Digital de Nayarit ✅
- **Origen:** congresonayarit.gob.mx
- **Archivo:** `NORMATIVA_ESTATAL/Ley_Gobierno_Digital_Nayarit.pdf`
- **Nota:** Verificar vigencia — puede ser texto original sin reformas

### 4. Ley Orgánica Municipal de Nayarit ✅
- **Origen:** ordenjuridico.gob.mx
- **Archivo:** `NORMATIVA_ESTATAL/Ley_Organica_Municipal_Nayarit.pdf`
- **Nota:** 160 páginas — documento extenso, contiene el marco completo de atribuciones municipales

### 5. Ley de Hacienda Municipal de Nayarit ✅
- **Origen:** ordenjuridico.gob.mx
- **Archivo:** `NORMATIVA_ESTATAL/Ley_Hacienda_Municipal_Nayarit.pdf`
- **Nota:** 38 páginas — contiene arts. 21, 22, 34 sobre catastro y contribuciones municipales

### 6. LGPDPPSO ✅
- **Origen:** diputados.gob.mx/LeyesBiblio
- **Archivo:** `DOF/LGPDPPSO_Ley_General_Proteccion_Datos_Personales_DOF_2017-01-26.pdf`
- **Nota:** Última reforma DOF 20-may-2021 (por verificar)

### 7. Ley de Firma Electrónica Avanzada ❌
- **URL esperada:** `diputados.gob.mx/LeyesBiblio/pdf/LFEA.pdf`
- **Estado:** No descargada — el sub-agente agotó el tiempo (20 min) procesando las primeras 6 leyes
- **Plan B:** Descargar manualmente o en una segunda ejecución

---

## Estructura resultante

```
docs/presentacion-tepic/05_MARCO_JURIDICO/fuentes-primarias/
├── DOF/
│   ├── LNETB_Ley_Nacional_Eliminar_Tramites_Burocraticos_DOF_2025-07-16.pdf  (188K, 17pp)
│   └── LGPDPPSO_Ley_General_Proteccion_Datos_Personales_DOF_2017-01-26.pdf  (252K, 24pp)
├── LINEAMIENTOS/
│   └── Lineamientos_Modelo_Nacional_Eliminar_Tramites_Burocraticos_DOF_2025-10-22.pdf  (180K, 17pp)
└── NORMATIVA_ESTATAL/
    ├── Ley_Gobierno_Digital_Nayarit.pdf  (344K, 40pp)
    ├── Ley_Organica_Municipal_Nayarit.pdf  (1.2MB, 160pp)
    └── Ley_Hacienda_Municipal_Nayarit.pdf  (308K, 38pp)
```

**Total: 6 de 7 leyes descargadas (86%) — 2.7MB en 6 PDFs verificados como PDF reales.**

---

## Pendientes

| # | Pendiente | Acción |
|---|---|---|
| 1 | Ley de Firma Electrónica Avanzada (LFEA) | Descargar de `diputados.gob.mx/LeyesBiblio` |
| 2 | Bando de Policía de Tepic | Solicitar al Ayuntamiento |
| 3 | Reglamento Interior del Ayuntamiento de Tepic | Solicitar al Ayuntamiento |
| 4 | Ley de Ingresos Municipal de Tepic 2026 | Buscar en transparenciafiscal.tepic.gob.mx |

---

*Reporte generado automáticamente — 12 agosto 2026*
