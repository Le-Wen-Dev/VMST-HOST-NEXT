'use client';

import { useEffect, useState } from 'react';
import { Search, Plus, Edit2, Trash2, Eye, Download, Mail, Copy, RefreshCw, CreditCard, CheckCircle, XCircle, Clock } from 'lucide-react';
import Modal, { ConfirmModal } from '@/components/Modal';
import { listOrders, createOrder, updateOrder, deleteOrder, buildOrderEmail } from '@/services/orders';
import { listProducts } from '@/services/products';
import { listServers } from '@/services/servers';
import { listUsers } from '@/services/users';

// --- Helpers ---

interface ParsedGhiChu {
  khach: string;
  email: string;
  phone: string;
  domain: string;
  sanPham: string;
  giaSanPham: string;
  soThang: number;
  voucher: string;
  giamGiaVoucher: string;
  tamTinh: string;
  giamGia: string;
  tong: string;
}

function parseGhiChu(raw: string): ParsedGhiChu | null {
  if (!raw || !raw.includes('|')) return null;
  const parts = raw.split('|').map(s => s.trim());
  const get = (prefix: string) => {
    const p = parts.find(s => s.toLowerCase().startsWith(prefix.toLowerCase()));
    return p ? p.slice(p.indexOf(':') + 1).trim() : '';
  };

  // Parse "Sản phẩm: Wordpress Max 1 - 300.000₫ - 3 tháng"
  const spRaw = get('Sản phẩm');
  let sanPham = '', giaSanPham = '', soThang = 0;
  if (spRaw) {
    const spParts = spRaw.split(' - ').map(s => s.trim());
    sanPham = spParts[0] || '';
    giaSanPham = spParts[1] || '';
    const monthMatch = spRaw.match(/(\d+)\s*tháng/);
    if (monthMatch) soThang = parseInt(monthMatch[1], 10);
  }

  // Parse "Voucher: KHANHBANG5GB (Giảm: 100.000₫)"
  const voucherRaw = get('Voucher');
  let voucher = '', giamGiaVoucher = '';
  if (voucherRaw) {
    const vMatch = voucherRaw.match(/^(.+?)\s*\(Giảm:\s*(.+?)\)$/);
    if (vMatch) {
      voucher = vMatch[1].trim();
      giamGiaVoucher = vMatch[2].trim();
    } else {
      voucher = voucherRaw;
    }
  }

  return {
    khach: get('Khách'),
    email: get('Email'),
    phone: get('Phone'),
    domain: get('Domain'),
    sanPham,
    giaSanPham,
    soThang,
    voucher,
    giamGiaVoucher,
    tamTinh: get('Tạm tính'),
    giamGia: get('Giảm giá'),
    tong: get('Tổng'),
  };
}

function generatePassword(length = 16): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*';
  const arr = new Uint8Array(length);
  crypto.getRandomValues(arr);
  return Array.from(arr, b => chars[b % chars.length]).join('');
}

function formatVND(value: string | number): string {
  const num = typeof value === 'string' ? parseInt(value.replace(/[^\d]/g, ''), 10) : value;
  if (!num || isNaN(num)) return '0';
  return num.toLocaleString('vi-VN');
}

