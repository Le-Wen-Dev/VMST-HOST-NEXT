import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mua Hosting WordPress giá rẻ tốc độ cao – OpenLiteSpeed, NVMe, Backup tự động',
  description: 'Mua hosting WordPress giá rẻ tốc độ cao tại VMST Host. Hosting WordPress tối ưu SEO với OpenLiteSpeed, SSD NVMe, LiteSpeed Cache, WordPress Toolkit, backup tự động hàng ngày. Uptime 99.9%, hỗ trợ 24/7.',
  keywords: ['hosting wordpress giá rẻ', 'hosting wordpress tốc độ cao', 'hosting wordpress tối ưu seo', 'mua hosting wordpress', 'hosting cho website wordpress', 'hosting wordpress nvme', 'hosting wordpress openlitespeed', 'hosting wordpress ssd', 'hosting wordpress woocommerce', 'hosting wordpress backup', 'hosting wordpress việt nam', 'hosting wordpress uy tín', 'hosting wordpress cloudlinux', 'hosting wordpress litespeed cache', 'hosting wordpress toolkit'],
  openGraph: {
    title: 'Mua Hosting WordPress giá rẻ tốc độ cao – OpenLiteSpeed, NVMe | VMST Host',
    description: 'Hosting WordPress tối ưu SEO, OpenLiteSpeed, SSD NVMe, backup tự động. Uptime 99.9%, hỗ trợ 24/7.',
    url: 'https://vmst.host/wordpress-hosting',
    siteName: 'VMST Host',
    locale: 'vi_VN',
    type: 'website',
    images: [{
      url: 'https://vmst.host/api/og?title=Hosting%20WordPress%20gi%C3%A1%20r%E1%BA%BB&description=OpenLiteSpeed%2C%20SSD%20NVMe%2C%20Backup%20t%E1%BB%B1%20%C4%91%E1%BB%99ng',
      width: 1200,
      height: 630,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hosting WordPress giá rẻ tốc độ cao – VMST Host',
    description: 'Hosting WordPress OpenLiteSpeed, NVMe, backup tự động. Uptime 99.9%.',
  },
  alternates: {
    canonical: 'https://vmst.host/wordpress-hosting',
  },
};

export default function WordpressHostingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
