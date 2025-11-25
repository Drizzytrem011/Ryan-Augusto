import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQItem } from '../types';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const items: FAQItem[] = [
    {
      question: "Qual o prazo de entrega?",
      answer: "Enviamos todos os pedidos em até 24h úteis. O prazo médio de entrega nacional via Sedex é de 2 a 4 dias úteis, dependendo da sua região."
    },
    {
      question: "A modelagem é padrão?",
      answer: "Nossa modelagem é levemente oversized (maior que o padrão) para garantir o caimento estruturado e conforto. Recomendamos comprar seu tamanho usual para o fit ideal da marca, ou um tamanho menor para um fit mais justo."
    },
    {
      question: "Como funciona a troca?",
      answer: "Você tem até 30 dias corridos após o recebimento para solicitar a troca ou devolução gratuita. O processo é simples e automático através do nosso portal de suporte."
    },
    {
      question: "Quais as formas de pagamento?",
      answer: "Aceitamos Cartão de Crédito em até 3x sem juros, PIX com aprovação imediata e Boleto Bancário."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-black px-6 border-t border-neutral-900">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-brand text-white mb-12 text-center uppercase">Dúvidas Frequentes</h2>
        
        <div className="space-y-4">
          {items.map((item, idx) => (
            <div 
              key={idx} 
              className="border border-neutral-800 rounded-2xl bg-cardbg overflow-hidden transition-all duration-300 hover:border-neutral-700 glass"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex justify-between items-center p-6 text-left"
              >
                <span className="text-white font-medium text-sm md:text-base uppercase tracking-wide">{item.question}</span>
                {openIndex === idx ? <Minus className="text-neutral-500" /> : <Plus className="text-white" />}
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === idx ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="p-6 pt-0 text-neutral-400 font-light leading-relaxed text-sm">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;