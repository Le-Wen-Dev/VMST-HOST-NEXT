import { getToken } from '@/services/pocketbase';

export type ServerCreateInput = {
  nha_cung_cap?: string;
  so_account_active?: string;
  het_han?: string;
  gia?: string;
  ip?: string;
  vps_pass?: string;
  panel?: string;
  link_panel?: string;
  admin_panel?: string;
  pass_panel?: string;
  status?: string;
  thong_so?: any;
};

export type ServerRecord = ServerCreateInput & {
  id: string;
  created?: string;
  updated?: string;
};

function authHeaders(): HeadersInit {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
}

export async function listServers(params?: {
  page?: number;
  perPage?: number;
  status?: string;
  search?: string;
}): Promise<{ items: ServerRecord[]; page: number; perPage: number; totalPages: number; totalItems: number }> {
  const qs = new URLSearchParams();
  if (params?.page) qs.set('page', String(params.page));
  if (params?.perPage) qs.set('perPage', String(params.perPage));
  if (params?.status) qs.set('status', params.status);
  if (params?.search) qs.set('search', params.search);
  const res = await fetch(`/api/admin/servers?${qs}`, { headers: authHeaders() });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể tải danh sách server');
  return res.json();
}

export async function createServer(input: ServerCreateInput): Promise<ServerRecord> {
  const res = await fetch('/api/admin/servers', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể tạo server');
  return res.json();
}

export async function updateServer(id: string, data: Partial<ServerCreateInput>): Promise<ServerRecord> {
  const res = await fetch('/api/admin/servers', {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ id, ...data }),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể cập nhật server');
  return res.json();
}

export async function deleteServer(id: string): Promise<void> {
  const res = await fetch(`/api/admin/servers?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể xóa server');
}
