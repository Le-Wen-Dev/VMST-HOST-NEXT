/**
 * Bước 2: Generate SEO descriptions cho từng sản phẩm
 *
 * Input:  SEO /data/products-export.json
 * Output: SEO /data/products-with-seo.json
 * Usage:  node "SEO /scripts/generate-descriptions.mjs"
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const INPUT_PATH = join(__dirname, "..", "data", "products-export.json");
const OUTPUT_PATH = join(__dirname, "..", "data", "products-with-seo.json");

// ==================== MAPPING TABLES ====================

const CHAT_LIEU_MAP = {
  acetate: "nhựa Acetate",
  tr90: "nhựa TR90 siêu nhẹ",
  metal: "kim loại",
  titanium: "titan cao cấp",
  mixed: "kết hợp kim loại và nhựa",
  ultem: "nhựa Ultem siêu dẻo",
};

const HINH_DANG_MAP = {
  square: "vuông",
  round: "tròn",
  "cat-eye": "mắt mèo",
  aviator: "phi công",
  oval: "oval",
  rectangle: "chữ nhật",
  polygon: "đa giác",
  browline: "browline",
  butterfly: "bướm",
};

const GIOI_TINH_MAP = {
  men: "nam",
  women: "nữ",
  unisex: "unisex nam nữ",
};

const CATEGORY_LABEL = {
  "gong-kinh": "Gọng kính",
  "gong-kinh-nhua": "Gọng kính nhựa",
  "gong-kinh-kim-loai": "Gọng kính kim loại",
  "gong-kinh-titan": "Gọng kính titan",
  "gong-kinh-cho-dan-van-phong": "Gọng kính văn phòng",
  "kinh-mat": "Kính mát",
  "trong-kinh": "Tròng kính",
  "phu-kien-kinh": "Phụ kiện kính",
};

// USP phrases — rotated to avoid duplication
const USP_POOL = [
  "Bảo hành 12 tháng, đổi trả 30 ngày",
  "Freeship toàn quốc, đổi trả 30 ngày",
  "Bảo hành chính hãng, giao nhanh 24h",
  "Mua online uy tín, bảo hành 12 tháng",
  "Ship nhanh toàn quốc, bảo hành 1 năm",
  "Đổi trả miễn phí, freeship toàn quốc",
  "Giao nhanh 24h, bảo hành 12 tháng",
  "Mua online giá tốt, đổi trả 30 ngày",
];

// Benefit phrases by category
const CATEGORY_BENEFITS = {
  "gong-kinh": ["đeo nhẹ cả ngày", "phù hợp lắp cận", "thiết kế thời trang"],
  "gong-kinh-nhua": ["siêu nhẹ bền bỉ", "đeo thoải mái cả ngày", "không gây dị ứng"],
  "gong-kinh-kim-loai": ["thanh mảnh sang trọng", "bền bỉ theo thời gian", "phong cách lịch lãm"],
  "gong-kinh-titan": ["siêu nhẹ chỉ 15g", "chống ăn mòn tuyệt đối", "bền bỉ vượt trội"],
  "gong-kinh-cho-dan-van-phong": ["chống mỏi mắt hiệu quả", "đeo 8 tiếng không đau", "lọc ánh sáng xanh"],
  "kinh-mat": ["chống UV400 bảo vệ mắt", "phân cực chống chói", "thời trang đường phố"],
  "trong-kinh": ["chống ánh sáng xanh", "lớp phủ chống xước", "tầm nhìn sắc nét"],
  "phu-kien-kinh": ["bảo vệ kính tối ưu", "thiết kế nhỏ gọn", "chất liệu cao cấp"],
};

// ==================== DESCRIPTION GENERATOR ====================

function formatPrice(price) {
  if (!price) return "";
  return price.toLocaleString("vi-VN") + "đ";
}

function extractCode(maSanPham) {
  // MI01 → MI01, DCGK → DCGK
  return maSanPham || "";
}

function getSpecs(product) {
  const { chieuRongTrong, chieuRongCau, chieuDaiGong } = product;
  if (chieuRongTrong && chieuRongCau && chieuDaiGong) {
    return `${chieuRongTrong}-${chieuRongCau}-${chieuDaiGong}`;
  }
  return "";
}

function generateDescription(product, index) {
  const cat = product.categories[0]?.slug || "gong-kinh";
  const catLabel = CATEGORY_LABEL[cat] || "Kính mắt";
  let chatLieu = CHAT_LIEU_MAP[product.chatLieu] || product.chatLieu;
  const hinhDang = HINH_DANG_MAP[product.hinhDang] || product.hinhDang;
  const gioiTinh = GIOI_TINH_MAP[product.gioiTinh] || "unisex";
  const code = extractCode(product.maSanPham);
  const price = formatPrice(product.giaBan);
  const specs = getSpecs(product);
  const usp = USP_POOL[index % USP_POOL.length];
  const benefits = CATEGORY_BENEFITS[cat] || CATEGORY_BENEFITS["gong-kinh"];
  const benefit = benefits[index % benefits.length];

  // Avoid redundancy: if category already mentions material, skip chatLieu in template
  const catMentionsMaterial = ["gong-kinh-nhua", "gong-kinh-kim-loai", "gong-kinh-titan"].includes(cat);
  if (catMentionsMaterial) chatLieu = "";

  // Different templates based on category type
  let desc = "";

  if (cat === "phu-kien-kinh") {
    desc = buildAccessoryDesc(product, code, price, usp, benefit);
  } else if (cat === "trong-kinh") {
    desc = buildLensDesc(product, code, price, usp, benefit);
  } else if (cat === "kinh-mat") {
    desc = buildSunglassDesc(product, code, chatLieu, hinhDang, gioiTinh, price, usp, benefit);
  } else {
    desc = buildFrameDesc(product, code, catLabel, chatLieu, hinhDang, gioiTinh, price, specs, usp, benefit);
  }

  // Trim to 160 chars max
  if (desc.length > 160) {
    desc = desc.substring(0, 157) + "...";
  }

  return desc;
}

// ==================== TEMPLATE BUILDERS ====================

function buildFrameDesc(product, code, catLabel, chatLieu, hinhDang, gioiTinh, price, specs, usp, benefit) {
  const mat = chatLieu ? ` chất liệu ${chatLieu}` : "";
  const mat2 = chatLieu ? ` ${chatLieu}` : "";
  const templates = [
    () => `${catLabel} ${code}${mat}, kiểu dáng ${hinhDang} ${gioiTinh}. ${benefit}. ${price ? `Giá chỉ ${price}` : "Giá tốt nhất"}. ${usp}.`,
    () => `Mua ${catLabel.toLowerCase()} ${code} ${hinhDang}${mat2} cho ${gioiTinh}. ${benefit}${specs ? `, size ${specs}` : ""}. ${price ? `Chỉ ${price}` : "Giá ưu đãi"}. ${usp}.`,
    () => `${code} – ${catLabel.toLowerCase()}${mat2} ${hinhDang} dành cho ${gioiTinh}. ${benefit}. ${price ? `Giá ${price}` : "Giá hấp dẫn"} tại Milan Eyewear. ${usp}.`,
    () => `${catLabel} ${hinhDang} ${code}${mat2}, ${benefit}. Phù hợp ${gioiTinh}${price ? `, giá chỉ ${price}` : ""}. ${usp}.`,
  ];

  const hash = simpleHash(product.id);
  return templates[hash % templates.length]();
}

function buildSunglassDesc(product, code, chatLieu, hinhDang, gioiTinh, price, usp, benefit) {
  const templates = [
    () => `Kính mát ${code} ${hinhDang} ${chatLieu}, ${benefit}. Dành cho ${gioiTinh}. ${price ? `Giá ${price}` : "Giá tốt"} tại Milan Eyewear. ${usp}.`,
    () => `Mua kính mát ${code} kiểu ${hinhDang} cho ${gioiTinh}. ${chatLieu}, ${benefit}. ${price ? `Chỉ ${price}` : "Giá ưu đãi"}. ${usp}.`,
    () => `${code} – Kính mát ${hinhDang} ${chatLieu} ${gioiTinh}. ${benefit}. ${price ? `Giá chỉ ${price}` : "Giá hấp dẫn"}. ${usp}.`,
  ];

  const hash = simpleHash(product.id);
  return templates[hash % templates.length]();
}

function buildLensDesc(product, code, price, usp, benefit) {
  const name = product.tenSanPham;
  const templates = [
    () => `${name}. ${benefit}, phù hợp mọi gọng kính. ${price ? `Giá từ ${price}` : "Giá tốt nhất"}. ${usp}.`,
    () => `Mua tròng kính ${code} chính hãng – ${benefit}. ${price ? `Chỉ ${price}` : "Giá ưu đãi"} tại Milan Eyewear. ${usp}.`,
    () => `Tròng kính ${code} – ${benefit}. Cắt lắp chuẩn xác cho mọi gọng. ${price ? `Giá ${price}` : "Giá hấp dẫn"}. ${usp}.`,
  ];

  const hash = simpleHash(product.id);
  return templates[hash % templates.length]();
}

function buildAccessoryDesc(product, code, price, usp, benefit) {
  const name = product.tenSanPham;
  // Shorten long names
  const shortName = name.length > 60 ? name.substring(0, 57) + "..." : name;
  const templates = [
    () => `${shortName}. ${benefit}. ${price ? `Giá chỉ ${price}` : "Giá tốt"} tại Milan Eyewear. ${usp}.`,
    () => `Mua ${shortName.toLowerCase()} – ${benefit}. ${price ? `Chỉ ${price}` : "Giá ưu đãi"}. ${usp}.`,
  ];

  const hash = simpleHash(product.id);
  return templates[hash % templates.length]();
}

function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

// ==================== MAIN ====================

function main() {
  const products = JSON.parse(readFileSync(INPUT_PATH, "utf8"));
  console.log(`Loaded ${products.length} products\n`);

  const results = products.map((product, index) => {
    const seoDescription = generateDescription(product, index);
    return {
      ...product,
      seoDescription,
    };
  });

  // Uniqueness check
  const descSet = new Set();
  let dupes = 0;
  for (const r of results) {
    if (descSet.has(r.seoDescription)) {
      dupes++;
      console.warn(`  DUPE: ${r.maSanPham} - "${r.seoDescription.substring(0, 60)}..."`);
    }
    descSet.add(r.seoDescription);
  }

  writeFileSync(OUTPUT_PATH, JSON.stringify(results, null, 2), "utf8");

  // Report
  console.log("═══════════════════════════════════════════════════");
  console.log(`  Total:      ${results.length} descriptions`);
  console.log(`  Unique:     ${descSet.size}`);
  console.log(`  Duplicates: ${dupes}`);

  const lengths = results.map((r) => r.seoDescription.length);
  console.log(`  Min length: ${Math.min(...lengths)} chars`);
  console.log(`  Max length: ${Math.max(...lengths)} chars`);
  console.log(`  Avg length: ${Math.round(lengths.reduce((a, b) => a + b, 0) / lengths.length)} chars`);
  console.log("═══════════════════════════════════════════════════\n");

  // Sample by category
  const byCategory = {};
  for (const r of results) {
    const cat = r.categories[0]?.slug || "unknown";
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(r);
  }

  console.log("Sample descriptions per category:\n");
  for (const [cat, items] of Object.entries(byCategory)) {
    console.log(`  [${cat}] (${items.length} sản phẩm)`);
    const sample = items.slice(0, 2);
    for (const s of sample) {
      console.log(`    ${s.maSanPham}: "${s.seoDescription}"`);
      console.log(`    (${s.seoDescription.length} chars)\n`);
    }
  }

  console.log(`Output: ${OUTPUT_PATH}`);
}

main();
