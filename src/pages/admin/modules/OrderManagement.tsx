import { useEffect, useState } from 'react';
import { Search, Plus, Edit2, Trash2, Eye, Download, Mail, Copy } from 'lucide-react';
import Modal, { ConfirmModal } from '../../../components/Modal';
// Replace mock data import with real orders service
import { listOrders, createOrder, updateOrder, deleteOrder, buildOrderEmail } from '../../../services/orders';
import { listProducts } from '../../../services/products';
import { listServers } from '../../../services/servers';
import { listUsers } from '../../../services/users';

export default function OrderManagement() {
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('all');

  // Pagination and data
  const [orders, setOrders] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [productOptions, setProductOptions] = useState<{ id: string; name: string; }[]>([]);
  const [serverOptions, setServerOptions] = useState<{ id: string; label: string; }[]>([]);
  const [userOptions, setUserOptions] = useState<{ id: string; label: string; email?: string; }[]>([]);

  // CRUD modals
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // Form fields
  const [maDonHang, setMaDonHang] = useState('');
  const [serverId, setServerId] = useState('');
  const [sanPhamId, setSanPhamId] = useState('');
  const [khachHangId, setKhachHangId] = useState('');
  const [thanhToan, setThanhToan] = useState('cho_thanh_toan');
  const [trangThaiSuDung, setTrangThaiSuDung] = useState('pending');
  const [giaTri, setGiaTri] = useState('');
  const [hoaHongChoAff, setHoaHongChoAff] = useState('');
  const [ngayHetHan, setNgayHetHan] = useState('');
  const [hostUrl, setHostUrl] = useState('');
  const [hostUsername, setHostUsername] = useState('');
  const [hostPassword, setHostPassword] = useState('');
  const [ghiChuNoiBo, setGhiChuNoiBo] = useState('');

  useEffect(() => {
    const refresh = async () => {
      try {
        setLoading(true);
        setError(null);
        // Progressive expand fallback to avoid 400 Bad Request
        const expandCandidates = ['san_pham,server,khach_hang', 'san_pham,server', 'san_pham', ''];
        let res: any | null = null;
        let lastErr: any = null;
        for (const ex of expandCandidates) {
          try {
            res = await listOrders({ page, perPage, thanh_toan: paymentStatusFilter, trang_thai_su_dung: orderStatusFilter, search: searchTerm, expand: ex || undefined });
            lastErr = null;
            break;
          } catch (err: any) {
            lastErr = err;
            if (err?.status !== 400) break; // break for non-400 errors
          }
        }
        if (!res) throw lastErr || new Error('Không thể tải danh sách đơn hàng');
        const mapped = (res.items || []).map((r: any) => ({
          id: r.id,
          ma_don_hang: r.ma_don_hang || r.id,
          server: r.server,
          thanh_toan: r.thanh_toan,
          trang_thai_su_dung: r.trang_thai_su_dung,
          san_pham: r.san_pham,
          ngay_het_han: r.ngay_het_han,
          khach_hang: r.khach_hang,
          gia_tri: r.gia_tri,
          hoa_hong_cho_aff: r.hoa_hong_cho_aff,
          host_url: r.host_url,
          host_username: r.host_username,
          host_password: r.host_password,
          ghi_chu_noi_bo: r.ghi_chu_noi_bo,
          createdDate: (r.ngay_dat_hang || r.created || '').slice(0, 19).replace('T', ' '),
          expand: r.expand,
          _raw: r,
        }));
        setOrders(mapped);
        setPage(res.page);
        setPerPage(res.perPage);
        setTotalPages(res.totalPages);
        setTotalItems(res.totalItems);
      } catch (err: any) {
        console.error('Load orders failed', err?.status, err?.message, err?.response);
        setError(err?.message || 'Không thể tải danh sách đơn hàng');
      } finally {
        setLoading(false);
      }
    };
    refresh();
  }, [page, perPage, orderStatusFilter, paymentStatusFilter, searchTerm]);

  useEffect(() => {
    const loadRelations = async () => {
      try {
        const [prodRes, srvRes, usrRes] = await Promise.all([
          listProducts({ perPage: 50 }),
          listServers({ perPage: 50 }),
          listUsers({ perPage: 50 }),
        ]);
        setProductOptions((prodRes.items || []).map((p: any) => ({ id: p.id, name: p.ten_san_pham })));
        setServerOptions((srvRes.items || []).map((s: any) => ({ id: s.id, label: `${s.ten || s.nha_cung_cap || ''}${s.ip ? ` - ${s.ip}` : ''}`.trim() })));
        setUserOptions((usrRes.items || []).map((u: any) => ({ id: u.id, label: `${u.ten || u.name || ''} (${u.email || ''})`.trim(), email: u.email })));
      } catch (e) {
        console.error('Load relation options failed', e);
      }
    };
    loadRelations();
  }, []);

  const filteredOrders = orders.filter(order => {
    const s = searchTerm.toLowerCase();
    const matchesSearch = (order.ma_don_hang || '').toLowerCase().includes(s) ||
                          (order.gia_tri || '').toLowerCase().includes(s) ||
                          (order.host_url || '').toLowerCase().includes(s) ||
                          (order.host_username || '').toLowerCase().includes(s);
    const matchesOrderStatus = orderStatusFilter === 'all' || order.trang_thai_su_dung === orderStatusFilter;
    const matchesPaymentStatus = paymentStatusFilter === 'all' || order.thanh_toan === paymentStatusFilter;
    return matchesSearch && matchesOrderStatus && matchesPaymentStatus;
  });

  const getOrderStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'confirmed': 'bg-blue-100 text-blue-800',
      'processing': 'bg-purple-100 text-purple-800',
      'active': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800',
      'dang_su_dung': 'bg-green-100 text-green-800',
      'da_huy': 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPaymentStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'unpaid': 'bg-red-100 text-red-800',
      'paid': 'bg-green-100 text-green-800',
      'partial': 'bg-yellow-100 text-yellow-800',
      'refunded': 'bg-purple-100 text-purple-800',
      'payback': 'bg-orange-100 text-orange-800',
      'cho_thanh_toan': 'bg-red-100 text-red-800',
      'da_thanh_toan': 'bg-green-100 text-green-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const paymentStatusLabel = (s: string) => {
    const labels: Record<string, string> = {
      'cho_thanh_toan': 'Chưa thanh toán',
      'da_thanh_toan': 'Đã thanh toán',
      'partial': 'Thanh toán 1 phần',
      'refunded': 'Đã hoàn tiền',
      'payback': 'Tính payback',
    };
    return labels[s] || s;
  };

  const handleCreate = () => {
    setSelectedOrder(null);
    setMaDonHang('');
    setServerId('');
    setSanPhamId('');
    setKhachHangId('');
    setThanhToan('cho_thanh_toan');
    setTrangThaiSuDung('dang_su_dung');
    setGiaTri('');
    setHoaHongChoAff('');
    setNgayHetHan('');
    setHostUrl('');
    setHostUsername('');
    setHostPassword('');
    setGhiChuNoiBo('');
    setShowFormModal(true);
  };

  const handleEdit = (order: any) => {
    setSelectedOrder(order);
    setMaDonHang(order.ma_don_hang || '');
    setServerId(order.server || '');
    setSanPhamId(order.san_pham || '');
    setKhachHangId(order.khach_hang || '');
    setThanhToan(order.thanh_toan || 'cho_thanh_toan');
    setTrangThaiSuDung(order.trang_thai_su_dung || 'dang_su_dung');
    setGiaTri(order.gia_tri || '');
    setHoaHongChoAff(order.hoa_hong_cho_aff || '');
    setNgayHetHan(order.ngay_het_han || '');
    setHostUrl(order.host_url || '');
    setHostUsername(order.host_username || '');
    setHostPassword(order.host_password || '');
    setGhiChuNoiBo(order.ghi_chu_noi_bo || '');
    setShowFormModal(true);
  };

  const handleDelete = (order: any) => {
    setSelectedOrder(order);
    setShowDeleteModal(true);
  };

  const handleSave = async () => {
    try {
      const payload = {
        ma_don_hang: maDonHang.trim(),
        server: serverId || undefined,
        san_pham: sanPhamId || undefined,
        khach_hang: khachHangId || undefined,
        thanh_toan: thanhToan || undefined,
        trang_thai_su_dung: trangThaiSuDung || undefined,
        gia_tri: giaTri || undefined,
        hoa_hong_cho_aff: hoaHongChoAff || undefined,
        ngay_het_han: ngayHetHan || undefined,
        host_url: hostUrl || undefined,
        host_username: hostUsername || undefined,
        host_password: hostPassword || undefined,
        ghi_chu_noi_bo: ghiChuNoiBo || undefined,
      };
      if (selectedOrder) {
        await updateOrder(selectedOrder.id, payload);
      } else {
        await createOrder(payload);
      }
      setShowFormModal(false);
      // refresh
      const res = await listOrders({ page, perPage, thanh_toan: paymentStatusFilter, trang_thai_su_dung: orderStatusFilter, search: searchTerm });
      setOrders((res.items || []).map((r: any) => ({
        id: r.id,
        ma_don_hang: r.ma_don_hang || r.id,
        server: r.server,
        thanh_toan: r.thanh_toan,
        trang_thai_su_dung: r.trang_thai_su_dung,
        san_pham: r.san_pham,
        ngay_het_han: r.ngay_het_han,
        khach_hang: r.khach_hang,
        gia_tri: r.gia_tri,
        hoa_hong_cho_aff: r.hoa_hong_cho_aff,
        host_url: r.host_url,
        host_username: r.host_username,
        host_password: r.host_password,
        ghi_chu_noi_bo: r.ghi_chu_noi_bo,
        createdDate: (r.ngay_dat_hang || r.created || '').slice(0, 19).replace('T', ' '),
        _raw: r,
      })));
    } catch (err: any) {
      console.error('Save order failed', err);
      alert('Lưu đơn hàng thất bại');
    }
  };

  const formatProductLabel = (order: any) => {
    const p = order.expand?.san_pham || order.san_pham;
    if (!p) return '-';
    return p?.ten_san_pham || p?.name || String(p);
  };

  const formatServerLabel = (order: any) => {
    const s = order.expand?.server || order.server;
    if (!s) return '-';
    const name = s?.ten || s?.name || s?.hostname || s?.nha_cung_cap || '';
    const ip = s?.ip || '';
    return `${name}${ip ? ` - ${ip}` : ''}`.trim() || ip || '-';
  };

  const normalizeUrl = (u: string) => {
    if (!u) return '';
    if (/^https?:\/\//i.test(u)) return u;
    return `https://${u}`;
  };

  const copyToClipboard = async (text: string, type: 'url' | 'username' | 'password') => {
    try {
      await navigator.clipboard.writeText(text);
      alert(`Đã copy ${type} vào clipboard`);
    } catch (e) {
      console.error('Copy failed', e);
      alert('Không thể copy vào clipboard');
    }
  };

  const formatCustomerLabel = (order: any) => {
    const u = order.expand?.khach_hang || order.khach_hang;
    if (!u) return '-';
    const name = u?.ten || u?.name || '';
    const email = u?.email || '';
    const phone = u?.phone || u?.so_dien_thoai || u?.sdt || '';
    const parts = [name, email, phone].filter(Boolean);
    return parts.join(' | ');
  };

  // Helper: convert string to Date safely
  const toDate = (s?: string) => {
    const d = s ? new Date(s) : null;
    return d && !isNaN(d.getTime()) ? d : null;
  };

  // Hiển thị thời lượng giữa ngày đặt và ngày hết hạn
  const formatExpireDiff = (created?: string, expired?: string) => {
    const c = toDate(created);
    const e = toDate(expired);
    if (!c || !e) return expired || '-';
    let months = (e.getFullYear() - c.getFullYear()) * 12 + (e.getMonth() - c.getMonth());
    if (e.getDate() < c.getDate()) months -= 1;
    const years = Math.floor(months / 12);
    const remainMonths = months % 12;
    const parts: string[] = [];
    if (years > 0) parts.push(`${years} năm`);
    if (remainMonths > 0) parts.push(`${remainMonths} tháng`);
    if (!parts.length) parts.push('0 tháng');
    return `${parts.join(' ')} (tới ${e.toLocaleDateString()})`;
  };

  // Dropdown options
  const paymentOptions = [
    { value: 'cho_thanh_toan', label: 'Chưa thanh toán' },
    { value: 'da_thanh_toan', label: 'Đã thanh toán' },
    { value: 'partial', label: 'Thanh toán 1 phần' },
    { value: 'refunded', label: 'Đã hoàn tiền' },
    { value: 'payback', label: 'Tính payback' },
  ];

  const usageOptions = [
    { value: 'pending', label: 'Chờ xử lý' },
    { value: 'confirmed', label: 'Đã xác nhận' },
    { value: 'processing', label: 'Đang xử lý' },
    { value: 'active', label: 'Hoạt động' },
    { value: 'cancelled', label: 'Đã hủy' },
  ];

  // Inline update handlers
  const handleChangePayment = async (order: any, newValue: string) => {
    try {
      await updateOrder(order.id, { thanh_toan: newValue });
      setOrders((prev: any[]) => prev.map((o: any) => o.id === order.id ? { ...o, thanh_toan: newValue } : o));
    } catch (e) {
      console.error('Update payment failed', e);
      alert('Cập nhật trạng thái thanh toán thất bại');
    }
  };

  const handleChangeUsage = async (order: any, newValue: string) => {
    try {
      await updateOrder(order.id, { trang_thai_su_dung: newValue });
      setOrders((prev: any[]) => prev.map((o: any) => o.id === order.id ? { ...o, trang_thai_su_dung: newValue } : o));
    } catch (e) {
      console.error('Update usage status failed', e);
      alert('Cập nhật trạng thái đơn thất bại');
    }
  };

  // Gửi email tới khách hàng
  const sendEmailToCustomer = (order: any) => {
    const email = order.expand?.khach_hang?.email || order.khach_hang?.email || '';
    if (!email) {
      alert('Không tìm thấy email khách hàng');
      return;
    }
    const { subject, body } = buildOrderEmail(order);
    const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  // Xác nhận xóa
  const handleConfirmDelete = async () => {
    try {
      if (selectedOrder?.id) {
        await deleteOrder(selectedOrder.id);
        setSelectedOrder(null);
        setShowDeleteModal(false);
        const res = await listOrders({ page, perPage, thanh_toan: paymentStatusFilter, trang_thai_su_dung: orderStatusFilter, search: searchTerm });
        setOrders((res.items || []).map((r: any) => ({
          id: r.id,
          ma_don_hang: r.ma_don_hang || r.id,
          server: r.server,
          thanh_toan: r.thanh_toan,
          trang_thai_su_dung: r.trang_thai_su_dung,
          san_pham: r.san_pham,
          ngay_het_han: r.ngay_het_han,
          khach_hang: r.khach_hang,
          gia_tri: r.gia_tri,
          hoa_hong_cho_aff: r.hoa_hong_cho_aff,
          host_url: r.host_url,
          host_username: r.host_username,
          host_password: r.host_password,
          ghi_chu_noi_bo: r.ghi_chu_noi_bo,
          createdDate: (r.ngay_dat_hang || r.created || '').slice(0, 19).replace('T', ' '),
          expand: r.expand,
          _raw: r,
        })));
      }
    } catch (err) {
      console.error('Delete order failed', err);
      alert('Xóa đơn hàng thất bại');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý Đơn hàng</h1>
          <p className="text-gray-600 mt-1">Theo dõi và xử lý đơn hàng của khách hàng</p>
        </div>
        <button onClick={handleCreate} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-lg transition-all">
          <Plus className="h-5 w-5" />
          Tạo đơn hàng
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <div className="font-semibold">Không thể tải dữ liệu đơn hàng</div>
          <div className="text-sm mt-1 break-words">{String(error)}</div>
          <div className="text-xs mt-2 text-red-600">Gợi ý: kiểm tra cấu hình VITE_PB_URL, tài khoản admin Orders (VITE_CONTACT_ADMIN_EMAIL/PASSWORD), và tham số expand/sort.</div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {/* Card: All payments */}
        <div
          onClick={() => { setPaymentStatusFilter('all'); setPage(1); }}
          className={`bg-white rounded-xl shadow-md p-6 border-l-4 cursor-pointer transition transform hover:scale-[1.01] ${paymentStatusFilter === 'all' ? 'border-blue-600 ring-2 ring-blue-100' : 'border-blue-500'}`}
        >
          <p className="text-gray-600 text-sm mb-1">Tất cả thanh toán</p>
          <p className="text-3xl font-bold text-gray-900">{orders.length}</p>
        </div>
        {['cho_thanh_toan', 'da_thanh_toan', 'partial', 'refunded', 'payback'].map((pstat) => (
          <div
            key={pstat}
            onClick={() => { setPaymentStatusFilter(cur => (cur === pstat ? 'all' : pstat)); setPage(1); }}
            className={`bg-white rounded-xl shadow-md p-6 border-l-4 cursor-pointer transition transform hover:scale-[1.01] ${paymentStatusFilter === pstat ? 'border-blue-600 ring-2 ring-blue-100' : 'border-blue-500'}`}
          >
            <p className="text-gray-600 text-sm mb-1">{paymentStatusLabel(pstat)}</p>
            <p className="text-3xl font-bold text-gray-900">
              {orders.filter(o => o.thanh_toan === pstat).length}
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
              placeholder="Tìm kiếm mã đơn, giá trị, host..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={orderStatusFilter}
            onChange={(e) => { setOrderStatusFilter(e.target.value); setPage(1); }}
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
            onChange={(e) => { setPaymentStatusFilter(e.target.value); setPage(1); }}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tất cả thanh toán</option>
            <option value="cho_thanh_toan">Chưa thanh toán</option>
            <option value="da_thanh_toan">Đã thanh toán</option>
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
                <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Thông tin host</th>
                <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Ngày tạo</th>
                <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Hết hạn</th>
                <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Khách hàng</th>
                <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Giá trị</th>
                <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-blue-50 transition-colors">
                  <td className="px-4 py-4">
                    <div>
                      <p className="font-bold text-gray-900 font-mono">{order.ma_don_hang}</p>
                      <p className="text-xs text-gray-600 mt-1">SP: {formatProductLabel(order)}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm font-semibold text-gray-900">{formatServerLabel(order)}</p>
                  </td>
                  <td className="px-4 py-4">
                    <select
                      value={order.trang_thai_su_dung || ''}
                      onChange={(e) => handleChangeUsage(order, e.target.value)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${getOrderStatusColor(order.trang_thai_su_dung)}`}
                    >
                      {usageOptions.map(op => (
                        <option key={op.value} value={op.value}>{op.label}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-4">
                    <select
                      value={order.thanh_toan || ''}
                      onChange={(e) => handleChangePayment(order, e.target.value)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPaymentStatusColor(order.thanh_toan)}`}
                    >
                      {paymentOptions.map(op => (
                        <option key={op.value} value={op.value}>{op.label}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-4 text-xs text-gray-900">
                    <div className="space-y-1">
                      <div>
                        URL: {order.host_url ? (
                          <a href={normalizeUrl(order.host_url)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {order.host_url}
                          </a>
                        ) : (
                          '-'
                        )}
                        {order.host_url && (
                          <button onClick={() => copyToClipboard(order.host_url, 'url')} className="ml-2 p-1 text-gray-600 hover:text-blue-600" title="Copy URL">
                            <Copy className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span>User: {order.host_username || '-'}</span>
                        {order.host_username && (
                          <button onClick={() => copyToClipboard(order.host_username, 'username')} className="p-1 text-gray-600 hover:text-blue-600" title="Copy user">
                            <Copy className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span>Pass: {order.host_password || '-'}</span>
                        {order.host_password && (
                          <button onClick={() => copyToClipboard(order.host_password, 'password')} className="p-1 text-gray-600 hover:text-blue-600" title="Copy mật khẩu">
                            <Copy className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">{order.createdDate}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{formatExpireDiff(order._raw?.ngay_dat_hang || order._raw?.created, order.ngay_het_han)}</td>
                  <td className="px-4 py-4">
                    <div>
                      <p className="text-xs text-gray-600">{formatCustomerLabel(order)}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-bold text-gray-900">{order.gia_tri || '-'}</p>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors" onClick={() => sendEmailToCustomer(order)} title="Gửi email">
                        <Mail className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors" onClick={() => handleEdit(order)}>
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors" onClick={() => handleDelete(order)}>
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && !loading && (
                <tr>
                  <td colSpan={10} className="px-4 py-6 text-center text-gray-500">Không có đơn hàng</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-600">Tổng: {totalItems} bản ghi</div>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} className="px-3 py-2 border rounded">Trước</button>
            <span className="text-sm">Trang {page}/{totalPages || 1}</span>
            <button onClick={() => setPage(p => (totalPages ? Math.min(totalPages, p + 1) : p + 1))} className="px-3 py-2 border rounded">Sau</button>
            <select value={perPage} onChange={e => { setPerPage(Number(e.target.value)); setPage(1); }} className="px-2 py-2 border rounded text-sm">
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      </div>

      {/* Form modal */}
      <Modal isOpen={showFormModal} onClose={() => setShowFormModal(false)} title={selectedOrder ? 'Sửa đơn hàng' : 'Tạo đơn hàng'} size="lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mã đơn hàng (tự sinh nếu bỏ trống)</label>
            <input value={maDonHang} onChange={e => setMaDonHang(e.target.value)} className="w-full px-3 py-2 border rounded" placeholder="Bỏ trống để hệ thống tự tạo" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Khách hàng</label>
            <select value={khachHangId} onChange={e => setKhachHangId(e.target.value)} className="w-full px-3 py-2 border rounded">
              <option value="">-- Chọn khách hàng --</option>
              {userOptions.map(u => (
                <option key={u.id} value={u.id}>{u.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sản phẩm</label>
            <select value={sanPhamId} onChange={e => setSanPhamId(e.target.value)} className="w-full px-3 py-2 border rounded">
              <option value="">-- Chọn sản phẩm --</option>
              {productOptions.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Server</label>
            <select value={serverId} onChange={e => setServerId(e.target.value)} className="w-full px-3 py-2 border rounded">
              <option value="">-- Chọn server --</option>
              {serverOptions.map(s => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Thanh toán</label>
            <select value={thanhToan} onChange={e => setThanhToan(e.target.value)} className="w-full px-3 py-2 border rounded">
              <option value="cho_thanh_toan">Chưa thanh toán</option>
              <option value="da_thanh_toan">Đã thanh toán</option>
              <option value="da_kich_hoat">Đã kích hoạt</option>
              <option value="tam_giu">Tạm giữ</option>
              <option value="da_huy">Đã hủy</option>
              <option value="da_hoan_tien">Đã hoàn tiền</option>
              <option value="het_han">Hết hạn</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái sử dụng</label>
            <select value={trangThaiSuDung} onChange={e => setTrangThaiSuDung(e.target.value)} className="w-full px-3 py-2 border rounded">
              <option value="dang_su_dung">Đang sử dụng</option>
              <option value="het_han_su_dung">Hết hạn sử dụng</option>
              <option value="tat_tam_thoi">Tắt tạm thời</option>
              <option value="bi_khoa_vinh_vien">Bị khóa vĩnh viễn</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Giá trị</label>
            <input value={giaTri} onChange={e => setGiaTri(e.target.value)} className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hoa hồng AFF</label>
            <input value={hoaHongChoAff} onChange={e => setHoaHongChoAff(e.target.value)} className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ngày hết hạn (ISO)</label>
            <input value={ngayHetHan} onChange={e => setNgayHetHan(e.target.value)} className="w-full px-3 py-2 border rounded" placeholder="2022-01-01 10:00:00.123Z" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Host URL</label>
            <input value={hostUrl} onChange={e => setHostUrl(e.target.value)} className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Host Username</label>
            <input value={hostUsername} onChange={e => setHostUsername(e.target.value)} className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Host Password</label>
            <input value={hostPassword} onChange={e => setHostPassword(e.target.value)} className="w-full px-3 py-2 border rounded" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú nội bộ</label>
            <textarea value={ghiChuNoiBo} onChange={e => setGhiChuNoiBo(e.target.value)} rows={4} className="w-full px-3 py-2 border rounded" />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={() => setShowFormModal(false)} className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-100 font-semibold transition-colors">Hủy</button>
          <button onClick={handleSave} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2">
            Lưu
          </button>
        </div>
      </Modal>

      {/* Delete confirm */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Xóa đơn hàng"
        message="Bạn có chắc chắn muốn xóa đơn hàng này?"
        confirmText="Xóa"
        cancelText="Hủy"
        type="danger"
      />
    </div>

  );
}
