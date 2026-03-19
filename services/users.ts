import { getToken } from '@/services/pocketbase';

export type UserRecord = {
  id: string;
  email: string;
  emailVisibility?: boolean;
  verified?: boolean;
  name?: string;
  avatar?: string;
  bio?: string;
  vai_tro?: string;
  trang_thai?: string;
  so_luong_don_hang?: string;
  gia_tri_mua?: string;
  dang_nhap_lan_cuoi?: string;
  created?: string;
  updated?: string;
  // Legacy fields
  phone?: string;
  role?: string;
  status?: string;
  totalOrders?: number;
  totalSpent?: number;
  lastLogin?: string;
};

export interface CreateUserData {
  email: string;
  password: string;
  passwordConfirm: string;
  emailVisibility?: boolean;
  verified?: boolean;
  name?: string;
  avatar?: File | null;
  bio?: string;
  vai_tro?: string;
  trang_thai?: string;
  so_luong_don_hang?: string;
  gia_tri_mua?: string;
  dang_nhap_lan_cuoi?: string;
}

export interface UpdateUserData {
  email?: string;
  emailVisibility?: boolean;
  verified?: boolean;
  name?: string;
  avatar?: File | null;
  bio?: string;
  vai_tro?: string;
  trang_thai?: string;
  so_luong_don_hang?: string;
  gia_tri_mua?: string;
  dang_nhap_lan_cuoi?: string;
  password?: string;
  passwordConfirm?: string;
}

function authHeaders(): HeadersInit {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
}

export async function listUsers(params?: {
  page?: number;
  perPage?: number;
  search?: string;
  vai_tro?: string;
  trang_thai?: string;
}): Promise<{ items: UserRecord[]; page: number; perPage: number; totalPages: number; totalItems: number }> {
  const qs = new URLSearchParams();
  if (params?.page) qs.set('page', String(params.page));
  if (params?.perPage) qs.set('perPage', String(params.perPage));
  if (params?.search) qs.set('search', params.search);
  if (params?.vai_tro) qs.set('vai_tro', params.vai_tro);
  if (params?.trang_thai) qs.set('trang_thai', params.trang_thai);
  const res = await fetch(`/api/admin/users?${qs}`, { headers: authHeaders() });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể tải danh sách người dùng');
  return res.json();
}

export async function getUserById(id: string): Promise<UserRecord> {
  const res = await fetch(`/api/admin/users?id=${encodeURIComponent(id)}`, { headers: authHeaders() });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể lấy thông tin người dùng');
  return res.json();
}

export async function createUser(data: CreateUserData): Promise<UserRecord> {
  // avatar is a File — must use FormData; send as JSON without avatar for now
  // (avatar upload via admin API route would need multipart support)
  const payload: any = { ...data };
  delete payload.avatar;
  const res = await fetch('/api/admin/users', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể tạo người dùng');
  return res.json();
}

export async function updateUser(id: string, data: UpdateUserData): Promise<UserRecord> {
  const payload: any = { id, ...data };
  delete payload.avatar; // avatar upload not supported via JSON route
  const res = await fetch('/api/admin/users', {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể cập nhật người dùng');
  return res.json();
}

export async function deleteUser(id: string): Promise<boolean> {
  const res = await fetch(`/api/admin/users?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể xóa người dùng');
  return true;
}
