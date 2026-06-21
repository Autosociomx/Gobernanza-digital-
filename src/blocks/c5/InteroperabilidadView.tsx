import React from 'react';
import { ShieldCheck, Briefcase } from 'lucide-react';

export function InteroperabilidadView() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-black text-white tracking-tight uppercase">Nodo de Transparencia Activa</h3>
        <p className="text-slate-400 text-sm mt-1">Bus de servicios e interoperabilidad. Cumplimiento de Ley de Gobierno Digital del Estado de Nayarit.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#161920] border border-emerald-500/20 p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Endpoints de API Activos</p>
          <p className="text-4xl font-serif font-black text-white">12<span className="text-sm text-emerald-400 ml-2">REST / SOAP</span></p>
        </div>
        <div className="bg-[#161920] border border-cyan-500/20 p-6 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Identidades Validadas</p>
          <p className="text-4xl font-serif font-black text-white">14.2k<span className="text-sm text-cyan-400 ml-2">Nayarit ID</span></p>
        </div>
        <div className="bg-[#161920] border border-purple-500/20 p-6 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Mensajes de Datos (Sellados)</p>
          <p className="text-4xl font-serif font-black text-white">8,401<span className="text-sm text-purple-400 ml-2">Folios</span></p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#161920] border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h4 className="text-sm font-semibold text-white uppercase">Trazabilidad Inter-Institucional</h4>
          </div>
          <div className="space-y-4">
            {[
              { target: 'Tesorería Municipal', status: 'Sincronizado', ping: '12ms', query: 'GET /api/v1/taxpayer' },
              { target: 'Registro Público Federal', status: 'Sincronizado', ping: '45ms', query: 'POST /api/v2/verify_identity' },
              { target: 'Padrón de Obras', status: 'Sincronizado', ping: '18ms', query: 'GET /api/v1/projects' },
              { target: 'Sistema DIF Estatal', status: 'Sincronizado', ping: '30ms', query: 'POST /api/v2/benefits' },
            ].map((api, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-900 border border-slate-800 rounded-xl">
                <div>
                  <p className="text-xs font-bold text-white mb-1">{api.target}</p>
                  <p className="text-[9px] font-mono text-slate-500">{api.query}</p>
                </div>
                <div className="text-right">
                  <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[8px] font-black uppercase rounded block mb-1">
                    {api.status}
                  </span>
                  <span className="text-[9px] font-mono text-slate-400">{api.ping}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#161920] border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="w-5 h-5 text-purple-400" />
            <h4 className="text-sm font-semibold text-white uppercase">Blockchain Municipal (Hashes)</h4>
          </div>
          <p className="text-[11px] text-slate-400 mb-4 pr-8">
            Muestreo en tiempo real de Mensajes de Datos sellados criptográficamente para auditoría federal.
          </p>
          <div className="space-y-2 h-[240px] overflow-hidden relative">
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#161920] to-transparent z-10"></div>
            {[
              { id: 'TPC-2026-9902', hash: 'e3b0c44298fc1c149afbf4c8996fb924', date: '2 min ago' },
              { id: 'TPC-2026-9901', hash: '4a0a19218e082a343a1b17e5333409af', date: '5 min ago' },
              { id: 'TPC-2026-9900', hash: '8f14e45fceea167a5a36dedd4bea2543', date: '12 min ago' },
              { id: 'TPC-2026-9899', hash: 'f2c7a407e324efdc4cf611daaaa5a1f2', date: '18 min ago' },
              { id: 'TPC-2026-9898', hash: 'bb18a5df1ab03994e410a56f6aa6a0e6', date: '21 min ago' },
            ].map((log, i) => (
              <div key={i} className="flex gap-4 p-3 bg-[#0f1115] border border-slate-800/50 rounded-lg">
                <div className="text-[10px] font-mono text-magenta-400 border-r border-slate-800 pr-3">{log.id}</div>
                <div className="flex-1 text-[8px] font-mono text-slate-500 truncate leading-relaxed">
                  SHA256: {log.hash}...<br/>
                  {log.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
