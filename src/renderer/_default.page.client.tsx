import React from 'react';
import '../index.css';
import { hydrateRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';

export { render }; // called by vite-plugin-ssr

function render(pageContext: any) {
  const { Page, pageProps } = pageContext;
  hydrateRoot(
    document.getElementById('root')!,
    <HelmetProvider>
      <Page {...pageProps} />
    </HelmetProvider>
  );
}