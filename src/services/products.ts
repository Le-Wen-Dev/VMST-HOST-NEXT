import PocketBase from 'pocketbase';

const PRODUCTS_COLLECTION = 'products';
const baseUrl = import.meta.env.VITE_PB_URL as string;

// Dedicated PocketBase client for products so we don't interfere with the user's session
const pbProducts = new PocketBase(baseUrl);
pbProducts.autoCancellation(false);

function getAdminCreds() {
  const email = (import.meta.env.VITE_CONTACT_ADMIN_EMAIL as string) || 'admin@vmst.host';
  const password = (import.meta.env.VITE_CONTACT_ADMIN_PASSWORD as string) || 'admin@!@#';
  return { email, password };
}

let productsAuthPromise: Promise<void> | null = null;

async function ensureProductsAuth() {
  if (pbProducts.authStore.isValid) return;
  if (!productsAuthPromise) {
    const { email, password } = getAdminCreds();
    const normalizedEmail = (email || '').trim().toLowerCase();
    productsAuthPromise = (async () => {
      try {
        if (!normalizedEmail || !password) {
          console.warn('[Products] Admin credentials missing, skipping auth');
          return;
        }
        await pbProducts.admins.authWithPassword(normalizedEmail, password);
        console.log('[Products] Admin auth successful');
      } catch (err: any) {
        // Log and allow unauthenticated fallback
        const status = err?.status || err?.code;
        const message = err?.message || 'Unknown error';
        console.warn(`[Products] Admin auth failed (${status}):`, message);
        console.warn('[Products] Will continue without admin auth - some operations may fail');
        // Reset promise to allow retry
        productsAuthPromise = null;
      }
    })();
  }
  await productsAuthPromise;
}

export type ProductCreateInput = {
  ten_san_pham: string;
  danh_muc?: string; // fixed categories: "Wordpress max speed" | "VPS" | "Email"
  gia_ban?: string;
  don_vi?: string;
  thong_so?: any; // JSON object or array
  tinh_nang?: any; // JSON object or array
  trang_thai?: string; // active/inactive/draft
  thu_tu_hien_thi?: string; // order number as string per API
};

export type ProductRecord = ProductCreateInput & {
  id: string;
  created?: string;
  updated?: string;
};

export async function listProducts(params?: { page?: number; perPage?: number; status?: string; search?: string; }): Promise<{ items: ProductRecord[]; page: number; perPage: number; totalPages: number; totalItems: number; }>
{
  // Try unauthenticated first, then fallback to admin if needed
  await ensureProductsAuth();
  const page = params?.page ?? 1;
  const perPage = params?.perPage ?? 20;
  const filters: string[] = [];
  if (params?.status && params.status !== 'all') {
    filters.push(`trang_thai = \"${params.status}\"`);
  }
  if (params?.search) {
    const s = params.search.replace(/\"/g, '\\\"');
    filters.push(`(ten_san_pham ~ \"${s}\" || danh_muc ~ \"${s}\")`);
  }
  const filter = filters.length ? filters.join(' && ') : undefined;

  // Progressive sort fallback: '-created' → 'created' → none
  const sortCandidates: Array<string | undefined> = ['-created', 'created', undefined];
  let lastErr: any = null;
  for (const sort of sortCandidates) {
    try {
      const res = await pbProducts.collection(PRODUCTS_COLLECTION).getList(page, perPage, { filter, sort });
      return {
        items: res.items as unknown as ProductRecord[],
        page: res.page,
        perPage: res.perPage,
        totalPages: res.totalPages,
        totalItems: res.totalItems,
      };
    } catch (err: any) {
      lastErr = err;
      // If permission error, try admin auth then retry once
      if (err?.status === 403 || err?.status === 401) {
        try {
          await ensureProductsAuth();
          const res = await pbProducts.collection(PRODUCTS_COLLECTION).getList(page, perPage, { filter, sort });
          return {
            items: res.items as unknown as ProductRecord[],
            page: res.page,
            perPage: res.perPage,
            totalPages: res.totalPages,
            totalItems: res.totalItems,
          };
        } catch (e) {
          lastErr = e;
        }
      }
      // Only continue trying when bad query (400)
      if (err?.status !== 400) break;
    }
  }
  const status = lastErr?.status || lastErr?.code;
  const msg = lastErr?.message || 'Không thể tải danh sách sản phẩm';
  throw new Error(`${msg} (status ${status}). Vui lòng kiểm tra VITE_PB_URL và quyền truy cập products.`);
}

export async function createProduct(input: ProductCreateInput): Promise<ProductRecord> {
  await ensureProductsAuth();
  const payload: any = { ...input };
  payload.ten_san_pham = input.ten_san_pham.trim();
  if (input.danh_muc) payload.danh_muc = String(input.danh_muc).trim();
  payload.trang_thai = input.trang_thai || 'active';
  return await pbProducts.collection(PRODUCTS_COLLECTION).create(payload) as unknown as ProductRecord;
}

export async function updateProduct(id: string, data: Partial<ProductCreateInput>): Promise<ProductRecord> {
  await ensureProductsAuth();
  const payload: any = { ...data };
  if (payload.ten_san_pham) payload.ten_san_pham = String(payload.ten_san_pham).trim();
  if (payload.danh_muc) payload.danh_muc = String(payload.danh_muc).trim();
  return await pbProducts.collection(PRODUCTS_COLLECTION).update(id, payload) as unknown as ProductRecord;
}

export async function deleteProduct(id: string): Promise<void> {
  await ensureProductsAuth();
  await pbProducts.collection(PRODUCTS_COLLECTION).delete(id);
}