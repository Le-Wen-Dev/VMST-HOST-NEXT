'use client';

import { useState } from 'react';
import Link from 'next/link';

/* ------------------------------------------------------------------ */
/*  Reusable SEO sections for every public page                       */
/*  - 1500-word article (collapsed to ~200 chars + "Xem thêm")       */
/*  - FAQ accordion                                                   */
/*  - Testimonials                                                    */
/*  - Internal links grid                                             */
/*  - Trust / experience section                                      */
/* ------------------------------------------------------------------ */

// ---------- Types ----------
interface FAQ { q: string; a: string }
interface Testimonial { name: string; role: string; initials: string; text: string }
interface InternalLink { href: string; label: string }

interface SeoContentProps {
  /** Full HTML article (~1500 words). Only ~200 chars shown initially. */
  article: string;
  articleTitle?: string;
  faqs: FAQ[];
  testimonials?: Testimonial[];
  links?: InternalLink[];
  /** Optional experience / trust bullets */
  trustItems?: { icon: string; title: string; desc: string }[];
}

// ---------- Defaults ----------
const DEFAULT_LINKS: InternalLink[] = [
  { href: '/wordpress-hosting', label: 'Hosting WordPress giá rẻ' },
  { href: '/business-hosting', label: 'VPS & Hosting doanh nghiệp' },
  { href: '/email-domain', label: 'Email doanh nghiệp' },
  { href: '/pricing', label: 'Bảng giá dịch vụ' },
  { href: '/advisor', label: 'Tư vấn chọn gói' },
  { href: '/blog', label: 'Blog & Hướng dẫn' },
  { href: '/contact', label: 'Liên hệ tư vấn' },
  { href: '/support', label: 'Trung tâm hỗ trợ' },
];

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  { name: 'Anh Tuấn', role: 'CEO, Công ty TechViet', initials: 'AT', text: 'Website công ty chạy nhanh hơn hẳn sau khi chuyển sang VMST Host. Tốc độ load dưới 1 giây, Google PageSpeed đạt 95+. Rất hài lòng!' },
  { name: 'Chị Hương', role: 'Chủ shop Shopee', initials: 'CH', text: 'Hosting giá rẻ nhưng chất lượng không hề rẻ. Website bán hàng của tôi chạy mượt mà, không bao giờ bị down. Hỗ trợ kỹ thuật rất nhanh.' },
  { name: 'Anh Đức', role: 'Freelancer Developer', initials: 'AD', text: 'Đã dùng nhiều hosting khác nhau, VMST Host là nơi tôi gắn bó lâu nhất. SSD NVMe thực sự nhanh, DirectAdmin dễ dùng, giá hợp lý.' },
];

const DEFAULT_TRUST = [
  { icon: '⚡', title: 'Tốc độ tải < 1 giây', desc: 'SSD NVMe + OpenLiteSpeed cho TTFB dưới 200ms, PageSpeed 90+' },
  { icon: '📱', title: 'Tối ưu Mobile', desc: 'Responsive hoàn hảo, Core Web Vitals đạt chuẩn Google trên mọi thiết bị' },
  { icon: '🔒', title: 'Bảo mật toàn diện', desc: 'SSL miễn phí, Imunify360, CloudLinux cách ly tài khoản' },
  { icon: '🔄', title: 'Backup tự động', desc: 'Sao lưu hàng ngày, khôi phục 1-click, không lo mất dữ liệu' },
  { icon: '📞', title: 'Hỗ trợ 24/7', desc: 'Đội ngũ kỹ thuật Việt Nam, phản hồi trong 15 phút qua chat & hotline' },
  { icon: '🌐', title: 'Uptime 99.9%', desc: 'Cam kết SLA, hoàn tiền nếu downtime vượt mức cho phép' },
];

// ---------- Sub-components ----------

function TrustSection({ items }: { items: typeof DEFAULT_TRUST }) {
  return (
    <section className="py-12 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Tại sao chọn VMST Host?
        </h2>
        <p className="text-center text-gray-500 mb-8 text-sm">
          Trải nghiệm hosting chuyên nghiệp với công nghệ hiện đại nhất
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((t, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 text-center hover:shadow-md transition-shadow">
              <span className="text-3xl block mb-2">{t.icon}</span>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">{t.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialSection({ items }: { items: Testimonial[] }) {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Khách hàng nói gì về VMST Host?
        </h2>
        <p className="text-center text-gray-500 mb-8 text-sm">
          Hơn 500+ khách hàng đã tin tưởng sử dụng dịch vụ
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <div key={i} className="bg-slate-50 rounded-xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.role}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
              <div className="flex gap-0.5 mt-3">
                {[...Array(5)].map((_, j) => (
                  <span key={j} className="text-yellow-400 text-sm">★</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection({ faqs }: { faqs: FAQ[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <section className="py-12 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Câu hỏi thường gặp
        </h2>
        <p className="text-center text-gray-500 mb-8 text-sm">
          Giải đáp nhanh các thắc mắc phổ biến
        </p>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900 text-sm pr-4">{f.q}</span>
                <span className="text-gray-400 text-lg flex-shrink-0">
                  {openIdx === i ? '−' : '+'}
                </span>
              </button>
              {openIdx === i && (
                <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArticleSection({ article, title }: { article: string; title?: string }) {
  const [expanded, setExpanded] = useState(false);
  const preview = article.replace(/<[^>]*>/g, '').slice(0, 200);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        {title && (
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
        )}
        {expanded ? (
          <div
            className="prose prose-sm max-w-none text-gray-700 leading-relaxed
              prose-headings:text-gray-900 prose-headings:font-bold
              prose-h2:text-xl prose-h3:text-lg
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-lg prose-img:shadow-md"
            dangerouslySetInnerHTML={{ __html: article }}
          />
        ) : (
          <p className="text-gray-600 text-sm leading-relaxed">
            {preview}...
          </p>
        )}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1"
        >
          {expanded ? 'Thu gọn ▲' : 'Xem thêm ▼'}
        </button>
      </div>
    </section>
  );
}

function LinksSection({ links }: { links: InternalLink[] }) {
  return (
    <section className="py-10 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-lg font-bold text-gray-900 mb-4 text-center">
          Khám phá thêm dịch vụ
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {links.map((l, i) => (
            <Link
              key={i}
              href={l.href}
              className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Main Component ----------
export default function SeoContent({
  article,
  articleTitle,
  faqs,
  testimonials = DEFAULT_TESTIMONIALS,
  links = DEFAULT_LINKS,
  trustItems = DEFAULT_TRUST,
}: SeoContentProps) {
  return (
    <div className="mt-16 border-t border-gray-200">
      <TrustSection items={trustItems} />
      <TestimonialSection items={testimonials} />
      <FaqSection faqs={faqs} />
      <ArticleSection article={article} title={articleTitle} />
      <LinksSection links={links} />
    </div>
  );
}
