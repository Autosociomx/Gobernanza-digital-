import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WifiOff, Phone, MapPin } from 'lucide-react';

export function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);
    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-0 left-0 right-0 z-[200] bg-slate-900 border-b border-amber-500/40 shadow-2xl"
        >
          <div className="max-w-[430px] mx-auto px-5 py-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <WifiOff className="w-4 h-4 text-amber-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-black text-white leading-tight">Sin conexión a internet</p>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                  Nayarit Digital requiere conexión para procesar pagos y trámites.
                </p>
                <div className="flex flex-wrap gap-3 mt-3">
                  <a
                    href="tel:3112129300"
                    className="flex items-center gap-1.5 text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full"
                  >
                    <Phone className="w-3 h-3" /> Tesorería: 311-212-9300
                  </a>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-full">
                    <MapPin className="w-3 h-3" /> Av. México 59 Norte, Tepic
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
