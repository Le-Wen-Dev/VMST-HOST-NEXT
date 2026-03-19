import { getToken } from '@/services/pocketbase';

export type ContactCreateInput = {
  ho_va_ten: string;
  email: string;
  so_dien_thoai?: string;
  trang_nhan_lead?: string;
  trang_thai?: string;
  ip_adress?: string;
  user_agent?: any;
};

export async function fetchClientIp(): Promise<string | undefined> {
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    const json = await res.json();
    return json?.ip;
  } catch {
    return undefined;
  }
}

function authHeaders(): HeadersInit {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
}

export async function submitContact(input: ContactCreateInput): Promise<any> {
  const payload = {
    ...input,
    email: input.email.trim().toLowerCase(),
    trang_thai: input.trang_thai || 'newlead',
    user_agent: input.user_agent ?? (typeof navigator !== 'undefined' ? { ua: navigator.userAgent } : {}),
  };
  const res = await fetch('/api/admin/contacts', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể gửi liên hệ');
  return res.json();
}

export async function listContacts(params?: {
  page?: number;
  perPage?: number;
  status?: string;
  search?: string;
}): Promise<{ items: any[]; page: number; perPage: number; totalPages: number; totalItems: number }> {
  const qs = new URLSearchParams();
  if (params?.page) qs.set('page', String(params.page));
  if (params?.perPage) qs.set('perPage', String(params.perPage));
  if (params?.status) qs.set('status', params.status);
  if (params?.search) qs.set('search', params.search);
  const res = await fetch(`/api/admin/contacts?${qs}`, { headers: authHeaders() });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể tải danh sách liên hệ');
  return res.json();
}

export async function updateContact(id: string, data: Partial<ContactCreateInput>): Promise<any> {
  const res = await fetch('/api/admin/contacts', {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ id, ...data }),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể cập nhật liên hệ');
  return res.json();
}

export async function deleteContact(id: string): Promise<void> {
  const res = await fetch(`/api/admin/contacts?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể xóa liên hệ');
}
