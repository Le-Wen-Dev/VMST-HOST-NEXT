import { pb } from '@/services/pocketbase';
import { getToken } from '@/services/pocketbase';

export interface BlogRecord {
  id: string;
  danh_muc?: string;
  tac_gia?: string;
  trang_thai?: string;
  slug: string;
  tieu_de: string;
  noi_dung_chinh: string;
  mo_ta_ngan?: string;
  thumbnail?: string;
  avatar?: string;
  tag?: string;
  seo_title?: string;
  seo_description?: string;
  seo_core?: string;
  schema_json?: string;
  so_phut_doc?: string;
  view?: string | number;
  created?: string;
  updated?: string;
  ngay_viet?: string;
  expand?: any;
}

export interface ListBlogsParams {
  page?: number;
  perPage?: number;
  search?: string;
  categoryId?: string;
  authorId?: string;
  status?: string;
  sort?: string;
  expand?: string;
}

// Public read functions — use pb client directly (for SSR pages)

export async function listBlogs(params: ListBlogsParams = {}) {
  const {
    page = 1, perPage = 10, search, categoryId, authorId, status,
    sort = '-created', expand,
  } = params;
  const filters: string[] = [];
  if (search) {
    const s = search.replace(/'/g, "\\'");
    filters.push(`(tieu_de~"${s}" || mo_ta_ngan~"${s}" || slug~"${s}")`);
  }
  if (categoryId) filters.push(`danh_muc='${categoryId}'`);
  if (authorId) filters.push(`tac_gia='${authorId}'`);
  if (status) filters.push(`trang_thai='${status}'`);
  const filter = filters.length ? filters.join(' && ') : undefined;
  return await pb.collection('blogs').getList<BlogRecord>(page, perPage, { filter, sort, expand });
}

export async function getBlogById(id: string, expand?: string) {
  return await pb.collection('blogs').getOne<BlogRecord>(id, { expand });
}

export async function getBlogBySlug(slug: string, expand?: string) {
  const records = await pb.collection('blogs').getList<BlogRecord>(1, 1, {
    filter: `slug='${slug}'`,
    expand,
  });
  return records.items[0] || null;
}

export interface MutateBlogInput {
  danh_muc?: string;
  tac_gia?: string;
  trang_thai?: string;
  slug?: string;
  tieu_de: string;
  noi_dung_chinh: string;
  mo_ta_ngan?: string;
  thumbnail?: File | string;
  avatar?: File | string;
  tag?: string;
  seo_title?: string;
  seo_description?: string;
  seo_core?: string;
  schema_json?: string;
  so_phut_doc?: string;
}

export function toSlug(input: string) {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// Admin write functions — proxy through /api/admin/blogs

function authHeaders(): HeadersInit {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function createBlog(data: MutateBlogInput) {
  const payload = { ...data } as any;
  if (!payload.slug && data.tieu_de) payload.slug = toSlug(data.tieu_de);

  const needsForm = (payload.thumbnail instanceof File) || (payload.avatar instanceof File);
  if (needsForm) {
    const fd = new FormData();
    Object.keys(payload).forEach(key => {
      const val = payload[key];
      if (val === undefined || val === null) return;
      if ((key === 'thumbnail' || key === 'avatar') && val instanceof File) {
        fd.append(key, val);
      } else {
        fd.append(key, String(val));
      }
    });
    const res = await fetch('/api/admin/blogs', { method: 'POST', headers: authHeaders(), body: fd });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể tạo blog');
    return res.json();
  }

  const res = await fetch('/api/admin/blogs', {
    method: 'POST',
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể tạo blog');
  return res.json();
}

export async function updateBlog(id: string, data: Partial<MutateBlogInput>) {
  const payload = { ...data } as any;
  if (payload.tieu_de && !payload.slug) payload.slug = toSlug(payload.tieu_de);

  const needsForm = (payload.thumbnail instanceof File) || (payload.avatar instanceof File);
  if (needsForm) {
    const fd = new FormData();
    fd.append('id', id);
    Object.keys(payload).forEach(key => {
      const val = payload[key];
      if (val === undefined || val === null) return;
      if ((key === 'thumbnail' || key === 'avatar') && val instanceof File) {
        fd.append(key, val);
      } else {
        fd.append(key, String(val));
      }
    });
    const res = await fetch('/api/admin/blogs', { method: 'PATCH', headers: authHeaders(), body: fd });
    if (!res.ok) throw new Error((await res.json()).error || 'Không thể cập nhật blog');
    return res.json();
  }

  const res = await fetch('/api/admin/blogs', {
    method: 'PATCH',
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, ...payload }),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể cập nhật blog');
  return res.json();
}

export async function deleteBlog(id: string) {
  const res = await fetch(`/api/admin/blogs?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể xóa blog');
}

export function getBlogImageUrl(record: Pick<BlogRecord, 'id' | 'thumbnail' | 'avatar'>): string {
  const filename = record?.thumbnail || record?.avatar || '';
  if (!filename) return '';
  if (/^https?:\/\//.test(filename)) return filename;
  const base = (process.env.NEXT_PUBLIC_PB_URL as string) || 'https://api.vmst.host';
  return `${base.replace(/\/$/, '')}/api/files/blogs/${record.id}/${filename}`;
}
