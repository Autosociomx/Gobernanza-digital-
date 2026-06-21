import React from 'react';
import { HeartHandshake } from 'lucide-react';

export function BienestarView() {
  return (
    <div className="max-w-4xl mx-auto text-center space-y-6 pt-12">
      <div className="rounded-full bg-pink-500/10 w-24 h-24 flex items-center justify-center mx-auto border border-pink-500/20">
        <HeartHandshake className="w-12 h-12 text-pink-400" />
      </div>
      <h3 className="text-3xl font-bold text-white">Bienestar Social</h3>
      <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
        Integración programática. <br/>
        El padrón único alinea a los beneficiarios de Estado y Municipio mediante la IDN-U, eliminando duplicidad de apoyos sociales y correlacionando datos del triaje médico con despensas o subsidios.
      </p>

      <div className="pt-8">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-sm text-slate-300">
          <div className="w-2 h-2 rounded-full bg-pink-500"></div>
          Sincronizando padrones...
        </span>
      </div>
    </div>
  );
}