function calcExpiryDate(createdStr: string, months: number): string {
  if (!months) return '';
  const d = createdStr ? new Date(createdStr) : new Date();
  if (isNaN(d.getTime())) {
    const now = new Date();
    now.setMonth(now.getMonth() + months);
    return now.toISOString().slice(0, 10);
  }
  d.setMonth(d.getMonth() + months);
  return d.toISOString().slice(0, 10);
}

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
  const [hostDomain, setHostDomain] = useState('');
  const [ghiChuNoiBo, setGhiChuNoiBo] = useState('');
  const [ngayDatHang, setNgayDatHang] = useState('');
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailSentCount, setEmailSentCount] = useState(0);

  useEffect(() => {
    const refresh = async () => {
      try {
        setLoading(true);
        setError(null);
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
            if (err?.status !== 400) break;
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
          createdDate: (r.ngay_dat_hang || r.created_at || r.created || '').slice(0, 19).replace('T', ' '),
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

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    const normalize = (v: any) => (typeof v === 'string' ? v.replace(' ', 'T') : v);
    const ta = new Date(normalize((a as any)._raw?.ngay_dat_hang || (a as any).ngay_dat_hang || (a as any)._raw?.created_at || (a as any).created_at || (a as any)._raw?.created || (a as any).created)).getTime() || 0;
    const tb = new Date(normalize((b as any)._raw?.ngay_dat_hang || (b as any).ngay_dat_hang || (b as any)._raw?.created_at || (b as any).created_at || (b as any)._raw?.created || (b as any).created)).getTime() || 0;
    return tb - ta;
  });

  const getOrderStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'confirmed': 'bg-blue-100 text-blue-800',
      'processing': 'bg-purple-100 text-purple-800',
      'active': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800',
      'tat_tam_thoi': 'bg-gray-100 text-gray-800',
      'dang_su_dung': 'bg-green-100 text-green-800',
      'het_han_su_dung': 'bg-red-100 text-red-800',
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
    setEmailSentCount(0);
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
    setGhiChuNoiBo(order.ghi_chu_noi_bo || '');
    setNgayDatHang(order._raw?.ngay_dat_hang || order.ngay_dat_hang || order._raw?.created_at || order._raw?.created || '');

    // Parse ghi_chu_noi_bo for smart auto-fill
    const parsed = parseGhiChu(order.ghi_chu_noi_bo || '');

    // Host URL: use existing or pre-fill from domain
    if (order.host_url) {
      setHostUrl(order.host_url);
    } else if (parsed?.domain) {
      setHostUrl(`https://${parsed.domain}`);
    } else {
      setHostUrl('https://');
    }

    // Domain: load from ghi_chu
    setHostDomain(parsed?.domain || '');

    // Host Username: use existing or extract email prefix
    if (order.host_username) {
      setHostUsername(order.host_username);
    } else if (parsed?.email) {
      setHostUsername(parsed.email.split('@')[0]);
    } else {
      setHostUsername('');
    }

    // Host Password: use existing or generate random 16 chars
    if (order.host_password) {
      setHostPassword(order.host_password);
    } else {
      setHostPassword(generatePassword(16));
    }

    // Ngày hết hạn: use existing or auto-calculate from created + months
    if (order.ngay_het_han) {
      setNgayHetHan(order.ngay_het_han);
    } else if (parsed?.soThang) {
      const createdAt = order._raw?.ngay_dat_hang || order._raw?.created_at || order._raw?.created || '';
      setNgayHetHan(calcExpiryDate(createdAt, parsed.soThang));
    } else {
      setNgayHetHan('');
    }

    // Parse email sent count
    const sentMatch = (order.ghi_chu_noi_bo || '').match(/Email sent:\s*(\d+)/i);
    setEmailSentCount(sentMatch ? parseInt(sentMatch[1], 10) : 0);

    setShowFormModal(true);
  };

  const handleDelete = (order: any) => {
    setSelectedOrder(order);
    setShowDeleteModal(true);
  };

  const handleSendEmail = async () => {
    // Extract email from ghi_chu_noi_bo
    const emailMatch = ghiChuNoiBo.match(/Email:\s*([^\s|]+)/i);
    const toEmail = emailMatch ? emailMatch[1].trim() : '';
    if (!toEmail) {
      alert('Không tìm thấy email trong ghi chú nội bộ. Vui lòng kiểm tra lại.');
      return;
    }
    if (!hostUrl && !hostUsername && !hostPassword) {
      alert('Chưa có thông tin host (URL, tài khoản, mật khẩu). Vui lòng điền trước khi gửi.');
      return;
    }
    const productName = productOptions.find(p => p.id === sanPhamId)?.name || '';
    const fmtDate = (d: string) => {
      if (!d) return '';
      try { return new Date(d.replace(' ', 'T')).toLocaleDateString('vi-VN'); } catch { return d; }
    };
    setSendingEmail(true);
    try {
      const res = await fetch('/api/send-hosting-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: toEmail,
          maDonHang,
          tenGoi: productName,
          ngayDatHang: fmtDate(ngayDatHang),
          ngayHetHan: fmtDate(ngayHetHan),
          hostUrl,
          hostUsername,
          hostPassword,
          hostDomain,
          thanhToan,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        // Update sent count
        const newCount = emailSentCount + 1;
        setEmailSentCount(newCount);
        // Update ghi_chu_noi_bo with sent count
        let updatedGhiChu = ghiChuNoiBo.replace(/\s*\|\s*Email sent:\s*\d+/i, '');
        updatedGhiChu = `${updatedGhiChu} | Email sent: ${newCount}`;
        setGhiChuNoiBo(updatedGhiChu);
        // Save to PocketBase if editing existing order
        if (selectedOrder?.id) {
          try { await updateOrder(selectedOrder.id, { ghi_chu_noi_bo: updatedGhiChu }); } catch {}
        }
        alert(`Đã gửi email thông tin host đến ${toEmail}`);
      } else {
        alert(`Gửi email thất bại: ${data.error || 'Unknown error'}`);
      }
    } catch (err: any) {
      alert(`Lỗi gửi email: ${err.message}`);
    } finally {
      setSendingEmail(false);
    }
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
        createdDate: (r.ngay_dat_hang || r.created_at || r.created || '').slice(0, 19).replace('T', ' '),
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

  const copyToClipboard = async (text: string, type: string) => {
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

  const toDate = (s?: string) => {
    const d = s ? new Date(s) : null;
    return d && !isNaN(d.getTime()) ? d : null;
  };

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

  const paymentOptions = [
    { value: 'cho_thanh_toan', label: 'Chưa thanh toán' },
    { value: 'da_thanh_toan', label: 'Đã thanh toán' },
    { value: 'partial', label: 'Thanh toán 1 phần' },
    { value: 'refunded', label: 'Đã hoàn tiền' },
    { value: 'payback', label: 'Tính payback' },
  ];

  const usageOptions = [
    { value: 'tat_tam_thoi', label: 'Tắt tạm thời' },
    { value: 'dang_su_dung', label: 'Đang sử dụng' },
    { value: 'het_han_su_dung', label: 'Hết hạn sử dụng' },
    { value: 'da_huy', label: 'Đã hủy' },
  ];

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
          <div className="text-xs mt-2 text-red-600">Gợi ý: kiểm tra cấu hình PB_URL và kết nối PocketBase.</div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
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
              {sortedOrders.map((order) => (
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
                  <td className="px-4 py-4 text-sm text-gray-600">{formatExpireDiff(order._raw?.ngay_dat_hang || order._raw?.created_at || order._raw?.created, order.ngay_het_han)}</td>
                  <td className="px-4 py-4">
                    <div>
                      <p className="text-xs text-gray-600">{formatCustomerLabel(order)}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-bold text-gray-900">{order.gia_tri ? `${formatVND(order.gia_tri)}₫` : '-'}</p>
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
              {sortedOrders.length === 0 && !loading && (
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

      <Modal isOpen={showFormModal} onClose={() => setShowFormModal(false)} title={selectedOrder ? 'Sửa đơn hàng' : 'Tạo đơn hàng'} size="lg">
        {/* Parsed ghi_chu info card (only when editing and has data) */}
        {selectedOrder && (() => {
          const parsed = parseGhiChu(ghiChuNoiBo);
          if (!parsed) return null;
          return (
            <div className="mb-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-200">
              <h4 className="font-bold text-gray-900 mb-2 text-xs uppercase tracking-wide">Thông tin đơn hàng (từ ghi chú)</h4>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-2 text-xs">
                {parsed.khach && <div><span className="text-gray-500">Khách:</span> <span className="font-semibold">{parsed.khach}</span></div>}
                {parsed.email && <div><span className="text-gray-500">Email:</span> <span className="font-semibold">{parsed.email}</span></div>}
                {parsed.phone && <div><span className="text-gray-500">SĐT:</span> <span className="font-semibold">{parsed.phone}</span></div>}
                {parsed.domain && <div><span className="text-gray-500">Domain:</span> <span className="font-semibold text-blue-600">{parsed.domain}</span></div>}
                {parsed.sanPham && <div><span className="text-gray-500">Sản phẩm:</span> <span className="font-semibold">{parsed.sanPham}</span></div>}
                {parsed.soThang > 0 && <div><span className="text-gray-500">Thời hạn:</span> <span className="font-semibold">{parsed.soThang} tháng</span></div>}
                {parsed.voucher && <div><span className="text-gray-500">Voucher:</span> <span className="font-semibold text-purple-600">{parsed.voucher}</span></div>}
                {parsed.tamTinh && <div><span className="text-gray-500">Tạm tính:</span> <span className="font-semibold">{parsed.tamTinh}</span></div>}
                {parsed.giamGia && <div><span className="text-gray-500">Giảm giá:</span> <span className="font-semibold text-red-600">-{parsed.giamGia}</span></div>}
                {parsed.tong && <div><span className="text-gray-500">Tổng:</span> <span className="font-bold text-green-700">{parsed.tong}</span></div>}
              </div>
            </div>
          );
        })()}

        {/* SePay payment info (only when editing) */}
        {selectedOrder?._raw?.sepay && (() => {
          const sepay = selectedOrder._raw.sepay;
          return (
            <div className="mb-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200">
              <h4 className="font-bold text-gray-900 mb-2 text-xs uppercase tracking-wide flex items-center gap-1">
                <CreditCard className="h-3 w-3" /> Thông tin thanh toán SePay
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                {sepay.content && (
                  <div className="col-span-2 md:col-span-4">
                    <span className="text-gray-500">Nội dung CK:</span>{' '}
                    <code className="bg-white px-1.5 py-0.5 rounded border text-xs font-mono">{sepay.content}</code>
                    <button onClick={() => copyToClipboard(sepay.content, 'url')} className="ml-1 p-0.5 text-gray-500 hover:text-blue-600 inline-flex"><Copy className="h-3 w-3" /></button>
                  </div>
                )}
                {sepay.amount != null && <div><span className="text-gray-500">Số tiền:</span> <span className="font-bold text-green-700">{formatVND(sepay.amount)}₫</span></div>}
                {sepay.transaction_id && <div><span className="text-gray-500">Mã GD:</span> <span className="font-mono">{sepay.transaction_id}</span></div>}
                <div>
                  <span className="text-gray-500">Trạng thái:</span>{' '}
                  {selectedOrder.thanh_toan === 'da_thanh_toan'
                    ? <span className="inline-flex items-center gap-1 text-green-700 font-semibold"><CheckCircle className="h-3 w-3" />Đã thanh toán</span>
                    : <span className="inline-flex items-center gap-1 text-red-600 font-semibold"><XCircle className="h-3 w-3" />Chưa thanh toán</span>
                  }
                </div>
              </div>
            </div>
          );
        })()}

        {/* Status badges + main fields */}
        <div className="grid grid-cols-3 gap-2 text-xs">
          {/* Row 1: Mã đơn hàng, Khách hàng, status badges */}
          <div>
            <label className="block font-medium text-gray-600 mb-0.5">Mã đơn hàng</label>
            <input value={maDonHang} onChange={e => setMaDonHang(e.target.value)} className="w-full px-2 py-1 border rounded text-xs" placeholder="Tự sinh nếu bỏ trống" />
          </div>
          <div>
            <label className="block font-medium text-gray-600 mb-0.5">Khách hàng</label>
            <select value={khachHangId} onChange={e => setKhachHangId(e.target.value)} className="w-full px-2 py-1 border rounded text-xs">
              <option value="">-- Chọn khách hàng --</option>
              {userOptions.map(u => (
                <option key={u.id} value={u.id}>{u.label}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end gap-2 pb-0.5">
            {selectedOrder && (
              <>
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${getPaymentStatusColor(thanhToan)}`}>{paymentStatusLabel(thanhToan)}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${getOrderStatusColor(trangThaiSuDung)}`}>{usageOptions.find(o => o.value === trangThaiSuDung)?.label || trangThaiSuDung}</span>
              </>
            )}
          </div>

          {/* Row 2: Sản phẩm, Server, Ngày đặt hàng */}
          <div>
            <label className="block font-medium text-gray-600 mb-0.5">Sản phẩm</label>
            <select value={sanPhamId} onChange={e => setSanPhamId(e.target.value)} className="w-full px-2 py-1 border rounded text-xs">
              <option value="">-- Chọn sản phẩm --</option>
              {productOptions.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium text-gray-600 mb-0.5">Server</label>
            <select value={serverId} onChange={e => setServerId(e.target.value)} className="w-full px-2 py-1 border rounded text-xs">
              <option value="">-- Chọn server --</option>
              {serverOptions.map(s => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium text-gray-600 mb-0.5">Ngày đặt hàng</label>
            <input type="text" value={ngayDatHang ? new Date(ngayDatHang.replace(' ', 'T')).toLocaleString('vi-VN') : 'Chưa có'} readOnly className="w-full px-2 py-1 border rounded bg-gray-50 text-gray-500 text-xs" />
          </div>

          {/* Row 3: Thanh toán, Trạng thái sử dụng, Ngày hết hạn */}
          <div>
            <label className="block font-medium text-gray-600 mb-0.5">Thanh toán</label>
            <select value={thanhToan} onChange={e => { setThanhToan(e.target.value); if (e.target.value === 'da_thanh_toan') setTrangThaiSuDung('dang_su_dung'); }} className={`w-full px-2 py-1 border rounded font-semibold text-xs ${getPaymentStatusColor(thanhToan)}`}>
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
            <label className="block font-medium text-gray-600 mb-0.5">Trạng thái sử dụng</label>
            <select value={trangThaiSuDung} onChange={e => setTrangThaiSuDung(e.target.value)} className={`w-full px-2 py-1 border rounded font-semibold text-xs ${getOrderStatusColor(trangThaiSuDung)}`}>
              <option value="dang_su_dung">Đang sử dụng</option>
              <option value="het_han_su_dung">Hết hạn sử dụng</option>
              <option value="tat_tam_thoi">Tắt tạm thời</option>
              <option value="bi_khoa_vinh_vien">Bị khóa vĩnh viễn</option>
            </select>
          </div>
          <div>
            <label className="block font-medium text-gray-600 mb-0.5">Ngày hết hạn</label>
            <input type="date" value={ngayHetHan ? ngayHetHan.slice(0, 10) : ''} onChange={e => setNgayHetHan(e.target.value)} className="w-full px-2 py-1 border rounded text-xs" />
          </div>

          {/* Row 4: Giá trị, Hoa hồng AFF, (empty) */}
          <div>
            <label className="block font-medium text-gray-600 mb-0.5">Giá trị</label>
            <div className="relative">
              <input value={giaTri} onChange={e => setGiaTri(e.target.value)} className="w-full px-2 py-1 border rounded text-xs pr-10" />
              {giaTri && <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">{formatVND(giaTri)}₫</span>}
            </div>
          </div>
          <div>
            <label className="block font-medium text-gray-600 mb-0.5">Hoa hồng AFF</label>
            <input value={hoaHongChoAff} onChange={e => setHoaHongChoAff(e.target.value)} className="w-full px-2 py-1 border rounded text-xs" />
          </div>
          <div />

          {/* Host info section — full width header */}
          <div className="col-span-3 border-t pt-2 mt-1 flex items-center justify-between">
            <h4 className="font-bold text-gray-800 text-xs uppercase tracking-wide">Thông tin Host</h4>
            <button
              type="button"
              onClick={() => copyToClipboard(`Tên miền: ${hostDomain}\nURL quản lý: ${hostUrl}\nTài khoản: ${hostUsername}\nMật khẩu: ${hostPassword}`, 'all')}
              className="px-2 py-0.5 border border-dashed border-blue-300 rounded text-blue-600 hover:bg-blue-50 font-semibold text-xs transition-colors"
            >
              Copy tất cả
            </button>
          </div>

          {/* Host fields: Tên miền, URL quản lý, Tài khoản */}
          <div>
            <label className="block font-medium text-gray-600 mb-0.5">Tên miền</label>
            <div className="flex gap-1">
              <input value={hostDomain} onChange={e => setHostDomain(e.target.value)} className="flex-1 px-2 py-1 border rounded font-mono text-xs" placeholder="example.com" />
              <button type="button" onClick={() => copyToClipboard(hostDomain, 'domain')} className="px-2 py-1 border rounded text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors" title="Copy domain"><Copy className="h-3 w-3" /></button>
            </div>
          </div>
          <div>
            <label className="block font-medium text-gray-600 mb-0.5">URL quản lý</label>
            <div className="flex gap-1">
              <input value={hostUrl} onChange={e => setHostUrl(e.target.value)} className="flex-1 px-2 py-1 border rounded font-mono text-xs" placeholder="https://" />
              <button type="button" onClick={() => copyToClipboard(hostUrl, 'url')} className="px-2 py-1 border rounded text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors" title="Copy URL"><Copy className="h-3 w-3" /></button>
            </div>
          </div>
          <div>
            <label className="block font-medium text-gray-600 mb-0.5">Tài khoản</label>
            <div className="flex gap-1">
              <input value={hostUsername} onChange={e => setHostUsername(e.target.value)} className="flex-1 px-2 py-1 border rounded font-mono text-xs" />
              <button type="button" onClick={() => copyToClipboard(hostUsername, 'username')} className="px-2 py-1 border rounded text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors" title="Copy tài khoản"><Copy className="h-3 w-3" /></button>
            </div>
          </div>

          {/* Mật khẩu host spans 2 cols, Ghi chú spans 1 col */}
          <div className="col-span-2">
            <label className="block font-medium text-gray-600 mb-0.5">Mật khẩu host</label>
            <div className="flex gap-1">
              <input value={hostPassword} onChange={e => setHostPassword(e.target.value)} className="flex-1 px-2 py-1 border rounded font-mono text-xs" />
              <button type="button" onClick={() => { setHostPassword(generatePassword(16)); }} className="px-2 py-1 border rounded text-gray-500 hover:bg-purple-50 hover:text-purple-600 transition-colors" title="Tạo mật khẩu mới"><RefreshCw className="h-3 w-3" /></button>
              <button type="button" onClick={() => copyToClipboard(hostPassword, 'password')} className="px-2 py-1 border rounded text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors" title="Copy mật khẩu"><Copy className="h-3 w-3" /></button>
            </div>
          </div>
          <div>
            <label className="block font-medium text-gray-600 mb-0.5">Ghi chú nội bộ</label>
            <textarea value={ghiChuNoiBo} onChange={e => setGhiChuNoiBo(e.target.value)} rows={2} className="w-full px-2 py-1 border rounded text-xs" />
          </div>
        </div>
        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleSendEmail}
              disabled={sendingEmail}
              className="px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2 disabled:opacity-50 text-sm"
            >
              <Mail className="h-4 w-4" />
              {sendingEmail ? 'Đang gửi...' : 'Gửi email thông tin host'}
            </button>
            {emailSentCount > 0 && (
              <span className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium">
                Đã gửi {emailSentCount} lần
              </span>
            )}
          </div>
          <div className="flex gap-3">
            <button onClick={() => setShowFormModal(false)} className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-100 font-semibold transition-colors">Hủy</button>
            <button onClick={handleSave} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2">
              Lưu
            </button>
          </div>
        </div>
      </Modal>

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
