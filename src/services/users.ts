import PocketBase from 'pocketbase';
import { pb } from './pocketbase';

const USERS_COLLECTION = 'users';
const baseUrl = import.meta.env.VITE_PB_URL as string;

// Dedicated PocketBase client for admin operations
const pbUsers = new PocketBase(baseUrl);
pbUsers.autoCancellation(false);

function getAdminCreds() {
  const email = (import.meta.env.VITE_CONTACT_ADMIN_EMAIL as string) || 'admin@vmst.host';
  const password = (import.meta.env.VITE_CONTACT_ADMIN_PASSWORD as string) || 'admin@!@#';
  return { email, password };
}

let usersAuthPromise: Promise<void> | null = null;

async function ensureUsersAdminAuth() {
  if (pbUsers.authStore.isValid) return;
  const { email, password } = getAdminCreds();
  const normalizedEmail = email.trim().toLowerCase();
  if (!usersAuthPromise) {
    usersAuthPromise = pbUsers.admins.authWithPassword(normalizedEmail, password).then(() => {});
  }
  await usersAuthPromise;
}

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

export async function listUsers(params?: { 
  page?: number; 
  perPage?: number; 
  search?: string;
  vai_tro?: string;
  trang_thai?: string;
}): Promise<{ items: UserRecord[]; page: number; perPage: number; totalPages: number; totalItems: number; }> {
  await ensureUsersAdminAuth();
  const page = params?.page ?? 1;
  const perPage = params?.perPage ?? 50;
  const filters: string[] = [];
  
  if (params?.search && params.search.trim()) {
    const s = params.search.trim().replace(/"/g, '\\"');
    filters.push(`(email ~ "${s}" || name ~ "${s}")`);
  }
  
  // Only add filter if explicitly set and not 'all'
  // Note: This will only match records that have the field set to the specified value
  // Records without the field will be excluded when filtering
  if (params?.vai_tro && params.vai_tro !== 'all' && params.vai_tro.trim()) {
    filters.push(`vai_tro = "${params.vai_tro}"`);
  }
  
  // Only add filter if explicitly set and not 'all'
  // Note: This will only match records that have the field set to the specified value
  // Records without the field will be excluded when filtering
  if (params?.trang_thai && params.trang_thai !== 'all' && params.trang_thai.trim()) {
    filters.push(`trang_thai = "${params.trang_thai}"`);
  }
  
  const filter = filters.length ? filters.join(' && ') : undefined;
  
  console.log('listUsers params:', params);
  console.log('listUsers filter:', filter);
  
  const res = await pbUsers.collection(USERS_COLLECTION).getList(page, perPage, { 
    filter, 
    sort: '-created' 
  });
  
  console.log('listUsers response:', {
    totalItems: res.totalItems,
    totalPages: res.totalPages,
    page: res.page,
    perPage: res.perPage,
    itemsCount: res.items?.length || 0
  });
  
  const items = (res.items || []).map((r: any) => ({
    id: r.id,
    email: r.email || '',
    emailVisibility: r.emailVisibility,
    verified: r.verified,
    name: r.name || '',
    avatar: r.avatar ? pbUsers.files.getUrl(r, r.avatar) : undefined,
    bio: r.bio || '',
    vai_tro: r.vai_tro || '',
    trang_thai: r.trang_thai || 'active',
    so_luong_don_hang: r.so_luong_don_hang || '0',
    gia_tri_mua: r.gia_tri_mua || '0',
    dang_nhap_lan_cuoi: r.dang_nhap_lan_cuoi || '',
    created: r.created,
    updated: r.updated,
    // Legacy compatibility
    role: r.vai_tro || '',
    status: r.trang_thai || 'active',
    totalOrders: parseInt(r.so_luong_don_hang || '0'),
    totalSpent: parseFloat(r.gia_tri_mua || '0'),
    lastLogin: r.dang_nhap_lan_cuoi || '',
  })) as UserRecord[];
  
  return { 
    items, 
    page: res.page, 
    perPage: res.perPage, 
    totalPages: res.totalPages, 
    totalItems: res.totalItems 
  };
}

export async function getUserById(id: string): Promise<UserRecord> {
  await ensureUsersAdminAuth();
  const record = await pbUsers.collection(USERS_COLLECTION).getOne(id);
  return {
    id: record.id,
    email: record.email || '',
    emailVisibility: record.emailVisibility,
    verified: record.verified,
    name: record.name || '',
    avatar: record.avatar ? pbUsers.files.getUrl(record, record.avatar) : undefined,
    bio: record.bio || '',
    vai_tro: record.vai_tro || '',
    trang_thai: record.trang_thai || 'active',
    so_luong_don_hang: record.so_luong_don_hang || '0',
    gia_tri_mua: record.gia_tri_mua || '0',
    dang_nhap_lan_cuoi: record.dang_nhap_lan_cuoi || '',
    created: record.created,
    updated: record.updated,
    role: record.vai_tro || '',
    status: record.trang_thai || 'active',
    totalOrders: parseInt(record.so_luong_don_hang || '0'),
    totalSpent: parseFloat(record.gia_tri_mua || '0'),
    lastLogin: record.dang_nhap_lan_cuoi || '',
  };
}

export async function createUser(data: CreateUserData): Promise<UserRecord> {
  await ensureUsersAdminAuth();
  
  const formData = new FormData();
  formData.append('email', data.email);
  formData.append('password', data.password);
  formData.append('passwordConfirm', data.passwordConfirm);
  
  if (data.emailVisibility !== undefined) {
    formData.append('emailVisibility', data.emailVisibility.toString());
  }
  
  if (data.verified !== undefined) {
    formData.append('verified', data.verified.toString());
  }
  
  if (data.name) {
    formData.append('name', data.name);
  }
  
  if (data.avatar) {
    formData.append('avatar', data.avatar);
  }
  
  if (data.bio) {
    formData.append('bio', data.bio);
  }
  
  if (data.vai_tro) {
    formData.append('vai_tro', data.vai_tro);
  }
  
  if (data.trang_thai) {
    formData.append('trang_thai', data.trang_thai);
  }
  
  if (data.so_luong_don_hang) {
    formData.append('so_luong_don_hang', data.so_luong_don_hang);
  }
  
  if (data.gia_tri_mua) {
    formData.append('gia_tri_mua', data.gia_tri_mua);
  }
  
  if (data.dang_nhap_lan_cuoi) {
    formData.append('dang_nhap_lan_cuoi', data.dang_nhap_lan_cuoi);
  }
  
  const record = await pbUsers.collection(USERS_COLLECTION).create(formData);
  
  return {
    id: record.id,
    email: record.email || '',
    emailVisibility: record.emailVisibility,
    verified: record.verified,
    name: record.name || '',
    avatar: record.avatar ? pbUsers.files.getUrl(record, record.avatar) : undefined,
    bio: record.bio || '',
    vai_tro: record.vai_tro || '',
    trang_thai: record.trang_thai || 'active',
    so_luong_don_hang: record.so_luong_don_hang || '0',
    gia_tri_mua: record.gia_tri_mua || '0',
    dang_nhap_lan_cuoi: record.dang_nhap_lan_cuoi || '',
    created: record.created,
    updated: record.updated,
  };
}

export async function updateUser(id: string, data: UpdateUserData): Promise<UserRecord> {
  await ensureUsersAdminAuth();
  
  const formData = new FormData();
  
  if (data.email) {
    formData.append('email', data.email);
  }
  
  if (data.emailVisibility !== undefined) {
    formData.append('emailVisibility', data.emailVisibility.toString());
  }
  
  if (data.verified !== undefined) {
    formData.append('verified', data.verified.toString());
  }
  
  if (data.name !== undefined) {
    formData.append('name', data.name || '');
  }
  
  if (data.avatar !== undefined) {
    if (data.avatar === null || data.avatar === '') {
      formData.append('avatar', '');
    } else if (data.avatar instanceof File) {
      formData.append('avatar', data.avatar);
    }
  }
  
  if (data.bio !== undefined) {
    formData.append('bio', data.bio || '');
  }
  
  if (data.vai_tro !== undefined) {
    formData.append('vai_tro', data.vai_tro || '');
  }
  
  if (data.trang_thai !== undefined) {
    formData.append('trang_thai', data.trang_thai || '');
  }
  
  if (data.so_luong_don_hang !== undefined) {
    formData.append('so_luong_don_hang', data.so_luong_don_hang || '0');
  }
  
  if (data.gia_tri_mua !== undefined) {
    formData.append('gia_tri_mua', data.gia_tri_mua || '0');
  }
  
  if (data.dang_nhap_lan_cuoi !== undefined) {
    formData.append('dang_nhap_lan_cuoi', data.dang_nhap_lan_cuoi || '');
  }
  
  if (data.password && data.passwordConfirm) {
    formData.append('password', data.password);
    formData.append('passwordConfirm', data.passwordConfirm);
  }
  
  const record = await pbUsers.collection(USERS_COLLECTION).update(id, formData);
  
  return {
    id: record.id,
    email: record.email || '',
    emailVisibility: record.emailVisibility,
    verified: record.verified,
    name: record.name || '',
    avatar: record.avatar ? pbUsers.files.getUrl(record, record.avatar) : undefined,
    bio: record.bio || '',
    vai_tro: record.vai_tro || '',
    trang_thai: record.trang_thai || 'active',
    so_luong_don_hang: record.so_luong_don_hang || '0',
    gia_tri_mua: record.gia_tri_mua || '0',
    dang_nhap_lan_cuoi: record.dang_nhap_lan_cuoi || '',
    created: record.created,
    updated: record.updated,
  };
}

export async function deleteUser(id: string): Promise<boolean> {
  await ensureUsersAdminAuth();
  await pbUsers.collection(USERS_COLLECTION).delete(id);
  return true;
}