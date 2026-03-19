'use client';

import { useEffect, useState } from 'react';
import { Server, Calendar, AlertCircle, User, ShoppingBag, MessageSquare, LogOut, Key } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { listMyOrders } from '@/services/orders';

interface PortalService {
  id: string;
  planName: string;
  planType: string;
  serverName: string;
  ip: string;
  expiryDate: string;
  status: 'active' | 'suspended' | 'expired';
}

export default function PortalPage() {
  const router = useRouter();
  const { logout, isLoggedIn, authReady } = useAuth();

  // Client-side auth guard
  useEffect(() => {
    if (authReady && !isLoggedIn) {
      router.replace('/login?redirect=/portal');
    }
  }, [authReady, isLoggedIn, router]);

  if (!authReady || !isLoggedIn) return null;
  const [services, setServices] = useState<PortalService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    listMyOrders({ page: 1, perPage: 50, expand: 'san_pham' })
      .then((res) => {
        if (!mounted) return;
        const mapped: PortalService[] = res.items
          .filter((o: any) => o.trang_thai_su_dung === 'dang_su_dung' || o.host_url)
          .map((o: any) => {
            const sanPham = o.expand?.san_pham || {};
            const ghiChu = o.ghi_chu_noi_bo || '';
            let domain = '';
            if (ghiChu.includes('|')) {
              const parts = ghiChu.split('|').map((s: string) => s.trim());
              const domainPart = parts.find((s: string) => s.toLowerCase().startsWith('domain'));
              if (domainPart) domain = domainPart.slice(domainPart.indexOf(':') + 1).trim();
            }
            const statusMap: Record<string, 'active' | 'expired' | 'suspended'> = {
              dang_su_dung: 'active',
              tat_tam_thoi: 'suspended',
              het_han_su_dung: 'expired',
              bi_khoa_vinh_vien: 'suspended',
            };
            return {
              id: o.ma_don_hang || o.id,
              planName: sanPham?.ten_san_pham || 'Dịch vụ',
              planType: sanPham?.loai_san_pham || '',
              serverName: (() => { try { return o.host_url ? new URL(o.host_url).hostname : '-'; } catch { return o.host_url || '-'; } })(),
              ip: domain || '-',
              expiryDate: o.ngay_het_han ? new Date(o.ngay_het_han).toLocaleDateString('vi-VN') : '-',
              status: statusMap[o.trang_thai_su_dung || ''] || 'suspended',
            };
          });
        setServices(mapped);
      })
      .catch(() => {})
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#0B2B6F] mb-2">Client Portal</h1>
            <p className="text-gray-600">Quản lý dịch vụ và thanh toán</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center text-gray-700 hover:text-red-600 transition-colors"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Đăng xuất
          </button>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <button
            onClick={() => router.push('/profile')}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all hover:scale-105 text-left"
          >
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Thông tin cá nhân</p>
                <p className="text-sm text-gray-600">Quản lý tài khoản</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => router.push('/my-services')}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all hover:scale-105 text-left"
          >
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Server className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Dịch vụ của tôi</p>
                <p className="text-sm text-gray-600">Quản lý hosting</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => router.push('/my-orders')}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all hover:scale-105 text-left"
          >
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <ShoppingBag className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Đơn hàng</p>
                <p className="text-sm text-gray-600">Lịch sử mua hàng</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => router.push('/my-tickets')}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all hover:scale-105 text-left"
          >
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <MessageSquare className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Ticket hỗ trợ</p>
                <p className="text-sm text-gray-600">Tạo yêu cầu</p>
              </div>
            </div>
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Dịch vụ đang dùng</p>
                <p className="text-3xl font-bold text-[#034CC9]">{services.filter(s => s.status === 'active').length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Server className="h-8 w-8 text-[#034CC9]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Sắp hết hạn</p>
                <p className="text-3xl font-bold text-orange-500">{services.filter(s => {
                  if (s.expiryDate === '-') return false;
                  const parts = s.expiryDate.split('/');
                  if (parts.length !== 3) return false;
                  const exp = new Date(+parts[2], +parts[1] - 1, +parts[0]);
                  const diff = (exp.getTime() - Date.now()) / (1000 * 60 * 60 * 24);
                  return diff > 0 && diff <= 30;
                }).length}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <Calendar className="h-8 w-8 text-orange-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Cần chú ý</p>
                <p className="text-3xl font-bold text-red-500">{services.filter(s => s.status === 'expired' || s.status === 'suspended').length}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <AlertCircle className="h-8 w-8 text-red-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-[#0B2B6F]">Dịch vụ của bạn</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Gói dịch vụ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Server
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    IP
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Ngày hết hạn
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">Đang tải dịch vụ...</td></tr>
                ) : services.length === 0 ? (
                  <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">Chưa có dịch vụ nào</td></tr>
                ) : services.map((service) => (
                  <tr key={service.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="font-semibold text-gray-900">{service.planName}</p>
                        <p className="text-sm text-gray-500">{service.planType}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {service.serverName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-mono">
                      {service.ip}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {service.expiryDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        service.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : service.status === 'suspended'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {service.status === 'active' ? 'Đang hoạt động' : service.status === 'suspended' ? 'Đình chỉ' : 'Hết hạn'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-[#034CC9] hover:text-[#0B2B6F] font-semibold mr-3">
                        Gia hạn
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Key className="h-4 w-4 inline" /> Đổi MK
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-[#0B2B6F] mb-2">Cần hỗ trợ?</h3>
          <p className="text-gray-700 mb-4">
            Liên hệ đội ngũ hỗ trợ 24/7 của chúng tôi để được giúp đỡ
          </p>
          <button
            onClick={() => router.push('/support')}
            className="bg-[#034CC9] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#0B2B6F] transition-colors"
          >
            Mở ticket hỗ trợ
          </button>
        </div>
      </div>
    </div>
  );
}
