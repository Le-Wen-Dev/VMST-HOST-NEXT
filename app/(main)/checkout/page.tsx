'use client';

import { useState, useEffect as ReactUseEffect } from 'react';
import React from 'react';
import { Tag, QrCode, Check, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { HostingPlan } from '@/data/mockData';
import { createMyOrder } from '@/services/orders';
import { listProducts } from '@/services/products';
import { notifyAdminNewOrder } from '@/services/adminNotifications';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { useCart, CartItem } from '@/contexts/CartContext';
import { getVoucherByCode, calculateVoucherDiscount, updateVoucher, VoucherRecord } from '@/services/vouchers';
import { checkStudentEmail, markStudentEmailUsed } from '@/services/studentVouchers';

export default function CheckoutPage() {
  const router = useRouter();
  const { isLoggedIn, user } = useAuth();
  const { showError, showWarning, showSuccess } = useToast();
  const { cart, clearCart } = useCart();
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
  const [localCart, setLocalCart] = useState<CartItem[]>(cart);

  ReactUseEffect(() => {
    setLocalCart(cart.map(item => ({
      ...item,
      basePrice: item.basePrice || item.plan.price.monthly,
      months: item.months || 1,
      price: (item.basePrice || item.plan.price.monthly) * (item.months || 1)
    })));
  }, [cart]);

  const subtotal = localCart.reduce((sum, item) => {
    const basePrice = item.basePrice || item.plan.price.monthly;
    const months = item.months || 1;
    return sum + (basePrice * months);
  }, 0);

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

      if (voucher.code_giam_gia.toUpperCase() === 'VOVANMY2026') {
        if (!isLoggedIn || !user?.email) {
          setVoucherError('Vui lòng đăng nhập để sử dụng voucher sinh viên');
          setAppliedVoucher(null);
          return;
        }

        try {
          const checkResult = await checkStudentEmail(user.email);

          if (!checkResult.allowed) {
            setVoucherError('Email của bạn không nằm trong danh sách sinh viên được phép sử dụng voucher này');
            setAppliedVoucher(null);
            return;
          }

          if (checkResult.used) {
            setVoucherError('Email này đã sử dụng voucher rồi. Mỗi sinh viên chỉ được sử dụng 1 lần.');
            setAppliedVoucher(null);
            return;
          }
        } catch (error: any) {
          console.error('Error checking student email:', error);
          setVoucherError('Không thể kiểm tra quyền sử dụng voucher. Vui lòng thử lại.');
          setAppliedVoucher(null);
          return;
        }
      }

      if (voucher.code_giam_gia.toUpperCase() === 'THAYVOVANMY2026' || voucher.id === 'ec9g4exsuulzloe') {
        const ALLOWED_PRODUCT_ID = 'r0oxf1j3clqha2g';
        const invalidProducts: string[] = [];

        for (const item of localCart) {
          let productId: string | null = null;

          if (item.plan.id && item.plan.id !== item.plan.name) {
            productId = item.plan.id;
          } else {
            try {
              const res = await listProducts({ perPage: 5, search: item.plan.name });
              const exact = res.items.find(p => p.ten_san_pham.trim().toLowerCase() === item.plan.name.trim().toLowerCase());
              if (exact) productId = exact.id;
            } catch (err) {
              console.warn('Không thể lấy product_id:', err);
            }
          }

          if (!productId || productId !== ALLOWED_PRODUCT_ID) {
            invalidProducts.push(item.plan.name);
          }
        }

        if (invalidProducts.length > 0) {
          setVoucherError(`Voucher này chỉ áp dụng cho sản phẩm cụ thể. Vui lòng xóa các sản phẩm khác khỏi giỏ hàng.`);
          setAppliedVoucher(null);
          return;
        }
      }

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

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      showWarning('Vui lòng đăng ký tài khoản và đăng nhập để mua hàng.');
      router.push('/login');
      return;
    }
    if (!formData.name || !formData.email || !formData.phone || !formData.domain) {
      showError('Vui lòng điền đầy đủ thông tin bắt buộc (bao gồm tên miền).');
      return;
    }

    setIsProcessing(true);
    try {
      const itemsSummary = localCart
        .map(ci => {
          const basePrice = ci.basePrice || ci.plan.price.monthly;
          const months = ci.months || 1;
          const finalPrice = basePrice * months;
          return `${ci.plan.name} - ${finalPrice.toLocaleString('vi-VN')}₫ - ${ci.duration || `${months} tháng`}`;
        })
        .join('; ');

      const productIds: string[] = [];
      await Promise.all(localCart.map(async (ci) => {
        try {
          const res = await listProducts({ perPage: 5, search: ci.plan.name });
          const exact = res.items.find(p => p.ten_san_pham.trim().toLowerCase() === ci.plan.name.trim().toLowerCase());
          if (exact) productIds.push(exact.id);
        } catch (err) {
          console.warn('Không thể lấy sản phẩm để liên kết đơn:', err);
        }
      }));

      if (appliedVoucher && (appliedVoucher.code_giam_gia.toUpperCase() === 'THAYVOVANMY2026' || appliedVoucher.id === 'ec9g4exsuulzloe')) {
        const ALLOWED_PRODUCT_ID = 'r0oxf1j3clqha2g';
        const invalidProducts = productIds.filter(id => id !== ALLOWED_PRODUCT_ID);
        if (invalidProducts.length > 0 || productIds.length === 0 || !productIds.every(id => id === ALLOWED_PRODUCT_ID)) {
          showError('Voucher này chỉ áp dụng cho sản phẩm cụ thể. Vui lòng xóa các sản phẩm khác khỏi giỏ hàng.');
          setIsProcessing(false);
          return;
        }
      }

      if (appliedVoucher) {
        try {
          const currentUsed = parseInt(appliedVoucher.da_dung || '0');
          await updateVoucher(appliedVoucher.id, {
            da_dung: String(currentUsed + 1),
          });
        } catch (err) {
          console.warn('Failed to update voucher usage count:', err);
        }
      }

      const voucherInfo = appliedVoucher
        ? ` | Voucher: ${appliedVoucher.code_giam_gia} (Giảm: ${discount.toLocaleString('vi-VN')}₫)`
        : '';

      // Tính ngày hết hạn = now + tổng số tháng lớn nhất trong giỏ
      const maxMonths = Math.max(...localCart.map(ci => ci.months || 1));
      const expiryDate = new Date();
      expiryDate.setMonth(expiryDate.getMonth() + maxMonths);
      const ngayHetHan = expiryDate.toISOString().slice(0, 10);

      const createdOrder = await createMyOrder({
        gia_tri: String(total),
        thanh_toan: total === 0 ? 'da_thanh_toan' : 'cho_thanh_toan',
        trang_thai_su_dung: total === 0 ? 'dang_su_dung' : 'tat_tam_thoi',
        san_pham: productIds.length ? productIds : undefined,
        ngay_het_han: ngayHetHan,
        ghi_chu_noi_bo: `Khách: ${formData.name} | Email: ${formData.email} | Phone: ${formData.phone} | Domain: ${formData.domain || ''} | Sản phẩm: ${itemsSummary}${voucherInfo} | Tạm tính: ${subtotal.toLocaleString('vi-VN')}₫ | Giảm giá: ${discount.toLocaleString('vi-VN')}₫ | Tổng: ${total.toLocaleString('vi-VN')}₫`
      });

      const orderId = createdOrder.ma_don_hang || createdOrder.id;

      if (appliedVoucher && appliedVoucher.code_giam_gia.toUpperCase() === 'VOVANMY2026' && user?.email) {
        if (total === 0) {
          try {
            await markStudentEmailUsed(user.email, orderId);
            console.log(`[student-voucher] Marked email ${user.email} as used for free order ${orderId}`);
          } catch (err) {
            console.warn('[student-voucher] Failed to mark email as used:', err);
          }
        }
      }

      // Fire-and-forget — không block checkout flow
      notifyAdminNewOrder(
        createdOrder,
        {
          customer: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            company: formData.company,
            domain: formData.domain,
          },
          items: localCart.map(ci => {
            const basePrice = ci.basePrice || ci.plan.price.monthly;
            const months = ci.months || 1;
            const finalPrice = basePrice * months;
            return { name: ci.plan.name, duration: ci.duration || `${months} tháng`, price: finalPrice };
          }),
          totals: { subtotal, discount, total },
        }
      ).catch(err => console.warn('Admin notification failed (non-blocking):', err));

      clearCart();
      showSuccess('Vui lòng đợi trong giây lát, sản phẩm sẽ được khởi tạo và gửi qua email cho bạn.');
      router.push('/payment-qr?orderId=' + orderId + '&amount=' + total);
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
              onClick={() => router.push('/')}
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

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Phương thức thanh toán</h2>

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

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-800">
                <QrCode className="h-4 w-4" />
                <span className="text-sm font-semibold">Phương thức thanh toán: VietQR</span>
              </div>

              <div className="space-y-4">
                {localCart.map((item, index) => {
                  const basePrice = item.basePrice || item.plan.price.monthly;
                  const months = item.months || 1;
                  const currentPrice = basePrice * months;

                  return (
                    <div key={index} className="border-b pb-4 last:border-b-0">
                      <div className="flex justify-between text-sm mb-2">
                        <div>
                          <p className="font-semibold text-gray-900">{item.plan.name}</p>
                          <p className="text-gray-600 text-xs mt-1">Đơn giá: {basePrice.toLocaleString()}₫/tháng</p>
                        </div>
                        <p className="font-semibold text-gray-900">{currentPrice.toLocaleString()}₫</p>
                      </div>
                      <div className="mt-2">
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Thời gian sử dụng
                        </label>
                        <select
                          value={months}
                          onChange={(e) => {
                            const newMonths = parseInt(e.target.value);
                            const newPrice = basePrice * newMonths;
                            const updatedCart = [...localCart];
                            updatedCart[index] = {
                              ...updatedCart[index],
                              months: newMonths,
                              price: newPrice,
                              basePrice: basePrice,
                              duration: newMonths === 1 ? '1 tháng' : newMonths === 3 ? '3 tháng' : newMonths === 6 ? '6 tháng' : newMonths === 12 ? '1 năm' : `${newMonths} tháng`
                            };
                            setLocalCart(updatedCart);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                        >
                          <option value={1}>1 tháng</option>
                          <option value={3}>3 tháng</option>
                          <option value={6}>6 tháng</option>
                          <option value={12}>1 năm (12 tháng)</option>
                        </select>
                        <p className="text-xs text-gray-500 mt-1">
                          Tổng: {currentPrice.toLocaleString()}₫ ({basePrice.toLocaleString()}₫ × {months} tháng)
                        </p>
                      </div>
                    </div>
                  );
                })}
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
