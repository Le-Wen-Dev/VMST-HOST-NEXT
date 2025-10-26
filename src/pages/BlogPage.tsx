import { Search, ArrowRight } from 'lucide-react';
import { blogPosts, blogCategories } from '../data/mockData';

interface BlogPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export default function BlogPage({ onNavigate }: BlogPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
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
              {blogPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => onNavigate('blog-post', { slug: post.slug })}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#034CC9] text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span>{post.date}</span>
                      <span className="mx-2">•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-[#0B2B6F] mb-3 group-hover:text-[#034CC9] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
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
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034CC9]"
                />
              </div>

              <h3 className="text-lg font-bold text-[#0B2B6F] mt-8 mb-4">Danh mục</h3>
              <div className="space-y-2">
                {blogCategories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => onNavigate('blog-category', { category: cat.slug })}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#E6EEFF] transition-colors flex justify-between items-center group"
                  >
                    <span className="text-gray-700 group-hover:text-[#034CC9] font-medium">
                      {cat.name}
                    </span>
                    <span className="text-gray-500 text-sm">({cat.count})</span>
                  </button>
                ))}
              </div>

              <h3 className="text-lg font-bold text-[#0B2B6F] mt-8 mb-4">Bài viết phổ biến</h3>
              <div className="space-y-4">
                {blogPosts.slice(0, 3).map((post) => (
                  <div
                    key={post.id}
                    onClick={() => onNavigate('blog-post', { slug: post.slug })}
                    className="cursor-pointer group"
                  >
                    <h4 className="text-sm font-semibold text-gray-900 group-hover:text-[#034CC9] transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">{post.date}</p>
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
