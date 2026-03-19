import 'server-only';
import PocketBase from 'pocketbase';

const PB_URL = process.env.PB_URL || process.env.NEXT_PUBLIC_PB_URL || 'https://api.vmst.host';

function createPb() {
  const pb = new PocketBase(PB_URL);
  pb.autoCancellation(false);
  return pb;
}

export async function listCategoryBlogsServer(params?: { page?: number; perPage?: number; search?: string }) {
  const pb = createPb();
  const { page = 1, perPage = 50, search } = params || {};
  const filters: string[] = [];
  if (search && search.trim()) {
    const s = search.trim();
    filters.push(`(name ?~ '${s}' || slug ?~ '${s}')`);
  }
  const filter = filters.length ? filters.join(' && ') : '';
  return await pb.collection('category_blogs').getList(page, perPage, { filter, sort: 'name' });
}

export async function getCategoryBySlugServer(slug: string) {
  const pb = createPb();
  const res = await pb.collection('category_blogs').getList(1, 1, { filter: `slug='${slug}'` });
  return res.items[0] || null;
}
