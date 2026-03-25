import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bảng giá Hosting, VPS, Email doanh nghiệp – Giá rẻ nhất 2026 | VMST Host',
  description: 'Bảng giá hosting WordPress, Business Hosting, VPS, Email doanh nghiệp tại VMST Host. Hosting giá rẻ từ 50.000₫/tháng, SSD NVMe, uptime 99.9%. So sánh và chọn gói phù hợp ngay.',
  keywords: ['bảng giá hosting', 'bảng giá vps', 'giá hosting', 'giá vps', 'hosting giá rẻ', 'vps giá rẻ', 'giá email doanh nghiệp', 'mua hosting giá rẻ', 'bảng giá hosting 2026', 'hosting rẻ nhất', 'so sánh gói hosting', 'giá hosting wordpress', 'giá hosting doanh nghiệp', 'hosting giá bao nhiêu', 'vps giá bao nhiêu'],
  openGraph: {
    title: 'Bảng giá Hosting, VPS, Email doanh nghiệp – Giá rẻ nhất 2026 | VMST Host',
    description: 'So sánh bảng giá hosting WordPress, VPS, email doanh nghiệp. Hosting từ 50.000₫/tháng, SSD NVMe, uptime 99.9%.',
    url: 'https://vmst.host/pricing',
    siteName: 'VMST Host',
    locale: 'vi_VN',
    type: 'website',
    images: [{
      url: 'https://vmst.host/api/og?title=B%E1%BA%A3ng%20gi%C3%A1%20Hosting%2C%20VPS%2C%20Email&description=Gi%C3%A1%20r%E1%BA%BB%20nh%E1%BA%A5t%202026',
      width: 1200,
      height: 630,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bảng giá Hosting, VPS, Email – VMST Host',
    description: 'Hosting từ 50.000₫/tháng, VPS NVMe, email doanh nghiệp. Giá rẻ nhất 2026.',
  },
  alternates: {
    canonical: 'https://vmst.host/pricing',
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
