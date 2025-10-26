import { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Eye, Download } from 'lucide-react';
import { mockOrdersExtended } from '../../../data/adminData';

export default function OrderManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('all');

  const filteredOrders = mockOrdersExtended.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesOrderStatus = orderStatusFilter === 'all' || order.orderStatus === orderStatusFilter;
    const matchesPaymentStatus = paymentStatusFilter === 'all' || order.paymentStatus === paymentStatusFilter;
    return matchesSearch && matchesOrderStatus && matchesPaymentStatus;
  });

  const getOrderStatusColor = (status: string) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'confirmed': 'bg-blue-100 text-blue-800',
      'processing': 'bg-purple-100 text-purple-800',
      'active': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors];
  };

  const getPaymentStatusColor = (status: string) => {
    const colors = {
      'unpaid': 'bg-red-100 text-red-800',
      'paid': 'bg-green-100 text-green-800',
      'partial': 'bg-yellow-100 text-yellow-800',
      'refunded': 'bg-purple-100 text-purple-800',
      'payback': 'bg-orange-100 text-orange-800'
    };
    return colors[status as keyof typeof colors];
  };

  const getOrderStatusLabel = (status: string) => {
    const labels = {
      'pending': 'Chờ xử lý',
      'confirmed': 'Đã xác nhận',
      'processing': 'Đang xử lý',
      'active': 'Hoạt động',
      'cancelled': 'Đã hủy'
    };
    return labels[status as keyof typeof labels];
  };

  const getPaymentStatusLabel = (status: string) => {
    const labels = {
      'unpaid': 'Chưa thanh toán',
      'paid': 'Đã thanh toán',
      'partial': 'Thanh toán 1 phần',
      'refunded': 'Đã hoàn tiền',
      'payback': 'Tính payback'
    };
    return labels[status as keyof typeof labels];
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý Đơn hàng</h1>
          <p className="text-gray-600 mt-1">Theo dõi và xử lý đơn hàng của khách hàng</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-lg transition-all">
          <Plus className="h-5 w-5" />
          Tạo đơn hàng
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {['pending', 'confirmed', 'processing', 'active', 'cancelled'].map((status) => (
          <div key={status} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <p className="text-gray-600 text-sm mb-1">{getOrderStatusLabel(status)}</p>
            <p className="text-3xl font-bold text-gray-900">
              {mockOrdersExtended.filter(o => o.orderStatus === status).length}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Tìm kiếm mã đơn, tên, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={orderStatusFilter}
            onChange={(e) => setOrderStatusFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tất cả trạng thái đơn</option>
            <option value="pending">Chờ xử lý</option>
            <option value="confirmed">Đã xác nhận</option>
            <option value="processing">Đang xử lý</option>
            <option value="active">Hoạt động</option>
            <option value="cancelled">Đã hủy</option>
          </select>
          <select
            value={paymentStatusFilter}
            onChange={(e) => setPaymentStatusFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tất cả thanh toán</option>
            <option value="unpaid">Chưa thanh toán</option>
            <option value="paid">Đã thanh toán</option>
            <option value="partial">Thanh toán 1 phần</option>
            <option value="refunded">Đã hoàn tiền</option>
            <option value="payback">Tính payback</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <tr>
                <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Đơn hàng</th>
                <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Server</th>
                <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Trạng thái</th>
                <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Thanh toán</th>
                <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Thông số</th>
                <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Ngày đặt</th>
                <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Hết hạn</th>
                <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Khách hàng</th>
                <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Giá</th>
                <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-blue-50 transition-colors">
                  <td className="px-4 py-4">
                    <div>
                      <p className="font-bold text-gray-900 font-mono">{order.orderNumber}</p>
                      <p className="text-xs text-gray-600 mt-1">{order.planName}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm font-semibold text-gray-900">{order.serverName || '-'}</p>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getOrderStatusColor(order.orderStatus)}`}>
                      {getOrderStatusLabel(order.orderStatus)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentStatusColor(order.paymentStatus)}`}>
                      {getPaymentStatusLabel(order.paymentStatus)}
                    </span>
                    {order.paybackDays && (
                      <p className="text-xs text-orange-600 mt-1">{order.paybackDays} ngày</p>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-xs text-gray-900">{order.specifications}</p>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">{order.orderDate}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{order.expiryDate}</td>
                  <td className="px-4 py-4">
                    <div>
                      <p className="font-semibold text-gray-900">{order.customerName}</p>
                      <p className="text-xs text-gray-600">{order.customerEmail}</p>
                      <p className="text-xs text-gray-600">{order.customerPhone}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-bold text-gray-900">{order.total.toLocaleString()}đ</p>
                    {order.discount > 0 && (
                      <p className="text-xs text-green-600">-{order.discount.toLocaleString()}đ</p>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors">
                        <Trash2 className="h-4 w-4" />
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
  );
}
