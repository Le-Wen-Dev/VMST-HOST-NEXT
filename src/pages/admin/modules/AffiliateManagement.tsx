import { useState } from 'react';
import { Search, Users, DollarSign, TrendingUp, CheckCircle, X, Eye } from 'lucide-react';
import Modal from '../../../components/Modal';

interface AffiliateUser {
  id: string;
  name: string;
  email: string;
  affiliateCode: string;
  totalClicks: number;
  totalSignups: number;
  totalOrders: number;
  totalCommission: number;
  pendingCommission: number;
  paidCommission: number;
  status: 'active' | 'suspended';
  joinDate: string;
}

interface CommissionRequest {
  id: string;
  affiliateUser: string;
  amount: number;
  referralCount: number;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

export default function AffiliateManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'users' | 'commissions'>('users');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AffiliateUser | null>(null);

  const affiliateUsers: AffiliateUser[] = [
    {
      id: 'u1',
      name: 'Nguyễn Văn An',
      email: 'nguyenvanan@example.com',
      affiliateCode: 'user123',
      totalClicks: 1247,
      totalSignups: 38,
      totalOrders: 15,
      totalCommission: 8450000,
      pendingCommission: 2100000,
      paidCommission: 6350000,
      status: 'active',
      joinDate: '2025-01-15'
    },
    {
      id: 'u2',
      name: 'Trần Thị Bình',
      email: 'tranthib@company.com',
      affiliateCode: 'user456',
      totalClicks: 892,
      totalSignups: 25,
      totalOrders: 10,
      totalCommission: 5200000,
      pendingCommission: 800000,
      paidCommission: 4400000,
      status: 'active',
      joinDate: '2025-02-20'
    }
  ];

  const commissionRequests: CommissionRequest[] = [
    {
      id: 'CR-001',
      affiliateUser: 'Nguyễn Văn An',
      amount: 2100000,
      referralCount: 3,
      requestDate: '2025-10-01',
      status: 'pending'
    },
    {
      id: 'CR-002',
      affiliateUser: 'Trần Thị Bình',
      amount: 800000,
      referralCount: 2,
      requestDate: '2025-10-05',
      status: 'approved'
    }
  ];

  const totalStats = {
    totalAffiliates: affiliateUsers.length,
    activeAffiliates: affiliateUsers.filter(u => u.status === 'active').length,
    totalCommissionPaid: affiliateUsers.reduce((sum, u) => sum + u.paidCommission, 0),
    pendingCommission: affiliateUsers.reduce((sum, u) => sum + u.pendingCommission, 0),
    totalOrders: affiliateUsers.reduce((sum, u) => sum + u.totalOrders, 0),
    totalRevenue: 85000000
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'active': 'bg-green-100 text-green-800',
      'suspended': 'bg-red-100 text-red-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'approved': 'bg-blue-100 text-blue-800',
      'rejected': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors];
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      'active': 'Hoạt động',
      'suspended': 'Tạm ngưng',
      'pending': 'Chờ duyệt',
      'approved': 'Đã duyệt',
      'rejected': 'Từ chối'
    };
    return labels[status as keyof typeof labels];
  };

  const handleApproveCommission = (requestId: string) => {
    console.log('Approving commission:', requestId);
    alert('Đã duyệt yêu cầu thanh toán!');
  };

  const handleRejectCommission = (requestId: string) => {
    console.log('Rejecting commission:', requestId);
    alert('Đã từ chối yêu cầu thanh toán!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Quản lý Affiliate</h1>
        <p className="text-gray-600 mt-1">Theo dõi và quản lý chương trình giới thiệu</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Affiliate</p>
              <p className="text-2xl font-bold text-gray-900">{totalStats.totalAffiliates}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Đơn hàng</p>
              <p className="text-2xl font-bold text-gray-900">{totalStats.totalOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Doanh thu</p>
              <p className="text-2xl font-bold text-gray-900">{(totalStats.totalRevenue / 1000000).toFixed(1)}M</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
          <div className="flex items-center gap-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Chờ thanh toán</p>
              <p className="text-2xl font-bold text-gray-900">{(totalStats.pendingCommission / 1000000).toFixed(1)}M</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex border-b bg-white rounded-t-xl">
        <button
          onClick={() => setActiveTab('users')}
          className={`flex-1 px-6 py-4 font-semibold transition-all ${
            activeTab === 'users'
              ? 'bg-blue-600 text-white rounded-t-xl'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <Users className="h-5 w-5" />
            Danh sách Affiliate
          </div>
        </button>
        <button
          onClick={() => setActiveTab('commissions')}
          className={`flex-1 px-6 py-4 font-semibold transition-all ${
            activeTab === 'commissions'
              ? 'bg-blue-600 text-white rounded-t-xl'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <DollarSign className="h-5 w-5" />
            Yêu cầu thanh toán
          </div>
        </button>
      </div>

      {activeTab === 'users' && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
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
                {affiliateUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <code className="px-3 py-1 bg-gray-100 rounded text-sm font-mono">{user.affiliateCode}</code>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">{user.totalClicks.toLocaleString()}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">{user.totalOrders}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-green-600">{user.totalCommission.toLocaleString()}đ</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-yellow-600">{user.pendingCommission.toLocaleString()}đ</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(user.status)}`}>
                        {getStatusLabel(user.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowDetailModal(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
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
                {commissionRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-orange-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900">{request.id}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">{request.affiliateUser}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-900">{request.referralCount} đơn</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-lg text-green-600">{request.amount.toLocaleString()}đ</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {request.requestDate}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(request.status)}`}>
                        {getStatusLabel(request.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {request.status === 'pending' && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleApproveCommission(request.id)}
                            className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                            title="Duyệt"
                          >
                            <CheckCircle className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleRejectCommission(request.id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                            title="Từ chối"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        title="Chi tiết Affiliate"
        size="lg"
      >
        {selectedUser && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedUser.name}</h3>
              <p className="text-gray-600">{selectedUser.email}</p>
              <div className="mt-3">
                <span className={`inline-block px-4 py-2 rounded-lg text-sm font-bold ${getStatusColor(selectedUser.status)}`}>
                  {getStatusLabel(selectedUser.status)}
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2">Mã giới thiệu</label>
                <code className="block px-4 py-2 bg-gray-100 rounded text-sm font-mono">{selectedUser.affiliateCode}</code>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2">Ngày tham gia</label>
                <p className="text-lg text-gray-900">{selectedUser.joinDate}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Lượt click</p>
                <p className="text-2xl font-bold text-blue-600">{selectedUser.totalClicks.toLocaleString()}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Đăng ký</p>
                <p className="text-2xl font-bold text-green-600">{selectedUser.totalSignups}</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Đơn hàng</p>
                <p className="text-2xl font-bold text-purple-600">{selectedUser.totalOrders}</p>
              </div>
            </div>

            <div className="border-t pt-6">
              <h4 className="font-bold text-gray-900 mb-4">Hoa hồng</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600">Tổng hoa hồng:</span>
                  <span className="font-bold text-gray-900">{selectedUser.totalCommission.toLocaleString()}đ</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600">Chờ thanh toán:</span>
                  <span className="font-bold text-yellow-600">{selectedUser.pendingCommission.toLocaleString()}đ</span>
                </div>
                <div className="flex justify-between text-lg border-t pt-3">
                  <span className="text-gray-600">Đã thanh toán:</span>
                  <span className="font-bold text-green-600">{selectedUser.paidCommission.toLocaleString()}đ</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
