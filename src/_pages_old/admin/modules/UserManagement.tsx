import { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, Eye, Shield, ShieldOff, UserCheck, X, Save, Loader2, User } from 'lucide-react';
import Modal, { ConfirmModal } from '../../../components/Modal';
import { listUsers, createUser, updateUser, deleteUser, getUserById, type UserRecord, type CreateUserData, type UpdateUserData } from '../../../services/users';
import { useToast } from '../../../contexts/ToastContext';

export default function UserManagement() {
  const { showSuccess, showError } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);
  const [saving, setSaving] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [vai_tro, setVai_tro] = useState('customer');
  const [trang_thai, setTrang_thai] = useState('active');
  const [emailVisibility, setEmailVisibility] = useState(true);
  const [verified, setVerified] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');

  useEffect(() => {
    loadUsers();
  }, [page, perPage, searchTerm, roleFilter, statusFilter]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const params = {
        page,
        perPage,
        search: searchTerm || undefined,
        vai_tro: roleFilter !== 'all' ? roleFilter : undefined,
        trang_thai: statusFilter !== 'all' ? statusFilter : undefined,
      };
      console.log('UserManagement loadUsers params:', params);
      const res = await listUsers(params);
      console.log('UserManagement loadUsers result:', {
        itemsCount: res.items.length,
        totalItems: res.totalItems,
        totalPages: res.totalPages,
        page: res.page,
        perPage: res.perPage
      });
      setUsers(res.items);
      setPage(res.page);
      setPerPage(res.perPage);
      setTotalPages(res.totalPages);
      setTotalItems(res.totalItems);
    } catch (error: any) {
      console.error('Load users failed:', error);
      showError('Không thể tải danh sách người dùng: ' + (error?.message || 'Lỗi không xác định'));
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setPasswordConfirm('');
    setName('');
    setBio('');
    setVai_tro('customer');
    setTrang_thai('active');
    setEmailVisibility(true);
    setVerified(false);
    setAvatarFile(null);
    setAvatarPreview('');
  };

  const handleCreate = () => {
    setSelectedUser(null);
    resetForm();
    setShowFormModal(true);
  };

  const handleEdit = async (user: UserRecord) => {
    try {
      setLoading(true);
      const fullUser = await getUserById(user.id);
      setSelectedUser(fullUser);
      setEmail(fullUser.email || '');
      setName(fullUser.name || '');
      setBio(fullUser.bio || '');
      setVai_tro(fullUser.vai_tro || 'customer');
      setTrang_thai(fullUser.trang_thai || 'active');
      setEmailVisibility(fullUser.emailVisibility ?? true);
      setVerified(fullUser.verified ?? false);
      setAvatarPreview(fullUser.avatar || '');
      setPassword('');
      setPasswordConfirm('');
      setShowFormModal(true);
    } catch (error: any) {
      showError('Không thể tải thông tin người dùng: ' + (error?.message || 'Lỗi không xác định'));
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (user: UserRecord) => {
    try {
      setLoading(true);
      const fullUser = await getUserById(user.id);
      setSelectedUser(fullUser);
      setShowViewModal(true);
    } catch (error: any) {
      showError('Không thể tải thông tin người dùng: ' + (error?.message || 'Lỗi không xác định'));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (user: UserRecord) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleSave = async () => {
    if (!email.trim()) {
      showError('Email là bắt buộc');
      return;
    }

    if (!selectedUser && (!password || !passwordConfirm)) {
      showError('Mật khẩu là bắt buộc khi tạo mới');
      return;
    }

    if (password && password !== passwordConfirm) {
      showError('Mật khẩu xác nhận không khớp');
      return;
    }

    if (password && password.length < 8) {
      showError('Mật khẩu phải có ít nhất 8 ký tự');
      return;
    }

    try {
      setSaving(true);
      
      if (selectedUser) {
        // Update
        const updateData: UpdateUserData = {
          email: email.trim(),
          name: name.trim() || undefined,
          bio: bio.trim() || undefined,
          vai_tro: vai_tro,
          trang_thai: trang_thai,
          emailVisibility,
          verified,
          avatar: avatarFile,
        };
        
        if (password && passwordConfirm) {
          updateData.password = password;
          updateData.passwordConfirm = passwordConfirm;
        }
        
        await updateUser(selectedUser.id, updateData);
        showSuccess('Cập nhật người dùng thành công');
      } else {
        // Create
        const createData: CreateUserData = {
          email: email.trim(),
          password: password,
          passwordConfirm: passwordConfirm,
          name: name.trim() || undefined,
          bio: bio.trim() || undefined,
          vai_tro: vai_tro,
          trang_thai: trang_thai,
          emailVisibility,
          verified,
          avatar: avatarFile || undefined,
        };
        
        await createUser(createData);
        showSuccess('Tạo người dùng thành công');
      }
      
      setShowFormModal(false);
      resetForm();
      loadUsers();
    } catch (error: any) {
      console.error('Save user failed:', error);
      showError('Không thể lưu người dùng: ' + (error?.message || 'Lỗi không xác định'));
    } finally {
      setSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedUser) return;
    
    try {
      setSaving(true);
      await deleteUser(selectedUser.id);
      showSuccess('Xóa người dùng thành công');
      setShowDeleteModal(false);
      setSelectedUser(null);
      loadUsers();
    } catch (error: any) {
      console.error('Delete user failed:', error);
      showError('Không thể xóa người dùng: ' + (error?.message || 'Lỗi không xác định'));
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStatus = async (user: UserRecord) => {
    try {
      const newStatus = user.trang_thai === 'active' ? 'inactive' : 'active';
      await updateUser(user.id, { trang_thai: newStatus });
      showSuccess(`Đã ${newStatus === 'active' ? 'kích hoạt' : 'vô hiệu hóa'} người dùng`);
      loadUsers();
    } catch (error: any) {
      showError('Không thể cập nhật trạng thái: ' + (error?.message || 'Lỗi không xác định'));
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getRoleColor = (role: string) => {
    const colors = {
      'admin': 'bg-red-100 text-red-800',
      'staff': 'bg-blue-100 text-blue-800',
      'customer': 'bg-green-100 text-green-800'
    };
    return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'active': 'bg-green-100 text-green-800',
      'inactive': 'bg-gray-100 text-gray-800',
      'suspended': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getRoleLabel = (role: string) => {
    const labels = {
      'admin': 'Admin',
      'staff': 'Nhân viên',
      'customer': 'Khách hàng'
    };
    return labels[role as keyof typeof labels] || role;
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      'active': 'Hoạt động',
      'inactive': 'Không hoạt động',
      'suspended': 'Đã khóa'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const stats = {
    admin: users.filter(u => u.vai_tro === 'admin').length,
    staff: users.filter(u => u.vai_tro === 'staff').length,
    customer: users.filter(u => u.vai_tro === 'customer').length,
    active: users.filter(u => u.trang_thai === 'active').length,
  };

  const renderAvatar = (avatar: string | undefined, name: string, size: 'sm' | 'md' | 'lg' = 'sm') => {
    const sizeClasses = {
      sm: 'w-12 h-12',
      md: 'w-16 h-16',
      lg: 'w-20 h-20'
    };
    const iconSizes = {
      sm: 'h-6 w-6',
      md: 'h-8 w-8',
      lg: 'h-10 w-10'
    };

    if (avatar) {
      return (
        <img
          src={avatar}
          alt={name}
          className={`${sizeClasses[size]} rounded-full object-cover border-2 border-gray-200`}
        />
      );
    }

    return (
      <div className={`${sizeClasses[size]} rounded-full bg-white border-2 border-gray-200 flex items-center justify-center`}>
        <User className={`${iconSizes[size]} text-gray-400`} />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý Người dùng</h1>
          <p className="text-gray-600 mt-1">Quản lý tài khoản và phân quyền hệ thống</p>
        </div>
        <button 
          onClick={handleCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-lg transition-all"
        >
          <Plus className="h-5 w-5" />
          Thêm người dùng
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
          <p className="text-gray-600 text-sm mb-1">Admin</p>
          <p className="text-3xl font-bold text-gray-900">{stats.admin}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm mb-1">Staff</p>
          <p className="text-3xl font-bold text-gray-900">{stats.staff}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <p className="text-gray-600 text-sm mb-1">Customers</p>
          <p className="text-3xl font-bold text-gray-900">{stats.customer}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
          <p className="text-gray-600 text-sm mb-1">Active</p>
          <p className="text-3xl font-bold text-gray-900">{stats.active}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Tìm kiếm tên, email..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setPage(1);
            }}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tất cả vai trò</option>
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
            <option value="customer">Customer</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>

        {loading && users.length === 0 ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Người dùng</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Liên hệ</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Vai trò</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Trạng thái</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Thống kê</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Đăng nhập cuối</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {renderAvatar(user.avatar, user.name || user.email, 'sm')}
                          <div>
                            <p className="font-semibold text-gray-900">{user.name || 'Chưa có tên'}</p>
                            <p className="text-xs text-gray-500">ID: {user.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <p className="text-sm text-gray-900">{user.email}</p>
                          {user.verified && (
                            <span className="text-xs text-green-600">✓ Đã xác thực</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1 ${getRoleColor(user.vai_tro || 'customer')}`}>
                          {user.vai_tro === 'admin' && <Shield className="h-3 w-3" />}
                          {user.vai_tro === 'staff' && <UserCheck className="h-3 w-3" />}
                          {getRoleLabel(user.vai_tro || 'customer')}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(user.trang_thai || 'active')}`}>
                          {getStatusLabel(user.trang_thai || 'active')}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {user.vai_tro === 'customer' ? (
                          <div className="text-sm">
                            <p className="text-gray-900 font-semibold">
                              {user.so_luong_don_hang || '0'} đơn hàng
                            </p>
                            <p className="text-gray-600">
                              {parseFloat(user.gia_tri_mua || '0').toLocaleString('vi-VN')}đ
                            </p>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600">
                          {user.dang_nhap_lan_cuoi || 'Chưa đăng nhập'}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleView(user)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                            title="Xem chi tiết"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleEdit(user)}
                            className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                            title="Sửa"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleToggleStatus(user)}
                            className="p-2 text-orange-600 hover:bg-orange-100 rounded-lg transition-colors"
                            title={user.trang_thai === 'active' ? 'Vô hiệu hóa' : 'Kích hoạt'}
                          >
                            {user.trang_thai === 'active' ? (
                              <ShieldOff className="h-4 w-4" />
                            ) : (
                              <Shield className="h-4 w-4" />
                            )}
                          </button>
                          <button 
                            onClick={() => handleDelete(user)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                            title="Xóa"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-6 pt-6 border-t">
                <div className="text-sm text-gray-600">
                  Hiển thị {((page - 1) * perPage) + 1} - {Math.min(page * perPage, totalItems)} trong tổng số {totalItems} người dùng
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Trước
                  </button>
                  <span className="px-4 py-2 text-gray-700">
                    Trang {page} / {totalPages}
                  </span>
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Sau
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Form Modal */}
      <Modal
        isOpen={showFormModal}
        onClose={() => {
          setShowFormModal(false);
          resetForm();
        }}
        title={selectedUser ? 'Sửa người dùng' : 'Thêm người dùng mới'}
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Tên
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {!selectedUser && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Mật khẩu <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Xác nhận mật khẩu <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          )}

          {selectedUser && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Mật khẩu mới (để trống nếu không đổi)
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Xác nhận mật khẩu mới
                </label>
                <input
                  type="password"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Vai trò
              </label>
              <select
                value={vai_tro}
                onChange={(e) => setVai_tro(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="customer">Khách hàng</option>
                <option value="staff">Nhân viên</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Trạng thái
              </label>
              <select
                value={trang_thai}
                onChange={(e) => setTrang_thai(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">Hoạt động</option>
                <option value="inactive">Không hoạt động</option>
                <option value="suspended">Đã khóa</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Mô tả / Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Avatar
            </label>
            <div className="flex items-center gap-4">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Preview" className="w-20 h-20 rounded-full object-cover border-2 border-gray-200" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center">
                  <User className="h-10 w-10 text-gray-400" />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={emailVisibility}
                onChange={(e) => setEmailVisibility(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Hiển thị email</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={verified}
                onChange={(e) => setVerified(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Đã xác thực email</span>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              onClick={() => {
                setShowFormModal(false);
                resetForm();
              }}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Đang lưu...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Lưu
                </>
              )}
            </button>
          </div>
        </div>
      </Modal>

      {/* View Modal */}
      <Modal
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setSelectedUser(null);
        }}
        title="Chi tiết người dùng"
        size="md"
      >
        {selectedUser && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              {renderAvatar(selectedUser.avatar, selectedUser.name || selectedUser.email, 'lg')}
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedUser.name || 'Chưa có tên'}</h3>
                <p className="text-gray-600">{selectedUser.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Vai trò</p>
                <p className="font-semibold">{getRoleLabel(selectedUser.vai_tro || 'customer')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Trạng thái</p>
                <p className="font-semibold">{getStatusLabel(selectedUser.trang_thai || 'active')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email Visibility</p>
                <p className="font-semibold">{selectedUser.emailVisibility ? 'Có' : 'Không'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Đã xác thực</p>
                <p className="font-semibold">{selectedUser.verified ? 'Có' : 'Không'}</p>
              </div>
              {selectedUser.bio && (
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Bio</p>
                  <p className="font-semibold">{selectedUser.bio}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-600">Số đơn hàng</p>
                <p className="font-semibold">{selectedUser.so_luong_don_hang || '0'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Giá trị mua</p>
                <p className="font-semibold">{parseFloat(selectedUser.gia_tri_mua || '0').toLocaleString('vi-VN')}đ</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Đăng nhập cuối</p>
                <p className="font-semibold">{selectedUser.dang_nhap_lan_cuoi || 'Chưa đăng nhập'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Ngày tạo</p>
                <p className="font-semibold">{selectedUser.created ? new Date(selectedUser.created).toLocaleString('vi-VN') : '-'}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirm Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedUser(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Xác nhận xóa"
        message={`Bạn có chắc chắn muốn xóa người dùng "${selectedUser?.name || selectedUser?.email}"? Hành động này không thể hoàn tác.`}
        confirmText={saving ? 'Đang xóa...' : 'Xóa'}
        cancelText="Hủy"
        type="danger"
      />
    </div>
  );
}
