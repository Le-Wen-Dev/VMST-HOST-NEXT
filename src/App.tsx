import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import AdvisorPage from './pages/AdvisorPage';
import PricingPage from './pages/PricingPage';
import CartPage from './pages/CartPage';
import CheckoutPageWithSePay from './pages/CheckoutPageWithSePay';
import PaymentQRPage from './pages/PaymentQRPage.tsx';
import LoginPage from './pages/LoginPage';
import PortalPage from './pages/PortalPage';
import SupportPage from './pages/SupportPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import BlogCategoryPage from './pages/BlogCategoryPage';
import BlogCategoriesPage from './pages/BlogCategoriesPage';
import ContactPage from './pages/ContactPage';
import ProfilePage from './pages/ProfilePage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import MyServicesPage from './pages/MyServicesPage';
import MyOrdersPage from './pages/MyOrdersPage';
import MyTicketsPage from './pages/MyTicketsPage';
import AffiliatePage from './pages/AffiliatePage';
import AdminDashboard from './pages/admin/AdminDashboard';
import ChatWidget from './components/ChatWidget';
import { LocaleProvider } from './contexts/LocaleContext';
import { wordpressPlans, businessPlans, emailPlans, HostingPlan } from './data/mockData';
import { useAuth } from './contexts/AuthContext';
import FloatingContacts from './components/FloatingContacts';
import SnowEffect from './components/SnowEffect';

interface CartItem {
  plan: HostingPlan;
  duration: string;
  price: number;
}

