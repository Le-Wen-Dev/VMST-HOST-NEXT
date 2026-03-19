'use client';
import { useState, useEffect } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { listProducts } from '@/services/products';
import { listBlogs, BlogRecord, getBlogImageUrl } from '@/services/blogs';
import { useCart } from '@/contexts/CartContext';
import { formatMoneyVN } from '@/utils/format';
import { HostingPlan } from '@/data/mockData';
import SeoContent from '@/components/SeoContent';
import { seoData } from '@/data/seo-articles';

export default function HomePage() {
  const router = useRouter();
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<'wordpress' | 'vps' | 'email'>('wordpress');
  const [allPlans, setAllPlans] = useState<HostingPlan[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const normalizeCategory = (dm: string): 'wordpress' | 'business' | 'email' => {
      const s = (dm || '').toLowerCase().trim();
      if (s.includes('wordpress') || s.includes('wp')) return 'wordpress';
      if (s.includes('email') || s.includes('mail')) return 'email';
      if (s.includes('vps') || s.includes('server') || s.includes('cloud')) return 'business';
      return 'business';
    };

    const loadData = async () => {
      try {
        setLoading(true);

        const productsRes = await listProducts({ perPage: 50, status: 'active' });
        const mapped: HostingPlan[] = (productsRes.items || []).map((r: any) => {
          const thongSo = r.thong_so || {};
          const gia = parseInt(r.gia_ban || '0');
          const type = normalizeCategory(r.danh_muc || '');
          const features = Array.isArray(r.tinh_nang) ? r.tinh_nang : [];

          if (thongSo['Core']) features.push(`Core: ${thongSo['Core']}`);
          if (thongSo['RAM']) features.push(`RAM: ${thongSo['RAM']}`);
          if (thongSo['DBs']) features.push(`DBs: ${thongSo['DBs']}`);
          if (thongSo['Network']) features.push(`Network: ${thongSo['Network']}`);
          if (thongSo['Network Mbps']) features.push(`Network: ${thongSo['Network Mbps']} Mbps`);
          if (thongSo['Disk']) features.push(`Disk: ${thongSo['Disk']}`);

          const storage = thongSo['Dung lượng'] || thongSo['DL'] || thongSo['Storage'] || '';
          const bandwidth = thongSo['Băng thông'] || thongSo['BW'] || thongSo['Bandwidth'] || '';
          const websites = parseInt(thongSo['Domains'] || thongSo['Websites'] || '0') || 0;
          const emails = thongSo['Email'] ? (parseInt(thongSo['Email']) || undefined) : undefined;

          return {
            id: r.id,
            name: r.ten_san_pham || 'Sản phẩm',
            type,
            storage,
            bandwidth,
            websites,
            emails,
            ssl: true,
            backup: 'Hàng tuần',
            support: '24/7',
            sla: '99.9%',
            price: { monthly: gia, quarterly: gia, yearly: gia },
            unit: r.don_vi || '',
            features,
            recommended: false,
          } as HostingPlan;
        });

        setAllPlans(mapped);

        const blogsRes = await listBlogs({ page: 1, perPage: 3, sort: '-created' });
        setBlogPosts(blogsRes.items || []);
      } catch (err) {
        console.error('Failed to load data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const getCategoryPlans = () => {
    if (activeCategory === 'wordpress') {
      return allPlans.filter(p => p.type === 'wordpress').slice(0, 3);
    } else if (activeCategory === 'vps') {
      return allPlans.filter(p => p.type === 'business').slice(0, 3);
    } else {
      return allPlans.filter(p => p.type === 'email').slice(0, 3);
    }
  };

  const currentPlans = getCategoryPlans();

  const handleAddToCart = (plan: HostingPlan, duration: string) => {
    addToCart(plan, duration);
    router.push('/cart');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#034CC9]"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#034CC9] to-[#0B2B6F] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Dịch vụ Hosting tốc độ cao cho Website WordPress & Doanh nghiệp
              </h1>
              <div className="flex flex-wrap gap-4 mb-8 text-lg">
                <span className="bg-white/10 px-4 py-2 rounded-lg">OpenLiteSpeed</span>
                <span className="bg-white/10 px-4 py-2 rounded-lg">CloudLinux</span>
                <span className="bg-white/10 px-4 py-2 rounded-lg">Backup tuần</span>
                <span className="bg-white/10 px-4 py-2 rounded-lg">Triển khai tự động</span>
                <span className="bg-white/10 px-4 py-2 rounded-lg">Hỗ trợ nhanh chóng</span>
              </div>
              <div className="flex gap-4">
                <Link
                  href="/pricing"
                  className="bg-white text-[#034CC9] px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all hover:scale-105"
                >
                  Mua ngay
                </Link>
                <Link
                  href="/advisor"
                  className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all hover:scale-105"
                >
                  Tư vấn chọn gói
                </Link>
              </div>
            </div>
            <div className="hidden lg:block animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <img
                src="/what-is-web-hosting-1.webp"
                alt="Hosting Infrastructure"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="hosting-plans" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0B2B6F] mb-2">Hosting WordPress tối ưu SEO – Gói nổi bật</h2>
            <p className="text-gray-600">Lựa chọn hoàn hảo cho doanh nghiệp của bạn</p>
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            <button
              onClick={() => setActiveCategory('wordpress')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeCategory === 'wordpress'
                  ? 'bg-[#034CC9] text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              wordpress max speed
            </button>
            <button
              onClick={() => setActiveCategory('vps')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeCategory === 'vps'
                  ? 'bg-[#034CC9] text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              vps NVME Xeon platinum gen 2
            </button>
            <button
              onClick={() => setActiveCategory('email')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeCategory === 'email'
                  ? 'bg-[#034CC9] text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Email doanh nghiệp
            </button>
          </div>

          {/* Product Cards */}
          {currentPlans.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {currentPlans.map((plan, idx) => {
                const isRecommended = idx === 1;
                const price = plan.price.monthly;

                return (
                  <div
                    key={plan.id}
                    className={`bg-white rounded-2xl shadow-lg p-6 border-2 ${
                      isRecommended
                        ? 'border-[#034CC9] shadow-xl relative animate-glow'
                        : 'border-transparent hover:border-[#034CC9]'
                    } transition-all hover:scale-105`}
                  >
                    {isRecommended && (
                      <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md animate-recommended-pulse">
                        ⭐ PHỔ BIẾN NHẤT
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-[#0B2B6F] mb-2">{plan.name}</h3>
                    <p className="text-xs text-gray-500 uppercase mb-4">{activeCategory === 'wordpress' ? 'WORDPRESS-MAXSPEED' : activeCategory === 'vps' ? 'VPS-NVME' : 'EMAIL-DOANHNGHIEP'}</p>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-[#034CC9]">
                        {formatMoneyVN(price)}
                      </span>
                      <span className="text-gray-500 ml-2">Tháng</span>
                    </div>
                    {/* Core, RAM, Disk Grid */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {(() => {
                        const core = plan.features.find(f => f.toLowerCase().includes('core:'))?.split(':')[1]?.trim() || '';
                        const ram = plan.features.find(f => f.toLowerCase().includes('ram:'))?.split(':')[1]?.trim() || '';
                        const disk = plan.features.find(f => f.toLowerCase().includes('disk:'))?.split(':')[1]?.trim() || plan.storage || '';
                        return (
                          <>
                            <div className="border border-gray-200 rounded-lg p-2 bg-blue-50/30">
                              <p className="text-xs text-gray-600 mb-1">Core</p>
                              <p className="text-sm font-semibold text-gray-900">{core || '-'}</p>
                            </div>
                            <div className="border border-gray-200 rounded-lg p-2 bg-blue-50/30">
                              <p className="text-xs text-gray-600 mb-1">RAM</p>
                              <p className="text-sm font-semibold text-gray-900">{ram || '-'}</p>
                            </div>
                            <div className="border border-gray-200 rounded-lg p-2 bg-blue-50/30">
                              <p className="text-xs text-gray-600 mb-1">Disk</p>
                              <p className="text-sm font-semibold text-gray-900">{disk || '-'}</p>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                    <ul className="space-y-2 mb-6">
                      {plan.features.filter(f => !f.includes(':')).slice(0, 4).map((feature, i) => (
                        <li key={i} className="flex items-start text-sm text-gray-700">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => handleAddToCart(plan, 'monthly')}
                      className={`w-full text-white py-2.5 rounded-lg text-sm font-semibold transition-all hover:scale-105 ${
                        isRecommended
                          ? 'bg-gradient-to-r from-[#034CC9] to-[#0B2B6F] hover:from-[#0B2B6F] hover:to-[#034CC9] shadow-lg'
                          : 'bg-[#034CC9] hover:bg-[#0B2B6F]'
                      }`}
                    >
                      {isRecommended ? 'Chọn gói ngay ⭐' : 'Xem gói'}
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">Chưa có sản phẩm nào trong danh mục này.</p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0B2B6F] mb-2">Tại sao chọn Hosting VMST Host?</h2>
            <p className="text-gray-600">Những lợi ích vượt trội khi sử dụng dịch vụ của chúng tôi</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-all">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#034CC9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0B2B6F] mb-2">Tốc độ cực nhanh</h3>
              <p className="text-gray-600">OpenLiteSpeed và SSD NVMe cho hiệu suất vượt trội</p>
            </div>
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-all">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#034CC9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0B2B6F] mb-2">Bảo mật cao</h3>
              <p className="text-gray-600">SSL miễn phí, CloudLinux và Imunify360 bảo vệ website</p>
            </div>
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-all">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#034CC9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0B2B6F] mb-2">Hỗ trợ 24/7</h3>
              <p className="text-gray-600">Đội ngũ kỹ thuật chuyên nghiệp sẵn sàng hỗ trợ mọi lúc</p>
            </div>
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-all">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#034CC9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0B2B6F] mb-2">Backup tự động</h3>
              <p className="text-gray-600">Sao lưu hàng tuần, khôi phục dữ liệu dễ dàng</p>
            </div>
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-all">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#034CC9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0B2B6F] mb-2">Uptime 99.9%</h3>
              <p className="text-gray-600">Đảm bảo website luôn hoạt động ổn định</p>
            </div>
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-all">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#034CC9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0B2B6F] mb-2">Giá cả hợp lý</h3>
              <p className="text-gray-600">Gói dịch vụ chất lượng với mức giá cạnh tranh</p>
            </div>
          </div>
        </div>
      </section>

      {/* Most Chosen Package Section */}
      {currentPlans.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#0B2B6F] mb-2">Hosting giá rẻ cho người mới bắt đầu</h2>
              <p className="text-gray-600">Phù hợp với hầu hết doanh nghiệp SME</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {currentPlans.map((plan, idx) => {
                const isRecommended = idx === 1;
                const price = plan.price.monthly;

                return (
                  <div
                    key={plan.id}
                    className={`bg-white rounded-2xl shadow-lg p-6 border-2 ${
                      isRecommended
                        ? 'border-[#034CC9] shadow-xl relative animate-glow'
                        : 'border-transparent hover:border-[#034CC9]'
                    } transition-all hover:scale-105`}
                  >
                    {isRecommended && (
                      <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md animate-recommended-pulse">
                        ⭐ PHỔ BIẾN NHẤT
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-[#0B2B6F] mb-2">{plan.name}</h3>
                    <p className="text-xs text-gray-500 uppercase mb-4">{activeCategory === 'wordpress' ? 'WORDPRESS-MAXSPEED' : activeCategory === 'vps' ? 'VPS-NVME' : 'EMAIL-DOANHNGHIEP'}</p>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-[#034CC9]">
                        {formatMoneyVN(price)}
                      </span>
                      <span className="text-gray-500 ml-2">Tháng</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {(() => {
                        const core = plan.features.find(f => f.toLowerCase().includes('core:'))?.split(':')[1]?.trim() || '';
                        const ram = plan.features.find(f => f.toLowerCase().includes('ram:'))?.split(':')[1]?.trim() || '';
                        const disk = plan.features.find(f => f.toLowerCase().includes('disk:'))?.split(':')[1]?.trim() || plan.storage || '';
                        return (
                          <>
                            <div className="border border-gray-200 rounded-lg p-2 bg-blue-50/30">
                              <p className="text-xs text-gray-600 mb-1">Core</p>
                              <p className="text-sm font-semibold text-gray-900">{core || '-'}</p>
                            </div>
                            <div className="border border-gray-200 rounded-lg p-2 bg-blue-50/30">
                              <p className="text-xs text-gray-600 mb-1">RAM</p>
                              <p className="text-sm font-semibold text-gray-900">{ram || '-'}</p>
                            </div>
                            <div className="border border-gray-200 rounded-lg p-2 bg-blue-50/30">
                              <p className="text-xs text-gray-600 mb-1">Disk</p>
                              <p className="text-sm font-semibold text-gray-900">{disk || '-'}</p>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                    <ul className="space-y-2 mb-6">
                      {plan.features.filter(f => !f.includes(':')).slice(0, 4).map((feature, i) => (
                        <li key={i} className="flex items-start text-sm text-gray-700">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => handleAddToCart(plan, 'monthly')}
                      className={`w-full text-white py-2.5 rounded-lg text-sm font-semibold transition-all hover:scale-105 ${
                        isRecommended
                          ? 'bg-gradient-to-r from-[#034CC9] to-[#0B2B6F] hover:from-[#0B2B6F] hover:to-[#034CC9] shadow-lg'
                          : 'bg-[#034CC9] hover:bg-[#0B2B6F]'
                      }`}
                    >
                      Chọn gói
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-4xl md:text-5xl font-bold text-[#034CC9] mb-2">10,000+</div>
              <p className="text-gray-600 font-semibold">Khách hàng tin tưởng</p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl md:text-5xl font-bold text-[#034CC9] mb-2">99.9%</div>
              <p className="text-gray-600 font-semibold">Uptime đảm bảo</p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl md:text-5xl font-bold text-[#034CC9] mb-2">24/7</div>
              <p className="text-gray-600 font-semibold">Hỗ trợ kỹ thuật</p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-4xl md:text-5xl font-bold text-[#034CC9] mb-2">100%</div>
              <p className="text-gray-600 font-semibold">Hài lòng khách hàng</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0B2B6F] mb-2">Công nghệ Hosting tiên tiến – SSD NVMe & OpenLiteSpeed</h2>
            <p className="text-gray-600">Hạ tầng hiện đại đảm bảo hiệu suất tối ưu</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all text-center">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-bold text-[#0B2B6F] mb-2">OpenLiteSpeed</h3>
              <p className="text-sm text-gray-600">Web server tốc độ cao nhất</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all text-center">
              <div className="text-3xl mb-3">💾</div>
              <h3 className="font-bold text-[#0B2B6F] mb-2">SSD NVMe</h3>
              <p className="text-sm text-gray-600">Ổ cứng siêu tốc độ</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all text-center">
              <div className="text-3xl mb-3">🔒</div>
              <h3 className="font-bold text-[#0B2B6F] mb-2">CloudLinux</h3>
              <p className="text-sm text-gray-600">Bảo mật và ổn định</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all text-center">
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="font-bold text-[#0B2B6F] mb-2">Imunify360</h3>
              <p className="text-sm text-gray-600">Bảo vệ website toàn diện</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all text-center">
              <div className="text-3xl mb-3">☁️</div>
              <h3 className="font-bold text-[#0B2B6F] mb-2">CDN Global</h3>
              <p className="text-sm text-gray-600">Tăng tốc toàn cầu</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all text-center">
              <div className="text-3xl mb-3">🔐</div>
              <h3 className="font-bold text-[#0B2B6F] mb-2">SSL Miễn phí</h3>
              <p className="text-sm text-gray-600">Bảo mật HTTPS</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all text-center">
              <div className="text-3xl mb-3">📦</div>
              <h3 className="font-bold text-[#0B2B6F] mb-2">DirectAdmin</h3>
              <p className="text-sm text-gray-600">Control Panel dễ sử dụng</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all text-center">
              <div className="text-3xl mb-3">🔄</div>
              <h3 className="font-bold text-[#0B2B6F] mb-2">Auto Backup</h3>
              <p className="text-sm text-gray-600">Sao lưu tự động hàng ngày</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0B2B6F] mb-2">Đánh giá từ khách hàng sử dụng Hosting</h2>
            <p className="text-gray-600">Những phản hồi tích cực từ khách hàng</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-[#034CC9]">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">{'★'.repeat(5)}</div>
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Dịch vụ hosting của VMST rất ổn định, tốc độ nhanh và hỗ trợ kỹ thuật rất nhiệt tình. Website của tôi chạy mượt mà không bị gián đoạn."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#034CC9] rounded-full flex items-center justify-center text-white font-bold mr-3">AN</div>
                <div>
                  <p className="font-semibold text-gray-900">Anh Nam</p>
                  <p className="text-sm text-gray-600">CEO, Công ty ABC</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-[#034CC9]">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">{'★'.repeat(5)}</div>
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Từ khi chuyển sang VMST Host, website bán hàng của tôi tải nhanh hơn rất nhiều. Khách hàng phản hồi tích cực về trải nghiệm."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#034CC9] rounded-full flex items-center justify-center text-white font-bold mr-3">TL</div>
                <div>
                  <p className="font-semibold text-gray-900">Chị Lan</p>
                  <p className="text-sm text-gray-600">Chủ shop online</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-[#034CC9]">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">{'★'.repeat(5)}</div>
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Hỗ trợ kỹ thuật 24/7 rất chuyên nghiệp. Mọi vấn đề đều được giải quyết nhanh chóng. Rất hài lòng với dịch vụ!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#034CC9] rounded-full flex items-center justify-center text-white font-bold mr-3">MH</div>
                <div>
                  <p className="font-semibold text-gray-900">Anh Minh</p>
                  <p className="text-sm text-gray-600">Freelancer</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-[#034CC9]">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">{'★'.repeat(5)}</div>
              </div>
              <p className="text-gray-700 mb-4 italic">
                "VMST Host đã giúp công ty chúng tôi có một hạ tầng hosting ổn định và hiệu suất cao. Đội ngũ hỗ trợ rất chuyên nghiệp và nhiệt tình."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#034CC9] rounded-full flex items-center justify-center text-white font-bold mr-3">AM</div>
                <div>
                  <p className="font-semibold text-gray-900">A Mark</p>
                  <p className="text-sm text-gray-600">CEO Công ty Việt Sing - Khách hàng Singapore</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-[#034CC9]">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">{'★'.repeat(5)}</div>
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Dịch vụ của VMST Host vượt ngoài mong đợi. Website của công ty chạy rất mượt, không có downtime. Rất đáng tin cậy!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#034CC9] rounded-full flex items-center justify-center text-white font-bold mr-3">CJ</div>
                <div>
                  <p className="font-semibold text-gray-900">Chị Joey</p>
                  <p className="text-sm text-gray-600">CEO Công ty Hanabi - Khách hàng Singapore</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-[#034CC9]">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">{'★'.repeat(5)}</div>
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Tốc độ và độ ổn định của hosting VMST rất ấn tượng. Hỗ trợ kỹ thuật luôn sẵn sàng giúp đỡ. Chúng tôi rất hài lòng với dịch vụ!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#034CC9] rounded-full flex items-center justify-center text-white font-bold mr-3">GT</div>
                <div>
                  <p className="font-semibold text-gray-900">Chị Gold Tea</p>
                  <p className="text-sm text-gray-600">CEO Công ty Helmetspa - Khách hàng Singapore</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#034CC9] to-[#0B2B6F] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Mua Hosting uy tín tại Việt Nam – Bắt đầu ngay</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Chọn gói hosting phù hợp và bắt đầu xây dựng website của bạn ngay hôm nay
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/pricing"
              className="bg-white text-[#034CC9] px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all hover:scale-105"
            >
              Xem bảng giá
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all hover:scale-105"
            >
              Liên hệ tư vấn
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0B2B6F] mb-2">Câu hỏi thường gặp về Hosting</h2>
            <p className="text-gray-600">Giải đáp những thắc mắc phổ biến nhất</p>
          </div>
          <div className="space-y-3">
            {[
              {
                q: 'Hosting là gì và tại sao cần hosting cho website?',
                a: 'Hosting là dịch vụ lưu trữ website trên máy chủ, giúp website của bạn hoạt động 24/7 trên internet. Mọi website đều cần hosting để người dùng có thể truy cập. VMST Host cung cấp hosting SSD NVMe tốc độ cao, phù hợp cho mọi loại website.',
              },
              {
                q: 'Hosting giá rẻ có tốt không?',
                a: 'Hosting giá rẻ vẫn có thể đảm bảo chất lượng nếu nhà cung cấp sử dụng hạ tầng tốt. VMST Host sử dụng SSD NVMe, OpenLiteSpeed và CloudLinux để đảm bảo tốc độ và ổn định ngay cả với gói giá rẻ.',
              },
              {
                q: 'Nên chọn hosting WordPress hay Business Hosting?',
                a: 'Nếu website của bạn chạy WordPress, hãy chọn WordPress Hosting vì đã được tối ưu sẵn với LiteSpeed Cache và WordPress Toolkit. Business Hosting phù hợp cho các ứng dụng web khác hoặc website thương mại điện tử phức tạp.',
              },
              {
                q: 'VMST Host có hỗ trợ chuyển hosting không?',
                a: 'Có, VMST Host hỗ trợ chuyển hosting miễn phí từ nhà cung cấp cũ sang. Đội ngũ kỹ thuật sẽ thực hiện migration đảm bảo không mất dữ liệu.',
              },
              {
                q: 'Hosting có ảnh hưởng đến SEO không?',
                a: 'Có, tốc độ hosting ảnh hưởng trực tiếp đến Core Web Vitals và thứ hạng SEO. Hosting nhanh giúp website load nhanh hơn, giảm tỷ lệ thoát và tăng thứ hạng trên Google.',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <button
                  onClick={() => setFaqOpenIndex(faqOpenIndex === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-[#0B2B6F] hover:bg-blue-50/40 transition-colors"
                >
                  <span>{item.q}</span>
                  <span className="ml-4 text-[#034CC9] text-xl leading-none flex-shrink-0">
                    {faqOpenIndex === i ? '−' : '+'}
                  </span>
                </button>
                {faqOpenIndex === i && (
                  <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Links Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-[#0B2B6F] mb-6 text-center">Khám phá thêm</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { href: '/wordpress-hosting', label: 'Hosting WordPress giá rẻ' },
              { href: '/business-hosting', label: 'Hosting cho doanh nghiệp' },
              { href: '/email-domain', label: 'Email doanh nghiệp' },
              { href: '/pricing', label: 'Bảng giá hosting' },
              { href: '/contact', label: 'Liên hệ tư vấn' },
              { href: '/advisor', label: 'Tư vấn chọn gói' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-center text-center text-sm font-medium text-[#034CC9] bg-blue-50 hover:bg-[#034CC9] hover:text-white border border-blue-100 rounded-xl px-3 py-4 transition-all hover:shadow-md"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      {blogPosts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#0B2B6F] mb-2">Blog Hosting – Hướng dẫn & Kiến thức</h2>
              <p className="text-gray-600">Kiến thức và tips hữu ích từ VMST Host</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all hover:scale-105 cursor-pointer"
                >
                  <img
                    src={getBlogImageUrl(post)}
                    alt={post.tieu_de}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <p className="text-xs text-gray-500 mb-2">
                      {new Date(post.created || '').toLocaleDateString('vi-VN')}
                    </p>
                    <h3 className="text-lg font-bold text-[#0B2B6F] mb-2 line-clamp-2">
                      {post.tieu_de}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.mo_ta_ngan || ''}
                    </p>
                    <span className="text-[#034CC9] font-semibold flex items-center hover:text-[#0B2B6F] transition-colors">
                      Đọc thêm <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/blog"
                className="bg-[#034CC9] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#0B2B6F] transition-all"
              >
                Xem tất cả bài viết →
              </Link>
            </div>
          </div>
        </section>
      )}
      <SeoContent {...seoData.home} />
    </div>
  );
}
