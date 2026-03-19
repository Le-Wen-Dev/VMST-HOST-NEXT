#!/usr/bin/env node
/**
 * Seed 50 SEO blog articles into PocketBase `blogs` collection.
 *
 * Usage:
 *   PB_URL=http://127.0.0.1:8090 PB_ADMIN_EMAIL=admin@example.com PB_ADMIN_PASSWORD=secret node scripts/seed-blog-articles.mjs
 *
 * Each article is 1000-2000 words, SEO-optimized with internal links to vmst.host pages.
 */
import PocketBase from 'pocketbase';

const PB_URL = process.env.PB_URL || process.env.NEXT_PUBLIC_PB_URL || 'http://127.0.0.1:8090';
const ADMIN_EMAIL = process.env.PB_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.PB_ADMIN_PASSWORD;

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error('Missing PB_ADMIN_EMAIL or PB_ADMIN_PASSWORD env vars');
  process.exit(1);
}

function toSlug(input) {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// Import all articles from the data file
import { articles } from './blog-articles-data.mjs';

async function main() {
  const pb = new PocketBase(PB_URL);
  await pb.collection('_superusers').authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
  console.log(`Authenticated. Seeding ${articles.length} articles...`);

  let created = 0;
  let skipped = 0;

  for (const article of articles) {
    const slug = toSlug(article.tieu_de);
    // Check if already exists
    try {
      const existing = await pb.collection('blogs').getList(1, 1, { filter: `slug='${slug}'` });
      if (existing.items.length > 0) {
        console.log(`  SKIP (exists): ${slug}`);
        skipped++;
        continue;
      }
    } catch {}

    try {
      await pb.collection('blogs').create({
        slug,
        tieu_de: article.tieu_de,
        noi_dung_chinh: article.noi_dung_chinh,
        mo_ta_ngan: article.mo_ta_ngan,
        seo_title: article.seo_title,
        seo_description: article.seo_description,
        seo_core: article.seo_core,
        tag: article.tag,
        trang_thai: 'published',
        so_phut_doc: article.so_phut_doc || '5',
        ngay_viet: new Date().toISOString(),
      });
      created++;
      console.log(`  OK: ${slug}`);
    } catch (err) {
      console.error(`  FAIL: ${slug}`, err.message);
    }
  }

  console.log(`\nDone. Created: ${created}, Skipped: ${skipped}, Total: ${articles.length}`);
}

main().catch(console.error);
