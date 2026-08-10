"use client";

import { motion } from "framer-motion";
import {
  ClipboardCheck,
  PenTool,
  Mail,
  BarChart3,
  Users,
  Clock,
} from "lucide-react";

const features = [
  {
    icon: ClipboardCheck,
    title: "Catálogo de trámites",
    desc: "Configurá cualquier trámite municipal con campos dinámicos, requisitos y flujos de aprobación personalizables.",
  },
  {
    icon: PenTool,
    title: "Firma electrónica",
    desc: "Firma avanzada conforme a la NOM-151. Validez jurídica plena para documentos y resoluciones municipales.",
  },
  {
    icon: Mail,
    title: "Notificaciones electrónicas",
    desc: "Notificá a los ciudadanos automáticamente por correo y SMS sobre el estado de sus trámites.",
  },
  {
    icon: BarChart3,
    title: "Dashboard de gestión",
    desc: "Métricas en tiempo real: trámites ingresados, tiempos de respuesta, carga de trabajo por área.",
  },
  {
    icon: Users,
    title: "Directorio ciudadano",
    desc: "Registro único de ciudadanos con validación CURP. Evitá duplicados y datos inconsistentes.",
  },
  {
    icon: Clock,
    title: "Ventanilla 24/7",
    desc: "Los ciudadanos inician trámites a cualquier hora, cualquier día. Sin filas, sin horarios de oficina.",
  },
];

export default function Funcionalidades() {
  return (
    <section id="funcionalidades" className="py-24 lg:py-32">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 border border-brand-200 text-brand-700 text-xs font-semibold mb-4">
            <ClipboardCheck size={14} />
            Funcionalidades
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-dark-900 leading-tight">
            Todo lo que tu municipio necesita
          </h2>
          <p className="mt-4 text-lg text-dark-500">
            Módulos integrados que cubren el ciclo completo de la gestión
            municipal digital.
          </p>
        </motion.div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex gap-4 p-6 rounded-2xl hover:bg-dark-50 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-brand-200 transition-colors">
                <f.icon size={20} className="text-brand-700" />
              </div>
              <div>
                <h3 className="text-base font-bold text-dark-900 mb-1">
                  {f.title}
                </h3>
                <p className="text-sm text-dark-500 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
