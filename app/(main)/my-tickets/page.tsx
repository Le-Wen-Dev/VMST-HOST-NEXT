'use client';

import { useState, useEffect } from 'react';
import { MessageSquare, Plus, Send, Clock, X, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

import Modal from '@/components/Modal';
import { listTickets, createTicket, updateTicket, TicketDepartmentPB, TicketPriorityPB, TicketStatusPB } from '@/services/tickets';
import { getCurrentUser } from '@/services/pocketbase';

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

export default function MyTicketsPage() {
  const router = useRouter();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [replyMessage, setReplyMessage] = useState('');

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState<'all' | TicketStatusPB>('all');
  const [departmentFilter, setDepartmentFilter] = useState<'all' | TicketDepartmentPB>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | TicketPriorityPB>('all');
  const [searchQuery, setSearchQuery] = useState('');

  async function fetchTickets() {
    const user = getCurrentUser();
    const res = await listTickets({ page, perPage, search: searchQuery.trim() || undefined, status: statusFilter, department: departmentFilter, priority: priorityFilter, userId: user?.id });
    const mapped: Ticket[] = (res.items || []).map((r: any) => {
      const repliesArray = Array.isArray(r.phan_hoi_cua_he_thong) ? r.phan_hoi_cua_he_thong : (r.phan_hoi_cua_he_thong ? [ { text: String(r.phan_hoi_cua_he_thong), at: r.updated } ] : []);
      const messages = [
        r.tin_nhan ? { id: r.id + '-c', sender: 'client', senderName: 'Bạn', message: r.tin_nhan, timestamp: r.created } : null,
        ...repliesArray.map((m: any, idx: number) => ({ id: r.id + '-s' + idx, sender: 'staff' as const, senderName: 'Kỹ thuật', message: m?.text || String(m), timestamp: m?.at || r.updated }))
      ].filter(Boolean) as Ticket['messages'];
      const statusMapped: Ticket['status'] = r.trang_thai === 'dong_ticket' ? 'closed' : (r.trang_thai === 'cho_khach_rep' ? 'answered' : 'open');
      return ({
        id: r.id,
        subject: r.tieu_de,
        department: (r.bo_phan === 'sale' ? 'sales' : 'technical') as Ticket['department'],
        priority: (r.do_uu_tien === 'cao' ? 'urgent' : r.do_uu_tien === 'trung_binh' ? 'normal' : 'low') as Ticket['priority'],
        status: statusMapped,
        createdDate: r.created,
        lastUpdate: r.updated,
        messages,
      });
    });
    setTickets(mapped);
  }

  useEffect(() => { fetchTickets(); }, [page, perPage, statusFilter, departmentFilter, priorityFilter, searchQuery]);

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

  async function handleCreateTicketSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const subject = formData.get('subject') as string;
    const dept = (formData.get('department') as string) || 'technical';
    const prio = (formData.get('priority') as string) || 'normal';
    const message = formData.get('message') as string;
    const user = getCurrentUser();

    const bo_phan: TicketDepartmentPB = dept === 'sales' ? 'sale' : 'technical';
    const do_uu_tien: TicketPriorityPB = prio === 'urgent' || prio === 'high' ? 'cao' : prio === 'normal' ? 'trung_binh' : 'thap';

    await createTicket({ tieu_de: subject, tin_nhan: message, bo_phan, do_uu_tien, trang_thai: 'cho_tech_rep', khach_hang: user?.id });
    setShowCreateModal(false);
    fetchTickets();
  }

  const handleReply = async () => {
    if (!selectedTicket || !replyMessage.trim()) return;

    try {
      await updateTicket(selectedTicket.id, { tin_nhan: replyMessage.trim(), trang_thai: 'cho_tech_rep' });
      setReplyMessage('');
      setShowDetailModal(false);
      fetchTickets();
    } catch (err) {
      console.error('Client reply failed', err);
      alert('Gửi phản hồi thất bại');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="mb-3">
              <button
                onClick={() => { if (window.history.length > 1) window.history.back(); else router.push('/portal'); }}
                className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-[#034CC9]"
              >
                <ChevronLeft className="h-5 w-5" /> Quay lại
              </button>
            </div>
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

        <div className="bg-white rounded-xl shadow-md p-4 flex flex-wrap gap-3 items-center mb-6">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tiêu đề hoặc nội dung"
            className="px-3 py-2 border rounded-lg flex-1 min-w-[240px]"
          />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)} className="px-3 py-2 border rounded-lg">
            <option value="all">Tất cả trạng thái</option>
            <option value="cho_tech_rep">Chờ kỹ thuật</option>
            <option value="cho_khach_rep">Chờ khách</option>
            <option value="dong_ticket">Đã đóng</option>
          </select>
          <select value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value as any)} className="px-3 py-2 border rounded-lg">
            <option value="all">Tất cả bộ phận</option>
            <option value="technical">Kỹ thuật</option>
            <option value="sale">Kinh doanh</option>
          </select>
          <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value as any)} className="px-3 py-2 border rounded-lg">
            <option value="all">Tất cả ưu tiên</option>
            <option value="thap">Thấp</option>
            <option value="trung_binh">Trung bình</option>
            <option value="cao">Cao</option>
          </select>
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
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => { setSelectedTicket(ticket); setShowDetailModal(true); }}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-2 transition-all"
                        >
                          <MessageSquare className="h-4 w-4" />
                          Xem
                        </button>
                        <button
                          onClick={async () => { if (ticket.status === 'closed') return; try { await updateTicket(ticket.id, { trang_thai: 'dong_ticket' }); fetchTickets(); } catch (e) { alert('Đóng ticket thất bại'); } }}
                          className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all ${ticket.status === 'closed' ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                          title="Đóng ticket"
                        >
                          <X className="h-4 w-4" />
                          Đóng
                        </button>
                      </div>
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
        <form onSubmit={handleCreateTicketSubmit} className="space-y-4">
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
        title={`Ticket ${selectedTicket?.id}: ${selectedTicket?.subject || ''}`}
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
    </div>
  );
}
