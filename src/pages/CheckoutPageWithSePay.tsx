import { useState } from 'react';
import { Check, Tag, CreditCard, QrCode } from 'lucide-react';
import { HostingPlan, vouchers } from '../data/mockData';
import SePayQRModal from '../components/SePayQRModal';
import { sePayService } from '../services/sepay';
import type { PaymentIntent, PaymentMethod } from '../types/payment';
import { createMyOrder, updateOrder } from '../services/orders';

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

export default function CheckoutPageWithSePay({ cart, onClearCart, onNavigate }: CheckoutPageProps) {
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
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('sepay');
  const [showSePayModal, setShowSePayModal] = useState(false);
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderRecordId, setOrderRecordId] = useState<string | null>(null);
  const [orderCode, setOrderCode] = useState<string | null>(null);

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
      return Math.min(
        (subtotal * appliedVoucher.discountValue) / 100,
        appliedVoucher.maxDiscount
      );
    }
    return appliedVoucher.discountValue;
  };

  const discount = calculateDiscount();
  const total = subtotal - discount;

  const handleCreatePaymentIntent = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }

    setIsProcessing(true);

    try {
      // 1) Tạo đơn hàng trên hệ thống trước khi tạo QR
      const createdOrder = await createMyOrder({
        gia_tri: String(total),
        thanh_toan: 'cho_thanh_toan',
        trang_thai_su_dung: 'tat_tam_thoi',
        ghi_chu_noi_bo: `Khách: ${formData.name} | Email: ${formData.email} | Phone: ${formData.phone} | Domain: ${formData.domain || ''}`
      });

      const orderId = createdOrder.ma_don_hang || createdOrder.id;
      setOrderRecordId(createdOrder.id);
      setOrderCode(orderId);

      // 2) Tạo payment intent với SePay
      const sePayResponse = await sePayService.createPayment({
        orderId,
        amount: total,
        description: `Thanh toán đơn hàng ${orderId} - ${formData.name}`,
        returnUrl: `${window.location.origin}/?page=my-orders`,
        callbackUrl: `${window.location.origin}/api/payments/webhook`,
        expiresIn: 15 * 60
      });

      if (!sePayResponse.success) {
        throw new Error('Không thể tạo mã QR thanh toán');
      }

      const newPaymentIntent: PaymentIntent = {
        id: `PI-${Date.now()}`,
        orderId,
        amount: total,
        method: paymentMethod,
        status: 'PENDING',
        transactionRef: sePayResponse.transactionRef,
        qrUrl: sePayResponse.qrUrl,
        qrImage: sePayResponse.qrImage,
        deepLink: sePayResponse.deepLink || null,
        expiresAt: sePayResponse.expiresAt,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      localStorage.setItem(`payment_${orderId}`, JSON.stringify({
        paymentIntent: newPaymentIntent,
        orderData: {
          orderId,
          items: cart,
          customer: formData,
          subtotal,
          discount,
          total,
          voucher: appliedVoucher
        }
      }));

      setPaymentIntent(newPaymentIntent);
      setShowSePayModal(true);
    } catch (error) {
      console.error('Payment intent creation error:', error);
      alert('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentSuccess = async () => {
    setShowSePayModal(false);

    // 3) Cập nhật trạng thái đơn hàng => đã thanh toán
    try {
      if (orderRecordId) {
        await updateOrder(orderRecordId, { thanh_toan: 'da_thanh_toan', trang_thai_su_dung: 'dang_su_dung' });
      }
    } catch (err) {
      console.error('Không thể cập nhật trạng thái đơn hàng sau thanh toán:', err);
    }

    onClearCart();
    onNavigate('my-orders');
  };

  const handleRegenerateQR = async () => {
    if (!paymentIntent) return;

    setShowSePayModal(false);
    await handleCreatePaymentIntent();
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (paymentMethod === 'sepay') {
      await handleCreatePaymentIntent();
    } else {
      alert('Phương thức thanh toán này đang được phát triển');
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
                    Tên miền (nếu có)
                  </label>
                  <input
                    type="text"
                    value={formData.domain}
                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="example.com"
                  />
                </div>
              </form>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Phương thức thanh toán</h2>

              <div className="space-y-3">
                <div
                  onClick={() => setPaymentMethod('sepay')}
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                    paymentMethod === 'sepay'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <QrCode className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">SePay - QR Bank</p>
                        <p className="text-sm text-gray-600">Quét mã QR để thanh toán</p>
                      </div>
                    </div>
                    {paymentMethod === 'sepay' && (
                      <Check className="h-6 w-6 text-blue-600" />
                    )}
                  </div>
                </div>

                <div
                  onClick={() => setPaymentMethod('vnpay')}
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                    paymentMethod === 'vnpay'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-orange-100 p-2 rounded-lg">
                        <CreditCard className="h-6 w-6 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">VNPay</p>
                        <p className="text-sm text-gray-600">Đang phát triển</p>
                      </div>
                    </div>
                    {paymentMethod === 'vnpay' && (
                      <Check className="h-6 w-6 text-blue-600" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-4 space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Tóm tắt đơn hàng</h2>

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
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                    placeholder="Nhập mã giảm giá"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleApplyVoucher}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Áp dụng
                  </button>
                </div>
                {voucherError && (
                  <p className="text-sm text-red-600 mb-2">{voucherError}</p>
                )}
                {appliedVoucher && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                    <p className="text-sm text-green-800 font-semibold">
                      ✓ Mã "{appliedVoucher.code}" đã được áp dụng
                    </p>
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
                {isProcessing ? 'Đang xử lý...' : 'Thanh toán ngay'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {paymentIntent && (
        <SePayQRModal
          isOpen={showSePayModal}
          onClose={() => setShowSePayModal(false)}
          paymentIntent={paymentIntent}
          onPaymentSuccess={handlePaymentSuccess}
          onRegenerateQR={handleRegenerateQR}
        />
      )}
    </div>
  );
}
