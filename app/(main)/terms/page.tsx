import { FileText, Shield, AlertCircle, CheckCircle, CreditCard, Ban, Database, Scale } from 'lucide-react';
import type { Metadata } from 'next';
import SeoContent from '@/components/SeoContent';
import { seoData } from '@/data/seo-articles';

export const metadata: Metadata = {
  title: 'Điều khoản dịch vụ | VMST Host',
  description: 'Điều khoản dịch vụ của VMST Host - Terms of Service.',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="text-center mb-12 animate-fade-in">
            <FileText className="h-16 w-16 text-[#034CC9] mx-auto mb-4" />
            <h1 className="text-3xl sm:text-4xl font-bold text-[#0B2B6F] mb-4">📜 Điều khoản dịch vụ</h1>
            <p className="text-gray-600">Terms of Service – VMST Host</p>
            <p className="text-sm text-gray-500 mt-2">Cập nhật lần cuối: 17/03/2026</p>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <section className="animate-fade-in animate-delay-100">
              <h2 className="text-2xl font-bold text-[#0B2B6F] mb-4 flex items-center">
                <Shield className="h-6 w-6 mr-2 text-[#034CC9]" />
                1. Chấp nhận điều khoản
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Khi sử dụng dịch vụ của VMST Host, khách hàng đồng ý tuân thủ toàn bộ điều khoản dịch vụ này.
              </p>
            </section>

            <section className="animate-fade-in animate-delay-200">
              <h2 className="text-2xl font-bold text-[#0B2B6F] mb-4 flex items-center">
                <CheckCircle className="h-6 w-6 mr-2 text-[#034CC9]" />
                2. Phạm vi dịch vụ
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                VMST Host cung cấp:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Hosting</li>
                <li>VPS / Server</li>
                <li>Tên miền</li>
                <li>Các dịch vụ liên quan đến lưu trữ và vận hành website</li>
              </ul>
            </section>

            <section className="animate-fade-in animate-delay-300">
              <h2 className="text-2xl font-bold text-[#0B2B6F] mb-4 flex items-center">
                <AlertCircle className="h-6 w-6 mr-2 text-[#034CC9]" />
                3. Trách nhiệm của khách hàng
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Khách hàng cam kết:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Không sử dụng dịch vụ cho mục đích vi phạm pháp luật</li>
                <li>Không lưu trữ nội dung:
                  <ul className="list-disc list-inside space-y-1 text-gray-600 ml-6 mt-2">
                    <li>Lừa đảo, cờ bạc, mã độc, phishing</li>
                    <li>Vi phạm bản quyền</li>
                    <li>Nội dung trái thuần phong mỹ tục</li>
                  </ul>
                </li>
                <li>Tự chịu trách nhiệm về dữ liệu lưu trữ trên hosting</li>
              </ul>
            </section>

            <section className="animate-fade-in animate-delay-400">
              <h2 className="text-2xl font-bold text-[#0B2B6F] mb-4 flex items-center">
                <CreditCard className="h-6 w-6 mr-2 text-[#034CC9]" />
                4. Thanh toán & gia hạn
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Dịch vụ hoạt động theo hình thức <strong>trả trước</strong></li>
                <li>Khách hàng có trách nhiệm gia hạn đúng hạn</li>
                <li>VMST Host <strong>không chịu trách nhiệm mất dữ liệu</strong> nếu dịch vụ bị ngưng do quá hạn thanh toán</li>
              </ul>
            </section>

            <section className="animate-fade-in animate-delay-500">
              <h2 className="text-2xl font-bold text-[#0B2B6F] mb-4 flex items-center">
                <Ban className="h-6 w-6 mr-2 text-[#034CC9]" />
                5. Tạm ngưng & chấm dứt dịch vụ
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                VMST Host có quyền:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Tạm ngưng hoặc chấm dứt dịch vụ nếu khách hàng vi phạm điều khoản</li>
                <li>Ngưng dịch vụ khẩn cấp để bảo vệ hệ thống chung</li>
              </ul>
            </section>

            <section className="animate-fade-in">
              <h2 className="text-2xl font-bold text-[#0B2B6F] mb-4 flex items-center">
                <Database className="h-6 w-6 mr-2 text-[#034CC9]" />
                6. Sao lưu & dữ liệu
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>VMST Host hỗ trợ sao lưu theo chính sách từng gói</li>
                <li>Khách hàng <strong>phải tự sao lưu dữ liệu quan trọng</strong></li>
                <li>VMST Host không chịu trách nhiệm với mất mát dữ liệu ngoài phạm vi kiểm soát</li>
              </ul>
            </section>

            <section className="animate-fade-in">
              <h2 className="text-2xl font-bold text-[#0B2B6F] mb-4">7. Giới hạn trách nhiệm</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                VMST Host không chịu trách nhiệm đối với:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Thiệt hại gián tiếp, mất doanh thu</li>
                <li>Lỗi do bên thứ ba, thiên tai, sự cố bất khả kháng</li>
                <li>Lỗi phát sinh từ mã nguồn, plugin, theme của khách hàng</li>
              </ul>
            </section>

            <section className="animate-fade-in">
              <h2 className="text-2xl font-bold text-[#0B2B6F] mb-4">8. Thay đổi điều khoản</h2>
              <p className="text-gray-700 leading-relaxed">
                VMST Host có quyền thay đổi điều khoản dịch vụ. Việc tiếp tục sử dụng dịch vụ đồng nghĩa với việc chấp nhận điều khoản mới.
              </p>
            </section>

            <section className="animate-fade-in">
              <h2 className="text-2xl font-bold text-[#0B2B6F] mb-4 flex items-center">
                <Scale className="h-6 w-6 mr-2 text-[#034CC9]" />
                9. Luật áp dụng
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Điều khoản này được điều chỉnh theo <strong>pháp luật Việt Nam</strong>.
              </p>
            </section>

            <section className="animate-fade-in">
              <h2 className="text-2xl font-bold text-[#0B2B6F] mb-4">10. Liên hệ</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Mọi thắc mắc vui lòng liên hệ:
              </p>
              <div className="bg-gray-50 rounded-lg p-6 space-y-2">
                <p className="text-gray-700"><strong>CÔNG TY TNHH GIẢI PHÁP CÔNG NGHỆ VMST VIỆT NAM</strong></p>
                <p className="text-gray-700">Email: <a href="mailto:support@vmst.host" className="text-[#034CC9] hover:underline">support@vmst.host</a></p>
                <p className="text-gray-700">Hotline: <a href="tel:0822636676" className="text-[#034CC9] hover:underline">0822 636 676</a></p>
                <p className="text-gray-700">Website: <a href="https://vmst.host" className="text-[#034CC9] hover:underline">vmst.host</a></p>
              </div>
            </section>
          </div>
        </div>
      </div>
      <SeoContent {...seoData.terms} />
    </div>
  );
}
