import { useState } from 'react';
import { MessageSquare, Paperclip, Send, AlertCircle, Ticket, BookOpen, Headphones, FileText } from 'lucide-react';
import { mockServices } from '../data/mockData';

interface SupportPageProps {
  onNavigate?: (page: string) => void;
}

export default function SupportPage({ onNavigate }: SupportPageProps) {
  const [subject, setSubject] = useState('');
  const [department, setDepartment] = useState('technical');
  const [priority, setPriority] = useState('normal');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubject('');
      setMessage('');
      setService('');
      setSubmitted(false);
      // Điều hướng tới trang ticket sau khi tạo thành công
      if (onNavigate) {
        onNavigate('my-tickets');
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <MessageSquare className="h-16 w-16 text-[#034CC9] mx-auto mb-4" />
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0B2B6F] mb-4">Trung tâm hỗ trợ</h1>
          <p className="text-lg sm:text-xl text-gray-600">Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7</p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => onNavigate && onNavigate('my-tickets')}
            className="bg-[#034CC9] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#0B2B6F] transition-all hover:scale-105 inline-flex items-center"
          >
            <Ticket className="h-4 w-4 mr-2" />
            Xem ticket của tôi
          </button>
          <button
            onClick={() => onNavigate && onNavigate('blog')}
            className="bg-white border-2 border-[#034CC9] text-[#034CC9] px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-all hover:scale-105 inline-flex items-center"
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Hướng dẫn & FAQ
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="h-6 w-6 text-[#034CC9]" />
            </div>
            <h3 className="font-semibold text-[#0B2B6F] mb-2">Live Chat</h3>
            <p className="text-sm text-gray-600 mb-4">Trả lời trong 5 phút</p>
            <button className="text-[#034CC9] font-semibold hover:underline">
              Bắt đầu chat
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-[#0B2B6F] mb-2">Email</h3>
            <p className="text-sm text-gray-600 mb-4">support@vmst.host</p>
            <a href="mailto:support@vmst.host" className="text-[#034CC9] font-semibold hover:underline">
              Gửi email
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="h-6 w-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="font-semibold text-[#0B2B6F] mb-2">Hotline</h3>
            <p className="text-sm text-gray-600 mb-4">0822 636 676</p>
            <a href="tel:0822636676" className="text-[#034CC9] font-semibold hover:underline">
              Gọi ngay
            </a>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#0B2B6F] mb-6">Tạo ticket hỗ trợ</h2>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">Ticket đã được tạo!</h3>
              <p className="text-green-700">Chúng tôi sẽ phản hồi trong vòng 2 giờ.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bộ phận <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034CC9]"
                  >
                    <option value="technical">Kỹ thuật</option>
                    <option value="sales">Sale</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mức độ ưu tiên <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034CC9]"
                  >
                    <option value="low">Thấp</option>
                    <option value="normal">Thường</option>
                    <option value="high">Cao</option>
                    <option value="urgent">Gấp</option>
                  </select>
                  {priority === 'urgent' && (
                    <div className="mt-2 flex items-start bg-red-50 border border-red-200 rounded-lg p-3">
                      <AlertCircle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-red-700">
                        Ticket gấp sẽ được ưu tiên xử lý trong 30 phút
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Dịch vụ cần hỗ trợ
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034CC9]"
                >
                  <option value="">-- Chọn dịch vụ --</option>
                  {mockServices.map((srv) => (
                    <option key={srv.id} value={srv.id}>
                      {srv.planName} - {srv.serverName} ({srv.ip})
                    </option>
                  ))}
                  <option value="general">Chung / Chưa có dịch vụ</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Chọn dịch vụ liên quan để chúng tôi hỗ trợ nhanh hơn
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Chủ đề <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034CC9]"
                  placeholder="Mô tả ngắn gọn vấn đề"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nội dung <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034CC9]"
                  placeholder="Mô tả chi tiết vấn đề của bạn..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Đính kèm file
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#034CC9] transition-colors cursor-pointer">
                  <Paperclip className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Kéo thả file hoặc click để chọn</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG, PDF (max 10MB)</p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#034CC9] text-white py-4 rounded-lg font-semibold hover:bg-[#0B2B6F] transition-colors flex items-center justify-center"
              >
                <Send className="h-5 w-5 mr-2" />
                Gửi ticket
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
