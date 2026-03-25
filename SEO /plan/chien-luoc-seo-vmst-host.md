# Chiến lược SEO 3 tháng — vmst.host
## Mục tiêu: Top 1-3 Google cho 200+ từ khoá ngành hosting Việt Nam

---

## Thực trạng hiện tại

### Đã có (tốt)
- Next.js App Router + ISR cho blog
- Sitemap động (blog + geo pages)
- Robots.txt chuẩn
- JSON-LD: Organization, WebSite, LocalBusiness, BlogPosting
- OG image generator (edge runtime)
- Google Indexing API script
- SEO content component (article + FAQ mỗi trang)
- Meta title/description/canonical cho tất cả trang thương mại

### Đã fix trong phiên này
- [x] **15 Geo SEO pages** — `/hosting-viet-nam/[city]` cho 15 tỉnh/thành
- [x] **Trang index Geo** — `/hosting-viet-nam` danh sách tất cả khu vực
- [x] **Sitemap nâng cấp** — bao gồm tất cả geo pages
- [x] **OG image** cho tất cả trang tĩnh (WordPress, Business, Email, Pricing, main layout, root layout)
- [x] **Structured data nâng cao** — WebPage, FAQPage, BreadcrumbList, areaServed cho geo pages
- [x] **Build thành công** — tất cả pages SSG/SSR đúng

### Còn thiếu (cần làm tiếp)
- [ ] Trang thương mại vẫn `'use client'` — content không SSR
- [ ] Google Search Console verification chưa có
- [ ] Không dùng `next/font` — CLS risk
- [ ] Blog list/category là CSR

---

## Phân tích Keyword — 7 Cluster chính

### Cluster A — Generic Hosting (Volume: Cao nhất)
| Keyword | Volume ước tính | Khó |
|---------|----------------|-----|
| hosting | 40K-80K | Rất cao |
| hosting giá rẻ | 8K-18K | Cao |
| hosting Việt Nam | 6K-14K | Trung bình |
| hosting tốt nhất | 5K-12K | Cao |
| mua hosting | 5K-12K | Trung bình |
| hosting miễn phí | 4K-10K | Trung bình |
| thuê hosting | 3K-8K | Trung bình |
| hosting uy tín | 3K-7K | Trung bình |
| hosting SSD | 2K-5K | Thấp |
| hosting NVMe | 1.5K-4K | Thấp |

### Cluster B — WordPress Hosting
| Keyword | Volume | Khó |
|---------|--------|-----|
| wordpress hosting | 8K-18K | Cao |
| wordpress hosting giá rẻ | 3K-7K | Trung bình |
| hosting cho wordpress | 2K-5K | Thấp |
| mua wordpress hosting | 1K-2.5K | Thấp |
| hosting wordpress tốc độ cao | 800-2K | Thấp |

### Cluster C — Email / Business
| Keyword | Volume | Khó |
|---------|--------|-----|
| email hosting | 5K-12K | Trung bình |
| email doanh nghiệp | 4K-10K | Trung bình |
| email theo tên miền | 3K-8K | Thấp |
| tạo email doanh nghiệp | 3K-7K | Thấp |
| hosting doanh nghiệp | 1K-3K | Thấp |

### Cluster D — VPS
| Keyword | Volume | Khó |
|---------|--------|-----|
| VPS | 30K-60K | Rất cao |
| VPS giá rẻ | 8K-18K | Cao |
| thuê VPS | 4K-10K | Trung bình |
| VPS Việt Nam | 5K-12K | Trung bình |

### Cluster E — So sánh / Review (Cơ hội lớn)
| Keyword | Volume | Khó |
|---------|--------|-----|
| hosting nào tốt nhất | 4K-10K | Thấp |
| so sánh hosting | 3K-8K | Thấp |
| azdigi có tốt không | 2K-5K | Rất thấp |
| mắt bão hosting có tốt không | 1.5K-4K | Rất thấp |
| top 10 hosting Việt Nam | 2K-5K | Thấp |
| so sánh azdigi và tenten | 500-1.5K | Rất thấp |
| review tenten | 1K-3K | Rất thấp |
| hostinger có tốt không | 1K-2.5K | Rất thấp |

### Cluster F — Long-tail / Use-case
| Keyword | Volume | Khó |
|---------|--------|-----|
| nên chọn hosting nào | 3K-7K | Thấp |
| hosting cho website bán hàng | 1K-2.5K | Rất thấp |
| hosting tốt cho SEO | 800-2K | Rất thấp |
| hosting cho startup | 500-1.2K | Rất thấp |
| hosting sinh viên | 800-2K | Rất thấp |
| hosting cho blog | 1K-2.5K | Rất thấp |
| mua hosting không cần thẻ quốc tế | 300-800 | Rất thấp |

