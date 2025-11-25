import React from 'react';
import { ShieldCheck, Truck, RefreshCw, Lock } from 'lucide-react';

const TrustSection: React.FC = () => {
  const features = [
    {
      icon: <ShieldCheck className="w-6 h-6" strokeWidth={1.5} />,
      title: "Qualidade Premium",
      desc: "Tecidos de alta gramatura."
    },
    {
      icon: <Truck className="w-6 h-6" strokeWidth={1.5} />,
      title: "Envio Rápido",
      desc: "Despacho em 24h a 48h."
    },
    {
      icon: <RefreshCw className="w-6 h-6" strokeWidth={1.5} />,
      title: "Troca Facilitada",
      desc: "30 dias para devolução."
    },
    {
      icon: <Lock className="w-6 h-6" strokeWidth={1.5} />,
      title: "Pagamento Seguro",
      desc: "Proteção de dados completa."
    }
  ];

  return (
    <section id="features" className="py-12 border-y border-neutral-900 bg-darkgray/30 backdrop-blur-sm relative z-20">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className="flex flex-col items-center text-center space-y-3 group">
              <div className="p-4 rounded-full bg-black/50 border border-neutral-800 text-neutral-400 group-hover:text-white group-hover:border-neutral-600 transition-all duration-300 glass">
                {f.icon}
              </div>
              <div>
                <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-1">{f.title}</h4>
                <p className="text-neutral-500 text-xs font-mono">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;