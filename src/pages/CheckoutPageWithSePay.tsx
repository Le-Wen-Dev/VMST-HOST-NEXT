import { useState } from 'react';
import { Tag, QrCode, Check, X } from 'lucide-react';
import { HostingPlan } from '../data/mockData';
import { createMyOrder } from '../services/orders';
import { listProducts } from '../services/products';
import { notifyAdminNewOrder } from '../services/adminNotifications';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { getVoucherByCode, calculateVoucherDiscount, updateVoucher, VoucherRecord } from '../services/vouchers';

interface CartItem {
  plan: HostingPlan;
  duration: string;
  price: number;
}

interface CheckoutPageProps {
  cart: CartItem[];
  onClearCart: () => void;
  onNavigate: (page: string, params?: any) => void;
}

export default function CheckoutPageWithSePay({ cart, onClearCart, onNavigate }: CheckoutPageProps) {
  const { isLoggedIn } = useAuth();
  const { showError, showWarning } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    domain: ''
  });
  const [voucherCode, setVoucherCode] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState<VoucherRecord | null>(null);
  const [voucherError, setVoucherError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isApplyingVoucher, setIsApplyingVoucher] = useState(false);
  // Không hiển thị QR tại trang checkout. Sau khi tạo đơn sẽ chuyển sang trang riêng.
  // Trang thanh toán riêng sẽ sinh QR. Checkout chỉ tạo đơn và chuyển hướng.

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);

  const handleApplyVoucher = async () => {
    if (!voucherCode.trim()) {
      setVoucherError('Vui lòng nhập mã voucher');
      return;
    }

    setIsApplyingVoucher(true);
    setVoucherError('');

    try {
      const voucher = await getVoucherByCode(voucherCode.trim());
      
      if (!voucher) {
        setVoucherError('Mã voucher không hợp lệ');
        setAppliedVoucher(null);
        return;
      }

      // Validate và tính toán discount
      const validation = calculateVoucherDiscount(voucher, subtotal);
      
      if (!validation.isValid) {
        setVoucherError(validation.error || 'Mã voucher không hợp lệ');
        setAppliedVoucher(null);
        return;
      }

      setAppliedVoucher(voucher);
      setVoucherError('');
    } catch (error: any) {
      console.error('Error applying voucher:', error);
      setVoucherError(error?.message || 'Không thể áp dụng voucher');
      setAppliedVoucher(null);
    } finally {
      setIsApplyingVoucher(false);
    }
  };

  const handleRemoveVoucher = () => {
    setAppliedVoucher(null);
    setVoucherCode('');
    setVoucherError('');
  };

  const discount = appliedVoucher 
    ? calculateVoucherDiscount(appliedVoucher, subtotal).discount 
    : 0;
  const total = Math.max(0, subtotal - discount);

  // No dynamic payment intent — we keep a fixed VietQR. Checkout simply creates the order
  // and shows instructions to transfer using the fixed QR/content.

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    // Nếu chưa đăng nhập: hiện toast và chuyển hướng về trang Login
    if (!isLoggedIn) {
      showWarning('Vui lòng đăng ký tài khoản và đăng nhập để mua hàng.');
      onNavigate('login');
      return;
    }
    if (!formData.name || !formData.email || !formData.phone || !formData.domain) {
      showError('Vui lòng điền đầy đủ thông tin bắt buộc (bao gồm tên miền).');
      return;
    }

    setIsProcessing(true);
    try {
      // Tóm tắt gói dịch vụ khách mua để hiển thị ở ghi chú nội bộ cho admin
      const itemsSummary = cart
        .map(ci => `${ci.plan.name} - ${ci.price.toLocaleString('vi-VN')}₫ - ${ci.duration}`)
        .join('; ');

      // Tìm id sản phẩm trong PocketBase theo tên gói để liên kết vào đơn
      const productIds: string[] = [];
      for (const ci of cart) {
        try {
          const res = await listProducts({ perPage: 5, search: ci.plan.name });
          const exact = res.items.find(p => p.ten_san_pham.trim().toLowerCase() === ci.plan.name.trim().toLowerCase());
          if (exact) productIds.push(exact.id);
        } catch (err) {
          console.warn('Không thể lấy sản phẩm để liên kết đơn:', err);
        }
      }

      // Tăng số lượng đã dùng của voucher nếu có
      if (appliedVoucher) {
        try {
          const currentUsed = parseInt(appliedVoucher.da_dung || '0');
          await updateVoucher(appliedVoucher.id, {
            da_dung: String(currentUsed + 1),
          });
        } catch (err) {
          console.warn('Failed to update voucher usage count:', err);
          // Không block checkout nếu update voucher thất bại
        }
      }

      const voucherInfo = appliedVoucher 
        ? ` | Voucher: ${appliedVoucher.code_giam_gia} (Giảm: ${discount.toLocaleString('vi-VN')}₫)`
        : '';

      const createdOrder = await createMyOrder({
        gia_tri: String(total),
        thanh_toan: 'cho_thanh_toan',
        trang_thai_su_dung: 'tat_tam_thoi',
        san_pham: productIds.length ? productIds : undefined,
        ghi_chu_noi_bo: `Khách: ${formData.name} | Email: ${formData.email} | Phone: ${formData.phone} | Domain: ${formData.domain || ''} | Sản phẩm: ${itemsSummary}${voucherInfo} | Tạm tính: ${subtotal.toLocaleString('vi-VN')}₫ | Giảm giá: ${discount.toLocaleString('vi-VN')}₫ | Tổng: ${total.toLocaleString('vi-VN')}₫`
      });

      const orderId = createdOrder.ma_don_hang || createdOrder.id;

      // Notify admin about new order
      try {
        await notifyAdminNewOrder(
          createdOrder,
          {
            customer: {
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              company: formData.company,
              domain: formData.domain,
            },
            items: cart.map(ci => ({ name: ci.plan.name, duration: ci.duration, price: ci.price })),
            totals: { subtotal, discount, total },
          }
        );
      } catch (err) {
        console.warn('Admin notification failed (non-blocking):', err);
      }

      onClearCart();
      // Chuyển hướng tới trang riêng hiển thị mã QR
      onNavigate('payment-qr', { orderId, amount: total });
    } catch (error) {
      console.error('Create order error:', error);
      showError('Đã có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại sau.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Giỏ hàng trống</h2>
            <p className="mt-4 text-gray-600">Vui lòng thêm sản phẩm vào giỏ hàng</p>
            <button
              onClick={() => onNavigate('home')}
              className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Quay lại trang chủ
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Thanh toán</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Thông tin khách hàng</h2>
              <form onSubmit={handleCheckout} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Công ty</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tên miền <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.domain}
                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="example.com"
                  />
                </div>
              </form>
            </div>

            {/* Phương thức thanh toán */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Phương thức thanh toán</h2>

              {/* Thẻ chọn phương thức VietQR (đã được chọn mặc định) */}
              <div className="rounded-2xl border-2 border-blue-500 bg-blue-50 p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center ring-1 ring-blue-300">
                    <QrCode className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-gray-900 font-semibold">VietQR</div>
                    <div className="text-gray-600 text-sm">Quét mã QR để thanh toán</div>
                  </div>
                </div>
                <div className="h-6 w-6 rounded-full border border-blue-400 bg-white flex items-center justify-center text-blue-600">
                  <Check className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-500">Sau khi tạo đơn, hệ thống sẽ chuyển tới trang hiển thị VietQR để bạn quét và thanh toán.</p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-4 space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Tóm tắt đơn hàng</h2>

              {/* Thẻ nhỏ hiển thị phương thức thanh toán */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-800">
                <QrCode className="h-4 w-4" />
                <span className="text-sm font-semibold">Phương thức thanh toán: VietQR</span>
              </div>

              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <div>
                      <p className="font-semibold text-gray-900">{item.plan.name}</p>
                      <p className="text-gray-600">{item.duration}</p>
                    </div>
                    <p className="font-semibold text-gray-900">{item.price.toLocaleString()}₫</p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                {!appliedVoucher ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Tag className="h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={voucherCode}
                        onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                        onKeyPress={(e) => e.key === 'Enter' && handleApplyVoucher()}
                        placeholder="Nhập mã giảm giá"
                        disabled={isApplyingVoucher}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      />
                      <button
                        onClick={handleApplyVoucher}
                        disabled={isApplyingVoucher || !voucherCode.trim()}
                        className="bg-[#034CC9] text-white px-4 py-2 rounded-lg hover:bg-[#0B2B6F] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-sm font-semibold"
                      >
                        {isApplyingVoucher ? 'Đang kiểm tra...' : 'Áp dụng'}
                      </button>
                    </div>
                    {voucherError && (
                      <p className="text-xs text-red-600 flex items-center">
                        <X className="h-3 w-3 mr-1" />
                        {voucherError}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-600" />
                        <p className="text-sm text-green-800 font-semibold">
                          Mã "{appliedVoucher.code_giam_gia}" đã được áp dụng
                        </p>
                      </div>
                      <button
                        onClick={handleRemoveVoucher}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    {appliedVoucher.ten_chien_dich && (
                      <p className="text-xs text-green-700">{appliedVoucher.ten_chien_dich}</p>
                    )}
                  </div>
                )}
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Tạm tính</span>
                  <span>{subtotal.toLocaleString()}₫</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Giảm giá</span>
                    <span>-{discount.toLocaleString()}₫</span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t">
                  <span>Tổng cộng</span>
                  <span>{total.toLocaleString()}₫</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors font-bold text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Đang xử lý...' : 'Tạo đơn và xác nhận'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
