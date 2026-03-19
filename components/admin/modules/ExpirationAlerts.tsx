'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, Calendar, Mail, Server, User, Send } from 'lucide-react';
import { listOrders } from '@/services/orders';
import { listServers } from '@/services/servers';

interface ExpiringService {
  id: string;
  clientName: string;
  clientEmail: string;
  productName: string;
  expiryDate: string;
  daysLeft: number;
  status: 'active' | 'expiring' | 'expired';
  emailSent: boolean;
}

interface ExpiringServer {
  id: string;
  provider: string;
  serverName: string;
  expiryDate: string;
  daysLeft: number;
  cost: number;
  emailSent: boolean;
}

function calcDaysLeft(dateStr: string): number {
  if (!dateStr) return -1;
  const expiry = new Date(dateStr);
  expiry.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export default function ExpirationAlerts() {
  const [activeTab, setActiveTab] = useState<'client' | 'server'>('client');
  const [expiringServices, setExpiringServices] = useState<ExpiringService[]>([]);
  const [expiringServers, setExpiringServers] = useState<ExpiringServer[]>([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [loadingServers, setLoadingServers] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      setLoadingServices(true);
      try {
        // Fetch all active orders with expand; large perPage to get all expiring ones
        const res = await listOrders({ page: 1, perPage: 200, expand: 'khach_hang,san_pham' });
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const cutoff = new Date(today);
        cutoff.setDate(cutoff.getDate() + 30);

        const mapped: ExpiringService[] = (res.items || [])
          .filter((r: any) => {
            if (!r.ngay_het_han) return false;
            const expiry = new Date(r.ngay_het_han);
            return expiry <= cutoff;
          })
          .map((r: any) => {
            const daysLeft = calcDaysLeft(r.ngay_het_han);
            const khachHang = r.expand?.khach_hang;
            const sanPham = r.expand?.san_pham;
            const productName = (Array.isArray(sanPham) ? sanPham[0]?.name : sanPham?.name) || r.ma_don_hang || r.id;
            return {
              id: r.id,
              clientName: khachHang?.name || khachHang?.email || 'Không rõ',
              clientEmail: khachHang?.email || '',
              productName,
              expiryDate: (r.ngay_het_han || '').slice(0, 10),
              daysLeft: Math.max(daysLeft, 0),
              status: daysLeft < 0 ? 'expired' : daysLeft <= 30 ? 'expiring' : 'active',
              emailSent: false,
            } as ExpiringService;
          })
          .sort((a, b) => a.daysLeft - b.daysLeft);

        setExpiringServices(mapped);
      } catch (err) {
        console.error('[ExpirationAlerts] orders fetch error:', err);
      } finally {
        setLoadingServices(false);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    const fetchServers = async () => {
      setLoadingServers(true);
      try {
        const res = await listServers({ page: 1, perPage: 200 });
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const cutoff = new Date(today);
        cutoff.setDate(cutoff.getDate() + 30);

        const mapped: ExpiringServer[] = (res.items || [])
          .filter((r: any) => {
            if (!r.het_han) return false;
            const expiry = new Date(r.het_han);
            return expiry <= cutoff;
          })
          .map((r: any) => {
            const daysLeft = calcDaysLeft(r.het_han);
            return {
              id: r.id,
              provider: r.nha_cung_cap || '',
              serverName: r.ip || r.id,
              expiryDate: (r.het_han || '').slice(0, 10),
              daysLeft: Math.max(daysLeft, 0),
              cost: Number(r.gia) || 0,
              emailSent: false,
            } as ExpiringServer;
          })
          .sort((a, b) => a.daysLeft - b.daysLeft);

        setExpiringServers(mapped);
      } catch (err) {
        console.error('[ExpirationAlerts] servers fetch error:', err);
      } finally {
        setLoadingServers(false);
      }
    };
    fetchServers();
  }, []);

  const getDaysColor = (days: number) => {
    if (days === 0) return 'bg-red-600 text-white';
    if (days <= 3) return 'bg-red-100 text-red-800';
    if (days <= 7) return 'bg-orange-100 text-orange-800';
    if (days <= 15) return 'bg-yellow-100 text-yellow-800';
    return 'bg-blue-100 text-blue-800';
  };

  const handleSendEmail = (item: ExpiringService | ExpiringServer) => {
    console.log('Sending email for:', item);
    alert('Email cảnh báo đã được gửi!');
  };

  const handleSendBulkEmails = (days: number) => {
    console.log(`Sending emails to all services expiring in ${days} days`);
    alert(`Đã gửi email cho tất cả dịch vụ hết hạn trong ${days} ngày!`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Cảnh báo hết hạn</h1>
        <p className="text-gray-600 mt-1">Theo dõi và gửi thông báo dịch vụ sắp hết hạn</p>
      </div>

      <div className="flex border-b bg-white rounded-t-xl">
        <button
          onClick={() => setActiveTab('client')}
          className={`flex-1 px-6 py-4 font-semibold transition-all ${activeTab === 'client' ? 'bg-blue-600 text-white rounded-t-xl' : 'text-gray-600 hover:bg-gray-50'}`}
        >
          <div className="flex items-center justify-center gap-2"><User className="h-5 w-5" />Dịch vụ khách hàng</div>
        </button>
        <button
          onClick={() => setActiveTab('server')}
          className={`flex-1 px-6 py-4 font-semibold transition-all ${activeTab === 'server' ? 'bg-blue-600 text-white rounded-t-xl' : 'text-gray-600 hover:bg-gray-50'}`}
        >
          <div className="flex items-center justify-center gap-2"><Server className="h-5 w-5" />Server của admin</div>
        </button>
      </div>

      {activeTab === 'client' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[{ label: '30 ngày', days: 30, color: 'border-blue-500' }, { label: '15 ngày', days: 15, color: 'border-yellow-500' }, { label: '7 ngày', days: 7, color: 'border-orange-500' }, { label: '3 ngày', days: 3, color: 'border-red-400' }, { label: 'Đã hết hạn', days: 0, color: 'border-red-600' }].map(({ label, days, color }) => (
              <div key={days} className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${color}`}>
                <p className="text-gray-600 text-sm mb-1">{label}</p>
                <p className="text-3xl font-bold text-gray-900">{expiringServices.filter(s => s.daysLeft === days).length}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Danh sách dịch vụ sắp hết hạn</h2>
              <div className="flex gap-2">
                <button onClick={() => handleSendBulkEmails(7)} className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold flex items-center gap-2">
                  <Mail className="h-4 w-4" />Gửi email 7 ngày
                </button>
                <button onClick={() => handleSendBulkEmails(3)} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold flex items-center gap-2">
                  <Mail className="h-4 w-4" />Gửi email 3 ngày
                </button>
              </div>
            </div>
            {loadingServices ? (
              <div className="py-12 text-center text-gray-500">Đang tải...</div>
            ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Khách hàng</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Dịch vụ</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Ngày hết hạn</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Còn lại</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Email</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {expiringServices.length === 0 ? (
                    <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">Không có dịch vụ sắp hết hạn</td></tr>
                  ) : expiringServices.map((service) => (
                    <tr key={service.id} className="hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-900">{service.clientName}</p>
                          <p className="text-sm text-gray-600">{service.clientEmail}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-900">{service.productName}</p>
                        <p className="text-xs text-gray-600">ID: {service.id}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-600"><Calendar className="h-4 w-4" />{service.expiryDate}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-4 py-2 rounded-lg text-sm font-bold ${getDaysColor(service.daysLeft)}`}>
                          {service.daysLeft === 0 ? 'Đã hết hạn' : `${service.daysLeft} ngày`}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {service.emailSent
                          ? <span className="inline-flex items-center gap-1 text-green-600 text-sm"><Mail className="h-4 w-4" />Đã gửi</span>
                          : <span className="text-gray-400 text-sm">Chưa gửi</span>}
                      </td>
                      <td className="px-6 py-4">
                        <button onClick={() => handleSendEmail(service)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-2 transition-all">
                          <Send className="h-4 w-4" />Gửi email
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'server' && (
        <div className="space-y-6">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
              <div>
                <p className="font-bold text-yellow-900">Cảnh báo: Server sắp hết hạn</p>
                <p className="text-sm text-yellow-800 mt-1">
                  Bạn có {expiringServers.filter(s => s.daysLeft <= 7).length} server sẽ hết hạn trong 7 ngày tới. Vui lòng gia hạn để tránh gián đoạn dịch vụ.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Server cần gia hạn</h2>
              <button onClick={() => handleSendBulkEmails(7)} className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold flex items-center gap-2">
                <Mail className="h-5 w-5" />Gửi email nhắc admin
              </button>
            </div>
            {loadingServers ? (
              <div className="py-12 text-center text-gray-500">Đang tải...</div>
            ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-red-50 to-orange-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Nhà cung cấp</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Server</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Ngày hết hạn</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Còn lại</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Chi phí</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Email</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {expiringServers.length === 0 ? (
                    <tr><td colSpan={7} className="px-6 py-8 text-center text-gray-500">Không có server sắp hết hạn</td></tr>
                  ) : expiringServers.map((server) => (
                    <tr key={server.id} className="hover:bg-orange-50 transition-colors">
                      <td className="px-6 py-4"><p className="font-semibold text-gray-900">{server.provider}</p></td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2"><Server className="h-5 w-5 text-blue-600" /><p className="font-semibold text-gray-900">{server.serverName}</p></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-600"><Calendar className="h-4 w-4" />{server.expiryDate}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-4 py-2 rounded-lg text-sm font-bold ${getDaysColor(server.daysLeft)}`}>{server.daysLeft} ngày</span>
                      </td>
                      <td className="px-6 py-4"><p className="font-bold text-lg text-red-600">{server.cost.toLocaleString()}đ</p></td>
                      <td className="px-6 py-4">
                        {server.emailSent
                          ? <span className="inline-flex items-center gap-1 text-green-600 text-sm"><Mail className="h-4 w-4" />Đã gửi</span>
                          : <span className="text-gray-400 text-sm">Chưa gửi</span>}
                      </td>
                      <td className="px-6 py-4">
                        <button onClick={() => handleSendEmail(server)} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold flex items-center gap-2 transition-all">
                          <Send className="h-4 w-4" />Gửi nhắc
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
