import type { PageContextBuiltIn } from 'vite-plugin-ssr/types';
import PocketBase from 'pocketbase';

export { onBeforeRender };
export async function prerender() {
  const PB_URL = process.env.PB_URL || process.env.VITE_PB_URL || 'http://127.0.0.1:8090';
  try {
    const pb = new PocketBase(PB_URL);
    const res = await pb.collection('blogs').getList(1, 500, { fields: 'slug' });
    const items = res.items || [];
    return items
      .map((it: any) => it?.slug)
      .filter(Boolean)
      .map((slug: string) => `/blog/${slug}`);
  } catch (e) {
    // PocketBase unreachable: skip prerendering dynamic posts
    return [];
  }
}

async function onBeforeRender(pageContext: PageContextBuiltIn & { routeParams: { slug: string } }) {
  const { slug } = pageContext.routeParams || ({} as any);
  const PB_URL = process.env.PB_URL || process.env.VITE_PB_URL || 'http://127.0.0.1:8090';
  let initialPost: any = null;
  try {
    const pb = new PocketBase(PB_URL);
    const res = await pb.collection('blogs').getList(1, 1, { filter: `slug='${slug}'`, expand: 'danh_muc,tac_gia' });
    initialPost = (res.items || [])[0] || null;
  } catch (e) {
    initialPost = null;
  }
  return {
    pageContext: {
      pageProps: { slug, initialPost },
    },
  };
}