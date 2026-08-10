import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-dark-900 text-dark-300 py-16">
      <div className="container-custom">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-600 to-brand-400 flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white">
                Nayarit<span className="text-brand-400">Digital</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              Plataforma de gobernanza digital para municipios de Nayarit.
              Implementamos la ley federal de digitalización.
            </p>
          </div>

          {/* Links */}
          {[
            {
              title: "Plataforma",
              items: ["¿Qué es?", "Funcionalidades", "Cobertura", "Beneficios"],
            },
            {
              title: "Legal",
              items: [
                "Aviso de privacidad",
                "Términos de uso",
                "Ley de mejora regulatoria",
              ],
            },
            {
              title: "Contacto",
              items: [
                "contacto@nayaritdigital.mx",
                "+52 (311) 123-4567",
                "Tepic, Nayarit, MX",
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-dark-400 hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-dark-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-dark-500">
            © {new Date().getFullYear()} Nayarit Digital. Todos los derechos
            reservados.
          </p>
          <p className="text-xs text-dark-500">
            Hecho con ❤️ desde Tepic, Nayarit
          </p>
        </div>
      </div>
    </footer>
  );
}
