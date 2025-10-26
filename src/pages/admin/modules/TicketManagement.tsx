import { useEffect, useMemo, useState } from 'react';
import { MessageSquare, Plus, Search, Clock, X, Send } from 'lucide-react';
import { listTickets, createTicket, updateTicket, deleteTicket, TicketDepartmentPB, TicketPriorityPB, TicketStatusPB, mapPriorityToLabel, mapStatusToLabel } from '../../../services/tickets';
import Modal from '../../../components/Modal';

export default function TicketManagement() {
  const [items, setItems] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'all' | TicketStatusPB>('all');
  const [department, setDepartment] = useState<'all' | TicketDepartmentPB>('all');
  const [priority, setPriority] = useState<'all' | TicketPriorityPB>('all');
  const [loading, setLoading] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [createData, setCreateData] = useState<{ tieu_de: string; tin_nhan: string; bo_phan: TicketDepartmentPB; do_uu_tien: TicketPriorityPB; trang_thai: TicketStatusPB; khach_hang?: string; don_hang?: string; }>({ tieu_de: '', tin_nhan: '', bo_phan: 'technical', do_uu_tien: 'trung_binh', trang_thai: 'cho_tech_rep' });

  const [showChat, setShowChat] = useState(false);
  const [chatTicket, setChatTicket] = useState<any | null>(null);
  const [replyText, setReplyText] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await listTickets({ page, perPage, search: search.trim() || undefined, status, department, priority });
      setItems(res.items);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error('Load tickets failed', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [page, perPage, search, status, department, priority]);

  const summary = useMemo(() => {
    return {
      cho_tech_rep: items.filter(i => i.trang_thai === 'cho_tech_rep').length,
      cho_khach_rep: items.filter(i => i.trang_thai === 'cho_khach_rep').length,
      dong_ticket: items.filter(i => i.trang_thai === 'dong_ticket').length,
      urgentCount: items.filter(i => i.do_uu_tien === 'cao').length,
    };
  }, [items]);

  const onCreate = async () => {
    try {
      await createTicket(createData);
      setShowCreate(false);
      setCreateData({ tieu_de: '', tin_nhan: '', bo_phan: 'technical', do_uu_tien: 'trung_binh', trang_thai: 'cho_tech_rep' });
      fetchData();
    } catch (err) {
      console.error('Create ticket failed', err);
      alert('Tạo ticket thất bại. Vui lòng kiểm tra lại.');
    }
  };

  const onUpdateStatus = async (id: string, s: TicketStatusPB) => {
    try { await updateTicket(id, { trang_thai: s }); fetchData(); } catch (err) { console.error(err); }
  };

  const onDelete = async (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa ticket này?')) return;
    try { await deleteTicket(id); fetchData(); } catch (err) { console.error(err); }
  };

  const openChat = (t: any) => {
    setChatTicket(t);
    setReplyText('');
    setShowChat(true);
  };

  const sendReply = async () => {
    if (!chatTicket || !replyText.trim()) return;
    try {
      const prev = Array.isArray(chatTicket.phan_hoi_cua_he_thong) ? chatTicket.phan_hoi_cua_he_thong : (chatTicket.phan_hoi_cua_he_thong ? [ { text: String(chatTicket.phan_hoi_cua_he_thong), at: String(chatTicket.updated || new Date().toISOString()) } ] : []);
      const next = [...prev, { text: replyText.trim(), at: new Date().toISOString() }];
      await updateTicket(chatTicket.id, { phan_hoi_cua_he_thong: next, trang_thai: 'cho_khach_rep' } as any);
      setReplyText('');
      setShowChat(false);
      fetchData();
    } catch (err) {
      console.error('Reply failed', err);
      alert('Gửi phản hồi thất bại');
    }
  };

  const countMessages = (t: any) => {
    const replies = Array.isArray(t.phan_hoi_cua_he_thong) ? t.phan_hoi_cua_he_thong.length : (t.phan_hoi_cua_he_thong ? 1 : 0);
    return (t.tin_nhan ? 1 : 0) + replies;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Quản lý Tickets</h1>
        <button onClick={() => setShowCreate(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Tạo Ticket
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-yellow-500">
          <p className="text-gray-600 text-sm mb-1">Chờ kỹ thuật</p>
          <p className="text-2xl font-bold text-gray-900">{summary.cho_tech_rep}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-purple-500">
          <p className="text-gray-600 text-sm mb-1">Chờ khách hàng</p>
          <p className="text-2xl font-bold text-gray-900">{summary.cho_khach_rep}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-gray-500">
          <p className="text-gray-600 text-sm mb-1">Đóng</p>
          <p className="text-2xl font-bold text-gray-900">{summary.dong_ticket}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-red-500">
          <p className="text-gray-600 text-sm mb-1">Ưu tiên cao</p>
          <p className="text-2xl font-bold text-gray-900">{summary.urgentCount}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-4 flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2 border rounded-lg px-3 py-2 flex-1 min-w-[240px]">
          <Search className="h-4 w-4 text-gray-500" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm theo tiêu đề, nội dung" className="flex-1 outline-none" />
        </div>
        <select value={status} onChange={(e) => setStatus(e.target.value as any)} className="px-3 py-2 border rounded-lg">
          <option value="all">Tất cả trạng thái</option>
          <option value="cho_tech_rep">Chờ kỹ thuật</option>
          <option value="cho_khach_rep">Chờ khách hàng</option>
          <option value="dong_ticket">Đóng</option>
        </select>
        <select value={department} onChange={(e) => setDepartment(e.target.value as any)} className="px-3 py-2 border rounded-lg">
          <option value="all">Tất cả bộ phận</option>
          <option value="technical">Kỹ thuật</option>
          <option value="sale">Sale</option>
        </select>
        <select value={priority} onChange={(e) => setPriority(e.target.value as any)} className="px-3 py-2 border rounded-lg">
          <option value="all">Tất cả ưu tiên</option>
          <option value="thap">Thấp</option>
          <option value="trung_binh">Trung bình</option>
          <option value="cao">Cao</option>
        </select>
        <div className="ml-auto flex items-center gap-2">
          <label className="text-sm text-gray-600">Hiển thị</label>
          <select value={perPage} onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }} className="px-3 py-2 border rounded-lg">
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Ticket</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Khách hàng</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Chủ đề</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Bộ phận</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Ưu tiên</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Trạng thái</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Cập nhật</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading && (
              <tr><td colSpan={8} className="px-6 py-8 text-center text-gray-500">Đang tải dữ liệu...</td></tr>
            )}
            {!loading && items.length === 0 && (
              <tr><td colSpan={8} className="px-6 py-8 text-center text-gray-500">Không có dữ liệu</td></tr>
            )}
            {items.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="font-semibold text-gray-900 font-mono">{t.id}</p>
                  {t.don_hang && (
                    <p className="text-xs text-gray-500">Đơn hàng: {t.don_hang}</p>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-semibold text-gray-900">{t.expand?.khach_hang?.email || t.khach_hang || '—'}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="font-medium text-gray-900 max-w-xs truncate">{t.tieu_de}</p>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    {countMessages(t)} tin nhắn
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    t.bo_phan === 'technical' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {t.bo_phan === 'technical' ? 'Kỹ thuật' : 'Sale'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    t.do_uu_tien === 'cao' ? 'bg-red-100 text-red-800' : t.do_uu_tien === 'trung_binh' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {mapPriorityToLabel(t.do_uu_tien)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select value={t.trang_thai} onChange={(e) => onUpdateStatus(t.id, e.target.value as TicketStatusPB)} className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                    t.trang_thai === 'cho_tech_rep' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' : t.trang_thai === 'cho_khach_rep' ? 'bg-purple-100 text-purple-800 border-purple-300' : 'bg-gray-100 text-gray-800 border-gray-300'
                  }`}>
                    <option value="cho_tech_rep">Chờ kỹ thuật</option>
                    <option value="cho_khach_rep">Chờ khách hàng</option>
                    <option value="dong_ticket">Đóng</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    {String(t.updated).split(' ')[0]}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button onClick={() => openChat(t)} className="text-blue-600 hover:text-blue-800 font-semibold text-sm">Xem/Rep</button>
                    <button onClick={() => onDelete(t.id)} className="text-red-600 hover:text-red-800 font-semibold text-sm">Xóa</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">Trang {page} / {totalPages}</p>
        <div className="flex items-center gap-2">
          <button disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p-1))} className="px-3 py-2 border rounded-lg disabled:opacity-50">Trước</button>
          <button disabled={page >= totalPages} onClick={() => setPage((p) => p+1)} className="px-3 py-2 border rounded-lg disabled:opacity-50">Sau</button>
        </div>
      </div>

      {showCreate && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-bold">Tạo ticket mới</h3>
              <button onClick={() => setShowCreate(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tiêu đề</label>
                <input value={createData.tieu_de} onChange={(e) => setCreateData(v => ({...v, tieu_de: e.target.value}))} className="w-full border rounded-lg px-3 py-2" placeholder="Nhập tiêu đề" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tin nhắn</label>
                <textarea value={createData.tin_nhan} onChange={(e) => setCreateData(v => ({...v, tin_nhan: e.target.value}))} className="w-full border rounded-lg px-3 py-2" rows={4} placeholder="Nội dung yêu cầu" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Bộ phận</label>
                  <select value={createData.bo_phan} onChange={(e) => setCreateData(v => ({...v, bo_phan: e.target.value as TicketDepartmentPB}))} className="w-full border rounded-lg px-3 py-2">
                    <option value="technical">Kỹ thuật</option>
                    <option value="sale">Sale</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Ưu tiên</label>
                  <select value={createData.do_uu_tien} onChange={(e) => setCreateData(v => ({...v, do_uu_tien: e.target.value as TicketPriorityPB}))} className="w-full border rounded-lg px-3 py-2">
                    <option value="thap">Thấp</option>
                    <option value="trung_binh">Trung bình</option>
                    <option value="cao">Cao</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Trạng thái</label>
                  <select value={createData.trang_thai} onChange={(e) => setCreateData(v => ({...v, trang_thai: e.target.value as TicketStatusPB}))} className="w-full border rounded-lg px-3 py-2">
                    <option value="cho_tech_rep">Chờ kỹ thuật</option>
                    <option value="cho_khach_rep">Chờ khách hàng</option>
                    <option value="dong_ticket">Đóng</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-4 border-t flex justify-end gap-3">
              <button onClick={() => setShowCreate(false)} className="px-4 py-2 border rounded-lg">Hủy</button>
              <button onClick={onCreate} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Tạo</button>
            </div>
          </div>
        </div>
      )}

      {showChat && chatTicket && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-bold">Trao đổi Ticket</h3>
              <button onClick={() => setShowChat(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-4 space-y-4">
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {chatTicket.tin_nhan && (
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-gray-100 px-3 py-2 text-sm">
                      <p className="font-semibold">Khách hàng</p>
                      <p>{chatTicket.tin_nhan}</p>
                    </div>
                  </div>
                )}
                {Array.isArray(chatTicket.phan_hoi_cua_he_thong) && chatTicket.phan_hoi_cua_he_thong.length > 0 && chatTicket.phan_hoi_cua_he_thong.map((m: any, idx: number) => (
                  <div className="flex items-start gap-3 justify-end" key={idx}>
                    <div className="rounded-lg bg-blue-100 px-3 py-2 text-sm">
                      <p className="font-semibold">Kỹ thuật</p>
                      <p>{m?.text || String(m)}</p>
                      {m?.at && (<p className="text-xs text-gray-600 mt-1">{String(m.at).slice(0,19).replace('T',' ')}</p>)}
                    </div>
                  </div>
                ))}
                {!chatTicket.tin_nhan && (!chatTicket.phan_hoi_cua_he_thong || (Array.isArray(chatTicket.phan_hoi_cua_he_thong) && chatTicket.phan_hoi_cua_he_thong.length === 0)) && (
                  <p className="text-sm text-gray-600">Chưa có tin nhắn</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phản hồi</label>
                <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} className="w-full border rounded-lg px-3 py-2" rows={3} placeholder="Nhập nội dung phản hồi" />
              </div>
            </div>
            <div className="p-4 border-t flex justify-end gap-3">
              <button onClick={() => setShowChat(false)} className="px-4 py-2 border rounded-lg">Đóng</button>
              <button onClick={sendReply} className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2">
                <Send className="h-4 w-4" /> Gửi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}