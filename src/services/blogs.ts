import { pb, isAdmin } from './pocketbase';

export interface BlogRecord {
  id: string;
  danh_muc?: string; // category relation id
  tac_gia?: string; // author relation id
  trang_thai?: string; // status (PocketBase enum)
  slug: string;
  tieu_de: string; // title
  noi_dung_chinh: string; // HTML content
  mo_ta_ngan?: string; // excerpt
  // Prefer new schema field 'thumbnail'; keep 'avatar' for backward compatibility
  thumbnail?: string; // filename or absolute URL
  avatar?: string; // legacy field
  tag?: string; // comma separated tags
  seo_title?: string;
  seo_description?: string;
  seo_core?: string;
  schema_json?: string; // JSON string
  so_phut_doc?: string; // read time
  view?: string | number; // view count
  created?: string;
  updated?: string;
  ngay_viet?: string;
  expand?: any;
}

export interface ListBlogsParams {
  page?: number;
  perPage?: number; // 10 | 20 | 50 | 100
  search?: string;
  categoryId?: string;
  authorId?: string;
  status?: string; // e.g. 'pushlished' | 'draft' | 'pending'
  sort?: string; // e.g. '-created'
  expand?: string; // e.g. 'danh_muc,tac_gia'
}

export async function listBlogs(params: ListBlogsParams = {}) {
  const {
    page = 1,
    perPage = 10,
    search,
    categoryId,
    authorId,
    status,
    sort = '-created',
    expand,
  } = params;

  const filters: string[] = [];
  if (search) {
    // Search in title, excerpt, slug
    const s = search.replace(/'/g, "\\'");
    filters.push(`(tieu_de~\"${s}\" || mo_ta_ngan~\"${s}\" || slug~\"${s}\")`);
  }
  if (categoryId) filters.push(`danh_muc='${categoryId}'`);
  if (authorId) filters.push(`tac_gia='${authorId}'`);
  if (status) filters.push(`trang_thai='${status}'`);

  const filter = filters.length ? filters.join(' && ') : undefined;

  const result = await pb.collection('blogs').getList<BlogRecord>(page, perPage, {
    filter,
    sort,
    expand,
  });
  return result; // { page, perPage, totalPages, totalItems, items }
}

export async function getBlogById(id: string, expand?: string) {
  const record = await pb.collection('blogs').getOne<BlogRecord>(id, { expand });
  return record;
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
  // Prefer 'thumbnail' PocketBase file field. Accept File for upload or string filename when unchanged
  thumbnail?: File | string;
  // legacy compatibility
  avatar?: File | string;
  tag?: string; // comma separated
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
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export async function createBlog(data: MutateBlogInput) {
  if (!isAdmin()) throw new Error('Only admin can create blog');
  const payload = { ...data } as any;
  if (!payload.slug && data.tieu_de) {
    payload.slug = toSlug(data.tieu_de);
  }
  // If thumbnail is a File, use FormData to upload file
  const needsForm = (payload.thumbnail && typeof payload.thumbnail !== 'string') ||
    (payload.avatar && typeof payload.avatar !== 'string');
  let record: BlogRecord;
  if (needsForm) {
    const fd = new FormData();
    Object.keys(payload).forEach((key) => {
      const val = payload[key];
      if (val === undefined || val === null) return;
      if (key === 'thumbnail' && val instanceof File) {
        fd.append('thumbnail', val);
      } else if (key === 'avatar' && val instanceof File) {
        // legacy
        fd.append('avatar', val);
      } else {
        fd.append(key, String(val));
      }
    });
    record = await pb.collection('blogs').create<BlogRecord>(fd);
  } else {
    record = await pb.collection('blogs').create<BlogRecord>(payload);
  }
  return record;
}

export async function updateBlog(id: string, data: Partial<MutateBlogInput>) {
  if (!isAdmin()) throw new Error('Only admin can update blog');
  const payload = { ...data } as any;
  if (payload.tieu_de && !payload.slug) {
    payload.slug = toSlug(payload.tieu_de);
  }
  const needsForm = (payload.thumbnail && typeof payload.thumbnail !== 'string') ||
    (payload.avatar && typeof payload.avatar !== 'string');
  let record: BlogRecord;
  if (needsForm) {
    const fd = new FormData();
    Object.keys(payload).forEach((key) => {
      const val = payload[key];
      if (val === undefined || val === null) return;
      if (key === 'thumbnail' && val instanceof File) {
        fd.append('thumbnail', val);
      } else if (key === 'avatar' && val instanceof File) {
        // legacy
        fd.append('avatar', val);
      } else {
        fd.append(key, String(val));
      }
    });
    record = await pb.collection('blogs').update<BlogRecord>(id, fd);
  } else {
    record = await pb.collection('blogs').update<BlogRecord>(id, payload);
  }
  return record;
}

export async function deleteBlog(id: string) {
  if (!isAdmin()) throw new Error('Only admin can delete blog');
  await pb.collection('blogs').delete(id);
}

// Helper to resolve PocketBase file URL for blog thumbnail (or legacy avatar)
export function getBlogImageUrl(record: Pick<BlogRecord, 'id' | 'thumbnail' | 'avatar'>): string {
  const filename = record?.thumbnail || record?.avatar || '';
  if (!filename) return '';
  // If already an absolute URL, return as-is
  if (/^https?:\/\//.test(filename)) return filename;
  const base = (import.meta.env.VITE_PB_URL as string) || 'http://127.0.0.1:8090';
  return `${base.replace(/\/$/, '')}/api/files/blogs/${record.id}/${filename}`;
}