### Cluster G — Geo SEO (Đã triển khai!) ✅
| Keyword | Volume | Khó |
|---------|--------|-----|
| hosting tphcm | 500-1.5K | Rất thấp |
| hosting hà nội | 400-1.2K | Rất thấp |
| hosting đà nẵng | 200-600 | Rất thấp |
| mua hosting tại tphcm | 200-500 | Rất thấp |
| dịch vụ hosting tphcm | 200-500 | Rất thấp |

---

## Đối thủ chính

| Brand | Điểm mạnh | Điểm yếu | Cơ hội ăn ké |
|-------|-----------|-----------|-------------|
| Azdigi | 2000+ bài blog, authority cao | Quá kỹ thuật, không beginner-friendly | Review, so sánh |
| Tenten | Domain news mạnh, giá rẻ | Ít content sâu | So sánh giá |
| VinaHost | Broad coverage | Content loãng (forex), thin content | Chất lượng content |
| Hostinger | Brand quốc tế, DA cao | Không local payment, support English | VietQR, tiếng Việt |
| Mắt Bão | Brand cũ, tin tưởng | Website 503, ít update | Review, thay thế |
| Inet.vn | Blog 404 — ít content | Không có content strategy | Mọi keyword |

---

## THÁNG 1 — Nền tảng Technical + Content cốt lõi

### 1.1 Technical SEO (Ưu tiên cao nhất)
- [ ] **Google Search Console** — verify bằng meta tag hoặc DNS
- [ ] **Google Indexing API** — submit tất cả geo pages mới
- [ ] **next/font** — chuyển sang font loading Next.js để fix CLS
- [ ] **Preconnect** — thêm cho PocketBase API, Google Fonts
- [ ] **Chuyển trang chính sang SSR** — ít nhất homepage, pricing, blog list (cần đánh giá effort)

### 1.2 Landing pages thương mại (10 trang)
Target keyword nhóm buying intent:
- /hosting-gia-re — "hosting giá rẻ", "mua hosting giá rẻ"
- /wordpress-hosting-gia-re — "wordpress hosting giá rẻ"
- /vps-gia-re — "VPS giá rẻ", "thuê VPS"
- /email-doanh-nghiep — đã có, tối ưu thêm
- /hosting-cho-website-ban-hang — "hosting cho shop online"
- /hosting-sinh-vien — "hosting sinh viên giá rẻ" + voucher VOVANMY2026
- /hosting-ssd-nvme — "hosting SSD", "hosting NVMe"
- /hosting-mien-phi — "hosting miễn phí" (redirect sang gói trial)
- /hosting-uptime-99 — "hosting không downtime"
- /hosting-seo — "hosting tốt cho SEO"

### 1.3 Pillar Content (5 bài 2000-3000 từ)
1. **"Hosting là gì? Hướng dẫn chọn hosting cho người mới 2026"**
   - Target: hosting là gì, cách chọn hosting, hosting cho người mới
   - URL: /blog/hosting-la-gi-huong-dan-chon-hosting

2. **"So sánh hosting Việt Nam: Top 10 nhà cung cấp tốt nhất 2026"**
   - Target: top 10 hosting, hosting tốt nhất, so sánh hosting
   - URL: /blog/top-10-hosting-viet-nam

3. **"WordPress Hosting là gì? Cách chọn hosting WordPress tốt nhất"**
   - Target: wordpress hosting, hosting cho wordpress
   - URL: /blog/wordpress-hosting-la-gi

4. **"Email doanh nghiệp: Tại sao công ty cần email theo tên miền?"**
   - Target: email doanh nghiệp, email theo tên miền
   - URL: /blog/email-doanh-nghiep-la-gi

5. **"VPS vs Shared Hosting: Nên chọn gì cho website của bạn?"**
   - Target: VPS vs hosting, VPS là gì, nên chọn VPS hay hosting
   - URL: /blog/vps-vs-shared-hosting

### 1.4 Blog content (30 bài)
- 2-3 bài/ngày, 800-1500 từ
- Submit Google Indexing API ngay khi publish
- Mỗi bài 3-5 internal links

Chủ đề ưu tiên:
- Hướng dẫn kỹ thuật cơ bản (cài WordPress, SSL, email)
- So sánh dịch vụ (Azdigi review, Tenten review)
- Use-case (hosting cho landing page, hosting cho shop)

### 1.5 Geo SEO ✅ (Đã triển khai)
- 15 trang tỉnh/thành — đã build & deploy
- Submit Google Indexing API cho tất cả geo URLs

---

## THÁNG 2 — Đánh chiếm keyword thương mại + Brand comparison

### 2.1 Bài so sánh đối thủ (20 bài)
**Azdigi (ưu tiên cao nhất):**
- "Azdigi có tốt không? Review chi tiết 2026"
- "So sánh Azdigi vs VMST Host — Nên chọn nhà nào?"
- "Azdigi giá bao nhiêu? So sánh bảng giá hosting"

**Tenten:**
- "Review Tenten hosting 2026 — Ưu nhược điểm"
- "So sánh Tenten vs VMST Host"

