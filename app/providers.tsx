'use client';
import { ToastProvider } from '@/contexts/ToastContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { LocaleProvider } from '@/contexts/LocaleContext';
import { CartProvider } from '@/contexts/CartContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <AuthProvider>
        <LocaleProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </LocaleProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
