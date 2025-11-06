import { pb } from './pocketbase';
import type { RecordModel, ListResult } from 'pocketbase';
import { isAdmin } from './pocketbase';

export type CategoryBlogRecord = RecordModel & {
  slug?: string;
  name?: string;
  description?: string;
  danh_muc_cha?: string; // parent category id
};

export async function listCategoryBlogs(params?: { page?: number; perPage?: number; search?: string; parentId?: string }): Promise<ListResult<CategoryBlogRecord>> {
  const { page = 1, perPage = 50, search, parentId } = params || {};
  const filters: string[] = [];
  if (search && search.trim()) {
    const s = search.trim();
    filters.push(`(name ?~ '${s}' || slug ?~ '${s}' || description ?~ '${s}')`);
  }
  if (parentId && parentId.trim()) {
    filters.push(`danh_muc_cha = '${parentId.trim()}'`);
  }
  const filter = filters.length ? filters.join(' && ') : '';
  return await pb.collection('category_blogs').getList<CategoryBlogRecord>(page, perPage, {
    filter,
    sort: 'name',
  });
}

export async function createCategoryBlog(input: { slug?: string; name?: string; description?: string; danh_muc_cha?: string }): Promise<CategoryBlogRecord> {
  if (!isAdmin()) {
    throw new Error('Bạn không có quyền tạo danh mục.');
  }
  const payload = {
    slug: input.slug || '',
    name: input.name || '',
    description: input.description || '',
    danh_muc_cha: input.danh_muc_cha || undefined,
  };
  return await pb.collection('category_blogs').create<CategoryBlogRecord>(payload);
}

export async function updateCategoryBlog(id: string, data: { slug?: string; name?: string; description?: string; danh_muc_cha?: string }): Promise<CategoryBlogRecord> {
  if (!isAdmin()) {
    throw new Error('Bạn không có quyền cập nhật danh mục.');
  }
  const payload: any = {};
  if (typeof data.slug !== 'undefined') payload.slug = data.slug;
  if (typeof data.name !== 'undefined') payload.name = data.name;
  if (typeof data.description !== 'undefined') payload.description = data.description;
  if (typeof data.danh_muc_cha !== 'undefined') payload.danh_muc_cha = data.danh_muc_cha || undefined;
  return await pb.collection('category_blogs').update<CategoryBlogRecord>(id, payload);
}

export async function deleteCategoryBlog(id: string): Promise<boolean> {
  if (!isAdmin()) {
    throw new Error('Bạn không có quyền xóa danh mục.');
  }
  await pb.collection('category_blogs').delete(id);
  return true;
}

export async function getCategoryBySlug(slug: string): Promise<CategoryBlogRecord | null> {
  const res = await pb.collection('category_blogs').getList<CategoryBlogRecord>(1, 1, {
    filter: `slug='${slug}'`,
  });
  return res.items[0] || null;
}