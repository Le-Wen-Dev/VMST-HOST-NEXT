import PocketBase from 'pocketbase';

const SERVERS_COLLECTION = 'servers';
const baseUrl = import.meta.env.VITE_PB_URL as string;

// Dedicated PocketBase client for servers
const pbServers = new PocketBase(baseUrl);
pbServers.autoCancellation(false);

function getAdminCreds() {
  const email = (import.meta.env.VITE_CONTACT_ADMIN_EMAIL as string) || 'admin@vmst.host';
  const password = (import.meta.env.VITE_CONTACT_ADMIN_PASSWORD as string) || 'admin@!@#';
  return { email, password };
}

let serversAuthPromise: Promise<void> | null = null;

async function ensureServersAuth() {
  if (pbServers.authStore.isValid) return;
  const { email, password } = getAdminCreds();
  const normalizedEmail = email.trim().toLowerCase();
  // Authenticate as PocketBase Admin (superuser)
  if (!serversAuthPromise) {
    serversAuthPromise = pbServers.admins.authWithPassword(normalizedEmail, password).then(() => {});
  }
  await serversAuthPromise;
}

export type ServerCreateInput = {
  nha_cung_cap?: string;
  so_account_active?: string; // current accounts
  het_han?: string;           // expiry date
  gia?: string;               // monthly cost (string per API)
  ip?: string;
  vps_pass?: string;
  panel?: string;             // panel name
  link_panel?: string;        // panel link
  admin_panel?: string;       // admin username
  pass_panel?: string;        // admin password
  status?: string;            // active/expired/maintenance
  thong_so?: any;             // JSON object or array
};

export type ServerRecord = ServerCreateInput & {
  id: string;
  created?: string;
  updated?: string;
};

export async function listServers(params?: { page?: number; perPage?: number; status?: string; search?: string; }): Promise<{ items: ServerRecord[]; page: number; perPage: number; totalPages: number; totalItems: number; }>
{
  await ensureServersAuth();
  const page = params?.page ?? 1;
  const perPage = params?.perPage ?? 20;
  const filters: string[] = [];
  if (params?.status && params.status !== 'all') {
    filters.push(`status = \"${params.status}\"`);
  }
  if (params?.search) {
    const s = params.search.replace(/\"/g, '\\\"');
    filters.push(`(nha_cung_cap ~ \"${s}\" || ip ~ \"${s}\")`);
  }
  const filter = filters.length ? filters.join(' && ') : undefined;
  const res = await pbServers.collection(SERVERS_COLLECTION).getList(page, perPage, { filter, sort: '-created' });
  return {
    items: res.items as unknown as ServerRecord[],
    page: res.page,
    perPage: res.perPage,
    totalPages: res.totalPages,
    totalItems: res.totalItems,
  };
}

export async function createServer(input: ServerCreateInput): Promise<ServerRecord> {
  await ensureServersAuth();
  const payload: any = { ...input };
  return await pbServers.collection(SERVERS_COLLECTION).create(payload) as unknown as ServerRecord;
}

export async function updateServer(id: string, data: Partial<ServerCreateInput>): Promise<ServerRecord> {
  await ensureServersAuth();
  const payload: any = { ...data };
  return await pbServers.collection(SERVERS_COLLECTION).update(id, payload) as unknown as ServerRecord;
}

export async function deleteServer(id: string): Promise<void> {
  await ensureServersAuth();
  await pbServers.collection(SERVERS_COLLECTION).delete(id);
}