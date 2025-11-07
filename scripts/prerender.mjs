import { prerender } from 'vite-plugin-ssr/prerender';

// Run vite-plugin-ssr prerender programmatically
prerender().then(() => {
  console.log('Prerender completed');
}).catch((e) => {
  console.error('Prerender failed:', e);
  process.exit(1);
});