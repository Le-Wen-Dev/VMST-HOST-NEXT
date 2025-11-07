import React from 'react';
// Use the official vite-plugin-ssr client hook
import { usePageContext } from 'vite-plugin-ssr/client';

export { Page };

function Page() {
  const pageContext = usePageContext() as any;
  const { is404, abortStatusCode, abortReason } = pageContext || {};

  let msg: string;
  if (is404) {
    msg = "This page doesn't exist.";
  } else if (typeof abortReason === 'string') {
    msg = abortReason;
  } else if (abortStatusCode === 403) {
    msg = "You cannot access this page because you don't have enough privileges.";
  } else if (abortStatusCode === 401) {
    msg = "You aren't logged in. Please log in.";
  } else {
    msg = 'Something went wrong. Please try again later.';
  }

  return (
    <div style={{ padding: '2rem', maxWidth: 720, margin: '0 auto', color: '#374151' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>{msg}</h1>
      <p style={{ marginBottom: '1rem' }}>If you believe this is a mistake, try reloading or go back to the homepage.</p>
      <a href="/" style={{ color: '#2563EB', textDecoration: 'underline' }}>Go to homepage</a>
    </div>
  );
}