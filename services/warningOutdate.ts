import { getToken } from '@/services/pocketbase';

export type WarningOutdateCreateInput = {
  khach_hang?: string;
  dich_vu?: string;
  ngay_het_han?: string;
};

export type WarningOutdateRecord = WarningOutdateCreateInput & {
  id: string;
  created?: string;
  updated?: string;
  expand?: Record<string, any>;
};

function authHeaders(): HeadersInit {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
}

export async function listWarnings(params?: {
  page?: number;
  perPage?: number;
  sort?: string;
  filter?: string;
}): Promise<{ items: WarningOutdateRecord[]; page: number; perPage: number; totalPages: number; totalItems: number }> {
  const qs = new URLSearchParams();
  if (params?.page) qs.set('page', String(params.page));
  if (params?.perPage) qs.set('perPage', String(params.perPage));
  if (params?.sort) qs.set('sort', params.sort);
  if (params?.filter) qs.set('filter', params.filter);
  const res = await fetch(`/api/admin/warning-outdate?${qs}`, { headers: authHeaders() });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể tải danh sách cảnh báo hết hạn');
  return res.json();
}

export async function createWarning(input: WarningOutdateCreateInput): Promise<WarningOutdateRecord> {
  const res = await fetch('/api/admin/warning-outdate', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể tạo cảnh báo hết hạn');
  return res.json();
}

export async function updateWarning(id: string, data: Partial<WarningOutdateCreateInput>): Promise<WarningOutdateRecord> {
  const res = await fetch('/api/admin/warning-outdate', {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ id, ...data }),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể cập nhật cảnh báo hết hạn');
  return res.json();
}

export async function deleteWarning(id: string): Promise<void> {
  const res = await fetch(`/api/admin/warning-outdate?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể xóa cảnh báo hết hạn');
}
