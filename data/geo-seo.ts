// ============================================================
// GEO SEO DATA — Hệ thống landing page theo tỉnh/thành phố
// Target: "hosting [city]", "mua hosting tại [city]", etc.
// ============================================================

export interface GeoLocation {
  slug: string;
  name: string;
  nameShort: string;      // tên ngắn cho title
  region: 'south' | 'north' | 'central';
  tier: 1 | 2 | 3;
  population: string;     // dân số ước tính
  businesses: string;     // số doanh nghiệp hoạt động
  techHub: boolean;
  description: string;    // mô tả ngắn cho meta description
  localKeywords: string[];
  nearbyAreas: string[];  // khu vực lân cận
  specialFeatures: string[]; // đặc điểm kinh tế nổi bật
}

export const geoLocations: GeoLocation[] = [
  // ====== TIER 1 — Thành phố lớn nhất ======
  {
    slug: 'hosting-tphcm',
    name: 'TP. Hồ Chí Minh',
    nameShort: 'TP.HCM',
    region: 'south',
    tier: 1,
    population: '10 triệu',
    businesses: '500.000+',
    techHub: true,
    description: 'Dịch vụ hosting tại TP.HCM — máy chủ đặt tại Việt Nam, hỗ trợ kỹ thuật 24/7, thanh toán VietQR. Hosting giá rẻ tốc độ cao cho doanh nghiệp Sài Gòn.',
    localKeywords: [
      'hosting tphcm', 'hosting sài gòn', 'mua hosting tại tphcm',
      'dịch vụ hosting tphcm', 'hosting giá rẻ tphcm', 'web hosting sài gòn',
      'hosting cho doanh nghiệp tphcm', 'vps tphcm', 'email doanh nghiệp tphcm',
      'thuê hosting tphcm', 'hosting wordpress tphcm',
    ],
    nearbyAreas: ['Bình Dương', 'Đồng Nai', 'Long An', 'Bà Rịa - Vũng Tàu'],
    specialFeatures: ['Trung tâm kinh tế lớn nhất Việt Nam', 'Hub công nghệ & startup', 'Thương mại điện tử sôi động nhất', 'Khu công nghệ cao TP.HCM'],
  },
  {
    slug: 'hosting-ha-noi',
    name: 'Hà Nội',
    nameShort: 'Hà Nội',
    region: 'north',
    tier: 1,
    population: '8,5 triệu',
    businesses: '400.000+',
    techHub: true,
    description: 'Dịch vụ hosting tại Hà Nội — server Việt Nam tốc độ cao, uptime 99.9%, hỗ trợ tiếng Việt 24/7. Hosting cho doanh nghiệp thủ đô.',
    localKeywords: [
      'hosting hà nội', 'mua hosting tại hà nội', 'hosting giá rẻ hà nội',
      'dịch vụ hosting hà nội', 'web hosting hà nội', 'vps hà nội',
      'hosting cho doanh nghiệp hà nội', 'email doanh nghiệp hà nội',
      'thuê hosting hà nội', 'hosting wordpress hà nội',
    ],
    nearbyAreas: ['Bắc Ninh', 'Hưng Yên', 'Hải Dương', 'Vĩnh Phúc'],
    specialFeatures: ['Thủ đô — trung tâm hành chính quốc gia', 'Cụm CNTT Cầu Giấy - Hoàng Mai', 'Khu CNC Hòa Lạc', 'Đông đảo cơ quan nhà nước & doanh nghiệp'],
  },

  // ====== TIER 2 — Thành phố phát triển ======
  {
    slug: 'hosting-da-nang',
    name: 'Đà Nẵng',
    nameShort: 'Đà Nẵng',
    region: 'central',
    tier: 2,
    population: '1,2 triệu',
    businesses: '35.000+',
    techHub: true,
    description: 'Hosting Đà Nẵng — giải pháp hosting tốc độ cao cho doanh nghiệp miền Trung. Server Việt Nam, SSD NVMe, hỗ trợ 24/7.',
    localKeywords: [
      'hosting đà nẵng', 'mua hosting tại đà nẵng', 'hosting giá rẻ đà nẵng',
      'dịch vụ hosting đà nẵng', 'web hosting đà nẵng', 'vps đà nẵng',
      'hosting cho doanh nghiệp đà nẵng', 'hosting miền trung',
    ],
    nearbyAreas: ['Huế', 'Quảng Nam', 'Quảng Ngãi'],
    specialFeatures: ['Thành phố đáng sống nhất Việt Nam', 'Smart City tiên phong', 'Hub du lịch miền Trung', 'Khu CNTT tập trung Đà Nẵng'],
  },
  {
    slug: 'hosting-binh-duong',
    name: 'Bình Dương',
    nameShort: 'Bình Dương',
    region: 'south',
    tier: 2,
    population: '2,6 triệu',
    businesses: '60.000+',
    techHub: false,
    description: 'Hosting Bình Dương — hosting giá rẻ tốc độ cao cho doanh nghiệp sản xuất & thương mại. SSD NVMe, uptime 99.9%.',
    localKeywords: [
      'hosting bình dương', 'mua hosting tại bình dương', 'hosting giá rẻ bình dương',
      'dịch vụ hosting bình dương', 'web hosting bình dương',
      'hosting cho công ty bình dương',
    ],
    nearbyAreas: ['TP.HCM', 'Đồng Nai', 'Tây Ninh'],
    specialFeatures: ['Trung tâm công nghiệp lớn nhất miền Nam', 'Thành phố mới Bình Dương', 'Khu công nghiệp VSIP', 'FDI cao nhất Đông Nam Bộ'],
  },
  {
    slug: 'hosting-dong-nai',
    name: 'Đồng Nai',
    nameShort: 'Đồng Nai',
    region: 'south',
    tier: 2,
    population: '3,2 triệu',
    businesses: '45.000+',
    techHub: false,
    description: 'Hosting Đồng Nai — dịch vụ hosting cho doanh nghiệp khu vực Biên Hòa & Đồng Nai. Giá rẻ, tốc độ cao.',
    localKeywords: [
      'hosting đồng nai', 'hosting biên hòa', 'mua hosting tại đồng nai',
      'dịch vụ hosting đồng nai', 'hosting giá rẻ đồng nai',
    ],
    nearbyAreas: ['TP.HCM', 'Bình Dương', 'Bà Rịa - Vũng Tàu'],
    specialFeatures: ['Khu công nghiệp Amata, Nhơn Trạch', 'Sân bay Long Thành sắp vận hành', 'Cửa ngõ kinh tế Đông Nam Bộ'],
  },

  // ====== TIER 3 — Thành phố vùng ======
  {
    slug: 'hosting-can-tho',
    name: 'Cần Thơ',
    nameShort: 'Cần Thơ',
    region: 'south',
    tier: 3,
    population: '1,3 triệu',
    businesses: '20.000+',
    techHub: false,
    description: 'Hosting Cần Thơ — hosting cho doanh nghiệp Đồng bằng Sông Cửu Long. Giá rẻ, server Việt Nam, hỗ trợ 24/7.',
    localKeywords: [
      'hosting cần thơ', 'mua hosting tại cần thơ', 'hosting giá rẻ cần thơ',
      'hosting miền tây', 'dịch vụ hosting cần thơ',
    ],
    nearbyAreas: ['An Giang', 'Kiên Giang', 'Vĩnh Long', 'Đồng Tháp'],
    specialFeatures: ['Trung tâm kinh tế Đồng bằng Sông Cửu Long', 'Hub thương mại nông sản', 'Đại học Cần Thơ — trung tâm giáo dục miền Tây'],
  },
  {
    slug: 'hosting-hai-phong',
    name: 'Hải Phòng',
    nameShort: 'Hải Phòng',
    region: 'north',
    tier: 3,
    population: '2,1 triệu',
    businesses: '30.000+',
    techHub: false,
    description: 'Hosting Hải Phòng — hosting tốc độ cao cho doanh nghiệp cảng biển & logistics. Server Việt Nam, NVMe.',
    localKeywords: [
      'hosting hải phòng', 'mua hosting tại hải phòng', 'hosting giá rẻ hải phòng',
      'dịch vụ hosting hải phòng', 'web hosting hải phòng',
    ],
    nearbyAreas: ['Quảng Ninh', 'Hải Dương', 'Thái Bình'],
    specialFeatures: ['Cảng biển lớn nhất miền Bắc', 'Khu kinh tế Đình Vũ - Cát Hải', 'Trung tâm logistics phía Bắc'],
  },
  {
    slug: 'hosting-bac-ninh',
    name: 'Bắc Ninh',
    nameShort: 'Bắc Ninh',
    region: 'north',
    tier: 3,
    population: '1,4 triệu',
    businesses: '15.000+',
    techHub: true,
    description: 'Hosting Bắc Ninh — hosting cho doanh nghiệp FDI & công nghệ tại Bắc Ninh. Tốc độ cao, giá rẻ.',
    localKeywords: [
      'hosting bắc ninh', 'mua hosting tại bắc ninh', 'hosting giá rẻ bắc ninh',
      'dịch vụ hosting bắc ninh',
    ],
    nearbyAreas: ['Hà Nội', 'Hưng Yên', 'Hải Dương', 'Bắc Giang'],
    specialFeatures: ['Hub Samsung & CNTT lớn nhất Đông Nam Á', 'GDP/đầu người cao nhất miền Bắc', 'Khu công nghiệp Yên Phong, Quế Võ'],
  },
  {
    slug: 'hosting-khanh-hoa',
    name: 'Khánh Hòa',
    nameShort: 'Nha Trang',
    region: 'central',
    tier: 3,
    population: '1,2 triệu',
    businesses: '15.000+',
    techHub: false,
    description: 'Hosting Nha Trang, Khánh Hòa — hosting cho khách sạn, resort, du lịch. Website tốc độ cao, hỗ trợ 24/7.',
    localKeywords: [
      'hosting nha trang', 'hosting khánh hòa', 'mua hosting nha trang',
      'hosting cho khách sạn', 'hosting du lịch nha trang',
      'website khách sạn nha trang',
    ],
    nearbyAreas: ['Phú Yên', 'Ninh Thuận', 'Đắk Lắk'],
    specialFeatures: ['Thủ đô du lịch biển Việt Nam', 'Hàng ngàn khách sạn, resort cần website', 'Kinh tế du lịch phát triển mạnh'],
  },
  {
    slug: 'hosting-nghe-an',
    name: 'Nghệ An',
    nameShort: 'Nghệ An',
    region: 'central',
    tier: 3,
    population: '3,3 triệu',
    businesses: '20.000+',
    techHub: false,
    description: 'Hosting Nghệ An — hosting giá rẻ cho doanh nghiệp Bắc Trung Bộ. Server Việt Nam, SSD NVMe, hỗ trợ 24/7.',
    localKeywords: [
      'hosting nghệ an', 'hosting vinh', 'mua hosting tại nghệ an',
      'hosting giá rẻ nghệ an', 'dịch vụ hosting vinh',
    ],
    nearbyAreas: ['Hà Tĩnh', 'Thanh Hóa'],
    specialFeatures: ['Tỉnh đông dân nhất Bắc Trung Bộ', 'Thành phố Vinh đang phát triển nhanh', 'Cửa khẩu quốc tế Nậm Cắn'],
  },
  {
    slug: 'hosting-quang-ninh',
    name: 'Quảng Ninh',
    nameShort: 'Quảng Ninh',
    region: 'north',
    tier: 3,
    population: '1,3 triệu',
    businesses: '15.000+',
    techHub: false,
    description: 'Hosting Quảng Ninh — hosting cho du lịch Hạ Long, doanh nghiệp biên giới. Tốc độ cao, giá rẻ.',
    localKeywords: [
      'hosting quảng ninh', 'hosting hạ long', 'mua hosting quảng ninh',
      'hosting du lịch hạ long', 'hosting cho khách sạn hạ long',
    ],
    nearbyAreas: ['Hải Phòng', 'Lạng Sơn', 'Bắc Giang'],
    specialFeatures: ['Di sản Vịnh Hạ Long — du lịch quốc tế', 'Cửa khẩu Móng Cái', 'Khu kinh tế Vân Đồn'],
  },
  {
    slug: 'hosting-thanh-hoa',
    name: 'Thanh Hóa',
    nameShort: 'Thanh Hóa',
    region: 'central',
    tier: 3,
    population: '3,6 triệu',
    businesses: '25.000+',
    techHub: false,
    description: 'Hosting Thanh Hóa — hosting giá rẻ cho doanh nghiệp tỉnh đông dân. Server Việt Nam, hỗ trợ kỹ thuật 24/7.',
    localKeywords: [
      'hosting thanh hóa', 'mua hosting tại thanh hóa', 'hosting giá rẻ thanh hóa',
      'dịch vụ hosting thanh hóa',
    ],
    nearbyAreas: ['Nghệ An', 'Ninh Bình', 'Hòa Bình'],
    specialFeatures: ['Tỉnh đông dân thứ 3 Việt Nam', 'Khu kinh tế Nghi Sơn', 'Du lịch biển Sầm Sơn'],
  },
  {
    slug: 'hosting-hue',
    name: 'Thừa Thiên Huế',
    nameShort: 'Huế',
    region: 'central',
    tier: 3,
    population: '1,1 triệu',
    businesses: '12.000+',
    techHub: false,
    description: 'Hosting Huế — hosting cho doanh nghiệp, du lịch văn hóa cố đô. Giá rẻ, tốc độ cao, hỗ trợ 24/7.',
    localKeywords: [
      'hosting huế', 'mua hosting tại huế', 'hosting giá rẻ huế',
      'dịch vụ hosting huế', 'hosting du lịch huế',
    ],
    nearbyAreas: ['Đà Nẵng', 'Quảng Trị'],
    specialFeatures: ['Cố đô — di sản UNESCO', 'Trung tâm giáo dục miền Trung (Đại học Huế)', 'Du lịch văn hóa phát triển'],
  },
  {
    slug: 'hosting-lam-dong',
    name: 'Lâm Đồng',
    nameShort: 'Đà Lạt',
    region: 'central',
    tier: 3,
    population: '1,3 triệu',
    businesses: '12.000+',
    techHub: false,
    description: 'Hosting Đà Lạt, Lâm Đồng — hosting cho homestay, du lịch, nông nghiệp công nghệ cao. Giá rẻ, tốc độ cao.',
    localKeywords: [
      'hosting đà lạt', 'hosting lâm đồng', 'mua hosting đà lạt',
      'hosting cho homestay đà lạt', 'website du lịch đà lạt',
    ],
    nearbyAreas: ['Đắk Lắk', 'Đắk Nông', 'Bình Thuận', 'Ninh Thuận'],
    specialFeatures: ['Thủ phủ du lịch Tây Nguyên', 'Hàng ngàn homestay cần website', 'Nông nghiệp công nghệ cao'],
  },
  {
    slug: 'hosting-phu-quoc',
    name: 'Phú Quốc',
    nameShort: 'Phú Quốc',
    region: 'south',
    tier: 3,
    population: '200.000',
    businesses: '5.000+',
    techHub: false,
    description: 'Hosting Phú Quốc — hosting cho resort, khách sạn, tour du lịch Phú Quốc. Website tốc độ cao, hỗ trợ 24/7.',
    localKeywords: [
      'hosting phú quốc', 'mua hosting phú quốc', 'website khách sạn phú quốc',
      'hosting cho resort phú quốc', 'hosting du lịch phú quốc',
    ],
    nearbyAreas: ['Kiên Giang', 'Cần Thơ'],
    specialFeatures: ['Đặc khu kinh tế du lịch', 'Resort & khách sạn 5 sao', 'Du lịch quốc tế đang bùng nổ'],
  },
];

