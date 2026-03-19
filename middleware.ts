import { NextRequest, NextResponse } from 'next/server';

export function middleware(_req: NextRequest) {
  // Auth check is handled client-side by AuthContext.
  // PocketBase stores auth in localStorage + cookie, but cookie can exceed 4KB
  // causing server-side middleware to fail. Let all routes through.
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
