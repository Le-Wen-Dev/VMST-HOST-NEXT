import { useEffect, useState } from 'react';
import { Search, Plus, Upload, Download, CheckCircle2, XCircle, Users, FileText } from 'lucide-react';
import { getStudentList, addStudentEmails, getStudentVoucherStats, StudentVoucherData, StudentEmail } from '../../../services/studentVouchers';
import { useToast } from '../../../contexts/ToastContext';
import Modal from '../../../components/Modal';

export default function StudentVoucherManagement() {
  const [studentData, setStudentData] = useState<StudentVoucherData | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterUsed, setFilterUsed] = useState<'all' | 'used' | 'unused'>('all');
  const { showSuccess, showError } = useToast();

  const [showAddModal, setShowAddModal] = useState(false);
  const [emailList, setEmailList] = useState('');
  const [showImportModal, setShowImportModal] = useState(false);
  const [jsonImport, setJsonImport] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [data, statsData] = await Promise.all([
        getStudentList(),
        getStudentVoucherStats()
      ]);
      setStudentData(data);
      setStats(statsData);
    } catch (err: any) {
      console.error('Load student data failed', err);
      showError('Không thể tải danh sách sinh viên');
    } finally {
      setLoading(false);
    }
  };

  const handleAddEmails = async () => {
    if (!emailList.trim()) {
      showError('Vui lòng nhập danh sách email');
      return;
    }

    const emails = emailList
      .split('\n')
      .map(e => e.trim())
      .filter(e => e && e.includes('@'));

    if (emails.length === 0) {
      showError('Không có email hợp lệ');
      return;
    }

    try {
      const result = await addStudentEmails(emails);
      showSuccess(result.message);
      setShowAddModal(false);
      setEmailList('');
      loadData();
    } catch (err: any) {
      showError(err?.message || 'Không thể thêm email');
    }
  };

  const handleImportJSON = async () => {
    if (!jsonImport.trim()) {
      showError('Vui lòng nhập nội dung JSON');
      return;
    }

    try {
      const parsed = JSON.parse(jsonImport);
      const emails: string[] = [];
      
      if (Array.isArray(parsed)) {
        // Nếu là array of strings
        parsed.forEach(item => {
          if (typeof item === 'string' && item.includes('@')) {
            emails.push(item);
          } else if (typeof item === 'object' && item.email) {
            emails.push(item.email);
          }
        });
      } else if (parsed.students && Array.isArray(parsed.students)) {
        // Nếu là format của student-vouchers.json
        parsed.students.forEach((s: any) => {
          if (s.email) emails.push(s.email);
        });
      }

      if (emails.length === 0) {
        showError('Không tìm thấy email hợp lệ trong JSON');
        return;
      }

      const result = await addStudentEmails(emails);
      showSuccess(result.message);
      setShowImportModal(false);
      setJsonImport('');
      loadData();
    } catch (err: any) {
      showError(err?.message || 'JSON không hợp lệ');
    }
  };

  const handleExportJSON = () => {
    if (!studentData) return;
    
    const jsonStr = JSON.stringify(studentData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'student-vouchers.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showSuccess('Đã xuất file JSON');
  };

  const filteredStudents = studentData?.students.filter(s => {
    const matchesSearch = s.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = 
      filterUsed === 'all' || 
      (filterUsed === 'used' && s.used) || 
      (filterUsed === 'unused' && !s.used);
    return matchesSearch && matchesFilter;
  }) || [];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#0B2B6F]">Quản lý Voucher Sinh viên</h2>
          <p className="text-gray-600 text-sm mt-1">Quản lý danh sách email sinh viên được phép sử dụng voucher VOVANMY2026</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleExportJSON}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-700 transition-colors flex items-center"
          >
            <Download className="h-4 w-4 mr-2" />
            Xuất JSON
          </button>
          <button
            onClick={() => setShowImportModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center"
          >
            <Upload className="h-4 w-4 mr-2" />
            Import JSON
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-[#034CC9] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#0B2B6F] transition-colors flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Thêm email
          </button>
        </div>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Tổng số</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Chưa sử dụng</p>
                <p className="text-2xl font-bold text-green-600">{stats.available}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Đã sử dụng</p>
                <p className="text-2xl font-bold text-orange-600">{stats.used}</p>
              </div>
              <XCircle className="h-8 w-8 text-orange-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Mã voucher</p>
                <p className="text-lg font-bold text-purple-600">{stats.voucher_code}</p>
              </div>
              <FileText className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034CC9]"
            />
          </div>
          <select
            value={filterUsed}
            onChange={(e) => setFilterUsed(e.target.value as 'all' | 'used' | 'unused')}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034CC9]"
          >
            <option value="all">Tất cả</option>
            <option value="unused">Chưa sử dụng</option>
            <option value="used">Đã sử dụng</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#034CC9]"></div>
          <p className="mt-2 text-gray-600">Đang tải...</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thời gian sử dụng</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã đơn hàng</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    {searchTerm || filterUsed !== 'all' 
                      ? 'Không tìm thấy email nào' 
                      : 'Chưa có email nào trong danh sách. Hãy thêm email mới!'}
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.email} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{student.email}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {student.used ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          <XCircle className="h-3 w-3 mr-1" />
                          Đã sử dụng
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Chưa sử dụng
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.usedAt 
                        ? new Date(student.usedAt).toLocaleString('vi-VN')
                        : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                      {student.orderId || '-'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Email Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Thêm Email Sinh viên"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Danh sách email (mỗi email một dòng)
            </label>
            <textarea
              value={emailList}
              onChange={(e) => setEmailList(e.target.value)}
              placeholder="student1@example.com&#10;student2@example.com&#10;student3@example.com"
              rows={10}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034CC9] font-mono text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">Nhập mỗi email trên một dòng riêng</p>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={handleAddEmails}
              className="px-4 py-2 bg-[#034CC9] text-white rounded-lg hover:bg-[#0B2B6F] transition-colors"
            >
              Thêm
            </button>
          </div>
        </div>
      </Modal>

      {/* Import JSON Modal */}
      <Modal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        title="Import từ JSON"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nội dung JSON
            </label>
            <textarea
              value={jsonImport}
              onChange={(e) => setJsonImport(e.target.value)}
              placeholder='["email1@example.com", "email2@example.com"]&#10;hoặc&#10;{"students": [{"email": "email1@example.com"}, {"email": "email2@example.com"}]}'
              rows={10}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034CC9] font-mono text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">Hỗ trợ format array hoặc object có students array</p>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => setShowImportModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={handleImportJSON}
              className="px-4 py-2 bg-[#034CC9] text-white rounded-lg hover:bg-[#0B2B6F] transition-colors"
            >
              Import
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}




