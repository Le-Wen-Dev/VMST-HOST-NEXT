import PocketBase, { RecordModel } from 'pocketbase';

const baseUrl = import.meta.env.VITE_PB_URL as string;

if (!baseUrl || typeof baseUrl !== 'string' || !/^https?:\/\//.test(baseUrl)) {
  console.error('PocketBase base URL (VITE_PB_URL) is missing or invalid:', baseUrl);
}

export const pb = new PocketBase(baseUrl || 'http://127.0.0.1:8090');

// Persist auth store in localStorage and auto refresh
pb.authStore.loadFromCookie(document.cookie);

pb.autoCancellation(false);

// Optionally refresh auth on load
async function initAuth() {
  try {
    if (pb.authStore.isValid) {
      const model: any = pb.authStore.model;
      const collectionName = model?.collectionName || 'thanh_vien';
      await pb.collection(collectionName).authRefresh();
    }
  } catch (e) {
    console.warn('Auth refresh failed:', e);
    pb.authStore.clear();
  }
}

initAuth();

export type UserRecord = RecordModel & {
  email: string;
  ten?: string; // name
  password?: string;
  ngay_sinh?: string; // birth date
  so_dien_thoai?: number; // phone number
  dia_chi?: string; // address
  chuc_vu?: string; // position
  ngay_vao_lam?: string; // start date
  trang_thai?: string; // status
  luong_thang?: string; // monthly salary
  hoc_van?: string; // education
  chuyen_mon?: string; // specialization
  hieu_suat_lam_viec?: string; // work efficiency
  ghi_chu?: string; // notes
  vai_tro?: string; // role (for compatibility)
  // Legacy fields for compatibility
  name?: string;
  phone?: string;
  address?: string;
  bio?: string;
};

export function getCurrentUser(): UserRecord | null {
  return (pb.authStore.model as UserRecord) || null;
}

export function getToken(): string | null {
  return pb.authStore.token || null;
}

export function isAdmin(): boolean {
  const u = getCurrentUser();
  const email = (u?.email || '').toLowerCase();
  const byRole = (u?.vai_tro || '').toLowerCase() === 'admin' || (u?.chuc_vu || '').toLowerCase() === 'admin';
  const byEmail = email === 'admin@vmst.host';
  return byRole || byEmail;
}