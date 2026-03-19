import { getToken } from '@/services/pocketbase';

export type NotificationKieu = 'dang_ky_moi' | 'don_hang_moi' | 'ticket_moi' | 'voucher_moi' | 'contact_moi';
export type NotificationTrangThai = 'chua_doc' | 'da_doc';

export type NotificationCreateInput = {
  kieu_thong_bao?: NotificationKieu;
  tieu_de?: string;
  tin_nhan?: string;
  khach_hang_lien_quan?: string;
  don_hang_lien_quan?: string;
  ticket_lien_quan?: string;
  voucher_lien_quan?: string;
  contact_lien_quan?: string;
  trang_thai?: NotificationTrangThai;
  thong_bao_cho?: string;
};

export type NotificationRecord = NotificationCreateInput & {
  id: string;
  created?: string;
  updated?: string;
  expand?: Record<string, any>;
};

function authHeaders(): HeadersInit {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
}

export async function listNotifications(params?: {
  page?: number;
  perPage?: number;
  sort?: string;
  filter?: string;
}): Promise<{ items: NotificationRecord[]; page: number; perPage: number; totalPages: number; totalItems: number }> {
  const qs = new URLSearchParams();
  if (params?.page) qs.set('page', String(params.page));
  if (params?.perPage) qs.set('perPage', String(params.perPage));
  if (params?.sort) qs.set('sort', params.sort);
  if (params?.filter) qs.set('filter', params.filter);
  const res = await fetch(`/api/admin/notifications?${qs}`, { headers: authHeaders() });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể tải danh sách thông báo');
  return res.json();
}

export async function createNotification(input: NotificationCreateInput): Promise<NotificationRecord> {
  const res = await fetch('/api/admin/notifications', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể tạo thông báo');
  return res.json();
}

export async function updateNotification(id: string, data: Partial<NotificationCreateInput>): Promise<NotificationRecord> {
  const res = await fetch('/api/admin/notifications', {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ id, ...data }),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể cập nhật thông báo');
  return res.json();
}

export async function deleteNotification(id: string): Promise<void> {
  const res = await fetch(`/api/admin/notifications?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể xóa thông báo');
}

export async function markAsRead(id: string): Promise<NotificationRecord> {
  return updateNotification(id, { trang_thai: 'da_doc' });
}

export async function markAllAsRead(): Promise<{ ok: boolean }> {
  const res = await fetch('/api/admin/notifications/mark-all-read', {
    method: 'POST',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể đánh dấu tất cả đã đọc');
  return res.json();
}

export async function getUnreadCount(userId?: string): Promise<number> {
  const qs = new URLSearchParams();
  qs.set('filter', userId ? `trang_thai = "chua_doc" && thong_bao_cho = "${userId}"` : 'trang_thai = "chua_doc"');
  const res = await fetch(`/api/admin/notifications/unread-count?${qs}`, { headers: authHeaders() });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể lấy số thông báo chưa đọc');
  const data = await res.json();
  return data.count ?? 0;
}
