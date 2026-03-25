import type { MetadataRoute } from 'next';
import PocketBase from 'pocketbase';
import { getAllGeoSlugs } from '@/data/geo-seo';

export const dynamic = 'force-dynamic';

const BASE_URL = 'https://vmst.host';
const PB_URL = process.env.PB_URL || process.env.NEXT_PUBLIC_PB_URL || 'https://api.vmst.host';

const staticPages: MetadataRoute.Sitemap = [
  { url: `${BASE_URL}/`,                  priority: 1.0, changeFrequency: 'daily'  },
  { url: `${BASE_URL}/pricing`,           priority: 0.9, changeFrequency: 'weekly' },
  { url: `${BASE_URL}/wordpress-hosting`, priority: 0.9, changeFrequency: 'weekly' },
  { url: `${BASE_URL}/business-hosting`,  priority: 0.9, changeFrequency: 'weekly' },
  { url: `${BASE_URL}/email-domain`,      priority: 0.9, changeFrequency: 'weekly' },
  { url: `${BASE_URL}/contact`,           priority: 0.7, changeFrequency: 'monthly' },
  { url: `${BASE_URL}/advisor`,           priority: 0.8, changeFrequency: 'weekly' },
  { url: `${BASE_URL}/blog`,              priority: 0.8, changeFrequency: 'daily'  },
  { url: `${BASE_URL}/blog/categories`,   priority: 0.6, changeFrequency: 'weekly' },
  { url: `${BASE_URL}/support`,           priority: 0.7, changeFrequency: 'monthly' },
  { url: `${BASE_URL}/terms`,             priority: 0.3, changeFrequency: 'yearly' },
  { url: `${BASE_URL}/privacy-policy`,    priority: 0.3, changeFrequency: 'yearly' },
];

// Geo SEO pages — hosting theo tỉnh/thành phố
function getGeoPages(): MetadataRoute.Sitemap {
  const geoSlugs = getAllGeoSlugs();
  return [
    // Index page
    { url: `${BASE_URL}/hosting-viet-nam`, priority: 0.9, changeFrequency: 'weekly' as const },
    // Individual city pages
    ...geoSlugs.map(slug => ({
      url: `${BASE_URL}/hosting-viet-nam/${slug}`,
      priority: 0.8,
      changeFrequency: 'weekly' as const,
    })),
  ];
}

async function fetchBlogPosts(): Promise<MetadataRoute.Sitemap> {
  try {
    const pb = new PocketBase(PB_URL);
    const records = await pb.collection('blogs').getFullList({
      filter: "trang_thai='published'",
      fields: 'slug,updated',
    });
    return records.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: post.updated ? new Date(post.updated) : undefined,
      priority: 0.7,
      changeFrequency: 'weekly' as const,
    }));
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await fetchBlogPosts();
  const geoPages = getGeoPages();
  return [...staticPages, ...geoPages, ...blogPosts];
}
