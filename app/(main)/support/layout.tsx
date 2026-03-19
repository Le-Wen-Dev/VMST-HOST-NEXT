import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trung tâm hỗ trợ – Giải đáp lỗi Hosting, VPS, Email | VMST Host',
  description: 'Trung tâm hỗ trợ kỹ thuật VMST Host. Giải đáp lỗi hosting, vps, email. Hướng dẫn sử dụng, FAQ, tạo ticket hỗ trợ. Hỗ trợ 24/7.',
  keywords: ['hỗ trợ hosting', 'lỗi hosting', 'lỗi vps', 'lỗi email', 'hosting bị lỗi 500', 'vps không truy cập được', 'email không gửi được', 'lỗi dns', 'lỗi smtp'],
  openGraph: {
    title: 'Trung tâm hỗ trợ VMST Host',
    description: 'Hỗ trợ kỹ thuật hosting, VPS, email 24/7',
    url: 'https://vmst.host/support',
    siteName: 'VMST Host',
    locale: 'vi_VN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://vmst.host/support',
  },
};

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
