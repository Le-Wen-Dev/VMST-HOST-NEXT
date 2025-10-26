import { useEffect, useMemo, useState } from 'react';
import { ShoppingBag, Eye, Download, Calendar, CreditCard, Package, Globe, User, Lock, ChevronLeft, ChevronRight } from 'lucide-react';

import Modal from '../components/Modal';
import { listMyOrders, OrderRecord } from '../services/orders';

interface DisplayOrder {
  id: string;
  productName: string;
  priceText: string;
  discountText?: string;
  totalText: string;
  orderDate: string;
  status: string;
  paymentStatus: string;
  specs?: string;
  host_url?: string;
  host_username?: string;
  host_password?: string;
}

export default function MyOrdersPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<DisplayOrder | null>(null);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await listMyOrders({ page, perPage, expand: 'san_pham' });
      setOrders(res.items);
      setTotalPages(res.totalPages);
    } catch (err: any) {
      setError(err?.message || 'Không thể tải danh sách đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, perPage]);

  const displayOrders: DisplayOrder[] = useMemo(() => {
    return orders.map((o) => {
      const productName = o.expand?.san_pham?.ten_san_pham || o.san_pham || 'Dịch vụ';
      const orderDate = o.created ? new Date(o.created).toLocaleDateString('vi-VN') : '';
      const totalText = o.gia_tri || '-';
      const priceText = o.gia_tri || '-';
      const paymentStatus = o.thanh_toan || 'cho_thanh_toan';
      const status = o.trang_thai_su_dung || 'pending';
      return {
        id: o.ma_don_hang || o.id,
        productName,
        priceText,
        totalText,
        orderDate,
        status,
        paymentStatus,
        specs: '',
        host_url: o.host_url,
        host_username: o.host_username,
        host_password: o.host_password,
      } as DisplayOrder;
    });
  }, [orders]);

  const getStatusColor = (status: string) => {
    const normalized = status.toLowerCase();
    const colors: Record<string, string> = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'confirmed': 'bg-blue-100 text-blue-800',
      'active': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800',
      // Fallbacks
      'cho_duyet': 'bg-yellow-100 text-yellow-800',
      'da_duyet': 'bg-green-100 text-green-800',
      'da_huy': 'bg-red-100 text-red-800',
    };
    return colors[normalized] || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status: string) => {
    const normalized = status.toLowerCase();
    const labels: Record<string, string> = {
      'pending': 'Chờ xử lý',
      'confirmed': 'Đã xác nhận',
      'active': 'Đang hoạt động',
      'cancelled': 'Đã hủy',
      // Vietnamese variants
      'cho_duyet': 'Chờ duyệt',
      'da_duyet': 'Đã duyệt',
      'da_huy': 'Đã hủy',
    };
    return labels[normalized] || status;
  };

  const getPaymentStatusColor = (status: string) => {
    const normalized = status.toLowerCase();
    const colors: Record<string, string> = {
      'unpaid': 'bg-red-100 text-red-800',
      'paid': 'bg-green-100 text-green-800',
      'partial': 'bg-yellow-100 text-yellow-800',
      // Vietnamese DB values
      'cho_thanh_toan': 'bg-red-100 text-red-800',
      'da_thanh_toan': 'bg-green-100 text-green-800',
      'thanh_toan_mot_phan': 'bg-yellow-100 text-yellow-800',
    };
    return colors[normalized] || 'bg-gray-100 text-gray-800';
  };

  const getPaymentStatusLabel = (status: string) => {
    const normalized = status.toLowerCase();
    const labels: Record<string, string> = {
      'unpaid': 'Chưa thanh toán',
      'paid': 'Đã thanh toán',
      'partial': 'Thanh toán một phần',
      // Vietnamese DB values
      'cho_thanh_toan': 'Chưa thanh toán',
      'da_thanh_toan': 'Đã thanh toán',
      'thanh_toan_mot_phan': 'Thanh toán một phần',
    };
    return labels[normalized] || status;
  };

  const handleViewDetail = (order: DisplayOrder) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  const handleExportInvoice = (order: DisplayOrder) => {
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
        <td>${order.specs || ''}</td>
        <td>${order.priceText}</td>
        <td>${order.discountText || '0đ'}</td>
        <td><strong>${order.totalText}</strong></td>
      </tr>
    </tbody>
  </table>

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
      {/* Removed duplicate Header - App already renders a global Header */}

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => { if (window.history.length > 1) window.history.back(); else onNavigate('portal'); }}
              className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-[#034CC9]"
            >
              <ChevronLeft className="h-5 w-5" /> Quay lại
            </button>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Đơn hàng của tôi</h1>
          <p className="text-gray-600">Quản lý và theo dõi các đơn hàng đã đặt</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-8 text-center text-gray-600">Đang tải...</div>
            ) : error ? (
              <div className="p-8 text-center text-red-600">{error}</div>
            ) : displayOrders.length === 0 ? (
              <div className="p-8 text-center text-gray-600">Chưa có đơn hàng nào</div>
            ) : (
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
                  {displayOrders.map((order) => (
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
                        <p className="font-bold text-lg text-blue-600">{order.totalText}</p>
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
            )}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between p-4 border-t bg-white">
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-2 rounded border hover:bg-gray-50 disabled:opacity-50"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm text-gray-700">Trang {page} / {Math.max(1, totalPages)}</span>
              <button
                className="px-3 py-2 rounded border hover:bg-gray-50 disabled:opacity-50"
                onClick={() => setPage((p) => Math.min(totalPages || p + 1, p + 1))}
                disabled={totalPages > 0 && page >= totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Hiển thị</span>
              <select
                value={perPage}
                onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}
                className="border rounded px-2 py-1 text-sm"
              >
                {[10, 20, 50].map(n => <option key={n} value={n}>{n}/trang</option>)}
              </select>
            </div>
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

            {/* Access info if admin provided */}
            {(selectedOrder.host_url || selectedOrder.host_username || selectedOrder.host_password) && (
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="block text-sm font-bold text-gray-600 mb-2">Thông tin truy cập dịch vụ</label>
                <div className="space-y-2">
                  {selectedOrder.host_url && (
                    <div className="flex items-center gap-2 text-gray-900">
                      <Globe className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold">URL:</span>
                      <a href={selectedOrder.host_url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">{selectedOrder.host_url}</a>
                    </div>
                  )}
                  {selectedOrder.host_username && (
                    <div className="flex items-center gap-2 text-gray-900">
                      <User className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold">Username:</span>
                      <span>{selectedOrder.host_username}</span>
                    </div>
                  )}
                  {selectedOrder.host_password && (
                    <div className="flex items-center gap-2 text-gray-900">
                      <Lock className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold">Password:</span>
                      <span>{selectedOrder.host_password}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="border-t pt-6">
              <div className="space-y-3">
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600">Tổng tiền:</span>
                  <span className="font-semibold text-blue-600">{selectedOrder.totalText}</span>
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
              {selectedOrder.paymentStatus === 'cho_thanh_toan' && (
                <button className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold flex items-center justify-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Thanh toán ngay
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>
-
-      <Footer onNavigate={onNavigate} />
+
+      {/* Removed duplicate Footer - App already renders a global Footer */}
     </div>
   );
 }
