'use client';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import Link from 'next/link';
import parse from 'html-react-parser';
import { BlogRecord } from '@/services/blogs';

interface Props {
  post: BlogRecord;
  relatedPosts: BlogRecord[];
  relatedCategories: { id: string; slug?: string; name?: string }[];
  imageUrl: string;
}

export default function BlogPostClient({ post, relatedPosts, relatedCategories, imageUrl }: Props) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/blog"
          className="flex items-center text-[#034CC9] font-semibold hover:underline mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Quay lại Blog
        </Link>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative h-96">
                <img
                  src={imageUrl || 'https://placehold.co/1200x600'}
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
          </div>

          {/* Right sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-bold text-[#0B2B6F] mb-4">Danh mục liên quan</h3>
              <div className="space-y-2 mb-6">
                {relatedCategories.length === 0 ? (
                  <div className="text-sm text-gray-500">Không có dữ liệu</div>
                ) : (
                  relatedCategories.slice(0, 4).map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/blog/category/${cat.slug}`}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#E6EEFF] transition-colors flex justify-between block"
                    >
                      <span className="text-gray-700 hover:text-[#034CC9] font-medium">{cat.name}</span>
                    </Link>
                  ))
                )}
              </div>
              <h3 className="text-lg font-bold text-[#0B2B6F] mb-4">Bài viết liên quan</h3>
              <div className="space-y-3">
                {relatedPosts.slice(0, 4).map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.slug}`}
                    className="w-full text-left group block"
                  >
                    <div className="text-sm font-semibold text-gray-900 group-hover:text-[#034CC9] transition-colors line-clamp-2">
                      {relatedPost.tieu_de}
                    </div>
                    <div className="text-xs text-gray-500">{new Date(relatedPost.created || '').toLocaleDateString()}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
