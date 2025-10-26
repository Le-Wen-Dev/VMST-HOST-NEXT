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
      await loginWithGoogle();
      showInfo('Đang chuyển hướng đến Google...');
    } catch (err) {
      showError('Google login chưa được cấu hình trên server hoặc bị lỗi.');
      console.error(err);
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

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors mb-6"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Đăng nhập với Google
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Hoặc đăng nhập với email</span>
            </div>
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
