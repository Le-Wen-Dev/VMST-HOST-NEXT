import { Shield, Lock, Database, Eye, UserCheck } from 'lucide-react';
import type { Metadata } from 'next';
import SeoContent from '@/components/SeoContent';
import { seoData } from '@/data/seo-articles';

export const metadata: Metadata = {
  title: 'Chính sách bảo mật | VMST Host',
  description: 'Chính sách bảo mật của VMST Host - Privacy Policy.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="text-center mb-12 animate-fade-in">
            <Shield className="h-16 w-16 text-[#034CC9] mx-auto mb-4" />
            <h1 className="text-3xl sm:text-4xl font-bold text-[#0B2B6F] mb-4">🔐 Chính sách bảo mật</h1>
            <p className="text-gray-600">Privacy Policy – VMST Host</p>
            <p className="text-sm text-gray-500 mt-2">Cập nhật lần cuối: 17/03/2026</p>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <section className="animate-fade-in animate-delay-100">
              <h2 className="text-2xl font-bold text-[#0B2B6F] mb-4">1. Giới thiệu</h2>
              <p className="text-gray-700 leading-relaxed">
                VMST Host cam kết bảo mật thông tin cá nhân của khách hàng khi sử dụng các dịch vụ hosting, máy chủ, tên miền và các dịch vụ liên quan do chúng tôi cung cấp.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Chính sách này mô tả cách chúng tôi thu thập, sử dụng và bảo vệ thông tin của khách hàng.
              </p>
            </section>

            <section className="animate-fade-in animate-delay-200">
              <h2 className="text-2xl font-bold text-[#0B2B6F] mb-4 flex items-center">
                <Database className="h-6 w-6 mr-2 text-[#034CC9]" />
                2. Thông tin chúng tôi thu thập
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Chúng tôi có thể thu thập các thông tin sau:
              </p>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-[#0B2B6F] mb-2">Thông tin cá nhân:</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
                    <li>Họ tên, email, số điện thoại, tên công ty</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-[#0B2B6F] mb-2">Thông tin thanh toán:</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
                    <li>Lịch sử giao dịch, gói dịch vụ đã mua (không lưu thông tin thẻ ngân hàng)</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-[#0B2B6F] mb-2">Thông tin kỹ thuật:</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
                    <li>IP, log truy cập, hệ điều hành, trình duyệt</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-[#0B2B6F] mb-2">Thông tin sử dụng dịch vụ:</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
                    <li>Thời gian sử dụng, tài nguyên tiêu thụ (CPU, RAM, băng thông…)</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="animate-fade-in animate-delay-300">
              <h2 className="text-2xl font-bold text-[#0B2B6F] mb-4 flex items-center">
                <Eye className="h-6 w-6 mr-2 text-[#034CC9]" />
                3. Mục đích sử dụng thông tin
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Thông tin khách hàng được sử dụng để:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Cung cấp và vận hành dịch vụ hosting</li>
                <li>Quản lý tài khoản, gia hạn, thanh toán</li>
                <li>Hỗ trợ kỹ thuật và chăm sóc khách hàng</li>
                <li>Gửi thông báo liên quan đến dịch vụ</li>
                <li>Cải thiện chất lượng hệ thống</li>
              </ul>
              <div className="bg-blue-50 border-l-4 border-[#034CC9] p-4 mt-4 rounded">
                <p className="text-gray-700">
                  <strong>👉 VMST Host KHÔNG bán, cho thuê hoặc chia sẻ dữ liệu cá nhân cho bên thứ ba</strong> vì mục đích thương mại.
                </p>
              </div>
            </section>

            <section className="animate-fade-in animate-delay-400">
              <h2 className="text-2xl font-bold text-[#0B2B6F] mb-4 flex items-center">
                <Lock className="h-6 w-6 mr-2 text-[#034CC9]" />
                4. Bảo mật thông tin
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Dữ liệu được lưu trữ trên hệ thống bảo mật cao</li>
                <li>Áp dụng các biện pháp kỹ thuật và quản lý phù hợp</li>
                <li>Giới hạn quyền truy cập nội bộ</li>
                <li>Sao lưu định kỳ để đảm bảo an toàn dữ liệu</li>
              </ul>
            </section>

            <section className="animate-fade-in animate-delay-500">
              <h2 className="text-2xl font-bold text-[#0B2B6F] mb-4">5. Chia sẻ thông tin với bên thứ ba</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Thông tin chỉ được chia sẻ trong các trường hợp:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Có yêu cầu từ cơ quan nhà nước có thẩm quyền</li>
                <li>Phục vụ việc vận hành hệ thống (đối tác hạ tầng, thanh toán)</li>
                <li>Có sự đồng ý của khách hàng</li>
              </ul>
            </section>

            <section className="animate-fade-in">
              <h2 className="text-2xl font-bold text-[#0B2B6F] mb-4 flex items-center">
                <UserCheck className="h-6 w-6 mr-2 text-[#034CC9]" />
                6. Quyền của khách hàng
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Khách hàng có quyền:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Kiểm tra, chỉnh sửa thông tin cá nhân</li>
                <li>Yêu cầu ngừng sử dụng hoặc xóa dữ liệu</li>
                <li>Khiếu nại về việc sử dụng thông tin sai mục đích</li>
              </ul>
            </section>

            <section className="animate-fade-in">
              <h2 className="text-2xl font-bold text-[#0B2B6F] mb-4">7. Thay đổi chính sách</h2>
              <p className="text-gray-700 leading-relaxed">
                VMST Host có thể cập nhật chính sách bảo mật khi cần. Phiên bản mới sẽ được công bố trên website.
              </p>
            </section>

            <section className="animate-fade-in">
              <h2 className="text-2xl font-bold text-[#0B2B6F] mb-4">8. Liên hệ</h2>
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
      <SeoContent {...seoData.privacy} />
    </div>
  );
}
