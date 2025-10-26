import { useState } from 'react';
import { Menu, X, ShoppingCart, User, Server } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  cartItemCount?: number;
  isAdmin?: boolean;
}

export default function Header({ onNavigate, currentPage, cartItemCount = 0, isAdmin = false }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isLoggedIn } = useAuth();

  // Ẩn nút Portal khi đang ở khu vực portal
  const inPortalArea = ['portal', 'profile', 'my-services', 'my-orders', 'my-tickets'].includes(currentPage);

  const displayName = (user?.ten || user?.name || user?.email || '').split('@')[0];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
            <Server className="h-8 w-8 text-[#034CC9]" />
            <span className="ml-2 text-xl font-bold text-[#034CC9]">VMST Host</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onNavigate('pricing')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'pricing' ? 'text-[#034CC9]' : 'text-gray-700 hover:text-[#034CC9]'
              }`}
            >
              Bảng giá
            </button>

            <button
              onClick={() => onNavigate('advisor')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'advisor' ? 'text-[#034CC9]' : 'text-gray-700 hover:text-[#034CC9]'
              }`}
            >
              Tư vấn
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'contact' ? 'text-[#034CC9]' : 'text-gray-700 hover:text-[#034CC9]'
              }`}
            >
              Liên hệ
            </button>

            <button
              onClick={() => onNavigate('blog')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'blog' ? 'text-[#034CC9]' : 'text-gray-700 hover:text-[#034CC9]'
              }`}
            >
              Blog
            </button>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => onNavigate('cart')}
              className="relative p-2 text-gray-700 hover:text-[#034CC9] transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {isLoggedIn ? (
              <button
                onClick={() => onNavigate('portal')}
                className="flex items-center text-sm font-medium text-gray-700 hover:text-[#034CC9] transition-colors"
              >
                <User className="h-5 w-5 mr-1" />
                {displayName || 'Tài khoản'}
              </button>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                className="flex items-center text-sm font-medium text-gray-700 hover:text-[#034CC9] transition-colors"
              >
                <User className="h-5 w-5 mr-1" />
                Đăng nhập
              </button>
            )}

            {isAdmin ? (
              <button
                onClick={() => onNavigate('admin')}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors"
              >
                Admin
              </button>
            ) : (
              !inPortalArea && (
                <button
                  onClick={() => onNavigate('portal')}
                  className="bg-[#034CC9] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0B2B6F] transition-colors"
                >
                  Portal
                </button>
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
              <button onClick={() => { onNavigate('pricing'); setMobileMenuOpen(false); }} className="text-left px-2 py-2 text-sm font-medium text-gray-700 hover:text-[#034CC9] transition-colors">
                Bảng giá
              </button>
              <button onClick={() => { onNavigate('advisor'); setMobileMenuOpen(false); }} className="text-left px-2 py-2 text-sm font-medium text-gray-700 hover:text-[#034CC9] transition-colors">
                Tư vấn
              </button>
              <button onClick={() => { onNavigate('contact'); setMobileMenuOpen(false); }} className="text-left px-2 py-2 text-sm font-medium text-gray-700 hover:text-[#034CC9] transition-colors">
                Liên hệ
              </button>
              <button onClick={() => { onNavigate('blog'); setMobileMenuOpen(false); }} className="text-left px-2 py-2 text-sm font-medium text-gray-700 hover:text-[#034CC9] transition-colors">
                Blog
              </button>
              <div className="flex items-center space-x-3 px-2 pt-3 border-t">
                <button onClick={() => { onNavigate('cart'); setMobileMenuOpen(false); }} className="relative flex items-center text-sm font-medium text-gray-700">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Giỏ hàng {cartItemCount > 0 && `(${cartItemCount})`}
                </button>
              </div>
              <div className="flex flex-col space-y-2 px-2">
                {isLoggedIn ? (
                  <button onClick={() => { onNavigate('portal'); setMobileMenuOpen(false); }} className="text-left py-2 text-sm font-medium text-gray-700">
                    <User className="h-5 w-5 inline mr-1" />
                    {displayName || 'Tài khoản'}
                  </button>
                ) : (
                  <button onClick={() => { onNavigate('login'); setMobileMenuOpen(false); }} className="text-left py-2 text-sm font-medium text-gray-700">
                    Đăng nhập
                  </button>
                )}
                {isAdmin ? (
                  <button onClick={() => { onNavigate('admin'); setMobileMenuOpen(false); }} className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    Admin
                  </button>
                ) : (
                  !inPortalArea && (
                    <button onClick={() => { onNavigate('portal'); setMobileMenuOpen(false); }} className="bg-[#034CC9] text-white px-4 py-2 rounded-lg text-sm font-medium">
                      Portal
                    </button>
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
