import PocketBase from 'pocketbase';

const TICKETS_COLLECTION = 'tickets';
const baseUrl = import.meta.env.VITE_PB_URL as string;

// Dedicated PocketBase client for tickets, avoid interfering with app auth/store
const pbTickets = new PocketBase(baseUrl);
pbTickets.autoCancellation(false);

function getAdminCreds() {
  const email = (import.meta.env.VITE_TICKET_ADMIN_EMAIL as string) || (import.meta.env.VITE_CONTACT_ADMIN_EMAIL as string) || '';
  const password = (import.meta.env.VITE_TICKET_ADMIN_PASSWORD as string) || (import.meta.env.VITE_CONTACT_ADMIN_PASSWORD as string) || '';
  return { email, password };
}

let ticketsAuthPromise: Promise<void> | null = null;

async function ensureTicketsAuth() {
  if (pbTickets.authStore.isValid) return;
  const { email, password } = getAdminCreds();
  if (!email || !password) throw new Error('Missing admin credentials for tickets service');
  const normalizedEmail = email.trim().toLowerCase();
  if (!ticketsAuthPromise) {
    ticketsAuthPromise = pbTickets.admins.authWithPassword(normalizedEmail, password).then(() => {});
  }
  await ticketsAuthPromise;
}

export type TicketStatusPB = 'cho_tech_rep' | 'cho_khach_rep' | 'dong_ticket';
export type TicketDepartmentPB = 'sale' | 'technical';
export type TicketPriorityPB = 'thap' | 'trung_binh' | 'cao';

export interface TicketCreateInput {
  tieu_de: string;
  tin_nhan: string;
  // store staff replies history as JSON array
  phan_hoi_cua_he_thong?: Array<{ text: string; at: string }>|string;
  don_hang?: string; // relation record id
  khach_hang?: string; // relation record id (user/client)
  bo_phan: TicketDepartmentPB;
  do_uu_tien: TicketPriorityPB;
  trang_thai: TicketStatusPB;
}

export interface ListTicketsParams {
  page?: number;
  perPage?: number;
  search?: string; // search by subject or message
  status?: TicketStatusPB | 'all';
  department?: TicketDepartmentPB | 'all';
  priority?: TicketPriorityPB | 'all';
  userId?: string; // filter by khach_hang relation
}

export function mapPriorityToLabel(p: TicketPriorityPB): string {
  switch (p) {
    case 'thap': return 'Thấp';
    case 'trung_binh': return 'Trung bình';
    case 'cao': return 'Cao';
    default: return String(p);
  }
}

export function mapStatusToLabel(s: TicketStatusPB): string {
  switch (s) {
    case 'cho_tech_rep': return 'Chờ kỹ thuật phản hồi';
    case 'cho_khach_rep': return 'Chờ khách phản hồi';
    case 'dong_ticket': return 'Đóng ticket';
    default: return String(s);
  }
}

export async function createTicket(input: TicketCreateInput): Promise<any> {
  await ensureTicketsAuth();
  const payload = { ...input };
  const record = await pbTickets.collection(TICKETS_COLLECTION).create(payload);
  return record;
}

export async function listTickets(params: ListTicketsParams = {}): Promise<{ items: any[]; page: number; perPage: number; totalPages: number; totalItems: number; }>
{
  await ensureTicketsAuth();
  const page = params.page ?? 1;
  const perPage = params.perPage ?? 20;
  const filters: string[] = [];
  if (params.status && params.status !== 'all') filters.push(`trang_thai = \"${params.status}\"`);
  if (params.department && params.department !== 'all') filters.push(`bo_phan = \"${params.department}\"`);
  if (params.priority && params.priority !== 'all') filters.push(`do_uu_tien = \"${params.priority}\"`);
  if (params.userId) filters.push(`khach_hang = \"${params.userId}\"`);
  if (params.search) {
    const s = params.search.replace(/\"/g, '\\\"');
    filters.push(`(tieu_de ~ \"${s}\" || tin_nhan ~ \"${s}\")`);
  }
  const filter = filters.length ? filters.join(' && ') : undefined;
  const res = await pbTickets.collection(TICKETS_COLLECTION).getList(page, perPage, {
    filter,
    sort: '-updated',
  });
  return {
    items: res.items,
    page: res.page,
    perPage: res.perPage,
    totalPages: res.totalPages,
    totalItems: res.totalItems,
  };
}

export async function updateTicket(id: string, data: Partial<TicketCreateInput>): Promise<any> {
  await ensureTicketsAuth();
  const record = await pbTickets.collection(TICKETS_COLLECTION).update(id, data);
  return record;
}

export async function deleteTicket(id: string): Promise<void> {
  await ensureTicketsAuth();
  await pbTickets.collection(TICKETS_COLLECTION).delete(id);
}