// Helper: lấy tất cả slug cho generateStaticParams
export function getAllGeoSlugs(): string[] {
  return geoLocations.map(loc => loc.slug);
}

// Helper: tìm location theo slug
export function getGeoBySlug(slug: string): GeoLocation | undefined {
  return geoLocations.find(loc => loc.slug === slug);
}

// Helper: lấy locations theo tier
export function getGeoByTier(tier: 1 | 2 | 3): GeoLocation[] {
  return geoLocations.filter(loc => loc.tier === tier);
}

// Helper: lấy locations theo region
export function getGeoByRegion(region: 'south' | 'north' | 'central'): GeoLocation[] {
  return geoLocations.filter(loc => loc.region === region);
}

// ============================================================
// SEO CONTENT cho từng geo page
// ============================================================
export function generateGeoArticle(loc: GeoLocation): string {
  return `
<h2>Hosting tại ${loc.name} — Giải pháp web hosting tốc độ cao cho doanh nghiệp</h2>
<p>Bạn đang tìm kiếm dịch vụ <strong>hosting tại ${loc.name}</strong>? VMST Host cung cấp giải pháp hosting giá rẻ tốc độ cao, phục vụ hơn <strong>${loc.businesses} doanh nghiệp</strong> đang hoạt động tại ${loc.name} và khu vực lân cận ${loc.nearbyAreas.join(', ')}.</p>

<h3>Tại sao doanh nghiệp ${loc.nameShort} cần hosting chất lượng?</h3>
<p>${loc.name} với dân số <strong>${loc.population} người</strong> là một trong những thị trường sôi động nhất Việt Nam. ${loc.specialFeatures[0]}. Doanh nghiệp tại đây cần website tải nhanh, ổn định để phục vụ khách hàng trực tuyến ngày càng tăng.</p>

<h3>VMST Host — Lựa chọn hosting hàng đầu cho ${loc.nameShort}</h3>
<ul>
<li><strong>Server đặt tại Việt Nam</strong> — Tốc độ truy cập nhanh nhất cho người dùng tại ${loc.name} và ${loc.nearbyAreas[0]}</li>
<li><strong>SSD NVMe + OpenLiteSpeed</strong> — Tốc độ tải trang dưới 1 giây, TTFB < 200ms</li>
<li><strong>Uptime 99.9%</strong> — Website luôn hoạt động, không lo mất khách</li>
<li><strong>Hỗ trợ kỹ thuật 24/7</strong> — Đội ngũ Việt Nam, phản hồi trong 15 phút</li>
<li><strong>Thanh toán VietQR</strong> — Chuyển khoản ngân hàng Việt Nam, không cần thẻ quốc tế</li>
<li><strong>Giá từ 29.000đ/tháng</strong> — Phù hợp mọi quy mô doanh nghiệp</li>
</ul>

<h3>Gói hosting phù hợp cho doanh nghiệp ${loc.nameShort}</h3>
<p>Tùy theo nhu cầu, doanh nghiệp tại ${loc.name} có thể chọn:</p>
<ul>
<li><strong>WordPress Hosting</strong> — Cho website giới thiệu công ty, blog, landing page. Giá từ 29.000đ/tháng</li>
<li><strong>Business Hosting</strong> — Cho website bán hàng, thương mại điện tử, ứng dụng doanh nghiệp. VPS Cloud NVMe</li>
<li><strong>Email Hosting</strong> — Email theo tên miền riêng (email@congty.vn), chuyên nghiệp và bảo mật</li>
</ul>

${loc.techHub ? `
<h3>${loc.nameShort} — Trung tâm công nghệ</h3>
<p>${loc.specialFeatures.join('. ')}. Với hệ sinh thái công nghệ phát triển, nhu cầu hosting chất lượng cao tại ${loc.nameShort} ngày càng tăng. VMST Host tự hào đồng hành cùng các startup, doanh nghiệp công nghệ và freelancer tại đây.</p>
` : `
<h3>Kinh tế ${loc.nameShort} đang phát triển mạnh</h3>
<p>${loc.specialFeatures.join('. ')}. Doanh nghiệp tại ${loc.nameShort} đang chuyển đổi số mạnh mẽ, và website chính là bộ mặt online của doanh nghiệp. VMST Host giúp bạn có website tải nhanh, chuyên nghiệp với chi phí tối ưu.</p>
`}

<h3>Hỗ trợ doanh nghiệp ${loc.nameShort} chuyển đổi số</h3>
<p>VMST Host không chỉ cung cấp hosting, mà còn hỗ trợ doanh nghiệp ${loc.name}:</p>
<ul>
<li>Tư vấn chọn gói hosting phù hợp — miễn phí</li>
<li>Hỗ trợ di chuyển website từ hosting cũ — miễn phí</li>
<li>Cài đặt SSL, WordPress, email — miễn phí</li>
<li>Backup tự động hàng ngày — an toàn dữ liệu</li>
</ul>

<p>Đừng để website chậm làm mất khách hàng. <strong>Đăng ký hosting tại VMST Host ngay</strong> và trải nghiệm sự khác biệt về tốc độ và chất lượng dịch vụ!</p>
`.trim();
}

