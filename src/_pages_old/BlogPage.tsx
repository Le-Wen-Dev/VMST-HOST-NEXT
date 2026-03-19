import { useEffect, useMemo, useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { listBlogs, BlogRecord, getBlogImageUrl } from '../services/blogs';
import { Helmet } from 'react-helmet-async';

interface BlogPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export default function BlogPage({ onNavigate }: BlogPageProps) {
  const [posts, setPosts] = useState<BlogRecord[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const res = await listBlogs({ page: 1, perPage: 12, sort: '-created' });
        setPosts(res.items);
      } catch (e) {
        console.error('Failed to load blogs:', e);
      }
    }
    load();
  }, []);

  const filtered = posts.filter(p => {
    if (!search.trim()) return true;
    const s = search.toLowerCase();
    const title = (p.tieu_de || '').toLowerCase();
    const excerpt = (p.mo_ta_ngan || '').toLowerCase();
    const slug = (p.slug || '').toLowerCase();
    return title.includes(s) || excerpt.includes(s) || slug.includes(s);
  });

  const meta = useMemo(() => {
    const siteUrl = (import.meta.env.VITE_SITE_URL as string) || window.location.origin;
    const canonical = `${siteUrl.replace(/\/$/, '')}/blog`;
    const title = 'Blog & Hướng dẫn | VMST HOST';
    const description = 'Kiến thức, tips và hướng dẫn chi tiết về hosting, WordPress và email doanh nghiệp.';
    const image = 'https://placehold.co/1200x630/png?text=VMST%20HOST';
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      headline: title,
      description,
      url: canonical
    };
    return { canonical, title, description, image, jsonLd };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={meta.canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={meta.canonical} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        <script type="application/ld+json">{JSON.stringify(meta.jsonLd)}</script>
      </Helmet>
      <div className="bg-gradient-to-br from-[#034CC9] to-[#0B2B6F] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Blog & Hướng dẫn</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Kiến thức, tips và hướng dẫn chi tiết về hosting, WordPress và email doanh nghiệp
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 gap-8">
              {filtered.map((post) => (
                <div
                  key={post.id}
                  onClick={() => onNavigate('blog-post', { slug: post.slug })}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={(post.thumbnail || post.avatar) ? getBlogImageUrl(post) : 'https://placehold.co/600x400'}
                      alt={post.tieu_de}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                    {/* Category badge removed as requested */}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span>{new Date(post.created || '').toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <span>{post.so_phut_doc || '—'}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-[#0B2B6F] mb-3 group-hover:text-[#034CC9] transition-colors">
                      {post.tieu_de}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.mo_ta_ngan}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(post.tag || '')
                        .split(',')
                        .map(t => t.trim())
                        .filter(Boolean)
                        .slice(0, 3)
                        .map((tag) => (
                          <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                    </div>
                    <div className="flex items-center text-[#034CC9] font-semibold text-sm group-hover:underline">
                      Đọc thêm
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6 sticky top-24">
              <h3 className="text-lg font-bold text-[#0B2B6F] mb-4">Tìm kiếm</h3>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm bài viết..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034CC9]"
                />
              </div>

              {/* Category list removed as requested */}

              <h3 className="text-lg font-bold text-[#0B2B6F] mt-8 mb-4">Bài viết phổ biến</h3>
              <div className="space-y-4">
                {posts.slice(0, 3).map((post) => (
                  <div
                    key={post.id}
                    onClick={() => onNavigate('blog-post', { slug: post.slug })}
                    className="cursor-pointer group"
                  >
                    <h4 className="text-sm font-semibold text-gray-900 group-hover:text-[#034CC9] transition-colors line-clamp-2">
                      {post.tieu_de}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">{new Date(post.created || '').toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
