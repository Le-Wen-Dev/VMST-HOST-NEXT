'use client';

import { useState, useEffect } from 'react';
import { Search, Users, DollarSign, TrendingUp, CheckCircle, X, Eye } from 'lucide-react';
import Modal from '@/components/Modal';
import { listAffiliates, AffiliateRecord, updateAffiliate } from '@/services/affiliate';
import { listYeuCauThanhToan, updateYeuCauThanhToan, YeuCauThanhToanAffRecord } from '@/services/yeuCauThanhToanAff';

export default function AffiliateManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'users' | 'commissions'>('users');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AffiliateRecord | null>(null);
  const [affiliates, setAffiliates] = useState<AffiliateRecord[]>([]);
  const [commissions, setCommissions] = useState<YeuCauThanhToanAffRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const [affRes, comRes] = await Promise.all([
        listAffiliates({ perPage: 100, sort: '-created' }),
        listYeuCauThanhToan({ perPage: 100, sort: '-created' }),
      ]);
      setAffiliates(affRes.items);
      setCommissions(comRes.items);
    } catch (err) {
      console.error('Failed to load affiliate data:', err);
    } finally {
      setLoading(false);
    }
  }

  const filtered = affiliates.filter(u => {
    if (!searchTerm.trim()) return true;
    const s = searchTerm.toLowerCase();
    const name = (u.expand?.user_aff?.name || '').toLowerCase();
    const email = (u.expand?.user_aff?.email || '').toLowerCase();
    const code = (u.ma_gioi_thieu || '').toLowerCase();
    return name.includes(s) || email.includes(s) || code.includes(s);
  });

  const totalStats = {
    totalAffiliates: affiliates.length,
    totalOrders: affiliates.reduce((sum, u) => sum + Number(u.so_don_hang || 0), 0),
    totalRevenue: affiliates.reduce((sum, u) => sum + Number(u.so_doanh_thu || 0), 0),
    pendingCommission: affiliates.reduce((sum, u) => sum + Number(u.cho_thanh_toan || 0), 0),
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      chua_thanh_toan: 'bg-yellow-100 text-yellow-800',
      da_thanh_toan: 'bg-green-100 text-green-800',
      cho_duyet: 'bg-yellow-100 text-yellow-800',
      da_duyet: 'bg-blue-100 text-blue-800',
      tu_choi: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      chua_thanh_toan: 'Chưa thanh toán',
      da_thanh_toan: 'Đã thanh toán',
      cho_duyet: 'Chờ duyệt',
      da_duyet: 'Đã duyệt',
      tu_choi: 'Từ chối',
    };
    return labels[status] || status;
  };

  const handleApproveCommission = async (id: string) => {
    try {
      await updateYeuCauThanhToan(id, { trang_thai: 'da_duyet' });
      loadData();
    } catch (err) {
      console.error('Error approving:', err);
    }
  };

  const handleRejectCommission = async (id: string) => {
    try {
      await updateYeuCauThanhToan(id, { trang_thai: 'tu_choi' });
      loadData();
    } catch (err) {
      console.error('Error rejecting:', err);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Quản lý Affiliate</h1>
        <p className="text-gray-600 mt-1">Theo dõi và quản lý chương trình giới thiệu</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg"><Users className="h-6 w-6 text-blue-600" /></div>
            <div><p className="text-gray-600 text-sm">Affiliate</p><p className="text-2xl font-bold text-gray-900">{totalStats.totalAffiliates}</p></div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-lg"><TrendingUp className="h-6 w-6 text-green-600" /></div>
            <div><p className="text-gray-600 text-sm">Đơn hàng</p><p className="text-2xl font-bold text-gray-900">{totalStats.totalOrders}</p></div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-lg"><DollarSign className="h-6 w-6 text-purple-600" /></div>
            <div><p className="text-gray-600 text-sm">Doanh thu</p><p className="text-2xl font-bold text-gray-900">{totalStats.totalRevenue > 1000000 ? `${(totalStats.totalRevenue / 1000000).toFixed(1)}M` : totalStats.totalRevenue.toLocaleString()}</p></div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
          <div className="flex items-center gap-4">
            <div className="bg-orange-100 p-3 rounded-lg"><DollarSign className="h-6 w-6 text-orange-600" /></div>
            <div><p className="text-gray-600 text-sm">Chờ thanh toán</p><p className="text-2xl font-bold text-gray-900">{totalStats.pendingCommission > 1000000 ? `${(totalStats.pendingCommission / 1000000).toFixed(1)}M` : totalStats.pendingCommission.toLocaleString()}</p></div>
          </div>
        </div>
      </div>

      <div className="flex border-b bg-white rounded-t-xl">
        <button onClick={() => setActiveTab('users')} className={`flex-1 px-6 py-4 font-semibold transition-all ${activeTab === 'users' ? 'bg-blue-600 text-white rounded-t-xl' : 'text-gray-600 hover:bg-gray-50'}`}>
          <div className="flex items-center justify-center gap-2"><Users className="h-5 w-5" />Danh sách Affiliate</div>
        </button>
        <button onClick={() => setActiveTab('commissions')} className={`flex-1 px-6 py-4 font-semibold transition-all ${activeTab === 'commissions' ? 'bg-blue-600 text-white rounded-t-xl' : 'text-gray-600 hover:bg-gray-50'}`}>
          <div className="flex items-center justify-center gap-2"><DollarSign className="h-5 w-5" />Yêu cầu thanh toán</div>
        </button>
      </div>

      {activeTab === 'users' && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input type="text" placeholder="Tìm kiếm theo tên, email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Affiliate</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Mã giới thiệu</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Clicks</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Đơn hàng</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Tổng HH</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Chờ TT</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Trạng thái</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filtered.map((aff) => (
                  <tr key={aff.id} className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4"><div><p className="font-semibold text-gray-900">{aff.expand?.user_aff?.name || '—'}</p><p className="text-sm text-gray-600">{aff.expand?.user_aff?.email || '—'}</p></div></td>
                    <td className="px-6 py-4"><code className="px-3 py-1 bg-gray-100 rounded text-sm font-mono">{aff.ma_gioi_thieu || '—'}</code></td>
                    <td className="px-6 py-4"><p className="font-semibold text-gray-900">{Number(aff.so_luot_clicks || 0).toLocaleString()}</p></td>
                    <td className="px-6 py-4"><p className="font-semibold text-gray-900">{Number(aff.so_don_hang || 0)}</p></td>
                    <td className="px-6 py-4"><p className="font-bold text-green-600">{Number(aff.so_tien_tong_hoa_hong || 0).toLocaleString()}đ</p></td>
                    <td className="px-6 py-4"><p className="font-bold text-yellow-600">{Number(aff.cho_thanh_toan || 0).toLocaleString()}đ</p></td>
                    <td className="px-6 py-4"><span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(aff.trang_thai || '')}`}>{getStatusLabel(aff.trang_thai || '')}</span></td>
                    <td className="px-6 py-4">
                      <button onClick={() => { setSelectedUser(aff); setShowDetailModal(true); }} className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                        <Eye className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={8} className="px-6 py-12 text-center text-gray-500">Chưa có affiliate nào</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'commissions' && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-orange-50 to-yellow-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Mã yêu cầu</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Affiliate</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Số đơn</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Số tiền</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Ngày yêu cầu</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Trạng thái</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {commissions.map((req) => (
                  <tr key={req.id} className="hover:bg-orange-50 transition-colors">
                    <td className="px-6 py-4"><p className="font-bold text-gray-900">{req.id.slice(0, 8)}</p></td>
                    <td className="px-6 py-4"><p className="font-semibold text-gray-900">{req.expand?.user_yeu_cau?.name || '—'}</p></td>
                    <td className="px-6 py-4"><p className="text-gray-900">{req.so_don || 0} đơn</p></td>
                    <td className="px-6 py-4"><p className="font-bold text-lg text-green-600">{Number(req.so_tien || 0).toLocaleString()}đ</p></td>
                    <td className="px-6 py-4 text-sm text-gray-600">{req.created ? new Date(req.created).toLocaleDateString() : '—'}</td>
                    <td className="px-6 py-4"><span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(req.trang_thai || '')}`}>{getStatusLabel(req.trang_thai || '')}</span></td>
                    <td className="px-6 py-4">
                      {req.trang_thai === 'cho_duyet' && (
                        <div className="flex items-center gap-2">
                          <button onClick={() => handleApproveCommission(req.id)} className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors" title="Duyệt"><CheckCircle className="h-5 w-5" /></button>
                          <button onClick={() => handleRejectCommission(req.id)} className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors" title="Từ chối"><X className="h-5 w-5" /></button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                {commissions.length === 0 && (
                  <tr><td colSpan={7} className="px-6 py-12 text-center text-gray-500">Chưa có yêu cầu thanh toán nào</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal isOpen={showDetailModal} onClose={() => setShowDetailModal(false)} title="Chi tiết Affiliate" size="lg">
        {selectedUser && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedUser.expand?.user_aff?.name || '—'}</h3>
              <p className="text-gray-600">{selectedUser.expand?.user_aff?.email || '—'}</p>
              <div className="mt-3"><span className={`inline-block px-4 py-2 rounded-lg text-sm font-bold ${getStatusColor(selectedUser.trang_thai || '')}`}>{getStatusLabel(selectedUser.trang_thai || '')}</span></div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div><label className="block text-sm font-bold text-gray-600 mb-2">Mã giới thiệu</label><code className="block px-4 py-2 bg-gray-100 rounded text-sm font-mono">{selectedUser.ma_gioi_thieu || '—'}</code></div>
              <div><label className="block text-sm font-bold text-gray-600 mb-2">Ngày tham gia</label><p className="text-lg text-gray-900">{selectedUser.created ? new Date(selectedUser.created).toLocaleDateString() : '—'}</p></div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4"><p className="text-sm text-gray-600 mb-1">Lượt click</p><p className="text-2xl font-bold text-blue-600">{Number(selectedUser.so_luot_clicks || 0).toLocaleString()}</p></div>
              <div className="bg-green-50 rounded-lg p-4"><p className="text-sm text-gray-600 mb-1">Doanh thu</p><p className="text-2xl font-bold text-green-600">{Number(selectedUser.so_doanh_thu || 0).toLocaleString()}đ</p></div>
              <div className="bg-purple-50 rounded-lg p-4"><p className="text-sm text-gray-600 mb-1">Đơn hàng</p><p className="text-2xl font-bold text-purple-600">{Number(selectedUser.so_don_hang || 0)}</p></div>
            </div>
            <div className="border-t pt-6">
              <h4 className="font-bold text-gray-900 mb-4">Hoa hồng</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-lg"><span className="text-gray-600">Tổng hoa hồng:</span><span className="font-bold text-gray-900">{Number(selectedUser.so_tien_tong_hoa_hong || 0).toLocaleString()}đ</span></div>
                <div className="flex justify-between text-lg border-t pt-3"><span className="text-gray-600">Chờ thanh toán:</span><span className="font-bold text-yellow-600">{Number(selectedUser.cho_thanh_toan || 0).toLocaleString()}đ</span></div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
