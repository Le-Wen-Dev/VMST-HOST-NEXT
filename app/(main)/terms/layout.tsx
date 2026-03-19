import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Điều khoản dịch vụ – VMST Host',
  description: 'Điều khoản sử dụng dịch vụ hosting, VPS, email doanh nghiệp tại VMST Host. Quy định về thanh toán, hoàn tiền, bảo hành dịch vụ.',
  alternates: {
    canonical: 'https://vmst.host/terms',
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
