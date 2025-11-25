
import React, { useState, useEffect } from 'react';
import { X, Trash2, CheckCircle, CreditCard, Lock, Minus, Plus, ArrowRight, Truck, ShieldCheck } from 'lucide-react';
import { CartItem, CheckoutStep } from '../types';
import Button from './Button';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity,
  onRemoveItem,
  onClearCart 
}) => {
  const [step, setStep] = useState<CheckoutStep>(CheckoutStep.CART);
  const [loading, setLoading] = useState(false);
  const [cep, setCep] = useState('');
  const [shippingCost, setShippingCost] = useState(0);

  // Reset step when closed for a while
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setStep(CheckoutStep.CART);
        setShippingCost(0);
        setCep('');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal + shippingCost;
  const installments = 3;
  const installmentValue = total / installments;

  const calculateShipping = () => {
    if (cep.length >= 8) {
      // Simulação de cálculo de frete
      setShippingCost(25.00);
    }
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(CheckoutStep.PROCESSING);
    setLoading(true);
    
    // Simulate Payment Processing
    setTimeout(() => {
      setLoading(false);
      setStep(CheckoutStep.SUCCESS);
      onClearCart();
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity duration-500"
        onClick={onClose}
      />
      
      {/* Sidebar Panel */}
      <div className="fixed top-0 right-0 h-full w-full md:w-[500px] glass z-50 transform transition-transform duration-500 ease-in-out flex flex-col border-l border-white/5 bg-[#0a0a0a]">
          
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-neutral-800 bg-black/40">
            <div className="flex items-center gap-3">
               <img src="/logo.png" alt="HUSH" className="h-6 w-auto invert" />
               <span className="h-4 w-px bg-neutral-700"></span>
               <h2 className="text-sm font-mono tracking-widest text-neutral-400 uppercase">
                {step === CheckoutStep.CART && 'Carrinho'}
                {step === CheckoutStep.FORM && 'Pagamento Seguro'}
                {step === CheckoutStep.PROCESSING && 'Processando'}
                {step === CheckoutStep.SUCCESS && 'Pedido Confirmado'}
               </h2>
            </div>
            <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
              <X strokeWidth={1.5} size={20} />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
            
            {/* EMPTY STATE */}
            {step === CheckoutStep.CART && cartItems.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center space-y-6 text-center opacity-0 animate-fade-in">
                <span className="text-6xl text-neutral-800 font-brand">00</span>
                <p className="text-neutral-400 font-light">Seu carrinho está vazio.</p>
                <Button variant="outline" onClick={onClose}>Ver Coleção</Button>
              </div>
            )}

            {/* CART ITEMS & PREVIEW */}
            {cartItems.length > 0 && step !== CheckoutStep.SUCCESS && (
              <div className="mb-8 space-y-6 animate-fade-in">
                {/* Product List */}
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 p-3 bg-white/5 rounded-xl border border-white/5">
                      <div className="w-16 h-20 bg-neutral-800 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div className="flex justify-between items-start">
                          <h3 className="text-white font-medium text-xs tracking-wide uppercase pr-2">{item.name}</h3>
                          <span className="text-white text-xs font-mono">R$ {(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                        
                        {step === CheckoutStep.CART ? (
                           <div className="flex justify-between items-end mt-2">
                             <div className="flex items-center space-x-3 bg-black rounded-lg p-1 border border-neutral-800">
                               <button onClick={() => onUpdateQuantity(item.id, -1)} className="p-1 text-neutral-400 hover:text-white"><Minus size={12} /></button>
                               <span className="text-xs text-white w-4 text-center">{item.quantity}</span>
                               <button onClick={() => onUpdateQuantity(item.id, 1)} className="p-1 text-neutral-400 hover:text-white"><Plus size={12} /></button>
                             </div>
                             <button onClick={() => onRemoveItem(item.id)} className="text-neutral-600 hover:text-red-400 p-1"><Trash2 size={14} /></button>
                           </div>
                        ) : (
                           <p className="text-xs text-neutral-500">Qtd: {item.quantity}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Calculate Shipping (Only in Cart Step) */}
                {step === CheckoutStep.CART && (
                  <div className="p-4 rounded-xl border border-neutral-800 bg-white/5">
                     <label className="text-xs uppercase text-neutral-500 font-bold mb-2 block">Calcular Frete</label>
                     <div className="flex gap-2">
                        <input 
                          type="text" 
                          placeholder="Digite seu CEP" 
                          value={cep}
                          onChange={(e) => setCep(e.target.value)}
                          maxLength={9}
                          className="bg-black border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white flex-1 focus:border-white outline-none"
                        />
                        <button 
                          onClick={calculateShipping}
                          className="bg-white text-black text-xs font-bold uppercase px-4 rounded-lg hover:bg-neutral-200"
                        >
                          OK
                        </button>
                     </div>
                     {shippingCost > 0 && (
                       <p className="text-green-400 text-xs mt-2 flex items-center gap-1">
                         <CheckCircle size={12} /> Sedex Expresso: R$ {shippingCost.toFixed(2)} (2 dias úteis)
                       </p>
                     )}
                  </div>
                )}
              </div>
            )}

            {/* CHECKOUT FORM */}
            {(step === CheckoutStep.FORM || step === CheckoutStep.PROCESSING) && (
              <form id="checkout-form" onSubmit={handleCheckout} className="space-y-6 animate-fade-in border-t border-neutral-800 pt-6">
                <div className="space-y-4">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-500">Dados de Envio</h3>
                  <input type="email" required className="w-full bg-black/40 border border-neutral-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-white transition-colors placeholder-neutral-600" placeholder="E-mail" disabled={step === CheckoutStep.PROCESSING} />
                  <input type="text" required className="w-full bg-black/40 border border-neutral-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-white transition-colors placeholder-neutral-600" placeholder="Nome Completo" disabled={step === CheckoutStep.PROCESSING} />
                  <input type="text" required className="w-full bg-black/40 border border-neutral-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-white transition-colors placeholder-neutral-600" placeholder="Endereço" disabled={step === CheckoutStep.PROCESSING} />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" required className="bg-black/40 border border-neutral-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-white transition-colors placeholder-neutral-600" placeholder="Cidade" disabled={step === CheckoutStep.PROCESSING} />
                    <input type="text" required className="bg-black/40 border border-neutral-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-white transition-colors placeholder-neutral-600" placeholder="CEP" disabled={step === CheckoutStep.PROCESSING} />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-neutral-800">
                   <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-500">Pagamento</h3>
                   
                   {/* Payment Badges */}
                   <div className="flex gap-2 mb-4 grayscale opacity-70">
                      {['visa', 'mastercard', 'amex'].map(card => (
                        <div key={card} className="h-6 w-10 bg-white rounded flex items-center justify-center">
                          <CreditCard size={14} className="text-black" />
                        </div>
                      ))}
                      <div className="h-6 w-auto px-2 bg-white rounded flex items-center justify-center text-[10px] text-black font-bold">PIX</div>
                   </div>

                   <div className="bg-black/40 border border-neutral-700 rounded-lg p-4 flex items-center gap-3 opacity-75">
                      <CreditCard size={18} className="text-white" />
                      <span className="text-sm text-neutral-400">Cartão de Crédito (Simulação Segura)</span>
                   </div>
                   
                   <div className="flex flex-col gap-2 text-xs text-neutral-500 mt-2">
                     <p className="flex items-center gap-2"><Lock size={12} className="text-green-500" /> Ambiente criptografado 256-bits (SSL)</p>
                     <p className="flex items-center gap-2"><ShieldCheck size={12} /> Garantia de troca em até 30 dias</p>
                   </div>
                </div>
              </form>
            )}

            {/* SUCCESS STATE */}
            {step === CheckoutStep.SUCCESS && (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-slide-up">
                <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center text-success mb-4 border border-success/20">
                  <CheckCircle size={40} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-3xl font-brand text-white mb-2">PEDIDO CONFIRMADO</h3>
                  <p className="text-neutral-400 font-light text-sm max-w-xs mx-auto">Enviamos um e-mail com os detalhes do rastreamento.</p>
                  
                  <div className="mt-8 bg-white/5 border border-white/10 p-6 rounded-2xl w-full max-w-xs mx-auto text-left space-y-4">
                    <div>
                      <p className="text-[10px] text-neutral-500 uppercase tracking-widest mb-1">Nº do Pedido</p>
                      <p className="text-white font-mono tracking-widest text-lg">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                    </div>
                    <div>
                       <p className="text-[10px] text-neutral-500 uppercase tracking-widest mb-1">Total Pago</p>
                       <p className="text-white font-mono">R$ {total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
                <Button onClick={onClose} className="mt-8 w-full">Voltar à Loja</Button>
              </div>
            )}
          </div>

          {/* Footer Actions / Summary */}
          {step !== CheckoutStep.SUCCESS && cartItems.length > 0 && (
            <div className="p-6 border-t border-neutral-800 bg-neutral-900/50 backdrop-blur-md">
              
              {/* Financial Summary */}
              <div className="space-y-2 mb-6">
                 <div className="flex justify-between items-center text-sm text-neutral-400">
                    <span>Subtotal</span>
                    <span>R$ {subtotal.toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between items-center text-sm text-neutral-400">
                    <span>Frete</span>
                    <span>{shippingCost > 0 ? `R$ ${shippingCost.toFixed(2)}` : 'Calculando...'}</span>
                 </div>
                 <div className="flex justify-between items-center pt-4 border-t border-white/5">
                    <span className="text-white uppercase tracking-widest text-xs font-bold">Total</span>
                    <div className="text-right">
                       <span className="block text-xl font-brand text-white">R$ {total.toFixed(2)}</span>
                       <span className="text-[10px] text-neutral-500 block">ou {installments}x de R$ {installmentValue.toFixed(2)} sem juros</span>
                    </div>
                 </div>
              </div>
              
              {/* Buttons */}
              {step === CheckoutStep.CART ? (
                <Button fullWidth onClick={() => setStep(CheckoutStep.FORM)} className="group">
                  <span className="flex items-center justify-center gap-2">
                    Continuar Compra <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              ) : step !== CheckoutStep.PROCESSING && (
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(CheckoutStep.CART)}>
                    Voltar
                  </Button>
                  <Button 
                    fullWidth 
                    className="flex-[2] bg-white text-black hover:bg-neutral-200" 
                    form="checkout-form"
                    disabled={loading}
                    variant="white"
                  >
                    {loading ? 'Processando...' : 'Finalizar Pedido'}
                  </Button>
                </div>
              )}

              {/* Trust Footer */}
              <div className="mt-4 flex justify-center items-center gap-4 text-[10px] text-neutral-600 uppercase tracking-widest">
                 <span className="flex items-center gap-1"><Lock size={10} /> Compra Segura</span>
                 <span className="flex items-center gap-1"><Truck size={10} /> Entrega Expressa</span>
              </div>
            </div>
          )}
      </div>
    </>
  );
};

export default CartSidebar;
