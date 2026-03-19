import { pb } from '@/services/pocketbase';
import { getToken } from '@/services/pocketbase';

export type ProductCreateInput = {
  ten_san_pham: string;
  danh_muc?: string;
  gia_ban?: string;
  don_vi?: string;
  thong_so?: any;
  tinh_nang?: any;
  trang_thai?: string;
  thu_tu_hien_thi?: string;
};

export type ProductRecord = ProductCreateInput & {
  id: string;
  created?: string;
  updated?: string;
};

function authHeaders(): HeadersInit {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
}

// Public read — use PB client directly (no admin auth needed)
export async function listProducts(params?: {
  page?: number;
  perPage?: number;
  status?: string;
  search?: string;
}): Promise<{ items: ProductRecord[]; page: number; perPage: number; totalPages: number; totalItems: number }> {
  const { page = 1, perPage = 20, status, search } = params || {};
  const filters: string[] = [];
  if (status && status !== 'all') filters.push(`trang_thai = "${status}"`);
  if (search) {
    const s = search.replace(/"/g, '\\"');
    filters.push(`(ten_san_pham ~ "${s}" || danh_muc ~ "${s}")`);
  }
  const filter = filters.length ? filters.join(' && ') : undefined;
  const res = await pb.collection('products').getList<ProductRecord>(page, perPage, { filter, sort: '-created' });
  return {
    items: res.items,
    page: res.page,
    perPage: res.perPage,
    totalPages: res.totalPages,
    totalItems: res.totalItems,
  };
}

export async function createProduct(input: ProductCreateInput): Promise<ProductRecord> {
  const res = await fetch('/api/admin/products', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể tạo sản phẩm');
  return res.json();
}

export async function updateProduct(id: string, data: Partial<ProductCreateInput>): Promise<ProductRecord> {
  const res = await fetch('/api/admin/products', {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ id, ...data }),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể cập nhật sản phẩm');
  return res.json();
}

export async function deleteProduct(id: string): Promise<void> {
  const res = await fetch(`/api/admin/products?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể xóa sản phẩm');
}
