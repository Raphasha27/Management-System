import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('kivoc_session');
  const { pathname } = request.nextUrl;

  // Define protected paths
  const protectedPaths = [
    '/dashboard',
    '/projects',
    '/clients',
    '/services',
    '/support',
    '/resources',
    '/settings',
    '/api/ai/stats' // Protect data APIs
  ];

  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));

  // If it's a protected path and no session exists
  if (isProtectedPath && !session) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Prevent logged-in users from accessing login page
  if (session && pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|kivoc-logo.png|landing.module.css).*)',
  ],
};
