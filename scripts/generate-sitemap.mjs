// Generate sitemap.xml and robots.txt based on PocketBase blogs and static routes
import fs from 'node:fs';
import path from 'node:path';
import PocketBase from 'pocketbase';

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public');

const SITE_URL = process.env.SITE_URL || process.env.VITE_SITE_URL || 'http://localhost:5173';
const PB_URL = process.env.PB_URL || process.env.VITE_PB_URL || 'http://127.0.0.1:8090';

async function fetchAllBlogs() {
  const pb = new PocketBase(PB_URL);
  const perPage = 50;
  let page = 1;
  let items = [];
  while (true) {
    const res = await pb.collection('blogs').getList(page, perPage, { sort: '-created' });
    items = items.concat(res.items || []);
    const totalPages = res.totalPages || Math.ceil((res.totalItems || 0) / perPage);
    if (page >= totalPages) break;
    page += 1;
  }
  return items;
}

function ensurePublicDir() {
  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR);
  }
}

function toUrl(pathname) {
  return `${String(SITE_URL).replace(/\/$/, '')}${pathname}`;
}

function generateSitemap(staticPaths, postSlugs) {
  const urls = [
    ...staticPaths.map(p => toUrl(p)),
    ...postSlugs.map(slug => toUrl(`/blog/${slug}`))
  ];
  const now = new Date().toISOString();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map(u => `  <url>\n    <loc>${u}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`).join('\n') +
    `\n</urlset>\n`;
  return xml;
}

function generateRobots() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${toUrl('/sitemap.xml')}\n`;
}

async function main() {
  ensurePublicDir();
  const staticPaths = [
    '/', '/pricing', '/advisor', '/contact', '/blog',
    '/cart', '/login', '/portal', '/profile', '/my-services', '/my-orders', '/my-tickets', '/affiliate', '/support'
  ];
  try {
    const posts = await fetchAllBlogs();
    const slugs = posts.map(p => p.slug).filter(Boolean);
    const xml = generateSitemap(staticPaths, slugs);
    fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), xml, 'utf8');
    fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), generateRobots(), 'utf8');
    console.log(`Generated sitemap.xml and robots.txt in ${PUBLIC_DIR}`);
    console.log(`Sitemap URL: ${toUrl('/sitemap.xml')}`);
  } catch (e) {
    console.warn('PocketBase not reachable, generating sitemap with static pages only.');
    const xml = generateSitemap(staticPaths, []);
    fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), xml, 'utf8');
    fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), generateRobots(), 'utf8');
    console.log(`Generated sitemap.xml and robots.txt (static only) in ${PUBLIC_DIR}`);
  }
}

main();