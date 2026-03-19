'use client';
import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { HostingPlan, businessPlans } from '@/data/mockData';
import SeoContent from '@/components/SeoContent';
import { seoData } from '@/data/seo-articles';

const faqs = [
  {
    question: 'Business Hosting phù hợp với loại website nào?',
    answer: 'Business Hosting phù hợp với các website thương mại điện tử, ứng dụng web tùy chỉnh, hệ thống quản lý nội dung phức tạp và các dự án yêu cầu đa công nghệ. Hỗ trợ đầy đủ PHP, Node.js, Python và nhiều framework hiện đại.',
  },
  {
    question: 'Hosting doanh nghiệp có hỗ trợ Node.js và Python không?',
    answer: 'Có. Tất cả các gói Business Hosting đều hỗ trợ PHP, Node.js, Python và Ruby. Bạn có thể chạy đồng thời nhiều ứng dụng với các công nghệ khác nhau trên cùng một tài khoản hosting.',
  },
  {
    question: 'Có cam kết uptime không?',
    answer: 'Chúng tôi cam kết SLA 99.9% uptime cho tất cả các gói Business Hosting. Hệ thống được giám sát 24/7 và có đội ngũ kỹ thuật sẵn sàng xử lý sự cố trong thời gian ngắn nhất.',
  },
  {
    question: 'Hosting doanh nghiệp có bảo mật gì?',
    answer: 'Business Hosting được trang bị tường lửa (firewall) nhiều lớp, bảo vệ DDoS, SSL miễn phí, quét malware tự động và backup hằng ngày. Dữ liệu được mã hóa và lưu trữ tại nhiều địa điểm để đảm bảo an toàn tuyệt đối.',
  },
  {
    question: 'Có thể mở rộng tài nguyên khi cần không?',
    answer: 'Có. Tài nguyên hosting có thể được mở rộng linh hoạt theo nhu cầu thực tế. Bạn có thể nâng cấp gói bất cứ lúc nào, chi phí sẽ được tính theo tỷ lệ thời gian còn lại của chu kỳ hiện tại.',
  },
];

export default function BusinessHostingPage() {
  const router = useRouter();
  const { addToCart } = useCart();
  const [duration, setDuration] = useState<'monthly' | 'quarterly' | 'yearly'>('yearly');
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);

  const plans = businessPlans;

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
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Hosting cho doanh nghiệp – SSD tốc độ cao, bảo mật tối ưu</h1>
          <p className="text-xl text-blue-100 max-w-3xl">VPS và Hosting doanh nghiệp với hiệu năng cao, hỗ trợ đa công nghệ PHP/Node.js/Python, backup tự động hằng ngày, SLA 99.9%.</p>
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
          <h2 className="text-2xl font-bold text-[#0B2B6F] mb-6">Câu hỏi thường gặp về Hosting doanh nghiệp</h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-[#0B2B6F] hover:bg-gray-50 transition-colors"
                  onClick={() => setFaqOpenIndex(faqOpenIndex === idx ? null : idx)}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-[#034CC9] flex-shrink-0 ml-4 transition-transform ${faqOpenIndex === idx ? 'rotate-180' : ''}`}
                  />
                </button>
                {faqOpenIndex === idx && (
                  <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#0B2B6F] mb-6">Khám phá thêm dịch vụ Hosting</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/wordpress-hosting" className="block p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
              <h3 className="font-semibold text-[#0B2B6F] mb-1">WordPress Hosting</h3>
              <p className="text-sm text-gray-600">Hosting tối ưu cho WordPress</p>
            </a>
            <a href="/email-domain" className="block p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
              <h3 className="font-semibold text-[#0B2B6F] mb-1">Email doanh nghiệp</h3>
              <p className="text-sm text-gray-600">Email theo tên miền chuyên nghiệp</p>
            </a>
            <a href="/pricing" className="block p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
              <h3 className="font-semibold text-[#0B2B6F] mb-1">So sánh bảng giá</h3>
              <p className="text-sm text-gray-600">So sánh tất cả gói Hosting</p>
            </a>
          </div>
        </div>
      </div>
      <SeoContent {...seoData.business} />
    </div>
  );
}
