import { getToken } from '@/services/pocketbase';

export type VoucherRecord = {
  id: string;
  code_giam_gia: string;
  dieu_kien?: string;
  ten_chien_dich?: string;
  gia_tri: string;
  don_toi_thieu?: string;
  so_luong?: string;
  da_dung?: string;
  created?: string;
  updated?: string;
};

export interface VoucherCreateInput {
  code_giam_gia: string;
  dieu_kien?: string;
  ten_chien_dich?: string;
  gia_tri: string;
  don_toi_thieu?: string;
  so_luong?: string;
  da_dung?: string;
}

export interface VoucherUpdateInput {
  code_giam_gia?: string;
  dieu_kien?: string;
  ten_chien_dich?: string;
  gia_tri?: string;
  don_toi_thieu?: string;
  so_luong?: string;
  da_dung?: string;
}

export interface ListVouchersParams {
  page?: number;
  perPage?: number;
  sort?: string;
  filter?: string;
}

function authHeaders(): HeadersInit {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
}

export async function listVouchers(params?: ListVouchersParams): Promise<{
  items: VoucherRecord[];
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
}> {
  const qs = new URLSearchParams();
  if (params?.page) qs.set('page', String(params.page));
  if (params?.perPage) qs.set('perPage', String(params.perPage));
  if (params?.sort) qs.set('sort', params.sort);
  if (params?.filter) qs.set('filter', params.filter);
  const res = await fetch(`/api/admin/vouchers?${qs}`, { headers: authHeaders() });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể tải danh sách voucher');
  return res.json();
}

export async function getVoucherById(id: string): Promise<VoucherRecord> {
  const res = await fetch(`/api/admin/vouchers?id=${encodeURIComponent(id)}`, { headers: authHeaders() });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể lấy thông tin voucher');
  return res.json();
}

export async function getVoucherByCode(code: string): Promise<VoucherRecord | null> {
  try {
    const records = await listVouchers({
      filter: `code_giam_gia = "${code.toUpperCase()}"`,
      perPage: 1,
    });
    return records.items.length > 0 ? records.items[0] : null;
  } catch {
    return null;
  }
}

export async function createVoucher(input: VoucherCreateInput): Promise<VoucherRecord> {
  const res = await fetch('/api/admin/vouchers', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể tạo voucher');
  return res.json();
}

export async function updateVoucher(id: string, input: VoucherUpdateInput): Promise<VoucherRecord> {
  const res = await fetch('/api/admin/vouchers', {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ id, ...input }),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể cập nhật voucher');
  return res.json();
}

export async function deleteVoucher(id: string): Promise<void> {
  const res = await fetch(`/api/admin/vouchers?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể xóa voucher');
}

// Validate và tính toán giảm giá
export function calculateVoucherDiscount(voucher: VoucherRecord, subtotal: number): {
  isValid: boolean;
  discount: number;
  error?: string;
} {
  const minOrder = parseFloat(voucher.don_toi_thieu || '0');
  if (subtotal < minOrder) {
    return { isValid: false, discount: 0, error: `Đơn hàng tối thiểu ${minOrder.toLocaleString('vi-VN')}₫` };
  }
  const totalQty = parseInt(voucher.so_luong || '0');
  const usedQty = parseInt(voucher.da_dung || '0');
  if (usedQty >= totalQty && totalQty > 0) {
    return { isValid: false, discount: 0, error: 'Mã voucher đã hết lượt sử dụng' };
  }
  let discount = 0;
  const giaTri = voucher.gia_tri || '0';
  if (giaTri.includes('%')) {
    discount = (subtotal * parseFloat(giaTri.replace('%', ''))) / 100;
  } else {
    discount = parseFloat(giaTri);
  }
  discount = Math.min(discount, subtotal);
  return { isValid: true, discount };
}
