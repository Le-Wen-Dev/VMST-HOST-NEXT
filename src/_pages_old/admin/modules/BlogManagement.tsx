import { useEffect, useState } from 'react';
import { Search, Plus, Edit2, Trash2, Eye, Calendar } from 'lucide-react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { listBlogs, BlogRecord, createBlog, updateBlog, deleteBlog, toSlug, getBlogImageUrl } from '../../../services/blogs';
import { listCategoryBlogs, CategoryBlogRecord } from '../../../services/categoryBlogs';
import { getCurrentUser } from '../../../services/pocketbase';

export default function BlogManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [categories, setCategories] = useState<CategoryBlogRecord[]>([]);
  const [posts, setPosts] = useState<BlogRecord[]>([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogRecord | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [thumb, setThumb] = useState<File | string>('');
  const [status, setStatus] = useState('draft');
  const [authorId, setAuthorId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [tags, setTags] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDesc, setSeoDesc] = useState('');

  useEffect(() => {
    // Preload categories
    (async () => {
      try {
        const res = await listCategoryBlogs({ page: 1, perPage: 100 });
        setCategories(res.items);
      } catch (e) {
        console.error('Load categories error:', e);
      }
    })();
  }, []);

  useEffect(() => {
    // Load blogs with filters
    (async () => {
      setLoading(true);
      try {
        const filterStatus = statusFilter !== 'all' ? statusFilter : undefined;
        const filterCategoryId = categoryFilter !== 'all' ? categoryFilter : undefined;
        const res = await listBlogs({ page, perPage, search: searchTerm, status: filterStatus, categoryId: filterCategoryId, sort: '-created', expand: 'danh_muc,tac_gia' });
        setPosts(res.items);
        setTotalItems(res.totalItems);
        setTotalPages(res.totalPages);
      } catch (e) {
        console.error('Load blogs error:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, [page, perPage, searchTerm, statusFilter, categoryFilter]);

  const resetForm = () => {
    setTitle('');
    setSlug('');
    setExcerpt('');
    setContent('');
    setThumb('');
    setStatus('draft');
    setAuthorId(getCurrentUser()?.id || '');
    setCategoryId('');
    setTags('');
    setSeoTitle('');
    setSeoDesc('');
  };

  const handleEdit = (post: BlogRecord) => {
    setEditingPost(post);
    setShowEditor(true);
    setTitle(post.tieu_de || '');
    setSlug(post.slug || '');
    setExcerpt(post.mo_ta_ngan || '');
    setContent(post.noi_dung_chinh || '');
    // prefer thumbnail, fallback to legacy avatar
    setThumb(post.thumbnail || post.avatar || '');
    setStatus(post.trang_thai || 'draft');
    setAuthorId(post.tac_gia || getCurrentUser()?.id || '');
    setCategoryId(post.danh_muc || '');
    setTags(post.tag || '');
    setSeoTitle(post.seo_title || '');
    setSeoDesc(post.seo_description || '');
  };

  const handleNewPost = () => {
    setEditingPost(null);
    resetForm();
    setShowEditor(true);
  };

  const handleSave = async () => {
    try {
      const payload = {
        tieu_de: title,
        slug: slug || toSlug(title),
        mo_ta_ngan: excerpt,
        noi_dung_chinh: content,
        thumbnail: thumb,
        trang_thai: status,
        tac_gia: authorId || getCurrentUser()?.id,
        danh_muc: categoryId || undefined,
        tag: tags,
        seo_title: seoTitle,
        seo_description: seoDesc,
      };
      if (editingPost) {
        await updateBlog(editingPost.id, payload);
      } else {
        await createBlog(payload);
      }
      // Reload list
      const res = await listBlogs({ page, perPage, search: searchTerm, status: statusFilter !== 'all' ? statusFilter : undefined, categoryId: categoryFilter !== 'all' ? categoryFilter : undefined, sort: '-created', expand: 'danh_muc,tac_gia' });
      setPosts(res.items);
      setTotalItems(res.totalItems);
      setTotalPages(res.totalPages);
      setShowEditor(false);
    } catch (e: any) {
      alert('Lưu bài viết thất bại: ' + (e?.message || e));
    }
  };

  const handleDelete = async (post: BlogRecord) => {
    if (!confirm(`Xóa bài viết: ${post.tieu_de}?`)) return;
    try {
      await deleteBlog(post.id);
      const res = await listBlogs({ page, perPage, search: searchTerm, status: statusFilter !== 'all' ? statusFilter : undefined, categoryId: categoryFilter !== 'all' ? categoryFilter : undefined, sort: '-created', expand: 'danh_muc,tac_gia' });
      setPosts(res.items);
      setTotalItems(res.totalItems);
      setTotalPages(res.totalPages);
    } catch (e: any) {
      alert('Xóa thất bại: ' + (e?.message || e));
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      draft: 'bg-gray-100 text-gray-800',
      pushlished: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (showEditor) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            {editingPost ? 'Chỉnh sửa bài viết' : 'Tạo bài viết mới'}
          </h1>
          <button
            onClick={() => setShowEditor(false)}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Quay lại
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Tiêu đề <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (!editingPost) setSlug(toSlug(e.target.value));
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập tiêu đề bài viết"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Slug URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="url-friendly-slug"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Mô tả ngắn (Excerpt)
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Mô tả ngắn gọn về bài viết"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Nội dung chính <span className="text-red-500">*</span>
              </label>
              {/* Cast ClassicEditor to any to satisfy CKEditor React typing differences */}
              <CKEditor
                editor={ClassicEditor as any}
                data={content}
                onChange={(_, editor: any) => setContent(editor.getData())}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Danh mục
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Chọn danh mục --</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Trạng thái
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="draft">Draft</option>
                  <option value="pushlished">Pushlished</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Tác giả
                </label>
                <input
                  type="text"
                  value={authorId}
                  onChange={(e) => setAuthorId(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập ID tác giả (mặc định: bạn)"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Thumbnail (upload file)
              </label>
              <div className="flex items-center gap-4">
                {thumb && (
                  <img
                    src={thumb instanceof File ? URL.createObjectURL(thumb) : (editingPost ? getBlogImageUrl({ id: editingPost.id, thumbnail: String(thumb), avatar: String(thumb) }) : String(thumb))}
                    alt="preview"
                    className="w-16 h-16 rounded-lg object-cover border"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setThumb(e.target.files?.[0] || '')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">SEO Optimization</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Meta Title (60-70 ký tự)
                  </label>
                  <input
                    type="text"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    maxLength={70}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Meta Description (150-160 ký tự)
                  </label>
                  <textarea
                    value={seoDesc}
                    onChange={(e) => setSeoDesc(e.target.value)}
                    maxLength={160}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Focus Keyword
                  </label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="tag1, tag2, ..."
                  />
                </div>
              </div>
            </div>

            {/* Tags/Featured optional fields could be added here */}

            <div className="flex gap-4 pt-6 border-t">
              <button onClick={handleSave} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold">
                {editingPost ? 'Cập nhật bài viết' : 'Xuất bản'}
              </button>
              <button
                onClick={() => setShowEditor(false)}
                className="px-8 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý Blog</h1>
          <p className="text-gray-600 mt-1">Tạo và quản lý nội dung blog với SEO tối ưu</p>
        </div>
        <button
          onClick={handleNewPost}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-lg transition-all"
        >
          <Plus className="h-5 w-5" />
          Tạo bài viết
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <p className="text-gray-600 text-sm mb-1">Tổng số bài</p>
          <p className="text-3xl font-bold text-gray-900">{totalItems}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
          <p className="text-gray-600 text-sm mb-1">Đang xem trang</p>
          <p className="text-3xl font-bold text-gray-900">{page}/{totalPages}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
          <p className="text-gray-600 text-sm mb-1">Bộ lọc</p>
          <p className="text-3xl font-bold text-gray-900">{statusFilter !== 'all' ? statusFilter : 'Tất cả'}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm mb-1">Danh mục</p>
          <p className="text-3xl font-bold text-gray-900">{categoryFilter !== 'all' ? (categories.find(c => c.id === categoryFilter)?.name || '—') : 'Tất cả'}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Tìm kiếm tiêu đề, nội dung..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="pushlished">Pushlished</option>
            <option value="draft">Draft</option>
            <option value="pending">Pending</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tất cả danh mục</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <select
            value={perPage}
            onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Bài viết</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Danh mục</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Tác giả</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Trạng thái</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Ngày</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={(post.thumbnail || post.avatar) ? getBlogImageUrl(post) : 'https://placehold.co/120x120'} alt="" className="w-16 h-16 rounded-lg object-cover" />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 line-clamp-1">{post.tieu_de}</p>
                        <p className="text-xs text-gray-600 mt-1 line-clamp-1">{post.mo_ta_ngan}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
                      {post.expand?.danh_muc?.name || '—'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{post.expand?.tac_gia?.ten || '—'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(post.trang_thai || 'draft')}`}>
                      {post.trang_thai || 'draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.created || '').toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors" onClick={() => window.open(`/blog/${post.slug}`, '_blank')}>
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(post)}
                        className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(post)} className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-600">
              Tổng: {totalItems} bài | Trang {page}/{totalPages}
            </div>
            <div className="flex items-center gap-2">
              <button disabled={page <= 1 || loading} onClick={() => setPage(p => Math.max(1, p - 1))} className="px-3 py-2 border rounded-lg disabled:opacity-50">Trang trước</button>
              <button disabled={page >= totalPages || loading} onClick={() => setPage(p => Math.min(totalPages, p + 1))} className="px-3 py-2 border rounded-lg disabled:opacity-50">Trang sau</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
