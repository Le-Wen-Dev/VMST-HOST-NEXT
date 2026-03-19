'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { HostingPlan } from '@/data/mockData';

export interface CartItem {
  plan: HostingPlan;
  duration: string;
  price: number;
  months?: number;
  basePrice?: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (plan: HostingPlan, duration: string) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'vmst_cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) setCart(JSON.parse(saved));
    } catch {}
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const addToCart = useCallback((plan: HostingPlan, duration: string) => {
    const durationMap: Record<string, string> = { monthly: 'monthly', quarterly: 'quarterly', yearly: 'yearly' };
    const durationKey = durationMap[duration] || duration;
    const price = plan.price[durationKey as 'monthly' | 'quarterly' | 'yearly'];
    setCart(prev => [...prev, { plan, duration, price }]);
  }, []);

  const removeFromCart = useCallback((index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
