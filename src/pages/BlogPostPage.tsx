import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import parse from 'html-react-parser';
import { getBlogBySlug, BlogRecord, listBlogs, getBlogImageUrl } from '../services/blogs';
import { listCategoryBlogs, CategoryBlogRecord } from '../services/categoryBlogs';
import { Helmet } from 'react-helmet-async';

interface BlogPostPageProps {
  slug: string;
  onNavigate: (page: string, params?: any) => void;
}

export default function BlogPostPage({ slug, onNavigate }: BlogPostPageProps) {
  const [post, setPost] = useState<BlogRecord | null>(null);
  const [related, setRelated] = useState<BlogRecord[]>([]);
  const [relatedCategories, setRelatedCategories] = useState<CategoryBlogRecord[]>([]);
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    async function load() {
      try {
        const rec = await getBlogBySlug(slug, 'danh_muc,tac_gia');
        setPost(rec);
        let rel;
        if (rec?.danh_muc) {
          rel = await listBlogs({ page: 1, perPage: 6, categoryId: rec.danh_muc, sort: '-created' });
        } else {
          rel = await listBlogs({ page: 1, perPage: 6, sort: '-created' });
        }
        setRelated((rel.items || []).filter(r => r.id !== rec.id).slice(0, 4));
      } catch (e) {
        console.error('Failed to load blog:', e);
      }

      try {
        const cats = await listCategoryBlogs({ page: 1, perPage: 20 });
        const displayCats = (cats.items || []).slice(0, 4);
        setRelatedCategories(displayCats);
        // Fetch counts per category using totalItems from listBlogs
        const pairs = await Promise.all(
          displayCats.map(async (cat) => {
            try {
              const res = await listBlogs({ page: 1, perPage: 1, categoryId: cat.id });
              const count = (res as any)?.totalItems ?? (res.items?.length || 0);
              return { id: cat.id, count } as { id: string; count: number };
            } catch {
              return { id: cat.id, count: 0 } as { id: string; count: number };
            }
          })
        );
        const map: Record<string, number> = {};
        pairs.forEach(({ id, count }) => { map[id] = count; });
        setCategoryCounts(map);
      } catch (e) {
        console.error('Failed to load related categories/counts:', e);
      }
    }
    load();
  }, [slug]);
  // IMPORTANT: Hooks must be called before any conditional return to keep order stable
  const meta = useMemo(() => {
    const siteUrl = (import.meta.env.VITE_SITE_URL as string) || window.location.origin;
    const canonical = `${siteUrl.replace(/\/$/, '')}/blog/${post?.slug || slug}`;
    const title = (post?.seo_title || post?.tieu_de || 'Bài viết');
    const description = (post?.seo_description || post?.mo_ta_ngan || '');
    const image = (post?.thumbnail || post?.avatar) ? getBlogImageUrl(post!) : 'https://placehold.co/1200x630/png?text=VMST%20HOST';
    const published = post?.created || post?.ngay_viet || new Date().toISOString();
    const modified = post?.updated || post?.created || new Date().toISOString();
    const author = post?.expand?.tac_gia?.ten || 'VMST HOST';
    const tags = (post?.tag || '').split(',').map(t => t.trim()).filter(Boolean);
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: title,
      description,
      image,
      datePublished: published,
      dateModified: modified,
      author: {
        '@type': 'Person',
        name: author
      },
      mainEntityOfPage: canonical,
      keywords: tags.join(', ')
    };
    return { siteUrl, canonical, title, description, image, jsonLd };
  }, [post, slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Bài viết không tồn tại</h1>
          <button
            onClick={() => onNavigate('blog')}
            className="text-[#034CC9] font-semibold hover:underline"
          >
            Quay lại Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => onNavigate('blog')}
          className="flex items-center text-[#034CC9] font-semibold hover:underline mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Quay lại Blog
        </button>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* SEO meta tags */}
          <Helmet>
            <title>{meta.title}</title>
            {meta.description && <meta name="description" content={meta.description} />}
            <link rel="canonical" href={meta.canonical} />
            {/* OpenGraph */}
            <meta property="og:type" content="article" />
            <meta property="og:title" content={meta.title} />
            {meta.description && <meta property="og:description" content={meta.description} />}
            <meta property="og:url" content={meta.canonical} />
            {meta.image && <meta property="og:image" content={meta.image} />}
            {/* Twitter Cards */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={meta.title} />
            {meta.description && <meta name="twitter:description" content={meta.description} />}
            {meta.image && <meta name="twitter:image" content={meta.image} />}
            {/* JSON-LD */}
            <script type="application/ld+json">
              {JSON.stringify(meta.jsonLd)}
            </script>
          </Helmet>
          {/* Main content */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative h-96">
                <img
                  src={(post.thumbnail || post.avatar) ? getBlogImageUrl(post) : 'https://placehold.co/1200x600'}
                  alt={post.tieu_de}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>

              <div className="p-8 md:p-12">
                <h1 className="text-4xl font-bold text-[#0B2B6F] mb-6">{post.tieu_de}</h1>

                <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b">
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    <span>{post.expand?.tac_gia?.ten || '—'}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>{new Date(post.created || '').toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>{post.so_phut_doc || '—'}</span>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none">
                  {post.mo_ta_ngan && (
                    <p className="text-xl text-gray-600 mb-6">{post.mo_ta_ngan}</p>
                  )}
                  <div className="text-gray-700 leading-relaxed">
                    {parse(post.noi_dung_chinh || '')}
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t">
                  <h3 className="text-lg font-semibold text-[#0B2B6F] mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {(post.tag || '')
                      .split(',')
                      .map(t => t.trim())
                      .filter(Boolean)
                      .map((tag) => (
                        <span
                          key={tag}
                          className="bg-[#E6EEFF] text-[#034CC9] px-4 py-2 rounded-lg text-sm font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar sẽ hiển thị phần liên quan theo yêu cầu */}
          </div>
          {/* Right sidebar: compact related categories and posts */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-bold text-[#0B2B6F] mb-4">Danh mục liên quan</h3>
              <div className="space-y-2 mb-6">
                {relatedCategories.length === 0 ? (
                  <div className="text-sm text-gray-500">Không có dữ liệu</div>
                ) : (
                  relatedCategories.slice(0, 4).map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => onNavigate('blog-category', { category: cat.slug })}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#E6EEFF] transition-colors flex justify-between"
                    >
                      <span className="text-gray-700 hover:text-[#034CC9] font-medium">{cat.name}</span>
                      <span className="text-gray-500 text-sm">({categoryCounts[cat.id] ?? 0})</span>
                    </button>
                  ))
                )}
              </div>
              <h3 className="text-lg font-bold text-[#0B2B6F] mb-4">Bài viết liên quan</h3>
              <div className="space-y-3">
                {related.slice(0, 4).map((relatedPost) => (
                  <button
                    key={relatedPost.id}
                    onClick={() => onNavigate('blog-post', { slug: relatedPost.slug })}
                    className="w-full text-left group"
                  >
                    <div className="text-sm font-semibold text-gray-900 group-hover:text-[#034CC9] transition-colors line-clamp-2">
                      {relatedPost.tieu_de}
                    </div>
                    <div className="text-xs text-gray-500">{new Date(relatedPost.created || '').toLocaleDateString()}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
