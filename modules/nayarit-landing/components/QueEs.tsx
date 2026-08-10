"use client";

import { motion } from "framer-motion";
import { FileText, ShieldCheck, Layers, Monitor } from "lucide-react";

export default function QueEs() {
  return (
    <section id="que-es" className="py-24 lg:py-32 bg-dark-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 border border-brand-200 text-brand-700 text-xs font-semibold mb-4">
            <Monitor size={14} />
            La plataforma
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-dark-900 leading-tight">
            ¿Qué es{" "}
            <span className="text-gradient">Nayarit Digital</span>?
          </h2>
          <p className="mt-6 text-lg text-dark-500 leading-relaxed">
            Una plataforma integral de gobernanza digital diseñada para los
            municipios de Nayarit. Implementa los lineamientos de la{" "}
            <strong className="text-dark-800">
              Ley General de Mejora Regulatoria
            </strong>{" "}
            y normativas federales de digitalización, cubriendo aproximadamente
            el 90% de los requisitos legales para la administración pública
            municipal.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: FileText,
              title: "Trámites digitales",
              desc: "Digitalizá cualquier trámite municipal: licencias, permisos, constancias y más. Formularios inteligentes y firmas electrónicas integradas.",
            },
            {
              icon: ShieldCheck,
              title: "Transparencia proactiva",
              desc: "Cumplí con las obligaciones de transparencia de forma automática. Publicación en tiempo real al portal nacional.",
            },
            {
              icon: Layers,
              title: "Gestión documental",
              desc: "Expediente digital municipal completo. Búsqueda, versionado y conservación conforme a la normativa archivística.",
            },
            {
              icon: Monitor,
              title: "Portal ciudadano",
              desc: "Los ciudadanos acceden 24/7 desde cualquier dispositivo. Seguimiento de trámites en tiempo real y notificaciones automáticas.",
            },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-white rounded-2xl p-6 border border-dark-100 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-100/50 transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-brand-100 flex items-center justify-center mb-4 group-hover:bg-brand-200 transition-colors">
                <card.icon size={22} className="text-brand-700" />
              </div>
              <h3 className="text-lg font-bold text-dark-900 mb-2">
                {card.title}
              </h3>
              <p className="text-sm text-dark-500 leading-relaxed">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
