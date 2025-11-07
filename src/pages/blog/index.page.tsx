import React from 'react';
import BlogPage from '../BlogPage';

export const route = '/blog';
export { Page };

function Page() {
  const handleNavigate = (page: string, params?: any) => {
    if (page === 'blog-post') {
      const slug = params?.slug || '';
      window.location.href = `/blog/${slug}`;
      return;
    }
    // Fallback to SPA routes
    window.location.href = '/blog';
  };
  return <BlogPage onNavigate={handleNavigate} />;
}