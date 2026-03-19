import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import FloatingContacts from '@/components/FloatingContacts';
import SnowEffect from '@/components/SnowEffect';

export const metadata: Metadata = {
  title: {
    default: 'Hosting giá rẻ tốc độ cao – Dịch vụ Hosting WordPress, VPS, Email doanh nghiệp | VMST Host',
    template: '%s | VMST Host',
  },
  description: 'VMST Host cung cấp dịch vụ hosting giá rẻ tốc độ cao, VPS NVMe, email doanh nghiệp theo tên miền. Hosting WordPress tối ưu SEO, SSD NVMe, OpenLiteSpeed, CloudLinux, backup tự động. Hỗ trợ kỹ thuật 24/7. Uptime 99.9%.',
  keywords: ['hosting giá rẻ', 'hosting wordpress', 'hosting tốc độ cao', 'vps giá rẻ', 'vps nvme', 'email doanh nghiệp', 'hosting việt nam', 'web hosting', 'hosting ssd', 'mua hosting', 'thuê vps', 'email theo tên miền', 'hosting cho website bán hàng', 'hosting seo', 'hosting uy tín'],
  openGraph: {
    title: 'VMST Host – Hosting giá rẻ tốc độ cao, VPS NVMe, Email doanh nghiệp',
    description: 'Dịch vụ hosting WordPress, VPS cloud, email doanh nghiệp chuyên nghiệp. SSD NVMe, OpenLiteSpeed, uptime 99.9%, hỗ trợ 24/7.',
    url: 'https://vmst.host',
    siteName: 'VMST Host',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VMST Host – Hosting giá rẻ, VPS, Email doanh nghiệp',
    description: 'Hosting WordPress tốc độ cao, VPS NVMe, email doanh nghiệp. Hỗ trợ 24/7.',
  },
  alternates: {
    canonical: 'https://vmst.host',
  },
};

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <SnowEffect />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <ChatWidget />
      <FloatingContacts />
    </div>
  );
}
