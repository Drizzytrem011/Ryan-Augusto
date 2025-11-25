import React from 'react';
import { Star } from 'lucide-react';

const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: "Rafael M.",
      role: "São Paulo, SP",
      text: "A qualidade do tecido é surreal. O corte é exatamente como descrito, estruturado e pesado. Vale cada centavo.",
      product: "Moletom Void"
    },
    {
      name: "Lucas S.",
      role: "Curitiba, PR",
      text: "Minimalismo de verdade. Sem logos gigantes, apenas design puro. O atendimento foi impecável.",
      product: "Calça Cargo Tech"
    },
    {
      name: "André V.",
      role: "Belo Horizonte, MG",
      text: "Estava procurando por esse tipo de estética há anos no Brasil. HUSH entregou tudo em 2 dias.",
      product: "Camiseta Silent"
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-black border-b border-neutral-900">
      <div className="max-w-[1400px] mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-brand text-white mb-16 text-center">
          QUEM VESTE O SILÊNCIO
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div key={i} className="glass p-8 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex text-offwhite mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="text-neutral-300 font-light italic leading-relaxed mb-6">
                  "{review.text}"
                </p>
              </div>
              
              <div className="border-t border-white/5 pt-4 flex justify-between items-end">
                <div>
                   <p className="text-white font-bold text-sm uppercase">{review.name}</p>
                   <p className="text-neutral-500 text-xs">{review.role}</p>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-neutral-600 border border-neutral-800 px-2 py-1 rounded">
                  {review.product}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;