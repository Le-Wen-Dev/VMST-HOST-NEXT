import { useState } from 'react';
import { Save, Mail, Globe, Shield, Database, Bell, Palette, Key } from 'lucide-react';

export default function Settings() {
  const [activeSection, setActiveSection] = useState('general');

  const sections = [
    { id: 'general', label: 'Cài đặt chung', icon: Globe },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'security', label: 'Bảo mật', icon: Shield },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'notification', label: 'Thông báo', icon: Bell },
    { id: 'appearance', label: 'Giao diện', icon: Palette },
    { id: 'api', label: 'API Keys', icon: Key }
  ];

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Thông tin công ty</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Tên công ty</label>
            <input
              type="text"
              defaultValue="VMST Hosting"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Website</label>
            <input
              type="text"
              defaultValue="https://vmst.host"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email hỗ trợ</label>
            <input
              type="email"
              defaultValue="support@vmst.host"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Hotline</label>
            <input
              type="text"
              defaultValue="0832575905"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Địa chỉ</h3>
        <textarea
          rows={3}
          defaultValue="Tầng 3, Tòa nhà ABC, Số 123 Đường XYZ, Quận 1, TP.HCM"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Múi giờ & Ngôn ngữ</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Múi giờ</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="Asia/Ho_Chi_Minh">Asia/Ho_Chi_Minh (GMT+7)</option>
              <option value="Asia/Bangkok">Asia/Bangkok (GMT+7)</option>
              <option value="Asia/Singapore">Asia/Singapore (GMT+8)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Ngôn ngữ mặc định</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="vi">Tiếng Việt</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEmailSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Cấu hình SMTP</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">SMTP Host</label>
            <input
              type="text"
              defaultValue="mail.vmst.host"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">SMTP Port</label>
            <input
              type="text"
              defaultValue="465"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
            <input
              type="text"
              defaultValue="noreply@vmst.host"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              defaultValue="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Email Templates</h3>
        <div className="space-y-4">
          <label className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50">
            <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded" />
            <div>
              <p className="font-semibold text-gray-900">Email xác nhận đơn hàng</p>
              <p className="text-sm text-gray-600">Gửi email khi đơn hàng được xác nhận</p>
            </div>
          </label>
          <label className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50">
            <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded" />
            <div>
              <p className="font-semibold text-gray-900">Email thông báo sắp hết hạn</p>
              <p className="text-sm text-gray-600">Gửi trước 7 ngày khi dịch vụ sắp hết hạn</p>
            </div>
          </label>
          <label className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50">
            <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded" />
            <div>
              <p className="font-semibold text-gray-900">Email chào mừng khách hàng mới</p>
              <p className="text-sm text-gray-600">Gửi khi khách hàng đăng ký tài khoản</p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Bảo mật tài khoản</h3>
        <div className="space-y-4">
          <label className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50">
            <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded" />
            <div>
              <p className="font-semibold text-gray-900">Yêu cầu xác thực 2 yếu tố (2FA)</p>
              <p className="text-sm text-gray-600">Bắt buộc staff và admin sử dụng 2FA</p>
            </div>
          </label>
          <label className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50">
            <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded" />
            <div>
              <p className="font-semibold text-gray-900">Tự động logout sau không hoạt động</p>
              <p className="text-sm text-gray-600">Logout sau 30 phút không hoạt động</p>
            </div>
          </label>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">IP Whitelist</h3>
        <textarea
          rows={4}
          placeholder="Nhập IP cho phép truy cập admin (mỗi dòng một IP)"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm"
        />
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Session Timeout</h3>
        <select className="w-full md:w-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
          <option value="15">15 phút</option>
          <option value="30" selected>30 phút</option>
          <option value="60">60 phút</option>
          <option value="120">2 giờ</option>
        </select>
      </div>
    </div>
  );

  const renderAPISettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">API Keys</h3>
        <div className="space-y-4">
          <div className="p-4 border border-gray-300 rounded-lg bg-gray-50">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-900">Production API Key</p>
                <p className="text-sm text-gray-600 font-mono mt-1">pk_live_••••••••••••••••</p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Regenerate
              </button>
            </div>
          </div>
          <div className="p-4 border border-gray-300 rounded-lg bg-gray-50">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-900">Test API Key</p>
                <p className="text-sm text-gray-600 font-mono mt-1">pk_test_••••••••••••••••</p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Regenerate
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Webhook URL</h3>
        <input
          type="text"
          placeholder="https://your-domain.com/webhook"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'general':
        return renderGeneralSettings();
      case 'email':
        return renderEmailSettings();
      case 'security':
        return renderSecuritySettings();
      case 'api':
        return renderAPISettings();
      default:
        return <div className="text-center py-12 text-gray-500">Coming soon...</div>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Cài đặt hệ thống</h1>
        <p className="text-gray-600 mt-1">Quản lý cấu hình và thiết lập hệ thống</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-4">
          <nav className="space-y-1">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeSection === section.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{section.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="lg:col-span-3 bg-white rounded-xl shadow-lg p-8">
          {renderSection()}

          <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
            <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold">
              Hủy
            </button>
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-2">
              <Save className="h-5 w-5" />
              Lưu thay đổi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
