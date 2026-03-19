import { useEffect, useState } from 'react';
import { Server, ExternalLink, Mail, Copy, CheckCircle, Calendar, Cpu, HardDrive, Database, ChevronLeft } from 'lucide-react';

import { listMyOrders } from '../services/orders';

interface Service {
  id: string;
  productName: string;
  panelUrl: string;
  username: string;
  password: string;
  status: 'active' | 'expired' | 'suspended';
  startDate: string;
  expiryDate: string;
  specs: {
    cpu: string;
    ram: string;
    storage: string;
    bandwidth: string;
  };
}

export default function MyServicesPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    listMyOrders({ page: 1, perPage: 50, expand: 'san_pham' })
      .then((res) => {
        const mapped: Service[] = res.items.map((o: any) => {
          const sanPham = o.expand?.san_pham || {};
          const specsSrc = sanPham?.thong_so || {};
          const findSpec = (candidates: string[]) => {
            try {
              const keys = Object.keys(specsSrc || {});
              for (const c of candidates) {
                const k = keys.find((kk) => kk.toLowerCase() === c.toLowerCase());
                if (k) return String(specsSrc[k]);
              }
            } catch {}
            return '-';
          };
          const statusMap: Record<string, 'active' | 'expired' | 'suspended'> = {
            dang_su_dung: 'active',
            tat_tam_thoi: 'suspended',
            het_han_su_dung: 'expired',
            bi_khoa_vinh_vien: 'suspended',
          };
          return {
            id: o.id,
            productName: sanPham?.ten_san_pham || 'Dịch vụ',
            panelUrl: o.host_url || '',
            username: o.host_username || '',
            password: o.host_password || '',
            status: statusMap[o.trang_thai_su_dung || 'tat_tam_thoi'] || 'suspended',
            startDate: (o.created || '').split('T')[0] || '',
            expiryDate: (o.ngay_het_han || '').split('T')[0] || '',
            specs: {
              cpu: findSpec(['cpu', 'CPU']),
              ram: findSpec(['ram', 'RAM']),
              storage: findSpec(['storage', 'dung_luong', 'Storage']),
              bandwidth: findSpec(['bandwidth', 'băng thông', 'Bandwidth']),
            },
          } as Service;
        });
        if (mounted) setServices(mapped);
      })
      .catch((e) => {
        if (mounted) setError(e?.message || String(e));
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const myServices: Service[] = [
    {
      id: 's1',
      productName: 'Hosting WordPress Pro',
      panelUrl: 'http://163.227.160.8:2082/',
      username: 'vmstasia',
      password: 'D7uOpz4d@',
      status: 'active',
      startDate: '2025-01-15',
      expiryDate: '2026-01-15',
      specs: {
        cpu: '2 Core',
        ram: '4GB',
        storage: '50GB SSD',
        bandwidth: 'Unlimited'
      }
    },
    {
      id: 's2',
      productName: 'VPS Cloud Server',
      panelUrl: 'http://163.227.160.10:8006/',
      username: 'root',
      password: 'SecurePass123!',
      status: 'active',
      startDate: '2025-02-01',
      expiryDate: '2026-02-01',
      specs: {
        cpu: '4 Core',
        ram: '8GB',
        storage: '100GB NVMe',
        bandwidth: '10TB'
      }
    }
  ];

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleAutoLogin = (service: Service) => {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = service.panelUrl;
    form.target = '_blank';

    const usernameField = document.createElement('input');
    usernameField.type = 'hidden';
    usernameField.name = 'user';
    usernameField.value = service.username;

    const passwordField = document.createElement('input');
    passwordField.type = 'hidden';
    passwordField.name = 'pass';
    passwordField.value = service.password;

    form.appendChild(usernameField);
    form.appendChild(passwordField);
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  const handleSendEmail = (service: Service) => {
    console.log('Sending email for service:', service.id);
    alert('Thông tin đăng nhập đã được gửi đến email của bạn!');
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'active': 'bg-green-100 text-green-800',
      'expired': 'bg-red-100 text-red-800',
      'suspended': 'bg-yellow-100 text-yellow-800'
    };
    return colors[status as keyof typeof colors];
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      'active': 'Đang hoạt động',
      'expired': 'Đã hết hạn',
      'suspended': 'Tạm ngưng'
    };
    return labels[status as keyof typeof labels];
  };

  const servicesToShow = services.length ? services : myServices;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Removed duplicate Header - App already renders a global Header */}

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => { if (window.history.length > 1) window.history.back(); else onNavigate('portal'); }}
              className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-[#034CC9]"
            >
              <ChevronLeft className="h-5 w-5" /> Quay lại
            </button>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dịch vụ của tôi</h1>
          <p className="text-gray-600">Quản lý và truy cập các dịch vụ hosting đã đăng ký</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
            Không thể tải dịch vụ: {error}
          </div>
        )}

        {loading && (
          <div className="mb-6 p-4 bg-blue-50 text-blue-700 rounded-lg border border-blue-200">
            Đang tải dịch vụ...
          </div>
        )}

        {!loading && !error && servicesToShow.length === 0 && (
          <div className="mb-6 p-4 bg-gray-50 text-gray-700 rounded-lg border border-gray-200">
            Bạn chưa có dịch vụ nào.
          </div>
        )}

        <div className="grid grid-cols-1 gap-6">
          {servicesToShow.map((service: Service) => (
            <div key={service.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-100 hover:border-blue-300 transition-all">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{service.productName}</h2>
                    <p className="text-blue-100">ID: {service.id}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(service.status)}`}>
                    {getStatusLabel(service.status)}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Server className="h-5 w-5 text-blue-600" />
                      Thông tin truy cập
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">Panel URL</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={service.panelUrl}
                            readOnly
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 font-mono text-sm"
                          />
                          <button
                            onClick={() => handleCopy(service.panelUrl, `url-${service.id}`)}
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                          >
                            {copiedField === `url-${service.id}` ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                              <Copy className="h-5 w-5 text-gray-600" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">Username</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={service.username}
                            readOnly
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 font-mono text-sm"
                          />
                          <button
                            onClick={() => handleCopy(service.username, `user-${service.id}`)}
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                          >
                            {copiedField === `user-${service.id}` ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                              <Copy className="h-5 w-5 text-gray-600" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">Password</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={service.password}
                            readOnly
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 font-mono text-sm"
                          />
                          <button
                            onClick={() => handleCopy(service.password, `pass-${service.id}`)}
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                          >
                            {copiedField === `pass-${service.id}` ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                              <Copy className="h-5 w-5 text-gray-600" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-6">
                      <button
                        onClick={() => handleAutoLogin(service)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"
                      >
                        <ExternalLink className="h-5 w-5" />
                        Vào Panel
                      </button>
                      <button
                        onClick={() => handleSendEmail(service)}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"
                      >
                        <Mail className="h-5 w-5" />
                        Gửi Email
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Cpu className="h-5 w-5 text-blue-600" />
                      Thông số kỹ thuật
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                        <Cpu className="h-6 w-6 text-blue-600" />
                        <div>
                          <p className="text-sm text-gray-600">CPU</p>
                          <p className="font-bold text-gray-900">{service.specs.cpu}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                        <Database className="h-6 w-6 text-green-600" />
                        <div>
                          <p className="text-sm text-gray-600">RAM</p>
                          <p className="font-bold text-gray-900">{service.specs.ram}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                        <HardDrive className="h-6 w-6 text-purple-600" />
                        <div>
                          <p className="text-sm text-gray-600">Storage</p>
                          <p className="font-bold text-gray-900">{service.specs.storage}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                        <Server className="h-6 w-6 text-orange-600" />
                        <div>
                          <p className="text-sm text-gray-600">Bandwidth</p>
                          <p className="font-bold text-gray-900">{service.specs.bandwidth}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-5 w-5" />
                        <span className="text-sm">Ngày kích hoạt: <strong>{service.startDate}</strong></span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-5 w-5" />
                        <span className="text-sm">Ngày hết hạn: <strong className="text-red-600">{service.expiryDate}</strong></span>
                      </div>
                    </div>
                    <button className="px-6 py-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg font-bold transition-all">
                      Gia hạn
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Removed duplicate Footer - App already renders a global Footer */}
    </div>
  );
}
