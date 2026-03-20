// Generate sitemap.xml and robots.txt for vmst.host
// Fetches blog posts from PocketBase + static routes
import fs from 'node:fs';
import path from 'node:path';
import PocketBase from 'pocketbase';

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public');
const SITE_URL = 'https://vmst.host';
const PB_URL = process.env.PB_URL || process.env.NEXT_PUBLIC_PB_URL || 'https://api.vmst.host';

async function fetchAllBlogs() {
  const pb = new PocketBase(PB_URL);
  const perPage = 50;
  let page = 1;
  let items = [];
  while (true) {
    const res = await pb.collection('blogs').getList(page, perPage, { sort: '-created' });
    items = items.concat(res.items || []);
    if (page >= res.totalPages) break;
    page++;
  }
  return items;
}

function toW3CDate(dateStr) {
  if (!dateStr) return new Date().toISOString().split('T')[0];
  return new Date(dateStr).toISOString().split('T')[0];
}

function escapeXml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildUrlEntry(loc, lastmod, changefreq, priority) {
  return `  <url>\n    <loc>${escapeXml(loc)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

async function main() {
  if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR);
  const today = new Date().toISOString().split('T')[0];

  const staticPages = [
    { path: '/', changefreq: 'daily', priority: '1.0' },
    { path: '/pricing', changefreq: 'weekly', priority: '0.9' },
    { path: '/wordpress-hosting', changefreq: 'weekly', priority: '0.9' },
    { path: '/business-hosting', changefreq: 'weekly', priority: '0.9' },
    { path: '/email-domain', changefreq: 'weekly', priority: '0.8' },
    { path: '/advisor', changefreq: 'weekly', priority: '0.8' },
    { path: '/blog', changefreq: 'daily', priority: '0.8' },
    { path: '/blog/categories', changefreq: 'weekly', priority: '0.6' },
    { path: '/contact', changefreq: 'monthly', priority: '0.6' },
    { path: '/support', changefreq: 'monthly', priority: '0.5' },
    { path: '/privacy-policy', changefreq: 'monthly', priority: '0.3' },
    { path: '/terms', changefreq: 'monthly', priority: '0.3' },
  ];

  const urls = staticPages.map(p => buildUrlEntry(`${SITE_URL}${p.path}`, today, p.changefreq, p.priority));

  try {
    const posts = await fetchAllBlogs();
    const slugs = posts.filter(p => p.slug);
    console.log(`Found ${slugs.length} blog posts`);
    for (const post of slugs) {
      const lastmod = toW3CDate(post.updated || post.created);
      urls.push(buildUrlEntry(`${SITE_URL}/blog/${post.slug}`, lastmod, 'weekly', '0.7'));
    }
  } catch (e) {
    console.warn('PocketBase not reachable, static pages only:', e.message);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
  const robots = `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /portal\nDisallow: /cart\nDisallow: /checkout\nDisallow: /payment-qr\nDisallow: /my-orders\nDisallow: /my-services\nDisallow: /my-tickets\nDisallow: /profile\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;

  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), xml, 'utf8');
  fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), robots, 'utf8');
  console.log(`Generated sitemap.xml (${urls.length} URLs) and robots.txt in ${PUBLIC_DIR}`);
}

main();
