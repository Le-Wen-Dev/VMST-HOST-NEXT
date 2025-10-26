import { useState } from 'react';
import { ShoppingBag, Eye, Download, Calendar, CreditCard, Package } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Modal from '../components/Modal';

interface Order {
  id: string;
  productName: string;
  price: number;
  discount: number;
  total: number;
  orderDate: string;
  status: 'pending' | 'confirmed' | 'active' | 'cancelled';
  paymentStatus: 'unpaid' | 'paid' | 'partial';
  specs: string;
}

export default function MyOrdersPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const myOrders: Order[] = [
    {
      id: 'ORD-2025-001',
      productName: 'Hosting WordPress Pro',
      price: 2370000,
      discount: 200000,
      total: 2170000,
      orderDate: '2025-01-15',
      status: 'active',
      paymentStatus: 'paid',
      specs: '2 Core CPU, 4GB RAM, 50GB SSD, Unlimited Bandwidth'
    },
    {
      id: 'ORD-2025-002',
      productName: 'VPS Cloud Server',
      price: 5500000,
      discount: 300000,
      total: 5200000,
      orderDate: '2025-02-01',
      status: 'active',
      paymentStatus: 'paid',
      specs: '4 Core CPU, 8GB RAM, 100GB NVMe, 10TB Bandwidth'
    },
    {
      id: 'ORD-2025-003',
      productName: 'Email Enterprise',
      price: 888000,
      discount: 0,
      total: 888000,
      orderDate: '2025-03-10',
      status: 'pending',
      paymentStatus: 'unpaid',
      specs: '50 Email Accounts, 50GB Storage, Custom Domain'
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'confirmed': 'bg-blue-100 text-blue-800',
      'active': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors];
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      'pending': 'Chờ xử lý',
      'confirmed': 'Đã xác nhận',
      'active': 'Đang hoạt động',
      'cancelled': 'Đã hủy'
    };
    return labels[status as keyof typeof labels];
  };

  const getPaymentStatusColor = (status: string) => {
    const colors = {
      'unpaid': 'bg-red-100 text-red-800',
      'paid': 'bg-green-100 text-green-800',
      'partial': 'bg-yellow-100 text-yellow-800'
    };
    return colors[status as keyof typeof colors];
  };

  const getPaymentStatusLabel = (status: string) => {
    const labels = {
      'unpaid': 'Chưa thanh toán',
      'paid': 'Đã thanh toán',
      'partial': 'Thanh toán một phần'
    };
    return labels[status as keyof typeof labels];
  };

  const handleViewDetail = (order: Order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  const handleExportInvoice = (order: Order) => {
    const invoiceContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Hóa đơn ${order.id}</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 40px; }
    .header { text-align: center; margin-bottom: 40px; border-bottom: 3px solid #2563eb; padding-bottom: 20px; }
    .company-info { margin-bottom: 30px; }
    .invoice-info { background: #f3f4f6; padding: 20px; margin-bottom: 30px; border-radius: 8px; }
    .items-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
    .items-table th { background: #2563eb; color: white; padding: 12px; text-align: left; }
    .items-table td { padding: 12px; border-bottom: 1px solid #e5e7eb; }
    .total-section { text-align: right; margin-top: 30px; }
    .total-row { display: flex; justify-content: flex-end; padding: 8px 0; }
    .total-label { width: 150px; font-weight: bold; }
    .total-value { width: 200px; text-align: right; }
    .grand-total { font-size: 20px; color: #2563eb; font-weight: bold; padding-top: 10px; border-top: 2px solid #2563eb; }
    .footer { margin-top: 50px; text-align: center; color: #6b7280; font-size: 14px; border-top: 1px solid #e5e7eb; padding-top: 20px; }
  </style>
</head>
<body>
  <div class="header">
    <h1 style="color: #2563eb; margin: 0;">VMST HOSTING</h1>
    <p style="margin: 5px 0;">Website: https://vmst.host | Email: support@vmst.host</p>
    <p style="margin: 5px 0;">Hotline: 0832575905</p>
  </div>

  <div class="company-info">
    <p><strong>Địa chỉ:</strong> Tầng 3, Tòa nhà ABC, Số 123 Đường XYZ, Quận 1, TP.HCM</p>
    <p><strong>MST:</strong> 0123456789</p>
  </div>

  <div class="invoice-info">
    <h2 style="margin-top: 0; color: #2563eb;">HÓA ĐƠN DỊCH VỤ</h2>
    <p><strong>Mã đơn hàng:</strong> ${order.id}</p>
    <p><strong>Ngày đặt hàng:</strong> ${order.orderDate}</p>
    <p><strong>Trạng thái:</strong> ${getStatusLabel(order.status)}</p>
    <p><strong>Thanh toán:</strong> ${getPaymentStatusLabel(order.paymentStatus)}</p>
  </div>

  <table class="items-table">
    <thead>
      <tr>
        <th>Dịch vụ</th>
        <th>Thông số</th>
        <th>Đơn giá</th>
        <th>Giảm giá</th>
        <th>Thành tiền</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>${order.productName}</strong></td>
        <td>${order.specs}</td>
        <td>${order.price.toLocaleString()}đ</td>
        <td>${order.discount.toLocaleString()}đ</td>
        <td><strong>${order.total.toLocaleString()}đ</strong></td>
      </tr>
    </tbody>
  </table>

  <div class="total-section">
    <div class="total-row">
      <div class="total-label">Tạm tính:</div>
      <div class="total-value">${order.price.toLocaleString()}đ</div>
    </div>
    <div class="total-row">
      <div class="total-label">Giảm giá:</div>
      <div class="total-value">-${order.discount.toLocaleString()}đ</div>
    </div>
    <div class="total-row grand-total">
      <div class="total-label">TỔNG CỘNG:</div>
      <div class="total-value">${order.total.toLocaleString()}đ</div>
    </div>
  </div>

  <div class="footer">
    <p><strong>Cảm ơn quý khách đã sử dụng dịch vụ của VMST Hosting!</strong></p>
    <p>Mọi thắc mắc xin vui lòng liên hệ: support@vmst.host hoặc 0832575905</p>
  </div>
</body>
</html>
    `;

    const blob = new Blob([invoiceContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Invoice-${order.id}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header onNavigate={onNavigate} />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Đơn hàng của tôi</h1>
          <p className="text-gray-600">Quản lý và theo dõi các đơn hàng đã đặt</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase">Mã đơn</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase">Dịch vụ</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase">Ngày đặt</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase">Tổng tiền</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase">Trạng thái</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase">Thanh toán</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {myOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900">{order.id}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Package className="h-5 w-5 text-blue-600" />
                        <p className="font-semibold text-gray-900">{order.productName}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        {order.orderDate}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-lg text-blue-600">{order.total.toLocaleString()}đ</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {getPaymentStatusLabel(order.paymentStatus)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewDetail(order)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          title="Xem chi tiết"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleExportInvoice(order)}
                          className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                          title="Xuất hóa đơn"
                        >
                          <Download className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        title="Chi tiết đơn hàng"
        size="lg"
      >
        {selectedOrder && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedOrder.productName}</h3>
              <p className="text-gray-600">Mã đơn hàng: <strong>{selectedOrder.id}</strong></p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2">Ngày đặt hàng</label>
                <p className="text-lg text-gray-900">{selectedOrder.orderDate}</p>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2">Trạng thái</label>
                <span className={`inline-block px-4 py-2 rounded-lg text-sm font-bold ${getStatusColor(selectedOrder.status)}`}>
                  {getStatusLabel(selectedOrder.status)}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-600 mb-2">Thông số kỹ thuật</label>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-900">{selectedOrder.specs}</p>
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="space-y-3">
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600">Đơn giá:</span>
                  <span className="font-semibold text-gray-900">{selectedOrder.price.toLocaleString()}đ</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600">Giảm giá:</span>
                  <span className="font-semibold text-red-600">-{selectedOrder.discount.toLocaleString()}đ</span>
                </div>
                <div className="flex justify-between text-2xl font-bold border-t-2 pt-3">
                  <span className="text-gray-900">Tổng cộng:</span>
                  <span className="text-blue-600">{selectedOrder.total.toLocaleString()}đ</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t">
              <button
                onClick={() => handleExportInvoice(selectedOrder)}
                className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold flex items-center justify-center gap-2"
              >
                <Download className="h-5 w-5" />
                Xuất hóa đơn
              </button>
              {selectedOrder.paymentStatus === 'unpaid' && (
                <button className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold flex items-center justify-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Thanh toán ngay
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
