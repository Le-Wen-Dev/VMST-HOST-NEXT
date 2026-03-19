'use client';

import { useEffect, useState } from 'react';
import { Search, Plus, Edit2, Trash2, Save, Tag } from 'lucide-react';
import Modal, { ConfirmModal } from '@/components/Modal';
import { listVouchers, createVoucher, updateVoucher, deleteVoucher, VoucherRecord } from '@/services/vouchers';
import { useToast } from '@/contexts/ToastContext';

export default function VoucherManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [vouchers, setVouchers] = useState<VoucherRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useToast();

  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<VoucherRecord | null>(null);

  const [codeGiamGia, setCodeGiamGia] = useState('');
  const [tenChienDich, setTenChienDich] = useState('');
  const [giaTri, setGiaTri] = useState('');
  const [donToiThieu, setDonToiThieu] = useState('0');
  const [soLuong, setSoLuong] = useState('0');
  const [daDung, setDaDung] = useState('0');
  const [dieuKien, setDieuKien] = useState('');

  useEffect(() => { loadVouchers(); }, []);

  const loadVouchers = async () => {
    try {
      setLoading(true);
      const res = await listVouchers({ perPage: 100, sort: '-created' });
      setVouchers(res.items);
    } catch (err: any) {
      console.error('Load vouchers failed', err);
      showError('Không thể tải danh sách voucher');
    } finally {
      setLoading(false);
    }
  };

  const filteredVouchers = vouchers.filter(v =>
    (v.code_giam_gia || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (v.ten_chien_dich || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = () => {
    setSelectedVoucher(null);
    setCodeGiamGia(''); setTenChienDich(''); setGiaTri('');
    setDonToiThieu('0'); setSoLuong('0'); setDaDung('0'); setDieuKien('');
    setShowFormModal(true);
  };

  const handleEdit = (voucher: VoucherRecord) => {
    setSelectedVoucher(voucher);
    setCodeGiamGia(voucher.code_giam_gia || ''); setTenChienDich(voucher.ten_chien_dich || '');
    setGiaTri(voucher.gia_tri || ''); setDonToiThieu(voucher.don_toi_thieu || '0');
    setSoLuong(voucher.so_luong || '0'); setDaDung(voucher.da_dung || '0');
    setDieuKien(voucher.dieu_kien || '');
    setShowFormModal(true);
  };

  const handleDelete = (voucher: VoucherRecord) => { setSelectedVoucher(voucher); setShowDeleteModal(true); };

  const handleSave = async () => {
    if (!codeGiamGia.trim()) { showError('Vui lòng nhập mã giảm giá'); return; }
    if (!giaTri.trim()) { showError('Vui lòng nhập giá trị giảm giá'); return; }
    try {
      const payload = { code_giam_gia: codeGiamGia, ten_chien_dich: tenChienDich, gia_tri: giaTri, don_toi_thieu: donToiThieu, so_luong: soLuong, da_dung: daDung, dieu_kien: dieuKien };
      if (selectedVoucher) { await updateVoucher(selectedVoucher.id, payload); showSuccess('Cập nhật voucher thành công!'); }
      else { await createVoucher(payload); showSuccess('Tạo voucher thành công!'); }
      setShowFormModal(false);
      loadVouchers();
    } catch (err: any) {
      showError(err?.message || 'Không thể lưu voucher');
      console.error('Save voucher error:', err);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedVoucher) return;
    try {
      await deleteVoucher(selectedVoucher.id);
      showSuccess('Xóa voucher thành công!');
      setShowDeleteModal(false);
      loadVouchers();
    } catch (err: any) {
      showError(err?.message || 'Không thể xóa voucher');
      console.error('Delete voucher error:', err);
    }
  };

  const getRemainingQty = (voucher: VoucherRecord) => {
    const total = parseInt(voucher.so_luong || '0');
    const used = parseInt(voucher.da_dung || '0');
    if (total === 0) return 'Không giới hạn';
    return `${total - used}/${total}`;
  };

  const getDiscountDisplay = (voucher: VoucherRecord) => {
    if (voucher.gia_tri?.includes('%')) return voucher.gia_tri;
    return `${parseFloat(voucher.gia_tri || '0').toLocaleString('vi-VN')}₫`;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#0B2B6F]">Quản lý Voucher</h2>
          <p className="text-gray-600 text-sm mt-1">Tạo và quản lý mã giảm giá</p>
        </div>
        <button onClick={handleCreate} className="bg-[#034CC9] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#0B2B6F] transition-colors flex items-center">
          <Plus className="h-4 w-4 mr-2" />Tạo voucher mới
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input type="text" placeholder="Tìm kiếm theo mã hoặc tên chiến dịch..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034CC9]" />
          </div>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã giảm giá</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên chiến dịch</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá trị</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Đơn tối thiểu</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số lượng</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Đã dùng</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Còn lại</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredVouchers.length === 0 ? (
                <tr><td colSpan={8} className="px-6 py-12 text-center text-gray-500">{searchTerm ? 'Không tìm thấy voucher nào' : 'Chưa có voucher nào. Hãy tạo voucher mới!'}</td></tr>
              ) : (
                filteredVouchers.map((voucher) => (
                  <tr key={voucher.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <Tag className="h-3 w-3 mr-1" />{voucher.code_giam_gia}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{voucher.ten_chien_dich || '-'}</div>
                      {voucher.dieu_kien && <div className="text-xs text-gray-500">{voucher.dieu_kien}</div>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm font-semibold text-green-600">{getDiscountDisplay(voucher)}</span></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{parseFloat(voucher.don_toi_thieu || '0').toLocaleString('vi-VN')}₫</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{voucher.so_luong === '0' ? 'Không giới hạn' : voucher.so_luong}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{voucher.da_dung || '0'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{getRemainingQty(voucher)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => handleEdit(voucher)} className="text-[#034CC9] hover:text-[#0B2B6F] mr-4"><Edit2 className="h-4 w-4 inline" /></button>
                      <button onClick={() => handleDelete(voucher)} className="text-red-600 hover:text-red-800"><Trash2 className="h-4 w-4 inline" /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <Modal isOpen={showFormModal} onClose={() => setShowFormModal(false)} title={selectedVoucher ? 'Chỉnh sửa Voucher' : 'Tạo Voucher Mới'}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Mã giảm giá <span className="text-red-500">*</span></label>
            <input type="text" value={codeGiamGia} onChange={(e) => setCodeGiamGia(e.target.value.toUpperCase())} placeholder="Ví dụ: GIAM20" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034CC9]" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Tên chiến dịch</label>
            <input type="text" value={tenChienDich} onChange={(e) => setTenChienDich(e.target.value)} placeholder="Ví dụ: Giảm giá Noel 2024" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034CC9]" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Giá trị giảm giá <span className="text-red-500">*</span></label>
            <input type="text" value={giaTri} onChange={(e) => setGiaTri(e.target.value)} placeholder="Ví dụ: 20% hoặc 50000" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034CC9]" />
            <p className="text-xs text-gray-500 mt-1">Nhập phần trăm (20%) hoặc số tiền cố định (50000)</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Đơn tối thiểu (₫)</label>
              <input type="number" value={donToiThieu} onChange={(e) => setDonToiThieu(e.target.value)} placeholder="0" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034CC9]" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Số lượng (0 = không giới hạn)</label>
              <input type="number" value={soLuong} onChange={(e) => setSoLuong(e.target.value)} placeholder="0" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034CC9]" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Đã dùng</label>
            <input type="number" value={daDung} onChange={(e) => setDaDung(e.target.value)} placeholder="0" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034CC9]" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Điều kiện</label>
            <textarea value={dieuKien} onChange={(e) => setDieuKien(e.target.value)} placeholder="Mô tả điều kiện sử dụng voucher..." rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034CC9]" />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button onClick={() => setShowFormModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">Hủy</button>
            <button onClick={handleSave} className="px-4 py-2 bg-[#034CC9] text-white rounded-lg hover:bg-[#0B2B6F] transition-colors flex items-center">
              <Save className="h-4 w-4 mr-2" />Lưu
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Xóa Voucher"
        message={`Bạn có chắc chắn muốn xóa voucher "${selectedVoucher?.code_giam_gia}"? Hành động này không thể hoàn tác.`}
      />
    </div>
  );
}
