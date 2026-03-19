import React from 'react';
import BlogPostPage from '../BlogPostPage';

export const route = '/blog/:slug';
export { Page };

function Page(pageProps: { slug: string }) {
  const { slug } = pageProps;
  const handleNavigate = (page: string, params?: any) => {
    if (page === 'blog') {
      window.location.href = '/blog';
      return;
    }
    if (page === 'blog-post') {
      const toSlug = params?.slug || '';
      window.location.href = `/blog/${toSlug}`;
      return;
    }
  };
  return <BlogPostPage slug={slug} onNavigate={handleNavigate} />;
}