import { useState, useEffect } from 'react';
import { X, Copy, CheckCircle, AlertCircle, RefreshCw, ExternalLink, Clock } from 'lucide-react';
import type { PaymentIntent, PaymentStatus } from '../types/payment';

interface SePayQRModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentIntent: PaymentIntent;
  onPaymentSuccess: () => void;
  onRegenerateQR: () => void;
}

export default function SePayQRModal({
  isOpen,
  onClose,
  paymentIntent,
  onPaymentSuccess,
  onRegenerateQR
}: SePayQRModalProps) {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<PaymentStatus>(paymentIntent.status);

  useEffect(() => {
    if (!isOpen || !paymentIntent.expiresAt) return;

    const calculateTimeLeft = () => {
      const expiryTime = new Date(paymentIntent.expiresAt).getTime();
      const now = Date.now();
      const diff = Math.max(0, Math.floor((expiryTime - now) / 1000));
      return diff;
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);

      if (remaining <= 0) {
        setCurrentStatus('EXPIRED');
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, paymentIntent.expiresAt]);

  useEffect(() => {
    if (!isOpen) return;

    const pollInterval = setInterval(async () => {
      const response = await fetch(`/api/payments/${paymentIntent.id}/status`);
      const data = await response.json();

      if (data.status === 'PAID') {
        setCurrentStatus('PAID');
        clearInterval(pollInterval);
        setTimeout(() => {
          onPaymentSuccess();
        }, 2000);
      } else if (data.status === 'EXPIRED') {
        setCurrentStatus('EXPIRED');
        clearInterval(pollInterval);
      }
    }, 3000);

    return () => clearInterval(pollInterval);
  }, [isOpen, paymentIntent.id, onPaymentSuccess]);

  if (!isOpen) return null;

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopyContent = () => {
    const content = `Thanh toán đơn hàng ${paymentIntent.orderId}`;
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenBankApp = () => {
    if (paymentIntent.deepLink) {
      window.location.href = paymentIntent.deepLink;
    }
  };

  const getStatusDisplay = () => {
    switch (currentStatus) {
      case 'PENDING':
        return {
          icon: <Clock className="h-12 w-12 text-blue-500 animate-pulse" />,
          title: 'Đang chờ thanh toán',
          message: 'Quét mã QR bằng ứng dụng ngân hàng để thanh toán',
          color: 'blue'
        };
      case 'PAID':
        return {
          icon: <CheckCircle className="h-12 w-12 text-green-500" />,
          title: 'Thanh toán thành công!',
          message: 'Đơn hàng của bạn đã được xác nhận',
          color: 'green'
        };
      case 'EXPIRED':
        return {
          icon: <AlertCircle className="h-12 w-12 text-red-500" />,
          title: 'QR đã hết hạn',
          message: 'Vui lòng tạo mã QR mới để tiếp tục thanh toán',
          color: 'red'
        };
      default:
        return {
          icon: <Clock className="h-12 w-12 text-gray-500" />,
          title: 'Đang xử lý',
          message: 'Vui lòng đợi trong giây lát',
          color: 'gray'
        };
    }
  };

  const statusDisplay = getStatusDisplay();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">Thanh toán SePay</h2>
              <p className="text-blue-100 mt-1">Quét mã QR để thanh toán</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex flex-col items-center">
            {statusDisplay.icon}
            <h3 className="text-xl font-bold text-gray-900 mt-4">{statusDisplay.title}</h3>
            <p className="text-gray-600 text-center mt-2">{statusDisplay.message}</p>
          </div>

          {currentStatus === 'PENDING' && (
            <>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-600 mb-2">Thời gian còn lại</p>
                <div className={`text-4xl font-bold ${timeLeft < 60 ? 'text-red-600' : 'text-blue-600'}`}>
                  {formatTime(timeLeft)}
                </div>
              </div>

              {paymentIntent.qrImage && (
                <div className="flex justify-center bg-white border-4 border-gray-200 rounded-xl p-4">
                  <img
                    src={paymentIntent.qrImage}
                    alt="QR Code"
                    className="w-64 h-64 object-contain"
                  />
                </div>
              )}

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold text-gray-700">Mã đơn hàng:</span>
                    <span className="text-sm font-bold text-gray-900">{paymentIntent.orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold text-gray-700">Số tiền:</span>
                    <span className="text-lg font-bold text-blue-600">
                      {paymentIntent.amount.toLocaleString()}đ
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold text-gray-700">Nội dung:</span>
                    <span className="text-sm text-gray-900">Thanh toán đơn {paymentIntent.orderId}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {paymentIntent.deepLink && (
                  <button
                    onClick={handleOpenBankApp}
                    className="px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
                  >
                    <ExternalLink className="h-5 w-5" />
                    Mở app ngân hàng
                  </button>
                )}
                <button
                  onClick={handleCopyContent}
                  className={`px-4 py-3 ${
                    paymentIntent.deepLink ? '' : 'col-span-2'
                  } bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-all`}
                >
                  {copied ? (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      Đã sao chép!
                    </>
                  ) : (
                    <>
                      <Copy className="h-5 w-5" />
                      Sao chép nội dung
                    </>
                  )}
                </button>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Lưu ý:</strong> Vui lòng không chỉnh sửa nội dung chuyển khoản để thanh toán được ghi nhận chính xác.
                </p>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Hệ thống sẽ tự động xác nhận ngay khi nhận được thanh toán từ SePay
                </p>
              </div>
            </>
          )}

          {currentStatus === 'PAID' && (
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg text-center">
              <p className="text-green-800 font-semibold">
                Cảm ơn bạn đã thanh toán! Đang chuyển đến trang xác nhận đơn hàng...
              </p>
            </div>
          )}

          {currentStatus === 'EXPIRED' && (
            <div className="space-y-4">
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                <p className="text-red-800">
                  Mã QR đã hết hạn sau 15 phút. Vui lòng tạo mã QR mới để tiếp tục thanh toán.
                </p>
              </div>
              <button
                onClick={onRegenerateQR}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <RefreshCw className="h-5 w-5" />
                Tạo lại mã QR
              </button>
            </div>
          )}

          {currentStatus === 'REVIEW' && (
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
              <p className="text-yellow-800 font-semibold text-center">
                Chúng tôi đang kiểm tra giao dịch của bạn. Vui lòng đợi 1-2 phút hoặc liên hệ hotline 0832575905.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
