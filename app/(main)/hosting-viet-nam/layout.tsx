import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hosting Việt Nam — Dịch vụ hosting theo tỉnh thành, máy chủ Việt Nam',
  description: 'Dịch vụ hosting tại Việt Nam theo từng tỉnh thành: TP.HCM, Hà Nội, Đà Nẵng, Bình Dương, Cần Thơ... Server Việt Nam, SSD NVMe, thanh toán VietQR, hỗ trợ tiếng Việt 24/7.',
  keywords: [
    'hosting việt nam', 'hosting tphcm', 'hosting hà nội', 'hosting đà nẵng',
    'hosting giá rẻ', 'web hosting việt nam', 'mua hosting tại việt nam',
    'hosting server việt nam', 'hosting máy chủ việt nam',
  ],
  openGraph: {
    title: 'Hosting Việt Nam — Dịch vụ hosting theo tỉnh thành | VMST Host',
    description: 'Hosting tại Việt Nam: TP.HCM, Hà Nội, Đà Nẵng, Bình Dương... Server Việt Nam, SSD NVMe, thanh toán VietQR.',
    url: 'https://vmst.host/hosting-viet-nam',
    siteName: 'VMST Host',
    locale: 'vi_VN',
    type: 'website',
    images: [{
      url: 'https://vmst.host/api/og?title=Hosting%20Vi%E1%BB%87t%20Nam&description=D%E1%BB%8Bch%20v%E1%BB%A5%20hosting%20theo%20t%E1%BB%89nh%20th%C3%A0nh',
      width: 1200,
      height: 630,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hosting Việt Nam theo tỉnh thành – VMST Host',
    description: 'Hosting TP.HCM, Hà Nội, Đà Nẵng, Bình Dương... Server Việt Nam, SSD NVMe.',
  },
  alternates: {
    canonical: 'https://vmst.host/hosting-viet-nam',
  },
};

export default function HostingVietNamLayout({ children }: { children: React.ReactNode }) {
  return children;
}
