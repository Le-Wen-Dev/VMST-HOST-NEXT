import { useState } from 'react';
import { Mail, Lock } from 'lucide-react';

import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import Modal from '../components/Modal';

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

export default function LoginPage({ onNavigate }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [reg, setReg] = useState({ name: '', email: '', password: '', confirm: '' });
  const { login, isAdmin, loginWithGoogle, forgotPassword, register } = useAuth();
  const { showSuccess, showError, showInfo } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      showSuccess('Đăng nhập thành công!');
      if (isAdmin) {
        onNavigate('admin');
      } else {
        onNavigate('portal');
      }
    } catch (err) {
      showError('Đăng nhập thất bại. Vui lòng kiểm tra email/mật khẩu.');
      console.error(err);
    }
  };

  const handleGoogleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      showInfo('Đang chuyển hướng đến Google...');
      await loginWithGoogle();
      // loginWithGoogle sẽ redirect, không cần xử lý thêm ở đây
    } catch (err: any) {
      const errorMsg = err?.message || 'Google login chưa được cấu hình trên server hoặc bị lỗi.';
      showError(errorMsg);
      console.error('Google login error:', err);
    }
  };

  const handleForgot = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!email) {
      showError('Vui lòng nhập email ở ô phía trên để nhận link đặt lại mật khẩu.');
      return;
    }
    try {
      await forgotPassword(email);
      showSuccess('Đã gửi email đặt lại mật khẩu. Vui lòng kiểm tra hộp thư.');
    } catch (err) {
      showError('Không thể gửi email đặt lại mật khẩu.');
      console.error(err);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailNormalized = reg.email.trim().toLowerCase();
    const nameNormalized = (reg.name || '').trim();
    if (!emailNormalized || !reg.password || reg.password !== reg.confirm) {
      showError('Vui lòng kiểm tra thông tin đăng ký (mật khẩu phải khớp).');
      return;
    }
    try {
      await register({ email: emailNormalized, password: reg.password, passwordConfirm: reg.confirm, name: nameNormalized });
      await login(emailNormalized, reg.password);
      showSuccess('Đăng ký thành công! Chào mừng bạn đến với VMST.HOST!');
      setShowRegister(false);
      onNavigate('portal');
    } catch (err: any) {
      // Extract PocketBase validation errors if available
      const extractPocketBaseError = (error: any) => {
        const data = error?.data?.data || error?.data;
        if (data && typeof data === 'object') {
          const messages: string[] = [];
          for (const key of Object.keys(data)) {
            const field = (data as any)[key];
            const msg = field?.message || field;
            if (msg) messages.push(`${key}: ${msg}`);
          }
          if (messages.length) return messages.join(', ');
        }
        return error?.message || 'Đăng ký thất bại. Vui lòng thử lại.';
      };
      const message = extractPocketBaseError(err);
      showError(message);
      console.error('Register error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6EEFF] to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#0B2B6F] mb-2">Đăng nhập</h2>
            <p className="text-gray-600">Truy cập Portal quản lý dịch vụ</p>

          </div>


          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034CC9]"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034CC9]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2 rounded text-[#034CC9]" />
                <span className="text-sm text-gray-600">Ghi nhớ đăng nhập</span>
              </label>
              <a href="#" onClick={handleForgot} className="text-sm text-[#034CC9] hover:underline">Quên mật khẩu?</a>
            </div>

            <button
              type="submit"
              className="w-full bg-[#034CC9] text-white py-3 rounded-lg font-semibold hover:bg-[#0B2B6F] transition-colors"
            >
              Đăng nhập
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Chưa có tài khoản?{' '}
            <button onClick={() => setShowRegister(true)} className="text-[#034CC9] font-semibold hover:underline">
              Đăng ký ngay
            </button>
          </p>
        </div>
      </div>

      <Modal isOpen={showRegister} onClose={() => setShowRegister(false)} title="Đăng ký tài khoản">
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Họ tên</label>
            <input
              type="text"
              value={reg.name}
              onChange={(e) => setReg({ ...reg, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#034CC9]"
              placeholder="Ví dụ: Nguyễn Văn A"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={reg.email}
              onChange={(e) => setReg({ ...reg, email: e.target.value })}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#034CC9]"
              placeholder="email@example.com"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Mật khẩu</label>
              <input
                type="password"
                value={reg.password}
                onChange={(e) => setReg({ ...reg, password: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#034CC9]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Xác nhận mật khẩu</label>
              <input
                type="password"
                value={reg.confirm}
                onChange={(e) => setReg({ ...reg, confirm: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#034CC9]"
              />
            </div>
          </div>
          <div className="pt-2">
            <button type="submit" className="w-full bg-[#034CC9] text-white py-3 rounded-lg font-semibold hover:bg-[#0B2B6F] transition-colors">Tạo tài khoản</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
