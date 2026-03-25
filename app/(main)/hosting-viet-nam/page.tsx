import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { geoLocations, getGeoByTier } from '@/data/geo-seo';

export const revalidate = 86400; // 24h

export default function HostingVietNamPage() {
  const tier1 = getGeoByTier(1);
  const tier2 = getGeoByTier(2);
  const tier3 = getGeoByTier(3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Hosting Việt Nam — Dịch vụ hosting theo tỉnh thành',
    description: 'Dịch vụ hosting tại Việt Nam theo từng tỉnh thành. Server Việt Nam, SSD NVMe, hỗ trợ 24/7.',
    url: 'https://vmst.host/hosting-viet-nam',
    provider: {
      '@type': 'Organization',
      name: 'VMST Host',
      url: 'https://vmst.host',
    },
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: 'https://vmst.host' },
      { '@type': 'ListItem', position: 2, name: 'Hosting Việt Nam', item: 'https://vmst.host/hosting-viet-nam' },
    ],
  };

  const renderLocationCard = (loc: typeof geoLocations[0]) => (
    <Link
      key={loc.slug}
      href={`/hosting-viet-nam/${loc.slug}`}
      className="group bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-gray-900 text-lg">{loc.nameShort}</h3>
        </div>
        {loc.techHub && (
          <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
            Tech Hub
          </span>
        )}
      </div>
      <p className="text-gray-500 text-sm mb-3 line-clamp-2">{loc.description}</p>
      <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
        <span>Dân số: {loc.population}</span>
        <span>DN: {loc.businesses}</span>
      </div>
      <span className="text-blue-600 text-sm font-semibold group-hover:underline flex items-center gap-1">
        Hosting {loc.nameShort} <ArrowRight className="w-4 h-4" />
      </span>
    </Link>
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <div className="min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 text-white py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-2 text-blue-300 text-sm mb-4">
              <Link href="/" className="hover:text-white transition-colors">Trang chủ</Link>
              <span>/</span>
              <span className="text-white">Hosting Việt Nam</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Hosting Việt Nam Theo Tỉnh Thành
            </h1>
            <p className="text-blue-200 text-lg md:text-xl max-w-3xl mb-6">
              Dịch vụ hosting với máy chủ đặt tại Việt Nam, tốc độ truy cập nhanh nhất cho người dùng tại mọi tỉnh thành. Thanh toán VietQR, hỗ trợ tiếng Việt 24/7.
            </p>

            <div className="flex flex-wrap gap-3">
              <div className="bg-white/10 backdrop-blur rounded-lg px-4 py-2 text-sm">
                <strong>{geoLocations.length}</strong> khu vực phục vụ
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg px-4 py-2 text-sm">
                Server <strong>Việt Nam</strong>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg px-4 py-2 text-sm">
                Từ <strong>29.000đ</strong>/tháng
              </div>
            </div>
          </div>
        </section>

        {/* Tier 1 */}
        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Thành phố lớn</h2>
            <p className="text-gray-500 mb-6">Trung tâm kinh tế — nhu cầu hosting cao nhất</p>
            <div className="grid md:grid-cols-2 gap-6">
              {tier1.map(renderLocationCard)}
            </div>
          </div>
        </section>

        {/* Tier 2 */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Tỉnh thành phát triển</h2>
            <p className="text-gray-500 mb-6">Khu vực kinh tế năng động, chuyển đổi số mạnh mẽ</p>
            <div className="grid md:grid-cols-3 gap-6">
              {tier2.map(renderLocationCard)}
            </div>
          </div>
        </section>

        {/* Tier 3 */}
        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Khu vực trọng điểm</h2>
            <p className="text-gray-500 mb-6">Vùng kinh tế đang phát triển — tiềm năng chuyển đổi số lớn</p>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {tier3.map(renderLocationCard)}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Dù bạn ở đâu tại Việt Nam, VMST Host luôn sẵn sàng
            </h2>
            <p className="text-blue-200 mb-8 text-lg">
              Server Việt Nam — tốc độ tải dưới 1 giây — hỗ trợ 24/7 — thanh toán VietQR
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/pricing"
                className="bg-yellow-500 hover:bg-yellow-400 text-blue-950 font-bold px-8 py-4 rounded-xl text-lg transition-colors"
              >
                Xem bảng giá
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
      </div>
    </>
  );
}
