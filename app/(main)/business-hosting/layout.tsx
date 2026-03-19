import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hosting doanh nghiệp cao cấp – VPS Cloud NVMe, Uptime 99.9% | VMST Host',
  description: 'Business Hosting cao cấp cho doanh nghiệp tại VMST Host. VPS Cloud NVMe tốc độ cao, uptime 99.9%, bảo mật tối ưu, không giới hạn băng thông. Phù hợp website bán hàng, thương mại điện tử, ứng dụng doanh nghiệp.',
  keywords: ['hosting doanh nghiệp', 'vps cloud', 'vps giá rẻ', 'vps nvme', 'thuê vps', 'vps tốc độ cao', 'vps cho website', 'hosting cho doanh nghiệp', 'vps linux', 'vps windows', 'vps việt nam', 'vps ssd', 'vps uy tín', 'hosting cao cấp', 'vps cloud giá rẻ'],
  openGraph: {
    title: 'Hosting doanh nghiệp cao cấp – VPS Cloud NVMe, Uptime 99.9% | VMST Host',
    description: 'Business Hosting VPS Cloud NVMe, uptime 99.9%, bảo mật tối ưu. Phù hợp website doanh nghiệp, thương mại điện tử.',
    url: 'https://vmst.host/business-hosting',
    siteName: 'VMST Host',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hosting doanh nghiệp – VPS Cloud NVMe | VMST Host',
    description: 'Business Hosting VPS Cloud NVMe, uptime 99.9%, bảo mật tối ưu.',
  },
  alternates: {
    canonical: 'https://vmst.host/business-hosting',
  },
};

export default function BusinessHostingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
