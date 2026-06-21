import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export function MetricView() {
  const data = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 500 },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Métricas Integrales de Gobierno</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#161920] border border-slate-800 p-6 rounded-2xl">
          <h4 className="text-sm font-semibold text-slate-400 mb-4">Adopción de Servicios Digitales</h4>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                <XAxis dataKey="name" stroke="#a0aec0" />
                <YAxis stroke="#a0aec0" />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
