import React from 'react';

const About: React.FC = () => {
  return (
    <section id="philosophy" className="py-32 bg-darkgray text-center px-6 border-b border-neutral-900 relative overflow-hidden">
      {/* Decorative large text bg */}
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-brand text-white opacity-[0.02] pointer-events-none select-none whitespace-nowrap">
        SILÊNCIO É PODER
      </span>

      <div className="max-w-4xl mx-auto space-y-16 relative z-10">
        <span className="block w-px h-24 bg-gradient-to-b from-transparent via-white to-transparent mx-auto"></span>
        
        <div className="space-y-6">
          <h2 className="text-4xl md:text-6xl font-brand text-white tracking-wide">
            O CORTE É O SILÊNCIO
          </h2>
          
          <p className="text-neutral-400 leading-relaxed text-lg md:text-xl font-light max-w-2xl mx-auto">
            Em um mundo barulhento, a HUSH escolhe a permanência. 
            Nossas peças são arquitetadas para quem não precisa gritar para ser notado. 
            Gramaturas pesadas, cortes precisos e uma estética que valoriza a discrição.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-neutral-800/50">
          {[
            { title: "Matéria Prima", text: "Algodão de alta densidade e materiais técnicos." },
            { title: "Modelagem", text: "Cortes oversized estudados para o caimento perfeito." },
            { title: "Discrição", text: "Branding mínimo. A qualidade é nossa única assinatura." }
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl glass hover:bg-white/5 transition-colors">
              <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-3">{item.title}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;