import { QrCode, Copy, CheckCircle2 } from 'lucide-react';
import { useState, useMemo } from 'react';

interface PaymentQRPageProps {
  orderId: string;
  amount: number;
  onNavigate: (page: string, params?: any) => void;
}

const BANK = {
  bankName: 'Vietcombank',
  accountNumber: '1028329185',
  accountName: 'MAI LE QUEL',
};

export default function PaymentQRPage({ orderId, amount, onNavigate }: PaymentQRPageProps) {
  const [copied, setCopied] = useState(false);

  const qrUrl = useMemo(() => {
    if (!orderId || !amount) return '';
    return `https://img.vietqr.io/image/vietcombank-${BANK.accountNumber}-qr_only.png?addInfo=${encodeURIComponent(orderId)}&amount=${amount}&accountName=${encodeURIComponent(BANK.accountName)}`;
  }, [orderId, amount]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.warn('Copy failed:', e);
    }
  };

  if (!orderId || !amount) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Thiếu thông tin thanh toán</h1>
            <p className="text-gray-600 mb-6">Vui lòng truy cập lại từ trang tạo đơn hoặc mở mục Đơn hàng của tôi.</p>
            <button
              onClick={() => onNavigate('my-orders')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Đi đến Đơn hàng của tôi
            </button>
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

            <img
              src={qrUrl}
              alt={`VietQR - ${BANK.bankName} ${BANK.accountNumber}`}
              className="w-full max-w-xs rounded-lg border"
            />
            <p className="text-xs text-gray-500 mt-2 text-center">
              Mã đơn hàng: <span className="font-semibold">{orderId}</span> • Số tiền: <span className="font-semibold">{amount.toLocaleString('vi-VN')}₫</span>
            </p>
          </div>

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
                Sau khi bạn chuyển khoản thành công, đơn hàng sẽ được xác nhận. Bạn có thể theo dõi trạng thái tại mục "Đơn hàng của tôi".
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => onNavigate('my-orders', { orderId })}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Xem Đơn hàng của tôi
              </button>
              <button
                onClick={() => onNavigate('home')}
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50"
              >
                Về trang chủ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}