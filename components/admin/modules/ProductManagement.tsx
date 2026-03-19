'use client';

import { useEffect, useState } from 'react';
import { Search, Plus, Edit2, Trash2, Save, Eye } from 'lucide-react';
import Modal, { ConfirmModal } from '@/components/Modal';
import { listProducts, createProduct, updateProduct, deleteProduct } from '@/services/products';

const DEFAULT_FEATURES = [
  '50 Websites',
  'DirectAdmin Control Panel',
  'Free SSL Certificate',
  'Daily Backups',
  'VIP Support 24/7',
  '99.9% Uptime',
  'Free Website Migration',
  'LiteSpeed Cache',
  'CloudLinux',
  'Imunify360',
  'Dedicated IP',
  'Custom PHP Versions',
];

const FIXED_CATEGORIES = ['Wordpress max speed', 'VPS', 'Email'];

export default function ProductManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const [tenSanPham, setTenSanPham] = useState('');
  const [danhMuc, setDanhMuc] = useState<string>(FIXED_CATEGORIES[0]);
  const [giaBan, setGiaBan] = useState('');
  const [donVi, setDonVi] = useState('tháng');
  const [trangThai, setTrangThai] = useState('active');
  const [thuTu, setThuTu] = useState('1');
  const [dungLuong, setDungLuong] = useState('40 GB');
  const [bangThong, setBangThong] = useState('Unlimited');
  const [domains, setDomains] = useState('15');
  const [databases, setDatabases] = useState('30');
  const [email, setEmail] = useState('100');
  const [core, setCore] = useState('2');
  const [ram, setRam] = useState('4 GB');
  const [networkMbps, setNetworkMbps] = useState('100');
  const [features, setFeatures] = useState<string[]>(DEFAULT_FEATURES);

  const mapItem = (r: any) => ({
    id: r.id,
    ten_san_pham: r.ten_san_pham,
    danh_muc: r.danh_muc,
    gia_ban: r.gia_ban,
    don_vi: r.don_vi,
    trang_thai: r.trang_thai,
    thu_tu_hien_thi: r.thu_tu_hien_thi,
    thong_so: r.thong_so,
    tinh_nang: r.tinh_nang,
    createdDate: (r.created || '').slice(0, 19).replace('T', ' '),
    _raw: r,
  });

  useEffect(() => {
    const refresh = async () => {
      try {
        setLoading(true);
        const res = await listProducts({ perPage: 50 });
        setProducts((res.items || []).map(mapItem));
      } catch (err) {
        console.error('Load products failed', err);
      } finally {
        setLoading(false);
      }
    };
    refresh();
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchesSearch = (p.ten_san_pham || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.danh_muc || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.trang_thai === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreate = () => {
    setSelectedProduct(null);
    setTenSanPham(''); setDanhMuc(FIXED_CATEGORIES[0]); setGiaBan(''); setDonVi('tháng');
    setTrangThai('active'); setThuTu('1'); setDungLuong('40 GB'); setBangThong('Unlimited');
    setDomains('15'); setDatabases('30'); setEmail('100'); setCore('2'); setRam('4 GB');
    setNetworkMbps('100'); setFeatures(DEFAULT_FEATURES);
    setShowFormModal(true);
  };

  const handleEdit = (p: any) => {
    setSelectedProduct(p);
    setTenSanPham(p.ten_san_pham || ''); setDanhMuc(p.danh_muc || FIXED_CATEGORIES[0]);
    setGiaBan(p.gia_ban || ''); setDonVi(p.don_vi || 'tháng');
    setTrangThai(p.trang_thai || 'active'); setThuTu(p.thu_tu_hien_thi || '1');
    const ts = p.thong_so || {};
    setDungLuong(ts['Dung lượng'] || ''); setBangThong(ts['Băng thông'] || '');
    setDomains(ts['Domains'] || ''); setDatabases(ts['Databases'] || '');
    setEmail(ts['Email'] || ''); setCore(ts['Core'] || '');
    setRam(ts['RAM'] || ''); setNetworkMbps(ts['Network Mbps'] || '');
    const tn = p.tinh_nang || [];
    setFeatures(Array.isArray(tn) ? tn : DEFAULT_FEATURES);
    setShowFormModal(true);
  };

  const handleDelete = (p: any) => { setSelectedProduct(p); setShowDeleteModal(true); };

  const toggleFeature = (name: string) => {
    setFeatures(prev => prev.includes(name) ? prev.filter(f => f !== name) : [...prev, name]);
  };

  const handleSave = async () => {
    try {
      if (!tenSanPham.trim()) return;
      const thong_so = {
        'Dung lượng': dungLuong.trim(), 'Băng thông': bangThong.trim(),
        'Domains': domains.trim(), 'Databases': databases.trim(),
        'Email': email.trim(), 'Core': core.trim(),
        'RAM': ram.trim(), 'Network Mbps': networkMbps.trim(),
      };
      const payload = {
        ten_san_pham: tenSanPham.trim(), danh_muc: danhMuc.trim(),
        gia_ban: giaBan.trim(), don_vi: donVi.trim(),
        trang_thai: trangThai, thu_tu_hien_thi: thuTu.trim(),
        thong_so, tinh_nang: features,
      };
      if (!selectedProduct) { await createProduct(payload); } else { await updateProduct(selectedProduct.id, payload); }
      setShowFormModal(false); setSelectedProduct(null);
      const res = await listProducts({ perPage: 50 });
      setProducts((res.items || []).map(mapItem));
    } catch (err) { console.error('Save product failed', err); }
  };

  const handleConfirmDelete = async () => {
    try {
      if (selectedProduct?.id) {
        await deleteProduct(selectedProduct.id);
        setSelectedProduct(null); setShowDeleteModal(false);
        const res = await listProducts({ perPage: 50 });
        setProducts((res.items || []).map(mapItem));
      }
    } catch (err) { console.error('Delete product failed', err); }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      draft: 'bg-yellow-100 text-yellow-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý Sản phẩm (Gói Hosting)</h1>
          <p className="text-gray-600 mt-1">CRUD sản phẩm và thông số/tính năng lưu JSON</p>
        </div>
        <button onClick={handleCreate} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-lg transition-all">
          <Plus className="h-5 w-5" />
          Thêm Sản phẩm
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Tìm theo tên hoặc danh mục..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Tên SP</th>
                <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Giá/Đơn vị</th>
                <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Thứ tự</th>
                <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Trạng thái</th>
                <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase w-1/3">Thông số</th>
                <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Tính năng</th>
                <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div>
                      <p className="font-semibold text-gray-900">{p.ten_san_pham}</p>
                      {p.danh_muc && <p className="text-xs text-gray-500">Danh mục: {p.danh_muc}</p>}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-semibold text-gray-900">{p.gia_ban || '-'} <span className="text-sm text-gray-600">/{p.don_vi || '-'}</span></p>
                  </td>
                  <td className="px-4 py-4 font-mono text-sm">{p.thu_tu_hien_thi || '-'}</td>
                  <td className="px-4 py-4"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(p.trang_thai)}`}>{p.trang_thai}</span></td>
                  <td className="px-4 py-4 text-sm text-gray-800 w-1/3">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                      <span>DL: {p.thong_so?.['Dung lượng'] || '-'}</span>
                      <span>BW: {p.thong_so?.['Băng thông'] || '-'}</span>
                      <span>Domains: {p.thong_so?.['Domains'] || '-'}</span>
                      <span>DBs: {p.thong_so?.['Databases'] || '-'}</span>
                      <span>Email: {p.thong_so?.['Email'] || '-'}</span>
                      <span>Core: {p.thong_so?.['Core'] || '-'}</span>
                      <span>RAM: {p.thong_so?.['RAM'] || '-'}</span>
                      <span>Network: {p.thong_so?.['Network Mbps'] || '-'}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-xs text-gray-700">
                    <div className="line-clamp-3 max-w-xs">
                      {(Array.isArray(p.tinh_nang) ? p.tinh_nang : []).join(', ')}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => { setSelectedProduct(p); setShowViewModal(true); }} className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleEdit(p)} className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(p)} className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && !loading && (
                <tr><td colSpan={7} className="px-4 py-6 text-center text-gray-500">Không có sản phẩm</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={showFormModal} onClose={() => setShowFormModal(false)} title={selectedProduct ? 'Sửa sản phẩm' : 'Thêm sản phẩm'} size="lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm</label>
            <input value={tenSanPham} onChange={e => setTenSanPham(e.target.value)} className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
            <select value={danhMuc} onChange={e => setDanhMuc(e.target.value)} className="w-full px-3 py-2 border rounded">
              {FIXED_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Giá bán</label>
            <input value={giaBan} onChange={e => setGiaBan(e.target.value)} className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Đơn vị</label>
            <input value={donVi} onChange={e => setDonVi(e.target.value)} className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
            <select value={trangThai} onChange={e => setTrangThai(e.target.value)} className="w-full px-3 py-2 border rounded">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Thứ tự hiển thị</label>
            <input value={thuTu} onChange={e => setThuTu(e.target.value)} className="w-full px-3 py-2 border rounded" />
          </div>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold text-gray-900 mb-2">Thông số (JSON)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm text-gray-700 mb-1">Dung lượng</label><input value={dungLuong} onChange={e => setDungLuong(e.target.value)} className="w-full px-3 py-2 border rounded" /></div>
            <div><label className="block text-sm text-gray-700 mb-1">Băng thông</label><input value={bangThong} onChange={e => setBangThong(e.target.value)} className="w-full px-3 py-2 border rounded" /></div>
            <div><label className="block text-sm text-gray-700 mb-1">Domains</label><input value={domains} onChange={e => setDomains(e.target.value)} className="w-full px-3 py-2 border rounded" /></div>
            <div><label className="block text-sm text-gray-700 mb-1">Databases</label><input value={databases} onChange={e => setDatabases(e.target.value)} className="w-full px-3 py-2 border rounded" /></div>
            <div><label className="block text-sm text-gray-700 mb-1">Email</label><input value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded" /></div>
            <div><label className="block text-sm text-gray-700 mb-1">Core</label><input value={core} onChange={e => setCore(e.target.value)} className="w-full px-3 py-2 border rounded" /></div>
            <div><label className="block text-sm text-gray-700 mb-1">RAM</label><input value={ram} onChange={e => setRam(e.target.value)} className="w-full px-3 py-2 border rounded" /></div>
            <div><label className="block text-sm text-gray-700 mb-1">Network Mbps</label><input value={networkMbps} onChange={e => setNetworkMbps(e.target.value)} className="w-full px-3 py-2 border rounded" /></div>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold text-gray-900 mb-2">Tính năng (JSON)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {DEFAULT_FEATURES.map((f) => (
              <label key={f} className="flex items-center gap-2 text-sm text-gray-800">
                <input type="checkbox" checked={features.includes(f)} onChange={() => toggleFeature(f)} />
                {f}
              </label>
            ))}
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={() => setShowFormModal(false)} className="px-4 py-2 rounded border">Huỷ</button>
          <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2">
            <Save className="h-4 w-4" /> Lưu
          </button>
        </div>
      </Modal>

      <Modal isOpen={showViewModal} onClose={() => setShowViewModal(false)} title={selectedProduct ? selectedProduct.ten_san_pham : 'Xem sản phẩm'} size="lg">
        {selectedProduct && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><p className="text-sm text-gray-500">Danh mục</p><p className="font-semibold">{selectedProduct.danh_muc || '-'}</p></div>
              <div><p className="text-sm text-gray-500">Giá bán</p><p className="font-semibold">{selectedProduct.gia_ban} / {selectedProduct.don_vi}</p></div>
              <div><p className="text-sm text-gray-500">Trạng thái</p><span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedProduct.trang_thai)}`}>{selectedProduct.trang_thai}</span></div>
              <div><p className="text-sm text-gray-500">Thứ tự hiển thị</p><p className="font-mono">{selectedProduct.thu_tu_hien_thi || '-'}</p></div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Thông số</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <span>DL: {selectedProduct.thong_so?.['Dung lượng'] || '-'}</span>
                <span>BW: {selectedProduct.thong_so?.['Băng thông'] || '-'}</span>
                <span>Domains: {selectedProduct.thong_so?.['Domains'] || '-'}</span>
                <span>DBs: {selectedProduct.thong_so?.['Databases'] || '-'}</span>
                <span>Email: {selectedProduct.thong_so?.['Email'] || '-'}</span>
                <span>Core: {selectedProduct.thong_so?.['Core'] || '-'}</span>
                <span>RAM: {selectedProduct.thong_so?.['RAM'] || '-'}</span>
                <span>Network: {selectedProduct.thong_so?.['Network Mbps'] || '-'}</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Tính năng</h3>
              <div className="text-sm text-gray-800">
                {(Array.isArray(selectedProduct.tinh_nang) ? selectedProduct.tinh_nang : []).map((f: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Xoá sản phẩm"
        message={`Bạn có chắc muốn xoá sản phẩm ${selectedProduct?.ten_san_pham}?`}
      />
    </div>
  );
}
