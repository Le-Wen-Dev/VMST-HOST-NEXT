import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_ROUTES = ['/portal', '/profile', '/my-services', '/my-orders', '/my-tickets', '/affiliate'];
const ADMIN_ROUTES = ['/admin'];

function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some(route => pathname === route || pathname.startsWith(route + '/'));
}

function isAdminRoute(pathname: string): boolean {
  return ADMIN_ROUTES.some(route => pathname === route || pathname.startsWith(route + '/'));
}

function decodeJwtPayload(token: string): Record<string, any> | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch {
    return null;
  }
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip API routes and static files
  if (pathname.startsWith('/api/') || pathname.startsWith('/_next/') || pathname.includes('.')) {
    return NextResponse.next();
  }

  const pbAuth = req.cookies.get('pb_auth')?.value;

  // Protected routes: require authentication
  if (isProtectedRoute(pathname)) {
    if (!pbAuth) {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Admin routes: require admin role
  if (isAdminRoute(pathname)) {
    if (!pbAuth) {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Decode JWT to check admin role
    try {
      const authData = JSON.parse(pbAuth);
      const token = authData?.token;
      if (token) {
        const payload = decodeJwtPayload(token);
        const model = authData?.model || authData?.record;
        const role = model?.vai_tro || payload?.vai_tro;
        if (role !== 'admin') {
          return NextResponse.redirect(new URL('/', req.url));
        }
      } else {
        return NextResponse.redirect(new URL('/login', req.url));
      }
    } catch {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
