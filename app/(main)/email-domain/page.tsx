'use client';
import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { HostingPlan, emailPlans } from '@/data/mockData';
import SeoContent from '@/components/SeoContent';
import { seoData } from '@/data/seo-articles';

export default function EmailDomainPage() {
  const router = useRouter();
  const { addToCart } = useCart();
  const [duration, setDuration] = useState<'monthly' | 'quarterly' | 'yearly'>('yearly');
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);

  const plans = emailPlans;

  const getPriceByDuration = (plan: HostingPlan) => plan.price[duration];

  const getSavings = () => {
    if (duration === 'yearly') return 'Tiết kiệm 20%';
    if (duration === 'quarterly') return 'Tiết kiệm 10%';
    return '';
  };

  const handleAddToCart = (plan: HostingPlan) => {
    addToCart(plan, duration);
    router.push('/cart');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-[#034CC9] to-[#0B2B6F] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Email doanh nghiệp theo tên miền – Chuyên nghiệp, bảo mật cao</h1>
          <p className="text-xl text-blue-100 max-w-3xl">Dịch vụ email doanh nghiệp theo tên miền riêng với anti-spam, mã hóa SSL/TLS, đồng bộ đa thiết bị. Nâng tầm thương hiệu doanh nghiệp.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-lg shadow-md p-2 inline-flex">
            <button
              onClick={() => setDuration('monthly')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                duration === 'monthly' ? 'bg-[#034CC9] text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              1 tháng
            </button>
            <button
              onClick={() => setDuration('quarterly')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors relative ${
                duration === 'quarterly' ? 'bg-[#034CC9] text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              3 tháng
              {duration === 'quarterly' && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">-10%</span>
              )}
            </button>
            <button
              onClick={() => setDuration('yearly')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors relative ${
                duration === 'yearly' ? 'bg-[#034CC9] text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              12 tháng
              {duration === 'yearly' && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">-20%</span>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-xl ${
                plan.recommended ? 'border-2 border-[#034CC9] relative' : ''
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-[#034CC9] text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">Recommended</span>
                </div>
              )}
              <div className={`p-8 ${plan.recommended ? 'pt-10' : ''}`}>
                <h3 className="text-2xl font-bold text-[#0B2B6F] mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold text-[#034CC9]">{getPriceByDuration(plan).toLocaleString('vi-VN')}₫</span>
                  <span className="text-gray-500 ml-2">/{duration === 'monthly' ? 'tháng' : duration === 'quarterly' ? '3 tháng' : 'năm'}</span>
                </div>
                {getSavings() && (
                  <div className="bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm font-semibold mb-6 inline-block">{getSavings()}</div>
                )}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-gray-700 font-medium">Dung lượng</span>
                    <span className="text-[#0B2B6F] font-semibold">{plan.storage}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-gray-700 font-medium">Băng thông</span>
                    <span className="text-[#0B2B6F] font-semibold">{plan.bandwidth}</span>
                  </div>
                  {plan.websites > 0 && (
                    <div className="flex items-center justify-between py-2 border-b">
                      <span className="text-gray-700 font-medium">Websites</span>
                      <span className="text-[#0B2B6F] font-semibold">{plan.websites}</span>
                    </div>
                  )}
                  {plan.emails !== undefined && (
                    <div className="flex items-center justify-between py-2 border-b">
                      <span className="text-gray-700 font-medium">Email Accounts</span>
                      <span className="text-[#0B2B6F] font-semibold">{plan.emails}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-gray-700 font-medium">SLA</span>
                    <span className="text-[#0B2B6F] font-semibold">{plan.sla}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-gray-700 font-medium">Hỗ trợ</span>
                    <span className="text-[#0B2B6F] font-semibold">{plan.support}</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleAddToCart(plan)}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    plan.recommended ? 'bg-[#034CC9] text-white hover:bg-[#0B2B6F]' : 'bg-gray-100 text-[#034CC9] hover:bg-gray-200'
                  }`}
                >
                  Chọn gói
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#0B2B6F] mb-6">Câu hỏi thường gặp về Email doanh nghiệp</h2>
          <div className="space-y-3">
            {[
              {
                q: 'Email doanh nghiệp theo tên miền là gì?',
                a: 'Email doanh nghiệp theo tên miền là địa chỉ email sử dụng tên miền riêng của công ty, ví dụ: name@company.com thay vì dùng Gmail hay Yahoo. Điều này giúp tăng độ tin cậy, xây dựng thương hiệu chuyên nghiệp và tạo ấn tượng tốt với khách hàng, đối tác.',
              },
              {
                q: 'Email doanh nghiệp có chống spam không?',
                a: 'Có. Hệ thống email của chúng tôi tích hợp đầy đủ các cơ chế chống spam hiện đại gồm SPF, DKIM và DMARC. Các giao thức này xác thực nguồn gốc email, ngăn chặn giả mạo và lọc thư rác hiệu quả, giúp hộp thư luôn sạch và an toàn.',
              },
              {
                q: 'Có thể đồng bộ email trên điện thoại không?',
                a: 'Hoàn toàn có thể. Dịch vụ hỗ trợ giao thức IMAP và POP3, cho phép đồng bộ email trên mọi thiết bị — điện thoại Android, iPhone, máy tính bảng — và tương thích với các ứng dụng phổ biến như Outlook, Thunderbird, Apple Mail.',
              },
              {
                q: 'Dung lượng email có thể mở rộng không?',
                a: 'Có. Dung lượng hộp thư có thể nâng cấp linh hoạt theo nhu cầu sử dụng. Bạn có thể bắt đầu với gói cơ bản và mở rộng dung lượng hoặc số lượng tài khoản email bất cứ lúc nào mà không bị gián đoạn dịch vụ.',
              },
              {
                q: 'Có hỗ trợ chuyển email từ Gmail/Outlook không?',
                a: 'Có. Đội ngũ kỹ thuật VMST Host hỗ trợ migrate toàn bộ dữ liệu email từ Gmail, Outlook hoặc các nhà cung cấp khác sang hệ thống mới. Quá trình chuyển đổi được thực hiện không mất dữ liệu và hạn chế tối đa thời gian gián đoạn.',
              },
            ].map((item, idx) => (
              <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setFaqOpenIndex(faqOpenIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-[#0B2B6F]">{item.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-[#034CC9] flex-shrink-0 ml-4 transition-transform ${faqOpenIndex === idx ? 'rotate-180' : ''}`}
                  />
                </button>
                {faqOpenIndex === idx && (
                  <div className="px-6 pb-4 text-gray-600">{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#0B2B6F] mb-6">Khám phá thêm dịch vụ</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/wordpress-hosting" className="block p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
              <h3 className="font-semibold text-[#0B2B6F] mb-1">WordPress Hosting</h3>
              <p className="text-sm text-gray-600">Hosting tối ưu cho WordPress</p>
            </a>
            <a href="/business-hosting" className="block p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
              <h3 className="font-semibold text-[#0B2B6F] mb-1">Hosting doanh nghiệp</h3>
              <p className="text-sm text-gray-600">VPS hiệu năng cao cho doanh nghiệp</p>
            </a>
            <a href="/pricing" className="block p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
              <h3 className="font-semibold text-[#0B2B6F] mb-1">So sánh bảng giá</h3>
              <p className="text-sm text-gray-600">So sánh tất cả gói dịch vụ</p>
            </a>
          </div>
        </div>
      </div>
      <SeoContent {...seoData.email} />
    </div>
  );
}
