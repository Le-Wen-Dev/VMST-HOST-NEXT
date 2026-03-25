'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, Server, Shield, Clock, CreditCard, Zap, ChevronDown, ArrowRight } from 'lucide-react';
import type { GeoLocation } from '@/data/geo-seo';
import SeoContent from '@/components/SeoContent';

interface Props {
  location: GeoLocation;
  article: string;
  faqs: { q: string; a: string }[];
}

export default function GeoHostingPage({ location, article, faqs }: Props) {
  const loc = location;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-2 text-blue-300 text-sm mb-4">
            <Link href="/" className="hover:text-white transition-colors">Trang chủ</Link>
            <span>/</span>
            <Link href="/hosting-viet-nam" className="hover:text-white transition-colors">Hosting Việt Nam</Link>
            <span>/</span>
            <span className="text-white">Hosting {loc.nameShort}</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-8 h-8 text-yellow-400" />
            <h1 className="text-3xl md:text-5xl font-bold">
              Hosting {loc.nameShort} Giá Rẻ Tốc Độ Cao
            </h1>
          </div>
          <p className="text-blue-200 text-lg md:text-xl max-w-3xl mb-8">
            {loc.description}
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            {loc.specialFeatures.map((feat, i) => (
              <span key={i} className="bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm">
                {feat}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/pricing"
              className="bg-yellow-500 hover:bg-yellow-400 text-blue-950 font-bold px-8 py-4 rounded-xl text-lg transition-colors flex items-center gap-2"
            >
              Xem bảng giá <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/advisor"
              className="bg-white/10 hover:bg-white/20 backdrop-blur text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors border border-white/20"
            >
              Tư vấn miễn phí
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-700">{loc.population}</div>
              <div className="text-gray-500 text-sm">Dân số</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-700">{loc.businesses}</div>
              <div className="text-gray-500 text-sm">Doanh nghiệp</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-700">29.000đ</div>
              <div className="text-gray-500 text-sm">Giá từ / tháng</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-700">99.9%</div>
              <div className="text-gray-500 text-sm">Uptime cam kết</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-3">
            Tại sao doanh nghiệp {loc.nameShort} chọn VMST Host?
          </h2>
          <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">
            Hosting tối ưu cho doanh nghiệp tại {loc.name} và khu vực {loc.nearbyAreas.slice(0, 2).join(', ')}
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Server className="w-8 h-8" />, title: 'Server Việt Nam', desc: `Data center tại Việt Nam — tốc độ truy cập nhanh nhất cho người dùng ${loc.nameShort}. TTFB < 200ms.` },
              { icon: <Zap className="w-8 h-8" />, title: 'SSD NVMe + LiteSpeed', desc: 'Công nghệ lưu trữ nhanh nhất hiện tại. Website tải dưới 1 giây, Google PageSpeed 90+.' },
              { icon: <Shield className="w-8 h-8" />, title: 'Bảo mật toàn diện', desc: 'SSL miễn phí, Imunify360, CloudLinux cách ly tài khoản. An toàn tuyệt đối.' },
              { icon: <Clock className="w-8 h-8" />, title: 'Hỗ trợ 24/7 tiếng Việt', desc: 'Đội ngũ kỹ thuật Việt Nam, phản hồi trong 15 phút qua chat, hotline, email.' },
              { icon: <CreditCard className="w-8 h-8" />, title: 'Thanh toán VietQR', desc: 'Chuyển khoản ngân hàng Việt Nam, quét QR. Không cần thẻ quốc tế hay PayPal.' },
              { icon: <MapPin className="w-8 h-8" />, title: `Phục vụ ${loc.nameShort}`, desc: `Hỗ trợ ${loc.businesses} doanh nghiệp tại ${loc.name} và khu vực ${loc.nearbyAreas[0]}.` },
            ].map((feat, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="text-blue-600 mb-4">{feat.icon}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{feat.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hosting plans CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Gói hosting phù hợp cho doanh nghiệp {loc.nameShort}
          </h2>
          <p className="text-gray-500 mb-10 max-w-2xl mx-auto">
            Chọn gói phù hợp với nhu cầu doanh nghiệp của bạn
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'WordPress Hosting', price: '29.000đ', desc: 'Website giới thiệu, blog, portfolio', href: '/wordpress-hosting', color: 'from-blue-500 to-blue-700' },
              { name: 'Business Hosting', price: '199.000đ', desc: 'Website bán hàng, thương mại điện tử', href: '/business-hosting', color: 'from-purple-500 to-purple-700' },
              { name: 'Email Hosting', price: '15.000đ', desc: 'Email theo tên miền riêng', href: '/email-domain', color: 'from-green-500 to-green-700' },
            ].map((plan, i) => (
              <Link
                key={i}
                href={plan.href}
                className="group bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className={`bg-gradient-to-br ${plan.color} text-white rounded-xl p-4 mb-6`}>
                  <h3 className="font-bold text-xl">{plan.name}</h3>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {plan.price}<span className="text-base font-normal text-gray-500">/tháng</span>
                </div>
                <p className="text-gray-500 mb-4">{plan.desc}</p>
                <span className="text-blue-600 font-semibold group-hover:underline flex items-center justify-center gap-1">
                  Xem chi tiết <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby areas internal linking */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Hosting cho các khu vực lân cận {loc.nameShort}
          </h2>
          <div className="flex flex-wrap gap-3">
            {loc.nearbyAreas.map((area, i) => (
              <span key={i} className="bg-white border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-600">
                Hosting {area}
              </span>
            ))}
            <Link
              href="/hosting-viet-nam"
              className="bg-blue-50 border border-blue-200 rounded-full px-4 py-2 text-sm text-blue-700 hover:bg-blue-100 transition-colors"
            >
              Xem tất cả khu vực
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Content (article + FAQ + testimonials + links) */}
      <SeoContent
        article={article}
        articleTitle={`Hosting ${loc.nameShort} — Tất cả những gì bạn cần biết`}
        faqs={faqs}
      />
    </div>
  );
}
