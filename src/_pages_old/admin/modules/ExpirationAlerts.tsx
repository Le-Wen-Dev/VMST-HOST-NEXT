import { useState } from 'react';
import { AlertTriangle, Calendar, Mail, Server, User, Send } from 'lucide-react';

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

export default function ExpirationAlerts() {
  const [activeTab, setActiveTab] = useState<'client' | 'server'>('client');

  const expiringServices: ExpiringService[] = [
    {
      id: 's1',
      clientName: 'Nguyễn Văn An',
      clientEmail: 'nguyenvanan@example.com',
      productName: 'Hosting WordPress Pro',
      expiryDate: '2025-11-10',
      daysLeft: 30,
      status: 'expiring',
      emailSent: false
    },
    {
      id: 's2',
      clientName: 'Trần Thị Bình',
      clientEmail: 'tranthib@company.com',
      productName: 'VPS Cloud Server',
      expiryDate: '2025-10-25',
      daysLeft: 15,
      status: 'expiring',
      emailSent: true
    },
    {
      id: 's3',
      clientName: 'Lê Văn Cường',
      clientEmail: 'levanc@shop.vn',
      productName: 'Email Enterprise',
      expiryDate: '2025-10-17',
      daysLeft: 7,
      status: 'expiring',
      emailSent: true
    },
    {
      id: 's4',
      clientName: 'Phạm Thị Dung',
      clientEmail: 'phamthid@startup.io',
      productName: 'Hosting Basic',
      expiryDate: '2025-10-13',
      daysLeft: 3,
      status: 'expiring',
      emailSent: false
    },
    {
      id: 's5',
      clientName: 'Hoàng Văn Em',
      clientEmail: 'hoangvane@tech.vn',
      productName: 'VPS Standard',
      expiryDate: '2025-10-10',
      daysLeft: 0,
      status: 'expired',
      emailSent: true
    }
  ];

  const expiringServers: ExpiringServer[] = [
    {
      id: 'srv1',
      provider: 'VNDATA',
      serverName: 'Web Server 01',
      expiryDate: '2025-10-17',
      daysLeft: 7,
      cost: 2500000,
      emailSent: false
    },
    {
      id: 'srv2',
      provider: 'Viettel IDC',
      serverName: 'Database Server 02',
      expiryDate: '2025-10-15',
      daysLeft: 5,
      cost: 3200000,
      emailSent: true
    }
  ];

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
          className={`flex-1 px-6 py-4 font-semibold transition-all ${
            activeTab === 'client'
              ? 'bg-blue-600 text-white rounded-t-xl'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <User className="h-5 w-5" />
            Dịch vụ khách hàng
          </div>
        </button>
        <button
          onClick={() => setActiveTab('server')}
          className={`flex-1 px-6 py-4 font-semibold transition-all ${
            activeTab === 'server'
              ? 'bg-blue-600 text-white rounded-t-xl'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <Server className="h-5 w-5" />
            Server của admin
          </div>
        </button>
      </div>

      {activeTab === 'client' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
              <p className="text-gray-600 text-sm mb-1">30 ngày</p>
              <p className="text-3xl font-bold text-gray-900">
                {expiringServices.filter(s => s.daysLeft === 30).length}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
              <p className="text-gray-600 text-sm mb-1">15 ngày</p>
              <p className="text-3xl font-bold text-gray-900">
                {expiringServices.filter(s => s.daysLeft === 15).length}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
              <p className="text-gray-600 text-sm mb-1">7 ngày</p>
              <p className="text-3xl font-bold text-gray-900">
                {expiringServices.filter(s => s.daysLeft === 7).length}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-400">
              <p className="text-gray-600 text-sm mb-1">3 ngày</p>
              <p className="text-3xl font-bold text-gray-900">
                {expiringServices.filter(s => s.daysLeft === 3).length}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-600">
              <p className="text-gray-600 text-sm mb-1">Đã hết hạn</p>
              <p className="text-3xl font-bold text-gray-900">
                {expiringServices.filter(s => s.daysLeft === 0).length}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Danh sách dịch vụ sắp hết hạn</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => handleSendBulkEmails(7)}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Gửi email 7 ngày
                </button>
                <button
                  onClick={() => handleSendBulkEmails(3)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Gửi email 3 ngày
                </button>
              </div>
            </div>

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
                  {expiringServices.map((service) => (
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
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="h-4 w-4" />
                          {service.expiryDate}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-4 py-2 rounded-lg text-sm font-bold ${getDaysColor(service.daysLeft)}`}>
                          {service.daysLeft === 0 ? 'Đã hết hạn' : `${service.daysLeft} ngày`}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {service.emailSent ? (
                          <span className="inline-flex items-center gap-1 text-green-600 text-sm">
                            <Mail className="h-4 w-4" />
                            Đã gửi
                          </span>
                        ) : (
                          <span className="text-gray-400 text-sm">Chưa gửi</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleSendEmail(service)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-2 transition-all"
                        >
                          <Send className="h-4 w-4" />
                          Gửi email
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
              <button
                onClick={() => handleSendBulkEmails(7)}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold flex items-center gap-2"
              >
                <Mail className="h-5 w-5" />
                Gửi email nhắc admin
              </button>
            </div>

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
                  {expiringServers.map((server) => (
                    <tr key={server.id} className="hover:bg-orange-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-900">{server.provider}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Server className="h-5 w-5 text-blue-600" />
                          <p className="font-semibold text-gray-900">{server.serverName}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="h-4 w-4" />
                          {server.expiryDate}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-4 py-2 rounded-lg text-sm font-bold ${getDaysColor(server.daysLeft)}`}>
                          {server.daysLeft} ngày
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-lg text-red-600">{server.cost.toLocaleString()}đ</p>
                      </td>
                      <td className="px-6 py-4">
                        {server.emailSent ? (
                          <span className="inline-flex items-center gap-1 text-green-600 text-sm">
                            <Mail className="h-4 w-4" />
                            Đã gửi
                          </span>
                        ) : (
                          <span className="text-gray-400 text-sm">Chưa gửi</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleSendEmail(server)}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold flex items-center gap-2 transition-all"
                        >
                          <Send className="h-4 w-4" />
                          Gửi nhắc
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
