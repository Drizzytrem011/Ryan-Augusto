
import React from 'react';
import Button from './Button';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 select-none">
        <picture>
           <source media="(max-width: 768px)" srcSet="https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=800&auto=format&fit=crop&grayscale&blur=1" />
           <img 
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop&grayscale" 
            alt="Modelo vestindo HUSH streetwear em ambiente urbano escuro" 
            className="w-full h-full object-cover scale-105 animate-[pulse-slow_10s_ease-in-out_infinite] opacity-50"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] px-6 md:px-12 flex flex-col justify-end md:justify-center h-full pb-24 md:pb-0">
        <div className="animate-slide-up space-y-8 flex flex-col items-start md:items-center text-center md:text-left">
          
          <div className="inline-flex items-center space-x-3 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 w-fit glass mb-4 self-start md:self-center">
            <span className="w-2 h-2 rounded-full bg-offwhite animate-pulse"></span>
            <span className="text-[10px] md:text-xs font-mono text-neutral-300 uppercase tracking-widest">
              Coleção Disponível
            </span>
          </div>

          {/* LOGO HERO - PNG Invertido para Branco */}
          <div className="w-full flex justify-center py-6 md:py-8">
             <img 
               src="/logo.png" 
               alt="HUSH" 
               className="w-[70%] md:w-[40%] max-w-[600px] h-auto object-contain invert drop-shadow-2xl select-none"
             />
          </div>
          
          <div className="max-w-xl mx-auto space-y-8 flex flex-col items-center">
            <p className="text-neutral-300 text-lg md:text-xl font-light leading-relaxed text-center border-l-0 md:border-l-0 border-white pl-0">
              Streetwear silencioso. Peças essenciais onde a qualidade do tecido fala mais alto que qualquer estampa. 
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full justify-center">
              <Button onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}>
                Comprar Agora
              </Button>
              <Button variant="outline" onClick={() => document.getElementById('philosophy')?.scrollIntoView({ behavior: 'smooth' })}>
                Descobrir a Marca
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 md:right-12 flex items-center gap-4 animate-bounce text-neutral-500">
        <span className="text-[10px] font-mono uppercase tracking-widest hidden md:block">Ver Produtos</span>
        <ArrowDown size={20} />
      </div>
    </section>
  );
};

export default Hero;
