import React from 'react';
import { renderToString } from 'react-dom/server';
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr/server';
import { HelmetProvider } from 'react-helmet-async';

export { render };

async function render(pageContext: any) {
  const { Page, pageProps } = pageContext;
  const helmetContext: any = {};
  const pageHtml = renderToString(
    <HelmetProvider context={helmetContext}>
      <Page {...pageProps} />
    </HelmetProvider>
  );
  const helmet = helmetContext.helmet;
  const documentHtml = escapeInject`<!DOCTYPE html>
  <html lang="vi">
    <head>
      ${dangerouslySkipEscape(helmet?.title?.toString?.() || '')}
      ${dangerouslySkipEscape(helmet?.meta?.toString?.() || '')}
      ${dangerouslySkipEscape(helmet?.link?.toString?.() || '')}
    </head>
    <body>
      <div id="root">${dangerouslySkipEscape(pageHtml)}</div>
    </body>
  </html>`;
  return { documentHtml };
}