
import React from 'react';
import { FileText, Ruler, Building2, Layers, AlertCircle, TrendingUp, CheckCircle2 } from 'lucide-react';
import { ZoningControl } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface Props {
  data: ZoningControl;
  onClose: () => void;
  onRequestConsult?: () => void;
}

const PlanningDashboard: React.FC<Props> = ({ data, onClose, onRequestConsult }) => {
  // Mock data for visual comparison based on actual municipal scheme numbers
  const chartData = [
    { name: 'Min Erf (m²)', value: parseInt(data.minErfSize.replace(/\D/g,'')) || 450, color: '#4285F4' },
    { name: 'FAR (x100)', value: (parseFloat(data.far) || 0.25) * 100, color: '#34A853' },
    { name: 'Coverage (%)', value: parseInt(data.coverage) || 25, color: '#FBBC05' },
  ];

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl overflow-hidden max-w-5xl mx-auto animate-in zoom-in-95 duration-500">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              Zone Intelligence
            </div>
            <h2 className="text-4xl font-google font-bold">{data.name}</h2>
            <p className="text-blue-100 opacity-90 max-w-xl">{data.intent}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <AlertCircle size={24} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
        {/* Left Column: Key Stats */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-blue-300 transition-all">
              <Ruler className="text-blue-600 mb-2" size={20} />
              <p className="text-xs text-gray-500 uppercase font-bold tracking-tighter">Min Erf Size</p>
              <p className="text-xl font-google font-bold text-gray-900">{data.minErfSize}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-green-300 transition-all">
              <Building2 className="text-green-600 mb-2" size={20} />
              <p className="text-xs text-gray-500 uppercase font-bold tracking-tighter">Max Height</p>
              <p className="text-xl font-google font-bold text-gray-900">{data.height}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-yellow-300 transition-all">
              <Layers className="text-yellow-600 mb-2" size={20} />
              <p className="text-xs text-gray-500 uppercase font-bold tracking-tighter">Coverage</p>
              <p className="text-xl font-google font-bold text-gray-900">{data.coverage}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-red-300 transition-all">
              <TrendingUp className="text-red-600 mb-2" size={20} />
              <p className="text-xs text-gray-500 uppercase font-bold tracking-tighter">FAR</p>
              <p className="text-xl font-google font-bold text-gray-900">{data.far}</p>
            </div>
          </div>

          <div className="h-64 w-full bg-gray-50 rounded-2xl p-4 border border-gray-100 flex flex-col">
             <p className="text-sm font-google font-bold mb-4 text-gray-700 shrink-0">Development Ratios</p>
             <div className="flex-1 min-h-0 w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                   <XAxis type="number" hide />
                   <YAxis dataKey="name" type="category" width={100} axisLine={false} tickLine={false} style={{fontSize: '12px', fontWeight: 500}} />
                   <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                   <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                     {chartData.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={entry.color} />
                     ))}
                   </Bar>
                 </BarChart>
               </ResponsiveContainer>
             </div>
          </div>
        </div>

        {/* Middle Column: Use Rights */}
        <div className="space-y-6">
          <div className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm space-y-4">
            <h3 className="flex items-center space-x-2 font-google font-bold text-gray-900">
              <CheckCircle2 className="text-green-500" size={20} />
              <span>Primary Permitted Uses</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.permittedUses.map(use => (
                <span key={use} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                  {use}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm space-y-4">
            <h3 className="flex items-center space-x-2 font-google font-bold text-gray-900">
              <AlertCircle className="text-blue-500" size={20} />
              <span>Consent Required Uses</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.consentUses.map(use => (
                <span key={use} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                  {use}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Consultancy CTA */}
        <div className="bg-gray-900 rounded-3xl p-8 text-white space-y-6 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-google font-bold mb-4 italic">Need a Relaxation?</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Requests are sent directly to <span className="text-blue-400 font-bold">lwazikhwela@outlook.com</span>. Our experts consult on building line relaxations and special consents.
            </p>
            <ul className="space-y-3">
              {[
                "Site Feasibility Reports",
                "Neighbor Consent Management",
                "Building Line Relaxations",
                "Special Consent Applications"
              ].map(item => (
                <li key={item} className="flex items-center space-x-3 text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <button 
            onClick={onRequestConsult}
            className="w-full py-4 bg-white text-gray-900 font-bold rounded-2xl hover:bg-blue-500 hover:text-white transition-all transform active:scale-95 shadow-lg"
          >
            Consult With NeXT Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanningDashboard;
