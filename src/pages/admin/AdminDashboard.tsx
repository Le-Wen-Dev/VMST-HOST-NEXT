import { useState, useEffect } from 'react';
import { LayoutDashboard, ShoppingBag, Server, Ticket, LogOut, Users, FileText, Tag, Settings as SettingsIcon, MessageSquare, Clock, UserPlus, AlertTriangle, Link2, Package } from 'lucide-react';
import { mockOrders, mockServers, vouchers, mockTickets } from '../../data/mockData';
import LeadManagement from './modules/LeadManagement';
import ServerManagement from './modules/ServerManagement';
import OrderManagement from './modules/OrderManagement';
import BlogManagement from './modules/BlogManagement';
import UserManagement from './modules/UserManagement';
import AffiliateManagement from './modules/AffiliateManagement';
import Settings from './modules/Settings';
import ExpirationAlerts from './modules/ExpirationAlerts';
import { ToastContainer } from '../../components/Toast';
import ProductManagement from './modules/ProductManagement'
import TicketManagement from './modules/TicketManagement'

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export default function AdminDashboard({ onNavigate, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [toasts, setToasts] = useState<Array<{ id: string; type: 'success' | 'error' | 'warning' | 'info'; message: string }>>([]);

  // Sync activeTab with URL path: /admin, /admin/orders, ...
  useEffect(() => {
    const applyPathToTab = () => {
      const path = window.location.pathname;
      if (!path.startsWith('/admin')) return;
      const seg = path.replace(/^\/admin\/?/, '');
      setActiveTab(seg || 'dashboard');
    };
    applyPathToTab();
    const onPop = () => applyPathToTab();
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigateTab = (id: string) => {
    const newPath = id === 'dashboard' ? '/admin' : `/admin/${id}`;
    // pushState without reload
    window.history.pushState({}, '', newPath);
    setActiveTab(id);
  };

  const addToast = (type: 'success' | 'error' | 'warning' | 'info', message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Đơn hàng', icon: ShoppingBag },
    { id: 'leads', label: 'Leads', icon: UserPlus },
    { id: 'products', label: 'Sản phẩm', icon: Package },
    { id: 'servers', label: 'Servers', icon: Server },
    { id: 'expiration', label: 'Cảnh báo hết hạn', icon: AlertTriangle },
    { id: 'affiliate', label: 'Affiliate', icon: Link2 },
    { id: 'tickets', label: 'Tickets', icon: Ticket },
    { id: 'vouchers', label: 'Vouchers', icon: Tag },
    { id: 'blog', label: 'Blog', icon: FileText },
    { id: 'users', label: 'Người dùng', icon: Users },
    { id: 'settings', label: 'Cài đặt', icon: SettingsIcon }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm mb-1">Doanh thu tháng</p>
              <p className="text-3xl font-bold text-gray-900">45.2M</p>
              <p className="text-green-600 text-sm mt-1">+12.5% so với tháng trước</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm mb-1">Đơn hàng mới</p>
              <p className="text-3xl font-bold text-gray-900">{mockOrders.filter(o => o.status === 'pending').length}</p>
              <p className="text-gray-500 text-sm mt-1">Cần xử lý</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <ShoppingBag className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm mb-1">Dịch vụ hoạt động</p>
              <p className="text-3xl font-bold text-gray-900">
                {mockServers.reduce((sum, s) => sum + s.currentAccounts, 0)}
              </p>
              <p className="text-gray-500 text-sm mt-1">Trên {mockServers.length} servers</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Server className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm mb-1">Tickets mở</p>
              <p className="text-3xl font-bold text-gray-900">8</p>
              <p className="text-orange-600 text-sm mt-1">2 ưu tiên cao</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <Ticket className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Trạng thái Servers</h2>
          <div className="space-y-4">
            {mockServers.map((server) => (
              <div key={server.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{server.name}</h3>
                    <p className="text-sm text-gray-600">{server.ip} - {server.location}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    server.status === 'online' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {server.status}
                  </span>
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Accounts: {server.currentAccounts}/{server.maxAccounts}</span>
                      <span className="font-semibold">{Math.round((server.currentAccounts/server.maxAccounts)*100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: `${(server.currentAccounts/server.maxAccounts)*100}%`}}></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">CPU</span>
                        <span className="font-semibold">{server.cpu}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className={`h-2 rounded-full ${server.cpu > 80 ? 'bg-red-600' : server.cpu > 60 ? 'bg-yellow-600' : 'bg-green-600'}`} style={{width: `${server.cpu}%`}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">RAM</span>
                        <span className="font-semibold">{server.ram}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className={`h-2 rounded-full ${server.ram > 80 ? 'bg-red-600' : server.ram > 60 ? 'bg-yellow-600' : 'bg-green-600'}`} style={{width: `${server.ram}%`}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Gói được chọn nhiều nhất</h2>
          <div className="space-y-4">
            {[
              { name: 'WP Pro', count: 45, percentage: 35 },
              { name: 'Biz Pro', count: 32, percentage: 25 },
              { name: 'Mail Pro', count: 28, percentage: 22 },
              { name: 'WP Business', count: 23, percentage: 18 }
            ].map((plan, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-900">{plan.name}</span>
                  <span className="text-sm text-gray-600">{plan.count} khách hàng ({plan.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#034CC9] h-2 rounded-full" style={{width: `${plan.percentage*2.5}%`}}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Quản lý đơn hàng</h1>
        <button className="bg-[#034CC9] text-white px-4 py-2 rounded-lg hover:bg-[#0B2B6F]">
          Xuất báo cáo
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Mã đơn</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Khách hàng</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Gói</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Tổng tiền</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Trạng thái</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {mockOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-mono text-sm">{order.id}</td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-semibold text-gray-900">{order.customerName}</p>
                    <p className="text-sm text-gray-600">{order.customerEmail}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="font-semibold">{order.planName}</p>
                  <p className="text-sm text-gray-600">{order.duration}</p>
                </td>
                <td className="px-6 py-4 font-semibold">{order.total.toLocaleString('vi-VN')}₫</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    order.status === 'provisioned' ? 'bg-green-100 text-green-800' :
                    order.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {order.status === 'pending' && (
                    <button className="text-green-600 hover:text-green-800 font-semibold">
                      Duyệt
                    </button>
                  )}
                  {order.status === 'approved' && (
                    <button className="text-blue-600 hover:text-blue-800 font-semibold">
                      Provision
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderVouchers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Quản lý Vouchers</h1>
        <button className="bg-[#034CC9] text-white px-4 py-2 rounded-lg hover:bg-[#0B2B6F]">
          Tạo voucher mới
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vouchers.map((voucher) => (
          <div key={voucher.id} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#034CC9]">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-2xl font-bold text-[#034CC9] mb-1">{voucher.code}</p>
                <p className="text-sm text-gray-600">{voucher.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                voucher.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {voucher.active ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Giá trị</span>
                <span className="font-semibold">
                  {voucher.type === 'percentage' ? `${voucher.value}%` : `${voucher.value.toLocaleString('vi-VN')}₫`}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Đơn tối thiểu</span>
                <span className="font-semibold">{voucher.minAmount.toLocaleString('vi-VN')}₫</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Đã dùng</span>
                <span className="font-semibold">{voucher.usedCount}/{voucher.usageLimit}</span>
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div className="bg-[#034CC9] h-2 rounded-full" style={{width: `${(voucher.usedCount/voucher.usageLimit)*100}%`}}></div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-blue-50 text-[#034CC9] py-2 rounded-lg text-sm font-semibold hover:bg-blue-100">
                Sửa
              </button>
              <button className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg text-sm font-semibold hover:bg-red-100">
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTickets = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Quản lý Tickets</h1>
        <div className="flex gap-3">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034CC9]">
            <option value="all">Tất cả</option>
            <option value="open">Mở</option>
            <option value="in-progress">Đang xử lý</option>
            <option value="waiting">Chờ phản hồi</option>
            <option value="resolved">Đã giải quyết</option>
            <option value="closed">Đã đóng</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034CC9]">
            <option value="all">Tất cả bộ phận</option>
            <option value="technical">Kỹ thuật</option>
            <option value="sales">Sale</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm mb-1">Mở</p>
          <p className="text-2xl font-bold text-gray-900">
            {mockTickets.filter(t => t.status === 'open').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-yellow-500">
          <p className="text-gray-600 text-sm mb-1">Đang xử lý</p>
          <p className="text-2xl font-bold text-gray-900">
            {mockTickets.filter(t => t.status === 'in-progress').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-red-500">
          <p className="text-gray-600 text-sm mb-1">Gấp</p>
          <p className="text-2xl font-bold text-gray-900">
            {mockTickets.filter(t => t.priority === 'urgent').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
          <p className="text-gray-600 text-sm mb-1">Đã giải quyết</p>
          <p className="text-2xl font-bold text-gray-900">
            {mockTickets.filter(t => t.status === 'resolved').length}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Ticket</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Khách hàng</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Chủ đề</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Bộ phận</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Ưu tiên</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Trạng thái</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Cập nhật</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {mockTickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="font-semibold text-gray-900 font-mono">{ticket.ticketNumber}</p>
                  {ticket.serviceName && (
                    <p className="text-xs text-gray-500">{ticket.serviceName}</p>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-semibold text-gray-900">{ticket.customerName}</p>
                    <p className="text-sm text-gray-600">{ticket.customerEmail}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="font-medium text-gray-900 max-w-xs truncate">{ticket.subject}</p>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    {ticket.messages.length} tin nhắn
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    ticket.department === 'technical'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {ticket.department === 'technical' ? 'Kỹ thuật' : 'Sale'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    ticket.priority === 'urgent'
                      ? 'bg-red-100 text-red-800'
                      : ticket.priority === 'high'
                      ? 'bg-orange-100 text-orange-800'
                      : ticket.priority === 'normal'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {ticket.priority === 'urgent' ? 'Gấp' :
                     ticket.priority === 'high' ? 'Cao' :
                     ticket.priority === 'normal' ? 'Thường' : 'Thấp'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    ticket.status === 'open'
                      ? 'bg-yellow-100 text-yellow-800'
                      : ticket.status === 'in-progress'
                      ? 'bg-blue-100 text-blue-800'
                      : ticket.status === 'waiting'
                      ? 'bg-purple-100 text-purple-800'
                      : ticket.status === 'resolved'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {ticket.status === 'open' ? 'Mở' :
                     ticket.status === 'in-progress' ? 'Đang xử lý' :
                     ticket.status === 'waiting' ? 'Chờ phản hồi' :
                     ticket.status === 'resolved' ? 'Đã giải quyết' : 'Đã đóng'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    {ticket.updatedDate.split(' ')[0]}
                  </div>
                  {ticket.assignedTo && (
                    <p className="text-xs text-gray-500 mt-1">{ticket.assignedTo}</p>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-[#034CC9] hover:text-[#0B2B6F] font-semibold text-sm">
                    Xem chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'orders':
        return <OrderManagement />;
      case 'leads':
        return <LeadManagement />;
      case 'products':
        return <ProductManagement />;
      case 'servers':
        return <ServerManagement />;
      case 'expiration':
        return <ExpirationAlerts />;
      case 'affiliate':
        return <AffiliateManagement />;
      case 'tickets':
        return <TicketManagement />;
      case 'vouchers':
        return renderVouchers();
      case 'blog':
        return <BlogManagement />;
      case 'users':
        return <UserManagement />;
      case 'settings':
        return <Settings />;
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex">
      <div className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col shadow-2xl">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500 p-2 rounded-lg">
              <Server className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">VMST Admin</h1>
              <p className="text-xs text-slate-400">Control Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => navigateTab(item.id)}
                className={`w-full flex items-center px-4 py-3 rounded-xl mb-1 transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50 scale-105'
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-700">
          <button
            onClick={onLogout}
            className="w-full flex items-center px-4 py-3 rounded-xl text-slate-300 hover:bg-red-600/20 hover:text-red-400 transition-all duration-200"
          >
            <LogOut className="h-5 w-5 mr-3" />
            <span className="font-medium">Đăng xuất</span>
          </button>
        </div>
      </div>

      <div className="flex-1 p-8 overflow-y-auto">
        {renderContent()}
      </div>

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
