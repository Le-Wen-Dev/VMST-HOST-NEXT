import { getToken } from '@/services/pocketbase';

export type AffiliateCreateInput = {
  so_don_hang?: number;
  so_doanh_thu?: number;
  cho_thanh_toan?: number;
  user_aff?: string;
  ma_gioi_thieu?: string;
  so_luot_clicks?: number;
  so_tien_tong_hoa_hong?: number;
  trang_thai?: 'chua_thanh_toan' | 'da_thanh_toan';
};

export type AffiliateRecord = AffiliateCreateInput & {
  id: string;
  created?: string;
  updated?: string;
  expand?: Record<string, any>;
};

function authHeaders(): HeadersInit {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
}

export async function listAffiliates(params?: {
  page?: number;
  perPage?: number;
  sort?: string;
  filter?: string;
}): Promise<{ items: AffiliateRecord[]; page: number; perPage: number; totalPages: number; totalItems: number }> {
  const qs = new URLSearchParams();
  if (params?.page) qs.set('page', String(params.page));
  if (params?.perPage) qs.set('perPage', String(params.perPage));
  if (params?.sort) qs.set('sort', params.sort);
  if (params?.filter) qs.set('filter', params.filter);
  const res = await fetch(`/api/admin/affiliate?${qs}`, { headers: authHeaders() });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể tải danh sách affiliate');
  return res.json();
}

export async function getAffiliate(id: string): Promise<AffiliateRecord> {
  const res = await fetch(`/api/admin/affiliate?id=${encodeURIComponent(id)}`, { headers: authHeaders() });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể tải affiliate');
  return res.json();
}

export async function getAffiliateByUser(userId: string): Promise<AffiliateRecord | null> {
  const filter = `user_aff="${userId}"`;
  const res = await fetch(`/api/admin/affiliate?filter=${encodeURIComponent(filter)}`, { headers: authHeaders() });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể tải affiliate');
  const data = await res.json();
  return data.items?.[0] ?? null;
}

export async function createAffiliate(input: AffiliateCreateInput): Promise<AffiliateRecord> {
  const res = await fetch('/api/admin/affiliate', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể tạo affiliate');
  return res.json();
}

export async function updateAffiliate(id: string, data: Partial<AffiliateCreateInput>): Promise<AffiliateRecord> {
  const res = await fetch('/api/admin/affiliate', {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ id, ...data }),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể cập nhật affiliate');
  return res.json();
}

export async function deleteAffiliate(id: string): Promise<void> {
  const res = await fetch(`/api/admin/affiliate?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể xóa affiliate');
}
