'use client';

import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <footer className="bg-[#0B2B6F] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="animate-fade-in">
            <div className="flex items-center mb-3">
              <Image
                src="/image/logo-vmst-ne.svg"
                alt="VMST Host"
                width={120}
                height={26}
                className="brightness-0 invert"
              />
            </div>
            <p className="text-gray-300 text-xs mb-3">
              Hosting & Email Doanh nghiệp - Nhanh, An toàn, Tự động
            </p>
            <p className="text-gray-300 text-xs mb-2">
              CÔNG TY TNHH GIẢI PHÁP CÔNG NGHỆ VMST VIỆT NAM
            </p>
            <div className="flex space-x-3 mt-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="animate-fade-in animate-delay-100">
            <h3 className="text-base font-semibold mb-3">Sản phẩm</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/wordpress-hosting"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  WordPress Hosting
                </Link>
              </li>
              <li>
                <Link
                  href="/business-hosting"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Business Hosting
                </Link>
              </li>
              <li>
                <Link
                  href="/email-domain"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Email Domain
                </Link>
              </li>
              <li>
                <Link
                  href="/advisor"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Tư vấn chọn gói
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Bảng giá
                </Link>
              </li>
            </ul>
          </div>

          <div className="animate-fade-in animate-delay-200">
            <h3 className="text-base font-semibold mb-3">Hỗ trợ</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/support"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Trung tâm hỗ trợ
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Blog & Hướng dẫn
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Điều khoản dịch vụ
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Chính sách bảo mật
                </Link>
              </li>
            </ul>
          </div>

          <div className="animate-fade-in animate-delay-300">
            <h3 className="text-base font-semibold mb-3">Liên hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:0822636676" className="text-gray-300 hover:text-white transition-colors text-sm">
                    0822 636 676
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <a href="mailto:support@vmst.host" className="text-gray-300 hover:text-white transition-colors text-sm">
                    support@vmst.host
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  Việt Nam
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 pt-6 mb-6">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-base font-semibold mb-3 text-center animate-fade-in">Liên hệ nhanh</h3>
            {submitted ? (
              <div className="bg-green-500 text-white px-4 py-3 rounded-lg text-center">
                Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm nhất.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Họ tên"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="px-4 py-2 rounded-lg bg-white/10 border border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:border-[#034CC9]"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="px-4 py-2 rounded-lg bg-white/10 border border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:border-[#034CC9]"
                  />
                </div>
                <textarea
                  placeholder="Nội dung"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:border-[#034CC9]"
                />
                <button
                  type="submit"
                  className="w-full bg-[#034CC9] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#0B2B6F] transition-all hover:scale-105"
                >
                  Gửi yêu cầu
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="border-t border-gray-600 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 VMST Host - CÔNG TY TNHH GIẢI PHÁP CÔNG NGHỆ VMST VIỆT NAM. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
