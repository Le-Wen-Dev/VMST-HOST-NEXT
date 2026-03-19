'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ShoppingCart, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isLoggedIn, isAdmin } = useAuth();
  const { cart } = useCart();
  const pathname = usePathname();
  const router = useRouter();

  const cartItemCount = cart.length;

  // Ẩn nút Portal khi đang ở khu vực portal
  const inPortalArea = ['/portal', '/profile', '/my-services', '/my-orders', '/my-tickets'].includes(pathname);

  // Hiển thị đúng cột 'name' từ bảng user trên icon người dùng
  const displayName = user?.name || '';

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center cursor-pointer animate-fade-in">
            <Image
              src="/image/logo-vmst-ne.svg"
              alt="VMST Host"
              width={140}
              height={30}
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/pricing"
              className={`text-sm font-medium transition-all hover:scale-105 ${
                pathname === '/pricing' ? 'text-[#034CC9]' : 'text-gray-700 hover:text-[#034CC9]'
              }`}
            >
              Bảng giá
            </Link>

            <Link
              href="/advisor"
              className={`text-sm font-medium transition-all hover:scale-105 ${
                pathname === '/advisor' ? 'text-[#034CC9]' : 'text-gray-700 hover:text-[#034CC9]'
              }`}
            >
              Tư vấn
            </Link>

            <Link
              href="/contact"
              className={`text-sm font-medium transition-all hover:scale-105 ${
                pathname === '/contact' ? 'text-[#034CC9]' : 'text-gray-700 hover:text-[#034CC9]'
              }`}
            >
              Liên hệ
            </Link>

            <Link
              href="/blog"
              className={`text-sm font-medium transition-all hover:scale-105 ${
                pathname === '/blog' ? 'text-[#034CC9]' : 'text-gray-700 hover:text-[#034CC9]'
              }`}
            >
              Blog
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/cart"
              className="relative p-2 text-gray-700 hover:text-[#034CC9] transition-all hover:scale-110"
            >
              <ShoppingCart className="h-4 w-4" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center animate-pulse-slow">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {isLoggedIn ? (
              <Link
                href="/portal"
                className="flex items-center text-xs font-medium text-gray-700 hover:text-[#034CC9] transition-all hover:scale-105"
              >
                <User className="h-4 w-4 mr-1" />
                {displayName || 'Tài khoản'}
              </Link>
            ) : (
              <Link
                href="/login"
                className="flex items-center text-xs font-medium text-gray-700 hover:text-[#034CC9] transition-all hover:scale-105"
              >
                <User className="h-4 w-4 mr-1" />
                Đăng nhập
              </Link>
            )}

            {isAdmin ? (
              <Link
                href="/admin"
                className="bg-orange-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-orange-700 transition-all hover:scale-105"
              >
                Admin
              </Link>
            ) : (
              !inPortalArea && (
                <Link
                  href="/portal"
                  className="bg-[#034CC9] text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-[#0B2B6F] transition-all hover:scale-105"
                >
                  Portal
                </Link>
              )
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-3">
              <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className="text-left px-2 py-2 text-sm font-medium text-gray-700 hover:text-[#034CC9] transition-colors">
                Bảng giá
              </Link>
              <Link href="/advisor" onClick={() => setMobileMenuOpen(false)} className="text-left px-2 py-2 text-sm font-medium text-gray-700 hover:text-[#034CC9] transition-colors">
                Tư vấn
              </Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-left px-2 py-2 text-sm font-medium text-gray-700 hover:text-[#034CC9] transition-colors">
                Liên hệ
              </Link>
              <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="text-left px-2 py-2 text-sm font-medium text-gray-700 hover:text-[#034CC9] transition-colors">
                Blog
              </Link>
              <div className="flex items-center space-x-3 px-2 pt-3 border-t">
                <Link href="/cart" onClick={() => setMobileMenuOpen(false)} className="relative flex items-center text-sm font-medium text-gray-700">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Giỏ hàng {cartItemCount > 0 && `(${cartItemCount})`}
                </Link>
              </div>
              <div className="flex flex-col space-y-2 px-2">
                {isLoggedIn ? (
                  <Link href="/portal" onClick={() => setMobileMenuOpen(false)} className="text-left py-2 text-sm font-medium text-gray-700">
                    <User className="h-5 w-5 inline mr-1" />
                    {displayName || 'Tài khoản'}
                  </Link>
                ) : (
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="text-left py-2 text-sm font-medium text-gray-700">
                    Đăng nhập
                  </Link>
                )}
                {isAdmin ? (
                  <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    Admin
                  </Link>
                ) : (
                  !inPortalArea && (
                    <Link href="/portal" onClick={() => setMobileMenuOpen(false)} className="bg-[#034CC9] text-white px-4 py-2 rounded-lg text-sm font-medium">
                      Portal
                    </Link>
                  )
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
