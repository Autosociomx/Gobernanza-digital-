import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Star, Award } from 'lucide-react';

export function AuraCertificationSeal() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-magenta-600 to-indigo-600 rounded-full border border-white/20 shadow-lg shadow-magenta-500/20"
    >
      <ShieldCheck className="w-3 h-3 text-white" />
      <span className="text-[8px] font-black text-white uppercase tracking-widest whitespace-nowrap">Prototipo Aura · demo sin certificación</span>
    </motion.div>
  );
}