**Hostinger Vietnam:**
- "Hostinger Việt Nam có tốt không? Nên dùng hosting ngoại hay nội?"
- "So sánh hosting trong nước vs nước ngoài"

**Mắt Bão / VinaHost / Inet:**
- Review từng brand, so sánh giá, tính năng
- "Mắt Bão hosting review 2026"
- "VinaHost vs VMST Host — So sánh chi tiết"

### 2.2 Collection pages theo use-case (10 trang)
- /hosting-cho-doanh-nghiep — SME
- /hosting-cho-startup — Startup
- /hosting-cho-freelancer — Freelancer
- /hosting-cho-ban-hang-online — Ecommerce
- /hosting-cho-truong-hoc — Giáo dục
- /hosting-cho-khach-san — Hospitality
- /hosting-cho-agency — Web agency
- /hosting-cho-blog — Blogger
- /hosting-thanh-toan-vietqr — Thanh toán VN
- /hosting-mua-khong-can-the-quoc-te — No credit card

### 2.3 Internal linking tự động
- Blog nhắc "hosting giá rẻ" → link /pricing
- Blog nhắc "WordPress hosting" → link /wordpress-hosting
- Blog nhắc "email doanh nghiệp" → link /email-domain
- Blog nhắc tên thành phố → link geo page tương ứng
- Mọi bài blog → link SeoContent internal links grid

---

## THÁNG 3 — Scale + Long-tail + FAQ Domination

### 3.1 FAQ Mega Page
- URL: /faq
- 100+ câu hỏi thường gặp về hosting
- FAQ schema cho tất cả → rich snippets
- Target: "hosting là gì", "hosting bao nhiêu tiền", "nên chọn hosting nào"

### 3.2 Long-tail content (40 bài)
**Theo nghề nghiệp:**
- "Hosting cho người làm IT"
- "Hosting cho designer"
- "Hosting cho youtuber"

**Theo ngành:**
- "Hosting cho nhà hàng"
- "Hosting cho phòng khám"
- "Hosting cho bất động sản"

**So sánh kỹ thuật:**
- "NVMe vs SSD — khác biệt thực tế"
- "LiteSpeed vs Nginx vs Apache"
- "cPanel vs DirectAdmin"
- "Uptime 99.9% nghĩa là gì?"

### 3.3 Backlink Strategy
- Guest post trên blog công nghệ VN (Tinhte, Genk)
- Đăng bài PR trên báo điện tử
- Forum: Voz.vn, Tinhte.vn
- Infographic: "Cách chọn hosting cho người mới"
- Liên kết từ vmst.media, vmst.com.vn

### 3.4 Mở rộng Geo SEO
- Thêm 10-15 tỉnh/thành nữa nếu geo pages hiện tại có traffic
- Tạo content chuyên biệt theo ngành x khu vực:
  - "Hosting cho khách sạn Nha Trang"
  - "Website du lịch Đà Lạt — hosting phù hợp"
  - "Website bất động sản TP.HCM"

---

## KPI theo tháng

| Chỉ số | Tháng 1 | Tháng 2 | Tháng 3 |
|--------|---------|---------|---------|
| Bài blog mới | 30 | 20 | 40 |
| Landing/Geo pages | 25 (đã có 16) | 10 | 15 |
| Traffic/ngày | 200-500 | 1.000-3.000 | 5.000-10.000 |
| Keyword top 10 | 30 | 100 | 250+ |
| Keyword top 3 | 5 | 30 | 100+ |
| Indexed pages | 60 | 120 | 200+ |

---

## Lợi thế cạnh tranh của vmst.host (USP cho SEO)

1. **Thanh toán VietQR** — Không đối thủ nào làm content về điều này
2. **Giá rẻ nhất** — Từ 29.000đ/tháng, thấp hơn Azdigi (63K), Tenten (30K+)
3. **Voucher sinh viên** — VOVANMY2026, tạo landing page riêng
4. **Hỗ trợ tiếng Việt 24/7** — Khác Hostinger (support English)
5. **Server Việt Nam** — Latency thấp, phù hợp compliance data localization

---

## Keyword KHÔNG nên target (tránh)

- Keyword quá generic: "hosting", "VPS" (standalone) — cạnh tranh quá cao
- Keyword brand luxury: "AWS hosting", "Google Cloud" — không phải phân khúc
- Keyword không liên quan: forex, trading, game (tránh pha loãng topical authority)
- Keyword quốc tế: "best hosting 2026" tiếng Anh — không phải thị trường target

---

## Checklist hàng tuần

- [ ] Review Google Search Console — keyword nào đang lên
- [ ] Submit URL mới qua Google Indexing API
- [ ] Check Core Web Vitals
- [ ] Publish 2-3 blog posts
- [ ] Update sitemap nếu có trang mới
- [ ] Monitor đối thủ (Azdigi blog, Tenten)
