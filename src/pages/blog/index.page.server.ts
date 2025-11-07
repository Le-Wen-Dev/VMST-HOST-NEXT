import type { PageContextBuiltIn } from 'vite-plugin-ssr/types';
import PocketBase from 'pocketbase';

export { onBeforeRender };
export function prerender() {
  // Static list page can always be prerendered
  return ['/blog'];
}

async function onBeforeRender(pageContext: PageContextBuiltIn) {
  const PB_URL = process.env.PB_URL || process.env.VITE_PB_URL || 'http://127.0.0.1:8090';
  let initialPosts: any[] = [];
  try {
    const pb = new PocketBase(PB_URL);
    const res = await pb.collection('blogs').getList(1, 12, { sort: '-created' });
    initialPosts = res.items || [];
  } catch (e) {
    // Fallback to empty; CSR will load
    initialPosts = [];
  }
  return {
    pageContext: {
      pageProps: { initialPosts },
    },
  };
}