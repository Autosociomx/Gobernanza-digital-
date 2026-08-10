"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const modules = [
  {
    title: "Mejora Regulatoria",
    items: [
      "Catálogo de regulaciones",
      "Análisis de impacto regulatorio",
      "Programa de mejora",
      "Indicadores de cumplimiento",
    ],
  },
  {
    title: "Transparencia",
    items: [
      "Obligaciones comunes",
      "Obligaciones específicas",
      "Portal automático (PNT)",
      "Solicitudes de acceso",
    ],
  },
  {
    title: "Archivos",
    items: [
      "Cuadro de clasificación",
      "Catálogo de disposición",
      "Guía simple de archivos",
      "Conservación digital",
    ],
  },
  {
    title: "Trámites y Servicios",
    items: [
      "Registro municipal de trámites",
      "Formularios inteligentes",
      "Resoluciones automatizadas",
      "Seguimiento ciudadano",
    ],
  },
  {
    title: "Gobierno Abierto",
    items: [
      "Participación ciudadana",
      "Consultas públicas",
      "Datos abiertos",
      "Rendición de cuentas",
    ],
  },
  {
    title: "Normatividad",
    items: [
      "Marco jurídico municipal",
      "Bandos y reglamentos",
      "Circulares y acuerdos",
      "Publicación automática (POE)",
    ],
  },
];

export default function Cobertura() {
  return (
    <section id="cobertura" className="py-24 lg:py-32 bg-dark-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 border border-brand-200 text-brand-700 text-xs font-semibold mb-4">
            <CheckCircle2 size={14} />
            Cobertura legal
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-dark-900 leading-tight">
            ~90% de cobertura
            <br />
            <span className="text-gradient">de la ley federal</span>
          </h2>
          <p className="mt-4 text-lg text-dark-500">
            Cada módulo está mapeado contra la legislación aplicable. No es
            software genérico — es compliance listo para auditoría.
          </p>
        </motion.div>

        {/* Module grid */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod, i) => (
            <motion.div
              key={mod.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-white rounded-2xl p-6 border border-dark-100 hover:border-brand-200 hover:shadow-md transition-all"
            >
              <h3 className="text-lg font-bold text-dark-900 mb-4">
                {mod.title}
              </h3>
              <ul className="space-y-2.5">
                {mod.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-dark-600"
                  >
                    <CheckCircle2
                      size={16}
                      className="text-brand-500 flex-shrink-0 mt-0.5"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Big stat */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 bg-gradient-to-r from-brand-600 to-brand-400 rounded-2xl p-8 sm:p-10 text-center text-white"
        >
          <div className="text-6xl sm:text-7xl font-black tracking-tight">
            ~90%
          </div>
          <p className="mt-3 text-lg text-white/90 max-w-lg mx-auto">
            de los requisitos de la Ley General de Mejora Regulatoria y
            normativas federales de digitalización cubiertos desde el día uno.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
