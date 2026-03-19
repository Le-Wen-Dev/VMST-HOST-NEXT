import { getToken } from '@/services/pocketbase';

export type TicketStatusPB = 'cho_tech_rep' | 'cho_khach_rep' | 'dong_ticket';
export type TicketDepartmentPB = 'sale' | 'technical';
export type TicketPriorityPB = 'thap' | 'trung_binh' | 'cao';

export interface TicketCreateInput {
  tieu_de: string;
  tin_nhan: string;
  phan_hoi_cua_he_thong?: Array<{ text: string; at: string }> | string;
  don_hang?: string;
  khach_hang?: string;
  bo_phan: TicketDepartmentPB;
  do_uu_tien: TicketPriorityPB;
  trang_thai: TicketStatusPB;
}

export interface ListTicketsParams {
  page?: number;
  perPage?: number;
  search?: string;
  status?: TicketStatusPB | 'all';
  department?: TicketDepartmentPB | 'all';
  priority?: TicketPriorityPB | 'all';
  userId?: string;
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

function authHeaders(): HeadersInit {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
}

export async function createTicket(input: TicketCreateInput): Promise<any> {
  const res = await fetch('/api/admin/tickets', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể tạo ticket');
  return res.json();
}

export async function listTickets(params: ListTicketsParams = {}): Promise<{
  items: any[];
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
}> {
  const qs = new URLSearchParams();
  if (params.page) qs.set('page', String(params.page));
  if (params.perPage) qs.set('perPage', String(params.perPage));
  if (params.status) qs.set('status', params.status);
  if (params.department) qs.set('department', params.department);
  if (params.priority) qs.set('priority', params.priority);
  if (params.userId) qs.set('userId', params.userId);
  if (params.search) qs.set('search', params.search);
  const res = await fetch(`/api/admin/tickets?${qs}`, { headers: authHeaders() });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể tải danh sách ticket');
  return res.json();
}

export async function updateTicket(id: string, data: Partial<TicketCreateInput>): Promise<any> {
  const res = await fetch('/api/admin/tickets', {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ id, ...data }),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể cập nhật ticket');
  return res.json();
}

export async function deleteTicket(id: string): Promise<void> {
  const res = await fetch(`/api/admin/tickets?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể xóa ticket');
}
