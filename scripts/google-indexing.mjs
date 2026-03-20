/**
 * Batch submit URLs to Google Indexing API for vmst.host
 * Usage: node scripts/google-indexing.mjs [--type updated|deleted] [--urls url1,url2,...] [--sitemap]
 *
 * Examples:
 *   node scripts/google-indexing.mjs --sitemap
 *   node scripts/google-indexing.mjs --urls https://vmst.host/pricing,https://vmst.host/blog
 */

import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const KEY_PATH = path.join(__dirname, 'google-index-key-vmst-host.json');
const SITE_URL = 'https://vmst.host';

async function getAuthClient() {
  if (!fs.existsSync(KEY_PATH)) {
    console.error(`Key file not found: ${KEY_PATH}`);
    console.error('Download from Google Cloud Console > Service Accounts > Keys');
    process.exit(1);
  }
  const key = JSON.parse(fs.readFileSync(KEY_PATH, 'utf8'));
  const auth = new google.auth.JWT({
    email: key.client_email,
    key: key.private_key,
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });
  await auth.authorize();
  return auth;
}

async function submitUrl(auth, url, type = 'URL_UPDATED') {
  const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${(await auth.getAccessToken()).token}`,
    },
    body: JSON.stringify({ url, type }),
  });
  const data = await res.json();
  return { url, status: res.status, data };
}

async function fetchSitemapUrls() {
  const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  let xml;
  if (fs.existsSync(sitemapPath)) {
    xml = fs.readFileSync(sitemapPath, 'utf8');
    console.log('Reading from local public/sitemap.xml');
  } else {
    console.log(`Fetching from ${SITE_URL}/sitemap.xml`);
    const res = await fetch(`${SITE_URL}/sitemap.xml`);
    xml = await res.text();
  }
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
}

// --- Main ---
const args = process.argv.slice(2);
const typeArg = args.includes('--type') ? args[args.indexOf('--type') + 1] : 'updated';
const type = typeArg === 'deleted' ? 'URL_DELETED' : 'URL_UPDATED';

let urls = [];

if (args.includes('--sitemap')) {
  console.log('Fetching URLs from sitemap...');
  urls = await fetchSitemapUrls();
  console.log(`Found ${urls.length} URLs`);
} else if (args.includes('--urls')) {
  urls = args[args.indexOf('--urls') + 1].split(',');
} else {
  console.log('Usage:');
  console.log('  node scripts/google-indexing.mjs --sitemap');
  console.log('  node scripts/google-indexing.mjs --urls https://vmst.host/pricing');
  process.exit(0);
}

const auth = await getAuthClient();
console.log(`\nSubmitting ${urls.length} URLs (${type})...\n`);

let success = 0;
let failed = 0;

for (const url of urls) {
  const result = await submitUrl(auth, url, type);
  if (result.status === 200) {
    console.log(`OK: ${url}`);
    success++;
  } else {
    console.log(`FAIL [${result.status}]: ${url} - ${JSON.stringify(result.data)}`);
    failed++;
  }
  await new Promise(r => setTimeout(r, 1000));
}

console.log(`\nDone! Success: ${success}, Failed: ${failed}`);
