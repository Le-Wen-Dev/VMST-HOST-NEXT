import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin',
        '/portal',
        '/login',
        '/profile',
        '/my-orders',
        '/my-services',
        '/my-tickets',
        '/cart',
        '/checkout',
        '/payment-qr',
        '/api',
      ],
    },
    sitemap: 'https://vmst.host/sitemap.xml',
  };
}