interface PageParams {
  slug?: string;
  category?: string;
  orderId?: string;
  amount?: number;
}

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [pageParams, setPageParams] = useState<PageParams>({});
  const [cart, setCart] = useState<CartItem[]>([]);
  const { isLoggedIn, isAdmin, logout } = useAuth();

  // Đồng bộ state với URL khi load và khi back/forward (popstate)
  useEffect(() => {
    const syncFromLocation = (event?: PopStateEvent) => {
      // Nếu có state từ history, dùng state đó
      if (event?.state && event.state.page) {
        setCurrentPage(event.state.page);
        if (event.state.params) {
          setPageParams(event.state.params);
        }
        return;
      }

      // Nếu không có state, parse từ URL
      const path = window.location.pathname;
      if (path.startsWith('/admin')) {
        setCurrentPage('admin');
        return;
      }
      if (path.startsWith('/blog/')) {
        const parts = path.split('/').filter(Boolean);
        if (parts[1] === 'category' && parts[2]) {
          setCurrentPage('blog-category');
          setPageParams({ category: parts[2] });
          return;
        }
        if (parts[1]) {
          setCurrentPage('blog-post');
          setPageParams({ slug: parts[1] });
          return;
        }
      }
      const map: Record<string, string> = {
        '/': 'home',
        '/pricing': 'pricing',
        '/advisor': 'advisor',
        '/contact': 'contact',
        '/blog': 'blog',
        '/blog/categories': 'blog-categories',
        '/cart': 'cart',
        '/payment-qr': 'payment-qr',
        '/login': 'login',
        '/portal': 'portal',
        '/profile': 'profile',
        '/my-services': 'my-services',
        '/my-orders': 'my-orders',
        '/my-tickets': 'my-tickets',
        '/affiliate': 'affiliate',
        '/support': 'support',
        '/terms': 'terms',
        '/privacy-policy': 'privacy-policy',
      };
      if (map[path]) setCurrentPage(map[path]);
    };

    // Initial sync
    syncFromLocation();

    // Listen to back/forward navigation
    window.addEventListener('popstate', syncFromLocation);
    return () => window.removeEventListener('popstate', syncFromLocation);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleNavigate = (page: string, params?: PageParams) => {
    // Update URL for all pages
    const pageToPath: Record<string, (p?: PageParams) => string> = {
      home: () => '/',
      pricing: () => '/pricing',
      advisor: () => '/advisor',
      contact: () => '/contact',
      blog: () => '/blog',
      'blog-categories': () => '/blog/categories',
      cart: () => '/cart',
      'payment-qr': () => '/payment-qr',
      login: () => '/login',
      portal: () => '/portal',
      profile: () => '/profile',
      'my-services': () => '/my-services',
      'my-orders': () => '/my-orders',
      'my-tickets': () => '/my-tickets',
      affiliate: () => '/affiliate',
      support: () => '/support',
      terms: () => '/terms',
      'privacy-policy': () => '/privacy-policy',
      'blog-post': (pp) => `/blog/${pp?.slug || ''}`,
      'blog-category': (pp) => `/blog/category/${pp?.category || ''}`,
      admin: () => '/admin',
    };
    const toPath = pageToPath[page]?.(params);
    if (toPath) {
      // Lưu state vào history để có thể back đúng cách
      window.history.pushState({ page, params }, '', toPath);
    }

    setCurrentPage(page);
    if (params) {
      setPageParams(params);
    }
  };

  const handleAddToCart = (plan: HostingPlan, duration: string) => {
    const durationMap = {
      monthly: 'monthly',
      quarterly: 'quarterly',
      yearly: 'yearly'
    };

    const durationKey = durationMap[duration as keyof typeof durationMap] || duration;
    const price = plan.price[durationKey as 'monthly' | 'quarterly' | 'yearly'];

    setCart([...cart, { plan, duration, price }]);
    setCurrentPage('cart');
  };

  const handleRemoveFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleLogout = () => {
    logout();
    setCurrentPage('home');
  };

  const renderPage = () => {
    if (isAdmin && currentPage === 'admin') {
      return <AdminDashboard onNavigate={handleNavigate} onLogout={handleLogout} />;
    }

    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} onAddToCart={handleAddToCart} />;

      case 'wordpress-hosting':
        return <ProductPage productType="wordpress" plans={wordpressPlans} onAddToCart={handleAddToCart} />;

      case 'business-hosting':
        return <ProductPage productType="business" plans={businessPlans} onAddToCart={handleAddToCart} />;

      case 'email-domain':
        return <ProductPage productType="email" plans={emailPlans} onAddToCart={handleAddToCart} />;

      case 'advisor':
        return <AdvisorPage onNavigate={handleNavigate} onAddToCart={handleAddToCart} />;

      case 'pricing':
        return <PricingPage onNavigate={handleNavigate} onAddToCart={handleAddToCart} />;

      case 'cart':
        return <CartPage cart={cart} onRemoveFromCart={handleRemoveFromCart} onNavigate={handleNavigate} />;

      case 'checkout':
        return <CheckoutPageWithSePay cart={cart} onClearCart={handleClearCart} onNavigate={handleNavigate} />;

      case 'payment-qr':
        return (
          <PaymentQRPage
            orderId={pageParams.orderId || ''}
            amount={pageParams.amount || 0}
            onNavigate={handleNavigate}
          />
        );

      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;

      case 'portal':
        if (!isLoggedIn) {
          return <LoginPage onNavigate={handleNavigate} />;
        }
        return <PortalPage onNavigate={handleNavigate} onLogout={handleLogout} />;

      case 'profile':
        if (!isLoggedIn) {
          return <LoginPage onNavigate={handleNavigate} />;
        }
        return <ProfilePage onNavigate={handleNavigate} />;

      case 'my-services':
        if (!isLoggedIn) {
          return <LoginPage onNavigate={handleNavigate} />;
        }
        return <MyServicesPage onNavigate={handleNavigate} />;

      case 'my-orders':
        if (!isLoggedIn) {
          return <LoginPage onNavigate={handleNavigate} />;
        }
        return <MyOrdersPage onNavigate={handleNavigate} highlightOrderId={pageParams.orderId} />;

      case 'my-tickets':
        if (!isLoggedIn) {
          return <LoginPage onNavigate={handleNavigate} />;
        }
        return <MyTicketsPage onNavigate={handleNavigate} />;

      case 'affiliate':
        if (!isLoggedIn) {
          return <LoginPage onNavigate={handleNavigate} />;
        }
        return <AffiliatePage onNavigate={handleNavigate} />;

      case 'support':
        return <SupportPage onNavigate={handleNavigate} />;

      case 'blog':
        return <BlogPage onNavigate={handleNavigate} />;

      case 'blog-categories':
        return <BlogCategoriesPage onNavigate={handleNavigate} />;

      case 'blog-post':
        return <BlogPostPage slug={pageParams.slug || ''} onNavigate={handleNavigate} />;

      case 'blog-category':
        return <BlogCategoryPage categorySlug={pageParams.category || ''} onNavigate={handleNavigate} />;

      case 'contact':
        return <ContactPage />;

      case 'terms':
        return <TermsOfServicePage />;

      case 'privacy-policy':
        return <PrivacyPolicyPage />;

      default:
        return <HomePage onNavigate={handleNavigate} onAddToCart={handleAddToCart} />;
    }
  };

  return (
    <LocaleProvider>
      <div className="min-h-screen bg-white flex flex-col">
        {currentPage !== 'admin' && <SnowEffect />}
        {currentPage !== 'admin' && (
          <Header
            onNavigate={handleNavigate}
            currentPage={currentPage}
            cartItemCount={cart.length}
            isAdmin={isAdmin}
          />
        )}

      <main className="flex-1">
        {renderPage()}
      </main>

        {currentPage !== 'admin' && <Footer onNavigate={handleNavigate} />}
        {currentPage !== 'admin' && <ChatWidget />}
        {currentPage !== 'admin' && <FloatingContacts />}
      </div>
    </LocaleProvider>
  );
}

export default App;
