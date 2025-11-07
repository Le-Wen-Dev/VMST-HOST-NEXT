import PocketBase from 'pocketbase';
import { pb } from './pocketbase';

const ORDERS_COLLECTION = 'orders';
const baseUrl = import.meta.env.VITE_PB_URL as string;

if (!baseUrl || typeof baseUrl !== 'string' || !/^https?:\/\//.test(baseUrl)) {
  console.error('PocketBase base URL (VITE_PB_URL) is missing or invalid:', baseUrl);
}

// Dedicated PocketBase client for orders (admin operations)
const pbOrders = new PocketBase(baseUrl || 'http://127.0.0.1:8090');
pbOrders.autoCancellation(false);

function getAdminCreds() {
  const email = (import.meta.env.VITE_CONTACT_ADMIN_EMAIL as string) || 'admin@vmst.host';
  const password = (import.meta.env.VITE_CONTACT_ADMIN_PASSWORD as string) || 'admin@!@#';
  return { email, password };
}

let ordersAuthPromise: Promise<void> | null = null;

async function ensureOrdersAdminAuth() {
  if (pbOrders.authStore.isValid) return;
  const { email, password } = getAdminCreds();
  const normalizedEmail = (email || '').trim().toLowerCase();
  if (!normalizedEmail || !password) {
    throw new Error('Thiếu cấu hình admin cho Orders: VITE_CONTACT_ADMIN_EMAIL/VITE_CONTACT_ADMIN_PASSWORD');
  }
  if (!ordersAuthPromise) {
    ordersAuthPromise = (async () => {
      try {
        await pbOrders.admins.authWithPassword(normalizedEmail, password);
      } catch (err: any) {
        ordersAuthPromise = null; // reset so we can retry later
        const status = err?.status || err?.code;
        const msg = err?.message || 'Đăng nhập admin thất bại';
        throw new Error(`Orders admin auth error (${status}): ${msg}. Vui lòng kiểm tra email/password admin và VITE_PB_URL.`);
      }
    })();
  }
  await ordersAuthPromise;
}

export type OrderCreateInput = {
  ma_don_hang?: string;
  server?: string; // relation id
  thanh_toan?: string;
  trang_thai_su_dung?: string;
  // In PocketBase, relation fields can be single or multiple. The app's "orders.san_pham"
  // is configured as Multiple, so we accept either a single id or an array of ids here.
  san_pham?: string | string[]; // relation id(s)
  ngay_het_han?: string; // ISO string
  khach_hang?: string; // relation id (customer/user id)
  gia_tri?: string;
  hoa_hong_cho_aff?: string;
  host_url?: string;
  host_username?: string;
  host_password?: string;
  ghi_chu_noi_bo?: string;
};

export type OrderRecord = OrderCreateInput & {
  id: string;
  created?: string;
  updated?: string;
  expand?: any;
};

