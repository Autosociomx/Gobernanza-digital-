"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield, Building2, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50/80 via-white to-emerald-50/50" />

      {/* Decorative circles */}
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-0 w-[400px] h-[400px] bg-emerald-400/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-100 border border-brand-200 text-brand-700 text-xs font-semibold mb-6">
              <Zap size={14} />
              Plataforma de Gobernanza Digital
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-dark-900 leading-[1.05] tracking-tight">
              Gobernanza Digital
              <br />
              <span className="text-gradient">para Nayarit</span>
            </h1>

            <p className="mt-6 text-lg text-dark-500 max-w-xl leading-relaxed">
              Implementamos la ley federal de digitalización en los municipios
              nayaritas. Trámites en línea, transparencia y gestión documental —
              todo en una sola plataforma con cobertura legal del ~90%.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="#contacto"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-brand-600 rounded-xl hover:bg-brand-700 transition-all shadow-lg shadow-brand-200 hover:shadow-xl hover:shadow-brand-300/50 group"
              >
                Solicitar demo
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </a>
              <a
                href="#que-es"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-dark-700 bg-white border border-dark-200 rounded-xl hover:border-dark-300 hover:bg-dark-50 transition-all"
              >
                Conocer más
              </a>
            </div>

            {/* Quick stats */}
            <div className="mt-10 grid grid-cols-3 gap-6 pt-8 border-t border-dark-100">
              {[
                { value: "~90%", label: "Cobertura legal" },
                { value: "20+", label: "Módulos" },
                { value: "24/7", label: "Disponibilidad" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-dark-900">
                    {stat.value}
                  </div>
                  <div className="text-xs text-dark-400 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-[4/3]">
              {/* Dashboard mockup */}
              <div className="absolute inset-0 bg-white rounded-2xl shadow-2xl shadow-dark-900/10 border border-dark-100 overflow-hidden">
                {/* Top bar */}
                <div className="h-12 bg-dark-50 border-b border-dark-100 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="ml-3 text-xs text-dark-400 font-medium">
                    Panel Municipal — Nayarit Digital
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { color: "bg-brand-100 text-brand-700", label: "Trámites", n: "1,247" },
                      { color: "bg-blue-100 text-blue-700", label: "Ciudadanos", n: "8.5K" },
                      { color: "bg-emerald-100 text-emerald-700", label: "Completados", n: "94%" },
                    ].map((card) => (
                      <div
                        key={card.label}
                        className={`${card.color} rounded-xl p-3`}
                      >
                        <div className="text-xl font-bold">{card.n}</div>
                        <div className="text-xs opacity-80">{card.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Chart placeholder */}
                  <div className="bg-dark-50 rounded-xl p-4 space-y-3">
                    <div className="text-xs font-semibold text-dark-500">
                      Actividad mensual
                    </div>
                    <div className="flex items-end gap-2 h-24">
                      {[60, 80, 45, 90, 70, 95, 85, 100, 75, 88, 92, 98].map(
                        (h, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-brand-500 rounded-t-md transition-all"
                            style={{ height: `${h}%` }}
                          />
                        )
                      )}
                    </div>
                  </div>

                  {/* Module list */}
                  <div className="space-y-2">
                    {[
                      { icon: Shield, label: "Transparencia", status: "Activo" },
                      { icon: Building2, label: "Trámites", status: "Activo" },
                      { icon: Zap, label: "Firma electrónica", status: "Próximamente" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between p-3 bg-dark-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <item.icon
                            size={18}
                            className="text-brand-600"
                          />
                          <span className="text-sm font-medium text-dark-700">
                            {item.label}
                          </span>
                        </div>
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                            item.status === "Activo"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-dark-900 text-white rounded-xl px-4 py-3 shadow-xl">
                <div className="text-xs text-dark-300">Nayarit</div>
                <div className="text-sm font-bold">Digital</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
