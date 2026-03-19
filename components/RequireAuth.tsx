'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Wait for auth to initialize (user could be null while loading from storage)
    if (user === null && !isLoggedIn) {
      // Small delay to let AuthContext restore from localStorage
      const timer = setTimeout(() => {
        if (!isLoggedIn) {
          router.replace(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, user, router]);

  if (!isLoggedIn) return null;

  return <>{children}</>;
}
