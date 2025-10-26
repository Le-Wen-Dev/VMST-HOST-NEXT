import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import AdvisorPage from './pages/AdvisorPage';
import PricingPage from './pages/PricingPage';
import CartPage from './pages/CartPage';
import CheckoutPageWithSePay from './pages/CheckoutPageWithSePay';
import LoginPage from './pages/LoginPage';
import PortalPage from './pages/PortalPage';
import SupportPage from './pages/SupportPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import BlogCategoryPage from './pages/BlogCategoryPage';
import ContactPage from './pages/ContactPage';
import ProfilePage from './pages/ProfilePage';
import MyServicesPage from './pages/MyServicesPage';
import MyOrdersPage from './pages/MyOrdersPage';
import MyTicketsPage from './pages/MyTicketsPage';
import AffiliatePage from './pages/AffiliatePage';
import AdminDashboard from './pages/admin/AdminDashboard';
import ChatWidget from './components/ChatWidget';
import { LocaleProvider } from './contexts/LocaleContext';
import { wordpressPlans, businessPlans, emailPlans, HostingPlan } from './data/mockData';

interface CartItem {
  plan: HostingPlan;
  duration: string;
  price: number;
}

interface PageParams {
  slug?: string;
  category?: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [pageParams, setPageParams] = useState<PageParams>({});
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleNavigate = (page: string, params?: PageParams) => {
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

  const handleLogin = (email: string) => {
    setIsLoggedIn(true);
    if (email.includes('admin')) {
      setIsAdmin(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
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

      case 'login':
        return <LoginPage onLogin={handleLogin} onNavigate={handleNavigate} />;

      case 'portal':
        // Auto-login for demo - no authentication required
        if (!isLoggedIn) {
          handleLogin('demo@vmst.host');
        }
        return <PortalPage onNavigate={handleNavigate} onLogout={handleLogout} />;

      case 'profile':
        if (!isLoggedIn) {
          handleLogin('demo@vmst.host');
        }
        return <ProfilePage onNavigate={handleNavigate} />;

      case 'my-services':
        if (!isLoggedIn) {
          handleLogin('demo@vmst.host');
        }
        return <MyServicesPage onNavigate={handleNavigate} />;

      case 'my-orders':
        if (!isLoggedIn) {
          handleLogin('demo@vmst.host');
        }
        return <MyOrdersPage onNavigate={handleNavigate} />;

      case 'my-tickets':
        if (!isLoggedIn) {
          handleLogin('demo@vmst.host');
        }
        return <MyTicketsPage onNavigate={handleNavigate} />;

      case 'affiliate':
        if (!isLoggedIn) {
          handleLogin('demo@vmst.host');
        }
        return <AffiliatePage onNavigate={handleNavigate} />;

      case 'support':
        return <SupportPage />;

      case 'blog':
        return <BlogPage onNavigate={handleNavigate} />;

      case 'blog-post':
        return <BlogPostPage slug={pageParams.slug || ''} onNavigate={handleNavigate} />;

      case 'blog-category':
        return <BlogCategoryPage categorySlug={pageParams.category || ''} onNavigate={handleNavigate} />;

      case 'contact':
        return <ContactPage />;

      default:
        return <HomePage onNavigate={handleNavigate} onAddToCart={handleAddToCart} />;
    }
  };

  return (
    <LocaleProvider>
      <div className="min-h-screen bg-white flex flex-col">
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
      </div>
    </LocaleProvider>
  );
}

export default App;
