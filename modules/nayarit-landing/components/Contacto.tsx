"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState, type FormEvent } from "react";

export default function Contacto() {
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setEnviado(true);
    setTimeout(() => setEnviado(false), 4000);
  };

  return (
    <section id="contacto" className="py-24 lg:py-32 bg-dark-50">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 border border-brand-200 text-brand-700 text-xs font-semibold mb-4">
              <Mail size={14} />
              Contacto
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-dark-900 leading-tight">
              Transformá tu municipio
              <br />
              <span className="text-gradient">hoy mismo</span>
            </h2>
            <p className="mt-4 text-lg text-dark-500 leading-relaxed">
              Solicitá una demo personalizada para tu municipio. Te mostramos
              cómo Nayarit Digital se adapta a tus procesos y normativa
              específica.
            </p>

            <div className="mt-8 space-y-4">
              {[
                {
                  icon: Mail,
                  label: "Correo",
                  value: "contacto@nayaritdigital.mx",
                },
                {
                  icon: Phone,
                  label: "Teléfono",
                  value: "+52 (311) 123-4567",
                },
                {
                  icon: MapPin,
                  label: "Oficina",
                  value: "Tepic, Nayarit, México",
                },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-dark-200 flex items-center justify-center">
                    <item.icon size={18} className="text-brand-600" />
                  </div>
                  <div>
                    <div className="text-xs text-dark-400 font-medium">
                      {item.label}
                    </div>
                    <div className="text-sm font-semibold text-dark-800">
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-2xl p-8 border border-dark-100 shadow-lg">
              <h3 className="text-xl font-bold text-dark-900 mb-6">
                Solicitar demo
              </h3>

              {enviado ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
                  <div className="text-3xl mb-2">✅</div>
                  <div className="text-emerald-800 font-semibold">
                    ¡Solicitud enviada!
                  </div>
                  <p className="text-sm text-emerald-600 mt-1">
                    Te contactaremos en las próximas 24 horas.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-1.5">
                      Nombre del municipio
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Tepic, Bahía de Banderas..."
                      className="w-full px-4 py-3 text-sm border border-dark-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all placeholder:text-dark-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-1.5">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Tu nombre y apellido"
                      className="w-full px-4 py-3 text-sm border border-dark-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all placeholder:text-dark-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-1.5">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="correo@municipio.gob.mx"
                      className="w-full px-4 py-3 text-sm border border-dark-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all placeholder:text-dark-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-1.5">
                      Mensaje (opcional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="¿Qué te gustaría ver en la demo?"
                      className="w-full px-4 py-3 text-sm border border-dark-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all placeholder:text-dark-300 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-brand-600 rounded-xl hover:bg-brand-700 transition-all shadow-lg shadow-brand-200 hover:shadow-xl"
                  >
                    <Send size={16} />
                    Enviar solicitud
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
