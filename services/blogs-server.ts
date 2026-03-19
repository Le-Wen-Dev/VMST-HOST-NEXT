import 'server-only';
import PocketBase from 'pocketbase';

const PB_URL = process.env.PB_URL || process.env.NEXT_PUBLIC_PB_URL || 'https://api.vmst.host';

function createPb() {
  const pb = new PocketBase(PB_URL);
  pb.autoCancellation(false);
  return pb;
}

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

export async function listBlogsServer(params: { page?: number; perPage?: number; search?: string; categoryId?: string; status?: string; sort?: string; expand?: string } = {}) {
  const pb = createPb();
  const { page = 1, perPage = 10, search, categoryId, status, sort = '-created', expand } = params;
  const filters: string[] = [];
  if (search) {
    const s = search.replace(/'/g, "\\'");
    filters.push(`(tieu_de~"${s}" || mo_ta_ngan~"${s}" || slug~"${s}")`);
  }
  if (categoryId) filters.push(`danh_muc='${categoryId}'`);
  if (status) filters.push(`trang_thai='${status}'`);
  const filter = filters.length ? filters.join(' && ') : undefined;
  return await pb.collection('blogs').getList<BlogRecord>(page, perPage, { filter, sort, expand });
}

export async function getBlogBySlugServer(slug: string, expand?: string) {
  const pb = createPb();
  const records = await pb.collection('blogs').getList<BlogRecord>(1, 1, {
    filter: `slug='${slug}'`,
    expand,
  });
  return records.items[0] || null;
}

export function getBlogImageUrlServer(record: Pick<BlogRecord, 'id' | 'thumbnail' | 'avatar'>): string {
  const filename = record?.thumbnail || record?.avatar || '';
  if (!filename) return '';
  if (/^https?:\/\//.test(filename)) return filename;
  return `${PB_URL.replace(/\/$/, '')}/api/files/blogs/${record.id}/${filename}`;
}
