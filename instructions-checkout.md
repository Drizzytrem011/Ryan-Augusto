# Guia de Integração de Pagamento HUSH

Este projeto atualmente utiliza um checkout simulado (`CartSidebar.tsx`). Para vender produtos reais, siga os passos abaixo para integrar com Stripe ou Mercado Pago.

## Opção 1: Stripe Checkout (Recomendado Internacionalmente/High-End)

1. **Instale as dependências:**
   ```bash
   npm install @stripe/stripe-js
   ```

2. **Backend (Node/Next.js/Firebase):**
   Você precisará de um endpoint API que crie uma sessão de checkout.
   ```javascript
   const session = await stripe.checkout.sessions.create({
     line_items: cartItems.map(item => ({
       price_data: { currency: 'brl', product_data: { name: item.name }, unit_amount: item.price * 100 },
       quantity: item.quantity,
     })),
     mode: 'payment',
     success_url: `${YOUR_DOMAIN}/success`,
     cancel_url: `${YOUR_DOMAIN}/cart`,
   });
   ```

3. **Frontend (`CartSidebar.tsx`):**
   Substitua a função `handleCheckout`:
   ```javascript
   import { loadStripe } from '@stripe/stripe-js';
   const stripePromise = loadStripe('SUA_CHAVE_PUBLICA_STRIPE');
   
   const handleCheckout = async () => {
     const stripe = await stripePromise;
     // Chame seu backend para obter a Session ID
     const response = await fetch('/api/create-checkout-session', { method: 'POST', body: JSON.stringify(cartItems) });
     const session = await response.json();
     await stripe.redirectToCheckout({ sessionId: session.id });
   }
   ```

## Opção 2: Mercado Pago (Recomendado para Brasil - PIX)

1. **Instale o SDK:**
   ```bash
   npm install @mercadopago/sdk-react
   ```

2. **Frontend:**
   O Mercado Pago oferece o "Checkout Pro" que cuida de tudo. Você redireciona o usuário para o link de pagamento gerado pela API deles (Preference ID).

## Check de Segurança Antes do Go-Live

1. Substitua todas as chaves de teste por chaves de produção.
2. Configure webhook para limpar o carrinho do usuário após sucesso (via localStorage clear).
3. Garanta que seu domínio tenha certificado SSL ativo (HTTPS).
