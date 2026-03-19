'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'vi' | 'en';
type Currency = 'VND' | 'USD';

interface LocaleContextType {
  language: Language;
  currency: Currency;
  setLanguage: (lang: Language) => void;
  setCurrency: (curr: Currency) => void;
  t: (key: string) => string;
  formatPrice: (price: number) => string;
  convertPrice: (priceVND: number) => number;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const USD_TO_VND_RATE = 24000;

const translations: Record<Language, Record<string, string>> = {
  vi: {
    'home': 'Trang chủ',
    'products': 'Sản phẩm',
    'pricing': 'Bảng giá',
    'blog': 'Blog',
    'contact': 'Liên hệ',
    'login': 'Đăng nhập',
    'logout': 'Đăng xuất',
    'cart': 'Giỏ hàng',
    'checkout': 'Thanh toán',
    'myServices': 'Dịch vụ của tôi',
    'myOrders': 'Đơn hàng',
    'myTickets': 'Ticket hỗ trợ',
    'profile': 'Thông tin cá nhân',
    'affiliate': 'Affiliate',
    'portal': 'Portal',
    'support': 'Hỗ trợ',
    'welcomeTitle': 'Giải pháp Hosting & VPS chuyên nghiệp',
    'welcomeSubtitle': 'Hiệu suất cao, bảo mật tối ưu, hỗ trợ 24/7',
    'getStarted': 'Bắt đầu ngay',
    'learnMore': 'Tìm hiểu thêm',
    'features': 'Tính năng',
    'testimonials': 'Đánh giá',
    'faq': 'Câu hỏi thường gặp',
    'selectPlan': 'Chọn gói',
    'addToCart': 'Thêm vào giỏ',
    'buyNow': 'Mua ngay',
    'month': 'tháng',
    'year': 'năm',
    'ordersManagement': 'Quản lý đơn hàng',
    'leadManagement': 'Quản lý Lead',
    'serverManagement': 'Quản lý Server',
    'userManagement': 'Quản lý người dùng',
    'settings': 'Cài đặt',
    'dashboard': 'Dashboard',
    'expirationAlerts': 'Cảnh báo hết hạn',
    'tickets': 'Tickets',
    'vouchers': 'Vouchers',
    'save': 'Lưu',
    'cancel': 'Hủy',
    'edit': 'Sửa',
    'delete': 'Xóa',
    'view': 'Xem',
    'search': 'Tìm kiếm',
    'filter': 'Lọc',
    'status': 'Trạng thái',
    'active': 'Hoạt động',
    'inactive': 'Không hoạt động',
    'pending': 'Chờ xử lý',
    'confirmed': 'Đã xác nhận',
    'cancelled': 'Đã hủy',
    'total': 'Tổng cộng',
    'subtotal': 'Tạm tính',
    'discount': 'Giảm giá',
    'name': 'Tên',
    'email': 'Email',
    'phone': 'Số điện thoại',
    'address': 'Địa chỉ',
    'company': 'Công ty',
    'password': 'Mật khẩu',
    'confirmPassword': 'Xác nhận mật khẩu',
    'changePassword': 'Đổi mật khẩu',
    'updateProfile': 'Cập nhật thông tin'
  },
  en: {
    'home': 'Home',
    'products': 'Products',
    'pricing': 'Pricing',
    'blog': 'Blog',
    'contact': 'Contact',
    'login': 'Login',
    'logout': 'Logout',
    'cart': 'Cart',
    'checkout': 'Checkout',
    'myServices': 'My Services',
    'myOrders': 'My Orders',
    'myTickets': 'My Tickets',
    'profile': 'Profile',
    'affiliate': 'Affiliate',
    'portal': 'Portal',
    'support': 'Support',
    'welcomeTitle': 'Professional Hosting & VPS Solutions',
    'welcomeSubtitle': 'High performance, optimized security, 24/7 support',
    'getStarted': 'Get Started',
    'learnMore': 'Learn More',
    'features': 'Features',
    'testimonials': 'Testimonials',
    'faq': 'FAQ',
    'selectPlan': 'Select Plan',
    'addToCart': 'Add to Cart',
    'buyNow': 'Buy Now',
    'month': 'month',
    'year': 'year',
    'ordersManagement': 'Orders Management',
    'leadManagement': 'Lead Management',
    'serverManagement': 'Server Management',
    'userManagement': 'User Management',
    'settings': 'Settings',
    'dashboard': 'Dashboard',
    'expirationAlerts': 'Expiration Alerts',
    'tickets': 'Tickets',
    'vouchers': 'Vouchers',
    'save': 'Save',
    'cancel': 'Cancel',
    'edit': 'Edit',
    'delete': 'Delete',
    'view': 'View',
    'search': 'Search',
    'filter': 'Filter',
    'status': 'Status',
    'active': 'Active',
    'inactive': 'Inactive',
    'pending': 'Pending',
    'confirmed': 'Confirmed',
    'cancelled': 'Cancelled',
    'total': 'Total',
    'subtotal': 'Subtotal',
    'discount': 'Discount',
    'name': 'Name',
    'email': 'Email',
    'phone': 'Phone',
    'address': 'Address',
    'company': 'Company',
    'password': 'Password',
    'confirmPassword': 'Confirm Password',
    'changePassword': 'Change Password',
    'updateProfile': 'Update Profile'
  }
};

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('vi');
  const [currency, setCurrency] = useState<Currency>('VND');

  useEffect(() => {
    const browserLang = navigator.language.toLowerCase();
    const detectedLang: Language = browserLang.startsWith('vi') ? 'vi' : 'en';
    setLanguage(detectedLang);

    const savedLang = localStorage.getItem('language') as Language;
    const savedCurr = localStorage.getItem('currency') as Currency;

    if (savedLang) setLanguage(savedLang);
    if (savedCurr) setCurrency(savedCurr);
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const handleSetCurrency = (curr: Currency) => {
    setCurrency(curr);
    localStorage.setItem('currency', curr);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const convertPrice = (priceVND: number): number => {
    if (currency === 'USD') {
      return Math.round(priceVND / USD_TO_VND_RATE * 100) / 100;
    }
    return priceVND;
  };

  const formatPrice = (price: number): string => {
    const convertedPrice = convertPrice(price);

    if (currency === 'USD') {
      return `$${convertedPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    return `${convertedPrice.toLocaleString('vi-VN')}đ`;
  };

  return (
    <LocaleContext.Provider
      value={{
        language,
        currency,
        setLanguage: handleSetLanguage,
        setCurrency: handleSetCurrency,
        t,
        formatPrice,
        convertPrice
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider');
  }
  return context;
}
