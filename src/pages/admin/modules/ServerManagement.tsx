import { useEffect, useState } from 'react';
import { Search, Plus, Edit2, Trash2, Eye, EyeOff, Server, ExternalLink, Copy, Save, X } from 'lucide-react';
import Modal, { ConfirmModal } from '../../../components/Modal';
import { listServers, createServer, updateServer, deleteServer } from '../../../services/servers';

export default function ServerManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});

  const [servers, setServers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  // Server-side pagination state
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedServer, setSelectedServer] = useState<any>(null);

  // Form states
  const [nhaCungCap, setNhaCungCap] = useState('');
  const [soAccountActive, setSoAccountActive] = useState('');
  const [hetHan, setHetHan] = useState('');
  const [gia, setGia] = useState('');
  const [ip, setIp] = useState('');
  const [vpsPass, setVpsPass] = useState('');
  const [panel, setPanel] = useState('');
  const [linkPanel, setLinkPanel] = useState('');
  const [adminPanel, setAdminPanel] = useState('');
  const [passPanel, setPassPanel] = useState('');
  const [status, setStatus] = useState('active');
  const [thongSoText, setThongSoText] = useState('');

  useEffect(() => {
    const refresh = async () => {
      try {
        setLoading(true);
        const res = await listServers({ page, perPage, status: statusFilter, search: searchTerm });
        const mapped = (res.items || []).map((r: any) => ({
          id: r.id,
          nha_cung_cap: r.nha_cung_cap,
          so_account_active: r.so_account_active,
          het_han: r.het_han,
          gia: r.gia,
          ip: r.ip,
          vps_pass: r.vps_pass,
          panel: r.panel,
          link_panel: r.link_panel,
          admin_panel: r.admin_panel,
          pass_panel: r.pass_panel,
          status: r.status,
          thong_so: r.thong_so,
          createdDate: (r.created || '').slice(0, 19).replace('T', ' '),
          _raw: r,
        }));
        setServers(mapped);
        setPage(res.page);
        setPerPage(res.perPage);
        setTotalPages(res.totalPages);
        setTotalItems(res.totalItems);
      } catch (err) {
        console.error('Load servers failed', err);
      } finally {
        setLoading(false);
      }
    };
    refresh();
  }, [page, perPage, statusFilter, searchTerm]);

  const filteredServers = servers;

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
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const handleCreate = () => {
    setSelectedServer(null);
    setNhaCungCap('');
    setSoAccountActive('');
    setHetHan('');
    setGia('');
    setIp('');
    setVpsPass('');
    setPanel('');
    setLinkPanel('');
    setAdminPanel('');
    setPassPanel('');
    setStatus('active');
    setThongSoText(JSON.stringify({ CPU: '8 Core', RAM: '16GB', Storage: '400GB NVMe' }, null, 2));
    setShowFormModal(true);
  };

  const handleEdit = (s: any) => {
    setSelectedServer(s);
    setNhaCungCap(s.nha_cung_cap || '');
    setSoAccountActive(s.so_account_active || '');
    setHetHan(s.het_han || '');
    setGia(s.gia || '');
    setIp(s.ip || '');
    setVpsPass(s.vps_pass || '');
    setPanel(s.panel || '');
    setLinkPanel(s.link_panel || '');
    setAdminPanel(s.admin_panel || '');
    setPassPanel(s.pass_panel || '');
    setStatus(s.status || 'active');
    setThongSoText(JSON.stringify(s.thong_so || {}, null, 2));
    setShowFormModal(true);
  };

  const handleDelete = (s: any) => {
    setSelectedServer(s);
    setShowDeleteModal(true);
  };

  const handleSave = async () => {
    try {
      const thong_so = thongSoText ? JSON.parse(thongSoText) : {};
      const payload = {
        nha_cung_cap: nhaCungCap.trim(),
        so_account_active: soAccountActive.trim(),
        het_han: hetHan.trim(),
        gia: gia.trim(),
        ip: ip.trim(),
        vps_pass: vpsPass.trim(),
        panel: panel.trim(),
        link_panel: linkPanel.trim(),
        admin_panel: adminPanel.trim(),
        pass_panel: passPanel.trim(),
        status,
        thong_so,
      };
      if (!selectedServer) {
        await createServer(payload);
      } else {
        await updateServer(selectedServer.id, payload);
      }
      setShowFormModal(false);
      setSelectedServer(null);
      const res = await listServers({ page, perPage, status: statusFilter, search: searchTerm });
      const mapped = (res.items || []).map((r: any) => ({
        id: r.id,
        nha_cung_cap: r.nha_cung_cap,
        so_account_active: r.so_account_active,
        het_han: r.het_han,
        gia: r.gia,
        ip: r.ip,
        vps_pass: r.vps_pass,
        panel: r.panel,
        link_panel: r.link_panel,
        admin_panel: r.admin_panel,
        pass_panel: r.pass_panel,
        status: r.status,
        thong_so: r.thong_so,
        createdDate: (r.created || '').slice(0, 19).replace('T', ' '),
        _raw: r,
      }));
      setServers(mapped);
    } catch (err) {
      console.error('Save server failed', err);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      if (selectedServer?.id) {
        await deleteServer(selectedServer.id);
        setSelectedServer(null);
        setShowDeleteModal(false);
        const res = await listServers({ page, perPage, status: statusFilter, search: searchTerm });
        const mapped = (res.items || []).map((r: any) => ({
          id: r.id,
          nha_cung_cap: r.nha_cung_cap,
          so_account_active: r.so_account_active,
          het_han: r.het_han,
          gia: r.gia,
          ip: r.ip,
          vps_pass: r.vps_pass,
          panel: r.panel,
          link_panel: r.link_panel,
          admin_panel: r.admin_panel,
          pass_panel: r.pass_panel,
          status: r.status,
          thong_so: r.thong_so,
          createdDate: (r.created || '').slice(0, 19).replace('T', ' '),
          _raw: r,
        }));
        setServers(mapped);
      }
    } catch (err) {
      console.error('Delete server failed', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý Server</h1>
          <p className="text-gray-600 mt-1">Quản lý thông tin server và tài khoản truy cập</p>
        </div>
        <button onClick={handleCreate} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-lg transition-all">
          <Plus className="h-5 w-5" />
          Thêm Server
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <p className="text-gray-600 text-sm mb-1">Active</p>
          <p className="text-3xl font-bold text-gray-900">
            {servers.filter(s => s.status === 'active').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
          <p className="text-gray-600 text-sm mb-1">Expired</p>
          <p className="text-3xl font-bold text-gray-900">
            {servers.filter(s => s.status === 'expired').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm mb-1">Total Accounts</p>
          <p className="text-3xl font-bold text-gray-900">
            {servers.reduce((sum, s) => sum + (parseInt(s.so_account_active || '0', 10) || 0), 0)}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
          <p className="text-gray-600 text-sm mb-1">Monthly Cost</p>
          <p className="text-3xl font-bold text-gray-900">
            {servers.reduce((sum, s) => {
              const val = parseInt(String(s.gia || '0').replace(/[^0-9]/g, ''), 10) || 0;
              return sum + val;
            }, 0) / 1000000}M
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Tìm kiếm NCC, IP..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
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
                      <p className="font-semibold text-gray-900">{server.nha_cung_cap}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm text-gray-900 font-mono">
                      {(() => {
                        const ts = server.thong_so;
                        if (!ts) return '';
                        if (typeof ts === 'string') return ts;
                        const cpu = ts.CPU || ts.cpu;
                        const ram = ts.RAM || ts.ram;
                        const storage = ts.Storage || ts.storage;
                        const extras = Object.keys(ts).filter(k => !['CPU','cpu','RAM','ram','Storage','storage'].includes(k)).map(k => `${k}: ${ts[k]}`);
                        return [cpu && `CPU: ${cpu}`, ram && `RAM: ${ram}`, storage && `Storage: ${storage}`, ...extras].filter(Boolean).join(', ');
                      })()}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {(server.so_account_active || '')} accounts
                    </p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm font-semibold text-gray-900">{server.het_han}</p>
                    <p className="text-xs text-gray-600">{server.gia}</p>
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
                        {showPasswords[server.id] ? server.vps_pass : '••••••••'}
                      </span>
                      <button onClick={() => togglePassword(server.id)} className="p-1 hover:bg-gray-200 rounded">
                        {showPasswords[server.id] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                      </button>
                      <button onClick={() => copyToClipboard(server.vps_pass)} className="p-1 hover:bg-gray-200 rounded">
                        <Copy className="h-3 w-3 text-gray-600" />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{server.panel}</p>
                      {server.link_panel && (
                        <a href={server.link_panel} target="_blank" rel="noopener noreferrer"
                           className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                          Link <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <p className="text-xs text-gray-600">User: {server.admin_panel}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-mono text-xs text-gray-900">
                          {showPasswords[`${server.id}-admin`] ? server.pass_panel : '••••••••'}
                        </span>
                        <button onClick={() => togglePassword(`${server.id}-admin`)} className="p-1 hover:bg-gray-200 rounded">
                          {showPasswords[`${server.id}-admin`] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                        </button>
                        <button onClick={() => copyToClipboard(server.pass_panel)} className="p-1 hover:bg-gray-200 rounded">
                          <Copy className="h-3 w-3 text-gray-600" />
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
                      <button onClick={() => handleEdit(server)} className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(server)} className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-4">
          <div className="text-sm text-gray-600">Tổng: {totalItems} • Trang {page}/{Math.max(totalPages, 1)}</div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-700">Per page:</label>
            <select
              value={perPage}
              onChange={(e) => { setPerPage(parseInt(e.target.value, 10)); setPage(1); }}
              className="px-3 py-2 border rounded"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="px-3 py-2 border rounded disabled:opacity-50"
            >Previous</button>
            <button
              onClick={() => setPage(p => Math.min(totalPages || p + 1, p + 1))}
              disabled={page >= totalPages}
              className="px-3 py-2 border rounded disabled:opacity-50"
            >Next</button>
          </div>
        </div>

      </div>

      <Modal isOpen={showFormModal} onClose={() => setShowFormModal(false)} title={selectedServer ? 'Sửa Server' : 'Thêm Server'} size="lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Nhà cung cấp</label>
            <input value={nhaCungCap} onChange={e => setNhaCungCap(e.target.value)} className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Số account active</label>
            <input value={soAccountActive} onChange={e => setSoAccountActive(e.target.value)} className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Hết hạn</label>
            <input value={hetHan} onChange={e => setHetHan(e.target.value)} className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Giá</label>
            <input value={gia} onChange={e => setGia(e.target.value)} className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">IP</label>
            <input value={ip} onChange={e => setIp(e.target.value)} className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">VPS Pass</label>
            <input value={vpsPass} onChange={e => setVpsPass(e.target.value)} className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Panel</label>
            <input value={panel} onChange={e => setPanel(e.target.value)} className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Link Panel</label>
            <input value={linkPanel} onChange={e => setLinkPanel(e.target.value)} className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Admin (username)</label>
            <input value={adminPanel} onChange={e => setAdminPanel(e.target.value)} className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Admin (password)</label>
            <input value={passPanel} onChange={e => setPassPanel(e.target.value)} className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Trạng thái</label>
            <select value={status} onChange={e => setStatus(e.target.value)} className="w-full border rounded-lg px-3 py-2">
              <option value="active">active</option>
              <option value="expired">expired</option>
              <option value="maintenance">maintenance</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-semibold text-gray-600 mb-1">Thông số (JSON)</label>
          <textarea value={thongSoText} onChange={e => setThongSoText(e.target.value)} rows={8} className="w-full border rounded-lg px-3 py-2 font-mono text-sm" />
          <p className="text-xs text-gray-500 mt-1">Ví dụ: {`{"CPU":"8 Core","RAM":"16GB","Storage":"400GB NVMe"}`}</p>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={() => setShowFormModal(false)} className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-100 font-semibold transition-colors">
            Hủy
          </button>
          <button onClick={handleSave} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2">
            <Save className="h-4 w-4" /> Lưu
          </button>
        </div>
      </Modal>

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Xóa Server"
        message="Bạn có chắc chắn muốn xóa server này?"
        confirmText="Xóa"
        cancelText="Hủy"
        type="danger"
      />
    </div>
  );
}
