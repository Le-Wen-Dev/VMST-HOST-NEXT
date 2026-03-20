/**
 * Generate moTa (ContentBlock JSON) cho từng sản phẩm — v2
 *
 * Cải tiến so với v1:
 * - Internal links: <a href="/category-slug">keyword</a> trong paragraph/list
 * - Semantic keywords tự nhiên trong content
 * - CTA section với keyword
 * - FAQ section (2-3 câu hỏi) per product
 *
 * Input:  SEO /data/products-export.json
 * Output: SEO /data/products-mota.json
 * Usage:  node "SEO /scripts/generate-mota.mjs"
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const INPUT_PATH = join(__dirname, "..", "data", "products-export.json");
const OUTPUT_PATH = join(__dirname, "..", "data", "products-mota.json");

let blockCounter = 0;
function bid() { return `blk_${Date.now()}_${++blockCounter}`; }
function h2(text) { return { id: bid(), type: "heading", data: { text, level: 2 } }; }
function h3(text) { return { id: bid(), type: "heading", data: { text, level: 3 } }; }
function p(text) { return { id: bid(), type: "paragraph", data: { text } }; }
function ul(items) { return { id: bid(), type: "list", data: { style: "unordered", items } }; }
function ol(items) { return { id: bid(), type: "list", data: { style: "ordered", items } }; }
function divider() { return { id: bid(), type: "divider", data: {} }; }

// === INTERNAL LINK HELPER ===
// Returns HTML <a> tag for internal linking within content
function link(href, text) { return `<a href="${href}">${text}</a>`; }

// Category slug → display label + URL
const CAT_LINKS = {
  "gong-kinh": { label: "gọng kính", url: "/gong-kinh" },
  "gong-kinh-nhua": { label: "gọng kính nhựa", url: "/gong-kinh-nhua" },
  "gong-kinh-kim-loai": { label: "gọng kính kim loại", url: "/gong-kinh-kim-loai" },
  "gong-kinh-titan": { label: "gọng kính titan", url: "/gong-kinh-titan" },
  "gong-kinh-cho-dan-van-phong": { label: "kính cận cho dân văn phòng", url: "/gong-kinh-cho-dan-van-phong" },
  "kinh-mat": { label: "kính mát", url: "/kinh-mat" },
  "trong-kinh": { label: "tròng kính", url: "/trong-kinh" },
  "phu-kien-kinh": { label: "phụ kiện kính", url: "/phu-kien-kinh" },
};

// Helper: link to a category (excludes self)
function catLink(slug) {
  const c = CAT_LINKS[slug];
  return c ? link(c.url, c.label) : slug;
}

// Helper: link to a specific product (needs category slug)
function productLink(catSlug, slug, text) { return link(`/${catSlug}/${slug}`, text); }

// === MAPPING TABLES ===
const MAT = { acetate: "nhựa Acetate", metal: "kim loại", mixed: "nhựa phối kim loại", titanium: "titan", tr90: "nhựa TR90" };
const DANG = { square: "vuông", round: "tròn", "cat-eye": "mắt mèo", oval: "oval", polygon: "đa giác", butterfly: "cánh bướm", aviator: "phi công", rectangle: "chữ nhật", browline: "browline" };
const GT = { men: "nam", women: "nữ", unisex: "nam nữ (unisex)" };
const GT_SHORT = { men: "nam", women: "nữ", unisex: "unisex" };

// Keyword pools — mỗi sản phẩm pick 1-2 keyword từ pool phù hợp
const KW_POOLS = {
  "gong-kinh": [
    "gọng kính cận giá rẻ", "mua gọng kính online", "gọng kính đẹp",
    "gọng kính cận nam đẹp", "gọng kính cận nữ", "gọng kính thời trang",
    "mua kính cận online uy tín", "kính cận giá rẻ", "gọng kính cho mặt tròn",
    "gọng kính cho mặt vuông", "kính cận đổi màu", "kính cận chống ánh sáng xanh",
    "mua kính online giá rẻ", "kính cận dưới 300k", "gọng kính nam cao cấp",
    "kính cận phong cách hàn quốc", "gọng kính tròn giá rẻ", "gọng kính vuông giá rẻ",
    "gọng kính mắt mèo giá rẻ", "kính cận nhẹ đeo cả ngày"
  ],
  "gong-kinh-nhua": [
    "gọng kính nhựa giá rẻ", "kính cận gọng nhựa giá rẻ", "gọng kính nhựa bền",
    "gọng kính nhựa nhẹ", "gọng kính nhựa cao cấp"
  ],
  "gong-kinh-kim-loai": [
    "gọng kính kim loại giá rẻ", "kính cận gọng kim loại", "gọng kính kim loại mảnh",
    "gọng kính kim loại cao cấp", "gọng kính kim loại nhẹ"
  ],
  "gong-kinh-titan": [
    "gọng kính titan", "gọng kính titan giá rẻ", "gọng kính titan siêu nhẹ",
    "mắt kính titan", "gọng kính titan cao cấp"
  ],
  "gong-kinh-cho-dan-van-phong": [
    "kính cận cho dân văn phòng", "kính cận chống mỏi mắt", "kính chống ánh sáng xanh cho văn phòng",
    "kính cận cho người làm máy tính", "kính cận cho người ngồi máy nhiều",
    "kính cận văn phòng giá rẻ", "kính cận cho người làm it",
    "kính cận nhẹ đeo cả ngày", "kính cận đeo hàng ngày", "kính lọc ánh sáng xanh",
    "kính cận cho người đi làm giá rẻ", "kính cận cho người làm việc online",
    "kính cận cho người dùng laptop", "mua kính cận online cho văn phòng",
    "kính cận cho người hay đau đầu", "kính cận cho người đeo lâu"
  ],
  "kinh-mat": [
    "kính mát giá rẻ", "kính mát nam giá rẻ", "kính mát nữ giá rẻ",
    "kính râm", "kính mát chống UV", "kính mát phân cực",
    "kính mát thời trang", "mua kính mát online"
  ],
  "trong-kinh": [
    "tròng kính cận", "tròng kính chống ánh sáng xanh", "tròng kính đổi màu",
    "giá tròng kính cận", "tròng kính essilor", "tròng kính cận đổi màu",
    "tròng kính hoya", "tròng kính cận siêu mỏng"
  ],
  "phu-kien-kinh": [
    "phụ kiện kính mắt", "hộp đựng kính", "khăn lau kính",
    "nước rửa kính", "đệm mũi kính"
  ]
};

// Face shape recommendations by hinhDang
const FACE_MATCH = {
  square: "mặt tròn, mặt oval",
  round: "mặt vuông, mặt dài, mặt trái xoan",
  "cat-eye": "mặt tròn, mặt trái tim, mặt oval",
  oval: "mặt vuông, mặt tròn",
  polygon: "mặt oval, mặt tròn, mặt dài",
  butterfly: "mặt tròn, mặt trái tim",
  aviator: "mặt vuông, mặt oval",
  rectangle: "mặt tròn, mặt oval",
  browline: "mặt dài, mặt trái xoan"
};

// === CROSS-LINK CATEGORIES (for internal linking to other categories) ===
function getRelatedCatLinks(currentCat) {
  // Return 2-3 related category links (excluding current)
  const all = Object.keys(CAT_LINKS).filter(k => k !== currentCat);
  const related = [];
  // Always include trong-kinh for frame categories
  if (currentCat !== "trong-kinh" && currentCat !== "phu-kien-kinh") {
    related.push("trong-kinh");
  }
  // Add complementary categories
  if (currentCat.includes("gong-kinh")) {
    if (currentCat !== "gong-kinh-nhua") related.push("gong-kinh-nhua");
    else related.push("gong-kinh-kim-loai");
    if (!related.includes("gong-kinh-cho-dan-van-phong") && currentCat !== "gong-kinh-cho-dan-van-phong") {
      related.push("gong-kinh-cho-dan-van-phong");
    }
  }
  if (currentCat === "trong-kinh") {
    related.push("gong-kinh", "gong-kinh-nhua");
  }
  if (currentCat === "phu-kien-kinh") {
    related.push("gong-kinh", "trong-kinh");
  }
  return related.slice(0, 3);
}

// === CONTENT GENERATORS ===

function pickKeywords(cat, index) {
  const pool = KW_POOLS[cat] || KW_POOLS["gong-kinh"];
  const kw1 = pool[index % pool.length];
  const kw2 = pool[(index + 3) % pool.length];
  return [kw1, kw2];
}

function fmtPrice(n) { return n ? n.toLocaleString("vi-VN") + "đ" : "liên hệ"; }

function specsText(pr) {
  if (!pr.chieuRongTrong) return null;
  return `${pr.chieuRongTrong}mm (rộng tròng) – ${pr.chieuRongCau}mm (cầu mũi) – ${pr.chieuDaiGong}mm (càng kính)`;
}

// === FAQ GENERATORS BY CATEGORY ===

function generateFrameFAQ(pr, code, mat, dang, gt, face, price, cat) {
  const faqs = [];

  // Pool of FAQ templates — pick 3 based on index
  const allFAQs = [
    {
      q: `${code} có phù hợp với mặt tròn không?`,
      a: `${code} có kiểu dáng ${dang}, ${face.includes("mặt tròn") ? "rất phù hợp" : "có thể phù hợp"} với mặt tròn. Nếu bạn chưa chắc, hãy inbox Milan Eyewear để được tư vấn miễn phí.`
    },
    {
      q: `Gọng kính ${code} có bền không?`,
      a: `${code} sử dụng chất liệu ${mat}, có độ bền cao và chịu được va đập nhẹ. Milan Eyewear bảo hành gọng 12 tháng, đổi trả miễn phí 30 ngày.`
    },
    {
      q: `${code} lắp được tròng cận không?`,
      a: `Hoàn toàn được. ${code} lắp được tất cả loại ${catLink("trong-kinh")}: tròng cận thường, tròng chống ánh sáng xanh, tròng đổi màu. Milan Eyewear hỗ trợ cắt lắp theo đơn thuốc.`
    },
    {
      q: `Mua ${code} online có được đổi trả không?`,
      a: `Có. Milan Eyewear hỗ trợ đổi trả miễn phí trong 30 ngày nếu sản phẩm không vừa ý. Freeship cả chiều đi lẫn chiều về.`
    },
    {
      q: `${code} giá bao nhiêu?`,
      a: `${code} có giá chỉ ${price} (chưa bao gồm tròng kính). Bạn có thể mua kèm ${catLink("trong-kinh")} với giá từ 150.000đ.`
    },
    {
      q: `${code} phù hợp cho ${gt === "nam nữ (unisex)" ? "cả nam và nữ" : gt} không?`,
      a: `Đúng, ${code} được thiết kế dành cho ${gt}. Kiểu dáng ${dang} phù hợp với ${face}.`
    },
    {
      q: `Nên chọn ${code} hay gọng kính khác?`,
      a: `${code} nổi bật với chất liệu ${mat} bền nhẹ, kiểu dáng ${dang} phù hợp ${face}. Nếu bạn thích chất liệu khác, có thể xem thêm ${catLink("gong-kinh-kim-loai")} hoặc ${catLink("gong-kinh-nhua")}.`
    },
  ];

  // Pick 3 FAQs based on product index to ensure variety
  const hash = simpleHash(pr.id);
  const indices = [hash % allFAQs.length, (hash + 2) % allFAQs.length, (hash + 4) % allFAQs.length];
  // Deduplicate indices
  const seen = new Set();
  for (const i of indices) {
    if (!seen.has(i) && faqs.length < 3) {
      seen.add(i);
      faqs.push(allFAQs[i]);
    }
  }
  // Fill if needed
  for (let i = 0; faqs.length < 3 && i < allFAQs.length; i++) {
    if (!seen.has(i)) { seen.add(i); faqs.push(allFAQs[i]); }
  }

  return faqs.slice(0, 3);
}

function generateLensFAQ(pr, code, price) {
  const name = pr.tenSanPham;
  const faqs = [
    {
      q: `${code} có phù hợp với mọi loại gọng không?`,
      a: `Có. Tròng ${code} có thể lắp vào hầu hết các loại ${catLink("gong-kinh")} tại Milan Eyewear. Đội ngũ kỹ thuật sẽ cắt lắp chuẩn xác theo gọng bạn chọn.`
    },
    {
      q: `Tròng ${code} giá bao nhiêu?`,
      a: `Tròng ${code} có giá từ ${price}, bao gồm cắt lắp theo đơn thuốc. Giá có thể thay đổi tùy chiết suất và tính năng bổ sung.`
    },
  ];
  if (name.includes("Đổi Màu") || name.includes("đổi màu")) {
    faqs.push({ q: `Tròng đổi màu ${code} đổi nhanh không?`, a: `Tròng đổi màu ${code} chuyển sắc trong 10-15 giây khi ra nắng, trở lại trong suốt trong 1-2 phút khi vào nhà. Tiện lợi thay thế cả kính cận lẫn ${catLink("kinh-mat")}.` });
  } else if (name.includes("Blue") || name.includes("Sáng Xanh")) {
    faqs.push({ q: `Tròng chống ánh sáng xanh ${code} có hiệu quả không?`, a: `Có. Tròng ${code} lọc được 30-40% ánh sáng xanh từ màn hình, giảm mỏi mắt khi làm việc máy tính. Đặc biệt phù hợp cho ${catLink("gong-kinh-cho-dan-van-phong")}.` });
  } else {
    faqs.push({ q: `Nên chọn chiết suất nào cho tròng ${code}?`, a: `Tùy mức độ cận: dưới 3 độ chọn 1.56, 3-5 độ chọn 1.61, 5-8 độ chọn 1.67, trên 8 độ chọn 1.74. Inbox Milan Eyewear để được tư vấn chi tiết.` });
  }
  return faqs;
}

function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// === FRAME CONTENT GENERATOR (with internal links + FAQ) ===

function generateFrameBlocks(pr, idx) {
  const code = pr.maSanPham;
  const mat = MAT[pr.chatLieu] || pr.chatLieu;
  const dang = DANG[pr.hinhDang] || pr.hinhDang;
  const gt = GT[pr.gioiTinh] || "unisex";
  const gtShort = GT_SHORT[pr.gioiTinh] || "unisex";
  const face = FACE_MATCH[pr.hinhDang] || "nhiều dáng mặt";
  const cat = pr.categories[0]?.slug || "gong-kinh";
  const [kw1, kw2] = pickKeywords(cat, idx);
  const price = fmtPrice(pr.giaBan);
  const specs = specsText(pr);
  const relatedCats = getRelatedCatLinks(cat);

  const blocks = [];

  // --- Intro paragraph with internal links ---
  const introVariants = [
    `${pr.tenSanPham} là mẫu ${catLink(cat)} dáng ${dang} chất liệu ${mat} thiết kế dành cho ${gt}. Với kiểu dáng ${dang} hiện đại, ${code} phù hợp với người có ${face} — giúp tôn lên đường nét khuôn mặt một cách tự nhiên. Đây là lựa chọn lý tưởng cho ai đang tìm ${kw1} với chất lượng tốt.`,
    `Nếu bạn đang tìm ${kw1}, ${code} là gợi ý đáng cân nhắc. Mẫu ${catLink(cat)} dáng ${dang} ${mat} này được thiết kế cho ${gt}, phù hợp nhất với dáng ${face}. Kiểu dáng ${dang} vừa thời trang vừa dễ phối đồ hàng ngày.`,
    `${code} – mẫu ${catLink(cat)} dáng ${dang} ${mat} dành cho ${gt}. Thiết kế ${dang} thanh lịch, phù hợp với ${face}. Nếu bạn cần ${kw1} mà vẫn đảm bảo chất lượng, đây là lựa chọn hợp lý tại Milan Eyewear.`,
  ];
  blocks.push(p(introVariants[idx % introVariants.length]));

  // --- Specs section ---
  blocks.push(h2(`Thông số kỹ thuật ${code}`));
  const specItems = [
    `Chất liệu gọng: ${mat}`,
    `Kiểu dáng: ${dang}`,
    `Giới tính: ${gt}`,
    `Giá: ${price}`,
  ];
  if (specs) specItems.push(`Kích thước: ${specs}`);
  if (pr.giamGia > 0) specItems.push(`Giảm giá: ${pr.giamGia}% so với giá gốc ${fmtPrice(pr.giaGoc)}`);
  blocks.push(ul(specItems));

  // --- Why choose section with internal links ---
  blocks.push(h2(`Vì sao nên chọn ${code}?`));

  if (cat === "gong-kinh-cho-dan-van-phong") {
    blocks.push(p(`Dành riêng cho người làm việc văn phòng, ${code} được tối ưu để đeo thoải mái 8-10 tiếng liên tục. Gọng ${mat} nhẹ, không gây đau tai hay hằn sống mũi — đặc biệt phù hợp cho ai ngồi máy tính nhiều và cần ${kw2}. Kết hợp với ${catLink("trong-kinh")} chống ánh sáng xanh để bảo vệ mắt tối đa.`));
    blocks.push(ul([
      "Đeo cả ngày không mỏi tai, không hằn mũi",
      `Phù hợp lắp ${catLink("trong-kinh")} chống ánh sáng xanh, tròng đổi màu`,
      "Thiết kế thanh lịch, phù hợp môi trường công sở",
      `Giá chỉ ${price} — tiết kiệm cho sinh viên và người đi làm`,
    ]));
  } else if (cat.includes("nhua")) {
    blocks.push(p(`Gọng nhựa ${code} có trọng lượng siêu nhẹ, độ đàn hồi cao, không gây dị ứng da. Chất liệu ${mat} bền bỉ theo thời gian, chịu được va đập nhẹ mà không biến dạng. Nếu bạn thích chất liệu khác, xem thêm ${catLink("gong-kinh-kim-loai")} hoặc ${catLink("gong-kinh-titan")}.`));
    blocks.push(ul([
      "Siêu nhẹ — đeo cả ngày không mỏi",
      "Không gây dị ứng, an toàn cho da nhạy cảm",
      "Bền bỉ, chịu va đập tốt",
      `Giá chỉ ${price} — phù hợp ${kw2}`,
    ]));
  } else if (cat.includes("kim-loai") || cat.includes("titan")) {
    blocks.push(p(`Gọng ${mat} ${code} mang lại vẻ thanh lịch, sang trọng. Kim loại mảnh nhưng chắc chắn, phù hợp cho cả môi trường công sở lẫn đời thường. Nếu bạn ưu tiên gọng nhẹ hơn, xem thêm ${catLink("gong-kinh-nhua")}. Đặc biệt bền với khí hậu nóng ẩm Việt Nam.`));
    blocks.push(ul([
      "Thanh mảnh, sang trọng, phù hợp công sở",
      "Chống ăn mòn, bền với thời tiết nóng ẩm",
      "Nhẹ hơn gọng nhựa thông thường",
      `Giá chỉ ${price} — ${kw2}`,
    ]));
  } else {
    blocks.push(p(`${code} nổi bật với thiết kế ${dang} hiện đại, chất liệu ${mat} bền nhẹ. Phù hợp cho cả đi học, đi làm và dạo phố. Gọng có thể lắp ${catLink("trong-kinh")} cận, tròng đổi màu, hoặc tròng chống ánh sáng xanh theo nhu cầu.`));
    blocks.push(ul([
      `Kiểu dáng ${dang} — phù hợp ${face}`,
      `Chất liệu ${mat} bền nhẹ, đeo thoải mái`,
      `Lắp được ${catLink("trong-kinh")} cận, đổi màu, chống ánh sáng xanh`,
      `Giá chỉ ${price} — mua online giao nhanh toàn quốc`,
    ]));
  }

  // --- Face shape guide ---
  blocks.push(h2(`${code} hợp với dáng mặt nào?`));
  blocks.push(p(`Kiểu dáng ${dang} của ${code} phù hợp nhất với người có ${face}. Gọng ${dang} giúp cân bằng tỷ lệ khuôn mặt, tạo cảm giác hài hòa tự nhiên. Nếu bạn chưa chắc dáng mặt mình, hãy inbox Milan Eyewear để được tư vấn miễn phí.`));

  // --- Lens options with internal links ---
  blocks.push(h2("Các loại tròng kính có thể lắp"));
  blocks.push(p(`${code} tương thích với tất cả loại ${catLink("trong-kinh")} tại Milan Eyewear:`));
  blocks.push(ul([
    "Tròng cận/loạn thông thường — từ 150.000đ",
    "Tròng chống ánh sáng xanh (Blue Block) — từ 150.000đ",
    "Tròng đổi màu thông minh — từ 294.500đ",
    "Tròng Essilor/Rocky cao cấp — từ 480.000đ",
  ]));

  // --- FAQ section ---
  const faqs = generateFrameFAQ(pr, code, mat, dang, gt, face, price, cat);
  blocks.push(h2("Câu hỏi thường gặp"));
  for (const faq of faqs) {
    blocks.push(h3(faq.q));
    blocks.push(p(faq.a));
  }

  // --- CTA with keywords ---
  blocks.push(divider());
  blocks.push(h2(`Mua ${code} online — Giao hàng toàn quốc`));
  blocks.push(p(`Đặt mua ${pr.tenSanPham} ngay hôm nay với giá chỉ ${price}. Milan Eyewear hỗ trợ ${kw1} với bảo hành 12 tháng, đổi trả 30 ngày, freeship toàn quốc. Thanh toán COD hoặc chuyển khoản — nhận hàng kiểm tra trước khi thanh toán.`));

  // --- Policy + related categories ---
  blocks.push(h3("Chính sách mua hàng tại Milan Eyewear"));
  blocks.push(ul([
    "Bảo hành gọng 12 tháng",
    "Đổi trả miễn phí trong 30 ngày",
    "Freeship toàn quốc",
    "Hỗ trợ cắt tròng theo đơn thuốc",
    "Thanh toán COD hoặc chuyển khoản",
  ]));

  // --- Related categories for internal linking ---
  if (relatedCats.length > 0) {
    blocks.push(h3("Xem thêm sản phẩm liên quan"));
    blocks.push(ul(relatedCats.map(slug => catLink(slug))));
  }

  return blocks;
}

// === LENS CONTENT GENERATOR ===

function generateLensBlocks(pr, idx) {
  const code = pr.maSanPham;
  const price = fmtPrice(pr.giaBan);
  const [kw1] = pickKeywords("trong-kinh", idx);
  const name = pr.tenSanPham;
  const relatedCats = getRelatedCatLinks("trong-kinh");

  const blocks = [];

  blocks.push(p(`${name} — dòng ${catLink("trong-kinh")} chất lượng cao tại Milan Eyewear. Nếu bạn đang tìm ${kw1} với giá hợp lý, đây là lựa chọn đáng cân nhắc. Tròng được cắt lắp chuẩn xác theo đơn thuốc, phù hợp với mọi loại ${catLink("gong-kinh")}.`));

  blocks.push(h2(`Đặc điểm nổi bật của tròng ${code}`));
  const features = [];
  if (name.includes("Đổi Màu") || name.includes("đổi màu")) features.push(`Tự động đổi màu khi ra nắng — tiện lợi không cần mang thêm ${catLink("kinh-mat")}`);
  if (name.includes("Blue") || name.includes("Sáng Xanh") || name.includes("sáng xanh")) features.push(`Lọc ánh sáng xanh từ màn hình — giảm mỏi mắt, phù hợp ${catLink("gong-kinh-cho-dan-van-phong")}`);
  if (name.includes("UV") || name.includes("uv")) features.push("Chống tia UV bảo vệ mắt khỏi ánh nắng");
  if (name.includes("Essilor")) features.push("Thương hiệu Essilor (Pháp) — top 1 thế giới về tròng kính");
  if (name.includes("Rocky")) features.push("Thương hiệu Rocky — tròng kính Hàn Quốc chất lượng cao, giá hợp lý");
  if (name.includes("Nottica")) features.push("Thương hiệu Nottica — công nghệ tròng kính tiên tiến");
  if (name.includes("Chống Chói") || name.includes("chống chói")) features.push("Lớp phủ chống chói — tầm nhìn rõ nét khi lái xe ban đêm");
  features.push("Lớp phủ chống xước, chống bám bụi, dễ vệ sinh");
  features.push(`Giá: ${price} — bao gồm cắt lắp theo đơn thuốc`);
  blocks.push(ul(features));

  blocks.push(h2("Phù hợp với ai?"));
  blocks.push(ul([
    `Người làm việc văn phòng — kết hợp với ${catLink("gong-kinh-cho-dan-van-phong")}`,
    "Học sinh, sinh viên cần tròng kính bền, giá tốt",
    "Người cận/loạn muốn nâng cấp tròng kính chất lượng hơn",
    "Người thường xuyên ra ngoài trời (nếu chọn tròng đổi màu)",
  ]));

  blocks.push(h2("Các chiết suất có sẵn"));
  blocks.push(p("Tròng kính tại Milan Eyewear có nhiều chiết suất phù hợp với từng mức độ cận:"));
  blocks.push(ul([
    "1.56 — phù hợp cận nhẹ (dưới 3 độ)",
    "1.61 — phù hợp cận trung bình (3-5 độ)",
    "1.67 — phù hợp cận nặng (5-8 độ), tròng mỏng hơn",
    "1.74 — siêu mỏng, phù hợp cận rất nặng (trên 8 độ)",
  ]));

  // FAQ section
  const faqs = generateLensFAQ(pr, code, price);
  blocks.push(h2("Câu hỏi thường gặp"));
  for (const faq of faqs) {
    blocks.push(h3(faq.q));
    blocks.push(p(faq.a));
  }

  // CTA
  blocks.push(divider());
  blocks.push(h2(`Mua tròng ${code} online — Cắt lắp theo đơn thuốc`));
  blocks.push(p(`Đặt mua ${name} ngay với giá từ ${price}. Chọn kèm ${catLink("gong-kinh")} để được combo giá tốt. Bảo hành tròng 12 tháng, freeship toàn quốc.`));

  blocks.push(h3("Chính sách tròng kính tại Milan Eyewear"));
  blocks.push(ul([
    "Bảo hành tròng 12 tháng (bong tróc, trầy xước bất thường)",
    "Cắt lắp chuẩn xác theo đơn thuốc",
    "Hỗ trợ tư vấn chọn chiết suất phù hợp",
    "Freeship toàn quốc",
  ]));

  if (relatedCats.length > 0) {
    blocks.push(h3("Xem thêm sản phẩm liên quan"));
    blocks.push(ul(relatedCats.map(slug => catLink(slug))));
  }

  return blocks;
}

// === ACCESSORY CONTENT GENERATOR ===

function generateAccessoryBlocks(pr, idx) {
  const code = pr.maSanPham;
  const price = fmtPrice(pr.giaBan);
  const name = pr.tenSanPham;
  const relatedCats = getRelatedCatLinks("phu-kien-kinh");

  const blocks = [];

  blocks.push(p(`${name} — ${catLink("phu-kien-kinh")} chăm sóc kính mắt thiết yếu từ Milan Eyewear. Giúp bảo vệ và kéo dài tuổi thọ cho ${catLink("gong-kinh")} và ${catLink("kinh-mat")} của bạn. Giá chỉ ${price}.`));

  blocks.push(h2("Tại sao cần phụ kiện kính mắt?"));
  blocks.push(p("Kính mắt là vật dụng đeo hàng ngày, tiếp xúc với mồ hôi, bụi bẩn và va chạm liên tục. Phụ kiện chăm sóc đúng cách giúp tròng kính luôn sạch, gọng kính không bị lỏng hay biến dạng — tiết kiệm chi phí thay kính mới."));

  blocks.push(h2("Đặc điểm sản phẩm"));
  const features = [];
  if (name.includes("Hộp") || name.includes("hộp")) {
    features.push("Chất liệu cứng cáp, bảo vệ kính khỏi va đập");
    features.push("Thiết kế nhỏ gọn, dễ mang theo");
    features.push("Lót nhung mềm bên trong, chống trầy tròng kính");
  } else if (name.includes("Khăn") || name.includes("khăn")) {
    features.push("Vải nano siêu mịn, lau sạch không để lại vết");
    features.push("Chống hơi nước hiệu quả");
    features.push("Có thể giặt và tái sử dụng nhiều lần");
  } else if (name.includes("Nước") || name.includes("nước")) {
    features.push("Công thức chuyên dụng cho tròng kính");
    features.push("Làm sạch bụi bẩn, dầu mỡ mà không làm hỏng lớp phủ");
    features.push("Dung tích nhỏ gọn, tiện mang theo");
  } else if (name.includes("Đệm") || name.includes("đệm")) {
    features.push("Silicon mềm, êm tai, chống trượt");
    features.push("Giúp cố định kính không bị tuột");
    features.push("Phù hợp mọi loại gọng kính");
  } else {
    features.push("Chất liệu cao cấp, bền bỉ");
    features.push("Thiết kế phù hợp với kính Milan Eyewear");
  }
  features.push(`Giá: ${price}`);
  blocks.push(ul(features));

  // FAQ for accessories
  blocks.push(h2("Câu hỏi thường gặp"));
  blocks.push(h3(`${name} có phù hợp với mọi loại kính không?`));
  blocks.push(p(`Có. ${name} được thiết kế tương thích với tất cả ${catLink("gong-kinh")} và ${catLink("kinh-mat")} tại Milan Eyewear, cũng như các thương hiệu kính khác.`));
  blocks.push(h3(`Mua ${name} ở đâu uy tín?`));
  blocks.push(p(`Bạn có thể mua ${name} trực tiếp tại Milan Eyewear online. Freeship toàn quốc, đổi trả 30 ngày nếu không hài lòng.`));

  // CTA
  blocks.push(divider());
  blocks.push(h3("Mua kèm gọng kính để được ưu đãi"));
  blocks.push(p(`Khi mua gọng kính tại Milan Eyewear, bạn có thể mua kèm ${catLink("phu-kien-kinh")} với giá ưu đãi. Freeship toàn quốc, đổi trả 30 ngày.`));

  if (relatedCats.length > 0) {
    blocks.push(h3("Xem thêm sản phẩm liên quan"));
    blocks.push(ul(relatedCats.map(slug => catLink(slug))));
  }

  return blocks;
}

// === MAIN ===

function generateForProduct(pr, idx) {
  const cat = pr.categories[0]?.slug || "gong-kinh";
  if (cat === "trong-kinh") return generateLensBlocks(pr, idx);
  if (cat === "phu-kien-kinh") return generateAccessoryBlocks(pr, idx);
  return generateFrameBlocks(pr, idx);
}

function main() {
  const products = JSON.parse(readFileSync(INPUT_PATH, "utf8"));
  console.log(`Loaded ${products.length} products\n`);

  const results = products.map((pr, idx) => {
    const blocks = generateForProduct(pr, idx);
    return {
      id: pr.id,
      maSanPham: pr.maSanPham,
      tenSanPham: pr.tenSanPham,
      slug: pr.slug,
      category: pr.categories[0]?.slug || "unknown",
      moTa: JSON.stringify(blocks),
      blockCount: blocks.length,
      seoDescription: null,
    };
  });

  writeFileSync(OUTPUT_PATH, JSON.stringify(results, null, 2), "utf8");

  // Report
  const byCategory = {};
  for (const r of results) {
    if (!byCategory[r.category]) byCategory[r.category] = [];
    byCategory[r.category].push(r);
  }

  console.log("═══════════════════════════════════════════════════");
  console.log(`  Total: ${results.length} products with moTa content`);
  console.log("═══════════════════════════════════════════════════\n");

  // Uniqueness check
  const firstParas = new Set();
  let dupes = 0;
  for (const r of results) {
    const blocks = JSON.parse(r.moTa);
    const firstP = blocks.find(b => b.type === "paragraph")?.data?.text || "";
    const key = firstP.substring(0, 80);
    if (firstParas.has(key)) { dupes++; console.warn(`  DUPE intro: ${r.maSanPham}`); }
    firstParas.add(key);
  }
  console.log(`  Unique intros: ${firstParas.size} / ${results.length}`);
  console.log(`  Duplicate intros: ${dupes}\n`);

  // Internal link count
  let totalLinks = 0;
  for (const r of results) {
    const linkCount = (r.moTa.match(/<a href="/g) || []).length;
    totalLinks += linkCount;
  }
  console.log(`  Total internal links: ${totalLinks} (avg ${(totalLinks / results.length).toFixed(1)} per product)\n`);

  for (const [cat, items] of Object.entries(byCategory)) {
    console.log(`[${cat}] ${items.length} sản phẩm, avg ${Math.round(items.reduce((a,b) => a + b.blockCount, 0) / items.length)} blocks`);
    const sample = items[0];
    const blocks = JSON.parse(sample.moTa);
    const firstP = blocks.find(b => b.type === "paragraph")?.data?.text || "";
    console.log(`  Sample ${sample.maSanPham}: "${firstP.substring(0, 120)}..."`);
    console.log(`  (${blocks.length} blocks, ${sample.moTa.length} chars JSON)\n`);
  }

  console.log(`Output: ${OUTPUT_PATH}`);
}

main();
