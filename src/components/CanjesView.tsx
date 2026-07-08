import React, { useState, useEffect } from 'react';
import { db, handleFirestoreError } from '../firebase';
import { doc, onSnapshot, collection, addDoc, updateDoc, increment } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { motion } from 'motion/react';
import { Gift, ChevronLeft, Ticket, CheckCircle2, ShieldCheck, Coins } from 'lucide-react';
import { cn } from '../lib/utils';

export function CanjesView({ user, onBack }: { user: User, onBack: () => void }) {
  const [puntos, setPuntos] = useState(0);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'puntos', user.uid), (docSnap) => {
      if (docSnap.exists()) {
        setPuntos(docSnap.data().total || 0);
      } else {
        setPuntos(0);
      }
    });
    return () => unsub();
  }, [user]);

  const beneficios = [
    { id: 'b1', label: 'Descuento 10% predial', cost: 500, icon: '🅿️' },
    { id: 'b2', label: 'Descuento 15% tenencia', cost: 750, icon: '🚗' },
    { id: 'b3', label: 'Entrada Utopías Nayarit', cost: 200, icon: '🎫' },
    { id: 'b4', label: 'Trámite express (prioridad)', cost: 300, icon: '📋' },
  ];

  const handleCanjear = async (b: any) => {
    if (puntos < b.cost) {
      alert('Puntos insuficientes');
      return;
    }
    setLoading(true);
    try {
      // Create code
      const code = `CANJE-${Date.now().toString(36).toUpperCase()}-TEP`;
      
      // Add canje
      await addDoc(collection(db, `canjes/${user.uid}/lista`), {
        beneficioId: b.id,
        label: b.label,
        cost: b.cost,
        code,
        createdAt: new Date().toISOString()
      });

      // Deduct points
      await updateDoc(doc(db, 'puntos', user.uid), {
        total: increment(-b.cost)
      }).catch(async () => {
         // if doc doesn't exist yet, although it should because they have points
      });

      setSuccessMsg(`¡Canjeado con éxito! Código: ${code}`);
      setTimeout(() => setSuccessMsg(''), 5000);
    } catch (e: any) {
       console.error(e);
       alert('Error al canjear: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-2 pb-10 space-y-6">
      <div className="flex items-center justify-between px-4">
        <button onClick={onBack} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-slate-400">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Canjear Puntos</span>
        <div className="w-10" />
      </div>

      <div className="px-4">
         <div className="bg-gradient-to-br from-magenta-500 to-rose-500 rounded-[2.5rem] p-6 text-white relative overflow-hidden shadow-2xl shadow-magenta-500/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-3xl"></div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/80 mb-2">Mi Saldo</p>
            <h3 className="text-5xl font-serif font-black mb-1 flex items-center gap-3">
               {puntos} <Coins className="w-8 h-8 text-yellow-300" />
            </h3>
            <p className="text-xs text-white/90">Nayarit Points Disponibles</p>
         </div>
      </div>

      {successMsg && (
         <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mx-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-sm font-bold shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            {successMsg}
         </motion.div>
      )}

      <div className="space-y-4 pt-4">
         <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 flex items-center gap-2">
            <Gift className="w-3 h-3" /> Beneficios Disponibles
         </h4>
         <div className="px-4 space-y-3">
            {beneficios.map(b => (
               <div key={b.id} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                     <div className="text-3xl">{b.icon}</div>
                     <div>
                        <p className="text-sm font-bold text-slate-900 leading-tight">{b.label}</p>
                        <p className="text-[10px] text-magenta-500 font-black uppercase tracking-widest mt-1 flex items-center gap-1">
                           <Coins className="w-3 h-3" /> {b.cost} pts
                        </p>
                     </div>
                  </div>
                  <button 
                     onClick={() => handleCanjear(b)}
                     disabled={puntos < b.cost || loading}
                     className={cn(
                        "px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all",
                        puntos >= b.cost 
                           ? "bg-slate-900 text-white hover:bg-slate-800 shadow-lg" 
                           : "bg-slate-100 text-slate-400 cursor-not-allowed"
                     )}
                  >
                     Canjear
                  </button>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
}
