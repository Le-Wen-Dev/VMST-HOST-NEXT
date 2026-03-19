import { useState } from 'react';
import { Link2, Copy, CheckCircle, DollarSign, Users, TrendingUp, Eye } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Modal from '../components/Modal';

interface Referral {
  id: string;
  userName: string;
  userEmail: string;
  orderAmount: number;
  commission: number;
  commissionRate: number;
  status: 'pending' | 'approved' | 'paid';
  date: string;
  productName: string;
}

export default function AffiliatePage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [copied, setCopied] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);

  const userId = 'user123';
  const affiliateLink = `https://vmst.host?ref=${userId}`;

  const affiliateStats = {
    totalClicks: 1247,
    totalSignups: 38,
    totalOrders: 15,
    conversionRate: 1.2,
    totalCommission: 8450000,
    pendingCommission: 2100000,
    paidCommission: 6350000
  };

  const referrals: Referral[] = [
    {
      id: 'REF-001',
      userName: 'Trần Văn Minh',
      userEmail: 'tranvanminh@gmail.com',
      orderAmount: 5200000,
      commission: 520000,
      commissionRate: 10,
      status: 'approved',
      date: '2025-10-05',
      productName: 'VPS Cloud Server'
    },
    {
      id: 'REF-002',
      userName: 'Nguyễn Thị Lan',
      userEmail: 'nguyenlan@company.vn',
      orderAmount: 2170000,
      commission: 217000,
      commissionRate: 10,
      status: 'paid',
      date: '2025-09-28',
      productName: 'Hosting WordPress Pro'
    },
    {
      id: 'REF-003',
      userName: 'Lê Hoàng Nam',
      userEmail: 'lehoangnam@startup.io',
      orderAmount: 888000,
      commission: 88800,
      commissionRate: 10,
      status: 'pending',
      date: '2025-10-08',
      productName: 'Email Enterprise'
    }
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(affiliateLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'approved': 'bg-green-100 text-green-800',
      'paid': 'bg-blue-100 text-blue-800'
    };
    return colors[status as keyof typeof colors];
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      'pending': 'Chờ duyệt',
      'approved': 'Đã duyệt',
      'paid': 'Đã thanh toán'
    };
    return labels[status as keyof typeof labels];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header onNavigate={onNavigate} />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Chương trình Affiliate</h1>
          <p className="text-gray-600">Giới thiệu khách hàng và nhận hoa hồng 10% trên mỗi đơn hàng</p>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 mb-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Link giới thiệu của bạn</h2>
          <div className="flex gap-4">
            <div className="flex-1 bg-white/10 backdrop-blur rounded-lg px-6 py-4 font-mono text-lg">
              {affiliateLink}
            </div>
            <button
              onClick={handleCopyLink}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 transition-all flex items-center gap-2 shadow-lg"
            >
              {copied ? (
                <>
                  <CheckCircle className="h-5 w-5" />
                  Đã copy!
                </>
              ) : (
                <>
                  <Copy className="h-5 w-5" />
                  Copy link
                </>
              )}
            </button>
          </div>
          <p className="mt-4 text-blue-100">
            Chia sẻ link này với bạn bè, đồng nghiệp hoặc trên mạng xã hội. Bạn sẽ nhận 10% hoa hồng từ mọi đơn hàng thành công!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Lượt click</p>
                <p className="text-2xl font-bold text-gray-900">{affiliateStats.totalClicks.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Đăng ký</p>
                <p className="text-2xl font-bold text-gray-900">{affiliateStats.totalSignups}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Đơn hàng</p>
                <p className="text-2xl font-bold text-gray-900">{affiliateStats.totalOrders}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Tỷ lệ chuyển đổi</p>
                <p className="text-2xl font-bold text-gray-900">{affiliateStats.conversionRate}%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-gray-600 text-sm mb-2">Tổng hoa hồng</p>
            <p className="text-3xl font-bold text-blue-600 mb-1">
              {affiliateStats.totalCommission.toLocaleString()}đ
            </p>
            <p className="text-sm text-gray-500">Từ {affiliateStats.totalOrders} đơn hàng</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-gray-600 text-sm mb-2">Chờ thanh toán</p>
            <p className="text-3xl font-bold text-yellow-600 mb-1">
              {affiliateStats.pendingCommission.toLocaleString()}đ
            </p>
            <p className="text-sm text-gray-500">Đang chờ duyệt</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-gray-600 text-sm mb-2">Đã nhận</p>
            <p className="text-3xl font-bold text-green-600 mb-1">
              {affiliateStats.paidCommission.toLocaleString()}đ
            </p>
            <p className="text-sm text-gray-500">Đã chuyển khoản</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-4 border-b bg-gradient-to-r from-gray-50 to-blue-50">
            <h2 className="text-xl font-bold text-gray-900">Lịch sử giới thiệu</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Mã</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Khách hàng</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Sản phẩm</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Giá trị đơn</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Hoa hồng</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Trạng thái</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Ngày</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {referrals.map((ref) => (
                  <tr key={ref.id} className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900">{ref.id}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">{ref.userName}</p>
                        <p className="text-sm text-gray-600">{ref.userEmail}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-900">{ref.productName}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">{ref.orderAmount.toLocaleString()}đ</p>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-bold text-green-600">{ref.commission.toLocaleString()}đ</p>
                        <p className="text-xs text-gray-500">({ref.commissionRate}%)</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(ref.status)}`}>
                        {getStatusLabel(ref.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {ref.date}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setSelectedReferral(ref);
                          setShowDetailModal(true);
                        }}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all"
                      >
                        Chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
          <h3 className="font-bold text-blue-900 mb-2">Cách hoạt động của chương trình Affiliate</h3>
          <ul className="space-y-2 text-blue-800">
            <li>• Chia sẻ link giới thiệu của bạn với bạn bè, đồng nghiệp hoặc trên mạng xã hội</li>
            <li>• Khi có người click vào link và đăng ký tài khoản, hệ thống sẽ tự động ghi nhận</li>
            <li>• Mỗi khi người được giới thiệu mua hàng, bạn nhận 10% hoa hồng</li>
            <li>• Hoa hồng được duyệt sau 7 ngày kể từ khi đơn hàng hoàn tất</li>
            <li>• Thanh toán hoa hồng vào cuối mỗi tháng (tối thiểu 500,000đ)</li>
          </ul>
        </div>
      </div>

      <Modal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        title="Chi tiết giới thiệu"
        size="lg"
      >
        {selectedReferral && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Mã: {selectedReferral.id}</h3>
              <span className={`inline-block px-4 py-2 rounded-lg text-sm font-bold ${getStatusColor(selectedReferral.status)}`}>
                {getStatusLabel(selectedReferral.status)}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2">Khách hàng</label>
                <p className="text-lg font-semibold text-gray-900">{selectedReferral.userName}</p>
                <p className="text-sm text-gray-600">{selectedReferral.userEmail}</p>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2">Sản phẩm</label>
                <p className="text-lg text-gray-900">{selectedReferral.productName}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2">Giá trị đơn hàng</label>
                <p className="text-2xl font-bold text-blue-600">{selectedReferral.orderAmount.toLocaleString()}đ</p>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2">Hoa hồng ({selectedReferral.commissionRate}%)</label>
                <p className="text-2xl font-bold text-green-600">{selectedReferral.commission.toLocaleString()}đ</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-600 mb-2">Ngày đặt hàng</label>
              <p className="text-lg text-gray-900">{selectedReferral.date}</p>
            </div>

            {selectedReferral.status === 'paid' && (
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <p className="text-green-800 font-semibold">Hoa hồng đã được thanh toán vào tài khoản của bạn</p>
              </div>
            )}

            {selectedReferral.status === 'approved' && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="text-blue-800 font-semibold">Hoa hồng sẽ được thanh toán vào cuối tháng này</p>
              </div>
            )}

            {selectedReferral.status === 'pending' && (
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                <p className="text-yellow-800 font-semibold">Đơn hàng đang được xử lý, hoa hồng sẽ được duyệt sau 7 ngày</p>
              </div>
            )}
          </div>
        )}
      </Modal>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
