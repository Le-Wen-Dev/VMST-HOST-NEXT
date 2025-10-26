import { Zap, Shield, Clock, Headphones, Server, Mail, Globe, ArrowRight, Check } from 'lucide-react';
import { wordpressPlans, businessPlans, emailPlans, blogPosts } from '../data/mockData';

interface HomePageProps {
  onNavigate: (page: string, params?: any) => void;
  onAddToCart: (plan: any, duration: string) => void;
}

export default function HomePage({ onNavigate, onAddToCart }: HomePageProps) {
  const featuredPlans = [
    { ...wordpressPlans.find(p => p.id === 'wp-pro')!, category: 'wordpress-hosting' },
    { ...businessPlans.find(p => p.id === 'biz-pro')!, category: 'business-hosting' },
    { ...emailPlans.find(p => p.id === 'mail-pro')!, category: 'email-domain' }
  ];

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
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Hạ tầng Hosting & Email Doanh nghiệp tối ưu cho WordPress
              </h1>
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
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B2B6F] mb-4">Sản phẩm nổi bật</h2>
            <p className="text-gray-600 text-lg">Lựa chọn hoàn hảo cho doanh nghiệp của bạn</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden border-2 border-transparent hover:border-[#034CC9] group">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 text-white">
                <Server className="h-12 w-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">WordPress Hosting</h3>
                <p className="text-blue-100">Tối ưu riêng cho WordPress</p>
              </div>
              <div className="p-8">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">OpenLiteSpeed & LiteSpeed Cache</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">WordPress Toolkit tích hợp</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">Staging & Clone website dễ dàng</span>
                  </li>
                </ul>
                <button
                  onClick={() => onNavigate('wordpress-hosting')}
                  className="w-full bg-[#034CC9] text-white py-3 rounded-lg font-semibold hover:bg-[#0B2B6F] transition-colors flex items-center justify-center group-hover:scale-105 transition-transform"
                >
                  Xem gói
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden border-2 border-transparent hover:border-[#034CC9] group">
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-8 text-white">
                <Globe className="h-12 w-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Business Hosting</h3>
                <p className="text-green-100">Hiệu suất cao cho mọi ứng dụng</p>
              </div>
              <div className="p-8">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">PHP, Node.js, Python support</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">SSH Access & Git integration</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">Redis Cache & Elasticsearch</span>
                  </li>
                </ul>
                <button
                  onClick={() => onNavigate('business-hosting')}
                  className="w-full bg-[#034CC9] text-white py-3 rounded-lg font-semibold hover:bg-[#0B2B6F] transition-colors flex items-center justify-center group-hover:scale-105 transition-transform"
                >
                  Xem gói
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden border-2 border-transparent hover:border-[#034CC9] group">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-8 text-white">
                <Mail className="h-12 w-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Email Domain</h3>
                <p className="text-purple-100">Email doanh nghiệp chuyên nghiệp</p>
              </div>
              <div className="p-8">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">Anti-Spam & Anti-Virus</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">DKIM, SPF & DMARC</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">Webmail & ActiveSync</span>
                  </li>
                </ul>
                <button
                  onClick={() => onNavigate('email-domain')}
                  className="w-full bg-[#034CC9] text-white py-3 rounded-lg font-semibold hover:bg-[#0B2B6F] transition-colors flex items-center justify-center group-hover:scale-105 transition-transform"
                >
                  Xem gói
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-[#E6EEFF] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B2B6F] mb-4">Gói được lựa chọn nhiều nhất</h2>
            <p className="text-gray-600 text-lg">Phù hợp với hầu hết doanh nghiệp SME</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredPlans.map((plan) => (
              <div key={plan.id} className="bg-white rounded-2xl shadow-lg p-8 relative border-2 border-[#034CC9]">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#034CC9] text-white px-6 py-2 rounded-full text-sm font-semibold">
                    Được chọn nhiều nhất
                  </span>
                </div>
                <div className="text-center mt-4 mb-6">
                  <h3 className="text-2xl font-bold text-[#0B2B6F] mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.type === 'wordpress' ? 'WordPress Hosting' : plan.type === 'business' ? 'Business Hosting' : 'Email Domain'}</p>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-4xl font-bold text-[#034CC9]">
                      {plan.price.monthly.toLocaleString('vi-VN')}₫
                    </span>
                    <span className="text-gray-500 ml-2">/tháng</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {plan.price.yearly.toLocaleString('vi-VN')}₫/năm (tiết kiệm 20%)
                  </p>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.slice(0, 6).map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => onAddToCart(plan, 'monthly')}
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
            {blogPosts.slice(0, 3).map((post) => (
              <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer" onClick={() => onNavigate('blog-post', { slug: post.slug })}>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#034CC9] text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-[#0B2B6F] mb-3 group-hover:text-[#034CC9] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
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
