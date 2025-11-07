import React from 'react';
import HomePage from './HomePage';

export const route = '/';
export const prerender = true;

export function Page() {
  return <HomePage />;
}