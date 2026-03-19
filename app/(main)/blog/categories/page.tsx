'use client';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { listCategoryBlogs } from '@/services/categoryBlogs';
import { useToast } from '@/contexts/ToastContext';

export default function BlogCategoriesPage() {
  const { showError } = useToast();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  const fetchData = async (keyword?: string) => {
    setLoading(true);
    try {
      const res = await listCategoryBlogs({ perPage: 50, search: keyword });
      setItems(res.items || []);
    } catch (err: any) {
      console.error('Load categories error', err);
      showError(err?.message || 'Không thể tải danh mục blog');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return items;
    return items.filter(it => (it.name || '').toLowerCase().includes(s) || (it.slug || '').toLowerCase().includes(s) || (it.description || '').toLowerCase().includes(s));
  }, [items, search]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0B2B6F] mb-2">Danh mục Blog</h1>
          <p className="text-gray-600">Tìm và xem các danh mục blog</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex items-center gap-3">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm kiếm danh mục..." className="border rounded px-3 py-2 w-full" />
          <button onClick={() => fetchData(search)} className="bg-[#034CC9] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#0B2B6F] transition-colors">Tìm</button>
        </div>

        {loading ? (
          <div className="text-center text-gray-600">Đang tải...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((it) => (
              <Link
                key={it.id}
                href={`/blog/category/${it.slug}`}
                className="bg-white rounded-xl shadow-md p-6 text-left hover:shadow-lg transition-all block"
              >
                <h3 className="text-lg font-semibold text-[#0B2B6F] mb-1">{it.name || it.slug || it.id}</h3>
                <p className="text-sm text-gray-600 mb-2">Slug: {it.slug || '-'}</p>
                <p className="text-gray-700">{it.description || '—'}</p>
              </Link>
            ))}
            {filtered.length === 0 && (
              <div className="text-center text-gray-600">Không có danh mục phù hợp</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
