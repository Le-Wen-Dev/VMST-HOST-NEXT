import { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Eye, EyeOff, Server, ExternalLink, Copy } from 'lucide-react';
import { mockServersManagement } from '../../../data/adminData';

export default function ServerManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});

  const filteredServers = mockServersManagement.filter(server => {
    const matchesSearch = server.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         server.ip.includes(searchTerm) ||
                         server.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || server.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const togglePassword = (serverId: string) => {
    setShowPasswords(prev => ({ ...prev, [serverId]: !prev[serverId] }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'active': 'bg-green-100 text-green-800',
      'expired': 'bg-red-100 text-red-800',
      'maintenance': 'bg-yellow-100 text-yellow-800'
    };
    return colors[status as keyof typeof colors];
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý Server</h1>
          <p className="text-gray-600 mt-1">Quản lý thông tin server và tài khoản truy cập</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-lg transition-all">
          <Plus className="h-5 w-5" />
          Thêm Server
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <p className="text-gray-600 text-sm mb-1">Active</p>
          <p className="text-3xl font-bold text-gray-900">
            {mockServersManagement.filter(s => s.status === 'active').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
          <p className="text-gray-600 text-sm mb-1">Expired</p>
          <p className="text-3xl font-bold text-gray-900">
            {mockServersManagement.filter(s => s.status === 'expired').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm mb-1">Total Accounts</p>
          <p className="text-3xl font-bold text-gray-900">
            {mockServersManagement.reduce((sum, s) => sum + s.currentAccounts, 0)}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
          <p className="text-gray-600 text-sm mb-1">Monthly Cost</p>
          <p className="text-3xl font-bold text-gray-900">
            {(mockServersManagement.reduce((sum, s) => sum + s.monthlyCost, 0) / 1000000).toFixed(1)}M
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Tìm kiếm NCC, IP, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <tr>
                <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">NCC</th>
                <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Thông số</th>
                <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Hết hạn</th>
                <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">IP</th>
                <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">VPS Pass</th>
                <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Panel</th>
                <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Admin</th>
                <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Status</th>
                <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredServers.map((server) => (
                <tr key={server.id} className="hover:bg-blue-50 transition-colors">
                  <td className="px-4 py-4">
                    <div>
                      <p className="font-semibold text-gray-900">{server.provider}</p>
                      <p className="text-xs text-gray-600">{server.location}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm text-gray-900 font-mono">{server.specifications}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      {server.currentAccounts}/{server.maxAccounts} accounts
                    </p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm font-semibold text-gray-900">{server.expiryDate}</p>
                    <p className="text-xs text-gray-600">{(server.monthlyCost / 1000).toFixed(0)}K/mo</p>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm text-gray-900">{server.ip}</span>
                      <button onClick={() => copyToClipboard(server.ip)} className="p-1 hover:bg-gray-200 rounded">
                        <Copy className="h-3 w-3 text-gray-600" />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-gray-900">
                        {showPasswords[server.id] ? server.vpsPassword : '••••••••'}
                      </span>
                      <button onClick={() => togglePassword(server.id)} className="p-1 hover:bg-gray-200 rounded">
                        {showPasswords[server.id] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                      </button>
                      <button onClick={() => copyToClipboard(server.vpsPassword)} className="p-1 hover:bg-gray-200 rounded">
                        <Copy className="h-3 w-3 text-gray-600" />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{server.panelName}</p>
                      <a href={server.panelLink} target="_blank" rel="noopener noreferrer"
                         className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                        Link <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <p className="text-xs text-gray-600">User: {server.adminUsername}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-mono text-xs text-gray-900">
                          {showPasswords[`${server.id}-admin`] ? server.adminPassword : '••••••••'}
                        </span>
                        <button onClick={() => togglePassword(`${server.id}-admin`)} className="p-1 hover:bg-gray-200 rounded">
                          {showPasswords[`${server.id}-admin`] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(server.status)}`}>
                      {server.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
