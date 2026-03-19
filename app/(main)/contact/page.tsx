'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, ChevronDown } from 'lucide-react';
import { submitContact, fetchClientIp } from '@/services/contacts';
import SeoContent from '@/components/SeoContent';
import { seoData } from '@/data/seo-articles';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const ip = await fetchClientIp();
      const payload = {
        ho_va_ten: formData.name?.trim(),
        email: formData.email?.trim().toLowerCase(),
        so_dien_thoai: formData.phone?.trim(),
        trang_nhan_lead: `contact_page${formData.message ? ' | ' + formData.message : ''}`,
        trang_thai: 'newlead',
        ip_adress: ip,
        user_agent: { ua: navigator.userAgent },
      };
      const record = await submitContact(payload);
      console.log('Contact created:', record?.id, record);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', phone: '', message: '' });
      }, 2500);
    } catch (err: any) {
      console.error('Submit contact failed', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-[#034CC9] to-[#0B2B6F] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Liên hệ tư vấn Hosting – Hỗ trợ 24/7</h1>
          <p className="text-xl text-blue-100">Đội ngũ kỹ thuật VMST Host luôn sẵn sàng tư vấn và hỗ trợ bạn chọn gói Hosting phù hợp nhất</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-[#0B2B6F] mb-6">Gửi tin nhắn cho chúng tôi</h2>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-green-800 mb-2">Đã gửi thành công!</h3>
                  <p className="text-green-700">Chúng tôi sẽ liên hệ lại với bạn sớm nhất có thể.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Họ tên <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034CC9]"
                        placeholder="Nguyễn Văn A"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034CC9]"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034CC9]"
                      placeholder="0912345678"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nội dung <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034CC9]"
                      placeholder="Bạn cần hỗ trợ gì?"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#034CC9] text-white py-4 rounded-lg font-semibold hover:bg-[#0B2B6F] transition-colors"
                  >
                    Gửi tin nhắn
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
              <h3 className="text-xl font-bold text-[#0B2B6F] mb-6">Thông tin liên hệ</h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <Phone className="h-6 w-6 text-[#034CC9]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Hotline</h4>
                    <a href="tel:0822636676" className="text-[#034CC9] hover:underline">
                      0822 636 676
                    </a>
                    <p className="text-sm text-gray-600 mt-1">24/7 hỗ trợ khách hàng</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <Mail className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                    <a href="mailto:support@vmst.host" className="text-[#034CC9] hover:underline">
                      support@vmst.host
                    </a>
                    <p className="text-sm text-gray-600 mt-1">Phản hồi trong 2 giờ</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <MapPin className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Địa chỉ</h4>
                    <p className="text-gray-700">
                      CÔNG TY TNHH GIẢI PHÁP CÔNG NGHỆ VMST VIỆT NAM
                    </p>
                    <p className="text-sm text-gray-600 mt-1">Việt Nam</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t">
                <h4 className="font-semibold text-gray-900 mb-4">Giờ làm việc</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Thứ 2 - Thứ 6</span>
                    <span className="font-semibold text-gray-900">8:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Thứ 7</span>
                    <span className="font-semibold text-gray-900">8:00 - 17:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Chủ nhật</span>
                    <span className="font-semibold text-gray-900">9:00 - 15:00</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">* Hỗ trợ khẩn cấp 24/7 qua hotline</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#0B2B6F] mb-6">Câu hỏi thường gặp khi liên hệ tư vấn Hosting</h2>
          <div className="space-y-3">
            {[
              { q: 'Tôi cần tư vấn chọn gói Hosting, liên hệ bằng cách nào?', a: 'Bạn có thể gọi hotline 0822 636 676 (hỗ trợ 24/7), gửi email tới support@vmst.host, hoặc điền form liên hệ trên trang này. Đội ngũ kỹ thuật sẽ phản hồi trong vòng 2 giờ làm việc.' },
              { q: 'VMST Host có hỗ trợ kỹ thuật ngoài giờ hành chính không?', a: 'Có. Hotline hỗ trợ khẩn cấp hoạt động 24/7. Ngoài giờ hành chính, bạn vẫn có thể gọi điện hoặc gửi ticket hỗ trợ, đội ngũ trực sẽ xử lý ngay.' },
              { q: 'Tôi muốn chuyển website từ nhà cung cấp khác, có được hỗ trợ không?', a: 'Hoàn toàn miễn phí. Đội ngũ kỹ thuật VMST Host sẽ hỗ trợ chuyển toàn bộ dữ liệu website, email, database từ nhà cung cấp cũ sang hệ thống mới mà không gián đoạn dịch vụ.' },
              { q: 'Thời gian phản hồi trung bình là bao lâu?', a: 'Email và form liên hệ: phản hồi trong 2 giờ làm việc. Hotline: phản hồi ngay lập tức. Ticket hỗ trợ kỹ thuật: xử lý trong 1-4 giờ tùy mức độ phức tạp.' },
              { q: 'VMST Host có văn phòng tại Việt Nam không?', a: 'Có. VMST Host là thương hiệu của CÔNG TY TNHH GIẢI PHÁP CÔNG NGHỆ VMST VIỆT NAM, hoạt động hợp pháp tại Việt Nam với đầy đủ giấy phép kinh doanh.' },
            ].map((item, idx) => (
              <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setFaqOpenIndex(faqOpenIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-[#0B2B6F] pr-4">{item.q}</span>
                  <ChevronDown className={`h-5 w-5 text-gray-400 flex-shrink-0 transition-transform ${faqOpenIndex === idx ? 'rotate-180' : ''}`} />
                </button>
                {faqOpenIndex === idx && (
                  <div className="px-4 pb-4">
                    <p className="text-gray-600 leading-relaxed">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Internal Links */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#0B2B6F] mb-6">Khám phá dịch vụ Hosting</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/wordpress-hosting" className="block p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
              <h3 className="font-semibold text-[#0B2B6F] mb-1">WordPress Hosting</h3>
              <p className="text-sm text-gray-600">Hosting tối ưu cho WordPress với LiteSpeed</p>
            </a>
            <a href="/business-hosting" className="block p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
              <h3 className="font-semibold text-[#0B2B6F] mb-1">Hosting doanh nghiệp</h3>
              <p className="text-sm text-gray-600">VPS hiệu năng cao cho doanh nghiệp</p>
            </a>
            <a href="/pricing" className="block p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
              <h3 className="font-semibold text-[#0B2B6F] mb-1">Bảng giá Hosting</h3>
              <p className="text-sm text-gray-600">So sánh tất cả gói dịch vụ</p>
            </a>
          </div>
        </div>

        {/* LocalBusiness Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'VMST Host',
              description: 'Dịch vụ Hosting giá rẻ tốc độ cao tại Việt Nam',
              url: 'https://vmst.host',
              telephone: '+84822636676',
              email: 'support@vmst.host',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'VN',
              },
              openingHoursSpecification: [
                { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '08:00', closes: '18:00' },
                { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '08:00', closes: '17:00' },
                { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '09:00', closes: '15:00' },
              ],
            }),
          }}
        />
        <SeoContent {...seoData.contact} />
      </div>
    </div>
  );
}
