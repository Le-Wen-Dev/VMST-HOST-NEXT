import { ArrowLeft, ArrowRight } from 'lucide-react';
import { blogPosts, blogCategories } from '../data/mockData';

interface BlogCategoryPageProps {
  categorySlug: string;
  onNavigate: (page: string, params?: any) => void;
}

export default function BlogCategoryPage({ categorySlug, onNavigate }: BlogCategoryPageProps) {
  const category = blogCategories.find(c => c.slug === categorySlug);
  const posts = blogPosts.filter(p => p.categorySlug === categorySlug);

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Danh mục không tồn tại</h1>
          <button onClick={() => onNavigate('blog')} className="text-[#034CC9] font-semibold hover:underline">
            Quay lại Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-[#034CC9] to-[#0B2B6F] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => onNavigate('blog')}
            className="flex items-center text-white hover:text-blue-100 mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Quay lại Blog
          </button>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{category.name}</h1>
          <p className="text-xl text-blue-100">{category.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
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
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center text-[#034CC9] font-semibold text-sm group-hover:underline">
                  Đọc thêm
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
