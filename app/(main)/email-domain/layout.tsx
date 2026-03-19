import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Email doanh nghiệp theo tên miền – Email công ty chuyên nghiệp, bảo mật cao',
  description: 'Dịch vụ email doanh nghiệp theo tên miền riêng tại VMST Host. Email công ty chuyên nghiệp, chống spam, bảo mật cao, đồng bộ đa thiết bị. Email hosting uy tín giá rẻ cho doanh nghiệp Việt Nam.',
  keywords: ['email doanh nghiệp', 'email theo tên miền', 'email công ty', 'email chuyên nghiệp', 'email hosting', 'email bảo mật cao', 'email chống spam', 'email doanh nghiệp giá rẻ', 'email theo domain', 'email doanh nghiệp việt nam', 'mua email doanh nghiệp', 'email hosting uy tín', 'email đồng bộ đa thiết bị', 'email doanh nghiệp tên miền riêng', 'email smtp'],
  openGraph: {
    title: 'Email doanh nghiệp theo tên miền – Chuyên nghiệp, bảo mật cao | VMST Host',
    description: 'Email doanh nghiệp theo tên miền riêng, chống spam, bảo mật cao, đồng bộ đa thiết bị. Giá rẻ, uy tín.',
    url: 'https://vmst.host/email-domain',
    siteName: 'VMST Host',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Email doanh nghiệp theo tên miền – VMST Host',
    description: 'Email công ty chuyên nghiệp, chống spam, bảo mật cao, đồng bộ đa thiết bị.',
  },
  alternates: {
    canonical: 'https://vmst.host/email-domain',
  },
};

export default function EmailDomainLayout({ children }: { children: React.ReactNode }) {
  return children;
}
