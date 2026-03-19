import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chính sách bảo mật – VMST Host',
  description: 'Chính sách bảo mật thông tin khách hàng tại VMST Host. Cam kết bảo vệ dữ liệu cá nhân và thông tin thanh toán.',
  alternates: {
    canonical: 'https://vmst.host/privacy-policy',
  },
};

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
