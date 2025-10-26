import { useState } from 'react';
import { MessageSquare, Plus, Send, Clock, CheckCircle, X } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Modal from '../components/Modal';

interface Ticket {
  id: string;
  subject: string;
  department: 'technical' | 'sales' | 'billing';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  status: 'open' | 'answered' | 'closed';
  createdDate: string;
  lastUpdate: string;
  messages: Array<{
    id: string;
    sender: 'client' | 'staff';
    senderName: string;
    message: string;
    timestamp: string;
  }>;
}

export default function MyTicketsPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [replyMessage, setReplyMessage] = useState('');

  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 'TK-001',
      subject: 'Không thể truy cập cPanel',
      department: 'technical',
      priority: 'high',
      status: 'answered',
      createdDate: '2025-10-08 09:30',
      lastUpdate: '2025-10-08 14:20',
      messages: [
        {
          id: 'm1',
          sender: 'client',
          senderName: 'Nguyễn Văn An',
          message: 'Xin chào, tôi không thể đăng nhập vào cPanel. Hệ thống báo lỗi "Invalid credentials".',
          timestamp: '2025-10-08 09:30'
        },
        {
          id: 'm2',
          sender: 'staff',
          senderName: 'Support Team',
          message: 'Xin chào anh An, chúng tôi đã kiểm tra và reset lại mật khẩu cho tài khoản của anh. Mật khẩu mới đã được gửi qua email.',
          timestamp: '2025-10-08 14:20'
        }
      ]
    },
    {
      id: 'TK-002',
      subject: 'Nâng cấp gói dịch vụ',
      department: 'sales',
      priority: 'normal',
      status: 'open',
      createdDate: '2025-10-09 10:15',
      lastUpdate: '2025-10-09 10:15',
      messages: [
        {
          id: 'm3',
          sender: 'client',
          senderName: 'Nguyễn Văn An',
          message: 'Tôi muốn nâng cấp từ gói Hosting Basic lên gói Pro. Chi phí là bao nhiêu?',
          timestamp: '2025-10-09 10:15'
        }
      ]
    }
  ]);

  const getDepartmentLabel = (dept: string) => {
    const labels = {
      'technical': 'Kỹ thuật',
      'sales': 'Kinh doanh',
      'billing': 'Thanh toán'
    };
    return labels[dept as keyof typeof labels];
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      'low': 'bg-gray-100 text-gray-800',
      'normal': 'bg-blue-100 text-blue-800',
      'high': 'bg-orange-100 text-orange-800',
      'urgent': 'bg-red-100 text-red-800'
    };
    return colors[priority as keyof typeof colors];
  };

  const getPriorityLabel = (priority: string) => {
    const labels = {
      'low': 'Thấp',
      'normal': 'Bình thường',
      'high': 'Cao',
      'urgent': 'Gấp'
    };
    return labels[priority as keyof typeof labels];
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'open': 'bg-blue-100 text-blue-800',
      'answered': 'bg-green-100 text-green-800',
      'closed': 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors];
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      'open': 'Đang mở',
      'answered': 'Đã trả lời',
      'closed': 'Đã đóng'
    };
    return labels[status as keyof typeof labels];
  };

  const handleCreateTicket = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newTicket: Ticket = {
      id: `TK-${String(tickets.length + 1).padStart(3, '0')}`,
      subject: formData.get('subject') as string,
      department: formData.get('department') as 'technical' | 'sales' | 'billing',
      priority: formData.get('priority') as 'low' | 'normal' | 'high' | 'urgent',
      status: 'open',
      createdDate: new Date().toLocaleString('vi-VN'),
      lastUpdate: new Date().toLocaleString('vi-VN'),
      messages: [
        {
          id: 'm' + Date.now(),
          sender: 'client',
          senderName: 'Nguyễn Văn An',
          message: formData.get('message') as string,
          timestamp: new Date().toLocaleString('vi-VN')
        }
      ]
    };
    setTickets([newTicket, ...tickets]);
    setShowCreateModal(false);
  };

  const handleReply = () => {
    if (!selectedTicket || !replyMessage.trim()) return;

    const updatedTicket = {
      ...selectedTicket,
      lastUpdate: new Date().toLocaleString('vi-VN'),
      messages: [
        ...selectedTicket.messages,
        {
          id: 'm' + Date.now(),
          sender: 'client' as const,
          senderName: 'Nguyễn Văn An',
          message: replyMessage,
          timestamp: new Date().toLocaleString('vi-VN')
        }
      ]
    };

    setTickets(tickets.map(t => t.id === updatedTicket.id ? updatedTicket : t));
    setSelectedTicket(updatedTicket);
    setReplyMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header onNavigate={onNavigate} />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Ticket hỗ trợ</h1>
            <p className="text-gray-600">Tạo và quản lý yêu cầu hỗ trợ của bạn</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 shadow-lg transition-all"
          >
            <Plus className="h-5 w-5" />
            Tạo ticket mới
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <p className="text-gray-600 text-sm mb-1">Đang mở</p>
            <p className="text-3xl font-bold text-gray-900">
              {tickets.filter(t => t.status === 'open').length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <p className="text-gray-600 text-sm mb-1">Đã trả lời</p>
            <p className="text-3xl font-bold text-gray-900">
              {tickets.filter(t => t.status === 'answered').length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-gray-500">
            <p className="text-gray-600 text-sm mb-1">Đã đóng</p>
            <p className="text-3xl font-bold text-gray-900">
              {tickets.filter(t => t.status === 'closed').length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase">Mã ticket</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase">Tiêu đề</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase">Bộ phận</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase">Ưu tiên</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase">Trạng thái</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase">Cập nhật</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900">{ticket.id}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">{ticket.subject}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800">
                        {getDepartmentLabel(ticket.department)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getPriorityColor(ticket.priority)}`}>
                        {getPriorityLabel(ticket.priority)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(ticket.status)}`}>
                        {getStatusLabel(ticket.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        {ticket.lastUpdate}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setSelectedTicket(ticket);
                          setShowDetailModal(true);
                        }}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-2 transition-all"
                      >
                        <MessageSquare className="h-4 w-4" />
                        Xem
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Tạo ticket hỗ trợ mới"
        size="lg"
      >
        <form onSubmit={handleCreateTicket} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Tiêu đề <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="subject"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Mô tả vấn đề của bạn"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Bộ phận</label>
              <select
                name="department"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="technical">Kỹ thuật</option>
                <option value="sales">Kinh doanh</option>
                <option value="billing">Thanh toán</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Độ ưu tiên</label>
              <select
                name="priority"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Thấp</option>
                <option value="normal">Bình thường</option>
                <option value="high">Cao</option>
                <option value="urgent">Gấp</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Nội dung <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Mô tả chi tiết vấn đề bạn đang gặp phải..."
              required
            />
          </div>

          <div className="flex gap-4 pt-4 border-t">
            <button
              type="button"
              onClick={() => setShowCreateModal(false)}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-bold"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold flex items-center justify-center gap-2"
            >
              <Send className="h-5 w-5" />
              Gửi ticket
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        title={`Ticket ${selectedTicket?.id}: ${selectedTicket?.subject}`}
        size="xl"
      >
        {selectedTicket && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 flex-wrap">
              <span className={`px-4 py-2 rounded-lg text-sm font-bold ${getStatusColor(selectedTicket.status)}`}>
                {getStatusLabel(selectedTicket.status)}
              </span>
              <span className={`px-4 py-2 rounded-lg text-sm font-bold ${getPriorityColor(selectedTicket.priority)}`}>
                {getPriorityLabel(selectedTicket.priority)}
              </span>
              <span className="px-4 py-2 rounded-lg text-sm font-bold bg-purple-100 text-purple-800">
                {getDepartmentLabel(selectedTicket.department)}
              </span>
            </div>

            <div className="border rounded-lg p-4 bg-gray-50">
              <p className="text-sm text-gray-600">Tạo lúc: {selectedTicket.createdDate}</p>
              <p className="text-sm text-gray-600">Cập nhật: {selectedTicket.lastUpdate}</p>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {selectedTicket.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-4 rounded-lg ${
                    msg.sender === 'client'
                      ? 'bg-blue-50 border-l-4 border-blue-500'
                      : 'bg-green-50 border-l-4 border-green-500'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-bold text-gray-900">{msg.senderName}</p>
                    <p className="text-sm text-gray-600">{msg.timestamp}</p>
                  </div>
                  <p className="text-gray-800 whitespace-pre-wrap">{msg.message}</p>
                </div>
              ))}
            </div>

            {selectedTicket.status !== 'closed' && (
              <div className="border-t pt-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">Trả lời ticket</label>
                <textarea
                  rows={4}
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập tin nhắn của bạn..."
                />
                <button
                  onClick={handleReply}
                  className="mt-4 w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold flex items-center justify-center gap-2"
                >
                  <Send className="h-5 w-5" />
                  Gửi tin nhắn
                </button>
              </div>
            )}
          </div>
        )}
      </Modal>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
