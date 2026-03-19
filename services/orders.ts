import { pb } from '@/services/pocketbase';
import { getToken } from '@/services/pocketbase';

const ORDERS_COLLECTION = 'orders';

export type OrderCreateInput = {
  ma_don_hang?: string;
  server?: string;
  thanh_toan?: string;
  trang_thai_su_dung?: string;
  san_pham?: string | string[];
  ngay_het_han?: string;
  khach_hang?: string;
  gia_tri?: string;
  hoa_hong_cho_aff?: string;
  host_url?: string;
  host_username?: string;
  host_password?: string;
  ghi_chu_noi_bo?: string;
  sepay?: any;
};

export type OrderRecord = OrderCreateInput & {
  id: string;
  ngay_dat_hang?: string;
  updated?: string;
  expand?: any;
};

function generateOrderCode(): string {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

function authHeaders(): HeadersInit {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
}

// Admin functions — proxy through /api/admin/orders

export async function listOrders(params?: {
  page?: number;
  perPage?: number;
  thanh_toan?: string;
  trang_thai_su_dung?: string;
  search?: string;
  expand?: string;
}): Promise<{ items: OrderRecord[]; page: number; perPage: number; totalPages: number; totalItems: number }> {
  const qs = new URLSearchParams();
  if (params?.page) qs.set('page', String(params.page));
  if (params?.perPage) qs.set('perPage', String(params.perPage));
  if (params?.thanh_toan) qs.set('thanh_toan', params.thanh_toan);
  if (params?.trang_thai_su_dung) qs.set('trang_thai_su_dung', params.trang_thai_su_dung);
  if (params?.search) qs.set('search', params.search);
  if (params?.expand) qs.set('expand', params.expand);
  const res = await fetch(`/api/admin/orders?${qs}`, { headers: authHeaders() });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể tải danh sách đơn hàng');
  return res.json();
}

export async function createOrder(input: OrderCreateInput): Promise<OrderRecord> {
  const res = await fetch('/api/admin/orders', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể tạo đơn hàng');
  return res.json();
}

export async function updateOrder(id: string, data: Partial<OrderCreateInput>): Promise<OrderRecord> {
  const res = await fetch(`/api/admin/orders/${id}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể cập nhật đơn hàng');
  return res.json();
}

export async function deleteOrder(id: string): Promise<void> {
  const res = await fetch(`/api/admin/orders/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể xóa đơn hàng');
}

// User-session functions — use shared pb directly

export async function listMyOrders(params?: {
  page?: number;
  perPage?: number;
  expand?: string;
}): Promise<{ items: OrderRecord[]; page: number; perPage: number; totalPages: number; totalItems: number }> {
  if (!pb.authStore.isValid || !pb.authStore.model?.id) {
    return { items: [], page: 1, perPage: params?.perPage ?? 20, totalPages: 0, totalItems: 0 };
  }
  const userId = pb.authStore.model.id as string;
  const qs = new URLSearchParams();
  qs.set('page', String(params?.page ?? 1));
  qs.set('perPage', String(params?.perPage ?? 20));
  qs.set('search', userId);
  if (params?.expand) qs.set('expand', params.expand);
  const res = await fetch(`/api/admin/orders?${qs}`, { headers: authHeaders() });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể tải danh sách đơn hàng');
  return res.json();
}

export async function createMyOrder(input: Partial<OrderCreateInput>): Promise<OrderRecord> {
  if (!pb.authStore.isValid || !pb.authStore.model?.id) {
    throw new Error('Bạn cần đăng nhập để tạo đơn hàng');
  }
  const payload: any = { ...input };
  if (!payload.khach_hang) payload.khach_hang = pb.authStore.model.id;
  if (!payload.ma_don_hang || !String(payload.ma_don_hang).trim()) payload.ma_don_hang = generateOrderCode();
  if (!payload.trang_thai_su_dung) payload.trang_thai_su_dung = 'tat_tam_thoi';
  if (!payload.thanh_toan) payload.thanh_toan = 'cho_thanh_toan';
  ['server','ngay_het_han','gia_tri','hoa_hong_cho_aff','host_url','host_username','host_password','ghi_chu_noi_bo'].forEach(k => {
    if (payload[k] !== undefined && String(payload[k]).trim() === '') delete payload[k];
  });
  if (payload.san_pham !== undefined) {
    if (Array.isArray(payload.san_pham)) {
      payload.san_pham = payload.san_pham.filter((id: any) => typeof id === 'string' && id.trim() !== '');
      if (payload.san_pham.length === 0) delete payload.san_pham;
    } else if (typeof payload.san_pham === 'string' && payload.san_pham.trim() === '') {
      delete payload.san_pham;
    }
  }
  // Use admin API route to create order (orders collection may restrict direct user create)
  const res = await fetch('/api/admin/orders', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error || 'Không thể tạo đơn hàng');
  }
  return res.json();
}

export function buildOrderEmail(order: OrderRecord & { customerEmail?: string; customerName?: string }): { subject: string; body: string } {
  const subject = `Thông tin đơn hàng ${order.ma_don_hang || order.id}`;
  const lines = [
    `Xin chào ${order.customerName || ''},`,
    '',
    'Thông tin đơn hàng của bạn:',
    `- Mã đơn hàng: ${order.ma_don_hang || order.id}`,
    `- Trạng thái sử dụng: ${order.trang_thai_su_dung || '-'}`,
    `- Thanh toán: ${order.thanh_toan || '-'}`,
    `- Giá trị: ${order.gia_tri || '-'}`,
    `- Sản phẩm: ${order.san_pham || '-'}`,
    `- Server: ${order.server || '-'}`,
    `- Ngày hết hạn: ${order.ngay_het_han || '-'}`,
    '',
    'Thông tin truy cập dịch vụ:',
    `- URL: ${order.host_url || '-'}`,
    `- Username: ${order.host_username || '-'}`,
    `- Password: ${order.host_password || '-'}`,
    '',
    'Nếu bạn cần hỗ trợ, vui lòng phản hồi email này hoặc liên hệ hotline 0832575905.',
    'Trân trọng,',
    'VMST.HOST',
  ];
  return { subject, body: lines.join('\n') };
}
