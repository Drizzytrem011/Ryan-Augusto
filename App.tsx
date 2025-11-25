import React, { useState, useEffect, Suspense } from 'react';
import Navbar from './components/Navbar';
import CartSidebar from './components/CartSidebar';
import { Product, CartItem } from './types';

// Lazy load heavy components
const Hero = React.lazy(() => import('./components/Hero'));
const About = React.lazy(() => import('./components/About'));
const TrustSection = React.lazy(() => import('./components/Features'));
const ProductList = React.lazy(() => import('./components/ProductList'));
const Testimonials = React.lazy(() => import('./components/Testimonials'));
const FAQ = React.lazy(() => import('./components/FAQ'));
const Footer = React.lazy(() => import('./components/Footer'));

// Dados Mockados em PT-BR
const PRODUCTS: Product[] = [
  {
    id: 'hoodie-void',
    name: 'MOLETOM VOID HEAVYWEIGHT',
    shortDesc: 'Algodão 480g. Corte oversized estruturado. Preto profundo.',
    price: 489,
    category: 'Vestuário',
    stock: 15,
    isNew: true,
    image: 'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?q=80&w=987&auto=format&fit=crop'
  },
  {
    id: 'tee-silent-off',
    name: 'CAMISETA SILENT OFF-WHITE',
    shortDesc: 'Malha premium fio 30.1. Toque frio. Estampa puff discreta.',
    price: 249,
    category: 'Vestuário',
    stock: 32,
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=987&auto=format&fit=crop'
  },
  {
    id: 'cargo-tech',
    name: 'CALÇA CARGO TACTICAL',
    shortDesc: 'Ripstop impermeável. 6 bolsos funcionais. Ajuste magnético.',
    price: 599,
    category: 'Inferior',
    stock: 8,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=997&auto=format&fit=crop'
  },
  {
    id: 'cap-hush',
    name: 'BONÉ HUSH EMBROIDERED',
    shortDesc: 'Sarja lavada. Bordado tonal. Fecho de metal minimalista.',
    price: 189,
    category: 'Acessórios',
    stock: 10,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1036&auto=format&fit=crop'
  }
];

const App: React.FC = () => {
  // Inicializa carrinho do localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('hush_cart_v1');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Persiste carrinho
  useEffect(() => {
    localStorage.setItem('hush_cart_v1', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('hush_cart_v1');
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // JSON-LD para SEO de Organização e Produtos
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "name": "HUSH",
          "url": "https://hush.com.br",
          "logo": "https://hush.com.br/logo.png",
          "description": "Streetwear silencioso e moda premium."
        },
        ...PRODUCTS.map(p => ({
          "@type": "Product",
          "name": p.name,
          "image": p.image,
          "description": p.shortDesc,
          "offers": {
            "@type": "Offer",
            "price": p.price,
            "priceCurrency": "BRL",
            "availability": p.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
          }
        }))
      ]
    });
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black overflow-x-hidden">
      <Navbar 
        cartCount={totalItems} 
        onOpenCart={() => setIsCartOpen(true)} 
      />
      
      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
      />

      <main>
        <Suspense fallback={<div className="h-screen w-full bg-black flex items-center justify-center text-neutral-600 animate-pulse tracking-widest text-xs">CARREGANDO...</div>}>
          <Hero />
          {/* NOVA ORDEM: Produtos primeiro */}
          <ProductList products={PRODUCTS} onAddToCart={addToCart} />
          {/* Benefícios (Trust Bar) */}
          <TrustSection />
          {/* Manifesto */}
          <About />
          {/* Depoimentos */}
          <Testimonials />
          {/* FAQ */}
          <FAQ />
          <Footer />
        </Suspense>
      </main>
    </div>
  );
};

export default App;