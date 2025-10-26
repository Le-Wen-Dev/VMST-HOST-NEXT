import PocketBase from 'pocketbase';

const CONTACTS_COLLECTION = 'contacts';
const baseUrl = import.meta.env.VITE_PB_URL as string;

// Dedicated PocketBase client for contacts so we don't interfere with the user's session
const pbContacts = new PocketBase(baseUrl);
pbContacts.autoCancellation(false);

function getAdminCreds() {
  const email = (import.meta.env.VITE_CONTACT_ADMIN_EMAIL as string) || 'admin@vmst.host';
  const password = (import.meta.env.VITE_CONTACT_ADMIN_PASSWORD as string) || 'admin@!@#';
  return { email, password };
}

let contactsAuthPromise: Promise<void> | null = null;

async function ensureContactsAuth() {
  if (pbContacts.authStore.isValid) return;
  const { email, password } = getAdminCreds();
  const normalizedEmail = email.trim().toLowerCase();
  if (!contactsAuthPromise) {
    contactsAuthPromise = pbContacts.admins.authWithPassword(normalizedEmail, password).then(() => {});
  }
  await contactsAuthPromise;
}

export type ContactCreateInput = {
  ho_va_ten: string;
  email: string;
  so_dien_thoai?: string;
  trang_nhan_lead?: string; // source page/form
  trang_thai?: string; // newlead/contacted/qualifiedlead/opportunity/customer/lost
  ip_adress?: string;
  user_agent?: any; // JSON object or array
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

export async function submitContact(input: ContactCreateInput): Promise<any> {
  await ensureContactsAuth();
  const payload = {
    ...input,
    email: input.email.trim().toLowerCase(),
    trang_thai: input.trang_thai || 'newlead',
    user_agent: input.user_agent ?? { ua: navigator.userAgent },
  };
  const record = await pbContacts.collection(CONTACTS_COLLECTION).create(payload);
  return record;
}

export async function listContacts(params?: { page?: number; perPage?: number; status?: string; search?: string; }): Promise<{ items: any[]; page: number; perPage: number; totalPages: number; totalItems: number; }>
{
  await ensureContactsAuth();
  const page = params?.page ?? 1;
  const perPage = params?.perPage ?? 20;
  const filters: string[] = [];
  if (params?.status && params.status !== 'all') {
    filters.push(`trang_thai = \"${params.status}\"`);
  }
  if (params?.search) {
    const s = params.search.replace(/\"/g, '\\\"');
    // PocketBase filter: contains in name or email
    filters.push(`(ho_va_ten ~ \"${s}\" || email ~ \"${s}\")`);
  }
  const filter = filters.length ? filters.join(' && ') : undefined;
  const res = await pbContacts.collection(CONTACTS_COLLECTION).getList(page, perPage, {
    filter,
    sort: '-created',
  });
  return {
    items: res.items,
    page: res.page,
    perPage: res.perPage,
    totalPages: res.totalPages,
    totalItems: res.totalItems,
  };
}

export async function updateContact(id: string, data: Partial<ContactCreateInput>): Promise<any> {
  await ensureContactsAuth();
  const payload: any = { ...data };
  if (payload.email) payload.email = String(payload.email).trim().toLowerCase();
  const record = await pbContacts.collection(CONTACTS_COLLECTION).update(id, payload);
  return record;
}

export async function deleteContact(id: string): Promise<void> {
  await ensureContactsAuth();
  await pbContacts.collection(CONTACTS_COLLECTION).delete(id);
}