export async function listOrders(params?: { page?: number; perPage?: number; thanh_toan?: string; trang_thai_su_dung?: string; search?: string; expand?: string; }): Promise<{ items: OrderRecord[]; page: number; perPage: number; totalPages: number; totalItems: number; }>
{
  await ensureOrdersAdminAuth();
  const page = params?.page ?? 1;
  const perPage = params?.perPage ?? 20;
  const filters: string[] = [];
  if (params?.thanh_toan && params.thanh_toan !== 'all') {
    filters.push(`thanh_toan = \"${params.thanh_toan}\"`);
  }
  if (params?.trang_thai_su_dung && params.trang_thai_su_dung !== 'all') {
    filters.push(`trang_thai_su_dung = \"${params.trang_thai_su_dung}\"`);
  }
  if (params?.search) {
    const s = params.search.replace(/\"/g, '\\\"');
    filters.push(`(ma_don_hang ~ \"${s}\" || gia_tri ~ \"${s}\" || host_url ~ \"${s}\" || host_username ~ \"${s}\")`);
  }
  const filter = filters.length ? filters.join(' && ') : undefined;

  // Progressive sort fallback: '-ngay_dat_hang' → '-created_at' → '-created' → 'created' → none
  // Ưu tiên ngay_dat_hang theo yêu cầu nghiệp vụ, sau đó mới fallback
  const sortCandidates: Array<string | undefined> = ['-ngay_dat_hang', '-created_at', '-created', 'created', undefined];
  let lastErr: any = null;
  for (const sort of sortCandidates) {
    try {
      const res = await pbOrders.collection(ORDERS_COLLECTION).getList(page, perPage, {
        filter,
        sort,
        expand: params?.expand,
      });
      return {
        items: res.items as unknown as OrderRecord[],
        page: res.page,
        perPage: res.perPage,
        totalPages: res.totalPages,
        totalItems: res.totalItems,
      };
    } catch (err: any) {
      lastErr = err;
      // Chỉ thử tiếp khi là lỗi 400 (bad query)
      if (err?.status !== 400) break;
    }
  }
  const status = lastErr?.status || lastErr?.code;
  const msg = lastErr?.message || 'Không thể tải danh sách đơn hàng';
  if (status === 400) {
    throw new Error(`${msg}. Gợi ý: kiểm tra expand (${params?.expand || 'none'}) và field sort '-created'.`);
  }
  throw new Error(`${msg} (status ${status}). Vui lòng kiểm tra VITE_PB_URL và quyền admin.`);
}

function generateOrderCode(): string {
  // 6-character random uppercase alphanumeric code
  const code = Math.random().toString(36).slice(2, 8).toUpperCase();
  return code;
}

export async function createOrder(input: OrderCreateInput): Promise<OrderRecord> {
  await ensureOrdersAdminAuth();
  const payload: any = { ...input };
  if (!payload.ma_don_hang || !String(payload.ma_don_hang).trim()) {
    payload.ma_don_hang = generateOrderCode();
  }
  // Align defaults to PocketBase enum values
  if (!payload.trang_thai_su_dung) payload.trang_thai_su_dung = 'tat_tam_thoi';
  if (!payload.thanh_toan) payload.thanh_toan = 'cho_thanh_toan';
  // Remove empty strings for optional fields and normalize relation arrays
  ['server','khach_hang','ngay_het_han','gia_tri','hoa_hong_cho_aff','host_url','host_username','host_password','ghi_chu_noi_bo'].forEach((k) => {
    if (payload[k] !== undefined && String(payload[k]).trim() === '') {
      delete payload[k];
    }
  });
  if (payload.san_pham !== undefined) {
    if (Array.isArray(payload.san_pham)) {
      payload.san_pham = payload.san_pham.filter((id: any) => typeof id === 'string' && id.trim() !== '');
      if (payload.san_pham.length === 0) delete payload.san_pham;
    } else if (typeof payload.san_pham === 'string') {
      if (payload.san_pham.trim() === '') delete payload.san_pham;
    }
  }
  return await pbOrders.collection(ORDERS_COLLECTION).create(payload) as unknown as OrderRecord;
}

export async function updateOrder(id: string, data: Partial<OrderCreateInput>): Promise<OrderRecord> {
  await ensureOrdersAdminAuth();
  const payload: any = { ...data };
  ['server','khach_hang','ngay_het_han','gia_tri','hoa_hong_cho_aff','host_url','host_username','host_password','ghi_chu_noi_bo'].forEach((k) => {
    if (payload[k] !== undefined && String(payload[k]).trim() === '') {
      delete payload[k];
    }
  });
  if (payload.san_pham !== undefined) {
    if (Array.isArray(payload.san_pham)) {
      payload.san_pham = payload.san_pham.filter((id: any) => typeof id === 'string' && id.trim() !== '');
      if (payload.san_pham.length === 0) delete payload.san_pham;
    } else if (typeof payload.san_pham === 'string') {
      if (payload.san_pham.trim() === '') delete payload.san_pham;
    }
  }
  return await pbOrders.collection(ORDERS_COLLECTION).update(id, payload) as unknown as OrderRecord;
}

export async function deleteOrder(id: string): Promise<void> {
  await ensureOrdersAdminAuth();
  await pbOrders.collection(ORDERS_COLLECTION).delete(id);
}

export async function listMyOrders(params?: { page?: number; perPage?: number; expand?: string; }): Promise<{ items: OrderRecord[]; page: number; perPage: number; totalPages: number; totalItems: number; }>
{
  // Use current user session
  if (!pb.authStore.isValid || !pb.authStore.model?.id) {
    return { items: [], page: 1, perPage: params?.perPage ?? 20, totalPages: 0, totalItems: 0 };
  }
  const userId = pb.authStore.model?.id as string;
  const page = params?.page ?? 1;
  const perPage = params?.perPage ?? 20;

  // Progressive sort fallback: '-ngay_dat_hang' → '-created_at' → '-created' → 'created' → none
  const sortCandidates: Array<string | undefined> = ['-ngay_dat_hang', '-created_at', '-created', 'created', undefined];
  let lastErr: any = null;
  for (const sort of sortCandidates) {
    try {
      const res = await pb.collection(ORDERS_COLLECTION).getList(page, perPage, {
        filter: `khach_hang = \"${userId}\"`,
        sort,
        expand: params?.expand,
      });
      return {
        items: res.items as unknown as OrderRecord[],
        page: res.page,
        perPage: res.perPage,
        totalPages: res.totalPages,
        totalItems: res.totalItems,
      };
    } catch (err: any) {
      lastErr = err;
      if (err?.status !== 400) break; // Only fallback for bad query
    }
  }
  const status = lastErr?.status || lastErr?.code;
  const msg = lastErr?.message || 'Không thể tải danh sách đơn hàng';
  if (status === 400) {
    throw new Error(`${msg}. Gợi ý: kiểm tra field sort 'created' của collection PocketBase.`);
  }
  throw new Error(`${msg} (status ${status}). Vui lòng kiểm tra VITE_PB_URL và phiên đăng nhập.`);
}

export async function createMyOrder(input: Partial<OrderCreateInput>): Promise<OrderRecord> {
  if (!pb.authStore.isValid || !pb.authStore.model?.id) {
    throw new Error('Bạn cần đăng nhập để tạo đơn hàng');
  }
  const payload: any = { ...input };
  if (!payload.khach_hang) payload.khach_hang = pb.authStore.model.id;
  if (!payload.ma_don_hang || !String(payload.ma_don_hang).trim()) {
    payload.ma_don_hang = generateOrderCode();
  }
  if (!payload.trang_thai_su_dung) payload.trang_thai_su_dung = 'tat_tam_thoi';
  if (!payload.thanh_toan) payload.thanh_toan = 'cho_thanh_toan';
  ['server','khach_hang','ngay_het_han','gia_tri','hoa_hong_cho_aff','host_url','host_username','host_password','ghi_chu_noi_bo'].forEach((k) => {
    if (payload[k] !== undefined && String(payload[k]).trim() === '') {
      delete payload[k];
    }
  });
  if (payload.san_pham !== undefined) {
    if (Array.isArray(payload.san_pham)) {
      payload.san_pham = payload.san_pham.filter((id: any) => typeof id === 'string' && id.trim() !== '');
      if (payload.san_pham.length === 0) delete payload.san_pham;
    } else if (typeof payload.san_pham === 'string') {
      if (payload.san_pham.trim() === '') delete payload.san_pham;
    }
  }
  return await pb.collection(ORDERS_COLLECTION).create(payload) as unknown as OrderRecord;
}

export function buildOrderEmail(order: OrderRecord & { customerEmail?: string; customerName?: string; }): { subject: string; body: string; } {
  const subject = `Thông tin đơn hàng ${order.ma_don_hang || order.id}`;
  const lines = [
    `Xin chào ${order.customerName || ''},`,
    '',
    'Thông tin đơn hàng của bạn:',
    `- Mã đơn hàng: ${order.ma_don_hang || order.id}`,
    `- Trạng thái sử dụng: ${order.trang_thai_su_dung || '-'}`,
    `- Thanh toán: ${order.thanh_toan || '-'}`,
    `- Giá trị: ${order.gia_tri || '-'}`,
    `- Sản phẩm: ${order.san_pham || '-'}`,
    `- Server: ${order.server || '-'}`,
    `- Ngày hết hạn: ${order.ngay_het_han || '-'}`,
    '',
    'Thông tin truy cập dịch vụ:',
    `- URL: ${order.host_url || '-'}`,
    `- Username: ${order.host_username || '-'}`,
    `- Password: ${order.host_password || '-'}`,
    '',
    'Nếu bạn cần hỗ trợ, vui lòng phản hồi email này hoặc liên hệ hotline 0832575905.',
    'Trân trọng,',
    'VMST.HOST'
  ];
  const body = lines.join('\n');
  return { subject, body };
}