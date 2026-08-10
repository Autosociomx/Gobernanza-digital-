"use client";

import { motion } from "framer-motion";
import { TrendingUp, Clock, Shield, Wallet } from "lucide-react";

const benefits = [
  {
    icon: TrendingUp,
    title: "Eficiencia operativa",
    desc: "Reducí el tiempo de procesamiento de trámites hasta en un 70%. Menos papel, menos errores, más productividad.",
  },
  {
    icon: Clock,
    title: "Disponibilidad 24/7",
    desc: "Los ciudadanos ya no dependen del horario de oficina. Inician, consultan y reciben trámites en cualquier momento.",
  },
  {
    icon: Shield,
    title: "Cumplimiento normativo",
    desc: "Cada módulo está alineado con la legislación aplicable. Auditorías simplificadas con trazabilidad total.",
  },
  {
    icon: Wallet,
    title: "Ahorro económico",
    desc: "Menos gasto en papel, almacenamiento físico y personal administrativo. ROI positivo desde el primer año.",
  },
];

export default function Beneficios() {
  return (
    <section id="beneficios" className="py-24 lg:py-32">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 border border-brand-200 text-brand-700 text-xs font-semibold mb-4">
              <TrendingUp size={14} />
              Beneficios
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-dark-900 leading-tight">
              Mejor para los municipios,
              <br />
              <span className="text-gradient">mejor para la gente</span>
            </h2>
            <p className="mt-4 text-lg text-dark-500 leading-relaxed">
              Nayarit Digital transforma la relación entre el gobierno municipal
              y sus ciudadanos. Estos son resultados medibles de municipios que
              ya adoptaron la plataforma.
            </p>

            {/* Stat cards */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { value: "-70%", label: "Tiempo de trámites" },
                { value: "4.8/5", label: "Satisfacción ciudadana" },
                { value: "-60%", label: "Costo operativo" },
                { value: "3x", label: "Trámites procesados" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-dark-50 rounded-xl p-4 border border-dark-100"
                >
                  <div className="text-2xl font-bold text-brand-600">
                    {stat.value}
                  </div>
                  <div className="text-xs text-dark-500 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — benefit cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex gap-4 p-5 bg-white rounded-2xl border border-dark-100 hover:border-brand-200 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-200 transition-colors">
                  <b.icon size={22} className="text-brand-700" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-dark-900 mb-1">
                    {b.title}
                  </h3>
                  <p className="text-sm text-dark-500 leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
