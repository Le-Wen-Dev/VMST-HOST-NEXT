'use client';

import { QrCode, Copy, CheckCircle2, Loader2 } from 'lucide-react';
import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getToken } from '@/services/pocketbase';

const BANK = {
  bankName: 'ACB',
  accountNumber: '24086051',
  accountName: 'MAI LE QUEL',
};

const POLL_INTERVAL = 5000;
const MAX_POLLS = 120;

function PaymentQRContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || '';
  const amount = Number(searchParams.get('amount') ?? null);

  const [copied, setCopied] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'paid'>('pending');
  const pollRef = useRef(0);
  const [countdown, setCountdown] = useState(60);

  const qrUrl = orderId && amount
    ? `https://qr.sepay.vn/img?acc=${BANK.accountNumber}&bank=${BANK.bankName}&amount=${amount}&des=${encodeURIComponent(orderId)}`
    : '';

  // Poll trạng thái đơn hàng
  useEffect(() => {
    if (!orderId || amount === 0 || isNaN(amount) || paymentStatus === 'paid') return;

    const poll = async () => {
      try {
        const token = getToken();
        const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await fetch(`/api/orders/status?orderId=${encodeURIComponent(orderId)}`, { headers });
        if (res.ok) {
          const data = await res.json();
          if (data.thanh_toan === 'da_thanh_toan') {
            setPaymentStatus('paid');
          }
        }
      } catch { /* silent */ }
    };

    // Poll ngay lập tức lần đầu
    poll();

    const interval = setInterval(() => {
      pollRef.current += 1;
      if (pollRef.current >= MAX_POLLS) {
        clearInterval(interval);
        return;
      }
      poll();
    }, POLL_INTERVAL);

    return () => clearInterval(interval);
  }, [orderId, amount, paymentStatus]);

  // Countdown timer 60s
  useEffect(() => {
    if (paymentStatus === 'paid' || !orderId || isNaN(amount) || amount === 0) return;
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) { clearInterval(timer); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [paymentStatus, orderId, amount, countdown]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.warn('Copy failed:', e);
    }
  };

  if (!orderId || isNaN(amount)) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Thiếu thông tin thanh toán</h1>
            <p className="text-gray-600 mb-6">Vui lòng truy cập lại từ trang tạo đơn hoặc mở mục Đơn hàng của tôi.</p>
            <button
              onClick={() => router.push('/my-orders')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Đi đến Đơn hàng của tôi
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (amount === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="mb-6">
              <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Đơn hàng của bạn đã được tạo thành công!</h1>
              <p className="text-gray-600 mb-2">Mã đơn hàng: <span className="font-semibold text-blue-600">{orderId}</span></p>
              <p className="text-lg font-semibold text-green-600 mb-4">Tổng tiền: 0₫ (Miễn phí)</p>
              <p className="text-gray-600 mb-6">Đơn hàng của bạn đã được kích hoạt và không cần thanh toán.</p>
            </div>
            <div className="flex gap-3 justify-center">
              <button onClick={() => router.push('/my-orders?highlight=' + orderId)} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">Xem Đơn hàng của tôi</button>
              <button onClick={() => router.push('/')} className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50">Về trang chủ</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // PLACEHOLDER_PAID_AND_QR_SECTIONS

  // Thanh toán thành công
  if (paymentStatus === 'paid') {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Thanh toán thành công!</h1>
            <p className="text-gray-600 mb-2">Mã đơn hàng: <span className="font-semibold text-blue-600">{orderId}</span></p>
            <p className="text-lg font-semibold text-green-600 mb-4">Số tiền: {amount.toLocaleString('vi-VN')}₫</p>
            <p className="text-gray-600 mb-6">Đơn hàng của bạn đã được xác nhận thanh toán. Dịch vụ sẽ được kích hoạt trong thời gian sớm nhất.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => router.push('/my-orders?highlight=' + orderId)} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">Xem Đơn hàng của tôi</button>
              <button onClick={() => router.push('/')} className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50">Về trang chủ</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Quét VietQR để thanh toán</h1>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-800 mb-8">
          <QrCode className="h-4 w-4" />
          <span className="text-sm font-semibold">Phương thức thanh toán: VietQR</span>
        </div>

        {/* Polling indicator */}
        <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-center gap-3">
          <Loader2 className="h-4 w-4 text-yellow-600 animate-spin flex-shrink-0" />
          <p className="text-sm text-yellow-800 flex-1">
            Đang chờ xác nhận thanh toán... Trang sẽ tự cập nhật {countdown > 0 ? `sau ${countdown}s` : 'khi nhận được tiền'}
          </p>
          {countdown > 0 && (
            <div className="flex-shrink-0 relative w-10 h-10">
              <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="#fef3c7" strokeWidth="3" />
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="#d97706" strokeWidth="3"
                  strokeDasharray={`${(countdown / 60) * 97.4} 97.4`}
                  strokeLinecap="round" className="transition-all duration-1000 ease-linear" />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-yellow-700">{countdown}</span>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-2 rounded-lg">
                <QrCode className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Thanh toán qua VietQR</p>
                <p className="text-sm text-gray-600">Quét bằng ứng dụng ngân hàng để điền sẵn nội dung và số tiền</p>
              </div>
            </div>
            <img src={qrUrl} alt={`VietQR - ${BANK.bankName} ${BANK.accountNumber}`} className="w-full max-w-xs rounded-lg border" />
            <p className="text-xs text-gray-500 mt-2 text-center">
              Mã đơn hàng: <span className="font-semibold">{orderId}</span> • Số tiền: <span className="font-semibold">{amount.toLocaleString('vi-VN')}₫</span>
            </p>
          </div>

          {/* Bank info panel */}
          <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Thông tin chuyển khoản</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Ngân hàng</p>
              <p className="font-semibold text-gray-900 mb-2">{BANK.bankName}</p>
              <p className="text-sm text-gray-600 mb-1">Số tài khoản</p>
              <p className="font-semibold text-gray-900 mb-2">{BANK.accountNumber}</p>
              <p className="text-sm text-gray-600 mb-1">Chủ tài khoản</p>
              <p className="font-semibold text-gray-900 mb-2">{BANK.accountName}</p>
              <p className="text-sm text-gray-600 mb-1">Nội dung chuyển khoản</p>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-blue-700">{orderId}</p>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-sm px-2 py-1 border rounded hover:bg-gray-100"
                  title="Sao chép mã đơn hàng"
                >
                  {copied ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                  {copied ? 'Đã sao chép' : 'Sao chép'}
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">Vui lòng giữ nguyên nội dung chuyển khoản là mã đơn hàng để dễ đối soát.</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                Sau khi bạn chuyển khoản thành công, hệ thống sẽ tự động xác nhận đơn hàng. Thời gian xác nhận thường dưới 60 giây.
              </p>
            </div>

            <div className="flex gap-3">
              <button onClick={() => router.push('/my-orders?highlight=' + orderId)} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">Xem Đơn hàng của tôi</button>
              <button onClick={() => router.push('/')} className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50">Về trang chủ</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentQRPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><p className="text-gray-600">Đang tải...</p></div>}>
      <PaymentQRContent />
    </Suspense>
  );
}
