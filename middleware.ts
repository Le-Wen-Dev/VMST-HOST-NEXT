import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_ROUTES = ['/portal', '/profile', '/my-services', '/my-orders', '/my-tickets', '/affiliate'];
const ADMIN_ROUTES = ['/admin'];

function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some(route => pathname === route || pathname.startsWith(route + '/'));
}

function isAdminRoute(pathname: string): boolean {
  return ADMIN_ROUTES.some(route => pathname === route || pathname.startsWith(route + '/'));
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip API routes and static files
  if (pathname.startsWith('/api/') || pathname.startsWith('/_next/') || pathname.includes('.')) {
    return NextResponse.next();
  }

  // Use lightweight pb_token cookie, fallback to pb_auth
  const token = req.cookies.get('pb_token')?.value || req.cookies.get('pb_auth')?.value;

  // Protected routes: require authentication
  if (isProtectedRoute(pathname)) {
    if (!token) {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Admin routes: require admin role
  if (isAdminRoute(pathname)) {
    if (!token) {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    const role = req.cookies.get('pb_role')?.value;
    if (role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
