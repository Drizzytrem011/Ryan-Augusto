export interface Product {
  id: string;
  name: string;
  shortDesc: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  isNew?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export enum CheckoutStep {
  CART = 'CART',
  FORM = 'FORM',
  PROCESSING = 'PROCESSING',
  SUCCESS = 'SUCCESS'
}

export interface FAQItem {
  question: string;
  answer: string;
}