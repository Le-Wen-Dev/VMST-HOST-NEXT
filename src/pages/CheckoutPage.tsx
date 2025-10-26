import { useState } from 'react';
import { Check, Tag } from 'lucide-react';
import { HostingPlan, vouchers } from '../data/mockData';

interface CartItem {
  plan: HostingPlan;
  duration: string;
  price: number;
}

interface CheckoutPageProps {
  cart: CartItem[];
  onClearCart: () => void;
  onNavigate: (page: string) => void;
}

export default function CheckoutPage({ cart, onClearCart, onNavigate }: CheckoutPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    domain: ''
  });
  const [voucherCode, setVoucherCode] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState<any>(null);
  const [voucherError, setVoucherError] = useState('');
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderId, setOrderId] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);

  const handleApplyVoucher = () => {
    const voucher = vouchers.find(v => v.code === voucherCode.toUpperCase() && v.active);

    if (!voucher) {
      setVoucherError('Mã voucher không hợp lệ');
      setAppliedVoucher(null);
      return;
    }

    if (subtotal < voucher.minAmount) {
      setVoucherError(`Đơn hàng tối thiểu ${voucher.minAmount.toLocaleString('vi-VN')}₫`);
      setAppliedVoucher(null);
      return;
    }

    if (voucher.usedCount >= voucher.usageLimit) {
      setVoucherError('Mã voucher đã hết lượt sử dụng');
      setAppliedVoucher(null);
      return;
    }

    setAppliedVoucher(voucher);
    setVoucherError('');
  };

  const calculateDiscount = () => {
    if (!appliedVoucher) return 0;
    if (appliedVoucher.type === 'percentage') {
      return Math.floor(subtotal * (appliedVoucher.value / 100));
    }
    return appliedVoucher.value;
  };

  const discount = calculateDiscount();
  const total = subtotal - discount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrderId = `ORD-${Date.now()}`;
    setOrderId(newOrderId);
    setOrderCompleted(true);
  };

  if (orderCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-[#0B2B6F] mb-4">Đặt hàng thành công!</h1>
            <p className="text-gray-600 mb-2">Mã đơn hàng của bạn:</p>
            <p className="text-2xl font-bold text-[#034CC9] mb-6">{orderId}</p>
            <div className="bg-blue-50 p-6 rounded-lg mb-6 text-left">
              <h3 className="font-semibold text-[#0B2B6F] mb-3">Thông tin đơn hàng đã được gửi đến:</h3>
              <p className="text-gray-700 mb-1"><span className="font-semibold">Email:</span> {formData.email}</p>
              <p className="text-gray-700"><span className="font-semibold">Số điện thoại:</span> {formData.phone}</p>
            </div>
            <p className="text-gray-600 mb-6">
              Chúng tôi sẽ xử lý đơn hàng và gửi thông tin truy cập trong vòng 24h.
              Vui lòng kiểm tra email (kể cả spam folder).
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('portal')}
                className="bg-[#034CC9] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0B2B6F] transition-colors"
              >
                Đi tới Portal
              </button>
              <button
                onClick={() => onNavigate('home')}
                className="bg-white text-[#034CC9] border-2 border-[#034CC9] px-6 py-3 rounded-lg font-semibold hover:bg-[#E6EEFF] transition-colors"
              >
                Về trang chủ
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0B2B6F] mb-2">Thanh toán</h1>
          <p className="text-gray-600">Hoàn tất thông tin để hoàn tất đơn hàng</p>
        </div>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-[#0B2B6F] mb-6">Thông tin khách hàng</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Họ tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034CC9]"
                    placeholder="Nguyễn Văn A"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034CC9]"
                    placeholder="email@example.com"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034CC9]"
                    placeholder="0912345678"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Công ty
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034CC9]"
                    placeholder="Tên công ty"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tên miền (nếu có)
                  </label>
                  <input
                    type="text"
                    value={formData.domain}
                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034CC9]"
                    placeholder="example.com"
                  />
                  <p className="text-sm text-gray-500 mt-1">Nhập domain bạn muốn sử dụng (không bán domain)</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-[#0B2B6F] mb-6">Mã giảm giá</h2>
              <div className="flex gap-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034CC9]"
                    placeholder="Nhập mã giảm giá"
                  />
                  {voucherError && <p className="text-red-500 text-sm mt-2">{voucherError}</p>}
                  {appliedVoucher && (
                    <p className="text-green-600 text-sm mt-2 flex items-center">
                      <Check className="h-4 w-4 mr-1" />
                      Đã áp dụng mã {appliedVoucher.code}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleApplyVoucher}
                  className="bg-[#034CC9] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0B2B6F] transition-colors"
                >
                  <Tag className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-[#0B2B6F] mb-6">Đơn hàng</h2>

              <div className="space-y-4 mb-6">
                {cart.map((item, index) => (
                  <div key={index} className="pb-4 border-b">
                    <p className="font-semibold text-gray-900 mb-1">{item.plan.name}</p>
                    <p className="text-sm text-gray-600">{item.duration === 'monthly' ? '1 tháng' : item.duration === 'quarterly' ? '3 tháng' : '12 tháng'}</p>
                    <p className="text-[#034CC9] font-semibold mt-1">{item.price.toLocaleString('vi-VN')}₫</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b">
                <div className="flex justify-between text-gray-700">
                  <span>Tạm tính</span>
                  <span className="font-semibold">{subtotal.toLocaleString('vi-VN')}₫</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Giảm giá</span>
                    <span className="font-semibold">-{discount.toLocaleString('vi-VN')}₫</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-semibold text-gray-900">Tổng cộng</span>
                <span className="text-2xl font-bold text-[#034CC9]">
                  {total.toLocaleString('vi-VN')}₫
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-[#034CC9] text-white py-4 rounded-lg font-semibold hover:bg-[#0B2B6F] transition-colors"
              >
                Hoàn tất đơn hàng
              </button>

              <p className="text-xs text-gray-500 mt-4 text-center">
                Bằng việc đặt hàng, bạn đồng ý với điều khoản dịch vụ của VMST Host
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
