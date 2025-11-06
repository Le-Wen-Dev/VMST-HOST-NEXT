import { useEffect, useState } from 'react';
import { Zap, Shield, Clock, Headphones, Server, Mail, Globe, ArrowRight, Check } from 'lucide-react';
import { listBlogs, BlogRecord } from '../services/blogs';
import { listProducts, ProductRecord } from '../services/products';

interface HomePageProps {
  onNavigate: (page: string, params?: any) => void;
  onAddToCart: (plan: any, duration: string) => void;
}

export default function HomePage({ onNavigate, onAddToCart }: HomePageProps) {
  const [latestPosts, setLatestPosts] = useState<BlogRecord[]>([]);

  useEffect(() => {
    async function loadLatest() {
      try {
        const res = await listBlogs({ page: 1, perPage: 3, sort: '-created' });
        setLatestPosts(res.items);
      } catch (e) {
        console.error('Failed to load latest blogs:', e);
      }
    }
    loadLatest();
  }, []);
  const [activeTab, setActiveTab] = useState<'wordpress' | 'vps' | 'email'>('wordpress');
  const [wpProducts, setWpProducts] = useState<ProductRecord[]>([]);
  const [vpsProducts, setVpsProducts] = useState<ProductRecord[]>([]);
  const [emailProducts, setEmailProducts] = useState<ProductRecord[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const res = await listProducts({ status: 'active', perPage: 50 });
        const items = res.items || [];
        const norm = (s: any) => String(s || '').toLowerCase();
        const wp = items.filter(i => norm(i.danh_muc).includes('wordpress'));
        const vps = items.filter(i => {
          const c = norm(i.danh_muc);
          return c.includes('vps') || c.includes('business') || c.includes('nvme') || c.includes('platinum');
        });
        const em = items.filter(i => norm(i.danh_muc).includes('email'));
        if (!mounted) return;
        setWpProducts(wp.slice(0, 3));
        setVpsProducts(vps.slice(0, 3));
        setEmailProducts(em.slice(0, 3));
      } catch (err) {
        console.warn('Lỗi tải sản phẩm:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const getTabProducts = () => {
    if (activeTab === 'wordpress') return wpProducts;
    if (activeTab === 'vps') return vpsProducts;
    return emailProducts;
  };

  const placeholderNames: Record<'wordpress' | 'vps' | 'email', string[]> = {
    wordpress: ['gói 1 wordpress', 'gói 2 wordpress', 'gói 3 wordpress'],
    vps: ['Gói số 1 VPS NVME', 'gói số 2 VPS NVME', 'gói số  3 NVME'],
    email: ['gói 1 Email', 'gói 2 email', 'gói 3 email'],
  };

  const extractFeatures = (prod: ProductRecord): string[] => {
    const toArray = (val: any): string[] => {
      if (!val) return [];
      try {
        // If stored as JSON string
        if (typeof val === 'string') {
          const parsed = JSON.parse(val);
          if (Array.isArray(parsed)) {
            return parsed.map((v) => String(v));
          }
          if (typeof parsed === 'object' && parsed) {
            return Object.entries(parsed).map(([k, v]) => `${k}: ${v}`);
          }
          // Fallback: split by newline/comma
          return String(val).split(/\n|,/).map((s) => s.trim()).filter(Boolean);
        }
        if (Array.isArray(val)) return val.map((v) => String(v));
        if (typeof val === 'object' && val) return Object.entries(val).map(([k, v]) => `${k}: ${v}`);
      } catch {
        return String(val).split(/\n|,/).map((s) => s.trim()).filter(Boolean);
      }
      return [];
    };

    const features = [
      ...toArray((prod as any).tinh_nang),
      ...toArray((prod as any).thong_so),
    ];
    // unique & non-empty
    const unique = Array.from(new Set(features.filter(Boolean)));
    return unique.slice(0, 6);
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-gradient-to-br from-[#034CC9] to-[#0B2B6F] text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug mb-6">
                Hạ tầng Hosting & Email Doanh nghiệp tối ưu cho WordPress
              </h3>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                OpenLiteSpeed • CloudLinux • Backup hằng ngày • Triển khai tự động • Hỗ trợ thật
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => onNavigate('pricing')}
                  className="bg-white text-[#034CC9] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
                >
                  Mua ngay
                </button>
                <button
                  onClick={() => onNavigate('advisor')}
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#034CC9] transition-all"
                >
                  Tư vấn chọn gói
                </button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Server Infrastructure"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-[#034CC9]" />
              </div>
              <h3 className="text-lg font-semibold text-[#0B2B6F] mb-2">Tốc độ tối ưu</h3>
              <p className="text-gray-600 text-sm">OpenLiteSpeed & NVMe SSD cho hiệu năng vượt trội</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-[#0B2B6F] mb-2">An toàn - Imunify360</h3>
              <p className="text-gray-600 text-sm">Bảo vệ 24/7 khỏi malware, hack và tấn công</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-[#0B2B6F] mb-2">Tự động hóa</h3>
              <p className="text-gray-600 text-sm">Triển khai tức thì, backup tự động hằng ngày</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Headphones className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-[#0B2B6F] mb-2">Hỗ trợ nhanh</h3>
              <p className="text-gray-600 text-sm">Đội ngũ kỹ thuật Việt Nam 24/7 qua chat & ticket</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B2B6F] mb-4">Sản phẩm nổi bật</h2>
            <p className="text-gray-600 text-lg">Lựa chọn hoàn hảo cho doanh nghiệp của bạn</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <button
              onClick={() => setActiveTab('wordpress')}
              className={`px-6 py-2 rounded-full border ${activeTab === 'wordpress' ? 'bg-[#034CC9] text-white border-[#034CC9]' : 'bg-white text-[#0B2B6F] border-gray-200'} transition-colors`}
            >
              wordpress max speed
            </button>
            <button
              onClick={() => setActiveTab('vps')}
              className={`px-6 py-2 rounded-full border ${activeTab === 'vps' ? 'bg-[#034CC9] text-white border-[#034CC9]' : 'bg-white text-[#0B2B6F] border-gray-200'} transition-colors`}
            >
              vps NVME Xeon platinum gen 2
            </button>
            <button
              onClick={() => setActiveTab('email')}
              className={`px-6 py-2 rounded-full border ${activeTab === 'email' ? 'bg-[#034CC9] text-white border-[#034CC9]' : 'bg-white text-[#0B2B6F] border-gray-200'} transition-colors`}
            >
              Email doanh nghiệp
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {getTabProducts().length > 0 ? (
              getTabProducts().map((prod) => (
                <div key={prod.id} className="bg-white rounded-2xl shadow-lg p-8 border-2 border-transparent hover:border-[#034CC9] transition-all">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-[#0B2B6F]">{prod.ten_san_pham}</h3>
                    <p className="text-gray-600">{(prod.danh_muc || '').toUpperCase()}</p>
                  </div>
                  <div className="text-center mb-6">
                    {prod.gia_ban ? (
                      <div className="flex items-baseline justify-center">
                        <span className="text-3xl font-bold text-[#034CC9]">{prod.gia_ban}</span>
                        <span className="text-gray-500 ml-2">{prod.don_vi || ''}</span>
                      </div>
                    ) : (
                      <p className="text-gray-500">Đang cập nhật giá</p>
                    )}
                  </div>

                  {/* Tính năng/Thông số hiển thị đẹp như giao diện mẫu */}
                  {extractFeatures(prod).length > 0 && (
                    <ul className="space-y-3 mb-6">
                      {extractFeatures(prod).slice(0,4).map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <button
                    onClick={() => onNavigate('pricing')}
                    className="w-full bg-[#034CC9] text-white py-3 rounded-lg font-semibold hover:bg-[#0B2B6F] transition-colors"
                  >
                    Xem gói
                  </button>
                </div>
              ))
            ) : (
              placeholderNames[activeTab].map((name, idx) => (
                <div key={idx} className="bg-white rounded-2xl shadow-lg p-8 border-2 border-dashed border-gray-200">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-[#0B2B6F]">{name}</h3>
                    <p className="text-gray-500">Sẽ tự động hiển thị khi bạn nhập sản phẩm trong admin</p>
                  </div>
                  <button
                    onClick={() => onNavigate('pricing')}
                    className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold"
                  >
                    Xem gói
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* WordPress Popular Plans */}
      <section className="py-20 bg-gradient-to-br from-[#E6EEFF] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B2B6F] mb-4">Gói được lựa chọn nhiều nhất</h2>
            <p className="text-gray-600 text-lg">Phù hợp với hầu hết doanh nghiệp SME</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {(wpProducts.length ? wpProducts : placeholderNames.wordpress.map((name, idx) => ({ id: `wp-placeholder-${idx}`, ten_san_pham: name } as any))).map((prod: any, idx: number) => (
              <div key={prod.id || idx} className="bg-white rounded-2xl shadow-lg p-8 border-2 border-[#034CC9]">
                <div className="text-center mt-2 mb-6">
                  <h3 className="text-2xl font-bold text-[#0B2B6F] mb-2">{prod.ten_san_pham}</h3>
                  <div className="flex items-baseline justify-center mb-2">
                    {prod.gia_ban ? (
                      <>
                        <span className="text-4xl font-bold text-[#034CC9]">{prod.gia_ban}</span>
                        <span className="text-gray-500 ml-2">{prod.don_vi || '/tháng'}</span>
                      </>
                    ) : (
                      <span className="text-gray-500">Đang cập nhật giá</span>
                    )}
                  </div>
                </div>

                {extractFeatures(prod).length > 0 && (
                  <ul className="space-y-3 mb-6">
                    {extractFeatures(prod).slice(0,4).map((feature: string, fidx: number) => (
                      <li key={fidx} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <button
                  onClick={() => onNavigate('pricing')}
                  className="w-full bg-[#034CC9] text-white py-3 rounded-lg font-semibold hover:bg-[#0B2B6F] transition-colors"
                >
                  Chọn gói
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VPS NVME Popular Plans */}
      <section className="py-20 bg-gradient-to-br from-[#E6EEFF] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B2B6F] mb-4">Gói được lựa chọn nhiều nhất</h2>
            <p className="text-gray-600 text-lg">Phù hợp với hầu hết doanh nghiệp SME</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {(vpsProducts.length ? vpsProducts : placeholderNames.vps.map((name, idx) => ({ id: `vps-placeholder-${idx}`, ten_san_pham: name } as any))).map((prod: any, idx: number) => (
              <div key={prod.id || idx} className="bg-white rounded-2xl shadow-lg p-8 border-2 border-[#034CC9]">
                <div className="text-center mt-2 mb-6">
                  <h3 className="text-2xl font-bold text-[#0B2B6F] mb-2">{prod.ten_san_pham}</h3>
                  <div className="flex items-baseline justify-center mb-2">
                    {prod.gia_ban ? (
                      <>
                        <span className="text-4xl font-bold text-[#034CC9]">{prod.gia_ban}</span>
                        <span className="text-gray-500 ml-2">{prod.don_vi || '/tháng'}</span>
                      </>
                    ) : (
                      <span className="text-gray-500">Đang cập nhật giá</span>
                    )}
                  </div>
                </div>

                {extractFeatures(prod).length > 0 && (
                  <ul className="space-y-3 mb-6">
                    {extractFeatures(prod).slice(0,4).map((feature: string, fidx: number) => (
                      <li key={fidx} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <button
                  onClick={() => onNavigate('pricing')}
                  className="w-full bg-[#034CC9] text-white py-3 rounded-lg font-semibold hover:bg-[#0B2B6F] transition-colors"
                >
                  Chọn gói
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Email Popular Plans */}
      <section className="py-20 bg-gradient-to-br from-[#E6EEFF] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B2B6F] mb-4">Gói được lựa chọn nhiều nhất</h2>
            <p className="text-gray-600 text-lg">Phù hợp với hầu hết doanh nghiệp SME</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {(emailProducts.length ? emailProducts : placeholderNames.email.map((name, idx) => ({ id: `email-placeholder-${idx}`, ten_san_pham: name } as any))).map((prod: any, idx: number) => (
              <div key={prod.id || idx} className="bg-white rounded-2xl shadow-lg p-8 border-2 border-[#034CC9]">
                <div className="text-center mt-2 mb-6">
                  <h3 className="text-2xl font-bold text-[#0B2B6F] mb-2">{prod.ten_san_pham}</h3>
                  <div className="flex items-baseline justify-center mb-2">
                    {prod.gia_ban ? (
                      <>
                        <span className="text-4xl font-bold text-[#034CC9]">{prod.gia_ban}</span>
                        <span className="text-gray-500 ml-2">{prod.don_vi || '/tháng'}</span>
                      </>
                    ) : (
                      <span className="text-gray-500">Đang cập nhật giá</span>
                    )}
                  </div>
                </div>

                {extractFeatures(prod).length > 0 && (
                  <ul className="space-y-3 mb-6">
                    {extractFeatures(prod).slice(0,4).map((feature: string, fidx: number) => (
                      <li key={fidx} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <button
                  onClick={() => onNavigate('pricing')}
                  className="w-full bg-[#034CC9] text-white py-3 rounded-lg font-semibold hover:bg-[#0B2B6F] transition-colors"
                >
                  Chọn gói
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B2B6F] mb-4">Blog & Hướng dẫn</h2>
            <p className="text-gray-600 text-lg">Kiến thức và tips hữu ích từ VMST Host</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {latestPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer" onClick={() => onNavigate('blog-post', { slug: post.slug })}>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.avatar || 'https://placehold.co/600x400'}
                    alt={post.tieu_de}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#034CC9] text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {post.expand?.danh_muc?.name || 'Danh mục'}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span>{new Date(post.created || '').toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <span>{post.so_phut_doc || '—'}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-[#0B2B6F] mb-3 group-hover:text-[#034CC9] transition-colors">
                    {post.tieu_de}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {post.mo_ta_ngan}
                  </p>
                  <div className="flex items-center text-[#034CC9] font-semibold text-sm group-hover:underline">
                    Đọc thêm
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => onNavigate('blog')}
              className="bg-[#034CC9] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#0B2B6F] transition-colors inline-flex items-center"
            >
              Xem tất cả bài viết
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-[#034CC9] to-[#0B2B6F] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Bạn chưa chắc nên chọn gói nào?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Sử dụng công cụ tư vấn thông minh của chúng tôi để tìm gói phù hợp nhất với nhu cầu của bạn
          </p>
          <button
            onClick={() => onNavigate('advisor')}
            className="bg-white text-[#034CC9] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all hover:scale-105 shadow-lg inline-flex items-center"
          >
            Tư vấn chọn gói miễn phí
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
