import { getToken } from '@/services/pocketbase';

export type DoiSoatAffCreateInput = {
  order_id?: string;
  aff_code?: string;
  user?: string;
  doanh_thu_don_hang?: number;
  hoa_hong?: number;
  trang_thai_don_hang?: string;
};

export type DoiSoatAffRecord = DoiSoatAffCreateInput & {
  id: string;
  created?: string;
  updated?: string;
  expand?: Record<string, any>;
};

function authHeaders(): HeadersInit {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
}

export async function listDoiSoatAff(params?: {
  page?: number;
  perPage?: number;
  sort?: string;
  filter?: string;
}): Promise<{ items: DoiSoatAffRecord[]; page: number; perPage: number; totalPages: number; totalItems: number }> {
  const qs = new URLSearchParams();
  if (params?.page) qs.set('page', String(params.page));
  if (params?.perPage) qs.set('perPage', String(params.perPage));
  if (params?.sort) qs.set('sort', params.sort);
  if (params?.filter) qs.set('filter', params.filter);
  const res = await fetch(`/api/admin/doi-soat-aff?${qs}`, { headers: authHeaders() });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể tải danh sách đối soát affiliate');
  return res.json();
}

export async function createDoiSoatAff(input: DoiSoatAffCreateInput): Promise<DoiSoatAffRecord> {
  const res = await fetch('/api/admin/doi-soat-aff', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể tạo đối soát affiliate');
  return res.json();
}

export async function updateDoiSoatAff(id: string, data: Partial<DoiSoatAffCreateInput>): Promise<DoiSoatAffRecord> {
  const res = await fetch('/api/admin/doi-soat-aff', {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ id, ...data }),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể cập nhật đối soát affiliate');
  return res.json();
}

export async function deleteDoiSoatAff(id: string): Promise<void> {
  const res = await fetch(`/api/admin/doi-soat-aff?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể xóa đối soát affiliate');
}
