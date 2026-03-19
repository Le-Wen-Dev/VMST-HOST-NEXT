import { getToken } from '@/services/pocketbase';

export type SettingSystemCreateInput = {
  ten_cong_ty?: string;
  link_website?: string;
  email_ho_tro?: string;
  hotline?: string;
  dia_chi?: string;
  mui_gio?: string;
  ngon_ngu_mac_dinh?: string;
  smtp_host?: string;
  smtp_port?: string | number;
  username_email?: string;
  password?: string;
  email_teamplate_tick?: string;
};

export type SettingSystemRecord = SettingSystemCreateInput & {
  id: string;
  created?: string;
  updated?: string;
};

function authHeaders(): HeadersInit {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
}

export async function getSettings(): Promise<SettingSystemRecord | null> {
  const res = await fetch('/api/admin/settings', { headers: authHeaders() });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể tải cài đặt hệ thống');
  return res.json();
}

export async function createSettings(input: SettingSystemCreateInput): Promise<SettingSystemRecord> {
  const res = await fetch('/api/admin/settings', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể tạo cài đặt hệ thống');
  return res.json();
}

export async function updateSettings(id: string, data: Partial<SettingSystemCreateInput>): Promise<SettingSystemRecord> {
  const res = await fetch('/api/admin/settings', {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ id, ...data }),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể cập nhật cài đặt hệ thống');
  return res.json();
}
