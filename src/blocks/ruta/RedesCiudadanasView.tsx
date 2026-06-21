import React, { useState, useEffect } from 'react';
import { Loader2, Plus, Users } from 'lucide-react';
import { ViewHeader } from './shared';
import { db, auth } from '../../firebase';
import { collection, onSnapshot, addDoc } from 'firebase/firestore';

export function RedesCiudadanasView({ profile, onBack }: { profile: any, onBack: () => void }) {
  const [networks, setNetworks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = collection(db, 'neighborhood_networks');
    const unsub = onSnapshot(q, (snap) => {
      const docs = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNetworks(docs);

      if (snap.empty && !loading) {
        const seedData = [
          { name: 'Comité San Juan Unido', colony: 'Col. San Juan', memberCount: 156, leaderName: 'M. Lozano', createdAt: new Date() },
          { name: 'Red Vecinal Centro', colony: 'Centro Tepic', memberCount: 89, leaderName: 'R. Garcia', createdAt: new Date() },
          { name: 'Comité Ciudad del Valle', colony: 'Cd. del Valle', memberCount: 210, leaderName: 'S. Peña', createdAt: new Date() }
        ];
        seedData.forEach(async (d) => {
          await addDoc(collection(db, 'neighborhood_networks'), d);
        });
      }

      setLoading(false);
    });
    return () => unsub();
  }, [loading]);

  const joinNetwork = async (networkId: string) => {
    if (!auth.currentUser) return;
    try {
      // In a real app we'd update a members subcollection
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="pt-2 pb-10 space-y-6">
      <ViewHeader title="Red de Apoyo" onBack={onBack} />

      <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-magenta-500/10 rounded-full blur-3xl"></div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-serif font-black">{profile.neighborhood || 'Tepic'} Unida</h3>
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
            <Users className="w-5 h-5 text-magenta-300" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Miembros en {profile.neighborhood || 'Tepic'}</p>
            <p className="text-xl font-black">2,410</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Metas Alcanzadas</p>
            <p className="text-xl font-black">94%</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center px-4">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Comités en Tepic</h3>
          <button className="text-[10px] font-black text-magenta-500 uppercase tracking-widest">Ver Mapa</button>
        </div>

        <div className="space-y-3">
          {loading ? (
            <div className="flex justify-center p-12">
              <Loader2 className="w-6 h-6 animate-spin text-slate-300" />
            </div>
          ) : (
            <>
              {networks.length === 0 && (
                <div className="p-8 bg-white border border-slate-100 rounded-[2rem] text-center">
                  <p className="text-sm font-bold text-slate-900 mb-2">Aún no hay comités registrados</p>
                  <p className="text-xs text-slate-400">Sé el primero en organizar tu colonia.</p>
                </div>
              )}
              {networks.map((net: any) => (
                <div key={net.id} className="p-6 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-xl shadow-inner group-hover:bg-magenta-50 transition-colors">
                        🏘️
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900 mb-0.5">{net.name}</p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{net.colony}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-black text-magenta-500">{net.memberCount || 0} Miembros</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                    <div className="flex -space-x-2">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                          <img src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                      <div className="w-6 h-6 rounded-full border-2 border-white bg-magenta-500 flex items-center justify-center text-[8px] text-white font-bold">
                        +
                      </div>
                    </div>
                    <button onClick={() => joinNetwork(net.id)} className="px-5 py-2 bg-slate-900 border border-slate-900 rounded-full text-[10px] font-black text-white uppercase tracking-widest hover:bg-slate-800 transition-colors">
                      Unirme al Comité
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      <div className="bg-emerald-50 rounded-[2rem] p-6 border border-emerald-100 shadow-inner">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Plus className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Súmate al Cambio</p>
            <h4 className="text-sm font-black text-emerald-900">Registrar a un nuevo Nayarita</h4>
          </div>
        </div>
        <p className="text-xs text-emerald-700 leading-relaxed mb-5">
          ¿Tienes familiares o vecinos que aún no tienen su Nayarit ID? Ayúdalos a registrarse y intégralos a la red ciudadana.
        </p>
        <button className="w-full py-4 bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg hover:bg-emerald-700 transition-colors active:scale-95">
          Comenzar Registro Externo
        </button>
      </div>
    </div>
  );
}
