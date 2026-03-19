import { pb } from '@/services/pocketbase';
import { getToken } from '@/services/pocketbase';
import type { RecordModel, ListResult } from 'pocketbase';

export type CategoryBlogRecord = RecordModel & {
  slug?: string;
  name?: string;
  description?: string;
  avatar?: string;
  danh_muc_cha?: string;
};

// Public read functions — use pb client directly (for SSR pages)

export async function listCategoryBlogs(params?: {
  page?: number;
  perPage?: number;
  search?: string;
  parentId?: string;
}): Promise<ListResult<CategoryBlogRecord>> {
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

export async function getCategoryBySlug(slug: string): Promise<CategoryBlogRecord | null> {
  const res = await pb.collection('category_blogs').getList<CategoryBlogRecord>(1, 1, {
    filter: `slug='${slug}'`,
  });
  return res.items[0] || null;
}

// Admin write functions — proxy through /api/admin/category-blogs

function authHeaders(): HeadersInit {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
}

export async function createCategoryBlog(input: {
  slug?: string;
  name?: string;
  description?: string;
  danh_muc_cha?: string;
}): Promise<CategoryBlogRecord> {
  const res = await fetch('/api/admin/category-blogs', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể tạo danh mục');
  return res.json();
}

export async function updateCategoryBlog(
  id: string,
  data: { slug?: string; name?: string; description?: string; danh_muc_cha?: string }
): Promise<CategoryBlogRecord> {
  const res = await fetch('/api/admin/category-blogs', {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ id, ...data }),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể cập nhật danh mục');
  return res.json();
}

export async function deleteCategoryBlog(id: string): Promise<boolean> {
  const res = await fetch(`/api/admin/category-blogs?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Không thể xóa danh mục');
  return true;
}
