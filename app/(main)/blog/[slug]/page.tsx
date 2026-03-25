import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogBySlugServer, getBlogImageUrlServer, listBlogsServer } from '@/services/blogs-server';
import { listCategoryBlogsServer } from '@/services/category-blogs-server';
import BlogPostClient from './BlogPostClient';

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const res = await listBlogsServer({ perPage: 200, status: 'published' });
    return res.items.map((post) => ({ slug: post.slug }));
  } catch {
    return [];
  }
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlugServer(slug, 'danh_muc,tac_gia');
  if (!post) {
    return { title: 'Bài viết không tồn tại | VMST HOST' };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vmst.host';
  const canonical = `${siteUrl}/blog/${post.slug}`;
  const title = post.seo_title || post.tieu_de;
  const description = post.seo_description || post.mo_ta_ngan || '';
  const image = (post.thumbnail || post.avatar) ? getBlogImageUrlServer(post) : `https://vmst.host/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description.slice(0, 100))}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: 'article',
      title,
      description,
      url: canonical,
      images: image ? [{ url: image }] : [],
      publishedTime: post.created || post.ngay_viet,
      modifiedTime: post.updated || post.created,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogBySlugServer(slug, 'danh_muc,tac_gia');

  if (!post) {
    notFound();
  }

  // Fetch related posts and categories server-side
  let relatedPosts: any[] = [];
  try {
    const relRes = post.danh_muc
      ? await listBlogsServer({ page: 1, perPage: 6, categoryId: post.danh_muc, sort: '-created' })
      : await listBlogsServer({ page: 1, perPage: 6, sort: '-created' });
    relatedPosts = (relRes.items || []).filter((r: any) => r.id !== post.id).slice(0, 4);
  } catch {}

  let relatedCategories: any[] = [];
  try {
    const cats = await listCategoryBlogsServer({ page: 1, perPage: 20 });
    relatedCategories = (cats.items || []).slice(0, 4);
  } catch {}

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vmst.host';
  const canonical = `${siteUrl}/blog/${post.slug}`;
  const title = post.seo_title || post.tieu_de;
  const description = post.seo_description || post.mo_ta_ngan || '';
  const image = (post.thumbnail || post.avatar) ? getBlogImageUrlServer(post) : `https://vmst.host/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description.slice(0, 100))}`;
  const published = post.created || post.ngay_viet || new Date().toISOString();
  const modified = post.updated || post.created || new Date().toISOString();
  const author = post.expand?.tac_gia?.ten || 'VMST HOST';
  const tags = (post.tag || '').split(',').map((t: string) => t.trim()).filter(Boolean);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    image,
    datePublished: published,
    dateModified: modified,
    author: { '@type': 'Person', name: author },
    mainEntityOfPage: canonical,
    keywords: tags.join(', '),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostClient
        post={post}
        relatedPosts={relatedPosts}
        relatedCategories={relatedCategories}
        imageUrl={image}
      />
    </>
  );
}
