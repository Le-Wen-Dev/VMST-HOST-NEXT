import { getToken } from '@/services/pocketbase';

export type YeuCauThanhToanAffCreateInput = {
  user_yeu_cau?: string;
  so_don?: number;
  so_tien?: number;
  don_hang_tu?: string;
  trang_thai?: 'cho_duyet' | 'da_duyet' | 'tu_choi';
};

export type YeuCauThanhToanAffRecord = YeuCauThanhToanAffCreateInput & {
  id: string;
  created?: string;
  updated?: string;
  expand?: Record<string, any>;
};

function authHeaders(): HeadersInit {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
}

export async function listYeuCauThanhToan(params?: {
  page?: number;
  perPage?: number;
  sort?: string;
  filter?: string;
}): Promise<{ items: YeuCauThanhToanAffRecord[]; page: number; perPage: number; totalPages: number; totalItems: number }> {
  const qs = new URLSearchParams();
  if (params?.page) qs.set('page', String(params.page));
  if (params?.perPage) qs.set('perPage', String(params.perPage));
  if (params?.sort) qs.set('sort', params.sort);
  if (params?.filter) qs.set('filter', params.filter);
  const res = await fetch(`/api/admin/yeu-cau-thanh-toan-aff?${qs}`, { headers: authHeaders() });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể tải danh sách yêu cầu thanh toán');
  return res.json();
}

export async function createYeuCauThanhToan(input: YeuCauThanhToanAffCreateInput): Promise<YeuCauThanhToanAffRecord> {
  const res = await fetch('/api/admin/yeu-cau-thanh-toan-aff', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể tạo yêu cầu thanh toán');
  return res.json();
}

export async function updateYeuCauThanhToan(id: string, data: Partial<YeuCauThanhToanAffCreateInput>): Promise<YeuCauThanhToanAffRecord> {
  const res = await fetch('/api/admin/yeu-cau-thanh-toan-aff', {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ id, ...data }),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể cập nhật yêu cầu thanh toán');
  return res.json();
}

export async function deleteYeuCauThanhToan(id: string): Promise<void> {
  const res = await fetch(`/api/admin/yeu-cau-thanh-toan-aff?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể xóa yêu cầu thanh toán');
}
