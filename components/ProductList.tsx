import React from 'react';
import { Product } from '../types';
import Button from './Button';
import { Plus } from 'lucide-react';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => {
  return (
    <section id="collection" className="py-32 bg-black relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <div className="max-w-2xl">
            <span className="text-neutral-500 font-mono text-xs uppercase tracking-widest block mb-4">
              [ Drop_004 Disponível ]
            </span>
            <h2 className="text-5xl md:text-7xl font-brand text-white mb-6">
              VESTUÁRIO<span className="text-neutral-700">.</span>
            </h2>
            <p className="text-neutral-400 font-light max-w-md leading-relaxed">
              Peças fundamentais para o dia a dia. Corte preciso e silhueta marcante.
            </p>
          </div>
          <div className="hidden md:block">
             <Button variant="outline">Ver Todos</Button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group relative flex flex-col glass rounded-2xl overflow-hidden hover:border-neutral-600 transition-all duration-500">
              
              {/* Badges */}
              <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                {product.isNew && (
                  <span className="bg-offwhite text-black text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded-sm shadow-lg">
                    Novo
                  </span>
                )}
                {product.stock < 10 && (
                  <span className="bg-neutral-900/80 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded-sm backdrop-blur-md">
                    Últimas Peças
                  </span>
                )}
              </div>

              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  loading="lazy"
                  width="400"
                  height="500"
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out"
                />
                
                {/* Quick Add Overlay */}
                <button 
                  onClick={() => onAddToCart(product)}
                  className="absolute bottom-4 right-4 bg-white text-black p-3 rounded-full shadow-lg translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20 flex items-center justify-center hover:bg-neutral-200"
                  aria-label={`Adicionar ${product.name} ao carrinho`}
                >
                  <Plus size={20} />
                </button>
              </div>
              
              {/* Info */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg text-white font-medium tracking-wide uppercase font-brand leading-none">
                      {product.name}
                    </h3>
                  </div>
                  <p className="text-neutral-500 text-xs leading-relaxed line-clamp-2 mb-4">
                    {product.shortDesc}
                  </p>
                </div>
                
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-white font-mono text-sm">
                        R$ {product.price.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-[10px] text-neutral-500">
                       até 3x sem juros
                    </span>
                  </div>
                  <button 
                    onClick={() => onAddToCart(product)}
                    className="text-xs text-neutral-400 uppercase tracking-widest hover:text-white transition-colors border-b border-transparent hover:border-white pb-0.5"
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductList;