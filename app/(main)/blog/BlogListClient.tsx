'use client';

import { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogItem {
  id: string;
  slug: string;
  tieu_de: string;
  mo_ta_ngan?: string;
  tag?: string;
  so_phut_doc?: string;
  created?: string;
  imageUrl: string;
}

interface BlogListClientProps {
  posts: BlogItem[];
}

export default function BlogListClient({ posts }: BlogListClientProps) {
  const [search, setSearch] = useState('');

  const filtered = posts.filter(p => {
    if (!search.trim()) return true;
    const s = search.toLowerCase();
    const title = (p.tieu_de || '').toLowerCase();
    const excerpt = (p.mo_ta_ngan || '').toLowerCase();
    const slug = (p.slug || '').toLowerCase();
    return title.includes(s) || excerpt.includes(s) || slug.includes(s);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="grid md:grid-cols-2 gap-8">
            {filtered.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.imageUrl}
                    alt={post.tieu_de}
                    width={600}
                    height={192}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span>{new Date(post.created || '').toLocaleDateString()}</span>
                    <span className="mx-2">&bull;</span>
                    <span>{post.so_phut_doc || '\u2014'}</span>
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
              </Link>
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

            <h3 className="text-lg font-bold text-[#0B2B6F] mt-8 mb-4">Bài viết phổ biến</h3>
            <div className="space-y-4">
              {posts.slice(0, 3).map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="cursor-pointer group block"
                >
                  <h4 className="text-sm font-semibold text-gray-900 group-hover:text-[#034CC9] transition-colors line-clamp-2">
                    {post.tieu_de}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">{new Date(post.created || '').toLocaleDateString()}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
