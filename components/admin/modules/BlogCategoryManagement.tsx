'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { listCategoryBlogs, createCategoryBlog, updateCategoryBlog, deleteCategoryBlog, CategoryBlogRecord } from '@/services/categoryBlogs';

export default function BlogCategoryManagement() {
  const { isAdmin } = useAuth();
  const { showError, showSuccess } = useToast();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<CategoryBlogRecord[]>([]);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState<{ slug?: string; name?: string; description?: string; parentId?: string }>({});
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchData = async (keyword?: string) => {
    setLoading(true);
    try {
      const res = await listCategoryBlogs({ perPage: 50, search: keyword });
      setItems(res.items || []);
    } catch (err: any) {
      console.error('Load categories error', err);
      showError(err?.message || 'Không thể tải danh mục blog');
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  if (!isAdmin) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Quản trị — Danh mục Blog</h1>
        <div className="p-4 bg-red-50 text-red-700 rounded">Bạn không có quyền truy cập trang này.</div>
      </div>
    );
  }

  const handleCreate = async () => {
    setLoading(true);
    try {
      await createCategoryBlog({ slug: form.slug, name: form.name, description: form.description, danh_muc_cha: form.parentId });
      showSuccess('Đã tạo danh mục');
      setForm({});
      await fetchData(search);
    } catch (err: any) {
      console.error('Create category error', err);
      showError(err?.message || 'Không thể tạo danh mục');
    } finally { setLoading(false); }
  };

  const handleUpdate = async (id: string) => {
    setLoading(true);
    try {
      await updateCategoryBlog(id, { slug: form.slug, name: form.name, description: form.description, danh_muc_cha: form.parentId });
      showSuccess('Đã cập nhật danh mục');
      setEditingId(null);
      setForm({});
      await fetchData(search);
    } catch (err: any) {
      console.error('Update category error', err);
      showError(err?.message || 'Không thể cập nhật danh mục');
    } finally { setLoading(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Xóa danh mục này?')) return;
    setLoading(true);
    try {
      await deleteCategoryBlog(id);
      showSuccess('Đã xóa danh mục');
      await fetchData(search);
    } catch (err: any) {
      console.error('Delete category error', err);
      showError(err?.message || 'Không thể xóa danh mục');
    } finally { setLoading(false); }
  };

  const filtered = items.filter(it => {
    const s = search.trim().toLowerCase();
    if (!s) return true;
    return (it.name || '').toLowerCase().includes(s) || (it.slug || '').toLowerCase().includes(s) || (it.description || '').toLowerCase().includes(s);
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0B2B6F]">Quản lý Danh mục Blog</h1>
        <p className="text-gray-600 text-sm mt-1">Tạo và quản lý danh mục cho bài viết blog</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{editingId ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Tên danh mục</label>
            <input
              type="text"
              value={form.name || ''}
              onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034CC9]"
              placeholder="Tên danh mục"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Slug</label>
            <input
              type="text"
              value={form.slug || ''}
              onChange={(e) => setForm(f => ({ ...f, slug: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034CC9]"
              placeholder="url-slug"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Mô tả</label>
            <input
              type="text"
              value={form.description || ''}
              onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034CC9]"
              placeholder="Mô tả ngắn"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Danh mục cha (ID)</label>
            <input
              type="text"
              value={form.parentId || ''}
              onChange={(e) => setForm(f => ({ ...f, parentId: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034CC9]"
              placeholder="Để trống nếu là danh mục gốc"
            />
          </div>
        </div>
        <div className="flex gap-3 mt-4">
          {editingId ? (
            <>
              <button
                onClick={() => handleUpdate(editingId)}
                disabled={loading}
                className="px-4 py-2 bg-[#034CC9] text-white rounded-lg hover:bg-[#0B2B6F] transition-colors disabled:opacity-50"
              >
                Cập nhật
              </button>
              <button
                onClick={() => { setEditingId(null); setForm({}); }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>
            </>
          ) : (
            <button
              onClick={handleCreate}
              disabled={loading || !form.name}
              className="px-4 py-2 bg-[#034CC9] text-white rounded-lg hover:bg-[#0B2B6F] transition-colors disabled:opacity-50"
            >
              Thêm danh mục
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm kiếm danh mục..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034CC9]"
        />
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#034CC9]"></div>
          <p className="mt-2 text-gray-600">Đang tải...</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mô tả</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Danh mục cha</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filtered.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-500">Chưa có danh mục nào</td></tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{item.name || '—'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{item.slug || '—'}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{item.description || '—'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{item.danh_muc_cha || '—'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => { setEditingId(item.id); setForm({ name: item.name, slug: item.slug, description: item.description, parentId: item.danh_muc_cha }); }}
                        className="text-[#034CC9] hover:text-[#0B2B6F] mr-4"
                      >
                        Sửa
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800">
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
