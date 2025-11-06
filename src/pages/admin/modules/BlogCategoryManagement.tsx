import { useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useToast } from '../../../contexts/ToastContext';
import { listCategoryBlogs, createCategoryBlog, updateCategoryBlog, deleteCategoryBlog, CategoryBlogRecord } from '../../../services/categoryBlogs';

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
      const rec = await createCategoryBlog({ slug: form.slug, name: form.name, description: form.description, danh_muc_cha: form.parentId });
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
      const target = items.find(x => x.id === id);
      if (!target) return;
      const payload = { slug: target.slug, name: target.name, description: target.description };
      await updateCategoryBlog(id, payload);
      showSuccess('Đã cập nhật danh mục');
      setEditingId(null);
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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản trị — Danh mục Blog</h1>
        <p className="text-gray-600">Tạo, sửa, xóa danh mục blog</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-[#0B2B6F] mb-4">Tạo danh mục mới</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <input value={form.slug || ''} onChange={(e) => setForm(f => ({ ...f, slug: e.target.value }))} placeholder="Slug" className="border rounded px-3 py-2" />
          <input value={form.name || ''} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Tên danh mục" className="border rounded px-3 py-2" />
          <input value={form.description || ''} onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Mô tả" className="border rounded px-3 py-2 md:col-span-2" />
          <input value={form.parentId || ''} onChange={(e) => setForm(f => ({ ...f, parentId: e.target.value }))} placeholder="ID danh mục cha (tuỳ chọn)" className="border rounded px-3 py-2 md:col-span-2" />
        </div>
        <div className="mt-4">
          <button disabled={loading} onClick={handleCreate} className="bg-[#034CC9] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#0B2B6F] transition-colors disabled:opacity-50">Tạo</button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-4 flex items-center gap-3">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm kiếm danh mục..." className="border rounded px-3 py-2 w-full" />
        <button onClick={() => fetchData(search)} className="bg-[#034CC9] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#0B2B6F] transition-colors">Tìm</button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map((it) => (
          <div key={it.id} className="bg-white rounded-xl shadow-md p-6">
            {editingId === it.id ? (
              <>
                <input value={it.slug || ''} onChange={(e) => setItems(prev => prev.map(x => x.id === it.id ? { ...x, slug: e.target.value } : x))} className="border rounded px-3 py-2 w-full mb-2" />
                <input value={it.name || ''} onChange={(e) => setItems(prev => prev.map(x => x.id === it.id ? { ...x, name: e.target.value } : x))} className="border rounded px-3 py-2 w-full mb-2" />
                <textarea value={it.description || ''} onChange={(e) => setItems(prev => prev.map(x => x.id === it.id ? { ...x, description: e.target.value } : x))} className="border rounded px-3 py-2 w-full mb-2" />
                <div className="flex gap-3">
                  <button onClick={() => handleUpdate(it.id)} className="bg-[#034CC9] text-white px-4 py-2 rounded-lg font-semibold">Lưu</button>
                  <button onClick={() => setEditingId(null)} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-semibold">Hủy</button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-[#0B2B6F] mb-1">{it.name || it.slug || it.id}</h3>
                <p className="text-sm text-gray-600 mb-2">Slug: {it.slug || '-'}</p>
                <p className="text-gray-700 mb-4">{it.description || '—'}</p>
                <div className="flex gap-3">
                  <button onClick={() => setEditingId(it.id)} className="bg-[#034CC9] text-white px-4 py-2 rounded-lg font-semibold">Sửa</button>
                  <button onClick={() => handleDelete(it.id)} className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">Xóa</button>
                </div>
              </>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center text-gray-600">Không có danh mục</div>
        )}
      </div>
    </div>
  );
}