export function generateGeoFAQs(loc: GeoLocation): { q: string; a: string }[] {
  return [
    {
      q: `VMST Host có văn phòng tại ${loc.name} không?`,
      a: `VMST Host hoạt động online toàn quốc với trụ sở chính tại TP.HCM. Doanh nghiệp tại ${loc.name} được hỗ trợ kỹ thuật 24/7 qua chat, hotline và email. Server đặt tại Việt Nam đảm bảo tốc độ truy cập nhanh nhất cho người dùng ${loc.nameShort}.`,
    },
    {
      q: `Hosting VMST Host có nhanh cho người truy cập từ ${loc.nameShort} không?`,
      a: `Có! Server VMST Host đặt tại data center Việt Nam (Viettel IDC, FPT IDC), kết nối trực tiếp với tất cả nhà mạng. Người dùng tại ${loc.name} truy cập website với tốc độ TTFB dưới 200ms, tải trang dưới 1 giây.`,
    },
    {
      q: `Doanh nghiệp ${loc.nameShort} thanh toán hosting bằng cách nào?`,
      a: `VMST Host hỗ trợ thanh toán qua VietQR (quét mã QR chuyển khoản), chuyển khoản ngân hàng Vietcombank, và các phương thức thanh toán nội địa. Không cần thẻ quốc tế hay PayPal.`,
    },
    {
      q: `Gói hosting nào phù hợp cho doanh nghiệp nhỏ tại ${loc.name}?`,
      a: `Doanh nghiệp nhỏ tại ${loc.name} nên bắt đầu với gói WordPress Hosting từ 29.000đ/tháng — đủ cho website giới thiệu công ty, blog, portfolio. Khi phát triển, có thể nâng cấp lên Business Hosting hoặc VPS dễ dàng.`,
    },
    {
      q: `VMST Host có hỗ trợ di chuyển website cho doanh nghiệp ${loc.nameShort} không?`,
      a: `Có! VMST Host hỗ trợ di chuyển website miễn phí từ bất kỳ nhà cung cấp hosting nào. Đội ngũ kỹ thuật sẽ chuyển toàn bộ dữ liệu, database, email mà không gây downtime cho website của bạn.`,
    },
    {
      q: `Hosting VMST Host có phù hợp cho website bán hàng tại ${loc.name} không?`,
      a: `Hoàn toàn phù hợp! Với SSD NVMe, OpenLiteSpeed và CloudLinux, hosting VMST Host đảm bảo website bán hàng tải nhanh, xử lý được nhiều đơn hàng cùng lúc. Nhiều shop online tại ${loc.name} đã tin dùng VMST Host.`,
    },
  ];
}
