import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { geoLocations, getGeoBySlug, getAllGeoSlugs, generateGeoArticle, generateGeoFAQs } from '@/data/geo-seo';
import GeoHostingPage from './GeoHostingPage';

// ISR — revalidate every 24 hours
export const revalidate = 86400;

// Pre-generate all geo pages at build time
export async function generateStaticParams() {
  return getAllGeoSlugs().map(slug => ({ slug }));
}

export const dynamicParams = false; // only pre-built slugs

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const loc = getGeoBySlug(slug);
  if (!loc) return {};

  const title = `Hosting ${loc.nameShort} giá rẻ tốc độ cao — SSD NVMe, Uptime 99.9%`;
  const description = loc.description;
  const url = `https://vmst.host/hosting-viet-nam/${loc.slug}`;

  return {
    title,
    description,
    keywords: [...loc.localKeywords, 'hosting giá rẻ', 'hosting việt nam', 'web hosting', 'vmst host'],
    openGraph: {
      title: `${title} | VMST Host`,
      description,
      url,
      siteName: 'VMST Host',
      locale: 'vi_VN',
      type: 'website',
      images: [{
        url: `https://vmst.host/api/og?title=${encodeURIComponent(`Hosting ${loc.nameShort}`)}&description=${encodeURIComponent(`Hosting giá rẻ tốc độ cao cho doanh nghiệp ${loc.name}`)}`,
        width: 1200,
        height: 630,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Hosting ${loc.nameShort} giá rẻ – VMST Host`,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function GeoHostingRoute({ params }: Props) {
  const { slug } = await params;
  const loc = getGeoBySlug(slug);
  if (!loc) notFound();

  const article = generateGeoArticle(loc);
  const faqs = generateGeoFAQs(loc);

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Hosting ${loc.nameShort} — VMST Host`,
    description: loc.description,
    url: `https://vmst.host/hosting-viet-nam/${loc.slug}`,
    provider: {
      '@type': 'Organization',
      name: 'VMST Host',
      url: 'https://vmst.host',
    },
    areaServed: {
      '@type': 'City',
      name: loc.name,
      containedInPlace: {
        '@type': 'Country',
        name: 'Vietnam',
      },
    },
    mainEntity: {
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    },
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: 'https://vmst.host' },
      { '@type': 'ListItem', position: 2, name: 'Hosting Việt Nam', item: 'https://vmst.host/hosting-viet-nam' },
      { '@type': 'ListItem', position: 3, name: `Hosting ${loc.nameShort}`, item: `https://vmst.host/hosting-viet-nam/${loc.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <GeoHostingPage location={loc} article={article} faqs={faqs} />
    </>
  );
}
