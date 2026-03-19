import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Liên hệ VMST Host – Tư vấn Hosting, VPS, Email doanh nghiệp',
  description: 'Liên hệ VMST Host để được tư vấn hosting, VPS, email doanh nghiệp phù hợp. Hỗ trợ 24/7 qua hotline, email, chat trực tuyến. Đội ngũ kỹ thuật chuyên nghiệp sẵn sàng hỗ trợ.',
  keywords: ['liên hệ mua hosting', 'hỗ trợ vps', 'tư vấn email doanh nghiệp', 'liên hệ vmst host', 'hotline hosting', 'chat hỗ trợ hosting', 'tư vấn hosting', 'liên hệ hỗ trợ kỹ thuật'],
  openGraph: {
    title: 'Liên hệ VMST Host – Tư vấn Hosting, VPS, Email doanh nghiệp',
    description: 'Liên hệ tư vấn hosting, VPS, email doanh nghiệp. Hỗ trợ 24/7 qua hotline, email, chat.',
    url: 'https://vmst.host/contact',
    siteName: 'VMST Host',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Liên hệ VMST Host – Tư vấn Hosting, VPS, Email',
    description: 'Hỗ trợ 24/7 qua hotline, email, chat. Tư vấn hosting, VPS, email doanh nghiệp.',
  },
  alternates: {
    canonical: 'https://vmst.host/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
