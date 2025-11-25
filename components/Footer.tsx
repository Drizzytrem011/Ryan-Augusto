
import React from 'react';
import { Instagram, Twitter, Mail, CreditCard } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-darkgray py-20 border-t border-neutral-900">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-5 space-y-6">
            <img 
              src="/logo.png" 
              alt="HUSH Logo" 
              className="h-10 w-auto opacity-90 invert" 
            />
            <p className="text-neutral-500 font-light max-w-sm text-sm leading-relaxed">
              Desenhando o futuro do streetwear no Brasil. Baseado na estética silenciosa e na qualidade absoluta.
            </p>
            <div className="flex gap-4 pt-4">
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" aria-label="Email" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                <Mail size={18} />
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div className="col-span-1 md:col-span-2 md:col-start-7">
            <h3 className="text-white uppercase tracking-widest text-[10px] mb-8 font-bold">Explorar</h3>
            <ul className="space-y-4">
              {['Coleção', 'Sobre', 'Manifesto', 'Lookbook'].map(item => (
                <li key={item}>
                  <a href="#" className="text-neutral-500 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white uppercase tracking-widest text-[10px] mb-8 font-bold">Suporte</h3>
            <ul className="space-y-4">
              {['Perguntas Frequentes', 'Envio e Rastreio', 'Trocas e Devoluções', 'Contato'].map(item => (
                <li key={item}>
                  <a href="#" className="text-neutral-500 hover:text-white transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white uppercase tracking-widest text-[10px] mb-8 font-bold">Legal</h3>
            <ul className="space-y-4">
              {['Política de Privacidade', 'Termos de Uso', 'Cookies'].map(item => (
                <li key={item}>
                  <a href="#" className="text-neutral-500 hover:text-white transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-neutral-800 gap-6">
          <p className="text-neutral-600 text-[10px] font-mono uppercase">
            &copy; {new Date().getFullYear()} HUSH BRASIL LTDA. TODOS OS DIREITOS RESERVADOS.
          </p>
          <div className="flex items-center gap-4 opacity-50 grayscale">
             <CreditCard size={20} />
             <span className="text-[10px] text-neutral-500">Pagamento Seguro</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
