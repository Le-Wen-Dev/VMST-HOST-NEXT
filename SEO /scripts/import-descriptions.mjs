/**
 * Import SEO descriptions (seoMoTa) vào PocketBase — Interactive mode
 *
 * QUAN TRỌNG: Cần thêm field "seoMoTa" (type: text) vào collection "sanpham"
 * trên PocketBase admin trước khi chạy script này.
 *
 * Input: SEO /data/products-with-seo.json
 * Usage: node "SEO /scripts/import-descriptions.mjs"
 */

import PocketBase from "pocketbase";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { createInterface } from "readline";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pb = new PocketBase("https://api.milaneyewear.com.vn");
const INPUT_PATH = join(__dirname, "..", "data", "products-with-seo.json");

function loadProducts() {
  return JSON.parse(readFileSync(INPUT_PATH, "utf8"));
}

function ask(question) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function importOne(product) {
  await pb.collection("sanpham").update(product.id, {
    seoMoTa: product.seoDescription,
  });
}

async function importBatch(products, label) {
  console.log(`\n Importing ${label}...\n`);
  let ok = 0;
  let fail = 0;

  for (const product of products) {
    try {
      await importOne(product);
      ok++;
      console.log(`  OK: ${product.maSanPham} — "${product.seoDescription.substring(0, 60)}..."`);
    } catch (error) {
      fail++;
      console.error(`  FAIL: ${product.maSanPham} (${product.id}) - ${error.message}`);
    }
  }

  console.log("\n═══════════════════════════════════════════════════");
  console.log(`  OK:   ${ok}`);
  console.log(`  FAIL: ${fail}`);
  console.log("═══════════════════════════════════════════════════\n");
}

// --- Main ---
const products = loadProducts();

console.log("\n╔════════════════════════════════════════════════════════╗");
console.log("║   Import SEO Descriptions — Milan Eyewear             ║");
console.log("╚════════════════════════════════════════════════════════╝\n");
console.log(`  Loaded ${products.length} products\n`);

console.log("─────────────────────────────────────────────────────────");
console.log("  Chon option:\n");
console.log("  [1]  Import 1 san pham (chon theo index)");
console.log("  [2]  Import 2 san pham dau tien");
console.log("  [5]  Import 5 san pham dau tien");
console.log("  [10] Import 10 san pham dau tien");
console.log("  [a]  Import TAT CA");
console.log("  [d]  Dry run — xem preview, khong ghi DB");
console.log("  [q]  Thoat");
console.log("─────────────────────────────────────────────────────────\n");

const option = await ask("Nhap option: ");

if (option === "q") {
  console.log("Bye!");
  process.exit(0);
}

if (option === "d") {
  console.log("\nDRY RUN — khong ghi gi vao database\n");
  for (const [i, pr] of products.entries()) {
    console.log(`  [${i}] ${pr.maSanPham} (${pr.id})`);
    console.log(`      "${pr.seoDescription}"`);
    console.log(`      (${pr.seoDescription.length} chars)\n`);
  }
  console.log(`Total: ${products.length} descriptions`);
  process.exit(0);
}

if (option === "1") {
  const idx = await ask(`Nhap index (0-${products.length - 1}): `);
  const i = parseInt(idx, 10);
  if (isNaN(i) || i < 0 || i >= products.length) {
    console.error("Index khong hop le");
    process.exit(1);
  }
  await importBatch([products[i]], `1 san pham: ${products[i].maSanPham}`);
  process.exit(0);
}

if (option === "2") {
  await importBatch(products.slice(0, 2), "2 san pham dau tien");
  process.exit(0);
}

if (option === "5") {
  await importBatch(products.slice(0, 5), "5 san pham dau tien");
  process.exit(0);
}

if (option === "10") {
  await importBatch(products.slice(0, 10), "10 san pham dau tien");
  process.exit(0);
}

if (option === "a") {
  const confirm = await ask(`Ban chac chan muon import TAT CA ${products.length} san pham? (y/n): `);
  if (confirm !== "y") {
    console.log("Huy bo.");
    process.exit(0);
  }
  await importBatch(products, `tat ca ${products.length} san pham`);
  process.exit(0);
}

console.error(`Option "${option}" khong hop le`);
process.exit(1);
