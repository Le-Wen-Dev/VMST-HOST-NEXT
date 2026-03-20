/**
 * Bước 1: Export toàn bộ sản phẩm từ PocketBase
 *
 * Output: SEO /data/products-export.json
 * Usage: node "SEO /scripts/export-products.mjs"
 */

import PocketBase from "pocketbase";
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pb = new PocketBase("https://api.milaneyewear.com.vn");

const OUTPUT_PATH = join(__dirname, "..", "data", "products-export.json");

async function exportProducts() {
  console.log("Fetching all products from PocketBase...\n");

  const records = await pb.collection("sanpham").getFullList({
    sort: "maSanPham",
    expand: "danhMuc",
  });

  // Filter out hidden products
  const visible = records.filter((r) => r.trangThai !== "an");

  const products = visible.map((r) => {
    const categories = (r.expand?.danhMuc || []).map((c) => ({
      id: c.id,
      name: c.tenDanhMuc,
      slug: c.slug,
    }));

    return {
      id: r.id,
      maSanPham: r.maSanPham || "",
      tenSanPham: r.tenSanPham || "",
      slug: r.slug || "",
      chatLieu: r.chatLieu || "",
      hinhDang: r.hinhDang || "",
      gioiTinh: r.gioiTinh || "",
      giaBan: r.giaBan || 0,
      giaGoc: r.giaGoc || 0,
      giamGia: r.giamGia || 0,
      banChay: r.banChay || false,
      moiVe: r.moiVe || false,
      uuDaiGioiHan: r.uuDaiGioiHan || false,
      boSuuTap: r.boSuuTap || "",
      chieuRongTrong: r.chieuRongTrong || 0,
      chieuRongCau: r.chieuRongCau || 0,
      chieuDaiGong: r.chieuDaiGong || 0,
      chieuCaoTrong: r.chieuCaoTrong || 0,
      chieuRongKhung: r.chieuRongKhung || 0,
      categories,
    };
  });

  // Group by category for report
  const byCategory = {};
  for (const p of products) {
    const cat = p.categories[0]?.slug || "unknown";
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(p.maSanPham);
  }

  writeFileSync(OUTPUT_PATH, JSON.stringify(products, null, 2), "utf8");

  console.log(`Exported ${products.length} products → ${OUTPUT_PATH}\n`);
  console.log("Phân bố theo danh mục:");
  for (const [cat, items] of Object.entries(byCategory)) {
    console.log(`  ${cat}: ${items.length} sản phẩm`);
  }
}

exportProducts().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
