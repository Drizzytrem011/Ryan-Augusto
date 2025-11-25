
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Coleção', href: '#collection' },
    { name: 'Manifesto', href: '#philosophy' },
    { name: 'Depoimentos', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' }
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-40 transition-all duration-500 border-b ${
        scrolled 
          ? 'bg-black/80 backdrop-blur-md border-neutral-900 py-4 shadow-lg' 
          : 'bg-transparent border-transparent py-6 md:py-8'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo Image - Navbar - INVERTED for White on Dark */}
        <a href="#" className="block hover:opacity-80 transition-opacity">
          <img 
            src="/logo.png" 
            alt="HUSH Logo" 
            className="h-8 md:h-10 w-auto object-contain invert" 
          />
        </a>

        {/* Desktop Links - Glass Effect */}
        <div className="hidden md:flex items-center space-x-12 glass px-8 py-3 rounded-full">
          {links.map((item) => (
            <a 
              key={item.name} 
              href={item.href}
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-colors"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-6">
          <button 
            onClick={onOpenCart} 
            className="relative group text-white p-2"
            aria-label="Abrir Carrinho de Compras"
          >
            <ShoppingBag strokeWidth={1.5} className="w-6 h-6 text-neutral-300 group-hover:text-white transition-colors" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-offwhite text-[9px] font-bold text-black border border-black animate-fade-in">
                {cartCount}
              </span>
            )}
          </button>
          
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir Menu"
          >
            {mobileMenuOpen ? <X strokeWidth={1.5} /> : <Menu strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[70px] bg-black z-30 animate-fade-in">
          <div className="flex flex-col p-8 space-y-8">
             {links.map((item, idx) => (
              <a 
                key={item.name} 
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-brand text-neutral-400 hover:text-white transition-colors border-b border-neutral-900 pb-4"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
