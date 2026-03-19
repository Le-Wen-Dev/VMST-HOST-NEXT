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
  verification: {},
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
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
