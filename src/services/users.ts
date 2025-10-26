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
  name?: string;
  email?: string;
  phone?: string;
  created?: string;
  updated?: string;
};

export async function listUsers(params?: { page?: number; perPage?: number; search?: string; }): Promise<{ items: UserRecord[]; page: number; perPage: number; totalPages: number; totalItems: number; }>
{
  await ensureUsersAdminAuth();
  const page = params?.page ?? 1;
  const perPage = params?.perPage ?? 50;
  const filters: string[] = [];
  if (params?.search) {
    const s = params.search.replace(/"/g, '\\"');
    filters.push(`(email ~ \"${s}\" || name ~ \"${s}\")`);
  }
  const filter = filters.length ? filters.join(' && ') : undefined;
  const res = await pbUsers.collection(USERS_COLLECTION).getList(page, perPage, { filter, sort: '-created' });
  const items = (res.items || []).map((r: any) => ({ id: r.id, name: r.name || r.username || '', email: r.email, phone: r.phone, created: r.created, updated: r.updated })) as UserRecord[];
  return { items, page: res.page, perPage: res.perPage, totalPages: res.totalPages, totalItems: res.totalItems };
}