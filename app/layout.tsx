import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  metadataBase: new URL('https://vmst.host'),
  title: 'VMST Host - Nền Tảng Cung Cấp Hosting - VPS - Email Doanh Nghiệp Startup',
  description: 'Giải pháp Hosting & VPS chuyên nghiệp. Hiệu suất cao, bảo mật tối ưu, hỗ trợ 24/7.',
  alternates: {
    canonical: 'https://vmst.host',
  },
  openGraph: {
    locale: 'vi_VN',
    siteName: 'VMST Host',
    title: 'VMST Host - Nền Tảng Cung Cấp Hosting - VPS - Email Doanh Nghiệp Startup',
    description: 'Giải pháp Hosting & VPS chuyên nghiệp. Hiệu suất cao, bảo mật tối ưu, hỗ trợ 24/7.',
    images: [{
      url: 'https://vmst.host/api/og?title=VMST%20Host&description=Hosting%20gi%C3%A1%20r%E1%BA%BB%20t%E1%BB%91c%20%C4%91%E1%BB%99%20cao',
      width: 1200,
      height: 630,
      alt: 'VMST Host — Hosting giá rẻ tốc độ cao',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VMST Host - Nền Tảng Cung Cấp Hosting - VPS - Email Doanh Nghiệp Startup',
    description: 'Giải pháp Hosting & VPS chuyên nghiệp. Hiệu suất cao, bảo mật tối ưu, hỗ trợ 24/7.',
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  verification: {
    // TODO: Thêm Google Search Console verification token
    // google: 'your-google-verification-code',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'VMST Host',
  url: 'https://vmst.host',
  logo: 'https://vmst.host/logo.png',
  description: 'Công Ty TNHH Giải Pháp Công Nghệ VMST Việt Nam - Dịch vụ Hosting, VPS, Email doanh nghiệp',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '465 Hiệp Thành 13, P. Hiệp Thành',
    addressLocality: 'Quận 12',
    addressRegion: 'TP.HCM',
    addressCountry: 'VN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+84822636676',
    contactType: 'customer service',
    availableLanguage: ['Vietnamese', 'English'],
  },
  sameAs: ['https://vmst.media', 'https://vmst.com.vn'],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'VMST Host',
  url: 'https://vmst.host',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://vmst.host/blog?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

const reviewSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'VMST Host',
  url: 'https://vmst.host',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '523',
    bestRating: '5',
    worstRating: '1',
  },
  review: [
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Anh Tuấn' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'Website công ty chạy nhanh hơn hẳn sau khi chuyển sang VMST Host. Tốc độ load dưới 1 giây, Google PageSpeed đạt 95+. Rất hài lòng!',
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Chị Hương' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'Hosting giá rẻ nhưng chất lượng không hề rẻ. Website bán hàng của tôi chạy mượt mà, không bao giờ bị down. Hỗ trợ kỹ thuật rất nhanh.',
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Anh Đức' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'Đã dùng nhiều hosting khác nhau, VMST Host là nơi tôi gắn bó lâu nhất. SSD NVMe thực sự nhanh, DirectAdmin dễ dùng, giá hợp lý.',
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
        />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
