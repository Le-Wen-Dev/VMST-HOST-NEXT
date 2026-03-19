import { useEffect, useState } from 'react';
import { Search, Plus, Edit2, Trash2, Eye, Phone, Mail, Building, X, Save } from 'lucide-react';
import { listContacts, submitContact, updateContact, deleteContact } from '../../../services/contacts';
import Modal, { ConfirmModal } from '../../../components/Modal';

export default function LeadManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [showFormModal, setShowFormModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<any>(null);

  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [formSource, setFormSource] = useState('contact-form');
  const [formStatus, setFormStatus] = useState('new');
  const [formAssignedTo, setFormAssignedTo] = useState('');
  const [formNotes, setFormNotes] = useState('');

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(searchTerm.trim());
    }, 300);
    return () => clearTimeout(t);
  }, [searchTerm]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const statusMapInv: Record<string, string> = {
        new: 'newlead',
        contacted: 'contacted',
        qualified: 'qualifiedlead',
        converted: 'customer',
        lost: 'lost',
      };
      const res = await listContacts({
        page,
        perPage,
        status: statusFilter !== 'all' ? statusMapInv[statusFilter] : undefined,
        search: debouncedSearch || undefined,
      });
      const mapped = (res.items || []).map((r: any) => {
        const ua = r.user_agent || {};
        const statusMap: Record<string, string> = {
          newlead: 'new',
          contacted: 'contacted',
          qualifiedlead: 'qualified',
          opportunity: 'qualified',
          customer: 'converted',
          lost: 'lost',
        };
        return {
          id: r.id,
          name: r.ho_va_ten,
          email: r.email,
          phone: r.so_dien_thoai,
          company: ua.company || '',
          source: r.trang_nhan_lead || 'contact-form',
          status: statusMap[r.trang_thai || 'newlead'] || 'new',
          assignedTo: ua.assignedTo || '',
          notes: ua.notes || '',
          createdDate: (r.created || '').slice(0, 19).replace('T', ' '),
          _raw: r,
        };
      });
      setLeads(mapped);
      setTotalPages(res.totalPages || 1);
      setTotalItems(res.totalItems || mapped.length);
    } catch (err) {
      console.error('Load contacts failed', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, perPage, statusFilter, debouncedSearch]);

  const filteredLeads = leads.filter((lead) => {
    const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;
    return matchesSource;
  });

  const getStatusColor = (status: string) => {
    const colors = {
      new: 'bg-blue-100 text-blue-800',
      contacted: 'bg-yellow-100 text-yellow-800',
      qualified: 'bg-purple-100 text-purple-800',
      converted: 'bg-green-100 text-green-800',
      lost: 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      new: 'Mới',
      contacted: 'Đã liên hệ',
      qualified: 'Tiềm năng',
      converted: 'Đã chuyển đổi',
      lost: 'Thất bại',
    };
    return labels[status as keyof typeof labels] || status;
  };

  const handleCreate = () => {
    setSelectedLead(null);
    setFormName('');
    setFormEmail('');
    setFormPhone('');
    setFormCompany('');
    setFormSource('contact-form');
    setFormStatus('new');
    setFormAssignedTo('');
    setFormNotes('');
    setShowFormModal(true);
  };

  const handleEdit = (lead: any) => {
    setSelectedLead(lead);
    setFormName(lead.name || '');
    setFormEmail(lead.email || '');
    setFormPhone(lead.phone || '');
    setFormCompany(lead.company || '');
    setFormSource(lead.source || 'contact-form');
    setFormStatus(lead.status || 'new');
    setFormAssignedTo(lead.assignedTo || '');
    setFormNotes(lead.notes || '');
    setShowFormModal(true);
  };

  const handleView = (lead: any) => {
    setSelectedLead(lead);
    setShowViewModal(true);
  };

  const handleDelete = (lead: any) => {
    setSelectedLead(lead);
    setShowDeleteModal(true);
  };

  const handleSave = async () => {
    try {
      const invStatusMap: Record<string, string> = {
        new: 'newlead',
        contacted: 'contacted',
        qualified: 'qualifiedlead',
        converted: 'customer',
        lost: 'lost',
      };
      if (!formName.trim() || !formEmail.trim()) {
        return;
      }
      if (!selectedLead) {
        const payload = {
          ho_va_ten: formName.trim(),
          email: formEmail.trim().toLowerCase(),
          so_dien_thoai: formPhone.trim(),
          trang_nhan_lead: formSource,
          trang_thai: invStatusMap[formStatus] || 'newlead',
          user_agent: { assignedTo: formAssignedTo, notes: formNotes, company: formCompany },
        };
        await submitContact(payload);
      } else {
        const payload: any = {
          ho_va_ten: formName.trim(),
          email: formEmail.trim().toLowerCase(),
          so_dien_thoai: formPhone.trim(),
          trang_nhan_lead: formSource,
          trang_thai: invStatusMap[formStatus] || 'newlead',
          user_agent: { assignedTo: formAssignedTo, notes: formNotes, company: formCompany },
        };
        await updateContact(selectedLead.id, payload);
      }
      setShowFormModal(false);
      setSelectedLead(null);
      await fetchLeads();
    } catch (err) {
      console.error('Save lead failed', err);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      if (selectedLead?.id) {
        await deleteContact(selectedLead.id);
        setSelectedLead(null);
        setShowDeleteModal(false);
        await fetchLeads();
      }
    } catch (err) {
      console.error('Delete lead failed', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý Lead</h1>
          <p className="text-gray-600 mt-1">Theo dõi và chuyển đổi khách hàng tiềm năng</p>
        </div>
        <button
          onClick={handleCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-lg transition-all"
        >
          <Plus className="h-5 w-5" />
          Thêm Lead
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {['new', 'contacted', 'qualified', 'converted', 'lost'].map((status) => (
          <div key={status} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <p className="text-gray-600 text-sm mb-1">{getStatusLabel(status)}</p>
            <p className="text-3xl font-bold text-gray-900">
              {leads.filter((l) => l.status === status).length}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, email..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="new">Mới</option>
            <option value="contacted">Đã liên hệ</option>
            <option value="qualified">Tiềm năng</option>
            <option value="converted">Đã chuyển đổi</option>
            <option value="lost">Thất bại</option>
          </select>
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tất cả nguồn</option>
            <option value="contact-form">Contact Form</option>
            <option value="footer-form">Footer Form</option>
            <option value="advisor">Advisor</option>
            <option value="chat">Chat</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Khách hàng</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Liên hệ</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Nguồn</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Phụ trách</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Ngày tạo</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-900">{lead.name}</p>
                      {lead.company && (
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <Building className="h-3 w-3 mr-1" />
                          {lead.company}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-3 w-3 mr-2" />
                        {lead.email}
                      </div>
                      {lead.phone && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="h-3 w-3 mr-2" />
                          {lead.phone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                      {lead.source.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(lead.status)}`}>
                      {getStatusLabel(lead.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {lead.assignedTo || <span className="text-gray-400">Chưa gán</span>}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {lead.createdDate}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleView(lead)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(lead)}
                        className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(lead)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-4">
          <div className="text-sm text-gray-600">
            Hiển thị {Math.min((page - 1) * perPage + 1, totalItems)}–{Math.min(page * perPage, totalItems)} trên {totalItems} • Trang {page}/{totalPages}
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Hiển thị mỗi trang</label>
            <select
              value={perPage}
              onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-2 border rounded-lg disabled:opacity-50"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={loading || page <= 1}
              >
                Trước
              </button>
              <button
                className="px-3 py-2 border rounded-lg disabled:opacity-50"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={loading || page >= totalPages}
              >
                Sau
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        title={selectedLead ? 'Chỉnh sửa Lead' : 'Thêm Lead mới'}
        size="lg"
      >
        <form className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Tên khách hàng <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                defaultValue={undefined}
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Nguyễn Văn A"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                defaultValue={undefined}
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="email@example.com"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Số điện thoại</label>
              <input
                type="text"
                defaultValue={undefined}
                value={formPhone}
                onChange={(e) => setFormPhone(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="0901234567"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Công ty</label>
              <input
                type="text"
                defaultValue={undefined}
                value={formCompany}
                onChange={(e) => setFormCompany(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Tên công ty"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Nguồn</label>
              <select
                defaultValue={undefined}
                value={formSource}
                onChange={(e) => setFormSource(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="contact-form">Contact Form</option>
                <option value="footer-form">Footer Form</option>
                <option value="advisor">Advisor</option>
                <option value="chat">Chat</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Trạng thái</label>
              <select
                defaultValue={undefined}
                value={formStatus}
                onChange={(e) => setFormStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="new">Mới</option>
                <option value="contacted">Đã liên hệ</option>
                <option value="qualified">Tiềm năng</option>
                <option value="converted">Đã chuyển đổi</option>
                <option value="lost">Thất bại</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Phụ trách</label>
            <select
              defaultValue={undefined}
              value={formAssignedTo}
              onChange={(e) => setFormAssignedTo(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Chưa gán</option>
              <option value="Nguyễn Văn A">Nguyễn Văn A</option>
              <option value="Trần Thị B">Trần Thị B</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Ghi chú</label>
            <textarea
              rows={4}
              defaultValue={undefined}
              value={formNotes}
              onChange={(e) => setFormNotes(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Ghi chú về lead..."
            />
          </div>

          <div className="flex gap-4 pt-4 border-t">
            <button
              type="button"
              onClick={() => setShowFormModal(false)}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2"
            >
              <Save className="h-5 w-5" />
              {selectedLead ? 'Cập nhật' : 'Thêm Lead'}
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        title="Thông tin Lead"
        size="lg"
      >
        {selectedLead && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2">Tên khách hàng</label>
                <p className="text-lg font-semibold text-gray-900">{selectedLead.name}</p>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2">Email</label>
                <p className="text-lg text-gray-900">{selectedLead.email}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2">Số điện thoại</label>
                <p className="text-lg text-gray-900">{selectedLead.phone || '-'}</p>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2">Công ty</label>
                <p className="text-lg text-gray-900">{selectedLead.company || '-'}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2">Nguồn</label>
                <span className="inline-block px-4 py-2 rounded-lg text-sm font-semibold bg-gray-100 text-gray-800">
                  {selectedLead.source.replace('-', ' ')}
                </span>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2">Trạng thái</label>
                <span className={`inline-block px-4 py-2 rounded-lg text-sm font-semibold ${getStatusColor(selectedLead.status)}`}>
                  {getStatusLabel(selectedLead.status)}
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2">Phụ trách</label>
                <p className="text-lg text-gray-900">{selectedLead.assignedTo || 'Chưa gán'}</p>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2">Ngày tạo</label>
                <p className="text-lg text-gray-900">{selectedLead.createdDate}</p>
              </div>
            </div>

            {selectedLead.notes && (
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2">Ghi chú</label>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-900 whitespace-pre-wrap">{selectedLead.notes}</p>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-4 pt-4 border-t">
              <button
                onClick={() => {
                  setShowViewModal(false);
                  handleEdit(selectedLead);
                }}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-2"
              >
                <Edit2 className="h-5 w-5" />
                Chỉnh sửa
              </button>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Xác nhận xóa Lead"
        message={`Bạn có chắc chắn muốn xóa lead "${selectedLead?.name}"? Hành động này không thể hoàn tác.`}
        confirmText="Xóa"
        cancelText="Hủy"
        type="danger"
      />
    </div>
  );
}
