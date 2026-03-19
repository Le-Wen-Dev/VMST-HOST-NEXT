import { Trash2, ShoppingCart, ArrowRight, Check } from 'lucide-react';
import { HostingPlan } from '../data/mockData';
import { formatMoneyVN } from '../utils/format';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

interface CartItem {
  plan: HostingPlan;
  duration: string;
  price: number;
}

interface CartPageProps {
  cart: CartItem[];
  onRemoveFromCart: (index: number) => void;
  onNavigate: (page: string) => void;
}

export default function CartPage({ cart, onRemoveFromCart, onNavigate }: CartPageProps) {
  const { isLoggedIn } = useAuth();
  const { showWarning, showError, showSuccess } = useToast();
  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const total = subtotal;

  const getDurationLabel = (duration: string) => {
    if (duration === 'monthly') return '1 tháng';
    if (duration === 'quarterly') return '3 tháng';
    return '12 tháng';
  };

  // Lấy thông tin Backup từ features (từ admin checkboxes)
  const getBackupInfo = (plan: HostingPlan): string => {
    if (!Array.isArray(plan.features) || plan.features.length === 0) {
      // Fallback: kiểm tra plan.backup nếu có
      return plan.backup || 'Không có';
    }
    
    // Tìm các từ khóa liên quan đến backup trong features array
    const backupKeywords = ['Daily Backups', 'Backup', 'backup', 'Backups', 'Hàng ngày', 'Hàng tuần'];
    const backupFeature = plan.features.find(f => {
      const featureStr = String(f).toLowerCase();
      return backupKeywords.some(keyword => featureStr.includes(keyword.toLowerCase()));
    });
    
    if (backupFeature) {
      // Extract thông tin từ feature
      const featureStr = String(backupFeature).toLowerCase();
      if (featureStr.includes('daily') || featureStr.includes('hàng ngày')) return 'Hàng ngày';
      if (featureStr.includes('weekly') || featureStr.includes('hàng tuần')) return 'Hàng tuần';
      if (featureStr.includes('monthly') || featureStr.includes('hàng tháng')) return 'Hàng tháng';
      // Trả về feature gốc nếu không match pattern nào
      return String(backupFeature);
    }
    
    // Fallback: kiểm tra plan.backup nếu có
    if (plan.backup) {
      return plan.backup;
    }
    
    return 'Không có';
  };

  // Lấy thông tin Hỗ trợ từ features (từ admin checkboxes)
  const getSupportInfo = (plan: HostingPlan): string => {
    if (!Array.isArray(plan.features) || plan.features.length === 0) {
      // Fallback: kiểm tra plan.support nếu có
      return plan.support || 'Không có';
    }
    
    // Tìm các từ khóa liên quan đến support trong features array
    const supportKeywords = ['VIP Support 24/7', 'VIP Support', 'Support', 'support', '24/7', 'Hỗ trợ'];
    const supportFeature = plan.features.find(f => {
      const featureStr = String(f).toLowerCase();
      return supportKeywords.some(keyword => featureStr.includes(keyword.toLowerCase()));
    });
    
    if (supportFeature) {
      // Extract thông tin từ feature
      const featureStr = String(supportFeature).toLowerCase();
      if (featureStr.includes('vip support 24/7') || (featureStr.includes('vip') && featureStr.includes('24/7'))) {
        return 'VIP 24/7';
      }
      if (featureStr.includes('24/7')) return '24/7';
      if (featureStr.includes('vip')) return 'VIP 24/7';
      if (featureStr.includes('priority') || featureStr.includes('ưu tiên')) return 'Ưu tiên 24/7';
      // Trả về feature gốc nếu không match pattern nào
      return String(supportFeature);
    }
    
    // Fallback: kiểm tra plan.support nếu có
    if (plan.support) {
      return plan.support;
    }
    
    return 'Không có';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0B2B6F] mb-2">Giỏ hàng</h1>
          <p className="text-gray-600">Kiểm tra lại đơn hàng trước khi thanh toán</p>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Giỏ hàng trống</h2>
            <p className="text-gray-500 mb-6">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
            <button
              onClick={() => onNavigate('pricing')}
              className="bg-[#034CC9] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0B2B6F] transition-colors"
            >
              Xem sản phẩm
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                {cart.map((item, index) => (
                  <div key={index} className="p-6 border-b last:border-b-0">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-[#0B2B6F] mb-1">
                              {item.plan.name}
                            </h3>
                            <p className="text-sm text-gray-600 mb-3">
                              {item.plan.type === 'wordpress' ? 'WordPress Hosting' : item.plan.type === 'business' ? 'Business Hosting' : 'Email Domain'}
                            </p>
                          </div>
                          <button
                            onClick={() => onRemoveFromCart(index)}
                            className="text-red-500 hover:text-red-700 transition-colors p-2"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                        {/* Specs overview */}
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Kỳ hạn</p>
                            <p className="font-semibold text-gray-900">{getDurationLabel(item.duration)}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Dung lượng</p>
                            <p className="font-semibold text-gray-900">{item.plan.storage}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Băng thông</p>
                            <p className="font-semibold text-gray-900">{item.plan.bandwidth}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Website</p>
                            <p className="font-semibold text-gray-900">{item.plan.websites}</p>
                          </div>
                          {typeof item.plan.emails !== 'undefined' && (
                            <div>
                              <p className="text-gray-500">Email</p>
                              <p className="font-semibold text-gray-900">{item.plan.emails}</p>
                            </div>
                          )}
                          <div>
                            <p className="text-gray-500">Backup</p>
                            <p className="font-semibold text-gray-900">{getBackupInfo(item.plan)}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Hỗ trợ</p>
                            <p className="font-semibold text-gray-900">{getSupportInfo(item.plan)}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">SLA</p>
                            <p className="font-semibold text-gray-900">{item.plan.sla}</p>
                          </div>
                        </div>
                        {/* Feature list */}
                        {Array.isArray(item.plan.features) && item.plan.features.length > 0 && (
                          <ul className="space-y-2 mt-4">
                            {item.plan.features.slice(0, 8).map((f, i) => (
                              <li key={i} className="flex items-start text-sm text-gray-700">
                                <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t flex justify-between items-center">
                      <span className="text-gray-600">Giá</span>
                      <span className="text-2xl font-bold text-[#034CC9] flex items-baseline">
                        {formatMoneyVN(item.price)}đ
                        <span className="text-gray-500 ml-2 text-base">{(item.plan as any)?.unit || ''}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-bold text-[#0B2B6F] mb-6">Tóm tắt đơn hàng</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Tạm tính</span>
                    <span className="font-semibold">{formatMoneyVN(subtotal)}đ</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>VAT (0%)</span>
                    <span className="font-semibold">0₫</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Tổng cộng</span>
                    <span className="text-2xl font-bold text-[#034CC9]">
                      {formatMoneyVN(total)}đ
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (!isLoggedIn) {
                      showWarning('Vui lòng đăng ký tài khoản và đăng nhập để mua hàng.');
                      onNavigate('login');
                    } else {
                      onNavigate('checkout');
                    }
                  }}
                  className="w-full bg-[#034CC9] text-white py-4 rounded-lg font-semibold hover:bg-[#0B2B6F] transition-colors flex items-center justify-center mb-3"
                >
                  Thanh toán
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>

                <button
                  onClick={() => onNavigate('pricing')}
                  className="w-full bg-white text-[#034CC9] border-2 border-[#034CC9] py-3 rounded-lg font-semibold hover:bg-[#E6EEFF] transition-colors"
                >
                  Mua thêm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
