import PocketBase, { RecordModel } from 'pocketbase';

const baseUrl = process.env.NEXT_PUBLIC_PB_URL as string;

if (typeof window !== 'undefined') {
  if (!baseUrl || typeof baseUrl !== 'string' || !/^https?:\/\//.test(baseUrl)) {
    console.error('PocketBase base URL (NEXT_PUBLIC_PB_URL) is missing or invalid:', baseUrl);
  }
}

export const pb = new PocketBase(baseUrl || 'https://api.vmst.host');

// Only call loadFromCookie in the browser — never at module level (crashes SSR)
if (typeof window !== 'undefined') {
  pb.authStore.loadFromCookie(document.cookie);
}

pb.autoCancellation(false);

// initAuth must only run client-side
export function initAuth() {
  if (typeof window === 'undefined') return;
  (async () => {
    try {
      if (pb.authStore.isValid) {
        await pb.collection('users').authRefresh();
      }
    } catch (e) {
      console.warn('Auth refresh failed:', e);
      pb.authStore.clear();
    }
  })();
}

export type UserRecord = RecordModel & {
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
  const byRole = (u?.vai_tro || '').toLowerCase() === 'admin';
  const byEmail = email === 'admin@vmst.host';
  return byRole || byEmail;
}
